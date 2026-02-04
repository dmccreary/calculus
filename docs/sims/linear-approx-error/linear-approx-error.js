// Linear Approximation Error MicroSim
// Learning Objective: Students will assess the accuracy of linear approximations by comparing
// the approximation to the actual function value and understanding how error varies with
// distance from the base point (Bloom Level 5: Evaluate)
// Bloom Verbs: assess, evaluate, compare
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let chartTop = 50;
let defaultTextSize = 16;

// Coordinate systems
let graph1Left, graph1Right, graph1Width;
let graph2Left, graph2Right, graph2Width;
let originX1, originY1; // Main function graph
let originX2, originY2; // Error vs distance graph
let scale1 = 40; // Scale for main graph
let scale2 = 15; // Scale for error graph (pixels per unit)

// Current state
let basePointA = 1;
let approxPointX = 1.5;
let selectedFunction = 0;
let showErrorRegion = true;
let isAnimating = false;
let animationDirection = 1;
let animationSpeed = 0.02;

// Slider states (canvas-based)
let sliderAX, sliderAY, sliderAW;
let sliderXX, sliderXY, sliderXW;
let isDraggingSliderA = false;
let isDraggingSliderX = false;

// For slider A (base point)
let sliderAMin = 0.2;
let sliderAMax = 4;

// Dropdown state
let dropdownOpen = false;
let dropdownX, dropdownY, dropdownW, dropdownH;

// Functions with their labels, f(x), f'(x), and valid domain
const functions = [
  {
    name: "sqrt(x)",
    displayName: "f(x) = sqrt(x)",
    f: (x) => x >= 0 ? Math.sqrt(x) : NaN,
    fPrime: (x) => x > 0 ? 1 / (2 * Math.sqrt(x)) : NaN,
    domainMin: 0.1,
    domainMax: 6,
    suggestedA: 1
  },
  {
    name: "sin(x)",
    displayName: "f(x) = sin(x)",
    f: (x) => Math.sin(x),
    fPrime: (x) => Math.cos(x),
    domainMin: -Math.PI,
    domainMax: Math.PI,
    suggestedA: 0.5
  },
  {
    name: "e^x",
    displayName: "f(x) = e^x",
    f: (x) => Math.exp(x),
    fPrime: (x) => Math.exp(x),
    domainMin: -2,
    domainMax: 2.5,
    suggestedA: 0
  },
  {
    name: "ln(x)",
    displayName: "f(x) = ln(x)",
    f: (x) => x > 0 ? Math.log(x) : NaN,
    fPrime: (x) => x > 0 ? 1 / x : NaN,
    domainMin: 0.1,
    domainMax: 5,
    suggestedA: 1
  },
  {
    name: "x^2",
    displayName: "f(x) = x^2",
    f: (x) => x * x,
    fPrime: (x) => 2 * x,
    domainMin: -2,
    domainMax: 3,
    suggestedA: 1
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  setupGraphLayout();
  updateControlPositions();

  describe('Linear Approximation Error: Compare actual function values with linear approximations and see how error grows with distance from the base point.', LABEL);
}

function setupGraphLayout() {
  // Left graph takes about 55% of width
  graph1Left = margin;
  graph1Width = (canvasWidth - margin * 3) * 0.55;
  graph1Right = graph1Left + graph1Width;

  // Right graph takes about 45% of width
  graph2Left = graph1Right + margin;
  graph2Width = canvasWidth - graph2Left - margin;
  graph2Right = graph2Left + graph2Width;

  // Origins for each graph
  originX1 = graph1Left + graph1Width * 0.2;
  originY1 = drawHeight * 0.6;

  originX2 = graph2Left + graph2Width * 0.15;
  originY2 = drawHeight * 0.6;
}

function updateControlPositions() {
  // Row 1: Base point slider
  sliderAX = 150;
  sliderAY = drawHeight + 20;
  sliderAW = Math.min(180, canvasWidth * 0.25);

  // Row 2: Approximation point slider
  sliderXX = 150;
  sliderXY = drawHeight + 50;
  sliderXW = Math.min(180, canvasWidth * 0.25);

  dropdownX = 10;
  dropdownY = drawHeight + 65;
  dropdownW = 110;
  dropdownH = 22;
}

function draw() {
  updateCanvasSize();

  // Handle animation
  if (isAnimating) {
    updateAnimation();
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

  // Draw main function graph
  drawMainGraph();

  // Draw error vs distance graph
  drawErrorGraph();

  // Draw title
  drawTitle();

  // Draw error analysis panel
  drawErrorPanel();

  // Draw controls
  drawControls();

  // Draw dropdown if open (on top of everything)
  if (dropdownOpen) {
    drawDropdownOptions();
  }
}

function updateAnimation() {
  const func = functions[selectedFunction];

  approxPointX += animationDirection * animationSpeed;

  // Bounce at domain limits
  if (approxPointX >= func.domainMax) {
    approxPointX = func.domainMax;
    animationDirection = -1;
  } else if (approxPointX <= func.domainMin) {
    approxPointX = func.domainMin;
    animationDirection = 1;
  }
}

function drawTitle() {
  const func = functions[selectedFunction];

  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Linear Approximation Error Analysis', canvasWidth / 2, 5);

  textSize(14);
  text(func.displayName + '  |  L(x) = f(a) + f\'(a)(x - a)', canvasWidth / 2, 28);
}

function drawMainGraph() {
  const func = functions[selectedFunction];

  // Graph border
  stroke(180);
  strokeWeight(1);
  noFill();
  rect(graph1Left - 5, chartTop, graph1Width + 10, drawHeight - chartTop - 10, 5);

  // Axes
  stroke(80);
  strokeWeight(1.5);
  // X-axis
  let yAxis = constrain(originY1, chartTop + 10, drawHeight - 25);
  line(graph1Left, yAxis, graph1Right, yAxis);
  // Y-axis
  let xAxis = constrain(originX1, graph1Left + 5, graph1Right - 5);
  line(xAxis, chartTop + 5, xAxis, drawHeight - 20);

  // Grid lines
  stroke(230);
  strokeWeight(1);
  for (let i = -5; i <= 10; i++) {
    let x = originX1 + i * scale1;
    if (x > graph1Left && x < graph1Right) {
      line(x, chartTop + 5, x, drawHeight - 20);
    }
  }
  for (let i = -5; i <= 5; i++) {
    let y = originY1 - i * scale1;
    if (y > chartTop + 5 && y < drawHeight - 20) {
      line(graph1Left, y, graph1Right, y);
    }
  }

  // Axis labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = -1; i <= 5; i++) {
    if (i !== 0) {
      let x = originX1 + i * scale1;
      if (x > graph1Left + 10 && x < graph1Right - 10) {
        text(i, x, yAxis + 3);
      }
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = -2; i <= 4; i++) {
    if (i !== 0) {
      let y = originY1 - i * scale1;
      if (y > chartTop + 15 && y < drawHeight - 25) {
        text(i, xAxis - 5, y);
      }
    }
  }

  // Calculate linear approximation
  let fA = func.f(basePointA);
  let fPrimeA = func.fPrime(basePointA);
  let fX = func.f(approxPointX);
  let lX = fA + fPrimeA * (approxPointX - basePointA);

  // Draw error region (shaded area between f(x) and L(x))
  if (showErrorRegion && !isNaN(fX) && !isNaN(lX)) {
    let xStart = Math.min(basePointA, approxPointX);
    let xEnd = Math.max(basePointA, approxPointX);

    fill(255, 200, 200, 100);
    noStroke();
    beginShape();
    for (let px = originX1 + xStart * scale1; px <= originX1 + xEnd * scale1; px += 2) {
      let x = (px - originX1) / scale1;
      let y = func.f(x);
      if (!isNaN(y) && isFinite(y)) {
        vertex(px, constrain(originY1 - y * scale1, chartTop, drawHeight - 20));
      }
    }
    for (let px = originX1 + xEnd * scale1; px >= originX1 + xStart * scale1; px -= 2) {
      let x = (px - originX1) / scale1;
      let y = fA + fPrimeA * (x - basePointA);
      vertex(px, constrain(originY1 - y * scale1, chartTop, drawHeight - 20));
    }
    endShape(CLOSE);
  }

  // Draw function curve
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = graph1Left; px < graph1Right; px += 2) {
    let x = (px - originX1) / scale1;
    let y = func.f(x);
    if (!isNaN(y) && isFinite(y)) {
      let sy = originY1 - y * scale1;
      if (sy > chartTop - 20 && sy < drawHeight + 20) {
        vertex(px, constrain(sy, chartTop - 20, drawHeight + 20));
      }
    }
  }
  endShape();

  // Draw tangent line (linear approximation)
  stroke(220, 80, 80);
  strokeWeight(2);
  let xMin = (graph1Left - originX1) / scale1;
  let xMax = (graph1Right - originX1) / scale1;
  let yAtXMin = fA + fPrimeA * (xMin - basePointA);
  let yAtXMax = fA + fPrimeA * (xMax - basePointA);

  let px1 = graph1Left;
  let py1 = constrain(originY1 - yAtXMin * scale1, chartTop - 50, drawHeight + 50);
  let px2 = graph1Right;
  let py2 = constrain(originY1 - yAtXMax * scale1, chartTop - 50, drawHeight + 50);
  line(px1, py1, px2, py2);

  // Draw base point (a)
  let pxA = originX1 + basePointA * scale1;
  let pyA = originY1 - fA * scale1;
  if (pxA > graph1Left && pxA < graph1Right && pyA > chartTop && pyA < drawHeight - 20) {
    fill(0, 150, 0);
    stroke(0, 100, 0);
    strokeWeight(2);
    circle(pxA, pyA, 14);

    // Label
    fill('black');
    noStroke();
    textSize(11);
    textAlign(LEFT, BOTTOM);
    text('a=' + basePointA.toFixed(2), pxA + 8, pyA - 5);
  }

  // Draw approximation point (x) and error line
  if (!isNaN(fX) && isFinite(fX) && !isNaN(lX) && isFinite(lX)) {
    let pxX = originX1 + approxPointX * scale1;
    let pyFX = originY1 - fX * scale1;
    let pyLX = originY1 - lX * scale1;

    if (pxX > graph1Left && pxX < graph1Right) {
      // Error line segment
      stroke(255, 100, 100);
      strokeWeight(3);
      let topY = Math.min(pyFX, pyLX);
      let bottomY = Math.max(pyFX, pyLX);
      topY = constrain(topY, chartTop, drawHeight - 20);
      bottomY = constrain(bottomY, chartTop, drawHeight - 20);
      line(pxX, topY, pxX, bottomY);

      // Point on curve f(x)
      if (pyFX > chartTop && pyFX < drawHeight - 20) {
        fill(50, 100, 200);
        stroke(30, 60, 150);
        strokeWeight(2);
        circle(pxX, pyFX, 12);
      }

      // Point on tangent line L(x)
      if (pyLX > chartTop && pyLX < drawHeight - 20) {
        fill(220, 80, 80);
        stroke(150, 50, 50);
        strokeWeight(2);
        circle(pxX, pyLX, 12);
      }
    }
  }

  // Graph label
  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('Function & Tangent Line', (graph1Left + graph1Right) / 2, chartTop + 5);
}

function drawErrorGraph() {
  const func = functions[selectedFunction];

  // Graph border
  stroke(180);
  strokeWeight(1);
  noFill();
  rect(graph2Left - 5, chartTop, graph2Width + 10, drawHeight - chartTop - 10, 5);

  // Calculate error values for plotting
  let fA = func.f(basePointA);
  let fPrimeA = func.fPrime(basePointA);

  // Axes
  stroke(80);
  strokeWeight(1.5);
  // X-axis (distance axis)
  line(graph2Left, originY2, graph2Right, originY2);
  // Y-axis (error axis)
  line(originX2, chartTop + 5, originX2, drawHeight - 20);

  // Grid
  stroke(230);
  strokeWeight(1);
  for (let i = -3; i <= 8; i++) {
    let x = originX2 + i * scale2;
    if (x > graph2Left && x < graph2Right) {
      line(x, chartTop + 5, x, drawHeight - 20);
    }
  }
  for (let i = -4; i <= 6; i++) {
    let y = originY2 - i * scale2;
    if (y > chartTop + 5 && y < drawHeight - 20) {
      line(graph2Left, y, graph2Right, y);
    }
  }

  // Axis labels
  fill('black');
  noStroke();
  textSize(9);
  textAlign(CENTER, TOP);
  text('distance', (graph2Left + graph2Right) / 2, drawHeight - 15);
  for (let i = 0; i <= 6; i++) {
    let x = originX2 + i * scale2;
    if (x > graph2Left + 5 && x < graph2Right - 5) {
      text(i, x, originY2 + 3);
    }
  }

  push();
  translate(graph2Left - 5, originY2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  textSize(9);
  text('|error|', 0, 0);
  pop();

  textAlign(RIGHT, CENTER);
  for (let i = 1; i <= 5; i++) {
    let y = originY2 - i * scale2;
    if (y > chartTop + 15 && y < drawHeight - 25) {
      text(i, originX2 - 4, y);
    }
  }

  // Plot error curve |f(x) - L(x)| as function of |x - a|
  stroke(200, 100, 50);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let dist = 0; dist <= 5; dist += 0.05) {
    // Check both directions from a
    let xPlus = basePointA + dist;
    let xMinus = basePointA - dist;

    let errorPlus = 0;
    let errorMinus = 0;
    let count = 0;

    if (xPlus >= func.domainMin && xPlus <= func.domainMax) {
      let fX = func.f(xPlus);
      let lX = fA + fPrimeA * (xPlus - basePointA);
      if (!isNaN(fX) && isFinite(fX)) {
        errorPlus = Math.abs(fX - lX);
        count++;
      }
    }

    if (xMinus >= func.domainMin && xMinus <= func.domainMax && dist > 0) {
      let fX = func.f(xMinus);
      let lX = fA + fPrimeA * (xMinus - basePointA);
      if (!isNaN(fX) && isFinite(fX)) {
        errorMinus = Math.abs(fX - lX);
        count++;
      }
    }

    // Use average error if we have both directions
    let avgError = count > 0 ? (errorPlus + errorMinus) / count : 0;

    let px = originX2 + dist * scale2;
    let py = originY2 - avgError * scale2;

    if (px > graph2Left && px < graph2Right && py > chartTop && py < drawHeight - 20) {
      vertex(px, py);
    }
  }
  endShape();

  // Mark current point
  let currentDist = Math.abs(approxPointX - basePointA);
  let fX = func.f(approxPointX);
  let lX = fA + fPrimeA * (approxPointX - basePointA);
  let currentError = Math.abs(fX - lX);

  if (!isNaN(currentError) && isFinite(currentError)) {
    let px = originX2 + currentDist * scale2;
    let py = originY2 - currentError * scale2;

    if (px > graph2Left && px < graph2Right && py > chartTop && py < drawHeight - 20) {
      fill(255, 100, 100);
      stroke(150, 50, 50);
      strokeWeight(2);
      circle(px, py, 12);
    }
  }

  // Graph label
  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('Error vs Distance from a', (graph2Left + graph2Right) / 2, chartTop + 5);
}

function drawErrorPanel() {
  const func = functions[selectedFunction];

  let fA = func.f(basePointA);
  let fPrimeA = func.fPrime(basePointA);
  let fX = func.f(approxPointX);
  let lX = fA + fPrimeA * (approxPointX - basePointA);
  let error = fX - lX;
  let absError = Math.abs(error);
  let relError = Math.abs(fX) > 0.0001 ? (absError / Math.abs(fX)) * 100 : 0;

  // Panel position
  let panelX = canvasWidth - 175;
  let panelY = chartTop + 25;
  let panelW = 165;
  let panelH = 140;

  // Draw panel
  fill(255, 255, 255, 245);
  stroke(100, 100, 200);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 8);

  // Title
  fill(50, 50, 150);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text('Error Analysis', panelX + 10, panelY + 8);

  // Divider
  stroke(200);
  strokeWeight(1);
  line(panelX + 8, panelY + 26, panelX + panelW - 8, panelY + 26);

  fill('black');
  noStroke();
  textSize(11);
  let lineH = 22;
  let startY = panelY + 34;

  if (isNaN(fX) || !isFinite(fX) || isNaN(lX) || !isFinite(lX)) {
    fill(200, 50, 50);
    text('x outside domain', panelX + 10, startY);
    return;
  }

  // Actual value
  fill(50, 100, 200);
  text('f(x) = ' + fX.toFixed(5), panelX + 10, startY);

  // Approximation
  fill(220, 80, 80);
  text('L(x) = ' + lX.toFixed(5), panelX + 10, startY + lineH);

  // Error
  fill('black');
  text('Error = ' + error.toFixed(5), panelX + 10, startY + lineH * 2);

  // Absolute error
  text('|Error| = ' + absError.toFixed(5), panelX + 10, startY + lineH * 3);

  // Relative error with color coding
  let relColor;
  if (relError < 1) {
    relColor = color(0, 150, 0); // Green for < 1%
  } else if (relError < 5) {
    relColor = color(200, 150, 0); // Yellow for 1-5%
  } else {
    relColor = color(200, 50, 50); // Red for > 5%
  }
  fill(relColor);
  textSize(12);
  text('Rel Error: ' + relError.toFixed(2) + '%', panelX + 10, startY + lineH * 4);
}

function drawControls() {
  const func = functions[selectedFunction];

  // Row 1: Base point (a) slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Base point a = ' + basePointA.toFixed(2), 10, sliderAY);

  // Slider track
  let sliderHandleA = map(basePointA, sliderAMin, sliderAMax, sliderAX, sliderAX + sliderAW);
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderAX, sliderAY - 4, sliderAW, 8, 4);

  // Slider handle
  fill(isDraggingSliderA ? '#006600' : '#00aa00');
  noStroke();
  circle(sliderHandleA, sliderAY, 16);

  // Row 2: Approximation point (x) slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Point x = ' + approxPointX.toFixed(2), 10, sliderXY);

  // Slider track
  let sliderHandleX = map(approxPointX, func.domainMin, func.domainMax, sliderXX, sliderXX + sliderXW);
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderXX, sliderXY - 4, sliderXW, 8, 4);

  // Slider handle
  fill(isDraggingSliderX ? '#660000' : '#cc4444');
  noStroke();
  circle(sliderHandleX, sliderXY, 16);

  // Distance display
  fill(100);
  textSize(10);
  textAlign(LEFT, CENTER);
  text('|x - a| = ' + Math.abs(approxPointX - basePointA).toFixed(2), sliderXX + sliderXW + 15, sliderXY);

  // Function dropdown
  fill(240);
  stroke(150);
  strokeWeight(1);
  rect(dropdownX, dropdownY, dropdownW, dropdownH, 4);

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text(func.name, dropdownX + 8, dropdownY + dropdownH / 2);

  // Dropdown arrow
  fill(100);
  noStroke();
  triangle(
    dropdownX + dropdownW - 16, dropdownY + 7,
    dropdownX + dropdownW - 8, dropdownY + 7,
    dropdownX + dropdownW - 12, dropdownY + 14
  );

  // Error Region toggle
  let toggleX = 140;
  let toggleY = dropdownY;
  let toggleW = 100;
  let toggleH = dropdownH;

  fill(showErrorRegion ? '#4CAF50' : '#9E9E9E');
  stroke(showErrorRegion ? '#388E3C' : '#757575');
  strokeWeight(1);
  rect(toggleX, toggleY, toggleW, toggleH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(showErrorRegion ? 'Region: ON' : 'Region: OFF', toggleX + toggleW / 2, toggleY + toggleH / 2);

  // Animate button
  let animBtnX = 260;
  let animBtnY = dropdownY;
  let animBtnW = 80;
  let animBtnH = dropdownH;

  fill(isAnimating ? '#f44336' : '#2196F3');
  stroke(isAnimating ? '#c62828' : '#1976D2');
  strokeWeight(1);
  rect(animBtnX, animBtnY, animBtnW, animBtnH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(isAnimating ? 'Stop' : 'Animate', animBtnX + animBtnW / 2, animBtnY + animBtnH / 2);

  // Reset button
  let resetBtnX = 360;
  let resetBtnY = dropdownY;
  let resetBtnW = 60;
  let resetBtnH = dropdownH;

  fill('#FF9800');
  stroke('#F57C00');
  strokeWeight(1);
  rect(resetBtnX, resetBtnY, resetBtnW, resetBtnH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Reset', resetBtnX + resetBtnW / 2, resetBtnY + resetBtnH / 2);
}

function drawDropdownOptions() {
  let optionH = 22;
  let listH = functions.length * optionH;

  // Draw dropdown list (going upward)
  fill(255);
  stroke(150);
  strokeWeight(1);
  rect(dropdownX, dropdownY - listH, dropdownW, listH, 4);

  // Draw options
  for (let i = 0; i < functions.length; i++) {
    let optY = dropdownY - listH + i * optionH;

    // Highlight on hover
    if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
        mouseY >= optY && mouseY <= optY + optionH) {
      fill(230, 240, 255);
      noStroke();
      rect(dropdownX + 2, optY + 2, dropdownW - 4, optionH - 4, 2);
    }

    // Selected indicator
    if (i === selectedFunction) {
      fill(200, 220, 255);
      noStroke();
      rect(dropdownX + 2, optY + 2, dropdownW - 4, optionH - 4, 2);
    }

    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text(functions[i].displayName, dropdownX + 8, optY + optionH / 2);
  }
}

function mousePressed() {
  const func = functions[selectedFunction];

  // Check base point slider
  let sliderHandleA = map(basePointA, sliderAMin, sliderAMax, sliderAX, sliderAX + sliderAW);
  if (dist(mouseX, mouseY, sliderHandleA, sliderAY) < 12) {
    isDraggingSliderA = true;
    return;
  }

  // Check slider A track
  if (mouseY >= sliderAY - 10 && mouseY <= sliderAY + 10 &&
      mouseX >= sliderAX && mouseX <= sliderAX + sliderAW) {
    isDraggingSliderA = true;
    basePointA = map(mouseX, sliderAX, sliderAX + sliderAW, sliderAMin, sliderAMax);
    basePointA = constrain(basePointA, sliderAMin, sliderAMax);
    basePointA = Math.round(basePointA * 20) / 20;
    return;
  }

  // Check approximation point slider
  let sliderHandleX = map(approxPointX, func.domainMin, func.domainMax, sliderXX, sliderXX + sliderXW);
  if (dist(mouseX, mouseY, sliderHandleX, sliderXY) < 12) {
    isDraggingSliderX = true;
    return;
  }

  // Check slider X track
  if (mouseY >= sliderXY - 10 && mouseY <= sliderXY + 10 &&
      mouseX >= sliderXX && mouseX <= sliderXX + sliderXW) {
    isDraggingSliderX = true;
    approxPointX = map(mouseX, sliderXX, sliderXX + sliderXW, func.domainMin, func.domainMax);
    approxPointX = constrain(approxPointX, func.domainMin, func.domainMax);
    approxPointX = Math.round(approxPointX * 20) / 20;
    return;
  }

  // Check dropdown button
  if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
      mouseY >= dropdownY && mouseY <= dropdownY + dropdownH) {
    dropdownOpen = !dropdownOpen;
    return;
  }

  // Check dropdown options if open
  if (dropdownOpen) {
    let optionH = 22;
    let listH = functions.length * optionH;

    for (let i = 0; i < functions.length; i++) {
      let optY = dropdownY - listH + i * optionH;

      if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
          mouseY >= optY && mouseY <= optY + optionH) {
        selectedFunction = i;
        // Reset points to reasonable values for new function
        const newFunc = functions[i];
        basePointA = newFunc.suggestedA;
        approxPointX = basePointA + 0.5;
        if (approxPointX > newFunc.domainMax) approxPointX = newFunc.domainMax - 0.2;
        dropdownOpen = false;
        return;
      }
    }

    dropdownOpen = false;
    return;
  }

  // Check Error Region toggle
  let toggleX = 140;
  let toggleY = dropdownY;
  let toggleW = 100;
  let toggleH = dropdownH;

  if (mouseX >= toggleX && mouseX <= toggleX + toggleW &&
      mouseY >= toggleY && mouseY <= toggleY + toggleH) {
    showErrorRegion = !showErrorRegion;
    return;
  }

  // Check Animate button
  let animBtnX = 260;
  let animBtnY = dropdownY;
  let animBtnW = 80;
  let animBtnH = dropdownH;

  if (mouseX >= animBtnX && mouseX <= animBtnX + animBtnW &&
      mouseY >= animBtnY && mouseY <= animBtnY + animBtnH) {
    isAnimating = !isAnimating;
    return;
  }

  // Check Reset button
  let resetBtnX = 360;
  let resetBtnY = dropdownY;
  let resetBtnW = 60;
  let resetBtnH = dropdownH;

  if (mouseX >= resetBtnX && mouseX <= resetBtnX + resetBtnW &&
      mouseY >= resetBtnY && mouseY <= resetBtnY + resetBtnH) {
    const newFunc = functions[selectedFunction];
    basePointA = newFunc.suggestedA;
    approxPointX = basePointA + 0.5;
    if (approxPointX > newFunc.domainMax) approxPointX = newFunc.domainMax - 0.2;
    isAnimating = false;
    return;
  }
}

function mouseDragged() {
  const func = functions[selectedFunction];

  if (isDraggingSliderA) {
    basePointA = map(mouseX, sliderAX, sliderAX + sliderAW, sliderAMin, sliderAMax);
    basePointA = constrain(basePointA, sliderAMin, sliderAMax);
    basePointA = Math.round(basePointA * 20) / 20;
  }

  if (isDraggingSliderX) {
    approxPointX = map(mouseX, sliderXX, sliderXX + sliderXW, func.domainMin, func.domainMax);
    approxPointX = constrain(approxPointX, func.domainMin, func.domainMax);
    approxPointX = Math.round(approxPointX * 20) / 20;
  }
}

function mouseReleased() {
  isDraggingSliderA = false;
  isDraggingSliderX = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  setupGraphLayout();
  updateControlPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  setupGraphLayout();
  updateControlPositions();
}
