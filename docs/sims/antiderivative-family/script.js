// Antiderivative Family MicroSim
// Visualize how different values of C produce a family of parallel antiderivative curves
// Bloom Level: Understand (L2), Verbs: explain, interpret, visualize
// Learning Objective: Students will explain why antiderivatives differ by a constant

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 50;
let defaultTextSize = 16;

// Panel dimensions
let antiderivPanel, derivPanel;
let showDerivative = true;

// Coordinate ranges
let xMin = -3, xMax = 3;
let yMin = -5, yMax = 5;
let derivYMin = -6, derivYMax = 6;

// Current state
let currentX = 1.0;
let numCurves = 5;  // Number of C values to show
let currentFunction = 0;  // 0=x^2, 1=x^3, 2=-cos(x)

// Function definitions (antiderivatives and their derivatives)
const functions = [
  {
    name: 'x\u00B2 family',
    antiderivLabel: 'F(x) = x\u00B2/2 + C',
    derivLabel: 'f(x) = x',
    antiderivative: (x, c) => x * x / 2 + c,
    derivative: (x) => x
  },
  {
    name: 'x\u00B3 family',
    antiderivLabel: 'F(x) = x\u00B3/3 + C',
    derivLabel: 'f(x) = x\u00B2',
    antiderivative: (x, c) => x * x * x / 3 + c,
    derivative: (x) => x * x
  },
  {
    name: 'sin(x) family',
    antiderivLabel: 'F(x) = -cos(x) + C',
    derivLabel: 'f(x) = sin(x)',
    antiderivative: (x, c) => -Math.cos(x) + c,
    derivative: (x) => Math.sin(x)
  }
];

// Colors for the family of curves
const curveColors = [
  [102, 51, 153],   // Purple (main theme)
  [153, 102, 204],  // Light purple
  [75, 0, 130],     // Indigo
  [138, 43, 226],   // Blue violet
  [147, 112, 219],  // Medium purple
  [186, 85, 211],   // Medium orchid
  [218, 112, 214],  // Orchid
  [221, 160, 221],  // Plum
  [128, 0, 128]     // Dark purple
];
const derivColor = [0, 150, 80];  // Green for derivative
const tangentColor = [255, 150, 50];  // Orange for tangent lines

// Control positions
let xSliderX, xSliderY, xSliderW;
let numCurvesSliderX, numCurvesSliderY, numCurvesSliderW;
let funcBtnX, funcBtnY, funcBtnW;
let toggleBtnX, toggleBtnY;

// Dragging state
let isDraggingXSlider = false;
let isDraggingNumSlider = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();

  describe('Interactive visualization showing a family of antiderivative curves F(x) + C. All curves are vertical shifts of each other, and tangent lines at the same x-value have identical slopes, demonstrating that all antiderivatives of a function differ only by a constant.', LABEL);
}

function updateLayoutPositions() {
  // Control positions
  xSliderX = 60;
  xSliderY = drawHeight + 25;
  xSliderW = canvasWidth * 0.35;

  numCurvesSliderX = 60;
  numCurvesSliderY = drawHeight + 60;
  numCurvesSliderW = canvasWidth * 0.35;

  funcBtnX = canvasWidth * 0.45 + 50;
  funcBtnY = drawHeight + 12;
  funcBtnW = 90;

  toggleBtnX = canvasWidth * 0.45 + 50;
  toggleBtnY = drawHeight + 90;
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

  // Calculate panel dimensions
  let panelLeft = margin + 45;
  let panelRight = canvasWidth - margin - 10;
  let panelTop = chartTop + 5;
  let panelBottom;

  if (showDerivative) {
    panelBottom = drawHeight * 0.65;
    let derivTop = drawHeight * 0.68;
    let derivBottom = drawHeight - 10;
    drawDerivativePanel(panelLeft, panelRight, derivTop, derivBottom);
  } else {
    panelBottom = drawHeight - 15;
  }

  // Draw main antiderivative panel
  drawAntiderivativePanel(panelLeft, panelRight, panelTop, panelBottom);

  // Draw slope info
  drawSlopeInfo(panelRight);

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Family of Antiderivatives', canvasWidth / 2, 5);
  textSize(13);
  fill(80);
  text('All curves differ only by constant C - same slope at each x!', canvasWidth / 2, 26);
}

function drawAntiderivativePanel(left, right, top, bottom) {
  // Panel background
  fill(255, 255, 255, 220);
  stroke(200);
  strokeWeight(1);
  rect(left - 40, top - 5, right - left + 45, bottom - top + 10, 5);

  // Panel label
  fill(102, 51, 153);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Antiderivatives F(x) + C', left - 35, top);

  // Formula
  textAlign(RIGHT, TOP);
  textSize(11);
  fill(100);
  text(functions[currentFunction].antiderivLabel, right, top);

  // Graph dimensions
  let graphTop = top + 18;
  let graphBottom = bottom - 5;

  // Draw grid
  drawGrid(left, right, graphTop, graphBottom, xMin, xMax, yMin, yMax);

  // Calculate C values to show (centered around 0)
  let cValues = [];
  let spacing = 1.5;
  let startC = -Math.floor(numCurves / 2) * spacing;
  for (let i = 0; i < numCurves; i++) {
    cValues.push(startC + i * spacing);
  }

  // Draw each antiderivative curve
  for (let i = 0; i < numCurves; i++) {
    let c = cValues[i];
    let col = curveColors[i % curveColors.length];

    // Draw curve
    stroke(col[0], col[1], col[2]);
    strokeWeight(2);
    noFill();

    beginShape();
    for (let px = left; px <= right; px += 2) {
      let x = map(px, left, right, xMin, xMax);
      let y = functions[currentFunction].antiderivative(x, c);
      let py = map(y, yMin, yMax, graphBottom, graphTop);

      if (py >= graphTop - 10 && py <= graphBottom + 10) {
        vertex(px, constrain(py, graphTop, graphBottom));
      }
    }
    endShape();

    // Draw point and tangent line at current x
    let currY = functions[currentFunction].antiderivative(currentX, c);
    let currPx = map(currentX, xMin, xMax, left, right);
    let currPy = map(currY, yMin, yMax, graphBottom, graphTop);

    if (currPy >= graphTop && currPy <= graphBottom) {
      // Draw tangent line
      let slope = functions[currentFunction].derivative(currentX);
      drawTangentLine(currPx, currPy, slope, left, right, graphTop, graphBottom, yMin, yMax);

      // Draw point
      fill(col[0], col[1], col[2]);
      stroke(255);
      strokeWeight(2);
      circle(currPx, currPy, 10);
    }
  }

  // Draw vertical line at current x
  let currPx = map(currentX, xMin, xMax, left, right);
  stroke(150, 150, 200);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(currPx, graphTop, currPx, graphBottom);
  drawingContext.setLineDash([]);

  // Label for C values
  fill(80);
  noStroke();
  textAlign(LEFT, BOTTOM);
  textSize(10);
  text('C values: ' + cValues.map(c => c >= 0 ? '+' + c.toFixed(1) : c.toFixed(1)).join(', '), left - 35, bottom + 5);
}

function drawDerivativePanel(left, right, top, bottom) {
  // Panel background
  fill(255, 255, 255, 220);
  stroke(200);
  strokeWeight(1);
  rect(left - 40, top, right - left + 45, bottom - top, 5);

  // Panel label
  fill(derivColor[0], derivColor[1], derivColor[2]);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Derivative f(x)', left - 35, top + 5);

  // Formula
  textAlign(RIGHT, TOP);
  textSize(11);
  fill(100);
  text(functions[currentFunction].derivLabel, right, top + 5);

  // Graph dimensions
  let graphTop = top + 22;
  let graphBottom = bottom - 5;

  // Draw grid
  drawGrid(left, right, graphTop, graphBottom, xMin, xMax, derivYMin, derivYMax);

  // Draw derivative curve
  stroke(derivColor[0], derivColor[1], derivColor[2]);
  strokeWeight(2.5);
  noFill();

  beginShape();
  for (let px = left; px <= right; px += 2) {
    let x = map(px, left, right, xMin, xMax);
    let y = functions[currentFunction].derivative(x);
    let py = map(y, derivYMin, derivYMax, graphBottom, graphTop);

    if (py >= graphTop - 10 && py <= graphBottom + 10) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();

  // Draw point at current x
  let currY = functions[currentFunction].derivative(currentX);
  let currPx = map(currentX, xMin, xMax, left, right);
  let currPy = map(currY, derivYMin, derivYMax, graphBottom, graphTop);

  if (currPy >= graphTop && currPy <= graphBottom) {
    fill(derivColor[0], derivColor[1], derivColor[2]);
    stroke(255);
    strokeWeight(2);
    circle(currPx, currPy, 12);

    // Show the slope value next to point
    fill(derivColor[0], derivColor[1], derivColor[2]);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('slope = ' + currY.toFixed(2), currPx + 10, currPy);
  }

  // Draw vertical line at current x
  stroke(150, 150, 200);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(currPx, graphTop, currPx, graphBottom);
  drawingContext.setLineDash([]);
}

function drawGrid(left, right, top, bottom, xMin, xMax, yMin, yMax) {
  stroke(235);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let x = map(i, xMin, xMax, left, right);
    line(x, top, x, bottom);
  }

  // Horizontal grid lines
  let yStep = (yMax - yMin) / 5;
  for (let i = 0; i <= 5; i++) {
    let yVal = yMin + i * yStep;
    let y = map(yVal, yMin, yMax, bottom, top);
    line(left, y, right, y);
  }

  // Axes
  stroke(120);
  strokeWeight(1);

  // X-axis
  let y0 = map(0, yMin, yMax, bottom, top);
  if (y0 > top && y0 < bottom) {
    line(left, y0, right, y0);
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, left, right);
  if (x0 > left && x0 < right) {
    line(x0, top, x0, bottom);
  }

  // Axis labels
  fill(100);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text('x', right - 5, y0 > top && y0 < bottom ? y0 + 3 : bottom + 3);
  textAlign(RIGHT, CENTER);
  text('y', x0 > left && x0 < right ? x0 - 5 : left - 5, top + 10);
}

function drawTangentLine(px, py, slope, left, right, top, bottom, yMin, yMax) {
  // Calculate visual slope (accounting for different x/y scales)
  let scaleX = (right - left) / (xMax - xMin);
  let scaleY = (bottom - top) / (yMax - yMin);
  let visualSlope = slope * scaleY / scaleX;

  let tangentHalfLength = 35;

  stroke(tangentColor[0], tangentColor[1], tangentColor[2]);
  strokeWeight(2);

  let x1 = px - tangentHalfLength;
  let y1 = py + visualSlope * tangentHalfLength;
  let x2 = px + tangentHalfLength;
  let y2 = py - visualSlope * tangentHalfLength;

  // Clamp to panel boundaries
  x1 = max(left, x1);
  x2 = min(right, x2);
  y1 = constrain(y1, top, bottom);
  y2 = constrain(y2, top, bottom);

  line(x1, y1, x2, y2);
}

function drawSlopeInfo(panelRight) {
  let slope = functions[currentFunction].derivative(currentX);

  // Info box
  let boxX = margin + 50;
  let boxY = chartTop + 25;
  let boxW = 130;
  let boxH = 70;

  fill(255, 255, 255, 245);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('x = ' + currentX.toFixed(2), boxX + 8, boxY + 8);

  fill(derivColor[0], derivColor[1], derivColor[2]);
  textSize(13);
  text("Slope at x:", boxX + 8, boxY + 28);
  textSize(16);
  fill(102, 51, 153);
  text(slope.toFixed(3), boxX + 8, boxY + 46);

  // Key insight
  fill(80);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  let insight = "Same slope for ALL curves!";
  text(insight, boxX + 70, boxY + 50);
}

function drawControls() {
  // X slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('x = ' + currentX.toFixed(2), 10, xSliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(xSliderX, xSliderY - 5, xSliderW, 10, 5);

  // Slider handle
  let handleX = map(currentX, xMin, xMax, xSliderX, xSliderX + xSliderW);
  fill(isDraggingXSlider ? '#6633CC' : '#9966CC');
  noStroke();
  circle(handleX, xSliderY, 18);

  // Number of curves slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Curves: ' + numCurves, 10, numCurvesSliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(numCurvesSliderX, numCurvesSliderY - 5, numCurvesSliderW, 10, 5);

  // Slider handle
  let numHandleX = map(numCurves, 1, 9, numCurvesSliderX, numCurvesSliderX + numCurvesSliderW);
  fill(isDraggingNumSlider ? '#6633CC' : '#9966CC');
  noStroke();
  circle(numHandleX, numCurvesSliderY, 18);

  // Function selector label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Function Family:', funcBtnX - 5, funcBtnY - 5);

  // Function buttons
  for (let i = 0; i < 3; i++) {
    let bx = funcBtnX + (i % 2) * (funcBtnW + 5);
    let by = funcBtnY + Math.floor(i / 2) * 32 + 8;
    if (i === 2) {
      bx = funcBtnX;
      by = funcBtnY + 40;
    }

    fill(currentFunction === i ? '#6633CC' : '#e0e0e0');
    stroke(currentFunction === i ? '#4B0082' : '#bdbdbd');
    strokeWeight(1);
    rect(bx, by, funcBtnW, 26, 5);

    fill(currentFunction === i ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(functions[i].name, bx + funcBtnW / 2, by + 13);
  }

  // Show derivative toggle
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text("Show f(x):", toggleBtnX - 5, toggleBtnY + 12);

  let toggleW = 50;
  let toggleX = toggleBtnX + 60;
  fill(showDerivative ? '#4CAF50' : '#e0e0e0');
  stroke(showDerivative ? '#388E3C' : '#bdbdbd');
  strokeWeight(1);
  rect(toggleX, toggleBtnY, toggleW, 24, 5);

  fill(showDerivative ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(showDerivative ? 'ON' : 'OFF', toggleX + toggleW / 2, toggleBtnY + 12);

  // Explanation text
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  let explanation = "Key insight: Adding C shifts the curve vertically but doesn't change the slope (derivative) at any point!";
  text(explanation, 10, drawHeight + 115);
}

function mousePressed() {
  // Check X slider handle
  let handleX = map(currentX, xMin, xMax, xSliderX, xSliderX + xSliderW);
  if (dist(mouseX, mouseY, handleX, xSliderY) < 15) {
    isDraggingXSlider = true;
    return;
  }

  // Check X slider track
  if (mouseY > xSliderY - 12 && mouseY < xSliderY + 12 &&
      mouseX > xSliderX && mouseX < xSliderX + xSliderW) {
    currentX = map(mouseX, xSliderX, xSliderX + xSliderW, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    isDraggingXSlider = true;
    return;
  }

  // Check numCurves slider handle
  let numHandleX = map(numCurves, 1, 9, numCurvesSliderX, numCurvesSliderX + numCurvesSliderW);
  if (dist(mouseX, mouseY, numHandleX, numCurvesSliderY) < 15) {
    isDraggingNumSlider = true;
    return;
  }

  // Check numCurves slider track
  if (mouseY > numCurvesSliderY - 12 && mouseY < numCurvesSliderY + 12 &&
      mouseX > numCurvesSliderX && mouseX < numCurvesSliderX + numCurvesSliderW) {
    numCurves = Math.round(map(mouseX, numCurvesSliderX, numCurvesSliderX + numCurvesSliderW, 1, 9));
    numCurves = constrain(numCurves, 1, 9);
    isDraggingNumSlider = true;
    return;
  }

  // Check function buttons
  for (let i = 0; i < 3; i++) {
    let bx = funcBtnX + (i % 2) * (funcBtnW + 5);
    let by = funcBtnY + Math.floor(i / 2) * 32 + 8;
    if (i === 2) {
      bx = funcBtnX;
      by = funcBtnY + 40;
    }

    if (mouseX >= bx && mouseX <= bx + funcBtnW &&
        mouseY >= by && mouseY <= by + 26) {
      currentFunction = i;
      return;
    }
  }

  // Check toggle button
  let toggleW = 50;
  let toggleX = toggleBtnX + 60;
  if (mouseX >= toggleX && mouseX <= toggleX + toggleW &&
      mouseY >= toggleBtnY && mouseY <= toggleBtnY + 24) {
    showDerivative = !showDerivative;
    return;
  }
}

function mouseDragged() {
  if (isDraggingXSlider) {
    currentX = map(mouseX, xSliderX, xSliderX + xSliderW, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    currentX = Math.round(currentX * 100) / 100;
  }

  if (isDraggingNumSlider) {
    numCurves = Math.round(map(mouseX, numCurvesSliderX, numCurvesSliderX + numCurvesSliderW, 1, 9));
    numCurves = constrain(numCurves, 1, 9);
  }
}

function mouseReleased() {
  isDraggingXSlider = false;
  isDraggingNumSlider = false;
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
