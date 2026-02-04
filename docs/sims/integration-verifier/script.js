// Integration Verifier MicroSim
// Reinforce the habit of checking integrals by differentiation
// Bloom Level: Analyze (L4), Verbs: verify, check, analyze
// Learning Objective: Students will verify integration results by differentiating

let canvasWidth = 750;
let drawHeight = 520;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 55;

// Colors - purple theme matching textbook
const CORRECT_COLOR = [46, 125, 50];      // Green for correct
const INCORRECT_COLOR = [198, 40, 40];    // Red for incorrect
const NEUTRAL_COLOR = [103, 58, 183];     // Purple for neutral/accent
const STEP_COLOR = [63, 81, 181];         // Indigo for steps

// State
let currentExample = 0;
let hasChecked = false;
let isCorrect = false;
let showSteps = false;
let animationPhase = 0;

// Preset examples with integrands, proposed antiderivatives, and whether they're correct
const examples = [
  {
    integrand: "2x",
    proposedAnswer: "x^2 + C",
    derivative: "2x",
    isCorrect: true,
    steps: [
      "d/dx[x^2 + C]",
      "= d/dx[x^2] + d/dx[C]",
      "= 2x + 0",
      "= 2x"
    ],
    rule: "Power Rule: d/dx[x^n] = nx^(n-1)"
  },
  {
    integrand: "3x^2",
    proposedAnswer: "x^3",
    derivative: "3x^2",
    isCorrect: true,
    steps: [
      "d/dx[x^3]",
      "= 3x^2"
    ],
    rule: "Power Rule: d/dx[x^n] = nx^(n-1)",
    note: "Don't forget + C in indefinite integrals!"
  },
  {
    integrand: "cos(x)",
    proposedAnswer: "sin(x) + C",
    derivative: "cos(x)",
    isCorrect: true,
    steps: [
      "d/dx[sin(x) + C]",
      "= d/dx[sin(x)] + d/dx[C]",
      "= cos(x) + 0",
      "= cos(x)"
    ],
    rule: "Trig Rule: d/dx[sin(x)] = cos(x)"
  },
  {
    integrand: "sin(x)",
    proposedAnswer: "cos(x) + C",
    derivative: "-sin(x)",
    isCorrect: false,
    steps: [
      "d/dx[cos(x) + C]",
      "= d/dx[cos(x)] + d/dx[C]",
      "= -sin(x) + 0",
      "= -sin(x)"
    ],
    rule: "Trig Rule: d/dx[cos(x)] = -sin(x)",
    error: "Sign error! The correct answer is -cos(x) + C",
    errorType: "Sign Error"
  },
  {
    integrand: "e^x",
    proposedAnswer: "e^x + C",
    derivative: "e^x",
    isCorrect: true,
    steps: [
      "d/dx[e^x + C]",
      "= d/dx[e^x] + d/dx[C]",
      "= e^x + 0",
      "= e^x"
    ],
    rule: "Exponential Rule: d/dx[e^x] = e^x"
  },
  {
    integrand: "1/x",
    proposedAnswer: "ln(x) + C",
    derivative: "1/x",
    isCorrect: true,
    steps: [
      "d/dx[ln(x) + C]",
      "= d/dx[ln(x)] + d/dx[C]",
      "= 1/x + 0",
      "= 1/x"
    ],
    rule: "Log Rule: d/dx[ln(x)] = 1/x"
  },
  {
    integrand: "2x + 3",
    proposedAnswer: "x^2 + 3x + C",
    derivative: "2x + 3",
    isCorrect: true,
    steps: [
      "d/dx[x^2 + 3x + C]",
      "= d/dx[x^2] + d/dx[3x] + d/dx[C]",
      "= 2x + 3 + 0",
      "= 2x + 3"
    ],
    rule: "Sum Rule: d/dx[f + g] = f' + g'"
  },
  {
    integrand: "6x^2",
    proposedAnswer: "3x^3 + C",
    derivative: "9x^2",
    isCorrect: false,
    steps: [
      "d/dx[3x^3 + C]",
      "= d/dx[3x^3] + d/dx[C]",
      "= 3 * 3x^2 + 0",
      "= 9x^2"
    ],
    rule: "Power Rule: d/dx[x^n] = nx^(n-1)",
    error: "Coefficient error! The correct answer is 2x^3 + C",
    errorType: "Coefficient Error"
  },
  {
    integrand: "cos(2x)",
    proposedAnswer: "sin(2x) + C",
    derivative: "2cos(2x)",
    isCorrect: false,
    steps: [
      "d/dx[sin(2x) + C]",
      "Using chain rule: d/dx[sin(u)] = cos(u) * du/dx",
      "= cos(2x) * d/dx[2x]",
      "= cos(2x) * 2",
      "= 2cos(2x)"
    ],
    rule: "Chain Rule: d/dx[f(g(x))] = f'(g(x)) * g'(x)",
    error: "Missing chain rule factor! Correct: (1/2)sin(2x) + C",
    errorType: "Chain Rule Error"
  },
  {
    integrand: "x * e^x",
    proposedAnswer: "x * e^x - e^x + C",
    derivative: "x * e^x",
    isCorrect: true,
    steps: [
      "d/dx[x * e^x - e^x + C]",
      "Using product rule on first term:",
      "d/dx[x * e^x] = x * e^x + e^x * 1 = xe^x + e^x",
      "d/dx[-e^x] = -e^x",
      "d/dx[C] = 0",
      "Total: xe^x + e^x - e^x + 0 = xe^x"
    ],
    rule: "Product Rule: d/dx[f*g] = f*g' + f'*g"
  },
  {
    integrand: "sec^2(x)",
    proposedAnswer: "tan(x) + C",
    derivative: "sec^2(x)",
    isCorrect: true,
    steps: [
      "d/dx[tan(x) + C]",
      "= d/dx[tan(x)] + d/dx[C]",
      "= sec^2(x) + 0",
      "= sec^2(x)"
    ],
    rule: "Trig Rule: d/dx[tan(x)] = sec^2(x)"
  },
  {
    integrand: "1/(1+x^2)",
    proposedAnswer: "tan^(-1)(x) + C",
    derivative: "1/(1+x^2)",
    isCorrect: true,
    steps: [
      "d/dx[arctan(x) + C]",
      "= d/dx[arctan(x)] + d/dx[C]",
      "= 1/(1+x^2) + 0",
      "= 1/(1+x^2)"
    ],
    rule: "Inverse Trig: d/dx[arctan(x)] = 1/(1+x^2)"
  }
];

// Button positions
let checkBtnX, checkBtnY, checkBtnW, checkBtnH;
let showStepsBtnX, showStepsBtnY;
let nextBtnX, nextBtnY;
let prevBtnX, prevBtnY;
let resetBtnX, resetBtnY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
  updateButtonPositions();
  describe('Integration verification tool that checks proposed antiderivatives by differentiating and comparing to the original integrand.', LABEL);
}

function updateButtonPositions() {
  let btnW = 110;
  let btnH = 34;
  let btnY = drawHeight + 15;
  let spacing = 8;

  // Row 1: Main action buttons
  checkBtnX = margin;
  checkBtnY = btnY;
  checkBtnW = btnW;
  checkBtnH = btnH;

  showStepsBtnX = checkBtnX + btnW + spacing;
  showStepsBtnY = btnY;

  resetBtnX = showStepsBtnX + btnW + spacing;
  resetBtnY = btnY;

  // Navigation buttons on right
  prevBtnX = canvasWidth - margin - 2*70 - spacing;
  prevBtnY = btnY;

  nextBtnX = canvasWidth - margin - 70;
  nextBtnY = btnY;
}

function draw() {
  updateCanvasSize();
  animationPhase += 0.05;

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

  // Draw two-panel display
  drawPanels();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill(NEUTRAL_COLOR[0], NEUTRAL_COLOR[1], NEUTRAL_COLOR[2]);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Integration Verifier', canvasWidth / 2, 8);

  textSize(14);
  fill(100);
  text('Check your integral by differentiating the answer', canvasWidth / 2, 32);
}

function drawPanels() {
  let example = examples[currentExample];
  let panelWidth = (canvasWidth - 3 * margin) / 2;
  let panelHeight = showSteps ? 280 : 150;
  let panelY = chartTop + 10;

  // Left Panel: Integration Problem
  drawIntegrationPanel(margin, panelY, panelWidth, panelHeight, example);

  // Right Panel: Verification
  drawVerificationPanel(margin * 2 + panelWidth, panelY, panelWidth, panelHeight, example);

  // Result area (below panels)
  if (hasChecked) {
    drawResult(margin, panelY + panelHeight + 15, canvasWidth - 2 * margin, example);
  }
}

function drawIntegrationPanel(x, y, w, h, example) {
  // Panel background
  fill(255);
  stroke(NEUTRAL_COLOR[0], NEUTRAL_COLOR[1], NEUTRAL_COLOR[2]);
  strokeWeight(2);
  rect(x, y, w, h, 8);

  // Panel header
  fill(NEUTRAL_COLOR[0], NEUTRAL_COLOR[1], NEUTRAL_COLOR[2]);
  noStroke();
  rect(x, y, w, 30, 8, 8, 0, 0);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('Integration Problem', x + w/2, y + 15);
  textStyle(NORMAL);

  // Integrand label
  fill(80);
  textAlign(LEFT, TOP);
  textSize(12);
  text('Find the antiderivative of:', x + 15, y + 45);

  // Integrand f(x)
  fill(40);
  textAlign(CENTER, CENTER);
  textSize(22);
  text('f(x) = ' + example.integrand, x + w/2, y + 85);

  // Proposed answer label
  fill(80);
  textAlign(LEFT, TOP);
  textSize(12);
  text('Proposed antiderivative:', x + 15, y + 115);

  // Proposed answer F(x)
  fill(STEP_COLOR[0], STEP_COLOR[1], STEP_COLOR[2]);
  textAlign(CENTER, CENTER);
  textSize(22);
  textStyle(BOLD);
  text('F(x) = ' + example.proposedAnswer, x + w/2, y + h - 25);
  textStyle(NORMAL);
}

function drawVerificationPanel(x, y, w, h, example) {
  // Determine panel border color based on result
  let borderColor = NEUTRAL_COLOR;
  if (hasChecked) {
    borderColor = example.isCorrect ? CORRECT_COLOR : INCORRECT_COLOR;
  }

  // Panel background with pulsing if checked
  fill(255);
  stroke(borderColor[0], borderColor[1], borderColor[2]);
  strokeWeight(hasChecked ? 3 : 2);
  rect(x, y, w, h, 8);

  // Panel header
  let headerColor = borderColor;
  fill(headerColor[0], headerColor[1], headerColor[2]);
  noStroke();
  rect(x, y, w, 30, 8, 8, 0, 0);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('Verification: d/dx[F(x)]', x + w/2, y + 15);
  textStyle(NORMAL);

  if (!hasChecked) {
    // Show prompt to check
    fill(150);
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Click "Check My Answer" to', x + w/2, y + h/2 - 10);
    text('verify by differentiation', x + w/2, y + h/2 + 10);
  } else {
    // Show differentiation process
    if (showSteps) {
      // Show step-by-step
      let stepY = y + 50;
      let stepHeight = 22;

      for (let i = 0; i < example.steps.length; i++) {
        fill(60);
        textAlign(LEFT, TOP);
        textSize(13);
        text(example.steps[i], x + 15, stepY + i * stepHeight);
      }

      // Show rule used
      fill(STEP_COLOR[0], STEP_COLOR[1], STEP_COLOR[2]);
      textSize(11);
      textStyle(ITALIC);
      textAlign(LEFT, BOTTOM);
      text('Rule: ' + example.rule, x + 15, y + h - 10);
      textStyle(NORMAL);
    } else {
      // Show just the result
      fill(80);
      textAlign(LEFT, TOP);
      textSize(12);
      text('Differentiating F(x):', x + 15, y + 50);

      fill(40);
      textAlign(CENTER, CENTER);
      textSize(22);
      text("F'(x) = " + example.derivative, x + w/2, y + 90);

      // Compare result
      fill(100);
      textSize(12);
      textAlign(LEFT, TOP);
      text('Comparing with f(x) = ' + example.integrand + ':', x + 15, y + 120);
    }
  }
}

function drawResult(x, y, w, example) {
  let resultHeight = 80;
  let bgColor, textColor, statusText, statusIcon;

  if (example.isCorrect) {
    bgColor = [232, 245, 233];  // Light green
    textColor = CORRECT_COLOR;
    statusText = 'CORRECT!';
    statusIcon = '\u2713';  // Checkmark
  } else {
    bgColor = [255, 235, 238];  // Light red
    textColor = INCORRECT_COLOR;
    statusText = 'MISMATCH';
    statusIcon = '\u2717';  // X mark
  }

  // Result box background
  fill(bgColor[0], bgColor[1], bgColor[2]);
  stroke(textColor[0], textColor[1], textColor[2]);
  strokeWeight(2);
  rect(x, y, w, resultHeight, 8);

  // Status icon and text
  fill(textColor[0], textColor[1], textColor[2]);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(28);
  textStyle(BOLD);
  text(statusIcon + ' ' + statusText, x + 20, y + 25);
  textStyle(NORMAL);

  // Explanation
  textSize(14);
  if (example.isCorrect) {
    text("F'(x) = " + example.derivative + " matches f(x) = " + example.integrand, x + 20, y + 55);
    fill(80);
    textSize(12);
    text('The derivative of your antiderivative equals the original integrand.', x + 20, y + resultHeight - 12);
  } else {
    text("F'(x) = " + example.derivative + " does NOT match f(x) = " + example.integrand, x + 20, y + 55);
    if (example.error) {
      fill(textColor[0], textColor[1], textColor[2]);
      textSize(12);
      textStyle(ITALIC);
      text(example.error, x + 20, y + resultHeight - 12);
      textStyle(NORMAL);

      // Error type badge
      let badgeX = w - 120;
      fill(textColor[0], textColor[1], textColor[2]);
      rect(x + badgeX, y + 10, 100, 24, 12);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(11);
      text(example.errorType, x + badgeX + 50, y + 22);
    }
  }

  // Reminder note
  if (example.note && example.isCorrect) {
    fill(NEUTRAL_COLOR[0], NEUTRAL_COLOR[1], NEUTRAL_COLOR[2]);
    textAlign(RIGHT, CENTER);
    textSize(11);
    textStyle(ITALIC);
    text(example.note, x + w - 15, y + resultHeight - 12);
    textStyle(NORMAL);
  }
}

function drawControls() {
  let btnH = 34;
  let navBtnW = 70;

  // Check My Answer button
  let checkEnabled = !hasChecked;
  if (checkEnabled) {
    // Pulsing effect
    let pulse = sin(animationPhase * 2) * 10;
    fill(NEUTRAL_COLOR[0] + pulse, NEUTRAL_COLOR[1], NEUTRAL_COLOR[2]);
    stroke(NEUTRAL_COLOR[0] - 30, NEUTRAL_COLOR[1] - 30, NEUTRAL_COLOR[2] - 30);
  } else {
    fill(180);
    stroke(150);
  }
  strokeWeight(1);
  rect(checkBtnX, checkBtnY, checkBtnW, checkBtnH, 5);

  fill(checkEnabled ? 'white' : '#888');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Check Answer', checkBtnX + checkBtnW/2, checkBtnY + checkBtnH/2);
  textStyle(NORMAL);

  // Show Steps button
  let stepsEnabled = hasChecked;
  fill(stepsEnabled ? (showSteps ? '#4CAF50' : '#2196F3') : '#ccc');
  stroke(stepsEnabled ? (showSteps ? '#388E3C' : '#1976D2') : '#aaa');
  strokeWeight(1);
  rect(showStepsBtnX, showStepsBtnY, checkBtnW, checkBtnH, 5);

  fill(stepsEnabled ? 'white' : '#888');
  noStroke();
  textSize(13);
  text(showSteps ? 'Hide Steps' : 'Show Steps', showStepsBtnX + checkBtnW/2, showStepsBtnY + checkBtnH/2);

  // Reset button
  fill('#FF9800');
  stroke('#F57C00');
  strokeWeight(1);
  rect(resetBtnX, resetBtnY, 80, checkBtnH, 5);

  fill('white');
  noStroke();
  text('Reset', resetBtnX + 40, resetBtnY + checkBtnH/2);

  // Navigation buttons
  // Previous
  let prevEnabled = currentExample > 0;
  fill(prevEnabled ? '#607D8B' : '#ccc');
  stroke(prevEnabled ? '#455A64' : '#aaa');
  strokeWeight(1);
  rect(prevBtnX, prevBtnY, navBtnW, checkBtnH, 5);

  fill(prevEnabled ? 'white' : '#888');
  noStroke();
  text('\u25C0 Prev', prevBtnX + navBtnW/2, prevBtnY + checkBtnH/2);

  // Next
  let nextEnabled = currentExample < examples.length - 1;
  fill(nextEnabled ? '#607D8B' : '#ccc');
  stroke(nextEnabled ? '#455A64' : '#aaa');
  strokeWeight(1);
  rect(nextBtnX, nextBtnY, navBtnW, checkBtnH, 5);

  fill(nextEnabled ? 'white' : '#888');
  noStroke();
  text('Next \u25B6', nextBtnX + navBtnW/2, nextBtnY + checkBtnH/2);

  // Example counter
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Example ' + (currentExample + 1) + ' of ' + examples.length,
       (prevBtnX + nextBtnX + navBtnW) / 2, drawHeight + 65);

  // Second row: Example type indicators
  let indicatorY = drawHeight + 75;
  let indicatorSize = 12;
  let indicatorStartX = margin;

  for (let i = 0; i < examples.length; i++) {
    let ex = examples[i];
    let ix = indicatorStartX + i * (indicatorSize + 4);

    if (i === currentExample) {
      stroke(NEUTRAL_COLOR[0], NEUTRAL_COLOR[1], NEUTRAL_COLOR[2]);
      strokeWeight(2);
    } else {
      noStroke();
    }

    // Color by correctness
    if (ex.isCorrect) {
      fill(180, 220, 180);  // Light green for correct examples
    } else {
      fill(220, 180, 180);  // Light red for incorrect examples
    }

    ellipse(ix + indicatorSize/2, indicatorY, indicatorSize, indicatorSize);
  }

  // Legend for indicators
  fill(100);
  textAlign(LEFT, CENTER);
  textSize(10);
  noStroke();

  fill(180, 220, 180);
  ellipse(indicatorStartX + examples.length * (indicatorSize + 4) + 20, indicatorY, 10, 10);
  fill(100);
  text('Correct', indicatorStartX + examples.length * (indicatorSize + 4) + 30, indicatorY);

  fill(220, 180, 180);
  ellipse(indicatorStartX + examples.length * (indicatorSize + 4) + 90, indicatorY, 10, 10);
  fill(100);
  text('Has error', indicatorStartX + examples.length * (indicatorSize + 4) + 100, indicatorY);
}

function mousePressed() {
  // Check Answer button
  if (mouseX >= checkBtnX && mouseX <= checkBtnX + checkBtnW &&
      mouseY >= checkBtnY && mouseY <= checkBtnY + checkBtnH) {
    if (!hasChecked) {
      hasChecked = true;
      isCorrect = examples[currentExample].isCorrect;
    }
    return;
  }

  // Show Steps button
  if (mouseX >= showStepsBtnX && mouseX <= showStepsBtnX + checkBtnW &&
      mouseY >= showStepsBtnY && mouseY <= showStepsBtnY + checkBtnH) {
    if (hasChecked) {
      showSteps = !showSteps;
    }
    return;
  }

  // Reset button
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 80 &&
      mouseY >= resetBtnY && mouseY <= resetBtnY + checkBtnH) {
    hasChecked = false;
    isCorrect = false;
    showSteps = false;
    return;
  }

  // Previous button
  if (mouseX >= prevBtnX && mouseX <= prevBtnX + 70 &&
      mouseY >= prevBtnY && mouseY <= prevBtnY + checkBtnH) {
    if (currentExample > 0) {
      currentExample--;
      resetState();
    }
    return;
  }

  // Next button
  if (mouseX >= nextBtnX && mouseX <= nextBtnX + 70 &&
      mouseY >= nextBtnY && mouseY <= nextBtnY + checkBtnH) {
    if (currentExample < examples.length - 1) {
      currentExample++;
      resetState();
    }
    return;
  }

  // Click on example indicators
  let indicatorY = drawHeight + 75;
  let indicatorSize = 12;
  let indicatorStartX = margin;

  for (let i = 0; i < examples.length; i++) {
    let ix = indicatorStartX + i * (indicatorSize + 4) + indicatorSize/2;
    let iy = indicatorY;

    if (dist(mouseX, mouseY, ix, iy) < indicatorSize) {
      currentExample = i;
      resetState();
      return;
    }
  }
}

function resetState() {
  hasChecked = false;
  isCorrect = false;
  showSteps = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateButtonPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = max(canvasWidth, 650);  // Minimum width for two panels
  updateButtonPositions();
}
