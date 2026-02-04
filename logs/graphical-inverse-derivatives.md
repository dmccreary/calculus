# MicroSim Generation Log: graphical-inverse-derivatives

## Generation Details

| Field | Value |
|-------|-------|
| Start Time | 2026-02-04 00:15:10 |
| End Time | 2026-02-04 00:18:05 |
| Duration | ~2 minutes 55 seconds |
| Status | Complete |

## Specification Summary

- **Name**: graphical-inverse-derivatives
- **Type**: MicroSim
- **Purpose**: Show the relationship between a function and its inverse, with tangent lines demonstrating the reciprocal slope property
- **Learning Objective**: Students will understand that the derivative of an inverse function equals the reciprocal of the original function's derivative (Bloom Level 2: Understand)
- **Bloom Verbs**: explain, interpret, demonstrate
- **Implementation**: p5.js with synchronized graphs

## Files Generated

| File | Description | Lines |
|------|-------------|-------|
| `graphical-inverse-derivatives.js` | Main p5.js simulation code | ~570 |
| `main.html` | Standalone HTML wrapper | 21 |
| `index.md` | MkDocs documentation with lesson plan | ~140 |
| `metadata.json` | Dublin Core metadata for faceted search | 47 |

## Features Implemented

### Visual Elements
- [x] Two graphs side by side: f(x) and f^(-1)(x)
- [x] Line y = x shown as dashed reference
- [x] Draggable point on f(x) with tangent line
- [x] Corresponding point on f^(-1)(x) with tangent line
- [x] Slope values displayed for both tangent lines
- [x] Visual showing m1 x m2 = 1

### Interactive Controls
- [x] Draggable point along the curve f(x)
- [x] Dropdown: Select function family (Cubic, Square Root, Exponential, Linear)
- [x] Toggle: Show/hide y = x line
- [x] Toggle: Show/hide slope calculations
- [x] Animation option: Auto-trace along the curve
- [x] Slider for precise x-value control

### Behavior
- [x] As user drags point on f, corresponding point on f^(-1) updates
- [x] Tangent lines update in real-time
- [x] Slope display shows both values and their product (always 1)

## Technical Notes

- Uses canvas-based controls (no DOM sliders/buttons) per CLAUDE.md guidelines
- Responsive canvas sizing with updateCanvasSize()
- chartTop set to 55 to accommodate title and subtitle without overlap
- Four function families included: Cubic, Square Root, Exponential, Linear
- Animation oscillates back and forth across valid x-range

## References Used

- `inverse-function-reflector.js` - Similar inverse function visualization pattern
- `tangent-line-calculator.js` - Canvas-based control patterns
- `secant-to-tangent.js` - Tangent line drawing approach
- `derivative-interpretation/metadata.json` - Metadata format reference

## Screenshot Pending

Screenshot can be captured after testing with:
```bash
~/.local/bin/bk-capture-screenshot /Users/dan/Documents/ws/calculus/docs/sims/graphical-inverse-derivatives
```
