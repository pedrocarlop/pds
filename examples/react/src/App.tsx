import { AvatarsSection } from "./sections/AvatarsSection";
import { BadgesSection } from "./sections/BadgesSection";
import { BottomSheetsSection } from "./sections/BottomSheetsSection";
import { ButtonsSection } from "./sections/ButtonsSection";
import { CellsSection } from "./sections/CellsSection";
import { DialogsSection } from "./sections/DialogsSection";
import { FieldsSection } from "./sections/FieldsSection";
import { ProductSurfacesSection } from "./sections/ProductSurfacesSection";
import { SurfacesSection } from "./sections/SurfacesSection";
import { TooltipsSection } from "./sections/TooltipsSection";
import { ToastsSection } from "./sections/ToastsSection";

export function App() {
  return (
    <main className="examples-page">
      <header className="examples-hero">
        <p className="examples-kicker">PDS React examples</p>
        <h1>Reference surfaces for agent-facing products</h1>
        <p>
          A lightweight private consumer app that proves PDS can compose real
          product surfaces before expanding the component API.
        </p>
      </header>

      <div className="examples-stack">
        <ProductSurfacesSection />

        <section className="examples-section" aria-labelledby="primitive-checks-title">
          <div className="examples-section-heading">
            <h2 id="primitive-checks-title">Primitive checks</h2>
            <p>
              Smaller component states remain available as secondary browser
              validation for the published React package.
            </p>
          </div>

          <div className="examples-stack">
            <ButtonsSection />
            <CellsSection />
            <BadgesSection />
            <FieldsSection />
            <SurfacesSection />
            <AvatarsSection />
            <TooltipsSection />
            <DialogsSection />
            <BottomSheetsSection />
            <ToastsSection />
          </div>
        </section>
      </div>
    </main>
  );
}
