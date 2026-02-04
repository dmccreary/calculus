// Conical Tank Draining MicroSim
// Learning Objective: Calculate how fast water level changes in a conical tank
// Bloom Level: Apply (L3), Verbs: calculate, apply, understand
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 50;
let defaultTextSize = 16;

// Tank parameters (with slider ranges)
let tankHeight = 10;      // H: 5 to 15 ft
let tankRadius = 4;       // R: 2 to 6 ft
let drainRate = -2;       // dV/dt: -5 to -0.5 ft^3/min

// Current water state
let waterHeight = 8;      // h: current water height

// Animation state
let isAnimating = false;
let animationSpeed = 0.02;

// Slider states (canvas-based)
let sliders = [];
let isDraggingSlider = -1;

// Button states
let playButton, resetButton;
let buttonY, buttonHeight = 28;

// Tank drawing parameters
let tankLeft, tankTop, tankBottom, tankWidth;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  initializeSliders();
  updateControlPositions();

  describe('Conical Tank Draining MicroSim: Visualizes related rates for water draining from a conical tank, showing similar triangles relationship between radius and height.', LABEL);
}

function initializeSliders() {
  sliders = [
    { label: 'H (tank height)', value: tankHeight, min: 5, max: 15, unit: 'ft', key: 'tankHeight' },
    { label: 'R (tank radius)', value: tankRadius, min: 2, max: 6, unit: 'ft', key: 'tankRadius' },
    { label: 'dV/dt (drain rate)', value: drainRate, min: -5, max: -0.5, unit: 'ft\u00B3/min', key: 'drainRate' }
  ];
}

function updateControlPositions() {
  // Slider positions in control area
  let sliderStartX = 140;
  let sliderWidth = Math.min(180, canvasWidth * 0.25);
  let sliderY = drawHeight + 15;
  let sliderSpacing = 28;

  for (let i = 0; i < sliders.length; i++) {
    sliders[i].x = sliderStartX;
    sliders[i].y = sliderY + i * sliderSpacing;
    sliders[i].w = sliderWidth;
  }

  // Button positions
  buttonY = drawHeight + 15;
  playButton = { x: sliderStartX + sliderWidth + 30, y: buttonY, w: 100, h: buttonHeight, label: 'Play' };
  resetButton = { x: sliderStartX + sliderWidth + 30, y: buttonY + 35, w: 100, h: buttonHeight, label: 'Reset' };
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

  // Update values from sliders
  tankHeight = sliders[0].value;
  tankRadius = sliders[1].value;
  drainRate = sliders[2].value;

  // Animation update
  if (isAnimating) {
    updateWaterLevel();
  }

  // Draw title
  drawTitle();

  // Calculate tank drawing dimensions
  calculateTankDimensions();

  // Draw main visualization
  drawTank();
  drawWater();
  drawLabels();
  drawSimilarTriangles();

  // Draw formula panel
  drawFormulaPanel();

  // Draw values panel
  drawValuesPanel();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Conical Tank Draining', canvasWidth * 0.3, 5);

  textSize(14);
  fill(80);
  text('Related Rates Problem', canvasWidth * 0.3, 28);
}

function calculateTankDimensions() {
  // Tank visualization area (left side of canvas)
  tankWidth = Math.min(200, canvasWidth * 0.25);
  tankLeft = 80;
  tankTop = chartTop + 20;
  tankBottom = drawHeight - 60;
}

function drawTank() {
  // Draw tank outline (cone with vertex down)
  let tankCenterX = tankLeft + tankWidth / 2;
  let tankVisualHeight = tankBottom - tankTop;

  // Calculate visual scale to fit tank
  let scaleFactor = Math.min(tankVisualHeight / tankHeight, tankWidth / (2 * tankRadius));
  let visualHeight = tankHeight * scaleFactor * 0.8;
  let visualRadius = tankRadius * scaleFactor * 0.8;

  // Tank vertices
  let topY = tankTop + 30;
  let bottomY = topY + visualHeight;
  let topLeftX = tankCenterX - visualRadius;
  let topRightX = tankCenterX + visualRadius;

  // Store for use in other functions
  this.tankCenterX = tankCenterX;
  this.tankVisualTop = topY;
  this.tankVisualBottom = bottomY;
  this.tankVisualRadius = visualRadius;
  this.tankVisualHeight = visualHeight;

  // Draw tank outline (gray)
  stroke(100);
  strokeWeight(3);
  noFill();

  // Left edge
  line(topLeftX, topY, tankCenterX, bottomY);
  // Right edge
  line(topRightX, topY, tankCenterX, bottomY);
  // Top edge (ellipse for 3D effect)
  ellipse(tankCenterX, topY, visualRadius * 2, visualRadius * 0.4);
}

function drawWater() {
  if (waterHeight <= 0) return;

  // Calculate water visual dimensions using similar triangles
  let waterRatio = waterHeight / tankHeight;
  let visualWaterHeight = this.tankVisualHeight * waterRatio;
  let visualWaterRadius = this.tankVisualRadius * waterRatio;

  // Water surface position
  let waterTopY = this.tankVisualBottom - visualWaterHeight;

  // Draw water (blue filled)
  fill(100, 150, 255, 180);
  stroke(50, 100, 200);
  strokeWeight(2);

  // Draw water as a filled triangle with ellipse top
  beginShape();
  vertex(this.tankCenterX - visualWaterRadius, waterTopY);
  vertex(this.tankCenterX, this.tankVisualBottom);
  vertex(this.tankCenterX + visualWaterRadius, waterTopY);
  endShape(CLOSE);

  // Water surface ellipse
  fill(120, 170, 255, 200);
  ellipse(this.tankCenterX, waterTopY, visualWaterRadius * 2, visualWaterRadius * 0.4);

  // Store water visual parameters
  this.waterTopY = waterTopY;
  this.visualWaterRadius = visualWaterRadius;
}

function drawLabels() {
  fill('black');
  noStroke();
  textSize(14);

  // H label (tank height) - right side
  let hLabelX = this.tankCenterX + this.tankVisualRadius + 25;
  let hMidY = (this.tankVisualTop + this.tankVisualBottom) / 2;

  stroke(80);
  strokeWeight(1);
  // Vertical line for H
  line(hLabelX - 10, this.tankVisualTop, hLabelX - 10, this.tankVisualBottom);
  // Arrows
  line(hLabelX - 15, this.tankVisualTop, hLabelX - 5, this.tankVisualTop);
  line(hLabelX - 15, this.tankVisualBottom, hLabelX - 5, this.tankVisualBottom);

  noStroke();
  textAlign(LEFT, CENTER);
  fill(0, 100, 0);
  text('H = ' + tankHeight.toFixed(1) + ' ft', hLabelX, hMidY);

  // R label (tank radius) - top
  let rLabelY = this.tankVisualTop - 20;

  stroke(80);
  strokeWeight(1);
  line(this.tankCenterX, rLabelY + 5, this.tankCenterX + this.tankVisualRadius, rLabelY + 5);
  line(this.tankCenterX, rLabelY, this.tankCenterX, rLabelY + 10);
  line(this.tankCenterX + this.tankVisualRadius, rLabelY, this.tankCenterX + this.tankVisualRadius, rLabelY + 10);

  noStroke();
  textAlign(CENTER, BOTTOM);
  fill(150, 0, 0);
  text('R = ' + tankRadius.toFixed(1) + ' ft', this.tankCenterX + this.tankVisualRadius / 2, rLabelY - 2);

  // h label (water height) - left side
  if (waterHeight > 0) {
    let hWaterLabelX = this.tankCenterX - this.tankVisualRadius * (waterHeight / tankHeight) - 25;
    let hWaterMidY = (this.waterTopY + this.tankVisualBottom) / 2;

    stroke(50, 100, 200);
    strokeWeight(1);
    line(hWaterLabelX + 10, this.waterTopY, hWaterLabelX + 10, this.tankVisualBottom);
    line(hWaterLabelX + 5, this.waterTopY, hWaterLabelX + 15, this.waterTopY);
    line(hWaterLabelX + 5, this.tankVisualBottom, hWaterLabelX + 15, this.tankVisualBottom);

    noStroke();
    textAlign(RIGHT, CENTER);
    fill(0, 0, 150);
    text('h = ' + waterHeight.toFixed(2) + ' ft', hWaterLabelX, hWaterMidY);

    // r label (water radius)
    let rWaterLabelY = this.waterTopY + 15;

    stroke(50, 100, 200);
    strokeWeight(1);
    line(this.tankCenterX, rWaterLabelY, this.tankCenterX + this.visualWaterRadius, rWaterLabelY);

    noStroke();
    textAlign(CENTER, TOP);
    fill(0, 0, 150);
    text('r', this.tankCenterX + this.visualWaterRadius / 2, rWaterLabelY + 2);
  }
}

function drawSimilarTriangles() {
  // Draw a small diagram showing similar triangles relationship
  let boxX = 10;
  let boxY = drawHeight - 100;
  let boxW = 130;
  let boxH = 90;

  // Background
  fill(255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 5);

  // Title
  fill('black');
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  text('Similar Triangles', boxX + boxW / 2, boxY + 5);

  // Draw mini triangle
  let triLeft = boxX + 20;
  let triBottom = boxY + boxH - 15;
  let triHeight = 50;
  let triWidth = 40;

  // Full cone outline
  stroke(100);
  strokeWeight(1);
  noFill();
  line(triLeft, triBottom - triHeight, triLeft + triWidth / 2, triBottom);
  line(triLeft + triWidth, triBottom - triHeight, triLeft + triWidth / 2, triBottom);
  line(triLeft, triBottom - triHeight, triLeft + triWidth, triBottom - triHeight);

  // Water portion (highlighted)
  let waterFraction = waterHeight / tankHeight;
  let miniWaterHeight = triHeight * waterFraction;
  let miniWaterWidth = triWidth * waterFraction;

  fill(100, 150, 255, 100);
  stroke(50, 100, 200);
  beginShape();
  vertex(triLeft + triWidth / 2 - miniWaterWidth / 2, triBottom - miniWaterHeight);
  vertex(triLeft + triWidth / 2, triBottom);
  vertex(triLeft + triWidth / 2 + miniWaterWidth / 2, triBottom - miniWaterHeight);
  endShape(CLOSE);

  // Labels
  fill(0, 100, 0);
  noStroke();
  textSize(9);
  textAlign(LEFT, CENTER);
  text('R', triLeft + triWidth + 3, triBottom - triHeight);
  text('H', triLeft + triWidth + 10, triBottom - triHeight / 2);

  fill(0, 0, 150);
  text('r', triLeft + triWidth / 2 + miniWaterWidth / 2 + 3, triBottom - miniWaterHeight);
  text('h', triLeft + 3, triBottom - miniWaterHeight / 2);
}

function drawFormulaPanel() {
  // Formula panel on right side
  let panelX = canvasWidth - 270;
  let panelY = chartTop;
  let panelW = 260;
  let panelH = 180;

  // Background
  fill(255, 255, 255, 245);
  stroke(100, 100, 200);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 10);

  // Title
  fill(50, 50, 150);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Formulas', panelX + 10, panelY + 8);

  // Divider
  stroke(200);
  strokeWeight(1);
  line(panelX + 10, panelY + 28, panelX + panelW - 10, panelY + 28);

  fill('black');
  noStroke();
  textSize(12);
  let lineHeight = 24;
  let startY = panelY + 38;

  // Similar triangles
  fill(0, 100, 0);
  text('Similar triangles:', panelX + 10, startY);
  fill(80);
  textSize(13);
  text('r/h = R/H', panelX + 20, startY + 16);
  textSize(11);
  text('\u2192 r = (R/H)\u00B7h', panelX + 100, startY + 16);

  // Volume formula
  textSize(12);
  fill(0, 0, 150);
  text('Volume (substituted):', panelX + 10, startY + lineHeight * 1.7);
  fill(80);
  textSize(13);
  text('V = (\u03C0/3)r\u00B2h = (\u03C0R\u00B2/3H\u00B2)h\u00B3', panelX + 20, startY + lineHeight * 1.7 + 16);

  // Related rates formula
  textSize(12);
  fill(150, 0, 0);
  text('Differentiate (chain rule):', panelX + 10, startY + lineHeight * 3.2);
  fill(80);
  textSize(13);
  text('dV/dt = (\u03C0R\u00B2/H\u00B2)h\u00B2 \u00B7 dh/dt', panelX + 20, startY + lineHeight * 3.2 + 16);

  // Solve for dh/dt
  textSize(12);
  fill(0, 100, 100);
  text('Solve for dh/dt:', panelX + 10, startY + lineHeight * 4.7);
  fill(80);
  textSize(13);
  text('dh/dt = (H\u00B2/\u03C0R\u00B2h\u00B2) \u00B7 dV/dt', panelX + 20, startY + lineHeight * 4.7 + 16);
}

function drawValuesPanel() {
  // Current values panel
  let panelX = canvasWidth - 270;
  let panelY = chartTop + 195;
  let panelW = 260;
  let panelH = 170;

  // Background
  fill(255, 250, 240);
  stroke(200, 150, 100);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 10);

  // Title
  fill(150, 100, 50);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Current Values', panelX + 10, panelY + 8);

  // Divider
  stroke(220);
  strokeWeight(1);
  line(panelX + 10, panelY + 28, panelX + panelW - 10, panelY + 28);

  // Calculate current values
  let r = (tankRadius / tankHeight) * waterHeight;
  let V = (Math.PI / 3) * r * r * waterHeight;
  let dhdt = calculateDhDt();

  fill('black');
  noStroke();
  textSize(12);
  let startY = panelY + 38;
  let lineHeight = 22;

  // Water height
  fill(0, 0, 150);
  text('h (water height):', panelX + 10, startY);
  fill(80);
  textAlign(RIGHT, TOP);
  text(waterHeight.toFixed(3) + ' ft', panelX + panelW - 15, startY);

  // Water radius
  textAlign(LEFT, TOP);
  fill(0, 0, 150);
  text('r (water radius):', panelX + 10, startY + lineHeight);
  fill(80);
  textAlign(RIGHT, TOP);
  text(r.toFixed(3) + ' ft', panelX + panelW - 15, startY + lineHeight);

  // Volume
  textAlign(LEFT, TOP);
  fill(0, 0, 150);
  text('V (water volume):', panelX + 10, startY + lineHeight * 2);
  fill(80);
  textAlign(RIGHT, TOP);
  text(V.toFixed(3) + ' ft\u00B3', panelX + panelW - 15, startY + lineHeight * 2);

  // Drain rate
  textAlign(LEFT, TOP);
  fill(150, 0, 0);
  text('dV/dt (drain rate):', panelX + 10, startY + lineHeight * 3);
  fill(80);
  textAlign(RIGHT, TOP);
  text(drainRate.toFixed(2) + ' ft\u00B3/min', panelX + panelW - 15, startY + lineHeight * 3);

  // dh/dt (the answer!)
  textAlign(LEFT, TOP);
  fill(0, 100, 100);
  textSize(13);
  text('dh/dt (level change):', panelX + 10, startY + lineHeight * 4.2);
  fill(0, 100, 100);
  textSize(14);
  textAlign(RIGHT, TOP);
  if (waterHeight > 0.01) {
    text(dhdt.toFixed(4) + ' ft/min', panelX + panelW - 15, startY + lineHeight * 4.2);
  } else {
    text('Tank empty', panelX + panelW - 15, startY + lineHeight * 4.2);
  }

  // Note about negative value
  textAlign(LEFT, TOP);
  fill(100);
  textSize(10);
  if (waterHeight > 0.01) {
    text('(negative = level falling)', panelX + 10, startY + lineHeight * 5.3);
  }
}

function calculateDhDt() {
  // dh/dt = (H^2 / (pi * R^2 * h^2)) * dV/dt
  if (waterHeight < 0.01) return 0;

  let numerator = tankHeight * tankHeight;
  let denominator = Math.PI * tankRadius * tankRadius * waterHeight * waterHeight;

  return (numerator / denominator) * drainRate;
}

function updateWaterLevel() {
  // Use dh/dt to update water level
  let dhdt = calculateDhDt();
  waterHeight += dhdt * animationSpeed;

  // Clamp water height
  if (waterHeight < 0) {
    waterHeight = 0;
    isAnimating = false;
  }
  if (waterHeight > tankHeight) {
    waterHeight = tankHeight;
  }
}

function drawControls() {
  // Draw sliders
  for (let i = 0; i < sliders.length; i++) {
    drawSlider(i);
  }

  // Play/Pause button
  fill(isAnimating ? '#f44336' : '#4CAF50');
  stroke(isAnimating ? '#c62828' : '#388E3C');
  strokeWeight(1);
  rect(playButton.x, playButton.y, playButton.w, playButton.h, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text(isAnimating ? 'Pause' : 'Play', playButton.x + playButton.w / 2, playButton.y + playButton.h / 2);

  // Reset button
  fill('#2196F3');
  stroke('#1976D2');
  strokeWeight(1);
  rect(resetButton.x, resetButton.y, resetButton.w, resetButton.h, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  text('Reset', resetButton.x + resetButton.w / 2, resetButton.y + resetButton.h / 2);

  // Click instruction
  fill(100);
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Click tank to set water level', playButton.x, resetButton.y + resetButton.h + 15);
}

function drawSlider(index) {
  let s = sliders[index];

  // Label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text(s.label + ':', 10, s.y);

  // Track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(s.x, s.y - 4, s.w, 8, 4);

  // Handle position
  let handleX = map(s.value, s.min, s.max, s.x, s.x + s.w);

  // Handle
  fill(isDraggingSlider === index ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleX, s.y, 16);

  // Value display
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text(s.value.toFixed(1) + ' ' + s.unit, s.x + s.w + 10, s.y);
}

function mousePressed() {
  // Check sliders
  for (let i = 0; i < sliders.length; i++) {
    let s = sliders[i];
    let handleX = map(s.value, s.min, s.max, s.x, s.x + s.w);

    if (dist(mouseX, mouseY, handleX, s.y) < 12) {
      isDraggingSlider = i;
      return;
    }

    // Click on track
    if (mouseY >= s.y - 10 && mouseY <= s.y + 10 &&
        mouseX >= s.x && mouseX <= s.x + s.w) {
      isDraggingSlider = i;
      s.value = map(mouseX, s.x, s.x + s.w, s.min, s.max);
      s.value = constrain(s.value, s.min, s.max);
      s.value = Math.round(s.value * 10) / 10;
      return;
    }
  }

  // Check play button
  if (mouseX >= playButton.x && mouseX <= playButton.x + playButton.w &&
      mouseY >= playButton.y && mouseY <= playButton.y + playButton.h) {
    isAnimating = !isAnimating;
    return;
  }

  // Check reset button
  if (mouseX >= resetButton.x && mouseX <= resetButton.x + resetButton.w &&
      mouseY >= resetButton.y && mouseY <= resetButton.y + resetButton.h) {
    resetSimulation();
    return;
  }

  // Check click on tank to set water level
  if (mouseY >= this.tankVisualTop && mouseY <= this.tankVisualBottom &&
      mouseX >= tankLeft && mouseX <= tankLeft + tankWidth) {
    // Convert click position to water height
    let clickRatio = (this.tankVisualBottom - mouseY) / this.tankVisualHeight;
    waterHeight = clickRatio * tankHeight;
    waterHeight = constrain(waterHeight, 0, tankHeight);
    return;
  }
}

function mouseDragged() {
  if (isDraggingSlider >= 0) {
    let s = sliders[isDraggingSlider];
    s.value = map(mouseX, s.x, s.x + s.w, s.min, s.max);
    s.value = constrain(s.value, s.min, s.max);
    s.value = Math.round(s.value * 10) / 10;

    // Update water height if tank dimensions change
    if (isDraggingSlider === 0) { // Tank height changed
      waterHeight = Math.min(waterHeight, s.value);
    }
  }
}

function mouseReleased() {
  isDraggingSlider = -1;
}

function resetSimulation() {
  isAnimating = false;
  waterHeight = tankHeight * 0.8;
  sliders[0].value = 10;
  sliders[1].value = 4;
  sliders[2].value = -2;
  tankHeight = 10;
  tankRadius = 4;
  drainRate = -2;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateControlPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  updateControlPositions();
}
