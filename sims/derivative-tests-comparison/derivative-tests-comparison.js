// Derivative Tests Comparison MicroSim
// Compare First Derivative Test and Second Derivative Test for classifying critical points
// Bloom Level: Analyze (L4), Verb: Compare
// Learning Objective: Students will compare the First Derivative Test and Second Derivative Test
// methods for classifying critical points, understanding when each is most efficient.

let canvasWidth = 750;
let drawHeight = 520;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 50;
let defaultTextSize = 16;

// Panel dimensions
let panelHeight;
let panelGap = 6;
let panelLeft, panelRight;

// Coordinate ranges
let xMin = -3, xMax = 3;
let yMinF = -5, yMaxF = 5;   // for f(x)
let yMinFp = -6, yMaxFp = 6;  // for f'(x)
let yMinFpp = -12, yMaxFpp = 12;  // for f''(x)

// Current state
let currentFunction = 0;
let currentStep = 0;
let maxSteps = 4;
let showFGraph = true;
let showFpGraph = true;
let showFppGraph = true;

// Animation
let fadeProgress = [];
let animationPhase = 0;

// Function definitions with critical points and test results
const functions = [
  {
    name: 'x\u00B3 - 3x',
    displayF: 'f(x) = x\u00B3 - 3x',
    displayFp: "f'(x) = 3x\u00B2 - 3",
    displayFpp: "f''(x) = 6x",
    evalF: (x) => x*x*x - 3*x,
    evalFp: (x) => 3*x*x - 3,
    evalFpp: (x) => 6*x,
    criticalPoints: [-1, 1],
    criticalLabels: ['x = -1', 'x = 1'],
    firstTestResults: [
      { point: -1, leftSign: '+', rightSign: '-', conclusion: 'Local Maximum' },
      { point: 1, leftSign: '-', rightSign: '+', conclusion: 'Local Minimum' }
    ],
    secondTestResults: [
      { point: -1, fppValue: -6, sign: '-', conclusion: 'Local Maximum' },
      { point: 1, fppValue: 6, sign: '+', conclusion: 'Local Minimum' }
    ]
  },
  {
    name: 'x\u2074 - 2x\u00B2',
    displayF: 'f(x) = x\u2074 - 2x\u00B2',
    displayFp: "f'(x) = 4x\u00B3 - 4x",
    displayFpp: "f''(x) = 12x\u00B2 - 4",
    evalF: (x) => Math.pow(x,4) - 2*x*x,
    evalFp: (x) => 4*Math.pow(x,3) - 4*x,
    evalFpp: (x) => 12*x*x - 4,
    criticalPoints: [-1, 0, 1],
    criticalLabels: ['x = -1', 'x = 0', 'x = 1'],
    firstTestResults: [
      { point: -1, leftSign: '-', rightSign: '+', conclusion: 'Local Minimum' },
      { point: 0, leftSign: '+', rightSign: '-', conclusion: 'Local Maximum' },
      { point: 1, leftSign: '-', rightSign: '+', conclusion: 'Local Minimum' }
    ],
    secondTestResults: [
      { point: -1, fppValue: 8, sign: '+', conclusion: 'Local Minimum' },
      { point: 0, fppValue: -4, sign: '-', conclusion: 'Local Maximum' },
      { point: 1, fppValue: 8, sign: '+', conclusion: 'Local Minimum' }
    ]
  },
  {
    name: 'x\u00B3',
    displayF: 'f(x) = x\u00B3',
    displayFp: "f'(x) = 3x\u00B2",
    displayFpp: "f''(x) = 6x",
    evalF: (x) => x*x*x,
    evalFp: (x) => 3*x*x,
    evalFpp: (x) => 6*x,
    criticalPoints: [0],
    criticalLabels: ['x = 0'],
    firstTestResults: [
      { point: 0, leftSign: '+', rightSign: '+', conclusion: 'Neither (No sign change)' }
    ],
    secondTestResults: [
      { point: 0, fppValue: 0, sign: '0', conclusion: 'Inconclusive!' }
    ]
  }
];

// Colors
const colorF = [50, 100, 200];      // Blue for f(x)
const colorFp = [0, 150, 80];       // Green for f'(x)
const colorFpp = [200, 50, 50];     // Red for f''(x)
const colorCritical = [255, 140, 0]; // Orange for critical points

// Control positions
let stepBtnX, stepBtnY, stepBtnW, stepBtnH;
let resetBtnX;
let funcBtnsX, funcBtnsY;
let toggleBtnsY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Initialize fade progress
  for (let i = 0; i < maxSteps; i++) {
    fadeProgress[i] = 0;
  }

  updateLayoutPositions();

  describe('Interactive comparison of First Derivative Test and Second Derivative Test for classifying critical points. Shows three panels: f(x), f\'(x), and f\'\'(x) with step-through analysis.', LABEL);
}

function updateLayoutPositions() {
  // Calculate panel dimensions based on which graphs are shown
  let numPanels = (showFGraph ? 1 : 0) + (showFpGraph ? 1 : 0) + (showFppGraph ? 1 : 0);
  numPanels = max(numPanels, 1);

  let availableHeight = drawHeight - chartTop - 25;
  panelHeight = (availableHeight - (numPanels - 1) * panelGap) / numPanels;

  panelLeft = margin + 45;
  panelRight = canvasWidth - margin - 10;

  // Control positions
  stepBtnX = 15;
  stepBtnY = drawHeight + 12;
  stepBtnW = 100;
  stepBtnH = 32;

  resetBtnX = stepBtnX + stepBtnW + 10;

  funcBtnsX = 300;
  funcBtnsY = drawHeight + 8;

  toggleBtnsY = drawHeight + 60;
}

function draw() {
  updateCanvasSize();
  animationPhase += 0.03;

  // Update fade progress for revealed steps
  for (let i = 0; i < maxSteps; i++) {
    if (i <= currentStep) {
      fadeProgress[i] = min(fadeProgress[i] + 0.08, 1);
    } else {
      fadeProgress[i] = max(fadeProgress[i] - 0.08, 0);
    }
  }

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  drawTitle();

  // Draw function panels
  drawPanels();

  // Draw step information panel
  drawStepInfo();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('First vs Second Derivative Test', canvasWidth / 2, 5);
  textSize(13);
  fill(80);
  text('Comparing methods for classifying critical points', canvasWidth / 2, 26);
}

function drawPanels() {
  let func = functions[currentFunction];
  let currentY = chartTop;

  // Draw f(x) panel
  if (showFGraph) {
    drawFunctionPanel('f(x)', func.displayF, func.evalF, colorF, currentY, yMinF, yMaxF, true);
    currentY += panelHeight + panelGap;
  }

  // Draw f'(x) panel
  if (showFpGraph) {
    drawFunctionPanel("f'(x)", func.displayFp, func.evalFp, colorFp, currentY, yMinFp, yMaxFp, false);
    currentY += panelHeight + panelGap;
  }

  // Draw f''(x) panel
  if (showFppGraph) {
    drawFunctionPanel("f''(x)", func.displayFpp, func.evalFpp, colorFpp, currentY, yMinFpp, yMaxFpp, false);
  }
}

function drawFunctionPanel(label, formula, evalFunc, col, topY, yMin, yMax, isFPanel) {
  let func = functions[currentFunction];
  let bottomY = topY + panelHeight;

  // Panel background
  fill(255, 255, 255, 220);
  stroke(200);
  strokeWeight(1);
  rect(panelLeft - 40, topY, panelRight - panelLeft + 45, panelHeight, 5);

  // Panel label
  fill(col[0], col[1], col[2]);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text(label, panelLeft - 35, topY + 5);
  textStyle(NORMAL);

  // Formula
  textAlign(RIGHT, TOP);
  textSize(11);
  fill(100);
  text(formula, panelRight, topY + 5);

  // Graph area
  let graphTop = topY + 22;
  let graphBottom = bottomY - 5;

  // Grid
  stroke(235);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let x = map(i, xMin, xMax, panelLeft, panelRight);
    line(x, graphTop, x, graphBottom);
  }

  // Horizontal grid lines
  let yStep = (yMax - yMin) / 4;
  for (let i = 0; i <= 4; i++) {
    let yVal = yMin + i * yStep;
    let y = map(yVal, yMin, yMax, graphBottom, graphTop);
    line(panelLeft, y, panelRight, y);
  }

  // X-axis
  let y0 = map(0, yMin, yMax, graphBottom, graphTop);
  if (y0 > graphTop && y0 < graphBottom) {
    stroke(100);
    strokeWeight(1);
    line(panelLeft, y0, panelRight, y0);
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, panelLeft, panelRight);
  if (x0 > panelLeft && x0 < panelRight) {
    stroke(100);
    line(x0, graphTop, x0, graphBottom);
  }

  // Draw curve
  stroke(col[0], col[1], col[2]);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let px = panelLeft; px <= panelRight; px += 2) {
    let x = map(px, panelLeft, panelRight, xMin, xMax);
    let y = evalFunc(x);
    let py = map(y, yMin, yMax, graphBottom, graphTop);

    if (py >= graphTop - 10 && py <= graphBottom + 10) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();

  // Draw critical point markers (after Step 1)
  if (currentStep >= 1) {
    for (let cp of func.criticalPoints) {
      let cpx = map(cp, xMin, xMax, panelLeft, panelRight);

      // Dashed vertical line through all panels
      stroke(colorCritical[0], colorCritical[1], colorCritical[2], 150);
      strokeWeight(1);
      drawingContext.setLineDash([4, 4]);
      line(cpx, graphTop, cpx, graphBottom);
      drawingContext.setLineDash([]);

      // Point on curve
      let cpy = evalFunc(cp);
      let cppy = map(cpy, yMin, yMax, graphBottom, graphTop);

      if (cppy >= graphTop && cppy <= graphBottom) {
        fill(colorCritical[0], colorCritical[1], colorCritical[2]);
        stroke(255);
        strokeWeight(2);
        circle(cpx, cppy, 12);

        // Label on f(x) panel
        if (isFPanel) {
          fill(colorCritical[0], colorCritical[1], colorCritical[2]);
          noStroke();
          textAlign(CENTER, BOTTOM);
          textSize(10);
          text('x=' + cp, cpx, cppy - 8);
        }
      }
    }
  }

  // Draw sign indicators for first derivative test (Step 2)
  if (currentStep >= 2 && label === "f'(x)") {
    drawSignIndicators(func, panelLeft, panelRight, graphTop, graphBottom, y0);
  }

  // Draw f''(c) values for second derivative test (Step 3)
  if (currentStep >= 3 && label === "f''(x)") {
    drawSecondDerivValues(func, panelLeft, panelRight, graphTop, graphBottom, yMin, yMax);
  }
}

function drawSignIndicators(func, left, right, top, bottom, y0) {
  textSize(18);
  textAlign(CENTER, CENTER);
  noStroke();

  for (let result of func.firstTestResults) {
    let cpx = map(result.point, xMin, xMax, left, right);

    // Left sign
    let leftX = cpx - 30;
    if (leftX > left + 20) {
      fill(result.leftSign === '+' ? '#4CAF50' : '#f44336');
      text(result.leftSign, leftX, (top + y0) / 2);
    }

    // Right sign
    let rightX = cpx + 30;
    if (rightX < right - 20) {
      fill(result.rightSign === '+' ? '#4CAF50' : '#f44336');
      text(result.rightSign, rightX, (top + y0) / 2);
    }
  }
}

function drawSecondDerivValues(func, left, right, top, bottom, yMin, yMax) {
  for (let result of func.secondTestResults) {
    let cpx = map(result.point, xMin, xMax, left, right);
    let cpy = map(result.fppValue, yMin, yMax, bottom, top);

    // Value label
    fill(result.sign === '+' ? '#4CAF50' : (result.sign === '-' ? '#f44336' : '#9C27B0'));
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);

    let labelText = "f''(" + result.point + ")=" + result.fppValue;
    if (cpy >= top && cpy <= bottom) {
      text(labelText, cpx + 8, cpy);
    } else {
      text(labelText, cpx + 8, result.fppValue > 0 ? top + 15 : bottom - 15);
    }
  }
}

function drawStepInfo() {
  let func = functions[currentFunction];
  let infoX = panelRight - 200;
  let infoY = chartTop + 5;
  let infoW = 195;
  let infoH = 160;

  // Only show after step 1
  if (currentStep < 1) return;

  // Info panel background
  fill(255, 255, 255, 245);
  stroke(180);
  strokeWeight(1);
  rect(infoX, infoY, infoW, infoH, 8);

  // Step labels
  let steps = [
    "Step 1: Find f'(x), set = 0",
    "Step 2: First Derivative Test",
    "Step 3: Second Derivative Test",
    "Step 4: Compare Results"
  ];

  fill(60);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);

  if (currentStep >= 1 && currentStep < 4) {
    text(steps[currentStep - 1], infoX + 8, infoY + 8);
  } else if (currentStep >= 4) {
    text(steps[3], infoX + 8, infoY + 8);
  }
  textStyle(NORMAL);

  let contentY = infoY + 28;
  textSize(10);

  // Step 1: Show critical points
  if (currentStep >= 1) {
    fill(colorCritical[0], colorCritical[1], colorCritical[2]);
    text('Critical points:', infoX + 8, contentY);
    contentY += 14;
    fill(60);
    for (let label of func.criticalLabels) {
      text('  ' + label, infoX + 8, contentY);
      contentY += 12;
    }
    contentY += 5;
  }

  // Step 2: First Derivative Test results
  if (currentStep >= 2) {
    fill(colorFp[0], colorFp[1], colorFp[2]);
    textStyle(BOLD);
    text('1st Derivative Test:', infoX + 8, contentY);
    textStyle(NORMAL);
    contentY += 14;
    fill(60);
    for (let result of func.firstTestResults) {
      let signChange = result.leftSign + ' \u2192 ' + result.rightSign;
      text('  x=' + result.point + ': ' + signChange, infoX + 8, contentY);
      contentY += 11;
      fill(result.conclusion.includes('Maximum') ? '#f44336' :
           result.conclusion.includes('Minimum') ? '#4CAF50' : '#9C27B0');
      text('    \u2192 ' + result.conclusion, infoX + 8, contentY);
      contentY += 13;
      fill(60);
    }
    contentY += 3;
  }

  // Step 3: Second Derivative Test results
  if (currentStep >= 3) {
    fill(colorFpp[0], colorFpp[1], colorFpp[2]);
    textStyle(BOLD);
    text('2nd Derivative Test:', infoX + 8, contentY);
    textStyle(NORMAL);
    contentY += 14;
    fill(60);
    for (let result of func.secondTestResults) {
      text("  f''(" + result.point + ')=' + result.fppValue + ' (' + result.sign + ')', infoX + 8, contentY);
      contentY += 11;
      fill(result.conclusion.includes('Maximum') ? '#f44336' :
           result.conclusion.includes('Minimum') ? '#4CAF50' : '#9C27B0');
      text('    \u2192 ' + result.conclusion, infoX + 8, contentY);
      contentY += 13;
      fill(60);
    }
  }
}

function drawControls() {
  // Row 1: Step controls

  // Next Step button
  let canAdvance = currentStep < maxSteps;
  fill(canAdvance ? '#4CAF50' : '#cccccc');
  stroke(canAdvance ? '#388E3C' : '#aaaaaa');
  strokeWeight(1);
  rect(stepBtnX, stepBtnY, stepBtnW, stepBtnH, 5);

  fill(canAdvance ? 'white' : '#888888');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  let btnText = currentStep === 0 ? "Find f'" :
                currentStep === 1 ? 'Apply 1st Test' :
                currentStep === 2 ? 'Apply 2nd Test' :
                currentStep === 3 ? 'Compare' : 'Done';
  text(btnText, stepBtnX + stepBtnW/2, stepBtnY + stepBtnH/2);

  // Reset button
  fill('#ff9800');
  stroke('#f57c00');
  strokeWeight(1);
  rect(resetBtnX, stepBtnY, 70, stepBtnH, 5);

  fill('white');
  noStroke();
  text('Reset', resetBtnX + 35, stepBtnY + stepBtnH/2);

  // Step indicator
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Step ' + currentStep + ' of ' + maxSteps, resetBtnX + 85, stepBtnY + stepBtnH/2);

  // Function selector
  fill('black');
  textSize(12);
  text('Function:', funcBtnsX - 65, funcBtnsY + 18);

  let funcBtnW = 100;
  for (let i = 0; i < functions.length; i++) {
    let bx = funcBtnsX + i * (funcBtnW + 5);

    fill(currentFunction === i ? '#3f51b5' : '#e0e0e0');
    stroke(currentFunction === i ? '#303f9f' : '#bdbdbd');
    strokeWeight(1);
    rect(bx, funcBtnsY, funcBtnW, 30, 5);

    fill(currentFunction === i ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(functions[i].name, bx + funcBtnW/2, funcBtnsY + 15);
  }

  // Row 2: Graph toggles
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Show graphs:', 15, toggleBtnsY + 14);

  let toggleLabels = ['f(x)', "f'(x)", "f''(x)"];
  let toggleStates = [showFGraph, showFpGraph, showFppGraph];
  let toggleColors = [colorF, colorFp, colorFpp];
  let toggleX = 110;
  let toggleW = 65;

  for (let i = 0; i < 3; i++) {
    let bx = toggleX + i * (toggleW + 8);
    let isOn = toggleStates[i];

    fill(isOn ?
         color(toggleColors[i][0], toggleColors[i][1], toggleColors[i][2]) :
         '#e0e0e0');
    stroke(isOn ?
           color(toggleColors[i][0] * 0.7, toggleColors[i][1] * 0.7, toggleColors[i][2] * 0.7) :
           '#bdbdbd');
    strokeWeight(1);
    rect(bx, toggleBtnsY, toggleW, 28, 5);

    fill(isOn ? 'white' : '#666666');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(toggleLabels[i], bx + toggleW/2, toggleBtnsY + 14);
  }

  // Instructions/explanation
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);

  let explanation = '';
  if (currentStep === 0) {
    explanation = 'Click "Find f\'" to locate critical points where f\'(x) = 0';
  } else if (currentStep === 1) {
    explanation = 'Critical points found! Check sign changes around each point.';
  } else if (currentStep === 2) {
    explanation = '1st Test: + to - = Max, - to + = Min, No change = Neither';
  } else if (currentStep === 3) {
    explanation = '2nd Test: f\'\'(c) > 0 = Min, f\'\'(c) < 0 = Max, f\'\'(c) = 0 = Inconclusive!';
  } else {
    explanation = 'Both tests agree (usually). 2nd test fails when f\'\'(c) = 0!';
  }
  text(explanation, 340, toggleBtnsY + 14);
}

function mousePressed() {
  // Check Next Step button
  if (mouseX >= stepBtnX && mouseX <= stepBtnX + stepBtnW &&
      mouseY >= stepBtnY && mouseY <= stepBtnY + stepBtnH) {
    if (currentStep < maxSteps) {
      currentStep++;
    }
    return;
  }

  // Check Reset button
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 70 &&
      mouseY >= stepBtnY && mouseY <= stepBtnY + stepBtnH) {
    currentStep = 0;
    for (let i = 0; i < maxSteps; i++) {
      fadeProgress[i] = 0;
    }
    return;
  }

  // Check function selector buttons
  let funcBtnW = 100;
  for (let i = 0; i < functions.length; i++) {
    let bx = funcBtnsX + i * (funcBtnW + 5);
    if (mouseX >= bx && mouseX <= bx + funcBtnW &&
        mouseY >= funcBtnsY && mouseY <= funcBtnsY + 30) {
      if (currentFunction !== i) {
        currentFunction = i;
        currentStep = 0;
        for (let j = 0; j < maxSteps; j++) {
          fadeProgress[j] = 0;
        }
      }
      return;
    }
  }

  // Check graph toggle buttons
  let toggleX = 110;
  let toggleW = 65;
  for (let i = 0; i < 3; i++) {
    let bx = toggleX + i * (toggleW + 8);
    if (mouseX >= bx && mouseX <= bx + toggleW &&
        mouseY >= toggleBtnsY && mouseY <= toggleBtnsY + 28) {
      if (i === 0) showFGraph = !showFGraph;
      else if (i === 1) showFpGraph = !showFpGraph;
      else showFppGraph = !showFppGraph;

      // Ensure at least one graph is shown
      if (!showFGraph && !showFpGraph && !showFppGraph) {
        showFGraph = true;
      }
      updateLayoutPositions();
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayoutPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = max(canvasWidth, 650); // Minimum width for readability
  updateLayoutPositions();
}
