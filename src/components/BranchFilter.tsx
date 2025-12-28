import type { Religion } from "../data/religions";

interface BranchFilterProps {
  branches: string[];
  hiddenBranches: Set<string>;
  onToggle: (branchId: string) => void;
  religions: Religion[];
}

export function BranchFilter({
  branches,
  hiddenBranches,
  onToggle,
  religions,
}: BranchFilterProps) {
  return (
    <div className="branch-filter">
      <span className="filter-label">Show branches:</span>
      <div className="filter-buttons">
        {branches.map((branchId) => {
          const religion = religions.find((r) => r.id === branchId);
          if (!religion) return null;

          const isVisible = !hiddenBranches.has(branchId);

          return (
            <button
              key={branchId}
              className={`filter-button ${isVisible ? "active" : ""}`}
              onClick={() => onToggle(branchId)}
              style={{
                borderColor: religion.color,
                backgroundColor: isVisible ? religion.color : "transparent",
              }}
            >
              <span
                className="filter-dot"
                style={{ backgroundColor: religion.color }}
              />
              {religion.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
