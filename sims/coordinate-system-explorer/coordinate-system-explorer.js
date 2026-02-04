/// <reference types="p5/global" />
// Coordinate System Explorer MicroSim
// Learning Objective: Students will identify points in the coordinate plane
// and name the quadrant where each point lies.
// Bloom Level: Remember (L1)

let canvasWidth = 500;
let drawHeight = 410;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let verticalTranslate = 15;  // Vertical offset for drawing area content
let defaultTextSize = 16;

// Coordinate system
let gridSize = 40;
let originX, originY;
let xRange = 5;
let yRange = 4;

// Current point
let pointX = 0;
let pointY = 0;
let showPoint = true;
let isDraggingPoint = false;

// Quiz mode
let quizMode = false;
let quizPoint = { x: 0, y: 0 };
let quizAnswer = '';
let showQuizFeedback = false;
let quizCorrect = false;
let quizCorrectCount = 0;
let quizTotalTries = 0;

// Button positions
let quizBtnX, quizBtnY, quizBtnW, quizBtnH;

// Celebration animation particles
let celebrationParticles = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth / 2;
  originY = drawHeight / 2;

  updateButtonPositions();

  describe('Coordinate System Explorer: Click to place a point or drag to move it. See coordinates and quadrant.', LABEL);
}

function updateButtonPositions() {
  originX = canvasWidth / 2;
  quizBtnX = canvasWidth / 2 - 60;
  quizBtnY = drawHeight + 12;
  quizBtnW = 120;
  quizBtnH = 28;
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

  // Draw the items in the center of the drawing area
  push();
  translate(0, verticalTranslate);
  // Draw grid and axes
  drawGrid();
  drawAxes();

  // Draw quadrant labels
  drawQuadrantLabels();

  // Draw current point
  if (showPoint && !quizMode) {
    drawPoint(pointX, pointY, color(255, 100, 100));
  }
  pop();

  // Quiz mode - show the target point only after answering (inside translate block)
  if (quizMode && showQuizFeedback) {
    push();
    translate(0, verticalTranslate);
    drawPoint(quizPoint.x, quizPoint.y, quizCorrect ? color(100, 200, 100) : color(200, 100, 100));
    pop();
  }

  // Quiz prompt and feedback
  if (quizMode) {
    drawQuizPrompt();
    drawQuizFeedback();
    drawQuizScore();
  }

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Coordinate System Explorer', canvasWidth / 2, 8);

  // Draw controls
  drawControls();

  // Show coordinates
  if (!quizMode) {
    drawCoordinateInfo();
  }

  // Draw celebration particles (on top of everything)
  updateAndDrawCelebration();
}

function drawGrid() {
  stroke(220);
  strokeWeight(1);

  // Vertical grid lines
  for (let x = -xRange; x <= xRange; x++) {
    let screenX = originX + x * gridSize;
    line(screenX, margin, screenX, drawHeight - margin);
  }

  // Horizontal grid lines
  for (let y = -yRange; y <= yRange; y++) {
    let screenY = originY - y * gridSize;
    line(margin, screenY, canvasWidth - margin, screenY);
  }
}

function drawAxes() {
  stroke(0);
  strokeWeight(2);

  // X-axis
  line(margin, originY, canvasWidth - margin, originY);
  // Arrow head
  triangle(canvasWidth - margin, originY, canvasWidth - margin - 10, originY - 5, canvasWidth - margin - 10, originY + 5);

  // Y-axis
  line(originX, drawHeight - margin, originX, margin);
  // Arrow head
  triangle(originX, margin, originX - 5, margin + 10, originX + 5, margin + 10);

  // Axis labels
  fill('black');
  noStroke();
  textSize(16);
  textAlign(CENTER, TOP);
  text('x', canvasWidth - margin + 5, originY + 5);
  textAlign(LEFT, CENTER);
  text('y', originX + 8, margin);

  // Tick marks and numbers
  textSize(12);
  textAlign(CENTER, TOP);
  for (let x = -xRange; x <= xRange; x++) {
    if (x !== 0) {
      let screenX = originX + x * gridSize;
      stroke(0);
      strokeWeight(1);
      line(screenX, originY - 5, screenX, originY + 5);
      noStroke();
      text(x, screenX, originY + 8);
    }
  }

  textAlign(RIGHT, CENTER);
  for (let y = -yRange; y <= yRange; y++) {
    if (y !== 0) {
      let screenY = originY - y * gridSize;
      stroke(0);
      strokeWeight(1);
      line(originX - 5, screenY, originX + 5, screenY);
      noStroke();
      text(y, originX - 8, screenY);
    }
  }

  // Origin label
  textAlign(RIGHT, TOP);
  text('0', originX - 5, originY + 5);
}

function drawQuadrantLabels() {
  fill(100, 100, 100, 100);
  noStroke();
  textSize(24);

  textAlign(CENTER, CENTER);
  text('I', originX + (canvasWidth - originX - margin) / 2, margin + (originY - margin) / 2);
  text('II', margin + (originX - margin) / 2, margin + (originY - margin) / 2);
  text('III', margin + (originX - margin) / 2, originY + (drawHeight - margin - originY) / 2);
  text('IV', originX + (canvasWidth - originX - margin) / 2, originY + (drawHeight - margin - originY) / 2);
}

function drawPoint(x, y, c) {
  let screenX = originX + x * gridSize;
  let screenY = originY - y * gridSize;

  // Point
  fill(c);
  stroke(0);
  strokeWeight(2);
  circle(screenX, screenY, 16);

  // Dashed lines to axes
  stroke(c);
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(screenX, screenY, screenX, originY);
  line(screenX, screenY, originX, screenY);
  drawingContext.setLineDash([]);
}

function drawCoordinateInfo() {
  // Info box
  let boxW = 160;
  let boxH = 60;
  let boxX = canvasWidth - boxW - 10;
  let boxY = 35;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 8);

  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text('Point: (' + pointX + ', ' + pointY + ')', boxX + 10, boxY + 10);
  text('Quadrant: ' + getQuadrant(pointX, pointY), boxX + 10, boxY + 35);
}

function getQuadrant(x, y) {
  if (x === 0 || y === 0) {
    if (x === 0 && y === 0) return 'Origin';
    if (x === 0) return 'Y-axis';
    return 'X-axis';
  }
  if (x > 0 && y > 0) return 'I';
  if (x < 0 && y > 0) return 'II';
  if (x < 0 && y < 0) return 'III';
  return 'IV';
}

function drawQuizPrompt() {
  // Show the coordinates and ask user to click on that location
  let boxW = 180;
  let boxH = 55;
  let boxX = 10;
  let boxY = 35;

  fill(255, 255, 255, 240);
  stroke(50, 100, 200);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  fill('black');
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text('Click on the point:', boxX + 10, boxY + 10);

  // Show target coordinates prominently
  fill(50, 100, 200);
  textSize(20);
  textAlign(CENTER, TOP);
  text('(' + quizPoint.x + ', ' + quizPoint.y + ')', boxX + boxW/2, boxY + 30);
}

function drawQuizFeedback() {
  if (showQuizFeedback) {
    let boxW = 140;
    let boxH = 40;
    let boxX = canvasWidth - boxW - 10;
    let boxY = 40;

    fill(quizCorrect ? color(200, 255, 200) : color(255, 200, 200));
    stroke(quizCorrect ? color(100, 200, 100) : color(200, 100, 100));
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 8);

    fill('black');
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(quizCorrect ? 'Correct!' : 'Try again!', boxX + boxW/2, boxY + boxH/2);
  }
}

function drawQuizScore() {
  // Score display in lower right corner of drawing area
  fill('black');
  noStroke();
  textSize(14);
  textAlign(RIGHT, BOTTOM);
  text('Score: ' + quizCorrectCount + ' / ' + quizTotalTries, canvasWidth - 10, drawHeight - 10);
}

function drawControls() {
  // Quiz mode toggle button
  let label = quizMode ? 'Exit Quiz' : 'Quiz Mode';
  let bgColor = quizMode ? '#f44336' : '#4CAF50';

  fill(bgColor);
  stroke('#999');
  strokeWeight(1);
  rect(quizBtnX, quizBtnY, quizBtnW, quizBtnH, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(label, quizBtnX + quizBtnW/2, quizBtnY + quizBtnH/2);

  // Instructions
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(12);
  if (quizMode) {
    text('Click on the grid at the given coordinates', 10, drawHeight + 27);
  } else {
    text('Click to place or drag to move point', 10, drawHeight + 27);
  }
}

function mousePressed() {
  // Check quiz button
  if (mouseX >= quizBtnX && mouseX <= quizBtnX + quizBtnW &&
      mouseY >= quizBtnY && mouseY <= quizBtnY + quizBtnH) {
    toggleQuizMode();
    return;
  }

  // Check if click is in drawing area (account for verticalTranslate offset)
  let adjustedMouseY = mouseY - verticalTranslate;
  if (adjustedMouseY >= margin && adjustedMouseY <= drawHeight - margin &&
      mouseX >= margin && mouseX <= canvasWidth - margin) {

    if (quizMode) {
      // Check answer - user clicks where they think the coordinates are
      let clickX = Math.round((mouseX - originX) / gridSize);
      let clickY = Math.round((originY - adjustedMouseY) / gridSize);

      quizCorrect = (clickX === quizPoint.x && clickY === quizPoint.y);
      showQuizFeedback = true;
      quizTotalTries++;

      // Trigger celebration if correct
      if (quizCorrect) {
        quizCorrectCount++;
        createCelebration(canvasWidth / 2, drawHeight / 2);
      }

      // Generate new quiz after delay (longer if wrong to see correct location)
      setTimeout(() => {
        generateQuizPoint();
        showQuizFeedback = false;
      }, quizCorrect ? 1500 : 2000);
    } else {
      // Check if clicking on existing point (for dragging)
      if (showPoint) {
        let pointScreenX = originX + pointX * gridSize;
        let pointScreenY = originY - pointY * gridSize + verticalTranslate;
        if (dist(mouseX, mouseY, pointScreenX, pointScreenY) < 15) {
          isDraggingPoint = true;
          return;
        }
      }

      // Place new point
      pointX = Math.round((mouseX - originX) / gridSize);
      pointY = Math.round((originY - adjustedMouseY) / gridSize);

      // Constrain to visible range
      pointX = constrain(pointX, -xRange, xRange);
      pointY = constrain(pointY, -yRange, yRange);
      showPoint = true;
    }
  }
}

function mouseDragged() {
  if (isDraggingPoint && !quizMode) {
    // Update point position while dragging (account for verticalTranslate offset)
    let adjustedMouseY = mouseY - verticalTranslate;
    pointX = Math.round((mouseX - originX) / gridSize);
    pointY = Math.round((originY - adjustedMouseY) / gridSize);

    // Constrain to visible range
    pointX = constrain(pointX, -xRange, xRange);
    pointY = constrain(pointY, -yRange, yRange);
  }
}

function mouseReleased() {
  isDraggingPoint = false;
}

function toggleQuizMode() {
  quizMode = !quizMode;
  showQuizFeedback = false;
  if (quizMode) {
    // Reset score when entering quiz mode
    quizCorrectCount = 0;
    quizTotalTries = 0;
    generateQuizPoint();
  }
}

function generateQuizPoint() {
  quizPoint.x = Math.floor(random(-xRange, xRange + 1));
  quizPoint.y = Math.floor(random(-yRange, yRange + 1));
  showQuizFeedback = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateButtonPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  gridSize = Math.min(40, (canvasWidth - 2 * margin) / (2 * xRange + 1));
  updateButtonPositions();
}

// ============================================
// Celebration Animation - Red Dot Explosion
// ============================================

function createCelebration(centerX, centerY) {
  // Create particles exploding outward from center
  let numParticles = 30;
  for (let i = 0; i < numParticles; i++) {
    let angle = random(TWO_PI);
    let speed = random(3, 8);
    let size = random(8, 16);
    celebrationParticles.push({
      x: centerX,
      y: centerY,
      vx: cos(angle) * speed,
      vy: sin(angle) * speed,
      size: size,
      alpha: 255,
      decay: random(3, 6),
      hue: random(-20, 20)  // Slight color variation around red
    });
  }
}

function updateAndDrawCelebration() {
  // Update and draw each particle
  for (let i = celebrationParticles.length - 1; i >= 0; i--) {
    let p = celebrationParticles[i];

    // Update position
    p.x += p.vx;
    p.y += p.vy;

    // Add gravity effect
    p.vy += 0.15;

    // Fade out
    p.alpha -= p.decay;

    // Draw particle
    noStroke();
    fill(255, 80 + p.hue, 80 + p.hue, p.alpha);
    circle(p.x, p.y, p.size);

    // Add a subtle glow effect
    fill(255, 100 + p.hue, 100 + p.hue, p.alpha * 0.3);
    circle(p.x, p.y, p.size * 1.5);

    // Remove faded particles
    if (p.alpha <= 0) {
      celebrationParticles.splice(i, 1);
    }
  }
}
