# MicroSim Generation Log: Marginal Analysis Calculator

## Timestamps
- **Start:** 2026-02-04 00:15:10
- **End:** 2026-02-04 00:18:11
- **Duration:** ~3 minutes

## Specification

| Field | Value |
|-------|-------|
| **Type** | MicroSim |
| **Name** | marginal-analysis-calculator |
| **Purpose** | Calculate and interpret marginal cost, revenue, and profit for economic decision-making |
| **Learning Objective** | Students will calculate and interpret marginal cost, revenue, and profit for economic decision-making (Bloom Level 3: Apply) |
| **Bloom Taxonomy** | Level 3: Apply |
| **Bloom Verbs** | calculate, interpret, apply |
| **Implementation** | p5.js with canvas-based controls |

## Files Generated

| File | Size | Description |
|------|------|-------------|
| `script.js` | ~13 KB | p5.js visualization with canvas-based controls |
| `main.html` | ~0.5 KB | Standalone HTML wrapper |
| `index.md` | ~6 KB | MkDocs lesson plan with Delta moments |
| `metadata.json` | ~2.5 KB | Dublin Core metadata for faceted search |

## Features Implemented

### Visual Elements
- [x] Three graphs stacked vertically: Cost, Revenue, and Profit functions
- [x] Tangent lines showing marginal values at selected production level
- [x] Numerical display: MC, MR, MP values with units ($/unit)
- [x] Profit zone highlighted (green shading where R > C)
- [x] Optimal production point marked (star marker)
- [x] Break-even points marked (circles on profit zero-line)

### Interactive Controls
- [x] Slider: production level x (0 to 1000 units)
- [x] Toggle: "Show Both" / "Marginals" / "Totals" display modes
- [x] Button: "Find Optimal" - animates to profit-maximizing point
- [x] Display: Break-even points, maximum profit point in info panel

### Behavior
- [x] Tangent lines update as production level changes
- [x] Marginal values calculated and displayed in real-time
- [x] Visual indication when MC = MR (optimal point indicator)
- [x] Profit function changes color based on profitability (green/red)
- [x] Decision indicator (produce more/less/optimal)

## Technical Notes

### Mathematical Models
- **Cost function:** C(x) = 0.00005x^2 + 0.02x + 500 (quadratic with fixed costs)
- **Revenue function:** R(x) = 0.15x - 0.00003x^2 (diminishing marginal revenue)
- **Profit function:** P(x) = R(x) - C(x)

### Derivatives (Marginal Functions)
- MC = 2(0.00005)x + 0.02
- MR = 0.15 - 2(0.00003)x
- MP = MR - MC

### Key Calculations
- Optimal production found by solving MC = MR algebraically
- Break-even points found using quadratic formula on P(x) = 0

### Canvas-Based Controls
Following CLAUDE.md guidelines, all controls are implemented using:
- `rect()`, `text()`, `circle()` for drawing
- `mousePressed()`, `mouseDragged()`, `mouseReleased()` for interaction
- No p5.js DOM functions (createButton, createSlider, etc.)

## Quality Checklist

- [x] `updateCanvasSize()` called as first step in `setup()`
- [x] Canvas-based controls (no DOM functions)
- [x] Responsive width design
- [x] Title and subtitle with chartTop = 50 to prevent overlap
- [x] Delta moments in lesson plan (2 quotes)
- [x] Fun, encouraging tone appropriate for high school students
- [x] References to Wikipedia and educational resources
- [x] Assessment questions aligned with learning objectives
- [x] Embedding code snippet provided

## Output Location

```
/Users/dan/Documents/ws/calculus/docs/sims/marginal-analysis-calculator/
├── script.js
├── main.html
├── index.md
└── metadata.json
```

## Next Steps

1. Run `~/.local/bin/bk-capture-screenshot /Users/dan/Documents/ws/calculus/docs/sims/marginal-analysis-calculator` to capture screenimage.png
2. Add MicroSim to chapter navigation in mkdocs.yml if needed
3. Test locally with `mkdocs serve`
