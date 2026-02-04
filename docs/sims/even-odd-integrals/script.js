// Even and Odd Function Integral Symmetry MicroSim
// Visualize how symmetry of even/odd functions affects definite integrals on [-a, a]
// Bloom Level: Analyze (L4), Verbs: analyze, predict, compare
// Learning Objective: Students will predict integral values based on function symmetry

let canvasWidth = 750;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 55;
let defaultTextSize = 16;

// Color scheme
const PURPLE_THEME = [128, 0, 128];
const POSITIVE_COLOR = [50, 120, 220, 130];   // Blue for right region
const NEGATIVE_COLOR = [220, 70, 70, 130];     // Red for left region (odd)
const EVEN_COLOR = [50, 120, 220, 130];        // Blue for both regions (even)
const NEITHER_LEFT = [220, 160, 50, 130];      // Gold for left (neither)
const NEITHER_RIGHT = [50, 120, 220, 130];     // Blue for right (neither)
const CURVE_COLOR = [40, 40, 40];
const AXIS_COLOR = [80, 80, 80];
const GRID_COLOR = [230, 230, 230];

// Function definitions
const FUNCTIONS = [
  { name: 'x^2',      type: 'even',    fn: x => x * x,              label: 'f(x) = x²',     latex: 'x^2' },
  { name: 'cos(x)',    type: 'even',    fn: x => Math.cos(x),        label: 'f(x) = cos(x)', latex: 'cos(x)' },
  { name: 'x^4',      type: 'even',    fn: x => x * x * x * x,      label: 'f(x) = x⁴',     latex: 'x^4' },
  { name: 'x^3',      type: 'odd',     fn: x => x * x * x,          label: 'f(x) = x³',     latex: 'x^3' },
  { name: 'sin(x)',    type: 'odd',     fn: x => Math.sin(x),        label: 'f(x) = sin(x)', latex: 'sin(x)' },
  { name: 'x',        type: 'odd',     fn: x => x,                  label: 'f(x) = x',      latex: 'x' },
  { name: 'x^2 + x',  type: 'neither', fn: x => x * x + x,          label: 'f(x) = x² + x', latex: 'x^2 + x' }
];

// State
let currentFunctionIndex = 0;
let intervalBound = 2.0;
let showValues = true;
let animationStage = 0; // 0=none, 1=show interval, 2=shade left, 3=shade right, 4=show result
let animationProgress = 0;
let isAnimating = false;

// Graph dimensions
let graphLeft, graphRight, graphTop, graphBottom;
let xMin, xMax, yMin, yMax;

// Control positions
let sliderX, sliderY, sliderW;
let dropdownX, dropdownY, dropdownW, dropdownH;
let showDropdown = false;
let toggleBtnX, toggleBtnY;
let animBtnX, animBtnY;
let resetBtnX, resetBtnY;

// Dragging
let isDraggingSlider = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  updateLayoutPositions();
  animationStage = 4; // Start fully revealed
  animationProgress = 1;
  describe('Interactive visualization showing how even and odd function symmetry affects definite integrals over symmetric intervals. Even functions show equal areas on both sides, odd functions show cancelling areas.', LABEL);
}

function updateLayoutPositions() {
  // Graph region
  graphLeft = margin + 55;
  graphRight = canvasWidth - margin - 20;
  graphTop = chartTop + 15;
  graphBottom = drawHeight - 60;

  // Controls
  dropdownX = 15;
  dropdownY = drawHeight + 12;
  dropdownW = 170;
  dropdownH = 28;

  sliderX = dropdownX + dropdownW + 20;
  sliderY = drawHeight + 26;
  sliderW = 180;

  toggleBtnX = sliderX + sliderW + 25;
  toggleBtnY = drawHeight + 12;

  animBtnX = toggleBtnX + 95;
  animBtnY = drawHeight + 12;

  resetBtnX = animBtnX + 95;
  resetBtnY = drawHeight + 12;
}

function getCurrentFunction() {
  return FUNCTIONS[currentFunctionIndex];
}

function computeGraphRange() {
  let a = intervalBound;
  let padding = Math.max(a * 0.3, 0.5);
  xMin = -(a + padding);
  xMax = a + padding;

  // Compute y range from function values
  let fn = getCurrentFunction().fn;
  let yMinVal = 0, yMaxVal = 0;
  for (let x = xMin; x <= xMax; x += 0.05) {
    let y = fn(x);
    if (isFinite(y)) {
      yMinVal = Math.min(yMinVal, y);
      yMaxVal = Math.max(yMaxVal, y);
    }
  }
  let yPad = Math.max((yMaxVal - yMinVal) * 0.15, 0.5);
  yMin = yMinVal - yPad;
  yMax = yMaxVal + yPad;
}

function mapX(val) {
  return map(val, xMin, xMax, graphLeft, graphRight);
}

function mapY(val) {
  return map(val, yMin, yMax, graphBottom, graphTop);
}

function unmapX(px) {
  return map(px, graphLeft, graphRight, xMin, xMax);
}

// Numerical integration using Simpson's rule
function numericalIntegrate(fn, a, b, n) {
  if (a >= b) return 0;
  if (n % 2 !== 0) n++;
  let h = (b - a) / n;
  let sum = fn(a) + fn(b);
  for (let i = 1; i < n; i++) {
    let x = a + i * h;
    sum += (i % 2 === 0 ? 2 : 4) * fn(x);
  }
  return sum * h / 3;
}

function draw() {
  updateCanvasSize();
  computeGraphRange();

  // Handle animation
  if (isAnimating) {
    animationProgress += 0.03;
    if (animationProgress >= 1) {
      animationProgress = 1;
      isAnimating = false;
      if (animationStage < 4) {
        animationStage++;
        if (animationStage <= 4) {
          animationProgress = 0;
          isAnimating = true;
        }
      }
    }
  }

  // Draw area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawGraph();
  drawInfoPanel();
  drawControls();

  // Draw dropdown on top of everything if open
  if (showDropdown) {
    drawDropdownMenu();
  }
}

function drawTitle() {
  let func = getCurrentFunction();
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Even & Odd Function Integral Symmetry', canvasWidth / 2, 5);

  textSize(14);
  fill(80);
  let typeLabel = func.type === 'even' ? '(Even Function)' :
                  func.type === 'odd'  ? '(Odd Function)' :
                  '(Neither Even nor Odd)';
  text(func.label + '  ' + typeLabel, canvasWidth / 2, 30);
}

function drawGraph() {
  // Graph background
  fill(255, 255, 255, 220);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft - 5, graphTop - 5, graphRight - graphLeft + 10, graphBottom - graphTop + 10, 5);

  drawGrid();

  // Draw shaded regions based on animation stage
  if (animationStage >= 2) {
    drawShadedRegion('left');
  }
  if (animationStage >= 3) {
    drawShadedRegion('right');
  }

  // Draw the function curve
  drawCurve();

  // Draw interval markers
  if (animationStage >= 1) {
    drawIntervalMarkers();
  }

  // Draw y-axis symmetry line
  drawSymmetryAxis();
}

function drawGrid() {
  stroke(GRID_COLOR);
  strokeWeight(1);

  // Vertical grid lines
  let xStep = getGridStep(xMax - xMin);
  for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
    let px = mapX(x);
    if (px > graphLeft && px < graphRight) {
      line(px, graphTop, px, graphBottom);
    }
  }

  // Horizontal grid lines
  let yStep = getGridStep(yMax - yMin);
  for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
    let py = mapY(y);
    if (py > graphTop && py < graphBottom) {
      line(graphLeft, py, graphRight, py);
    }
  }

  // Axes
  stroke(AXIS_COLOR);
  strokeWeight(1.5);

  // X-axis
  let y0 = mapY(0);
  if (y0 > graphTop && y0 < graphBottom) {
    line(graphLeft, y0, graphRight, y0);
    fill(AXIS_COLOR);
    noStroke();
    triangle(graphRight, y0, graphRight - 8, y0 - 4, graphRight - 8, y0 + 4);
  }

  // Y-axis
  let x0 = mapX(0);
  stroke(AXIS_COLOR);
  strokeWeight(1.5);
  if (x0 > graphLeft && x0 < graphRight) {
    line(x0, graphBottom, x0, graphTop);
    fill(AXIS_COLOR);
    noStroke();
    triangle(x0, graphTop, x0 - 4, graphTop + 8, x0 + 4, graphTop + 8);
  }

  // Axis labels
  fill(100);
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  if (y0 > graphTop && y0 < graphBottom) {
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      if (Math.abs(x) > xStep * 0.1) {
        let px = mapX(x);
        if (px > graphLeft + 15 && px < graphRight - 15) {
          text(nf(x, 0, Math.abs(x) < 10 ? 1 : 0), px, y0 + 5);
        }
      }
    }
  }

  textAlign(RIGHT, CENTER);
  if (x0 > graphLeft && x0 < graphRight) {
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      if (Math.abs(y) > yStep * 0.1) {
        let py = mapY(y);
        if (py > graphTop + 10 && py < graphBottom - 10) {
          text(nf(y, 0, 1), x0 - 8, py);
        }
      }
    }
  }

  // Axis name labels
  fill(60);
  textSize(13);
  textAlign(CENTER, TOP);
  text('x', graphRight - 8, (y0 > graphTop && y0 < graphBottom) ? y0 + 18 : graphBottom + 5);
  textAlign(RIGHT, CENTER);
  text('y', (x0 > graphLeft && x0 < graphRight) ? x0 - 15 : graphLeft - 5, graphTop + 12);
}

function getGridStep(range) {
  let raw = range / 8;
  let mag = Math.pow(10, Math.floor(Math.log10(raw)));
  let norm = raw / mag;
  if (norm < 1.5) return mag;
  if (norm < 3.5) return 2 * mag;
  if (norm < 7.5) return 5 * mag;
  return 10 * mag;
}

function drawShadedRegion(side) {
  let fn = getCurrentFunction().fn;
  let funcType = getCurrentFunction().type;
  let a = intervalBound;
  let numSteps = 200;

  let startX, endX;
  if (side === 'left') {
    startX = -a;
    endX = 0;
  } else {
    startX = 0;
    endX = a;
  }

  // Determine fill color based on function type and side
  if (funcType === 'even') {
    fill(EVEN_COLOR[0], EVEN_COLOR[1], EVEN_COLOR[2], EVEN_COLOR[3]);
  } else if (funcType === 'odd') {
    if (side === 'left') {
      fill(NEGATIVE_COLOR[0], NEGATIVE_COLOR[1], NEGATIVE_COLOR[2], NEGATIVE_COLOR[3]);
    } else {
      fill(POSITIVE_COLOR[0], POSITIVE_COLOR[1], POSITIVE_COLOR[2], POSITIVE_COLOR[3]);
    }
  } else {
    // Neither
    if (side === 'left') {
      fill(NEITHER_LEFT[0], NEITHER_LEFT[1], NEITHER_LEFT[2], NEITHER_LEFT[3]);
    } else {
      fill(NEITHER_RIGHT[0], NEITHER_RIGHT[1], NEITHER_RIGHT[2], NEITHER_RIGHT[3]);
    }
  }
  noStroke();

  // Animated fill: sweep from left to right within the region
  let effectiveEnd = endX;
  let effectiveStart = startX;
  let stageForSide = (side === 'left') ? 2 : 3;
  if (animationStage === stageForSide && isAnimating) {
    effectiveEnd = startX + (endX - startX) * animationProgress;
  }

  // Draw filled region between curve and x-axis
  let y0px = mapY(0);
  beginShape();
  vertex(mapX(effectiveStart), constrain(y0px, graphTop, graphBottom));
  for (let i = 0; i <= numSteps; i++) {
    let x = effectiveStart + (effectiveEnd - effectiveStart) * i / numSteps;
    let y = fn(x);
    if (isFinite(y)) {
      let px = mapX(x);
      let py = mapY(y);
      if (px >= graphLeft && px <= graphRight) {
        vertex(px, constrain(py, graphTop, graphBottom));
      }
    }
  }
  vertex(mapX(effectiveEnd), constrain(y0px, graphTop, graphBottom));
  endShape(CLOSE);
}

function drawCurve() {
  let fn = getCurrentFunction().fn;
  stroke(CURVE_COLOR);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let x = unmapX(px);
    let y = fn(x);
    if (isFinite(y)) {
      let py = mapY(y);
      if (py >= graphTop - 20 && py <= graphBottom + 20) {
        vertex(px, constrain(py, graphTop, graphBottom));
      }
    }
  }
  endShape();

  // Label the curve
  let func = getCurrentFunction();
  fill(CURVE_COLOR);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  textStyle(BOLD);
  let labelX = graphRight - 120;
  let sampleX = unmapX(labelX);
  let sampleY = fn(sampleX);
  let labelPy = mapY(sampleY);
  // Make sure label is in visible area
  if (labelPy < graphTop + 20) labelPy = graphTop + 20;
  if (labelPy > graphBottom - 20) labelPy = graphBottom - 20;
  text(func.label, labelX + 5, labelPy - 15);
  textStyle(NORMAL);
}

function drawIntervalMarkers() {
  let a = intervalBound;
  let y0 = mapY(0);

  // Dashed lines at x = -a and x = a
  stroke(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
  strokeWeight(2);
  drawingContext.setLineDash([6, 4]);

  let xNeg = mapX(-a);
  let xPos = mapX(a);
  if (xNeg >= graphLeft && xNeg <= graphRight) {
    line(xNeg, graphTop, xNeg, graphBottom);
  }
  if (xPos >= graphLeft && xPos <= graphRight) {
    line(xPos, graphTop, xPos, graphBottom);
  }
  drawingContext.setLineDash([]);

  // Labels
  fill(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  textStyle(BOLD);
  if (xNeg >= graphLeft && xNeg <= graphRight) {
    text('-a = ' + nf(-a, 0, 1), xNeg, graphBottom + 5);
  }
  if (xPos >= graphLeft && xPos <= graphRight) {
    text('a = ' + nf(a, 0, 1), xPos, graphBottom + 5);
  }
  textStyle(NORMAL);
}

function drawSymmetryAxis() {
  let x0 = mapX(0);
  if (x0 > graphLeft && x0 < graphRight) {
    // Already drawn as part of grid, but emphasize with label
    fill(100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('symmetry axis', x0, graphBottom + 22);
  }
}

function drawInfoPanel() {
  if (animationStage < 2) return;

  let fn = getCurrentFunction().fn;
  let funcType = getCurrentFunction().type;
  let a = intervalBound;

  // Compute integrals
  let leftArea = numericalIntegrate(fn, -a, 0, 200);
  let rightArea = numericalIntegrate(fn, 0, a, 200);
  let totalArea = leftArea + rightArea;

  // Info panel
  let panelX = graphLeft + 10;
  let panelY = graphTop + 10;
  let panelW = 220;
  let panelH = 120;

  if (animationStage >= 4) {
    panelH = funcType === 'neither' ? 125 : 130;
  }

  fill(255, 255, 255, 240);
  stroke(180);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  let ty = panelY + 8;
  let lineH = 20;

  // Title
  fill(60);
  textStyle(BOLD);
  text('Area Analysis:', panelX + 10, ty);
  textStyle(NORMAL);
  ty += lineH + 2;

  // Left region
  if (animationStage >= 2 && showValues) {
    if (funcType === 'odd') {
      fill(NEGATIVE_COLOR[0], NEGATIVE_COLOR[1], NEGATIVE_COLOR[2], 255);
    } else if (funcType === 'even') {
      fill(EVEN_COLOR[0], EVEN_COLOR[1], EVEN_COLOR[2], 255);
    } else {
      fill(NEITHER_LEFT[0], NEITHER_LEFT[1], NEITHER_LEFT[2], 255);
    }
    textSize(12);
    text('Left [-a, 0]:  ' + nf(leftArea, 0, 4), panelX + 10, ty);
    ty += lineH;
  }

  // Right region
  if (animationStage >= 3 && showValues) {
    if (funcType === 'odd') {
      fill(POSITIVE_COLOR[0], POSITIVE_COLOR[1], POSITIVE_COLOR[2], 255);
    } else if (funcType === 'even') {
      fill(EVEN_COLOR[0], EVEN_COLOR[1], EVEN_COLOR[2], 255);
    } else {
      fill(NEITHER_RIGHT[0], NEITHER_RIGHT[1], NEITHER_RIGHT[2], 255);
    }
    textSize(12);
    text('Right [0, a]:  ' + nf(rightArea, 0, 4), panelX + 10, ty);
    ty += lineH;
  }

  // Total / Result
  if (animationStage >= 4 && showValues) {
    stroke(100);
    strokeWeight(1);
    line(panelX + 10, ty - 2, panelX + panelW - 10, ty - 2);
    noStroke();

    fill(0);
    textSize(13);
    textStyle(BOLD);

    if (funcType === 'even') {
      text('Total = 2 x ' + nf(rightArea, 0, 4), panelX + 10, ty + 2);
      ty += lineH;
      fill(0, 130, 0);
      text('     = ' + nf(totalArea, 0, 4), panelX + 10, ty + 2);
    } else if (funcType === 'odd') {
      text('Total = ' + nf(leftArea, 0, 4) + ' + ' + nf(rightArea, 0, 4), panelX + 10, ty + 2);
      ty += lineH;
      fill(0, 130, 0);
      text('     = ' + nf(totalArea, 0, 4) + '  (cancels!)', panelX + 10, ty + 2);
    } else {
      text('Total = ' + nf(leftArea, 0, 4) + ' + ' + nf(rightArea, 0, 4), panelX + 10, ty + 2);
      ty += lineH;
      fill(0, 130, 0);
      text('     = ' + nf(totalArea, 0, 4), panelX + 10, ty + 2);
    }
    textStyle(NORMAL);
  }

  // Symmetry rule box (bottom right of graph)
  if (animationStage >= 4) {
    drawSymmetryRule();
  }
}

function drawSymmetryRule() {
  let funcType = getCurrentFunction().type;
  let ruleX = graphRight - 235;
  let ruleY = graphBottom - 55;
  let ruleW = 230;
  let ruleH = 50;

  // Background
  if (funcType === 'even') {
    fill(220, 240, 255, 240);
    stroke(50, 120, 220);
  } else if (funcType === 'odd') {
    fill(255, 230, 230, 240);
    stroke(220, 70, 70);
  } else {
    fill(255, 245, 220, 240);
    stroke(180, 130, 50);
  }
  strokeWeight(2);
  rect(ruleX, ruleY, ruleW, ruleH, 8);

  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);

  if (funcType === 'even') {
    fill(30, 80, 180);
    text('Even Function Rule:', ruleX + ruleW / 2, ruleY + 14);
    textSize(14);
    text('\u222B f(x)dx = 2 \u00D7 \u222B f(x)dx', ruleX + ruleW / 2, ruleY + 36);
    // Add subscript hints
    textSize(9);
    textStyle(NORMAL);
    text('-a to a              0 to a', ruleX + ruleW / 2, ruleY + 48);
  } else if (funcType === 'odd') {
    fill(180, 40, 40);
    text('Odd Function Rule:', ruleX + ruleW / 2, ruleY + 14);
    textSize(14);
    text('\u222B f(x)dx = 0', ruleX + ruleW / 2, ruleY + 36);
    textSize(9);
    textStyle(NORMAL);
    text('-a to a', ruleX + ruleW / 2, ruleY + 48);
  } else {
    fill(140, 100, 30);
    text('No Symmetry Shortcut', ruleX + ruleW / 2, ruleY + 14);
    textSize(11);
    textStyle(NORMAL);
    text('Must compute full integral', ruleX + ruleW / 2, ruleY + 36);
  }
  textStyle(NORMAL);
}

function drawControls() {
  // Function dropdown button
  fill(240);
  stroke(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
  strokeWeight(2);
  rect(dropdownX, dropdownY, dropdownW, dropdownH, 5);

  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text(getCurrentFunction().label, dropdownX + 8, dropdownY + dropdownH / 2);

  // Dropdown arrow
  fill(PURPLE_THEME);
  noStroke();
  let arrowX = dropdownX + dropdownW - 20;
  let arrowY = dropdownY + dropdownH / 2;
  triangle(arrowX - 5, arrowY - 3, arrowX + 5, arrowY - 3, arrowX, arrowY + 4);

  // Slider: interval bound a
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('a =', sliderX - 25, sliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 8, sliderW, 16, 8);

  // Slider fill
  let fillWidth = map(intervalBound, 0.5, 4, 0, sliderW);
  fill(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
  noStroke();
  rect(sliderX, sliderY - 8, fillWidth, 16, 8, 0, 0, 8);

  // Slider handle
  let handleX = sliderX + fillWidth;
  fill(255);
  stroke(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
  strokeWeight(2);
  circle(handleX, sliderY, 22);

  fill(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(nf(intervalBound, 0, 1), handleX, sliderY);

  // Show Values toggle
  let toggleW = 80;
  let toggleH = 28;
  fill(showValues ? [50, 160, 50] : [200, 200, 200]);
  stroke(showValues ? [30, 130, 30] : [180, 180, 180]);
  strokeWeight(1);
  rect(toggleBtnX, toggleBtnY, toggleW, toggleH, 5);

  fill(showValues ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(showValues ? 'Values ON' : 'Values OFF', toggleBtnX + toggleW / 2, toggleBtnY + toggleH / 2);

  // Animate button
  let animBtnW = 82;
  let animBtnH = 28;
  let canAnimate = animationStage < 4 || (animationStage >= 4 && !isAnimating);
  fill(isAnimating ? '#ff9800' : '#4CAF50');
  stroke(isAnimating ? '#f57c00' : '#388E3C');
  strokeWeight(1);
  rect(animBtnX, animBtnY, animBtnW, animBtnH, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(isAnimating ? 'Playing...' : 'Animate', animBtnX + animBtnW / 2, animBtnY + animBtnH / 2);

  // Reset button
  let resetW = 60;
  let resetH = 28;
  fill('#ff9800');
  stroke('#f57c00');
  strokeWeight(1);
  rect(resetBtnX, resetBtnY, resetW, resetH, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Reset', resetBtnX + resetW / 2, resetBtnY + resetH / 2);

  // Stage indicator
  drawStageIndicator();
}

function drawStageIndicator() {
  let stageY = drawHeight + 55;
  let stageLabels = ['Interval', 'Left Area', 'Right Area', 'Result'];
  let stageW = 70;
  let startX = 15;

  textSize(10);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < 4; i++) {
    let sx = startX + i * (stageW + 8);
    let stageNum = i + 1;
    let isActive = animationStage >= stageNum;
    let isCurrent = animationStage === stageNum;

    // Circle indicator
    if (isCurrent && isAnimating) {
      fill('#ff9800');
    } else if (isActive) {
      fill(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
    } else {
      fill(200);
    }
    noStroke();
    circle(sx + 10, stageY + 10, 16);

    fill('white');
    textSize(9);
    text(stageNum, sx + 10, stageY + 10);

    // Label
    fill(isActive ? 60 : 160);
    textSize(9);
    text(stageLabels[i], sx + 45, stageY + 10);
  }
}

function drawDropdownMenu() {
  let menuX = dropdownX;
  let menuY = dropdownY - FUNCTIONS.length * dropdownH - 5;
  let menuW = dropdownW;

  // Shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(menuX + 3, menuY + 3, menuW, FUNCTIONS.length * dropdownH + 4, 5);

  for (let i = 0; i < FUNCTIONS.length; i++) {
    let itemY = menuY + i * dropdownH;
    let isHover = mouseX >= menuX && mouseX <= menuX + menuW &&
                  mouseY >= itemY && mouseY <= itemY + dropdownH;
    let isSelected = i === currentFunctionIndex;

    if (isSelected) {
      fill(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2], 40);
    } else if (isHover) {
      fill(230, 230, 245);
    } else {
      fill(250);
    }
    stroke(200);
    strokeWeight(1);
    rect(menuX, itemY, menuW, dropdownH, i === 0 ? 5 : 0, i === 0 ? 5 : 0,
         i === FUNCTIONS.length - 1 ? 5 : 0, i === FUNCTIONS.length - 1 ? 5 : 0);

    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);

    // Type indicator
    let typeColor;
    if (FUNCTIONS[i].type === 'even') typeColor = [50, 120, 220];
    else if (FUNCTIONS[i].type === 'odd') typeColor = [220, 70, 70];
    else typeColor = [180, 130, 50];

    fill(typeColor);
    let typeLabel = FUNCTIONS[i].type === 'even' ? '[E]' :
                    FUNCTIONS[i].type === 'odd'  ? '[O]' : '[N]';
    text(typeLabel, menuX + 8, itemY + dropdownH / 2);

    fill(isSelected ? PURPLE_THEME : [60, 60, 60]);
    text(FUNCTIONS[i].label, menuX + 35, itemY + dropdownH / 2);
  }
}

function mousePressed() {
  // If dropdown is open, check menu items first
  if (showDropdown) {
    let menuX = dropdownX;
    let menuY = dropdownY - FUNCTIONS.length * dropdownH - 5;
    let menuW = dropdownW;

    for (let i = 0; i < FUNCTIONS.length; i++) {
      let itemY = menuY + i * dropdownH;
      if (mouseX >= menuX && mouseX <= menuX + menuW &&
          mouseY >= itemY && mouseY <= itemY + dropdownH) {
        currentFunctionIndex = i;
        showDropdown = false;
        // Reset to fully revealed for new function
        animationStage = 4;
        animationProgress = 1;
        isAnimating = false;
        return;
      }
    }
    showDropdown = false;
    return;
  }

  // Check dropdown button
  if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
      mouseY >= dropdownY && mouseY <= dropdownY + dropdownH) {
    showDropdown = !showDropdown;
    return;
  }

  // Check slider handle
  let fillWidth = map(intervalBound, 0.5, 4, 0, sliderW);
  let handleX = sliderX + fillWidth;
  if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check slider track
  if (mouseY > sliderY - 15 && mouseY < sliderY + 15 &&
      mouseX > sliderX && mouseX < sliderX + sliderW) {
    updateSlider();
    isDraggingSlider = true;
    return;
  }

  // Check toggle button
  let toggleW = 80;
  let toggleH = 28;
  if (mouseX >= toggleBtnX && mouseX <= toggleBtnX + toggleW &&
      mouseY >= toggleBtnY && mouseY <= toggleBtnY + toggleH) {
    showValues = !showValues;
    return;
  }

  // Check animate button
  let animBtnW = 82;
  let animBtnH = 28;
  if (mouseX >= animBtnX && mouseX <= animBtnX + animBtnW &&
      mouseY >= animBtnY && mouseY <= animBtnY + animBtnH) {
    if (!isAnimating) {
      // Start animation from beginning
      animationStage = 1;
      animationProgress = 0;
      isAnimating = true;
    }
    return;
  }

  // Check reset button
  let resetW = 60;
  let resetH = 28;
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + resetW &&
      mouseY >= resetBtnY && mouseY <= resetBtnY + resetH) {
    animationStage = 4;
    animationProgress = 1;
    isAnimating = false;
    return;
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    updateSlider();
  }
}

function mouseReleased() {
  isDraggingSlider = false;
}

function updateSlider() {
  let rawVal = map(mouseX, sliderX, sliderX + sliderW, 0.5, 4);
  intervalBound = constrain(rawVal, 0.5, 4);
  intervalBound = Math.round(intervalBound * 10) / 10;
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
