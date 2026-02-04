// FTC Part 1 Derivative Calculator MicroSim
// Practice applying FTC Part 1 with and without chain rule
// Bloom Level 3: Apply

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Problem parameters
let problemIndex = 0;
let currentStep = 0;
let maxSteps = 4;

// Problem bank
let problems = [
  {
    integrand: 't²',
    upper: 'x',
    lower: '0',
    answer: 'x²',
    needsChainRule: false,
    steps: [
      'Given: d/dx[∫₀ˣ t² dt]',
      'By FTC Part 1: d/dx[∫ₐˣ f(t)dt] = f(x)',
      'Here f(t) = t², so f(x) = x²',
      'Answer: x²'
    ]
  },
  {
    integrand: 'sin(t)',
    upper: 'x²',
    lower: '0',
    answer: '2x·sin(x²)',
    needsChainRule: true,
    steps: [
      'Given: d/dx[∫₀^(x²) sin(t) dt]',
      'Upper limit is g(x) = x², so g\'(x) = 2x',
      'By FTC Part 1 + Chain Rule:',
      'f(g(x))·g\'(x) = sin(x²)·2x = 2x·sin(x²)'
    ]
  },
  {
    integrand: 'eᵗ',
    upper: 'x³',
    lower: '1',
    answer: '3x²·eˣ³',
    needsChainRule: true,
    steps: [
      'Given: d/dx[∫₁^(x³) eᵗ dt]',
      'Upper limit is g(x) = x³, so g\'(x) = 3x²',
      'By FTC Part 1 + Chain Rule:',
      'f(g(x))·g\'(x) = e^(x³)·3x² = 3x²·eˣ³'
    ]
  },
  {
    integrand: 'cos(t)',
    upper: 'x',
    lower: '2',
    answer: 'cos(x)',
    needsChainRule: false,
    steps: [
      'Given: d/dx[∫₂ˣ cos(t) dt]',
      'By FTC Part 1: d/dx[∫ₐˣ f(t)dt] = f(x)',
      'Here f(t) = cos(t), so f(x) = cos(x)',
      'Answer: cos(x)'
    ]
  },
  {
    integrand: '1/t',
    upper: 'ln(x)',
    lower: '1',
    answer: '1/(x·ln(x))',
    needsChainRule: true,
    steps: [
      'Given: d/dx[∫₁^(ln(x)) 1/t dt]',
      'Upper limit is g(x) = ln(x), so g\'(x) = 1/x',
      'By FTC Part 1 + Chain Rule:',
      'f(g(x))·g\'(x) = 1/ln(x)·(1/x) = 1/(x·ln(x))'
    ]
  },
  {
    integrand: 't³',
    upper: 'x',
    lower: '-1',
    answer: 'x³',
    needsChainRule: false,
    steps: [
      'Given: d/dx[∫₋₁ˣ t³ dt]',
      'By FTC Part 1: d/dx[∫ₐˣ f(t)dt] = f(x)',
      'Here f(t) = t³, so f(x) = x³',
      'Answer: x³'
    ]
  }
];

// UI elements
let prevButton, nextStepButton, newProblemButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create buttons
  prevButton = createButton('◀ Prev Step');
  prevButton.position(10, drawHeight + 5);
  prevButton.mousePressed(prevStep);

  nextStepButton = createButton('Next Step ▶');
  nextStepButton.position(110, drawHeight + 5);
  nextStepButton.mousePressed(nextStep);

  newProblemButton = createButton('New Problem');
  newProblemButton.position(220, drawHeight + 5);
  newProblemButton.mousePressed(newProblem);

  describe('FTC Part 1 calculator showing step-by-step derivative solutions', LABEL);
}

function prevStep() {
  if (currentStep > 0) currentStep--;
}

function nextStep() {
  if (currentStep < problems[problemIndex].steps.length) currentStep++;
}

function newProblem() {
  problemIndex = (problemIndex + 1) % problems.length;
  currentStep = 0;
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
  rect(0, drawHeight, canvasWidth, controlHeight);

  let problem = problems[problemIndex];

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('FTC Part 1 Calculator', canvasWidth / 2, 10);

  // Theorem reminder box
  drawTheoremBox();

  // Problem display
  drawProblem(problem);

  // Solution steps
  drawSolutionSteps(problem);

  // Chain rule indicator
  if (problem.needsChainRule) {
    fill(200, 100, 100);
    textAlign(LEFT, TOP);
    textSize(12);
    text('⚠ Chain Rule Required!', 10, drawHeight - 25);
  }

  // Control area info
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Problem ' + (problemIndex + 1) + '/' + problems.length, 10, drawHeight + 55);
  text('Step ' + currentStep + '/' + problem.steps.length, 10, drawHeight + 75);

  // Progress indicator
  textSize(12);
  text('Progress: ', 150, drawHeight + 55);
  for (let i = 0; i < problem.steps.length; i++) {
    if (i < currentStep) {
      fill(0, 150, 0);
    } else {
      fill(200);
    }
    circle(210 + i * 25, drawHeight + 55, 15);
  }
}

function drawTheoremBox() {
  // Box
  fill(255, 255, 230);
  stroke(200, 200, 150);
  strokeWeight(1);
  rect(20, 40, canvasWidth - 40, 60, 5);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('FTC Part 1:', canvasWidth / 2, 45);

  textSize(14);
  text('d/dx[∫ₐˣ f(t)dt] = f(x)', canvasWidth / 2, 62);

  textSize(11);
  text('With Chain Rule: d/dx[∫ₐ^(g(x)) f(t)dt] = f(g(x))·g\'(x)', canvasWidth / 2, 82);
}

function drawProblem(problem) {
  // Problem box
  fill(255);
  stroke(100);
  strokeWeight(1);
  rect(20, 110, canvasWidth - 40, 50, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Find:', 30, 125);

  textAlign(CENTER, CENTER);
  textSize(18);

  // Build the expression
  let expr = 'd/dx[∫';
  text(expr + '₍' + problem.lower + '₎^⁽' + problem.upper + '⁾ ' + problem.integrand + ' dt]', canvasWidth / 2, 140);
}

function drawSolutionSteps(problem) {
  let startY = 175;
  let stepHeight = 45;

  for (let i = 0; i < problem.steps.length; i++) {
    let y = startY + i * stepHeight;

    if (i < currentStep) {
      // Revealed step
      fill(240, 255, 240);
      stroke(150, 200, 150);
      strokeWeight(1);
      rect(20, y, canvasWidth - 40, 40, 5);

      fill(0, 100, 0);
      noStroke();
      textAlign(LEFT, CENTER);
      textSize(13);
      text((i + 1) + '. ' + problem.steps[i], 30, y + 20);

      // Checkmark
      fill(0, 150, 0);
      textSize(16);
      text('✓', canvasWidth - 40, y + 20);
    } else {
      // Hidden step
      fill(240);
      stroke(200);
      strokeWeight(1);
      rect(20, y, canvasWidth - 40, 40, 5);

      fill(150);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(13);
      text('Step ' + (i + 1) + ' - Click "Next Step" to reveal', canvasWidth / 2, y + 20);
    }
  }

  // Final answer highlight (when all steps revealed)
  if (currentStep === problem.steps.length) {
    let y = startY + problem.steps.length * stepHeight + 10;

    fill(230, 255, 230);
    stroke(0, 150, 0);
    strokeWeight(2);
    rect(20, y, canvasWidth - 40, 35, 5);

    fill(0, 100, 0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Final Answer: ' + problem.answer, canvasWidth / 2, y + 17);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
