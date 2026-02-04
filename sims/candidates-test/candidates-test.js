// Candidates Test Calculator MicroSim
// Guide students through the closed interval method for finding global extrema
// Bloom Level: Apply (L3), Verbs: apply, execute, implement
// Learning Objective: Students will apply the candidates test to find global extrema on closed intervals

let canvasWidth = 750;
let drawHeight = 500;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Graph dimensions
let graphLeft = 60;
let graphTop = 100;
let graphWidth, graphHeight;
let graphBottom, graphRight;

// Color scheme
const ENDPOINT_COLOR = [50, 100, 230];     // Blue for endpoints
const CRITICAL_COLOR = [230, 100, 50];     // Orange for critical points
const MAX_COLOR = [0, 150, 80];            // Green for global max
const MIN_COLOR = [180, 50, 180];          // Purple for global min
const DERIVATIVE_COLOR = [150, 150, 150];  // Gray for derivative curve
const FUNCTION_COLOR = [40, 40, 40];       // Dark for function curve

// Current state
let currentStep = 0;
let maxSteps = 5;
let selectedFunction = 0;
let showAllSteps = false;
let showDerivative = false;
let intervalA = -2;
let intervalB = 2;

// Function presets with calculus info
const functions = [
  {
    name: 'Cubic',
    f: (x) => x*x*x - 3*x,
    fPrime: (x) => 3*x*x - 3,
    fString: 'f(x) = x^3 - 3x',
    fPrimeString: "f'(x) = 3x^2 - 3",
    criticalPoints: (a, b) => {
      // 3x^2 - 3 = 0 => x = +/- 1
      let pts = [];
      if (-1 >= a && -1 <= b) pts.push(-1);
      if (1 >= a && 1 <= b) pts.push(1);
      return pts;
    },
    defaultA: -2,
    defaultB: 2
  },
  {
    name: 'Quadratic',
    f: (x) => -x*x + 4*x - 1,
    fPrime: (x) => -2*x + 4,
    fString: 'f(x) = -x^2 + 4x - 1',
    fPrimeString: "f'(x) = -2x + 4",
    criticalPoints: (a, b) => {
      // -2x + 4 = 0 => x = 2
      let pts = [];
      if (2 >= a && 2 <= b) pts.push(2);
      return pts;
    },
    defaultA: 0,
    defaultB: 4
  },
  {
    name: 'Quartic',
    f: (x) => x*x*x*x - 4*x*x + 2,
    fPrime: (x) => 4*x*x*x - 8*x,
    fString: 'f(x) = x^4 - 4x^2 + 2',
    fPrimeString: "f'(x) = 4x^3 - 8x",
    criticalPoints: (a, b) => {
      // 4x^3 - 8x = 0 => 4x(x^2 - 2) = 0 => x = 0, +/- sqrt(2)
      let pts = [];
      let sqrt2 = Math.sqrt(2);
      if (0 >= a && 0 <= b) pts.push(0);
      if (-sqrt2 >= a && -sqrt2 <= b) pts.push(-sqrt2);
      if (sqrt2 >= a && sqrt2 <= b) pts.push(sqrt2);
      return pts.sort((x, y) => x - y);
    },
    defaultA: -2,
    defaultB: 2
  },
  {
    name: 'Sine',
    f: (x) => Math.sin(x) + 0.5*x,
    fPrime: (x) => Math.cos(x) + 0.5,
    fString: 'f(x) = sin(x) + 0.5x',
    fPrimeString: "f'(x) = cos(x) + 0.5",
    criticalPoints: (a, b) => {
      // cos(x) = -0.5 => x = 2pi/3 + 2kpi or x = 4pi/3 + 2kpi
      let pts = [];
      let base1 = 2 * Math.PI / 3;
      let base2 = 4 * Math.PI / 3;
      for (let k = -3; k <= 3; k++) {
        let x1 = base1 + 2 * Math.PI * k;
        let x2 = base2 + 2 * Math.PI * k;
        if (x1 >= a && x1 <= b) pts.push(x1);
        if (x2 >= a && x2 <= b) pts.push(x2);
      }
      return pts.sort((x, y) => x - y);
    },
    defaultA: -3,
    defaultB: 3
  }
];

// Computed candidate data
let candidates = [];
let globalMax = null;
let globalMin = null;

// Button positions (will be computed)
let nextBtnX, nextBtnY, nextBtnW, nextBtnH;
let showAllBtnX, showAllBtnY;
let resetBtnX, resetBtnY;
let derivToggleX, derivToggleY;

// Animation
let animationPhase = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Set initial interval from first function
  intervalA = functions[selectedFunction].defaultA;
  intervalB = functions[selectedFunction].defaultB;

  computeCandidates();
  updateButtonPositions();

  describe('Interactive candidates test calculator showing step-by-step method for finding global extrema on closed intervals with function graph and table of candidate values.', LABEL);
}

function updateButtonPositions() {
  // Control buttons layout
  nextBtnX = 20;
  nextBtnY = drawHeight + 12;
  nextBtnW = 90;
  nextBtnH = 30;

  showAllBtnX = nextBtnX + nextBtnW + 10;
  showAllBtnY = nextBtnY;

  resetBtnX = showAllBtnX + nextBtnW + 10;
  resetBtnY = nextBtnY;

  derivToggleX = resetBtnX + 80;
  derivToggleY = nextBtnY;
}

function computeCandidates() {
  let func = functions[selectedFunction];
  candidates = [];

  // Add endpoints
  candidates.push({
    x: intervalA,
    y: func.f(intervalA),
    type: 'endpoint',
    label: 'a = ' + intervalA.toFixed(2)
  });

  candidates.push({
    x: intervalB,
    y: func.f(intervalB),
    type: 'endpoint',
    label: 'b = ' + intervalB.toFixed(2)
  });

  // Add critical points
  let critPts = func.criticalPoints(intervalA, intervalB);
  for (let cp of critPts) {
    candidates.push({
      x: cp,
      y: func.f(cp),
      type: 'critical',
      label: 'c = ' + cp.toFixed(2)
    });
  }

  // Sort by x value
  candidates.sort((a, b) => a.x - b.x);

  // Find global max and min
  globalMax = candidates[0];
  globalMin = candidates[0];
  for (let c of candidates) {
    if (c.y > globalMax.y) globalMax = c;
    if (c.y < globalMin.y) globalMin = c;
  }
}

function draw() {
  updateCanvasSize();
  animationPhase += 0.03;

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update graph dimensions
  graphWidth = canvasWidth * 0.48 - graphLeft - margin;
  graphHeight = drawHeight - graphTop - 60;
  graphBottom = graphTop + graphHeight;
  graphRight = graphLeft + graphWidth;

  // Draw title
  drawTitle();

  // Draw the function graph
  drawGraph();

  // Draw the steps and table
  drawStepsAndTable();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Candidates Test Calculator', canvasWidth / 2, 8);

  let func = functions[selectedFunction];
  textSize(14);
  fill(80);
  text(func.fString + '  on  [' + intervalA.toFixed(1) + ', ' + intervalB.toFixed(1) + ']', canvasWidth / 2, 32);
}

function drawGraph() {
  let func = functions[selectedFunction];

  // Graph background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft - 5, graphTop - 5, graphWidth + 10, graphHeight + 10, 5);

  // Calculate scale
  let xMin = intervalA - 0.5;
  let xMax = intervalB + 0.5;

  // Find y range from function values
  let yValues = [];
  for (let px = 0; px <= graphWidth; px += 2) {
    let x = map(px, 0, graphWidth, xMin, xMax);
    yValues.push(func.f(x));
    if (showDerivative) {
      yValues.push(func.fPrime(x));
    }
  }
  let yMin = Math.min(...yValues) - 0.5;
  let yMax = Math.max(...yValues) + 0.5;

  // Helper to convert to screen coordinates
  function toScreenX(x) {
    return map(x, xMin, xMax, graphLeft, graphRight);
  }
  function toScreenY(y) {
    return map(y, yMin, yMax, graphBottom, graphTop);
  }

  // Draw grid
  stroke(230);
  strokeWeight(1);
  for (let i = Math.ceil(xMin); i <= Math.floor(xMax); i++) {
    let sx = toScreenX(i);
    line(sx, graphTop, sx, graphBottom);
  }
  for (let i = Math.ceil(yMin); i <= Math.floor(yMax); i++) {
    let sy = toScreenY(i);
    line(graphLeft, sy, graphRight, sy);
  }

  // Draw axes
  stroke(100);
  strokeWeight(1.5);
  // x-axis if in view
  if (yMin <= 0 && yMax >= 0) {
    let y0 = toScreenY(0);
    line(graphLeft, y0, graphRight, y0);
  }
  // y-axis if in view
  if (xMin <= 0 && xMax >= 0) {
    let x0 = toScreenX(0);
    line(x0, graphTop, x0, graphBottom);
  }

  // Draw interval markers (vertical dashed lines at a and b)
  stroke(ENDPOINT_COLOR[0], ENDPOINT_COLOR[1], ENDPOINT_COLOR[2]);
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  let xa = toScreenX(intervalA);
  let xb = toScreenX(intervalB);
  line(xa, graphTop, xa, graphBottom);
  line(xb, graphTop, xb, graphBottom);
  drawingContext.setLineDash([]);

  // Draw derivative curve if toggled
  if (showDerivative) {
    stroke(DERIVATIVE_COLOR[0], DERIVATIVE_COLOR[1], DERIVATIVE_COLOR[2]);
    strokeWeight(1.5);
    noFill();
    beginShape();
    for (let px = 0; px <= graphWidth; px += 2) {
      let x = map(px, 0, graphWidth, xMin, xMax);
      let y = func.fPrime(x);
      vertex(toScreenX(x), toScreenY(y));
    }
    endShape();

    // Label
    fill(DERIVATIVE_COLOR[0], DERIVATIVE_COLOR[1], DERIVATIVE_COLOR[2]);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text("f'(x)", graphRight - 35, graphTop + 5);
  }

  // Draw the function curve
  stroke(FUNCTION_COLOR[0], FUNCTION_COLOR[1], FUNCTION_COLOR[2]);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let px = 0; px <= graphWidth; px += 2) {
    let x = map(px, 0, graphWidth, xMin, xMax);
    let y = func.f(x);
    vertex(toScreenX(x), toScreenY(y));
  }
  endShape();

  // Label function
  fill(FUNCTION_COLOR[0], FUNCTION_COLOR[1], FUNCTION_COLOR[2]);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('f(x)', graphRight - 25, graphTop + (showDerivative ? 20 : 5));

  // Draw candidate points based on current step
  if (currentStep >= 1 || showAllSteps) {
    // Step 1: Show endpoints
    for (let c of candidates) {
      if (c.type === 'endpoint') {
        drawCandidatePoint(toScreenX(c.x), toScreenY(c.y), ENDPOINT_COLOR, false);
      }
    }
  }

  if (currentStep >= 2 || showAllSteps) {
    // Step 2: Show critical points
    for (let c of candidates) {
      if (c.type === 'critical') {
        drawCandidatePoint(toScreenX(c.x), toScreenY(c.y), CRITICAL_COLOR, false);
      }
    }
  }

  if (currentStep >= 4 || showAllSteps) {
    // Step 4: Highlight max and min with horizontal dashed lines
    stroke(MAX_COLOR[0], MAX_COLOR[1], MAX_COLOR[2], 150);
    strokeWeight(1.5);
    drawingContext.setLineDash([8, 4]);
    let yMaxScreen = toScreenY(globalMax.y);
    line(graphLeft, yMaxScreen, graphRight, yMaxScreen);

    stroke(MIN_COLOR[0], MIN_COLOR[1], MIN_COLOR[2], 150);
    let yMinScreen = toScreenY(globalMin.y);
    line(graphLeft, yMinScreen, graphRight, yMinScreen);
    drawingContext.setLineDash([]);

    // Circle the winners
    let maxX = toScreenX(globalMax.x);
    let maxY = toScreenY(globalMax.y);
    let minX = toScreenX(globalMin.x);
    let minY = toScreenY(globalMin.y);

    // Animated circles
    let pulse = sin(animationPhase * 2) * 3 + 18;

    noFill();
    stroke(MAX_COLOR[0], MAX_COLOR[1], MAX_COLOR[2]);
    strokeWeight(3);
    circle(maxX, maxY, pulse);

    stroke(MIN_COLOR[0], MIN_COLOR[1], MIN_COLOR[2]);
    circle(minX, minY, pulse);
  }

  // Draw axis labels
  fill(80);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('x', graphLeft + graphWidth / 2, graphBottom + 8);

  textAlign(RIGHT, CENTER);
  push();
  translate(graphLeft - 12, graphTop + graphHeight / 2);
  rotate(-HALF_PI);
  text('y', 0, 0);
  pop();

  // Draw tick labels
  textAlign(CENTER, TOP);
  textSize(10);
  for (let i = Math.ceil(xMin); i <= Math.floor(xMax); i++) {
    if (i !== 0 || !(yMin <= 0 && yMax >= 0)) {
      text(i, toScreenX(i), graphBottom + 2);
    }
  }

  textAlign(RIGHT, CENTER);
  for (let i = Math.ceil(yMin); i <= Math.floor(yMax); i++) {
    if (i !== 0 || !(xMin <= 0 && xMax >= 0)) {
      text(i, graphLeft - 5, toScreenY(i));
    }
  }
}

function drawCandidatePoint(sx, sy, color, isWinner) {
  fill(color[0], color[1], color[2]);
  stroke(255);
  strokeWeight(2);
  circle(sx, sy, isWinner ? 16 : 12);
}

function drawStepsAndTable() {
  let tableLeft = canvasWidth * 0.52;
  let tableWidth = canvasWidth - tableLeft - margin;
  let func = functions[selectedFunction];

  // Steps header
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text('Closed Interval Method Steps:', tableLeft, graphTop - 10);
  textStyle(NORMAL);

  // Step descriptions
  let steps = [
    '1. Identify endpoints a and b',
    "2. Find critical points (where f'(x) = 0)",
    '3. Evaluate f at all candidates',
    '4. Compare values to find extrema',
    '5. State the global max and min'
  ];

  let stepY = graphTop + 10;
  textSize(12);

  for (let i = 0; i < steps.length; i++) {
    let isRevealed = i < currentStep || showAllSteps;
    let isCurrent = i === currentStep && !showAllSteps;

    if (isCurrent) {
      // Highlight current step
      fill(255, 255, 200);
      stroke(200);
      strokeWeight(1);
      rect(tableLeft - 5, stepY - 3, tableWidth + 10, 20, 3);

      fill(0, 100, 200);
      noStroke();
    } else if (isRevealed) {
      fill(60);
      noStroke();
    } else {
      fill(180);
      noStroke();
    }

    textAlign(LEFT, TOP);
    text(steps[i], tableLeft, stepY);

    // Checkmark for completed steps
    if (i < currentStep || showAllSteps) {
      fill(0, 150, 80);
      text(' ✓', tableLeft + textWidth(steps[i]), stepY);
    }

    stepY += 22;
  }

  // Candidates table
  let tableTop = stepY + 20;
  let rowHeight = 26;
  let colWidth = tableWidth / 3;

  // Table header
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(tableLeft, tableTop, tableWidth, rowHeight, 5, 5, 0, 0);

  fill(40);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('Point', tableLeft + colWidth * 0.5, tableTop + rowHeight / 2);
  text('x', tableLeft + colWidth * 1.5, tableTop + rowHeight / 2);
  text('f(x)', tableLeft + colWidth * 2.5, tableTop + rowHeight / 2);
  textStyle(NORMAL);

  // Table rows
  let showTable = currentStep >= 3 || showAllSteps;
  let highlightWinners = currentStep >= 4 || showAllSteps;

  for (let i = 0; i < candidates.length; i++) {
    let c = candidates[i];
    let rowY = tableTop + rowHeight * (i + 1);
    let isMax = highlightWinners && c === globalMax;
    let isMin = highlightWinners && c === globalMin;

    // Row background
    if (isMax) {
      fill(MAX_COLOR[0], MAX_COLOR[1], MAX_COLOR[2], 50);
    } else if (isMin) {
      fill(MIN_COLOR[0], MIN_COLOR[1], MIN_COLOR[2], 50);
    } else {
      fill(i % 2 === 0 ? 250 : 255);
    }
    stroke(200);
    strokeWeight(1);
    let isLast = i === candidates.length - 1;
    rect(tableLeft, rowY, tableWidth, rowHeight, 0, 0, isLast ? 5 : 0, isLast ? 5 : 0);

    if (showTable) {
      // Point type
      fill(c.type === 'endpoint' ?
           [ENDPOINT_COLOR[0], ENDPOINT_COLOR[1], ENDPOINT_COLOR[2]] :
           [CRITICAL_COLOR[0], CRITICAL_COLOR[1], CRITICAL_COLOR[2]]);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(11);
      text(c.type === 'endpoint' ? 'Endpoint' : 'Critical', tableLeft + colWidth * 0.5, rowY + rowHeight / 2);

      // x value
      fill(40);
      text(c.x.toFixed(3), tableLeft + colWidth * 1.5, rowY + rowHeight / 2);

      // f(x) value - build row by row if stepping
      let showValue = (currentStep >= 3 || showAllSteps);
      if (showValue) {
        text(c.y.toFixed(3), tableLeft + colWidth * 2.5, rowY + rowHeight / 2);
      } else {
        fill(180);
        text('?', tableLeft + colWidth * 2.5, rowY + rowHeight / 2);
      }

      // Star for winners
      if (isMax || isMin) {
        fill(isMax ? MAX_COLOR : MIN_COLOR);
        textSize(16);
        text('★', tableLeft + tableWidth - 15, rowY + rowHeight / 2);
      }
    } else {
      fill(180);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(11);
      text('...', tableLeft + colWidth * 1.5, rowY + rowHeight / 2);
    }
  }

  // Final answer box (Step 5)
  if (currentStep >= 4 || showAllSteps) {
    let answerY = tableTop + rowHeight * (candidates.length + 1) + 15;

    fill(255, 255, 240);
    stroke(MAX_COLOR[0], MAX_COLOR[1], MAX_COLOR[2]);
    strokeWeight(2);
    rect(tableLeft, answerY, tableWidth, 60, 8);

    fill(40);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Results:', tableLeft + 10, answerY + 8);
    textStyle(NORMAL);

    fill(MAX_COLOR[0], MAX_COLOR[1], MAX_COLOR[2]);
    textSize(11);
    text('Global Max: f(' + globalMax.x.toFixed(2) + ') = ' + globalMax.y.toFixed(3),
         tableLeft + 10, answerY + 26);

    fill(MIN_COLOR[0], MIN_COLOR[1], MIN_COLOR[2]);
    text('Global Min: f(' + globalMin.x.toFixed(2) + ') = ' + globalMin.y.toFixed(3),
         tableLeft + 10, answerY + 42);
  }
}

function drawControls() {
  // Row 1: Navigation buttons

  // Next Step button
  let canAdvance = currentStep < maxSteps - 1 && !showAllSteps;
  fill(canAdvance ? '#4CAF50' : '#cccccc');
  stroke(canAdvance ? '#388E3C' : '#aaaaaa');
  strokeWeight(1);
  rect(nextBtnX, nextBtnY, nextBtnW, nextBtnH, 5);

  fill(canAdvance ? 'white' : '#888888');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Next Step', nextBtnX + nextBtnW / 2, nextBtnY + nextBtnH / 2);

  // Show All button
  fill(showAllSteps ? '#cccccc' : '#2196F3');
  stroke(showAllSteps ? '#aaaaaa' : '#1976D2');
  strokeWeight(1);
  rect(showAllBtnX, showAllBtnY, nextBtnW, nextBtnH, 5);

  fill(showAllSteps ? '#888888' : 'white');
  noStroke();
  text('Show All', showAllBtnX + nextBtnW / 2, showAllBtnY + nextBtnH / 2);

  // Reset button
  fill('#ff9800');
  stroke('#f57c00');
  strokeWeight(1);
  rect(resetBtnX, resetBtnY, 65, nextBtnH, 5);

  fill('white');
  noStroke();
  text('Reset', resetBtnX + 32, resetBtnY + nextBtnH / 2);

  // Show Derivative toggle
  fill(showDerivative ? '#9c27b0' : '#e0e0e0');
  stroke(showDerivative ? '#7b1fa2' : '#bdbdbd');
  strokeWeight(1);
  rect(derivToggleX, derivToggleY, 100, nextBtnH, 5);

  fill(showDerivative ? 'white' : 'black');
  noStroke();
  textSize(11);
  text("Show f'(x)", derivToggleX + 50, derivToggleY + nextBtnH / 2);

  // Row 2: Function selector and interval inputs
  let row2Y = drawHeight + 50;

  // Function selector label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Function:', 20, row2Y + 14);

  // Function buttons
  let funcBtnX = 85;
  let funcBtnW = 80;

  for (let i = 0; i < functions.length; i++) {
    let isSelected = selectedFunction === i;

    fill(isSelected ? '#3f51b5' : '#e0e0e0');
    stroke(isSelected ? '#303f9f' : '#bdbdbd');
    strokeWeight(1);
    rect(funcBtnX + i * (funcBtnW + 5), row2Y, funcBtnW, 28, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(functions[i].name, funcBtnX + i * (funcBtnW + 5) + funcBtnW / 2, row2Y + 14);
  }

  // Interval inputs
  let intervalLabelX = funcBtnX + functions.length * (funcBtnW + 5) + 20;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Interval: [', intervalLabelX, row2Y + 14);

  // Draw interval value boxes
  let aBoxX = intervalLabelX + 60;
  let bBoxX = aBoxX + 60;

  // a value box
  fill(255);
  stroke(150);
  strokeWeight(1);
  rect(aBoxX, row2Y + 2, 45, 24, 3);

  fill(40);
  noStroke();
  textAlign(CENTER, CENTER);
  text(intervalA.toFixed(1), aBoxX + 22, row2Y + 14);

  // comma
  fill('black');
  textAlign(LEFT, CENTER);
  text(',', aBoxX + 50, row2Y + 14);

  // b value box
  fill(255);
  stroke(150);
  strokeWeight(1);
  rect(bBoxX, row2Y + 2, 45, 24, 3);

  fill(40);
  noStroke();
  textAlign(CENTER, CENTER);
  text(intervalB.toFixed(1), bBoxX + 22, row2Y + 14);

  // closing bracket
  fill('black');
  textAlign(LEFT, CENTER);
  text(']', bBoxX + 50, row2Y + 14);

  // +/- buttons for a
  drawPlusMinus(aBoxX - 25, row2Y + 5, 'a');

  // +/- buttons for b
  drawPlusMinus(bBoxX + 50, row2Y + 5, 'b');
}

function drawPlusMinus(x, y, which) {
  // Minus button
  fill('#e0e0e0');
  stroke('#bdbdbd');
  strokeWeight(1);
  rect(x, y, 20, 18, 3);
  fill(40);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('-', x + 10, y + 9);

  // Plus button (for 'b' only, placed after the value)
  if (which === 'b') {
    fill('#e0e0e0');
    stroke('#bdbdbd');
    strokeWeight(1);
    rect(x + 25, y, 20, 18, 3);
    fill(40);
    noStroke();
    text('+', x + 35, y + 9);
  } else {
    // For 'a', put + button before the - button
    fill('#e0e0e0');
    stroke('#bdbdbd');
    strokeWeight(1);
    rect(x - 25, y, 20, 18, 3);
    fill(40);
    noStroke();
    text('+', x - 15, y + 9);
  }
}

function mousePressed() {
  let row2Y = drawHeight + 50;

  // Check Next Step button
  if (mouseX >= nextBtnX && mouseX <= nextBtnX + nextBtnW &&
      mouseY >= nextBtnY && mouseY <= nextBtnY + nextBtnH) {
    if (currentStep < maxSteps - 1 && !showAllSteps) {
      currentStep++;
    }
    return;
  }

  // Check Show All button
  if (mouseX >= showAllBtnX && mouseX <= showAllBtnX + nextBtnW &&
      mouseY >= showAllBtnY && mouseY <= showAllBtnY + nextBtnH) {
    showAllSteps = true;
    currentStep = maxSteps - 1;
    return;
  }

  // Check Reset button
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 65 &&
      mouseY >= resetBtnY && mouseY <= resetBtnY + nextBtnH) {
    resetSteps();
    return;
  }

  // Check derivative toggle
  if (mouseX >= derivToggleX && mouseX <= derivToggleX + 100 &&
      mouseY >= derivToggleY && mouseY <= derivToggleY + nextBtnH) {
    showDerivative = !showDerivative;
    return;
  }

  // Check function buttons
  let funcBtnX = 85;
  let funcBtnW = 80;

  for (let i = 0; i < functions.length; i++) {
    if (mouseX >= funcBtnX + i * (funcBtnW + 5) &&
        mouseX <= funcBtnX + i * (funcBtnW + 5) + funcBtnW &&
        mouseY >= row2Y && mouseY <= row2Y + 28) {
      if (selectedFunction !== i) {
        selectedFunction = i;
        intervalA = functions[i].defaultA;
        intervalB = functions[i].defaultB;
        computeCandidates();
        resetSteps();
      }
      return;
    }
  }

  // Check interval +/- buttons
  let intervalLabelX = funcBtnX + functions.length * (funcBtnW + 5) + 20;
  let aBoxX = intervalLabelX + 60;
  let bBoxX = aBoxX + 60;

  // a minus button
  if (mouseX >= aBoxX - 25 && mouseX <= aBoxX - 5 &&
      mouseY >= row2Y + 5 && mouseY <= row2Y + 23) {
    intervalA = Math.max(intervalA - 0.5, intervalB - 10);
    if (intervalA >= intervalB - 0.5) intervalA = intervalB - 0.5;
    computeCandidates();
    return;
  }

  // a plus button
  if (mouseX >= aBoxX - 50 && mouseX <= aBoxX - 30 &&
      mouseY >= row2Y + 5 && mouseY <= row2Y + 23) {
    intervalA = Math.min(intervalA + 0.5, intervalB - 0.5);
    computeCandidates();
    return;
  }

  // b minus button
  if (mouseX >= bBoxX + 50 && mouseX <= bBoxX + 70 &&
      mouseY >= row2Y + 5 && mouseY <= row2Y + 23) {
    intervalB = Math.max(intervalB - 0.5, intervalA + 0.5);
    computeCandidates();
    return;
  }

  // b plus button
  if (mouseX >= bBoxX + 75 && mouseX <= bBoxX + 95 &&
      mouseY >= row2Y + 5 && mouseY <= row2Y + 23) {
    intervalB = Math.min(intervalB + 0.5, intervalA + 10);
    computeCandidates();
    return;
  }
}

function resetSteps() {
  currentStep = 0;
  showAllSteps = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateButtonPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = max(canvasWidth, 700); // Minimum width for readability
  updateButtonPositions();
}
