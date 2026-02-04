// FTC Part 2 Step-by-Step Evaluator MicroSim
// Walk through the FTC Part 2 evaluation process step by step
// Bloom Level 3: Apply

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 50;
let graphRight;
let graphTop = 280;
let graphBottom = 420;

// Problem parameters
let problemIndex = 0;
let currentStep = 0;

// Problem bank
let problems = [
  {
    integrand: 'x²',
    integrandFunc: (x) => x * x,
    antiderivative: 'x³/3',
    antiderivativeFunc: (x) => x * x * x / 3,
    a: 0,
    b: 2,
    steps: [
      'Given: ∫₀² x² dx',
      'Find antiderivative: F(x) = x³/3',
      'Apply FTC Part 2: [x³/3]₀²',
      'Evaluate: F(2) - F(0) = 8/3 - 0',
      'Final Answer: 8/3 ≈ 2.667'
    ],
    answer: 8/3
  },
  {
    integrand: 'sin(x)',
    integrandFunc: (x) => Math.sin(x),
    antiderivative: '-cos(x)',
    antiderivativeFunc: (x) => -Math.cos(x),
    a: 0,
    b: Math.PI,
    steps: [
      'Given: ∫₀^π sin(x) dx',
      'Find antiderivative: F(x) = -cos(x)',
      'Apply FTC Part 2: [-cos(x)]₀^π',
      'Evaluate: F(π) - F(0) = -(-1) - (-1)',
      'Final Answer: 2'
    ],
    answer: 2
  },
  {
    integrand: '2x + 1',
    integrandFunc: (x) => 2 * x + 1,
    antiderivative: 'x² + x',
    antiderivativeFunc: (x) => x * x + x,
    a: 1,
    b: 3,
    steps: [
      'Given: ∫₁³ (2x + 1) dx',
      'Find antiderivative: F(x) = x² + x',
      'Apply FTC Part 2: [x² + x]₁³',
      'Evaluate: F(3) - F(1) = 12 - 2',
      'Final Answer: 10'
    ],
    answer: 10
  },
  {
    integrand: 'eˣ',
    integrandFunc: (x) => Math.exp(x),
    antiderivative: 'eˣ',
    antiderivativeFunc: (x) => Math.exp(x),
    a: 0,
    b: 1,
    steps: [
      'Given: ∫₀¹ eˣ dx',
      'Find antiderivative: F(x) = eˣ',
      'Apply FTC Part 2: [eˣ]₀¹',
      'Evaluate: F(1) - F(0) = e - 1',
      'Final Answer: e - 1 ≈ 1.718'
    ],
    answer: Math.E - 1
  },
  {
    integrand: '1/x',
    integrandFunc: (x) => 1 / x,
    antiderivative: 'ln|x|',
    antiderivativeFunc: (x) => Math.log(x),
    a: 1,
    b: Math.E,
    steps: [
      'Given: ∫₁^e (1/x) dx',
      'Find antiderivative: F(x) = ln|x|',
      'Apply FTC Part 2: [ln|x|]₁^e',
      'Evaluate: F(e) - F(1) = 1 - 0',
      'Final Answer: 1'
    ],
    answer: 1
  }
];

// UI elements
let prevButton, nextStepButton, problemSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create buttons
  prevButton = createButton('◀ Prev');
  prevButton.position(10, drawHeight + 5);
  prevButton.mousePressed(prevStep);

  nextStepButton = createButton('Next ▶');
  nextStepButton.position(80, drawHeight + 5);
  nextStepButton.mousePressed(nextStep);

  // Create problem dropdown
  problemSelect = createSelect();
  problemSelect.position(150, drawHeight + 5);
  for (let i = 0; i < problems.length; i++) {
    problemSelect.option('∫ ' + problems[i].integrand + ' dx', i);
  }
  problemSelect.changed(() => {
    problemIndex = parseInt(problemSelect.value());
    currentStep = 0;
  });

  describe('FTC Part 2 evaluator showing step-by-step definite integral evaluation', LABEL);
}

function prevStep() {
  if (currentStep > 0) currentStep--;
}

function nextStep() {
  if (currentStep < problems[problemIndex].steps.length) currentStep++;
}

function draw() {
  updateCanvasSize();
  graphRight = canvasWidth - 40;

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
  textSize(18);
  text('FTC Part 2 Evaluator', canvasWidth / 2, 8);

  // Theorem reminder
  drawTheoremBox();

  // Solution steps
  drawSolutionSteps(problem);

  // Graph of function with shaded area
  drawGraph(problem);

  // Control area info
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Step ' + currentStep + '/' + problem.steps.length, 10, drawHeight + 55);

  // Progress dots
  for (let i = 0; i < problem.steps.length; i++) {
    if (i < currentStep) {
      fill(0, 150, 0);
    } else {
      fill(200);
    }
    circle(80 + i * 20, drawHeight + 55, 12);
  }

  // Show answer when complete
  if (currentStep === problem.steps.length) {
    fill(0, 100, 0);
    textSize(14);
    text('Area = ' + problem.answer.toFixed(3), 10, drawHeight + 80);
  }
}

function drawTheoremBox() {
  // Box
  fill(255, 255, 230);
  stroke(200, 200, 150);
  strokeWeight(1);
  rect(15, 32, canvasWidth - 30, 40, 5);

  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('FTC Part 2: ∫ₐᵇ f(x)dx = F(b) - F(a)  where F\'(x) = f(x)', canvasWidth / 2, 52);
}

function drawSolutionSteps(problem) {
  let startY = 80;
  let stepHeight = 35;

  for (let i = 0; i < problem.steps.length; i++) {
    let y = startY + i * stepHeight;

    if (i < currentStep) {
      // Revealed step
      fill(240, 255, 240);
      stroke(150, 200, 150);
      strokeWeight(1);
      rect(15, y, canvasWidth - 30, 30, 4);

      fill(0, 100, 0);
      noStroke();
      textAlign(LEFT, CENTER);
      textSize(12);
      text((i + 1) + '. ' + problem.steps[i], 25, y + 15);

      // Checkmark
      fill(0, 150, 0);
      textSize(14);
      text('✓', canvasWidth - 35, y + 15);
    } else {
      // Hidden step
      fill(245);
      stroke(200);
      strokeWeight(1);
      rect(15, y, canvasWidth - 30, 30, 4);

      fill(150);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(11);
      text('Step ' + (i + 1) + ' - Click "Next" to reveal', canvasWidth / 2, y + 15);
    }
  }
}

function drawGraph(problem) {
  // Get y range
  let minY = 0, maxY = 0;
  for (let x = problem.a - 0.5; x <= problem.b + 0.5; x += 0.1) {
    let y = problem.integrandFunc(x);
    if (!isNaN(y) && isFinite(y)) {
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  let padding = (maxY - minY) * 0.2 || 1;
  minY -= padding;
  maxY += padding;

  let zeroY = map(0, minY, maxY, graphBottom, graphTop);

  // X-axis
  stroke(0);
  strokeWeight(1);
  line(graphLeft, zeroY, graphRight, zeroY);

  // Shade area (only when some steps revealed)
  if (currentStep >= 1) {
    let intensity = map(currentStep, 1, problem.steps.length, 50, 150);

    for (let px = graphLeft; px < graphRight; px++) {
      let x = map(px, graphLeft, graphRight, problem.a - 0.5, problem.b + 0.5);
      if (x >= problem.a && x <= problem.b) {
        let y = problem.integrandFunc(x);
        if (!isNaN(y) && isFinite(y)) {
          let py = map(y, minY, maxY, graphBottom, graphTop);

          if (y >= 0) {
            stroke(100, 150, 255, intensity);
          } else {
            stroke(255, 100, 100, intensity);
          }
          line(px, zeroY, px, py);
        }
      }
    }
  }

  // Draw curve
  stroke(0, 100, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px++) {
    let x = map(px, graphLeft, graphRight, problem.a - 0.5, problem.b + 0.5);
    let y = problem.integrandFunc(x);
    if (!isNaN(y) && isFinite(y)) {
      let py = map(y, minY, maxY, graphBottom, graphTop);
      vertex(px, py);
    }
  }
  endShape();

  // Mark bounds
  let aX = map(problem.a, problem.a - 0.5, problem.b + 0.5, graphLeft, graphRight);
  let bX = map(problem.b, problem.a - 0.5, problem.b + 0.5, graphLeft, graphRight);

  stroke(100);
  strokeWeight(1);
  setLineDash([3, 3]);
  line(aX, graphTop, aX, graphBottom);
  line(bX, graphTop, bX, graphBottom);
  setLineDash([]);

  // Labels
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(10);
  text('a=' + formatNum(problem.a), aX, graphBottom + 2);
  text('b=' + formatNum(problem.b), bX, graphBottom + 2);

  // Y-axis label
  textAlign(LEFT, TOP);
  text('f(x)=' + problem.integrand, graphLeft, graphTop - 12);
}

function formatNum(n) {
  if (n === Math.PI) return 'π';
  if (n === Math.E) return 'e';
  return n.toFixed(1);
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
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
