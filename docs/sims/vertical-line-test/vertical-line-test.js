// Vertical Line Test MicroSim
// Learning Objective: Students will use the vertical line test to determine
// whether a given graph represents a function.
// Bloom Level: Apply (L3)

let canvasWidth = 600;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scale = 30;

// Graphs to test
let graphs = [
  { name: 'y = x²', isFunction: true, draw: drawParabola },
  { name: 'Circle', isFunction: false, draw: drawCircle },
  { name: 'y = sin(x)', isFunction: true, draw: drawSine },
  { name: 'x = y²', isFunction: false, draw: drawSidewaysParabola },
  { name: 'y = x³', isFunction: true, draw: drawCubic }
];
let currentGraph = 0;

// Vertical line position (controlled by mouse)
let lineX = 0;
let intersections = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth / 2;
  originY = drawHeight / 2;

  describe('Vertical Line Test: Drag a vertical line across different graphs to test if they represent functions.', LABEL);
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
  textSize(20);
  text('Vertical Line Test: ' + graphs[currentGraph].name, canvasWidth / 2, 8);

  // Draw axes
  drawAxes();

  // Draw current graph
  graphs[currentGraph].draw();

  // Draw vertical line and find intersections
  drawVerticalLine();

  // Draw result indicator
  drawResult();

  // Draw controls
  drawControls();
}

function drawAxes() {
  stroke(200);
  strokeWeight(1);

  // Grid
  for (let x = -10; x <= 10; x++) {
    let screenX = originX + x * scale;
    if (screenX > margin && screenX < canvasWidth - margin) {
      line(screenX, margin, screenX, drawHeight - margin);
    }
  }
  for (let y = -5; y <= 5; y++) {
    let screenY = originY - y * scale;
    if (screenY > margin && screenY < drawHeight - margin) {
      line(margin, screenY, canvasWidth - margin, screenY);
    }
  }

  // Axes
  stroke(0);
  strokeWeight(2);
  line(margin, originY, canvasWidth - margin, originY);
  line(originX, margin, originX, drawHeight - margin);

  // Labels
  fill('black');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('x', canvasWidth - margin + 10, originY + 5);
  textAlign(LEFT, CENTER);
  text('y', originX + 5, margin - 5);
}

function drawParabola() {
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = -canvasWidth/2; px <= canvasWidth/2; px += 2) {
    let x = px / scale;
    let y = x * x;
    let screenX = originX + px;
    let screenY = originY - y * scale;
    if (screenY > margin && screenY < drawHeight - margin) {
      vertex(screenX, screenY);
    }
  }
  endShape();
}

function drawCircle() {
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();
  let r = 3 * scale;
  ellipse(originX, originY, r * 2, r * 2);
}

function drawSine() {
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = -canvasWidth/2; px <= canvasWidth/2; px += 2) {
    let x = px / scale;
    let y = 2 * sin(x);
    let screenX = originX + px;
    let screenY = originY - y * scale;
    vertex(screenX, screenY);
  }
  endShape();
}

function drawSidewaysParabola() {
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();
  // Upper branch
  beginShape();
  for (let x = 0; x <= 5; x += 0.05) {
    let y = sqrt(x);
    let screenX = originX + x * scale;
    let screenY = originY - y * scale;
    if (screenX < canvasWidth - margin) {
      vertex(screenX, screenY);
    }
  }
  endShape();
  // Lower branch
  beginShape();
  for (let x = 0; x <= 5; x += 0.05) {
    let y = -sqrt(x);
    let screenX = originX + x * scale;
    let screenY = originY - y * scale;
    if (screenX < canvasWidth - margin) {
      vertex(screenX, screenY);
    }
  }
  endShape();
}

function drawCubic() {
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = -canvasWidth/2; px <= canvasWidth/2; px += 2) {
    let x = px / scale;
    let y = x * x * x / 4;
    let screenX = originX + px;
    let screenY = originY - y * scale;
    if (screenY > margin && screenY < drawHeight - margin) {
      vertex(screenX, screenY);
    }
  }
  endShape();
}

function drawVerticalLine() {
  // Constrain line to drawing area
  let screenX = constrain(lineX, margin, canvasWidth - margin);

  // Draw the vertical line
  stroke(255, 100, 100);
  strokeWeight(2);
  line(screenX, margin, screenX, drawHeight - margin);

  // Find intersections
  intersections = findIntersections(screenX);

  // Draw intersection points
  fill(255, 50, 50);
  stroke(0);
  strokeWeight(1);
  for (let pt of intersections) {
    circle(screenX, pt.y, 12);
  }

  // Show intersection count
  fill('black');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(14);
  text('Intersections: ' + intersections.length, screenX, margin - 5);
}

function findIntersections(screenX) {
  let pts = [];
  let x = (screenX - originX) / scale;

  switch(currentGraph) {
    case 0: // y = x²
      let y0 = x * x;
      let sy0 = originY - y0 * scale;
      if (sy0 > margin && sy0 < drawHeight - margin) {
        pts.push({ y: sy0 });
      }
      break;

    case 1: // Circle r=3
      let r = 3;
      if (abs(x) <= r) {
        let yCirc = sqrt(r*r - x*x);
        pts.push({ y: originY - yCirc * scale });
        pts.push({ y: originY + yCirc * scale });
      }
      break;

    case 2: // y = 2*sin(x)
      let ySin = 2 * sin(x);
      pts.push({ y: originY - ySin * scale });
      break;

    case 3: // x = y² (sideways parabola)
      if (x >= 0) {
        let ySide = sqrt(x);
        pts.push({ y: originY - ySide * scale });
        pts.push({ y: originY + ySide * scale });
      }
      break;

    case 4: // y = x³/4
      let yCub = x * x * x / 4;
      let syCub = originY - yCub * scale;
      if (syCub > margin && syCub < drawHeight - margin) {
        pts.push({ y: syCub });
      }
      break;
  }

  return pts;
}

function drawResult() {
  let isFunc = graphs[currentGraph].isFunction;
  let testPasses = intersections.length <= 1;

  // Result box
  let boxW = 200;
  let boxH = 45;
  let boxX = canvasWidth - boxW - 10;
  let boxY = drawHeight - boxH - 10;

  fill(isFunc ? color(200, 255, 200) : color(255, 200, 200));
  stroke(isFunc ? color(100, 200, 100) : color(200, 100, 100));
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(isFunc ? 'This IS a function' : 'This is NOT a function', boxX + boxW/2, boxY + 15);
  textSize(12);
  text(isFunc ? '(passes test everywhere)' : '(fails test - multiple outputs)', boxX + boxW/2, boxY + 32);
}

function drawControls() {
  // Graph selector buttons
  let btnW = (canvasWidth - 60) / graphs.length;
  let btnH = 30;
  let btnY = drawHeight + 10;

  for (let i = 0; i < graphs.length; i++) {
    let btnX = 10 + i * (btnW + 10);
    let isSelected = (i === currentGraph);

    fill(isSelected ? '#2196F3' : '#ddd');
    stroke(isSelected ? '#1565C0' : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(btnX, btnY, btnW, btnH, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(graphs[i].name, btnX + btnW/2, btnY + btnH/2);
  }
}

function mouseMoved() {
  if (mouseY >= margin && mouseY <= drawHeight - margin) {
    lineX = mouseX;
  }
}

function mouseDragged() {
  if (mouseY >= margin && mouseY <= drawHeight - margin) {
    lineX = mouseX;
  }
}

function mousePressed() {
  // Check graph selector buttons
  let btnW = (canvasWidth - 60) / graphs.length;
  let btnH = 30;
  let btnY = drawHeight + 10;

  for (let i = 0; i < graphs.length; i++) {
    let btnX = 10 + i * (btnW + 10);
    if (mouseX >= btnX && mouseX <= btnX + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
      currentGraph = i;
      lineX = originX;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  originX = canvasWidth / 2;
  scale = Math.min(30, (canvasWidth - 2 * margin) / 14);
}
