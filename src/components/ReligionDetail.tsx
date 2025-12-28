import type { Religion } from "../data/religions";
import { concepts, religions, getAncestors } from "../data/religions";

interface ReligionDetailProps {
  religion: Religion;
  onClose: () => void;
}

// Simple similarity check - are two summaries substantially different?
function isDifferent(a: string | undefined, b: string | undefined): boolean {
  if (!a || !b) return true;
  // Normalize and compare
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalize(a) !== normalize(b);
}

export function ReligionDetail({ religion, onClose }: ReligionDetailProps) {
  const ancestors = getAncestors(religion.id, religions);
  const parent = religion.parentId
    ? religions.find((r) => r.id === religion.parentId)
    : null;

  return (
    <div className="religion-detail">
      <button className="close-button" onClick={onClose}>
        ✕
      </button>

      <div className="detail-header" style={{ borderColor: religion.color }}>
        <h2>{religion.name}</h2>
        <div className="detail-meta">
          {religion.foundedYear < 0
            ? `Founded ~${Math.abs(religion.foundedYear)} BCE`
            : `Founded ${religion.foundedYear} CE`}
          {religion.founder && ` • ${religion.founder}`}
          {religion.adherents && ` • ~${religion.adherents}M adherents`}
        </div>

        {ancestors.length > 0 && (
          <div className="lineage">
            <span className="lineage-label">Lineage:</span>
            {ancestors.map((a, i) => (
              <span key={a.id}>
                <span className="lineage-item" style={{ color: a.color }}>
                  {a.name}
                </span>
                {i < ancestors.length - 1 && " → "}
              </span>
            ))}
            <span> → </span>
            <span className="lineage-item current" style={{ color: religion.color }}>
              {religion.name}
            </span>
          </div>
        )}
      </div>

      <div className="detail-concepts">
        <h3>
          Beliefs & Concepts
          {parent && (
            <span className="comparison-note">
              {" "}— compared to <span style={{ color: parent.color }}>{parent.name}</span>
            </span>
          )}
        </h3>
        {concepts.map((concept) => {
          const view = religion.concepts[concept.id];
          const parentView = parent?.concepts[concept.id];
          const changed = parent && isDifferent(view?.summary, parentView?.summary);

          if (!view) return null;

          return (
            <div
              key={concept.id}
              className={`detail-concept ${changed ? "concept-changed" : ""}`}
            >
              <div className="detail-concept-header">
                <span className="concept-icon">{concept.icon}</span>
                <span className="concept-name">{concept.name}</span>
                {changed && <span className="change-badge">Changed</span>}
              </div>
              <div className="detail-concept-summary">{view.summary}</div>
              {changed && parentView && (
                <div className="parent-comparison">
                  <span className="parent-label" style={{ color: parent.color }}>
                    ↑ {parent.name}:
                  </span>{" "}
                  {parentView.summary}
                </div>
              )}
              {view.details && (
                <div className="detail-concept-details">{view.details}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
