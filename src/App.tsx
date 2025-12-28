import { useState } from "react";
import { Timeline } from "./components/Timeline";
import { ConceptGrid } from "./components/ConceptGrid";
import { ReligionDetail } from "./components/ReligionDetail";
import type { Religion } from "./data/religions";
import { religions } from "./data/religions";
import "./App.css";

function App() {
  const [selectedReligion, setSelectedReligion] = useState<Religion | null>(
    null
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Religion Evolution Explorer</h1>
        <p>
          Trace how religious ideas diverged and evolved across the Abrahamic
          traditions
        </p>
      </header>

      <main className="app-main">
        <section className="timeline-section">
          <Timeline
            onSelectReligion={setSelectedReligion}
            selectedReligion={selectedReligion}
          />
        </section>

        {selectedReligion && (
          <section className="detail-section">
            <ReligionDetail
              religion={selectedReligion}
              onClose={() => setSelectedReligion(null)}
            />
          </section>
        )}

        <section className="concept-section">
          <ConceptGrid
            religions={religions}
            selectedReligion={selectedReligion}
            onSelectReligion={setSelectedReligion}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Data sourced from academic religious studies. This is an educational
          tool for comparative religion.
        </p>
        <p>
          <a
            href="https://github.com/idvorkin/religion-evolution-explorer"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
