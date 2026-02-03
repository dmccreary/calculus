// Polynomial Explorer MicroSim
// Learning Objective: Students will examine how the degree and leading
// coefficient of a polynomial affect its shape and end behavior.
// Bloom Level: Analyze (L4)

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scale = 25;

// Polynomial parameters
let degree = 2;
let leadingCoeff = 1;
let coefficients = [0, 0, 1, 0, 0, 0]; // a0 + a1*x + a2*x^2 + ...

// Slider state
let degreeSliderX, leadingSliderX, sliderY, sliderW;
let isDraggingDegree = false;
let isDraggingLeading = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth / 2;
  originY = drawHeight / 2 + 30;

  updateSliderPositions();
  updateCoefficients();

  describe('Polynomial Explorer: Adjust the degree and leading coefficient to see how polynomial graphs behave.', LABEL);
}

function updateSliderPositions() {
  sliderY = drawHeight + 25;
  degreeSliderX = 100;
  leadingSliderX = 300;
  sliderW = 150;
}

function updateCoefficients() {
  // Reset all coefficients
  for (let i = 0; i < coefficients.length; i++) {
    coefficients[i] = 0;
  }
  // Set leading coefficient
  coefficients[degree] = leadingCoeff;
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

  // Draw coordinate system
  drawAxes();

  // Draw polynomial
  drawPolynomial();

  // Draw end behavior arrows
  drawEndBehavior();

  // Title and info
  drawTitle();
  drawInfo();

  // Draw controls
  drawControls();
}

function drawAxes() {
  // Grid
  stroke(230);
  strokeWeight(1);
  for (let i = -15; i <= 15; i++) {
    let x = originX + i * scale;
    let y = originY - i * scale;
    if (x > margin && x < canvasWidth - margin) {
      line(x, 30, x, drawHeight - 20);
    }
    if (y > 30 && y < drawHeight - 20) {
      line(margin, y, canvasWidth - margin, y);
    }
  }

  // Axes
  stroke(0);
  strokeWeight(2);
  line(margin, originY, canvasWidth - margin, originY);
  line(originX, 30, originX, drawHeight - 20);

  // Tick labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = -6; i <= 6; i += 2) {
    if (i !== 0) {
      let x = originX + i * scale;
      if (x > margin && x < canvasWidth - margin) {
        text(i, x, originY + 3);
      }
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = -6; i <= 6; i += 2) {
    if (i !== 0) {
      let y = originY - i * scale;
      if (y > 30 && y < drawHeight - 20) {
        text(i, originX - 5, y);
      }
    }
  }
}

function drawPolynomial() {
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = margin; px < canvasWidth - margin; px += 2) {
    let x = (px - originX) / scale;
    let y = evaluatePolynomial(x);

    if (!isNaN(y) && isFinite(y)) {
      let sy = originY - y * scale;
      if (sy > -100 && sy < drawHeight + 100) {
        vertex(px, constrain(sy, -50, drawHeight + 50));
      }
    }
  }
  endShape();

  // Mark zeros (roots)
  fill(255, 100, 100);
  stroke(0);
  strokeWeight(1);
  if (degree === 1) {
    // Linear: one root at x = 0 (for our simple case)
    let rootX = 0;
    circle(originX + rootX * scale, originY, 10);
  } else if (degree === 2 && leadingCoeff !== 0) {
    // For y = ax², root at x = 0
    circle(originX, originY, 10);
  } else if (degree === 3 && leadingCoeff !== 0) {
    circle(originX, originY, 10);
  }
}

function evaluatePolynomial(x) {
  let result = 0;
  for (let i = 0; i < coefficients.length; i++) {
    result += coefficients[i] * Math.pow(x, i);
  }
  return result;
}

function drawEndBehavior() {
  let arrowSize = 20;
  let arrowY1 = 60;  // Top arrows
  let arrowY2 = drawHeight - 40;  // Bottom arrows

  // Determine end behavior based on degree and leading coefficient
  let leftUp, rightUp;

  if (degree % 2 === 0) {
    // Even degree: both ends same direction
    leftUp = leadingCoeff > 0;
    rightUp = leadingCoeff > 0;
  } else {
    // Odd degree: opposite directions
    leftUp = leadingCoeff < 0;
    rightUp = leadingCoeff > 0;
  }

  // Left arrow
  let leftX = margin + 30;
  stroke(200, 100, 100);
  strokeWeight(3);
  if (leftUp) {
    line(leftX, arrowY1 + 30, leftX, arrowY1);
    line(leftX - 8, arrowY1 + 12, leftX, arrowY1);
    line(leftX + 8, arrowY1 + 12, leftX, arrowY1);
  } else {
    line(leftX, arrowY2 - 30, leftX, arrowY2);
    line(leftX - 8, arrowY2 - 12, leftX, arrowY2);
    line(leftX + 8, arrowY2 - 12, leftX, arrowY2);
  }

  // Right arrow
  let rightX = canvasWidth - margin - 30;
  if (rightUp) {
    line(rightX, arrowY1 + 30, rightX, arrowY1);
    line(rightX - 8, arrowY1 + 12, rightX, arrowY1);
    line(rightX + 8, arrowY1 + 12, rightX, arrowY1);
  } else {
    line(rightX, arrowY2 - 30, rightX, arrowY2);
    line(rightX - 8, arrowY2 - 12, rightX, arrowY2);
    line(rightX + 8, arrowY2 - 12, rightX, arrowY2);
  }

  // Labels
  fill(200, 100, 100);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('x → -∞', leftX, leftUp ? arrowY1 + 45 : arrowY2 - 45);
  text('x → +∞', rightX, rightUp ? arrowY1 + 45 : arrowY2 - 45);
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Polynomial Explorer', canvasWidth / 2, 5);

  // Polynomial equation
  textSize(16);
  let equation = formatPolynomial();
  text(equation, canvasWidth / 2, 28);
}

function formatPolynomial() {
  let terms = [];
  for (let i = coefficients.length - 1; i >= 0; i--) {
    if (coefficients[i] !== 0) {
      let coeff = coefficients[i];
      let term = '';

      if (i === 0) {
        term = coeff.toString();
      } else if (i === 1) {
        if (coeff === 1) term = 'x';
        else if (coeff === -1) term = '-x';
        else term = coeff + 'x';
      } else {
        if (coeff === 1) term = 'x^' + i;
        else if (coeff === -1) term = '-x^' + i;
        else term = coeff + 'x^' + i;
      }

      terms.push(term);
    }
  }

  if (terms.length === 0) return 'y = 0';
  return 'y = ' + terms.join(' ');
}

function drawInfo() {
  // Info box
  let boxX = canvasWidth - 180;
  let boxY = 50;
  let boxW = 170;
  let boxH = 90;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 8);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  text('Degree: ' + degree + ' (' + (degree % 2 === 0 ? 'even' : 'odd') + ')', boxX + 10, boxY + 10);
  text('Leading coeff: ' + leadingCoeff + ' (' + (leadingCoeff > 0 ? 'positive' : 'negative') + ')', boxX + 10, boxY + 28);

  // End behavior description
  let endBehavior = '';
  if (degree % 2 === 0) {
    endBehavior = leadingCoeff > 0 ? 'Both ends up ↗ ↖' : 'Both ends down ↘ ↙';
  } else {
    endBehavior = leadingCoeff > 0 ? 'Falls left, rises right' : 'Rises left, falls right';
  }
  text('End behavior:', boxX + 10, boxY + 50);
  text(endBehavior, boxX + 10, boxY + 68);
}

function drawControls() {
  // Degree slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Degree: ' + degree, 10, sliderY);

  let degreeHandleX = map(degree, 1, 5, degreeSliderX, degreeSliderX + sliderW);
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(degreeSliderX, sliderY - 4, sliderW, 8, 4);
  fill(isDraggingDegree ? '#0066cc' : '#0088ff');
  noStroke();
  circle(degreeHandleX, sliderY, 16);

  // Leading coefficient slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  text('Leading coeff: ' + leadingCoeff.toFixed(1), 210, sliderY);

  let leadingHandleX = map(leadingCoeff, -3, 3, leadingSliderX, leadingSliderX + sliderW);
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(leadingSliderX, sliderY - 4, sliderW, 8, 4);
  fill(isDraggingLeading ? '#0066cc' : '#0088ff');
  noStroke();
  circle(leadingHandleX, sliderY, 16);

  // Randomize button
  let randBtnX = canvasWidth - 100;
  fill('#FF9800');
  stroke('#F57C00');
  strokeWeight(1);
  rect(randBtnX, sliderY - 14, 90, 28, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Randomize', randBtnX + 45, sliderY);

  // End behavior prediction section
  let predY = drawHeight + 60;
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Quick Check: Degree ' + (degree % 2 === 0 ? 'even' : 'odd') + ' + leading coeff ' + (leadingCoeff > 0 ? 'positive' : 'negative') + ' = ?', 10, predY);
}

function mousePressed() {
  // Check degree slider
  let degreeHandleX = map(degree, 1, 5, degreeSliderX, degreeSliderX + sliderW);
  if (dist(mouseX, mouseY, degreeHandleX, sliderY) < 15) {
    isDraggingDegree = true;
    return;
  }

  // Check leading coeff slider
  let leadingHandleX = map(leadingCoeff, -3, 3, leadingSliderX, leadingSliderX + sliderW);
  if (dist(mouseX, mouseY, leadingHandleX, sliderY) < 15) {
    isDraggingLeading = true;
    return;
  }

  // Check randomize button
  let randBtnX = canvasWidth - 100;
  if (mouseX >= randBtnX && mouseX <= randBtnX + 90 &&
      mouseY >= sliderY - 14 && mouseY <= sliderY + 14) {
    degree = floor(random(1, 6));
    leadingCoeff = random(-3, 3);
    leadingCoeff = round(leadingCoeff * 10) / 10;
    if (abs(leadingCoeff) < 0.3) leadingCoeff = 1;
    updateCoefficients();
  }
}

function mouseDragged() {
  if (isDraggingDegree) {
    degree = round(map(mouseX, degreeSliderX, degreeSliderX + sliderW, 1, 5));
    degree = constrain(degree, 1, 5);
    updateCoefficients();
  }

  if (isDraggingLeading) {
    leadingCoeff = map(mouseX, leadingSliderX, leadingSliderX + sliderW, -3, 3);
    leadingCoeff = constrain(leadingCoeff, -3, 3);
    leadingCoeff = round(leadingCoeff * 10) / 10;
    if (leadingCoeff === 0) leadingCoeff = 0.1;
    updateCoefficients();
  }
}

function mouseReleased() {
  isDraggingDegree = false;
  isDraggingLeading = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateSliderPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  originX = canvasWidth / 2;
  updateSliderPositions();
}
