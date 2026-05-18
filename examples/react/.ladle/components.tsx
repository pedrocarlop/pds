import type { GlobalProvider } from "@ladle/react";

import "@pds/react/styles.css";
import "../src/stories/visual-lab.css";

export const Provider: GlobalProvider = ({ children }) => children;
