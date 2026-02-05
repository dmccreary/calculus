# box-optimizer Generation Log

- Start: 2026-02-04 07:40:07
- End: 2026-02-04 07:44:02
- Status: completed
- Notes: Generated Box Volume Optimizer MicroSim with the following features:
  - Three-panel layout: flat cardboard template, 3D box view (WEBGL), and volume function graph
  - Canvas-based controls (slider for cut size, buttons for animate/optimal/reset)
  - Text input fields for customizing cardboard dimensions (L x W)
  - Real-time volume calculation and percentage-of-maximum display
  - Fold animation showing 2D to 3D transformation
  - Critical points marked on volume graph
  - Data panel showing current dimensions, volume, and optimization progress bar
  - Width-responsive design
  - Files created: main.html, box-optimizer.js, index.md, metadata.json
  - Added to mkdocs.yml navigation

## Debug Session: 2026-02-05

- Date: 2026-02-05 08:09:22
- Status: completed
- File: `docs/sims/box-optimizer/box-optimizer.js`

### Summary

Fixed four categories of bugs that prevented the MicroSim from running in the p5.js editor and caused incorrect default rendering of the 3D folding box.

### Bug 1: WEBGL Incompatible APIs

**Errors:**
- `TypeError: drawingContext.setLineDash is not a function`
- `WEBGL: you must load and set a font before drawing text`

**Root cause:** The sketch uses `createCanvas(w, h, WEBGL)` but called Canvas2D-only APIs. In WEBGL mode, `drawingContext` is a `WebGLRenderingContext`, not `CanvasRenderingContext2D`, so `setLineDash()` does not exist. WEBGL mode also requires an explicitly loaded font for `text()`.

**Fix:**
1. Added `preload()` with `loadFont()` from a CDN-hosted .otf file, and `textFont(myFont)` in `setup()`
2. Replaced all 4 `drawingContext.setLineDash()` calls with a custom `dashedLine()` helper that manually draws dash segments using `line()`

### Bug 2: Mouse Coordinates Offset in WEBGL Mode

**Symptom:** Buttons, slider, and dimension inputs did not respond to clicks.

**Root cause:** All mouse handler functions added `canvasWidth/2` and `canvasHeight/2` to `mouseX`/`mouseY`. In p5.js, `mouseX`/`mouseY` are always relative to the canvas element's top-left corner (0 to width, 0 to height) regardless of renderer mode. The WEBGL renderer changes the drawing coordinate origin but NOT the mouse coordinate system.

**Fix:** Removed the `+ canvasWidth/2` and `+ canvasHeight/2` offsets from all mouse coordinate calculations.

### Bug 3: 3D Box Clipping and Scale

**Symptom:** The 3D box in the center panel appeared tiny and partially clipped.

**Root cause:** Two issues:
1. The scale factor (`boxViewWidth * 0.4` and cap of `80`) was too conservative
2. The 3D box at z=0 was depth-clipped against the 2D panel backgrounds

**Fix:**
1. Increased scale factors: `(boxViewWidth - 40) * 0.55` and `(topRowHeight - 80) * 0.45`
2. Translated 3D box to `z=100` to render in front of 2D panels
3. Steepened rotation angles for better 3D perspective

### Bug 4: Fold Animation Logic (Default State Should Be Folded)

**Symptom:** The 3D box appeared as a flat single plane on startup instead of a folded box.

**Root cause:** Three interrelated issues:

1. **Fold geometry direction:** `foldAngle=0` means sides standing up (FOLDED), `foldAngle=PI/2` means sides lying flat (UNFOLDED). At `foldAngle=0`, no rotation is applied and side walls are positioned as vertical panels via their translate offsets.

2. **Guard condition:** `if (foldAngle > 0) { /* draw sides */ }` prevented sides from being drawn when foldAngle was exactly 0 (the folded state), showing only the base plate.

3. **Animation direction:** Needed inversion so default is folded and animation unfolds.

**Fix:**
1. Set `animationProgress = 1` as default (folded)
2. Inverted fold angle: `foldAngle = (1 - animationProgress) * PI/2`
3. Removed `if (foldAngle > 0)` guard so sides always draw
4. Added `animationDirection` variable for toggle behavior
5. Renamed button to "Fold/Unfold"

### Key Rules for WEBGL Fold Animations

1. WEBGL requires `loadFont()` in `preload()` and `textFont()` in `setup()`
2. No `setLineDash()` — use a custom `dashedLine()` helper
3. `mouseX`/`mouseY` need no offset in any renderer mode
4. Translate 3D objects forward in z to prevent depth-clipping against 2D backgrounds
5. `foldAngle=0` is folded, `foldAngle=PI/2` is flat
6. Never guard side drawing on `foldAngle > 0`
7. Default to folded: `animationProgress = 1`, `foldAngle = (1 - animationProgress) * PI/2`
