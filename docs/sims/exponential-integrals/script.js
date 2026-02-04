// Exponential Integrals MicroSim
// Demonstrate how the integral of a^x depends on base a and why dividing by ln(a) is necessary
// Bloom Level: Apply (L3), Verbs: apply, calculate, compute
// Learning Objective: Students will apply the formula integral of a^x dx = a^x / ln(a) + C

let canvasWidth = 750;
let drawHeight = 520;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;
let defaultTextSize = 16;

// Chart layout
let chartTop = 70;
let chartLeft = 60;
let chartRight;
let chartBottom;
let chartWidth;
let chartHeight;

// Color scheme (purple theme)
const FUNCTION_COLOR = [50, 100, 230];     // Blue for f(x) = a^x
const ANTIDERIV_COLOR = [230, 100, 50];    // Orange for F(x) = a^x / ln(a)
const TANGENT_COLOR = [0, 150, 80];        // Green for tangent line
const PURPLE_THEME = [128, 0, 128];        // Purple for theme accents
const SPECIAL_COLOR = [200, 50, 200];      // Magenta for e special case

// State
let baseA = 2;               // Current base value
let showDerivVerify = false; // Toggle derivative verification
let pointX = 1;              // Point on curve for tangent
let draggingBaseSlider = false;
let draggingPointSlider = false;

// Animation
let animationPhase = 0;

// Slider positions
let baseSliderX, baseSliderY, baseSliderWidth;
let pointSliderX, pointSliderY, pointSliderWidth;
let toggleBtnX, toggleBtnY, toggleBtnW, toggleBtnH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);
  updateLayoutPositions();

  describe('Interactive visualization showing exponential integrals and why dividing by ln(a) is necessary, with tangent line verification.', LABEL);
}

function updateLayoutPositions() {
  chartRight = canvasWidth - 40;
  chartBottom = drawHeight - 40;
  chartWidth = chartRight - chartLeft;
  chartHeight = chartBottom - chartTop;

  // Base slider
  baseSliderX = 120;
  baseSliderY = drawHeight + 25;
  baseSliderWidth = 200;

  // Point slider
  pointSliderX = 120;
  pointSliderY = drawHeight + 65;
  pointSliderWidth = 200;

  // Toggle button
  toggleBtnX = baseSliderX + baseSliderWidth + 40;
  toggleBtnY = drawHeight + 15;
  toggleBtnW = 180;
  toggleBtnH = 70;
}

function draw() {
  updateCanvasSize();
  animationPhase += 0.03;

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
  drawCurves();
  drawFormulaDisplay();
  drawControls();

  if (showDerivVerify) {
    drawTangentLine();
  }
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Exponential Integrals: Why We Divide by ln(a)', canvasWidth / 2, 8);

  textSize(14);
  fill(100);

  // Check if base is close to e
  let isSpecialCase = abs(baseA - Math.E) < 0.05;

  if (isSpecialCase) {
    fill(SPECIAL_COLOR);
    text('Special Case: a = e, so ln(a) = 1 and integral of e^x dx = e^x + C', canvasWidth / 2, 32);
  } else {
    let lnA = Math.log(baseA);
    text('\u222B a^x dx = a^x / ln(a) + C    (ln(' + baseA.toFixed(2) + ') = ' + lnA.toFixed(3) + ')', canvasWidth / 2, 32);
  }
}

function drawAxes() {
  stroke(150);
  strokeWeight(1);

  // Grid lines
  fill(220);
  for (let x = -4; x <= 4; x++) {
    let screenX = mapX(x);
    if (screenX > chartLeft && screenX < chartRight) {
      stroke(230);
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

  for (let y = -2; y <= 8; y += 2) {
    let screenY = mapY(y);
    if (screenY > chartTop && screenY < chartBottom) {
      stroke(230);
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
  let yZero = mapY(0);
  if (yZero > chartTop && yZero < chartBottom) {
    line(chartLeft, yZero, chartRight, yZero);
  }

  // Y-axis
  let xZero = mapX(0);
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

function drawCurves() {
  let lnA = Math.log(baseA);
  let isSpecialCase = abs(baseA - Math.E) < 0.05;

  // Draw f(x) = a^x (the function we're integrating)
  stroke(FUNCTION_COLOR);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = -4; px <= 4; px += 0.05) {
    let y = Math.pow(baseA, px);
    let screenX = mapX(px);
    let screenY = mapY(y);
    if (screenY > chartTop - 10 && screenY < chartBottom + 10 &&
        screenX > chartLeft && screenX < chartRight) {
      vertex(screenX, constrain(screenY, chartTop, chartBottom));
    }
  }
  endShape();

  // Draw F(x) = a^x / ln(a) (the antiderivative)
  if (abs(lnA) > 0.001) {
    stroke(ANTIDERIV_COLOR);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let px = -4; px <= 4; px += 0.05) {
      let y = Math.pow(baseA, px) / lnA;
      let screenX = mapX(px);
      let screenY = mapY(y);
      if (screenY > chartTop - 10 && screenY < chartBottom + 10 &&
          screenX > chartLeft && screenX < chartRight) {
        vertex(screenX, constrain(screenY, chartTop, chartBottom));
      }
    }
    endShape();
  }

  // Legend
  let legendX = chartRight - 180;
  let legendY = chartTop + 10;

  fill(255, 255, 255, 220);
  stroke(180);
  strokeWeight(1);
  rect(legendX, legendY, 170, 55, 5);

  // f(x) legend
  fill(FUNCTION_COLOR);
  noStroke();
  rect(legendX + 10, legendY + 12, 20, 3);
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(12);
  text('f(x) = ' + baseA.toFixed(2) + '^x', legendX + 35, legendY + 14);

  // F(x) legend
  fill(ANTIDERIV_COLOR);
  noStroke();
  rect(legendX + 10, legendY + 32, 20, 3);
  fill(60);
  textSize(12);
  if (isSpecialCase) {
    text('F(x) = e^x', legendX + 35, legendY + 34);
  } else {
    text('F(x) = ' + baseA.toFixed(2) + '^x / ' + lnA.toFixed(3), legendX + 35, legendY + 34);
  }

  // Special case highlight
  if (isSpecialCase) {
    let pulse = sin(animationPhase * 3) * 0.3 + 0.7;
    fill(SPECIAL_COLOR[0], SPECIAL_COLOR[1], SPECIAL_COLOR[2], pulse * 60);
    noStroke();
    rect(legendX - 5, legendY - 5, 180, 65, 8);

    fill(SPECIAL_COLOR);
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text('ln(e) = 1, so curves overlap!', legendX + 85, legendY + 52);
  }
}

function drawTangentLine() {
  let lnA = Math.log(baseA);
  if (abs(lnA) < 0.001) return;

  // Calculate F(x) and its derivative at pointX
  let Fx = Math.pow(baseA, pointX) / lnA;
  let fx = Math.pow(baseA, pointX);  // The derivative of F(x) is f(x) = a^x

  // Draw tangent line
  stroke(TANGENT_COLOR);
  strokeWeight(2);

  let x1 = pointX - 2;
  let y1 = Fx + fx * (x1 - pointX);
  let x2 = pointX + 2;
  let y2 = Fx + fx * (x2 - pointX);

  let sx1 = mapX(x1), sy1 = mapY(y1);
  let sx2 = mapX(x2), sy2 = mapY(y2);

  // Clip to chart area
  sx1 = constrain(sx1, chartLeft, chartRight);
  sx2 = constrain(sx2, chartLeft, chartRight);
  sy1 = constrain(sy1, chartTop, chartBottom);
  sy2 = constrain(sy2, chartTop, chartBottom);

  line(sx1, sy1, sx2, sy2);

  // Draw point on F(x) curve
  let pointScreenX = mapX(pointX);
  let pointScreenY = mapY(Fx);

  if (pointScreenY > chartTop && pointScreenY < chartBottom) {
    fill(TANGENT_COLOR);
    noStroke();
    circle(pointScreenX, pointScreenY, 12);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(8);
    text('P', pointScreenX, pointScreenY);
  }

  // Draw corresponding point on f(x) curve to show slope
  let fxScreenY = mapY(fx);
  if (fxScreenY > chartTop && fxScreenY < chartBottom) {
    fill(FUNCTION_COLOR);
    stroke(255);
    strokeWeight(2);
    circle(pointScreenX, fxScreenY, 10);
  }

  // Display verification info
  let infoX = chartLeft + 10;
  let infoY = chartBottom - 90;

  fill(255, 255, 255, 230);
  stroke(TANGENT_COLOR);
  strokeWeight(2);
  rect(infoX, infoY, 200, 85, 5);

  fill(60);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Derivative Verification at x = ' + pointX.toFixed(2), infoX + 10, infoY + 8);

  textSize(10);
  fill(ANTIDERIV_COLOR);
  text('F(' + pointX.toFixed(2) + ') = ' + Fx.toFixed(3), infoX + 10, infoY + 28);

  fill(FUNCTION_COLOR);
  text('f(' + pointX.toFixed(2) + ') = a^x = ' + fx.toFixed(3), infoX + 10, infoY + 43);

  fill(TANGENT_COLOR);
  text('Tangent slope = ' + fx.toFixed(3), infoX + 10, infoY + 58);

  fill(0, 150, 80);
  textSize(10);
  text("F'(x) = f(x) \u2713", infoX + 10, infoY + 73);
}

function drawFormulaDisplay() {
  let lnA = Math.log(baseA);
  let isSpecialCase = abs(baseA - Math.E) < 0.05;

  // Formula box
  let boxX = chartLeft + 10;
  let boxY = chartTop + 10;
  let boxW = 220;
  let boxH = 95;

  fill(255, 255, 255, 240);
  stroke(PURPLE_THEME);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  fill(PURPLE_THEME);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Current Formula:', boxX + 10, boxY + 8);
  textStyle(NORMAL);

  textSize(11);
  fill(60);

  if (isSpecialCase) {
    text('\u222B e^x dx = e^x + C', boxX + 10, boxY + 28);

    fill(SPECIAL_COLOR);
    textSize(10);
    text('Because ln(e) = 1', boxX + 10, boxY + 48);
    text('this is the simplest case!', boxX + 10, boxY + 62);
  } else {
    text('\u222B ' + baseA.toFixed(2) + '^x dx', boxX + 10, boxY + 28);
    text('= ' + baseA.toFixed(2) + '^x / ln(' + baseA.toFixed(2) + ') + C', boxX + 10, boxY + 44);
    text('= ' + baseA.toFixed(2) + '^x / ' + lnA.toFixed(4) + ' + C', boxX + 10, boxY + 60);
  }

  // Show ln(a) value prominently
  textAlign(LEFT, TOP);
  textSize(10);
  fill(100);
  text('ln(' + baseA.toFixed(2) + ') = ' + lnA.toFixed(4), boxX + 10, boxY + 78);
}

function drawControls() {
  // Base slider label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Base a:', 20, baseSliderY + 10);

  // Base slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(baseSliderX, baseSliderY, baseSliderWidth, 20, 10);

  // Base slider fill
  let baseFillWidth = map(baseA, 0.5, 5, 0, baseSliderWidth);
  fill(PURPLE_THEME);
  noStroke();
  rect(baseSliderX, baseSliderY, baseFillWidth, 20, 10, 0, 0, 10);

  // Base slider handle
  let baseHandleX = baseSliderX + baseFillWidth;
  fill(255);
  stroke(PURPLE_THEME);
  strokeWeight(2);
  circle(baseHandleX, baseSliderY + 10, 24);

  // Highlight if near e
  let isNearE = abs(baseA - Math.E) < 0.1;
  if (isNearE) {
    let pulse = sin(animationPhase * 4) * 0.5 + 0.5;
    stroke(SPECIAL_COLOR[0], SPECIAL_COLOR[1], SPECIAL_COLOR[2], pulse * 255);
    strokeWeight(3);
    noFill();
    circle(baseHandleX, baseSliderY + 10, 30);
  }

  fill(PURPLE_THEME);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(baseA.toFixed(2), baseHandleX, baseSliderY + 10);

  // "e" marker on slider
  let ePosition = baseSliderX + map(Math.E, 0.5, 5, 0, baseSliderWidth);
  stroke(SPECIAL_COLOR);
  strokeWeight(2);
  line(ePosition, baseSliderY - 5, ePosition, baseSliderY);
  fill(SPECIAL_COLOR);
  noStroke();
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text('e', ePosition, baseSliderY - 6);

  // Point slider (only when verification is on)
  if (showDerivVerify) {
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(13);
    text('Point x:', 20, pointSliderY + 10);

    // Point slider track
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(pointSliderX, pointSliderY, pointSliderWidth, 20, 10);

    // Point slider fill
    let pointFillWidth = map(pointX, -3, 3, 0, pointSliderWidth);
    fill(TANGENT_COLOR);
    noStroke();
    rect(pointSliderX, pointSliderY, pointFillWidth, 20, 10, 0, 0, 10);

    // Point slider handle
    let pointHandleX = pointSliderX + pointFillWidth;
    fill(255);
    stroke(TANGENT_COLOR);
    strokeWeight(2);
    circle(pointHandleX, pointSliderY + 10, 24);

    fill(TANGENT_COLOR);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(pointX.toFixed(2), pointHandleX, pointSliderY + 10);
  } else {
    // Instruction when toggle is off
    fill(120);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Enable verification to adjust point', 20, pointSliderY + 10);
  }

  // Toggle button for derivative verification
  let btnColor = showDerivVerify ? TANGENT_COLOR : [180, 180, 180];
  fill(btnColor);
  stroke(showDerivVerify ? [0, 120, 60] : [140, 140, 140]);
  strokeWeight(2);
  rect(toggleBtnX, toggleBtnY, toggleBtnW, toggleBtnH, 8);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Derivative Verification', toggleBtnX + toggleBtnW / 2, toggleBtnY + 20);
  textSize(14);
  textStyle(BOLD);
  text(showDerivVerify ? 'ON' : 'OFF', toggleBtnX + toggleBtnW / 2, toggleBtnY + 45);
  textStyle(NORMAL);

  // Info panel
  let infoX = toggleBtnX + toggleBtnW + 20;
  let infoY = toggleBtnY;
  let infoW = canvasWidth - infoX - 20;

  fill(245);
  stroke(200);
  strokeWeight(1);
  rect(infoX, infoY, infoW, toggleBtnH, 5);

  fill(60);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);

  let lnA = Math.log(baseA);
  text('Why divide by ln(a)?', infoX + 10, infoY + 8);
  textSize(9);
  fill(80);
  text('d/dx[a^x] = a^x \u00B7 ln(a)', infoX + 10, infoY + 24);
  text('So to "undo" this, we divide by ln(a):', infoX + 10, infoY + 38);
  text('d/dx[a^x / ln(a)] = a^x \u2713', infoX + 10, infoY + 52);
}

function mapX(x) {
  return map(x, -4, 4, chartLeft, chartRight);
}

function mapY(y) {
  return map(y, -2, 8, chartBottom, chartTop);
}

function mousePressed() {
  // Check base slider handle
  let baseFillWidth = map(baseA, 0.5, 5, 0, baseSliderWidth);
  let baseHandleX = baseSliderX + baseFillWidth;
  if (dist(mouseX, mouseY, baseHandleX, baseSliderY + 10) < 15) {
    draggingBaseSlider = true;
    return;
  }

  // Check base slider track
  if (mouseX >= baseSliderX && mouseX <= baseSliderX + baseSliderWidth &&
      mouseY >= baseSliderY && mouseY <= baseSliderY + 20) {
    updateBaseFromMouse();
    draggingBaseSlider = true;
    return;
  }

  // Check point slider (only if verification is on)
  if (showDerivVerify) {
    let pointFillWidth = map(pointX, -3, 3, 0, pointSliderWidth);
    let pointHandleX = pointSliderX + pointFillWidth;
    if (dist(mouseX, mouseY, pointHandleX, pointSliderY + 10) < 15) {
      draggingPointSlider = true;
      return;
    }

    if (mouseX >= pointSliderX && mouseX <= pointSliderX + pointSliderWidth &&
        mouseY >= pointSliderY && mouseY <= pointSliderY + 20) {
      updatePointFromMouse();
      draggingPointSlider = true;
      return;
    }
  }

  // Check toggle button
  if (mouseX >= toggleBtnX && mouseX <= toggleBtnX + toggleBtnW &&
      mouseY >= toggleBtnY && mouseY <= toggleBtnY + toggleBtnH) {
    showDerivVerify = !showDerivVerify;
    return;
  }
}

function mouseDragged() {
  if (draggingBaseSlider) {
    updateBaseFromMouse();
  }
  if (draggingPointSlider) {
    updatePointFromMouse();
  }
}

function mouseReleased() {
  draggingBaseSlider = false;
  draggingPointSlider = false;
}

function updateBaseFromMouse() {
  let rawVal = map(mouseX, baseSliderX, baseSliderX + baseSliderWidth, 0.5, 5);
  baseA = constrain(rawVal, 0.5, 5);

  // Snap to e if close
  if (abs(baseA - Math.E) < 0.1) {
    baseA = Math.E;
  }
}

function updatePointFromMouse() {
  let rawVal = map(mouseX, pointSliderX, pointSliderX + pointSliderWidth, -3, 3);
  pointX = constrain(rawVal, -3, 3);
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
