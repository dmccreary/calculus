// Inverse Derivative MicroSim
// Shows geometrically why the derivative of an inverse function is the reciprocal of the original derivative
// Learning Objective: Students will explain the relationship between the derivative of a function and its inverse
// Bloom Level: Understand (L2), Verb: explain, interpret, illustrate

let canvasWidth = 580;
let drawHeight = 480;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scale = 45;

// Function pairs (function, inverse, and derivatives)
let functionPairs = [
  {
    name: 'x\u00B2',
    f: x => x >= 0 ? x * x : NaN,
    fInv: y => y >= 0 ? Math.sqrt(y) : NaN,
    fPrime: x => 2 * x,
    fInvPrime: y => y > 0 ? 1 / (2 * Math.sqrt(y)) : NaN,
    fLabel: 'f(x) = x\u00B2',
    fInvLabel: 'f\u207B\u00B9(x) = \u221Ax',
    domain: [0, 3.5],
    restrictionNote: '(x \u2265 0)'
  },
  {
    name: 'x\u00B3',
    f: x => x * x * x,
    fInv: y => Math.cbrt(y),
    fPrime: x => 3 * x * x,
    fInvPrime: y => y !== 0 ? 1 / (3 * Math.pow(Math.cbrt(y), 2)) : NaN,
    fLabel: 'f(x) = x\u00B3',
    fInvLabel: 'f\u207B\u00B9(x) = \u221Bx',
    domain: [-2, 2],
    restrictionNote: ''
  },
  {
    name: 'e\u02E3',
    f: x => Math.exp(x),
    fInv: y => y > 0 ? Math.log(y) : NaN,
    fPrime: x => Math.exp(x),
    fInvPrime: y => y > 0 ? 1 / y : NaN,
    fLabel: 'f(x) = e\u02E3',
    fInvLabel: 'f\u207B\u00B9(x) = ln(x)',
    domain: [-2, 2],
    restrictionNote: ''
  },
  {
    name: 'sin(x)',
    f: x => (x >= -Math.PI/2 && x <= Math.PI/2) ? Math.sin(x) : NaN,
    fInv: y => (y >= -1 && y <= 1) ? Math.asin(y) : NaN,
    fPrime: x => (x >= -Math.PI/2 && x <= Math.PI/2) ? Math.cos(x) : NaN,
    fInvPrime: y => (y > -1 && y < 1) ? 1 / Math.sqrt(1 - y * y) : NaN,
    fLabel: 'f(x) = sin(x)',
    fInvLabel: 'f\u207B\u00B9(x) = arcsin(x)',
    domain: [-1.5, 1.5],
    restrictionNote: '(-\u03C0/2 \u2264 x \u2264 \u03C0/2)'
  }
];
let currentPair = 0;

// Display options
let showYEqualsX = true;
let isAnimating = false;
let animationT = 0;
let animationSpeed = 0.008;

// Draggable point position (x-coordinate on f)
let pointA = 1;
let isDragging = false;

// Button definitions
let functionButtons = [];
let toggleLineBtn = { x: 0, y: 0, w: 100, h: 28, label: 'y = x Line' };
let animateBtn = { x: 0, y: 0, w: 80, h: 28, label: 'Animate' };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth / 2;
  originY = drawHeight / 2;

  describe('Interactive visualization showing why the derivative of an inverse function equals the reciprocal of the original derivative. Drag a point on the blue curve to see corresponding tangent lines on both f and its inverse.', LABEL);
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
  text('Derivative of Inverse Functions', canvasWidth / 2, 8);
  textSize(14);
  fill(80);
  let pair = functionPairs[currentPair];
  let subtitle = pair.fLabel + ' and ' + pair.fInvLabel;
  if (pair.restrictionNote) subtitle += ' ' + pair.restrictionNote;
  text(subtitle, canvasWidth / 2, 30);

  // Animation update
  if (isAnimating) {
    animationT += animationSpeed;
    if (animationT > 1) animationT = 0;
    let domain = pair.domain;
    pointA = domain[0] + animationT * (domain[1] - domain[0]);
    // Skip invalid regions
    let testVal = pair.f(pointA);
    if (isNaN(testVal) || pointA === 0) {
      pointA = 0.01;
    }
  }

  // Draw coordinate system
  drawAxes();

  // Draw y = x line
  if (showYEqualsX) {
    drawYEqualsX();
  }

  // Draw both functions
  drawFunctions();

  // Draw tangent lines and points
  drawTangentLinesAndPoints();

  // Draw slope info panel
  drawInfoPanel();

  // Draw legend
  drawLegend();

  // Draw controls
  drawControls();
}

function drawAxes() {
  // Grid
  stroke(230);
  strokeWeight(1);
  for (let i = -6; i <= 6; i++) {
    let x = originX + i * scale;
    let y = originY - i * scale;
    if (x > 30 && x < canvasWidth - 30) {
      line(x, 55, x, drawHeight - 30);
    }
    if (y > 55 && y < drawHeight - 30) {
      line(30, y, canvasWidth - 30, y);
    }
  }

  // Axes
  stroke(0);
  strokeWeight(2);
  line(30, originY, canvasWidth - 30, originY);
  line(originX, 55, originX, drawHeight - 30);

  // Tick labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = -5; i <= 5; i++) {
    if (i !== 0) {
      let x = originX + i * scale;
      if (x > 30 && x < canvasWidth - 30) {
        text(i, x, originY + 5);
      }
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = -4; i <= 4; i++) {
    if (i !== 0) {
      let y = originY - i * scale;
      if (y > 55 && y < drawHeight - 30) {
        text(i, originX - 5, y);
      }
    }
  }

  // Axis labels
  textSize(12);
  textAlign(CENTER, TOP);
  text('x', canvasWidth - 20, originY + 5);
  textAlign(RIGHT, CENTER);
  text('y', originX - 10, 60);
}

function drawYEqualsX() {
  stroke(150, 150, 150);
  strokeWeight(1);
  drawingContext.setLineDash([6, 6]);

  let startX = -5;
  let endX = 5;

  line(originX + startX * scale, originY - startX * scale,
       originX + endX * scale, originY - endX * scale);

  drawingContext.setLineDash([]);

  // Label
  fill(120);
  noStroke();
  textSize(11);
  textAlign(LEFT, BOTTOM);
  push();
  translate(originX + 4.2 * scale, originY - 4.2 * scale);
  rotate(-PI/4);
  text('y = x', 5, 0);
  pop();
}

function drawFunctions() {
  let pair = functionPairs[currentPair];

  // Draw f(x) - blue
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = 30; px < canvasWidth - 30; px += 2) {
    let x = (px - originX) / scale;
    let y = pair.f(x);
    if (!isNaN(y) && isFinite(y) && Math.abs(y) < 10) {
      let sy = originY - y * scale;
      if (sy > 55 && sy < drawHeight - 30) {
        vertex(px, sy);
      }
    }
  }
  endShape();

  // Draw f^-1(x) - orange
  stroke(220, 120, 50);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = 30; px < canvasWidth - 30; px += 2) {
    let x = (px - originX) / scale;
    let y = pair.fInv(x);
    if (!isNaN(y) && isFinite(y) && Math.abs(y) < 10) {
      let sy = originY - y * scale;
      if (sy > 55 && sy < drawHeight - 30) {
        vertex(px, sy);
      }
    }
  }
  endShape();
}

function drawTangentLinesAndPoints() {
  let pair = functionPairs[currentPair];

  // Point (a, b) on f
  let a = pointA;
  let b = pair.f(a);

  if (isNaN(b) || !isFinite(b)) return;

  // Derivative at point a on f
  let fPrimeA = pair.fPrime(a);
  if (isNaN(fPrimeA) || !isFinite(fPrimeA)) return;

  // Screen coordinates for point on f
  let screenX1 = originX + a * scale;
  let screenY1 = originY - b * scale;

  // Screen coordinates for point on f^-1 (which is (b, a))
  let screenX2 = originX + b * scale;
  let screenY2 = originY - a * scale;

  // Draw tangent line on f (blue)
  if (fPrimeA !== 0) {
    stroke(50, 100, 200, 180);
    strokeWeight(2);
    let tangentLen = 2;  // in graph units
    let dx = tangentLen / Math.sqrt(1 + fPrimeA * fPrimeA);
    let dy = fPrimeA * dx;

    let tx1 = originX + (a - dx) * scale;
    let ty1 = originY - (b - dy) * scale;
    let tx2 = originX + (a + dx) * scale;
    let ty2 = originY - (b + dy) * scale;
    line(tx1, ty1, tx2, ty2);
  }

  // Derivative of inverse at point b
  let fInvPrimeB = pair.fInvPrime(b);

  // Draw tangent line on f^-1 (orange)
  if (!isNaN(fInvPrimeB) && isFinite(fInvPrimeB) && fInvPrimeB !== 0) {
    stroke(220, 120, 50, 180);
    strokeWeight(2);
    let tangentLen = 2;
    let slope = fInvPrimeB;
    let dx = tangentLen / Math.sqrt(1 + slope * slope);
    let dy = slope * dx;

    let tx1 = originX + (b - dx) * scale;
    let ty1 = originY - (a - dy) * scale;
    let tx2 = originX + (b + dx) * scale;
    let ty2 = originY - (a + dy) * scale;
    line(tx1, ty1, tx2, ty2);
  }

  // Draw reflection line connecting the two points
  if (showYEqualsX) {
    stroke(100, 100, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(screenX1, screenY1, screenX2, screenY2);
    drawingContext.setLineDash([]);
  }

  // Draw point on f (blue)
  if (screenY1 > 55 && screenY1 < drawHeight - 30) {
    fill(50, 100, 200);
    stroke(255);
    strokeWeight(2);
    circle(screenX1, screenY1, 14);

    // Label
    fill(50, 100, 200);
    noStroke();
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text('(a, b)', screenX1 + 10, screenY1 - 5);
  }

  // Draw point on f^-1 (orange)
  if (screenX2 > 30 && screenX2 < canvasWidth - 30 &&
      screenY2 > 55 && screenY2 < drawHeight - 30) {
    fill(220, 120, 50);
    stroke(255);
    strokeWeight(2);
    circle(screenX2, screenY2, 14);

    // Label
    fill(220, 120, 50);
    noStroke();
    textSize(12);
    textAlign(RIGHT, TOP);
    text('(b, a)', screenX2 - 10, screenY2 + 5);
  }
}

function drawInfoPanel() {
  let pair = functionPairs[currentPair];
  let a = pointA;
  let b = pair.f(a);

  if (isNaN(b) || !isFinite(b)) return;

  let fPrimeA = pair.fPrime(a);
  let fInvPrimeB = pair.fInvPrime(b);

  // Info panel
  let panelX = 10;
  let panelY = 55;
  let panelW = 160;
  let panelH = 130;

  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  fill(0);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);

  let yPos = panelY + 8;
  let lineH = 16;

  text('Point on f: (' + a.toFixed(2) + ', ' + b.toFixed(2) + ')', panelX + 8, yPos);
  yPos += lineH;
  text('Point on f\u207B\u00B9: (' + b.toFixed(2) + ', ' + a.toFixed(2) + ')', panelX + 8, yPos);
  yPos += lineH + 5;

  fill(50, 100, 200);
  text('f\'(a) = ' + (isNaN(fPrimeA) ? 'undefined' : fPrimeA.toFixed(4)), panelX + 8, yPos);
  yPos += lineH;

  fill(220, 120, 50);
  text('(f\u207B\u00B9)\'(b) = ' + (isNaN(fInvPrimeB) ? 'undefined' : fInvPrimeB.toFixed(4)), panelX + 8, yPos);
  yPos += lineH + 5;

  // Product verification
  fill(0, 120, 80);
  if (!isNaN(fPrimeA) && !isNaN(fInvPrimeB) && isFinite(fPrimeA) && isFinite(fInvPrimeB)) {
    let product = fPrimeA * fInvPrimeB;
    text('Product: ' + product.toFixed(4), panelX + 8, yPos);
    yPos += lineH;
    textSize(10);
    fill(0, 100, 60);
    text('(slopes are reciprocals!)', panelX + 8, yPos);
  }
}

function drawLegend() {
  let pair = functionPairs[currentPair];
  let legendX = canvasWidth - 130;
  let legendY = 55;

  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(legendX - 5, legendY - 5, 125, 55, 5);

  // f(x)
  stroke(50, 100, 200);
  strokeWeight(3);
  line(legendX, legendY + 8, legendX + 25, legendY + 8);
  fill('black');
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text(pair.fLabel, legendX + 30, legendY + 8);

  // f inverse
  stroke(220, 120, 50);
  strokeWeight(3);
  line(legendX, legendY + 28, legendX + 25, legendY + 28);
  fill('black');
  noStroke();
  text(pair.fInvLabel, legendX + 30, legendY + 28);
}

function drawControls() {
  let pair = functionPairs[currentPair];

  // Function selector buttons
  let btnW = 70;
  let btnH = 28;
  let btnY = drawHeight + 8;
  let startX = 10;

  functionButtons = [];
  for (let i = 0; i < functionPairs.length; i++) {
    let btnX = startX + i * (btnW + 5);
    let isSelected = (i === currentPair);
    functionButtons.push({ x: btnX, y: btnY, w: btnW, h: btnH, index: i });

    fill(isSelected ? '#2196F3' : '#e0e0e0');
    stroke(isSelected ? '#1565C0' : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(btnX, btnY, btnW, btnH, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(functionPairs[i].name, btnX + btnW/2, btnY + btnH/2);
  }

  // Toggle y=x line button
  let toggleX = startX + 4 * (btnW + 5) + 10;
  toggleLineBtn.x = toggleX;
  toggleLineBtn.y = btnY;

  fill(showYEqualsX ? '#4CAF50' : '#e0e0e0');
  stroke(showYEqualsX ? '#388E3C' : '#999');
  strokeWeight(showYEqualsX ? 2 : 1);
  rect(toggleLineBtn.x, toggleLineBtn.y, toggleLineBtn.w, toggleLineBtn.h, 5);

  fill(showYEqualsX ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(toggleLineBtn.label, toggleLineBtn.x + toggleLineBtn.w/2, toggleLineBtn.y + toggleLineBtn.h/2);

  // Animate button
  animateBtn.x = toggleX + toggleLineBtn.w + 10;
  animateBtn.y = btnY;

  fill(isAnimating ? '#FF9800' : '#e0e0e0');
  stroke(isAnimating ? '#F57C00' : '#999');
  strokeWeight(isAnimating ? 2 : 1);
  rect(animateBtn.x, animateBtn.y, animateBtn.w, animateBtn.h, 5);

  fill(isAnimating ? 'white' : 'black');
  noStroke();
  text(isAnimating ? 'Stop' : 'Animate', animateBtn.x + animateBtn.w/2, animateBtn.y + animateBtn.h/2);

  // Instructions
  fill('black');
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Drag point on blue curve', 10, drawHeight + 52);

  // Key insight
  textAlign(RIGHT, CENTER);
  fill(0, 100, 80);
  text('Key: (f\u207B\u00B9)\'(b) = 1 / f\'(a)', canvasWidth - 10, drawHeight + 52);
}

function mousePressed() {
  // Check function buttons
  for (let btn of functionButtons) {
    if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
        mouseY >= btn.y && mouseY <= btn.y + btn.h) {
      currentPair = btn.index;
      pointA = 1;
      isAnimating = false;
      animationT = 0;
      return;
    }
  }

  // Check toggle y=x line button
  if (mouseX >= toggleLineBtn.x && mouseX <= toggleLineBtn.x + toggleLineBtn.w &&
      mouseY >= toggleLineBtn.y && mouseY <= toggleLineBtn.y + toggleLineBtn.h) {
    showYEqualsX = !showYEqualsX;
    return;
  }

  // Check animate button
  if (mouseX >= animateBtn.x && mouseX <= animateBtn.x + animateBtn.w &&
      mouseY >= animateBtn.y && mouseY <= animateBtn.y + animateBtn.h) {
    isAnimating = !isAnimating;
    if (isAnimating) {
      animationT = 0;
    }
    return;
  }

  // Check if clicking in graph area for dragging
  if (mouseY > 55 && mouseY < drawHeight - 30) {
    isDragging = true;
    isAnimating = false;
    updatePointFromMouse();
  }
}

function mouseDragged() {
  if (isDragging) {
    updatePointFromMouse();
  }
}

function mouseReleased() {
  isDragging = false;
}

function updatePointFromMouse() {
  let pair = functionPairs[currentPair];
  pointA = (mouseX - originX) / scale;

  // Constrain to valid domain
  let domain = pair.domain;
  pointA = constrain(pointA, domain[0] + 0.01, domain[1] - 0.01);

  // For x^2 and sin, avoid zero where derivative is 0 or undefined
  if (currentPair === 0 && pointA < 0.1) pointA = 0.1;
  if (currentPair === 3 && Math.abs(pointA) > 1.5) pointA = constrain(pointA, -1.5, 1.5);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  originX = canvasWidth / 2;
  scale = Math.min(45, (canvasWidth - 60) / 12);
}
