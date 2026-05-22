export const tokenPackageName = "@pds/tokens";
export const tokenPrefix = "--pds-";
export const tokenStyleSheet = "styles.css";
export const tokenScopedStyleSheets = [
  "colour.css",
  "elevation.css",
  "layout.css",
  "motion.css",
  "spacing.css",
  "typography.css"
] as const;
export const tokenStyleSheets = [
  tokenStyleSheet,
  ...tokenScopedStyleSheets
] as const;
