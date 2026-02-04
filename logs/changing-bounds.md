# Changing Bounds in u-Substitution MicroSim - Generation Log

## Generation Details

- **MicroSim Name:** changing-bounds
- **Output Directory:** docs/sims/changing-bounds/
- **Chapter:** 23 - Integral Properties and Techniques
- **Start Time:** 2026-02-04 15:13:18
- **End Time:** 2026-02-04 15:16:55
- **Duration:** ~3 minutes 37 seconds

## Files Generated

| File | Description | Size |
|------|-------------|------|
| `script.js` | p5.js MicroSim with dual coordinate graphs, bound transformation, and staged reveal | Main logic |
| `main.html` | Standalone HTML wrapper loading p5.js and script.js | Wrapper |
| `index.md` | MkDocs page with iframe, lesson plan, activities, and assessment | Documentation |
| `metadata.json` | Dublin Core metadata for faceted search | Metadata |

## Specification Summary

- **Type:** microsim
- **Library:** p5.js
- **Bloom Level:** 3 - Apply
- **Bloom Verbs:** apply, transform, calculate
- **Learning Objective:** Students will evaluate definite integrals using u-substitution with changed bounds

## Features Implemented

1. **Side-by-side graphs:** x-domain (purple) and u-domain (green) with independent coordinate systems
2. **Four integral examples:**
   - 2x cos(x^2) with u = x^2
   - 3x^2 e^(x^3) with u = x^3
   - 2x/(1+x^2) with u = 1+x^2
   - cos(x) e^(sin(x)) with u = sin(x)
3. **Adjustable bounds:** Sliders for a and b with real-time graph updates
4. **Five-stage reveal:**
   - Stage 1: Original integral with shaded region
   - Stage 2: Show u-substitution and transformation arrows
   - Stage 3: Transform bounds with new markers on u-graph
   - Stage 4: Show new integral in u with shaded region
   - Stage 5: Numerical area equality confirmation
5. **Animation:** Animated dots traveling along transformation arrows
6. **Numerical verification:** Simpson's rule integration confirms area equality
7. **Canvas-based controls:** All UI drawn on canvas (no DOM buttons)
8. **Responsive:** Canvas width adjusts to container

## Screenshot

- Screenshot pending: run `~/.local/bin/bk-capture-screenshot docs/sims/changing-bounds` to generate
