// Ladder Problem Explorer MicroSim
// Visualize the rate of change of a ladder's height as its base slides away from a wall
// Learning Objective: Calculate dh/dt given b, db/dt, and L using related rates
// Bloom Level: Apply (L3), Verbs: calculate, apply, execute

// Canvas dimensions - responsive width
let canvasWidth = 600;
let drawHeight = 450;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Scene parameters
let wallX = 80;       // X position of wall
let groundY;          // Y position of ground (set in setup)
let sceneRight;       // Right edge of scene (set dynamically)
let maxBaseDistance;  // Maximum distance from wall for base

// Ladder parameters
let ladderLength = 10;  // L in feet
let basePosition = 4;   // b in feet (distance from wall)
let baseSpeed = 1;      // db/dt in ft/sec

// Animation state
let isAnimating = false;
let lastFrameTime = 0;

// Scale: pixels per foot
let scale = 25;

// UI button bounds
let playPauseButton = { x: 0, y: 0, w: 90, h: 30 };
let resetButton = { x: 0, y: 0, w: 70, h: 30 };

// Slider parameters
let lengthSlider = { x: 0, y: 0, w: 200, h: 20, min: 6, max: 15, value: 10, dragging: false, label: 'Ladder Length L' };
let speedSlider = { x: 0, y: 0, w: 200, h: 20, min: 0.5, max: 4, value: 1, dragging: false, label: 'Base Speed db/dt' };
let positionSlider = { x: 0, y: 0, w: 200, h: 20, min: 0.5, max: 9.5, value: 4, dragging: false, label: 'Base Position b' };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  groundY = drawHeight - 60;
  updateSliderBounds();

  describe('Ladder Problem Explorer: Animated visualization of related rates problem showing a ladder sliding down a wall with real-time calculations of dh/dt.', LABEL);
}

function updateSliderBounds() {
  let sliderWidth = min(200, canvasWidth - 180);
  let sliderX = 120;
  let col2X = canvasWidth / 2 + 60;

  lengthSlider.x = sliderX;
  lengthSlider.y = drawHeight + 15;
  lengthSlider.w = sliderWidth;

  speedSlider.x = sliderX;
  speedSlider.y = drawHeight + 45;
  speedSlider.w = sliderWidth;

  positionSlider.x = col2X;
  positionSlider.y = drawHeight + 15;
  positionSlider.w = sliderWidth;
  positionSlider.max = ladderLength - 0.5;

  playPauseButton.x = col2X;
  playPauseButton.y = drawHeight + 75;

  resetButton.x = col2X + 100;
  resetButton.y = drawHeight + 75;
}

function draw() {
  updateCanvasSize();
  updateSliderBounds();

  // Update values from sliders
  ladderLength = lengthSlider.value;
  baseSpeed = speedSlider.value;
  if (!positionSlider.dragging && !isAnimating) {
    basePosition = positionSlider.value;
  }

  // Update position slider max based on ladder length
  positionSlider.max = ladderLength - 0.5;
  if (positionSlider.value > positionSlider.max) {
    positionSlider.value = positionSlider.max;
  }

  // Animation update
  if (isAnimating) {
    let currentTime = millis() / 1000;
    if (lastFrameTime > 0) {
      let dt = currentTime - lastFrameTime;
      basePosition += baseSpeed * dt;

      // Check if ladder hits ground
      if (basePosition >= ladderLength - 0.1) {
        basePosition = ladderLength - 0.1;
        isAnimating = false;
      }

      positionSlider.value = basePosition;
    }
    lastFrameTime = currentTime;
  }

  // Calculate height
  let h = calculateHeight(basePosition, ladderLength);

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  drawTitle();

  // Draw scene
  drawWallAndGround();
  drawLadder();
  drawLabels(h);
  drawVelocityVectors(h);
  drawDataPanel(h);
  drawEquations(h);

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Ladder Problem Explorer', canvasWidth / 2, 5);
  textSize(14);
  fill(80);
  text('Related Rates: Sliding Ladder', canvasWidth / 2, 28);
}

function calculateHeight(b, L) {
  // h = sqrt(L^2 - b^2)
  let hSquared = L * L - b * b;
  if (hSquared < 0) return 0;
  return Math.sqrt(hSquared);
}

function calculateDhDt(b, h, dbdt) {
  // From b^2 + h^2 = L^2
  // 2b(db/dt) + 2h(dh/dt) = 0
  // dh/dt = -b/h * db/dt
  if (h === 0) return -Infinity;
  return -b / h * dbdt;
}

function drawWallAndGround() {
  // Ground
  fill(139, 119, 101);
  noStroke();
  rect(0, groundY, canvasWidth, 30);

  // Ground texture lines
  stroke(120, 100, 80);
  strokeWeight(1);
  for (let x = 10; x < canvasWidth; x += 30) {
    line(x, groundY + 5, x + 15, groundY + 5);
  }

  // Wall
  fill(180, 180, 190);
  noStroke();
  rect(wallX - 15, 60, 15, groundY - 60);

  // Wall texture (bricks)
  stroke(160, 160, 170);
  strokeWeight(1);
  for (let y = 70; y < groundY; y += 20) {
    line(wallX - 15, y, wallX, y);
  }
  for (let y = 80; y < groundY; y += 40) {
    line(wallX - 7, y, wallX - 7, y + 20);
  }
  for (let y = 100; y < groundY; y += 40) {
    line(wallX - 7, y, wallX - 7, y + 20);
  }

  // Wall edge
  stroke(100);
  strokeWeight(2);
  line(wallX, 60, wallX, groundY);

  // Ground line
  line(wallX, groundY, canvasWidth - 20, groundY);
}

function drawLadder() {
  let h = calculateHeight(basePosition, ladderLength);

  // Ladder endpoints
  let baseX = wallX + basePosition * scale;
  let baseY = groundY;
  let topX = wallX;
  let topY = groundY - h * scale;

  // Ladder shadow
  stroke(100, 100, 100, 80);
  strokeWeight(12);
  line(baseX + 3, baseY + 3, topX + 3, topY + 3);

  // Ladder body
  stroke(139, 90, 43);
  strokeWeight(8);
  line(baseX, baseY, topX, topY);

  // Ladder rails
  stroke(160, 110, 60);
  strokeWeight(3);
  let dx = (topX - baseX) / ladderLength;
  let dy = (topY - baseY) / ladderLength;
  let perpX = -dy * 0.15;
  let perpY = dx * 0.15;

  line(baseX + perpX * scale, baseY + perpY * scale, topX + perpX * scale, topY + perpY * scale);
  line(baseX - perpX * scale, baseY - perpY * scale, topX - perpX * scale, topY - perpY * scale);

  // Ladder rungs
  stroke(180, 130, 70);
  strokeWeight(2);
  for (let i = 1; i < ladderLength; i++) {
    let t = i / ladderLength;
    let rx = baseX + (topX - baseX) * t;
    let ry = baseY + (topY - baseY) * t;
    line(rx + perpX * scale, ry + perpY * scale, rx - perpX * scale, ry - perpY * scale);
  }

  // Contact points
  fill(255, 100, 100);
  noStroke();
  circle(baseX, baseY, 12);  // Base point
  circle(topX, topY, 12);    // Top point
}

function drawLabels(h) {
  let baseX = wallX + basePosition * scale;

  // Right triangle visualization
  stroke(0, 150, 200, 150);
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);

  // Horizontal line (b)
  line(wallX, groundY, baseX, groundY);

  // Vertical line (h)
  line(wallX, groundY, wallX, groundY - h * scale);

  drawingContext.setLineDash([]);

  // Label b (base distance)
  fill(200, 50, 50);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  text('b = ' + basePosition.toFixed(2) + ' ft', (wallX + baseX) / 2, groundY + 8);

  // Label h (height)
  fill(50, 50, 200);
  textAlign(RIGHT, CENTER);
  text('h = ' + h.toFixed(2) + ' ft', wallX - 20, groundY - h * scale / 2);

  // Label L (ladder length)
  let midX = wallX + basePosition * scale / 2;
  let midY = groundY - h * scale / 2;
  fill(100, 80, 40);
  textAlign(LEFT, BOTTOM);
  push();
  translate(midX + 15, midY);
  let angle = atan2(-h * scale, basePosition * scale);
  rotate(angle);
  text('L = ' + ladderLength.toFixed(1) + ' ft', 0, -5);
  pop();

  // Right angle marker
  stroke(0, 150, 200);
  strokeWeight(1);
  noFill();
  let cornerSize = 15;
  rect(wallX, groundY - cornerSize, cornerSize, cornerSize);
}

function drawVelocityVectors(h) {
  let baseX = wallX + basePosition * scale;
  let topY = groundY - h * scale;
  let dhdt = calculateDhDt(basePosition, h, baseSpeed);

  // Scale for velocity arrows (pixels per ft/sec)
  let velScale = 25;

  // Base velocity vector (horizontal, positive = moving right)
  let baseVelLength = baseSpeed * velScale;
  stroke(0, 180, 0);
  strokeWeight(3);
  line(baseX, groundY - 15, baseX + baseVelLength, groundY - 15);
  // Arrow head
  fill(0, 180, 0);
  noStroke();
  triangle(
    baseX + baseVelLength, groundY - 15,
    baseX + baseVelLength - 8, groundY - 20,
    baseX + baseVelLength - 8, groundY - 10
  );

  // Base velocity label
  textAlign(LEFT, BOTTOM);
  textSize(12);
  text('db/dt = ' + baseSpeed.toFixed(1) + ' ft/s', baseX + baseVelLength + 5, groundY - 10);

  // Top velocity vector (vertical, negative = moving down)
  if (h > 0.5) {
    let topVelLength = Math.abs(dhdt) * velScale;
    topVelLength = min(topVelLength, 100); // Cap display length

    stroke(200, 100, 0);
    strokeWeight(3);
    line(wallX + 15, topY, wallX + 15, topY + topVelLength);
    // Arrow head
    fill(200, 100, 0);
    noStroke();
    triangle(
      wallX + 15, topY + topVelLength,
      wallX + 10, topY + topVelLength - 8,
      wallX + 20, topY + topVelLength - 8
    );

    // Top velocity label
    textAlign(LEFT, TOP);
    let dhdtDisplay = isFinite(dhdt) ? dhdt.toFixed(2) : '-Inf';
    text('dh/dt = ' + dhdtDisplay + ' ft/s', wallX + 25, topY + 5);
  }
}

function drawDataPanel(h) {
  let panelX = canvasWidth - 185;
  let panelY = 55;
  let panelW = 175;
  let panelH = 140;

  // Panel background
  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  // Panel title
  fill(60);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Current Values', panelX + panelW / 2, panelY + 8);

  // Data values
  textAlign(LEFT, TOP);
  textSize(13);
  let lineHeight = 20;
  let startY = panelY + 32;
  let indent = panelX + 12;

  // Position values
  fill(200, 50, 50);
  text('b = ' + basePosition.toFixed(2) + ' ft', indent, startY);

  fill(50, 50, 200);
  text('h = ' + h.toFixed(2) + ' ft', indent, startY + lineHeight);

  // Rate values
  fill(0, 150, 0);
  text('db/dt = ' + baseSpeed.toFixed(2) + ' ft/s', indent, startY + lineHeight * 2);

  let dhdt = calculateDhDt(basePosition, h, baseSpeed);
  let dhdtDisplay = isFinite(dhdt) ? dhdt.toFixed(2) : '-Inf';
  fill(200, 100, 0);
  text('dh/dt = ' + dhdtDisplay + ' ft/s', indent, startY + lineHeight * 3);

  // Pythagorean check
  let bSquared = basePosition * basePosition;
  let hSquared = h * h;
  let LSquared = ladderLength * ladderLength;

  fill(100);
  textSize(11);
  text('Check: b\u00B2 + h\u00B2 = L\u00B2', indent, startY + lineHeight * 4 + 5);
  text(bSquared.toFixed(1) + ' + ' + hSquared.toFixed(1) + ' = ' + LSquared.toFixed(1), indent, startY + lineHeight * 5);
}

function drawEquations(h) {
  let panelX = canvasWidth - 185;
  let panelY = 205;
  let panelW = 175;
  let panelH = 100;

  // Panel background
  fill(255, 250, 240);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  // Title
  fill(60);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  text('Related Rates Equation', panelX + panelW / 2, panelY + 8);

  // Equations
  textAlign(LEFT, TOP);
  textSize(12);
  fill(80);

  let lineHeight = 18;
  let startY = panelY + 28;
  let indent = panelX + 10;

  text('b\u00B2 + h\u00B2 = L\u00B2', indent, startY);
  text('2b(db/dt) + 2h(dh/dt) = 0', indent, startY + lineHeight);

  fill(200, 100, 0);
  textSize(13);
  text('dh/dt = -(b/h)(db/dt)', indent, startY + lineHeight * 2 + 5);

  // Show substitution
  textSize(11);
  fill(100);
  let dhdt = calculateDhDt(basePosition, h, baseSpeed);
  let dhdtDisplay = isFinite(dhdt) ? dhdt.toFixed(2) : '-Inf';
  text('= -(' + basePosition.toFixed(1) + '/' + h.toFixed(1) + ')(' + baseSpeed.toFixed(1) + ')', indent, startY + lineHeight * 3 + 5);
}

function drawControls() {
  // Draw sliders
  drawSlider(lengthSlider, ' ft');
  drawSlider(speedSlider, ' ft/s');
  drawSlider(positionSlider, ' ft');

  // Draw buttons
  drawPlayPauseButton();
  drawResetButton();
}

function drawSlider(slider, unit) {
  // Label
  fill('black');
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(12);
  text(slider.label + ':', slider.x - 8, slider.y + 10);

  // Track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(slider.x, slider.y + 5, slider.w, 10, 5);

  // Fill
  let fillWidth = map(slider.value, slider.min, slider.max, 0, slider.w);
  fill(100, 150, 200);
  noStroke();
  rect(slider.x, slider.y + 5, fillWidth, 10, 5);

  // Handle
  let handleX = slider.x + fillWidth;
  fill(slider.dragging ? '#2196F3' : '#42A5F5');
  stroke(60);
  strokeWeight(1);
  circle(handleX, slider.y + 10, 18);

  // Value display
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text(slider.value.toFixed(1) + unit, slider.x + slider.w + 8, slider.y + 10);
}

function drawPlayPauseButton() {
  let btn = playPauseButton;

  // Button background
  fill(isAnimating ? '#FF5722' : '#4CAF50');
  stroke(isAnimating ? '#E64A19' : '#388E3C');
  strokeWeight(1);
  rect(btn.x, btn.y, btn.w, btn.h, 5);

  // Button text
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(isAnimating ? 'Pause' : 'Play', btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function drawResetButton() {
  let btn = resetButton;

  // Button background
  fill('#FF9800');
  stroke('#F57C00');
  strokeWeight(1);
  rect(btn.x, btn.y, btn.w, btn.h, 5);

  // Button text
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Reset', btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function mousePressed() {
  // Check sliders
  if (isOverSlider(lengthSlider)) {
    lengthSlider.dragging = true;
    updateSliderValue(lengthSlider);
  }
  if (isOverSlider(speedSlider)) {
    speedSlider.dragging = true;
    updateSliderValue(speedSlider);
  }
  if (isOverSlider(positionSlider)) {
    positionSlider.dragging = true;
    isAnimating = false;  // Stop animation when manually positioning
    updateSliderValue(positionSlider);
  }

  // Check play/pause button
  if (isOverButton(playPauseButton)) {
    isAnimating = !isAnimating;
    if (isAnimating) {
      lastFrameTime = millis() / 1000;
    }
  }

  // Check reset button
  if (isOverButton(resetButton)) {
    isAnimating = false;
    basePosition = 4;
    positionSlider.value = 4;
    lengthSlider.value = 10;
    ladderLength = 10;
    speedSlider.value = 1;
    baseSpeed = 1;
  }
}

function mouseDragged() {
  if (lengthSlider.dragging) {
    updateSliderValue(lengthSlider);
    ladderLength = lengthSlider.value;
    // Adjust position if needed
    if (basePosition > ladderLength - 0.5) {
      basePosition = ladderLength - 0.5;
      positionSlider.value = basePosition;
    }
    positionSlider.max = ladderLength - 0.5;
  }
  if (speedSlider.dragging) {
    updateSliderValue(speedSlider);
  }
  if (positionSlider.dragging) {
    updateSliderValue(positionSlider);
    basePosition = positionSlider.value;
  }
}

function mouseReleased() {
  lengthSlider.dragging = false;
  speedSlider.dragging = false;
  positionSlider.dragging = false;
}

function isOverSlider(slider) {
  return mouseX >= slider.x - 10 && mouseX <= slider.x + slider.w + 10 &&
         mouseY >= slider.y && mouseY <= slider.y + 20;
}

function isOverButton(btn) {
  return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
         mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

function updateSliderValue(slider) {
  let newValue = map(mouseX, slider.x, slider.x + slider.w, slider.min, slider.max);
  slider.value = constrain(newValue, slider.min, slider.max);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateSliderBounds();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  if (canvasWidth < 400) canvasWidth = 400;
  if (canvasWidth > 800) canvasWidth = 800;
}
