// Intermediate Value Theorem Visualization MicroSim
// Students explore how IVT guarantees existence of roots for continuous functions
// Features Delta robot traveling along curve to demonstrate crossing intermediate values
// MicroSim template version 2026.02
// schema: https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 120;  // Three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let sliderLeftMargin = 60;
let defaultTextSize = 16;

// Graph dimensions within drawing area
let graphMargin = 60;
let graphLeft, graphRight, graphTop, graphBottom;
let graphWidth, graphHeight;

// Function definitions - continuous functions for IVT demonstration
let functions = [
  {
    name: 'f(x) = x^2 - 2',
    fn: x => x*x - 2,
    description: 'Parabola shifted down'
  },
  {
    name: 'f(x) = sin(x)',
    fn: x => Math.sin(x),
    description: 'Sine wave'
  },
  {
    name: 'f(x) = x^3 - x',
    fn: x => x*x*x - x,
    description: 'Cubic with two turning points'
  },
  {
    name: 'f(x) = cos(x) + x/2',
    fn: x => Math.cos(x) + x/2,
    description: 'Cosine plus linear'
  },
  {
    name: 'f(x) = 2^x - 3',
    fn: x => Math.pow(2, x) - 3,
    description: 'Exponential shifted down'
  }
];
let currentFunctionIndex = 0;

// IVT parameters
let aValue = -2;  // Left endpoint
let bValue = 2;   // Right endpoint
let nValue = 0;   // Target value N

// Delta robot animation
let deltaX = -2;  // Current x position of Delta
let deltaProgress = 0;  // 0 to 1 progress along journey
let isAnimating = false;
let animationSpeed = 0.008;

// Stage tracking for step-through
let currentStage = 0;  // 0: Initial, 1: Show f(a),f(b), 2: Show N, 3: Animate/Show crossing, 4: Show solution
let hasAnimated = false;

// UI elements
let functionSelect;
let stepButton;
let resetButton;
let aSlider;
let bSlider;
let nSlider;
let showAllCheckbox;

// Solutions cache
let solutions = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateGraphBounds();

  // Row 1: Function selector and buttons
  functionSelect = createSelect();
  functionSelect.position(10, drawHeight + 8);
  for (let i = 0; i < functions.length; i++) {
    functionSelect.option(functions[i].name, i);
  }
  functionSelect.changed(() => {
    currentFunctionIndex = parseInt(functionSelect.value());
    resetSimulation();
  });

  stepButton = createButton('Step Forward');
  stepButton.position(180, drawHeight + 5);
  stepButton.mousePressed(stepForward);

  resetButton = createButton('Reset');
  resetButton.position(290, drawHeight + 5);
  resetButton.mousePressed(resetSimulation);

  // Row 2: a and b sliders
  aSlider = createSlider(-4, 4, aValue, 0.1);
  aSlider.position(sliderLeftMargin, drawHeight + 42);
  aSlider.size((canvasWidth - sliderLeftMargin * 2 - margin * 2) / 2 - 20);
  aSlider.input(() => {
    aValue = aSlider.value();
    if (aValue >= bValue) {
      bValue = aValue + 0.1;
      bSlider.value(bValue);
    }
    constrainNValue();
    findSolutions();
    if (currentStage > 0) currentStage = 1;
    hasAnimated = false;
  });

  bSlider = createSlider(-4, 4, bValue, 0.1);
  bSlider.position(canvasWidth / 2 + 30, drawHeight + 42);
  bSlider.size((canvasWidth - sliderLeftMargin * 2 - margin * 2) / 2 - 20);
  bSlider.input(() => {
    bValue = bSlider.value();
    if (bValue <= aValue) {
      aValue = bValue - 0.1;
      aSlider.value(aValue);
    }
    constrainNValue();
    findSolutions();
    if (currentStage > 0) currentStage = 1;
    hasAnimated = false;
  });

  // Row 3: N slider and checkbox
  nSlider = createSlider(-5, 5, nValue, 0.1);
  nSlider.position(sliderLeftMargin, drawHeight + 82);
  nSlider.size(canvasWidth / 2 - sliderLeftMargin - 40);
  nSlider.input(() => {
    nValue = nSlider.value();
    findSolutions();
    if (currentStage > 1) currentStage = 2;
    hasAnimated = false;
  });

  showAllCheckbox = createCheckbox('Show All Solutions', false);
  showAllCheckbox.position(canvasWidth / 2 + 30, drawHeight + 85);
  showAllCheckbox.style('font-size', '14px');

  // Initialize
  constrainNValue();
  findSolutions();

  describe('Interactive visualization of the Intermediate Value Theorem with Delta robot traveling along continuous function curves', LABEL);
}

function draw() {
  updateCanvasSize();
  updateGraphBounds();

  // Draw background regions
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Get current function
  let func = functions[currentFunctionIndex];
  let fa = func.fn(aValue);
  let fb = func.fn(bValue);

  // Draw title and subtitle
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Intermediate Value Theorem', canvasWidth * 0.35, 8);
  textSize(14);
  fill('#666');
  text(func.name, canvasWidth * 0.35, 32);

  // Draw coordinate axes and grid
  drawAxes();

  // Draw function curve
  drawFunction(func);

  // Stage-based visualization
  if (currentStage >= 1) {
    // Draw endpoint markers and values
    drawEndpoints(func, fa, fb);
  }

  if (currentStage >= 2) {
    // Draw horizontal line at y = N
    drawTargetLine();

    // Check if N is in valid range
    let minY = Math.min(fa, fb);
    let maxY = Math.max(fa, fb);
    if (nValue < minY || nValue > maxY) {
      drawIVTWarning();
    }
  }

  if (currentStage >= 3) {
    // Show solutions and/or animate Delta
    if (isAnimating) {
      animateDelta(func);
    }

    // Draw solutions if animation complete or show all is checked
    if (hasAnimated || showAllCheckbox.checked()) {
      drawSolutions();
    }

    // Draw Delta robot
    drawDelta(func);
  }

  // Draw info panel
  drawInfoPanel(func, fa, fb);

  // Draw control labels
  drawControlLabels();
}

function updateGraphBounds() {
  graphLeft = graphMargin + 30;
  graphRight = canvasWidth - 200;  // Leave room for info panel
  graphTop = 55;
  graphBottom = drawHeight - 30;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;
}

function drawAxes() {
  stroke('#ccc');
  strokeWeight(1);

  // Draw grid
  for (let i = -4; i <= 4; i++) {
    let x = map(i, -4, 4, graphLeft, graphRight);
    stroke(i === 0 ? '#999' : '#ddd');
    strokeWeight(i === 0 ? 2 : 1);
    line(x, graphTop, x, graphBottom);
  }

  for (let i = -5; i <= 5; i++) {
    let y = map(i, -5, 5, graphBottom, graphTop);
    stroke(i === 0 ? '#999' : '#ddd');
    strokeWeight(i === 0 ? 2 : 1);
    line(graphLeft, y, graphRight, y);
  }

  // Axis labels
  fill('#666');
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  for (let i = -4; i <= 4; i++) {
    if (i !== 0) {
      let x = map(i, -4, 4, graphLeft, graphRight);
      text(i, x, graphBottom + 3);
    }
  }

  textAlign(RIGHT, CENTER);
  for (let i = -4; i <= 4; i += 2) {
    if (i !== 0) {
      let y = map(i, -5, 5, graphBottom, graphTop);
      text(i, graphLeft - 5, y);
    }
  }

  // Axis names
  textSize(12);
  textAlign(CENTER, TOP);
  text('x', graphRight + 12, map(0, -5, 5, graphBottom, graphTop) - 6);
  textAlign(RIGHT, CENTER);
  text('y', map(0, -4, 4, graphLeft, graphRight) - 5, graphTop - 8);
}

function drawFunction(func) {
  stroke('#2196F3');
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let x = map(px, graphLeft, graphRight, -4, 4);
    let y = func.fn(x);
    if (y !== null && isFinite(y) && y >= -5 && y <= 5) {
      let py = map(y, -5, 5, graphBottom, graphTop);
      vertex(px, py);
    }
  }
  endShape();
}

function drawEndpoints(func, fa, fb) {
  // Point at (a, f(a))
  let ax = map(aValue, -4, 4, graphLeft, graphRight);
  let ay = map(fa, -5, 5, graphBottom, graphTop);

  // Point at (b, f(b))
  let bx = map(bValue, -4, 4, graphLeft, graphRight);
  let by = map(fb, -5, 5, graphBottom, graphTop);

  // Draw vertical dashed lines from points to x-axis
  stroke('#4CAF50');
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);

  let axisY = map(0, -5, 5, graphBottom, graphTop);
  if (fa >= -5 && fa <= 5) line(ax, ay, ax, axisY);
  if (fb >= -5 && fb <= 5) line(bx, by, bx, axisY);

  drawingContext.setLineDash([]);

  // Draw points
  fill('#4CAF50');
  noStroke();
  if (fa >= -5 && fa <= 5) {
    circle(ax, ay, 14);
    // Label
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text('(' + aValue.toFixed(1) + ', ' + fa.toFixed(2) + ')', ax, ay - 10);
  }

  fill('#FF9800');
  if (fb >= -5 && fb <= 5) {
    circle(bx, by, 14);
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text('(' + bValue.toFixed(1) + ', ' + fb.toFixed(2) + ')', bx, by - 10);
  }
}

function drawTargetLine() {
  let ny = map(nValue, -5, 5, graphBottom, graphTop);

  // Draw horizontal line at y = N
  stroke('#E91E63');
  strokeWeight(2);
  drawingContext.setLineDash([8, 4]);
  line(graphLeft, ny, graphRight, ny);
  drawingContext.setLineDash([]);

  // Label
  fill('#E91E63');
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text('N = ' + nValue.toFixed(2), graphRight + 5, ny);
}

function drawIVTWarning() {
  // Warning box
  let boxW = 200;
  let boxH = 50;
  let boxX = (graphLeft + graphRight) / 2 - boxW / 2;
  let boxY = graphTop + 20;

  fill(255, 200, 200, 230);
  stroke('#E91E63');
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  fill('#E91E63');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('N not in range [f(a), f(b)]', boxX + boxW/2, boxY + 15);
  text('IVT does not apply!', boxX + boxW/2, boxY + 35);
}

function drawSolutions() {
  if (solutions.length === 0) return;

  let showAll = showAllCheckbox.checked();
  let solutionsToShow = showAll ? solutions : [solutions[0]];

  for (let sol of solutionsToShow) {
    let sx = map(sol.x, -4, 4, graphLeft, graphRight);
    let sy = map(sol.y, -5, 5, graphBottom, graphTop);

    // Highlight circle
    fill(255, 255, 0, 150);
    stroke('#E91E63');
    strokeWeight(3);
    circle(sx, sy, 20);

    // Draw crosshairs
    stroke('#E91E63');
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    let axisY = map(0, -5, 5, graphBottom, graphTop);
    let axisX = map(0, -4, 4, graphLeft, graphRight);
    line(sx, sy, sx, axisY);
    line(sx, sy, graphLeft, sy);
    drawingContext.setLineDash([]);

    // Label c value
    fill('#E91E63');
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('c = ' + sol.x.toFixed(2), sx, axisY + 2);
  }
}

function drawDelta(func) {
  if (currentStage < 3) return;

  let dx = map(deltaX, -4, 4, graphLeft, graphRight);
  let dy_val = func.fn(deltaX);

  if (dy_val < -5 || dy_val > 5) return;

  let dy = map(dy_val, -5, 5, graphBottom, graphTop);

  // Calculate tilt based on derivative (slope)
  let h = 0.01;
  let slope = (func.fn(deltaX + h) - func.fn(deltaX - h)) / (2 * h);
  let tiltAngle = atan(slope * (graphHeight / 10) / (graphWidth / 8));

  push();
  translate(dx, dy - 12);
  rotate(tiltAngle);

  // Delta robot body - triangular
  fill('#00BCD4');
  stroke('#006064');
  strokeWeight(2);
  triangle(-10, 8, 10, 8, 0, -10);

  // Eyes
  fill('white');
  noStroke();
  ellipse(-4, 0, 6, 6);
  ellipse(4, 0, 6, 6);
  fill('black');
  ellipse(-4, 0, 3, 3);
  ellipse(4, 0, 3, 3);

  // Wheels
  fill('#333');
  ellipse(-8, 10, 6, 4);
  ellipse(8, 10, 6, 4);

  pop();

  // Altitude tracker
  drawAltitudeTracker(dy_val);
}

function drawAltitudeTracker(altitude) {
  let trackerX = graphRight + 20;
  let trackerY = graphTop;
  let trackerH = graphHeight;
  let trackerW = 30;

  // Background
  fill(240);
  stroke('#ccc');
  strokeWeight(1);
  rect(trackerX, trackerY, trackerW, trackerH, 4);

  // Current altitude marker
  let markerY = map(altitude, -5, 5, trackerY + trackerH, trackerY);
  markerY = constrain(markerY, trackerY, trackerY + trackerH);

  fill('#00BCD4');
  noStroke();
  rect(trackerX, markerY, trackerW, trackerY + trackerH - markerY, 0, 0, 4, 4);

  // Target line
  let targetY = map(nValue, -5, 5, trackerY + trackerH, trackerY);
  stroke('#E91E63');
  strokeWeight(2);
  line(trackerX - 5, targetY, trackerX + trackerW + 5, targetY);

  // Label
  fill('#333');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text('Alt', trackerX + trackerW/2, trackerY + trackerH + 5);
  textSize(9);
  text(altitude.toFixed(1), trackerX + trackerW/2, markerY - 12);
}

function drawInfoPanel(func, fa, fb) {
  let panelX = canvasWidth - 185;
  let panelY = graphTop;
  let panelW = 175;
  let panelH = 180;

  fill(255, 255, 255, 245);
  stroke('#ccc');
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  fill('#333');
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);

  let y = panelY + 10;
  let lineH = 22;

  // Stage indicators
  text('IVT Requirements:', panelX + 10, y);
  y += lineH;

  // Continuity check
  fill(currentStage >= 1 ? '#4CAF50' : '#999');
  text((currentStage >= 1 ? '1.' : '1.') + ' f continuous on [a,b]', panelX + 10, y);
  y += lineH;

  // Endpoints
  fill(currentStage >= 1 ? '#4CAF50' : '#999');
  textSize(11);
  text('   f(a) = ' + fa.toFixed(2), panelX + 10, y);
  y += 16;
  text('   f(b) = ' + fb.toFixed(2), panelX + 10, y);
  y += lineH;

  // N between f(a) and f(b)
  let minY = Math.min(fa, fb);
  let maxY = Math.max(fa, fb);
  let nInRange = nValue >= minY && nValue <= maxY;

  textSize(13);
  fill(currentStage >= 2 ? (nInRange ? '#4CAF50' : '#E91E63') : '#999');
  text('2. N between f(a), f(b)', panelX + 10, y);
  y += lineH;

  // Conclusion
  if (currentStage >= 3 && nInRange) {
    fill('#E91E63');
    textSize(12);
    text('Therefore:', panelX + 10, y);
    y += 18;
    textSize(11);
    text('   There exists c in [a,b]', panelX + 10, y);
    y += 14;
    text('   where f(c) = N', panelX + 10, y);

    if (solutions.length > 0 && hasAnimated) {
      y += 18;
      fill('#E91E63');
      textSize(12);
      text('   c = ' + solutions[0].x.toFixed(3), panelX + 10, y);
    }
  }
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);

  // Row 2 labels
  text('a:', 10, drawHeight + 52);
  text('b:', canvasWidth / 2 + 5, drawHeight + 52);

  // Row 3 label
  text('N:', 10, drawHeight + 92);

  // Show current values
  textSize(12);
  fill('#666');
  let aSliderRight = sliderLeftMargin + aSlider.width;
  text(aValue.toFixed(1), aSliderRight + 5, drawHeight + 52);

  let bSliderRight = canvasWidth / 2 + 30 + bSlider.width;
  text(bValue.toFixed(1), bSliderRight + 5, drawHeight + 52);

  let nSliderRight = sliderLeftMargin + nSlider.width;
  text(nValue.toFixed(1), nSliderRight + 5, drawHeight + 92);
}

function stepForward() {
  if (currentStage < 4) {
    currentStage++;

    if (currentStage === 3) {
      // Start animation
      startAnimation();
    }
  }
}

function startAnimation() {
  deltaX = aValue;
  deltaProgress = 0;
  isAnimating = true;
  hasAnimated = false;
}

function animateDelta(func) {
  deltaProgress += animationSpeed;

  if (deltaProgress >= 1) {
    deltaProgress = 1;
    isAnimating = false;
    hasAnimated = true;
    currentStage = 4;
  }

  deltaX = lerp(aValue, bValue, deltaProgress);

  // Check if Delta crosses the target value N
  let currentY = func.fn(deltaX);
  if (Math.abs(currentY - nValue) < 0.1 && !hasAnimated) {
    // Flash effect when crossing
    fill(255, 255, 0, 100);
    noStroke();
    let dx = map(deltaX, -4, 4, graphLeft, graphRight);
    let dy = map(currentY, -5, 5, graphBottom, graphTop);
    circle(dx, dy, 40);
  }
}

function resetSimulation() {
  currentStage = 0;
  deltaX = aValue;
  deltaProgress = 0;
  isAnimating = false;
  hasAnimated = false;
  constrainNValue();
  findSolutions();
}

function constrainNValue() {
  let func = functions[currentFunctionIndex];
  let fa = func.fn(aValue);
  let fb = func.fn(bValue);
  let minY = Math.min(fa, fb);
  let maxY = Math.max(fa, fb);

  // Update N slider range to valid interval
  nSlider.elt.min = Math.max(-5, minY);
  nSlider.elt.max = Math.min(5, maxY);

  // Clamp current N value
  if (nValue < minY) {
    nValue = minY;
    nSlider.value(nValue);
  }
  if (nValue > maxY) {
    nValue = maxY;
    nSlider.value(nValue);
  }
}

function findSolutions() {
  solutions = [];
  let func = functions[currentFunctionIndex];

  // Search for all x in [a, b] where f(x) = N
  let step = 0.01;
  let prevDiff = func.fn(aValue) - nValue;

  for (let x = aValue + step; x <= bValue; x += step) {
    let currDiff = func.fn(x) - nValue;

    // Sign change indicates crossing
    if (prevDiff * currDiff < 0) {
      // Refine with bisection
      let lo = x - step;
      let hi = x;
      for (let i = 0; i < 20; i++) {
        let mid = (lo + hi) / 2;
        let midVal = func.fn(mid) - nValue;
        if (midVal * (func.fn(lo) - nValue) < 0) {
          hi = mid;
        } else {
          lo = mid;
        }
      }
      let solX = (lo + hi) / 2;
      solutions.push({ x: solX, y: nValue });
    }
    prevDiff = currDiff;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateGraphBounds();

  // Resize sliders
  aSlider.size((canvasWidth - sliderLeftMargin * 2 - margin * 2) / 2 - 20);
  bSlider.position(canvasWidth / 2 + 30, drawHeight + 42);
  bSlider.size((canvasWidth - sliderLeftMargin * 2 - margin * 2) / 2 - 20);
  nSlider.size(canvasWidth / 2 - sliderLeftMargin - 40);
  showAllCheckbox.position(canvasWidth / 2 + 30, drawHeight + 85);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
