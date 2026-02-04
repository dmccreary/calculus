# L'Hospital's Rule Visualizer MicroSim Generation Log

## Generation Metadata

| Field | Value |
|-------|-------|
| Start Time | 2026-02-04 00:15:09 |
| End Time | 2026-02-04 00:18:24 |
| Duration | ~3 minutes |
| Model | Claude Opus 4.5 |
| Status | Complete |

## Specification

- **Name:** lhospitals-rule-visualizer
- **Type:** MicroSim
- **Library:** p5.js with canvas-based controls
- **Purpose:** Illustrate how L'Hospital's Rule transforms indeterminate limits by comparing the original ratio with the ratio of derivatives
- **Learning Objective:** Students will illustrate how L'Hospital's Rule transforms indeterminate limits by comparing the original ratio with the ratio of derivatives (Bloom Level 2: Understand)
- **Bloom Taxonomy Verbs:** illustrate, demonstrate, understand

## Files Generated

| File | Description | Lines |
|------|-------------|-------|
| `lhospitals-rule-visualizer.js` | Main p5.js script with canvas-based controls | ~580 lines |
| `main.html` | Standalone HTML file | 24 lines |
| `index.md` | MkDocs documentation page with lesson plan | ~160 lines |
| `metadata.json` | Dublin Core metadata for faceted search | 20 lines |

## Features Implemented

### Visual Elements
- [x] Split display showing f(x)/g(x) on top and f'(x)/g'(x) on bottom
- [x] Both functions plotted on coordinate planes with grid
- [x] Point approaching the target x-value with real-time ratio calculation
- [x] Side-by-side numerical display showing "Original ratio" and "Derivative ratio"
- [x] Green highlighting showing when both ratios approach the same limit
- [x] Connection indicator with arrows showing same limit convergence
- [x] Hole visualization on original ratio graph at target point

### Interactive Controls (Canvas-Based)
- [x] Example selector cycling through 4 examples: "sin(x)/x", "(e^x - 1)/x", "(x^2 - 4)/(x - 2)", "(x^3 - 1)/(x - 1)"
- [x] X-value slider approaching target with visual target marker
- [x] Toggle buttons: "Both" / "Original" / "Derivatives" view modes
- [x] "Animate" button with automatic approach animation
- [x] Real-time info panel with current values

### Behavior
- [x] As x approaches target, both ratios converge to the same limit
- [x] Visual evidence that derivatives "resolve" the indeterminate form
- [x] Derivative ratio is defined at the target point (shown as filled circle)
- [x] Original ratio has a hole at the target point (shown as open circle)
- [x] Step-by-step values displayed in info panel
- [x] Responsive canvas width with minimum size constraint

## Technical Notes

1. **Canvas-based controls:** Following CLAUDE.md guidelines, all UI elements (sliders, buttons, toggles) are drawn directly on the canvas using rect(), text(), circle() and handled via mousePressed()/mouseDragged() events.

2. **No DOM functions:** Avoided createButton(), createSlider(), createCheckbox() per project requirements.

3. **updateCanvasSize():** Called as first step in setup() to get container width.

4. **Layout:** Two stacked graphs on left side, info panel on right side. Charts start at chartTop = 70 to prevent title/subtitle overlap.

5. **Animation:** Smooth approach animation that slows down as it nears the target.

6. **Example functions:** Four pre-defined examples with f(x), g(x), f'(x), g'(x), target values, and limits stored as objects.

## Instructional Rationale

Seeing both the original and derivative ratios approach the same value builds intuition for why L'Hospital's Rule works. The visualization shows:

1. The original ratio f(x)/g(x) has a hole (undefined) at the target
2. The derivative ratio f'(x)/g'(x) is often defined at the target
3. Both ratios converge to the same limit as x approaches the target
4. This geometric insight explains why differentiating top and bottom separately gives the correct limit

## Output Location

```
/Users/dan/Documents/ws/calculus/docs/sims/lhospitals-rule-visualizer/
├── lhospitals-rule-visualizer.js
├── main.html
├── index.md
└── metadata.json
```

## Screenshot Required

Run the following command to capture the screenshot:
```bash
~/.local/bin/bk-capture-screenshot /Users/dan/Documents/ws/calculus/docs/sims/lhospitals-rule-visualizer
```
