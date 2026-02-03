// Function Machine MicroSim
// Demonstrates how a function processes inputs to produce outputs
// Learning Objective: Students will explain how a function processes inputs
// to produce outputs, demonstrating the "one input, one output" rule.
// Bloom Level: Understand (L2)

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Application state
let inputValue = 3;
let outputValue = 6;
let currentFunction = 0;
let functions = [
  { name: 'f(x) = 2x', calc: x => 2 * x },
  { name: 'f(x) = x²', calc: x => x * x },
  { name: 'f(x) = |x|', calc: x => Math.abs(x) },
  { name: 'f(x) = sin(x)', calc: x => Math.sin(x) }
];

// Animation state
let animationPhase = 0; // 0: idle, 1: input moving, 2: processing, 3: output moving, 4: complete
let animationProgress = 0;
let animationSpeed = 0.03;

// History table
let history = [];
let maxHistory = 5;

// Button positions
let processButtonX, processButtonY, processButtonW, processButtonH;
let clearButtonX, clearButtonY, clearButtonW, clearButtonH;
let funcButtonsY, funcButtonH;

// Slider
let sliderX, sliderY, sliderW, sliderH;
let sliderHandleX;
let isDraggingSlider = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Initialize button positions
  updateButtonPositions();

  // Calculate initial output
  outputValue = functions[currentFunction].calc(inputValue);

  describe('Function Machine MicroSim: Enter an input value, select a function, and process to see the output. Demonstrates that each input produces exactly one output.', LABEL);
}

function updateButtonPositions() {
  // Row 1: Slider
  sliderX = sliderLeftMargin;
  sliderY = drawHeight + 15;
  sliderW = canvasWidth - sliderLeftMargin - margin - 150;
  sliderH = 20;
  sliderHandleX = map(inputValue, -10, 10, sliderX, sliderX + sliderW);

  // Row 2: Buttons
  processButtonX = 10;
  processButtonY = drawHeight + 45;
  processButtonW = 80;
  processButtonH = 28;

  clearButtonX = 100;
  clearButtonY = drawHeight + 45;
  clearButtonW = 60;
  clearButtonH = 28;

  // Function selector buttons
  funcButtonsY = drawHeight + 45;
  funcButtonH = 28;
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
  textSize(24);
  text('Function Machine', canvasWidth / 2, 10);

  // Draw the machine
  drawMachine();

  // Draw animation
  drawAnimation();

  // Draw history table
  drawHistory();

  // Draw controls
  drawControls();

  // Update animation
  if (animationPhase > 0 && animationPhase < 4) {
    animationProgress += animationSpeed;
    if (animationProgress >= 1) {
      animationProgress = 0;
      animationPhase++;
      if (animationPhase === 4) {
        // Animation complete - add to history
        addToHistory();
      }
    }
  }
}

function drawMachine() {
  let machineX = canvasWidth / 2;
  let machineY = 180;
  let machineW = 200;
  let machineH = 120;

  // Machine body
  fill(100, 150, 200);
  stroke(50, 100, 150);
  strokeWeight(3);
  rect(machineX - machineW/2, machineY - machineH/2, machineW, machineH, 15);

  // Input hopper (left)
  fill(150, 200, 150);
  stroke(100, 150, 100);
  beginShape();
  vertex(machineX - machineW/2 - 60, machineY - 40);
  vertex(machineX - machineW/2 - 20, machineY - 40);
  vertex(machineX - machineW/2, machineY - 10);
  vertex(machineX - machineW/2, machineY + 10);
  vertex(machineX - machineW/2 - 20, machineY + 20);
  vertex(machineX - machineW/2 - 60, machineY + 20);
  endShape(CLOSE);

  // Output chute (right)
  fill(200, 150, 150);
  stroke(150, 100, 100);
  beginShape();
  vertex(machineX + machineW/2, machineY - 10);
  vertex(machineX + machineW/2 + 20, machineY - 20);
  vertex(machineX + machineW/2 + 60, machineY - 20);
  vertex(machineX + machineW/2 + 60, machineY + 40);
  vertex(machineX + machineW/2 + 20, machineY + 40);
  vertex(machineX + machineW/2, machineY + 10);
  endShape(CLOSE);

  // Function label on machine
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  text(functions[currentFunction].name, machineX, machineY);

  // Gears (decorative)
  drawGear(machineX - 50, machineY - 35, 20);
  drawGear(machineX + 50, machineY + 35, 15);

  // Labels
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('INPUT', machineX - machineW/2 - 40, machineY + 35);
  text('OUTPUT', machineX + machineW/2 + 40, machineY + 55);
}

function drawGear(x, y, r) {
  let teeth = 8;
  let rotation = (animationPhase === 2) ? animationProgress * TWO_PI : 0;

  push();
  translate(x, y);
  rotate(rotation);

  fill(80, 80, 80);
  stroke(50, 50, 50);
  strokeWeight(1);

  // Gear teeth
  beginShape();
  for (let i = 0; i < teeth; i++) {
    let angle1 = (i / teeth) * TWO_PI;
    let angle2 = ((i + 0.3) / teeth) * TWO_PI;
    let angle3 = ((i + 0.5) / teeth) * TWO_PI;
    let angle4 = ((i + 0.8) / teeth) * TWO_PI;

    vertex(cos(angle1) * r * 0.7, sin(angle1) * r * 0.7);
    vertex(cos(angle2) * r, sin(angle2) * r);
    vertex(cos(angle3) * r, sin(angle3) * r);
    vertex(cos(angle4) * r * 0.7, sin(angle4) * r * 0.7);
  }
  endShape(CLOSE);

  // Center hole
  fill(100, 150, 200);
  circle(0, 0, r * 0.4);

  pop();
}

function drawAnimation() {
  let machineX = canvasWidth / 2;
  let machineY = 180;
  let machineW = 200;

  textSize(24);
  textAlign(CENTER, CENTER);

  if (animationPhase === 1) {
    // Input moving into machine
    let startX = machineX - machineW/2 - 80;
    let endX = machineX - machineW/2 - 20;
    let x = lerp(startX, endX, animationProgress);

    fill(50, 150, 50);
    noStroke();
    circle(x, machineY, 40);
    fill('white');
    text(inputValue, x, machineY);
  } else if (animationPhase === 2) {
    // Processing inside machine - show calculation
    let calcText = getCalculationText();
    fill(255, 255, 200);
    stroke(200, 200, 100);
    strokeWeight(2);
    rectMode(CENTER);
    rect(machineX, machineY + 70, 180, 30, 5);
    rectMode(CORNER);

    fill('black');
    noStroke();
    textSize(16);
    text(calcText, machineX, machineY + 70);
  } else if (animationPhase === 3) {
    // Output moving out
    let startX = machineX + machineW/2 + 20;
    let endX = machineX + machineW/2 + 80;
    let x = lerp(startX, endX, animationProgress);

    fill(150, 50, 50);
    noStroke();
    circle(x, machineY, 40);
    fill('white');
    textSize(20);
    text(formatOutput(outputValue), x, machineY);
  } else if (animationPhase === 4 || animationPhase === 0) {
    // Show resting input and output positions
    // Input waiting
    fill(50, 150, 50);
    noStroke();
    circle(machineX - machineW/2 - 80, machineY, 40);
    fill('white');
    textSize(24);
    text(inputValue, machineX - machineW/2 - 80, machineY);

    // Output (if processed)
    if (animationPhase === 4) {
      fill(150, 50, 50);
      noStroke();
      circle(machineX + machineW/2 + 80, machineY, 40);
      fill('white');
      textSize(20);
      text(formatOutput(outputValue), machineX + machineW/2 + 80, machineY);
    }
  }
}

function getCalculationText() {
  let fn = functions[currentFunction];
  let x = inputValue;
  let result = formatOutput(outputValue);

  switch(currentFunction) {
    case 0: return `2 × ${x} = ${result}`;
    case 1: return `${x}² = ${x} × ${x} = ${result}`;
    case 2: return `|${x}| = ${result}`;
    case 3: return `sin(${x}) = ${result}`;
    default: return '';
  }
}

function formatOutput(val) {
  if (Number.isInteger(val)) return val.toString();
  return val.toFixed(3);
}

function drawHistory() {
  if (history.length === 0) return;

  let tableX = canvasWidth - 180;
  let tableY = 50;
  let rowH = 25;
  let colW = 55;

  // Table header
  fill(200, 200, 220);
  stroke(150);
  strokeWeight(1);
  rect(tableX, tableY, colW * 3, rowH);

  fill('black');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('f(x)', tableX + colW/2, tableY + rowH/2);
  text('x', tableX + colW + colW/2, tableY + rowH/2);
  text('f(x)', tableX + colW*2 + colW/2, tableY + rowH/2);

  // Table rows
  for (let i = 0; i < history.length; i++) {
    let y = tableY + rowH * (i + 1);
    fill(i % 2 === 0 ? 'white' : '#f5f5f5');
    stroke(150);
    rect(tableX, y, colW * 3, rowH);

    fill('black');
    noStroke();
    textSize(11);
    text(history[i].func, tableX + colW/2, y + rowH/2);
    text(history[i].input, tableX + colW + colW/2, y + rowH/2);
    text(history[i].output, tableX + colW*2 + colW/2, y + rowH/2);
  }

  // Table title
  fill('black');
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text('History', tableX + colW * 1.5, tableY - 5);
}

function drawControls() {
  textSize(defaultTextSize);

  // Row 1: Input slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  text('Input (x): ' + inputValue, 10, sliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 4, sliderW, 8, 4);

  // Slider handle
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(sliderHandleX, sliderY, 18);

  // Row 2: Buttons
  drawButton(processButtonX, processButtonY, processButtonW, processButtonH, 'Process', '#4CAF50');
  drawButton(clearButtonX, clearButtonY, clearButtonW, clearButtonH, 'Clear', '#f44336');

  // Function selector
  let funcX = 180;
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  text('Function:', funcX, processButtonY + processButtonH/2);

  // Function selector buttons
  let btnX = funcX + 70;
  let btnW = (canvasWidth - btnX - margin) / 4 - 5;
  for (let i = 0; i < functions.length; i++) {
    let isSelected = (i === currentFunction);
    let color = isSelected ? '#2196F3' : '#ddd';
    drawButton(btnX + i * (btnW + 5), funcButtonsY, btnW, funcButtonH, getFuncShortName(i), color, isSelected);
  }
}

function getFuncShortName(index) {
  switch(index) {
    case 0: return '2x';
    case 1: return 'x²';
    case 2: return '|x|';
    case 3: return 'sin';
    default: return '';
  }
}

function drawButton(x, y, w, h, label, bgColor, isSelected) {
  // Button background
  fill(bgColor);
  stroke(isSelected ? '#1565C0' : '#999');
  strokeWeight(isSelected ? 2 : 1);
  rect(x, y, w, h, 5);

  // Button label
  fill(bgColor === '#ddd' ? 'black' : 'white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(label, x + w/2, y + h/2);
}

function mousePressed() {
  // Check slider
  if (mouseY >= sliderY - 15 && mouseY <= sliderY + 15) {
    if (mouseX >= sliderX && mouseX <= sliderX + sliderW) {
      isDraggingSlider = true;
      updateSliderValue();
    }
  }

  // Check Process button
  if (mouseX >= processButtonX && mouseX <= processButtonX + processButtonW &&
      mouseY >= processButtonY && mouseY <= processButtonY + processButtonH) {
    startAnimation();
  }

  // Check Clear button
  if (mouseX >= clearButtonX && mouseX <= clearButtonX + clearButtonW &&
      mouseY >= clearButtonY && mouseY <= clearButtonY + clearButtonH) {
    history = [];
    animationPhase = 0;
  }

  // Check function selector buttons
  let funcX = 250;
  let btnW = (canvasWidth - funcX - margin) / 4 - 5;
  for (let i = 0; i < functions.length; i++) {
    let btnX = funcX + i * (btnW + 5);
    if (mouseX >= btnX && mouseX <= btnX + btnW &&
        mouseY >= funcButtonsY && mouseY <= funcButtonsY + funcButtonH) {
      currentFunction = i;
      outputValue = functions[currentFunction].calc(inputValue);
      animationPhase = 0;
    }
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    updateSliderValue();
  }
}

function mouseReleased() {
  isDraggingSlider = false;
}

function updateSliderValue() {
  sliderHandleX = constrain(mouseX, sliderX, sliderX + sliderW);
  inputValue = Math.round(map(sliderHandleX, sliderX, sliderX + sliderW, -10, 10));
  outputValue = functions[currentFunction].calc(inputValue);
  animationPhase = 0;
}

function startAnimation() {
  outputValue = functions[currentFunction].calc(inputValue);
  animationPhase = 1;
  animationProgress = 0;
}

function addToHistory() {
  history.unshift({
    func: getFuncShortName(currentFunction),
    input: inputValue,
    output: formatOutput(outputValue)
  });
  if (history.length > maxHistory) {
    history.pop();
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
  updateButtonPositions();
}
