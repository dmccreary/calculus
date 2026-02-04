// Tangent Line Calculator MicroSim
// Learning Objective: Students will apply the derivative to write tangent line equations (Bloom Level 3: Apply)
// Bloom Verbs: calculate, apply, solve
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let chartTop = 50;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scale = 30;

// Current state
let xPoint = 1;
let selectedFunction = 0;
let showSteps = false;
let showTangent = true;

// Slider state (canvas-based)
let sliderX, sliderY, sliderW;
let isDraggingSlider = false;
let sliderMin = -4;
let sliderMax = 4;

// Dropdown state
let dropdownOpen = false;
let dropdownX, dropdownY, dropdownW, dropdownH;

// Functions with their labels, f(x), and f'(x)
const functions = [
  {
    name: "x^2",
    displayName: "f(x) = x^2",
    f: (x) => x * x,
    fPrime: (x) => 2 * x,
    fPrimeLabel: "f'(x) = 2x"
  },
  {
    name: "x^3",
    displayName: "f(x) = x^3",
    f: (x) => x * x * x,
    fPrime: (x) => 3 * x * x,
    fPrimeLabel: "f'(x) = 3x^2"
  },
  {
    name: "sin(x)",
    displayName: "f(x) = sin(x)",
    f: (x) => Math.sin(x),
    fPrime: (x) => Math.cos(x),
    fPrimeLabel: "f'(x) = cos(x)"
  },
  {
    name: "e^x",
    displayName: "f(x) = e^x",
    f: (x) => Math.exp(x),
    fPrime: (x) => Math.exp(x),
    fPrimeLabel: "f'(x) = e^x"
  },
  {
    name: "sqrt(x)",
    displayName: "f(x) = sqrt(x)",
    f: (x) => x >= 0 ? Math.sqrt(x) : NaN,
    fPrime: (x) => x > 0 ? 1 / (2 * Math.sqrt(x)) : NaN,
    fPrimeLabel: "f'(x) = 1/(2sqrt(x))"
  },
  {
    name: "1/x",
    displayName: "f(x) = 1/x",
    f: (x) => x !== 0 ? 1 / x : NaN,
    fPrime: (x) => x !== 0 ? -1 / (x * x) : NaN,
    fPrimeLabel: "f'(x) = -1/x^2"
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth * 0.35;
  originY = drawHeight / 2 + 20;

  updateControlPositions();

  describe('Tangent Line Calculator: Select a function and point to see the step-by-step tangent line calculation.', LABEL);
}

function updateControlPositions() {
  sliderX = 100;
  sliderY = drawHeight + 25;
  sliderW = Math.min(200, canvasWidth * 0.3);

  dropdownX = 10;
  dropdownY = drawHeight + 50;
  dropdownW = 140;
  dropdownH = 24;
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

  // Draw coordinate system
  drawAxes();

  // Draw the function
  drawFunction();

  // Draw tangent point
  drawTangentPoint();

  // Draw tangent line if enabled
  if (showTangent) {
    drawTangentLine();
  }

  // Title
  drawTitle();

  // Calculation panel
  if (showSteps) {
    drawCalculationPanel();
  }

  // Draw controls
  drawControls();

  // Draw dropdown if open (on top of everything)
  if (dropdownOpen) {
    drawDropdownOptions();
  }
}

function drawAxes() {
  // Grid
  stroke(230);
  strokeWeight(1);
  for (let i = -10; i <= 10; i++) {
    let x = originX + i * scale;
    let y = originY - i * scale;
    if (x > margin && x < canvasWidth - margin) {
      line(x, chartTop, x, drawHeight - 20);
    }
    if (y > chartTop && y < drawHeight - 20) {
      line(margin, y, canvasWidth - margin, y);
    }
  }

  // Axes
  stroke(80);
  strokeWeight(2);
  line(margin, originY, canvasWidth - margin, originY);
  line(originX, chartTop, originX, drawHeight - 20);

  // Tick labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = -5; i <= 5; i++) {
    if (i !== 0) {
      let x = originX + i * scale;
      if (x > margin && x < canvasWidth - margin) {
        text(i, x, originY + 3);
      }
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = -4; i <= 4; i++) {
    if (i !== 0) {
      let y = originY - i * scale;
      if (y > chartTop && y < drawHeight - 20) {
        text(i, originX - 5, y);
      }
    }
  }
}

function drawFunction() {
  const func = functions[selectedFunction];
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = margin; px < canvasWidth - margin; px += 2) {
    let x = (px - originX) / scale;
    let y = func.f(x);

    if (!isNaN(y) && isFinite(y)) {
      let sy = originY - y * scale;
      if (sy > chartTop - 50 && sy < drawHeight + 50) {
        vertex(px, constrain(sy, chartTop - 50, drawHeight + 50));
      }
    }
  }
  endShape();
}

function drawTangentPoint() {
  const func = functions[selectedFunction];
  let y = func.f(xPoint);

  if (isNaN(y) || !isFinite(y)) return;

  let px = originX + xPoint * scale;
  let py = originY - y * scale;

  if (py < chartTop - 20 || py > drawHeight + 20) return;

  // Highlight point
  fill(255, 100, 100);
  stroke(150, 50, 50);
  strokeWeight(2);
  circle(px, py, 14);

  // Point coordinates label
  fill('black');
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  let coordLabel = "(" + xPoint.toFixed(2) + ", " + y.toFixed(2) + ")";
  text(coordLabel, px + 10, py - 10);
}

function drawTangentLine() {
  const func = functions[selectedFunction];
  let y0 = func.f(xPoint);
  let slope = func.fPrime(xPoint);

  if (isNaN(y0) || !isFinite(y0) || isNaN(slope) || !isFinite(slope)) return;

  // Point-slope form: y - y0 = m(x - x0)
  // y = m*x - m*x0 + y0
  // Calculate line at edges of visible area
  let xMin = (margin - originX) / scale;
  let xMax = (canvasWidth - margin - originX) / scale;

  let yAtXMin = slope * (xMin - xPoint) + y0;
  let yAtXMax = slope * (xMax - xPoint) + y0;

  let px1 = margin;
  let py1 = originY - yAtXMin * scale;
  let px2 = canvasWidth - margin;
  let py2 = originY - yAtXMax * scale;

  // Clip to visible area
  py1 = constrain(py1, chartTop - 50, drawHeight + 50);
  py2 = constrain(py2, chartTop - 50, drawHeight + 50);

  stroke(220, 80, 80);
  strokeWeight(2);
  line(px1, py1, px2, py2);
}

function drawTitle() {
  const func = functions[selectedFunction];

  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Tangent Line Calculator', canvasWidth * 0.35, 5);

  textSize(14);
  text(func.displayName + "  |  " + func.fPrimeLabel, canvasWidth * 0.35, 28);
}

function drawCalculationPanel() {
  const func = functions[selectedFunction];
  let y0 = func.f(xPoint);
  let slope = func.fPrime(xPoint);

  // Panel position and size
  let panelX = canvasWidth - 240;
  let panelY = 50;
  let panelW = 230;
  let panelH = 170;

  // Draw panel background
  fill(255, 255, 255, 245);
  stroke(100, 100, 200);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 10);

  // Panel title
  fill(50, 50, 150);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text("Step-by-Step Calculation", panelX + 10, panelY + 8);

  // Divider line
  stroke(200);
  strokeWeight(1);
  line(panelX + 10, panelY + 28, panelX + panelW - 10, panelY + 28);

  fill('black');
  noStroke();
  textSize(12);
  let lineHeight = 22;
  let startY = panelY + 38;

  // Check if values are valid
  if (isNaN(y0) || !isFinite(y0) || isNaN(slope) || !isFinite(slope)) {
    fill(200, 50, 50);
    text("Point not defined for this function", panelX + 10, startY);
    return;
  }

  // Step 1: Point
  text("1. Point: (a, f(a))", panelX + 10, startY);
  fill(80, 80, 80);
  text("   = (" + xPoint.toFixed(2) + ", " + y0.toFixed(3) + ")", panelX + 10, startY + lineHeight * 0.6);

  // Step 2: Slope
  fill('black');
  text("2. Slope: f'(a)", panelX + 10, startY + lineHeight * 1.5);
  fill(80, 80, 80);
  text("   = " + slope.toFixed(4), panelX + 10, startY + lineHeight * 2.1);

  // Step 3: Point-slope form
  fill('black');
  text("3. Point-slope form:", panelX + 10, startY + lineHeight * 3);
  fill(80, 80, 80);
  text("   y - " + y0.toFixed(2) + " = " + slope.toFixed(2) + "(x - " + xPoint.toFixed(2) + ")", panelX + 10, startY + lineHeight * 3.6);

  // Step 4: Simplified
  let b = y0 - slope * xPoint;
  fill('black');
  text("4. Simplified:", panelX + 10, startY + lineHeight * 4.5);
  fill(50, 100, 200);
  textSize(13);
  let bSign = b >= 0 ? " + " : " - ";
  text("   y = " + slope.toFixed(3) + "x" + bSign + Math.abs(b).toFixed(3), panelX + 10, startY + lineHeight * 5.1);
}

function drawControls() {
  // Row 1: x-point slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('x = ' + xPoint.toFixed(2), 10, sliderY);

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

  // Row 2: Function dropdown button
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

  // Show Steps button
  let stepsBtnX = 170;
  let stepsBtnY = dropdownY;
  let stepsBtnW = 100;
  let stepsBtnH = dropdownH;

  fill(showSteps ? '#4CAF50' : '#2196F3');
  stroke(showSteps ? '#388E3C' : '#1976D2');
  strokeWeight(1);
  rect(stepsBtnX, stepsBtnY, stepsBtnW, stepsBtnH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(showSteps ? 'Hide Steps' : 'Show Steps', stepsBtnX + stepsBtnW / 2, stepsBtnY + stepsBtnH / 2);

  // Show Tangent toggle
  let tangentBtnX = 290;
  let tangentBtnY = dropdownY;
  let tangentBtnW = 110;
  let tangentBtnH = dropdownH;

  fill(showTangent ? '#4CAF50' : '#9E9E9E');
  stroke(showTangent ? '#388E3C' : '#757575');
  strokeWeight(1);
  rect(tangentBtnX, tangentBtnY, tangentBtnW, tangentBtnH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(showTangent ? 'Tangent: ON' : 'Tangent: OFF', tangentBtnX + tangentBtnW / 2, tangentBtnY + tangentBtnH / 2);

  // Slider label
  fill(100);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(10);
  text('(' + sliderMin + ' to ' + sliderMax + ')', sliderX + sliderW, sliderY + 18);
}

function drawDropdownOptions() {
  let optionH = 24;
  let listH = functions.length * optionH;

  // Draw dropdown list background (going upward from button)
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
    text(functions[i].displayName, dropdownX + 8, optY + optionH / 2);
  }
}

function mousePressed() {
  // Check slider
  let sliderHandleX = map(xPoint, sliderMin, sliderMax, sliderX, sliderX + sliderW);
  if (dist(mouseX, mouseY, sliderHandleX, sliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check if clicked on slider track
  if (mouseY >= sliderY - 10 && mouseY <= sliderY + 10 &&
      mouseX >= sliderX && mouseX <= sliderX + sliderW) {
    isDraggingSlider = true;
    xPoint = map(mouseX, sliderX, sliderX + sliderW, sliderMin, sliderMax);
    xPoint = constrain(xPoint, sliderMin, sliderMax);
    xPoint = Math.round(xPoint * 20) / 20; // Round to 0.05
    return;
  }

  // Check dropdown button
  if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
      mouseY >= dropdownY && mouseY <= dropdownY + dropdownH) {
    dropdownOpen = !dropdownOpen;
    return;
  }

  // Check dropdown options if open
  if (dropdownOpen) {
    let optionH = 24;
    let listH = functions.length * optionH;

    for (let i = 0; i < functions.length; i++) {
      let optY = dropdownY - listH + i * optionH;

      if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
          mouseY >= optY && mouseY <= optY + optionH) {
        selectedFunction = i;
        dropdownOpen = false;
        return;
      }
    }

    // Close dropdown if clicked elsewhere
    dropdownOpen = false;
    return;
  }

  // Check Show Steps button
  let stepsBtnX = 170;
  let stepsBtnY = dropdownY;
  let stepsBtnW = 100;
  let stepsBtnH = 24;

  if (mouseX >= stepsBtnX && mouseX <= stepsBtnX + stepsBtnW &&
      mouseY >= stepsBtnY && mouseY <= stepsBtnY + stepsBtnH) {
    showSteps = !showSteps;
    return;
  }

  // Check Show Tangent toggle
  let tangentBtnX = 290;
  let tangentBtnY = dropdownY;
  let tangentBtnW = 110;
  let tangentBtnH = 24;

  if (mouseX >= tangentBtnX && mouseX <= tangentBtnX + tangentBtnW &&
      mouseY >= tangentBtnY && mouseY <= tangentBtnY + tangentBtnH) {
    showTangent = !showTangent;
    return;
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    xPoint = map(mouseX, sliderX, sliderX + sliderW, sliderMin, sliderMax);
    xPoint = constrain(xPoint, sliderMin, sliderMax);
    xPoint = Math.round(xPoint * 20) / 20; // Round to 0.05
  }
}

function mouseReleased() {
  isDraggingSlider = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateControlPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  originX = canvasWidth * 0.35;
  updateControlPositions();
}
