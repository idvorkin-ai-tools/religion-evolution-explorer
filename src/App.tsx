import { useState } from "react";
import { Timeline } from "./components/Timeline";
import { ConceptGrid } from "./components/ConceptGrid";
import { ReligionDetail } from "./components/ReligionDetail";
import { BranchFilter } from "./components/BranchFilter";
import type { Religion } from "./data/religions";
import { religions } from "./data/religions";
import "./App.css";

// Root branches that can be filtered
const ROOT_BRANCHES = ["judaism", "christianity", "islam"] as const;

function App() {
  const [selectedReligion, setSelectedReligion] = useState<Religion | null>(
    null
  );
  const [hiddenBranches, setHiddenBranches] = useState<Set<string>>(
    () => new Set(["islam"]) // Hide Islam by default to focus on Jewish/Christian first
  );

  const toggleBranch = (branchId: string) => {
    setHiddenBranches((prev) => {
      const next = new Set(prev);
      if (next.has(branchId)) {
        next.delete(branchId);
      } else {
        next.add(branchId);
      }
      return next;
    });
  };

  // Filter religions based on hidden branches
  // Root branches are independently toggleable - hiding one doesn't hide others
  const visibleReligions = religions.filter((r) => {
    let current: Religion | undefined = r;
    while (current) {
      if (hiddenBranches.has(current.id)) {
        return false;
      }
      // Stop at root branches - they're independent trees
      if (ROOT_BRANCHES.includes(current.id as typeof ROOT_BRANCHES[number])) {
        break;
      }
      current = religions.find((p) => p.id === current?.parentId);
    }
    return true;
  });

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
        <section className="filter-section">
          <BranchFilter
            branches={ROOT_BRANCHES as unknown as string[]}
            hiddenBranches={hiddenBranches}
            onToggle={toggleBranch}
            religions={religions}
          />
        </section>

        <section className="timeline-section">
          <Timeline
            onSelectReligion={setSelectedReligion}
            selectedReligion={selectedReligion}
            hiddenBranches={hiddenBranches}
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
            religions={visibleReligions}
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
