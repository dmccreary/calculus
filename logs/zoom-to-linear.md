# Zoom to Linear MicroSim Generation Log

## Generation Timestamps

- **Start:** 2026-02-04 00:15:09
- **End:** 2026-02-04 00:17:45
- **Duration:** ~2 minutes 36 seconds

## MicroSim Specification

| Field | Value |
|-------|-------|
| **Name** | zoom-to-linear |
| **Type** | MicroSim |
| **Framework** | p5.js |
| **Purpose** | Demonstrate that sufficiently zoomed-in views of differentiable functions appear linear, matching the tangent line |
| **Learning Objective** | Students will demonstrate that sufficiently zoomed-in views of differentiable functions appear linear, matching the tangent line (Bloom Level 2: Understand) |
| **Bloom's Taxonomy** | Level 2: Understand |
| **Bloom's Verb** | Demonstrate, Observe |

## Files Generated

| File | Path | Description |
|------|------|-------------|
| JavaScript | `/Users/dan/Documents/ws/calculus/docs/sims/zoom-to-linear/zoom-to-linear.js` | Main p5.js sketch with canvas-based controls |
| HTML | `/Users/dan/Documents/ws/calculus/docs/sims/zoom-to-linear/main.html` | Standalone HTML wrapper |
| Documentation | `/Users/dan/Documents/ws/calculus/docs/sims/zoom-to-linear/index.md` | MkDocs page with lesson plan |
| Metadata | `/Users/dan/Documents/ws/calculus/docs/sims/zoom-to-linear/metadata.json` | Dublin Core metadata for faceted search |

## Features Implemented

### Visual Elements
- [x] Function curve displayed in blue (#2196F3)
- [x] Tangent line at selected point in magenta (#E91E63)
- [x] Zoom control with logarithmic scale (1x to 100x)
- [x] At high zoom levels, curve and tangent line become visually indistinguishable
- [x] Zoom factor displayed in info box
- [x] Visual feedback messages ("Zoom in more!", "Getting closer...", "Nearly identical!")

### Interactive Controls (All Canvas-Based)
- [x] Function selector buttons (6 functions: sin(x), x², eˣ, x³, ln(x), cos(x))
- [x] Click/drag to select tangent point anywhere on the graph
- [x] Zoom slider with logarithmic scale (1x to 100x magnification)
- [x] "Auto Zoom" button that smoothly zooms in and out
- [x] Reset button to restore default view

### Functions Included
1. f(x) = sin(x) with derivative cos(x)
2. f(x) = x² with derivative 2x
3. f(x) = eˣ with derivative eˣ
4. f(x) = x³ with derivative 3x²
5. f(x) = ln(x) with derivative 1/x
6. f(x) = cos(x) with derivative -sin(x)

## Technical Notes

- Uses canvas-based controls (no p5.js DOM functions) as per project guidelines
- Responsive width design with `updateCanvasSize()` called in setup()
- Logarithmic zoom scale for smooth control across large range
- Tangent line transitions from dashed (low zoom) to solid (high zoom) to indicate convergence
- Auto-zoom animates in and out with smooth easing
- Graph clipping prevents drawing outside graph bounds
- Dynamic grid spacing adjusts based on zoom level

## Testing URL

```
http://127.0.0.1:8000/calculus/sims/zoom-to-linear/main.html
```

## Screenshot

Screenshot not yet captured. Run:
```bash
~/.local/bin/bk-capture-screenshot /Users/dan/Documents/ws/calculus/docs/sims/zoom-to-linear
```
