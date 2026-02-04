// Implicit Tangent Line MicroSim
// Learning Objective: Students will find tangent lines to curves defined by implicit equations (Bloom Level 3: Apply)
// Bloom Verbs: apply, calculate, demonstrate
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let chartTop = 55;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scale = 40;

// Current state
let currentCurve = 0;
let pointX = 1;
let pointY = 1;
let showNormalLine = false;
let showSteps = false;
let isDraggingPoint = false;

// Slider states (canvas-based)
let paramSlider1 = { x: 0, y: 0, w: 150, value: 2, min: 0.5, max: 4, dragging: false, label: 'r' };
let paramSlider2 = { x: 0, y: 0, w: 150, value: 2, min: 0.5, max: 4, dragging: false, label: 'b' };

// Dropdown state
let dropdownOpen = false;
let dropdownX, dropdownY, dropdownW, dropdownH;

// Implicit curve definitions
// Each curve has: name, equation string, F(x,y), dF/dx, dF/dy, parameter info
const curves = [
  {
    name: "Circle",
    equation: "x^2 + y^2 = r^2",
    equationTeX: "x^2 + y^2 = r^2",
    F: (x, y, p) => x*x + y*y - p.r*p.r,
    Fx: (x, y, p) => 2*x,
    Fy: (x, y, p) => 2*y,
    params: { r: 2 },
    paramLabels: ['r'],
    paramRanges: [{ min: 0.5, max: 4 }],
    initialPoint: (p) => ({ x: p.r * Math.cos(Math.PI/4), y: p.r * Math.sin(Math.PI/4) }),
    derivativeSteps: (x, y, p) => [
      "F(x,y) = x^2 + y^2 - r^2",
      "dF/dx = 2x, dF/dy = 2y",
      "dy/dx = -(dF/dx)/(dF/dy)",
      "dy/dx = -2x / 2y = -x/y"
    ]
  },
  {
    name: "Ellipse",
    equation: "x^2/a^2 + y^2/b^2 = 1",
    equationTeX: "x^2/a^2 + y^2/b^2 = 1",
    F: (x, y, p) => x*x/(p.a*p.a) + y*y/(p.b*p.b) - 1,
    Fx: (x, y, p) => 2*x/(p.a*p.a),
    Fy: (x, y, p) => 2*y/(p.b*p.b),
    params: { a: 3, b: 2 },
    paramLabels: ['a', 'b'],
    paramRanges: [{ min: 0.5, max: 4 }, { min: 0.5, max: 4 }],
    initialPoint: (p) => ({ x: p.a * Math.cos(Math.PI/4), y: p.b * Math.sin(Math.PI/4) }),
    derivativeSteps: (x, y, p) => [
      "F(x,y) = x^2/a^2 + y^2/b^2 - 1",
      "dF/dx = 2x/a^2, dF/dy = 2y/b^2",
      "dy/dx = -(dF/dx)/(dF/dy)",
      "dy/dx = -(2x/a^2)/(2y/b^2) = -b^2x/(a^2y)"
    ]
  },
  {
    name: "Hyperbola",
    equation: "x^2/a^2 - y^2/b^2 = 1",
    equationTeX: "x^2/a^2 - y^2/b^2 = 1",
    F: (x, y, p) => x*x/(p.a*p.a) - y*y/(p.b*p.b) - 1,
    Fx: (x, y, p) => 2*x/(p.a*p.a),
    Fy: (x, y, p) => -2*y/(p.b*p.b),
    params: { a: 1.5, b: 1 },
    paramLabels: ['a', 'b'],
    paramRanges: [{ min: 0.5, max: 3 }, { min: 0.5, max: 3 }],
    initialPoint: (p) => ({ x: p.a * 1.5, y: p.b * Math.sqrt(1.5*1.5 - 1) }),
    derivativeSteps: (x, y, p) => [
      "F(x,y) = x^2/a^2 - y^2/b^2 - 1",
      "dF/dx = 2x/a^2, dF/dy = -2y/b^2",
      "dy/dx = -(dF/dx)/(dF/dy)",
      "dy/dx = -(2x/a^2)/(-2y/b^2) = b^2x/(a^2y)"
    ]
  },
  {
    name: "Folium of Descartes",
    equation: "x^3 + y^3 = 3axy",
    equationTeX: "x^3 + y^3 = 3axy",
    F: (x, y, p) => x*x*x + y*y*y - 3*p.a*x*y,
    Fx: (x, y, p) => 3*x*x - 3*p.a*y,
    Fy: (x, y, p) => 3*y*y - 3*p.a*x,
    params: { a: 2 },
    paramLabels: ['a'],
    paramRanges: [{ min: 0.5, max: 4 }],
    initialPoint: (p) => ({ x: 1.5, y: 1.5 }),
    derivativeSteps: (x, y, p) => [
      "F(x,y) = x^3 + y^3 - 3axy",
      "dF/dx = 3x^2 - 3ay",
      "dF/dy = 3y^2 - 3ax",
      "dy/dx = -(3x^2 - 3ay)/(3y^2 - 3ax)",
      "dy/dx = (ay - x^2)/(y^2 - ax)"
    ]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth * 0.35;
  originY = drawHeight / 2 + 10;

  updateControlPositions();
  resetPointToCurve();

  describe('Implicit Tangent Line MicroSim: Explore tangent lines to curves defined by implicit equations including circles, ellipses, hyperbolas, and the Folium of Descartes.', LABEL);
}

function updateControlPositions() {
  // Parameter sliders
  paramSlider1.x = 120;
  paramSlider1.y = drawHeight + 20;
  paramSlider1.w = Math.min(120, canvasWidth * 0.2);

  paramSlider2.x = 320;
  paramSlider2.y = drawHeight + 20;
  paramSlider2.w = Math.min(120, canvasWidth * 0.2);

  // Dropdown
  dropdownX = 10;
  dropdownY = drawHeight + 55;
  dropdownW = 180;
  dropdownH = 26;
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

  // Draw the implicit curve
  drawImplicitCurve();

  // Draw tangent and normal lines
  if (isPointOnCurve()) {
    drawTangentLine();
    if (showNormalLine) {
      drawNormalLine();
    }
  }

  // Draw the draggable point
  drawPoint();

  // Title
  drawTitle();

  // Info panel
  drawInfoPanel();

  // Calculation steps panel
  if (showSteps) {
    drawStepsPanel();
  }

  // Draw controls
  drawControls();

  // Draw dropdown if open (on top of everything)
  if (dropdownOpen) {
    drawDropdownOptions();
  }
}

function drawAxes() {
  const curve = curves[currentCurve];

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

function drawImplicitCurve() {
  const curve = curves[currentCurve];
  const params = getCurrentParams();

  // Use marching squares algorithm to draw implicit curve
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();

  const resolution = 2;
  const xMin = (margin - originX) / scale;
  const xMax = (canvasWidth - margin - originX) / scale;
  const yMin = (originY - drawHeight + 20) / scale;
  const yMax = (originY - chartTop) / scale;

  // Draw using contour tracing
  for (let px = margin; px < canvasWidth - margin; px += resolution) {
    for (let py = chartTop; py < drawHeight - 20; py += resolution) {
      let x1 = (px - originX) / scale;
      let y1 = (originY - py) / scale;
      let x2 = (px + resolution - originX) / scale;
      let y2 = (originY - (py + resolution)) / scale;

      let f1 = curve.F(x1, y1, params);
      let f2 = curve.F(x2, y1, params);
      let f3 = curve.F(x2, y2, params);
      let f4 = curve.F(x1, y2, params);

      // Check if contour crosses this cell
      if ((f1 > 0) !== (f2 > 0) || (f2 > 0) !== (f3 > 0) ||
          (f3 > 0) !== (f4 > 0) || (f4 > 0) !== (f1 > 0)) {
        // Draw a point at cell center
        point(px + resolution/2, py + resolution/2);
      }
    }
  }
}

function drawTangentLine() {
  const curve = curves[currentCurve];
  const params = getCurrentParams();

  let Fx = curve.Fx(pointX, pointY, params);
  let Fy = curve.Fy(pointX, pointY, params);

  // dy/dx = -Fx/Fy
  let slope = -Fx / Fy;

  // Check for vertical tangent
  if (!isFinite(slope) || Math.abs(slope) > 1000) {
    // Vertical tangent line
    stroke(220, 80, 80);
    strokeWeight(2);
    let px = originX + pointX * scale;
    line(px, chartTop, px, drawHeight - 20);
    return;
  }

  // Draw tangent line through (pointX, pointY) with slope
  let xMin = (margin - originX) / scale;
  let xMax = (canvasWidth - margin - originX) / scale;

  let yAtXMin = pointY + slope * (xMin - pointX);
  let yAtXMax = pointY + slope * (xMax - pointX);

  let px1 = margin;
  let py1 = originY - yAtXMin * scale;
  let px2 = canvasWidth - margin;
  let py2 = originY - yAtXMax * scale;

  py1 = constrain(py1, chartTop - 50, drawHeight + 50);
  py2 = constrain(py2, chartTop - 50, drawHeight + 50);

  stroke(220, 80, 80);
  strokeWeight(2);
  line(px1, py1, px2, py2);
}

function drawNormalLine() {
  const curve = curves[currentCurve];
  const params = getCurrentParams();

  let Fx = curve.Fx(pointX, pointY, params);
  let Fy = curve.Fy(pointX, pointY, params);

  // Normal slope is perpendicular to tangent: -1/slope = Fy/Fx
  let tangentSlope = -Fx / Fy;
  let normalSlope;

  if (Math.abs(tangentSlope) < 0.001) {
    // Horizontal tangent means vertical normal
    stroke(100, 180, 100);
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    let px = originX + pointX * scale;
    line(px, chartTop, px, drawHeight - 20);
    drawingContext.setLineDash([]);
    return;
  } else if (!isFinite(tangentSlope)) {
    // Vertical tangent means horizontal normal
    normalSlope = 0;
  } else {
    normalSlope = -1 / tangentSlope;
  }

  // Draw normal line
  let xMin = (margin - originX) / scale;
  let xMax = (canvasWidth - margin - originX) / scale;

  let yAtXMin = pointY + normalSlope * (xMin - pointX);
  let yAtXMax = pointY + normalSlope * (xMax - pointX);

  let px1 = margin;
  let py1 = originY - yAtXMin * scale;
  let px2 = canvasWidth - margin;
  let py2 = originY - yAtXMax * scale;

  py1 = constrain(py1, chartTop - 50, drawHeight + 50);
  py2 = constrain(py2, chartTop - 50, drawHeight + 50);

  stroke(100, 180, 100);
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  line(px1, py1, px2, py2);
  drawingContext.setLineDash([]);
}

function drawPoint() {
  let px = originX + pointX * scale;
  let py = originY - pointY * scale;

  // Check if point is on curve
  let onCurve = isPointOnCurve();

  // Point halo when dragging
  if (isDraggingPoint) {
    fill(255, 200, 200, 100);
    noStroke();
    circle(px, py, 30);
  }

  // Draw point
  if (onCurve) {
    fill(255, 100, 100);
    stroke(150, 50, 50);
  } else {
    fill(200, 200, 200);
    stroke(150, 150, 150);
  }
  strokeWeight(2);
  circle(px, py, 16);

  // Crosshairs indicator
  if (isDraggingPoint) {
    stroke(100, 100, 100, 150);
    strokeWeight(1);
    line(px - 20, py, px + 20, py);
    line(px, py - 20, px, py + 20);
  }
}

function drawTitle() {
  const curve = curves[currentCurve];

  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Implicit Tangent Line Explorer', canvasWidth * 0.35, 5);

  textSize(14);
  text(curve.equation, canvasWidth * 0.35, 28);
}

function drawInfoPanel() {
  const curve = curves[currentCurve];
  const params = getCurrentParams();

  // Panel position and size
  let panelX = canvasWidth - 220;
  let panelY = 55;
  let panelW = 210;
  let panelH = 180;

  // Panel background
  fill(255, 255, 255, 245);
  stroke(100, 100, 200);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 10);

  fill(50, 50, 150);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text("Point & Derivative", panelX + 10, panelY + 8);

  // Divider
  stroke(200);
  strokeWeight(1);
  line(panelX + 10, panelY + 26, panelX + panelW - 10, panelY + 26);

  fill('black');
  noStroke();
  textSize(12);
  let lineHeight = 20;
  let startY = panelY + 35;

  // Point coordinates
  text("Point (x, y):", panelX + 10, startY);
  fill(80, 80, 80);
  text("(" + pointX.toFixed(3) + ", " + pointY.toFixed(3) + ")", panelX + 20, startY + lineHeight * 0.7);

  // Check if on curve
  let onCurve = isPointOnCurve();
  if (!onCurve) {
    fill(200, 50, 50);
    text("(Drag point to curve)", panelX + 10, startY + lineHeight * 1.4);
    return;
  }

  // Calculate derivative
  let Fx = curve.Fx(pointX, pointY, params);
  let Fy = curve.Fy(pointX, pointY, params);
  let slope = -Fx / Fy;

  // Derivative value
  fill('black');
  text("dy/dx =", panelX + 10, startY + lineHeight * 1.6);

  if (!isFinite(slope) || Math.abs(slope) > 1000) {
    fill(200, 50, 50);
    textSize(11);
    text("undefined (vertical tangent)", panelX + 20, startY + lineHeight * 2.3);
  } else {
    fill(80, 80, 80);
    text(slope.toFixed(4), panelX + 20, startY + lineHeight * 2.3);
  }

  // Tangent line equation
  fill('black');
  textSize(12);
  text("Tangent Line:", panelX + 10, startY + lineHeight * 3.2);

  if (!isFinite(slope) || Math.abs(slope) > 1000) {
    fill(50, 100, 200);
    text("x = " + pointX.toFixed(3), panelX + 20, startY + lineHeight * 3.9);
  } else {
    let b = pointY - slope * pointX;
    let bSign = b >= 0 ? " + " : " - ";
    fill(50, 100, 200);
    textSize(11);
    text("y = " + slope.toFixed(3) + "x" + bSign + Math.abs(b).toFixed(3), panelX + 20, startY + lineHeight * 3.9);
  }

  // Normal line info if showing
  if (showNormalLine) {
    fill('black');
    textSize(12);
    text("Normal Line:", panelX + 10, startY + lineHeight * 4.8);

    if (Math.abs(slope) < 0.001) {
      fill(100, 180, 100);
      text("x = " + pointX.toFixed(3), panelX + 20, startY + lineHeight * 5.5);
    } else if (!isFinite(slope) || Math.abs(slope) > 1000) {
      fill(100, 180, 100);
      text("y = " + pointY.toFixed(3), panelX + 20, startY + lineHeight * 5.5);
    } else {
      let normalSlope = -1 / slope;
      let nb = pointY - normalSlope * pointX;
      let nbSign = nb >= 0 ? " + " : " - ";
      fill(100, 180, 100);
      textSize(11);
      text("y = " + normalSlope.toFixed(3) + "x" + nbSign + Math.abs(nb).toFixed(3), panelX + 20, startY + lineHeight * 5.5);
    }
  }
}

function drawStepsPanel() {
  const curve = curves[currentCurve];
  const params = getCurrentParams();

  // Panel position
  let panelX = canvasWidth - 220;
  let panelY = 245;
  let panelW = 210;
  let panelH = 190;

  // Panel background
  fill(255, 255, 240, 245);
  stroke(150, 150, 100);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 10);

  fill(100, 100, 50);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text("Implicit Differentiation", panelX + 10, panelY + 8);

  // Divider
  stroke(200);
  strokeWeight(1);
  line(panelX + 10, panelY + 26, panelX + panelW - 10, panelY + 26);

  // Steps
  let steps = curve.derivativeSteps(pointX, pointY, params);
  fill('black');
  noStroke();
  textSize(10);
  let lineHeight = 18;
  let startY = panelY + 35;

  for (let i = 0; i < steps.length; i++) {
    fill(i === steps.length - 1 ? '#1565C0' : '#333');
    text(steps[i], panelX + 10, startY + i * lineHeight);
  }

  // Show current calculation
  let Fx = curve.Fx(pointX, pointY, params);
  let Fy = curve.Fy(pointX, pointY, params);
  let slope = -Fx / Fy;

  fill('#666');
  textSize(9);
  let calcY = startY + steps.length * lineHeight + 10;
  text("At (" + pointX.toFixed(2) + ", " + pointY.toFixed(2) + "):", panelX + 10, calcY);
  text("dF/dx = " + Fx.toFixed(3), panelX + 10, calcY + 14);
  text("dF/dy = " + Fy.toFixed(3), panelX + 10, calcY + 28);

  if (!isFinite(slope) || Math.abs(slope) > 1000) {
    fill('#C62828');
    text("dy/dx = undefined", panelX + 10, calcY + 42);
  } else {
    fill('#1565C0');
    text("dy/dx = " + slope.toFixed(4), panelX + 10, calcY + 42);
  }
}

function drawControls() {
  const curve = curves[currentCurve];

  // Draw parameter sliders based on current curve
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);

  // Update slider parameters based on curve
  let paramLabels = curve.paramLabels;
  let paramRanges = curve.paramRanges;

  if (paramLabels.length >= 1) {
    paramSlider1.label = paramLabels[0];
    paramSlider1.min = paramRanges[0].min;
    paramSlider1.max = paramRanges[0].max;

    text(paramSlider1.label + ' = ' + paramSlider1.value.toFixed(1), 10, paramSlider1.y);
    drawSlider(paramSlider1);
  }

  if (paramLabels.length >= 2) {
    paramSlider2.label = paramLabels[1];
    paramSlider2.min = paramRanges[1].min;
    paramSlider2.max = paramRanges[1].max;

    text(paramSlider2.label + ' = ' + paramSlider2.value.toFixed(1), 260, paramSlider2.y);
    drawSlider(paramSlider2);
  }

  // Dropdown button for curve selection
  fill(240);
  stroke(150);
  strokeWeight(1);
  rect(dropdownX, dropdownY, dropdownW, dropdownH, 4);

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text(curve.name + ": " + curve.equation, dropdownX + 8, dropdownY + dropdownH / 2);

  // Dropdown arrow
  fill(100);
  noStroke();
  triangle(
    dropdownX + dropdownW - 20, dropdownY + 8,
    dropdownX + dropdownW - 8, dropdownY + 8,
    dropdownX + dropdownW - 14, dropdownY + 18
  );

  // Show Steps button
  let stepsBtnX = 210;
  let stepsBtnY = dropdownY;
  let stepsBtnW = 90;
  let stepsBtnH = dropdownH;

  fill(showSteps ? '#4CAF50' : '#2196F3');
  stroke(showSteps ? '#388E3C' : '#1976D2');
  strokeWeight(1);
  rect(stepsBtnX, stepsBtnY, stepsBtnW, stepsBtnH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(showSteps ? 'Hide Steps' : 'Show Steps', stepsBtnX + stepsBtnW / 2, stepsBtnY + stepsBtnH / 2);

  // Show Normal toggle
  let normalBtnX = 310;
  let normalBtnY = dropdownY;
  let normalBtnW = 100;
  let normalBtnH = dropdownH;

  fill(showNormalLine ? '#4CAF50' : '#9E9E9E');
  stroke(showNormalLine ? '#388E3C' : '#757575');
  strokeWeight(1);
  rect(normalBtnX, normalBtnY, normalBtnW, normalBtnH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(showNormalLine ? 'Normal: ON' : 'Normal: OFF', normalBtnX + normalBtnW / 2, normalBtnY + normalBtnH / 2);

  // Random Point button
  let randomBtnX = 420;
  let randomBtnY = dropdownY;
  let randomBtnW = 100;
  let randomBtnH = dropdownH;

  fill('#FF9800');
  stroke('#F57C00');
  strokeWeight(1);
  rect(randomBtnX, randomBtnY, randomBtnW, randomBtnH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Random Point', randomBtnX + randomBtnW / 2, randomBtnY + randomBtnH / 2);

  // Instructions
  fill(100);
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Click and drag the red point along the curve', 530, dropdownY + dropdownH / 2);
}

function drawSlider(slider) {
  let handleX = map(slider.value, slider.min, slider.max, slider.x, slider.x + slider.w);

  // Track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(slider.x, slider.y - 4, slider.w, 8, 4);

  // Handle
  fill(slider.dragging ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleX, slider.y, 16);
}

function drawDropdownOptions() {
  let optionH = 28;
  let listH = curves.length * optionH;

  // Dropdown list background (going upward)
  fill(255);
  stroke(150);
  strokeWeight(1);
  rect(dropdownX, dropdownY - listH, dropdownW, listH, 4);

  // Draw options
  for (let i = 0; i < curves.length; i++) {
    let optY = dropdownY - listH + i * optionH;

    // Highlight on hover
    if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
        mouseY >= optY && mouseY <= optY + optionH) {
      fill(230, 240, 255);
      noStroke();
      rect(dropdownX + 2, optY + 2, dropdownW - 4, optionH - 4, 2);
    }

    // Selected indicator
    if (i === currentCurve) {
      fill(200, 220, 255);
      noStroke();
      rect(dropdownX + 2, optY + 2, dropdownW - 4, optionH - 4, 2);
    }

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text(curves[i].name + ": " + curves[i].equation, dropdownX + 8, optY + optionH / 2);
  }
}

function getCurrentParams() {
  const curve = curves[currentCurve];
  let params = {};

  if (curve.paramLabels.length >= 1) {
    params[curve.paramLabels[0]] = paramSlider1.value;
  }
  if (curve.paramLabels.length >= 2) {
    params[curve.paramLabels[1]] = paramSlider2.value;
  }

  return params;
}

function isPointOnCurve() {
  const curve = curves[currentCurve];
  const params = getCurrentParams();
  let F = curve.F(pointX, pointY, params);
  return Math.abs(F) < 0.1;
}

function snapToCurve(x, y) {
  const curve = curves[currentCurve];
  const params = getCurrentParams();

  // Newton's method to project point onto curve
  // We move the point in the gradient direction until F(x,y) = 0
  let px = x;
  let py = y;

  for (let iter = 0; iter < 20; iter++) {
    let F = curve.F(px, py, params);
    if (Math.abs(F) < 0.001) break;

    let Fx = curve.Fx(px, py, params);
    let Fy = curve.Fy(px, py, params);
    let gradMag = Fx*Fx + Fy*Fy;

    if (gradMag < 0.0001) break;

    // Move in negative gradient direction
    px -= F * Fx / gradMag;
    py -= F * Fy / gradMag;
  }

  return { x: px, y: py };
}

function resetPointToCurve() {
  const curve = curves[currentCurve];
  const params = getCurrentParams();
  let initial = curve.initialPoint(params);
  let snapped = snapToCurve(initial.x, initial.y);
  pointX = snapped.x;
  pointY = snapped.y;
}

function setRandomPointOnCurve() {
  const curve = curves[currentCurve];
  const params = getCurrentParams();

  // Try to find a random point on the curve
  let found = false;
  let attempts = 0;

  while (!found && attempts < 100) {
    let angle = random(0, TWO_PI);
    let radius = random(0.5, 3);
    let testX = radius * cos(angle);
    let testY = radius * sin(angle);

    let snapped = snapToCurve(testX, testY);

    // Check if snapped point is valid and on curve
    if (isFinite(snapped.x) && isFinite(snapped.y)) {
      let F = curve.F(snapped.x, snapped.y, params);
      if (Math.abs(F) < 0.1) {
        // Check if in visible area
        let px = originX + snapped.x * scale;
        let py = originY - snapped.y * scale;
        if (px > margin && px < canvasWidth - margin && py > chartTop && py < drawHeight - 20) {
          pointX = snapped.x;
          pointY = snapped.y;
          found = true;
        }
      }
    }
    attempts++;
  }

  if (!found) {
    // Fall back to initial point
    resetPointToCurve();
  }
}

function mousePressed() {
  // Check if clicking on the point
  let px = originX + pointX * scale;
  let py = originY - pointY * scale;

  if (dist(mouseX, mouseY, px, py) < 20 && mouseY < drawHeight) {
    isDraggingPoint = true;
    return;
  }

  // Check parameter sliders
  const curve = curves[currentCurve];

  if (curve.paramLabels.length >= 1) {
    let handleX1 = map(paramSlider1.value, paramSlider1.min, paramSlider1.max, paramSlider1.x, paramSlider1.x + paramSlider1.w);
    if (dist(mouseX, mouseY, handleX1, paramSlider1.y) < 15 ||
        (mouseY >= paramSlider1.y - 10 && mouseY <= paramSlider1.y + 10 &&
         mouseX >= paramSlider1.x && mouseX <= paramSlider1.x + paramSlider1.w)) {
      paramSlider1.dragging = true;
      updateSliderValue(paramSlider1);
      return;
    }
  }

  if (curve.paramLabels.length >= 2) {
    let handleX2 = map(paramSlider2.value, paramSlider2.min, paramSlider2.max, paramSlider2.x, paramSlider2.x + paramSlider2.w);
    if (dist(mouseX, mouseY, handleX2, paramSlider2.y) < 15 ||
        (mouseY >= paramSlider2.y - 10 && mouseY <= paramSlider2.y + 10 &&
         mouseX >= paramSlider2.x && mouseX <= paramSlider2.x + paramSlider2.w)) {
      paramSlider2.dragging = true;
      updateSliderValue(paramSlider2);
      return;
    }
  }

  // Check dropdown button
  if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
      mouseY >= dropdownY && mouseY <= dropdownY + dropdownH) {
    dropdownOpen = !dropdownOpen;
    return;
  }

  // Check dropdown options if open
  if (dropdownOpen) {
    let optionH = 28;
    let listH = curves.length * optionH;

    for (let i = 0; i < curves.length; i++) {
      let optY = dropdownY - listH + i * optionH;

      if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
          mouseY >= optY && mouseY <= optY + optionH) {
        currentCurve = i;
        dropdownOpen = false;
        // Update slider values from new curve defaults
        let newCurve = curves[currentCurve];
        if (newCurve.paramLabels.length >= 1) {
          paramSlider1.value = newCurve.params[newCurve.paramLabels[0]];
        }
        if (newCurve.paramLabels.length >= 2) {
          paramSlider2.value = newCurve.params[newCurve.paramLabels[1]];
        }
        resetPointToCurve();
        return;
      }
    }

    dropdownOpen = false;
    return;
  }

  // Check Show Steps button
  let stepsBtnX = 210;
  let stepsBtnY = dropdownY;
  let stepsBtnW = 90;
  let stepsBtnH = dropdownH;

  if (mouseX >= stepsBtnX && mouseX <= stepsBtnX + stepsBtnW &&
      mouseY >= stepsBtnY && mouseY <= stepsBtnY + stepsBtnH) {
    showSteps = !showSteps;
    return;
  }

  // Check Normal toggle
  let normalBtnX = 310;
  let normalBtnY = dropdownY;
  let normalBtnW = 100;
  let normalBtnH = dropdownH;

  if (mouseX >= normalBtnX && mouseX <= normalBtnX + normalBtnW &&
      mouseY >= normalBtnY && mouseY <= normalBtnY + normalBtnH) {
    showNormalLine = !showNormalLine;
    return;
  }

  // Check Random Point button
  let randomBtnX = 420;
  let randomBtnY = dropdownY;
  let randomBtnW = 100;
  let randomBtnH = dropdownH;

  if (mouseX >= randomBtnX && mouseX <= randomBtnX + randomBtnW &&
      mouseY >= randomBtnY && mouseY <= randomBtnY + randomBtnH) {
    setRandomPointOnCurve();
    return;
  }

  // Click anywhere on graph area to move point
  if (mouseY < drawHeight && mouseY > chartTop && mouseX > margin && mouseX < canvasWidth - margin) {
    let newX = (mouseX - originX) / scale;
    let newY = (originY - mouseY) / scale;
    let snapped = snapToCurve(newX, newY);
    if (isFinite(snapped.x) && isFinite(snapped.y)) {
      pointX = snapped.x;
      pointY = snapped.y;
    }
  }
}

function mouseDragged() {
  if (isDraggingPoint) {
    let newX = (mouseX - originX) / scale;
    let newY = (originY - mouseY) / scale;
    let snapped = snapToCurve(newX, newY);
    if (isFinite(snapped.x) && isFinite(snapped.y)) {
      pointX = snapped.x;
      pointY = snapped.y;
    }
  }

  if (paramSlider1.dragging) {
    updateSliderValue(paramSlider1);
    resetPointToCurve();
  }

  if (paramSlider2.dragging) {
    updateSliderValue(paramSlider2);
    resetPointToCurve();
  }
}

function updateSliderValue(slider) {
  slider.value = map(mouseX, slider.x, slider.x + slider.w, slider.min, slider.max);
  slider.value = constrain(slider.value, slider.min, slider.max);
  slider.value = Math.round(slider.value * 10) / 10;
}

function mouseReleased() {
  isDraggingPoint = false;
  paramSlider1.dragging = false;
  paramSlider2.dragging = false;
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
