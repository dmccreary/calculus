// Transcendental Integral Practice MicroSim
// Interactive practice with all transcendental integral types
// Bloom Level: Apply (L3), Verbs: apply, calculate, solve
// Learning Objective: Students will apply the appropriate antiderivative formula for transcendental functions

let canvasWidth = 750;
let drawHeight = 520;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Color scheme - purple theme
const PURPLE_THEME = [128, 0, 128];
const CORRECT_COLOR = [76, 175, 80];    // Green
const INCORRECT_COLOR = [244, 67, 54];  // Red
const HINT_COLOR = [255, 152, 0];       // Orange
const GRAPH_COLOR = [33, 150, 243];     // Blue

// Categories
const CATEGORIES = ['Trig', 'Exponential', 'Log', 'Inverse Trig', 'Mixed'];
let currentCategory = 0;

// Difficulty levels
const DIFFICULTIES = ['Basic', 'Intermediate', 'Advanced'];
let currentDifficulty = 0;

// Problem bank organized by category and difficulty
let problems = {
  'Trig': {
    'Basic': [
      { integrand: 'sin(x)', answer: '-cos(x) + C', formula: 'integral of sin(x) dx = -cos(x) + C', fn: x => Math.sin(x), antifn: x => -Math.cos(x) },
      { integrand: 'cos(x)', answer: 'sin(x) + C', formula: 'integral of cos(x) dx = sin(x) + C', fn: x => Math.cos(x), antifn: x => Math.sin(x) },
      { integrand: 'sec^2(x)', answer: 'tan(x) + C', formula: 'integral of sec^2(x) dx = tan(x) + C', fn: x => 1/Math.pow(Math.cos(x), 2), antifn: x => Math.tan(x) },
      { integrand: 'csc^2(x)', answer: '-cot(x) + C', formula: 'integral of csc^2(x) dx = -cot(x) + C', fn: x => 1/Math.pow(Math.sin(x), 2), antifn: x => -1/Math.tan(x) },
    ],
    'Intermediate': [
      { integrand: 'sec(x)tan(x)', answer: 'sec(x) + C', formula: 'integral of sec(x)tan(x) dx = sec(x) + C', fn: x => Math.tan(x)/Math.cos(x), antifn: x => 1/Math.cos(x) },
      { integrand: 'csc(x)cot(x)', answer: '-csc(x) + C', formula: 'integral of csc(x)cot(x) dx = -csc(x) + C', fn: x => -(Math.cos(x)/Math.pow(Math.sin(x),2)), antifn: x => -1/Math.sin(x) },
      { integrand: '3sin(x)', answer: '-3cos(x) + C', formula: 'integral of 3sin(x) dx = -3cos(x) + C', fn: x => 3*Math.sin(x), antifn: x => -3*Math.cos(x) },
      { integrand: '2cos(x)', answer: '2sin(x) + C', formula: 'integral of 2cos(x) dx = 2sin(x) + C', fn: x => 2*Math.cos(x), antifn: x => 2*Math.sin(x) },
    ],
    'Advanced': [
      { integrand: 'sin(2x)', answer: '-cos(2x)/2 + C', formula: 'u = 2x, du = 2dx; integral = -cos(2x)/2 + C', fn: x => Math.sin(2*x), antifn: x => -Math.cos(2*x)/2 },
      { integrand: 'cos(3x)', answer: 'sin(3x)/3 + C', formula: 'u = 3x, du = 3dx; integral = sin(3x)/3 + C', fn: x => Math.cos(3*x), antifn: x => Math.sin(3*x)/3 },
      { integrand: 'sec^2(2x)', answer: 'tan(2x)/2 + C', formula: 'u = 2x, du = 2dx; integral = tan(2x)/2 + C', fn: x => 1/Math.pow(Math.cos(2*x), 2), antifn: x => Math.tan(2*x)/2 },
    ]
  },
  'Exponential': {
    'Basic': [
      { integrand: 'e^x', answer: 'e^x + C', formula: 'integral of e^x dx = e^x + C', fn: x => Math.exp(x), antifn: x => Math.exp(x) },
      { integrand: '2^x', answer: '2^x/ln(2) + C', formula: 'integral of a^x dx = a^x/ln(a) + C', fn: x => Math.pow(2, x), antifn: x => Math.pow(2, x)/Math.log(2) },
      { integrand: '3^x', answer: '3^x/ln(3) + C', formula: 'integral of a^x dx = a^x/ln(a) + C', fn: x => Math.pow(3, x), antifn: x => Math.pow(3, x)/Math.log(3) },
    ],
    'Intermediate': [
      { integrand: '5e^x', answer: '5e^x + C', formula: 'integral of 5e^x dx = 5e^x + C', fn: x => 5*Math.exp(x), antifn: x => 5*Math.exp(x) },
      { integrand: '-e^x', answer: '-e^x + C', formula: 'integral of -e^x dx = -e^x + C', fn: x => -Math.exp(x), antifn: x => -Math.exp(x) },
      { integrand: 'e^(2x)', answer: 'e^(2x)/2 + C', formula: 'u = 2x, du = 2dx; integral = e^(2x)/2 + C', fn: x => Math.exp(2*x), antifn: x => Math.exp(2*x)/2 },
    ],
    'Advanced': [
      { integrand: 'e^(-x)', answer: '-e^(-x) + C', formula: 'u = -x, du = -dx; integral = -e^(-x) + C', fn: x => Math.exp(-x), antifn: x => -Math.exp(-x) },
      { integrand: 'e^(3x)', answer: 'e^(3x)/3 + C', formula: 'u = 3x, du = 3dx; integral = e^(3x)/3 + C', fn: x => Math.exp(3*x), antifn: x => Math.exp(3*x)/3 },
      { integrand: 'x*e^(x^2)', answer: 'e^(x^2)/2 + C', formula: 'u = x^2, du = 2x dx; integral = e^(x^2)/2 + C', fn: x => x*Math.exp(x*x), antifn: x => Math.exp(x*x)/2 },
    ]
  },
  'Log': {
    'Basic': [
      { integrand: '1/x', answer: 'ln|x| + C', formula: 'integral of 1/x dx = ln|x| + C', fn: x => 1/x, antifn: x => Math.log(Math.abs(x)) },
    ],
    'Intermediate': [
      { integrand: '3/x', answer: '3ln|x| + C', formula: 'integral of 3/x dx = 3ln|x| + C', fn: x => 3/x, antifn: x => 3*Math.log(Math.abs(x)) },
      { integrand: '1/(2x)', answer: 'ln|x|/2 + C', formula: 'integral of 1/(2x) dx = (1/2)ln|x| + C', fn: x => 1/(2*x), antifn: x => Math.log(Math.abs(x))/2 },
    ],
    'Advanced': [
      { integrand: '1/(x+1)', answer: 'ln|x+1| + C', formula: 'u = x+1, du = dx; integral = ln|x+1| + C', fn: x => 1/(x+1), antifn: x => Math.log(Math.abs(x+1)) },
      { integrand: '2x/(x^2+1)', answer: 'ln(x^2+1) + C', formula: 'u = x^2+1, du = 2x dx; integral = ln(x^2+1) + C', fn: x => 2*x/(x*x+1), antifn: x => Math.log(x*x+1) },
      { integrand: 'x/(x^2+1)', answer: 'ln(x^2+1)/2 + C', formula: 'u = x^2+1, du = 2x dx; integral = ln(x^2+1)/2 + C', fn: x => x/(x*x+1), antifn: x => Math.log(x*x+1)/2 },
    ]
  },
  'Inverse Trig': {
    'Basic': [
      { integrand: '1/sqrt(1-x^2)', answer: 'arcsin(x) + C', formula: 'integral of 1/sqrt(1-x^2) dx = arcsin(x) + C', fn: x => 1/Math.sqrt(1-x*x), antifn: x => Math.asin(x), xRange: [-0.95, 0.95] },
      { integrand: '1/(1+x^2)', answer: 'arctan(x) + C', formula: 'integral of 1/(1+x^2) dx = arctan(x) + C', fn: x => 1/(1+x*x), antifn: x => Math.atan(x) },
    ],
    'Intermediate': [
      { integrand: '-1/sqrt(1-x^2)', answer: 'arccos(x) + C', formula: 'integral of -1/sqrt(1-x^2) dx = arccos(x) + C', fn: x => -1/Math.sqrt(1-x*x), antifn: x => Math.acos(x), xRange: [-0.95, 0.95] },
      { integrand: '2/(1+x^2)', answer: '2arctan(x) + C', formula: 'integral of 2/(1+x^2) dx = 2arctan(x) + C', fn: x => 2/(1+x*x), antifn: x => 2*Math.atan(x) },
    ],
    'Advanced': [
      { integrand: '1/sqrt(1-4x^2)', answer: 'arcsin(2x)/2 + C', formula: 'u = 2x; integral = arcsin(2x)/2 + C', fn: x => 1/Math.sqrt(1-4*x*x), antifn: x => Math.asin(2*x)/2, xRange: [-0.45, 0.45] },
      { integrand: '1/(1+4x^2)', answer: 'arctan(2x)/2 + C', formula: 'a = 2; integral = arctan(2x)/2 + C', fn: x => 1/(1+4*x*x), antifn: x => Math.atan(2*x)/2 },
      { integrand: '1/(x*sqrt(x^2-1))', answer: 'arcsec|x| + C', formula: 'integral of 1/(x*sqrt(x^2-1)) dx = arcsec|x| + C', fn: x => 1/(x*Math.sqrt(x*x-1)), antifn: x => Math.acos(1/x), xRange: [1.1, 3] },
    ]
  },
  'Mixed': {
    'Basic': [
      { integrand: 'e^x + sin(x)', answer: 'e^x - cos(x) + C', formula: 'Split into: e^x + sin(x)', fn: x => Math.exp(x) + Math.sin(x), antifn: x => Math.exp(x) - Math.cos(x) },
      { integrand: 'cos(x) + 1/x', answer: 'sin(x) + ln|x| + C', formula: 'Split into: cos(x) + 1/x', fn: x => Math.cos(x) + 1/x, antifn: x => Math.sin(x) + Math.log(Math.abs(x)) },
    ],
    'Intermediate': [
      { integrand: 'e^x - cos(x)', answer: 'e^x - sin(x) + C', formula: 'Split into: e^x - cos(x)', fn: x => Math.exp(x) - Math.cos(x), antifn: x => Math.exp(x) - Math.sin(x) },
      { integrand: '2e^x + 3sin(x)', answer: '2e^x - 3cos(x) + C', formula: 'Split into: 2e^x + 3sin(x)', fn: x => 2*Math.exp(x) + 3*Math.sin(x), antifn: x => 2*Math.exp(x) - 3*Math.cos(x) },
      { integrand: '1/x + 1/(1+x^2)', answer: 'ln|x| + arctan(x) + C', formula: 'Split into: 1/x + 1/(1+x^2)', fn: x => 1/x + 1/(1+x*x), antifn: x => Math.log(Math.abs(x)) + Math.atan(x) },
    ],
    'Advanced': [
      { integrand: 'e^x + sec^2(x)', answer: 'e^x + tan(x) + C', formula: 'Split into: e^x + sec^2(x)', fn: x => Math.exp(x) + 1/Math.pow(Math.cos(x), 2), antifn: x => Math.exp(x) + Math.tan(x) },
      { integrand: '3^x - sin(x)', answer: '3^x/ln(3) + cos(x) + C', formula: 'Split into: 3^x - sin(x)', fn: x => Math.pow(3, x) - Math.sin(x), antifn: x => Math.pow(3, x)/Math.log(3) + Math.cos(x) },
      { integrand: 'e^x/sqrt(1-e^(2x))', answer: 'arcsin(e^x) + C', formula: 'u = e^x, du = e^x dx; integral = arcsin(e^x) + C', fn: x => Math.exp(x)/Math.sqrt(1-Math.exp(2*x)), antifn: x => Math.asin(Math.exp(x)), xRange: [-3, -0.1] },
    ]
  }
};

// State variables
let currentProblem = null;
let showHint = false;
let showSolution = false;
let answered = false;
let isCorrect = false;
let selectedAnswer = -1;
let answerOptions = [];

// Progress tracking
let score = { correct: 0, attempted: 0 };
let categoryStats = {};
for (let cat of CATEGORIES) {
  categoryStats[cat] = { correct: 0, attempted: 0 };
}

// UI positions
let chartTop = 55;
let graphHeight = 180;
let problemY = 250;

// Buttons
let newProblemBtnX, newProblemBtnY, newProblemBtnW, newProblemBtnH;
let hintBtnX, hintBtnY, hintBtnW, hintBtnH;
let solutionBtnX, solutionBtnY, solutionBtnW, solutionBtnH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);
  generateNewProblem();

  describe('Interactive practice for transcendental integrals with multiple choice answers, hints, step-by-step solutions, and progress tracking.', LABEL);
}

function draw() {
  updateCanvasSize();

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

  // Draw the problem
  drawProblem();

  // Draw answer options
  drawAnswerOptions();

  // Draw hint/solution if shown
  if (showHint || showSolution) {
    drawHintSolution();
  }

  // Draw graph
  drawGraph();

  // Draw progress
  drawProgress();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Transcendental Integral Practice', canvasWidth / 2, 8);

  textSize(14);
  fill(100);
  let subtitle = 'Category: ' + CATEGORIES[currentCategory] + ' | Difficulty: ' + DIFFICULTIES[currentDifficulty];
  text(subtitle, canvasWidth / 2, 32);
}

function drawProblem() {
  if (!currentProblem) return;

  // Problem box
  let boxX = 20;
  let boxY = chartTop + 10;
  let boxW = canvasWidth / 2 - 40;
  let boxH = 80;

  fill(255);
  stroke(PURPLE_THEME);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  // Problem label
  fill(PURPLE_THEME);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Find the integral:', boxX + boxW/2, boxY + 10);

  // Integral symbol and expression
  textSize(24);
  fill('black');
  let integralSymbol = '\u222B';
  let problemText = integralSymbol + ' ' + currentProblem.integrand + ' dx';
  text(problemText, boxX + boxW/2, boxY + 38);
}

function drawAnswerOptions() {
  if (!currentProblem || answerOptions.length === 0) return;

  let startY = chartTop + 100;
  let optionH = 40;
  let optionW = canvasWidth / 2 - 60;
  let optionX = 30;

  textSize(14);
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  text('Select your answer:', optionX, startY - 5);

  for (let i = 0; i < answerOptions.length; i++) {
    let y = startY + 10 + i * (optionH + 8);

    // Determine button state
    let isSelected = (selectedAnswer === i);
    let showResult = answered && isSelected;

    if (showResult && isCorrect) {
      fill(CORRECT_COLOR[0], CORRECT_COLOR[1], CORRECT_COLOR[2], 50);
      stroke(CORRECT_COLOR);
    } else if (showResult && !isCorrect) {
      fill(INCORRECT_COLOR[0], INCORRECT_COLOR[1], INCORRECT_COLOR[2], 50);
      stroke(INCORRECT_COLOR);
    } else if (isSelected) {
      fill(PURPLE_THEME[0], PURPLE_THEME[1], PURPLE_THEME[2], 30);
      stroke(PURPLE_THEME);
    } else {
      fill(255);
      stroke(180);
    }
    strokeWeight(isSelected ? 2 : 1);
    rect(optionX, y, optionW, optionH, 5);

    // Option letter
    fill(isSelected ? PURPLE_THEME : [100, 100, 100]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    let letters = ['A', 'B', 'C', 'D'];
    text(letters[i], optionX + 20, y + optionH/2);

    // Option text
    textStyle(NORMAL);
    textAlign(LEFT, CENTER);
    textSize(16);
    fill('black');
    text(answerOptions[i], optionX + 45, y + optionH/2);

    // Show checkmark or X for answered
    if (answered) {
      if (answerOptions[i] === currentProblem.answer) {
        fill(CORRECT_COLOR);
        textSize(20);
        text('\u2713', optionX + optionW - 30, y + optionH/2);
      } else if (isSelected && !isCorrect) {
        fill(INCORRECT_COLOR);
        textSize(20);
        text('\u2717', optionX + optionW - 30, y + optionH/2);
      }
    }
  }
}

function drawHintSolution() {
  let boxX = 20;
  let boxY = chartTop + 305;
  let boxW = canvasWidth / 2 - 40;
  let boxH = showSolution ? 80 : 50;

  fill(255, 248, 220);
  stroke(HINT_COLOR);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  fill(HINT_COLOR[0], HINT_COLOR[1], HINT_COLOR[2]);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text(showSolution ? 'Solution:' : 'Hint:', boxX + 10, boxY + 8);

  textStyle(NORMAL);
  textSize(14);
  fill('black');

  if (showSolution) {
    // Show full solution
    text('Formula: ' + currentProblem.formula, boxX + 10, boxY + 28);
    fill(CORRECT_COLOR);
    textSize(16);
    text('Answer: ' + currentProblem.answer, boxX + 10, boxY + 52);
  } else if (showHint) {
    // Just show which formula category applies
    let hint = getHintForProblem();
    text(hint, boxX + 10, boxY + 28);
  }
}

function getHintForProblem() {
  let integrand = currentProblem.integrand.toLowerCase();

  if (integrand.includes('sin') || integrand.includes('cos') || integrand.includes('sec') || integrand.includes('csc') || integrand.includes('tan') || integrand.includes('cot')) {
    if (integrand.includes('sqrt(1-') || integrand.includes('1/(1+x^2)') || integrand.includes('sqrt(x^2-1)')) {
      return 'Use inverse trig formula: arcsin, arctan, or arcsec';
    }
    return 'Use basic trig integral formulas';
  }
  if (integrand.includes('e^') || integrand.includes('^x')) {
    return 'Use exponential integral formula: integral of e^x = e^x, or a^x = a^x/ln(a)';
  }
  if (integrand.includes('1/x') || integrand.includes('/x')) {
    return 'Use logarithmic formula: integral of 1/x = ln|x|';
  }
  if (integrand.includes('sqrt(1-')) {
    return 'Use inverse trig formula: arcsin or arccos';
  }
  if (integrand.includes('1+x^2')) {
    return 'Use inverse trig formula: arctan';
  }
  return 'Split the integral if multiple terms, then apply appropriate formulas';
}

function drawGraph() {
  if (!currentProblem) return;

  let graphX = canvasWidth / 2 + 20;
  let graphY = chartTop + 10;
  let graphW = canvasWidth / 2 - 50;
  let graphH = graphHeight + 30;

  // Graph background
  fill(255);
  stroke('#ccc');
  strokeWeight(1);
  rect(graphX, graphY, graphW, graphH, 5);

  // Title
  fill(80);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Graph: f(x) = ' + currentProblem.integrand, graphX + graphW/2, graphY + 5);

  if (answered || showSolution) {
    textSize(10);
    fill(GRAPH_COLOR);
    text('Blue: f(x) integrand', graphX + graphW/3, graphY + graphH - 15);
    fill(CORRECT_COLOR);
    text('Green: F(x) antiderivative', graphX + 2*graphW/3, graphY + graphH - 15);
  } else {
    textSize(10);
    fill(GRAPH_COLOR);
    text('Blue: f(x) integrand', graphX + graphW/2, graphY + graphH - 15);
  }

  // Axes
  let axisX = graphX + graphW / 2;
  let axisY = graphY + graphH / 2;
  let plotW = graphW - 40;
  let plotH = graphH - 60;

  stroke('#ccc');
  strokeWeight(1);
  // x-axis
  line(graphX + 20, axisY, graphX + graphW - 20, axisY);
  // y-axis
  line(axisX, graphY + 25, axisX, graphY + graphH - 30);

  // Axis labels
  fill('#999');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text('x', graphX + graphW - 25, axisY + 3);
  textAlign(RIGHT, CENTER);
  text('y', axisX - 5, graphY + 30);

  // Get x range
  let xMin = -3;
  let xMax = 3;
  if (currentProblem.xRange) {
    xMin = currentProblem.xRange[0];
    xMax = currentProblem.xRange[1];
  }

  let scaleX = plotW / (xMax - xMin);
  let scaleY = plotH / 6;  // y range roughly -3 to 3

  // Draw integrand
  stroke(GRAPH_COLOR);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = graphX + 20; px <= graphX + graphW - 20; px += 2) {
    let x = (px - axisX) / scaleX;
    if (x >= xMin && x <= xMax) {
      try {
        let y = currentProblem.fn(x);
        if (isFinite(y) && !isNaN(y) && Math.abs(y) < 10) {
          let py = axisY - y * scaleY;
          if (py > graphY + 25 && py < graphY + graphH - 30) {
            vertex(px, py);
          }
        }
      } catch (e) {
        // Skip undefined points
      }
    }
  }
  endShape();

  // Draw antiderivative if answered or solution shown
  if (answered || showSolution) {
    stroke(CORRECT_COLOR);
    strokeWeight(2);
    beginShape();
    for (let px = graphX + 20; px <= graphX + graphW - 20; px += 2) {
      let x = (px - axisX) / scaleX;
      if (x >= xMin && x <= xMax) {
        try {
          let y = currentProblem.antifn(x);
          if (isFinite(y) && !isNaN(y) && Math.abs(y) < 10) {
            let py = axisY - y * scaleY;
            if (py > graphY + 25 && py < graphY + graphH - 30) {
              vertex(px, py);
            }
          }
        } catch (e) {
          // Skip undefined points
        }
      }
    }
    endShape();
  }
}

function drawProgress() {
  let boxX = canvasWidth / 2 + 20;
  let boxY = chartTop + graphHeight + 55;
  let boxW = canvasWidth / 2 - 50;
  let boxH = 130;

  fill(255);
  stroke('#ccc');
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 8);

  // Title
  fill(PURPLE_THEME);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  textStyle(BOLD);
  text('Progress', boxX + boxW/2, boxY + 8);
  textStyle(NORMAL);

  // Overall score
  textSize(20);
  fill('black');
  let percentage = score.attempted > 0 ? Math.round(score.correct / score.attempted * 100) : 0;
  text(score.correct + ' / ' + score.attempted + ' (' + percentage + '%)', boxX + boxW/2, boxY + 30);

  // Category breakdown
  textSize(11);
  textAlign(LEFT, TOP);
  let catY = boxY + 58;
  let catX = boxX + 15;

  fill('#666');
  text('By Category:', catX, catY);
  catY += 16;

  for (let i = 0; i < CATEGORIES.length; i++) {
    let cat = CATEGORIES[i];
    let stats = categoryStats[cat];
    let catPct = stats.attempted > 0 ? Math.round(stats.correct / stats.attempted * 100) : 0;

    // Highlight current category
    if (i === currentCategory) {
      fill(PURPLE_THEME);
    } else {
      fill('#333');
    }

    let statText = cat + ': ' + stats.correct + '/' + stats.attempted;
    if (i < 3) {
      text(statText, catX, catY + (i * 14));
    } else {
      text(statText, catX + boxW/2 - 10, catY + ((i-3) * 14));
    }
  }
}

function drawControls() {
  // Category dropdown
  let catX = 20;
  let catY = drawHeight + 15;
  let catW = 130;
  let catH = 30;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Category:', catX, catY - 8);

  // Category selector
  for (let i = 0; i < CATEGORIES.length; i++) {
    let btnW = (canvasWidth - 40) / CATEGORIES.length - 5;
    let btnX = catX + i * (btnW + 5);
    let isSelected = (i === currentCategory);

    fill(isSelected ? PURPLE_THEME : '#e0e0e0');
    stroke(isSelected ? PURPLE_THEME : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(btnX, catY, btnW, 25, 4);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(CATEGORIES[i], btnX + btnW/2, catY + 12);
  }

  // Difficulty buttons
  let diffY = drawHeight + 50;
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Difficulty:', catX, diffY + 12);

  let diffBtnW = 90;
  for (let i = 0; i < DIFFICULTIES.length; i++) {
    let btnX = 90 + i * (diffBtnW + 10);
    let isSelected = (i === currentDifficulty);

    let diffColors = [[76, 175, 80], [255, 152, 0], [244, 67, 54]];
    fill(isSelected ? diffColors[i] : '#e0e0e0');
    stroke(isSelected ? diffColors[i] : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(btnX, diffY, diffBtnW, 25, 4);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(DIFFICULTIES[i], btnX + diffBtnW/2, diffY + 12);
  }

  // Action buttons row
  let btnY = drawHeight + 50;
  let btnH = 35;
  let btnW = 110;

  // New Problem button
  newProblemBtnX = canvasWidth - 3 * (btnW + 10) - 10;
  newProblemBtnY = btnY - 8;
  newProblemBtnW = btnW;
  newProblemBtnH = btnH;

  fill('#4CAF50');
  stroke('#388E3C');
  strokeWeight(1);
  rect(newProblemBtnX, newProblemBtnY, newProblemBtnW, newProblemBtnH, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('New Problem', newProblemBtnX + newProblemBtnW/2, newProblemBtnY + newProblemBtnH/2);

  // Hint button
  hintBtnX = newProblemBtnX + btnW + 10;
  hintBtnY = btnY - 8;
  hintBtnW = btnW;
  hintBtnH = btnH;

  fill(showHint ? '#FFA000' : '#FF9800');
  stroke('#F57C00');
  strokeWeight(1);
  rect(hintBtnX, hintBtnY, hintBtnW, hintBtnH, 5);

  fill('white');
  noStroke();
  text(showHint ? 'Hide Hint' : 'Show Hint', hintBtnX + hintBtnW/2, hintBtnY + hintBtnH/2);

  // Solution button
  solutionBtnX = hintBtnX + btnW + 10;
  solutionBtnY = btnY - 8;
  solutionBtnW = btnW;
  solutionBtnH = btnH;

  fill(showSolution ? '#1565C0' : '#2196F3');
  stroke('#0D47A1');
  strokeWeight(1);
  rect(solutionBtnX, solutionBtnY, solutionBtnW, solutionBtnH, 5);

  fill('white');
  noStroke();
  text(showSolution ? 'Hide Solution' : 'Show Solution', solutionBtnX + solutionBtnW/2, solutionBtnY + solutionBtnH/2);
}

function generateNewProblem() {
  let category = CATEGORIES[currentCategory];
  let difficulty = DIFFICULTIES[currentDifficulty];
  let problemList = problems[category][difficulty];

  // Pick a random problem
  let idx = Math.floor(Math.random() * problemList.length);
  currentProblem = problemList[idx];

  // Generate answer options (correct + 3 distractors)
  generateAnswerOptions();

  // Reset state
  showHint = false;
  showSolution = false;
  answered = false;
  isCorrect = false;
  selectedAnswer = -1;
}

function generateAnswerOptions() {
  answerOptions = [currentProblem.answer];

  // Generate distractors based on common mistakes
  let distractors = generateDistractors(currentProblem);

  // Add unique distractors
  for (let d of distractors) {
    if (!answerOptions.includes(d) && answerOptions.length < 4) {
      answerOptions.push(d);
    }
  }

  // Fill remaining with generic distractors if needed
  let genericDistractors = [
    'x + C',
    '2x + C',
    'x^2 + C',
    'ln(x) + C',
    'e^x + C',
    '-sin(x) + C',
    'cos(x) + C',
    'tan(x) + C'
  ];

  for (let g of genericDistractors) {
    if (!answerOptions.includes(g) && answerOptions.length < 4) {
      answerOptions.push(g);
    }
  }

  // Shuffle
  answerOptions = shuffleArray(answerOptions);
}

function generateDistractors(prob) {
  let distractors = [];
  let integrand = prob.integrand;

  // Common mistakes based on integrand type
  if (integrand.includes('sin')) {
    distractors.push('cos(x) + C');  // Forgot negative
    distractors.push('-sin(x) + C');  // Confused with derivative
  }
  if (integrand.includes('cos')) {
    distractors.push('-sin(x) + C');  // Added wrong sign
    distractors.push('cos(x) + C');   // No change
  }
  if (integrand.includes('e^x') && !integrand.includes('e^(')) {
    distractors.push('xe^x + C');     // Wrong formula
    distractors.push('e^x/x + C');    // Confused
  }
  if (integrand.includes('e^(2x)')) {
    distractors.push('e^(2x) + C');   // Forgot chain rule coefficient
    distractors.push('2e^(2x) + C');  // Wrong coefficient
  }
  if (integrand.includes('1/x')) {
    distractors.push('x^0 + C');      // Power rule mistake
    distractors.push('-1/x^2 + C');   // Confused with derivative
  }
  if (integrand.includes('sec^2')) {
    distractors.push('sec(x) + C');   // Wrong trig
    distractors.push('2sec(x)tan(x) + C');  // Derivative
  }
  if (integrand.includes('sqrt(1-x^2)')) {
    distractors.push('arccos(x) + C');
    distractors.push('sqrt(1-x^2) + C');
  }
  if (integrand.includes('1/(1+x^2)')) {
    distractors.push('ln(1+x^2) + C');
    distractors.push('arcsin(x) + C');
  }

  return distractors;
}

function shuffleArray(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function checkAnswer(optionIndex) {
  if (answered) return;

  selectedAnswer = optionIndex;
  answered = true;

  isCorrect = (answerOptions[optionIndex] === currentProblem.answer);

  // Update stats
  score.attempted++;
  categoryStats[CATEGORIES[currentCategory]].attempted++;

  if (isCorrect) {
    score.correct++;
    categoryStats[CATEGORIES[currentCategory]].correct++;
  }
}

function mousePressed() {
  // Check category buttons
  let catY = drawHeight + 15;
  let catX = 20;

  for (let i = 0; i < CATEGORIES.length; i++) {
    let btnW = (canvasWidth - 40) / CATEGORIES.length - 5;
    let btnX = catX + i * (btnW + 5);

    if (mouseX >= btnX && mouseX <= btnX + btnW &&
        mouseY >= catY && mouseY <= catY + 25) {
      currentCategory = i;
      generateNewProblem();
      return;
    }
  }

  // Check difficulty buttons
  let diffY = drawHeight + 50;
  let diffBtnW = 90;

  for (let i = 0; i < DIFFICULTIES.length; i++) {
    let btnX = 90 + i * (diffBtnW + 10);

    if (mouseX >= btnX && mouseX <= btnX + diffBtnW &&
        mouseY >= diffY && mouseY <= diffY + 25) {
      currentDifficulty = i;
      generateNewProblem();
      return;
    }
  }

  // Check answer options
  if (!answered) {
    let startY = chartTop + 100 + 10;
    let optionH = 40;
    let optionW = canvasWidth / 2 - 60;
    let optionX = 30;

    for (let i = 0; i < answerOptions.length; i++) {
      let y = startY + i * (optionH + 8);

      if (mouseX >= optionX && mouseX <= optionX + optionW &&
          mouseY >= y && mouseY <= y + optionH) {
        checkAnswer(i);
        return;
      }
    }
  }

  // Check New Problem button
  if (mouseX >= newProblemBtnX && mouseX <= newProblemBtnX + newProblemBtnW &&
      mouseY >= newProblemBtnY && mouseY <= newProblemBtnY + newProblemBtnH) {
    generateNewProblem();
    return;
  }

  // Check Hint button
  if (mouseX >= hintBtnX && mouseX <= hintBtnX + hintBtnW &&
      mouseY >= hintBtnY && mouseY <= hintBtnY + hintBtnH) {
    showHint = !showHint;
    if (showHint) showSolution = false;
    return;
  }

  // Check Solution button
  if (mouseX >= solutionBtnX && mouseX <= solutionBtnX + solutionBtnW &&
      mouseY >= solutionBtnY && mouseY <= solutionBtnY + solutionBtnH) {
    showSolution = !showSolution;
    if (showSolution) showHint = false;
    return;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = max(canvasWidth, 700);
}
