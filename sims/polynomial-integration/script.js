// Polynomial Integration MicroSim
// Shows how to integrate polynomials term by term with interactive feedback
// Bloom Level: Apply (L3), Verbs: apply, calculate, execute
// Learning Objective: Students will apply integration rules to polynomial functions

let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 55;

// Colors
const TERM_COLOR = [100, 50, 150];      // Purple for original terms
const RESULT_COLOR = [0, 150, 80];      // Green for results
const INTEGRAND_COLOR = [50, 100, 200]; // Blue for integrand curve
const ANTIDERIV_COLOR = [200, 50, 100]; // Red for antiderivative curve

// Animation state
let currentStep = 0;
let animationProgress = [];
let animationPhase = 0;
let showAllSteps = false;

// Polynomial coefficients (ax^3 + bx^2 + cx + d)
let coeffA = 2;
let coeffB = 0;
let coeffC = -4;
let coeffD = 5;

// Integration constant
let constantC = 0;

// Preset polynomials
const presets = [
  { name: '2x^3 - 4x + 5', a: 2, b: 0, c: -4, d: 5 },
  { name: 'x^2 + 3x + 2', a: 0, b: 1, c: 3, d: 2 },
  { name: '3x^3 - 2x^2 + x', a: 3, b: -2, c: 1, d: 0 },
  { name: '-x^2 + 4', a: 0, b: -1, c: 0, d: 4 }
];
let selectedPreset = 0;

// Control positions
let stepBtnX, stepBtnY, stepBtnW, stepBtnH;
let showAllBtnX, resetBtnX;
let presetBtnsY;
let cSliderX, cSliderY, cSliderW;
let isDraggingSlider = false;

// Graph bounds
let graphLeft, graphRight, graphTop, graphBottom;
let xMin = -3, xMax = 3;
let yMin = -15, yMax = 20;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Initialize animation progress for 5 steps (4 terms + total)
  for (let i = 0; i < 5; i++) {
    animationProgress[i] = 0;
  }

  updateButtonPositions();

  describe('Interactive polynomial integration tutorial showing step-by-step application of power rule and constant rule with a graph of integrand and antiderivative.', LABEL);
}

function updateButtonPositions() {
  // Navigation buttons
  stepBtnX = 20;
  stepBtnY = drawHeight + 12;
  stepBtnW = 100;
  stepBtnH = 32;

  showAllBtnX = stepBtnX + stepBtnW + 10;
  resetBtnX = showAllBtnX + stepBtnW + 10;

  // Preset buttons
  presetBtnsY = drawHeight + 55;

  // C slider
  cSliderX = 430;
  cSliderY = drawHeight + 28;
  cSliderW = 150;

  // Graph area
  graphLeft = canvasWidth * 0.55;
  graphRight = canvasWidth - margin - 10;
  graphTop = chartTop + 10;
  graphBottom = drawHeight - 20;
}

function draw() {
  updateCanvasSize();
  animationPhase += 0.05;

  // Update animation progress
  for (let i = 0; i < 5; i++) {
    if (showAllSteps || i <= currentStep) {
      animationProgress[i] = min(animationProgress[i] + 0.08, 1);
    } else {
      animationProgress[i] = 0;
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

  // Draw step-by-step integration table
  drawIntegrationSteps();

  // Draw graph
  drawGraph();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Polynomial Integration', canvasWidth / 2, 5);

  textSize(14);
  fill(100);
  text('\u222B f(x) dx = F(x) + C', canvasWidth / 2, 30);
}

function drawIntegrationSteps() {
  let terms = getTerms();
  let results = getIntegratedTerms();

  let tableX = margin;
  let tableY = chartTop + 5;
  let tableW = canvasWidth * 0.5 - margin;
  let rowH = 52;

  // Table header
  fill(240);
  stroke(200);
  strokeWeight(1);
  rect(tableX, tableY, tableW, 28, 5, 5, 0, 0);

  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('Term', tableX + tableW * 0.2, tableY + 14);
  text('Rule Applied', tableX + tableW * 0.5, tableY + 14);
  text('Result', tableX + tableW * 0.82, tableY + 14);
  textStyle(NORMAL);

  // Table rows
  let rowY = tableY + 28;

  for (let i = 0; i < terms.length; i++) {
    let alpha = animationProgress[i] * 255;

    // Row background
    if (alpha > 0) {
      if (i === currentStep && !showAllSteps) {
        let pulse = sin(animationPhase * 2) * 15 + 240;
        fill(pulse, 255, pulse, alpha);
        stroke(RESULT_COLOR[0], RESULT_COLOR[1], RESULT_COLOR[2], alpha);
        strokeWeight(2);
      } else {
        fill(255, 255, 250, alpha);
        stroke(220, 220, 220, alpha);
        strokeWeight(1);
      }

      let cornerRadius = (i === terms.length - 1) ? [0, 0, 5, 5] : [0, 0, 0, 0];
      rect(tableX, rowY, tableW, rowH, ...cornerRadius);

      // Draw row content
      noStroke();
      textAlign(CENTER, CENTER);

      // Term
      fill(TERM_COLOR[0], TERM_COLOR[1], TERM_COLOR[2], alpha);
      textSize(16);
      text(terms[i].display, tableX + tableW * 0.2, rowY + rowH * 0.4);

      // Rule
      fill(80, 80, 80, alpha);
      textSize(11);
      text(terms[i].rule, tableX + tableW * 0.5, rowY + rowH * 0.35);
      textSize(10);
      fill(120, 120, 120, alpha);
      text(terms[i].ruleDetail, tableX + tableW * 0.5, rowY + rowH * 0.65);

      // Result with animation
      let resultAlpha = animationProgress[i];
      if (resultAlpha > 0.5) {
        fill(RESULT_COLOR[0], RESULT_COLOR[1], RESULT_COLOR[2], alpha);
        textSize(16);
        text(results[i], tableX + tableW * 0.82, rowY + rowH * 0.4);
      }
    } else {
      // Placeholder for hidden rows
      fill(245);
      stroke(220);
      strokeWeight(1);
      rect(tableX, rowY, tableW, rowH);

      fill(180);
      textAlign(CENTER, CENTER);
      textSize(12);
      text('Step ' + (i + 1) + ' - Click "Next Step"', tableX + tableW / 2, rowY + rowH / 2);
    }

    rowY += rowH;
  }

  // Final answer row
  rowY += 5;
  let totalAlpha = animationProgress[4] * 255;

  if (totalAlpha > 0) {
    fill(230, 255, 230, totalAlpha);
    stroke(RESULT_COLOR[0], RESULT_COLOR[1], RESULT_COLOR[2], totalAlpha);
    strokeWeight(2);
    rect(tableX, rowY, tableW, rowH - 10, 5);

    noStroke();
    fill(RESULT_COLOR[0], RESULT_COLOR[1], RESULT_COLOR[2], totalAlpha);
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text('ANTIDERIVATIVE:', tableX + tableW * 0.22, rowY + 12);
    textStyle(NORMAL);

    textSize(18);
    text(getFullAntiderivative(), tableX + tableW * 0.62, rowY + 30);
  }
}

function drawGraph() {
  // Graph background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft - 5, graphTop - 5, graphRight - graphLeft + 15, graphBottom - graphTop + 15, 5);

  // Grid
  stroke(235);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let x = map(i, xMin, xMax, graphLeft, graphRight);
    line(x, graphTop, x, graphBottom);
  }

  // Horizontal grid lines
  for (let i = Math.ceil(yMin / 5) * 5; i <= yMax; i += 5) {
    let y = map(i, yMin, yMax, graphBottom, graphTop);
    if (y > graphTop && y < graphBottom) {
      line(graphLeft, y, graphRight, y);
    }
  }

  // Axes
  stroke(100);
  strokeWeight(1);

  // X-axis
  let y0 = map(0, yMin, yMax, graphBottom, graphTop);
  if (y0 > graphTop && y0 < graphBottom) {
    line(graphLeft, y0, graphRight, y0);
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, graphLeft, graphRight);
  if (x0 > graphLeft && x0 < graphRight) {
    line(x0, graphTop, x0, graphBottom);
  }

  // Axis labels
  fill(80);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text('x', graphRight + 5, y0 - 5);
  textAlign(RIGHT, CENTER);
  text('y', x0 + 5, graphTop - 8);

  // Draw integrand f(x)
  stroke(INTEGRAND_COLOR[0], INTEGRAND_COLOR[1], INTEGRAND_COLOR[2]);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let x = map(px, graphLeft, graphRight, xMin, xMax);
    let y = evaluatePolynomial(x);
    let py = map(y, yMin, yMax, graphBottom, graphTop);

    if (py >= graphTop - 10 && py <= graphBottom + 10) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();

  // Draw antiderivative F(x)
  if (animationProgress[4] > 0.3) {
    stroke(ANTIDERIV_COLOR[0], ANTIDERIV_COLOR[1], ANTIDERIV_COLOR[2], animationProgress[4] * 255);
    strokeWeight(2);
    noFill();

    beginShape();
    for (let px = graphLeft; px <= graphRight; px += 2) {
      let x = map(px, graphLeft, graphRight, xMin, xMax);
      let y = evaluateAntiderivative(x);
      let py = map(y, yMin, yMax, graphBottom, graphTop);

      if (py >= graphTop - 10 && py <= graphBottom + 10) {
        vertex(px, constrain(py, graphTop, graphBottom));
      }
    }
    endShape();
  }

  // Legend
  let legendX = graphLeft + 5;
  let legendY = graphTop + 5;

  fill(255, 255, 255, 220);
  stroke(200);
  strokeWeight(1);
  rect(legendX, legendY, 95, 45, 4);

  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);

  // Integrand legend
  fill(INTEGRAND_COLOR[0], INTEGRAND_COLOR[1], INTEGRAND_COLOR[2]);
  rect(legendX + 5, legendY + 10, 15, 3);
  fill(80);
  text('f(x) integrand', legendX + 25, legendY + 12);

  // Antiderivative legend
  if (animationProgress[4] > 0.3) {
    fill(ANTIDERIV_COLOR[0], ANTIDERIV_COLOR[1], ANTIDERIV_COLOR[2], animationProgress[4] * 255);
    rect(legendX + 5, legendY + 30, 15, 3);
    fill(80, 80, 80, animationProgress[4] * 255);
    text('F(x) antideriv.', legendX + 25, legendY + 32);
  }
}

function drawControls() {
  // Row 1: Navigation buttons

  // Next Step button
  let canAdvance = currentStep < 4 && !showAllSteps;
  fill(canAdvance ? '#9c27b0' : '#cccccc');
  stroke(canAdvance ? '#7b1fa2' : '#aaaaaa');
  strokeWeight(1);
  rect(stepBtnX, stepBtnY, stepBtnW, stepBtnH, 5);

  fill(canAdvance ? 'white' : '#888888');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Next Step', stepBtnX + stepBtnW / 2, stepBtnY + stepBtnH / 2);

  // Show All button
  fill(showAllSteps ? '#cccccc' : '#2196F3');
  stroke(showAllSteps ? '#aaaaaa' : '#1976D2');
  strokeWeight(1);
  rect(showAllBtnX, stepBtnY, stepBtnW, stepBtnH, 5);

  fill(showAllSteps ? '#888888' : 'white');
  noStroke();
  text('Integrate All', showAllBtnX + stepBtnW / 2, stepBtnY + stepBtnH / 2);

  // Reset button
  fill('#ff9800');
  stroke('#f57c00');
  strokeWeight(1);
  rect(resetBtnX, stepBtnY, 70, stepBtnH, 5);

  fill('white');
  noStroke();
  text('Reset', resetBtnX + 35, stepBtnY + stepBtnH / 2);

  // C slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('C = ' + constantC.toFixed(1), cSliderX - 60, cSliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(cSliderX, cSliderY - 5, cSliderW, 10, 5);

  // Slider handle
  let handleX = map(constantC, -5, 5, cSliderX, cSliderX + cSliderW);
  fill(isDraggingSlider ? '#7b1fa2' : '#9c27b0');
  noStroke();
  circle(handleX, cSliderY, 18);

  // Row 2: Preset buttons
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Presets:', 20, presetBtnsY + 14);

  let presetBtnX = 85;
  let presetBtnW = 115;

  for (let i = 0; i < presets.length; i++) {
    let isSelected = selectedPreset === i;

    fill(isSelected ? '#9c27b0' : '#e0e0e0');
    stroke(isSelected ? '#7b1fa2' : '#bdbdbd');
    strokeWeight(1);
    rect(presetBtnX + i * (presetBtnW + 5), presetBtnsY, presetBtnW, 28, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(presets[i].name, presetBtnX + i * (presetBtnW + 5) + presetBtnW / 2, presetBtnsY + 14);
  }

  // Instructions
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Adjust C to see the family of antiderivatives (vertical shift)', cSliderX - 60, cSliderY + 20);
}

// Get polynomial terms for display
function getTerms() {
  let terms = [];

  if (coeffA !== 0) {
    terms.push({
      display: formatTerm(coeffA, 3),
      rule: 'Power Rule',
      ruleDetail: 'add 1, divide by new power'
    });
  }

  if (coeffB !== 0) {
    terms.push({
      display: formatTerm(coeffB, 2),
      rule: 'Power Rule',
      ruleDetail: 'add 1, divide by new power'
    });
  }

  if (coeffC !== 0) {
    terms.push({
      display: formatTerm(coeffC, 1),
      rule: 'Power Rule',
      ruleDetail: 'x^1 becomes x^2/2'
    });
  }

  if (coeffD !== 0) {
    terms.push({
      display: formatTerm(coeffD, 0),
      rule: 'Constant Rule',
      ruleDetail: 'constant * x'
    });
  }

  // Ensure at least one term
  if (terms.length === 0) {
    terms.push({
      display: '0',
      rule: 'Zero',
      ruleDetail: 'integral of 0 is C'
    });
  }

  return terms;
}

// Get integrated terms
function getIntegratedTerms() {
  let results = [];

  if (coeffA !== 0) {
    // ax^3 -> ax^4/4
    let newCoeff = coeffA / 4;
    results.push(formatTermResult(newCoeff, 4));
  }

  if (coeffB !== 0) {
    // bx^2 -> bx^3/3
    let newCoeff = coeffB / 3;
    results.push(formatTermResult(newCoeff, 3));
  }

  if (coeffC !== 0) {
    // cx -> cx^2/2
    let newCoeff = coeffC / 2;
    results.push(formatTermResult(newCoeff, 2));
  }

  if (coeffD !== 0) {
    // d -> dx
    results.push(formatTermResult(coeffD, 1));
  }

  if (results.length === 0) {
    results.push('C');
  }

  return results;
}

// Format a term for display (coefficient and power)
function formatTerm(coeff, power) {
  if (power === 0) {
    return coeff.toString();
  }

  let str = '';
  if (coeff === 1) str = '';
  else if (coeff === -1) str = '-';
  else str = coeff.toString();

  if (power === 1) {
    return str + 'x';
  }

  return str + 'x' + superscript(power);
}

// Format integrated term result
function formatTermResult(coeff, power) {
  // Simplify fractions
  let num = coeff;
  let simplified = '';

  if (Number.isInteger(num)) {
    if (num === 1) simplified = '';
    else if (num === -1) simplified = '-';
    else simplified = num.toString();
  } else {
    // Show as fraction
    let denominator = power;
    let numerator = Math.round(coeff * power);

    if (numerator === denominator) simplified = '';
    else if (numerator === -denominator) simplified = '-';
    else if (numerator === 1) simplified = '1/' + denominator;
    else if (numerator === -1) simplified = '-1/' + denominator;
    else simplified = numerator + '/' + denominator;
  }

  if (power === 1) {
    return simplified + 'x';
  }

  return simplified + 'x' + superscript(power);
}

// Get full antiderivative string
function getFullAntiderivative() {
  let parts = [];

  if (coeffA !== 0) {
    parts.push(formatTermResult(coeffA / 4, 4));
  }
  if (coeffB !== 0) {
    let term = formatTermResult(coeffB / 3, 3);
    if (parts.length > 0 && coeffB > 0) term = '+ ' + term;
    parts.push(term);
  }
  if (coeffC !== 0) {
    let term = formatTermResult(coeffC / 2, 2);
    if (parts.length > 0 && coeffC > 0) term = '+ ' + term;
    parts.push(term);
  }
  if (coeffD !== 0) {
    let term = formatTermResult(coeffD, 1);
    if (parts.length > 0 && coeffD > 0) term = '+ ' + term;
    parts.push(term);
  }

  if (parts.length === 0) {
    return 'C';
  }

  return parts.join(' ') + ' + C';
}

// Superscript numbers
function superscript(n) {
  const supers = {
    '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3',
    '4': '\u2074', '5': '\u2075', '6': '\u2076', '7': '\u2077',
    '8': '\u2078', '9': '\u2079'
  };
  return String(n).split('').map(c => supers[c] || c).join('');
}

// Evaluate polynomial f(x) = ax^3 + bx^2 + cx + d
function evaluatePolynomial(x) {
  return coeffA * Math.pow(x, 3) + coeffB * Math.pow(x, 2) + coeffC * x + coeffD;
}

// Evaluate antiderivative F(x) = (a/4)x^4 + (b/3)x^3 + (c/2)x^2 + dx + C
function evaluateAntiderivative(x) {
  return (coeffA / 4) * Math.pow(x, 4) +
         (coeffB / 3) * Math.pow(x, 3) +
         (coeffC / 2) * Math.pow(x, 2) +
         coeffD * x +
         constantC;
}

function mousePressed() {
  // Check Next Step button
  if (mouseX >= stepBtnX && mouseX <= stepBtnX + stepBtnW &&
      mouseY >= stepBtnY && mouseY <= stepBtnY + stepBtnH) {
    if (currentStep < 4 && !showAllSteps) {
      currentStep++;
    }
    return;
  }

  // Check Show All button
  if (mouseX >= showAllBtnX && mouseX <= showAllBtnX + stepBtnW &&
      mouseY >= stepBtnY && mouseY <= stepBtnY + stepBtnH) {
    showAllSteps = true;
    currentStep = 4;
    return;
  }

  // Check Reset button
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 70 &&
      mouseY >= stepBtnY && mouseY <= stepBtnY + stepBtnH) {
    resetSteps();
    return;
  }

  // Check C slider
  let handleX = map(constantC, -5, 5, cSliderX, cSliderX + cSliderW);
  if (dist(mouseX, mouseY, handleX, cSliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check slider track
  if (mouseY > cSliderY - 12 && mouseY < cSliderY + 12 &&
      mouseX > cSliderX && mouseX < cSliderX + cSliderW) {
    constantC = map(mouseX, cSliderX, cSliderX + cSliderW, -5, 5);
    constantC = constrain(constantC, -5, 5);
    constantC = Math.round(constantC * 2) / 2; // Snap to 0.5
    isDraggingSlider = true;
    return;
  }

  // Check preset buttons
  let presetBtnX = 85;
  let presetBtnW = 115;

  for (let i = 0; i < presets.length; i++) {
    if (mouseX >= presetBtnX + i * (presetBtnW + 5) &&
        mouseX <= presetBtnX + i * (presetBtnW + 5) + presetBtnW &&
        mouseY >= presetBtnsY && mouseY <= presetBtnsY + 28) {
      selectPreset(i);
      return;
    }
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    constantC = map(mouseX, cSliderX, cSliderX + cSliderW, -5, 5);
    constantC = constrain(constantC, -5, 5);
    constantC = Math.round(constantC * 2) / 2; // Snap to 0.5
  }
}

function mouseReleased() {
  isDraggingSlider = false;
}

function selectPreset(index) {
  selectedPreset = index;
  coeffA = presets[index].a;
  coeffB = presets[index].b;
  coeffC = presets[index].c;
  coeffD = presets[index].d;
  resetSteps();
}

function resetSteps() {
  currentStep = 0;
  showAllSteps = false;
  for (let i = 0; i < 5; i++) {
    animationProgress[i] = 0;
  }
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
