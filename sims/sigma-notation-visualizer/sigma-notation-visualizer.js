// Sigma Notation Visualizer MicroSim
// Helps students understand sigma notation by expanding sums and calculating totals
// Step-through approach for Bloom Level 2: Understand

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Sigma notation parameters
let upperLimit = 5;
let lowerLimit = 1;
let formulaType = 0; // 0=i, 1=i^2, 2=2i, 3=2^i, 4=constant(3)
let formulaNames = ['i', 'i²', '2i', '2^i', '3'];
let formulaFunctions = [
  (i) => i,
  (i) => i * i,
  (i) => 2 * i,
  (i) => Math.pow(2, i),
  (i) => 3
];

// Step-through state
let currentStep = 0;
let terms = [];
let runningTotals = [];

// UI elements
let upperSlider, lowerSlider, formulaSelect;
let nextButton, prevButton, showAllButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create sliders
  upperSlider = createSlider(1, 10, upperLimit, 1);
  upperSlider.position(sliderLeftMargin, drawHeight + 5);
  upperSlider.size(100);
  upperSlider.input(resetVisualization);

  lowerSlider = createSlider(0, 5, lowerLimit, 1);
  lowerSlider.position(sliderLeftMargin + 160, drawHeight + 5);
  lowerSlider.size(80);
  lowerSlider.input(resetVisualization);

  // Create formula dropdown
  formulaSelect = createSelect();
  formulaSelect.position(10, drawHeight + 45);
  for (let i = 0; i < formulaNames.length; i++) {
    formulaSelect.option(formulaNames[i], i);
  }
  formulaSelect.changed(resetVisualization);

  // Create buttons
  prevButton = createButton('◀ Prev');
  prevButton.position(100, drawHeight + 45);
  prevButton.mousePressed(prevStep);

  nextButton = createButton('Next ▶');
  nextButton.position(170, drawHeight + 45);
  nextButton.mousePressed(nextStep);

  showAllButton = createButton('Show All');
  showAllButton.position(250, drawHeight + 45);
  showAllButton.mousePressed(showAll);

  resetVisualization();

  describe('Sigma notation visualizer showing step-by-step sum expansion', LABEL);
}

function resetVisualization() {
  upperLimit = upperSlider.value();
  lowerLimit = lowerSlider.value();
  formulaType = parseInt(formulaSelect.value());

  // Calculate all terms
  terms = [];
  runningTotals = [];
  let total = 0;

  for (let i = lowerLimit; i <= upperLimit; i++) {
    let value = formulaFunctions[formulaType](i);
    terms.push({ i: i, value: value });
    total += value;
    runningTotals.push(total);
  }

  currentStep = 0;
}

function nextStep() {
  if (currentStep < terms.length) {
    currentStep++;
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
  }
}

function showAll() {
  currentStep = terms.length;
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

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text('Sigma Notation Visualizer', canvasWidth / 2, 10);

  // Draw large sigma notation
  textSize(20);
  textAlign(CENTER, CENTER);

  let sigmaX = 80;
  let sigmaY = 100;

  // Draw the sigma symbol
  textSize(60);
  text('Σ', sigmaX, sigmaY);

  // Upper and lower limits
  textSize(16);
  text('n=' + upperLimit, sigmaX, sigmaY - 50);
  text('i=' + lowerLimit, sigmaX, sigmaY + 50);

  // Formula
  textSize(24);
  text(formulaNames[formulaType], sigmaX + 50, sigmaY);

  // Draw expansion
  let expansionY = 180;
  textSize(18);
  textAlign(LEFT, CENTER);

  // Build the expansion string
  let expansionStr = '';
  let shownTerms = Math.min(currentStep, terms.length);

  for (let i = 0; i < shownTerms; i++) {
    if (i > 0) expansionStr += ' + ';
    expansionStr += terms[i].value;
  }

  if (currentStep > 0 && currentStep < terms.length) {
    expansionStr += ' + ...';
  }

  // Draw expansion
  textAlign(CENTER, CENTER);
  text('= ' + (expansionStr || '?'), canvasWidth / 2, expansionY);

  // Draw visual blocks
  let blockY = 240;
  let blockWidth = Math.min(40, (canvasWidth - 100) / Math.max(terms.length, 1));
  let startX = (canvasWidth - terms.length * blockWidth) / 2;

  for (let i = 0; i < terms.length; i++) {
    let x = startX + i * blockWidth;
    let maxHeight = 80;
    let maxValue = Math.max(...terms.map(t => Math.abs(t.value)));
    let blockHeight = maxValue > 0 ? (Math.abs(terms[i].value) / maxValue) * maxHeight : 10;

    if (i < currentStep) {
      fill(100, 150, 255, 200);
      stroke(50, 100, 200);
    } else {
      fill(200, 200, 200, 100);
      stroke(150);
    }
    strokeWeight(1);
    rect(x + 2, blockY + maxHeight - blockHeight, blockWidth - 4, blockHeight, 3);

    // Label
    fill('black');
    noStroke();
    textSize(12);
    text(terms[i].value, x + blockWidth / 2, blockY + maxHeight + 15);
  }

  // Running total
  textSize(20);
  textAlign(CENTER, CENTER);
  fill('black');
  let totalText = currentStep > 0 ? 'Running Total: ' + runningTotals[currentStep - 1] : 'Running Total: 0';
  text(totalText, canvasWidth / 2, 360);

  // Final sum (if complete)
  if (currentStep === terms.length && terms.length > 0) {
    fill(0, 150, 0);
    textSize(22);
    text('Final Sum = ' + runningTotals[terms.length - 1], canvasWidth / 2, 385);
  }

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('n: ' + upperLimit, 10, drawHeight + 15);
  text('Start: ' + lowerLimit, sliderLeftMargin + 110, drawHeight + 15);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  upperSlider.size(100);
  lowerSlider.size(80);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
