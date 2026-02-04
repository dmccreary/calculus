// Changing Bounds in u-Substitution MicroSim
// Visualize how the bounds of integration transform when using u-substitution
// Bloom Level: Apply (L3), Verbs: apply, transform, calculate
// Learning Objective: Students will evaluate definite integrals using u-substitution with changed bounds

let canvasWidth = 750;
let drawHeight = 460;
let controlHeight = 140;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 50;
let defaultTextSize = 16;

// Color scheme
const X_AREA_COLOR = [102, 51, 153, 80];     // Purple for x-domain area
const U_AREA_COLOR = [50, 150, 80, 80];       // Green for u-domain area
const X_CURVE_COLOR = [102, 51, 153];         // Purple for x-domain curve
const U_CURVE_COLOR = [50, 150, 80];          // Green for u-domain curve
const BOUND_COLOR = [220, 80, 60];            // Red for bound markers
const ARROW_COLOR = [50, 100, 200];           // Blue for transformation arrows
const ACCENT_BG = [255, 255, 240];            // Light yellow for info panels

// Coordinate ranges for graphs
let xGraphLeft, xGraphRight, xGraphTop, xGraphBottom;
let uGraphLeft, uGraphRight, uGraphTop, uGraphBottom;
let graphGap = 30;

// State
let selectedExample = 0;
let boundA = 0;
let boundB = 2;
let currentStage = 1;
let maxStages = 5;
let isAnimating = false;
let animationT = 0;
let animationSpeed = 0.015;

// Slider drag state
let isDraggingA = false;
let isDraggingB = false;

// Control positions
let sliderAX, sliderAY, sliderAW;
let sliderBX, sliderBY, sliderBW;
let exampleBtnsY;
let stageBtnsY;
let animBtnX, animBtnY;

// Examples: each has f(x)*g'(x), u=g(x), f(u), and analytical integral
const examples = [
  {
    name: '2x * cos(x^2)',
    label_fx: '2x cos(x^2)',
    label_u: 'u = x^2',
    label_fu: 'cos(u)',
    label_du: 'du = 2x dx',
    defaultA: 0,
    defaultB: 1.5,
    minA: 0,
    maxB: 2.5,
    // f(x) * g'(x) - the original integrand
    fxgx: function(x) { return 2 * x * Math.cos(x * x); },
    // g(x) - the substitution
    gx: function(x) { return x * x; },
    // f(u) - the transformed integrand
    fu: function(u) { return Math.cos(u); },
    // Antiderivative in u: sin(u)
    antideriv_u: function(u) { return Math.sin(u); },
    xRange: [-0.5, 3],
    yRange: [-3, 3],
    uRange: [-0.5, 7],
    uYRange: [-1.5, 1.5]
  },
  {
    name: '3x^2 * e^(x^3)',
    label_fx: '3x^2 e^(x^3)',
    label_u: 'u = x^3',
    label_fu: 'e^u',
    label_du: 'du = 3x^2 dx',
    defaultA: 0,
    defaultB: 1,
    minA: -0.5,
    maxB: 1.5,
    fxgx: function(x) { return 3 * x * x * Math.exp(x * x * x); },
    gx: function(x) { return x * x * x; },
    fu: function(u) { return Math.exp(u); },
    antideriv_u: function(u) { return Math.exp(u); },
    xRange: [-1, 2],
    yRange: [-1, 10],
    uRange: [-1, 4],
    uYRange: [-1, 10]
  },
  {
    name: '2x / (1 + x^2)',
    label_fx: '2x / (1+x^2)',
    label_u: 'u = 1 + x^2',
    label_fu: '1/u',
    label_du: 'du = 2x dx',
    defaultA: 0,
    defaultB: 2,
    minA: 0,
    maxB: 3,
    fxgx: function(x) { return 2 * x / (1 + x * x); },
    gx: function(x) { return 1 + x * x; },
    fu: function(u) { return u > 0.01 ? 1 / u : 100; },
    antideriv_u: function(u) { return u > 0 ? Math.log(u) : 0; },
    xRange: [-0.5, 3.5],
    yRange: [-0.5, 2],
    uRange: [-0.5, 11],
    uYRange: [-0.2, 1.5]
  },
  {
    name: 'cos(x) * e^(sin(x))',
    label_fx: 'cos(x) e^(sin(x))',
    label_u: 'u = sin(x)',
    label_fu: 'e^u',
    label_du: 'du = cos(x) dx',
    defaultA: 0,
    defaultB: 1.57,
    minA: -1,
    maxB: 3.14,
    fxgx: function(x) { return Math.cos(x) * Math.exp(Math.sin(x)); },
    gx: function(x) { return Math.sin(x); },
    fu: function(u) { return Math.exp(u); },
    antideriv_u: function(u) { return Math.exp(u); },
    xRange: [-1.5, 4],
    yRange: [-1, 4],
    uRange: [-1.5, 1.5],
    uYRange: [-0.5, 4]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  setDefaultBounds();
  updateLayoutPositions();

  describe('Side-by-side visualization of u-substitution showing how integration bounds transform from x-domain to u-domain. Left graph shows the original integrand with shaded area, right graph shows the transformed integrand with equivalent shaded area.', LABEL);
}

function setDefaultBounds() {
  let ex = examples[selectedExample];
  boundA = ex.defaultA;
  boundB = ex.defaultB;
}

function updateLayoutPositions() {
  let graphWidth = (canvasWidth - 3 * margin - graphGap) / 2;

  // Left graph (x-domain)
  xGraphLeft = margin + 40;
  xGraphRight = xGraphLeft + graphWidth - 20;
  xGraphTop = chartTop + 15;
  xGraphBottom = drawHeight - 40;

  // Right graph (u-domain)
  uGraphLeft = xGraphRight + graphGap + 40;
  uGraphRight = uGraphLeft + graphWidth - 20;
  uGraphTop = chartTop + 15;
  uGraphBottom = drawHeight - 40;

  // Slider A
  sliderAX = 20;
  sliderAY = drawHeight + 18;
  sliderAW = canvasWidth * 0.35;

  // Slider B
  sliderBX = 20;
  sliderBY = drawHeight + 48;
  sliderBW = canvasWidth * 0.35;

  // Example buttons
  exampleBtnsY = drawHeight + 82;

  // Stage buttons
  stageBtnsY = drawHeight + 115;

  // Animate button
  animBtnX = canvasWidth * 0.38 + 10;
  animBtnY = drawHeight + 15;
}

function draw() {
  updateCanvasSize();

  // Handle animation
  if (isAnimating) {
    animationT += animationSpeed;
    if (animationT >= 1) {
      animationT = 1;
      isAnimating = false;
    }
  }

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  drawTitle();

  // Draw both graphs
  drawXGraph();
  drawUGraph();

  // Draw transformation arrows between graphs
  if (currentStage >= 2) {
    drawTransformationArrows();
  }

  // Draw info panel
  drawInfoPanel();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Changing Bounds in u-Substitution', canvasWidth / 2, 5);

  textSize(13);
  fill(100);
  let ex = examples[selectedExample];
  text(ex.label_u + '     ' + ex.label_du, canvasWidth / 2, 28);
}

function drawXGraph() {
  let ex = examples[selectedExample];
  let xR = ex.xRange;
  let yR = ex.yRange;

  push();

  // Graph border
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(xGraphLeft - 5, xGraphTop - 5, xGraphRight - xGraphLeft + 10, xGraphBottom - xGraphTop + 10, 4);

  // Clip to graph area
  // Draw grid
  drawGrid(xGraphLeft, xGraphTop, xGraphRight, xGraphBottom, xR, yR);

  // Draw shaded area under curve between bounds
  if (currentStage >= 1) {
    drawShadedArea(xGraphLeft, xGraphTop, xGraphRight, xGraphBottom,
                   xR, yR, ex.fxgx, boundA, boundB, X_AREA_COLOR);
  }

  // Draw curve
  stroke(X_CURVE_COLOR[0], X_CURVE_COLOR[1], X_CURVE_COLOR[2]);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let px = xGraphLeft; px <= xGraphRight; px += 1) {
    let x = map(px, xGraphLeft, xGraphRight, xR[0], xR[1]);
    let y = ex.fxgx(x);
    let py = map(y, yR[0], yR[1], xGraphBottom, xGraphTop);
    py = constrain(py, xGraphTop - 5, xGraphBottom + 5);
    vertex(px, py);
  }
  endShape();

  // Draw bound markers
  if (currentStage >= 1) {
    drawBoundMarker(xGraphLeft, xGraphTop, xGraphRight, xGraphBottom,
                    xR, yR, boundA, 'a=' + nf(boundA, 1, 2), BOUND_COLOR);
    drawBoundMarker(xGraphLeft, xGraphTop, xGraphRight, xGraphBottom,
                    xR, yR, boundB, 'b=' + nf(boundB, 1, 2), BOUND_COLOR);
  }

  // Graph label
  noStroke();
  fill(X_CURVE_COLOR[0], X_CURVE_COLOR[1], X_CURVE_COLOR[2]);
  textAlign(CENTER, TOP);
  textSize(13);
  textStyle(BOLD);
  text('x-domain', (xGraphLeft + xGraphRight) / 2, xGraphBottom + 14);
  textStyle(NORMAL);
  textSize(11);
  text('f(x) = ' + ex.label_fx, (xGraphLeft + xGraphRight) / 2, xGraphBottom + 28);

  pop();
}

function drawUGraph() {
  let ex = examples[selectedExample];
  let uR = ex.uRange;
  let yR = ex.uYRange;

  let uA = ex.gx(boundA);
  let uB = ex.gx(boundB);
  let uLow = Math.min(uA, uB);
  let uHigh = Math.max(uA, uB);

  push();

  // Graph border
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(uGraphLeft - 5, uGraphTop - 5, uGraphRight - uGraphLeft + 10, uGraphBottom - uGraphTop + 10, 4);

  // Draw grid
  drawGrid(uGraphLeft, uGraphTop, uGraphRight, uGraphBottom, uR, yR);

  // Draw shaded area in u-domain
  if (currentStage >= 3) {
    let fadeAlpha = currentStage >= 4 ? 1 : (isAnimating ? animationT : 1);
    let areaColor = [U_AREA_COLOR[0], U_AREA_COLOR[1], U_AREA_COLOR[2], U_AREA_COLOR[3] * fadeAlpha];
    drawShadedArea(uGraphLeft, uGraphTop, uGraphRight, uGraphBottom,
                   uR, yR, ex.fu, uLow, uHigh, areaColor);
  }

  // Draw curve
  stroke(U_CURVE_COLOR[0], U_CURVE_COLOR[1], U_CURVE_COLOR[2]);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let px = uGraphLeft; px <= uGraphRight; px += 1) {
    let u = map(px, uGraphLeft, uGraphRight, uR[0], uR[1]);
    let y = ex.fu(u);
    let py = map(y, yR[0], yR[1], uGraphBottom, uGraphTop);
    py = constrain(py, uGraphTop - 5, uGraphBottom + 5);
    vertex(px, py);
  }
  endShape();

  // Draw bound markers in u-domain
  if (currentStage >= 3) {
    drawBoundMarker(uGraphLeft, uGraphTop, uGraphRight, uGraphBottom,
                    uR, yR, uA, 'g(a)=' + nf(uA, 1, 2), BOUND_COLOR);
    drawBoundMarker(uGraphLeft, uGraphTop, uGraphRight, uGraphBottom,
                    uR, yR, uB, 'g(b)=' + nf(uB, 1, 2), BOUND_COLOR);
  }

  // Graph label
  noStroke();
  fill(U_CURVE_COLOR[0], U_CURVE_COLOR[1], U_CURVE_COLOR[2]);
  textAlign(CENTER, TOP);
  textSize(13);
  textStyle(BOLD);
  text('u-domain', (uGraphLeft + uGraphRight) / 2, uGraphBottom + 14);
  textStyle(NORMAL);
  textSize(11);
  text('f(u) = ' + ex.label_fu, (uGraphLeft + uGraphRight) / 2, uGraphBottom + 28);

  pop();
}

function drawGrid(gLeft, gTop, gRight, gBottom, xRange, yRange) {
  // Light grid lines
  stroke(230);
  strokeWeight(0.5);

  // Vertical grid lines
  let xStep = getGridStep(xRange[1] - xRange[0]);
  for (let x = Math.ceil(xRange[0] / xStep) * xStep; x <= xRange[1]; x += xStep) {
    let px = map(x, xRange[0], xRange[1], gLeft, gRight);
    line(px, gTop, px, gBottom);

    // Label
    noStroke();
    fill(150);
    textAlign(CENTER, TOP);
    textSize(9);
    if (Math.abs(x) > 0.001) {
      text(nf(x, 0, 1), px, gBottom + 2);
    }
    stroke(230);
    strokeWeight(0.5);
  }

  // Horizontal grid lines
  let yStep = getGridStep(yRange[1] - yRange[0]);
  for (let y = Math.ceil(yRange[0] / yStep) * yStep; y <= yRange[1]; y += yStep) {
    let py = map(y, yRange[0], yRange[1], gBottom, gTop);
    line(gLeft, py, gRight, py);

    // Label
    noStroke();
    fill(150);
    textAlign(RIGHT, CENTER);
    textSize(9);
    if (Math.abs(y) > 0.001) {
      text(nf(y, 0, 1), gLeft - 4, py);
    }
    stroke(230);
    strokeWeight(0.5);
  }

  // Axes
  stroke(100);
  strokeWeight(1);

  // x-axis
  if (yRange[0] <= 0 && yRange[1] >= 0) {
    let axisY = map(0, yRange[0], yRange[1], gBottom, gTop);
    line(gLeft, axisY, gRight, axisY);
  }

  // y-axis
  if (xRange[0] <= 0 && xRange[1] >= 0) {
    let axisX = map(0, xRange[0], xRange[1], gLeft, gRight);
    line(axisX, gTop, axisX, gBottom);
  }
}

function getGridStep(range) {
  if (range <= 2) return 0.5;
  if (range <= 5) return 1;
  if (range <= 10) return 2;
  return 5;
}

function drawShadedArea(gLeft, gTop, gRight, gBottom, xRange, yRange, fn, a, b, col) {
  let pxA = map(a, xRange[0], xRange[1], gLeft, gRight);
  let pxB = map(b, xRange[0], xRange[1], gLeft, gRight);
  let axisY = map(0, yRange[0], yRange[1], gBottom, gTop);
  axisY = constrain(axisY, gTop, gBottom);

  pxA = constrain(pxA, gLeft, gRight);
  pxB = constrain(pxB, gLeft, gRight);

  let startPx = Math.min(pxA, pxB);
  let endPx = Math.max(pxA, pxB);

  fill(col[0], col[1], col[2], col[3]);
  noStroke();
  beginShape();
  // Bottom edge (axis)
  vertex(startPx, axisY);

  // Curve from a to b
  for (let px = startPx; px <= endPx; px += 1) {
    let x = map(px, gLeft, gRight, xRange[0], xRange[1]);
    let y = fn(x);
    let py = map(y, yRange[0], yRange[1], gBottom, gTop);
    py = constrain(py, gTop, gBottom);
    vertex(px, py);
  }

  // Close back to axis
  vertex(endPx, axisY);
  endShape(CLOSE);
}

function drawBoundMarker(gLeft, gTop, gRight, gBottom, xRange, yRange, val, label, col) {
  let px = map(val, xRange[0], xRange[1], gLeft, gRight);
  px = constrain(px, gLeft, gRight);

  // Vertical dashed line
  stroke(col[0], col[1], col[2]);
  strokeWeight(2);
  for (let y = gTop; y < gBottom; y += 6) {
    line(px, y, px, min(y + 3, gBottom));
  }

  // Label
  noStroke();
  fill(col[0], col[1], col[2]);
  textAlign(CENTER, BOTTOM);
  textSize(10);
  textStyle(BOLD);
  text(label, px, gTop - 2);
  textStyle(NORMAL);
}

function drawTransformationArrows() {
  let ex = examples[selectedExample];
  let midY = (xGraphTop + xGraphBottom) / 2;

  let arrowStartX = xGraphRight + 8;
  let arrowEndX = uGraphLeft - 8;
  let arrowMidX = (arrowStartX + arrowEndX) / 2;

  // Animated dots moving along arrow during animation
  let numDots = 3;
  let dotSpacing = 15;

  // Draw curved arrow
  stroke(ARROW_COLOR[0], ARROW_COLOR[1], ARROW_COLOR[2]);
  strokeWeight(2);
  noFill();

  // Top arrow: a -> g(a)
  let topY = midY - 30;
  bezier(arrowStartX, topY, arrowMidX - 10, topY - 25, arrowMidX + 10, topY - 25, arrowEndX, topY);

  // Arrowhead
  fill(ARROW_COLOR[0], ARROW_COLOR[1], ARROW_COLOR[2]);
  let angle1 = atan2(0, 1);
  push();
  translate(arrowEndX, topY);
  rotate(angle1 - PI/6);
  triangle(0, 0, -10, -4, -10, 4);
  pop();

  // Bottom arrow: b -> g(b)
  let botY = midY + 30;
  noFill();
  bezier(arrowStartX, botY, arrowMidX - 10, botY + 25, arrowMidX + 10, botY + 25, arrowEndX, botY);

  // Arrowhead
  fill(ARROW_COLOR[0], ARROW_COLOR[1], ARROW_COLOR[2]);
  push();
  translate(arrowEndX, botY);
  rotate(angle1 + PI/6);
  triangle(0, 0, -10, -4, -10, 4);
  pop();

  // Label
  noStroke();
  fill(ARROW_COLOR[0], ARROW_COLOR[1], ARROW_COLOR[2]);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text(ex.label_u, arrowMidX, midY);
  textStyle(NORMAL);

  // Animated dots
  if (isAnimating) {
    for (let i = 0; i < numDots; i++) {
      let t = (animationT + i * 0.15) % 1;
      fill(ARROW_COLOR[0], ARROW_COLOR[1], ARROW_COLOR[2], 200);
      noStroke();

      // Top arrow dots
      let dx1 = bezierPoint(arrowStartX, arrowMidX - 10, arrowMidX + 10, arrowEndX, t);
      let dy1 = bezierPoint(topY, topY - 25, topY - 25, topY, t);
      circle(dx1, dy1, 6);

      // Bottom arrow dots
      let dx2 = bezierPoint(arrowStartX, arrowMidX - 10, arrowMidX + 10, arrowEndX, t);
      let dy2 = bezierPoint(botY, botY + 25, botY + 25, botY, t);
      circle(dx2, dy2, 6);
    }
  }
}

function drawInfoPanel() {
  let ex = examples[selectedExample];
  let uA = ex.gx(boundA);
  let uB = ex.gx(boundB);

  // Info panel between graphs at top
  let panelX = xGraphRight + 5;
  let panelW = uGraphLeft - xGraphRight - 10;
  let panelY = xGraphTop - 5;
  let panelH = 80;

  // Only draw if enough space
  if (panelW < 60) return;

  // Compute areas
  let areaX = numericalIntegral(ex.fxgx, boundA, boundB, 200);
  let areaU = ex.antideriv_u(uB) - ex.antideriv_u(uA);

  // Stage-dependent info
  noStroke();
  textAlign(CENTER, CENTER);

  if (currentStage >= 5) {
    // Show area equality
    fill(ACCENT_BG[0], ACCENT_BG[1], ACCENT_BG[2]);
    stroke(180);
    strokeWeight(1);

    let eqPanelY = xGraphBottom - 70;
    let eqPanelH = 65;
    rect(panelX, eqPanelY, panelW, eqPanelH, 4);

    noStroke();
    fill(100);
    textSize(9);
    text('Areas Equal!', panelX + panelW/2, eqPanelY + 10);

    fill(X_CURVE_COLOR[0], X_CURVE_COLOR[1], X_CURVE_COLOR[2]);
    textSize(10);
    text(nf(areaX, 1, 4), panelX + panelW/2, eqPanelY + 26);

    fill(80);
    text('=', panelX + panelW/2, eqPanelY + 38);

    fill(U_CURVE_COLOR[0], U_CURVE_COLOR[1], U_CURVE_COLOR[2]);
    textSize(10);
    text(nf(areaU, 1, 4), panelX + panelW/2, eqPanelY + 52);
  }
}

function drawControls() {
  let ex = examples[selectedExample];
  let uA = ex.gx(boundA);
  let uB = ex.gx(boundB);

  // --- Row 1: Sliders and stage info ---

  // Slider A
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(12);
  text('a:', sliderAX, sliderAY + 8);

  drawSlider(sliderAX + 20, sliderAY, sliderAW, ex.minA, ex.maxB, boundA, X_CURVE_COLOR);

  // Slider B
  text('b:', sliderBX, sliderBY + 8);
  drawSlider(sliderBX + 20, sliderBY, sliderBW, ex.minA, ex.maxB, boundB, X_CURVE_COLOR);

  // Stage display on the right
  let stageX = canvasWidth * 0.4;
  let stageY = drawHeight + 12;
  let stageW = canvasWidth * 0.58;

  // Stage info box
  fill(ACCENT_BG[0], ACCENT_BG[1], ACCENT_BG[2]);
  stroke(200);
  strokeWeight(1);
  rect(stageX, stageY, stageW, 68, 6);

  noStroke();
  fill(80);
  textAlign(LEFT, TOP);
  textSize(11);

  let infoLines = getStageInfo(ex, uA, uB);
  for (let i = 0; i < infoLines.length; i++) {
    fill(infoLines[i].color || [80, 80, 80]);
    text(infoLines[i].text, stageX + 10, stageY + 6 + i * 15);
  }

  // --- Row 2: Example buttons ---
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Example:', 20, exampleBtnsY + 14);

  let exBtnX = 85;
  let exBtnW = Math.min(150, (canvasWidth - 120) / examples.length - 5);

  for (let i = 0; i < examples.length; i++) {
    let isSelected = selectedExample === i;
    fill(isSelected ? '#7b1fa2' : '#e0e0e0');
    stroke(isSelected ? '#6a1b9a' : '#bdbdbd');
    strokeWeight(1);
    rect(exBtnX + i * (exBtnW + 4), exampleBtnsY, exBtnW, 26, 4);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(examples[i].name, exBtnX + i * (exBtnW + 4) + exBtnW / 2, exampleBtnsY + 13);
  }

  // --- Row 3: Stage navigation buttons ---
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Stage:', 20, stageBtnsY + 13);

  let stageBtnX = 70;
  let stageBtnW = 36;

  for (let i = 1; i <= maxStages; i++) {
    let isSelected = currentStage === i;
    let isReached = currentStage >= i;

    fill(isSelected ? '#2196F3' : (isReached ? '#90CAF9' : '#e0e0e0'));
    stroke(isSelected ? '#1976D2' : (isReached ? '#64B5F6' : '#bdbdbd'));
    strokeWeight(1);
    rect(stageBtnX + (i - 1) * (stageBtnW + 3), stageBtnsY, stageBtnW, 24, 4);

    fill(isSelected ? 'white' : (isReached ? '#1565C0' : '#666'));
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(i, stageBtnX + (i - 1) * (stageBtnW + 3) + stageBtnW / 2, stageBtnsY + 12);
  }

  // Show All button
  let showAllX = stageBtnX + maxStages * (stageBtnW + 3) + 5;
  fill(currentStage >= maxStages ? '#cccccc' : '#4CAF50');
  stroke(currentStage >= maxStages ? '#aaaaaa' : '#388E3C');
  strokeWeight(1);
  rect(showAllX, stageBtnsY, 68, 24, 4);

  fill(currentStage >= maxStages ? '#888888' : 'white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Show All', showAllX + 34, stageBtnsY + 12);

  // Animate button
  let animX = showAllX + 75;
  fill(isAnimating ? '#ff9800' : '#2196F3');
  stroke(isAnimating ? '#f57c00' : '#1976D2');
  strokeWeight(1);
  rect(animX, stageBtnsY, 68, 24, 4);

  fill('white');
  noStroke();
  text(isAnimating ? 'Stop' : 'Animate', animX + 34, stageBtnsY + 12);

  // Reset button
  let resetX = animX + 75;
  fill('#ff5722');
  stroke('#e64a19');
  strokeWeight(1);
  rect(resetX, stageBtnsY, 55, 24, 4);

  fill('white');
  noStroke();
  text('Reset', resetX + 27.5, stageBtnsY + 12);
}

function getStageInfo(ex, uA, uB) {
  let lines = [];
  let purple = [X_CURVE_COLOR[0], X_CURVE_COLOR[1], X_CURVE_COLOR[2]];
  let green = [U_CURVE_COLOR[0], U_CURVE_COLOR[1], U_CURVE_COLOR[2]];
  let red = [BOUND_COLOR[0], BOUND_COLOR[1], BOUND_COLOR[2]];
  let blue = [ARROW_COLOR[0], ARROW_COLOR[1], ARROW_COLOR[2]];

  switch (currentStage) {
    case 1:
      lines.push({text: 'Stage 1: Original integral in x', color: purple});
      lines.push({text: 'Integral from ' + nf(boundA, 1, 2) + ' to ' + nf(boundB, 1, 2) + ' of ' + ex.label_fx + ' dx', color: [60,60,60]});
      lines.push({text: 'The purple shaded region shows the area.', color: [100,100,100]});
      lines.push({text: 'Adjust a and b sliders to change bounds.', color: [130,130,130]});
      break;
    case 2:
      lines.push({text: 'Stage 2: Substitution ' + ex.label_u, color: blue});
      lines.push({text: ex.label_du, color: blue});
      lines.push({text: 'Integrand becomes ' + ex.label_fu + ' du', color: green});
      lines.push({text: 'Now we need to change the bounds...', color: [130,130,130]});
      break;
    case 3:
      lines.push({text: 'Stage 3: Transform bounds', color: red});
      lines.push({text: 'x=a=' + nf(boundA, 1, 2) + '  ->  u=g(a)=' + nf(uA, 1, 3), color: red});
      lines.push({text: 'x=b=' + nf(boundB, 1, 2) + '  ->  u=g(b)=' + nf(uB, 1, 3), color: red});
      lines.push({text: 'New bounds: [' + nf(uA, 1, 3) + ', ' + nf(uB, 1, 3) + ']', color: [60,60,60]});
      break;
    case 4:
      lines.push({text: 'Stage 4: New integral in u', color: green});
      lines.push({text: 'Integral from ' + nf(uA, 1, 3) + ' to ' + nf(uB, 1, 3) + ' of ' + ex.label_fu + ' du', color: green});
      lines.push({text: 'This is equivalent to the original integral!', color: [100,100,100]});
      lines.push({text: 'Both regions have the same area.', color: [130,130,130]});
      break;
    case 5:
      let areaX = numericalIntegral(ex.fxgx, boundA, boundB, 200);
      let areaU = ex.antideriv_u(uB) - ex.antideriv_u(uA);
      lines.push({text: 'Stage 5: Areas are equal!', color: [0, 150, 80]});
      lines.push({text: 'Area (x-domain) = ' + nf(areaX, 1, 5), color: purple});
      lines.push({text: 'Area (u-domain) = ' + nf(areaU, 1, 5), color: green});
      lines.push({text: 'Difference: ' + nf(Math.abs(areaX - areaU), 1, 8), color: [130,130,130]});
      break;
  }
  return lines;
}

function drawSlider(x, y, w, minVal, maxVal, val, col) {
  // Track
  stroke(200);
  strokeWeight(1);
  fill(230);
  rect(x, y + 4, w, 8, 4);

  // Filled portion
  let filledW = map(val, minVal, maxVal, 0, w);
  fill(col[0], col[1], col[2], 100);
  noStroke();
  rect(x, y + 4, filledW, 8, 4);

  // Handle
  let handleX = map(val, minVal, maxVal, x, x + w);
  fill(col[0], col[1], col[2]);
  stroke(255);
  strokeWeight(2);
  circle(handleX, y + 8, 16);

  // Value label
  noStroke();
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(11);
  text(nf(val, 1, 2), x + w + 8, y + 8);
}

function numericalIntegral(fn, a, b, n) {
  // Simpson's rule
  if (n % 2 !== 0) n++;
  let h = (b - a) / n;
  let sum = fn(a) + fn(b);

  for (let i = 1; i < n; i++) {
    let x = a + i * h;
    sum += (i % 2 === 0 ? 2 : 4) * fn(x);
  }

  return sum * h / 3;
}

function mousePressed() {
  let ex = examples[selectedExample];

  // Check slider A
  let handleAX = map(boundA, ex.minA, ex.maxB, sliderAX + 20, sliderAX + 20 + sliderAW);
  if (dist(mouseX, mouseY, handleAX, sliderAY + 8) < 12) {
    isDraggingA = true;
    return;
  }

  // Check slider B
  let handleBX = map(boundB, ex.minA, ex.maxB, sliderBX + 20, sliderBX + 20 + sliderBW);
  if (dist(mouseX, mouseY, handleBX, sliderBY + 8) < 12) {
    isDraggingB = true;
    return;
  }

  // Check example buttons
  let exBtnX = 85;
  let exBtnW = Math.min(150, (canvasWidth - 120) / examples.length - 5);

  for (let i = 0; i < examples.length; i++) {
    if (mouseX >= exBtnX + i * (exBtnW + 4) &&
        mouseX <= exBtnX + i * (exBtnW + 4) + exBtnW &&
        mouseY >= exampleBtnsY && mouseY <= exampleBtnsY + 26) {
      if (selectedExample !== i) {
        selectedExample = i;
        setDefaultBounds();
        currentStage = 1;
        isAnimating = false;
        animationT = 0;
      }
      return;
    }
  }

  // Check stage buttons
  let stageBtnX = 70;
  let stageBtnW = 36;

  for (let i = 1; i <= maxStages; i++) {
    if (mouseX >= stageBtnX + (i - 1) * (stageBtnW + 3) &&
        mouseX <= stageBtnX + (i - 1) * (stageBtnW + 3) + stageBtnW &&
        mouseY >= stageBtnsY && mouseY <= stageBtnsY + 24) {
      currentStage = i;
      return;
    }
  }

  // Check Show All button
  let showAllX = stageBtnX + maxStages * (stageBtnW + 3) + 5;
  if (mouseX >= showAllX && mouseX <= showAllX + 68 &&
      mouseY >= stageBtnsY && mouseY <= stageBtnsY + 24) {
    currentStage = maxStages;
    return;
  }

  // Check Animate button
  let animX = showAllX + 75;
  if (mouseX >= animX && mouseX <= animX + 68 &&
      mouseY >= stageBtnsY && mouseY <= stageBtnsY + 24) {
    if (isAnimating) {
      isAnimating = false;
    } else {
      isAnimating = true;
      animationT = 0;
      // Walk through all stages
      currentStage = maxStages;
    }
    return;
  }

  // Check Reset button
  let resetX = animX + 75;
  if (mouseX >= resetX && mouseX <= resetX + 55 &&
      mouseY >= stageBtnsY && mouseY <= stageBtnsY + 24) {
    currentStage = 1;
    isAnimating = false;
    animationT = 0;
    setDefaultBounds();
    return;
  }
}

function mouseDragged() {
  let ex = examples[selectedExample];

  if (isDraggingA) {
    let newVal = map(mouseX, sliderAX + 20, sliderAX + 20 + sliderAW, ex.minA, ex.maxB);
    boundA = constrain(newVal, ex.minA, boundB - 0.1);
    return;
  }

  if (isDraggingB) {
    let newVal = map(mouseX, sliderBX + 20, sliderBX + 20 + sliderBW, ex.minA, ex.maxB);
    boundB = constrain(newVal, boundA + 0.1, ex.maxB);
    return;
  }
}

function mouseReleased() {
  isDraggingA = false;
  isDraggingB = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayoutPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = max(canvasWidth, 650);
  updateLayoutPositions();
}
