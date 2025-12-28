import type { Religion } from "../data/religions";
import { concepts, religions, getAncestors } from "../data/religions";

interface ReligionDetailProps {
  religion: Religion;
  onClose: () => void;
}

export function ReligionDetail({ religion, onClose }: ReligionDetailProps) {
  const ancestors = getAncestors(religion.id, religions);

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
        <h3>Beliefs & Concepts</h3>
        {concepts.map((concept) => {
          const view = religion.concepts[concept.id];
          if (!view) return null;

          return (
            <div key={concept.id} className="detail-concept">
              <div className="detail-concept-header">
                <span className="concept-icon">{concept.icon}</span>
                <span className="concept-name">{concept.name}</span>
              </div>
              <div className="detail-concept-summary">{view.summary}</div>
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
