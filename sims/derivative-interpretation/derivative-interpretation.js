// Derivative Interpretation Selector MicroSim
// Shows the same derivative as both slope (graphical) and rate (contextual)
// Demonstrates that derivatives are a single concept with multiple interpretations
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 80; // 2 rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Panel dimensions
let leftPanelWidth;
let rightPanelWidth;
let panelTop = 50;

// Graph parameters
let graphMargin = 40;
let graphLeft, graphRight, graphTop, graphBottom;

// Controls
let contextSelect;
let xSlider;

// Current state
let currentX = 3;
let currentContext = 0; // 0: Car trip, 1: Population, 2: Manufacturing

// Context definitions
const contexts = [
  {
    name: "Car Trip",
    functionLabel: "Position",
    derivativeLabel: "Velocity",
    xLabel: "Time",
    yLabel: "Distance",
    xUnit: "hours",
    yUnit: "miles",
    derivativeUnit: "mph",
    color: [0, 100, 200]
  },
  {
    name: "Population Growth",
    functionLabel: "Population",
    derivativeLabel: "Growth Rate",
    xLabel: "Time",
    yLabel: "Population",
    xUnit: "years",
    yUnit: "thousands",
    derivativeUnit: "thousands/year",
    color: [0, 150, 80]
  },
  {
    name: "Manufacturing Cost",
    functionLabel: "Total Cost",
    derivativeLabel: "Marginal Cost",
    xLabel: "Units Produced",
    yLabel: "Cost",
    xUnit: "units",
    yUnit: "dollars",
    derivativeUnit: "$/unit",
    color: [180, 80, 0]
  }
];

// The function f(x) = x^2 (same for all contexts)
function f(x) {
  return x * x / 10; // Scaled for better visualization
}

// The derivative f'(x) = 2x (same for all contexts)
function fPrime(x) {
  return 2 * x / 10;
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Create context dropdown
  contextSelect = createSelect();
  contextSelect.position(80, drawHeight + 8);
  contextSelect.option('Car Trip');
  contextSelect.option('Population Growth');
  contextSelect.option('Manufacturing Cost');
  contextSelect.changed(contextChanged);

  // Create x-position slider
  xSlider = createSlider(0.5, 8, 3, 0.1);
  xSlider.position(sliderLeftMargin, drawHeight + 45);
  xSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Interactive visualization showing derivative as both slope on a graph and rate of change in context. Students can switch between car velocity, population growth, and manufacturing cost scenarios.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Get current values
  currentX = xSlider.value();

  // Background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Calculate panel dimensions
  leftPanelWidth = (canvasWidth - 30) * 0.55;
  rightPanelWidth = (canvasWidth - 30) * 0.45;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Derivative Interpretation Selector', canvasWidth / 2, 8);

  textSize(14);
  fill(80);
  text('Same derivative - Two interpretations', canvasWidth / 2, 30);

  // Draw left panel (Graph with tangent)
  drawGraphPanel();

  // Draw right panel (Contextual display)
  drawContextPanel();

  // Draw center derivative value
  drawDerivativeDisplay();

  // Draw control labels
  drawControlLabels();
}

function drawGraphPanel() {
  let ctx = contexts[currentContext];

  // Panel background
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(10, panelTop, leftPanelWidth, drawHeight - panelTop - 10, 8);

  // Graph area within panel
  graphLeft = 50;
  graphRight = leftPanelWidth - 20;
  graphTop = panelTop + 30;
  graphBottom = drawHeight - 30;

  let graphWidth = graphRight - graphLeft;
  let graphHeight = graphBottom - graphTop;

  // Draw axes
  stroke(100);
  strokeWeight(1);
  // X axis
  line(graphLeft, graphBottom, graphRight, graphBottom);
  // Y axis
  line(graphLeft, graphTop, graphLeft, graphBottom);

  // Axis labels
  fill(60);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text(ctx.xLabel + ' (' + ctx.xUnit + ')', (graphLeft + graphRight) / 2, graphBottom + 5);

  push();
  translate(graphLeft - 25, (graphTop + graphBottom) / 2);
  rotate(-PI/2);
  textAlign(CENTER, BOTTOM);
  text(ctx.yLabel + ' (' + ctx.yUnit + ')', 0, 0);
  pop();

  // Panel title
  textSize(14);
  textAlign(CENTER, TOP);
  fill(ctx.color[0], ctx.color[1], ctx.color[2]);
  text('Graphical View: Slope of Tangent', 10 + leftPanelWidth/2, panelTop + 8);

  // Draw grid
  stroke(230);
  strokeWeight(1);
  for (let i = 0; i <= 8; i++) {
    let x = map(i, 0, 8, graphLeft, graphRight);
    line(x, graphTop, x, graphBottom);
  }
  for (let i = 0; i <= 6; i++) {
    let y = map(i, 0, 6, graphBottom, graphTop);
    line(graphLeft, y, graphRight, y);
  }

  // Draw function curve
  stroke(ctx.color[0], ctx.color[1], ctx.color[2]);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = 0; px <= 8; px += 0.1) {
    let screenX = map(px, 0, 8, graphLeft, graphRight);
    let screenY = map(f(px), 0, 6.4, graphBottom, graphTop);
    vertex(screenX, screenY);
  }
  endShape();

  // Draw tangent line at current point
  let slope = fPrime(currentX);
  let yAtX = f(currentX);

  // Calculate tangent line endpoints
  let tangentLength = 2;
  let x1 = currentX - tangentLength;
  let y1 = yAtX - slope * tangentLength;
  let x2 = currentX + tangentLength;
  let y2 = yAtX + slope * tangentLength;

  // Clamp to graph area
  x1 = max(0, x1);
  x2 = min(8, x2);
  y1 = yAtX + slope * (x1 - currentX);
  y2 = yAtX + slope * (x2 - currentX);

  stroke(255, 100, 0);
  strokeWeight(3);
  let sx1 = map(x1, 0, 8, graphLeft, graphRight);
  let sy1 = map(y1, 0, 6.4, graphBottom, graphTop);
  let sx2 = map(x2, 0, 8, graphLeft, graphRight);
  let sy2 = map(y2, 0, 6.4, graphBottom, graphTop);
  line(sx1, sy1, sx2, sy2);

  // Draw point on curve
  let pointX = map(currentX, 0, 8, graphLeft, graphRight);
  let pointY = map(yAtX, 0, 6.4, graphBottom, graphTop);

  fill(255, 100, 0);
  noStroke();
  circle(pointX, pointY, 12);

  // Slope annotation
  fill(60);
  textSize(13);
  textAlign(LEFT, TOP);
  noStroke();
  text('Slope = ' + slope.toFixed(2), graphLeft + 10, graphTop + 10);

  // Function label
  textSize(12);
  fill(ctx.color[0], ctx.color[1], ctx.color[2]);
  text('f(x) = x\u00B2/10', graphRight - 70, graphTop + 10);
}

function drawContextPanel() {
  let ctx = contexts[currentContext];
  let panelLeft = leftPanelWidth + 20;

  // Panel background
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(panelLeft, panelTop, rightPanelWidth - 10, drawHeight - panelTop - 10, 8);

  // Panel title
  fill(ctx.color[0], ctx.color[1], ctx.color[2]);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('Contextual View: Rate of Change', panelLeft + (rightPanelWidth - 10)/2, panelTop + 8);

  // Context name
  textSize(16);
  fill(40);
  text(ctx.name, panelLeft + (rightPanelWidth - 10)/2, panelTop + 35);

  let centerX = panelLeft + (rightPanelWidth - 10) / 2;
  let meterY = panelTop + 120;

  // Draw a gauge/meter visualization
  let meterRadius = 60;
  let derivative = fPrime(currentX);

  // Meter background
  stroke(200);
  strokeWeight(8);
  noFill();
  arc(centerX, meterY, meterRadius * 2, meterRadius * 2, PI, TWO_PI);

  // Meter fill based on derivative value
  stroke(ctx.color[0], ctx.color[1], ctx.color[2]);
  strokeWeight(8);
  let angle = map(derivative, 0, 1.6, PI, TWO_PI);
  angle = constrain(angle, PI, TWO_PI);
  arc(centerX, meterY, meterRadius * 2, meterRadius * 2, PI, angle);

  // Needle
  let needleAngle = map(derivative, 0, 1.6, PI, TWO_PI);
  needleAngle = constrain(needleAngle, PI, TWO_PI);
  stroke(60);
  strokeWeight(3);
  let needleX = centerX + cos(needleAngle) * (meterRadius - 10);
  let needleY = meterY + sin(needleAngle) * (meterRadius - 10);
  line(centerX, meterY, needleX, needleY);

  // Center dot
  fill(60);
  noStroke();
  circle(centerX, meterY, 10);

  // Meter labels
  textSize(11);
  fill(100);
  textAlign(CENTER, CENTER);
  text('0', centerX - meterRadius - 10, meterY);
  text('max', centerX + meterRadius + 12, meterY);

  // Value display
  textSize(20);
  fill(ctx.color[0], ctx.color[1], ctx.color[2]);
  textAlign(CENTER, TOP);
  text(derivative.toFixed(2) + ' ' + ctx.derivativeUnit, centerX, meterY + 25);

  // Label
  textSize(14);
  fill(60);
  text(ctx.derivativeLabel, centerX, meterY + 55);

  // Current input value
  textSize(13);
  fill(80);
  textAlign(CENTER, TOP);
  text('At ' + ctx.xLabel.toLowerCase() + ' = ' + currentX.toFixed(1) + ' ' + ctx.xUnit, centerX, meterY + 85);

  // Function value
  let yVal = f(currentX);
  text(ctx.functionLabel + ' = ' + yVal.toFixed(2) + ' ' + ctx.yUnit, centerX, meterY + 105);
}

function drawDerivativeDisplay() {
  let ctx = contexts[currentContext];
  let derivative = fPrime(currentX);

  // Central emphasis box at top
  let boxWidth = 280;
  let boxHeight = 40;
  let boxX = (canvasWidth - boxWidth) / 2;
  let boxY = drawHeight - 55;

  // Box background
  fill(255, 250, 240);
  stroke(ctx.color[0], ctx.color[1], ctx.color[2]);
  strokeWeight(2);
  rect(boxX, boxY, boxWidth, boxHeight, 6);

  // The key message
  fill(40);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Same math: slope = ' + derivative.toFixed(2) + ' = ' + derivative.toFixed(2) + ' ' + ctx.derivativeUnit, boxX + boxWidth/2, boxY + boxHeight/2);
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  // Context dropdown label
  text('Context:', 10, drawHeight + 20);

  // X slider label
  text('x = ' + currentX.toFixed(1), 10, drawHeight + 57);
}

function contextChanged() {
  let selected = contextSelect.value();
  if (selected === 'Car Trip') currentContext = 0;
  else if (selected === 'Population Growth') currentContext = 1;
  else if (selected === 'Manufacturing Cost') currentContext = 2;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  xSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
