// Rolle's Theorem Visualizer MicroSim
// Bloom Level: Understand (L2), Verbs: explain, interpret, verify
// Learning Objective: Students will explain the geometric meaning of Rolle's Theorem
// and verify its conditions (continuous, differentiable, f(a)=f(b))

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 420;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Chart area (coordinate system)
let chartTop = 55;
let chartBottom;
let chartLeft = 60;
let chartRight;
let chartHeight;
let chartWidth;

// Coordinate ranges
let xMin = -4, xMax = 4;
let yMin = -3, yMax = 5;

// Function and interval settings
let currentFunction = 0; // 0=parabola, 1=sine, 2=cubic
let intervalA = -2;
let intervalB = 2;
let morphFactor = 1.0; // controls the shape while maintaining f(a)=f(b)

// State
let showTangent = true;
let criticalPoints = [];
let rollesConditionsMet = true;
let foundCriticalPoints = false;

// Control positions
let sliderAX, sliderAY, sliderAW;
let sliderBX, sliderBY, sliderBW;
let sliderMorphX, sliderMorphY, sliderMorphW;
let funcBtnX, funcBtnY, funcBtnW;
let tangentBtnX, tangentBtnY;
let findBtnX, findBtnY;

// Dragging states
let isDraggingA = false;
let isDraggingB = false;
let isDraggingMorph = false;

// Function definitions
const functions = [
  { name: 'Parabola', formula: 'f(x) = -x\u00B2 + k' },
  { name: 'Sine Wave', formula: 'f(x) = sin(\u03C0x/2)' },
  { name: 'Cubic', formula: 'f(x) = x\u00B3 - 3x + k' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();
  updateCriticalPoints();

  describe('Interactive visualization of Rolle\'s Theorem showing a function with endpoints at equal y-values and horizontal tangent lines at critical points. Students can adjust the interval, select different functions, and verify the theorem\'s conditions.', LABEL);
}

function updateLayoutPositions() {
  chartRight = canvasWidth - margin - 10;
  chartBottom = drawHeight - 30;
  chartHeight = chartBottom - chartTop;
  chartWidth = chartRight - chartLeft;

  // Control positions - Row 1
  sliderAX = 100;
  sliderAY = drawHeight + 15;
  sliderAW = 120;

  sliderBX = 320;
  sliderBY = drawHeight + 15;
  sliderBW = 120;

  // Row 2: Function selector
  funcBtnX = 100;
  funcBtnY = drawHeight + 45;
  funcBtnW = 90;

  // Row 2: Morph slider
  sliderMorphX = 400;
  sliderMorphY = drawHeight + 55;
  sliderMorphW = canvasWidth - sliderMorphX - margin - 20;

  // Row 3: Toggle and find button
  tangentBtnX = 100;
  tangentBtnY = drawHeight + 85;

  findBtnX = 280;
  findBtnY = drawHeight + 85;
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

  // Draw title
  drawTitle();

  // Draw coordinate system
  drawAxes();

  // Check Rolle's conditions
  checkRollesConditions();

  // Draw function curve
  drawCurve();

  // Draw endpoints
  drawEndpoints();

  // Draw horizontal dashed line connecting endpoints (if f(a)=f(b))
  if (rollesConditionsMet) {
    drawHorizontalLine();

    // Draw critical points and tangent lines
    if (foundCriticalPoints) {
      drawCriticalPointsAndTangents();
    }
  }

  // Draw verification checklist
  drawChecklist();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text("Rolle's Theorem Visualizer", canvasWidth / 2, 5);
  textSize(13);
  fill(80);
  text('If f is continuous on [a,b], differentiable on (a,b), and f(a) = f(b), then there exists c where f\'(c) = 0', canvasWidth / 2, 26);
}

function drawAxes() {
  // Grid
  stroke(230);
  strokeWeight(1);

  // Vertical grid lines
  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    let px = map(x, xMin, xMax, chartLeft, chartRight);
    line(px, chartTop, px, chartBottom);
  }

  // Horizontal grid lines
  for (let y = Math.ceil(yMin); y <= yMax; y++) {
    let py = map(y, yMin, yMax, chartBottom, chartTop);
    line(chartLeft, py, chartRight, py);
  }

  // Axes
  stroke(100);
  strokeWeight(2);

  // X-axis
  let y0 = map(0, yMin, yMax, chartBottom, chartTop);
  if (y0 > chartTop && y0 < chartBottom) {
    line(chartLeft, y0, chartRight, y0);

    // X-axis labels
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      if (x !== 0) {
        let px = map(x, xMin, xMax, chartLeft, chartRight);
        text(x, px, y0 + 3);
      }
    }
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, chartLeft, chartRight);
  if (x0 > chartLeft && x0 < chartRight) {
    stroke(100);
    strokeWeight(2);
    line(x0, chartTop, x0, chartBottom);

    // Y-axis labels
    fill(80);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(11);
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      if (y !== 0) {
        let py = map(y, yMin, yMax, chartBottom, chartTop);
        text(y, x0 - 5, py);
      }
    }
  }

  // Axis labels
  fill(60);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('x', chartRight + 10, y0 - 5);
  textAlign(RIGHT, CENTER);
  text('y', x0 - 5, chartTop - 10);
}

function evaluateF(x) {
  switch (currentFunction) {
    case 0: // Parabola: -x^2 + k (shifted so f(a)=f(b))
      return -morphFactor * x * x + 3;
    case 1: // Sine wave
      return morphFactor * 2 * Math.sin(Math.PI * x / 2);
    case 2: // Cubic: x^3 - 3x + k
      return morphFactor * (x * x * x / 3 - x);
    default:
      return 0;
  }
}

function evaluateFPrime(x) {
  switch (currentFunction) {
    case 0: // Derivative of -x^2 + k
      return -2 * morphFactor * x;
    case 1: // Derivative of sin(pi*x/2)
      return morphFactor * 2 * Math.PI / 2 * Math.cos(Math.PI * x / 2);
    case 2: // Derivative of x^3/3 - x
      return morphFactor * (x * x - 1);
    default:
      return 0;
  }
}

function drawCurve() {
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = chartLeft; px <= chartRight; px += 2) {
    let x = map(px, chartLeft, chartRight, xMin, xMax);
    let y = evaluateF(x);
    let py = map(y, yMin, yMax, chartBottom, chartTop);

    if (py >= chartTop - 10 && py <= chartBottom + 10) {
      vertex(px, constrain(py, chartTop, chartBottom));
    }
  }
  endShape();
}

function drawEndpoints() {
  let fa = evaluateF(intervalA);
  let fb = evaluateF(intervalB);

  let pxA = map(intervalA, xMin, xMax, chartLeft, chartRight);
  let pyA = map(fa, yMin, yMax, chartBottom, chartTop);
  let pxB = map(intervalB, xMin, xMax, chartLeft, chartRight);
  let pyB = map(fb, yMin, yMax, chartBottom, chartTop);

  // Endpoint markers
  fill(200, 50, 50);
  stroke(255);
  strokeWeight(2);

  if (pyA >= chartTop && pyA <= chartBottom) {
    circle(pxA, pyA, 14);

    // Label
    fill(200, 50, 50);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text('a = ' + intervalA.toFixed(1), pxA, pyA - 10);
  }

  if (pyB >= chartTop && pyB <= chartBottom) {
    fill(200, 50, 50);
    stroke(255);
    strokeWeight(2);
    circle(pxB, pyB, 14);

    // Label
    fill(200, 50, 50);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(12);
    text('b = ' + intervalB.toFixed(1), pxB, pyB - 10);
  }
}

function drawHorizontalLine() {
  let fa = evaluateF(intervalA);
  let pxA = map(intervalA, xMin, xMax, chartLeft, chartRight);
  let pxB = map(intervalB, xMin, xMax, chartLeft, chartRight);
  let py = map(fa, yMin, yMax, chartBottom, chartTop);

  if (py >= chartTop && py <= chartBottom) {
    stroke(150, 150, 200);
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    line(pxA, py, pxB, py);
    drawingContext.setLineDash([]);
  }
}

function checkRollesConditions() {
  let fa = evaluateF(intervalA);
  let fb = evaluateF(intervalB);

  // Check if f(a) = f(b) (within tolerance)
  rollesConditionsMet = Math.abs(fa - fb) < 0.01 && intervalA < intervalB;
}

function updateCriticalPoints() {
  criticalPoints = [];

  // Find points where f'(x) = 0 in the interval (a, b)
  // Use numerical search
  let step = 0.01;
  let prevSign = Math.sign(evaluateFPrime(intervalA + step));

  for (let x = intervalA + step; x < intervalB - step; x += step) {
    let fp = evaluateFPrime(x);
    let currentSign = Math.sign(fp);

    // Sign change indicates a root
    if (currentSign !== prevSign && prevSign !== 0) {
      // Refine with bisection
      let left = x - step;
      let right = x;
      for (let i = 0; i < 20; i++) {
        let mid = (left + right) / 2;
        if (Math.sign(evaluateFPrime(mid)) === prevSign) {
          left = mid;
        } else {
          right = mid;
        }
      }
      let root = (left + right) / 2;

      // Check if truly within open interval
      if (root > intervalA + 0.01 && root < intervalB - 0.01) {
        criticalPoints.push(root);
      }
    }
    prevSign = currentSign;

    // Also check for f'(x) very close to 0
    if (Math.abs(fp) < 0.001) {
      let isDuplicate = criticalPoints.some(cp => Math.abs(cp - x) < 0.05);
      if (!isDuplicate && x > intervalA + 0.01 && x < intervalB - 0.01) {
        criticalPoints.push(x);
      }
    }
  }

  // Sort and remove duplicates
  criticalPoints.sort((a, b) => a - b);
  let unique = [];
  for (let cp of criticalPoints) {
    if (unique.length === 0 || Math.abs(cp - unique[unique.length - 1]) > 0.1) {
      unique.push(cp);
    }
  }
  criticalPoints = unique;
}

function drawCriticalPointsAndTangents() {
  for (let c of criticalPoints) {
    let fc = evaluateF(c);
    let px = map(c, xMin, xMax, chartLeft, chartRight);
    let py = map(fc, yMin, yMax, chartBottom, chartTop);

    if (py >= chartTop && py <= chartBottom) {
      // Draw horizontal tangent line
      if (showTangent) {
        stroke(0, 180, 100);
        strokeWeight(3);
        let tangentLength = 60;
        line(px - tangentLength, py, px + tangentLength, py);
      }

      // Draw critical point marker
      fill(0, 180, 100);
      stroke(255);
      strokeWeight(2);

      // Diamond shape for critical point
      push();
      translate(px, py);
      rotate(PI / 4);
      rectMode(CENTER);
      rect(0, 0, 12, 12);
      pop();

      // Label
      fill(0, 150, 80);
      noStroke();
      textAlign(CENTER, TOP);
      textSize(12);
      text('c = ' + c.toFixed(2), px, py + 12);
      textSize(10);
      text("f'(c) = 0", px, py + 25);
    }
  }
}

function drawChecklist() {
  let boxX = canvasWidth - 175;
  let boxY = chartTop + 5;
  let boxW = 165;
  let boxH = 70;

  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text("Rolle's Conditions:", boxX + 8, boxY + 6);
  textStyle(NORMAL);

  let fa = evaluateF(intervalA);
  let fb = evaluateF(intervalB);
  let checkmark = '\u2713';
  let cross = '\u2717';

  // Condition 1: Continuous
  fill(0, 150, 80);
  text(checkmark + ' Continuous on [a,b]', boxX + 8, boxY + 22);

  // Condition 2: Differentiable
  fill(0, 150, 80);
  text(checkmark + ' Differentiable on (a,b)', boxX + 8, boxY + 36);

  // Condition 3: f(a) = f(b)
  let conditionMet = Math.abs(fa - fb) < 0.01 && intervalA < intervalB;
  fill(conditionMet ? [0, 150, 80] : [200, 50, 50]);
  let symbol = conditionMet ? checkmark : cross;
  text(symbol + ' f(a) = f(b)', boxX + 8, boxY + 50);
}

function drawControls() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);

  // Row 1: Interval sliders
  text('a = ' + intervalA.toFixed(1), 10, sliderAY);
  text('b = ' + intervalB.toFixed(1), 230, sliderBY);

  // Slider A track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderAX, sliderAY - 5, sliderAW, 10, 5);

  // Slider A handle
  let handleAX = map(intervalA, xMin, xMax - 0.5, sliderAX, sliderAX + sliderAW);
  fill(isDraggingA ? '#cc6600' : '#ff8800');
  noStroke();
  circle(handleAX, sliderAY, 18);

  // Slider B track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderBX, sliderBY - 5, sliderBW, 10, 5);

  // Slider B handle
  let handleBX = map(intervalB, xMin + 0.5, xMax, sliderBX, sliderBX + sliderBW);
  fill(isDraggingB ? '#cc6600' : '#ff8800');
  noStroke();
  circle(handleBX, sliderBY, 18);

  // Row 2: Function selector
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Function:', 10, funcBtnY + 14);

  for (let i = 0; i < 3; i++) {
    let bx = funcBtnX + i * (funcBtnW + 5);

    fill(currentFunction === i ? '#4CAF50' : '#e0e0e0');
    stroke(currentFunction === i ? '#388E3C' : '#bdbdbd');
    strokeWeight(1);
    rect(bx, funcBtnY, funcBtnW, 28, 5);

    fill(currentFunction === i ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(functions[i].name, bx + funcBtnW / 2, funcBtnY + 14);
  }

  // Morph slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Shape: ' + morphFactor.toFixed(1), sliderMorphX - 65, sliderMorphY);

  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderMorphX, sliderMorphY - 5, sliderMorphW, 10, 5);

  let handleMorphX = map(morphFactor, 0.2, 2.0, sliderMorphX, sliderMorphX + sliderMorphW);
  fill(isDraggingMorph ? '#cc6600' : '#ff8800');
  noStroke();
  circle(handleMorphX, sliderMorphY, 18);

  // Row 3: Toggle and find button
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Show Tangent:', 10, tangentBtnY + 12);

  let toggleW = 55;
  fill(showTangent ? '#4CAF50' : '#e0e0e0');
  stroke(showTangent ? '#388E3C' : '#bdbdbd');
  strokeWeight(1);
  rect(tangentBtnX, tangentBtnY, toggleW, 24, 5);

  fill(showTangent ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(showTangent ? 'ON' : 'OFF', tangentBtnX + toggleW / 2, tangentBtnY + 12);

  // Find critical points button
  let findBtnW = 140;
  fill(foundCriticalPoints ? '#2196F3' : '#e0e0e0');
  stroke(foundCriticalPoints ? '#1976D2' : '#bdbdbd');
  strokeWeight(1);
  rect(findBtnX, findBtnY, findBtnW, 24, 5);

  fill(foundCriticalPoints ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Find Critical Points', findBtnX + findBtnW / 2, findBtnY + 12);

  // Display values
  let fa = evaluateF(intervalA);
  let fb = evaluateF(intervalB);

  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('f(a) = ' + fa.toFixed(2) + '   f(b) = ' + fb.toFixed(2), findBtnX + findBtnW + 15, findBtnY + 12);

  // Warning if conditions not met
  if (!rollesConditionsMet) {
    fill(200, 50, 50);
    textSize(12);
    textAlign(CENTER, CENTER);
    text("Rolle's conditions not satisfied - adjust a and b so f(a) = f(b)", canvasWidth / 2, drawHeight + controlHeight - 10);
  } else if (foundCriticalPoints && criticalPoints.length > 0) {
    fill(0, 150, 80);
    textSize(12);
    textAlign(CENTER, CENTER);
    let cpText = criticalPoints.length === 1
      ? 'Found c = ' + criticalPoints[0].toFixed(2) + " where f'(c) = 0"
      : 'Found ' + criticalPoints.length + " critical points where f'(c) = 0";
    text(cpText, canvasWidth / 2, drawHeight + controlHeight - 10);
  }
}

function mousePressed() {
  // Check slider A handle
  let handleAX = map(intervalA, xMin, xMax - 0.5, sliderAX, sliderAX + sliderAW);
  if (dist(mouseX, mouseY, handleAX, sliderAY) < 12) {
    isDraggingA = true;
    return;
  }

  // Check slider A track
  if (mouseY > sliderAY - 12 && mouseY < sliderAY + 12 &&
      mouseX > sliderAX && mouseX < sliderAX + sliderAW) {
    intervalA = map(mouseX, sliderAX, sliderAX + sliderAW, xMin, xMax - 0.5);
    intervalA = constrain(intervalA, xMin, intervalB - 0.5);
    intervalA = Math.round(intervalA * 10) / 10;
    foundCriticalPoints = false;
    isDraggingA = true;
    return;
  }

  // Check slider B handle
  let handleBX = map(intervalB, xMin + 0.5, xMax, sliderBX, sliderBX + sliderBW);
  if (dist(mouseX, mouseY, handleBX, sliderBY) < 12) {
    isDraggingB = true;
    return;
  }

  // Check slider B track
  if (mouseY > sliderBY - 12 && mouseY < sliderBY + 12 &&
      mouseX > sliderBX && mouseX < sliderBX + sliderBW) {
    intervalB = map(mouseX, sliderBX, sliderBX + sliderBW, xMin + 0.5, xMax);
    intervalB = constrain(intervalB, intervalA + 0.5, xMax);
    intervalB = Math.round(intervalB * 10) / 10;
    foundCriticalPoints = false;
    isDraggingB = true;
    return;
  }

  // Check morph slider handle
  let handleMorphX = map(morphFactor, 0.2, 2.0, sliderMorphX, sliderMorphX + sliderMorphW);
  if (dist(mouseX, mouseY, handleMorphX, sliderMorphY) < 12) {
    isDraggingMorph = true;
    return;
  }

  // Check morph slider track
  if (mouseY > sliderMorphY - 12 && mouseY < sliderMorphY + 12 &&
      mouseX > sliderMorphX && mouseX < sliderMorphX + sliderMorphW) {
    morphFactor = map(mouseX, sliderMorphX, sliderMorphX + sliderMorphW, 0.2, 2.0);
    morphFactor = constrain(morphFactor, 0.2, 2.0);
    morphFactor = Math.round(morphFactor * 10) / 10;
    foundCriticalPoints = false;
    isDraggingMorph = true;
    return;
  }

  // Check function buttons
  for (let i = 0; i < 3; i++) {
    let bx = funcBtnX + i * (funcBtnW + 5);
    if (mouseX >= bx && mouseX <= bx + funcBtnW &&
        mouseY >= funcBtnY && mouseY <= funcBtnY + 28) {
      currentFunction = i;
      foundCriticalPoints = false;
      return;
    }
  }

  // Check toggle button
  let toggleW = 55;
  if (mouseX >= tangentBtnX && mouseX <= tangentBtnX + toggleW &&
      mouseY >= tangentBtnY && mouseY <= tangentBtnY + 24) {
    showTangent = !showTangent;
    return;
  }

  // Check find button
  let findBtnW = 140;
  if (mouseX >= findBtnX && mouseX <= findBtnX + findBtnW &&
      mouseY >= findBtnY && mouseY <= findBtnY + 24) {
    if (rollesConditionsMet) {
      updateCriticalPoints();
      foundCriticalPoints = true;
    }
    return;
  }
}

function mouseDragged() {
  if (isDraggingA) {
    intervalA = map(mouseX, sliderAX, sliderAX + sliderAW, xMin, xMax - 0.5);
    intervalA = constrain(intervalA, xMin, intervalB - 0.5);
    intervalA = Math.round(intervalA * 10) / 10;
    foundCriticalPoints = false;
  }

  if (isDraggingB) {
    intervalB = map(mouseX, sliderBX, sliderBX + sliderBW, xMin + 0.5, xMax);
    intervalB = constrain(intervalB, intervalA + 0.5, xMax);
    intervalB = Math.round(intervalB * 10) / 10;
    foundCriticalPoints = false;
  }

  if (isDraggingMorph) {
    morphFactor = map(mouseX, sliderMorphX, sliderMorphX + sliderMorphW, 0.2, 2.0);
    morphFactor = constrain(morphFactor, 0.2, 2.0);
    morphFactor = Math.round(morphFactor * 10) / 10;
    foundCriticalPoints = false;
  }
}

function mouseReleased() {
  isDraggingA = false;
  isDraggingB = false;
  isDraggingMorph = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayoutPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = Math.max(canvasWidth, 500); // Minimum width
  updateLayoutPositions();
}
