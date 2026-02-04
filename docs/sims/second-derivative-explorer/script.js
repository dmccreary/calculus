// Second Derivative Explorer MicroSim
// Shows f(x), f'(x), and f''(x) in three stacked panels with synchronized point
// Bloom Level: Analyze (L4), Verbs: analyze, connect, interpret
// Learning Objective: Students will analyze how the second derivative relates
// to the curvature of the original function

let canvasWidth = 700;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 45;
let defaultTextSize = 16;

// Panel dimensions
let panelHeight;
let panelGap = 8;
let panelLeft, panelRight;

// Coordinate ranges
let xMin = -3, xMax = 3;
let yMinF = -4, yMaxF = 4;  // for f(x)
let yMinFp = -6, yMaxFp = 6;  // for f'(x)
let yMinFpp = -12, yMaxFpp = 12;  // for f''(x)

// Current state
let currentX = 0.5;
let currentFunction = 0; // 0=x^3, 1=x^4-3x^2, 2=sin(x)
let showSecondDerivative = true;

// Function definitions
const functions = [
  {
    name: 'x\u00B3',
    displayF: 'f(x) = x\u00B3',
    displayFp: "f'(x) = 3x\u00B2",
    displayFpp: "f''(x) = 6x"
  },
  {
    name: 'x\u2074-3x\u00B2',
    displayF: 'f(x) = x\u2074 - 3x\u00B2',
    displayFp: "f'(x) = 4x\u00B3 - 6x",
    displayFpp: "f''(x) = 12x\u00B2 - 6"
  },
  {
    name: 'sin(x)',
    displayF: 'f(x) = sin(x)',
    displayFp: "f'(x) = cos(x)",
    displayFpp: "f''(x) = -sin(x)"
  }
];

// Colors
const colorF = [50, 100, 200];      // Blue for f(x)
const colorFp = [0, 150, 80];       // Green for f'(x)
const colorFpp = [200, 50, 50];     // Red for f''(x)

// Control positions
let sliderX, sliderY, sliderW;
let funcBtnX, funcBtnY, funcBtnW;
let toggleBtnX, toggleBtnY;

// Dragging state
let isDraggingSlider = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();

  describe('Interactive visualization showing a function, its first derivative, and second derivative in three synchronized panels. Demonstrates how concavity relates to the second derivative.', LABEL);
}

function updateLayoutPositions() {
  // Calculate panel dimensions
  let availableHeight = drawHeight - chartTop - 20;
  panelHeight = showSecondDerivative ? (availableHeight - 2 * panelGap) / 3 : (availableHeight - panelGap) / 2;

  panelLeft = margin + 40;
  panelRight = canvasWidth - margin - 10;

  // Control positions
  sliderX = 60;
  sliderY = drawHeight + 20;
  sliderW = canvasWidth * 0.4;

  funcBtnX = canvasWidth * 0.45 + 80;
  funcBtnY = drawHeight + 8;
  funcBtnW = 75;

  toggleBtnX = canvasWidth * 0.45 + 80;
  toggleBtnY = drawHeight + 45;
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

  // Draw panels
  let panel1Top = chartTop;
  let panel2Top = chartTop + panelHeight + panelGap;
  let panel3Top = chartTop + 2 * (panelHeight + panelGap);

  drawPanel(1, panel1Top, colorF, 'f(x)', functions[currentFunction].displayF, yMinF, yMaxF, evaluateF);
  drawPanel(2, panel2Top, colorFp, "f'(x)", functions[currentFunction].displayFp, yMinFp, yMaxFp, evaluateFp);

  if (showSecondDerivative) {
    drawPanel(3, panel3Top, colorFpp, "f''(x)", functions[currentFunction].displayFpp, yMinFpp, yMaxFpp, evaluateFpp);
  }

  // Draw concavity indicator on f(x) panel
  drawConcavityIndicator(panel1Top);

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
  text('Second Derivative Explorer', canvasWidth / 2, 5);
  textSize(13);
  fill(80);
  text('Analyzing curvature through derivatives', canvasWidth / 2, 26);
}

function drawPanel(panelNum, topY, col, label, formula, yMin, yMax, evalFunc) {
  let bottomY = topY + panelHeight;

  // Panel background
  fill(255, 255, 255, 200);
  stroke(200);
  strokeWeight(1);
  rect(panelLeft - 35, topY, panelRight - panelLeft + 40, panelHeight, 5);

  // Panel label
  fill(col[0], col[1], col[2]);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text(label, panelLeft - 30, topY + 5);

  // Formula
  textAlign(RIGHT, TOP);
  textSize(11);
  fill(100);
  text(formula, panelRight, topY + 5);

  // Graph area
  let graphTop = topY + 22;
  let graphBottom = bottomY - 5;
  let graphHeight = graphBottom - graphTop;

  // Grid
  stroke(235);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let x = map(i, xMin, xMax, panelLeft, panelRight);
    line(x, graphTop, x, graphBottom);
  }

  // Horizontal grid lines
  let yStep = (yMax - yMin) / 4;
  for (let i = 0; i <= 4; i++) {
    let yVal = yMin + i * yStep;
    let y = map(yVal, yMin, yMax, graphBottom, graphTop);
    line(panelLeft, y, panelRight, y);
  }

  // Axes
  stroke(150);
  strokeWeight(1);

  // X-axis
  let y0 = map(0, yMin, yMax, graphBottom, graphTop);
  if (y0 > graphTop && y0 < graphBottom) {
    stroke(100);
    line(panelLeft, y0, panelRight, y0);
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, panelLeft, panelRight);
  if (x0 > panelLeft && x0 < panelRight) {
    stroke(100);
    line(x0, graphTop, x0, graphBottom);
  }

  // Draw curve
  stroke(col[0], col[1], col[2]);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let px = panelLeft; px <= panelRight; px += 2) {
    let x = map(px, panelLeft, panelRight, xMin, xMax);
    let y = evalFunc(x);
    let py = map(y, yMin, yMax, graphBottom, graphTop);

    if (py >= graphTop - 10 && py <= graphBottom + 10) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();

  // Draw synchronized vertical line at current x
  let currPx = map(currentX, xMin, xMax, panelLeft, panelRight);
  stroke(150, 150, 200);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(currPx, graphTop, currPx, graphBottom);
  drawingContext.setLineDash([]);

  // Draw point on curve
  let currY = evalFunc(currentX);
  let currPy = map(currY, yMin, yMax, graphBottom, graphTop);

  if (currPy >= graphTop && currPy <= graphBottom) {
    // Draw tangent line on f(x) panel
    if (panelNum === 1) {
      let slope = evaluateFp(currentX);
      drawTangentLine(currPx, currPy, slope, panelLeft, panelRight, graphTop, graphBottom, yMin, yMax);
    }

    fill(col[0], col[1], col[2]);
    stroke(255);
    strokeWeight(2);
    circle(currPx, currPy, 12);
  }
}

function drawTangentLine(px, py, slope, left, right, top, bottom, yMin, yMax) {
  // Calculate tangent line endpoints
  let scaleX = (right - left) / (xMax - xMin);
  let scaleY = (bottom - top) / (yMax - yMin);
  let visualSlope = slope * scaleY / scaleX;

  let tangentHalfLength = 50;

  stroke(255, 150, 50);
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

function drawConcavityIndicator(panel1Top) {
  let fpp = evaluateFpp(currentX);

  // Draw concavity label on the f(x) panel
  let indicatorX = panelRight - 80;
  let indicatorY = panel1Top + panelHeight - 25;

  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);

  if (Math.abs(fpp) < 0.1) {
    fill(100);
    text('Inflection?', indicatorX, indicatorY);
  } else if (fpp > 0) {
    fill(colorFpp[0], colorFpp[1], colorFpp[2]);
    text('Concave Up \u2191', indicatorX, indicatorY);
  } else {
    fill(colorFpp[0], colorFpp[1], colorFpp[2]);
    text('Concave Down \u2193', indicatorX, indicatorY);
  }
}

function drawInfoPanel() {
  let boxX = margin + 45;
  let boxY = showSecondDerivative ? chartTop + 25 : chartTop + 25;
  let boxW = 115;
  let boxH = showSecondDerivative ? 85 : 70;

  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  let fx = evaluateF(currentX);
  let fpx = evaluateFp(currentX);
  let fppx = evaluateFpp(currentX);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('x = ' + currentX.toFixed(2), boxX + 8, boxY + 8);

  fill(colorF[0], colorF[1], colorF[2]);
  text('f(x) = ' + fx.toFixed(2), boxX + 8, boxY + 26);

  fill(colorFp[0], colorFp[1], colorFp[2]);
  text("f'(x) = " + fpx.toFixed(2), boxX + 8, boxY + 44);

  if (showSecondDerivative) {
    fill(colorFpp[0], colorFpp[1], colorFpp[2]);
    text("f''(x) = " + fppx.toFixed(2), boxX + 8, boxY + 62);
  }
}

function drawControls() {
  // X slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('x = ' + currentX.toFixed(2), 10, sliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 5, sliderW, 10, 5);

  // Slider handle
  let handleX = map(currentX, xMin, xMax, sliderX, sliderX + sliderW);
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleX, sliderY, 20);

  // Function selector label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Function:', funcBtnX - 65, funcBtnY + 14);

  // Function buttons
  for (let i = 0; i < 3; i++) {
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

  // Show f''(x) toggle label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text("Show f''(x):", toggleBtnX - 65, toggleBtnY + 12);

  // Toggle button
  let toggleW = 55;
  fill(showSecondDerivative ? '#4CAF50' : '#e0e0e0');
  stroke(showSecondDerivative ? '#388E3C' : '#bdbdbd');
  strokeWeight(1);
  rect(toggleBtnX, toggleBtnY, toggleW, 24, 5);

  fill(showSecondDerivative ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(showSecondDerivative ? 'ON' : 'OFF', toggleBtnX + toggleW / 2, toggleBtnY + 12);

  // Explanation text
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  let fpp = evaluateFpp(currentX);
  let explanation = "";
  if (Math.abs(fpp) < 0.1) {
    explanation = "f''(x) \u2248 0: Possible inflection point - curvature changes";
  } else if (fpp > 0) {
    explanation = "f''(x) > 0: Concave up, f'(x) increasing, curve bends upward";
  } else {
    explanation = "f''(x) < 0: Concave down, f'(x) decreasing, curve bends downward";
  }
  text(explanation, 10, drawHeight + 65);
}

// Function evaluators
function evaluateF(x) {
  switch (currentFunction) {
    case 0: return x * x * x;  // x^3
    case 1: return Math.pow(x, 4) - 3 * x * x;  // x^4 - 3x^2
    case 2: return Math.sin(x);
    default: return 0;
  }
}

function evaluateFp(x) {
  switch (currentFunction) {
    case 0: return 3 * x * x;  // 3x^2
    case 1: return 4 * Math.pow(x, 3) - 6 * x;  // 4x^3 - 6x
    case 2: return Math.cos(x);
    default: return 0;
  }
}

function evaluateFpp(x) {
  switch (currentFunction) {
    case 0: return 6 * x;  // 6x
    case 1: return 12 * x * x - 6;  // 12x^2 - 6
    case 2: return -Math.sin(x);
    default: return 0;
  }
}

function mousePressed() {
  // Check slider handle
  let handleX = map(currentX, xMin, xMax, sliderX, sliderX + sliderW);
  if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check slider track click
  if (mouseY > sliderY - 12 && mouseY < sliderY + 12 &&
      mouseX > sliderX && mouseX < sliderX + sliderW) {
    currentX = map(mouseX, sliderX, sliderX + sliderW, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    isDraggingSlider = true;
    return;
  }

  // Check function buttons
  for (let i = 0; i < 3; i++) {
    let bx = funcBtnX + i * (funcBtnW + 5);
    if (mouseX >= bx && mouseX <= bx + funcBtnW &&
        mouseY >= funcBtnY && mouseY <= funcBtnY + 28) {
      currentFunction = i;
      return;
    }
  }

  // Check toggle button
  let toggleW = 55;
  if (mouseX >= toggleBtnX && mouseX <= toggleBtnX + toggleW &&
      mouseY >= toggleBtnY && mouseY <= toggleBtnY + 24) {
    showSecondDerivative = !showSecondDerivative;
    updateLayoutPositions();
    return;
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    currentX = map(mouseX, sliderX, sliderX + sliderW, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    currentX = Math.round(currentX * 100) / 100;
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
