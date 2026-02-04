// Average Value of a Function MicroSim
// Illustrate the average value as the height of a rectangle with equal area to the region under the curve
// Bloom Level: Apply (L3), Verbs: apply, calculate, interpret
// Learning Objective: Students will calculate and interpret the average value of a function

let canvasWidth = 750;
let drawHeight = 480;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;
let defaultTextSize = 16;

// Chart layout
let chartTop = 60;
let chartLeft = 60;
let chartRight;
let chartBottom;
let chartWidth;
let chartHeight;

// Color scheme (purple theme)
const CURVE_COLOR = [50, 100, 230];           // Blue for curve
const REGION_COLOR = [100, 150, 255, 80];     // Light blue for region under curve
const RECTANGLE_COLOR = [255, 150, 50, 100];  // Orange for average rectangle
const AVG_LINE_COLOR = [230, 100, 50];        // Orange for average line
const PURPLE_THEME = [128, 0, 128];           // Purple for theme accents
const MATCH_COLOR = [0, 180, 80];             // Green when areas match

// State
let a = 0;                    // Left endpoint
let b = 3;                    // Right endpoint
let currentStage = 1;         // 1: curve only, 2: show rectangle, 3: verify areas
let showAnimation = false;    // Animate rectangle height
let animationProgress = 0;    // 0 to 1
let selectedFunction = 0;     // Index of selected function

// Function options
const functionOptions = [
  { name: 'x^2', label: 'x\u00B2', fn: (x) => x * x, integral: (x) => x * x * x / 3 },
  { name: 'sin(x)', label: 'sin(x)', fn: (x) => Math.sin(x), integral: (x) => -Math.cos(x) },
  { name: 'e^x', label: 'e^x', fn: (x) => Math.exp(x), integral: (x) => Math.exp(x) },
  { name: 'sqrt(x)', label: '\u221Ax', fn: (x) => x >= 0 ? Math.sqrt(x) : 0, integral: (x) => x >= 0 ? (2/3) * Math.pow(x, 1.5) : 0 }
];

// Slider positions
let aSliderX, aSliderY, sliderWidth;
let bSliderX, bSliderY;
let draggingA = false;
let draggingB = false;

// Button positions
let showRectBtnX, showRectBtnY, btnW, btnH;
let animateBtnX, animateBtnY;
let resetBtnX, resetBtnY;

// Dropdown positions
let dropdownX, dropdownY, dropdownW, dropdownH;
let dropdownOpen = false;

// Animation
let animationPhase = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);
  updateLayoutPositions();

  describe('Interactive visualization showing the average value of a function as a rectangle with equal area to the region under the curve. Students can select different functions and adjust interval endpoints.', LABEL);
}

function updateLayoutPositions() {
  chartRight = canvasWidth - 40;
  chartBottom = drawHeight - 30;
  chartWidth = chartRight - chartLeft;
  chartHeight = chartBottom - chartTop;

  // Control positions
  sliderWidth = 180;

  // Dropdown
  dropdownX = 20;
  dropdownY = drawHeight + 15;
  dropdownW = 120;
  dropdownH = 28;

  // Sliders
  aSliderX = 170;
  aSliderY = drawHeight + 20;
  bSliderX = 170;
  bSliderY = drawHeight + 55;

  // Buttons
  btnW = 130;
  btnH = 32;
  showRectBtnX = aSliderX + sliderWidth + 30;
  showRectBtnY = drawHeight + 12;
  animateBtnX = showRectBtnX;
  animateBtnY = drawHeight + 52;
  resetBtnX = showRectBtnX + btnW + 15;
  resetBtnY = drawHeight + 12;
}

function draw() {
  updateCanvasSize();
  animationPhase += 0.03;

  // Handle animation
  if (showAnimation) {
    animationProgress += 0.02;
    if (animationProgress >= 1) {
      animationProgress = 1;
      showAnimation = false;
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

  // Draw components
  drawTitle();
  drawAxes();
  drawVisualization();
  drawInfoPanel();
  drawFormulaDisplay();
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Average Value of a Function', canvasWidth / 2, 8);

  textSize(14);
  fill(100);
  let funcName = functionOptions[selectedFunction].label;
  text('f(x) = ' + funcName + ' on [' + a.toFixed(1) + ', ' + b.toFixed(1) + ']', canvasWidth / 2, 32);
}

function drawAxes() {
  stroke(150);
  strokeWeight(1);

  // Determine axis ranges based on current function and interval
  let xMin = Math.min(a, 0) - 0.5;
  let xMax = Math.max(b, 3) + 0.5;
  let yMin = -0.5;
  let yMax = getYMax() + 0.5;

  // Grid lines
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    let screenX = mapX(x, xMin, xMax);
    if (screenX > chartLeft && screenX < chartRight) {
      stroke(235);
      line(screenX, chartTop, screenX, chartBottom);

      stroke(100);
      noFill();
      textAlign(CENTER, TOP);
      textSize(10);
      if (x !== 0) {
        text(x, screenX, chartBottom + 5);
      }
    }
  }

  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
    let screenY = mapY(y, yMin, yMax);
    if (screenY > chartTop && screenY < chartBottom) {
      stroke(235);
      line(chartLeft, screenY, chartRight, screenY);

      stroke(100);
      noFill();
      textAlign(RIGHT, CENTER);
      textSize(10);
      if (y !== 0) {
        text(y, chartLeft - 5, screenY);
      }
    }
  }

  // Main axes
  stroke(80);
  strokeWeight(2);

  // X-axis
  let yZero = mapY(0, yMin, yMax);
  if (yZero > chartTop && yZero < chartBottom) {
    line(chartLeft, yZero, chartRight, yZero);
  }

  // Y-axis
  let xZero = mapX(0, xMin, xMax);
  if (xZero > chartLeft && xZero < chartRight) {
    line(xZero, chartTop, xZero, chartBottom);
  }

  // Axis labels
  fill(60);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('x', chartRight - 10, yZero + 5);
  textAlign(RIGHT, CENTER);
  text('y', xZero - 8, chartTop + 10);
}

function drawVisualization() {
  let xMin = Math.min(a, 0) - 0.5;
  let xMax = Math.max(b, 3) + 0.5;
  let yMin = -0.5;
  let yMax = getYMax() + 0.5;

  let fn = functionOptions[selectedFunction].fn;
  let integralFn = functionOptions[selectedFunction].integral;

  // Calculate integral and average value
  let integralValue = integralFn(b) - integralFn(a);
  let avgValue = integralValue / (b - a);

  // Stage 1 & 2 & 3: Draw shaded region under curve
  if (currentStage >= 1) {
    fill(REGION_COLOR);
    noStroke();
    beginShape();

    // Bottom left corner
    vertex(mapX(a, xMin, xMax), mapY(0, yMin, yMax));

    // Trace the curve
    let numSteps = 100;
    for (let i = 0; i <= numSteps; i++) {
      let x = a + (b - a) * i / numSteps;
      let y = fn(x);
      if (isFinite(y) && !isNaN(y)) {
        vertex(mapX(x, xMin, xMax), mapY(Math.max(0, y), yMin, yMax));
      }
    }

    // Bottom right corner
    vertex(mapX(b, xMin, xMax), mapY(0, yMin, yMax));
    endShape(CLOSE);
  }

  // Stage 2 & 3: Draw average rectangle
  if (currentStage >= 2) {
    let currentAvg = showAnimation ? avgValue * animationProgress : avgValue;

    // Rectangle outline with different color based on stage
    if (currentStage === 3) {
      fill(MATCH_COLOR[0], MATCH_COLOR[1], MATCH_COLOR[2], 60);
      stroke(MATCH_COLOR);
    } else {
      fill(RECTANGLE_COLOR);
      stroke(AVG_LINE_COLOR);
    }
    strokeWeight(2);

    let rectLeft = mapX(a, xMin, xMax);
    let rectRight = mapX(b, xMin, xMax);
    let rectTop = mapY(currentAvg, yMin, yMax);
    let rectBottom = mapY(0, yMin, yMax);

    rect(rectLeft, rectTop, rectRight - rectLeft, rectBottom - rectTop);

    // Horizontal line at f_avg
    stroke(AVG_LINE_COLOR);
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    let lineY = mapY(currentAvg, yMin, yMax);
    line(chartLeft, lineY, chartRight, lineY);
    drawingContext.setLineDash([]);

    // Label the average line
    fill(AVG_LINE_COLOR);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('f_avg = ' + currentAvg.toFixed(3), chartLeft + 5, lineY - 10);
  }

  // Draw the curve on top
  stroke(CURVE_COLOR);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = chartLeft; px <= chartRight; px += 2) {
    let x = unmapX(px, xMin, xMax);
    let y = fn(x);
    if (isFinite(y) && !isNaN(y) && y < yMax + 1) {
      let screenY = mapY(y, yMin, yMax);
      if (screenY >= chartTop - 10 && screenY <= chartBottom + 10) {
        vertex(px, constrain(screenY, chartTop, chartBottom));
      }
    }
  }
  endShape();

  // Draw vertical boundary lines at a and b
  stroke(PURPLE_THEME);
  strokeWeight(2);
  let aX = mapX(a, xMin, xMax);
  let bX = mapX(b, xMin, xMax);
  let y0 = mapY(0, yMin, yMax);

  // Line at x = a
  let ya = fn(a);
  if (isFinite(ya) && ya >= 0) {
    line(aX, y0, aX, mapY(ya, yMin, yMax));
  }

  // Line at x = b
  let yb = fn(b);
  if (isFinite(yb) && yb >= 0) {
    line(bX, y0, bX, mapY(yb, yMin, yMax));
  }

  // Labels for a and b
  fill(PURPLE_THEME);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('a = ' + a.toFixed(1), aX, y0 + 18);
  text('b = ' + b.toFixed(1), bX, y0 + 18);
}

function drawInfoPanel() {
  let fn = functionOptions[selectedFunction].fn;
  let integralFn = functionOptions[selectedFunction].integral;

  // Calculate values
  let integralValue = integralFn(b) - integralFn(a);
  let avgValue = integralValue / (b - a);
  let rectArea = avgValue * (b - a);

  // Info panel
  let panelX = chartRight - 200;
  let panelY = chartTop + 10;
  let panelW = 190;
  let panelH = currentStage >= 3 ? 130 : 100;

  fill(255, 255, 255, 240);
  stroke(PURPLE_THEME);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 8);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Calculations:', panelX + 10, panelY + 8);
  textStyle(NORMAL);

  textSize(11);
  fill(60);

  let yOffset = panelY + 28;

  // Show integral value
  text('Integral = ' + integralValue.toFixed(4), panelX + 10, yOffset);
  yOffset += 18;

  // Show interval width
  text('b - a = ' + (b - a).toFixed(1), panelX + 10, yOffset);
  yOffset += 18;

  // Show average value
  fill(AVG_LINE_COLOR);
  text('f_avg = ' + avgValue.toFixed(4), panelX + 10, yOffset);
  yOffset += 18;

  // Stage 3: Verify areas match
  if (currentStage >= 3) {
    fill(MATCH_COLOR);
    text('Curve area = ' + integralValue.toFixed(4), panelX + 10, yOffset);
    yOffset += 16;
    text('Rect area = ' + rectArea.toFixed(4), panelX + 10, yOffset);
    yOffset += 16;

    // Check if areas match (they should)
    let areasMatch = Math.abs(integralValue - rectArea) < 0.0001;
    if (areasMatch) {
      let pulse = sin(animationPhase * 3) * 0.3 + 0.7;
      fill(MATCH_COLOR[0], MATCH_COLOR[1], MATCH_COLOR[2], pulse * 255);
      textSize(12);
      textStyle(BOLD);
      text('Areas match!', panelX + 10, yOffset);
      textStyle(NORMAL);
    }
  }
}

function drawFormulaDisplay() {
  // Formula box
  let boxX = chartLeft + 10;
  let boxY = chartTop + 10;
  let boxW = 240;
  let boxH = 70;

  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 5);

  fill(60);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);

  // Average value formula
  text('Average Value Formula:', boxX + 10, boxY + 8);
  textSize(12);
  fill(PURPLE_THEME);
  text('f_avg = (1/(b-a)) \u222B f(x) dx', boxX + 10, boxY + 26);

  // Current function
  textSize(10);
  fill(80);
  let funcName = functionOptions[selectedFunction].label;
  text('f(x) = ' + funcName, boxX + 10, boxY + 48);
}

function drawControls() {
  // Function dropdown
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Function:', dropdownX, dropdownY + dropdownH / 2);

  // Dropdown button
  let ddBtnX = dropdownX + 60;
  fill(dropdownOpen ? [230, 230, 250] : 255);
  stroke(PURPLE_THEME);
  strokeWeight(1);
  rect(ddBtnX, dropdownY, dropdownW, dropdownH, 4);

  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text(functionOptions[selectedFunction].label, ddBtnX + 8, dropdownY + dropdownH / 2);

  // Dropdown arrow
  fill(PURPLE_THEME);
  noStroke();
  let arrowX = ddBtnX + dropdownW - 15;
  let arrowY = dropdownY + dropdownH / 2;
  if (dropdownOpen) {
    triangle(arrowX - 5, arrowY + 3, arrowX + 5, arrowY + 3, arrowX, arrowY - 5);
  } else {
    triangle(arrowX - 5, arrowY - 3, arrowX + 5, arrowY - 3, arrowX, arrowY + 5);
  }

  // Dropdown options
  if (dropdownOpen) {
    for (let i = 0; i < functionOptions.length; i++) {
      let optY = dropdownY + dropdownH + i * dropdownH;
      fill(i === selectedFunction ? [230, 230, 250] : 255);
      stroke(180);
      strokeWeight(1);
      rect(ddBtnX, optY, dropdownW, dropdownH);

      fill(60);
      noStroke();
      textAlign(LEFT, CENTER);
      textSize(12);
      text(functionOptions[i].label, ddBtnX + 8, optY + dropdownH / 2);
    }
  }

  // Slider for a
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('a = ' + a.toFixed(1), aSliderX - 55, aSliderY + 10);

  // A slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(aSliderX, aSliderY, sliderWidth, 20, 10);

  // A slider fill
  let aFillWidth = map(a, -2, 5, 0, sliderWidth);
  fill(PURPLE_THEME);
  noStroke();
  rect(aSliderX, aSliderY, aFillWidth, 20, 10, 0, 0, 10);

  // A slider handle
  let aHandleX = aSliderX + aFillWidth;
  fill(255);
  stroke(PURPLE_THEME);
  strokeWeight(2);
  circle(aHandleX, aSliderY + 10, 22);

  fill(PURPLE_THEME);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(a.toFixed(1), aHandleX, aSliderY + 10);

  // Slider for b
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('b = ' + b.toFixed(1), bSliderX - 55, bSliderY + 10);

  // B slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(bSliderX, bSliderY, sliderWidth, 20, 10);

  // B slider fill
  let bFillWidth = map(b, -2, 5, 0, sliderWidth);
  fill(PURPLE_THEME);
  noStroke();
  rect(bSliderX, bSliderY, bFillWidth, 20, 10, 0, 0, 10);

  // B slider handle
  let bHandleX = bSliderX + bFillWidth;
  fill(255);
  stroke(PURPLE_THEME);
  strokeWeight(2);
  circle(bHandleX, bSliderY + 10, 22);

  fill(PURPLE_THEME);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(b.toFixed(1), bHandleX, bSliderY + 10);

  // Show Rectangle button
  let canShowRect = currentStage === 1;
  fill(canShowRect ? '#4CAF50' : '#cccccc');
  stroke(canShowRect ? '#388E3C' : '#aaaaaa');
  strokeWeight(1);
  rect(showRectBtnX, showRectBtnY, btnW, btnH, 5);

  fill(canShowRect ? 'white' : '#888888');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Show Rectangle', showRectBtnX + btnW / 2, showRectBtnY + btnH / 2);

  // Animate button
  let canAnimate = currentStage >= 2;
  fill(canAnimate ? '#2196F3' : '#cccccc');
  stroke(canAnimate ? '#1976D2' : '#aaaaaa');
  strokeWeight(1);
  rect(animateBtnX, animateBtnY, btnW, btnH, 5);

  fill(canAnimate ? 'white' : '#888888');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(showAnimation ? 'Animating...' : 'Animate Height', animateBtnX + btnW / 2, animateBtnY + btnH / 2);

  // Reset button
  fill('#ff9800');
  stroke('#f57c00');
  strokeWeight(1);
  rect(resetBtnX, resetBtnY, 80, btnH, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Reset', resetBtnX + 40, resetBtnY + btnH / 2);

  // Verify Areas button
  let verifyBtnX = resetBtnX;
  let verifyBtnY = animateBtnY;
  let canVerify = currentStage === 2;
  fill(canVerify ? MATCH_COLOR : '#cccccc');
  stroke(canVerify ? [0, 140, 60] : '#aaaaaa');
  strokeWeight(1);
  rect(verifyBtnX, verifyBtnY, 80, btnH, 5);

  fill(canVerify ? 'white' : '#888888');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Verify Areas', verifyBtnX + 40, verifyBtnY + btnH / 2);

  // Stage indicator
  let stageX = canvasWidth - 180;
  let stageY = drawHeight + 90;

  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Stage: ' + currentStage + '/3', stageX, stageY);

  // Stage circles
  for (let i = 1; i <= 3; i++) {
    let cx = stageX + 70 + (i - 1) * 30;
    fill(i <= currentStage ? PURPLE_THEME : 220);
    stroke(i <= currentStage ? [100, 0, 100] : 180);
    strokeWeight(1);
    circle(cx, stageY, 20);

    fill(i <= currentStage ? 'white' : 100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(i, cx, stageY);
  }
}

function getYMax() {
  let fn = functionOptions[selectedFunction].fn;
  let maxY = 1;

  // Sample the function to find max value
  for (let x = Math.min(a, 0); x <= Math.max(b, 3); x += 0.1) {
    let y = fn(x);
    if (isFinite(y) && !isNaN(y)) {
      maxY = Math.max(maxY, y);
    }
  }

  return Math.min(maxY * 1.2, 10);  // Cap at 10 for display
}

function mapX(val, xMin, xMax) {
  return map(val, xMin, xMax, chartLeft, chartRight);
}

function mapY(val, yMin, yMax) {
  return map(val, yMin, yMax, chartBottom, chartTop);
}

function unmapX(px, xMin, xMax) {
  return map(px, chartLeft, chartRight, xMin, xMax);
}

function mousePressed() {
  // Check dropdown
  let ddBtnX = dropdownX + 60;

  if (dropdownOpen) {
    // Check dropdown options
    for (let i = 0; i < functionOptions.length; i++) {
      let optY = dropdownY + dropdownH + i * dropdownH;
      if (mouseX >= ddBtnX && mouseX <= ddBtnX + dropdownW &&
          mouseY >= optY && mouseY <= optY + dropdownH) {
        selectedFunction = i;
        dropdownOpen = false;
        currentStage = 1;
        animationProgress = 0;
        return;
      }
    }
    dropdownOpen = false;
    return;
  }

  // Check dropdown button
  if (mouseX >= ddBtnX && mouseX <= ddBtnX + dropdownW &&
      mouseY >= dropdownY && mouseY <= dropdownY + dropdownH) {
    dropdownOpen = !dropdownOpen;
    return;
  }

  // Check A slider
  let aFillWidth = map(a, -2, 5, 0, sliderWidth);
  let aHandleX = aSliderX + aFillWidth;
  if (dist(mouseX, mouseY, aHandleX, aSliderY + 10) < 15) {
    draggingA = true;
    return;
  }

  if (mouseX >= aSliderX && mouseX <= aSliderX + sliderWidth &&
      mouseY >= aSliderY && mouseY <= aSliderY + 20) {
    updateAFromMouse();
    draggingA = true;
    return;
  }

  // Check B slider
  let bFillWidth = map(b, -2, 5, 0, sliderWidth);
  let bHandleX = bSliderX + bFillWidth;
  if (dist(mouseX, mouseY, bHandleX, bSliderY + 10) < 15) {
    draggingB = true;
    return;
  }

  if (mouseX >= bSliderX && mouseX <= bSliderX + sliderWidth &&
      mouseY >= bSliderY && mouseY <= bSliderY + 20) {
    updateBFromMouse();
    draggingB = true;
    return;
  }

  // Check Show Rectangle button
  if (mouseX >= showRectBtnX && mouseX <= showRectBtnX + btnW &&
      mouseY >= showRectBtnY && mouseY <= showRectBtnY + btnH) {
    if (currentStage === 1) {
      currentStage = 2;
    }
    return;
  }

  // Check Animate button
  if (mouseX >= animateBtnX && mouseX <= animateBtnX + btnW &&
      mouseY >= animateBtnY && mouseY <= animateBtnY + btnH) {
    if (currentStage >= 2 && !showAnimation) {
      showAnimation = true;
      animationProgress = 0;
    }
    return;
  }

  // Check Reset button
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 80 &&
      mouseY >= resetBtnY && mouseY <= resetBtnY + btnH) {
    currentStage = 1;
    animationProgress = 0;
    showAnimation = false;
    return;
  }

  // Check Verify Areas button
  let verifyBtnX = resetBtnX;
  let verifyBtnY = animateBtnY;
  if (mouseX >= verifyBtnX && mouseX <= verifyBtnX + 80 &&
      mouseY >= verifyBtnY && mouseY <= verifyBtnY + btnH) {
    if (currentStage === 2) {
      currentStage = 3;
    }
    return;
  }
}

function mouseDragged() {
  if (draggingA) {
    updateAFromMouse();
  }
  if (draggingB) {
    updateBFromMouse();
  }
}

function mouseReleased() {
  draggingA = false;
  draggingB = false;
}

function updateAFromMouse() {
  let rawVal = map(mouseX, aSliderX, aSliderX + sliderWidth, -2, 5);
  a = constrain(rawVal, -2, b - 0.5);  // Ensure a < b
  a = Math.round(a * 10) / 10;

  // Reset to stage 1 when interval changes
  if (currentStage > 1) {
    currentStage = 1;
    animationProgress = 0;
  }
}

function updateBFromMouse() {
  let rawVal = map(mouseX, bSliderX, bSliderX + sliderWidth, -2, 5);
  b = constrain(rawVal, a + 0.5, 5);  // Ensure b > a
  b = Math.round(b * 10) / 10;

  // Reset to stage 1 when interval changes
  if (currentStage > 1) {
    currentStage = 1;
    animationProgress = 0;
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
  canvasWidth = max(canvasWidth, 650);  // Minimum width
  updateLayoutPositions();
}
