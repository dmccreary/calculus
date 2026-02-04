// Trig Derivative Cycle MicroSim
// Visualizes the cyclic nature of sine and cosine derivatives
// sin -> cos -> -sin -> -cos -> sin (cycle repeats)
// MicroSim template version 2026.02

// Global variables for responsive design
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Cycle state: 0=sin, 1=cos, 2=-sin, 3=-cos
let cycleState = 0;

// Function definitions for the cycle
const functions = [
  { name: 'sin(x)', color: '#e74c3c', fn: (x) => Math.sin(x) },       // Red
  { name: 'cos(x)', color: '#3498db', fn: (x) => Math.cos(x) },       // Blue
  { name: '-sin(x)', color: '#e67e22', fn: (x) => -Math.sin(x) },     // Orange
  { name: '-cos(x)', color: '#9b59b6', fn: (x) => -Math.cos(x) }      // Purple
];

// Buttons
let derivativeButton;
let resetButton;

// Checkbox for showing both graphs
let showBothCheckbox;
let showBoth = false;

// Circle diagram parameters
let circleCenterX;
let circleCenterY;
let circleRadius = 60;

// Graph parameters
let graphLeftMargin = 200;
let graphWidth;
let graphHeight = 150;
let graphTopY = 50;
let graphBottomY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create Take Derivative button
  derivativeButton = createButton('Take Derivative');
  derivativeButton.position(10, drawHeight + 5);
  derivativeButton.mousePressed(takeDerivative);

  // Create Reset button
  resetButton = createButton('Reset');
  resetButton.position(130, drawHeight + 5);
  resetButton.mousePressed(resetCycle);

  // Create Show Both checkbox using canvas-based approach (handled in draw/mousePressed)

  describe('Interactive visualization of the trigonometric derivative cycle showing how derivatives of sine and cosine functions cycle through sin, cos, -sin, -cos', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing region background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update dynamic layout values
  circleCenterX = 100;
  circleCenterY = drawHeight / 2;
  graphLeftMargin = 200;
  graphWidth = canvasWidth - graphLeftMargin - margin;
  graphBottomY = graphTopY + graphHeight;

  // Draw title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Trigonometric Derivative Cycle', canvasWidth / 2, 8);

  // Draw the circular diagram
  drawCycleDiagram();

  // Draw the graphs
  if (showBoth) {
    drawDualGraphs();
  } else {
    drawSingleGraph();
  }

  // Draw current function info
  drawCurrentInfo();

  // Draw control labels
  drawControls();
}

function drawCycleDiagram() {
  // Draw outer circle
  stroke(200);
  strokeWeight(2);
  noFill();
  ellipse(circleCenterX, circleCenterY, circleRadius * 2 + 40, circleRadius * 2 + 40);

  // Position of each function on the circle (clockwise from top)
  const positions = [
    { angle: -PI / 2, label: 'sin(x)' },      // Top
    { angle: 0, label: 'cos(x)' },            // Right
    { angle: PI / 2, label: '-sin(x)' },      // Bottom
    { angle: PI, label: '-cos(x)' }           // Left
  ];

  // Draw function nodes
  for (let i = 0; i < 4; i++) {
    let x = circleCenterX + cos(positions[i].angle) * circleRadius;
    let y = circleCenterY + sin(positions[i].angle) * circleRadius;

    // Draw node circle
    if (i === cycleState) {
      // Current function - highlighted
      fill(functions[i].color);
      stroke(functions[i].color);
      strokeWeight(3);
    } else {
      // Other functions - subdued
      fill(255);
      stroke(180);
      strokeWeight(2);
    }
    ellipse(x, y, 40, 40);

    // Draw label
    noStroke();
    fill(i === cycleState ? 'white' : 'black');
    textAlign(CENTER, CENTER);
    textSize(11);
    text(positions[i].label, x, y);
  }

  // Draw arrows between nodes
  for (let i = 0; i < 4; i++) {
    let nextI = (i + 1) % 4;
    let startAngle = positions[i].angle;
    let endAngle = positions[nextI].angle;

    // Calculate start and end points on the outer edge of nodes
    let startX = circleCenterX + cos(startAngle) * circleRadius;
    let startY = circleCenterY + sin(startAngle) * circleRadius;
    let endX = circleCenterX + cos(endAngle) * circleRadius;
    let endY = circleCenterY + sin(endAngle) * circleRadius;

    // Adjust for node radius
    let midAngle = (startAngle + endAngle) / 2;
    if (i === 3) midAngle = startAngle + (TWO_PI + endAngle - startAngle) / 2; // Handle wraparound

    // Draw curved arrow
    if (i === cycleState) {
      stroke(functions[i].color);
      strokeWeight(3);
    } else {
      stroke(180);
      strokeWeight(2);
    }
    noFill();

    // Calculate control point for curved arrow
    let controlDist = circleRadius * 0.3;
    let cpX = circleCenterX + cos(midAngle) * (circleRadius + controlDist);
    let cpY = circleCenterY + sin(midAngle) * (circleRadius + controlDist);

    // Draw arc segments between nodes
    let arcRadius = circleRadius + 15;
    let arcStart = startAngle + 0.3;
    let arcEnd = endAngle - 0.3;
    if (i === 3) {
      arcEnd = endAngle + TWO_PI - 0.3;
    }

    arc(circleCenterX, circleCenterY, arcRadius * 2, arcRadius * 2, arcStart, arcEnd);

    // Draw arrowhead
    let arrowAngle = endAngle - 0.3;
    let arrowX = circleCenterX + cos(arrowAngle) * arcRadius;
    let arrowY = circleCenterY + sin(arrowAngle) * arcRadius;

    // Arrowhead direction (tangent to circle)
    let tangentAngle = arrowAngle + PI / 2;
    drawArrowhead(arrowX, arrowY, tangentAngle);
  }

  // Draw "d/dx" label in center
  noStroke();
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(14);
  text('d/dx', circleCenterX, circleCenterY);

  // Draw title for diagram
  textSize(14);
  fill('black');
  text('Derivative Cycle', circleCenterX, circleCenterY - circleRadius - 50);
}

function drawArrowhead(x, y, angle) {
  let arrowSize = 8;
  push();
  translate(x, y);
  rotate(angle);
  fill(stroke());
  beginShape();
  vertex(0, 0);
  vertex(-arrowSize, -arrowSize / 2);
  vertex(-arrowSize, arrowSize / 2);
  endShape(CLOSE);
  pop();
}

function drawSingleGraph() {
  let graphY = graphTopY + 30;
  let height = 250;

  // f(x) graph
  drawGraph(graphLeftMargin, graphY, graphWidth, height / 2 - 10,
    functions[cycleState], "f(x) = " + functions[cycleState].name);

  // f'(x) graph
  let nextState = (cycleState + 1) % 4;
  drawGraph(graphLeftMargin, graphY + height / 2 + 20, graphWidth, height / 2 - 10,
    functions[nextState], "f'(x) = " + functions[nextState].name);
}

function drawDualGraphs() {
  let graphY = graphTopY + 30;
  let height = 250;

  // f(x) graph
  drawGraph(graphLeftMargin, graphY, graphWidth, height / 2 - 10,
    functions[cycleState], "f(x) = " + functions[cycleState].name);

  // f'(x) graph
  let nextState = (cycleState + 1) % 4;
  drawGraph(graphLeftMargin, graphY + height / 2 + 20, graphWidth, height / 2 - 10,
    functions[nextState], "f'(x) = " + functions[nextState].name);
}

function drawGraph(x, y, w, h, funcData, title) {
  // Draw background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(x, y, w, h, 5);

  // Draw title
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(12);
  text(title, x + 5, y + 3);

  // Graph area (with padding for title)
  let graphPadding = 20;
  let graphX = x + 5;
  let graphY = y + graphPadding;
  let graphW = w - 10;
  let graphH = h - graphPadding - 5;

  // Draw axes
  stroke(150);
  strokeWeight(1);
  // X-axis (centered vertically)
  let centerY = graphY + graphH / 2;
  line(graphX, centerY, graphX + graphW, centerY);
  // Y-axis (at left edge)
  line(graphX, graphY, graphX, graphY + graphH);

  // Draw function curve
  stroke(funcData.color);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = 0; px <= graphW; px++) {
    // Map px to x range (-2pi to 2pi)
    let xVal = map(px, 0, graphW, -TWO_PI, TWO_PI);
    let yVal = funcData.fn(xVal);
    // Map y value to graph coordinates
    let py = map(yVal, -1.2, 1.2, graphY + graphH, graphY);
    vertex(graphX + px, py);
  }
  endShape();

  // Draw axis labels
  noStroke();
  fill(100);
  textSize(10);
  textAlign(CENTER, TOP);
  text('-2\u03C0', graphX, centerY + 2);
  text('2\u03C0', graphX + graphW, centerY + 2);
  textAlign(LEFT, CENTER);
  text('1', graphX + 2, graphY + 5);
  text('-1', graphX + 2, graphY + graphH - 5);
}

function drawCurrentInfo() {
  let infoX = circleCenterX;
  let infoY = circleCenterY + circleRadius + 60;

  noStroke();
  textAlign(CENTER, TOP);

  // Current function
  fill(functions[cycleState].color);
  textSize(14);
  text('Current: ' + functions[cycleState].name, infoX, infoY);

  // Derivative
  let nextState = (cycleState + 1) % 4;
  fill(functions[nextState].color);
  text('Derivative: ' + functions[nextState].name, infoX, infoY + 20);

  // Step counter
  fill(100);
  textSize(12);
  text('Step: ' + (cycleState + 1) + ' of 4', infoX, infoY + 45);
}

function drawControls() {
  // Draw checkbox area manually (canvas-based control)
  let checkboxX = 10;
  let checkboxY = drawHeight + 45;
  let checkboxSize = 16;

  // Checkbox box
  stroke(100);
  strokeWeight(1);
  fill(showBoth ? functions[cycleState].color : 255);
  rect(checkboxX, checkboxY, checkboxSize, checkboxSize, 3);

  // Checkmark if checked
  if (showBoth) {
    stroke(255);
    strokeWeight(2);
    line(checkboxX + 3, checkboxY + 8, checkboxX + 7, checkboxY + 12);
    line(checkboxX + 7, checkboxY + 12, checkboxX + 13, checkboxY + 4);
  }

  // Label
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Show Both Graphs', checkboxX + checkboxSize + 8, checkboxY + checkboxSize / 2);
}

function mousePressed() {
  // Check if checkbox was clicked
  let checkboxX = 10;
  let checkboxY = drawHeight + 45;
  let checkboxSize = 16;

  if (mouseX >= checkboxX && mouseX <= checkboxX + checkboxSize + 120 &&
    mouseY >= checkboxY && mouseY <= checkboxY + checkboxSize) {
    showBoth = !showBoth;
  }
}

function takeDerivative() {
  cycleState = (cycleState + 1) % 4;
}

function resetCycle() {
  cycleState = 0;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
