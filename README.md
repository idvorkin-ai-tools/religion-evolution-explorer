# Religion Evolution Explorer

An interactive visualization exploring how major world religions evolved and branched over time, comparing their core beliefs and concepts.

## Live Demo

[religion-evolution-explorer.surge.sh](https://religion-evolution-explorer.surge.sh)

## Features

- **Interactive Timeline**: D3-powered visualization with pan/zoom, showing religion lineages
- **Branch Filtering**: Filter by Judaism, Christianity, or Islam branches
- **Concept Comparison**: See how beliefs changed when religions branched
- **Sibling Comparisons**: Compare beliefs across sibling religions (same parent)
- **Fork Explanations**: Understand why each religion branched from its parent
- **PWA Support**: Installable as a progressive web app

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project deploys to [Surge.sh](https://surge.sh) via GitHub Actions.

### Setup

1. **Create a Surge account** and get your token:
   ```bash
   npx surge token
   ```

2. **Configure GitHub repository**:

   **Secret** (sensitive, hidden in logs):
   ```bash
   gh secret set SURGE_TOKEN --repo YOUR_ORG/YOUR_REPO --body "your-surge-token"
   ```

   **Variable** (non-sensitive, visible in logs for debugging):
   ```bash
   gh variable set SURGE_DOMAIN --repo YOUR_ORG/YOUR_REPO --body "your-app.surge.sh"
   ```

### Why use variables for domains?

Use `vars.SURGE_DOMAIN` instead of `secrets.SURGE_DOMAIN` because:

- **Visibility**: Domain names aren't sensitive - seeing them in logs helps debug deployment issues
- **Debugging**: When deployments fail, you can verify the correct domain was used
- **Transparency**: Team members can see where the app deploys without needing secrets access

Reserve `secrets.*` for truly sensitive values like tokens and API keys.

### Workflow Structure

- **build.yml**: Builds and tests on push/PR, uploads artifacts
- **deploy-surge.yml**: Downloads artifacts and deploys to Surge
  - Main branch → production domain
  - Pull requests → preview domains (`pr-{number}-{domain}`)
  - PR close → tears down preview

## Tech Stack

- React 19 + TypeScript
- Vite
- D3.js for timeline visualization
- GitHub Actions for CI/CD
- Surge.sh for hosting

## License

MIT
