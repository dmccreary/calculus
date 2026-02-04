// L'Hospital's Rule Visualizer MicroSim
// Illustrates how L'Hospital's Rule transforms indeterminate limits
// by comparing the original ratio with the ratio of derivatives
// Bloom Level: Understand (L2), Verb: illustrate, demonstrate

let canvasWidth = 700;
let drawHeight = 480;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let chartTop = 70; // Room for title + subtitle + function labels
let defaultTextSize = 16;

// Graph regions (two stacked vertically on left, info panel on right)
let graphLeft, graphRight, infoLeft;
let topGraphTop, topGraphBottom, bottomGraphTop, bottomGraphBottom;
let graphWidth, graphHeight;

// Coordinate ranges
let xMin = -3, xMax = 3;
let yMin = -5, yMax = 5;

// Current state
let currentX = 0.5;
let targetX = 0; // The x-value where limit is being evaluated
let isAnimating = false;
let animationDirection = 1; // 1 = approaching from right, -1 = from left
let animationStartX = 1.0;

// Example functions
let examples = [
  {
    name: "sin(x)/x",
    f: x => Math.sin(x),
    g: x => x,
    fp: x => Math.cos(x),
    gp: x => 1,
    target: 0,
    limit: 1,
    fLabel: "f(x) = sin(x)",
    gLabel: "g(x) = x",
    fpLabel: "f'(x) = cos(x)",
    gpLabel: "g'(x) = 1",
    form: "0/0"
  },
  {
    name: "(e^x - 1)/x",
    f: x => Math.exp(x) - 1,
    g: x => x,
    fp: x => Math.exp(x),
    gp: x => 1,
    target: 0,
    limit: 1,
    fLabel: "f(x) = e^x - 1",
    gLabel: "g(x) = x",
    fpLabel: "f'(x) = e^x",
    gpLabel: "g'(x) = 1",
    form: "0/0"
  },
  {
    name: "(x^2 - 4)/(x - 2)",
    f: x => x * x - 4,
    g: x => x - 2,
    fp: x => 2 * x,
    gp: x => 1,
    target: 2,
    limit: 4,
    fLabel: "f(x) = x^2 - 4",
    gLabel: "g(x) = x - 2",
    fpLabel: "f'(x) = 2x",
    gpLabel: "g'(x) = 1",
    form: "0/0"
  },
  {
    name: "(x^3 - 1)/(x - 1)",
    f: x => x * x * x - 1,
    g: x => x - 1,
    fp: x => 3 * x * x,
    gp: x => 1,
    target: 1,
    limit: 3,
    fLabel: "f(x) = x^3 - 1",
    gLabel: "g(x) = x - 1",
    fpLabel: "f'(x) = 3x^2",
    gpLabel: "g'(x) = 1",
    form: "0/0"
  }
];

let currentExample = 0;

// Display mode: 0 = both, 1 = original only, 2 = derivatives only
let displayMode = 0;

// Control positions
let xSliderX, xSliderY, xSliderW;
let exampleBtnX, exampleBtnY, exampleBtnW, exampleBtnH;
let modeBtns = [];
let animateBtnX, animateBtnY;

// Dragging state
let isDraggingXSlider = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();

  describe("Interactive visualization of L'Hospital's Rule showing original ratio f(x)/g(x) and derivative ratio f'(x)/g'(x) converging to the same limit.", LABEL);
}

function updateLayoutPositions() {
  // Graph regions - left side has two stacked graphs, right side has info panel
  graphLeft = margin + 40;
  graphRight = canvasWidth * 0.58;
  infoLeft = canvasWidth * 0.62;
  graphWidth = graphRight - graphLeft;

  let totalGraphHeight = drawHeight - chartTop - 30;
  graphHeight = (totalGraphHeight - 20) / 2; // Gap of 20 between graphs

  topGraphTop = chartTop;
  topGraphBottom = topGraphTop + graphHeight;
  bottomGraphTop = topGraphBottom + 20;
  bottomGraphBottom = bottomGraphTop + graphHeight;

  // Control positions
  xSliderX = 150;
  xSliderY = drawHeight + 25;
  xSliderW = canvasWidth - 200;

  exampleBtnX = 10;
  exampleBtnY = drawHeight + 55;
  exampleBtnW = 120;
  exampleBtnH = 28;

  // Mode buttons
  modeBtns = [
    { x: 150, y: drawHeight + 55, w: 90, h: 28, label: "Both", mode: 0 },
    { x: 250, y: drawHeight + 55, w: 100, h: 28, label: "Original", mode: 1 },
    { x: 360, y: drawHeight + 55, w: 110, h: 28, label: "Derivatives", mode: 2 }
  ];

  animateBtnX = 490;
  animateBtnY = drawHeight + 55;
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Get current example
  let ex = examples[currentExample];

  // Update x range based on target
  updateXRange();

  // Draw title and subtitle
  drawTitle(ex);

  // Draw graphs based on display mode
  if (displayMode === 0 || displayMode === 1) {
    drawTopGraph(ex); // Original ratio
  }
  if (displayMode === 0 || displayMode === 2) {
    drawBottomGraph(ex); // Derivative ratio
  }

  // If showing both, draw connection indicator
  if (displayMode === 0) {
    drawConnectionIndicator(ex);
  }

  // Draw info panel
  drawInfoPanel(ex);

  // Draw controls
  drawControls(ex);

  // Handle animation
  if (isAnimating) {
    updateAnimation();
  }
}

function updateXRange() {
  let ex = examples[currentExample];
  let target = ex.target;

  // Center the x-range around the target
  xMin = target - 3;
  xMax = target + 3;
}

function drawTitle(ex) {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text("L'Hospital's Rule Visualizer", canvasWidth / 2, 5);
  textSize(14);
  fill(100);
  text("Indeterminate Form: " + ex.form + " at x = " + ex.target, canvasWidth / 2, 28);
  textSize(12);
  fill(60, 120, 60);
  text("Both ratios approach the same limit: L = " + ex.limit, canvasWidth / 2, 48);
}

function drawTopGraph(ex) {
  let gTop = topGraphTop;
  let gBottom = topGraphBottom;

  // Panel background
  fill(255, 255, 255, 200);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft - 35, gTop - 15, graphWidth + 40, gBottom - gTop + 20, 5);

  // Panel label
  fill(50, 100, 200);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text("Original: f(x)/g(x) = " + ex.name, graphLeft - 30, gTop - 12);

  // Draw axes and grid
  drawAxes(graphLeft, graphRight, gTop, gBottom);

  // Draw the ratio f(x)/g(x)
  stroke(50, 100, 200);
  strokeWeight(2);
  noFill();

  let lastPy = null;
  for (let px = graphLeft; px <= graphRight; px++) {
    let x = map(px, graphLeft, graphRight, xMin, xMax);

    // Skip very close to target to show hole
    if (Math.abs(x - ex.target) < 0.05) {
      lastPy = null;
      continue;
    }

    let gVal = ex.g(x);
    if (Math.abs(gVal) < 0.0001) {
      lastPy = null;
      continue;
    }

    let ratio = ex.f(x) / gVal;
    let py = map(ratio, yMin, yMax, gBottom, gTop);

    if (!isNaN(ratio) && isFinite(ratio) && py > gTop - 20 && py < gBottom + 20) {
      if (lastPy !== null && Math.abs(py - lastPy) < 100) {
        line(px - 1, lastPy, px, constrain(py, gTop, gBottom));
      }
      lastPy = constrain(py, gTop, gBottom);
    } else {
      lastPy = null;
    }
  }

  // Draw hole at target
  let holeX = map(ex.target, xMin, xMax, graphLeft, graphRight);
  let holeY = map(ex.limit, yMin, yMax, gBottom, gTop);
  if (holeY > gTop && holeY < gBottom) {
    stroke(50, 100, 200);
    strokeWeight(2);
    fill('aliceblue');
    circle(holeX, holeY, 10);
  }

  // Draw current point
  if (Math.abs(currentX - ex.target) >= 0.02) {
    let gVal = ex.g(currentX);
    if (Math.abs(gVal) > 0.0001) {
      let ratio = ex.f(currentX) / gVal;
      let ptX = map(currentX, xMin, xMax, graphLeft, graphRight);
      let ptY = map(ratio, yMin, yMax, gBottom, gTop);

      if (ptX > graphLeft && ptX < graphRight && ptY > gTop && ptY < gBottom) {
        fill(50, 100, 200);
        stroke(255);
        strokeWeight(2);
        circle(ptX, ptY, 12);
      }
    }
  }

  // Draw limit line
  drawLimitLine(graphLeft, graphRight, gTop, gBottom, ex.limit, color(100, 180, 100));
}

function drawBottomGraph(ex) {
  let gTop = bottomGraphTop;
  let gBottom = bottomGraphBottom;

  // Panel background
  fill(255, 255, 255, 200);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft - 35, gTop - 15, graphWidth + 40, gBottom - gTop + 20, 5);

  // Panel label
  fill(200, 100, 50);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text("Derivatives: f'(x)/g'(x)", graphLeft - 30, gTop - 12);

  // Draw axes and grid
  drawAxes(graphLeft, graphRight, gTop, gBottom);

  // Draw the derivative ratio f'(x)/g'(x)
  stroke(200, 100, 50);
  strokeWeight(2);
  noFill();

  let lastPy = null;
  for (let px = graphLeft; px <= graphRight; px++) {
    let x = map(px, graphLeft, graphRight, xMin, xMax);

    let gpVal = ex.gp(x);
    if (Math.abs(gpVal) < 0.0001) {
      lastPy = null;
      continue;
    }

    let ratio = ex.fp(x) / gpVal;
    let py = map(ratio, yMin, yMax, gBottom, gTop);

    if (!isNaN(ratio) && isFinite(ratio) && py > gTop - 20 && py < gBottom + 20) {
      if (lastPy !== null && Math.abs(py - lastPy) < 100) {
        line(px - 1, lastPy, px, constrain(py, gTop, gBottom));
      }
      lastPy = constrain(py, gTop, gBottom);
    } else {
      lastPy = null;
    }
  }

  // Draw point at target (this exists for derivative ratio)
  let targetPtX = map(ex.target, xMin, xMax, graphLeft, graphRight);
  let gpAtTarget = ex.gp(ex.target);
  if (Math.abs(gpAtTarget) > 0.0001) {
    let limitVal = ex.fp(ex.target) / gpAtTarget;
    let targetPtY = map(limitVal, yMin, yMax, gBottom, gTop);
    if (targetPtY > gTop && targetPtY < gBottom) {
      fill(0, 180, 100);
      stroke(255);
      strokeWeight(2);
      circle(targetPtX, targetPtY, 10);
    }
  }

  // Draw current point
  let gpVal = ex.gp(currentX);
  if (Math.abs(gpVal) > 0.0001) {
    let ratio = ex.fp(currentX) / gpVal;
    let ptX = map(currentX, xMin, xMax, graphLeft, graphRight);
    let ptY = map(ratio, yMin, yMax, gBottom, gTop);

    if (ptX > graphLeft && ptX < graphRight && ptY > gTop && ptY < gBottom) {
      fill(200, 100, 50);
      stroke(255);
      strokeWeight(2);
      circle(ptX, ptY, 12);
    }
  }

  // Draw limit line
  drawLimitLine(graphLeft, graphRight, gTop, gBottom, ex.limit, color(100, 180, 100));
}

function drawAxes(gLeft, gRight, gTop, gBottom) {
  // Grid
  stroke(230);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let x = map(i, xMin, xMax, gLeft, gRight);
    if (x > gLeft && x < gRight) {
      line(x, gTop, x, gBottom);
    }
  }

  // Horizontal grid lines
  for (let i = Math.ceil(yMin); i <= yMax; i++) {
    let y = map(i, yMin, yMax, gBottom, gTop);
    if (y > gTop && y < gBottom) {
      line(gLeft, y, gRight, y);
    }
  }

  // Axes
  stroke(0);
  strokeWeight(1);

  // X-axis
  let y0 = map(0, yMin, yMax, gBottom, gTop);
  if (y0 > gTop && y0 < gBottom) {
    line(gLeft, y0, gRight, y0);
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, gLeft, gRight);
  if (x0 > gLeft && x0 < gRight) {
    line(x0, gTop, x0, gBottom);
  }

  // Axis labels
  fill(0);
  noStroke();
  textSize(9);
  textAlign(CENTER, TOP);

  let ex = examples[currentExample];
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let x = map(i, xMin, xMax, gLeft, gRight);
    if (x > gLeft + 10 && x < gRight - 10 && i !== 0) {
      text(i, x, gBottom + 2);
    }
  }

  textAlign(RIGHT, CENTER);
  for (let i = Math.ceil(yMin); i <= yMax; i++) {
    if (i !== 0) {
      let y = map(i, yMin, yMax, gBottom, gTop);
      if (y > gTop + 5 && y < gBottom - 5) {
        text(i, gLeft - 5, y);
      }
    }
  }
}

function drawLimitLine(gLeft, gRight, gTop, gBottom, limitVal, lineColor) {
  let py = map(limitVal, yMin, yMax, gBottom, gTop);
  if (py > gTop && py < gBottom) {
    stroke(lineColor);
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    line(gLeft, py, gRight, py);
    drawingContext.setLineDash([]);

    // Label
    fill(lineColor);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text("L=" + limitVal, gRight + 3, py);
  }
}

function drawConnectionIndicator(ex) {
  // Draw arrows showing that both ratios converge
  let limitY1 = map(ex.limit, yMin, yMax, topGraphBottom, topGraphTop);
  let limitY2 = map(ex.limit, yMin, yMax, bottomGraphBottom, bottomGraphTop);

  // Only draw if both are visible
  if (limitY1 > topGraphTop && limitY1 < topGraphBottom &&
      limitY2 > bottomGraphTop && limitY2 < bottomGraphBottom) {

    let arrowX = graphRight + 20;

    stroke(100, 180, 100);
    strokeWeight(2);

    // Vertical connecting line
    line(arrowX, limitY1, arrowX, limitY2);

    // Arrow heads
    fill(100, 180, 100);
    noStroke();
    triangle(arrowX - 5, limitY1 + 10, arrowX + 5, limitY1 + 10, arrowX, limitY1);
    triangle(arrowX - 5, limitY2 - 10, arrowX + 5, limitY2 - 10, arrowX, limitY2);

    // Label
    push();
    translate(arrowX + 8, (limitY1 + limitY2) / 2);
    rotate(-PI / 2);
    fill(100, 180, 100);
    textAlign(CENTER, CENTER);
    textSize(10);
    text("Same Limit!", 0, 0);
    pop();
  }
}

function drawInfoPanel(ex) {
  let panelX = infoLeft;
  let panelY = chartTop;
  let panelW = canvasWidth - infoLeft - 10;
  let panelH = drawHeight - chartTop - 20;

  // Panel background
  fill(255, 255, 255, 245);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  let yPos = panelY + 15;
  let lineHeight = 18;

  // Title
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text("Current Values", panelX + 10, yPos);
  textStyle(NORMAL);
  yPos += lineHeight + 8;

  // Current x
  textSize(12);
  text("x = " + currentX.toFixed(4), panelX + 10, yPos);
  yPos += lineHeight;

  let distance = Math.abs(currentX - ex.target);
  text("Distance from " + ex.target + ": " + distance.toFixed(4), panelX + 10, yPos);
  yPos += lineHeight + 10;

  // Divider
  stroke(220);
  line(panelX + 10, yPos, panelX + panelW - 10, yPos);
  yPos += 10;

  // Original functions
  fill(50, 100, 200);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  text("Original Ratio", panelX + 10, yPos);
  textStyle(NORMAL);
  yPos += lineHeight;

  textSize(11);
  let fVal = ex.f(currentX);
  let gVal = ex.g(currentX);
  text(ex.fLabel, panelX + 10, yPos);
  yPos += lineHeight - 3;
  text("f(" + currentX.toFixed(2) + ") = " + fVal.toFixed(4), panelX + 15, yPos);
  yPos += lineHeight;
  text(ex.gLabel, panelX + 10, yPos);
  yPos += lineHeight - 3;
  text("g(" + currentX.toFixed(2) + ") = " + gVal.toFixed(4), panelX + 15, yPos);
  yPos += lineHeight;

  let originalRatio = (Math.abs(gVal) > 0.0001) ? fVal / gVal : NaN;
  textSize(12);
  if (!isNaN(originalRatio) && isFinite(originalRatio)) {
    text("f(x)/g(x) = " + originalRatio.toFixed(5), panelX + 10, yPos);
  } else {
    fill(200, 50, 50);
    text("f(x)/g(x) = " + ex.form + " (indeterminate)", panelX + 10, yPos);
  }
  yPos += lineHeight + 10;

  // Divider
  stroke(220);
  line(panelX + 10, yPos, panelX + panelW - 10, yPos);
  yPos += 10;

  // Derivative functions
  fill(200, 100, 50);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  text("Derivative Ratio", panelX + 10, yPos);
  textStyle(NORMAL);
  yPos += lineHeight;

  textSize(11);
  let fpVal = ex.fp(currentX);
  let gpVal = ex.gp(currentX);
  text(ex.fpLabel, panelX + 10, yPos);
  yPos += lineHeight - 3;
  text("f'(" + currentX.toFixed(2) + ") = " + fpVal.toFixed(4), panelX + 15, yPos);
  yPos += lineHeight;
  text(ex.gpLabel, panelX + 10, yPos);
  yPos += lineHeight - 3;
  text("g'(" + currentX.toFixed(2) + ") = " + gpVal.toFixed(4), panelX + 15, yPos);
  yPos += lineHeight;

  let derivRatio = (Math.abs(gpVal) > 0.0001) ? fpVal / gpVal : NaN;
  textSize(12);
  if (!isNaN(derivRatio) && isFinite(derivRatio)) {
    text("f'(x)/g'(x) = " + derivRatio.toFixed(5), panelX + 10, yPos);
  } else {
    text("f'(x)/g'(x) = undefined", panelX + 10, yPos);
  }
  yPos += lineHeight + 10;

  // Divider
  stroke(220);
  line(panelX + 10, yPos, panelX + panelW - 10, yPos);
  yPos += 10;

  // Convergence info
  fill(0, 150, 100);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  text("L'Hospital's Rule", panelX + 10, yPos);
  textStyle(NORMAL);
  yPos += lineHeight + 2;

  textSize(11);
  fill(80);
  text("As x -> " + ex.target + ":", panelX + 10, yPos);
  yPos += lineHeight;
  text("f(x)/g(x) -> " + ex.limit, panelX + 10, yPos);
  yPos += lineHeight;
  text("f'(x)/g'(x) -> " + ex.limit, panelX + 10, yPos);
  yPos += lineHeight + 5;

  fill(0, 150, 100);
  textSize(10);
  text("Both ratios approach L = " + ex.limit + "!", panelX + 10, yPos);

  // Warning if conditions not met
  if (Math.abs(gVal) < 0.0001 && Math.abs(fVal) > 0.0001) {
    yPos += lineHeight + 10;
    fill(200, 50, 50);
    textSize(10);
    text("Note: Only valid for 0/0 or infinity/infinity forms", panelX + 10, yPos);
  }
}

function drawControls(ex) {
  // Row 1: X slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text("x = " + currentX.toFixed(3) + " (target: " + ex.target + ")", 10, xSliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(xSliderX, xSliderY - 6, xSliderW, 12, 6);

  // Slider handle
  let xHandleX = map(currentX, xMin + 0.5, xMax - 0.5, xSliderX, xSliderX + xSliderW);
  fill(isDraggingXSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(xHandleX, xSliderY, 20);

  // Target marker on slider
  let targetSliderX = map(ex.target, xMin + 0.5, xMax - 0.5, xSliderX, xSliderX + xSliderW);
  if (targetSliderX > xSliderX && targetSliderX < xSliderX + xSliderW) {
    stroke(200, 50, 50);
    strokeWeight(2);
    line(targetSliderX, xSliderY - 10, targetSliderX, xSliderY + 10);
    fill(200, 50, 50);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);
    text("target", targetSliderX, xSliderY + 12);
  }

  // Row 2: Example selector label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text("Example:", exampleBtnX, exampleBtnY + exampleBtnH / 2);

  // Example button (dropdown style)
  fill(240);
  stroke(180);
  strokeWeight(1);
  rect(exampleBtnX + 55, exampleBtnY, exampleBtnW, exampleBtnH, 5);

  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(ex.name, exampleBtnX + 55 + exampleBtnW / 2, exampleBtnY + exampleBtnH / 2);

  // Small triangle for dropdown indicator
  fill(100);
  noStroke();
  triangle(
    exampleBtnX + 55 + exampleBtnW - 15, exampleBtnY + exampleBtnH / 2 - 3,
    exampleBtnX + 55 + exampleBtnW - 5, exampleBtnY + exampleBtnH / 2 - 3,
    exampleBtnX + 55 + exampleBtnW - 10, exampleBtnY + exampleBtnH / 2 + 3
  );

  // Mode buttons
  for (let btn of modeBtns) {
    if (displayMode === btn.mode) {
      fill('#4CAF50');
      stroke('#388E3C');
    } else {
      fill(240);
      stroke(180);
    }
    strokeWeight(1);
    rect(btn.x, btn.y, btn.w, btn.h, 5);

    fill(displayMode === btn.mode ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  }

  // Animate button
  fill(isAnimating ? '#ff6666' : '#6699ff');
  stroke(isAnimating ? '#cc3333' : '#3366cc');
  strokeWeight(1);
  rect(animateBtnX, animateBtnY, 100, 28, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(isAnimating ? "Stop" : "Animate", animateBtnX + 50, animateBtnY + 14);

  // Direction indicator for animation
  if (!isAnimating) {
    fill(100);
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    text("Click to approach limit", animateBtnX + 105, animateBtnY + 14);
  }
}

function updateAnimation() {
  let ex = examples[currentExample];
  let speed = 0.008;

  // Move towards target
  let diff = ex.target - currentX;
  if (Math.abs(diff) < 0.02) {
    // Very close, slow down dramatically
    currentX += diff * 0.05;
    if (Math.abs(currentX - ex.target) < 0.001) {
      isAnimating = false;
      currentX = ex.target + 0.001; // Stop just before
    }
  } else {
    currentX += diff * speed;
  }
}

function mousePressed() {
  let ex = examples[currentExample];

  // Check x slider handle
  let xHandleX = map(currentX, xMin + 0.5, xMax - 0.5, xSliderX, xSliderX + xSliderW);
  if (dist(mouseX, mouseY, xHandleX, xSliderY) < 15) {
    isDraggingXSlider = true;
    isAnimating = false;
    return;
  }

  // Check x slider track click
  if (mouseY > xSliderY - 15 && mouseY < xSliderY + 15 &&
      mouseX > xSliderX && mouseX < xSliderX + xSliderW) {
    currentX = map(mouseX, xSliderX, xSliderX + xSliderW, xMin + 0.5, xMax - 0.5);
    currentX = constrain(currentX, xMin + 0.5, xMax - 0.5);
    isDraggingXSlider = true;
    isAnimating = false;
    return;
  }

  // Check example button
  if (mouseX >= exampleBtnX + 55 && mouseX <= exampleBtnX + 55 + exampleBtnW &&
      mouseY >= exampleBtnY && mouseY <= exampleBtnY + exampleBtnH) {
    // Cycle to next example
    currentExample = (currentExample + 1) % examples.length;
    let newEx = examples[currentExample];
    currentX = newEx.target + 0.5; // Start away from target
    isAnimating = false;
    return;
  }

  // Check mode buttons
  for (let btn of modeBtns) {
    if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
        mouseY >= btn.y && mouseY <= btn.y + btn.h) {
      displayMode = btn.mode;
      return;
    }
  }

  // Check animate button
  if (mouseX >= animateBtnX && mouseX <= animateBtnX + 100 &&
      mouseY >= animateBtnY && mouseY <= animateBtnY + 28) {
    if (isAnimating) {
      isAnimating = false;
    } else {
      // Start animation from current position or reset if too close
      if (Math.abs(currentX - ex.target) < 0.05) {
        currentX = ex.target + 1.0;
      }
      isAnimating = true;
    }
    return;
  }
}

function mouseDragged() {
  if (isDraggingXSlider) {
    currentX = map(mouseX, xSliderX, xSliderX + xSliderW, xMin + 0.5, xMax - 0.5);
    currentX = constrain(currentX, xMin + 0.5, xMax - 0.5);
    isAnimating = false;
  }
}

function mouseReleased() {
  isDraggingXSlider = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayoutPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  if (canvasWidth < 500) canvasWidth = 500; // Minimum width
  updateLayoutPositions();
}
