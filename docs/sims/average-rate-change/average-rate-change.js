// Average Rate of Change Explorer MicroSim
// Learning Objective: Students will apply the average rate of change formula
// to various functions (Bloom Level 3: Apply)
// Bloom Verbs: calculate, demonstrate

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let chartTop = 60; // Leave room for title and subtitle
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphBottom;
let xMin = -5;
let xMax = 5;
let yMin = -5;
let yMax = 5;

// Function selection
let functions = [
  { name: 'f(x) = x^2', fn: x => x * x },
  { name: 'f(x) = x^3 - 3x', fn: x => x * x * x - 3 * x },
  { name: 'f(x) = sin(x)', fn: x => Math.sin(x) }
];
let currentFunctionIndex = 0;

// Draggable points A and B (x-values)
let pointAx = -2;
let pointBx = 2;
let isDraggingA = false;
let isDraggingB = false;

// UI state
let functionButtons = [];
let resetButtonBounds = { x: 0, y: 0, w: 70, h: 28 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateGraphBounds();
  describe('Average Rate of Change Explorer: Drag points A and B along a curve to see how the secant line and slope calculation update in real-time.', LABEL);
}

function updateGraphBounds() {
  graphRight = canvasWidth - 40;
  graphBottom = drawHeight - 40;
}

function getCurrentFunction() {
  return functions[currentFunctionIndex];
}

function evaluateFunction(x) {
  return getCurrentFunction().fn(x);
}

function draw() {
  updateCanvasSize();
  updateGraphBounds();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw components
  drawAxes();
  drawFunction();
  drawRiseRun();
  drawSecantLine();
  drawPoints();
  drawTitle();
  drawSlopeCalculation();
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Average Rate of Change Explorer', canvasWidth / 2, 5);
  textSize(14);
  text(getCurrentFunction().name, canvasWidth / 2, 28);
}

function drawAxes() {
  // Grid lines
  stroke(220);
  strokeWeight(1);

  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    let px = map(x, xMin, xMax, graphLeft, graphRight);
    line(px, chartTop, px, graphBottom);
  }
  for (let y = Math.ceil(yMin); y <= yMax; y++) {
    let py = map(y, yMin, yMax, graphBottom, chartTop);
    line(graphLeft, py, graphRight, py);
  }

  // Axes
  stroke(100);
  strokeWeight(2);
  let x0 = map(0, xMin, xMax, graphLeft, graphRight);
  let y0 = map(0, yMin, yMax, graphBottom, chartTop);

  // X-axis
  if (y0 >= chartTop && y0 <= graphBottom) {
    line(graphLeft, y0, graphRight, y0);
  }
  // Y-axis
  if (x0 >= graphLeft && x0 <= graphRight) {
    line(x0, chartTop, x0, graphBottom);
  }

  // Axis labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);

  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    if (x !== 0) {
      let px = map(x, xMin, xMax, graphLeft, graphRight);
      if (y0 >= chartTop && y0 <= graphBottom) {
        text(x, px, y0 + 3);
      } else {
        text(x, px, graphBottom + 3);
      }
    }
  }

  textAlign(RIGHT, CENTER);
  for (let y = Math.ceil(yMin); y <= yMax; y++) {
    if (y !== 0) {
      let py = map(y, yMin, yMax, graphBottom, chartTop);
      if (x0 >= graphLeft && x0 <= graphRight) {
        text(y, x0 - 5, py);
      } else {
        text(y, graphLeft - 5, py);
      }
    }
  }

  // Axis arrow labels
  textSize(12);
  textAlign(CENTER, CENTER);
  text('x', graphRight + 15, y0 > graphBottom ? graphBottom : (y0 < chartTop ? chartTop : y0));
  text('y', x0 < graphLeft ? graphLeft : (x0 > graphRight ? graphRight : x0), chartTop - 10);
}

function drawFunction() {
  stroke(100, 100, 200);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let px = graphLeft; px <= graphRight; px++) {
    let x = map(px, graphLeft, graphRight, xMin, xMax);
    let y = evaluateFunction(x);
    let py = map(y, yMin, yMax, graphBottom, chartTop);

    if (py >= chartTop - 20 && py <= graphBottom + 20) {
      vertex(px, constrain(py, chartTop - 20, graphBottom + 20));
    }
  }
  endShape();
}

function drawRiseRun() {
  let ax = pointAx;
  let bx = pointBx;
  let ay = evaluateFunction(ax);
  let by = evaluateFunction(bx);

  // Ensure A is left of B for consistent visualization
  if (ax > bx) {
    [ax, bx] = [bx, ax];
    [ay, by] = [by, ay];
  }

  let pax = map(ax, xMin, xMax, graphLeft, graphRight);
  let pbx = map(bx, xMin, xMax, graphLeft, graphRight);
  let pay = map(ay, yMin, yMax, graphBottom, chartTop);
  let pby = map(by, yMin, yMax, graphBottom, chartTop);

  // Only draw if points are visible
  if (pay < chartTop || pay > graphBottom || pby < chartTop || pby > graphBottom) return;

  // Draw run (horizontal) - red
  stroke(200, 50, 50);
  strokeWeight(3);
  drawingContext.setLineDash([5, 3]);
  line(pax, pay, pbx, pay);
  drawingContext.setLineDash([]);

  // Run label
  fill(200, 50, 50);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  let runMidX = (pax + pbx) / 2;
  let runLabel = (bx - ax).toFixed(2);
  text('run = ' + runLabel, runMidX, pay + 5);

  // Draw rise (vertical) - blue
  stroke(50, 50, 200);
  strokeWeight(3);
  drawingContext.setLineDash([5, 3]);
  line(pbx, pay, pbx, pby);
  drawingContext.setLineDash([]);

  // Rise label
  fill(50, 50, 200);
  noStroke();
  textAlign(LEFT, CENTER);
  let riseMidY = (pay + pby) / 2;
  let riseLabel = (by - ay).toFixed(2);
  text('rise = ' + riseLabel, pbx + 5, riseMidY);
}

function drawSecantLine() {
  let ax = pointAx;
  let bx = pointBx;
  let ay = evaluateFunction(ax);
  let by = evaluateFunction(bx);

  // Calculate slope
  let slope = (by - ay) / (bx - ax);

  // Extend secant line to edges of graph
  // y - ay = slope * (x - ax)
  // y = slope * (x - ax) + ay

  let yAtXMin = slope * (xMin - ax) + ay;
  let yAtXMax = slope * (xMax - ax) + ay;

  let px1 = graphLeft;
  let py1 = map(yAtXMin, yMin, yMax, graphBottom, chartTop);
  let px2 = graphRight;
  let py2 = map(yAtXMax, yMin, yMax, graphBottom, chartTop);

  // Clip to graph area
  py1 = constrain(py1, chartTop, graphBottom);
  py2 = constrain(py2, chartTop, graphBottom);

  stroke(0, 150, 100);
  strokeWeight(2);
  line(px1, py1, px2, py2);
}

function drawPoints() {
  let ay = evaluateFunction(pointAx);
  let by = evaluateFunction(pointBx);

  let pax = map(pointAx, xMin, xMax, graphLeft, graphRight);
  let pay = map(ay, yMin, yMax, graphBottom, chartTop);
  let pbx = map(pointBx, xMin, xMax, graphLeft, graphRight);
  let pby = map(by, yMin, yMax, graphBottom, chartTop);

  // Point A (red)
  fill(isDraggingA ? '#cc0000' : '#ff4444');
  stroke(100);
  strokeWeight(2);
  if (pay >= chartTop && pay <= graphBottom) {
    circle(pax, pay, 20);
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('A', pax, pay);
  }

  // Point B (blue)
  fill(isDraggingB ? '#0000cc' : '#4444ff');
  stroke(100);
  strokeWeight(2);
  if (pby >= chartTop && pby <= graphBottom) {
    circle(pbx, pby, 20);
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('B', pbx, pby);
  }

  // Coordinate labels
  fill('black');
  noStroke();
  textSize(11);
  textAlign(CENTER, BOTTOM);
  if (pay >= chartTop && pay <= graphBottom) {
    text('(' + pointAx.toFixed(2) + ', ' + ay.toFixed(2) + ')', pax, pay - 14);
  }
  if (pby >= chartTop && pby <= graphBottom) {
    text('(' + pointBx.toFixed(2) + ', ' + by.toFixed(2) + ')', pbx, pby - 14);
  }
}

function drawSlopeCalculation() {
  let ay = evaluateFunction(pointAx);
  let by = evaluateFunction(pointBx);
  let slope = (by - ay) / (pointBx - pointAx);

  // Display calculation in info box
  let boxX = 10;
  let boxY = chartTop + 5;
  let boxW = 200;
  let boxH = 70;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 8);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  text('Average Rate of Change:', boxX + 8, boxY + 8);

  textSize(11);
  // Formula
  let formula = '(f(b) - f(a)) / (b - a)';
  text(formula, boxX + 8, boxY + 26);

  // Calculation with values
  let rise = (by - ay).toFixed(2);
  let run = (pointBx - pointAx).toFixed(2);
  let calculation = '= (' + by.toFixed(2) + ' - ' + ay.toFixed(2) + ') / (' + pointBx.toFixed(2) + ' - ' + pointAx.toFixed(2) + ')';
  text(calculation, boxX + 8, boxY + 40);

  // Result
  fill(0, 120, 80);
  textSize(12);
  text('= ' + slope.toFixed(4), boxX + 8, boxY + 54);
}

function drawControls() {
  // Function selection buttons
  let btnY = drawHeight + 10;
  let btnHeight = 26;
  let startX = 10;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Function:', 10, btnY + btnHeight / 2);

  startX = 80;
  let btnWidth = 85;
  let spacing = 5;

  functionButtons = [];
  for (let i = 0; i < functions.length; i++) {
    let btnX = startX + i * (btnWidth + spacing);
    let isSelected = (i === currentFunctionIndex);

    // Button background
    fill(isSelected ? '#4CAF50' : '#e0e0e0');
    stroke(isSelected ? '#388E3C' : '#bdbdbd');
    strokeWeight(1);
    rect(btnX, btnY, btnWidth, btnHeight, 5);

    // Button text
    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    let label = functions[i].name.replace('f(x) = ', '');
    text(label, btnX + btnWidth / 2, btnY + btnHeight / 2);

    functionButtons.push({ x: btnX, y: btnY, w: btnWidth, h: btnHeight, index: i });
  }

  // Reset button
  let resetX = canvasWidth - 80;
  let resetY = btnY;
  resetButtonBounds = { x: resetX, y: resetY, w: 70, h: btnHeight };

  fill('#FF9800');
  stroke('#F57C00');
  strokeWeight(1);
  rect(resetX, resetY, 70, btnHeight, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Reset', resetX + 35, resetY + btnHeight / 2);

  // Instructions
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Drag points A and B along the curve to explore average rate of change.', 10, drawHeight + 55);
}

function mousePressed() {
  // Check function buttons
  for (let btn of functionButtons) {
    if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
        mouseY >= btn.y && mouseY <= btn.y + btn.h) {
      currentFunctionIndex = btn.index;
      return;
    }
  }

  // Check reset button
  if (mouseX >= resetButtonBounds.x && mouseX <= resetButtonBounds.x + resetButtonBounds.w &&
      mouseY >= resetButtonBounds.y && mouseY <= resetButtonBounds.y + resetButtonBounds.h) {
    pointAx = -2;
    pointBx = 2;
    return;
  }

  // Check if clicking on point A or B
  let ay = evaluateFunction(pointAx);
  let by = evaluateFunction(pointBx);

  let pax = map(pointAx, xMin, xMax, graphLeft, graphRight);
  let pay = map(ay, yMin, yMax, graphBottom, chartTop);
  let pbx = map(pointBx, xMin, xMax, graphLeft, graphRight);
  let pby = map(by, yMin, yMax, graphBottom, chartTop);

  if (dist(mouseX, mouseY, pax, pay) < 15) {
    isDraggingA = true;
  } else if (dist(mouseX, mouseY, pbx, pby) < 15) {
    isDraggingB = true;
  }
}

function mouseDragged() {
  if (isDraggingA) {
    // Map mouse X to graph X coordinate
    let newX = map(mouseX, graphLeft, graphRight, xMin, xMax);
    newX = constrain(newX, xMin + 0.1, xMax - 0.1);

    // Don't let A and B overlap
    if (abs(newX - pointBx) > 0.2) {
      pointAx = newX;
    }
  }

  if (isDraggingB) {
    let newX = map(mouseX, graphLeft, graphRight, xMin, xMax);
    newX = constrain(newX, xMin + 0.1, xMax - 0.1);

    if (abs(newX - pointAx) > 0.2) {
      pointBx = newX;
    }
  }
}

function mouseReleased() {
  isDraggingA = false;
  isDraggingB = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateGraphBounds();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
