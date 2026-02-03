// Function Composition Visualizer MicroSim
// Learning Objective: Students will explain how composite functions work
// by tracing values through two function "machines" in sequence.
// Bloom Level: Understand (L2)

let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Functions available
let functionOptions = [
  { name: 'x²', calc: x => x * x, label: 'x²' },
  { name: 'x+2', calc: x => x + 2, label: 'x+2' },
  { name: '2x', calc: x => 2 * x, label: '2x' },
  { name: '√x', calc: x => x >= 0 ? Math.sqrt(x) : NaN, label: '√x' },
  { name: '|x|', calc: x => Math.abs(x), label: '|x|' }
];

let gIndex = 0; // Inner function g
let fIndex = 1; // Outer function f
let inputValue = 3;

// Animation
let animPhase = 0; // 0: idle, 1-4: animation stages
let animProgress = 0;
let animSpeed = 0.025;

// Computed values
let gOutput = 0;
let fOutput = 0;

// UI elements
let sliderX, sliderY, sliderW;
let sliderHandleX;
let isDraggingSlider = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  computeOutputs();
  updateSliderPosition();

  describe('Function Composition Visualizer: Watch values flow through two functions in sequence to understand f(g(x)).', LABEL);
}

function computeOutputs() {
  gOutput = functionOptions[gIndex].calc(inputValue);
  fOutput = functionOptions[fIndex].calc(gOutput);
}

function updateSliderPosition() {
  sliderX = 120;
  sliderY = drawHeight + 20;
  sliderW = 150;
  sliderHandleX = map(inputValue, -5, 5, sliderX, sliderX + sliderW);
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
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Function Composition: (f ∘ g)(x) = f(g(x))', canvasWidth / 2, 8);

  // Draw the two machines
  drawMachines();

  // Draw animation
  drawAnimation();

  // Draw formula
  drawFormula();

  // Draw controls
  drawControls();

  // Update animation
  if (animPhase > 0 && animPhase < 5) {
    animProgress += animSpeed;
    if (animProgress >= 1) {
      animProgress = 0;
      animPhase++;
    }
  }
}

function drawMachines() {
  let machine1X = canvasWidth * 0.3;
  let machine2X = canvasWidth * 0.7;
  let machineY = 200;
  let machineW = 120;
  let machineH = 80;

  // Machine 1: g(x) - Inner function
  fill(150, 200, 150);
  stroke(100, 150, 100);
  strokeWeight(3);
  rect(machine1X - machineW/2, machineY - machineH/2, machineW, machineH, 10);

  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text('g(x) = ' + functionOptions[gIndex].label, machine1X, machineY - 10);
  textSize(14);
  text('(inner)', machine1X, machineY + 20);

  // Machine 2: f(x) - Outer function
  fill(150, 150, 200);
  stroke(100, 100, 150);
  strokeWeight(3);
  rect(machine2X - machineW/2, machineY - machineH/2, machineW, machineH, 10);

  fill('black');
  noStroke();
  textSize(18);
  text('f(x) = ' + functionOptions[fIndex].label, machine2X, machineY - 10);
  textSize(14);
  text('(outer)', machine2X, machineY + 20);

  // Arrow between machines
  stroke(100);
  strokeWeight(2);
  let arrowStart = machine1X + machineW/2 + 10;
  let arrowEnd = machine2X - machineW/2 - 10;
  line(arrowStart, machineY, arrowEnd, machineY);
  triangle(arrowEnd, machineY, arrowEnd - 10, machineY - 6, arrowEnd - 10, machineY + 6);

  // Labels
  fill('black');
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('INPUT', machine1X - machineW/2 - 50, machineY + 50);
  text('INTERMEDIATE', (machine1X + machine2X) / 2, machineY + 50);
  text('OUTPUT', machine2X + machineW/2 + 50, machineY + 50);
}

function drawAnimation() {
  let machine1X = canvasWidth * 0.3;
  let machine2X = canvasWidth * 0.7;
  let machineY = 200;
  let machineW = 120;

  let inputX = machine1X - machineW/2 - 50;
  let midX = (machine1X + machine2X) / 2;
  let outputX = machine2X + machineW/2 + 50;

  textSize(20);
  textAlign(CENTER, CENTER);

  // Always show input
  fill(50, 150, 50);
  noStroke();
  circle(inputX, machineY, 40);
  fill('white');
  text(inputValue, inputX, machineY);

  if (animPhase === 0) {
    // Idle - show all values in place
    // Intermediate
    if (!isNaN(gOutput)) {
      fill(100, 150, 100);
      noStroke();
      circle(midX, machineY, 40);
      fill('white');
      text(formatNum(gOutput), midX, machineY);
    }
    // Output
    if (!isNaN(fOutput)) {
      fill(100, 100, 150);
      noStroke();
      circle(outputX, machineY, 40);
      fill('white');
      text(formatNum(fOutput), outputX, machineY);
    }
  } else if (animPhase === 1) {
    // Input moving to first machine
    let x = lerp(inputX, machine1X - machineW/2, animProgress);
    fill(50, 150, 50);
    noStroke();
    circle(x, machineY, 40);
    fill('white');
    text(inputValue, x, machineY);
  } else if (animPhase === 2) {
    // Processing in g - show calculation
    let calcY = machineY + 80;
    fill(255, 255, 200);
    stroke(200, 200, 100);
    strokeWeight(2);
    rectMode(CENTER);
    rect(machine1X, calcY, 140, 30, 5);
    rectMode(CORNER);

    fill('black');
    noStroke();
    textSize(14);
    text('g(' + inputValue + ') = ' + formatNum(gOutput), machine1X, calcY);

    // Show result appearing
    if (animProgress > 0.5 && !isNaN(gOutput)) {
      let alpha = map(animProgress, 0.5, 1, 0, 255);
      fill(100, 150, 100, alpha);
      noStroke();
      circle(machine1X + machineW/2 + 30, machineY, 40);
      fill(255, 255, 255, alpha);
      textSize(20);
      text(formatNum(gOutput), machine1X + machineW/2 + 30, machineY);
    }
  } else if (animPhase === 3) {
    // Intermediate moving to second machine
    let startX = machine1X + machineW/2 + 30;
    let endX = machine2X - machineW/2 - 30;
    let x = lerp(startX, endX, animProgress);

    if (!isNaN(gOutput)) {
      fill(100, 150, 100);
      noStroke();
      circle(x, machineY, 40);
      fill('white');
      textSize(20);
      text(formatNum(gOutput), x, machineY);
    }
  } else if (animPhase === 4) {
    // Processing in f - show calculation
    // Show intermediate at mid
    if (!isNaN(gOutput)) {
      fill(100, 150, 100);
      noStroke();
      circle(midX, machineY, 40);
      fill('white');
      textSize(20);
      text(formatNum(gOutput), midX, machineY);
    }

    let calcY = machineY + 80;
    fill(255, 255, 200);
    stroke(200, 200, 100);
    strokeWeight(2);
    rectMode(CENTER);
    rect(machine2X, calcY, 160, 30, 5);
    rectMode(CORNER);

    fill('black');
    noStroke();
    textSize(14);
    text('f(' + formatNum(gOutput) + ') = ' + formatNum(fOutput), machine2X, calcY);

    // Show final result appearing
    if (animProgress > 0.5 && !isNaN(fOutput)) {
      let alpha = map(animProgress, 0.5, 1, 0, 255);
      fill(100, 100, 150, alpha);
      noStroke();
      circle(outputX, machineY, 40);
      fill(255, 255, 255, alpha);
      textSize(20);
      text(formatNum(fOutput), outputX, machineY);
    }
  } else if (animPhase >= 5) {
    // Complete - show all
    if (!isNaN(gOutput)) {
      fill(100, 150, 100);
      noStroke();
      circle(midX, machineY, 40);
      fill('white');
      textSize(20);
      text(formatNum(gOutput), midX, machineY);
    }
    if (!isNaN(fOutput)) {
      fill(100, 100, 150);
      noStroke();
      circle(outputX, machineY, 40);
      fill('white');
      text(formatNum(fOutput), outputX, machineY);
    }
  }
}

function drawFormula() {
  let boxY = 320;
  let boxH = 50;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(margin, boxY, canvasWidth - 2*margin, boxH, 8);

  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);

  let g = functionOptions[gIndex].label;
  let f = functionOptions[fIndex].label;
  let formula = '(f ∘ g)(' + inputValue + ') = f(g(' + inputValue + ')) = f(' + formatNum(gOutput) + ') = ' + formatNum(fOutput);
  text(formula, canvasWidth/2, boxY + boxH/2);
}

function formatNum(n) {
  if (isNaN(n)) return 'undefined';
  if (Number.isInteger(n)) return n.toString();
  return n.toFixed(2);
}

function drawControls() {
  // Row 1: Input slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Input x: ' + inputValue, 10, sliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 4, sliderW, 8, 4);

  // Slider handle
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(sliderHandleX, sliderY, 16);

  // Animate button
  let animBtnX = sliderX + sliderW + 20;
  let animBtnW = 80;
  fill('#4CAF50');
  stroke('#388E3C');
  strokeWeight(1);
  rect(animBtnX, sliderY - 14, animBtnW, 28, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  text('Animate', animBtnX + animBtnW/2, sliderY);

  // Row 2: Function selectors
  let row2Y = drawHeight + 55;
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('g(x):', 10, row2Y);

  // g selector buttons
  let gBtnX = 50;
  let btnW = 50;
  let btnH = 24;
  for (let i = 0; i < functionOptions.length; i++) {
    let x = gBtnX + i * (btnW + 5);
    let isSelected = (i === gIndex);
    fill(isSelected ? '#4CAF50' : '#ddd');
    stroke(isSelected ? '#388E3C' : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(x, row2Y - btnH/2, btnW, btnH, 4);
    fill(isSelected ? 'white' : 'black');
    noStroke();
    textSize(12);
    text(functionOptions[i].label, x + btnW/2, row2Y);
  }

  // f selector
  let fLabelX = gBtnX + functionOptions.length * (btnW + 5) + 30;
  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('f(x):', fLabelX, row2Y);

  let fBtnX = fLabelX + 40;
  for (let i = 0; i < functionOptions.length; i++) {
    let x = fBtnX + i * (btnW + 5);
    let isSelected = (i === fIndex);
    fill(isSelected ? '#2196F3' : '#ddd');
    stroke(isSelected ? '#1976D2' : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(x, row2Y - btnH/2, btnW, btnH, 4);
    fill(isSelected ? 'white' : 'black');
    noStroke();
    textSize(12);
    text(functionOptions[i].label, x + btnW/2, row2Y);
  }

  // Swap button
  let swapX = canvasWidth - 70;
  fill('#FF9800');
  stroke('#F57C00');
  strokeWeight(1);
  rect(swapX, row2Y - btnH/2, 60, btnH, 4);
  fill('white');
  noStroke();
  textSize(12);
  text('Swap', swapX + 30, row2Y);
}

function mousePressed() {
  // Check slider
  if (abs(mouseY - sliderY) < 15 && mouseX >= sliderX && mouseX <= sliderX + sliderW) {
    isDraggingSlider = true;
    updateSliderFromMouse();
  }

  // Check animate button
  let animBtnX = sliderX + sliderW + 20;
  if (mouseX >= animBtnX && mouseX <= animBtnX + 80 &&
      mouseY >= sliderY - 14 && mouseY <= sliderY + 14) {
    animPhase = 1;
    animProgress = 0;
  }

  // Check g selector buttons
  let row2Y = drawHeight + 55;
  let gBtnX = 50;
  let btnW = 50;
  let btnH = 24;
  for (let i = 0; i < functionOptions.length; i++) {
    let x = gBtnX + i * (btnW + 5);
    if (mouseX >= x && mouseX <= x + btnW &&
        mouseY >= row2Y - btnH/2 && mouseY <= row2Y + btnH/2) {
      gIndex = i;
      computeOutputs();
      animPhase = 0;
    }
  }

  // Check f selector buttons
  let fLabelX = gBtnX + functionOptions.length * (btnW + 5) + 30;
  let fBtnX = fLabelX + 40;
  for (let i = 0; i < functionOptions.length; i++) {
    let x = fBtnX + i * (btnW + 5);
    if (mouseX >= x && mouseX <= x + btnW &&
        mouseY >= row2Y - btnH/2 && mouseY <= row2Y + btnH/2) {
      fIndex = i;
      computeOutputs();
      animPhase = 0;
    }
  }

  // Check swap button
  let swapX = canvasWidth - 70;
  if (mouseX >= swapX && mouseX <= swapX + 60 &&
      mouseY >= row2Y - btnH/2 && mouseY <= row2Y + btnH/2) {
    let temp = gIndex;
    gIndex = fIndex;
    fIndex = temp;
    computeOutputs();
    animPhase = 0;
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    updateSliderFromMouse();
  }
}

function mouseReleased() {
  isDraggingSlider = false;
}

function updateSliderFromMouse() {
  sliderHandleX = constrain(mouseX, sliderX, sliderX + sliderW);
  inputValue = Math.round(map(sliderHandleX, sliderX, sliderX + sliderW, -5, 5));
  computeOutputs();
  animPhase = 0;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  updateSliderPosition();
}
