# closest-point-finder Generation Log

- Start: 2026-02-04 07:40:07
- End: 2026-02-04 07:43:12
- Status: completed
- Notes: Successfully generated the Closest Point Finder MicroSim with the following features:
  - Four selectable curves: y = x^2, y = x^3, x^2 + y^2 = 4 (circle), y = sin(x)
  - Draggable target point for exploring different scenarios
  - Slider-controlled point on curve to manually explore distances
  - "Find Minimum" button with numerical optimization (coarse + fine search)
  - Perpendicular verification toggle showing tangent line and slope calculations
  - Distance trace panel showing how distance varies along the curve
  - Real-time display of coordinates, distances, and slopes
  - Canvas-based controls following MicroSim best practices (no DOM elements)
  - Responsive design adapting to container width
  - Added to mkdocs.yml navigation under MicroSims section

## Debug Session: 2026-02-05

- Start: 2026-02-05 08:44:59
- Issue: MicroSim not working — `TWO_PI` used in top-level `const curves` array definition (line 45)
- Root cause: `TWO_PI` is a p5.js global constant only available after p5 instance creation. At script parse time it is `undefined`, making `paramMax` for the circle curve `NaN`, which cascades through all `map()` and `constrain()` calls.
- Fix: Replaced `TWO_PI` with `2 * Math.PI` (always available at parse time)
- Screenshot recaptured after fix

## UI Label Update: 2026-02-05

- Time: 2026-02-05 08:58:45
- Change: Renamed toggle button from "Show Perp: ON/OFF" to "Show Tangent & Perpendicular: ON/OFF"
- Reason: Original label was cryptic abbreviation; new label clearly describes both features the toggle controls (tangent line drawing and perpendicularity check)
- Button width increased from 120px to 210px to accommodate the longer label
- Updated in both `drawControls()` (rendering) and `mousePressed()` (hit detection)

## Tangent Line Fix: 2026-02-05

- Time: 2026-02-05 09:41:39
- Issues fixed:
  1. **Tangent line angle incorrect on wide canvases**: The old code computed the tangent direction in math-space using `atan(slope)` then mixed pixel and math offsets. Fixed by properly converting the math-space tangent direction `(1, slope)` to pixel-space `(scaleX, -slope * scaleY)`, normalizing, then scaling to desired pixel length.
  2. **Tangent line not updating on target drag**: Dragging the red target point did not recompute the closest curve point. Fixed by calling `findMinimumDistance()` in the `mouseDragged` handler when dragging the target, so the closest point, tangent line, and perpendicular check update live.
  3. **Tangent line strokeWeight**: Increased from 2 to 4 for better visibility.
  4. **Tangent line length**: Increased from 40 to 60 pixels for better visibility on wide canvases.
- Screenshot recaptured after fixes
