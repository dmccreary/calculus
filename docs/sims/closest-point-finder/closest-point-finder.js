// Closest Point Finder MicroSim
// Shows the minimum distance from a point to various curves
// Bloom Level: Analyze (L4), Verb: Compare
// Learning Objective: Students will compare distances from various points on a curve
// to a fixed point, understanding why the minimum distance occurs where the connecting
// line is perpendicular to the tangent.
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 650;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 50;
let defaultTextSize = 16;

// Graph region
let graphLeft, graphRight, graphTop, graphBottom;
let graphWidth, graphHeight;

// Coordinate ranges
let xMin = -4, xMax = 4;
let yMin = -3, yMax = 5;

// State
let targetX = 1;
let targetY = 3;
let curveParam = 0; // Parameter along curve (slider controlled)
let currentCurve = 0; // 0=parabola, 1=cubic, 2=circle, 3=sine
let showPerpendicular = false;
let minDistance = null;
let minParam = null;
let isDraggingTarget = false;
let isDraggingSlider = false;

// Distance history for trace
let distanceHistory = [];
let maxHistoryPoints = 200;

// Curve definitions
const curves = [
  { name: 'y = x\u00B2', paramMin: -2.5, paramMax: 2.5 },
  { name: 'y = x\u00B3', paramMin: -1.8, paramMax: 1.8 },
  { name: 'x\u00B2+y\u00B2=4', paramMin: 0, paramMax: 2 * Math.PI },
  { name: 'y = sin(x)', paramMin: -3.5, paramMax: 3.5 }
];

// Control positions
let sliderX, sliderY, sliderW;
let findBtnX, findBtnY;
let curveBtnX, curveBtnY, curveBtnW;
let toggleX, toggleY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();
  curveParam = 0;
  computeDistanceHistory();

  describe('Interactive visualization showing the closest point on a curve to a draggable target point. Demonstrates that at minimum distance, the connecting line is perpendicular to the tangent.', LABEL);
}

function updateLayoutPositions() {
  // Graph region
  graphLeft = margin + 45;
  graphRight = canvasWidth * 0.65;
  graphTop = chartTop + 10;
  graphBottom = drawHeight - 25;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;

  // Controls - Row 1
  sliderX = 70;
  sliderY = drawHeight + 22;
  sliderW = canvasWidth * 0.35;

  findBtnX = sliderX + sliderW + 20;
  findBtnY = drawHeight + 10;

  // Controls - Row 2
  curveBtnX = 10;
  curveBtnY = drawHeight + 50;
  curveBtnW = 75;

  toggleX = curveBtnX + 4 * (curveBtnW + 5) + 20;
  toggleY = drawHeight + 50;
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

  // Draw graph
  drawGraph();

  // Draw info panel
  drawInfoPanel();

  // Draw distance trace panel
  drawDistanceTrace();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Closest Point Finder', canvasWidth * 0.4, 5);
  textSize(13);
  fill(80);
  text('Finding minimum distance from a point to a curve', canvasWidth * 0.4, 26);
}

function drawGraph() {
  // Graph background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft - 5, graphTop - 5, graphWidth + 10, graphHeight + 10, 5);

  // Grid
  stroke(235);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let x = mapX(i);
    if (x >= graphLeft && x <= graphRight) {
      line(x, graphTop, x, graphBottom);
    }
  }

  // Horizontal grid lines
  for (let i = Math.ceil(yMin); i <= yMax; i++) {
    let y = mapY(i);
    if (y >= graphTop && y <= graphBottom) {
      line(graphLeft, y, graphRight, y);
    }
  }

  // Axes
  stroke(100);
  strokeWeight(1.5);

  // X-axis
  let y0 = mapY(0);
  if (y0 >= graphTop && y0 <= graphBottom) {
    line(graphLeft, y0, graphRight, y0);
    // X-axis label
    fill(80);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('x', graphRight - 5, y0 + 3);
  }

  // Y-axis
  let x0 = mapX(0);
  if (x0 >= graphLeft && x0 <= graphRight) {
    stroke(100);
    strokeWeight(1.5);
    line(x0, graphTop, x0, graphBottom);
    // Y-axis label
    fill(80);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('y', x0 + 5, graphTop + 5);
  }

  // Axis tick labels
  fill(100);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    if (i !== 0) {
      let x = mapX(i);
      if (x >= graphLeft + 10 && x <= graphRight - 10) {
        text(i, x, mapY(0) + 3);
      }
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = Math.ceil(yMin); i <= yMax; i++) {
    if (i !== 0) {
      let y = mapY(i);
      if (y >= graphTop + 10 && y <= graphBottom - 10) {
        text(i, mapX(0) - 5, y);
      }
    }
  }

  // Draw curve
  stroke(50, 100, 200);
  strokeWeight(2.5);
  noFill();
  beginShape();
  let steps = 200;
  let pMin = curves[currentCurve].paramMin;
  let pMax = curves[currentCurve].paramMax;
  for (let i = 0; i <= steps; i++) {
    let t = map(i, 0, steps, pMin, pMax);
    let pt = getCurvePoint(t);
    let px = mapX(pt.x);
    let py = mapY(pt.y);
    if (px >= graphLeft - 10 && px <= graphRight + 10 &&
        py >= graphTop - 10 && py <= graphBottom + 10) {
      vertex(px, py);
    }
  }
  endShape();

  // Draw target point
  let tpx = mapX(targetX);
  let tpy = mapY(targetY);
  fill(200, 50, 50);
  stroke(255);
  strokeWeight(2);
  circle(tpx, tpy, 16);

  // Label target point
  fill(200, 50, 50);
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Target', tpx + 12, tpy);

  // Get current point on curve
  let curvePoint = getCurvePoint(curveParam);
  let cpx = mapX(curvePoint.x);
  let cpy = mapY(curvePoint.y);

  // Draw distance line
  stroke(100, 150, 100);
  strokeWeight(2);
  line(tpx, tpy, cpx, cpy);

  // Draw point on curve
  fill(0, 150, 80);
  stroke(255);
  strokeWeight(2);
  circle(cpx, cpy, 14);

  // Draw perpendicular verification if enabled
  if (showPerpendicular) {
    drawPerpendicularCheck(curvePoint, cpx, cpy);
  }

  // Draw minimum distance indicator if found
  if (minDistance !== null && minParam !== null) {
    let minPoint = getCurvePoint(minParam);
    let mpx = mapX(minPoint.x);
    let mpy = mapY(minPoint.y);

    // Draw minimum distance line
    stroke(255, 150, 0);
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    line(tpx, tpy, mpx, mpy);
    drawingContext.setLineDash([]);

    // Draw minimum point marker
    fill(255, 150, 0);
    stroke(255);
    strokeWeight(2);
    circle(mpx, mpy, 10);

    // Label
    noStroke();
    textSize(10);
    fill(255, 150, 0);
    textAlign(LEFT, CENTER);
    text('Min', mpx + 8, mpy - 8);
  }
}

function drawPerpendicularCheck(curvePoint, cpx, cpy) {
  // Get tangent slope at current point
  let tangentSlope = getTangentSlope(curveParam);

  // Scale factors: pixels per math unit
  let scaleX = graphWidth / (xMax - xMin);
  let scaleY = graphHeight / (yMax - yMin);

  // Compute tangent direction in pixel space
  let tangentLength = 60;
  let tdx, tdy;

  if (!isFinite(tangentSlope) || Math.abs(tangentSlope) > 100) {
    // Vertical tangent
    tdx = 0;
    tdy = -tangentLength;
  } else {
    // Math-space direction (1, slope) -> pixel-space direction (scaleX, -slope * scaleY)
    let pxDx = scaleX;
    let pxDy = -tangentSlope * scaleY;
    let len = sqrt(pxDx * pxDx + pxDy * pxDy);
    tdx = tangentLength * pxDx / len;
    tdy = tangentLength * pxDy / len;
  }

  stroke(150, 100, 200);
  strokeWeight(4);
  line(cpx - tdx, cpy - tdy, cpx + tdx, cpy + tdy);

  // Calculate angle between connecting line and tangent
  let connectSlope = (targetY - curvePoint.y) / (targetX - curvePoint.x);

  // Check perpendicularity: slopes multiply to -1 (or one is vertical and other horizontal)
  let product = tangentSlope * connectSlope;
  let isPerpendicular = Math.abs(product + 1) < 0.15;

  // Draw perpendicular indicator
  if (isPerpendicular) {
    // Draw small square to indicate perpendicular
    let sqSize = 8;
    stroke(100, 200, 100);
    strokeWeight(1.5);
    noFill();
    push();
    translate(cpx, cpy);
    let angle = atan2(-(targetY - curvePoint.y) * scaleY, (targetX - curvePoint.x) * scaleX);
    rotate(angle);
    rect(0, 0, sqSize, sqSize);
    pop();
  }
}

function drawInfoPanel() {
  let boxX = canvasWidth * 0.66;
  let boxY = chartTop + 10;
  let boxW = canvasWidth - boxX - margin;
  let boxH = 145;

  fill(255, 255, 255, 245);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  let curvePoint = getCurvePoint(curveParam);
  let dist = distance(targetX, targetY, curvePoint.x, curvePoint.y);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  let y = boxY + 8;
  let lineHeight = 18;

  // Current curve
  fill(50, 100, 200);
  textSize(13);
  text('Curve: ' + curves[currentCurve].name, boxX + 8, y);
  y += lineHeight + 4;

  // Target point
  fill(200, 50, 50);
  textSize(11);
  text('Target: (' + targetX.toFixed(2) + ', ' + targetY.toFixed(2) + ')', boxX + 8, y);
  y += lineHeight;

  // Point on curve
  fill(0, 150, 80);
  text('Curve pt: (' + curvePoint.x.toFixed(2) + ', ' + curvePoint.y.toFixed(2) + ')', boxX + 8, y);
  y += lineHeight;

  // Current distance
  fill('black');
  text('Distance: ' + dist.toFixed(3), boxX + 8, y);
  y += lineHeight;

  // Minimum distance
  if (minDistance !== null) {
    fill(255, 150, 0);
    text('Min dist: ' + minDistance.toFixed(3), boxX + 8, y);
    y += lineHeight;
  }

  // Perpendicular check
  if (showPerpendicular) {
    y += 4;
    let tangentSlope = getTangentSlope(curveParam);
    let connectSlope = (targetY - curvePoint.y) / (targetX - curvePoint.x);

    fill(80);
    textSize(10);
    text('Tangent slope: ' + (isFinite(tangentSlope) ? tangentSlope.toFixed(2) : '\u221E'), boxX + 8, y);
    y += 14;
    text('Connect slope: ' + (isFinite(connectSlope) ? connectSlope.toFixed(2) : '\u221E'), boxX + 8, y);
    y += 14;

    let product = tangentSlope * connectSlope;
    let isPerpendicular = Math.abs(product + 1) < 0.15;
    fill(isPerpendicular ? [0, 150, 80] : [100, 100, 100]);
    text('Product: ' + (isFinite(product) ? product.toFixed(2) : 'N/A') +
         (isPerpendicular ? ' \u2248 -1 (Perp!)' : ''), boxX + 8, y);
  }
}

function drawDistanceTrace() {
  let traceX = canvasWidth * 0.66;
  let traceY = chartTop + 165;
  let traceW = canvasWidth - traceX - margin;
  let traceH = drawHeight - traceY - 10;

  // Background
  fill(255, 255, 255, 245);
  stroke(200);
  strokeWeight(1);
  rect(traceX, traceY, traceW, traceH, 6);

  // Title
  fill(80);
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  text('Distance vs Parameter', traceX + traceW/2, traceY + 5);

  // Draw trace
  if (distanceHistory.length > 1) {
    let plotLeft = traceX + 25;
    let plotRight = traceX + traceW - 8;
    let plotTop = traceY + 22;
    let plotBottom = traceY + traceH - 15;

    // Find range for scaling
    let maxDist = Math.max(...distanceHistory.map(d => d.dist));
    let minDist = Math.min(...distanceHistory.map(d => d.dist));
    let range = maxDist - minDist;
    if (range < 0.1) range = 0.1;

    // Draw axis labels
    fill(100);
    textSize(8);
    textAlign(RIGHT, CENTER);
    text(maxDist.toFixed(1), plotLeft - 3, plotTop);
    text(minDist.toFixed(1), plotLeft - 3, plotBottom);

    // Draw trace line
    stroke(100, 150, 200);
    strokeWeight(1.5);
    noFill();
    beginShape();
    for (let i = 0; i < distanceHistory.length; i++) {
      let px = map(i, 0, distanceHistory.length - 1, plotLeft, plotRight);
      let py = map(distanceHistory[i].dist, minDist, maxDist, plotBottom, plotTop);
      vertex(px, py);
    }
    endShape();

    // Mark current position
    let pMin = curves[currentCurve].paramMin;
    let pMax = curves[currentCurve].paramMax;
    let currIdx = map(curveParam, pMin, pMax, 0, distanceHistory.length - 1);
    let currPx = map(currIdx, 0, distanceHistory.length - 1, plotLeft, plotRight);
    let curvePoint = getCurvePoint(curveParam);
    let currDist = distance(targetX, targetY, curvePoint.x, curvePoint.y);
    let currPy = map(currDist, minDist, maxDist, plotBottom, plotTop);

    fill(0, 150, 80);
    noStroke();
    circle(currPx, currPy, 8);

    // Mark minimum
    if (minParam !== null) {
      let minIdx = map(minParam, pMin, pMax, 0, distanceHistory.length - 1);
      let minPx = map(minIdx, 0, distanceHistory.length - 1, plotLeft, plotRight);
      let minPy = map(minDistance, minDist, maxDist, plotBottom, plotTop);

      fill(255, 150, 0);
      noStroke();
      circle(minPx, minPy, 8);
    }
  }
}

function drawControls() {
  // Row 1: X parameter slider and Find Minimum button
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('t = ' + curveParam.toFixed(2), 10, sliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 5, sliderW, 10, 5);

  // Slider handle
  let pMin = curves[currentCurve].paramMin;
  let pMax = curves[currentCurve].paramMax;
  let handleX = map(curveParam, pMin, pMax, sliderX, sliderX + sliderW);
  fill(isDraggingSlider ? '#006633' : '#00aa55');
  noStroke();
  circle(handleX, sliderY, 18);

  // Find Minimum button
  let btnW = 100;
  let btnH = 28;
  let isHover = mouseX >= findBtnX && mouseX <= findBtnX + btnW &&
                mouseY >= findBtnY && mouseY <= findBtnY + btnH;

  fill(isHover ? '#0066cc' : '#0088ff');
  stroke(isHover ? '#004499' : '#0066cc');
  strokeWeight(1);
  rect(findBtnX, findBtnY, btnW, btnH, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Find Minimum', findBtnX + btnW/2, findBtnY + btnH/2);

  // Row 2: Curve selector buttons
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);

  for (let i = 0; i < 4; i++) {
    let bx = curveBtnX + i * (curveBtnW + 5);
    let isSelected = currentCurve === i;
    let isHover2 = mouseX >= bx && mouseX <= bx + curveBtnW &&
                  mouseY >= curveBtnY && mouseY <= curveBtnY + 24;

    fill(isSelected ? '#4CAF50' : (isHover2 ? '#e8e8e8' : '#f0f0f0'));
    stroke(isSelected ? '#388E3C' : '#bdbdbd');
    strokeWeight(1);
    rect(bx, curveBtnY, curveBtnW, 24, 4);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(curves[i].name, bx + curveBtnW/2, curveBtnY + 12);
  }

  // Show Tangent & Perpendicular Check toggle
  let toggleW = 210;
  let toggleH = 24;

  fill(showPerpendicular ? '#4CAF50' : '#e0e0e0');
  stroke(showPerpendicular ? '#388E3C' : '#bdbdbd');
  strokeWeight(1);
  rect(toggleX, toggleY, toggleW, toggleH, 4);

  fill(showPerpendicular ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Show Tangent & Perpendicular: ' + (showPerpendicular ? 'ON' : 'OFF'), toggleX + toggleW/2, toggleY + toggleH/2);
}

// Curve functions
function getCurvePoint(t) {
  switch (currentCurve) {
    case 0: // y = x^2
      return { x: t, y: t * t };
    case 1: // y = x^3
      return { x: t, y: t * t * t };
    case 2: // circle x^2 + y^2 = 4
      return { x: 2 * cos(t), y: 2 * sin(t) };
    case 3: // y = sin(x)
      return { x: t, y: sin(t) };
    default:
      return { x: 0, y: 0 };
  }
}

function getTangentSlope(t) {
  // dy/dx for each curve
  switch (currentCurve) {
    case 0: // y = x^2, dy/dx = 2x
      return 2 * t;
    case 1: // y = x^3, dy/dx = 3x^2
      return 3 * t * t;
    case 2: // circle: dx/dt = -2sin(t), dy/dt = 2cos(t), dy/dx = -cos(t)/sin(t)
      if (Math.abs(sin(t)) < 0.01) return Infinity;
      return -cos(t) / sin(t);
    case 3: // y = sin(x), dy/dx = cos(x)
      return cos(t);
    default:
      return 0;
  }
}

function distance(x1, y1, x2, y2) {
  return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function findMinimumDistance() {
  let pMin = curves[currentCurve].paramMin;
  let pMax = curves[currentCurve].paramMax;
  let bestT = pMin;
  let bestDist = Infinity;

  // Coarse search
  let steps = 1000;
  for (let i = 0; i <= steps; i++) {
    let t = map(i, 0, steps, pMin, pMax);
    let pt = getCurvePoint(t);
    let d = distance(targetX, targetY, pt.x, pt.y);
    if (d < bestDist) {
      bestDist = d;
      bestT = t;
    }
  }

  // Fine search around best point
  let searchRadius = (pMax - pMin) / 100;
  let fineSteps = 200;
  for (let i = 0; i <= fineSteps; i++) {
    let t = map(i, 0, fineSteps, bestT - searchRadius, bestT + searchRadius);
    t = constrain(t, pMin, pMax);
    let pt = getCurvePoint(t);
    let d = distance(targetX, targetY, pt.x, pt.y);
    if (d < bestDist) {
      bestDist = d;
      bestT = t;
    }
  }

  minDistance = bestDist;
  minParam = bestT;
  curveParam = bestT;
}

function computeDistanceHistory() {
  distanceHistory = [];
  let pMin = curves[currentCurve].paramMin;
  let pMax = curves[currentCurve].paramMax;

  for (let i = 0; i < maxHistoryPoints; i++) {
    let t = map(i, 0, maxHistoryPoints - 1, pMin, pMax);
    let pt = getCurvePoint(t);
    let d = distance(targetX, targetY, pt.x, pt.y);
    distanceHistory.push({ t: t, dist: d });
  }
}

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
  // Check target point drag
  let tpx = mapX(targetX);
  let tpy = mapY(targetY);
  if (dist(mouseX, mouseY, tpx, tpy) < 15) {
    isDraggingTarget = true;
    return;
  }

  // Check slider
  let pMin = curves[currentCurve].paramMin;
  let pMax = curves[currentCurve].paramMax;
  let handleX = map(curveParam, pMin, pMax, sliderX, sliderX + sliderW);
  if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check slider track click
  if (mouseY > sliderY - 10 && mouseY < sliderY + 10 &&
      mouseX > sliderX && mouseX < sliderX + sliderW) {
    curveParam = map(mouseX, sliderX, sliderX + sliderW, pMin, pMax);
    curveParam = constrain(curveParam, pMin, pMax);
    isDraggingSlider = true;
    return;
  }

  // Check Find Minimum button
  let btnW = 100;
  let btnH = 28;
  if (mouseX >= findBtnX && mouseX <= findBtnX + btnW &&
      mouseY >= findBtnY && mouseY <= findBtnY + btnH) {
    findMinimumDistance();
    return;
  }

  // Check curve selector buttons
  for (let i = 0; i < 4; i++) {
    let bx = curveBtnX + i * (curveBtnW + 5);
    if (mouseX >= bx && mouseX <= bx + curveBtnW &&
        mouseY >= curveBtnY && mouseY <= curveBtnY + 24) {
      currentCurve = i;
      curveParam = 0;
      minDistance = null;
      minParam = null;
      computeDistanceHistory();
      return;
    }
  }

  // Check perpendicular toggle
  let toggleW = 210;
  let toggleH = 24;
  if (mouseX >= toggleX && mouseX <= toggleX + toggleW &&
      mouseY >= toggleY && mouseY <= toggleY + toggleH) {
    showPerpendicular = !showPerpendicular;
    return;
  }
}

function mouseDragged() {
  if (isDraggingTarget) {
    targetX = constrain(unmapX(mouseX), xMin + 0.5, xMax - 0.5);
    targetY = constrain(unmapY(mouseY), yMin + 0.5, yMax - 0.5);
    findMinimumDistance();
    computeDistanceHistory();
  }

  if (isDraggingSlider) {
    let pMin = curves[currentCurve].paramMin;
    let pMax = curves[currentCurve].paramMax;
    curveParam = map(mouseX, sliderX, sliderX + sliderW, pMin, pMax);
    curveParam = constrain(curveParam, pMin, pMax);
  }
}

function mouseReleased() {
  isDraggingTarget = false;
  isDraggingSlider = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayoutPositions();
  computeDistanceHistory();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = Math.max(canvasWidth, 500); // Minimum width
  updateLayoutPositions();
}
