// Derivative Test Comparison MicroSim
// Compare First and Second Derivative Tests for classifying critical points
// Bloom Level: Analyze (L4), Verbs: compare, contrast, differentiate
// Learning Objective: Students will compare the First and Second Derivative Tests
// and choose the appropriate method for classifying critical points

let canvasWidth = 700;
let drawHeight = 480;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 50;
let defaultTextSize = 16;

// Panel dimensions
let leftPanelWidth, rightPanelWidth, centerWidth;
let panelGap = 10;

// Coordinate ranges for function graph
let xMin = -2.5, xMax = 2.5;
let yMin = -3, yMax = 3;

// Current state
let currentFunction = 0;
let currentCriticalPointIndex = 0;
let showBothTests = true;

// Function definitions with their derivatives and critical points
const functions = [
  {
    name: 'x^4 - 2x^2',
    display: 'f(x) = x^4 - 2x^2',
    fpDisplay: "f'(x) = 4x^3 - 4x",
    fppDisplay: "f''(x) = 12x^2 - 4",
    f: (x) => Math.pow(x, 4) - 2 * x * x,
    fp: (x) => 4 * Math.pow(x, 3) - 4 * x,
    fpp: (x) => 12 * x * x - 4,
    criticalPoints: [
      { x: -1, type: 'min', label: 'x = -1' },
      { x: 0, type: 'max', label: 'x = 0' },
      { x: 1, type: 'min', label: 'x = 1' }
    ],
    yRange: [-1.5, 2]
  },
  {
    name: 'x^3 - 3x',
    display: 'f(x) = x^3 - 3x',
    fpDisplay: "f'(x) = 3x^2 - 3",
    fppDisplay: "f''(x) = 6x",
    f: (x) => Math.pow(x, 3) - 3 * x,
    fp: (x) => 3 * x * x - 3,
    fpp: (x) => 6 * x,
    criticalPoints: [
      { x: -1, type: 'max', label: 'x = -1' },
      { x: 1, type: 'min', label: 'x = 1' }
    ],
    yRange: [-3, 3]
  },
  {
    name: 'x^5',
    display: 'f(x) = x^5',
    fpDisplay: "f'(x) = 5x^4",
    fppDisplay: "f''(x) = 20x^3",
    f: (x) => Math.pow(x, 5),
    fp: (x) => 5 * Math.pow(x, 4),
    fpp: (x) => 20 * Math.pow(x, 3),
    criticalPoints: [
      { x: 0, type: 'neither', label: 'x = 0' }
    ],
    yRange: [-2, 2]
  },
  {
    name: 'sin(x)',
    display: 'f(x) = sin(x)',
    fpDisplay: "f'(x) = cos(x)",
    fppDisplay: "f''(x) = -sin(x)",
    f: (x) => Math.sin(x),
    fp: (x) => Math.cos(x),
    fpp: (x) => -Math.sin(x),
    criticalPoints: [
      { x: -Math.PI/2, type: 'min', label: 'x = -pi/2' },
      { x: Math.PI/2, type: 'max', label: 'x = pi/2' }
    ],
    yRange: [-1.5, 1.5]
  },
  {
    name: 'x^4',
    display: 'f(x) = x^4',
    fpDisplay: "f'(x) = 4x^3",
    fppDisplay: "f''(x) = 12x^2",
    f: (x) => Math.pow(x, 4),
    fp: (x) => 4 * Math.pow(x, 3),
    fpp: (x) => 12 * x * x,
    criticalPoints: [
      { x: 0, type: 'min', label: 'x = 0' }
    ],
    yRange: [-0.5, 2]
  }
];

// Colors
const colorMax = [220, 50, 50];    // Red for maximum
const colorMin = [50, 100, 220];   // Blue for minimum
const colorInconclusive = [220, 180, 50]; // Yellow for inconclusive
const colorCurve = [80, 80, 80];  // Gray for function curve

// Control positions
let funcBtnX, funcBtnY, funcBtnW, funcBtnH;
let cpSliderX, cpSliderY, cpSliderW;
let showBothBtnX, showBothBtnY;

// Dragging state
let isDraggingSlider = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();

  describe('Interactive comparison of First and Second Derivative Tests for classifying critical points. Left panel shows sign chart analysis, center shows function graph, right panel shows concavity test.', LABEL);
}

function updateLayoutPositions() {
  // Panel layout: Left (35%), Center (30%), Right (35%)
  leftPanelWidth = (canvasWidth - 3 * margin - 2 * panelGap) * 0.35;
  centerWidth = (canvasWidth - 3 * margin - 2 * panelGap) * 0.30;
  rightPanelWidth = (canvasWidth - 3 * margin - 2 * panelGap) * 0.35;

  // Control positions - Row 1: Function selector
  funcBtnX = margin;
  funcBtnY = drawHeight + 8;
  funcBtnW = (canvasWidth - 2 * margin - 4 * 5) / 5; // 5 buttons with gaps
  funcBtnH = 28;

  // Row 2: Critical point slider and Show Both button
  cpSliderX = 130;
  cpSliderY = drawHeight + 55;
  cpSliderW = canvasWidth * 0.45;

  showBothBtnX = canvasWidth - margin - 100;
  showBothBtnY = drawHeight + 45;
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

  // Get current function and critical point
  let func = functions[currentFunction];
  let cp = func.criticalPoints[currentCriticalPointIndex];

  // Draw title
  drawTitle(func);

  // Calculate panel positions
  let leftX = margin;
  let centerX = margin + leftPanelWidth + panelGap;
  let rightX = margin + leftPanelWidth + panelGap + centerWidth + panelGap;
  let panelTop = chartTop + 5;
  let panelHeight = drawHeight - panelTop - 10;

  // Draw three panels
  drawLeftPanel(leftX, panelTop, leftPanelWidth, panelHeight, func, cp);
  drawCenterPanel(centerX, panelTop, centerWidth, panelHeight, func, cp);
  drawRightPanel(rightX, panelTop, rightPanelWidth, panelHeight, func, cp);

  // Draw summary comparison at bottom of drawing area
  drawSummaryComparison(func, cp);

  // Draw controls
  drawControls(func);
}

function drawTitle(func) {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Derivative Test Comparison', canvasWidth / 2, 5);
  textSize(12);
  fill(80);
  text(func.display + '  |  ' + func.fpDisplay + '  |  ' + func.fppDisplay, canvasWidth / 2, 28);
}

function drawLeftPanel(x, y, w, h, func, cp) {
  // Panel background
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(x, y, w, h - 45, 5);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  textStyle(BOLD);
  text('First Derivative Test', x + w/2, y + 8);
  textStyle(NORMAL);

  // Sign chart visualization
  let chartY = y + 35;
  let chartH = 60;
  let chartW = w - 20;
  let chartX = x + 10;

  // Number line
  stroke(100);
  strokeWeight(2);
  line(chartX, chartY + chartH/2, chartX + chartW, chartY + chartH/2);

  // Mark critical point on number line
  let cpPx = chartX + chartW/2;

  // Critical point marker
  fill(100);
  noStroke();
  circle(cpPx, chartY + chartH/2, 10);

  // Label for critical point
  textAlign(CENTER, TOP);
  textSize(11);
  text('c = ' + formatNumber(cp.x), cpPx, chartY + chartH/2 + 12);

  // Calculate f'(x) values on either side
  let leftVal = func.fp(cp.x - 0.5);
  let rightVal = func.fp(cp.x + 0.5);

  // Sign indicators
  textSize(20);
  let leftSign = leftVal > 0.01 ? '+' : (leftVal < -0.01 ? '-' : '0');
  let rightSign = rightVal > 0.01 ? '+' : (rightVal < -0.01 ? '-' : '0');

  fill(leftVal > 0.01 ? '#2E7D32' : (leftVal < -0.01 ? '#C62828' : '#666'));
  text(leftSign, chartX + chartW * 0.25, chartY + 5);

  fill(rightVal > 0.01 ? '#2E7D32' : (rightVal < -0.01 ? '#C62828' : '#666'));
  text(rightSign, chartX + chartW * 0.75, chartY + 5);

  // Arrows showing direction
  drawArrow(chartX + chartW * 0.15, chartY + chartH/2 - 5, chartX + chartW * 0.35, chartY + chartH/2 - 5, leftVal > 0);
  drawArrow(chartX + chartW * 0.65, chartY + chartH/2 - 5, chartX + chartW * 0.85, chartY + chartH/2 - 5, rightVal > 0);

  // Step-by-step explanation
  let stepY = chartY + chartH + 20;
  textAlign(LEFT, TOP);
  textSize(10);
  fill('black');

  let steps = [];
  steps.push("1. Find where f'(x) = 0");
  steps.push("2. Test sign left of c: f'(" + formatNumber(cp.x - 0.5) + ") = " + formatNumber(leftVal));
  steps.push("3. Test sign right of c: f'(" + formatNumber(cp.x + 0.5) + ") = " + formatNumber(rightVal));

  // Determine result
  let firstTestResult = '';
  let firstTestColor;
  if (leftVal > 0.01 && rightVal < -0.01) {
    firstTestResult = '+ to -: LOCAL MAXIMUM';
    firstTestColor = colorMax;
  } else if (leftVal < -0.01 && rightVal > 0.01) {
    firstTestResult = '- to +: LOCAL MINIMUM';
    firstTestColor = colorMin;
  } else {
    firstTestResult = 'No sign change: NEITHER';
    firstTestColor = colorInconclusive;
  }
  steps.push("4. " + firstTestResult);

  for (let i = 0; i < steps.length; i++) {
    if (i === 3) {
      fill(firstTestColor[0], firstTestColor[1], firstTestColor[2]);
      textStyle(BOLD);
    }
    text(steps[i], x + 8, stepY + i * 14);
    textStyle(NORMAL);
    fill('black');
  }

  // Computation steps count
  textAlign(LEFT, BOTTOM);
  fill(100);
  textSize(10);
  text('Steps: 3 evaluations', x + 8, y + h - 50);
}

function drawCenterPanel(x, y, w, h, func, cp) {
  // Panel background
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(x, y, w, h - 45, 5);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  textStyle(BOLD);
  text('Function Graph', x + w/2, y + 8);
  textStyle(NORMAL);

  // Graph area
  let graphX = x + 15;
  let graphY = y + 30;
  let graphW = w - 30;
  let graphH = h - 85;

  // Get y range for current function
  let yMinF = func.yRange[0];
  let yMaxF = func.yRange[1];

  // Grid
  stroke(235);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let px = map(i, xMin, xMax, graphX, graphX + graphW);
    line(px, graphY, px, graphY + graphH);
  }

  // Horizontal grid lines
  let yStep = (yMaxF - yMinF) / 4;
  for (let i = 0; i <= 4; i++) {
    let yVal = yMinF + i * yStep;
    let py = map(yVal, yMinF, yMaxF, graphY + graphH, graphY);
    line(graphX, py, graphX + graphW, py);
  }

  // Axes
  stroke(150);
  strokeWeight(1);

  // X-axis
  let y0 = map(0, yMinF, yMaxF, graphY + graphH, graphY);
  if (y0 > graphY && y0 < graphY + graphH) {
    stroke(100);
    line(graphX, y0, graphX + graphW, y0);
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, graphX, graphX + graphW);
  if (x0 > graphX && x0 < graphX + graphW) {
    stroke(100);
    line(x0, graphY, x0, graphY + graphH);
  }

  // Draw function curve
  stroke(colorCurve[0], colorCurve[1], colorCurve[2]);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let px = graphX; px <= graphX + graphW; px += 2) {
    let xVal = map(px, graphX, graphX + graphW, xMin, xMax);
    let yVal = func.f(xVal);
    let py = map(yVal, yMinF, yMaxF, graphY + graphH, graphY);

    if (py >= graphY - 5 && py <= graphY + graphH + 5) {
      vertex(px, constrain(py, graphY, graphY + graphH));
    }
  }
  endShape();

  // Mark all critical points
  for (let i = 0; i < func.criticalPoints.length; i++) {
    let cpI = func.criticalPoints[i];
    let cpPx = map(cpI.x, xMin, xMax, graphX, graphX + graphW);
    let cpPy = map(func.f(cpI.x), yMinF, yMaxF, graphY + graphH, graphY);

    // Color based on type
    let ptColor;
    if (cpI.type === 'max') ptColor = colorMax;
    else if (cpI.type === 'min') ptColor = colorMin;
    else ptColor = colorInconclusive;

    // Highlight current critical point
    if (i === currentCriticalPointIndex) {
      fill(ptColor[0], ptColor[1], ptColor[2], 100);
      noStroke();
      circle(cpPx, cpPy, 25);
    }

    fill(ptColor[0], ptColor[1], ptColor[2]);
    stroke(255);
    strokeWeight(2);
    circle(cpPx, cpPy, i === currentCriticalPointIndex ? 14 : 10);
  }

  // Label current critical point
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(10);
  let cpPx = map(cp.x, xMin, xMax, graphX, graphX + graphW);
  text(cp.label, cpPx, graphY + graphH + 5);
}

function drawRightPanel(x, y, w, h, func, cp) {
  // Panel background
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(x, y, w, h - 45, 5);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  textStyle(BOLD);
  text('Second Derivative Test', x + w/2, y + 8);
  textStyle(NORMAL);

  // Calculate f''(c)
  let fppC = func.fpp(cp.x);

  // Concavity visualization
  let vizY = y + 35;
  let vizH = 60;
  let vizCenterX = x + w/2;
  let vizCenterY = vizY + vizH/2;

  // Draw concavity indicator
  noFill();
  strokeWeight(3);

  if (Math.abs(fppC) < 0.01) {
    // Inconclusive - draw horizontal line
    stroke(colorInconclusive[0], colorInconclusive[1], colorInconclusive[2]);
    line(vizCenterX - 30, vizCenterY, vizCenterX + 30, vizCenterY);

    fill(colorInconclusive[0], colorInconclusive[1], colorInconclusive[2]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('f\'\'(c) = 0', vizCenterX, vizCenterY + 35);
    text('INCONCLUSIVE', vizCenterX, vizCenterY + 50);
  } else if (fppC > 0) {
    // Concave up - draw U shape
    stroke(colorMin[0], colorMin[1], colorMin[2]);
    beginShape();
    for (let t = -1; t <= 1; t += 0.1) {
      let px = vizCenterX + t * 30;
      let py = vizCenterY - 20 + t * t * 25;
      vertex(px, py);
    }
    endShape();

    fill(colorMin[0], colorMin[1], colorMin[2]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('f\'\'(c) > 0', vizCenterX, vizCenterY + 35);
    text('Concave Up', vizCenterX, vizCenterY + 50);
  } else {
    // Concave down - draw inverted U shape
    stroke(colorMax[0], colorMax[1], colorMax[2]);
    beginShape();
    for (let t = -1; t <= 1; t += 0.1) {
      let px = vizCenterX + t * 30;
      let py = vizCenterY + 20 - t * t * 25;
      vertex(px, py);
    }
    endShape();

    fill(colorMax[0], colorMax[1], colorMax[2]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('f\'\'(c) < 0', vizCenterX, vizCenterY + 35);
    text('Concave Down', vizCenterX, vizCenterY + 50);
  }

  // Step-by-step explanation
  let stepY = vizY + vizH + 35;
  textAlign(LEFT, TOP);
  textSize(10);
  fill('black');

  let steps = [];
  steps.push("1. Find critical point c");
  steps.push("2. Evaluate f''(c) = " + formatNumber(fppC));

  // Determine result
  let secondTestResult = '';
  let secondTestColor;
  if (Math.abs(fppC) < 0.01) {
    secondTestResult = 'f\'\'(c) = 0: INCONCLUSIVE';
    secondTestColor = colorInconclusive;
  } else if (fppC > 0) {
    secondTestResult = 'f\'\'(c) > 0: LOCAL MINIMUM';
    secondTestColor = colorMin;
  } else {
    secondTestResult = 'f\'\'(c) < 0: LOCAL MAXIMUM';
    secondTestColor = colorMax;
  }
  steps.push("3. " + secondTestResult);

  for (let i = 0; i < steps.length; i++) {
    if (i === 2) {
      fill(secondTestColor[0], secondTestColor[1], secondTestColor[2]);
      textStyle(BOLD);
    }
    text(steps[i], x + 8, stepY + i * 14);
    textStyle(NORMAL);
    fill('black');
  }

  // Computation steps count
  textAlign(LEFT, BOTTOM);
  fill(100);
  textSize(10);
  text('Steps: 1 evaluation', x + 8, y + h - 50);

  // Warning if inconclusive
  if (Math.abs(fppC) < 0.01) {
    fill(colorInconclusive[0], colorInconclusive[1], colorInconclusive[2]);
    textAlign(CENTER, BOTTOM);
    textSize(9);
    text('Must use First Derivative Test!', x + w/2, y + h - 50);
  }
}

function drawSummaryComparison(func, cp) {
  let summaryY = drawHeight - 40;
  let summaryH = 35;

  // Background
  fill(245, 245, 255);
  stroke(200);
  strokeWeight(1);
  rect(margin, summaryY, canvasWidth - 2 * margin, summaryH, 5);

  // Get results from both tests
  let leftVal = func.fp(cp.x - 0.5);
  let rightVal = func.fp(cp.x + 0.5);
  let fppC = func.fpp(cp.x);

  // First test result
  let firstResult, firstColor;
  if (leftVal > 0.01 && rightVal < -0.01) {
    firstResult = 'Maximum';
    firstColor = colorMax;
  } else if (leftVal < -0.01 && rightVal > 0.01) {
    firstResult = 'Minimum';
    firstColor = colorMin;
  } else {
    firstResult = 'Neither';
    firstColor = colorInconclusive;
  }

  // Second test result
  let secondResult, secondColor;
  if (Math.abs(fppC) < 0.01) {
    secondResult = 'Inconclusive';
    secondColor = colorInconclusive;
  } else if (fppC > 0) {
    secondResult = 'Minimum';
    secondColor = colorMin;
  } else {
    secondResult = 'Maximum';
    secondColor = colorMax;
  }

  // Draw comparison
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);

  // Critical point
  fill('black');
  textStyle(BOLD);
  text('At ' + cp.label + ':', margin + 10, summaryY + summaryH/2);
  textStyle(NORMAL);

  // First test result
  fill('black');
  text('First Test:', margin + 90, summaryY + summaryH/2);
  fill(firstColor[0], firstColor[1], firstColor[2]);
  textStyle(BOLD);
  text(firstResult, margin + 160, summaryY + summaryH/2);
  textStyle(NORMAL);

  // Separator
  fill(200);
  text('|', margin + 230, summaryY + summaryH/2);

  // Second test result
  fill('black');
  text('Second Test:', margin + 250, summaryY + summaryH/2);
  fill(secondColor[0], secondColor[1], secondColor[2]);
  textStyle(BOLD);
  text(secondResult, margin + 340, summaryY + summaryH/2);
  textStyle(NORMAL);

  // Recommendation
  fill(200);
  text('|', margin + 430, summaryY + summaryH/2);

  fill(60);
  textAlign(LEFT, CENTER);
  if (Math.abs(fppC) < 0.01) {
    text('Use First Derivative Test (Second is inconclusive)', margin + 450, summaryY + summaryH/2);
  } else {
    text('Second Test is faster (1 vs 3 evaluations)', margin + 450, summaryY + summaryH/2);
  }
}

function drawControls(func) {
  // Row 1: Function selector buttons
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Function:', margin, funcBtnY + funcBtnH/2);

  for (let i = 0; i < functions.length; i++) {
    let bx = margin + 65 + i * (funcBtnW + 5);

    fill(currentFunction === i ? '#4CAF50' : '#e0e0e0');
    stroke(currentFunction === i ? '#388E3C' : '#bdbdbd');
    strokeWeight(1);
    rect(bx, funcBtnY, funcBtnW, funcBtnH, 5);

    fill(currentFunction === i ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(functions[i].name, bx + funcBtnW/2, funcBtnY + funcBtnH/2);
  }

  // Row 2: Critical point slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  let cpLabel = func.criticalPoints[currentCriticalPointIndex].label;
  text('Critical Point: ' + cpLabel, margin, cpSliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(cpSliderX, cpSliderY - 5, cpSliderW, 10, 5);

  // Slider tick marks for each critical point
  let numCPs = func.criticalPoints.length;
  for (let i = 0; i < numCPs; i++) {
    let tickX = map(i, 0, numCPs - 1, cpSliderX + 10, cpSliderX + cpSliderW - 10);
    if (numCPs === 1) tickX = cpSliderX + cpSliderW/2;
    stroke(150);
    strokeWeight(2);
    line(tickX, cpSliderY - 8, tickX, cpSliderY + 8);
  }

  // Slider handle
  let handleX;
  if (numCPs === 1) {
    handleX = cpSliderX + cpSliderW/2;
  } else {
    handleX = map(currentCriticalPointIndex, 0, numCPs - 1, cpSliderX + 10, cpSliderX + cpSliderW - 10);
  }

  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleX, cpSliderY, 20);

  // Show Both Tests toggle
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Show Both:', showBothBtnX - 70, showBothBtnY + 14);

  let toggleW = 50;
  fill(showBothTests ? '#4CAF50' : '#e0e0e0');
  stroke(showBothTests ? '#388E3C' : '#bdbdbd');
  strokeWeight(1);
  rect(showBothBtnX, showBothBtnY, toggleW, 28, 5);

  fill(showBothTests ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(showBothTests ? 'ON' : 'OFF', showBothBtnX + toggleW/2, showBothBtnY + 14);
}

function drawArrow(x1, y1, x2, y2, isUp) {
  let arrowY = isUp ? y1 - 15 : y1 + 15;

  stroke(isUp ? '#2E7D32' : '#C62828');
  strokeWeight(2);

  // Horizontal line
  line(x1, y1, x2, y1);

  // Vertical arrow
  let midX = (x1 + x2) / 2;
  line(midX, y1, midX, arrowY);

  // Arrowhead
  if (isUp) {
    line(midX - 5, arrowY + 5, midX, arrowY);
    line(midX + 5, arrowY + 5, midX, arrowY);
  } else {
    line(midX - 5, arrowY - 5, midX, arrowY);
    line(midX + 5, arrowY - 5, midX, arrowY);
  }
}

function formatNumber(n) {
  if (Math.abs(n - Math.PI/2) < 0.01) return 'pi/2';
  if (Math.abs(n + Math.PI/2) < 0.01) return '-pi/2';
  return n.toFixed(2);
}

function mousePressed() {
  let func = functions[currentFunction];
  let numCPs = func.criticalPoints.length;

  // Check function buttons
  for (let i = 0; i < functions.length; i++) {
    let bx = margin + 65 + i * (funcBtnW + 5);
    if (mouseX >= bx && mouseX <= bx + funcBtnW &&
        mouseY >= funcBtnY && mouseY <= funcBtnY + funcBtnH) {
      currentFunction = i;
      currentCriticalPointIndex = 0;
      return;
    }
  }

  // Check slider handle
  let handleX;
  if (numCPs === 1) {
    handleX = cpSliderX + cpSliderW/2;
  } else {
    handleX = map(currentCriticalPointIndex, 0, numCPs - 1, cpSliderX + 10, cpSliderX + cpSliderW - 10);
  }

  if (dist(mouseX, mouseY, handleX, cpSliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check slider track click
  if (mouseY > cpSliderY - 15 && mouseY < cpSliderY + 15 &&
      mouseX > cpSliderX && mouseX < cpSliderX + cpSliderW) {
    if (numCPs > 1) {
      let idx = round(map(mouseX, cpSliderX + 10, cpSliderX + cpSliderW - 10, 0, numCPs - 1));
      currentCriticalPointIndex = constrain(idx, 0, numCPs - 1);
    }
    isDraggingSlider = true;
    return;
  }

  // Check Show Both toggle
  let toggleW = 50;
  if (mouseX >= showBothBtnX && mouseX <= showBothBtnX + toggleW &&
      mouseY >= showBothBtnY && mouseY <= showBothBtnY + 28) {
    showBothTests = !showBothTests;
    return;
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    let func = functions[currentFunction];
    let numCPs = func.criticalPoints.length;

    if (numCPs > 1) {
      let idx = round(map(mouseX, cpSliderX + 10, cpSliderX + cpSliderW - 10, 0, numCPs - 1));
      currentCriticalPointIndex = constrain(idx, 0, numCPs - 1);
    }
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
  updateLayoutPositions();
}
