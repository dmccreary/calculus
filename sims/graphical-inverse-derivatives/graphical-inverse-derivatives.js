// Graphical Inverse Derivatives MicroSim
// Learning Objective: Students will understand that the derivative of an inverse function
// equals the reciprocal of the original function's derivative (Bloom Level 2: Understand)
// Bloom Verbs: explain, interpret, demonstrate
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 750;
let drawHeight = 420;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;
let chartTop = 55;
let defaultTextSize = 16;

// Coordinate system for left graph (f(x))
let leftOriginX, leftOriginY;
// Coordinate system for right graph (f inverse)
let rightOriginX, rightOriginY;
let scale = 35;

// Current state
let xPoint = 1.5;
let selectedFunction = 0;
let showYEqualsX = true;
let showSlopeCalc = true;
let isAnimating = false;
let animationX = 0.5;
let animationDir = 1;
let animationSpeed = 0.015;

// Dragging state
let isDragging = false;
let isDraggingSlider = false;
let sliderX, sliderY, sliderW;
let sliderMin = 0.3;
let sliderMax = 3.5;

// Dropdown state
let dropdownOpen = false;
let dropdownX, dropdownY, dropdownW, dropdownH;

// Functions with their labels, f(x), inverse, and derivatives
const functions = [
  {
    name: "Cubic",
    fLabel: "f(x) = x^3",
    fInvLabel: "f^(-1)(x) = cbrt(x)",
    f: (x) => x * x * x,
    fInv: (x) => Math.cbrt(x),
    fPrime: (x) => 3 * x * x,
    fInvPrime: (x) => x !== 0 ? 1 / (3 * Math.pow(Math.cbrt(x), 2)) : NaN,
    xRange: [0.3, 2.5]
  },
  {
    name: "Square Root",
    fLabel: "f(x) = sqrt(x)",
    fInvLabel: "f^(-1)(x) = x^2",
    f: (x) => x >= 0 ? Math.sqrt(x) : NaN,
    fInv: (x) => x >= 0 ? x * x : NaN,
    fPrime: (x) => x > 0 ? 1 / (2 * Math.sqrt(x)) : NaN,
    fInvPrime: (x) => 2 * x,
    xRange: [0.3, 4]
  },
  {
    name: "Exponential",
    fLabel: "f(x) = e^x",
    fInvLabel: "f^(-1)(x) = ln(x)",
    f: (x) => Math.exp(x),
    fInv: (x) => x > 0 ? Math.log(x) : NaN,
    fPrime: (x) => Math.exp(x),
    fInvPrime: (x) => x > 0 ? 1 / x : NaN,
    xRange: [-1, 2]
  },
  {
    name: "Linear",
    fLabel: "f(x) = 2x + 1",
    fInvLabel: "f^(-1)(x) = (x-1)/2",
    f: (x) => 2 * x + 1,
    fInv: (x) => (x - 1) / 2,
    fPrime: (x) => 2,
    fInvPrime: (x) => 0.5,
    xRange: [-1, 3]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateOrigins();
  updateControlPositions();
  updateSliderRange();

  describe('Graphical Inverse Derivatives: See how tangent line slopes on f(x) and f inverse are reciprocals, demonstrating that their product equals 1.', LABEL);
}

function updateOrigins() {
  let graphWidth = (canvasWidth - 80) / 2;
  leftOriginX = 60 + graphWidth / 2;
  leftOriginY = (drawHeight + chartTop) / 2 + 10;
  rightOriginX = canvasWidth - 20 - graphWidth / 2;
  rightOriginY = leftOriginY;
}

function updateControlPositions() {
  sliderX = 120;
  sliderY = drawHeight + 25;
  sliderW = Math.min(220, canvasWidth * 0.3);

  dropdownX = 10;
  dropdownY = drawHeight + 45;
  dropdownW = 130;
  dropdownH = 24;
}

function updateSliderRange() {
  let func = functions[selectedFunction];
  sliderMin = func.xRange[0];
  sliderMax = func.xRange[1];
  xPoint = constrain(xPoint, sliderMin, sliderMax);
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

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Inverse Function Derivative Relationship', canvasWidth / 2, 5);
  textSize(13);
  fill(80);
  text('Slopes are reciprocals: m_f * m_inv = 1', canvasWidth / 2, 28);

  // Draw both graphs
  drawLeftGraph();
  drawRightGraph();

  // Draw slope information panel
  if (showSlopeCalc) {
    drawSlopePanel();
  }

  // Draw controls
  drawControls();

  // Draw dropdown if open
  if (dropdownOpen) {
    drawDropdownOptions();
  }

  // Animation update
  if (isAnimating) {
    xPoint += animationSpeed * animationDir;
    if (xPoint >= sliderMax) {
      xPoint = sliderMax;
      animationDir = -1;
    } else if (xPoint <= sliderMin) {
      xPoint = sliderMin;
      animationDir = 1;
    }
  }
}

function drawLeftGraph() {
  let graphWidth = (canvasWidth - 80) / 2;
  let graphLeft = 40;
  let graphRight = graphLeft + graphWidth;

  // Graph title
  let func = functions[selectedFunction];
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text(func.fLabel, leftOriginX, chartTop - 8);

  // Draw axes and grid
  drawAxes(leftOriginX, leftOriginY, graphLeft, graphRight);

  // Draw y = x line if enabled
  if (showYEqualsX) {
    drawYEqualsXLine(leftOriginX, leftOriginY, graphLeft, graphRight);
  }

  // Draw function f(x)
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let x = (px - leftOriginX) / scale;
    let y = func.f(x);
    if (!isNaN(y) && isFinite(y)) {
      let sy = leftOriginY - y * scale;
      if (sy > chartTop && sy < drawHeight - 30) {
        vertex(px, sy);
      }
    }
  }
  endShape();

  // Draw point and tangent on f(x)
  let yVal = func.f(xPoint);
  if (!isNaN(yVal) && isFinite(yVal)) {
    let slope = func.fPrime(xPoint);
    drawTangentAndPoint(leftOriginX, leftOriginY, xPoint, yVal, slope, color(50, 100, 200), graphLeft, graphRight);
  }
}

function drawRightGraph() {
  let graphWidth = (canvasWidth - 80) / 2;
  let graphLeft = canvasWidth - 40 - graphWidth;
  let graphRight = canvasWidth - 40;

  // Graph title
  let func = functions[selectedFunction];
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text(func.fInvLabel, rightOriginX, chartTop - 8);

  // Draw axes and grid
  drawAxes(rightOriginX, rightOriginY, graphLeft, graphRight);

  // Draw y = x line if enabled
  if (showYEqualsX) {
    drawYEqualsXLine(rightOriginX, rightOriginY, graphLeft, graphRight);
  }

  // Draw inverse function f^(-1)(x)
  stroke(200, 100, 50);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let x = (px - rightOriginX) / scale;
    let y = func.fInv(x);
    if (!isNaN(y) && isFinite(y)) {
      let sy = rightOriginY - y * scale;
      if (sy > chartTop && sy < drawHeight - 30) {
        vertex(px, sy);
      }
    }
  }
  endShape();

  // Draw point and tangent on f^(-1)(x)
  // The corresponding point on inverse: if (a, b) is on f, then (b, a) is on f^(-1)
  let yVal = func.f(xPoint);
  if (!isNaN(yVal) && isFinite(yVal)) {
    let invSlope = func.fInvPrime(yVal);
    if (!isNaN(invSlope) && isFinite(invSlope)) {
      drawTangentAndPoint(rightOriginX, rightOriginY, yVal, xPoint, invSlope, color(200, 100, 50), graphLeft, graphRight);
    }
  }
}

function drawAxes(originX, originY, graphLeft, graphRight) {
  // Grid
  stroke(230);
  strokeWeight(1);
  for (let i = -5; i <= 5; i++) {
    let x = originX + i * scale;
    let y = originY - i * scale;
    if (x >= graphLeft && x <= graphRight) {
      line(x, chartTop, x, drawHeight - 30);
    }
    if (y > chartTop && y < drawHeight - 30) {
      line(graphLeft, y, graphRight, y);
    }
  }

  // Axes
  stroke(100);
  strokeWeight(2);
  // X-axis
  if (originY > chartTop && originY < drawHeight - 30) {
    line(graphLeft, originY, graphRight, originY);
  }
  // Y-axis
  if (originX >= graphLeft && originX <= graphRight) {
    line(originX, chartTop, originX, drawHeight - 30);
  }

  // Tick labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = -4; i <= 4; i++) {
    if (i !== 0) {
      let x = originX + i * scale;
      if (x >= graphLeft + 10 && x <= graphRight - 10) {
        text(i, x, originY + 3);
      }
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = -4; i <= 4; i++) {
    if (i !== 0) {
      let y = originY - i * scale;
      if (y > chartTop + 10 && y < drawHeight - 40) {
        text(i, originX - 5, y);
      }
    }
  }
}

function drawYEqualsXLine(originX, originY, graphLeft, graphRight) {
  stroke(150, 150, 150);
  strokeWeight(1);
  drawingContext.setLineDash([6, 6]);

  // y = x line
  let x1 = (graphLeft - originX) / scale;
  let x2 = (graphRight - originX) / scale;

  let px1 = graphLeft;
  let py1 = originY - x1 * scale;
  let px2 = graphRight;
  let py2 = originY - x2 * scale;

  // Clip to visible area
  py1 = constrain(py1, chartTop, drawHeight - 30);
  py2 = constrain(py2, chartTop, drawHeight - 30);

  line(px1, py1, px2, py2);
  drawingContext.setLineDash([]);
}

function drawTangentAndPoint(originX, originY, xVal, yVal, slope, pointColor, graphLeft, graphRight) {
  let px = originX + xVal * scale;
  let py = originY - yVal * scale;

  // Draw tangent line
  if (!isNaN(slope) && isFinite(slope)) {
    stroke(pointColor);
    strokeWeight(2);

    // Calculate tangent line endpoints
    let x1 = (graphLeft - originX) / scale;
    let x2 = (graphRight - originX) / scale;
    let y1 = yVal + slope * (x1 - xVal);
    let y2 = yVal + slope * (x2 - xVal);

    let px1 = graphLeft;
    let py1 = originY - y1 * scale;
    let px2 = graphRight;
    let py2 = originY - y2 * scale;

    // Clip to visible area
    py1 = constrain(py1, chartTop - 20, drawHeight - 10);
    py2 = constrain(py2, chartTop - 20, drawHeight - 10);

    line(px1, py1, px2, py2);
  }

  // Draw point
  if (px >= graphLeft && px <= graphRight && py > chartTop && py < drawHeight - 30) {
    fill(pointColor);
    stroke(0);
    strokeWeight(2);
    circle(px, py, 14);

    // Coordinate label
    fill('black');
    noStroke();
    textSize(10);
    textAlign(LEFT, BOTTOM);
    let label = "(" + xVal.toFixed(2) + ", " + yVal.toFixed(2) + ")";
    text(label, px + 8, py - 5);
  }
}

function drawSlopePanel() {
  let func = functions[selectedFunction];
  let yVal = func.f(xPoint);
  let slopeF = func.fPrime(xPoint);
  let slopeInv = func.fInvPrime(yVal);

  // Panel position
  let panelX = canvasWidth / 2 - 85;
  let panelY = drawHeight - 115;
  let panelW = 170;
  let panelH = 85;

  // Panel background
  fill(255, 255, 255, 240);
  stroke(100, 100, 200);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 8);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  let lineHeight = 18;
  let startY = panelY + 8;

  // Slope of f at point
  fill(50, 100, 200);
  text("m_f = " + (isNaN(slopeF) ? "undefined" : slopeF.toFixed(4)), panelX + 10, startY);

  // Slope of f^(-1) at corresponding point
  fill(200, 100, 50);
  text("m_inv = " + (isNaN(slopeInv) ? "undefined" : slopeInv.toFixed(4)), panelX + 10, startY + lineHeight);

  // Product
  let product = slopeF * slopeInv;
  fill(0, 150, 0);
  textSize(13);
  text("m_f * m_inv = " + (isNaN(product) ? "undefined" : product.toFixed(4)), panelX + 10, startY + lineHeight * 2 + 5);

  // Always 1!
  if (!isNaN(product) && Math.abs(product - 1) < 0.001) {
    fill(0, 150, 0);
    textSize(14);
    textAlign(CENTER, TOP);
    text("= 1", panelX + panelW / 2, startY + lineHeight * 3 + 8);
  }
}

function drawControls() {
  // Row 1: x-point slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('x on f(x) = ' + xPoint.toFixed(2), 10, sliderY);

  // Draw slider track
  let sliderHandleX = map(xPoint, sliderMin, sliderMax, sliderX, sliderX + sliderW);
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 4, sliderW, 8, 4);

  // Draw slider handle
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(sliderHandleX, sliderY, 18);

  // Row 2: Function dropdown
  fill(240);
  stroke(150);
  strokeWeight(1);
  rect(dropdownX, dropdownY, dropdownW, dropdownH, 4);

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text(functions[selectedFunction].name, dropdownX + 8, dropdownY + dropdownH / 2);

  // Dropdown arrow
  fill(100);
  noStroke();
  triangle(
    dropdownX + dropdownW - 18, dropdownY + 8,
    dropdownX + dropdownW - 8, dropdownY + 8,
    dropdownX + dropdownW - 13, dropdownY + 16
  );

  // Toggle y=x line button
  let yxBtnX = 155;
  let yxBtnY = dropdownY;
  let yxBtnW = 75;
  let yxBtnH = dropdownH;

  fill(showYEqualsX ? '#4CAF50' : '#9E9E9E');
  stroke(showYEqualsX ? '#388E3C' : '#757575');
  strokeWeight(1);
  rect(yxBtnX, yxBtnY, yxBtnW, yxBtnH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('y = x', yxBtnX + yxBtnW / 2, yxBtnY + yxBtnH / 2);

  // Toggle slopes button
  let slopeBtnX = 240;
  let slopeBtnY = dropdownY;
  let slopeBtnW = 75;
  let slopeBtnH = dropdownH;

  fill(showSlopeCalc ? '#4CAF50' : '#9E9E9E');
  stroke(showSlopeCalc ? '#388E3C' : '#757575');
  strokeWeight(1);
  rect(slopeBtnX, slopeBtnY, slopeBtnW, slopeBtnH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Slopes', slopeBtnX + slopeBtnW / 2, slopeBtnY + slopeBtnH / 2);

  // Animation button
  let animBtnX = 325;
  let animBtnY = dropdownY;
  let animBtnW = 85;
  let animBtnH = dropdownH;

  fill(isAnimating ? '#FF9800' : '#2196F3');
  stroke(isAnimating ? '#F57C00' : '#1976D2');
  strokeWeight(1);
  rect(animBtnX, animBtnY, animBtnW, animBtnH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(isAnimating ? 'Stop' : 'Animate', animBtnX + animBtnW / 2, animBtnY + animBtnH / 2);

  // Instruction text
  fill(100);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  text('Drag point on left graph or use slider', 10, drawHeight + 75);
}

function drawDropdownOptions() {
  let optionH = 24;
  let listH = functions.length * optionH;

  // Draw dropdown list background (going upward)
  fill(255);
  stroke(150);
  strokeWeight(1);
  rect(dropdownX, dropdownY - listH, dropdownW, listH, 4);

  // Draw options
  for (let i = 0; i < functions.length; i++) {
    let optY = dropdownY - listH + i * optionH;

    // Highlight on hover
    if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
        mouseY >= optY && mouseY <= optY + optionH) {
      fill(230, 240, 255);
      noStroke();
      rect(dropdownX + 2, optY + 2, dropdownW - 4, optionH - 4, 2);
    }

    // Selected indicator
    if (i === selectedFunction) {
      fill(200, 220, 255);
      noStroke();
      rect(dropdownX + 2, optY + 2, dropdownW - 4, optionH - 4, 2);
    }

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text(functions[i].name, dropdownX + 8, optY + optionH / 2);
  }
}

function mousePressed() {
  // Check slider handle
  let sliderHandleX = map(xPoint, sliderMin, sliderMax, sliderX, sliderX + sliderW);
  if (dist(mouseX, mouseY, sliderHandleX, sliderY) < 15) {
    isDraggingSlider = true;
    isAnimating = false;
    return;
  }

  // Check slider track
  if (mouseY >= sliderY - 10 && mouseY <= sliderY + 10 &&
      mouseX >= sliderX && mouseX <= sliderX + sliderW) {
    isDraggingSlider = true;
    isAnimating = false;
    xPoint = map(mouseX, sliderX, sliderX + sliderW, sliderMin, sliderMax);
    xPoint = constrain(xPoint, sliderMin, sliderMax);
    return;
  }

  // Check dropdown button
  if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
      mouseY >= dropdownY && mouseY <= dropdownY + dropdownH) {
    dropdownOpen = !dropdownOpen;
    return;
  }

  // Check dropdown options
  if (dropdownOpen) {
    let optionH = 24;
    let listH = functions.length * optionH;

    for (let i = 0; i < functions.length; i++) {
      let optY = dropdownY - listH + i * optionH;

      if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
          mouseY >= optY && mouseY <= optY + optionH) {
        selectedFunction = i;
        dropdownOpen = false;
        updateSliderRange();
        return;
      }
    }
    dropdownOpen = false;
    return;
  }

  // Check y=x toggle button
  let yxBtnX = 155;
  let yxBtnY = dropdownY;
  let yxBtnW = 75;
  let yxBtnH = dropdownH;
  if (mouseX >= yxBtnX && mouseX <= yxBtnX + yxBtnW &&
      mouseY >= yxBtnY && mouseY <= yxBtnY + yxBtnH) {
    showYEqualsX = !showYEqualsX;
    return;
  }

  // Check slopes toggle button
  let slopeBtnX = 240;
  let slopeBtnY = dropdownY;
  let slopeBtnW = 75;
  let slopeBtnH = dropdownH;
  if (mouseX >= slopeBtnX && mouseX <= slopeBtnX + slopeBtnW &&
      mouseY >= slopeBtnY && mouseY <= slopeBtnY + slopeBtnH) {
    showSlopeCalc = !showSlopeCalc;
    return;
  }

  // Check animation button
  let animBtnX = 325;
  let animBtnY = dropdownY;
  let animBtnW = 85;
  let animBtnH = dropdownH;
  if (mouseX >= animBtnX && mouseX <= animBtnX + animBtnW &&
      mouseY >= animBtnY && mouseY <= animBtnY + animBtnH) {
    isAnimating = !isAnimating;
    animationDir = 1;
    return;
  }

  // Check if clicking in left graph area to drag point
  let graphWidth = (canvasWidth - 80) / 2;
  let graphLeft = 40;
  let graphRight = graphLeft + graphWidth;

  if (mouseX >= graphLeft && mouseX <= graphRight &&
      mouseY >= chartTop && mouseY <= drawHeight - 30) {
    isDragging = true;
    isAnimating = false;
    updatePointFromMouse();
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    xPoint = map(mouseX, sliderX, sliderX + sliderW, sliderMin, sliderMax);
    xPoint = constrain(xPoint, sliderMin, sliderMax);
  }

  if (isDragging) {
    updatePointFromMouse();
  }
}

function mouseReleased() {
  isDraggingSlider = false;
  isDragging = false;
}

function updatePointFromMouse() {
  xPoint = (mouseX - leftOriginX) / scale;
  xPoint = constrain(xPoint, sliderMin, sliderMax);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateOrigins();
  updateControlPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  updateOrigins();
  updateControlPositions();
}
