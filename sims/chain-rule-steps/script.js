// Chain Rule Steps MicroSim
// Guide students through the chain rule process with visual highlighting of each step
// Bloom Level: Apply (L3), Verbs: apply, execute, implement
// Learning Objective: Students will apply the chain rule systematically to differentiate composite functions

let canvasWidth = 750;
let drawHeight = 440;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Color scheme for highlighting
const INSIDE_COLOR = [230, 100, 50];   // Orange for inside function
const OUTSIDE_COLOR = [50, 100, 230];  // Blue for outside function
const RESULT_COLOR = [0, 150, 80];     // Green for final answer
const STEP_BG = [255, 255, 240];       // Light yellow for step backgrounds

// Current state
let currentStep = 0;
let maxSteps = 5;
let selectedFunction = 0;
let difficulty = 'basic';
let showAllSteps = false;

// Animation
let fadeProgress = [];
let animationPhase = 0;

// Function presets organized by difficulty
const functions = {
  basic: [
    {
      input: 'sin(2x)',
      inside: '2x',
      outside: 'sin(u)',
      outsideDerivKeepInside: 'cos(2x)',
      insideDeriv: '2',
      multiplied: 'cos(2x) * 2',
      simplified: '2cos(2x)'
    },
    {
      input: '(x^2)^3',
      inside: 'x^2',
      outside: 'u^3',
      outsideDerivKeepInside: '3(x^2)^2',
      insideDeriv: '2x',
      multiplied: '3(x^2)^2 * 2x',
      simplified: '6x^5'
    },
    {
      input: 'e^(3x)',
      inside: '3x',
      outside: 'e^u',
      outsideDerivKeepInside: 'e^(3x)',
      insideDeriv: '3',
      multiplied: 'e^(3x) * 3',
      simplified: '3e^(3x)'
    },
    {
      input: 'cos(5x)',
      inside: '5x',
      outside: 'cos(u)',
      outsideDerivKeepInside: '-sin(5x)',
      insideDeriv: '5',
      multiplied: '-sin(5x) * 5',
      simplified: '-5sin(5x)'
    }
  ],
  intermediate: [
    {
      input: 'sin(x^2)',
      inside: 'x^2',
      outside: 'sin(u)',
      outsideDerivKeepInside: 'cos(x^2)',
      insideDeriv: '2x',
      multiplied: 'cos(x^2) * 2x',
      simplified: '2x*cos(x^2)'
    },
    {
      input: '(3x+1)^4',
      inside: '3x+1',
      outside: 'u^4',
      outsideDerivKeepInside: '4(3x+1)^3',
      insideDeriv: '3',
      multiplied: '4(3x+1)^3 * 3',
      simplified: '12(3x+1)^3'
    },
    {
      input: 'sqrt(x^2+1)',
      inside: 'x^2+1',
      outside: 'sqrt(u)',
      outsideDerivKeepInside: '1/(2*sqrt(x^2+1))',
      insideDeriv: '2x',
      multiplied: '1/(2*sqrt(x^2+1)) * 2x',
      simplified: 'x/sqrt(x^2+1)'
    },
    {
      input: 'ln(2x+3)',
      inside: '2x+3',
      outside: 'ln(u)',
      outsideDerivKeepInside: '1/(2x+3)',
      insideDeriv: '2',
      multiplied: '1/(2x+3) * 2',
      simplified: '2/(2x+3)'
    }
  ],
  advanced: [
    {
      input: 'e^(sin(x))',
      inside: 'sin(x)',
      outside: 'e^u',
      outsideDerivKeepInside: 'e^(sin(x))',
      insideDeriv: 'cos(x)',
      multiplied: 'e^(sin(x)) * cos(x)',
      simplified: 'cos(x)*e^(sin(x))'
    },
    {
      input: 'sin^2(x)',
      inside: 'sin(x)',
      outside: 'u^2',
      outsideDerivKeepInside: '2*sin(x)',
      insideDeriv: 'cos(x)',
      multiplied: '2*sin(x) * cos(x)',
      simplified: 'sin(2x)'
    },
    {
      input: 'tan(x^3)',
      inside: 'x^3',
      outside: 'tan(u)',
      outsideDerivKeepInside: 'sec^2(x^3)',
      insideDeriv: '3x^2',
      multiplied: 'sec^2(x^3) * 3x^2',
      simplified: '3x^2*sec^2(x^3)'
    },
    {
      input: 'ln(cos(x))',
      inside: 'cos(x)',
      outside: 'ln(u)',
      outsideDerivKeepInside: '1/cos(x)',
      insideDeriv: '-sin(x)',
      multiplied: '1/cos(x) * (-sin(x))',
      simplified: '-tan(x)'
    }
  ]
};

// Button positions
let nextBtnX, nextBtnY, nextBtnW, nextBtnH;
let showAllBtnX, showAllBtnY;
let resetBtnX, resetBtnY;
let diffBtnsY;
let funcBtnsY;

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

  describe('Interactive chain rule tutorial showing step-by-step differentiation of composite functions with color-coded inside and outside functions.', LABEL);
}

function updateButtonPositions() {
  // Control buttons layout
  nextBtnX = 20;
  nextBtnY = drawHeight + 15;
  nextBtnW = 90;
  nextBtnH = 32;

  showAllBtnX = nextBtnX + nextBtnW + 10;
  showAllBtnY = nextBtnY;

  resetBtnX = showAllBtnX + nextBtnW + 10;
  resetBtnY = nextBtnY;

  // Difficulty buttons
  diffBtnsY = drawHeight + 58;

  // Function preset buttons
  funcBtnsY = drawHeight + 58;
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

  // Draw input function prominently
  drawInputFunction();

  // Draw the steps
  drawSteps();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Chain Rule Steps', canvasWidth / 2, 8);

  textSize(14);
  fill(100);
  text('d/dx[f(g(x))] = f\'(g(x)) * g\'(x)', canvasWidth / 2, 32);
}

function drawInputFunction() {
  let func = functions[difficulty][selectedFunction];

  // Function display box
  let boxY = 58;
  let boxHeight = 50;

  fill(255);
  stroke(150);
  strokeWeight(1);
  rect(margin, boxY, canvasWidth - 2*margin, boxHeight, 8);

  // Label
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Find the derivative of:', margin + 15, boxY + 18);

  // Function with highlighted parts
  textSize(22);
  textAlign(CENTER, CENTER);

  // Draw the function - highlight inside/outside based on current step
  let funcX = canvasWidth / 2;
  let funcY = boxY + 35;

  fill(40);
  text('f(x) = ' + func.input, funcX, funcY);

  // Draw color legend
  textSize(11);
  textAlign(LEFT, CENTER);

  // Outside function color box and label
  fill(OUTSIDE_COLOR[0], OUTSIDE_COLOR[1], OUTSIDE_COLOR[2]);
  rect(canvasWidth - 200, boxY + 10, 14, 14, 3);
  fill(80);
  noStroke();
  text('Outside function', canvasWidth - 180, boxY + 17);

  // Inside function color box and label
  fill(INSIDE_COLOR[0], INSIDE_COLOR[1], INSIDE_COLOR[2]);
  rect(canvasWidth - 200, boxY + 30, 14, 14, 3);
  fill(80);
  text('Inside function', canvasWidth - 180, boxY + 37);
}

function drawSteps() {
  let func = functions[difficulty][selectedFunction];
  let startY = 118;
  let stepHeight = 58;
  let stepMargin = 25;

  // Step data
  let steps = [
    {
      number: 1,
      title: 'Identify the inside and outside functions',
      content: function(x, y, w) {
        textAlign(LEFT, CENTER);
        textSize(14);

        // Inside function
        fill(INSIDE_COLOR[0], INSIDE_COLOR[1], INSIDE_COLOR[2]);
        text('Inside: g(x) = ', x + 15, y + 22);
        textSize(16);
        let insideX = x + 105;
        text(func.inside, insideX, y + 22);

        // Outside function
        textSize(14);
        fill(OUTSIDE_COLOR[0], OUTSIDE_COLOR[1], OUTSIDE_COLOR[2]);
        text('Outside: f(u) = ', x + w/2, y + 22);
        textSize(16);
        text(func.outside, x + w/2 + 100, y + 22);
      }
    },
    {
      number: 2,
      title: 'Derivative of outside (keep inside unchanged)',
      content: function(x, y, w) {
        textAlign(LEFT, CENTER);
        textSize(14);
        fill(OUTSIDE_COLOR[0], OUTSIDE_COLOR[1], OUTSIDE_COLOR[2]);
        text("f'(g(x)) = ", x + 15, y + 22);
        textSize(16);
        text(func.outsideDerivKeepInside, x + 85, y + 22);
      }
    },
    {
      number: 3,
      title: 'Derivative of inside function',
      content: function(x, y, w) {
        textAlign(LEFT, CENTER);
        textSize(14);
        fill(INSIDE_COLOR[0], INSIDE_COLOR[1], INSIDE_COLOR[2]);
        text("g'(x) = ", x + 15, y + 22);
        textSize(16);
        text(func.insideDeriv, x + 70, y + 22);
      }
    },
    {
      number: 4,
      title: 'Multiply: (Step 2) x (Step 3)',
      content: function(x, y, w) {
        textAlign(LEFT, CENTER);
        textSize(14);
        fill(80);
        text("f'(x) = ", x + 15, y + 22);

        // Show the multiplication with colors
        textSize(16);
        fill(OUTSIDE_COLOR[0], OUTSIDE_COLOR[1], OUTSIDE_COLOR[2]);
        let part1Width = textWidth(func.outsideDerivKeepInside);
        text(func.outsideDerivKeepInside, x + 70, y + 22);

        fill(80);
        text(' * ', x + 75 + part1Width, y + 22);

        fill(INSIDE_COLOR[0], INSIDE_COLOR[1], INSIDE_COLOR[2]);
        text(func.insideDeriv, x + 95 + part1Width, y + 22);
      }
    },
    {
      number: 5,
      title: 'Simplify for final answer',
      content: function(x, y, w) {
        textAlign(LEFT, CENTER);
        textSize(14);
        fill(RESULT_COLOR[0], RESULT_COLOR[1], RESULT_COLOR[2]);
        text("f'(x) = ", x + 15, y + 22);
        textSize(18);
        textStyle(BOLD);
        text(func.simplified, x + 70, y + 22);
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
      rect(stepMargin, y, w, stepHeight - 5, 6);

      // Step number circle
      fill(100, 100, 100, alpha);
      noStroke();
      circle(stepMargin + 20, y + 14, 22);
      fill(255, 255, 255, alpha);
      textAlign(CENTER, CENTER);
      textSize(12);
      textStyle(BOLD);
      text(step.number, stepMargin + 20, y + 14);
      textStyle(NORMAL);

      // Step title
      fill(60, 60, 60, alpha);
      textAlign(LEFT, CENTER);
      textSize(12);
      text(step.title, stepMargin + 40, y + 14);

      // Draw animated arrow if this is the current step
      if (i === currentStep && !showAllSteps && i < maxSteps - 1) {
        drawAnimatedArrow(stepMargin + w - 30, y + stepHeight/2 - 2);
      }

      // Step content
      push();
      // Apply fade
      let contentAlpha = alpha / 255;
      step.content(stepMargin, y + 15, w);
      pop();
    } else {
      // Show placeholder for hidden steps
      fill(245);
      stroke(220);
      strokeWeight(1);
      rect(stepMargin, y, w, stepHeight - 5, 6);

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
  textSize(14);
  text('Next Step', nextBtnX + nextBtnW/2, nextBtnY + nextBtnH/2);

  // Show All button
  fill(showAllSteps ? '#cccccc' : '#2196F3');
  stroke(showAllSteps ? '#aaaaaa' : '#1976D2');
  strokeWeight(1);
  rect(showAllBtnX, showAllBtnY, nextBtnW, nextBtnH, 5);

  fill(showAllSteps ? '#888888' : 'white');
  noStroke();
  text('Show All', showAllBtnX + nextBtnW/2, showAllBtnY + nextBtnH/2);

  // Reset button
  fill('#ff9800');
  stroke('#f57c00');
  strokeWeight(1);
  rect(resetBtnX, resetBtnY, 70, nextBtnH, 5);

  fill('white');
  noStroke();
  text('Reset', resetBtnX + 35, resetBtnY + nextBtnH/2);

  // Row 2: Difficulty selector and function presets

  // Difficulty label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Difficulty:', 20, diffBtnsY + 16);

  // Difficulty buttons
  let difficulties = ['basic', 'intermediate', 'advanced'];
  let diffBtnX = 90;
  let diffBtnW = 85;

  for (let i = 0; i < difficulties.length; i++) {
    let isSelected = difficulty === difficulties[i];

    fill(isSelected ? '#9c27b0' : '#e0e0e0');
    stroke(isSelected ? '#7b1fa2' : '#bdbdbd');
    strokeWeight(1);
    rect(diffBtnX + i * (diffBtnW + 5), diffBtnsY, diffBtnW, 28, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(difficulties[i].charAt(0).toUpperCase() + difficulties[i].slice(1),
         diffBtnX + i * (diffBtnW + 5) + diffBtnW/2, diffBtnsY + 14);
  }

  // Function selector label
  textAlign(LEFT, CENTER);
  fill('black');
  textSize(13);
  text('Function:', 375, diffBtnsY + 16);

  // Function preset buttons
  let funcList = functions[difficulty];
  let funcBtnX = 445;
  let funcBtnW = 70;

  for (let i = 0; i < Math.min(funcList.length, 4); i++) {
    let isSelected = selectedFunction === i;

    fill(isSelected ? '#3f51b5' : '#e0e0e0');
    stroke(isSelected ? '#303f9f' : '#bdbdbd');
    strokeWeight(1);
    rect(funcBtnX + i * (funcBtnW + 5), funcBtnsY, funcBtnW, 28, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(funcList[i].input, funcBtnX + i * (funcBtnW + 5) + funcBtnW/2, funcBtnsY + 14);
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
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 70 &&
      mouseY >= resetBtnY && mouseY <= resetBtnY + nextBtnH) {
    resetSteps();
    return;
  }

  // Check difficulty buttons
  let difficulties = ['basic', 'intermediate', 'advanced'];
  let diffBtnX = 90;
  let diffBtnW = 85;

  for (let i = 0; i < difficulties.length; i++) {
    if (mouseX >= diffBtnX + i * (diffBtnW + 5) &&
        mouseX <= diffBtnX + i * (diffBtnW + 5) + diffBtnW &&
        mouseY >= diffBtnsY && mouseY <= diffBtnsY + 28) {
      if (difficulty !== difficulties[i]) {
        difficulty = difficulties[i];
        selectedFunction = 0;
        resetSteps();
      }
      return;
    }
  }

  // Check function preset buttons
  let funcList = functions[difficulty];
  let funcBtnX = 445;
  let funcBtnW = 70;

  for (let i = 0; i < Math.min(funcList.length, 4); i++) {
    if (mouseX >= funcBtnX + i * (funcBtnW + 5) &&
        mouseX <= funcBtnX + i * (funcBtnW + 5) + funcBtnW &&
        mouseY >= funcBtnsY && mouseY <= funcBtnsY + 28) {
      if (selectedFunction !== i) {
        selectedFunction = i;
        resetSteps();
      }
      return;
    }
  }
}

function resetSteps() {
  currentStep = 0;
  showAllSteps = false;
  for (let i = 0; i < maxSteps; i++) {
    fadeProgress[i] = 0;
  }
  fadeProgress[0] = 0; // Will animate in
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateButtonPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = max(canvasWidth, 600); // Minimum width for readability
  updateButtonPositions();
}
