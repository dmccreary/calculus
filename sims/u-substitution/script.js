// u-Substitution Step-by-Step MicroSim
// Walk through the u-substitution process step by step with visual tracking
// Bloom Level: Apply (L3), Verbs: apply, execute, implement
// Learning Objective: Students will apply u-substitution to evaluate integrals

let canvasWidth = 750;
let drawHeight = 480;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Color scheme for highlighting
const U_COLOR = [50, 100, 230];        // Blue for u
const DU_COLOR = [0, 150, 80];         // Green for du
const RESULT_COLOR = [180, 50, 180];   // Purple for final answer
const STEP_BG = [255, 255, 240];       // Light yellow for step backgrounds
const HIGHLIGHT_BG = [255, 250, 220];  // Light gold for current step

// Current state
let currentStep = 0;
let maxSteps = 5;
let selectedIntegral = 0;
let showAllSteps = false;
let showVerification = false;

// Animation
let fadeProgress = [];
let animationPhase = 0;

// Integral presets with step-by-step solutions
const integrals = [
  {
    original: '∫ 2x·cos(x²) dx',
    step1_desc: 'Identify u (the inside function)',
    step1_u: 'u = x²',
    step1_highlight: 'x²',
    step2_desc: 'Calculate du by differentiating u',
    step2_du: 'du = 2x dx',
    step2_note: '(The 2x dx is already in our integral!)',
    step3_desc: 'Rewrite integral in terms of u',
    step3_substituted: '∫ cos(u) du',
    step3_note: 'Replace x² with u, and 2x dx with du',
    step4_desc: 'Integrate with respect to u',
    step4_result: 'sin(u) + C',
    step5_desc: 'Back-substitute: replace u with x²',
    step5_final: 'sin(x²) + C',
    verification: 'd/dx[sin(x²)] = cos(x²)·2x = 2x·cos(x²) ✓'
  },
  {
    original: '∫ (2x + 3)⁴ dx',
    step1_desc: 'Identify u (the inside function)',
    step1_u: 'u = 2x + 3',
    step1_highlight: '2x + 3',
    step2_desc: 'Calculate du by differentiating u',
    step2_du: 'du = 2 dx  →  dx = du/2',
    step2_note: '(Solve for dx since we need to substitute it)',
    step3_desc: 'Rewrite integral in terms of u',
    step3_substituted: '∫ u⁴ · (du/2) = ½∫ u⁴ du',
    step3_note: 'Replace (2x+3) with u, dx with du/2',
    step4_desc: 'Integrate with respect to u',
    step4_result: '½ · u⁵/5 + C = u⁵/10 + C',
    step5_desc: 'Back-substitute: replace u with 2x+3',
    step5_final: '(2x + 3)⁵/10 + C',
    verification: 'd/dx[(2x+3)⁵/10] = 5(2x+3)⁴·2/10 = (2x+3)⁴ ✓'
  },
  {
    original: '∫ x·√(x² + 1) dx',
    step1_desc: 'Identify u (the expression under the radical)',
    step1_u: 'u = x² + 1',
    step1_highlight: 'x² + 1',
    step2_desc: 'Calculate du by differentiating u',
    step2_du: 'du = 2x dx  →  x dx = du/2',
    step2_note: '(Solve for x dx since that appears in integral)',
    step3_desc: 'Rewrite integral in terms of u',
    step3_substituted: '∫ √u · (du/2) = ½∫ u^(1/2) du',
    step3_note: 'Replace √(x²+1) with √u, x dx with du/2',
    step4_desc: 'Integrate with respect to u',
    step4_result: '½ · u^(3/2)/(3/2) + C = u^(3/2)/3 + C',
    step5_desc: 'Back-substitute: replace u with x²+1',
    step5_final: '(x² + 1)^(3/2)/3 + C',
    verification: 'd/dx[(x²+1)^(3/2)/3] = (3/2)(x²+1)^(1/2)·2x/3 = x√(x²+1) ✓'
  },
  {
    original: '∫ sin³(x)·cos(x) dx',
    step1_desc: 'Identify u (function whose derivative appears)',
    step1_u: 'u = sin(x)',
    step1_highlight: 'sin(x)',
    step2_desc: 'Calculate du by differentiating u',
    step2_du: 'du = cos(x) dx',
    step2_note: '(cos(x) dx appears exactly in our integral!)',
    step3_desc: 'Rewrite integral in terms of u',
    step3_substituted: '∫ u³ du',
    step3_note: 'Replace sin³(x) with u³, cos(x) dx with du',
    step4_desc: 'Integrate with respect to u',
    step4_result: 'u⁴/4 + C',
    step5_desc: 'Back-substitute: replace u with sin(x)',
    step5_final: 'sin⁴(x)/4 + C',
    verification: 'd/dx[sin⁴(x)/4] = 4sin³(x)·cos(x)/4 = sin³(x)cos(x) ✓'
  },
  {
    original: '∫ e^(3x) dx',
    step1_desc: 'Identify u (the exponent)',
    step1_u: 'u = 3x',
    step1_highlight: '3x',
    step2_desc: 'Calculate du by differentiating u',
    step2_du: 'du = 3 dx  →  dx = du/3',
    step2_note: '(Solve for dx to substitute)',
    step3_desc: 'Rewrite integral in terms of u',
    step3_substituted: '∫ eᵘ · (du/3) = ⅓∫ eᵘ du',
    step3_note: 'Replace e^(3x) with eᵘ, dx with du/3',
    step4_desc: 'Integrate with respect to u',
    step4_result: '⅓ · eᵘ + C',
    step5_desc: 'Back-substitute: replace u with 3x',
    step5_final: 'e^(3x)/3 + C',
    verification: 'd/dx[e^(3x)/3] = e^(3x)·3/3 = e^(3x) ✓'
  },
  {
    original: '∫ cos(x)/sin(x) dx',
    step1_desc: 'Identify u (the denominator)',
    step1_u: 'u = sin(x)',
    step1_highlight: 'sin(x)',
    step2_desc: 'Calculate du by differentiating u',
    step2_du: 'du = cos(x) dx',
    step2_note: '(cos(x) dx is the numerator times dx!)',
    step3_desc: 'Rewrite integral in terms of u',
    step3_substituted: '∫ du/u = ∫ (1/u) du',
    step3_note: 'Replace cos(x)dx with du, sin(x) with u',
    step4_desc: 'Integrate with respect to u',
    step4_result: 'ln|u| + C',
    step5_desc: 'Back-substitute: replace u with sin(x)',
    step5_final: 'ln|sin(x)| + C',
    verification: 'd/dx[ln|sin(x)|] = cos(x)/sin(x) ✓'
  }
];

// Button positions
let nextBtnX, nextBtnY, nextBtnW, nextBtnH;
let showAllBtnX, showAllBtnY;
let resetBtnX, resetBtnY;
let verifyBtnX, verifyBtnY;
let integralBtnsY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Initialize fade progress for each step
  for (let i = 0; i < maxSteps; i++) {
    fadeProgress[i] = 0;
  }

  updateButtonPositions();

  describe('Interactive u-substitution tutorial showing step-by-step integration with color-coded u and du tracking through each transformation.', LABEL);
}

function updateButtonPositions() {
  // Control buttons layout - Row 1
  nextBtnX = 20;
  nextBtnY = drawHeight + 12;
  nextBtnW = 90;
  nextBtnH = 30;

  showAllBtnX = nextBtnX + nextBtnW + 10;
  showAllBtnY = nextBtnY;

  resetBtnX = showAllBtnX + nextBtnW + 10;
  resetBtnY = nextBtnY;

  verifyBtnX = resetBtnX + 70 + 10;
  verifyBtnY = nextBtnY;

  // Integral selector buttons - Row 2
  integralBtnsY = drawHeight + 52;
}

function draw() {
  updateCanvasSize();
  animationPhase += 0.05;

  // Update fade progress for revealed steps
  for (let i = 0; i < maxSteps; i++) {
    if (showAllSteps || i <= currentStep) {
      fadeProgress[i] = min(fadeProgress[i] + 0.08, 1);
    } else {
      fadeProgress[i] = 0;
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

  // Draw original integral prominently
  drawOriginalIntegral();

  // Draw the steps
  drawSteps();

  // Draw verification if enabled
  if (showVerification && (showAllSteps || currentStep === maxSteps - 1)) {
    drawVerification();
  }

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('u-Substitution Steps', canvasWidth / 2, 8);

  textSize(14);
  fill(100);
  text('∫ f(g(x))·g\'(x) dx = ∫ f(u) du  where u = g(x)', canvasWidth / 2, 32);
}

function drawOriginalIntegral() {
  let integral = integrals[selectedIntegral];

  // Function display box
  let boxY = 55;
  let boxHeight = 45;

  fill(255);
  stroke(150);
  strokeWeight(1);
  rect(margin, boxY, canvasWidth - 2 * margin, boxHeight, 8);

  // Label
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Evaluate:', margin + 15, boxY + 22);

  // Original integral
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(40);
  text(integral.original, canvasWidth / 2 + 30, boxY + 22);

  // Draw color legend
  textSize(11);
  textAlign(LEFT, CENTER);

  // u color box and label
  fill(U_COLOR[0], U_COLOR[1], U_COLOR[2]);
  rect(canvasWidth - 170, boxY + 8, 14, 14, 3);
  fill(80);
  noStroke();
  text('u (substitution)', canvasWidth - 150, boxY + 15);

  // du color box and label
  fill(DU_COLOR[0], DU_COLOR[1], DU_COLOR[2]);
  rect(canvasWidth - 170, boxY + 26, 14, 14, 3);
  fill(80);
  text('du (differential)', canvasWidth - 150, boxY + 33);
}

function drawSteps() {
  let integral = integrals[selectedIntegral];
  let startY = 108;
  let stepHeight = 62;
  let stepMargin = 25;

  // Adjust for verification panel
  let availableHeight = showVerification ? drawHeight - 55 : drawHeight;
  stepHeight = Math.min(62, (availableHeight - startY - 10) / maxSteps);

  // Step data
  let steps = [
    {
      number: 1,
      title: integral.step1_desc,
      content: function(x, y, w) {
        textAlign(LEFT, CENTER);
        textSize(16);
        fill(U_COLOR[0], U_COLOR[1], U_COLOR[2]);
        textStyle(BOLD);
        text(integral.step1_u, x + 15, y + 24);
        textStyle(NORMAL);
      }
    },
    {
      number: 2,
      title: integral.step2_desc,
      content: function(x, y, w) {
        textAlign(LEFT, CENTER);
        textSize(16);
        fill(DU_COLOR[0], DU_COLOR[1], DU_COLOR[2]);
        textStyle(BOLD);
        text(integral.step2_du, x + 15, y + 18);
        textStyle(NORMAL);
        textSize(12);
        fill(100);
        text(integral.step2_note, x + 15, y + 36);
      }
    },
    {
      number: 3,
      title: integral.step3_desc,
      content: function(x, y, w) {
        textAlign(LEFT, CENTER);
        textSize(16);
        fill(40);
        text(integral.step3_substituted, x + 15, y + 18);
        textSize(12);
        fill(100);
        text(integral.step3_note, x + 15, y + 36);
      }
    },
    {
      number: 4,
      title: integral.step4_desc,
      content: function(x, y, w) {
        textAlign(LEFT, CENTER);
        textSize(16);
        fill(U_COLOR[0], U_COLOR[1], U_COLOR[2]);
        text(integral.step4_result, x + 15, y + 24);
      }
    },
    {
      number: 5,
      title: integral.step5_desc,
      content: function(x, y, w) {
        textAlign(LEFT, CENTER);
        textSize(18);
        fill(RESULT_COLOR[0], RESULT_COLOR[1], RESULT_COLOR[2]);
        textStyle(BOLD);
        text(integral.step5_final, x + 15, y + 24);
        textStyle(NORMAL);
      }
    }
  ];

  // Draw each step
  for (let i = 0; i < steps.length; i++) {
    let step = steps[i];
    let y = startY + i * stepHeight;
    let w = canvasWidth - 2 * stepMargin;
    let alpha = fadeProgress[i] * 255;

    // Step background
    if (alpha > 0) {
      // Highlight current step
      if (i === currentStep && !showAllSteps) {
        // Pulsing effect for current step
        let pulse = sin(animationPhase * 2) * 20 + 235;
        fill(255, 255, pulse, alpha);
        stroke(RESULT_COLOR[0], RESULT_COLOR[1], RESULT_COLOR[2], alpha);
        strokeWeight(2);
      } else {
        fill(STEP_BG[0], STEP_BG[1], STEP_BG[2], alpha);
        stroke(200, 200, 200, alpha);
        strokeWeight(1);
      }
      rect(stepMargin, y, w, stepHeight - 4, 6);

      // Step number circle
      fill(100, 100, 100, alpha);
      noStroke();
      circle(stepMargin + 20, y + 13, 22);
      fill(255, 255, 255, alpha);
      textAlign(CENTER, CENTER);
      textSize(12);
      textStyle(BOLD);
      text(step.number, stepMargin + 20, y + 13);
      textStyle(NORMAL);

      // Step title
      fill(60, 60, 60, alpha);
      textAlign(LEFT, CENTER);
      textSize(12);
      text(step.title, stepMargin + 40, y + 13);

      // Draw animated arrow if this is the current step
      if (i === currentStep && !showAllSteps && i < maxSteps - 1) {
        drawAnimatedArrow(stepMargin + w - 30, y + stepHeight / 2 - 2);
      }

      // Step content
      push();
      step.content(stepMargin, y + 10, w);
      pop();
    } else {
      // Show placeholder for hidden steps
      fill(245);
      stroke(220);
      strokeWeight(1);
      rect(stepMargin, y, w, stepHeight - 4, 6);

      fill(180);
      textAlign(CENTER, CENTER);
      textSize(14);
      text('Step ' + step.number + ' - Click "Next Step" to reveal', canvasWidth / 2, y + stepHeight / 2 - 2);
    }
  }
}

function drawAnimatedArrow(x, y) {
  // Animated bouncing arrow pointing down
  let bounce = sin(animationPhase * 3) * 5;

  stroke(RESULT_COLOR[0], RESULT_COLOR[1], RESULT_COLOR[2]);
  strokeWeight(2);
  fill(RESULT_COLOR[0], RESULT_COLOR[1], RESULT_COLOR[2]);

  // Arrow pointing down
  let arrowY = y + bounce;
  triangle(x, arrowY + 10, x - 8, arrowY, x + 8, arrowY);
  line(x, arrowY - 5, x, arrowY);
}

function drawVerification() {
  let integral = integrals[selectedIntegral];
  let verifyY = drawHeight - 50;

  // Verification box
  fill(240, 255, 240);
  stroke(DU_COLOR[0], DU_COLOR[1], DU_COLOR[2]);
  strokeWeight(2);
  rect(margin, verifyY, canvasWidth - 2 * margin, 45, 6);

  // Verification label and content
  noStroke();
  fill(DU_COLOR[0], DU_COLOR[1], DU_COLOR[2]);
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('VERIFY by differentiating:', margin + 15, verifyY + 15);
  textStyle(NORMAL);

  textSize(14);
  fill(40);
  text(integral.verification, margin + 15, verifyY + 32);
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
  rect(resetBtnX, resetBtnY, 60, nextBtnH, 5);

  fill('white');
  noStroke();
  text('Reset', resetBtnX + 30, resetBtnY + nextBtnH / 2);

  // Verify button
  fill(showVerification ? '#9c27b0' : '#e0e0e0');
  stroke(showVerification ? '#7b1fa2' : '#bdbdbd');
  strokeWeight(1);
  rect(verifyBtnX, verifyBtnY, 65, nextBtnH, 5);

  fill(showVerification ? 'white' : 'black');
  noStroke();
  text('Verify', verifyBtnX + 32, verifyBtnY + nextBtnH / 2);

  // Row 2: Integral selector

  // Label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Example:', 20, integralBtnsY + 14);

  // Integral preset buttons
  let integralBtnX = 80;
  let btnWidth = (canvasWidth - 100) / integrals.length - 5;
  btnWidth = min(btnWidth, 110);

  for (let i = 0; i < integrals.length; i++) {
    let isSelected = selectedIntegral === i;
    let x = integralBtnX + i * (btnWidth + 5);

    fill(isSelected ? '#3f51b5' : '#e0e0e0');
    stroke(isSelected ? '#303f9f' : '#bdbdbd');
    strokeWeight(1);
    rect(x, integralBtnsY, btnWidth, 28, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);

    // Show shortened version of integral
    let label = integrals[i].original;
    if (label.length > 16) {
      label = label.substring(0, 14) + '...';
    }
    text(label, x + btnWidth / 2, integralBtnsY + 14);
  }
}

function mousePressed() {
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
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 60 &&
      mouseY >= resetBtnY && mouseY <= resetBtnY + nextBtnH) {
    resetSteps();
    return;
  }

  // Check Verify button
  if (mouseX >= verifyBtnX && mouseX <= verifyBtnX + 65 &&
      mouseY >= verifyBtnY && mouseY <= verifyBtnY + nextBtnH) {
    showVerification = !showVerification;
    return;
  }

  // Check integral preset buttons
  let integralBtnX = 80;
  let btnWidth = (canvasWidth - 100) / integrals.length - 5;
  btnWidth = min(btnWidth, 110);

  for (let i = 0; i < integrals.length; i++) {
    let x = integralBtnX + i * (btnWidth + 5);
    if (mouseX >= x && mouseX <= x + btnWidth &&
        mouseY >= integralBtnsY && mouseY <= integralBtnsY + 28) {
      if (selectedIntegral !== i) {
        selectedIntegral = i;
        resetSteps();
      }
      return;
    }
  }
}

function resetSteps() {
  currentStep = 0;
  showAllSteps = false;
  showVerification = false;
  for (let i = 0; i < maxSteps; i++) {
    fadeProgress[i] = 0;
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
  canvasWidth = max(canvasWidth, 650); // Minimum width for readability
  updateButtonPositions();
}
