// Power Rule Explorer MicroSim
// Visualizes the power rule: d/dx[x^n] = nx^(n-1)
// Shows f(x) = x^n and f'(x) = nx^(n-1) side by side
// Bloom Level: Apply (L3), Verb: apply, calculate, demonstrate
// Learning Objective: Students will apply the power rule to compute derivatives

let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let chartTop = 55; // Room for title + subtitle
let defaultTextSize = 16;

// Graph regions
let leftGraphLeft, leftGraphRight, rightGraphLeft, rightGraphRight;
let graphTop, graphBottom;
let midGap = 50; // Gap between the two graphs

// Coordinate ranges
let xMin = -3, xMax = 3;
let yMin = -8, yMax = 8;

// Current state
let currentX = 1.0;
let exponentN = 2; // Default: x^2
let showTangent = true;

// Control positions
let nSliderX, nSliderY, nSliderW;
let xSliderX, xSliderY, xSliderW;
let tangentBtnX, tangentBtnY;

// Dragging state
let isDraggingNSlider = false;
let isDraggingXSlider = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();

  describe('Interactive visualization of the power rule showing f(x) = x^n and its derivative f\'(x) = nx^(n-1) with synchronized points and tangent line.', LABEL);
}

function updateLayoutPositions() {
  // Graph regions (two side-by-side panels)
  leftGraphLeft = margin + 35;
  leftGraphRight = canvasWidth / 2 - midGap / 2;
  rightGraphLeft = canvasWidth / 2 + midGap / 2;
  rightGraphRight = canvasWidth - margin - 10;
  graphTop = chartTop;
  graphBottom = drawHeight - 25;

  // Control positions - Row 1: Exponent slider
  nSliderX = 120;
  nSliderY = drawHeight + 20;
  nSliderW = canvasWidth - 170;

  // Row 2: X position slider and tangent toggle
  xSliderX = 120;
  xSliderY = drawHeight + 55;
  xSliderW = canvasWidth - 280;

  tangentBtnX = canvasWidth - 130;
  tangentBtnY = drawHeight + 42;
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

  // Draw title and subtitle
  drawTitle();

  // Draw both graphs
  drawLeftGraph();
  drawRightGraph();

  // Draw synchronized vertical line
  drawSyncLine();

  // Draw the function curves
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
  textSize(20);
  text('Power Rule Explorer', canvasWidth / 2, 5);
  textSize(14);
  fill(100);
  text('d/dx[x^n] = nx^(n-1)', canvasWidth / 2, 28);
}

function drawLeftGraph() {
  // Panel label
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  let funcLabel = 'f(x) = x';
  if (exponentN === 1) {
    funcLabel = 'f(x) = x';
  } else if (exponentN === 0) {
    funcLabel = 'f(x) = 1';
  } else if (exponentN === -1) {
    funcLabel = 'f(x) = 1/x';
  } else if (Number.isInteger(exponentN)) {
    funcLabel = 'f(x) = x^' + exponentN;
  } else {
    funcLabel = 'f(x) = x^' + exponentN.toFixed(1);
  }
  text(funcLabel, (leftGraphLeft + leftGraphRight) / 2, chartTop - 5);

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
  for (let i = Math.ceil(yMin); i <= yMax; i += 2) {
    if (i !== 0) {
      let y = map(i, yMin, yMax, graphBottom, graphTop + 15);
      if (y > graphTop + 15 && y < graphBottom) {
        text(i, x0 - 3, y);
      }
    }
  }
}

function drawRightGraph() {
  // Panel label - derivative formula
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  let derivLabel;
  if (exponentN === 0) {
    derivLabel = "f'(x) = 0";
  } else if (exponentN === 1) {
    derivLabel = "f'(x) = 1";
  } else if (exponentN === 2) {
    derivLabel = "f'(x) = 2x";
  } else if (Number.isInteger(exponentN)) {
    derivLabel = "f'(x) = " + exponentN + "x^" + (exponentN - 1);
  } else {
    derivLabel = "f'(x) = " + exponentN.toFixed(1) + "x^" + (exponentN - 1).toFixed(1);
  }
  text(derivLabel, (rightGraphLeft + rightGraphRight) / 2, chartTop - 5);

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
  for (let i = Math.ceil(yMin); i <= yMax; i += 2) {
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
  // Handle special cases for negative bases with fractional exponents
  if (x < 0 && !Number.isInteger(exponentN)) {
    return NaN; // Undefined for negative x with fractional exponent
  }
  if (x === 0 && exponentN < 0) {
    return NaN; // Division by zero
  }
  return Math.pow(x, exponentN);
}

function evaluateDerivative(x) {
  // d/dx[x^n] = n * x^(n-1)
  if (exponentN === 0) {
    return 0; // d/dx[1] = 0
  }
  // Handle special cases
  if (x < 0 && !Number.isInteger(exponentN - 1)) {
    return NaN;
  }
  if (x === 0 && exponentN - 1 < 0) {
    return NaN; // Division by zero
  }
  return exponentN * Math.pow(x, exponentN - 1);
}

function drawFunctionCurve() {
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();

  // Draw curve in segments to handle discontinuities
  let lastY = null;
  let inPath = false;

  for (let px = leftGraphLeft; px <= leftGraphRight; px++) {
    let x = map(px, leftGraphLeft, leftGraphRight, xMin, xMax);
    let y = evaluateFunction(x);
    let py = map(y, yMin, yMax, graphBottom, graphTop + 15);

    if (!isNaN(y) && isFinite(y) && py > graphTop - 50 && py < graphBottom + 50) {
      if (!inPath) {
        beginShape();
        inPath = true;
      }
      vertex(px, constrain(py, graphTop, graphBottom));
      lastY = py;
    } else {
      if (inPath) {
        endShape();
        inPath = false;
      }
    }
  }
  if (inPath) {
    endShape();
  }
}

function drawDerivativeCurve() {
  stroke(200, 100, 50);
  strokeWeight(3);
  noFill();

  let inPath = false;

  for (let px = rightGraphLeft; px <= rightGraphRight; px++) {
    let x = map(px, rightGraphLeft, rightGraphRight, xMin, xMax);
    let y = evaluateDerivative(x);
    let py = map(y, yMin, yMax, graphBottom, graphTop + 15);

    if (!isNaN(y) && isFinite(y) && py > graphTop - 50 && py < graphBottom + 50) {
      if (!inPath) {
        beginShape();
        inPath = true;
      }
      vertex(px, constrain(py, graphTop, graphBottom));
    } else {
      if (inPath) {
        endShape();
        inPath = false;
      }
    }
  }
  if (inPath) {
    endShape();
  }
}

function drawFunctionPoint() {
  let fx = evaluateFunction(currentX);
  let fpx = evaluateDerivative(currentX);

  if (isNaN(fx) || !isFinite(fx)) return;

  let px = map(currentX, xMin, xMax, leftGraphLeft, leftGraphRight);
  let py = map(fx, yMin, yMax, graphBottom, graphTop + 15);

  // Draw tangent line if enabled
  if (showTangent && px > leftGraphLeft && px < leftGraphRight && !isNaN(fpx) && isFinite(fpx)) {
    let tangentLength = 80;

    // Calculate tangent endpoints
    let scaleY = (graphBottom - graphTop - 15) / (yMax - yMin);
    let scaleX = (leftGraphRight - leftGraphLeft) / (xMax - xMin);
    let ratio = scaleY / scaleX;

    // dx in pixels, dy in pixels (accounting for aspect ratio)
    let dxPixels = tangentLength / 2;
    let dyPixels = fpx * ratio * dxPixels / (scaleX / scaleY);

    stroke(0, 150, 100);
    strokeWeight(3);
    line(px - dxPixels, py + dyPixels, px + dxPixels, py - dyPixels);
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

  if (isNaN(fpx) || !isFinite(fpx)) return;

  let px = map(currentX, xMin, xMax, rightGraphLeft, rightGraphRight);
  let py = map(fpx, yMin, yMax, graphBottom, graphTop + 15);

  // Draw horizontal line showing the height (derivative value = slope)
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
  let boxY = graphBottom - 95;
  let boxW = 135;
  let boxH = 90;

  fill(255, 255, 255, 240);
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
  if (!isNaN(fx) && isFinite(fx)) {
    text('f(x) = ' + fx.toFixed(3), boxX + 8, boxY + 26);
  } else {
    text('f(x) = undefined', boxX + 8, boxY + 26);
  }

  fill(200, 100, 50);
  if (!isNaN(fpx) && isFinite(fpx)) {
    text("f'(x) = " + fpx.toFixed(3), boxX + 8, boxY + 44);
  } else {
    text("f'(x) = undefined", boxX + 8, boxY + 44);
  }

  // Show the connection
  fill(0, 150, 100);
  textSize(10);
  if (!isNaN(fpx) && isFinite(fpx)) {
    text('Tangent slope = ' + fpx.toFixed(3), boxX + 8, boxY + 62);
    text('= derivative value!', boxX + 8, boxY + 75);
  }
}

function drawControls() {
  // Row 1: Exponent (n) slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('n = ' + (Number.isInteger(exponentN) ? exponentN : exponentN.toFixed(1)), 10, nSliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(nSliderX, nSliderY - 5, nSliderW, 10, 5);

  // Slider handle
  let nHandleX = map(exponentN, -3, 5, nSliderX, nSliderX + nSliderW);
  fill(isDraggingNSlider ? '#6600cc' : '#9933ff');
  noStroke();
  circle(nHandleX, nSliderY, 18);

  // Row 2: X position slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('x = ' + currentX.toFixed(2), 10, xSliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(xSliderX, xSliderY - 5, xSliderW, 10, 5);

  // Slider handle
  let xHandleX = map(currentX, -2.5, 2.5, xSliderX, xSliderX + xSliderW);
  fill(isDraggingXSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(xHandleX, xSliderY, 18);

  // Tangent toggle button
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Tangent:', tangentBtnX - 65, tangentBtnY + 14);

  fill(showTangent ? '#4CAF50' : '#e0e0e0');
  stroke(showTangent ? '#388E3C' : '#bdbdbd');
  strokeWeight(1);
  rect(tangentBtnX, tangentBtnY, 55, 28, 5);

  fill(showTangent ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(showTangent ? 'ON' : 'OFF', tangentBtnX + 27.5, tangentBtnY + 14);

  // Hint text
  fill(100);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(11);
  text('The slope of the tangent line equals the derivative value!', canvasWidth - 15, nSliderY);
}

function mousePressed() {
  // Check n slider
  let nHandleX = map(exponentN, -3, 5, nSliderX, nSliderX + nSliderW);
  if (dist(mouseX, mouseY, nHandleX, nSliderY) < 15) {
    isDraggingNSlider = true;
    return;
  }

  // Check n slider track click
  if (mouseY > nSliderY - 15 && mouseY < nSliderY + 15 &&
      mouseX > nSliderX && mouseX < nSliderX + nSliderW) {
    exponentN = map(mouseX, nSliderX, nSliderX + nSliderW, -3, 5);
    exponentN = constrain(exponentN, -3, 5);
    exponentN = Math.round(exponentN * 2) / 2; // Snap to 0.5 increments
    isDraggingNSlider = true;
    return;
  }

  // Check x slider
  let xHandleX = map(currentX, -2.5, 2.5, xSliderX, xSliderX + xSliderW);
  if (dist(mouseX, mouseY, xHandleX, xSliderY) < 15) {
    isDraggingXSlider = true;
    return;
  }

  // Check x slider track click
  if (mouseY > xSliderY - 15 && mouseY < xSliderY + 15 &&
      mouseX > xSliderX && mouseX < xSliderX + xSliderW) {
    currentX = map(mouseX, xSliderX, xSliderX + xSliderW, -2.5, 2.5);
    currentX = constrain(currentX, -2.5, 2.5);
    currentX = Math.round(currentX * 20) / 20; // Snap to 0.05 increments
    isDraggingXSlider = true;
    return;
  }

  // Check tangent toggle
  if (mouseX >= tangentBtnX && mouseX <= tangentBtnX + 55 &&
      mouseY >= tangentBtnY && mouseY <= tangentBtnY + 28) {
    showTangent = !showTangent;
    return;
  }
}

function mouseDragged() {
  if (isDraggingNSlider) {
    exponentN = map(mouseX, nSliderX, nSliderX + nSliderW, -3, 5);
    exponentN = constrain(exponentN, -3, 5);
    exponentN = Math.round(exponentN * 2) / 2; // Snap to 0.5 increments
  }
  if (isDraggingXSlider) {
    currentX = map(mouseX, xSliderX, xSliderX + xSliderW, -2.5, 2.5);
    currentX = constrain(currentX, -2.5, 2.5);
    currentX = Math.round(currentX * 20) / 20; // Snap to 0.05 increments
  }
}

function mouseReleased() {
  isDraggingNSlider = false;
  isDraggingXSlider = false;
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
