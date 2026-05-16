import { AgentSurfaceSection } from "./sections/AgentSurfaceSection";
import { AvatarsSection } from "./sections/AvatarsSection";
import { BadgesSection } from "./sections/BadgesSection";
import { BottomSheetsSection } from "./sections/BottomSheetsSection";
import { ButtonsSection } from "./sections/ButtonsSection";
import { DialogsSection } from "./sections/DialogsSection";
import { FieldsSection } from "./sections/FieldsSection";
import { SurfacesSection } from "./sections/SurfacesSection";
import { TooltipsSection } from "./sections/TooltipsSection";
import { ToastsSection } from "./sections/ToastsSection";

export function App() {
  return (
    <main className="examples-page">
      <header className="examples-hero">
        <p className="examples-kicker">PDS React examples</p>
        <h1>Starter primitives in real browser states</h1>
        <p>
          A lightweight private consumer app for checking the existing starter
          primitives against PDS tokens and content resilience expectations.
        </p>
      </header>

      <div className="examples-stack">
        <AgentSurfaceSection />
        <ButtonsSection />
        <BadgesSection />
        <FieldsSection />
        <SurfacesSection />
        <AvatarsSection />
        <TooltipsSection />
        <DialogsSection />
        <BottomSheetsSection />
        <ToastsSection />
      </div>
    </main>
  );
}
