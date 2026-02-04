// Left vs Right Riemann Sums MicroSim
// Compare left and right Riemann sum approximations visually and numerically
// Bloom Level 4: Analyze

let canvasWidth = 400;
let drawHeight = 450;
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
let a = 0;
let b = 2;
let n = 4;

// Function selection
let funcIndex = 0;
let funcNames = ['x²', 'sin(x)', 'eˣ', '2x+1', '4-x'];
let funcDefs = [
  (x) => x * x,
  (x) => Math.sin(x),
  (x) => Math.exp(x),
  (x) => 2 * x + 1,
  (x) => 4 - x
];
let trueIntegrals = [
  (a, b) => (b*b*b - a*a*a) / 3,
  (a, b) => -Math.cos(b) + Math.cos(a),
  (a, b) => Math.exp(b) - Math.exp(a),
  (a, b) => (b*b + b) - (a*a + a),
  (a, b) => (4*b - b*b/2) - (4*a - a*a/2)
];

// Display mode: 0=left only, 1=right only, 2=both
let displayMode = 2;

// UI elements
let nSlider, funcSelect, modeSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create n slider
  nSlider = createSlider(2, 50, n, 1);
  nSlider.position(sliderLeftMargin, drawHeight + 5);
  nSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Create function dropdown
  funcSelect = createSelect();
  funcSelect.position(10, drawHeight + 40);
  for (let i = 0; i < funcNames.length; i++) {
    funcSelect.option('f(x) = ' + funcNames[i], i);
  }
  funcSelect.changed(() => funcIndex = parseInt(funcSelect.value()));

  // Create display mode dropdown
  modeSelect = createSelect();
  modeSelect.position(130, drawHeight + 40);
  modeSelect.option('Left Only', 0);
  modeSelect.option('Right Only', 1);
  modeSelect.option('Both', 2);
  modeSelect.selected('Both');
  modeSelect.changed(() => displayMode = parseInt(modeSelect.value()));

  // Interval sliders on row 3

  describe('Left vs Right Riemann sum comparison showing approximation differences', LABEL);
}

function draw() {
  updateCanvasSize();
  graphRight = canvasWidth - 180;
  graphBottom = drawHeight - 30;

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
  textSize(20);
  text('Left vs Right Riemann Sums', canvasWidth / 2 - 50, 10);

  // Draw graph
  drawGraph();

  // Draw rectangles
  let leftSum = 0;
  let rightSum = 0;
  let dx = (b - a) / n;

  for (let i = 0; i < n; i++) {
    let xi = a + i * dx;
    let xiRight = a + (i + 1) * dx;

    let leftHeight = funcDefs[funcIndex](xi);
    let rightHeight = funcDefs[funcIndex](xiRight);

    leftSum += leftHeight * dx;
    rightSum += rightHeight * dx;

    // Convert to screen coordinates
    let screenX = map(xi, a - 0.5, b + 0.5, graphLeft, graphRight);
    let screenWidth = map(dx, 0, b - a + 1, 0, graphRight - graphLeft);

    // Draw left rectangles (blue)
    if (displayMode === 0 || displayMode === 2) {
      let screenLeftHeight = map(leftHeight, 0, getMaxY(), graphBottom, graphTop);
      fill(100, 150, 255, 100);
      stroke(50, 100, 200);
      strokeWeight(1);
      rect(screenX, screenLeftHeight, screenWidth, graphBottom - screenLeftHeight);
    }

    // Draw right rectangles (orange)
    if (displayMode === 1 || displayMode === 2) {
      let screenRightHeight = map(rightHeight, 0, getMaxY(), graphBottom, graphTop);
      fill(255, 150, 100, 100);
      stroke(200, 100, 50);
      strokeWeight(1);
      rect(screenX, screenRightHeight, screenWidth, graphBottom - screenRightHeight);
    }
  }

  // Draw the actual curve on top
  stroke(0, 100, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px++) {
    let x = map(px, graphLeft, graphRight, a - 0.5, b + 0.5);
    let y = funcDefs[funcIndex](x);
    let py = map(y, 0, getMaxY(), graphBottom, graphTop);
    vertex(px, py);
  }
  endShape();

  // Draw info panel
  let trueValue = trueIntegrals[funcIndex](a, b);
  drawInfoPanel(leftSum, rightSum, trueValue);

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('n: ' + n, 10, drawHeight + 15);

  // Display over/under estimate info
  textSize(14);
  let funcType = isIncreasing() ? 'increasing' : 'decreasing';
  text('f(x) is ' + funcType + ' on [' + a + ', ' + b + ']', 10, drawHeight + 75);
}

function getMaxY() {
  let maxY = 0;
  for (let x = a - 0.5; x <= b + 0.5; x += 0.1) {
    maxY = Math.max(maxY, Math.abs(funcDefs[funcIndex](x)));
  }
  return maxY * 1.2;
}

function isIncreasing() {
  return funcDefs[funcIndex](b) > funcDefs[funcIndex](a);
}

function drawGraph() {
  // Axes
  stroke(0);
  strokeWeight(1);
  // X-axis
  line(graphLeft, graphBottom, graphRight, graphBottom);
  // Y-axis
  line(graphLeft, graphTop, graphLeft, graphBottom);

  // X-axis labels
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  for (let x = Math.ceil(a - 0.5); x <= b + 0.5; x++) {
    let px = map(x, a - 0.5, b + 0.5, graphLeft, graphRight);
    text(x, px, graphBottom + 5);
  }

  // Y-axis labels
  textAlign(RIGHT, CENTER);
  let maxY = getMaxY();
  for (let y = 0; y <= maxY; y += Math.ceil(maxY / 4)) {
    let py = map(y, 0, maxY, graphBottom, graphTop);
    text(y.toFixed(1), graphLeft - 5, py);
  }

  // Axis titles
  textAlign(CENTER, TOP);
  text('x', (graphLeft + graphRight) / 2, graphBottom + 18);

  push();
  translate(15, (graphTop + graphBottom) / 2);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  text('f(x)', 0, 0);
  pop();
}

function drawInfoPanel(leftSum, rightSum, trueValue) {
  let panelX = graphRight + 10;
  let panelY = graphTop;
  let panelW = canvasWidth - panelX - 10;
  let panelH = 180;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  let y = panelY + 10;
  let lineHeight = 22;

  text('Results:', panelX + 5, y);
  y += lineHeight;

  fill(50, 100, 200);
  text('Lₙ = ' + leftSum.toFixed(4), panelX + 5, y);
  y += lineHeight;

  fill(200, 100, 50);
  text('Rₙ = ' + rightSum.toFixed(4), panelX + 5, y);
  y += lineHeight;

  fill(0, 100, 0);
  text('True = ' + trueValue.toFixed(4), panelX + 5, y);
  y += lineHeight;

  fill('black');
  text('Diff: ' + Math.abs(leftSum - rightSum).toFixed(4), panelX + 5, y);
  y += lineHeight;

  // Over/under estimate
  textSize(10);
  if (isIncreasing()) {
    fill(50, 100, 200);
    text('Left: under', panelX + 5, y);
    fill(200, 100, 50);
    text('Right: over', panelX + 5, y + 12);
  } else {
    fill(50, 100, 200);
    text('Left: over', panelX + 5, y);
    fill(200, 100, 50);
    text('Right: under', panelX + 5, y + 12);
  }
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
