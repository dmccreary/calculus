# Linear Approximation Error MicroSim Generation Log

## Generation Summary

- **Start Time**: 2026-02-04 00:15:09
- **End Time**: 2026-02-04 00:18:27
- **Duration**: ~3 minutes 18 seconds
- **Status**: Completed successfully

## Specification

- **Type**: MicroSim
- **Name**: linear-approx-error
- **Purpose**: Assess the accuracy of linear approximations by comparing the approximation to the actual function value and understanding how error varies with distance from the base point
- **Learning Objective**: Students will assess the accuracy of linear approximations by comparing the approximation to the actual function value and understanding how error varies with distance from the base point (Bloom Level 5: Evaluate)
- **Bloom Taxonomy Verbs**: assess, evaluate, compare
- **Implementation**: p5.js

## Files Generated

| File | Description | Lines |
|------|-------------|-------|
| `linear-approx-error.js` | Main p5.js script with all visualization and interaction logic | ~580 |
| `main.html` | Standalone HTML wrapper for the MicroSim | 23 |
| `index.md` | MkDocs lesson plan page with iframe embedding | ~160 |
| `metadata.json` | Dublin Core metadata for faceted search | ~80 |

## Features Implemented

### Visual Elements
- [x] Function graph with tangent line at point a
- [x] Vertical line segment showing error between f(x) and L(x)
- [x] Error vs distance graph showing how error grows (right panel)
- [x] Numerical displays: f(x), L(x), error, % error (Error Analysis Panel)
- [x] Shaded region showing approximation accuracy zone (toggleable)

### Interactive Controls
- [x] Function selector: sqrt(x), sin(x), e^x, ln(x), x^2
- [x] Slider to choose base point a
- [x] Slider to choose approximation point x
- [x] Toggle to show/hide error region
- [x] "Animate" button to sweep x across domain
- [x] "Reset" button to restore default values

### Error Analysis Panel
- [x] Actual: f(x) display
- [x] Approximation: L(x) display
- [x] Error (signed)
- [x] |Error| (absolute)
- [x] Relative error % with color coding (green/yellow/red)

## Technical Notes

1. **Dual Graph Layout**: Canvas is split into two graph regions - the main function/tangent graph on the left (~55% width) and the error vs distance graph on the right (~45% width).

2. **Canvas-Based Controls**: All UI elements (sliders, dropdown, buttons) are drawn directly on canvas using p5.js primitives rather than DOM elements, following project guidelines.

3. **Error Visualization**:
   - The error region is shaded semi-transparent red between the function curve and tangent line
   - The error graph plots |f(x) - L(x)| as a function of |x - a|, showing the characteristic quadratic growth

4. **Color-Coded Accuracy**:
   - Green: Relative error < 1% (excellent approximation)
   - Yellow: Relative error 1-5% (acceptable)
   - Red: Relative error > 5% (poor approximation)

5. **Animation**: The animate feature sweeps x across the function's domain and bounces at boundaries, allowing students to observe error variation dynamically.

6. **Function-Specific Domains**: Each function has appropriate domain limits and suggested starting points to ensure valid visualizations.

## Instructional Rationale

Quantifying error builds understanding of when linear approximation is (and isn't) appropriate. This MicroSim addresses Bloom Level 5 (Evaluate) by asking students to:
- Compare actual function values with linear approximations
- Assess the quality of approximations using relative error
- Judge which functions and distances produce acceptable approximations
- Evaluate the tradeoffs between simplicity and accuracy

## Screenshot Required

After testing, capture screenshot using:
```bash
~/.local/bin/bk-capture-screenshot /Users/dan/Documents/ws/calculus/docs/sims/linear-approx-error
```
