// Power Rule Integration MicroSim
// Visualize the relationship between derivative and integral power rules
// Bloom Level: Apply (L3), Verbs: apply, calculate, use
// Learning Objective: Students will apply the power rule for integration

let canvasWidth = 750;
let drawHeight = 480;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Color scheme
const DERIVATIVE_COLOR = [50, 100, 230];   // Blue for derivative
const INTEGRAL_COLOR = [230, 100, 50];     // Orange for integral
const RESULT_COLOR = [0, 150, 80];         // Green for results
const PURPLE_THEME = [128, 0, 128];        // Purple for theme accents

// State
let currentStep = 0;
let maxSteps = 4;
let exponent = 2;  // Current n value
let direction = 'integral';  // 'integral' or 'derivative'
let showGraphs = true;

// Animation
let fadeProgress = [];
let animationPhase = 0;

// Layout regions
let chartTop = 60;
let chartHeight = 180;
let diagramTop = 250;
let diagramHeight = 200;

// Slider
let sliderX, sliderY, sliderWidth, sliderHeight;
let sliderMinVal = -3;
let sliderMaxVal = 6;
let draggingSlider = false;

// Buttons
let nextBtnX, nextBtnY, nextBtnW, nextBtnH;
let resetBtnX, resetBtnY;
let directionBtnX, directionBtnY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Initialize fade progress
  for (let i = 0; i < maxSteps; i++) {
    fadeProgress[i] = 0;
  }

  updateLayoutPositions();

  describe('Interactive visualization showing the power rule for integration with step-by-step breakdown and bidirectional arrows between derivative and integral.', LABEL);
}

function updateLayoutPositions() {
  // Slider position
  sliderX = 150;
  sliderY = drawHeight + 25;
  sliderWidth = 200;
  sliderHeight = 20;

  // Button positions
  nextBtnX = 20;
  nextBtnY = drawHeight + 45;
  nextBtnW = 100;
  nextBtnH = 28;

  resetBtnX = nextBtnX;
  resetBtnY = drawHeight + 15;

  directionBtnX = sliderX + sliderWidth + 30;
  directionBtnY = drawHeight + 15;
}

function draw() {
  updateCanvasSize();
  animationPhase += 0.05;

  // Update fade progress
  for (let i = 0; i < maxSteps; i++) {
    if (i <= currentStep) {
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

  // Draw title and subtitle
  drawTitle();

  // Draw the bidirectional diagram
  drawDiagram();

  // Draw the step-through calculation
  drawSteps();

  // Draw graphs if enabled
  if (showGraphs) {
    drawGraphs();
  }

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Power Rule: Integration', canvasWidth / 2, 8);

  textSize(14);
  fill(100);
  if (exponent === -1) {
    text('Note: n = -1 is a special case (ln|x|)', canvasWidth / 2, 32);
  } else {
    let formula = direction === 'integral'
      ? '\u222B x^n dx = x^(n+1)/(n+1) + C'
      : 'd/dx [x^(n+1)/(n+1)] = x^n';
    text(formula, canvasWidth / 2, 32);
  }
}

function drawDiagram() {
  let centerX = canvasWidth / 2;
  let boxWidth = 180;
  let boxHeight = 50;
  let leftBoxX = centerX - boxWidth - 60;
  let rightBoxX = centerX + 60;
  let boxY = diagramTop;

  // Left box: F(x) = x^(n+1)/(n+1)
  fill(255);
  stroke(INTEGRAL_COLOR);
  strokeWeight(2);
  rect(leftBoxX, boxY, boxWidth, boxHeight, 8);

  fill(INTEGRAL_COLOR);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Antiderivative F(x)', leftBoxX + boxWidth/2, boxY + 15);
  textSize(16);
  if (exponent !== -1) {
    let newExp = exponent + 1;
    text('x^' + newExp + ' / ' + newExp, leftBoxX + boxWidth/2, boxY + 35);
  } else {
    text('ln|x|', leftBoxX + boxWidth/2, boxY + 35);
  }

  // Right box: f(x) = x^n
  fill(255);
  stroke(DERIVATIVE_COLOR);
  strokeWeight(2);
  rect(rightBoxX, boxY, boxWidth, boxHeight, 8);

  fill(DERIVATIVE_COLOR);
  noStroke();
  textSize(14);
  text('Function f(x)', rightBoxX + boxWidth/2, boxY + 15);
  textSize(16);
  text('x^' + exponent, rightBoxX + boxWidth/2, boxY + 35);

  // Draw arrows
  let arrowY = boxY + boxHeight / 2;
  let arrowStartX = leftBoxX + boxWidth + 5;
  let arrowEndX = rightBoxX - 5;
  let arrowMidX = (arrowStartX + arrowEndX) / 2;

  // Top arrow: Derivative (going right)
  let topArrowY = arrowY - 15;
  stroke(DERIVATIVE_COLOR);
  strokeWeight(2);
  line(arrowStartX, topArrowY, arrowEndX - 10, topArrowY);
  // Arrow head
  fill(DERIVATIVE_COLOR);
  noStroke();
  triangle(arrowEndX, topArrowY, arrowEndX - 12, topArrowY - 6, arrowEndX - 12, topArrowY + 6);

  // Label for derivative arrow
  textSize(11);
  fill(DERIVATIVE_COLOR);
  textAlign(CENTER, BOTTOM);
  text('Derivative: multiply by (n+1), subtract 1', arrowMidX, topArrowY - 5);

  // Bottom arrow: Integral (going left)
  let bottomArrowY = arrowY + 15;
  stroke(INTEGRAL_COLOR);
  strokeWeight(2);
  line(arrowEndX, bottomArrowY, arrowStartX + 10, bottomArrowY);
  // Arrow head
  fill(INTEGRAL_COLOR);
  noStroke();
  triangle(arrowStartX, bottomArrowY, arrowStartX + 12, bottomArrowY - 6, arrowStartX + 12, bottomArrowY + 6);

  // Label for integral arrow
  textSize(11);
  fill(INTEGRAL_COLOR);
  textAlign(CENTER, TOP);
  text('Integral: add 1 to exponent, divide by new exponent', arrowMidX, bottomArrowY + 5);

  // Highlight current direction
  let pulse = sin(animationPhase * 2) * 0.3 + 0.7;
  if (direction === 'integral') {
    stroke(INTEGRAL_COLOR[0], INTEGRAL_COLOR[1], INTEGRAL_COLOR[2], pulse * 255);
    strokeWeight(3);
    noFill();
    rect(leftBoxX - 3, boxY - 3, boxWidth + 6, boxHeight + 6, 10);
  } else {
    stroke(DERIVATIVE_COLOR[0], DERIVATIVE_COLOR[1], DERIVATIVE_COLOR[2], pulse * 255);
    strokeWeight(3);
    noFill();
    rect(rightBoxX - 3, boxY - 3, boxWidth + 6, boxHeight + 6, 10);
  }
}

function drawSteps() {
  let startX = 20;
  let startY = diagramTop + 70;
  let stepWidth = canvasWidth - 40;
  let stepHeight = 38;

  let steps;
  if (exponent === -1) {
    steps = [
      { title: 'Special Case', content: 'When n = -1, the integral is ln|x| + C (not defined by power rule)' }
    ];
  } else if (direction === 'integral') {
    let newExp = exponent + 1;
    steps = [
      {
        title: 'Start with f(x) = x^n',
        content: 'f(x) = x^' + exponent
      },
      {
        title: 'Add 1 to exponent',
        content: 'New exponent: ' + exponent + ' + 1 = ' + newExp
      },
      {
        title: 'Divide by new exponent',
        content: 'F(x) = x^' + newExp + ' / ' + newExp + ' + C'
      },
      {
        title: 'Verify by differentiating',
        content: 'd/dx [x^' + newExp + '/' + newExp + '] = ' + newExp + '*x^' + exponent + '/' + newExp + ' = x^' + exponent + ' \u2713'
      }
    ];
  } else {
    let newExp = exponent + 1;
    steps = [
      {
        title: 'Start with F(x) = x^(n+1)/(n+1)',
        content: 'F(x) = x^' + newExp + ' / ' + newExp
      },
      {
        title: 'Multiply by exponent',
        content: newExp + ' * x^' + newExp + ' / ' + newExp
      },
      {
        title: 'Subtract 1 from exponent',
        content: 'x^(' + newExp + ' - 1) = x^' + exponent
      },
      {
        title: 'Result: f(x) = x^n',
        content: "f(x) = F'(x) = x^" + exponent + ' \u2713'
      }
    ];
  }

  maxSteps = steps.length;

  for (let i = 0; i < steps.length; i++) {
    let y = startY + i * stepHeight;
    let alpha = fadeProgress[i] * 255;

    if (alpha > 0) {
      // Step background
      let isCurrentStep = (i === currentStep);
      if (isCurrentStep) {
        let pulse = sin(animationPhase * 2) * 20 + 235;
        fill(255, 255, pulse, alpha);
        stroke(RESULT_COLOR[0], RESULT_COLOR[1], RESULT_COLOR[2], alpha);
        strokeWeight(2);
      } else {
        fill(255, 255, 240, alpha);
        stroke(200, 200, 200, alpha);
        strokeWeight(1);
      }
      rect(startX, y, stepWidth, stepHeight - 4, 5);

      // Step number
      fill(100, 100, 100, alpha);
      noStroke();
      circle(startX + 18, y + (stepHeight - 4) / 2, 22);
      fill(255, 255, 255, alpha);
      textAlign(CENTER, CENTER);
      textSize(12);
      textStyle(BOLD);
      text(i + 1, startX + 18, y + (stepHeight - 4) / 2);
      textStyle(NORMAL);

      // Step title
      fill(60, 60, 60, alpha);
      textAlign(LEFT, CENTER);
      textSize(12);
      text(steps[i].title + ':', startX + 38, y + 12);

      // Step content
      if (direction === 'integral') {
        fill(INTEGRAL_COLOR[0], INTEGRAL_COLOR[1], INTEGRAL_COLOR[2], alpha);
      } else {
        fill(DERIVATIVE_COLOR[0], DERIVATIVE_COLOR[1], DERIVATIVE_COLOR[2], alpha);
      }
      textSize(14);
      text(steps[i].content, startX + 38, y + 28);
    } else {
      // Placeholder for hidden steps
      fill(245);
      stroke(220);
      strokeWeight(1);
      rect(startX, y, stepWidth, stepHeight - 4, 5);

      fill(180);
      textAlign(CENTER, CENTER);
      textSize(12);
      text('Step ' + (i + 1) + ' - Click "Next Step" to reveal', startX + stepWidth / 2, y + (stepHeight - 4) / 2);
    }
  }
}

function drawGraphs() {
  let graphWidth = 150;
  let graphHeight = 100;
  let graphX = canvasWidth - graphWidth - 30;
  let graphY = chartTop + 5;

  // Graph background
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(graphX, graphY, graphWidth, graphHeight, 5);

  // Title
  fill(80);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(10);
  text('Graph Preview', graphX + graphWidth / 2, graphY + 3);

  // Axes
  let axisX = graphX + graphWidth / 2;
  let axisY = graphY + graphHeight / 2 + 5;
  stroke(150);
  strokeWeight(1);
  line(graphX + 10, axisY, graphX + graphWidth - 10, axisY);  // x-axis
  line(axisX, graphY + 15, axisX, graphY + graphHeight - 10);  // y-axis

  // Draw curves
  let scale = 15;
  let xRange = 2;

  noFill();
  strokeWeight(2);

  // Draw f(x) = x^n (derivative function)
  stroke(DERIVATIVE_COLOR);
  beginShape();
  for (let px = -xRange; px <= xRange; px += 0.1) {
    if (exponent === -1 && px === 0) continue;
    let fx = pow(px, exponent);
    if (isFinite(fx) && abs(fx) < 5) {
      let screenX = axisX + px * scale * 1.5;
      let screenY = axisY - fx * scale;
      if (screenX > graphX + 10 && screenX < graphX + graphWidth - 10) {
        vertex(screenX, constrain(screenY, graphY + 15, graphY + graphHeight - 10));
      }
    }
  }
  endShape();

  // Draw F(x) = x^(n+1)/(n+1) (integral function)
  if (exponent !== -1) {
    stroke(INTEGRAL_COLOR);
    beginShape();
    let newExp = exponent + 1;
    for (let px = -xRange; px <= xRange; px += 0.1) {
      let Fx = pow(px, newExp) / newExp;
      if (isFinite(Fx) && abs(Fx) < 5) {
        let screenX = axisX + px * scale * 1.5;
        let screenY = axisY - Fx * scale;
        if (screenX > graphX + 10 && screenX < graphX + graphWidth - 10) {
          vertex(screenX, constrain(screenY, graphY + 15, graphY + graphHeight - 10));
        }
      }
    }
    endShape();
  }

  // Legend
  textSize(9);
  textAlign(LEFT, CENTER);

  fill(DERIVATIVE_COLOR);
  noStroke();
  rect(graphX + 8, graphY + graphHeight - 22, 10, 8, 2);
  fill(80);
  text('f(x)=x^' + exponent, graphX + 22, graphY + graphHeight - 18);

  if (exponent !== -1) {
    fill(INTEGRAL_COLOR);
    noStroke();
    rect(graphX + 8, graphY + graphHeight - 12, 10, 8, 2);
    fill(80);
    let newExp = exponent + 1;
    text('F(x)=x^' + newExp + '/' + newExp, graphX + 22, graphY + graphHeight - 8);
  }
}

function drawControls() {
  // Reset button
  fill('#ff9800');
  stroke('#f57c00');
  strokeWeight(1);
  rect(resetBtnX, resetBtnY, 80, nextBtnH, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Reset', resetBtnX + 40, resetBtnY + nextBtnH / 2);

  // Next Step button
  let canAdvance = currentStep < maxSteps - 1;
  fill(canAdvance ? '#4CAF50' : '#cccccc');
  stroke(canAdvance ? '#388E3C' : '#aaaaaa');
  strokeWeight(1);
  rect(nextBtnX, nextBtnY, nextBtnW, nextBtnH, 5);

  fill(canAdvance ? 'white' : '#888888');
  noStroke();
  text('Next Step', nextBtnX + nextBtnW / 2, nextBtnY + nextBtnH / 2);

  // Slider for exponent n
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Exponent n:', sliderX - 80, sliderY + sliderHeight / 2);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY, sliderWidth, sliderHeight, 10);

  // Slider fill
  let sliderFillWidth = map(exponent, sliderMinVal, sliderMaxVal, 0, sliderWidth);
  fill(PURPLE_THEME);
  noStroke();
  rect(sliderX, sliderY, sliderFillWidth, sliderHeight, 10, 0, 0, 10);

  // Slider handle
  let handleX = sliderX + sliderFillWidth;
  fill(255);
  stroke(PURPLE_THEME);
  strokeWeight(2);
  circle(handleX, sliderY + sliderHeight / 2, 24);

  fill(PURPLE_THEME);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(exponent, handleX, sliderY + sliderHeight / 2);

  // Skip -1 indicator
  if (exponent === -1) {
    fill(200, 50, 50);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('(special case)', sliderX + sliderWidth + 10, sliderY + sliderHeight / 2);
  }

  // Direction toggle button
  let dirBtnW = 150;
  let dirBtnH = 50;

  fill(direction === 'integral' ? INTEGRAL_COLOR : DERIVATIVE_COLOR);
  stroke(100);
  strokeWeight(1);
  rect(directionBtnX, directionBtnY, dirBtnW, dirBtnH, 8);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Direction:', directionBtnX + dirBtnW / 2, directionBtnY + 12);
  textSize(14);
  textStyle(BOLD);
  text(direction === 'integral' ? 'Integration' : 'Differentiation', directionBtnX + dirBtnW / 2, directionBtnY + 32);
  textStyle(NORMAL);

  // Numerical example display
  let exampleX = directionBtnX + dirBtnW + 20;
  fill(240);
  stroke(200);
  strokeWeight(1);
  rect(exampleX, directionBtnY, 180, dirBtnH, 8);

  fill(80);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(10);
  text('Example at x = 2:', exampleX + 90, directionBtnY + 5);

  if (exponent !== -1) {
    let fVal = pow(2, exponent);
    let newExp = exponent + 1;
    let FVal = pow(2, newExp) / newExp;

    textSize(11);
    fill(DERIVATIVE_COLOR);
    text('f(2) = 2^' + exponent + ' = ' + fVal.toFixed(2), exampleX + 90, directionBtnY + 20);

    fill(INTEGRAL_COLOR);
    text('F(2) = 2^' + newExp + '/' + newExp + ' = ' + FVal.toFixed(2), exampleX + 90, directionBtnY + 35);
  } else {
    textSize(11);
    fill(DERIVATIVE_COLOR);
    text('f(2) = 2^(-1) = 0.5', exampleX + 90, directionBtnY + 20);

    fill(INTEGRAL_COLOR);
    text('F(2) = ln(2) = 0.69', exampleX + 90, directionBtnY + 35);
  }
}

function mousePressed() {
  // Check slider
  let handleX = sliderX + map(exponent, sliderMinVal, sliderMaxVal, 0, sliderWidth);
  if (dist(mouseX, mouseY, handleX, sliderY + sliderHeight / 2) < 15) {
    draggingSlider = true;
    return;
  }

  // Check slider track click
  if (mouseX >= sliderX && mouseX <= sliderX + sliderWidth &&
      mouseY >= sliderY && mouseY <= sliderY + sliderHeight) {
    updateSliderFromMouse();
    return;
  }

  // Check Reset button
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 80 &&
      mouseY >= resetBtnY && mouseY <= resetBtnY + nextBtnH) {
    resetSteps();
    return;
  }

  // Check Next Step button
  if (mouseX >= nextBtnX && mouseX <= nextBtnX + nextBtnW &&
      mouseY >= nextBtnY && mouseY <= nextBtnY + nextBtnH) {
    if (currentStep < maxSteps - 1) {
      currentStep++;
    }
    return;
  }

  // Check Direction toggle
  let dirBtnW = 150;
  let dirBtnH = 50;
  if (mouseX >= directionBtnX && mouseX <= directionBtnX + dirBtnW &&
      mouseY >= directionBtnY && mouseY <= directionBtnY + dirBtnH) {
    direction = direction === 'integral' ? 'derivative' : 'integral';
    resetSteps();
    return;
  }
}

function mouseDragged() {
  if (draggingSlider) {
    updateSliderFromMouse();
  }
}

function mouseReleased() {
  draggingSlider = false;
}

function updateSliderFromMouse() {
  let rawVal = map(mouseX, sliderX, sliderX + sliderWidth, sliderMinVal, sliderMaxVal);
  let newExp = round(constrain(rawVal, sliderMinVal, sliderMaxVal));

  if (newExp !== exponent) {
    exponent = newExp;
    resetSteps();
  }
}

function resetSteps() {
  currentStep = 0;
  for (let i = 0; i < maxSteps; i++) {
    fadeProgress[i] = 0;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayoutPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = max(canvasWidth, 600);
  updateLayoutPositions();
}
