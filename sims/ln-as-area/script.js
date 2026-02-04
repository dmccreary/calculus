// ln(x) as Area Under 1/t MicroSim
// Visualize the natural logarithm as the area under the curve y = 1/x from 1 to a
// Bloom Level: Understand (L2), Verbs: interpret, explain, visualize
// Learning Objective: Students will interpret ln(x) as the accumulated area under y = 1/t from 1 to x

let canvasWidth = 750;
let drawHeight = 450;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 50;
let defaultTextSize = 16;

// Color scheme - purple theme
const PURPLE_THEME = [128, 0, 128];
const CURVE_COLOR = [50, 100, 200];      // Blue for 1/x curve
const AREA_COLOR = [102, 51, 153, 100];  // Semi-transparent purple for positive area
const AREA_NEGATIVE = [220, 100, 100, 100]; // Semi-transparent red for negative area
const LN_CURVE_COLOR = [0, 150, 80];     // Green for ln(x) overlay
const MARKER_COLOR = [255, 150, 50];     // Orange for special points

// Coordinate ranges
let xMin = 0.05;
let xMax = 10.5;
let yMin = -2;
let yMax = 4;

// State
let endpointA = 2.0;  // Variable endpoint for shaded region
let showLnOverlay = true;
let isAnimating = false;
let animationDirection = 1;
let animationSpeed = 0.02;

// Special values
const EULER_E = Math.E;

// Control positions
let sliderX, sliderY, sliderW;
let toggleBtnX, toggleBtnY;
let animateBtnX, animateBtnY;

// Dragging state
let isDraggingSlider = false;

// Graph dimensions (will be calculated)
let graphLeft, graphRight, graphTop, graphBottom;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();

  describe('Interactive visualization showing the natural logarithm ln(x) as the area under the curve y = 1/t from t = 1 to t = x. A slider controls the endpoint, and the shaded area equals ln(x).', LABEL);
}

function updateLayoutPositions() {
  // Slider position
  sliderX = 100;
  sliderY = drawHeight + 30;
  sliderW = canvasWidth * 0.45;

  // Toggle button position
  toggleBtnX = sliderX + sliderW + 40;
  toggleBtnY = drawHeight + 15;

  // Animate button position
  animateBtnX = toggleBtnX;
  animateBtnY = drawHeight + 60;

  // Graph dimensions
  graphLeft = margin + 50;
  graphRight = canvasWidth - margin - 20;
  graphTop = chartTop + 15;
  graphBottom = drawHeight - 20;
}

function draw() {
  updateCanvasSize();

  // Handle animation
  if (isAnimating) {
    endpointA += animationDirection * animationSpeed;
    if (endpointA >= 10) {
      endpointA = 10;
      animationDirection = -1;
    } else if (endpointA <= 0.1) {
      endpointA = 0.1;
      animationDirection = 1;
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

  // Draw the main graph
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
  textSize(20);
  text('The Natural Logarithm as Area', canvasWidth / 2, 5);
  textSize(14);
  fill(80);
  text('ln(a) = Area under y = 1/t from t = 1 to t = a', canvasWidth / 2, 28);
}

function drawGraph() {
  // Graph background
  fill(255, 255, 255, 200);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft - 5, graphTop - 5, graphRight - graphLeft + 10, graphBottom - graphTop + 10, 5);

  // Draw grid
  drawGrid();

  // Draw shaded area under 1/x from 1 to a
  drawShadedArea();

  // Draw y = 1/x curve
  drawOneOverX();

  // Draw ln(x) curve if toggle is on
  if (showLnOverlay) {
    drawLnCurve();
  }

  // Draw vertical markers at t = 1 and t = a
  drawMarkers();

  // Draw special point markers
  drawSpecialPoints();
}

function drawGrid() {
  stroke(235);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = 0; i <= 10; i++) {
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

  // Axes
  stroke(100);
  strokeWeight(1.5);

  // X-axis
  let y0 = mapY(0);
  if (y0 > graphTop && y0 < graphBottom) {
    line(graphLeft, y0, graphRight, y0);
    // Arrow
    fill(100);
    noStroke();
    triangle(graphRight, y0, graphRight - 8, y0 - 4, graphRight - 8, y0 + 4);
  }

  // Y-axis
  let x0 = mapX(0);
  stroke(100);
  strokeWeight(1.5);
  if (x0 > graphLeft && x0 < graphRight) {
    line(x0, graphBottom, x0, graphTop);
    // Arrow
    fill(100);
    noStroke();
    triangle(x0, graphTop, x0 - 4, graphTop + 8, x0 + 4, graphTop + 8);
  }

  // Axis labels
  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  for (let i = 1; i <= 10; i++) {
    let x = mapX(i);
    if (x > graphLeft + 10 && x < graphRight - 10) {
      text(i, x, y0 + 5);
    }
  }

  textAlign(RIGHT, CENTER);
  for (let i = Math.ceil(yMin); i <= yMax; i++) {
    if (i !== 0) {
      let y = mapY(i);
      if (y > graphTop + 10 && y < graphBottom - 10) {
        text(i, x0 - 5, y);
      }
    }
  }

  // Label axes
  fill(80);
  textSize(14);
  textAlign(CENTER, TOP);
  text('t', graphRight - 10, y0 + 15);
  textAlign(RIGHT, CENTER);
  text('y', x0 - 12, graphTop + 15);
}

function drawShadedArea() {
  // Draw shaded region under y = 1/t from t = 1 to t = a
  let start = Math.min(1, endpointA);
  let end = Math.max(1, endpointA);

  // Choose color based on whether area is positive or negative
  if (endpointA >= 1) {
    fill(AREA_COLOR[0], AREA_COLOR[1], AREA_COLOR[2], AREA_COLOR[3]);
  } else {
    fill(AREA_NEGATIVE[0], AREA_NEGATIVE[1], AREA_NEGATIVE[2], AREA_NEGATIVE[3]);
  }
  noStroke();

  // Draw filled region using vertex shape
  beginShape();
  // Start at bottom (y = 0) at t = start
  vertex(mapX(start), mapY(0));

  // Trace along the curve
  let numSteps = 100;
  for (let i = 0; i <= numSteps; i++) {
    let t = start + (end - start) * i / numSteps;
    if (t > 0.05) {  // Avoid division by very small numbers
      let y = 1 / t;
      vertex(mapX(t), mapY(Math.min(y, yMax)));
    }
  }

  // Close at bottom
  vertex(mapX(end), mapY(0));
  endShape(CLOSE);
}

function drawOneOverX() {
  // Draw y = 1/x curve
  stroke(CURVE_COLOR[0], CURVE_COLOR[1], CURVE_COLOR[2]);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let t = unmapX(px);
    if (t > 0.05) {
      let y = 1 / t;
      if (y < yMax + 1 && y > yMin - 1) {
        let py = mapY(y);
        if (py >= graphTop - 20 && py <= graphBottom + 20) {
          vertex(px, constrain(py, graphTop, graphBottom));
        }
      }
    }
  }
  endShape();

  // Label the curve
  fill(CURVE_COLOR[0], CURVE_COLOR[1], CURVE_COLOR[2]);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  let labelX = mapX(6);
  let labelY = mapY(1 / 6);
  text('y = 1/t', labelX + 10, labelY);
}

function drawLnCurve() {
  // Draw y = ln(x) curve
  stroke(LN_CURVE_COLOR[0], LN_CURVE_COLOR[1], LN_CURVE_COLOR[2]);
  strokeWeight(2.5);
  noFill();

  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let t = unmapX(px);
    if (t > 0.05) {
      let y = Math.log(t);
      if (y < yMax + 0.5 && y > yMin - 0.5) {
        let py = mapY(y);
        if (py >= graphTop - 10 && py <= graphBottom + 10) {
          vertex(px, constrain(py, graphTop, graphBottom));
        }
      }
    }
  }
  endShape();

  // Label the curve
  fill(LN_CURVE_COLOR[0], LN_CURVE_COLOR[1], LN_CURVE_COLOR[2]);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  let labelX = mapX(8);
  let labelY = mapY(Math.log(8));
  text('y = ln(t)', labelX + 10, labelY);
}

function drawMarkers() {
  let y0 = mapY(0);

  // Vertical line at t = 1 (starting point)
  stroke(100, 100, 100);
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  let x1 = mapX(1);
  line(x1, y0, x1, mapY(1));
  drawingContext.setLineDash([]);

  // Label t = 1
  fill(100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('t = 1', x1, y0 + 20);

  // Vertical line at t = a (endpoint)
  stroke(MARKER_COLOR[0], MARKER_COLOR[1], MARKER_COLOR[2]);
  strokeWeight(2);
  let xa = mapX(endpointA);
  let ya = endpointA > 0.05 ? 1 / endpointA : yMax;
  line(xa, y0, xa, mapY(Math.min(ya, yMax)));

  // Point on the curve at t = a
  fill(MARKER_COLOR[0], MARKER_COLOR[1], MARKER_COLOR[2]);
  stroke(255);
  strokeWeight(2);
  if (endpointA > 0.05 && ya < yMax) {
    circle(xa, mapY(ya), 10);
  }

  // Label t = a
  fill(MARKER_COLOR[0], MARKER_COLOR[1], MARKER_COLOR[2]);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('t = a', xa, y0 + 20);

  // Point on ln curve at x = a (if overlay is shown)
  if (showLnOverlay && endpointA > 0.05) {
    let lnA = Math.log(endpointA);
    if (lnA > yMin && lnA < yMax) {
      fill(LN_CURVE_COLOR[0], LN_CURVE_COLOR[1], LN_CURVE_COLOR[2]);
      stroke(255);
      strokeWeight(2);
      circle(xa, mapY(lnA), 10);
    }
  }
}

function drawSpecialPoints() {
  let y0 = mapY(0);

  // Mark special point: e (where ln(e) = 1)
  let xe = mapX(EULER_E);
  if (xe > graphLeft && xe < graphRight) {
    stroke(180, 100, 180);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(xe, graphBottom, xe, mapY(1 / EULER_E));
    drawingContext.setLineDash([]);

    fill(180, 100, 180);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('e', xe, graphBottom + 2);
  }
}

function drawInfoPanel() {
  // Info panel
  let panelX = graphLeft + 10;
  let panelY = graphTop + 10;
  let panelW = 170;
  let panelH = 95;

  fill(255, 255, 255, 245);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Endpoint: a = ' + endpointA.toFixed(2), panelX + 10, panelY + 10);

  // Calculate the actual area (which is ln(a))
  let lnA = Math.log(endpointA);

  // Show area
  textSize(13);
  if (endpointA >= 1) {
    fill(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
    text('Area = ln(a) = ' + lnA.toFixed(4), panelX + 10, panelY + 32);
  } else {
    fill(180, 60, 60);
    text('Area = ln(a) = ' + lnA.toFixed(4), panelX + 10, panelY + 32);
    textSize(10);
    fill(100);
    text('(negative when a < 1)', panelX + 10, panelY + 50);
  }

  // Special cases
  textSize(11);
  fill(100);
  let specialText = '';
  if (Math.abs(endpointA - 1) < 0.05) {
    specialText = 'a = 1: ln(1) = 0';
  } else if (Math.abs(endpointA - EULER_E) < 0.1) {
    specialText = 'a = e: ln(e) = 1';
  } else if (endpointA < 1) {
    specialText = 'a < 1: negative area';
  }
  if (specialText) {
    fill(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
    textSize(12);
    text(specialText, panelX + 10, panelY + 68);
  }
}

function drawControls() {
  // Slider label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('a = ' + endpointA.toFixed(2), 15, sliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 8, sliderW, 16, 8);

  // Slider fill
  let fillWidth = map(endpointA, 0.1, 10, 0, sliderW);
  fill(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
  noStroke();
  rect(sliderX, sliderY - 8, fillWidth, 16, 8, 0, 0, 8);

  // Slider handle
  let handleX = sliderX + fillWidth;
  fill(255);
  stroke(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
  strokeWeight(2);
  circle(handleX, sliderY, 22);

  fill(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2]);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(endpointA.toFixed(1), handleX, sliderY);

  // Mark special values on slider
  stroke(150);
  strokeWeight(1);
  let x1 = sliderX + map(1, 0.1, 10, 0, sliderW);
  line(x1, sliderY + 12, x1, sliderY + 18);
  fill(100);
  noStroke();
  textSize(9);
  textAlign(CENTER, TOP);
  text('1', x1, sliderY + 19);

  let xe = sliderX + map(EULER_E, 0.1, 10, 0, sliderW);
  stroke(150);
  strokeWeight(1);
  line(xe, sliderY + 12, xe, sliderY + 18);
  fill(100);
  noStroke();
  text('e', xe, sliderY + 19);

  // Show ln(x) toggle button
  let toggleW = 110;
  let toggleH = 32;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Show ln(x):', toggleBtnX, toggleBtnY + toggleH / 2);

  let btnX = toggleBtnX + 75;
  fill(showLnOverlay ? LN_CURVE_COLOR : [200, 200, 200]);
  stroke(showLnOverlay ? [0, 120, 60] : [180, 180, 180]);
  strokeWeight(1);
  rect(btnX, toggleBtnY, 50, toggleH, 6);

  fill(showLnOverlay ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(showLnOverlay ? 'ON' : 'OFF', btnX + 25, toggleBtnY + toggleH / 2);

  // Animate button
  let animBtnW = 90;
  let animBtnH = 32;

  fill(isAnimating ? '#ff9800' : '#4CAF50');
  stroke(isAnimating ? '#f57c00' : '#388E3C');
  strokeWeight(1);
  rect(animateBtnX, animateBtnY, animBtnW, animBtnH, 6);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(isAnimating ? 'Stop' : 'Animate', animateBtnX + animBtnW / 2, animateBtnY + animBtnH / 2);

  // Quick jump buttons
  let jumpY = drawHeight + 80;
  let jumpBtnW = 45;
  let jumpBtnH = 24;
  let jumpLabels = ['0.5', '1', 'e', '5', '10'];
  let jumpValues = [0.5, 1, EULER_E, 5, 10];

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Jump to:', 15, jumpY + jumpBtnH / 2);

  for (let i = 0; i < jumpLabels.length; i++) {
    let bx = 75 + i * (jumpBtnW + 5);
    fill(240);
    stroke(180);
    strokeWeight(1);
    rect(bx, jumpY, jumpBtnW, jumpBtnH, 4);

    fill(80);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(jumpLabels[i], bx + jumpBtnW / 2, jumpY + jumpBtnH / 2);
  }

  // Explanation text
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Key insight: The natural logarithm ln(a) equals the area under y = 1/t from t = 1 to t = a', sliderX + sliderW + 155, drawHeight + 95);
}

// Coordinate mapping functions
function mapX(val) {
  return map(val, xMin, xMax, graphLeft, graphRight);
}

function mapY(val) {
  return map(val, yMin, yMax, graphBottom, graphTop);
}

function unmapX(px) {
  return map(px, graphLeft, graphRight, xMin, xMax);
}

function unmapY(py) {
  return map(py, graphBottom, graphTop, yMin, yMax);
}

function mousePressed() {
  // Check slider handle
  let handleX = sliderX + map(endpointA, 0.1, 10, 0, sliderW);
  if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check slider track
  if (mouseY > sliderY - 15 && mouseY < sliderY + 15 &&
      mouseX > sliderX && mouseX < sliderX + sliderW) {
    endpointA = map(mouseX, sliderX, sliderX + sliderW, 0.1, 10);
    endpointA = constrain(endpointA, 0.1, 10);
    isDraggingSlider = true;
    return;
  }

  // Check toggle button
  let btnX = toggleBtnX + 75;
  if (mouseX >= btnX && mouseX <= btnX + 50 &&
      mouseY >= toggleBtnY && mouseY <= toggleBtnY + 32) {
    showLnOverlay = !showLnOverlay;
    return;
  }

  // Check animate button
  if (mouseX >= animateBtnX && mouseX <= animateBtnX + 90 &&
      mouseY >= animateBtnY && mouseY <= animateBtnY + 32) {
    isAnimating = !isAnimating;
    return;
  }

  // Check quick jump buttons
  let jumpY = drawHeight + 80;
  let jumpBtnW = 45;
  let jumpBtnH = 24;
  let jumpValues = [0.5, 1, EULER_E, 5, 10];

  for (let i = 0; i < jumpValues.length; i++) {
    let bx = 75 + i * (jumpBtnW + 5);
    if (mouseX >= bx && mouseX <= bx + jumpBtnW &&
        mouseY >= jumpY && mouseY <= jumpY + jumpBtnH) {
      endpointA = jumpValues[i];
      isAnimating = false;
      return;
    }
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    endpointA = map(mouseX, sliderX, sliderX + sliderW, 0.1, 10);
    endpointA = constrain(endpointA, 0.1, 10);
    endpointA = Math.round(endpointA * 100) / 100;
    isAnimating = false;  // Stop animation when manually dragging
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
  canvasWidth = max(canvasWidth, 600);  // Minimum width
  updateLayoutPositions();
}
