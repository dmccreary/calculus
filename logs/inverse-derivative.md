# MicroSim Generation Log: inverse-derivative

## Summary

**MicroSim Name:** inverse-derivative
**Purpose:** Show geometrically why the derivative of an inverse function is the reciprocal of the original derivative
**Learning Objective:** Students will explain the relationship between the derivative of a function and the derivative of its inverse (Bloom Level 2: Understand)
**Bloom Taxonomy:** Understand (L2) - explain, interpret, illustrate

## Timestamps

- **Start:** 2026-02-04 00:15:09
- **End:** 2026-02-04 00:18:10
- **Duration:** ~3 minutes

## Files Generated

| File | Description |
|------|-------------|
| `docs/sims/inverse-derivative/inverse-derivative.js` | p5.js canvas-based MicroSim with draggable point and animation |
| `docs/sims/inverse-derivative/main.html` | Standalone HTML wrapper |
| `docs/sims/inverse-derivative/index.md` | MkDocs lesson plan page with iframe embedding |
| `docs/sims/inverse-derivative/metadata.json` | Dublin Core metadata for faceted search |

## Features Implemented

### Visual Elements
- Split/overlaid graph showing f(x) in blue and f^-1(x) in orange
- Draggable point on f(x) with corresponding point on f^-1(x)
- Tangent lines displayed on both curves
- Reference line y = x shown as dashed gray line
- Info panel showing both slopes and their product (always equals 1)
- Legend identifying both curves

### Interactive Controls
- **Function selector buttons:** x^2, x^3, e^x, sin(x) - all canvas-based
- **Draggable point:** Click and drag anywhere on the graph area
- **Toggle y = x line:** Show/hide the reflection reference line
- **Animate button:** Automatically sweep point along the curve

### Functions Available
1. f(x) = x^2 (restricted to x >= 0), inverse sqrt(x)
2. f(x) = x^3, inverse cbrt(x)
3. f(x) = e^x, inverse ln(x)
4. f(x) = sin(x) (restricted to [-pi/2, pi/2]), inverse arcsin(x)

### Display Information
- Point coordinates (a, b) on f and (b, a) on f^-1
- f'(a) - slope of tangent to f at point a
- (f^-1)'(b) - slope of tangent to inverse at point b
- Product of slopes (verification that it equals 1)

## Technical Notes

- Uses canvas-based controls (rect(), text(), mousePressed()) per project guidelines
- No p5.js DOM functions (createButton, createSlider, etc.)
- Responsive width with updateCanvasSize() called first in setup()
- chartTop = 55 pixels to avoid title/subtitle overlap with graph elements
- Canvas height: 550px (480px draw area + 70px control area)

## Testing

To test locally:
```
http://127.0.0.1:8000/calculus/sims/inverse-derivative/main.html
```

## Screenshot Capture

After visual verification, capture screenshot with:
```bash
~/.local/bin/bk-capture-screenshot /Users/dan/Documents/ws/calculus/docs/sims/inverse-derivative
```
