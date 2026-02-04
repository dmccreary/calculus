# Average Value of a Function MicroSim - Generation Log

## Timestamps
- **Start:** 2026-02-04 15:13:01
- **End:** 2026-02-04 15:15:56

## MicroSim Details
- **Name:** average-value
- **Directory:** docs/sims/average-value/
- **Type:** microsim
- **Library:** p5.js
- **Bloom Level:** 3 - Apply
- **Bloom Verbs:** apply, calculate, interpret

## Files Generated
1. `script.js` - p5.js interactive visualization (~480 lines)
2. `main.html` - Standalone HTML page
3. `index.md` - MkDocs documentation page with lesson plan
4. `metadata.json` - Dublin Core metadata
5. `average-value.png` - Screenshot (37K)

## Features Implemented
- Four selectable functions: x^2, sin(x), e^x, sqrt(x) via dropdown
- Adjustable interval endpoints a and b via sliders
- Three-stage reveal:
  - Stage 1: Shaded region under curve with area value
  - Stage 2: Average rectangle overlay with height = f_avg
  - Stage 3: Numerical verification that areas match
- "Show Rectangle" button transitions from Stage 1 to 2
- "Animate Height" button shows rectangle growing to correct height
- "Verify Areas" button transitions from Stage 2 to 3
- Reset button returns to Stage 1
- Formula display showing f_avg = (1/(b-a)) integral f(x) dx
- Calculations panel showing integral value, interval width, and average value
- Dashed horizontal line at f_avg height
- Purple boundary lines at x = a and x = b
- Stage indicator with filled circles

## Design Decisions
- Used canvas-based controls (no DOM elements) per project guidelines
- chartTop = 60 to prevent title/subtitle overlap
- Minimum canvas width of 650px for proper control layout
- Interval constrained so a < b with minimum gap of 0.5
- Changing interval endpoints resets to Stage 1
- Antiderivatives computed analytically for accuracy (not numerical)
- Y-axis range dynamically adjusts based on function and interval
