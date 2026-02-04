// Four Riemann Sum Methods Comparison MicroSim
// Compare left, right, midpoint, and trapezoidal methods
// Bloom Level 5: Evaluate

let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Graph parameters for main view
let mainLeft = 50;
let mainRight;
let mainTop = 50;
let mainBottom = 280;

// Integration parameters
let a = 0;
let b = 2;
let n = 4;

// Function selection
let funcIndex = 0;
let funcNames = ['x²', 'sin(x)', 'eˣ', 'x³'];
let funcDefs = [
  (x) => x * x,
  (x) => Math.sin(x),
  (x) => Math.exp(x),
  (x) => x * x * x
];
let trueIntegrals = [
  (a, b) => (b*b*b - a*a*a) / 3,
  (a, b) => -Math.cos(b) + Math.cos(a),
  (a, b) => Math.exp(b) - Math.exp(a),
  (a, b) => (Math.pow(b,4) - Math.pow(a,4)) / 4
];

// Selected method for main view: 0=left, 1=right, 2=midpoint, 3=trapezoidal
let selectedMethod = 0;
let methodNames = ['Left', 'Right', 'Midpoint', 'Trapezoidal'];
let methodColors = [
  [100, 150, 255], // blue
  [255, 150, 100], // orange
  [100, 200, 100], // green
  [200, 100, 200]  // purple
];

// UI elements
let nSlider, funcSelect, methodRadios;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create n slider
  nSlider = createSlider(2, 100, n, 1);
  nSlider.position(sliderLeftMargin, drawHeight + 5);
  nSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Create function dropdown
  funcSelect = createSelect();
  funcSelect.position(10, drawHeight + 40);
  for (let i = 0; i < funcNames.length; i++) {
    funcSelect.option('f(x) = ' + funcNames[i], i);
  }
  funcSelect.changed(() => funcIndex = parseInt(funcSelect.value()));

  // Create method radio buttons
  methodRadios = [];
  for (let i = 0; i < 4; i++) {
    let radio = createRadio('method');
    radio.option(methodNames[i], i);
    radio.position(120 + i * 70, drawHeight + 40);
    radio.style('font-size', '12px');
  }

  // Select first radio by default
  let firstRadio = document.querySelector('input[name="method"][value="0"]');
  if (firstRadio) firstRadio.checked = true;

  describe('Four Riemann sum methods comparison showing which provides best approximation', LABEL);
}

function draw() {
  updateCanvasSize();
  mainRight = canvasWidth - 180;

  // Check which method is selected
  let checkedRadio = document.querySelector('input[name="method"]:checked');
  if (checkedRadio) {
    selectedMethod = parseInt(checkedRadio.value);
  }

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update values
  n = nSlider.value();

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Riemann Sum Methods Comparison', canvasWidth / 2 - 50, 8);

  // Calculate all sums
  let sums = calculateAllSums();
  let trueValue = trueIntegrals[funcIndex](a, b);

  // Draw main graph with selected method
  drawMainGraph(selectedMethod, sums);

  // Draw mini previews
  drawMiniPreviews(sums);

  // Draw comparison table
  drawComparisonTable(sums, trueValue);

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('n: ' + n, 10, drawHeight + 15);

  // Method selection label
  textSize(12);
  text('Method:', 10, drawHeight + 55);
}

function calculateAllSums() {
  let dx = (b - a) / n;
  let left = 0, right = 0, mid = 0, trap = 0;

  for (let i = 0; i < n; i++) {
    let xi = a + i * dx;
    let xiRight = a + (i + 1) * dx;
    let xiMid = a + (i + 0.5) * dx;

    left += funcDefs[funcIndex](xi) * dx;
    right += funcDefs[funcIndex](xiRight) * dx;
    mid += funcDefs[funcIndex](xiMid) * dx;
    trap += (funcDefs[funcIndex](xi) + funcDefs[funcIndex](xiRight)) * dx / 2;
  }

  return [left, right, mid, trap];
}

function getMaxY() {
  let maxY = 0;
  for (let x = a - 0.5; x <= b + 0.5; x += 0.1) {
    maxY = Math.max(maxY, Math.abs(funcDefs[funcIndex](x)));
  }
  return maxY * 1.2;
}

function drawMainGraph(method, sums) {
  let maxY = getMaxY();
  let dx = (b - a) / n;

  // Draw rectangles/trapezoids
  for (let i = 0; i < n; i++) {
    let xi = a + i * dx;
    let xiRight = a + (i + 1) * dx;

    let screenX = map(xi, a - 0.5, b + 0.5, mainLeft, mainRight);
    let screenWidth = map(dx, 0, b - a + 1, 0, mainRight - mainLeft);

    let col = methodColors[method];
    fill(col[0], col[1], col[2], 100);
    stroke(col[0] - 50, col[1] - 50, col[2] - 50);
    strokeWeight(1);

    if (method === 0) { // Left
      let h = funcDefs[funcIndex](xi);
      let screenH = map(h, 0, maxY, mainBottom, mainTop);
      rect(screenX, screenH, screenWidth, mainBottom - screenH);
    } else if (method === 1) { // Right
      let h = funcDefs[funcIndex](xiRight);
      let screenH = map(h, 0, maxY, mainBottom, mainTop);
      rect(screenX, screenH, screenWidth, mainBottom - screenH);
    } else if (method === 2) { // Midpoint
      let h = funcDefs[funcIndex]((xi + xiRight) / 2);
      let screenH = map(h, 0, maxY, mainBottom, mainTop);
      rect(screenX, screenH, screenWidth, mainBottom - screenH);
    } else { // Trapezoidal
      let h1 = funcDefs[funcIndex](xi);
      let h2 = funcDefs[funcIndex](xiRight);
      let y1 = map(h1, 0, maxY, mainBottom, mainTop);
      let y2 = map(h2, 0, maxY, mainBottom, mainTop);
      beginShape();
      vertex(screenX, mainBottom);
      vertex(screenX, y1);
      vertex(screenX + screenWidth, y2);
      vertex(screenX + screenWidth, mainBottom);
      endShape(CLOSE);
    }
  }

  // Draw curve
  stroke(0, 100, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = mainLeft; px <= mainRight; px++) {
    let x = map(px, mainLeft, mainRight, a - 0.5, b + 0.5);
    let y = funcDefs[funcIndex](x);
    let py = map(y, 0, maxY, mainBottom, mainTop);
    vertex(px, py);
  }
  endShape();

  // Axes
  stroke(0);
  strokeWeight(1);
  line(mainLeft, mainBottom, mainRight, mainBottom);
  line(mainLeft, mainTop, mainLeft, mainBottom);

  // Method label
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text(methodNames[method] + ': ' + sums[method].toFixed(4), mainLeft, mainTop - 15);
}

function drawMiniPreviews(sums) {
  let miniW = 80;
  let miniH = 50;
  let startY = 300;
  let gap = 10;

  for (let m = 0; m < 4; m++) {
    let miniX = 20 + m * (miniW + gap);
    let miniY = startY;

    // Border
    let col = methodColors[m];
    if (m === selectedMethod) {
      stroke(col[0], col[1], col[2]);
      strokeWeight(3);
    } else {
      stroke(150);
      strokeWeight(1);
    }
    fill(255);
    rect(miniX, miniY, miniW, miniH, 3);

    // Draw mini curve
    stroke(0, 100, 0);
    strokeWeight(1);
    noFill();
    let maxY = getMaxY();
    beginShape();
    for (let px = miniX + 5; px <= miniX + miniW - 5; px++) {
      let x = map(px, miniX + 5, miniX + miniW - 5, a, b);
      let y = funcDefs[funcIndex](x);
      let py = map(y, 0, maxY, miniY + miniH - 5, miniY + 5);
      vertex(px, py);
    }
    endShape();

    // Label
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text(methodNames[m], miniX + miniW / 2, miniY + miniH + 2);
  }
}

function drawComparisonTable(sums, trueValue) {
  let tableX = 20;
  let tableY = 380;
  let rowH = 18;

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  text('Method', tableX, tableY);
  text('Value', tableX + 80, tableY);
  text('Error', tableX + 160, tableY);

  // Find best method
  let errors = sums.map(s => Math.abs(s - trueValue));
  let bestIdx = errors.indexOf(Math.min(...errors));

  for (let i = 0; i < 4; i++) {
    let y = tableY + (i + 1) * rowH;
    let error = Math.abs(sums[i] - trueValue);

    if (i === bestIdx) {
      fill(200, 255, 200);
      noStroke();
      rect(tableX - 5, y - 2, 230, rowH);
    }

    let col = methodColors[i];
    fill(col[0], col[1], col[2]);
    text(methodNames[i], tableX, y);

    fill('black');
    text(sums[i].toFixed(4), tableX + 80, y);
    text(error.toFixed(6), tableX + 160, y);
  }

  // True value
  let y = tableY + 5 * rowH;
  fill(0, 100, 0);
  text('True', tableX, y);
  fill('black');
  text(trueValue.toFixed(4), tableX + 80, y);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  nSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
