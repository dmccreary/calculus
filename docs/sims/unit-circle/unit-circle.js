// Interactive Unit Circle MicroSim
// Learning Objective: Students will explain the relationship between angles
// on the unit circle and the values of sine and cosine.
// Bloom Level: Understand (L2)

let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 30;
let defaultTextSize = 16;

// Unit circle parameters
let circleX = 0;
let circleY = 0;
let circleRadius = 140;

// Current angle (initialized in setup since PI is a p5.js constant)
let angle = 0;

// Sine/Cosine graph parameters
let graphX = 0;
let graphY = 0;
let graphW = 0;
let graphH = 0;

// Animation
let isAnimating = false;
let animSpeed = 0.02;

// Slider
let sliderX = 0;
let sliderY = 0;
let sliderW = 0;
let isDraggingSlider = false;
let isDraggingPoint = false;

// Display mode
let useRadians = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Initialize angle here since PI is only available after p5.js loads
  angle = PI / 4;  // 45 degrees

  updateLayout();

  describe('Interactive Unit Circle: Drag the point around the circle or use the slider to explore sine and cosine values.', LABEL);
}

function updateLayout() {
  circleX = canvasWidth * 0.28;
  circleY = drawHeight / 2;

  graphX = canvasWidth * 0.52;
  graphY = 60;
  graphW = canvasWidth * 0.42;
  graphH = drawHeight - 100;

  sliderX = 120;
  sliderY = drawHeight + 30;
  sliderW = canvasWidth - 250;
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
  textSize(18);
  text('Interactive Unit Circle', canvasWidth / 2, 5);

  // Draw unit circle
  drawUnitCircle();

  // Draw trig graphs
  drawTrigGraphs();

  // Draw info panel
  drawInfoPanel();

  // Draw controls
  drawControls();

  // Animation
  if (isAnimating) {
    angle += animSpeed;
    if (angle > TWO_PI) angle -= TWO_PI;
  }
}

function drawUnitCircle() {
  push();
  translate(circleX, circleY);

  // Axes
  stroke(200);
  strokeWeight(1);
  line(-circleRadius - 20, 0, circleRadius + 20, 0);
  line(0, -circleRadius - 20, 0, circleRadius + 20);

  // Axis labels
  fill('black');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('1', circleRadius + 5, 5);
  text('-1', -circleRadius - 10, 5);
  textAlign(RIGHT, CENTER);
  text('1', -5, -circleRadius - 5);
  text('-1', -5, circleRadius + 10);

  // Unit circle
  stroke(100);
  strokeWeight(2);
  noFill();
  circle(0, 0, circleRadius * 2);

  // Reference angles (30, 45, 60, 90 degrees markers)
  stroke(220);
  strokeWeight(1);
  let refAngles = [0, PI/6, PI/4, PI/3, PI/2, 2*PI/3, 3*PI/4, 5*PI/6, PI,
                   7*PI/6, 5*PI/4, 4*PI/3, 3*PI/2, 5*PI/3, 7*PI/4, 11*PI/6];
  for (let a of refAngles) {
    let x = cos(a) * circleRadius;
    let y = -sin(a) * circleRadius;
    line(0, 0, x * 0.9, y * 0.9);
  }

  // Current angle
  let px = cos(angle) * circleRadius;
  let py = -sin(angle) * circleRadius;

  // Angle arc
  stroke(100, 100, 200);
  strokeWeight(2);
  noFill();
  arc(0, 0, 50, 50, -angle, 0);

  // Radius line
  stroke(50);
  strokeWeight(2);
  line(0, 0, px, py);

  // Cosine projection (horizontal)
  stroke(50, 150, 50);
  strokeWeight(3);
  line(px, py, px, 0);
  line(0, 0, px, 0);

  // Sine projection (vertical)
  stroke(200, 50, 50);
  strokeWeight(3);
  line(px, py, 0, py);
  line(0, 0, 0, py);

  // Point on circle
  fill(50, 100, 200);
  stroke(0);
  strokeWeight(2);
  circle(px, py, 16);

  // Coordinate label
  fill('black');
  noStroke();
  textSize(12);
  textAlign(LEFT, BOTTOM);
  let cosVal = cos(angle).toFixed(3);
  let sinVal = sin(angle).toFixed(3);
  text('(' + cosVal + ', ' + sinVal + ')', px + 10, py - 5);

  // Sin/Cos labels on axes
  fill(50, 150, 50);
  textAlign(CENTER, TOP);
  text('cos θ', px/2, 5);
  fill(200, 50, 50);
  textAlign(LEFT, CENTER);
  text('sin θ', 5, py/2);

  pop();

  // Quadrant indicator
  let quadrant = getQuadrant(angle);
  fill('black');
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('Quadrant ' + quadrant, circleX, circleY + circleRadius + 30);
}

function getQuadrant(a) {
  a = a % TWO_PI;
  if (a < 0) a += TWO_PI;
  if (a < PI/2) return 'I';
  if (a < PI) return 'II';
  if (a < 3*PI/2) return 'III';
  return 'IV';
}

function drawTrigGraphs() {
  push();
  translate(graphX, graphY);

  // Background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(0, 0, graphW, graphH, 5);

  let midY = graphH / 2;
  let scaleY = graphH / 2.5;
  let scaleX = graphW / (2 * PI);

  // Grid
  stroke(230);
  strokeWeight(1);
  // Horizontal
  for (let y of [-1, -0.5, 0, 0.5, 1]) {
    line(0, midY - y * scaleY, graphW, midY - y * scaleY);
  }
  // Vertical (pi markers)
  for (let x = 0; x <= 2; x += 0.5) {
    line(x * PI * scaleX, 0, x * PI * scaleX, graphH);
  }

  // Axis labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(RIGHT, CENTER);
  text('1', -5, midY - scaleY);
  text('0', -5, midY);
  text('-1', -5, midY + scaleY);

  textAlign(CENTER, TOP);
  text('0', 0, graphH + 3);
  text('π/2', PI/2 * scaleX, graphH + 3);
  text('π', PI * scaleX, graphH + 3);
  text('3π/2', 3*PI/2 * scaleX, graphH + 3);
  text('2π', 2*PI * scaleX, graphH + 3);

  // Sine wave
  stroke(200, 50, 50);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let x = 0; x <= graphW; x += 2) {
    let a = x / scaleX;
    let y = midY - sin(a) * scaleY;
    vertex(x, y);
  }
  endShape();

  // Cosine wave
  stroke(50, 150, 50);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let x = 0; x <= graphW; x += 2) {
    let a = x / scaleX;
    let y = midY - cos(a) * scaleY;
    vertex(x, y);
  }
  endShape();

  // Current position markers
  let currentX = (angle % TWO_PI) * scaleX;

  // Sine marker
  fill(200, 50, 50);
  stroke(0);
  strokeWeight(1);
  let sinY = midY - sin(angle) * scaleY;
  circle(currentX, sinY, 10);

  // Cosine marker
  fill(50, 150, 50);
  let cosY = midY - cos(angle) * scaleY;
  circle(currentX, cosY, 10);

  // Vertical line at current angle
  stroke(100);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(currentX, 0, currentX, graphH);
  drawingContext.setLineDash([]);

  // Legend
  textSize(12);
  textAlign(LEFT, CENTER);
  fill(200, 50, 50);
  text('sin(θ)', graphW - 80, 15);
  fill(50, 150, 50);
  text('cos(θ)', graphW - 80, 30);

  pop();
}

function drawInfoPanel() {
  let panelX = 10;
  let panelY = 35;
  let panelW = 150;
  let panelH = 100;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  let degAngle = (angle * 180 / PI) % 360;
  let radAngle = angle % TWO_PI;

  text('θ = ' + degAngle.toFixed(1) + '°', panelX + 10, panelY + 10);
  text('θ = ' + radAngle.toFixed(3) + ' rad', panelX + 10, panelY + 28);

  fill(200, 50, 50);
  text('sin(θ) = ' + sin(angle).toFixed(4), panelX + 10, panelY + 52);

  fill(50, 150, 50);
  text('cos(θ) = ' + cos(angle).toFixed(4), panelX + 10, panelY + 70);

  fill('black');
  text('tan(θ) = ' + (cos(angle) !== 0 ? tan(angle).toFixed(4) : 'undefined'), panelX + 10, panelY + 88);
}

function drawControls() {
  // Angle slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Angle θ: ' + (angle * 180 / PI).toFixed(0) + '°', 10, sliderY);

  let handleX = map(angle, 0, TWO_PI, sliderX, sliderX + sliderW);
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 4, sliderW, 8, 4);
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleX, sliderY, 16);

  // Animate button
  let animBtnX = canvasWidth - 100;
  fill(isAnimating ? '#f44336' : '#4CAF50');
  stroke(isAnimating ? '#c62828' : '#388E3C');
  strokeWeight(1);
  rect(animBtnX, sliderY - 14, 90, 28, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(isAnimating ? 'Stop' : 'Animate', animBtnX + 45, sliderY);

  // Common angles buttons
  let btnY = drawHeight + 65;
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Jump to:', 10, btnY);

  let commonAngles = [
    { label: '0°', angle: 0 },
    { label: '30°', angle: PI/6 },
    { label: '45°', angle: PI/4 },
    { label: '60°', angle: PI/3 },
    { label: '90°', angle: PI/2 },
    { label: '180°', angle: PI },
    { label: '270°', angle: 3*PI/2 }
  ];

  let btnX = 70;
  let btnW = 40;
  let btnH = 24;
  for (let i = 0; i < commonAngles.length; i++) {
    let x = btnX + i * (btnW + 5);
    fill('#ddd');
    stroke('#999');
    strokeWeight(1);
    rect(x, btnY - btnH/2, btnW, btnH, 4);
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(commonAngles[i].label, x + btnW/2, btnY);
  }
}

function mousePressed() {
  // Check slider
  let handleX = map(angle, 0, TWO_PI, sliderX, sliderX + sliderW);
  if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check animate button
  let animBtnX = canvasWidth - 100;
  if (mouseX >= animBtnX && mouseX <= animBtnX + 90 &&
      mouseY >= sliderY - 14 && mouseY <= sliderY + 14) {
    isAnimating = !isAnimating;
    return;
  }

  // Check common angle buttons
  let btnY = drawHeight + 65;
  let commonAngles = [0, PI/6, PI/4, PI/3, PI/2, PI, 3*PI/2];
  let btnX = 70;
  let btnW = 40;
  let btnH = 24;
  for (let i = 0; i < commonAngles.length; i++) {
    let x = btnX + i * (btnW + 5);
    if (mouseX >= x && mouseX <= x + btnW &&
        mouseY >= btnY - btnH/2 && mouseY <= btnY + btnH/2) {
      angle = commonAngles[i];
      isAnimating = false;
      return;
    }
  }

  // Check if clicking on unit circle point
  let px = circleX + cos(angle) * circleRadius;
  let py = circleY - sin(angle) * circleRadius;
  if (dist(mouseX, mouseY, px, py) < 20) {
    isDraggingPoint = true;
    return;
  }

  // Check if clicking on unit circle
  if (dist(mouseX, mouseY, circleX, circleY) < circleRadius + 20 &&
      dist(mouseX, mouseY, circleX, circleY) > circleRadius - 20) {
    isDraggingPoint = true;
    updateAngleFromMouse();
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    angle = map(mouseX, sliderX, sliderX + sliderW, 0, TWO_PI);
    angle = constrain(angle, 0, TWO_PI);
  }

  if (isDraggingPoint) {
    updateAngleFromMouse();
  }
}

function mouseReleased() {
  isDraggingSlider = false;
  isDraggingPoint = false;
}

function updateAngleFromMouse() {
  angle = atan2(circleY - mouseY, mouseX - circleX);
  if (angle < 0) angle += TWO_PI;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayout();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.floor(container.getBoundingClientRect().width);
  }
  updateLayout();
}
