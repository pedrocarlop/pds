#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { pathToFileURL, URL } from "node:url";

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
);

const DEFAULT_REPO = "pedrocarlop/pds";
const DEFAULT_REF = `v${packageJson.version}`;
const VALID_TOOLS = new Set(["all", "codex", "claude"]);
const VALID_SCOPES = new Set(["user", "project", "local"]);
const NEW_CODEX_PLUGIN = "pds@pds";
const LEGACY_CODEX_PLUGIN = "pds@pds-local";

export function parseArgs(args) {
  const options = {
    command: "install",
    dryRun: false,
    ref: DEFAULT_REF,
    repo: DEFAULT_REPO,
    scope: "user",
    tool: "all"
  };

  const remaining = [...args];

  if (remaining[0] && !remaining[0].startsWith("-")) {
    options.command = remaining.shift();
  }

  for (let index = 0; index < remaining.length; index += 1) {
    const arg = remaining[index];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--tool") {
      options.tool = requireValue(remaining, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--repo") {
      options.repo = requireValue(remaining, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--ref") {
      options.ref = requireValue(remaining, index, arg);
      index += 1;
      continue;
    }

    if (arg === "--scope") {
      options.scope = requireValue(remaining, index, arg);
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (options.command !== "install") {
    throw new Error(`Unknown command: ${options.command}`);
  }

  if (!VALID_TOOLS.has(options.tool)) {
    throw new Error("--tool must be one of: codex, claude, all");
  }

  if (!VALID_SCOPES.has(options.scope)) {
    throw new Error("--scope must be one of: user, project, local");
  }

  return options;
}

function requireValue(args, index, flag) {
  const value = args[index + 1];

  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }

  return value;
}

export function printHelp(write = console.log) {
  write(`Usage:
  pds install [--tool codex|claude|all] [--repo owner/repo] [--ref ref] [--scope user|project|local] [--dry-run]

Examples:
  npx @pds/cli@latest install
  npx @pds/cli@latest install --tool codex
  pds install --tool claude --scope user --dry-run

Installs the PDS agent plugin for available coding agents. Codex config changes
are backed up before writing. Dry runs print commands and config edits without
mutating files or tool configuration.`);
}

export function runInstall(options, dependencies = {}) {
  const env = dependencies.env ?? process.env;
  const spawn = dependencies.spawnSync ?? spawnSync;
  const now = dependencies.now ?? (() => new Date());
  const io = createIo(dependencies.io);
  const tools = options.tool === "all" ? ["codex", "claude"] : [options.tool];
  const requestedAll = options.tool === "all";
  let installed = 0;
  let failed = 0;

  if (options.dryRun) {
    io.write("Dry run: no files or tool configuration will be changed.");
  }

  for (const tool of tools) {
    if (!options.dryRun && !isCommandAvailable(tool, spawn, env)) {
      const message = `${tool} CLI was not found.`;

      if (requestedAll) {
        io.write(`${message} Skipping ${tool}.`);
        continue;
      }

      io.error(message);
      failed += 1;
      continue;
    }

    if (tool === "codex") {
      installCodex(options, { env, io, now, spawn });
      installed += 1;
      continue;
    }

    if (tool === "claude") {
      installClaude(options, { env, io, spawn });
      installed += 1;
    }
  }

  if (failed > 0) {
    return 1;
  }

  if (installed === 0) {
    io.error("No supported coding agent CLI was found. Install Codex or Claude, then rerun this command.");
    return 1;
  }

  io.write("");
  io.write("PDS plugin install steps completed.");
  io.write("Restart Codex or Claude, then run /pds:help in a React project.");
  return 0;
}

function installCodex(options, { env, io, now, spawn }) {
  io.write("");
  io.write("Codex");
  runCommand(
    "codex",
    [
      "plugin",
      "marketplace",
      "add",
      options.repo,
      ...(isLocalMarketplaceSource(options.repo) ? [] : ["--ref", options.ref])
    ],
    { dryRun: options.dryRun, env, io, spawn }
  );
  runCommand("codex", ["plugin", "add", NEW_CODEX_PLUGIN], {
    dryRun: options.dryRun,
    env,
    io,
    spawn
  });
  updateCodexConfig({
    dryRun: options.dryRun,
    env,
    io,
    now
  });
}

function installClaude(options, { env, io, spawn }) {
  io.write("");
  io.write("Claude");
  runCommand(
    "claude",
    ["plugin", "marketplace", "add", options.repo, "--scope", options.scope],
    { dryRun: options.dryRun, env, io, spawn }
  );
  runCommand(
    "claude",
    ["plugin", "install", "pds@pds", "--scope", options.scope],
    { dryRun: options.dryRun, env, io, spawn }
  );
}

function runCommand(command, args, { dryRun, env, io, spawn }) {
  io.write(`$ ${formatCommand(command, args)}`);

  if (dryRun) {
    return;
  }

  const result = spawn(command, args, {
    encoding: "utf8",
    env,
    stdio: "pipe"
  });

  if (result.stdout) {
    io.write(result.stdout.trimEnd());
  }

  if (result.status === 0) {
    if (result.stderr) {
      io.error(result.stderr.trimEnd());
    }
    return;
  }

  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;

  if (/already|exists/i.test(output)) {
    io.write(`${command} reports this marketplace or plugin already exists; continuing.`);
    return;
  }

  if (result.stderr) {
    io.error(result.stderr.trimEnd());
  }

  throw new Error(`Command failed: ${formatCommand(command, args)}`);
}

function isCommandAvailable(command, spawn, env) {
  const result = spawn(command, ["--version"], {
    env,
    stdio: "ignore"
  });

  return result.status === 0;
}

function isLocalMarketplaceSource(source) {
  return (
    source.startsWith("/") ||
    source.startsWith("./") ||
    source.startsWith("../") ||
    source === "." ||
    source === ".." ||
    /^[A-Za-z]:[\\/]/.test(source)
  );
}

export function resolveCodexConfigPath(env = process.env) {
  if (env.CODEX_HOME) {
    return path.join(env.CODEX_HOME, "config.toml");
  }

  return path.join(env.HOME || homedir(), ".codex", "config.toml");
}

function updateCodexConfig({ dryRun, env, io, now }) {
  const configPath = resolveCodexConfigPath(env);
  const source = existsSync(configPath) ? readFileSync(configPath, "utf8") : "";
  const update = updateCodexConfigSource(source);

  if (dryRun) {
    io.write(`Would update ${configPath}`);
    io.write(`+ [plugins."${NEW_CODEX_PLUGIN}"] enabled = true`);

    if (update.legacyDisabled) {
      io.write(`~ [plugins."${LEGACY_CODEX_PLUGIN}"] enabled = false`);
    }

    return;
  }

  if (!update.changed) {
    io.write(`Codex config already enables ${NEW_CODEX_PLUGIN}.`);
    return;
  }

  mkdirSync(path.dirname(configPath), { recursive: true });

  if (existsSync(configPath)) {
    const backupPath = `${configPath}.backup-${formatTimestamp(now())}`;
    copyFileSync(configPath, backupPath);
    io.write(`Backed up Codex config to ${backupPath}`);
  }

  writeFileSync(configPath, update.source, "utf8");
  io.write(`Updated Codex config at ${configPath}`);

  if (update.legacyDisabled) {
    io.write(`Disabled legacy ${LEGACY_CODEX_PLUGIN} entry.`);
  }
}

export function updateCodexConfigSource(source) {
  const legacyWasEnabled = getPluginEnabled(source, LEGACY_CODEX_PLUGIN) === true;
  let next = setPluginEnabled(source, NEW_CODEX_PLUGIN, true);

  if (legacyWasEnabled) {
    next = setPluginEnabled(next, LEGACY_CODEX_PLUGIN, false);
  }

  return {
    changed: normalizeToml(source) !== next,
    legacyDisabled: legacyWasEnabled,
    source: next
  };
}

export function getPluginEnabled(source, pluginName) {
  const lines = normalizeToml(source).split("\n");
  let inSection = false;

  for (const line of lines) {
    const section = /^\s*\[plugins\."([^"]+)"\]\s*$/.exec(line);

    if (section) {
      inSection = section[1] === pluginName;
      continue;
    }

    if (/^\s*\[/.test(line)) {
      inSection = false;
      continue;
    }

    if (inSection) {
      const enabled = /^\s*enabled\s*=\s*(true|false)\s*$/i.exec(line);

      if (enabled) {
        return enabled[1].toLowerCase() === "true";
      }
    }
  }

  return undefined;
}

export function setPluginEnabled(source, pluginName, enabled) {
  const normalized = normalizeToml(source).trimEnd();
  const lines = normalized ? normalized.split("\n") : [];
  const sectionHeader = `[plugins."${pluginName}"]`;
  const sectionPattern = new RegExp(`^\\s*\\[plugins\\."${escapeRegExp(pluginName)}"\\]\\s*$`);
  const enabledLine = `enabled = ${enabled ? "true" : "false"}`;
  let sectionStart = -1;
  let sectionEnd = lines.length;

  for (let index = 0; index < lines.length; index += 1) {
    if (sectionPattern.test(lines[index])) {
      sectionStart = index;
      continue;
    }

    if (sectionStart !== -1 && index > sectionStart && /^\s*\[/.test(lines[index])) {
      sectionEnd = index;
      break;
    }
  }

  if (sectionStart === -1) {
    if (lines.length > 0 && lines[lines.length - 1] !== "") {
      lines.push("");
    }

    lines.push(sectionHeader, enabledLine);
    return `${lines.join("\n")}\n`;
  }

  for (let index = sectionStart + 1; index < sectionEnd; index += 1) {
    if (/^\s*enabled\s*=/.test(lines[index])) {
      lines[index] = enabledLine;
      return `${lines.join("\n")}\n`;
    }
  }

  lines.splice(sectionStart + 1, 0, enabledLine);
  return `${lines.join("\n")}\n`;
}

function normalizeToml(source) {
  return source.replace(/\r\n/g, "\n");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function formatTimestamp(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function formatCommand(command, args) {
  return [command, ...args].map(shellQuote).join(" ");
}

function shellQuote(value) {
  if (/^[A-Za-z0-9_./:@%+=,-]+$/.test(value)) {
    return value;
  }

  return `'${value.replaceAll("'", "'\\''")}'`;
}

function createIo(io) {
  if (io) {
    return io;
  }

  return {
    error: (message) => console.error(message),
    write: (message) => console.log(message)
  };
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));

    if (options.help) {
      printHelp();
      return;
    }

    process.exitCode = runInstall(options);
  } catch (error) {
    console.error(error.message);
    console.error("");
    printHelp(console.error);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
