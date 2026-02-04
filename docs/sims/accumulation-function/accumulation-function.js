// Accumulation Function Explorer MicroSim
// Visualize how F(x) = ∫_a^x f(t) dt grows as x moves
// Bloom Level 2: Understand

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Panel dimensions
let topPanelTop = 45;
let topPanelBottom = 200;
let bottomPanelTop = 240;
let bottomPanelBottom = 410;
let panelLeft = 60;
let panelRight;

// Parameters
let startA = 0;
let currentX = 1;

// Function selection
let funcIndex = 0;
let funcNames = ['2 (constant)', 'x (linear)', 'x² (quadratic)', 'sin(x)'];
let funcDefs = [
  (x) => 2,
  (x) => x,
  (x) => x * x,
  (x) => Math.sin(x)
];
// Antiderivatives (from 0)
let antiderivatives = [
  (x) => 2 * x,
  (x) => x * x / 2,
  (x) => x * x * x / 3,
  (x) => -Math.cos(x) + 1
];

// Animation state
let isAnimating = false;
let animationX = 0;

// UI elements
let xSlider, aSlider, funcSelect, animateButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create x slider (main control)
  xSlider = createSlider(-2, 4, currentX, 0.1);
  xSlider.position(sliderLeftMargin, drawHeight + 5);
  xSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Create start point slider
  aSlider = createSlider(-2, 2, startA, 0.5);
  aSlider.position(sliderLeftMargin + 150, drawHeight + 40);
  aSlider.size(80);

  // Create function dropdown
  funcSelect = createSelect();
  funcSelect.position(10, drawHeight + 40);
  for (let i = 0; i < funcNames.length; i++) {
    funcSelect.option('f(t) = ' + funcNames[i], i);
  }
  funcSelect.changed(() => funcIndex = parseInt(funcSelect.value()));

  // Create animate button
  animateButton = createButton('Animate');
  animateButton.position(10, drawHeight + 70);
  animateButton.mousePressed(toggleAnimation);

  describe('Accumulation function explorer showing how area accumulates as x moves', LABEL);
}

function toggleAnimation() {
  isAnimating = !isAnimating;
  if (isAnimating) {
    animationX = startA;
    animateButton.html('Stop');
  } else {
    animateButton.html('Animate');
  }
}

function draw() {
  updateCanvasSize();
  panelRight = canvasWidth - 40;

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update values
  startA = aSlider.value();
  if (!isAnimating) {
    currentX = xSlider.value();
  } else {
    animationX += 0.02;
    if (animationX > 4) {
      animationX = startA;
    }
    currentX = animationX;
    xSlider.value(currentX);
  }

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Accumulation Function Explorer', canvasWidth / 2, 5);

  // Draw top panel (integrand f(t))
  drawTopPanel();

  // Draw bottom panel (accumulation F(x))
  drawBottomPanel();

  // Draw vertical line connecting panels
  stroke(255, 100, 100);
  strokeWeight(1);
  setLineDash([3, 3]);
  let xPos = map(currentX, -2, 4, panelLeft, panelRight);
  line(xPos, topPanelBottom, xPos, bottomPanelTop);
  setLineDash([]);

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('x: ' + currentX.toFixed(1), 10, drawHeight + 15);
  text('a: ' + startA.toFixed(1), sliderLeftMargin + 100, drawHeight + 55);

  // Current F(x) value display
  let Fx = calculateAccumulation(currentX);
  textSize(14);
  fill(0, 100, 0);
  text('F(' + currentX.toFixed(1) + ') = ' + Fx.toFixed(3), 100, drawHeight + 75);

  // Rate of accumulation
  fill(0, 0, 150);
  text("F'(x) = f(x) = " + funcDefs[funcIndex](currentX).toFixed(3), 250, drawHeight + 75);
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
}

function getYRange(funcDef) {
  let minY = 0, maxY = 0;
  for (let x = -2; x <= 4; x += 0.1) {
    let y = funcDef(x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  let padding = (maxY - minY) * 0.1;
  return { min: minY - padding, max: maxY + padding };
}

function calculateAccumulation(x) {
  // Numerical integration from startA to x
  let sum = 0;
  let dx = 0.01;
  let start = startA;
  let end = x;
  if (start > end) {
    let temp = start;
    start = end;
    end = temp;
    dx = -dx;
  }

  for (let t = start; t < end; t += Math.abs(dx)) {
    sum += funcDefs[funcIndex](t) * Math.abs(dx);
  }

  return x >= startA ? sum : -sum;
}

function drawTopPanel() {
  // Panel background
  fill(255);
  stroke(100);
  strokeWeight(1);
  rect(panelLeft - 10, topPanelTop - 5, panelRight - panelLeft + 20, topPanelBottom - topPanelTop + 10, 5);

  // Label
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('f(t) - Integrand', panelLeft, topPanelTop - 3);

  let yRange = getYRange(funcDefs[funcIndex]);
  let zeroY = map(0, yRange.min, yRange.max, topPanelBottom, topPanelTop + 20);

  // Draw x-axis
  stroke(0);
  strokeWeight(1);
  line(panelLeft, zeroY, panelRight, zeroY);

  // Draw shaded area from a to x
  noStroke();
  for (let t = startA; t < currentX; t += 0.05) {
    let y = funcDefs[funcIndex](t);
    let px = map(t, -2, 4, panelLeft, panelRight);
    let pxNext = map(t + 0.05, -2, 4, panelLeft, panelRight);
    let py = map(y, yRange.min, yRange.max, topPanelBottom, topPanelTop + 20);

    if (y >= 0) {
      fill(100, 150, 255, 100);
    } else {
      fill(255, 100, 100, 100);
    }
    rect(px, Math.min(py, zeroY), pxNext - px, Math.abs(py - zeroY));
  }

  // Draw curve
  stroke(0, 100, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = panelLeft; px <= panelRight; px++) {
    let t = map(px, panelLeft, panelRight, -2, 4);
    let y = funcDefs[funcIndex](t);
    let py = map(y, yRange.min, yRange.max, topPanelBottom, topPanelTop + 20);
    vertex(px, py);
  }
  endShape();

  // Draw current x position
  let xPos = map(currentX, -2, 4, panelLeft, panelRight);
  let aPos = map(startA, -2, 4, panelLeft, panelRight);

  stroke(255, 100, 100);
  strokeWeight(2);
  line(xPos, topPanelTop + 20, xPos, topPanelBottom);

  // Mark start point a
  stroke(100, 100, 255);
  strokeWeight(2);
  line(aPos, topPanelTop + 20, aPos, topPanelBottom);

  // Labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text('x', xPos, topPanelBottom + 2);
  text('a', aPos, topPanelBottom + 2);
}

function drawBottomPanel() {
  // Panel background
  fill(255);
  stroke(100);
  strokeWeight(1);
  rect(panelLeft - 10, bottomPanelTop - 5, panelRight - panelLeft + 20, bottomPanelBottom - bottomPanelTop + 10, 5);

  // Label
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('F(x) = ∫ₐˣ f(t)dt - Accumulation', panelLeft, bottomPanelTop - 3);

  // Calculate F(x) for all x values
  let fValues = [];
  let minF = 0, maxF = 0;
  for (let x = -2; x <= 4; x += 0.1) {
    let fx = calculateAccumulation(x);
    fValues.push({ x: x, y: fx });
    minF = Math.min(minF, fx);
    maxF = Math.max(maxF, fx);
  }
  let padding = (maxF - minF) * 0.1 || 1;
  minF -= padding;
  maxF += padding;

  let zeroY = map(0, minF, maxF, bottomPanelBottom - 10, bottomPanelTop + 30);

  // Draw x-axis
  stroke(0);
  strokeWeight(1);
  line(panelLeft, zeroY, panelRight, zeroY);

  // Draw F(x) curve up to current x
  stroke(0, 0, 200);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < fValues.length; i++) {
    if (fValues[i].x <= currentX) {
      let px = map(fValues[i].x, -2, 4, panelLeft, panelRight);
      let py = map(fValues[i].y, minF, maxF, bottomPanelBottom - 10, bottomPanelTop + 30);
      vertex(px, py);
    }
  }
  endShape();

  // Draw remaining curve (faded)
  stroke(150, 150, 200);
  strokeWeight(1);
  beginShape();
  for (let i = 0; i < fValues.length; i++) {
    if (fValues[i].x > currentX) {
      let px = map(fValues[i].x, -2, 4, panelLeft, panelRight);
      let py = map(fValues[i].y, minF, maxF, bottomPanelBottom - 10, bottomPanelTop + 30);
      vertex(px, py);
    }
  }
  endShape();

  // Mark current point
  let xPos = map(currentX, -2, 4, panelLeft, panelRight);
  let Fx = calculateAccumulation(currentX);
  let yPos = map(Fx, minF, maxF, bottomPanelBottom - 10, bottomPanelTop + 30);

  fill(255, 0, 0);
  stroke(200, 0, 0);
  strokeWeight(2);
  circle(xPos, yPos, 10);

  // Show current value
  fill('black');
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  text('(' + currentX.toFixed(1) + ', ' + Fx.toFixed(2) + ')', xPos + 8, yPos);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  xSlider.size(canvasWidth - sliderLeftMargin - margin);
  aSlider.size(80);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
