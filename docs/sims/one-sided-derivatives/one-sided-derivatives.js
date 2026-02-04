// One-Sided Derivatives MicroSim
// Shows how left and right secant lines approach a point, demonstrating when they give different or equal limits
// Helps students analyze one-sided derivatives to determine differentiability (Bloom Level 4: Analyze)
// MicroSim template version 2026.02

// Global variables for canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout margins
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph region settings
let graphLeft, graphRight, graphTop, graphBottom;
let xMin = -3, xMax = 3;
let yMin = -2, yMax = 4;

// Point of interest - where we examine differentiability
let a = 0;

// Controls
let hSlider;
let resetButton;
let functionSelect;

// Available test functions
let functions = [
  { name: "Smooth: x^2", fn: (x) => x * x, dfn: (x) => 2 * x, hasCorner: false },
  { name: "Corner: |x|", fn: (x) => Math.abs(x), dfn: (x) => x >= 0 ? 1 : -1, hasCorner: true },
  { name: "Cusp: |x|^(1/2)", fn: (x) => Math.sqrt(Math.abs(x)), dfn: null, hasCorner: true, isCusp: true },
  { name: "Smooth: sin(x)+1", fn: (x) => Math.sin(x) + 1, dfn: (x) => Math.cos(x), hasCorner: false },
  { name: "Corner: max(x,0)", fn: (x) => Math.max(x, 0), dfn: (x) => x > 0 ? 1 : 0, hasCorner: true }
];
let currentFunctionIndex = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Calculate graph region
  updateGraphBounds();

  // Reset button
  resetButton = createButton('Reset');
  resetButton.position(10, drawHeight + 5);
  resetButton.mousePressed(resetSimulation);

  // h slider (controls distance from point a)
  hSlider = createSlider(0.01, 1.5, 1.0, 0.01);
  hSlider.position(sliderLeftMargin, drawHeight + 5);
  hSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Function selector dropdown
  functionSelect = createSelect();
  functionSelect.position(10, drawHeight + 42);
  for (let i = 0; i < functions.length; i++) {
    functionSelect.option(functions[i].name, i);
  }
  functionSelect.changed(onFunctionChange);

  describe('One-sided derivatives visualization showing left and right secant lines approaching a point to determine differentiability', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  updateGraphBounds();

  let h = hSlider.value();
  let currentFunc = functions[currentFunctionIndex];

  // Draw title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('One-Sided Derivatives', canvasWidth / 2, 8);
  textSize(14);
  text('Analyzing differentiability at x = ' + a, canvasWidth / 2, 32);

  // Draw coordinate system
  drawAxes();

  // Draw the function
  drawFunction(currentFunc.fn);

  // Draw point of interest
  let fa = currentFunc.fn(a);
  let px = mapX(a);
  let py = mapY(fa);

  // Draw vertical line at x = a
  stroke(100, 100, 100, 100);
  strokeWeight(1);
  setLineDash([5, 5]);
  line(px, graphTop, px, graphBottom);
  setLineDash([]);

  // Calculate secant slopes
  let leftX = a - h;
  let rightX = a + h;
  let leftY = currentFunc.fn(leftX);
  let rightY = currentFunc.fn(rightX);

  // Left secant slope: (f(a) - f(a-h)) / h
  let leftSlope = (fa - leftY) / h;
  // Right secant slope: (f(a+h) - f(a)) / h
  let rightSlope = (rightY - fa) / h;

  // Draw left secant line (blue)
  drawSecantLine(leftX, leftY, a, fa, color(0, 100, 255), 'Left');

  // Draw right secant line (red)
  drawSecantLine(a, fa, rightX, rightY, color(255, 50, 50), 'Right');

  // Draw the point of interest
  fill(0, 150, 0);
  noStroke();
  ellipse(px, py, 12, 12);

  // Draw left approach point
  fill(0, 100, 255);
  ellipse(mapX(leftX), mapY(leftY), 8, 8);

  // Draw right approach point
  fill(255, 50, 50);
  ellipse(mapX(rightX), mapY(rightY), 8, 8);

  // Info panel
  drawInfoPanel(leftSlope, rightSlope, h, currentFunc);

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('h = ' + h.toFixed(2), 70, drawHeight + 15);

  // Function label
  textSize(14);
  text('Function:', 170, drawHeight + 52);
}

function drawAxes() {
  stroke(150);
  strokeWeight(1);

  // Grid lines
  stroke(220);
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    let px = mapX(x);
    line(px, graphTop, px, graphBottom);
  }
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
    let py = mapY(y);
    line(graphLeft, py, graphRight, py);
  }

  // Axes
  stroke(80);
  strokeWeight(2);
  // X-axis
  if (yMin <= 0 && yMax >= 0) {
    let y0 = mapY(0);
    line(graphLeft, y0, graphRight, y0);
  }
  // Y-axis
  if (xMin <= 0 && xMax >= 0) {
    let x0 = mapX(0);
    line(x0, graphTop, x0, graphBottom);
  }

  // Axis labels
  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    if (x !== 0) {
      text(x, mapX(x), mapY(0) + 5);
    }
  }
  textAlign(RIGHT, CENTER);
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
    if (y !== 0) {
      text(y, mapX(0) - 5, mapY(y));
    }
  }
  text('0', mapX(0) - 5, mapY(0) + 12);
}

function drawFunction(fn) {
  stroke(0, 150, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let x = unmapX(px);
    let y = fn(x);
    let py = mapY(y);
    if (py >= graphTop && py <= graphBottom) {
      vertex(px, py);
    }
  }
  endShape();
}

function drawSecantLine(x1, y1, x2, y2, col, label) {
  // Calculate slope and extend the line
  let slope = (y2 - y1) / (x2 - x1);

  // Extend line across visible region
  let extendedX1 = xMin - 1;
  let extendedY1 = y1 + slope * (extendedX1 - x1);
  let extendedX2 = xMax + 1;
  let extendedY2 = y1 + slope * (extendedX2 - x1);

  stroke(col);
  strokeWeight(2);

  let px1 = mapX(extendedX1);
  let py1 = mapY(extendedY1);
  let px2 = mapX(extendedX2);
  let py2 = mapY(extendedY2);

  // Clip to graph region
  let clipped = clipLine(px1, py1, px2, py2, graphLeft, graphTop, graphRight, graphBottom);
  if (clipped) {
    line(clipped.x1, clipped.y1, clipped.x2, clipped.y2);
  }
}

function clipLine(x1, y1, x2, y2, left, top, right, bottom) {
  // Simple line clipping to rectangle
  let t0 = 0, t1 = 1;
  let dx = x2 - x1, dy = y2 - y1;

  let p = [-dx, dx, -dy, dy];
  let q = [x1 - left, right - x1, y1 - top, bottom - y1];

  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) {
      if (q[i] < 0) return null;
    } else {
      let t = q[i] / p[i];
      if (p[i] < 0) {
        t0 = Math.max(t0, t);
      } else {
        t1 = Math.min(t1, t);
      }
    }
  }

  if (t0 > t1) return null;

  return {
    x1: x1 + t0 * dx,
    y1: y1 + t0 * dy,
    x2: x1 + t1 * dx,
    y2: y1 + t1 * dy
  };
}

function drawInfoPanel(leftSlope, rightSlope, h, funcObj) {
  // Panel position and size
  let panelWidth = 200;
  let panelHeight = 130;
  let panelX = canvasWidth - panelWidth - 15;
  let panelY = 55;

  // Panel background
  fill(255, 255, 255, 240);
  stroke(180);
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  // Panel content
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);

  let lineHeight = 20;
  let y = panelY + 10;
  let x = panelX + 10;

  // Left derivative
  fill(0, 100, 255);
  text('Left slope:', x, y);
  fill('black');
  text(leftSlope.toFixed(4), x + 75, y);
  y += lineHeight;

  // Right derivative
  fill(255, 50, 50);
  text('Right slope:', x, y);
  fill('black');
  text(rightSlope.toFixed(4), x + 75, y);
  y += lineHeight;

  // Difference
  let diff = Math.abs(rightSlope - leftSlope);
  text('Difference:', x, y);
  text(diff.toFixed(4), x + 75, y);
  y += lineHeight + 5;

  // Differentiability status
  let threshold = 0.05;
  let isDifferentiable = !funcObj.hasCorner;
  let slopesMatch = diff < threshold;

  textSize(14);
  if (h < 0.1) {
    // At small h, show final determination
    if (isDifferentiable) {
      fill(0, 150, 0);
      text('DIFFERENTIABLE', x, y);
      y += lineHeight;
      textSize(11);
      fill(80);
      text('Slopes converge to same value', x, y);
    } else {
      fill(200, 0, 0);
      text('NOT DIFFERENTIABLE', x, y);
      y += lineHeight;
      textSize(11);
      fill(80);
      if (funcObj.isCusp) {
        text('Slopes diverge (cusp)', x, y);
      } else {
        text('Left and right slopes differ', x, y);
      }
    }
  } else {
    // Larger h - show approaching
    fill(100);
    text('Approaching...', x, y);
    y += lineHeight;
    textSize(11);
    fill(80);
    text('Decrease h to see limit', x, y);
  }
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
}

function mapX(x) {
  return map(x, xMin, xMax, graphLeft, graphRight);
}

function mapY(y) {
  return map(y, yMin, yMax, graphBottom, graphTop);
}

function unmapX(px) {
  return map(px, graphLeft, graphRight, xMin, xMax);
}

function unmapY(py) {
  return map(py, graphBottom, graphTop, yMin, yMax);
}

function updateGraphBounds() {
  graphLeft = margin + 30;
  graphRight = canvasWidth - 220;
  graphTop = 55;
  graphBottom = drawHeight - margin;
}

function onFunctionChange() {
  currentFunctionIndex = parseInt(functionSelect.value());
}

function resetSimulation() {
  hSlider.value(1.0);
  currentFunctionIndex = 0;
  functionSelect.value(0);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  hSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
