// Term by Term Differentiation MicroSim
// Shows how polynomial differentiation works term by term
// with each term's contribution to the derivative highlighted
// MicroSim template version 2026.02

// Global variables for canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 16;

// Application-specific variables
let stepButton, allButton, resetButton, presetSelect;
let showGraphCheckbox;
let showGraph = false;

// Polynomial representation: array of {coef, exp} objects
let polynomial = [];
let derivativeSteps = [];
let currentStep = 0;
let allDone = false;

// Animation variables
let animationProgress = 0;
let isAnimating = false;
let animationTarget = 0;

// Preset polynomials
const presets = [
  { name: "3x^4 - 2x^2 + 5x - 7", terms: [{coef: 3, exp: 4}, {coef: -2, exp: 2}, {coef: 5, exp: 1}, {coef: -7, exp: 0}] },
  { name: "x^3 + 2x^2 - x + 1", terms: [{coef: 1, exp: 3}, {coef: 2, exp: 2}, {coef: -1, exp: 1}, {coef: 1, exp: 0}] },
  { name: "5x^5 - 3x^3 + x", terms: [{coef: 5, exp: 5}, {coef: -3, exp: 3}, {coef: 1, exp: 1}] },
  { name: "2x^2 + 4x + 6", terms: [{coef: 2, exp: 2}, {coef: 4, exp: 1}, {coef: 6, exp: 0}] },
  { name: "-x^4 + 8x - 2", terms: [{coef: -1, exp: 4}, {coef: 8, exp: 1}, {coef: -2, exp: 0}] }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create Step button
  stepButton = createButton('Next Step');
  stepButton.position(10, drawHeight + 8);
  stepButton.mousePressed(doNextStep);

  // Create All button
  allButton = createButton('Show All');
  allButton.position(90, drawHeight + 8);
  allButton.mousePressed(doAllSteps);

  // Create Reset button
  resetButton = createButton('Reset');
  resetButton.position(165, drawHeight + 8);
  resetButton.mousePressed(resetSimulation);

  // Create preset dropdown
  presetSelect = createSelect();
  presetSelect.position(230, drawHeight + 8);
  for (let i = 0; i < presets.length; i++) {
    presetSelect.option(presets[i].name, i);
  }
  presetSelect.changed(selectPreset);

  // Create Show Graph checkbox - draw it manually, don't use createCheckbox
  showGraph = false;

  // Initialize with first preset
  loadPreset(0);

  describe('Interactive polynomial differentiation showing step-by-step application of power rule and sum rule', LABEL);
}

function draw() {
  updateCanvasSize();

  // Draw background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw border around control area
  stroke('silver');
  noFill();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Term-by-Term Polynomial Differentiation', canvasWidth/2, 8);

  // Update animation
  if (isAnimating) {
    animationProgress += 0.05;
    if (animationProgress >= animationTarget) {
      animationProgress = animationTarget;
      isAnimating = false;
    }
  }

  // Draw content based on showGraph
  if (showGraph) {
    drawGraphView();
  } else {
    drawStepView();
  }

  // Draw checkbox manually in control area
  drawShowGraphCheckbox();
}

function drawStepView() {
  let startY = 40;
  let rowHeight = 55;
  let termColX = 50;
  let ruleColX = canvasWidth * 0.4;
  let resultColX = canvasWidth * 0.7;

  // Column headers
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  fill('#666');
  text('Original Term', termColX + 50, startY);
  text('Rule Applied', ruleColX + 30, startY);
  text('Result', resultColX + 30, startY);

  // Draw horizontal line under headers
  stroke('#ccc');
  line(20, startY + 22, canvasWidth - 20, startY + 22);

  startY += 30;

  // Draw each term row
  for (let i = 0; i < polynomial.length; i++) {
    let y = startY + i * rowHeight;
    let stepVisible = (i < currentStep) || allDone;
    let animatingThis = isAnimating && (i === currentStep - 1);

    // Background for current row
    if (animatingThis || (i === currentStep - 1 && !isAnimating && currentStep > 0)) {
      fill(255, 255, 200, 150);
      noStroke();
      rect(15, y - 5, canvasWidth - 30, rowHeight - 5, 5);
    }

    // Original term - always visible
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(18);
    let termStr = formatTerm(polynomial[i].coef, polynomial[i].exp);
    text(termStr, termColX, y + 15);

    // Rule and result - only if step is visible
    if (stepVisible) {
      let alpha = animatingThis ? map(animationProgress, animationTarget - 1, animationTarget, 0, 255) : 255;
      alpha = constrain(alpha, 0, 255);

      // Rule
      fill(0, 100, 200, alpha);
      textSize(12);
      textAlign(CENTER, CENTER);
      let rule = getRuleDescription(polynomial[i].exp);
      text(rule, ruleColX + 30, y + 15);

      // Arrow
      stroke(0, 100, 200, alpha);
      strokeWeight(2);
      let arrowX = ruleColX + 80;
      line(arrowX, y + 15, arrowX + 25, y + 15);
      line(arrowX + 20, y + 10, arrowX + 25, y + 15);
      line(arrowX + 20, y + 20, arrowX + 25, y + 15);

      // Result
      noStroke();
      fill(0, 150, 0, alpha);
      textSize(18);
      textAlign(LEFT, CENTER);
      let deriv = derivativeSteps[i];
      let resultStr = deriv.exp === 0 && deriv.coef === 0 ? '0' : formatTerm(deriv.coef, deriv.exp);
      text(resultStr, resultColX, y + 15);
    }
  }

  // Draw final derivative if all done
  if (allDone || currentStep >= polynomial.length) {
    let finalY = startY + polynomial.length * rowHeight + 10;

    // Separator line
    stroke('#333');
    strokeWeight(2);
    line(20, finalY - 10, canvasWidth - 20, finalY - 10);

    // Sum rule label
    fill('#666');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Sum Rule', ruleColX + 30, finalY + 10);

    // Final derivative
    fill('black');
    textSize(18);
    textAlign(LEFT, CENTER);
    text("f'(x) = ", termColX, finalY + 10);

    fill(0, 150, 0);
    textAlign(LEFT, CENTER);
    text(formatDerivative(), termColX + 55, finalY + 10);
  }
}

function drawGraphView() {
  // Graph parameters
  let graphLeft = 60;
  let graphRight = canvasWidth - 40;
  let graphTop = 50;
  let graphBottom = drawHeight - 60;
  let graphWidth = graphRight - graphLeft;
  let graphHeight = graphBottom - graphTop;

  // Draw axes
  stroke('#ccc');
  strokeWeight(1);

  // Grid lines
  for (let i = 0; i <= 10; i++) {
    let x = graphLeft + (i / 10) * graphWidth;
    line(x, graphTop, x, graphBottom);
    let y = graphTop + (i / 10) * graphHeight;
    line(graphLeft, y, graphRight, y);
  }

  // Main axes
  stroke('black');
  strokeWeight(2);
  let centerX = graphLeft + graphWidth / 2;
  let centerY = graphTop + graphHeight / 2;
  line(graphLeft, centerY, graphRight, centerY);
  line(centerX, graphTop, centerX, graphBottom);

  // Labels
  fill('black');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('x', graphRight - 10, centerY + 5);
  textAlign(RIGHT, CENTER);
  text('y', centerX - 5, graphTop + 10);

  // Scale
  let xScale = 3;
  let yScale = 50;

  // Draw original function
  stroke('blue');
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px++) {
    let x = ((px - centerX) / graphWidth) * 2 * xScale;
    let y = evaluatePolynomial(polynomial, x);
    let py = centerY - (y / yScale) * (graphHeight / 2);
    py = constrain(py, graphTop, graphBottom);
    vertex(px, py);
  }
  endShape();

  // Draw derivative if steps shown
  if (currentStep > 0 || allDone) {
    stroke('green');
    strokeWeight(2);
    noFill();
    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
      let x = ((px - centerX) / graphWidth) * 2 * xScale;
      let derivTerms = derivativeSteps.slice(0, allDone ? derivativeSteps.length : currentStep);
      let y = evaluatePolynomial(derivTerms, x);
      let py = centerY - (y / yScale) * (graphHeight / 2);
      py = constrain(py, graphTop, graphBottom);
      vertex(px, py);
    }
    endShape();
  }

  // Legend
  let legendY = drawHeight - 30;
  fill('blue');
  noStroke();
  rect(graphLeft, legendY, 20, 3);
  textSize(12);
  textAlign(LEFT, CENTER);
  text('f(x) = ' + formatPolynomial(polynomial), graphLeft + 25, legendY);

  fill('green');
  rect(graphLeft, legendY + 15, 20, 3);
  if (allDone || currentStep > 0) {
    text("f'(x) = " + formatDerivative(), graphLeft + 25, legendY + 15);
  } else {
    text("f'(x) = (click Next Step)", graphLeft + 25, legendY + 15);
  }
}

function drawShowGraphCheckbox() {
  let checkX = 10;
  let checkY = drawHeight + 50;
  let checkSize = 18;

  // Checkbox box
  stroke('black');
  strokeWeight(1);
  fill(showGraph ? '#4CAF50' : 'white');
  rect(checkX, checkY, checkSize, checkSize, 3);

  // Checkmark
  if (showGraph) {
    stroke('white');
    strokeWeight(2);
    line(checkX + 3, checkY + 9, checkX + 7, checkY + 14);
    line(checkX + 7, checkY + 14, checkX + 15, checkY + 4);
  }

  // Label
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Show Graph', checkX + checkSize + 8, checkY + checkSize/2);
}

function mousePressed() {
  // Check if clicking on the Show Graph checkbox area
  let checkX = 10;
  let checkY = drawHeight + 50;
  let checkSize = 18;

  if (mouseX >= checkX && mouseX <= checkX + 100 &&
      mouseY >= checkY && mouseY <= checkY + checkSize) {
    showGraph = !showGraph;
  }
}

function doNextStep() {
  if (currentStep < polynomial.length) {
    currentStep++;
    animationTarget = currentStep;
    animationProgress = currentStep - 1;
    isAnimating = true;
  }
  if (currentStep >= polynomial.length) {
    allDone = true;
  }
}

function doAllSteps() {
  currentStep = polynomial.length;
  allDone = true;
  animationProgress = currentStep;
  isAnimating = false;
}

function resetSimulation() {
  currentStep = 0;
  allDone = false;
  animationProgress = 0;
  isAnimating = false;
}

function selectPreset() {
  let idx = parseInt(presetSelect.value());
  loadPreset(idx);
}

function loadPreset(idx) {
  polynomial = JSON.parse(JSON.stringify(presets[idx].terms));
  computeDerivatives();
  resetSimulation();
}

function computeDerivatives() {
  derivativeSteps = [];
  for (let term of polynomial) {
    if (term.exp === 0) {
      // Constant rule: derivative is 0
      derivativeSteps.push({coef: 0, exp: 0});
    } else {
      // Power rule: d/dx(ax^n) = n*a*x^(n-1)
      derivativeSteps.push({
        coef: term.coef * term.exp,
        exp: term.exp - 1
      });
    }
  }
}

function formatTerm(coef, exp) {
  if (coef === 0) return '0';

  let str = '';

  // Coefficient part
  if (exp === 0) {
    return coef.toString();
  } else if (coef === 1) {
    str = '';
  } else if (coef === -1) {
    str = '-';
  } else {
    str = coef.toString();
  }

  // Variable part
  if (exp === 1) {
    str += 'x';
  } else {
    str += 'x^' + exp;
  }

  return str;
}

function formatPolynomial(terms) {
  let result = '';
  for (let i = 0; i < terms.length; i++) {
    let term = terms[i];
    if (term.coef === 0) continue;

    if (i > 0 && term.coef > 0) {
      result += ' + ';
    } else if (i > 0 && term.coef < 0) {
      result += ' - ';
      term = {coef: Math.abs(term.coef), exp: term.exp};
    }

    if (i === 0) {
      result += formatTerm(term.coef, term.exp);
    } else {
      result += formatTerm(Math.abs(term.coef), term.exp);
    }
  }
  return result || '0';
}

function formatDerivative() {
  // Filter out zero terms and format
  let nonZero = derivativeSteps.filter(t => t.coef !== 0);
  if (nonZero.length === 0) return '0';
  return formatPolynomial(nonZero);
}

function getRuleDescription(exp) {
  if (exp === 0) {
    return 'Constant Rule';
  } else if (exp === 1) {
    return 'Power Rule (n=1)';
  } else {
    return 'Power Rule';
  }
}

function evaluatePolynomial(terms, x) {
  let result = 0;
  for (let term of terms) {
    if (term.coef !== 0) {
      result += term.coef * Math.pow(x, term.exp);
    }
  }
  return result;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);

  // Reposition controls
  if (presetSelect) {
    presetSelect.position(230, drawHeight + 8);
  }

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
