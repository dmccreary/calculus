// Trig Identity Visualizer MicroSim
// Learning Objective: Students will interpret the Pythagorean identity
// sin²θ + cos²θ = 1 geometrically using the unit circle.
// Bloom Level: Understand (L2)

let canvasWidth = 600;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 30;
let defaultTextSize = 16;

// Unit circle parameters
let circleX, circleY;
let circleRadius = 130;

// Current angle
let angle = PI / 4;

// Animation
let isAnimating = false;
let animSpeed = 0.015;

// Slider
let sliderX, sliderY, sliderW;
let isDraggingSlider = false;

// Display options
let showSquares = true;
let currentIdentity = 0; // 0: Pythagorean, 1: tan = sin/cos, 2: sec² = 1 + tan²

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  circleX = canvasWidth * 0.35;
  circleY = drawHeight / 2;

  sliderX = 100;
  sliderY = drawHeight + 25;
  sliderW = canvasWidth - 250;

  describe('Trig Identity Visualizer: See the Pythagorean identity geometrically on the unit circle.', LABEL);
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
  text('Trig Identity Visualizer', canvasWidth / 2, 5);

  // Draw unit circle with triangle
  drawUnitCircle();

  // Draw squares visualization (Pythagorean)
  if (showSquares && currentIdentity === 0) {
    drawPythagoreanSquares();
  }

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

  // Unit circle
  stroke(150);
  strokeWeight(2);
  noFill();
  circle(0, 0, circleRadius * 2);

  // Current point
  let px = cos(angle) * circleRadius;
  let py = -sin(angle) * circleRadius;

  // Reference triangle
  // Hypotenuse (radius = 1)
  stroke(100);
  strokeWeight(2);
  line(0, 0, px, py);

  // Cosine side (adjacent)
  stroke(50, 150, 50);
  strokeWeight(4);
  line(0, 0, px, 0);

  // Sine side (opposite)
  stroke(200, 50, 50);
  strokeWeight(4);
  line(px, 0, px, py);

  // Right angle marker
  stroke(100);
  strokeWeight(1);
  let markerSize = 10;
  if (angle > 0 && angle < PI) {
    rect(px - markerSize, 0, markerSize, -markerSize);
  } else {
    rect(px - markerSize, 0, markerSize, markerSize);
  }

  // Point on circle
  fill(50, 100, 200);
  stroke(0);
  strokeWeight(2);
  circle(px, py, 14);

  // Labels
  fill(50, 150, 50);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('cos θ', px / 2, 8);

  fill(200, 50, 50);
  textAlign(LEFT, CENTER);
  text('sin θ', px + 8, py / 2);

  fill(100);
  textAlign(CENTER, CENTER);
  textSize(12);
  // Label the hypotenuse
  let midX = px / 2 - 10;
  let midY = py / 2 - 10;
  text('1', midX, midY);

  // Angle arc
  stroke(100);
  strokeWeight(1);
  noFill();
  arc(0, 0, 40, 40, -angle, 0);

  // θ label
  fill(100);
  noStroke();
  textSize(14);
  let labelAngle = -angle / 2;
  text('θ', cos(labelAngle) * 30, sin(labelAngle) * 30);

  pop();
}

function drawPythagoreanSquares() {
  let cosVal = cos(angle);
  let sinVal = sin(angle);

  let squareScale = 60; // Scale for visibility

  // Position squares to the right of the circle
  let baseX = canvasWidth * 0.65;
  let baseY = drawHeight * 0.4;

  // cos² square (green)
  let cos2Size = Math.abs(cosVal) * squareScale;
  fill(50, 150, 50, 150);
  stroke(50, 150, 50);
  strokeWeight(2);
  rect(baseX, baseY, cos2Size, cos2Size);

  // sin² square (red)
  let sin2Size = Math.abs(sinVal) * squareScale;
  fill(200, 50, 50, 150);
  stroke(200, 50, 50);
  rect(baseX + cos2Size + 10, baseY, sin2Size, sin2Size);

  // Plus sign
  fill('black');
  noStroke();
  textSize(24);
  textAlign(CENTER, CENTER);
  text('+', baseX + cos2Size + 5, baseY + Math.max(cos2Size, sin2Size) / 2);

  // Labels
  textSize(14);
  fill(50, 150, 50);
  textAlign(CENTER, TOP);
  text('cos²θ', baseX + cos2Size / 2, baseY + cos2Size + 5);
  text('= ' + (cosVal * cosVal).toFixed(3), baseX + cos2Size / 2, baseY + cos2Size + 22);

  fill(200, 50, 50);
  text('sin²θ', baseX + cos2Size + 10 + sin2Size / 2, baseY + sin2Size + 5);
  text('= ' + (sinVal * sinVal).toFixed(3), baseX + cos2Size + 10 + sin2Size / 2, baseY + sin2Size + 22);

  // Sum = 1 display
  let sumY = baseY + Math.max(cos2Size, sin2Size) + 60;
  fill('black');
  textSize(18);
  textAlign(CENTER, CENTER);
  text('cos²θ + sin²θ = ' + (cosVal * cosVal + sinVal * sinVal).toFixed(4), baseX + (cos2Size + sin2Size + 10) / 2, sumY);

  // Big "= 1" emphasis
  textSize(28);
  fill(50, 100, 200);
  text('= 1', baseX + (cos2Size + sin2Size + 10) / 2, sumY + 35);
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
  text('θ = ' + degAngle.toFixed(1) + '°', panelX + 10, panelY + 10);

  fill(50, 150, 50);
  text('cos θ = ' + cos(angle).toFixed(4), panelX + 10, panelY + 30);

  fill(200, 50, 50);
  text('sin θ = ' + sin(angle).toFixed(4), panelX + 10, panelY + 48);

  fill('black');
  text('cos²θ + sin²θ =', panelX + 10, panelY + 70);
  fill(50, 100, 200);
  textSize(14);
  text((cos(angle)*cos(angle) + sin(angle)*sin(angle)).toFixed(4), panelX + 100, panelY + 70);
}

function drawControls() {
  // Angle slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('θ: ' + (angle * 180 / PI).toFixed(0) + '°', 10, sliderY);

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
}

function mouseDragged() {
  if (isDraggingSlider) {
    angle = map(mouseX, sliderX, sliderX + sliderW, 0, TWO_PI);
    angle = constrain(angle, 0, TWO_PI);
  }
}

function mouseReleased() {
  isDraggingSlider = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  circleX = canvasWidth * 0.3;
  sliderW = canvasWidth - 250;
}
