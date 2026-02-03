# Session Log: Learning Graph Viewer Installation

**Date:** 2026-02-03
**Skill:** book-installer > learning-graph-viewer
**Project:** AP Calculus Intelligent Textbook

---

## Request

Install an interactive learning graph viewer for the AP Calculus textbook.

## Prerequisites Verified

- `docs/learning-graph/learning-graph.json` exists (62KB, 380 nodes, 538 edges)
- MkDocs project structure in place
- mkdocs.yml configured

## Actions Taken

### Step 1: Created Directory Structure

```bash
mkdir -p docs/sims/graph-viewer
```

### Step 2: Created Viewer Files

| File | Size | Description |
|------|------|-------------|
| `main.html` | 2KB | Main HTML application with sidebar layout |
| `local.css` | 7KB | Complete styling for sidebar, search, legend, stats |
| `script.js` | 12KB | vis-network visualization logic |
| `index.md` | 2KB | Documentation page with iframe embed |

### Step 3: Updated mkdocs.yml Navigation

Added graph viewer to MicroSims section:

```yaml
- MicroSims:
  - List of MicroSims: sims/index.md
  - Graph Viewer: sims/graph-viewer/index.md
```

### Step 4: Fixed classifierName Values in JSON

Updated `learning-graph.json` groups section to use human-readable names:

| TaxonomyID | Before | After |
|------------|--------|-------|
| LIMIT | "LIMIT" | "Limits" |
| CONT | "CONT" | "Continuity" |
| ASYM | "ASYM" | "Asymptotes & End Behavior" |
| DERIV | "DERIV" | "Derivative Basics" |
| DRULE | "DRULE" | "Derivative Rules" |
| CHAIN | "CHAIN" | "Chain Rule" |
| IMPL | "IMPL" | "Implicit & Inverse" |
| HIGH | "HIGH" | "Higher-Order Derivatives" |
| APPL | "Applied" | "Applications" |
| ANAL | "ANAL" | "Analytical Tools" |
| CURV | "CURV" | "Curve Sketching" |
| OPT | "OPT" | "Optimization" |
| INTEG | "INTEG" | "Integration Basics" |
| RIEM | "RIEM" | "Riemann Sums" |
| FTC | "FTC" | "Fundamental Theorem" |
| TECH | "TECH" | "Integration Techniques" |

## Files Created

```
docs/sims/graph-viewer/
├── main.html      # Main application HTML
├── script.js      # JavaScript visualization logic
├── local.css      # Styling for viewer
└── index.md       # Documentation with iframe
```

## Viewer Features

### Search Functionality
- Type-ahead search with dropdown results
- Shows category badge for each matching concept
- Clicking result focuses and selects the node

### Category Filtering
- Sidebar legend with color-coded checkboxes
- "Check All" and "Uncheck All" bulk operations
- Real-time filtering updates graph visibility

### Statistics Panel
- Visible node count
- Visible edge count
- Foundational concept count

### Interactive Visualization
- vis-network with forceAtlas2Based physics
- Auto-stops physics after 5 seconds
- Re-enables physics when dragging nodes
- Node highlight on selection (dims unconnected nodes)
- Collapsible sidebar for expanded viewing

## Technical Details

### Dependencies
- vis-network.js (CDN: unpkg.com)
- No build step required

### Data Path
- Script loads from: `../../learning-graph/learning-graph.json`
- Relative path from `docs/sims/graph-viewer/` to `docs/learning-graph/`

### Physics Configuration
```javascript
physics: {
    solver: 'forceAtlas2Based',
    forceAtlas2Based: {
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springLength: 100,
        springConstant: 0.08,
        damping: 0.4,
        avoidOverlap: 0.5
    }
}
```

## Testing Instructions

1. Run `mkdocs serve` (if not already running)
2. Navigate to: `http://127.0.0.1:8000/calculus/sims/graph-viewer/main.html`
3. Or via navigation: MicroSims > Graph Viewer

## Graph Statistics

| Metric | Value |
|--------|-------|
| Total Concepts | 380 |
| Total Edges | 538 |
| Foundational Concepts | 2 |
| Taxonomy Categories | 17 |

---

*Session completed successfully*
