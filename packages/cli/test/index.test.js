import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { chmod, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  getPluginEnabled,
  parseArgs,
  runInstall,
  setPluginEnabled,
  updateCodexConfigSource
} from "../src/index.js";

const tempDirs = [];

afterEach(async () => {
  await Promise.all(
    tempDirs.map((directory) => rm(directory, { force: true, recursive: true }))
  );
  tempDirs.length = 0;
});

function makeTempDir() {
  const directory = mkdtempSync(path.join(tmpdir(), "pds-cli-test-"));
  tempDirs.push(directory);
  return directory;
}

function captureIo() {
  const messages = [];
  const errors = [];

  return {
    errors,
    io: {
      error: (message) => errors.push(message),
      write: (message) => messages.push(message)
    },
    messages
  };
}

async function writeFakeCommand(binDir, name, logPath) {
  const commandPath = path.join(binDir, name);
  writeFileSync(
    commandPath,
    `#!/bin/sh
if [ "$1" = "--version" ]; then
  echo "${name} test"
  exit 0
fi
echo "${name} $*" >> "${logPath}"
`,
    "utf8"
  );
  await chmod(commandPath, 0o755);
}

describe("@pds/cli", () => {
  it("parses install options with defaults", () => {
    expect(parseArgs(["install", "--tool", "codex", "--dry-run"])).toMatchObject({
      command: "install",
      dryRun: true,
      repo: "pedrocarlop/pds",
      scope: "user",
      tool: "codex"
    });
  });

  it("updates Codex plugin sections idempotently", () => {
    const initial = `model = "gpt-5"

[plugins."pds@pds-local"]
enabled = true
`;
    const update = updateCodexConfigSource(initial);

    expect(update.legacyDisabled).toBe(true);
    expect(getPluginEnabled(update.source, "pds@pds")).toBe(true);
    expect(getPluginEnabled(update.source, "pds@pds-local")).toBe(false);
    expect(updateCodexConfigSource(update.source).changed).toBe(false);
  });

  it("adds missing plugin sections", () => {
    expect(setPluginEnabled("", "pds@pds", true)).toBe(
      `[plugins."pds@pds"]\nenabled = true\n`
    );
  });

  it("runs Codex install, backs up config, and migrates legacy plugin config", async () => {
    const root = makeTempDir();
    const homeDir = path.join(root, "home");
    const binDir = path.join(root, "bin");
    const logPath = path.join(root, "commands.log");
    const codexConfigDir = path.join(homeDir, ".codex");
    await mkdir(binDir, { recursive: true });
    await mkdir(codexConfigDir, { recursive: true });
    await writeFakeCommand(binDir, "codex", logPath);
    writeFileSync(
      path.join(codexConfigDir, "config.toml"),
      `[plugins."pds@pds-local"]\nenabled = true\n`,
      "utf8"
    );
    const { io, messages } = captureIo();
    const exitCode = runInstall(parseArgs(["install", "--tool", "codex"]), {
      env: { HOME: homeDir, PATH: binDir },
      io,
      now: () => new Date("2026-05-18T09:00:00.000Z")
    });

    expect(exitCode).toBe(0);
    expect(readFileSync(logPath, "utf8")).toContain(
      "codex plugin marketplace add pedrocarlop/pds --ref v0.1.0"
    );

    const config = readFileSync(path.join(codexConfigDir, "config.toml"), "utf8");
    expect(getPluginEnabled(config, "pds@pds")).toBe(true);
    expect(getPluginEnabled(config, "pds@pds-local")).toBe(false);
    expect(readdirSync(codexConfigDir)).toContain(
      "config.toml.backup-20260518T090000Z"
    );
    expect(messages.join("\n")).toContain("Disabled legacy pds@pds-local entry.");
  });

  it("runs Claude marketplace and install commands", async () => {
    const root = makeTempDir();
    const binDir = path.join(root, "bin");
    const logPath = path.join(root, "commands.log");
    await mkdir(binDir, { recursive: true });
    await writeFakeCommand(binDir, "claude", logPath);
    const { io } = captureIo();
    const exitCode = runInstall(parseArgs(["install", "--tool", "claude"]), {
      env: { HOME: root, PATH: binDir },
      io
    });

    expect(exitCode).toBe(0);
    expect(readFileSync(logPath, "utf8")).toContain(
      "claude plugin marketplace add pedrocarlop/pds --scope user"
    );
    expect(readFileSync(logPath, "utf8")).toContain(
      "claude plugin install pds@pds --scope user"
    );
  });

  it("prints dry-run commands and config edits without requiring installed CLIs", () => {
    const { io, messages } = captureIo();
    const exitCode = runInstall(parseArgs(["install", "--dry-run"]), {
      env: { HOME: "/tmp/pds-cli-home", PATH: "/tmp/pds-cli-empty" },
      io
    });

    expect(exitCode).toBe(0);
    expect(messages.join("\n")).toContain(
      "$ codex plugin marketplace add pedrocarlop/pds --ref v0.1.0"
    );
    expect(messages.join("\n")).toContain(
      "$ claude plugin marketplace add pedrocarlop/pds --scope user"
    );
    expect(messages.join("\n")).toContain(
      '+ [plugins."pds@pds"] enabled = true'
    );
  });

  it("does not pass --ref when installing Codex from a local marketplace path", () => {
    const { io, messages } = captureIo();
    const exitCode = runInstall(
      parseArgs([
        "install",
        "--dry-run",
        "--tool",
        "codex",
        "--repo",
        "/tmp/pds"
      ]),
      {
        env: { HOME: "/tmp/pds-cli-home", PATH: "/tmp/pds-cli-empty" },
        io
      }
    );

    expect(exitCode).toBe(0);
    expect(messages.join("\n")).toContain(
      "$ codex plugin marketplace add /tmp/pds"
    );
    expect(messages.join("\n")).not.toContain("--ref");
  });
});
