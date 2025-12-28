# Religion Evolution Explorer - Specs & Features

## Vision
An interactive PWA that visualizes how religious ideas and traditions evolved, forked, and diverged over time. Focus on the Abrahamic religions with key concept comparisons.

## Live Demo
https://idvorkin-religion-evolution.surge.sh

## Current Features

### v0.1 - Initial Scaffold
- [x] Project setup with React + TypeScript + Vite
- [x] D3.js for visualizations
- [x] PWA support
- [x] Basic religion tree data model
- [x] Timeline visualization
- [x] Concept comparison grid (hell, forgiveness, salvation, afterlife)

## Planned Features

### v0.2 - Enhanced Visualization
- [ ] Interactive zoom on timeline
- [ ] Click to expand/collapse branches
- [ ] Relative size indicators (adherent population)
- [ ] Smooth animations on state changes

### v0.3 - Concept Deep Dive
- [ ] Add more concepts (prayer, scripture, clergy, rituals)
- [ ] Sources/citations for claims
- [ ] Side-by-side comparison mode
- [ ] Search/filter by concept

### v0.4 - Extended Coverage
- [ ] Add more Christian denominations (Anglican, Methodist, etc.)
- [ ] Add Islamic branches (Sunni, Shia, Sufi)
- [ ] Add Jewish movements (Orthodox, Reform, Conservative)
- [ ] Bahá'í and other Abrahamic offshoots

### v0.5 - Polish
- [ ] Mobile-optimized UI
- [ ] Dark mode
- [ ] Share specific views
- [ ] Embed mode for other sites

## Data Model

### Religion Node
```typescript
interface Religion {
  id: string;
  name: string;
  parentId: string | null;
  foundedYear: number;  // negative for BCE
  founder?: string;
  adherents?: number;   // current estimate
  concepts: Record<ConceptId, ConceptView>;
}
```

### Concept
```typescript
interface Concept {
  id: string;
  name: string;
  description: string;
}

interface ConceptView {
  summary: string;      // Brief description of this religion's view
  details?: string;     // Longer explanation
  sources?: string[];   // Citations
}
```

## Key Concepts Tracked

1. **Hell** - Nature of punishment/afterlife
2. **Forgiveness** - How sins are forgiven
3. **Salvation** - How one achieves salvation/liberation
4. **Afterlife** - What happens after death
5. **Scripture** - Sacred texts and their authority
6. **Messiah** - Beliefs about messiah/savior figure

## Tech Stack
- React 18 + TypeScript
- Vite (build tool)
- D3.js (visualizations)
- PWA (vite-plugin-pwa)
- CSS Modules or vanilla CSS
- Deployed to Surge.sh

## Design Principles
1. **Visual-first**: Let the graphics tell the story
2. **Progressive disclosure**: Simple overview → detailed drill-down
3. **Neutral tone**: Present facts, not judgments
4. **Mobile-friendly**: Works on phones and tablets
5. **Fast**: Under 3s initial load, instant interactions
