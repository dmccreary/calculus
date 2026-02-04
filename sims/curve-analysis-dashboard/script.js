// Curve Analysis Dashboard MicroSim
// Complete derivative-based analysis of functions showing f(x), f'(x), f''(x)
// with critical points, inflection points, and comprehensive summary
// Bloom Level: Analyze (L4), Verbs: examine, organize, deconstruct
// Learning Objective: Students will synthesize all derivative-based analysis
// techniques to fully describe a function's behavior

let canvasWidth = 800;
let drawHeight = 580;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 14;

// Layout dimensions - calculated in updateLayout()
let mainGraphTop, mainGraphBottom, mainGraphHeight;
let derivativeGraphTop, derivativeGraphBottom, derivativeGraphHeight;
let leftPanelLeft, leftPanelRight, rightPanelLeft, rightPanelRight;
let summaryTop, summaryHeight;

// Coordinate ranges
let xMin = -2, xMax = 5;
let yMinMain = -35, yMaxMain = 25;
let yMinFp = -60, yMaxFp = 60;
let yMinFpp = -80, yMaxFpp = 80;

// Current state
let currentFunction = 0;
let currentX = 1.5;
let stepMode = false;
let currentStep = 0;
const totalSteps = 6;

// Visibility toggles
let showCriticalPts = true;
let showInflectionPts = true;
let showConcavityShading = true;
let showDerivativeGraphs = true;

// Function definitions
const functions = [
  {
    name: 'x^4 - 4x^3 + 10',
    f: x => Math.pow(x, 4) - 4 * Math.pow(x, 3) + 10,
    fp: x => 4 * Math.pow(x, 3) - 12 * Math.pow(x, 2),
    fpp: x => 12 * Math.pow(x, 2) - 24 * x,
    displayF: 'f(x) = x\u2074 - 4x\u00B3 + 10',
    displayFp: "f'(x) = 4x\u00B3 - 12x\u00B2",
    displayFpp: "f''(x) = 12x\u00B2 - 24x",
    criticalPts: [0, 3],
    inflectionPts: [0, 2],
    xRange: [-2, 5],
    yRange: [-35, 25]
  },
  {
    name: 'x^3 - 3x',
    f: x => Math.pow(x, 3) - 3 * x,
    fp: x => 3 * Math.pow(x, 2) - 3,
    fpp: x => 6 * x,
    displayF: 'f(x) = x\u00B3 - 3x',
    displayFp: "f'(x) = 3x\u00B2 - 3",
    displayFpp: "f''(x) = 6x",
    criticalPts: [-1, 1],
    inflectionPts: [0],
    xRange: [-3, 3],
    yRange: [-5, 5]
  },
  {
    name: 'sin(x)',
    f: x => Math.sin(x),
    fp: x => Math.cos(x),
    fpp: x => -Math.sin(x),
    displayF: 'f(x) = sin(x)',
    displayFp: "f'(x) = cos(x)",
    displayFpp: "f''(x) = -sin(x)",
    criticalPts: [-Math.PI/2, Math.PI/2, 3*Math.PI/2],
    inflectionPts: [0, Math.PI],
    xRange: [-Math.PI, 2*Math.PI],
    yRange: [-1.5, 1.5]
  }
];

// Colors
const colorInc = [50, 180, 50, 80];      // Green for increasing
const colorDec = [220, 50, 50, 80];       // Red for decreasing
const colorConcaveUp = [100, 100, 220];   // Blue for concave up
const colorConcaveDown = [220, 150, 50];  // Orange for concave down
const colorFp = [0, 150, 80];             // Green for f'(x)
const colorFpp = [150, 50, 150];          // Purple for f''(x)

// UI element positions
let funcBtnX, funcBtnY, funcBtnW, funcBtnH;
let checkboxX, checkboxY, checkboxSpacing;
let stepBtnX, stepBtnY, stepBtnW, stepBtnH;
let sliderX, sliderY, sliderW;

// Dragging state
let isDraggingSlider = false;
let isDraggingMainGraph = false;

// Step descriptions
const stepDescriptions = [
  "Step 1: Identify the function domain and behavior",
  "Step 2: Find critical points where f'(x) = 0",
  "Step 3: Analyze f'(x) sign to find inc/dec intervals",
  "Step 4: Find inflection points where f''(x) = 0",
  "Step 5: Analyze f''(x) sign for concavity",
  "Step 6: Complete analysis summary"
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayout();
  updateFunctionRanges();

  describe('Complete curve analysis dashboard showing a function with its first and second derivatives, critical points, inflection points, and concavity analysis. Demonstrates how to fully describe function behavior using calculus.', LABEL);
}

function updateLayout() {
  // Main graph area (top)
  mainGraphTop = 50;
  mainGraphHeight = 200;
  mainGraphBottom = mainGraphTop + mainGraphHeight;

  // Derivative graphs (middle, side by side)
  derivativeGraphTop = mainGraphBottom + 15;
  derivativeGraphHeight = 130;
  derivativeGraphBottom = derivativeGraphTop + derivativeGraphHeight;

  leftPanelLeft = margin + 35;
  leftPanelRight = canvasWidth / 2 - 10;
  rightPanelLeft = canvasWidth / 2 + 10;
  rightPanelRight = canvasWidth - margin - 10;

  // Summary table (bottom of draw area)
  summaryTop = derivativeGraphBottom + 15;
  summaryHeight = drawHeight - summaryTop - 10;

  // Control positions
  funcBtnX = 10;
  funcBtnY = drawHeight + 10;
  funcBtnW = 105;
  funcBtnH = 26;

  checkboxX = 340;
  checkboxY = drawHeight + 8;
  checkboxSpacing = 22;

  stepBtnX = canvasWidth - 200;
  stepBtnY = drawHeight + 8;
  stepBtnW = 60;
  stepBtnH = 26;

  sliderX = 10;
  sliderY = drawHeight + 75;
  sliderW = 180;
}

function updateFunctionRanges() {
  let func = functions[currentFunction];
  xMin = func.xRange[0];
  xMax = func.xRange[1];
  yMinMain = func.yRange[0];
  yMaxMain = func.yRange[1];

  // Auto-scale derivative ranges
  let maxFp = 0, maxFpp = 0;
  for (let x = xMin; x <= xMax; x += 0.1) {
    maxFp = Math.max(maxFp, Math.abs(func.fp(x)));
    maxFpp = Math.max(maxFpp, Math.abs(func.fpp(x)));
  }
  yMinFp = -maxFp * 1.3;
  yMaxFp = maxFp * 1.3;
  yMinFpp = -maxFpp * 1.3;
  yMaxFpp = maxFpp * 1.3;
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

  let func = functions[currentFunction];

  // Draw title
  drawTitle();

  // Draw main graph
  drawMainGraph(func);

  // Draw derivative panels (if visible and step permits)
  if (showDerivativeGraphs && (!stepMode || currentStep >= 2)) {
    drawDerivativePanel('left', func);
    drawDerivativePanel('right', func);
  }

  // Draw summary table
  if (!stepMode || currentStep >= 5) {
    drawSummaryTable(func);
  }

  // Draw step mode indicator
  if (stepMode) {
    drawStepIndicator();
  }

  // Draw controls
  drawControls();

  // Draw hover info if in main graph
  if (isInMainGraph(mouseX, mouseY)) {
    drawHoverInfo(func);
  }
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Complete Curve Analysis Dashboard', canvasWidth / 2, 5);

  let func = functions[currentFunction];
  textSize(14);
  fill(80);
  text(func.displayF, canvasWidth / 2, 27);
}

function drawMainGraph(func) {
  let left = margin + 45;
  let right = canvasWidth - margin - 10;
  let top = mainGraphTop;
  let bottom = mainGraphBottom;

  // Background
  fill(255, 255, 255, 230);
  stroke(180);
  strokeWeight(1);
  rect(left - 40, top, right - left + 45, bottom - top, 5);

  // Shading for increasing/decreasing (if enabled and step permits)
  if (showConcavityShading && (!stepMode || currentStep >= 2)) {
    drawIncDecShading(func, left, right, top, bottom);
  }

  // Grid
  drawGrid(left, right, top, bottom, xMin, xMax, yMinMain, yMaxMain);

  // Axes
  drawAxes(left, right, top, bottom, xMin, xMax, yMinMain, yMaxMain, 'x', 'y');

  // Draw the function curve with concavity styling
  drawFunctionCurve(func, left, right, top, bottom);

  // Critical points (if enabled and step permits)
  if (showCriticalPts && (!stepMode || currentStep >= 1)) {
    drawCriticalPoints(func, left, right, top, bottom);
  }

  // Inflection points (if enabled and step permits)
  if (showInflectionPts && (!stepMode || currentStep >= 3)) {
    drawInflectionPoints(func, left, right, top, bottom);
  }

  // Current x position indicator
  drawCurrentXIndicator(func, left, right, top, bottom);

  // Panel label
  fill(80);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('f(x)', left - 35, top + 5);
}

function drawIncDecShading(func, left, right, top, bottom) {
  // Find where f'(x) changes sign for shading
  let prevSign = Math.sign(func.fp(xMin));
  let prevX = xMin;

  for (let x = xMin + 0.05; x <= xMax; x += 0.05) {
    let currSign = Math.sign(func.fp(x));

    if (currSign !== prevSign || x >= xMax - 0.05) {
      // Draw shaded region from prevX to x
      let px1 = map(prevX, xMin, xMax, left, right);
      let px2 = map(x, xMin, xMax, left, right);

      if (prevSign > 0) {
        fill(colorInc[0], colorInc[1], colorInc[2], colorInc[3]);
      } else if (prevSign < 0) {
        fill(colorDec[0], colorDec[1], colorDec[2], colorDec[3]);
      } else {
        fill(200, 200, 200, 50);
      }

      noStroke();
      rect(px1, top, px2 - px1, bottom - top);

      prevX = x;
      prevSign = currSign;
    }
  }
}

function drawFunctionCurve(func, left, right, top, bottom) {
  // Draw curve with different styles based on concavity
  strokeWeight(3);
  noFill();

  let prevPx = null, prevPy = null;
  let prevConcavity = null;

  for (let px = left; px <= right; px += 2) {
    let x = map(px, left, right, xMin, xMax);
    let y = func.f(x);
    let py = map(y, yMinMain, yMaxMain, bottom, top);

    let fpp = func.fpp(x);
    let concavity = fpp > 0.01 ? 'up' : (fpp < -0.01 ? 'down' : 'none');

    if (prevPx !== null && py >= top - 20 && py <= bottom + 20) {
      // Color based on concavity
      if (showConcavityShading && (!stepMode || currentStep >= 4)) {
        if (concavity === 'up') {
          stroke(colorConcaveUp[0], colorConcaveUp[1], colorConcaveUp[2]);
        } else if (concavity === 'down') {
          stroke(colorConcaveDown[0], colorConcaveDown[1], colorConcaveDown[2]);
        } else {
          stroke(100);
        }
      } else {
        stroke(50, 100, 200);
      }

      // Line style based on concavity
      if (showConcavityShading && concavity === 'down' && (!stepMode || currentStep >= 4)) {
        drawingContext.setLineDash([6, 4]);
      } else {
        drawingContext.setLineDash([]);
      }

      line(prevPx, constrain(prevPy, top, bottom), px, constrain(py, top, bottom));
    }

    prevPx = px;
    prevPy = py;
    prevConcavity = concavity;
  }

  drawingContext.setLineDash([]);
}

function drawCriticalPoints(func, left, right, top, bottom) {
  for (let cp of func.criticalPts) {
    if (cp >= xMin && cp <= xMax) {
      let px = map(cp, xMin, xMax, left, right);
      let y = func.f(cp);
      let py = map(y, yMinMain, yMaxMain, bottom, top);

      if (py >= top && py <= bottom) {
        // Determine if it's a local max, min, or neither using second derivative test
        let fpp = func.fpp(cp);

        if (Math.abs(fpp) < 0.01) {
          // Neither - open circle
          stroke(200, 100, 0);
          strokeWeight(2);
          noFill();
          circle(px, py, 14);
        } else {
          // Extremum - filled circle
          fill(fpp > 0 ? [0, 150, 50] : [200, 50, 50]);
          stroke(255);
          strokeWeight(2);
          circle(px, py, 14);
        }

        // Label
        fill(80);
        noStroke();
        textAlign(CENTER, BOTTOM);
        textSize(10);
        let label = fpp > 0.01 ? 'min' : (fpp < -0.01 ? 'max' : 'CP');
        text(label, px, py - 10);
      }
    }
  }
}

function drawInflectionPoints(func, left, right, top, bottom) {
  for (let ip of func.inflectionPts) {
    if (ip >= xMin && ip <= xMax) {
      let px = map(ip, xMin, xMax, left, right);
      let y = func.f(ip);
      let py = map(y, yMinMain, yMaxMain, bottom, top);

      if (py >= top && py <= bottom) {
        // Diamond shape for inflection points
        fill(150, 50, 150);
        stroke(255);
        strokeWeight(2);

        push();
        translate(px, py);
        rotate(PI / 4);
        rectMode(CENTER);
        rect(0, 0, 10, 10);
        pop();

        // Label
        fill(100, 50, 100);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(10);
        text('IP', px, py + 10);
      }
    }
  }
}

function drawCurrentXIndicator(func, left, right, top, bottom) {
  let px = map(currentX, xMin, xMax, left, right);

  // Vertical dashed line
  stroke(100, 100, 200, 150);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(px, top, px, bottom);
  drawingContext.setLineDash([]);

  // Point on curve
  let y = func.f(currentX);
  let py = map(y, yMinMain, yMaxMain, bottom, top);

  if (py >= top && py <= bottom) {
    fill(50, 50, 200);
    stroke(255);
    strokeWeight(2);
    circle(px, py, 10);
  }
}

function drawDerivativePanel(side, func) {
  let left, right, yMin, yMax, evalFunc, col, label, formula;

  if (side === 'left') {
    left = leftPanelLeft;
    right = leftPanelRight;
    yMin = yMinFp;
    yMax = yMaxFp;
    evalFunc = func.fp;
    col = colorFp;
    label = "f'(x)";
    formula = func.displayFp;
  } else {
    left = rightPanelLeft;
    right = rightPanelRight;
    yMin = yMinFpp;
    yMax = yMaxFpp;
    evalFunc = func.fpp;
    col = colorFpp;
    label = "f''(x)";
    formula = func.displayFpp;
  }

  let top = derivativeGraphTop;
  let bottom = derivativeGraphBottom;

  // Background
  fill(255, 255, 255, 230);
  stroke(180);
  strokeWeight(1);
  rect(left - 35, top, right - left + 40, bottom - top, 5);

  // Label
  fill(col[0], col[1], col[2]);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text(label, left - 30, top + 5);

  // Formula
  textAlign(RIGHT, TOP);
  textSize(10);
  fill(100);
  text(formula, right, top + 5);

  // Grid
  let graphTop = top + 20;
  let graphBottom = bottom - 5;
  drawGrid(left, right, graphTop, graphBottom, xMin, xMax, yMin, yMax, true);

  // Zero line highlighted
  let y0 = map(0, yMin, yMax, graphBottom, graphTop);
  if (y0 > graphTop && y0 < graphBottom) {
    stroke(200, 100, 100);
    strokeWeight(2);
    line(left, y0, right, y0);

    // Label zeros
    noStroke();
    fill(180, 80, 80);
    textAlign(RIGHT, BOTTOM);
    textSize(9);
    text('zero', left - 3, y0);
  }

  // Draw curve
  stroke(col[0], col[1], col[2]);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let px = left; px <= right; px += 2) {
    let x = map(px, left, right, xMin, xMax);
    let y = evalFunc(x);
    let py = map(y, yMin, yMax, graphBottom, graphTop);

    if (py >= graphTop - 10 && py <= graphBottom + 10) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();

  // Mark zeros with vertical lines to main graph
  let zeros = side === 'left' ? func.criticalPts : func.inflectionPts;
  for (let z of zeros) {
    if (z >= xMin && z <= xMax) {
      let px = map(z, xMin, xMax, left, right);

      stroke(col[0], col[1], col[2], 100);
      strokeWeight(1);
      drawingContext.setLineDash([3, 3]);
      line(px, graphTop, px, graphBottom);
      drawingContext.setLineDash([]);

      // Circle at zero crossing
      let py = map(0, yMin, yMax, graphBottom, graphTop);
      fill(col[0], col[1], col[2]);
      noStroke();
      circle(px, py, 8);
    }
  }

  // Current x indicator
  let currPx = map(currentX, xMin, xMax, left, right);
  if (currPx >= left && currPx <= right) {
    stroke(100, 100, 200, 100);
    strokeWeight(1);
    drawingContext.setLineDash([2, 2]);
    line(currPx, graphTop, currPx, graphBottom);
    drawingContext.setLineDash([]);

    let y = evalFunc(currentX);
    let py = map(y, yMin, yMax, graphBottom, graphTop);
    if (py >= graphTop && py <= graphBottom) {
      fill(col[0], col[1], col[2]);
      stroke(255);
      strokeWeight(1);
      circle(currPx, py, 8);
    }
  }

  // Sign chart below
  drawSignChart(side, func, left, right, graphBottom + 2);
}

function drawSignChart(side, func, left, right, top) {
  let evalFunc = side === 'left' ? func.fp : func.fpp;
  let zeros = side === 'left' ? func.criticalPts : func.inflectionPts;

  // Sort zeros
  let sortedZeros = [...zeros].filter(z => z >= xMin && z <= xMax).sort((a, b) => a - b);

  // Draw sign indicators between zeros
  let intervals = [];
  let prevX = xMin;

  for (let z of sortedZeros) {
    intervals.push([prevX, z]);
    prevX = z;
  }
  intervals.push([prevX, xMax]);

  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);

  for (let [x1, x2] of intervals) {
    let midX = (x1 + x2) / 2;
    let sign = evalFunc(midX);
    let px = map(midX, xMin, xMax, left, right);

    if (sign > 0.01) {
      fill(0, 150, 50);
      text('+', px, top);
    } else if (sign < -0.01) {
      fill(200, 50, 50);
      text('-', px, top);
    }
  }
}

function drawSummaryTable(func) {
  let left = margin + 10;
  let right = canvasWidth - margin - 10;
  let top = summaryTop;
  let height = summaryHeight;

  // Background
  fill(250, 250, 255);
  stroke(180);
  strokeWeight(1);
  rect(left, top, right - left, height, 5);

  // Title
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Analysis Summary', left + 10, top + 5);
  textStyle(NORMAL);

  // Current point info
  let y = func.f(currentX);
  let fp = func.fp(currentX);
  let fpp = func.fpp(currentX);

  textSize(11);
  let col1 = left + 10;
  let col2 = left + 200;
  let col3 = left + 400;
  let row1 = top + 25;
  let rowH = 16;

  // Column 1: Current values
  fill(80);
  text('At x = ' + currentX.toFixed(2) + ':', col1, row1);
  text('f(x) = ' + y.toFixed(3), col1 + 10, row1 + rowH);
  text("f'(x) = " + fp.toFixed(3), col1 + 10, row1 + 2*rowH);
  text("f''(x) = " + fpp.toFixed(3), col1 + 10, row1 + 3*rowH);

  // Column 2: Behavior
  text('Behavior:', col2, row1);
  fill(fp > 0.01 ? [0, 150, 50] : (fp < -0.01 ? [200, 50, 50] : [100, 100, 100]));
  text(fp > 0.01 ? 'Increasing' : (fp < -0.01 ? 'Decreasing' : 'Stationary'), col2 + 10, row1 + rowH);

  fill(fpp > 0.01 ? colorConcaveUp : (fpp < -0.01 ? colorConcaveDown : [100, 100, 100]));
  text(fpp > 0.01 ? 'Concave Up' : (fpp < -0.01 ? 'Concave Down' : 'Inflection'), col2 + 10, row1 + 2*rowH);

  // Column 3: Critical points summary
  fill(80);
  text('Critical Points:', col3, row1);

  let cpText = func.criticalPts.filter(cp => cp >= xMin && cp <= xMax)
    .map(cp => {
      let fppVal = func.fpp(cp);
      let type = fppVal > 0.01 ? 'min' : (fppVal < -0.01 ? 'max' : 'neither');
      return 'x=' + cp.toFixed(2) + ' (' + type + ')';
    }).join(', ');

  text(cpText || 'None in range', col3 + 10, row1 + rowH);

  text('Inflection Points:', col3, row1 + 2*rowH);
  let ipText = func.inflectionPts.filter(ip => ip >= xMin && ip <= xMax)
    .map(ip => 'x=' + ip.toFixed(2)).join(', ');
  text(ipText || 'None in range', col3 + 10, row1 + 3*rowH);
}

function drawStepIndicator() {
  // Step indicator box
  let boxW = 280;
  let boxH = 40;
  let boxX = (canvasWidth - boxW) / 2;
  let boxY = mainGraphBottom + 5;

  fill(255, 255, 220);
  stroke(200, 180, 100);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  fill(80);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(stepDescriptions[currentStep], boxX + boxW/2, boxY + boxH/2);
}

function drawGrid(left, right, top, bottom, xMin, xMax, yMin, yMax, compact = false) {
  stroke(235);
  strokeWeight(1);

  // Vertical grid lines
  let xStep = compact ? 1 : getGridStep(xMax - xMin);
  for (let i = Math.ceil(xMin / xStep) * xStep; i <= xMax; i += xStep) {
    let x = map(i, xMin, xMax, left, right);
    line(x, top, x, bottom);
  }

  // Horizontal grid lines
  let yStep = getGridStep(yMax - yMin);
  for (let i = Math.ceil(yMin / yStep) * yStep; i <= yMax; i += yStep) {
    let y = map(i, yMin, yMax, bottom, top);
    if (y > top && y < bottom) {
      line(left, y, right, y);
    }
  }
}

function getGridStep(range) {
  let magnitude = Math.pow(10, Math.floor(Math.log10(range)));
  let normalized = range / magnitude;

  if (normalized <= 2) return magnitude / 5;
  if (normalized <= 5) return magnitude / 2;
  return magnitude;
}

function drawAxes(left, right, top, bottom, xMin, xMax, yMin, yMax, xLabel, yLabel) {
  stroke(100);
  strokeWeight(1);

  // X-axis
  let y0 = map(0, yMin, yMax, bottom, top);
  if (y0 >= top && y0 <= bottom) {
    line(left, y0, right, y0);
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, left, right);
  if (x0 >= left && x0 <= right) {
    line(x0, top, x0, bottom);
  }

  // Axis labels
  fill(80);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text(xLabel, right - 10, y0 > top && y0 < bottom - 15 ? y0 + 3 : bottom - 15);

  textAlign(RIGHT, CENTER);
  text(yLabel, x0 > left + 15 && x0 < right ? x0 - 3 : left + 15, top + 10);
}

function drawControls() {
  // Function selector buttons
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Function:', funcBtnX, funcBtnY + funcBtnH/2);

  for (let i = 0; i < functions.length; i++) {
    let bx = funcBtnX + 60 + i * (funcBtnW + 5);

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

  // Checkboxes
  drawCheckbox(checkboxX, checkboxY, 'Critical Pts', showCriticalPts);
  drawCheckbox(checkboxX, checkboxY + checkboxSpacing, 'Inflection Pts', showInflectionPts);
  drawCheckbox(checkboxX + 110, checkboxY, 'Concavity', showConcavityShading);
  drawCheckbox(checkboxX + 110, checkboxY + checkboxSpacing, 'Derivatives', showDerivativeGraphs);

  // Step mode controls
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Step Mode:', stepBtnX - 75, stepBtnY + stepBtnH/2);

  // Step toggle button
  fill(stepMode ? '#FF9800' : '#e0e0e0');
  stroke(stepMode ? '#F57C00' : '#bdbdbd');
  strokeWeight(1);
  rect(stepBtnX, stepBtnY, stepBtnW, stepBtnH, 5);

  fill(stepMode ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(stepMode ? 'ON' : 'OFF', stepBtnX + stepBtnW/2, stepBtnY + stepBtnH/2);

  if (stepMode) {
    // Prev/Next buttons
    let navBtnW = 50;
    let prevX = stepBtnX + stepBtnW + 10;
    let nextX = prevX + navBtnW + 5;

    // Prev button
    fill(currentStep > 0 ? '#2196F3' : '#ccc');
    stroke(currentStep > 0 ? '#1976D2' : '#aaa');
    rect(prevX, stepBtnY, navBtnW, stepBtnH, 5);
    fill(currentStep > 0 ? 'white' : '#888');
    noStroke();
    text('Prev', prevX + navBtnW/2, stepBtnY + stepBtnH/2);

    // Next button
    fill(currentStep < totalSteps - 1 ? '#2196F3' : '#ccc');
    stroke(currentStep < totalSteps - 1 ? '#1976D2' : '#aaa');
    rect(nextX, stepBtnY, navBtnW, stepBtnH, 5);
    fill(currentStep < totalSteps - 1 ? 'white' : '#888');
    noStroke();
    text('Next', nextX + navBtnW/2, stepBtnY + stepBtnH/2);
  }

  // X slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('x = ' + currentX.toFixed(2), sliderX, sliderY);

  // Slider track
  let trackX = sliderX + 60;
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(trackX, sliderY - 5, sliderW, 10, 5);

  // Slider handle
  let handleX = map(currentX, xMin, xMax, trackX, trackX + sliderW);
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleX, sliderY, 18);

  // Legend
  drawLegend();
}

function drawCheckbox(x, y, label, checked) {
  // Checkbox box
  fill(checked ? '#4CAF50' : 'white');
  stroke(checked ? '#388E3C' : '#bdbdbd');
  strokeWeight(1);
  rect(x, y, 16, 16, 3);

  if (checked) {
    stroke(255);
    strokeWeight(2);
    line(x + 3, y + 8, x + 6, y + 12);
    line(x + 6, y + 12, x + 13, y + 4);
  }

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text(label, x + 20, y + 8);
}

function drawLegend() {
  let legendX = sliderX + sliderW + 90;
  let legendY = drawHeight + 55;

  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);

  // Legend items
  fill(colorInc[0], colorInc[1], colorInc[2]);
  rect(legendX, legendY, 12, 12);
  fill(80);
  text('Increasing', legendX + 16, legendY + 6);

  fill(colorDec[0], colorDec[1], colorDec[2]);
  rect(legendX + 75, legendY, 12, 12);
  fill(80);
  text('Decreasing', legendX + 91, legendY + 6);

  fill(colorConcaveUp[0], colorConcaveUp[1], colorConcaveUp[2]);
  noStroke();
  rect(legendX, legendY + 18, 12, 3);
  fill(80);
  text('Concave Up', legendX + 16, legendY + 19);

  stroke(colorConcaveDown[0], colorConcaveDown[1], colorConcaveDown[2]);
  strokeWeight(2);
  drawingContext.setLineDash([3, 2]);
  line(legendX, legendY + 36, legendX + 12, legendY + 36);
  drawingContext.setLineDash([]);
  fill(80);
  noStroke();
  text('Concave Down', legendX + 16, legendY + 37);

  // Point markers
  fill(0, 150, 50);
  stroke(255);
  strokeWeight(1);
  circle(legendX + 155, legendY + 6, 10);
  fill(80);
  noStroke();
  text('Min', legendX + 163, legendY + 6);

  fill(200, 50, 50);
  stroke(255);
  strokeWeight(1);
  circle(legendX + 195, legendY + 6, 10);
  fill(80);
  noStroke();
  text('Max', legendX + 203, legendY + 6);

  fill(150, 50, 150);
  stroke(255);
  strokeWeight(1);
  push();
  translate(legendX + 155, legendY + 24);
  rotate(PI/4);
  rectMode(CENTER);
  rect(0, 0, 8, 8);
  pop();
  fill(80);
  noStroke();
  text('Inflection', legendX + 163, legendY + 24);
}

function drawHoverInfo(func) {
  let left = margin + 45;
  let right = canvasWidth - margin - 10;

  let x = map(mouseX, left, right, xMin, xMax);
  x = constrain(x, xMin, xMax);

  let y = func.f(x);
  let fp = func.fp(x);
  let fpp = func.fpp(x);

  // Info box near cursor
  let boxW = 130;
  let boxH = 65;
  let boxX = mouseX + 15;
  let boxY = mouseY - 30;

  // Keep box in bounds
  if (boxX + boxW > canvasWidth - 10) boxX = mouseX - boxW - 15;
  if (boxY < mainGraphTop) boxY = mainGraphTop + 5;
  if (boxY + boxH > mainGraphBottom) boxY = mainGraphBottom - boxH - 5;

  fill(255, 255, 240, 240);
  stroke(180);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('x = ' + x.toFixed(3), boxX + 8, boxY + 5);
  text('f(x) = ' + y.toFixed(3), boxX + 8, boxY + 20);
  text("f'(x) = " + fp.toFixed(3), boxX + 8, boxY + 35);
  text("f''(x) = " + fpp.toFixed(3), boxX + 8, boxY + 50);
}

function isInMainGraph(mx, my) {
  let left = margin + 45;
  let right = canvasWidth - margin - 10;
  return mx >= left && mx <= right && my >= mainGraphTop && my <= mainGraphBottom;
}

function mousePressed() {
  // Check function buttons
  for (let i = 0; i < functions.length; i++) {
    let bx = funcBtnX + 60 + i * (funcBtnW + 5);
    if (mouseX >= bx && mouseX <= bx + funcBtnW &&
        mouseY >= funcBtnY && mouseY <= funcBtnY + funcBtnH) {
      currentFunction = i;
      updateFunctionRanges();
      currentX = constrain(currentX, xMin, xMax);
      return;
    }
  }

  // Check checkboxes
  if (isInCheckbox(checkboxX, checkboxY)) {
    showCriticalPts = !showCriticalPts;
    return;
  }
  if (isInCheckbox(checkboxX, checkboxY + checkboxSpacing)) {
    showInflectionPts = !showInflectionPts;
    return;
  }
  if (isInCheckbox(checkboxX + 110, checkboxY)) {
    showConcavityShading = !showConcavityShading;
    return;
  }
  if (isInCheckbox(checkboxX + 110, checkboxY + checkboxSpacing)) {
    showDerivativeGraphs = !showDerivativeGraphs;
    return;
  }

  // Check step mode toggle
  if (mouseX >= stepBtnX && mouseX <= stepBtnX + stepBtnW &&
      mouseY >= stepBtnY && mouseY <= stepBtnY + stepBtnH) {
    stepMode = !stepMode;
    currentStep = 0;
    return;
  }

  // Check step navigation buttons
  if (stepMode) {
    let navBtnW = 50;
    let prevX = stepBtnX + stepBtnW + 10;
    let nextX = prevX + navBtnW + 5;

    if (mouseX >= prevX && mouseX <= prevX + navBtnW &&
        mouseY >= stepBtnY && mouseY <= stepBtnY + stepBtnH) {
      if (currentStep > 0) currentStep--;
      return;
    }

    if (mouseX >= nextX && mouseX <= nextX + navBtnW &&
        mouseY >= stepBtnY && mouseY <= stepBtnY + stepBtnH) {
      if (currentStep < totalSteps - 1) currentStep++;
      return;
    }
  }

  // Check x slider
  let trackX = sliderX + 60;
  let handleX = map(currentX, xMin, xMax, trackX, trackX + sliderW);
  if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check slider track click
  if (mouseY > sliderY - 12 && mouseY < sliderY + 12 &&
      mouseX > trackX && mouseX < trackX + sliderW) {
    currentX = map(mouseX, trackX, trackX + sliderW, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    isDraggingSlider = true;
    return;
  }

  // Check main graph for dragging
  if (isInMainGraph(mouseX, mouseY)) {
    let left = margin + 45;
    let right = canvasWidth - margin - 10;
    currentX = map(mouseX, left, right, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    isDraggingMainGraph = true;
  }
}

function isInCheckbox(x, y) {
  return mouseX >= x && mouseX <= x + 100 && mouseY >= y && mouseY <= y + 16;
}

function mouseDragged() {
  if (isDraggingSlider) {
    let trackX = sliderX + 60;
    currentX = map(mouseX, trackX, trackX + sliderW, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    currentX = Math.round(currentX * 100) / 100;
  }

  if (isDraggingMainGraph && isInMainGraph(mouseX, mouseY)) {
    let left = margin + 45;
    let right = canvasWidth - margin - 10;
    currentX = map(mouseX, left, right, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    currentX = Math.round(currentX * 100) / 100;
  }
}

function mouseReleased() {
  isDraggingSlider = false;
  isDraggingMainGraph = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayout();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = Math.max(canvasWidth, 600); // Minimum width for readability
  updateLayout();
}
