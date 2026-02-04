// Net Signed Area Visualizer MicroSim
// Demonstrates that definite integrals compute net signed area
// Bloom Level 2: Understand

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphTop = 60;
let graphBottom;

// Integration parameters
let a = -2;
let b = 2;

// Function selection
let funcIndex = 0;
let funcNames = ['sin(x)', 'x', 'x²-2', 'x³-2x'];
let funcDefs = [
  (x) => Math.sin(x),
  (x) => x,
  (x) => x * x - 2,
  (x) => x * x * x - 2 * x
];

// Display mode: 0=combined, 1=separate
let displayMode = 0;

// UI elements
let aSlider, bSlider, funcSelect, modeSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create interval sliders
  aSlider = createSlider(-4, 4, a, 0.5);
  aSlider.position(sliderLeftMargin, drawHeight + 5);
  aSlider.size(100);

  bSlider = createSlider(-4, 4, b, 0.5);
  bSlider.position(sliderLeftMargin + 160, drawHeight + 5);
  bSlider.size(100);

  // Create function dropdown
  funcSelect = createSelect();
  funcSelect.position(10, drawHeight + 45);
  for (let i = 0; i < funcNames.length; i++) {
    funcSelect.option('f(x) = ' + funcNames[i], i);
  }
  funcSelect.changed(() => funcIndex = parseInt(funcSelect.value()));

  // Create mode toggle
  modeSelect = createSelect();
  modeSelect.position(150, drawHeight + 45);
  modeSelect.option('Combined View', 0);
  modeSelect.option('Separate Areas', 1);
  modeSelect.changed(() => displayMode = parseInt(modeSelect.value()));

  describe('Net signed area visualizer showing positive and negative regions', LABEL);
}

function draw() {
  updateCanvasSize();
  graphRight = canvasWidth - 140;
  graphBottom = drawHeight - 40;

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update values
  a = aSlider.value();
  b = bSlider.value();
  if (a > b) {
    let temp = a;
    a = b;
    b = temp;
  }

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Net Signed Area', canvasWidth / 2 - 40, 10);

  // Draw axes first
  drawAxes();

  // Calculate areas
  let areas = calculateAreas();

  // Draw filled regions
  drawRegions(areas);

  // Draw curve on top
  drawCurve();

  // Draw info panel
  drawInfoPanel(areas);

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('a: ' + a.toFixed(1), 10, drawHeight + 15);
  text('b: ' + b.toFixed(1), sliderLeftMargin + 115, drawHeight + 15);
}

function getYRange() {
  let minY = 0, maxY = 0;
  for (let x = -4; x <= 4; x += 0.1) {
    let y = funcDefs[funcIndex](x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  let range = Math.max(Math.abs(minY), Math.abs(maxY)) * 1.2;
  return { min: -range, max: range };
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
  textSize(10);
  for (let x = -4; x <= 4; x++) {
    let px = map(x, -4, 4, graphLeft, graphRight);
    stroke(200);
    strokeWeight(1);
    line(px, graphTop, px, graphBottom);
    noStroke();
    text(x, px, zeroY + 5);
  }

  // Mark the x-axis prominently
  stroke(0);
  strokeWeight(2);
  line(graphLeft, zeroY, graphRight, zeroY);

  // Y-axis labels
  textAlign(RIGHT, CENTER);
  for (let y = Math.ceil(yRange.min); y <= Math.floor(yRange.max); y++) {
    if (y !== 0) {
      let py = map(y, yRange.min, yRange.max, graphBottom, graphTop);
      stroke(200);
      strokeWeight(1);
      line(graphLeft, py, graphRight, py);
      noStroke();
      text(y, graphLeft - 5, py);
    }
  }
}

function calculateAreas() {
  let positiveArea = 0;
  let negativeArea = 0;
  let dx = 0.01;

  for (let x = a; x < b; x += dx) {
    let y = funcDefs[funcIndex](x);
    if (y > 0) {
      positiveArea += y * dx;
    } else {
      negativeArea += y * dx;
    }
  }

  return {
    positive: positiveArea,
    negative: negativeArea,
    net: positiveArea + negativeArea
  };
}

function drawRegions(areas) {
  let yRange = getYRange();
  let zeroY = map(0, yRange.min, yRange.max, graphBottom, graphTop);
  let dx = 0.5;

  for (let x = a; x < b; x += dx) {
    let y = funcDefs[funcIndex](x);
    let px = map(x, -4, 4, graphLeft, graphRight);
    let pxNext = map(x + dx, -4, 4, graphLeft, graphRight);
    let py = map(y, yRange.min, yRange.max, graphBottom, graphTop);

    if (y > 0) {
      fill(100, 150, 255, 150); // Blue for positive
      stroke(50, 100, 200);
    } else {
      fill(255, 100, 100, 150); // Red for negative
      stroke(200, 50, 50);
    }
    strokeWeight(0.5);

    if (displayMode === 0) {
      // Combined view - draw from x-axis
      rect(px, Math.min(py, zeroY), pxNext - px, Math.abs(py - zeroY));
    } else {
      // Separate view - all positive up, all negative down
      rect(px, Math.min(py, zeroY), pxNext - px, Math.abs(py - zeroY));
    }
  }
}

function drawCurve() {
  let yRange = getYRange();

  stroke(0, 100, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px++) {
    let x = map(px, graphLeft, graphRight, -4, 4);
    let y = funcDefs[funcIndex](x);
    let py = map(y, yRange.min, yRange.max, graphBottom, graphTop);
    vertex(px, py);
  }
  endShape();

  // Mark integration bounds
  stroke(0);
  strokeWeight(1);
  let paX = map(a, -4, 4, graphLeft, graphRight);
  let pbX = map(b, -4, 4, graphLeft, graphRight);

  stroke(100, 100, 100);
  setLineDash([5, 5]);
  line(paX, graphTop, paX, graphBottom);
  line(pbX, graphTop, pbX, graphBottom);
  setLineDash([]);
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
}

function drawInfoPanel(areas) {
  let panelX = graphRight + 10;
  let panelY = graphTop;
  let panelW = canvasWidth - panelX - 10;
  let panelH = 160;

  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  let y = panelY + 10;
  let lineHeight = 22;

  text('Area Analysis:', panelX + 5, y);
  y += lineHeight;

  // Positive area (blue)
  fill(50, 100, 200);
  text('Positive:', panelX + 5, y);
  fill('black');
  text(areas.positive.toFixed(3), panelX + 60, y);
  y += lineHeight;

  // Negative area (red)
  fill(200, 50, 50);
  text('Negative:', panelX + 5, y);
  fill('black');
  text(areas.negative.toFixed(3), panelX + 60, y);
  y += lineHeight;

  // Divider line
  stroke(200);
  line(panelX + 5, y, panelX + panelW - 5, y);
  y += 8;

  // Net signed area
  noStroke();
  fill(0, 100, 0);
  textSize(14);
  text('Net Area:', panelX + 5, y);

  // Color based on sign
  if (areas.net >= 0) {
    fill(0, 100, 0);
  } else {
    fill(200, 50, 50);
  }
  text(areas.net.toFixed(3), panelX + 70, y);
  y += lineHeight + 5;

  // Formula
  fill('black');
  textSize(10);
  text('∫[a,b] f(x)dx', panelX + 5, y);
  text('= (+) + (−)', panelX + 5, y + 12);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  aSlider.size(100);
  bSlider.size(100);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
