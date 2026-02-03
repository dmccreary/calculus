// Inverse Function Reflector MicroSim
// Learning Objective: Students will compare a function and its inverse graphically,
// identifying the reflection relationship across the line y = x.
// Bloom Level: Analyze (L4)

let canvasWidth = 550;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scale = 40;

// Function pairs (function and inverse)
let functionPairs = [
  {
    name: 'Linear',
    f: x => 2*x + 1,
    fInv: y => (y - 1) / 2,
    fLabel: 'f(x) = 2x + 1',
    fInvLabel: 'f⁻¹(x) = (x-1)/2'
  },
  {
    name: 'Cubic',
    f: x => Math.pow(x, 3),
    fInv: y => Math.cbrt(y),
    fLabel: 'f(x) = x³',
    fInvLabel: 'f⁻¹(x) = ∛x'
  },
  {
    name: 'Exponential',
    f: x => Math.exp(x),
    fInv: y => y > 0 ? Math.log(y) : NaN,
    fLabel: 'f(x) = eˣ',
    fInvLabel: 'f⁻¹(x) = ln(x)'
  },
  {
    name: 'Square Root',
    f: x => x >= 0 ? Math.sqrt(x) : NaN,
    fInv: y => y >= 0 ? y * y : NaN,
    fLabel: 'f(x) = √x',
    fInvLabel: 'f⁻¹(x) = x²'
  }
];
let currentPair = 0;

// Display options
let showInverse = true;
let showYEqualsX = true;
let showReflection = true;

// Draggable point
let pointX = 1;
let isDragging = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth / 2;
  originY = drawHeight / 2;

  describe('Inverse Function Reflector: See how functions and their inverses are reflections across the line y = x.', LABEL);
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
  text('Inverse Function Reflector', canvasWidth / 2, 8);

  // Draw coordinate system
  drawAxes();

  // Draw y = x line
  if (showYEqualsX) {
    drawYEqualsX();
  }

  // Draw functions
  drawFunction();
  if (showInverse) {
    drawInverseFunction();
  }

  // Draw reflection points
  if (showReflection) {
    drawReflectionPoints();
  }

  // Draw legend
  drawLegend();

  // Draw controls
  drawControls();
}

function drawAxes() {
  // Grid
  stroke(230);
  strokeWeight(1);
  for (let i = -5; i <= 5; i++) {
    let x = originX + i * scale;
    let y = originY - i * scale;
    if (x > margin && x < canvasWidth - margin) {
      line(x, margin, x, drawHeight - margin);
    }
    if (y > margin && y < drawHeight - margin) {
      line(margin, y, canvasWidth - margin, y);
    }
  }

  // Axes
  stroke(0);
  strokeWeight(2);
  line(margin, originY, canvasWidth - margin, originY);
  line(originX, margin, originX, drawHeight - margin);

  // Tick labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = -4; i <= 4; i++) {
    if (i !== 0) {
      let x = originX + i * scale;
      if (x > margin && x < canvasWidth - margin) {
        text(i, x, originY + 5);
      }
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = -4; i <= 4; i++) {
    if (i !== 0) {
      let y = originY - i * scale;
      if (y > margin && y < drawHeight - margin) {
        text(i, originX - 5, y);
      }
    }
  }
}

function drawYEqualsX() {
  stroke(150, 150, 150);
  strokeWeight(1);
  drawingContext.setLineDash([8, 8]);

  let startX = Math.max(-5, (margin - originX) / scale);
  let endX = Math.min(5, (canvasWidth - margin - originX) / scale);

  line(originX + startX * scale, originY - startX * scale,
       originX + endX * scale, originY - endX * scale);

  drawingContext.setLineDash([]);

  // Label
  fill(100);
  noStroke();
  textSize(12);
  textAlign(LEFT, BOTTOM);
  push();
  translate(canvasWidth - margin - 30, margin + 30);
  rotate(-PI/4);
  text('y = x', 0, 0);
  pop();
}

function drawFunction() {
  let pair = functionPairs[currentPair];

  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = margin; px < canvasWidth - margin; px += 2) {
    let x = (px - originX) / scale;
    let y = pair.f(x);
    if (!isNaN(y) && isFinite(y)) {
      let sy = originY - y * scale;
      if (sy > margin && sy < drawHeight - margin) {
        vertex(px, sy);
      }
    }
  }
  endShape();
}

function drawInverseFunction() {
  let pair = functionPairs[currentPair];

  stroke(200, 100, 50);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = margin; px < canvasWidth - margin; px += 2) {
    let x = (px - originX) / scale;
    let y = pair.fInv(x);
    if (!isNaN(y) && isFinite(y)) {
      let sy = originY - y * scale;
      if (sy > margin && sy < drawHeight - margin) {
        vertex(px, sy);
      }
    }
  }
  endShape();
}

function drawReflectionPoints() {
  let pair = functionPairs[currentPair];

  let y = pair.f(pointX);
  if (isNaN(y) || !isFinite(y)) return;

  let screenX1 = originX + pointX * scale;
  let screenY1 = originY - y * scale;

  // Point on f(x)
  fill(50, 100, 200);
  stroke(0);
  strokeWeight(2);
  circle(screenX1, screenY1, 14);

  // Corresponding point on inverse (swap x and y)
  let screenX2 = originX + y * scale;
  let screenY2 = originY - pointX * scale;

  if (showInverse && screenX2 > margin && screenX2 < canvasWidth - margin &&
      screenY2 > margin && screenY2 < drawHeight - margin) {
    fill(200, 100, 50);
    circle(screenX2, screenY2, 14);

    // Reflection line
    stroke(100, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(screenX1, screenY1, screenX2, screenY2);
    drawingContext.setLineDash([]);
  }

  // Coordinates display
  fill('black');
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text('f: (' + pointX.toFixed(1) + ', ' + y.toFixed(2) + ')', 10, 35);
  if (showInverse) {
    text('f⁻¹: (' + y.toFixed(2) + ', ' + pointX.toFixed(1) + ')', 10, 52);
  }
}

function drawLegend() {
  let pair = functionPairs[currentPair];
  let legendX = canvasWidth - 140;
  let legendY = 35;

  // f(x)
  stroke(50, 100, 200);
  strokeWeight(3);
  line(legendX, legendY, legendX + 25, legendY);
  fill('black');
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text(pair.fLabel, legendX + 30, legendY);

  // f inverse
  if (showInverse) {
    stroke(200, 100, 50);
    strokeWeight(3);
    line(legendX, legendY + 20, legendX + 25, legendY + 20);
    fill('black');
    noStroke();
    text(pair.fInvLabel, legendX + 30, legendY + 20);
  }
}

function drawControls() {
  // Function selector buttons
  let btnW = (canvasWidth - 40) / functionPairs.length - 5;
  let btnH = 28;
  let btnY = drawHeight + 11;

  for (let i = 0; i < functionPairs.length; i++) {
    let btnX = 10 + i * (btnW + 5);
    let isSelected = (i === currentPair);

    fill(isSelected ? '#2196F3' : '#ddd');
    stroke(isSelected ? '#1565C0' : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(btnX, btnY, btnW, btnH, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(functionPairs[i].name, btnX + btnW/2, btnY + btnH/2);
  }

  // Instructions
  fill('black');
  noStroke();
  textSize(11);
  textAlign(RIGHT, CENTER);
  text('Drag point on blue curve', canvasWidth - 10, drawHeight + 25);
}

function mousePressed() {
  // Check function buttons
  let btnW = (canvasWidth - 40) / functionPairs.length - 5;
  let btnH = 28;
  let btnY = drawHeight + 11;

  for (let i = 0; i < functionPairs.length; i++) {
    let btnX = 10 + i * (btnW + 5);
    if (mouseX >= btnX && mouseX <= btnX + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
      currentPair = i;
      pointX = 1;
      return;
    }
  }

  // Check if clicking on the function curve
  if (mouseY > margin && mouseY < drawHeight - margin) {
    isDragging = true;
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
  pointX = (mouseX - originX) / scale;
  pointX = constrain(pointX, -4, 4);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  originX = canvasWidth / 2;
  scale = Math.min(40, (canvasWidth - 2 * margin) / 10);
}
