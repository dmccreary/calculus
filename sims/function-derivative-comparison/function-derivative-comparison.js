// Function and Derivative Comparison MicroSim
// Shows a function and its derivative side by side with synchronized point
// Bloom Level: Analyze (L4), Verb: analyze, examine, compare
// Learning Objective: Students will analyze the relationship between a
// function graph and its derivative graph

let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let chartTop = 50;
let defaultTextSize = 16;

// Graph regions
let leftGraphLeft, leftGraphRight, rightGraphLeft, rightGraphRight;
let graphTop, graphBottom;
let midGap = 40; // Gap between the two graphs

// Coordinate ranges
let xMin = -3, xMax = 3;
let yMin = -4, yMax = 4;

// Current state
let currentX = 0.5;
let currentFunction = 0; // 0=x^2, 1=x^3, 2=sin(x), 3=e^x
let showTangent = true;

// Function names and formulas
const functions = [
  { name: 'x^2', display: 'f(x) = x^2', derivative: "f'(x) = 2x" },
  { name: 'x^3', display: 'f(x) = x^3', derivative: "f'(x) = 3x^2" },
  { name: 'sin(x)', display: 'f(x) = sin(x)', derivative: "f'(x) = cos(x)" },
  { name: 'e^x', display: 'f(x) = e^x', derivative: "f'(x) = e^x" }
];

// Control positions
let sliderX, sliderY, sliderW;
let funcBtnX, funcBtnY, funcBtnW;
let tangentBtnX, tangentBtnY;

// Dragging state
let isDraggingSlider = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();

  describe('Interactive comparison of a function and its derivative with synchronized point and tangent line visualization.', LABEL);
}

function updateLayoutPositions() {
  // Graph regions (two side-by-side panels)
  leftGraphLeft = margin + 30;
  leftGraphRight = canvasWidth / 2 - midGap / 2;
  rightGraphLeft = canvasWidth / 2 + midGap / 2;
  rightGraphRight = canvasWidth - margin - 10;
  graphTop = chartTop;
  graphBottom = drawHeight - 30;

  // Control positions
  sliderX = 50;
  sliderY = drawHeight + 25;
  sliderW = canvasWidth - 350;

  funcBtnX = canvasWidth - 280;
  funcBtnY = drawHeight + 10;
  funcBtnW = 60;

  tangentBtnX = canvasWidth - 100;
  tangentBtnY = drawHeight + 10;
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  drawTitle();

  // Draw both graphs
  drawLeftGraph();
  drawRightGraph();

  // Draw synchronized vertical line
  drawSyncLine();

  // Draw the function curve and derivative curve
  drawFunctionCurve();
  drawDerivativeCurve();

  // Draw points and tangent
  drawFunctionPoint();
  drawDerivativePoint();

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
  text('Function and Derivative Comparison', canvasWidth / 2, 5);
  textSize(14);
  text(functions[currentFunction].display + '   |   ' + functions[currentFunction].derivative, canvasWidth / 2, 26);
}

function drawLeftGraph() {
  // Panel label
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('f(x) - Original Function', (leftGraphLeft + leftGraphRight) / 2, chartTop - 2);

  // Grid
  stroke(230);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let x = map(i, xMin, xMax, leftGraphLeft, leftGraphRight);
    line(x, graphTop + 15, x, graphBottom);
  }

  // Horizontal grid lines
  for (let i = Math.ceil(yMin); i <= yMax; i++) {
    let y = map(i, yMin, yMax, graphBottom, graphTop + 15);
    if (y > graphTop + 15 && y < graphBottom) {
      line(leftGraphLeft, y, leftGraphRight, y);
    }
  }

  // Axes
  stroke(0);
  strokeWeight(2);

  // X-axis
  let y0 = map(0, yMin, yMax, graphBottom, graphTop + 15);
  if (y0 > graphTop + 15 && y0 < graphBottom) {
    line(leftGraphLeft, y0, leftGraphRight, y0);
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, leftGraphLeft, leftGraphRight);
  if (x0 > leftGraphLeft && x0 < leftGraphRight) {
    line(x0, graphTop + 15, x0, graphBottom);
  }

  // Axis labels
  fill(0);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    if (i !== 0) {
      let x = map(i, xMin, xMax, leftGraphLeft, leftGraphRight);
      text(i, x, y0 + 3);
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = Math.ceil(yMin); i <= yMax; i++) {
    if (i !== 0) {
      let y = map(i, yMin, yMax, graphBottom, graphTop + 15);
      if (y > graphTop + 15 && y < graphBottom) {
        text(i, x0 - 3, y);
      }
    }
  }
}

function drawRightGraph() {
  // Panel label
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text("f'(x) - Derivative", (rightGraphLeft + rightGraphRight) / 2, chartTop - 2);

  // Grid
  stroke(230);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let x = map(i, xMin, xMax, rightGraphLeft, rightGraphRight);
    line(x, graphTop + 15, x, graphBottom);
  }

  // Horizontal grid lines
  for (let i = Math.ceil(yMin); i <= yMax; i++) {
    let y = map(i, yMin, yMax, graphBottom, graphTop + 15);
    if (y > graphTop + 15 && y < graphBottom) {
      line(rightGraphLeft, y, rightGraphRight, y);
    }
  }

  // Axes
  stroke(0);
  strokeWeight(2);

  // X-axis
  let y0 = map(0, yMin, yMax, graphBottom, graphTop + 15);
  if (y0 > graphTop + 15 && y0 < graphBottom) {
    line(rightGraphLeft, y0, rightGraphRight, y0);
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, rightGraphLeft, rightGraphRight);
  if (x0 > rightGraphLeft && x0 < rightGraphRight) {
    line(x0, graphTop + 15, x0, graphBottom);
  }

  // Axis labels
  fill(0);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    if (i !== 0) {
      let x = map(i, xMin, xMax, rightGraphLeft, rightGraphRight);
      text(i, x, y0 + 3);
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = Math.ceil(yMin); i <= yMax; i++) {
    if (i !== 0) {
      let y = map(i, yMin, yMax, graphBottom, graphTop + 15);
      if (y > graphTop + 15 && y < graphBottom) {
        text(i, x0 - 3, y);
      }
    }
  }
}

function drawSyncLine() {
  // Vertical dashed line showing current x on both graphs
  let leftX = map(currentX, xMin, xMax, leftGraphLeft, leftGraphRight);
  let rightX = map(currentX, xMin, xMax, rightGraphLeft, rightGraphRight);

  stroke(150, 150, 200);
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);

  if (leftX > leftGraphLeft && leftX < leftGraphRight) {
    line(leftX, graphTop + 15, leftX, graphBottom);
  }
  if (rightX > rightGraphLeft && rightX < rightGraphRight) {
    line(rightX, graphTop + 15, rightX, graphBottom);
  }

  drawingContext.setLineDash([]);
}

function evaluateFunction(x) {
  switch (currentFunction) {
    case 0: return x * x;
    case 1: return x * x * x;
    case 2: return Math.sin(x);
    case 3: return Math.exp(x);
    default: return 0;
  }
}

function evaluateDerivative(x) {
  switch (currentFunction) {
    case 0: return 2 * x;
    case 1: return 3 * x * x;
    case 2: return Math.cos(x);
    case 3: return Math.exp(x);
    default: return 0;
  }
}

function drawFunctionCurve() {
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = leftGraphLeft; px <= leftGraphRight; px++) {
    let x = map(px, leftGraphLeft, leftGraphRight, xMin, xMax);
    let y = evaluateFunction(x);
    let py = map(y, yMin, yMax, graphBottom, graphTop + 15);

    if (py > graphTop && py < graphBottom + 20) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();
}

function drawDerivativeCurve() {
  stroke(200, 100, 50);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = rightGraphLeft; px <= rightGraphRight; px++) {
    let x = map(px, rightGraphLeft, rightGraphRight, xMin, xMax);
    let y = evaluateDerivative(x);
    let py = map(y, yMin, yMax, graphBottom, graphTop + 15);

    if (py > graphTop && py < graphBottom + 20) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();
}

function drawFunctionPoint() {
  let fx = evaluateFunction(currentX);
  let fpx = evaluateDerivative(currentX);

  let px = map(currentX, xMin, xMax, leftGraphLeft, leftGraphRight);
  let py = map(fx, yMin, yMax, graphBottom, graphTop + 15);

  // Draw tangent line if enabled
  if (showTangent && px > leftGraphLeft && px < leftGraphRight) {
    let tangentLength = 60;
    let dx = tangentLength / Math.sqrt(1 + fpx * fpx);
    let dy = fpx * dx;

    // Scale dy to match the graph's aspect ratio
    let scaleY = (graphBottom - graphTop - 15) / (yMax - yMin);
    let scaleX = (leftGraphRight - leftGraphLeft) / (xMax - xMin);
    let scaledDy = dy * scaleY / scaleX;

    stroke(0, 150, 100);
    strokeWeight(2);
    line(px - tangentLength/2, py + scaledDy/2, px + tangentLength/2, py - scaledDy/2);
  }

  // Draw the point
  if (py > graphTop && py < graphBottom) {
    fill(50, 100, 200);
    stroke(255);
    strokeWeight(2);
    circle(px, py, 14);
  }
}

function drawDerivativePoint() {
  let fpx = evaluateDerivative(currentX);

  let px = map(currentX, xMin, xMax, rightGraphLeft, rightGraphRight);
  let py = map(fpx, yMin, yMax, graphBottom, graphTop + 15);

  // Draw horizontal line showing the height (derivative value)
  if (py > graphTop + 15 && py < graphBottom) {
    stroke(200, 100, 50, 150);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(rightGraphLeft, py, rightGraphRight, py);
    drawingContext.setLineDash([]);
  }

  // Draw the point
  if (py > graphTop && py < graphBottom) {
    fill(200, 100, 50);
    stroke(255);
    strokeWeight(2);
    circle(px, py, 14);
  }
}

function drawInfoPanel() {
  let boxX = 10;
  let boxY = graphBottom - 75;
  let boxW = 120;
  let boxH = 70;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 8);

  let fx = evaluateFunction(currentX);
  let fpx = evaluateDerivative(currentX);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('x = ' + currentX.toFixed(2), boxX + 8, boxY + 8);

  fill(50, 100, 200);
  text('f(x) = ' + fx.toFixed(2), boxX + 8, boxY + 26);

  fill(200, 100, 50);
  text("f'(x) = " + fpx.toFixed(2), boxX + 8, boxY + 44);

  // Show slope interpretation
  fill(0, 150, 100);
  textSize(10);
  if (Math.abs(fpx) < 0.05) {
    text('Slope = 0 (flat)', boxX + 8, boxY + 58);
  } else if (fpx > 0) {
    text('Slope > 0 (rising)', boxX + 8, boxY + 58);
  } else {
    text('Slope < 0 (falling)', boxX + 8, boxY + 58);
  }
}

function drawControls() {
  // X slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('x: ' + currentX.toFixed(2), 10, sliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 4, sliderW, 8, 4);

  // Slider handle
  let handleX = map(currentX, xMin, xMax, sliderX, sliderX + sliderW);
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleX, sliderY, 18);

  // Function selector buttons
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  text('Function:', funcBtnX - 70, funcBtnY + 14);

  for (let i = 0; i < 4; i++) {
    let bx = funcBtnX + i * (funcBtnW + 5);

    fill(currentFunction === i ? '#4CAF50' : '#e0e0e0');
    stroke(currentFunction === i ? '#388E3C' : '#bdbdbd');
    strokeWeight(1);
    rect(bx, funcBtnY, funcBtnW, 28, 5);

    fill(currentFunction === i ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(functions[i].name, bx + funcBtnW / 2, funcBtnY + 14);
  }

  // Tangent toggle button
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Tangent:', tangentBtnX - 60, tangentBtnY + 14);

  fill(showTangent ? '#4CAF50' : '#e0e0e0');
  stroke(showTangent ? '#388E3C' : '#bdbdbd');
  strokeWeight(1);
  rect(tangentBtnX, tangentBtnY, 55, 28, 5);

  fill(showTangent ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(showTangent ? 'ON' : 'OFF', tangentBtnX + 27.5, tangentBtnY + 14);

  // Second row - explanation
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('The tangent line slope on the left equals the height of the point on the right!', 10, drawHeight + 60);
}

function mousePressed() {
  // Check slider
  let handleX = map(currentX, xMin, xMax, sliderX, sliderX + sliderW);
  if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check slider track click
  if (mouseY > sliderY - 10 && mouseY < sliderY + 10 &&
      mouseX > sliderX && mouseX < sliderX + sliderW) {
    currentX = map(mouseX, sliderX, sliderX + sliderW, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    isDraggingSlider = true;
    return;
  }

  // Check function buttons
  for (let i = 0; i < 4; i++) {
    let bx = funcBtnX + i * (funcBtnW + 5);
    if (mouseX >= bx && mouseX <= bx + funcBtnW &&
        mouseY >= funcBtnY && mouseY <= funcBtnY + 28) {
      currentFunction = i;
      return;
    }
  }

  // Check tangent toggle
  if (mouseX >= tangentBtnX && mouseX <= tangentBtnX + 55 &&
      mouseY >= tangentBtnY && mouseY <= tangentBtnY + 28) {
    showTangent = !showTangent;
    return;
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    currentX = map(mouseX, sliderX, sliderX + sliderW, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    currentX = Math.round(currentX * 100) / 100; // Round to 2 decimal places
  }
}

function mouseReleased() {
  isDraggingSlider = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayoutPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  updateLayoutPositions();
}
