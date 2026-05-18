import type { ReactNode } from "react";

export type StorySurface = "grouped" | "base" | "nested" | "elevated";

export const surfaceArgTypes = {
  surface: {
    control: { type: "select" },
    options: ["grouped", "base", "nested", "elevated"]
  }
} as const;

interface StoryFrameProps {
  children: ReactNode;
  description?: ReactNode;
  surface?: StorySurface;
  title: string;
}

interface MatrixItemProps {
  children: ReactNode;
  label: string;
  note?: ReactNode;
}

export function StoryFrame({
  children,
  description,
  surface = "grouped",
  title
}: StoryFrameProps) {
  return (
    <section className="visual-lab-shell" data-surface={surface}>
      <header className="visual-lab-header">
        <p className="visual-lab-kicker">PDS Visual Lab</p>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </header>
      {children}
    </section>
  );
}

export function StateMatrix({ children }: { children: ReactNode }) {
  return <div className="visual-lab-grid">{children}</div>;
}

export function MatrixItem({ children, label, note }: MatrixItemProps) {
  return (
    <article className="visual-lab-panel">
      <header className="visual-lab-panel-header">
        <h2>{label}</h2>
        {note ? <p>{note}</p> : null}
      </header>
      <div className="visual-lab-panel-body">{children}</div>
    </article>
  );
}

export function NarrowFrame({ children }: { children: ReactNode }) {
  return <div className="visual-lab-narrow">{children}</div>;
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="visual-lab-row">{children}</div>;
}

export function Stack({ children }: { children: ReactNode }) {
  return <div className="visual-lab-stack">{children}</div>;
}

export function Field({
  children,
  label
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <label className="visual-lab-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export const longLabel =
  "Generate a detailed implementation summary for international reviewers with enough context to approve the change without hidden follow-up.";

export const longBody =
  "The generated UI should stay readable with translated copy, longer user-provided labels, compact panes, zoomed text, and nested product surfaces without hiding required actions or state feedback.";
