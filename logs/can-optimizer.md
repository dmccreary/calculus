# can-optimizer Generation Log

- Start: 2026-02-04 07:40:07
- End: 2026-02-04 07:43:19
- Status: completed
- Notes: Successfully generated Can Optimizer MicroSim with the following files:
  - `/docs/sims/can-optimizer/can-optimizer.js` - Main p5.js WEBGL simulation with canvas-based controls
  - `/docs/sims/can-optimizer/main.html` - HTML wrapper file
  - `/docs/sims/can-optimizer/index.md` - Documentation with lesson plan
  - `/docs/sims/can-optimizer/metadata.json` - Dublin Core metadata
  - Updated `mkdocs.yml` to include the new MicroSim in navigation

## Features Implemented

- 3D rotating cylinder visualization with WEBGL
- Color-coded surface areas (blue for top/bottom, orange for lateral)
- Real-time S(r) surface area graph with optimal point marked
- Canvas-based controls (no DOM elements per project guidelines):
  - Radius slider (1-15 cm)
  - Volume input field (default 1000 cm³)
  - Show/Hide Breakdown toggle
  - Find Optimal button
  - Compare button (shows three cans: tall/thin, optimal, short/wide)
- Data panel showing all calculated values
- Percentage above minimum indicator

## Technical Notes

- Canvas dimensions: 750x550px (responsive width)
- Uses WEBGL mode for 3D rendering
- All controls are canvas-based using mousePressed/mouseDragged/keyPressed
- Follows the project's p5.js guidelines for iframe embedding

## Debug Session: 2026-02-05

- Date: 2026-02-05 08:39:01
- Status: completed
- File: `docs/sims/can-optimizer/can-optimizer.js`
- Rules applied from: `logs/box-optimizer.md` (Debug Session: 2026-02-05)

### Summary

Applied the WEBGL debugging rules discovered during the box-optimizer debug session, plus fixed two additional issues found during testing.

### Bug 1: WEBGL Requires Loaded Font File

**Error:** `WEBGL: you must load and set a font before drawing text`

**Root cause:** `textFont('Arial')` passes a string font name, which only works in Canvas2D mode. WEBGL mode requires a font loaded from a file via `loadFont()`.

**Fix:**
1. Added `let myFont` variable
2. Added `preload()` function with `loadFont()` from CDN-hosted SourceSansPro-Regular.otf
3. Changed `textFont('Arial')` to `textFont(myFont)` in `setup()`

### Bug 2: `setLineDash()` Not Available in WEBGL

**Error:** `TypeError: drawingContext.setLineDash is not a function`

**Root cause:** `drawingContext` in WEBGL mode is a `WebGLRenderingContext`, not `CanvasRenderingContext2D`. The `setLineDash()` method does not exist on the WebGL context.

**Fix:** Replaced `setLineDash([5, 5])` / `setLineDash([])` calls and the `setLineDash()` helper function with a custom `dashedLine(x1, y1, x2, y2, dashLen)` function that manually draws dash segments using `lerp()` and `line()`.

### Bug 3: 3D Cylinder Depth-Clipping Against 2D Panels

**Symptom:** 3D cylinder partially clipped or hidden behind 2D panel backgrounds.

**Root cause:** The 3D cylinder was translated to z=0, the same depth as the 2D background rectangles, causing depth-buffer conflicts.

**Fix:** Changed `translate(view3DLeft + view3DWidth/2, view3DTop + view3DHeight/2 + 20, 0)` to use `z=100` so the 3D cylinder renders in front of 2D panels.

### Bug 4: `canvas.parent()` TypeError in p5.js Editor

**Error:** `TypeError: canvas.parent is not a function`

**Root cause:** The bare `canvas` variable is the raw HTML canvas element, which does not have a `.parent()` method. The `.parent()` method exists on the `p5.Renderer` object returned by `createCanvas()`.

**Fix:** Changed `createCanvas(canvasWidth, canvasHeight, WEBGL)` to `var cnv = createCanvas(canvasWidth, canvasHeight, WEBGL)` and `canvas.parent(mainElement)` to `cnv.parent(mainElement)`.

### Bug 5: Compare Feature Clipping and Removal

**Symptom:** Compare mode visualization (three 2D cans) overflowed the control area, clipping labels and overlapping with the canvas description text.

**Decision:** Removed the Compare feature entirely. The interactive 3D cylinder view already shows shape changes in real time as the radius slider is dragged, and the graph marks both current and optimal points. The static 2D comparison cans were redundant.

**Fix:** Removed `compareMode` variable, Compare button, `drawComparisonCans()` function, and all compare-related conditional logic.

### Bug 6: Data Panel Overlapping Control Area

**Symptom:** The data panel text (Height, Total Area, +% above min) overlapped into the control area below.

**Root cause:** With `view3DHeight = 300`, the data panel started at y=365, leaving only 45px before the control area at y=420. Four rows of 16px text plus padding require ~80px.

**Fix:** Reduced `view3DHeight` from 300 to 250, so the data panel starts at y=315 with ~95px of available space.

### Key Rules for WEBGL MicroSims (from box-optimizer)

1. WEBGL requires `loadFont()` in `preload()` and `textFont()` in `setup()`
2. No `setLineDash()` — use a custom `dashedLine()` helper
3. `mouseX`/`mouseY` need no offset in any renderer mode
4. Translate 3D objects forward in z to prevent depth-clipping against 2D backgrounds
5. Capture `createCanvas()` return value to use `.parent()` — the bare `canvas` variable is a raw HTML element
