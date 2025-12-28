import type { Religion } from "../data/religions";
import { concepts } from "../data/religions";

interface ConceptGridProps {
  religions: Religion[];
  selectedReligion: Religion | null;
  onSelectReligion: (religion: Religion) => void;
}

export function ConceptGrid({
  religions,
  selectedReligion,
  onSelectReligion,
}: ConceptGridProps) {
  // Dynamic grid columns based on number of religions
  const gridColumns = `200px repeat(${religions.length}, minmax(140px, 1fr))`;

  return (
    <div className="concept-grid-container">
      <h2 className="concept-grid-title">Concept Comparison</h2>
      <p className="concept-grid-subtitle">
        How key theological concepts differ across traditions ({religions.length} shown)
      </p>

      <div className="concept-grid">
        {/* Header row with religion names */}
        <div className="grid-header" style={{ gridTemplateColumns: gridColumns }}>
          <div className="concept-label-header">Concept</div>
          {religions.map((religion) => (
            <div
              key={religion.id}
              className={`religion-header ${
                selectedReligion?.id === religion.id ? "selected" : ""
              }`}
              style={{ borderColor: religion.color }}
              onClick={() => onSelectReligion(religion)}
            >
              <span
                className="religion-dot"
                style={{ background: religion.color }}
              />
              {religion.name}
            </div>
          ))}
        </div>

        {/* Concept rows */}
        {concepts.map((concept) => (
          <div key={concept.id} className="concept-row" style={{ gridTemplateColumns: gridColumns }}>
            <div className="concept-label">
              <span className="concept-icon">{concept.icon}</span>
              <div>
                <div className="concept-name">{concept.name}</div>
                <div className="concept-description">{concept.description}</div>
              </div>
            </div>

            {religions.map((religion) => {
              const view = religion.concepts[concept.id];
              return (
                <div
                  key={religion.id}
                  className={`concept-cell ${
                    selectedReligion?.id === religion.id ? "selected" : ""
                  }`}
                  style={{
                    borderLeftColor: religion.color,
                  }}
                >
                  {view?.summary || "—"}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
