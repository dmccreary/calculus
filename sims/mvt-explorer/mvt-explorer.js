// Mean Value Theorem Explorer MicroSim
// Visualizes the MVT by showing secant line and finding parallel tangent lines
// Bloom Level: Apply (L3), Verbs: apply, calculate, demonstrate
// Learning Objective: Students will apply the MVT to find values of c where
// the tangent line is parallel to the secant line

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 50;
let defaultTextSize = 16;

// Graph dimensions
let graphLeft, graphRight, graphTop, graphBottom;
let graphWidth, graphHeight;

// Coordinate ranges
let xMin = -1, xMax = 5;
let yMin = -2, yMax = 10;

// MVT parameters
let a = 0;        // Left endpoint
let b = 4;        // Right endpoint
let c = 2;        // Point where tangent is drawn
let currentFunction = 0;  // 0=quadratic, 1=cubic, 2=sine, 3=sqrt

// Animation state
let isAnimating = false;
let animationTarget = null;
let animationSpeed = 0.05;

// UI state
let showBothLines = true;
let isDraggingA = false;
let isDraggingB = false;
let isDraggingC = false;

// Control positions
let sliderAX, sliderAY, sliderW;
let sliderBX, sliderBY;
let funcBtnX, funcBtnY, funcBtnW;
let autoFindBtnX, autoFindBtnY;
let toggleBtnX, toggleBtnY;

// Colors
const secantColor = [30, 100, 200];    // Blue for secant
const tangentColor = [230, 120, 20];   // Orange for tangent
const matchColor = [50, 180, 50];      // Green when slopes match
const curveColor = [80, 80, 80];       // Dark gray for curve

// Function definitions
const functions = [
  { name: 'Quadratic', formula: 'f(x) = x\u00B2' },
  { name: 'Cubic', formula: 'f(x) = x\u00B3/4' },
  { name: 'Sine', formula: 'f(x) = 3sin(x) + 3' },
  { name: 'Square Root', formula: 'f(x) = 2\u221Ax + 1' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();

  describe('Interactive Mean Value Theorem visualization showing a curve with endpoints, secant line (blue dashed), and draggable tangent point. When the tangent slope equals the secant slope, a match indicator lights up green.', LABEL);
}

function updateLayoutPositions() {
  graphLeft = margin + 50;
  graphRight = canvasWidth - margin - 20;
  graphTop = chartTop;
  graphBottom = drawHeight - margin - 10;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;

  // Control positions - Row 1: a and b sliders
  sliderAX = 50;
  sliderAY = drawHeight + 20;
  sliderW = (canvasWidth - 180) / 2 - 30;

  sliderBX = canvasWidth / 2 + 20;
  sliderBY = drawHeight + 20;

  // Row 2: Function selector and buttons
  funcBtnX = 80;
  funcBtnY = drawHeight + 55;
  funcBtnW = 80;

  // Row 3: Auto-find and toggle
  autoFindBtnX = 80;
  autoFindBtnY = drawHeight + 90;

  toggleBtnX = 220;
  toggleBtnY = drawHeight + 90;
}

function draw() {
  updateCanvasSize();

  // Handle animation
  if (isAnimating && animationTarget !== null) {
    let diff = animationTarget - c;
    if (Math.abs(diff) < 0.01) {
      c = animationTarget;
      isAnimating = false;
      animationTarget = null;
    } else {
      c += diff * animationSpeed;
    }
  }

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

  // Draw graph
  drawGraph();

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
  text('Mean Value Theorem Explorer', canvasWidth / 2, 5);
  textSize(13);
  fill(80);
  text(functions[currentFunction].formula + '  |  Find c where f\'(c) = [f(b) - f(a)] / (b - a)', canvasWidth / 2, 26);
}

function drawGraph() {
  // Graph background
  fill(255, 255, 255, 200);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft - 5, graphTop - 5, graphWidth + 10, graphHeight + 10, 5);

  // Grid
  drawGrid();

  // Axes
  drawAxes();

  // Draw curve
  drawCurve();

  // Draw secant line (if showing both lines)
  if (showBothLines) {
    drawSecantLine();
  }

  // Draw tangent line at c
  drawTangentLine();

  // Draw endpoints a and b
  drawEndpoints();

  // Draw draggable point c
  drawPointC();

  // Draw MVT c values (where theorem is satisfied)
  drawMVTPoints();
}

function drawGrid() {
  stroke(235);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let x = mapX(i);
    if (x > graphLeft && x < graphRight) {
      line(x, graphTop, x, graphBottom);
    }
  }

  // Horizontal grid lines
  for (let i = Math.ceil(yMin); i <= yMax; i++) {
    let y = mapY(i);
    if (y > graphTop && y < graphBottom) {
      line(graphLeft, y, graphRight, y);
    }
  }
}

function drawAxes() {
  stroke(120);
  strokeWeight(1.5);

  // X-axis
  let y0 = mapY(0);
  if (y0 > graphTop && y0 < graphBottom) {
    line(graphLeft, y0, graphRight, y0);

    // X-axis labels
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    for (let i = Math.ceil(xMin); i <= xMax; i++) {
      if (i !== 0) {
        let x = mapX(i);
        if (x > graphLeft + 10 && x < graphRight - 10) {
          text(i, x, y0 + 3);
        }
      }
    }
  }

  // Y-axis
  let x0 = mapX(0);
  if (x0 > graphLeft && x0 < graphRight) {
    stroke(120);
    line(x0, graphTop, x0, graphBottom);

    // Y-axis labels
    fill(80);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(11);
    for (let i = Math.ceil(yMin); i <= yMax; i++) {
      if (i !== 0) {
        let y = mapY(i);
        if (y > graphTop + 10 && y < graphBottom - 10) {
          text(i, x0 - 5, y);
        }
      }
    }
  }
}

function drawCurve() {
  stroke(curveColor[0], curveColor[1], curveColor[2]);
  strokeWeight(2.5);
  noFill();

  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let x = unmapX(px);
    let y = evaluateF(x);
    let py = mapY(y);

    if (py >= graphTop - 20 && py <= graphBottom + 20) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();
}

function drawSecantLine() {
  let fa = evaluateF(a);
  let fb = evaluateF(b);

  // Calculate secant slope
  let secantSlope = (fb - fa) / (b - a);

  // Draw extended secant line
  stroke(secantColor[0], secantColor[1], secantColor[2]);
  strokeWeight(2);
  drawingContext.setLineDash([8, 5]);

  // Extend the line beyond a and b
  let extendX = 1;
  let x1 = a - extendX;
  let y1 = fa + secantSlope * (-extendX);
  let x2 = b + extendX;
  let y2 = fb + secantSlope * extendX;

  let px1 = mapX(x1);
  let py1 = mapY(y1);
  let px2 = mapX(x2);
  let py2 = mapY(y2);

  // Clamp to graph boundaries
  clipLineToGraph(px1, py1, px2, py2);

  drawingContext.setLineDash([]);
}

function clipLineToGraph(px1, py1, px2, py2) {
  // Simple line drawing, clipped to graph area
  px1 = constrain(px1, graphLeft, graphRight);
  px2 = constrain(px2, graphLeft, graphRight);
  py1 = constrain(py1, graphTop, graphBottom);
  py2 = constrain(py2, graphTop, graphBottom);
  line(px1, py1, px2, py2);
}

function drawTangentLine() {
  let fc = evaluateF(c);
  let tangentSlope = evaluateFPrime(c);

  // Calculate secant slope
  let fa = evaluateF(a);
  let fb = evaluateF(b);
  let secantSlope = (fb - fa) / (b - a);

  // Check if slopes match
  let slopeDiff = Math.abs(tangentSlope - secantSlope);
  let isMatch = slopeDiff < 0.05;

  // Draw tangent line
  if (isMatch) {
    stroke(matchColor[0], matchColor[1], matchColor[2]);
    strokeWeight(3);
  } else {
    stroke(tangentColor[0], tangentColor[1], tangentColor[2]);
    strokeWeight(2);
  }
  drawingContext.setLineDash([]);

  // Extend tangent line
  let extendX = 1.5;
  let x1 = c - extendX;
  let y1 = fc + tangentSlope * (-extendX);
  let x2 = c + extendX;
  let y2 = fc + tangentSlope * extendX;

  let px1 = mapX(x1);
  let py1 = mapY(y1);
  let px2 = mapX(x2);
  let py2 = mapY(y2);

  clipLineToGraph(px1, py1, px2, py2);
}

function drawEndpoints() {
  let fa = evaluateF(a);
  let fb = evaluateF(b);

  // Point A
  let pxa = mapX(a);
  let pya = mapY(fa);

  if (pya >= graphTop && pya <= graphBottom) {
    fill(secantColor[0], secantColor[1], secantColor[2]);
    stroke(255);
    strokeWeight(2);
    circle(pxa, pya, 14);

    // Label
    fill(secantColor[0], secantColor[1], secantColor[2]);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text('A', pxa, pya - 10);
  }

  // Point B
  let pxb = mapX(b);
  let pyb = mapY(fb);

  if (pyb >= graphTop && pyb <= graphBottom) {
    fill(secantColor[0], secantColor[1], secantColor[2]);
    stroke(255);
    strokeWeight(2);
    circle(pxb, pyb, 14);

    // Label
    fill(secantColor[0], secantColor[1], secantColor[2]);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text('B', pxb, pyb - 10);
  }
}

function drawPointC() {
  let fc = evaluateF(c);
  let pxc = mapX(c);
  let pyc = mapY(fc);

  // Calculate if slopes match
  let tangentSlope = evaluateFPrime(c);
  let fa = evaluateF(a);
  let fb = evaluateF(b);
  let secantSlope = (fb - fa) / (b - a);
  let isMatch = Math.abs(tangentSlope - secantSlope) < 0.05;

  if (pyc >= graphTop && pyc <= graphBottom) {
    // Larger circle for draggable point
    if (isMatch) {
      fill(matchColor[0], matchColor[1], matchColor[2]);
    } else {
      fill(tangentColor[0], tangentColor[1], tangentColor[2]);
    }
    stroke(255);
    strokeWeight(2);
    circle(pxc, pyc, isDraggingC ? 20 : 16);

    // Label
    if (isMatch) {
      fill(matchColor[0], matchColor[1], matchColor[2]);
    } else {
      fill(tangentColor[0], tangentColor[1], tangentColor[2]);
    }
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(13);
    text('c', pxc, pyc - 12);
  }
}

function drawMVTPoints() {
  // Find all c values where MVT is satisfied and highlight them
  let fa = evaluateF(a);
  let fb = evaluateF(b);
  let secantSlope = (fb - fa) / (b - a);

  // Search for MVT points
  let mvtPoints = findMVTPoints(secantSlope);

  // Draw small indicators at MVT points
  stroke(matchColor[0], matchColor[1], matchColor[2]);
  strokeWeight(2);
  noFill();

  for (let pt of mvtPoints) {
    if (Math.abs(pt - c) > 0.1) {  // Don't draw if it's the current c
      let px = mapX(pt);
      let py = mapY(evaluateF(pt));
      if (py >= graphTop && py <= graphBottom) {
        circle(px, py, 10);
      }
    }
  }
}

function findMVTPoints(targetSlope) {
  // Search for points where f'(x) = targetSlope within (a, b)
  let points = [];
  let step = 0.01;
  let tolerance = 0.02;

  for (let x = a + step; x < b - step; x += step) {
    let slope = evaluateFPrime(x);
    if (Math.abs(slope - targetSlope) < tolerance) {
      // Check if we haven't already found a nearby point
      let isNew = true;
      for (let pt of points) {
        if (Math.abs(pt - x) < 0.1) {
          isNew = false;
          break;
        }
      }
      if (isNew) {
        points.push(x);
      }
    }
  }

  return points;
}

function drawInfoPanel() {
  let boxX = graphLeft + 10;
  let boxY = graphTop + 10;
  let boxW = 180;
  let boxH = 100;

  fill(255, 255, 255, 235);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  let fa = evaluateF(a);
  let fb = evaluateF(b);
  let fc = evaluateF(c);
  let secantSlope = (fb - fa) / (b - a);
  let tangentSlope = evaluateFPrime(c);
  let slopeDiff = tangentSlope - secantSlope;
  let isMatch = Math.abs(slopeDiff) < 0.05;

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  // Secant slope
  fill(secantColor[0], secantColor[1], secantColor[2]);
  text('Secant slope: ' + secantSlope.toFixed(3), boxX + 8, boxY + 8);

  // Tangent slope
  if (isMatch) {
    fill(matchColor[0], matchColor[1], matchColor[2]);
  } else {
    fill(tangentColor[0], tangentColor[1], tangentColor[2]);
  }
  text('Tangent slope: ' + tangentSlope.toFixed(3), boxX + 8, boxY + 28);

  // Difference
  fill(80);
  text('Difference: ' + Math.abs(slopeDiff).toFixed(3), boxX + 8, boxY + 48);

  // Match indicator
  if (isMatch) {
    fill(matchColor[0], matchColor[1], matchColor[2]);
    textSize(14);
    text('MVT Satisfied!', boxX + 8, boxY + 72);

    // Draw checkmark
    stroke(matchColor[0], matchColor[1], matchColor[2]);
    strokeWeight(3);
    noFill();
    let checkX = boxX + boxW - 25;
    let checkY = boxY + 78;
    line(checkX, checkY, checkX + 6, checkY + 6);
    line(checkX + 6, checkY + 6, checkX + 15, checkY - 8);
  } else {
    fill(180);
    textSize(12);
    text('Drag c to match slopes', boxX + 8, boxY + 72);
  }
}

function drawControls() {
  // Row 1: a and b sliders

  // Slider A
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('a = ' + a.toFixed(2), 10, sliderAY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderAX, sliderAY - 5, sliderW, 10, 5);

  // Slider handle
  let handleAX = map(a, xMin, b - 0.5, sliderAX, sliderAX + sliderW);
  fill(isDraggingA ? '#0066cc' : secantColor);
  noStroke();
  circle(handleAX, sliderAY, 16);

  // Slider B
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  text('b = ' + b.toFixed(2), sliderBX - 45, sliderBY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderBX, sliderBY - 5, sliderW, 10, 5);

  // Slider handle
  let handleBX = map(b, a + 0.5, xMax, sliderBX, sliderBX + sliderW);
  fill(isDraggingB ? '#0066cc' : secantColor);
  noStroke();
  circle(handleBX, sliderBY, 16);

  // Row 2: Function selector
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Function:', 10, funcBtnY + 14);

  for (let i = 0; i < 4; i++) {
    let bx = funcBtnX + i * (funcBtnW + 5);

    fill(currentFunction === i ? '#4CAF50' : '#e0e0e0');
    stroke(currentFunction === i ? '#388E3C' : '#bdbdbd');
    strokeWeight(1);
    rect(bx, funcBtnY, funcBtnW, 26, 5);

    fill(currentFunction === i ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(functions[i].name, bx + funcBtnW / 2, funcBtnY + 13);
  }

  // Row 3: Auto-find button
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Actions:', 10, autoFindBtnY + 12);

  // Auto-find button
  fill('#2196F3');
  stroke('#1976D2');
  strokeWeight(1);
  rect(autoFindBtnX, autoFindBtnY, 110, 26, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Auto-find c', autoFindBtnX + 55, autoFindBtnY + 13);

  // Toggle button
  fill(showBothLines ? '#4CAF50' : '#e0e0e0');
  stroke(showBothLines ? '#388E3C' : '#bdbdbd');
  strokeWeight(1);
  rect(toggleBtnX, toggleBtnY, 140, 26, 5);

  fill(showBothLines ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(showBothLines ? 'Secant: Visible' : 'Secant: Hidden', toggleBtnX + 70, toggleBtnY + 13);

  // Current c value display
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('c = ' + c.toFixed(2), toggleBtnX + 160, autoFindBtnY + 12);

  // Instructions
  fill(100);
  textSize(10);
  textAlign(RIGHT, CENTER);
  text('Drag the orange point c on the curve', canvasWidth - 15, autoFindBtnY + 12);
}

// Function evaluators
function evaluateF(x) {
  switch (currentFunction) {
    case 0: return x * x;  // x^2
    case 1: return x * x * x / 4;  // x^3/4
    case 2: return 3 * Math.sin(x) + 3;  // 3sin(x) + 3
    case 3: return x >= 0 ? 2 * Math.sqrt(x) + 1 : 1;  // 2sqrt(x) + 1
    default: return 0;
  }
}

function evaluateFPrime(x) {
  switch (currentFunction) {
    case 0: return 2 * x;  // 2x
    case 1: return 3 * x * x / 4;  // 3x^2/4
    case 2: return 3 * Math.cos(x);  // 3cos(x)
    case 3: return x > 0.01 ? 1 / Math.sqrt(x) : 10;  // 1/sqrt(x)
    default: return 0;
  }
}

// Coordinate mapping functions
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

function mousePressed() {
  // Check if clicking on point c (on the curve)
  let fc = evaluateF(c);
  let pxc = mapX(c);
  let pyc = mapY(fc);

  if (dist(mouseX, mouseY, pxc, pyc) < 20) {
    isDraggingC = true;
    return;
  }

  // Check slider A handle
  let handleAX = map(a, xMin, b - 0.5, sliderAX, sliderAX + sliderW);
  if (dist(mouseX, mouseY, handleAX, sliderAY) < 12) {
    isDraggingA = true;
    return;
  }

  // Check slider A track
  if (mouseY > sliderAY - 12 && mouseY < sliderAY + 12 &&
      mouseX > sliderAX && mouseX < sliderAX + sliderW) {
    a = map(mouseX, sliderAX, sliderAX + sliderW, xMin, b - 0.5);
    a = constrain(a, xMin, b - 0.5);
    constrainC();
    isDraggingA = true;
    return;
  }

  // Check slider B handle
  let handleBX = map(b, a + 0.5, xMax, sliderBX, sliderBX + sliderW);
  if (dist(mouseX, mouseY, handleBX, sliderBY) < 12) {
    isDraggingB = true;
    return;
  }

  // Check slider B track
  if (mouseY > sliderBY - 12 && mouseY < sliderBY + 12 &&
      mouseX > sliderBX && mouseX < sliderBX + sliderW) {
    b = map(mouseX, sliderBX, sliderBX + sliderW, a + 0.5, xMax);
    b = constrain(b, a + 0.5, xMax);
    constrainC();
    isDraggingB = true;
    return;
  }

  // Check function buttons
  for (let i = 0; i < 4; i++) {
    let bx = funcBtnX + i * (funcBtnW + 5);
    if (mouseX >= bx && mouseX <= bx + funcBtnW &&
        mouseY >= funcBtnY && mouseY <= funcBtnY + 26) {
      currentFunction = i;
      // Adjust range for square root
      if (currentFunction === 3) {
        a = Math.max(0, a);
        constrainC();
      }
      return;
    }
  }

  // Check auto-find button
  if (mouseX >= autoFindBtnX && mouseX <= autoFindBtnX + 110 &&
      mouseY >= autoFindBtnY && mouseY <= autoFindBtnY + 26) {
    autoFindC();
    return;
  }

  // Check toggle button
  if (mouseX >= toggleBtnX && mouseX <= toggleBtnX + 140 &&
      mouseY >= toggleBtnY && mouseY <= toggleBtnY + 26) {
    showBothLines = !showBothLines;
    return;
  }
}

function mouseDragged() {
  if (isDraggingC) {
    // Map mouse x to graph x, constrain to (a, b)
    let newC = unmapX(mouseX);
    c = constrain(newC, a + 0.1, b - 0.1);
    c = Math.round(c * 100) / 100;
    isAnimating = false;
    animationTarget = null;
  }

  if (isDraggingA) {
    a = map(mouseX, sliderAX, sliderAX + sliderW, xMin, b - 0.5);
    a = constrain(a, currentFunction === 3 ? 0 : xMin, b - 0.5);
    a = Math.round(a * 100) / 100;
    constrainC();
  }

  if (isDraggingB) {
    b = map(mouseX, sliderBX, sliderBX + sliderW, a + 0.5, xMax);
    b = constrain(b, a + 0.5, xMax);
    b = Math.round(b * 100) / 100;
    constrainC();
  }
}

function mouseReleased() {
  isDraggingA = false;
  isDraggingB = false;
  isDraggingC = false;
}

function constrainC() {
  c = constrain(c, a + 0.1, b - 0.1);
}

function autoFindC() {
  // Find the first c value that satisfies MVT
  let fa = evaluateF(a);
  let fb = evaluateF(b);
  let secantSlope = (fb - fa) / (b - a);

  let mvtPoints = findMVTPoints(secantSlope);

  if (mvtPoints.length > 0) {
    // Animate to the first MVT point
    animationTarget = mvtPoints[0];
    isAnimating = true;
  }
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
