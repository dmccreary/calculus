// Sketch from Derivative Info MicroSim
// Students construct function graphs given only derivative information
// Bloom Level: Create (L6) - Construct
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Graph area dimensions
let graphLeft = 60;
let graphRight;
let graphTop = 80;
let graphBottom;
let graphWidth;
let graphHeight;

// Coordinate system
let xMin = -5;
let xMax = 5;
let yMin = -4;
let yMax = 4;

// Drawing state
let isDrawing = false;
let userPoints = [];
let smoothedCurve = [];

// Problem state
let currentProblem = 0;
let showSolution = false;
let showHint = false;
let hintIndex = 0;
let feedbackText = [];
let checkedResults = null;

// Button definitions (canvas-based)
let buttons = [];

// Problem definitions
const problems = [
  {
    title: "Problem 1: Local Maximum",
    conditions: [
      "f(0) = 2 (passes through point)",
      "f'(x) > 0 for x < 1 (increasing)",
      "f'(x) < 0 for x > 1 (decreasing)",
      "f'(1) = 0 (critical point)",
      "f''(x) < 0 (concave down)"
    ],
    hints: [
      { type: "point", x: 0, y: 2, label: "Start at (0, 2)" },
      { type: "tangent", x: 1, slope: 0, label: "Horizontal tangent at x = 1" },
      { type: "arrow", x: -2, direction: "up", label: "Increasing here" },
      { type: "arrow", x: 3, direction: "down", label: "Decreasing here" }
    ],
    checkPoints: [
      { x: 0, y: 2, tolerance: 0.5, desc: "passes through (0, 2)" },
    ],
    checkIntervals: [
      { start: -4, end: 0.8, increasing: true, desc: "increasing for x < 1" },
      { start: 1.2, end: 4, increasing: false, desc: "decreasing for x > 1" }
    ],
    checkCritical: [{ x: 1, type: "max", tolerance: 0.3, desc: "maximum near x = 1" }],
    checkConcavity: [{ start: -4, end: 4, concaveUp: false, desc: "concave down everywhere" }],
    solutionFunc: (x) => -(x - 1) * (x - 1) + 3
  },
  {
    title: "Problem 2: Two Extrema",
    conditions: [
      "f(-1) is a local minimum",
      "f(2) is a local maximum",
      "f'(x) < 0 for x < -1 (decreasing)",
      "f'(x) > 0 for -1 < x < 2 (increasing)",
      "f'(x) < 0 for x > 2 (decreasing)",
      "Concavity changes between extrema"
    ],
    hints: [
      { type: "tangent", x: -1, slope: 0, label: "Horizontal at x = -1 (min)" },
      { type: "tangent", x: 2, slope: 0, label: "Horizontal at x = 2 (max)" },
      { type: "arrow", x: -3, direction: "down", label: "Decreasing here" },
      { type: "inflection", x: 0.5, label: "Inflection point nearby" }
    ],
    checkPoints: [],
    checkIntervals: [
      { start: -4, end: -1.3, increasing: false, desc: "decreasing for x < -1" },
      { start: -0.7, end: 1.7, increasing: true, desc: "increasing for -1 < x < 2" },
      { start: 2.3, end: 4, increasing: false, desc: "decreasing for x > 2" }
    ],
    checkCritical: [
      { x: -1, type: "min", tolerance: 0.4, desc: "minimum near x = -1" },
      { x: 2, type: "max", tolerance: 0.4, desc: "maximum near x = 2" }
    ],
    checkConcavity: [],
    solutionFunc: (x) => -0.2 * (x + 1) * (x + 1) * (x - 2) + 1
  },
  {
    title: "Problem 3: Inflection Point",
    conditions: [
      "f(0) = 0 (passes through origin)",
      "f'(x) > 0 for all x (always increasing)",
      "f''(x) < 0 for x < 0 (concave down)",
      "f''(x) > 0 for x > 0 (concave up)",
      "Inflection point at x = 0"
    ],
    hints: [
      { type: "point", x: 0, y: 0, label: "Passes through origin" },
      { type: "arrow", x: -3, direction: "up", label: "Still increasing (slower)" },
      { type: "arrow", x: 3, direction: "up", label: "Increasing (faster)" },
      { type: "inflection", x: 0, label: "Inflection at x = 0" }
    ],
    checkPoints: [
      { x: 0, y: 0, tolerance: 0.5, desc: "passes through origin" }
    ],
    checkIntervals: [
      { start: -4, end: -0.5, increasing: true, desc: "increasing for x < 0" },
      { start: 0.5, end: 4, increasing: true, desc: "increasing for x > 0" }
    ],
    checkCritical: [],
    checkConcavity: [
      { start: -4, end: -0.5, concaveUp: false, desc: "concave down for x < 0" },
      { start: 0.5, end: 4, concaveUp: true, desc: "concave up for x > 0" }
    ],
    solutionFunc: (x) => 0.15 * x * x * x
  },
  {
    title: "Problem 4: S-Curve",
    conditions: [
      "f(-2) = -1 and f(2) = 1",
      "f'(x) > 0 for all x (always increasing)",
      "f''(x) > 0 for x < 0 (concave up)",
      "f''(x) < 0 for x > 0 (concave down)",
      "Steepest slope at x = 0"
    ],
    hints: [
      { type: "point", x: -2, y: -1, label: "Point at (-2, -1)" },
      { type: "point", x: 2, y: 1, label: "Point at (2, 1)" },
      { type: "tangent", x: 0, slope: 1.5, label: "Steepest at x = 0" },
      { type: "inflection", x: 0, label: "Inflection at x = 0" }
    ],
    checkPoints: [
      { x: -2, y: -1, tolerance: 0.6, desc: "passes near (-2, -1)" },
      { x: 2, y: 1, tolerance: 0.6, desc: "passes near (2, 1)" }
    ],
    checkIntervals: [
      { start: -4, end: 4, increasing: true, desc: "always increasing" }
    ],
    checkCritical: [],
    checkConcavity: [
      { start: -4, end: -0.5, concaveUp: true, desc: "concave up for x < 0" },
      { start: 0.5, end: 4, concaveUp: false, desc: "concave down for x > 0" }
    ],
    solutionFunc: (x) => 2 / (1 + Math.exp(-1.5 * x)) - 1
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Calculate graph dimensions
  updateGraphDimensions();

  // Define buttons (canvas-based)
  setupButtons();

  describe('Interactive sketch-from-derivative-info simulation where students construct function graphs from derivative conditions', LABEL);
}

function setupButtons() {
  buttons = [
    { label: "Clear", x: 10, y: drawHeight + 12, w: 60, h: 28, action: clearDrawing },
    { label: "Check", x: 80, y: drawHeight + 12, w: 60, h: 28, action: checkSketch },
    { label: "Hint", x: 150, y: drawHeight + 12, w: 50, h: 28, action: showNextHint },
    { label: "Solution", x: 210, y: drawHeight + 12, w: 70, h: 28, action: toggleSolution },
    { label: "New", x: 290, y: drawHeight + 12, w: 50, h: 28, action: newProblem }
  ];
}

function updateGraphDimensions() {
  graphRight = canvasWidth - 30;
  graphBottom = drawHeight - 30;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;
}

function draw() {
  updateCanvasSize();
  updateGraphDimensions();

  // Draw background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Sketch from Derivative Info', canvasWidth / 2, 8);

  // Problem title
  textSize(14);
  fill('#2196F3');
  text(problems[currentProblem].title, canvasWidth / 2, 30);

  // Draw conditions panel
  drawConditionsPanel();

  // Draw graph area
  drawGraphArea();

  // Draw user curve
  drawUserCurve();

  // Draw solution if shown
  if (showSolution) {
    drawSolution();
  }

  // Draw hints if shown
  if (showHint) {
    drawHints();
  }

  // Draw feedback
  drawFeedback();

  // Draw buttons
  drawButtons();
}

function drawConditionsPanel() {
  let problem = problems[currentProblem];
  let panelX = 10;
  let panelY = 52;
  let panelWidth = canvasWidth - 20;
  let lineHeight = 14;
  let panelHeight = problem.conditions.length * lineHeight + 10;

  // Panel background
  fill(255, 255, 255, 220);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 5);

  // Conditions text
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  for (let i = 0; i < problem.conditions.length; i++) {
    text("• " + problem.conditions[i], panelX + 8, panelY + 5 + i * lineHeight);
  }
}

function drawGraphArea() {
  // Graph background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft, graphTop, graphWidth, graphHeight);

  // Grid lines
  stroke(230);
  strokeWeight(1);

  // Vertical grid lines
  for (let x = xMin; x <= xMax; x++) {
    let px = mapX(x);
    line(px, graphTop, px, graphBottom);
  }

  // Horizontal grid lines
  for (let y = yMin; y <= yMax; y++) {
    let py = mapY(y);
    line(graphLeft, py, graphRight, py);
  }

  // Axes
  stroke(100);
  strokeWeight(2);

  // X-axis
  let yAxis = mapY(0);
  if (yAxis >= graphTop && yAxis <= graphBottom) {
    line(graphLeft, yAxis, graphRight, yAxis);
  }

  // Y-axis
  let xAxis = mapX(0);
  if (xAxis >= graphLeft && xAxis <= graphRight) {
    line(xAxis, graphTop, xAxis, graphBottom);
  }

  // Axis labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);

  // X-axis labels
  for (let x = xMin; x <= xMax; x++) {
    if (x !== 0) {
      let px = mapX(x);
      text(x, px, graphBottom + 3);
    }
  }

  // Y-axis labels
  textAlign(RIGHT, CENTER);
  for (let y = yMin; y <= yMax; y++) {
    if (y !== 0) {
      let py = mapY(y);
      text(y, graphLeft - 5, py);
    }
  }

  // Origin label
  textAlign(RIGHT, TOP);
  text("0", mapX(0) - 3, mapY(0) + 3);

  // Axis titles
  textSize(12);
  textAlign(CENTER, TOP);
  text("x", graphRight + 15, mapY(0) - 5);
  textAlign(RIGHT, CENTER);
  text("y", mapX(0) - 5, graphTop - 10);
}

function drawUserCurve() {
  if (smoothedCurve.length < 2) return;

  stroke('#E91E63');
  strokeWeight(3);
  noFill();

  beginShape();
  for (let pt of smoothedCurve) {
    // Clip to graph area
    if (pt.px >= graphLeft && pt.px <= graphRight &&
        pt.py >= graphTop && pt.py <= graphBottom) {
      vertex(pt.px, pt.py);
    }
  }
  endShape();
}

function drawSolution() {
  let problem = problems[currentProblem];

  stroke('#4CAF50');
  strokeWeight(2);
  noFill();

  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let x = unmapX(px);
    let y = problem.solutionFunc(x);
    let py = mapY(y);

    if (py >= graphTop && py <= graphBottom) {
      vertex(px, py);
    }
  }
  endShape();

  // Legend
  fill('#4CAF50');
  noStroke();
  textSize(10);
  textAlign(LEFT, TOP);
  text("Green = Valid Solution", graphLeft + 5, graphTop + 5);
}

function drawHints() {
  let problem = problems[currentProblem];

  for (let i = 0; i <= hintIndex && i < problem.hints.length; i++) {
    let hint = problem.hints[i];

    if (hint.type === "point") {
      let px = mapX(hint.x);
      let py = mapY(hint.y);

      fill('#FF9800');
      stroke('#FF5722');
      strokeWeight(2);
      circle(px, py, 12);

      fill('#FF5722');
      noStroke();
      textSize(10);
      textAlign(LEFT, BOTTOM);
      text(hint.label, px + 8, py - 5);
    }
    else if (hint.type === "tangent") {
      let px = mapX(hint.x);
      let py = mapY(problems[currentProblem].solutionFunc(hint.x));

      stroke('#9C27B0');
      strokeWeight(2);

      let len = 40;
      let dx = len;
      let dy = -hint.slope * (len / (graphWidth / (xMax - xMin)));

      line(px - dx, py - dy, px + dx, py + dy);

      fill('#9C27B0');
      noStroke();
      textSize(10);
      textAlign(LEFT, TOP);
      text(hint.label, px + 8, py + 8);
    }
    else if (hint.type === "arrow") {
      let px = mapX(hint.x);
      let py = mapY(0);

      stroke('#2196F3');
      strokeWeight(2);

      let arrowLen = 30;
      let dir = hint.direction === "up" ? -1 : 1;

      line(px, py, px, py + dir * arrowLen);
      // Arrow head
      line(px, py + dir * arrowLen, px - 5, py + dir * (arrowLen - 8));
      line(px, py + dir * arrowLen, px + 5, py + dir * (arrowLen - 8));

      fill('#2196F3');
      noStroke();
      textSize(9);
      textAlign(CENTER, dir > 0 ? TOP : BOTTOM);
      text(hint.label, px, py + dir * (arrowLen + 5));
    }
    else if (hint.type === "inflection") {
      let px = mapX(hint.x);
      let py = mapY(problems[currentProblem].solutionFunc(hint.x));

      stroke('#FF5722');
      strokeWeight(2);
      noFill();

      // Draw inflection symbol
      arc(px - 10, py, 20, 20, -PI/2, PI/2);
      arc(px + 10, py, 20, 20, PI/2, 3*PI/2);

      fill('#FF5722');
      noStroke();
      textSize(9);
      textAlign(LEFT, TOP);
      text(hint.label, px + 15, py);
    }
  }
}

function drawFeedback() {
  if (checkedResults === null) return;

  let feedbackY = graphBottom - 5 - checkedResults.feedback.length * 12;

  textSize(10);
  textAlign(LEFT, TOP);

  for (let i = 0; i < checkedResults.feedback.length; i++) {
    let fb = checkedResults.feedback[i];
    fill(fb.passed ? '#4CAF50' : '#F44336');
    noStroke();
    let symbol = fb.passed ? '✓' : '✗';
    text(symbol + ' ' + fb.desc, graphLeft + 5, feedbackY + i * 12);
  }
}

function drawButtons() {
  for (let btn of buttons) {
    // Button background
    let isHover = mouseX >= btn.x && mouseX <= btn.x + btn.w &&
                  mouseY >= btn.y && mouseY <= btn.y + btn.h;

    fill(isHover ? '#e0e0e0' : '#f5f5f5');
    stroke('#999');
    strokeWeight(1);
    rect(btn.x, btn.y, btn.w, btn.h, 4);

    // Button label
    fill('#333');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(btn.label, btn.x + btn.w/2, btn.y + btn.h/2);
  }
}

function mousePressed() {
  // Check button clicks
  for (let btn of buttons) {
    if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
        mouseY >= btn.y && mouseY <= btn.y + btn.h) {
      btn.action();
      return;
    }
  }

  // Start drawing in graph area
  if (mouseX >= graphLeft && mouseX <= graphRight &&
      mouseY >= graphTop && mouseY <= graphBottom) {
    isDrawing = true;
    userPoints = [];
    smoothedCurve = [];
    checkedResults = null;
    showSolution = false;

    addPoint(mouseX, mouseY);
  }
}

function mouseDragged() {
  if (isDrawing &&
      mouseX >= graphLeft && mouseX <= graphRight &&
      mouseY >= graphTop && mouseY <= graphBottom) {
    addPoint(mouseX, mouseY);
  }
}

function mouseReleased() {
  if (isDrawing) {
    isDrawing = false;
    smoothCurve();
  }
}

function addPoint(px, py) {
  let x = unmapX(px);
  let y = unmapY(py);

  // Only add if far enough from last point
  if (userPoints.length === 0 ||
      dist(px, py, userPoints[userPoints.length-1].px, userPoints[userPoints.length-1].py) > 3) {
    userPoints.push({ x, y, px, py });
  }
}

function smoothCurve() {
  if (userPoints.length < 2) {
    smoothedCurve = userPoints.slice();
    return;
  }

  // Sort points by x coordinate
  userPoints.sort((a, b) => a.x - b.x);

  // Remove duplicates and average y values for same x
  let averaged = [];
  let i = 0;
  while (i < userPoints.length) {
    let sumY = userPoints[i].y;
    let count = 1;
    let x = userPoints[i].x;

    while (i + count < userPoints.length &&
           Math.abs(userPoints[i + count].x - x) < 0.1) {
      sumY += userPoints[i + count].y;
      count++;
    }

    averaged.push({ x: x, y: sumY / count });
    i += count;
  }

  // Create smooth curve
  smoothedCurve = [];
  for (let pt of averaged) {
    smoothedCurve.push({
      x: pt.x,
      y: pt.y,
      px: mapX(pt.x),
      py: mapY(pt.y)
    });
  }
}

function clearDrawing() {
  userPoints = [];
  smoothedCurve = [];
  checkedResults = null;
  showSolution = false;
  showHint = false;
  hintIndex = 0;
}

function checkSketch() {
  if (smoothedCurve.length < 5) {
    checkedResults = {
      feedback: [{ passed: false, desc: "Draw a curve first!" }]
    };
    return;
  }

  let problem = problems[currentProblem];
  let feedback = [];

  // Check required points
  for (let pt of problem.checkPoints) {
    let passed = checkPointOnCurve(pt.x, pt.y, pt.tolerance);
    feedback.push({ passed, desc: pt.desc });
  }

  // Check intervals (increasing/decreasing)
  for (let interval of problem.checkIntervals) {
    let passed = checkInterval(interval.start, interval.end, interval.increasing);
    feedback.push({ passed, desc: interval.desc });
  }

  // Check critical points
  for (let crit of problem.checkCritical) {
    let passed = checkCriticalPoint(crit.x, crit.type, crit.tolerance);
    feedback.push({ passed, desc: crit.desc });
  }

  // Check concavity
  for (let conc of problem.checkConcavity) {
    let passed = checkConcavity(conc.start, conc.end, conc.concaveUp);
    feedback.push({ passed, desc: conc.desc });
  }

  checkedResults = { feedback };
}

function checkPointOnCurve(targetX, targetY, tolerance) {
  for (let pt of smoothedCurve) {
    if (Math.abs(pt.x - targetX) < 0.3) {
      if (Math.abs(pt.y - targetY) < tolerance) {
        return true;
      }
    }
  }
  return false;
}

function checkInterval(start, end, shouldIncrease) {
  let pointsInInterval = smoothedCurve.filter(pt => pt.x >= start && pt.x <= end);

  if (pointsInInterval.length < 2) return false;

  pointsInInterval.sort((a, b) => a.x - b.x);

  let increasing = 0;
  let decreasing = 0;

  for (let i = 1; i < pointsInInterval.length; i++) {
    let dy = pointsInInterval[i].y - pointsInInterval[i-1].y;
    if (dy > 0.05) increasing++;
    else if (dy < -0.05) decreasing++;
  }

  if (shouldIncrease) {
    return increasing > decreasing * 1.5;
  } else {
    return decreasing > increasing * 1.5;
  }
}

function checkCriticalPoint(targetX, type, tolerance) {
  let nearbyPoints = smoothedCurve.filter(pt => Math.abs(pt.x - targetX) < tolerance * 2);

  if (nearbyPoints.length < 3) return false;

  // Find the point closest to targetX
  let closest = nearbyPoints.reduce((a, b) =>
    Math.abs(a.x - targetX) < Math.abs(b.x - targetX) ? a : b
  );

  // Check if it's a local extremum
  let leftPoints = smoothedCurve.filter(pt => pt.x < closest.x - 0.2 && pt.x > closest.x - 1);
  let rightPoints = smoothedCurve.filter(pt => pt.x > closest.x + 0.2 && pt.x < closest.x + 1);

  if (leftPoints.length === 0 || rightPoints.length === 0) return false;

  let leftAvg = leftPoints.reduce((sum, pt) => sum + pt.y, 0) / leftPoints.length;
  let rightAvg = rightPoints.reduce((sum, pt) => sum + pt.y, 0) / rightPoints.length;

  if (type === "max") {
    return closest.y > leftAvg && closest.y > rightAvg;
  } else {
    return closest.y < leftAvg && closest.y < rightAvg;
  }
}

function checkConcavity(start, end, shouldBeConcaveUp) {
  let pointsInInterval = smoothedCurve.filter(pt => pt.x >= start && pt.x <= end);

  if (pointsInInterval.length < 5) return false;

  pointsInInterval.sort((a, b) => a.x - b.x);

  // Calculate second differences as approximation of second derivative
  let concaveUpCount = 0;
  let concaveDownCount = 0;

  for (let i = 2; i < pointsInInterval.length; i++) {
    let d1 = (pointsInInterval[i-1].y - pointsInInterval[i-2].y) /
             (pointsInInterval[i-1].x - pointsInInterval[i-2].x + 0.001);
    let d2 = (pointsInInterval[i].y - pointsInInterval[i-1].y) /
             (pointsInInterval[i].x - pointsInInterval[i-1].x + 0.001);

    if (d2 > d1 + 0.1) concaveUpCount++;
    else if (d2 < d1 - 0.1) concaveDownCount++;
  }

  if (shouldBeConcaveUp) {
    return concaveUpCount > concaveDownCount * 1.3;
  } else {
    return concaveDownCount > concaveUpCount * 1.3;
  }
}

function showNextHint() {
  showHint = true;
  hintIndex++;
  if (hintIndex >= problems[currentProblem].hints.length) {
    hintIndex = problems[currentProblem].hints.length - 1;
  }
}

function toggleSolution() {
  showSolution = !showSolution;
  buttons[3].label = showSolution ? "Hide" : "Solution";
}

function newProblem() {
  currentProblem = (currentProblem + 1) % problems.length;
  clearDrawing();
  buttons[3].label = "Solution";
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

// Responsive functions
function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateGraphDimensions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
