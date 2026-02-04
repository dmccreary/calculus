// Additivity Property Visualization MicroSim
// Demonstrates how area under a curve can be split into sub-regions that sum to the total
// Bloom Level 2: Understand

let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 70;
let graphRight;
let graphTop = 70;
let graphBottom;

// Integration bounds
let a = 0;
let c = 4;
let b = 2; // Split point (draggable)

// Dragging state
let isDraggingB = false;
let dragHandleRadius = 12;

// Function selection
let funcIndex = 0;
let funcNames = ['x + 1', 'sin(x) + 2', 'x\u00B2/4 + 1', '\u221Ax + 1'];
let funcDefs = [
  (x) => x + 1,
  (x) => Math.sin(x) + 2,
  (x) => x * x / 4 + 1,
  (x) => Math.sqrt(Math.max(0, x)) + 1
];

// Display options
let showValues = true;
let isAnimating = false;
let animationDirection = 1;
let animationSpeed = 0.02;

// Canvas-based button geometry (computed in draw)
let btnFuncNext = { x: 0, y: 0, w: 0, h: 0 };
let btnFuncPrev = { x: 0, y: 0, w: 0, h: 0 };
let btnToggle = { x: 0, y: 0, w: 0, h: 0 };
let btnAnimate = { x: 0, y: 0, w: 0, h: 0 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
  describe('Additivity property visualization showing how integral splits into sub-regions', LABEL);
}

function draw() {
  updateCanvasSize();
  graphRight = canvasWidth - 160;
  graphBottom = drawHeight - 50;

  // Handle animation
  if (isAnimating) {
    b += animationDirection * animationSpeed;
    if (b >= c - 0.1) {
      b = c - 0.1;
      animationDirection = -1;
    }
    if (b <= a + 0.1) {
      b = a + 0.1;
      animationDirection = 1;
    }
  }

  // Constrain b to valid range
  b = constrain(b, a + 0.05, c - 0.05);

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Additivity Property of Integrals', canvasWidth / 2, 8);

  // Subtitle (formula)
  textSize(14);
  fill(80);
  text('\u222B\u2090\u1D9C f(x)dx = \u222B\u2090\u1D47 f(x)dx + \u222B\u1D47\u1D9C f(x)dx', canvasWidth / 2, 32);

  // Draw axes
  drawAxes();

  // Calculate integrals
  let integralAC = numericalIntegral(a, c);
  let integralAB = numericalIntegral(a, b);
  let integralBC = numericalIntegral(b, c);

  // Draw filled regions
  drawRegions();

  // Draw curve on top
  drawCurve();

  // Draw split line with drag handle
  drawSplitLine();

  // Draw info panel
  drawInfoPanel(integralAC, integralAB, integralBC);

  // Draw canvas-based controls
  drawControls();
}

function getYRange() {
  let minY = 0, maxY = 0;
  for (let x = a - 0.5; x <= c + 0.5; x += 0.1) {
    let y = funcDefs[funcIndex](x);
    if (!isNaN(y) && isFinite(y)) {
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  let padding = (maxY - minY) * 0.15;
  return { min: Math.min(0, minY - padding), max: maxY + padding };
}

function drawAxes() {
  let yRange = getYRange();

  // X-axis (at y=0)
  let zeroY = map(0, yRange.min, yRange.max, graphBottom, graphTop);
  stroke(0);
  strokeWeight(2);
  line(graphLeft, zeroY, graphRight, zeroY);

  // Y-axis
  line(graphLeft, graphTop, graphLeft, graphBottom);

  // X-axis tick marks and labels
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  for (let x = Math.floor(a); x <= Math.ceil(c); x++) {
    let px = map(x, a - 0.5, c + 0.5, graphLeft, graphRight);
    if (px >= graphLeft && px <= graphRight) {
      stroke(220);
      strokeWeight(1);
      line(px, graphTop, px, graphBottom);
      stroke(0);
      strokeWeight(1);
      line(px, zeroY - 3, px, zeroY + 3);
      noStroke();
      text(x, px, zeroY + 6);
    }
  }

  // Y-axis labels
  textAlign(RIGHT, CENTER);
  let yStep = Math.ceil((yRange.max - yRange.min) / 5);
  if (yStep < 1) yStep = 1;
  for (let y = Math.ceil(yRange.min); y <= Math.floor(yRange.max); y += yStep) {
    let py = map(y, yRange.min, yRange.max, graphBottom, graphTop);
    if (py > graphTop + 10 && py < graphBottom - 10) {
      stroke(220);
      strokeWeight(1);
      line(graphLeft, py, graphRight, py);
      noStroke();
      text(y, graphLeft - 5, py);
    }
  }

  // Axis labels
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  text('x', graphRight + 15, zeroY - 5);
  textAlign(RIGHT, CENTER);
  text('y', graphLeft - 5, graphTop - 10);
}

function drawRegions() {
  let yRange = getYRange();
  let zeroY = map(0, yRange.min, yRange.max, graphBottom, graphTop);

  // Draw region from a to b (blue)
  fill(100, 150, 255, 120);
  stroke(50, 100, 200);
  strokeWeight(1);
  beginShape();
  let pxA = map(a, a - 0.5, c + 0.5, graphLeft, graphRight);
  vertex(pxA, zeroY);
  for (let x = a; x <= b; x += 0.02) {
    let px = map(x, a - 0.5, c + 0.5, graphLeft, graphRight);
    let y = funcDefs[funcIndex](x);
    let py = map(y, yRange.min, yRange.max, graphBottom, graphTop);
    vertex(px, py);
  }
  let pxB = map(b, a - 0.5, c + 0.5, graphLeft, graphRight);
  let yB = funcDefs[funcIndex](b);
  let pyB = map(yB, yRange.min, yRange.max, graphBottom, graphTop);
  vertex(pxB, pyB);
  vertex(pxB, zeroY);
  endShape(CLOSE);

  // Draw region from b to c (green)
  fill(100, 200, 100, 120);
  stroke(50, 150, 50);
  strokeWeight(1);
  beginShape();
  vertex(pxB, zeroY);
  vertex(pxB, pyB);
  for (let x = b; x <= c; x += 0.02) {
    let px = map(x, a - 0.5, c + 0.5, graphLeft, graphRight);
    let y = funcDefs[funcIndex](x);
    let py = map(y, yRange.min, yRange.max, graphBottom, graphTop);
    vertex(px, py);
  }
  let pxC = map(c, a - 0.5, c + 0.5, graphLeft, graphRight);
  vertex(pxC, zeroY);
  endShape(CLOSE);
}

function drawCurve() {
  let yRange = getYRange();

  stroke(0, 80, 0);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px++) {
    let x = map(px, graphLeft, graphRight, a - 0.5, c + 0.5);
    let y = funcDefs[funcIndex](x);
    if (!isNaN(y) && isFinite(y)) {
      let py = map(y, yRange.min, yRange.max, graphBottom, graphTop);
      vertex(px, py);
    }
  }
  endShape();
}

function drawSplitLine() {
  let yRange = getYRange();
  let pxB = map(b, a - 0.5, c + 0.5, graphLeft, graphRight);

  // Dashed vertical line at split point
  stroke(255, 140, 0);
  strokeWeight(2);
  setLineDash([6, 4]);
  line(pxB, graphTop, pxB, graphBottom);
  setLineDash([]);

  // Drag handle (circle)
  let handleY = graphBottom + 15;

  // Highlight if hovering or dragging
  if (isDraggingB || isOverDragHandle(pxB, handleY)) {
    fill(255, 180, 50);
    stroke(200, 100, 0);
    strokeWeight(3);
    cursor(HAND);
  } else {
    fill(255, 140, 0);
    stroke(180, 90, 0);
    strokeWeight(2);
  }
  circle(pxB, handleY, dragHandleRadius * 2);

  // Label on handle
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('b', pxB, handleY);
  textStyle(NORMAL);

  // Labels for a and c
  let pxA = map(a, a - 0.5, c + 0.5, graphLeft, graphRight);
  let pxC = map(c, a - 0.5, c + 0.5, graphLeft, graphRight);

  fill(50, 100, 200);
  textSize(14);
  textAlign(CENTER, TOP);
  text('a=' + a, pxA, graphBottom + 30);

  fill(50, 150, 50);
  text('c=' + c, pxC, graphBottom + 30);

  fill(255, 140, 0);
  text('b=' + b.toFixed(2), pxB, graphBottom + 30);
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
}

function drawInfoPanel(integralAC, integralAB, integralBC) {
  let panelX = graphRight + 15;
  let panelY = graphTop;
  let panelW = canvasWidth - panelX - 10;
  let panelH = graphBottom - graphTop;

  fill(255, 255, 255, 245);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);

  let y = panelY + 10;
  let lineHeight = 24;

  // Total integral
  textStyle(BOLD);
  text('Total:', panelX + 5, y);
  textStyle(NORMAL);
  y += 14;

  fill(80, 80, 80);
  textSize(10);
  text('\u222B\u2090\u1D9C f(x)dx', panelX + 8, y);
  y += 14;

  if (showValues) {
    fill(0, 100, 0);
    textSize(14);
    textStyle(BOLD);
    text('= ' + integralAC.toFixed(3), panelX + 8, y);
    textStyle(NORMAL);
  }
  y += lineHeight + 5;

  // Left integral (blue)
  fill(50, 100, 200);
  textSize(11);
  textStyle(BOLD);
  text('Left (a to b):', panelX + 5, y);
  textStyle(NORMAL);
  y += 14;

  textSize(10);
  text('\u222B\u2090\u1D47 f(x)dx', panelX + 8, y);
  y += 14;

  if (showValues) {
    textSize(14);
    textStyle(BOLD);
    text('= ' + integralAB.toFixed(3), panelX + 8, y);
    textStyle(NORMAL);
  }
  y += lineHeight + 5;

  // Right integral (green)
  fill(50, 150, 50);
  textSize(11);
  textStyle(BOLD);
  text('Right (b to c):', panelX + 5, y);
  textStyle(NORMAL);
  y += 14;

  textSize(10);
  text('\u222B\u1D47\u1D9C f(x)dx', panelX + 8, y);
  y += 14;

  if (showValues) {
    textSize(14);
    textStyle(BOLD);
    text('= ' + integralBC.toFixed(3), panelX + 8, y);
    textStyle(NORMAL);
  }
  y += lineHeight + 10;

  // Sum verification
  stroke(180);
  line(panelX + 5, y, panelX + panelW - 5, y);
  y += 8;

  noStroke();
  fill('black');
  textSize(10);
  text('Sum of parts:', panelX + 5, y);
  y += 14;

  if (showValues) {
    let sum = integralAB + integralBC;
    fill(50, 100, 200);
    textSize(12);
    text(integralAB.toFixed(3), panelX + 8, y);

    fill('black');
    text(' + ', panelX + 55, y);

    fill(50, 150, 50);
    text(integralBC.toFixed(3), panelX + 72, y);
    y += 16;

    fill(0, 100, 0);
    textSize(14);
    textStyle(BOLD);
    text('= ' + sum.toFixed(3), panelX + 8, y);
    textStyle(NORMAL);
    y += 18;

    // Verification checkmark
    if (Math.abs(sum - integralAC) < 0.001) {
      fill(0, 150, 0);
      textSize(11);
      text('\u2713 Equals total!', panelX + 8, y);
    }
  }
}

function drawControls() {
  let cy = drawHeight + 10;
  let btnH = 28;
  let btnMargin = 8;

  // Function selector: prev/label/next
  btnFuncPrev = { x: 10, y: cy, w: 24, h: btnH };
  drawButton(btnFuncPrev, '\u25C0', false);

  // Function name display
  fill(240);
  stroke(180);
  strokeWeight(1);
  rect(38, cy, 160, btnH, 4);
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('f(x) = ' + funcNames[funcIndex], 38 + 80, cy + btnH / 2);

  btnFuncNext = { x: 202, y: cy, w: 24, h: btnH };
  drawButton(btnFuncNext, '\u25B6', false);

  // Toggle values button
  let toggleLabel = showValues ? 'Hide Values' : 'Show Values';
  btnToggle = { x: 238, y: cy, w: 90, h: btnH };
  drawButton(btnToggle, toggleLabel, false);

  // Animate button
  let animLabel = isAnimating ? 'Stop' : 'Animate';
  btnAnimate = { x: 338, y: cy, w: 72, h: btnH };
  drawButton(btnAnimate, animLabel, isAnimating);

  // Instruction text
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Drag the orange handle to move split point b', 10, drawHeight + 58);
}

function drawButton(btn, label, active) {
  // Button background
  if (active) {
    fill(220, 240, 255);
    stroke(100, 150, 200);
  } else if (isInsideButton(btn, mouseX, mouseY)) {
    fill(235, 235, 235);
    stroke(160);
  } else {
    fill(245, 245, 245);
    stroke(180);
  }
  strokeWeight(1);
  rect(btn.x, btn.y, btn.w, btn.h, 4);

  // Button label
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function isInsideButton(btn, mx, my) {
  return mx >= btn.x && mx <= btn.x + btn.w &&
         my >= btn.y && my <= btn.y + btn.h;
}

function numericalIntegral(start, end) {
  // Trapezoidal rule numerical integration
  let n = 200;
  let dx = (end - start) / n;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    let x0 = start + i * dx;
    let x1 = start + (i + 1) * dx;
    let y0 = funcDefs[funcIndex](x0);
    let y1 = funcDefs[funcIndex](x1);
    sum += (y0 + y1) / 2 * dx;
  }

  return sum;
}

function isOverDragHandle(handleX, handleY) {
  return dist(mouseX, mouseY, handleX, handleY) < dragHandleRadius + 5;
}

function mousePressed() {
  // Check drag handle first
  let pxB = map(b, a - 0.5, c + 0.5, graphLeft, graphRight);
  let handleY = graphBottom + 15;

  if (isOverDragHandle(pxB, handleY)) {
    isDraggingB = true;
    isAnimating = false;
    return;
  }

  // Check canvas-based buttons
  if (isInsideButton(btnFuncPrev, mouseX, mouseY)) {
    funcIndex = (funcIndex - 1 + funcNames.length) % funcNames.length;
    return;
  }
  if (isInsideButton(btnFuncNext, mouseX, mouseY)) {
    funcIndex = (funcIndex + 1) % funcNames.length;
    return;
  }
  if (isInsideButton(btnToggle, mouseX, mouseY)) {
    showValues = !showValues;
    return;
  }
  if (isInsideButton(btnAnimate, mouseX, mouseY)) {
    isAnimating = !isAnimating;
    return;
  }
}

function mouseDragged() {
  if (isDraggingB) {
    // Convert mouse position to b value
    let newB = map(mouseX, graphLeft, graphRight, a - 0.5, c + 0.5);
    b = constrain(newB, a + 0.05, c - 0.05);
  }
}

function mouseReleased() {
  isDraggingB = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.max(400, container.offsetWidth);
  }
}
