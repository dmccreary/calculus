# Coordinate System Explorer UI Adjustments

**Date:** 2026-02-03

## Summary

Made UI improvements to the coordinate-system-explorer MicroSim to fix layout issues and add drag functionality.

## Changes Made

### 1. Added p5.js Type Reference

Added the following directive at the top of the file to enable IDE autocomplete for p5.js:

```javascript
/// <reference types="p5/global" />
```

Note: Requires `@types/p5` to be installed via npm, or a `jsconfig.json` with type acquisition enabled.

### 2. Vertical Position Adjustment Using push/translate/pop

Added a coordinate transformation to shift the drawing content down, preventing overlap with the title:

```javascript
// Draw the items in the center of the drawing area
push();
translate(0, 15);
// Draw grid and axes
drawGrid();
drawAxes();

// Draw quadrant labels
drawQuadrantLabels();

// Draw current point
if (showPoint && !quizMode) {
  drawPoint(pointX, pointY, color(255, 100, 100));
}
pop();
```

**Key Insight:** Using `push()`, `translate()`, and `pop()` makes it easy to move a group of related drawing elements together. Instead of adjusting Y coordinates in multiple functions (drawGrid, drawAxes, drawQuadrantLabels, drawPoint), a single `translate(0, 15)` shifts everything down by 15 pixels. This technique:

- Keeps code DRY (Don't Repeat Yourself)
- Makes future adjustments trivial (change one number)
- Isolates the transformation so it doesn't affect other elements (title, controls)

### 3. Added Point Dragging Functionality

Added the ability for users to drag the red point to move it:

**New variable:**
```javascript
let isDraggingPoint = false;
```

**Modified mousePressed():**
- Checks if user clicked on existing point (within 15px radius)
- Accounts for translate offset when calculating positions
- Starts drag mode if clicking on point

**Added mouseDragged():**
```javascript
function mouseDragged() {
  if (isDraggingPoint && !quizMode) {
    let adjustedMouseY = mouseY - 15;  // Account for translate offset
    pointX = Math.round((mouseX - originX) / gridSize);
    pointY = Math.round((originY - adjustedMouseY) / gridSize);
    pointX = constrain(pointX, -xRange, xRange);
    pointY = constrain(pointY, -yRange, yRange);
  }
}
```

**Added mouseReleased():**
```javascript
function mouseReleased() {
  isDraggingPoint = false;
}
```

**Updated instructions:**
Changed from "Click to place a point" to "Click to place or drag to move point"

### 4. Global Variable for Vertical Translate

Replaced hardcoded translate offset with a global variable for easier maintenance:

```javascript
let verticalTranslate = 15;  // Vertical offset for drawing area content
```

All references to the offset (in `translate()`, `mousePressed()`, `mouseDragged()`) now use `verticalTranslate` instead of the hardcoded value `15`.

### 5. Fixed Quiz Mode Logic

The original quiz mode was backwards - it showed a point and asked users to identify coordinates. Fixed to show coordinates and have users click the correct location:

**Before:** Show point → User guesses coordinates
**After:** Show coordinates → User clicks on that location

```javascript
function drawQuizPrompt() {
  // Show the coordinates and ask user to click on that location
  text('Click on the point:', boxX + 10, boxY + 10);
  text('(' + quizPoint.x + ', ' + quizPoint.y + ')', boxX + boxW/2, boxY + 30);
}
```

Also fixed the quiz point drawing to account for the `verticalTranslate` offset.

### 6. Celebration Animation

Added a red dot explosion animation when users answer quiz questions correctly:

```javascript
let celebrationParticles = [];

function createCelebration(centerX, centerY) {
  let numParticles = 30;
  for (let i = 0; i < numParticles; i++) {
    let angle = random(TWO_PI);
    let speed = random(3, 8);
    celebrationParticles.push({
      x: centerX, y: centerY,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      size: random(8, 16),
      alpha: 255,
      decay: random(3, 6),
      hue: random(-20, 20)
    });
  }
}

function updateAndDrawCelebration() {
  for (let i = celebrationParticles.length - 1; i >= 0; i--) {
    let p = celebrationParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15;  // Gravity
    p.alpha -= p.decay;

    // Draw with glow effect
    fill(255, 80 + p.hue, 80 + p.hue, p.alpha);
    circle(p.x, p.y, p.size);

    if (p.alpha <= 0) celebrationParticles.splice(i, 1);
  }
}
```

**Features:**
- 30 particles burst outward from center
- Gravity effect (particles arc downward)
- Fade out with glow effect
- Slight color variation around red

### 7. Quiz Score Tracking

Added running score display in quiz mode:

```javascript
let quizCorrectCount = 0;
let quizTotalTries = 0;

function drawQuizScore() {
  fill('black');
  noStroke();
  textSize(14);
  textAlign(RIGHT, BOTTOM);
  text('Score: ' + quizCorrectCount + ' / ' + quizTotalTries, canvasWidth - 10, drawHeight - 10);
}
```

- Displays "Score: X / Y" in lower right corner during quiz mode
- Resets when entering quiz mode
- Increments on each attempt

## Lessons Learned

1. **Coordinate transformations simplify layout adjustments** - The push/translate/pop pattern is powerful for moving groups of elements without modifying each function individually.

2. **Account for transforms in mouse handling** - When using translate(), mouse coordinates need adjustment (e.g., `mouseY - verticalTranslate`) to correctly map screen positions to logical coordinates.

3. **Hit detection radius matters** - Using `dist()` with a 15px radius for point clicking provides a good balance between precision and ease of use.

4. **Use global variables for magic numbers** - The `verticalTranslate` variable makes future adjustments trivial and documents the purpose of the value.

5. **Particle systems are straightforward** - A simple array of particle objects with position, velocity, and alpha properties creates effective animations. Using `splice()` from the end of the array safely removes expired particles during iteration.

6. **Quiz design matters** - Showing coordinates and having users locate them tests spatial understanding better than the reverse (showing a point and asking for coordinates).
