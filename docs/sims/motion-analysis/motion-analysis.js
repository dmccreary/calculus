// Motion Analysis MicroSim
// Shows the relationship between position, velocity, and acceleration for a moving object
// Four panels: Position vs time, Velocity vs time, Acceleration vs time, Animation
// Bloom Level: Analyze (L4), Verb: analyze, interpret, connect
// Learning Objective: Students will connect position, velocity, and acceleration through derivatives

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 35;
let defaultTextSize = 16;

// Panel dimensions
let panelWidth, panelHeight;
let leftPanelX, rightPanelX;
let topPanelY, bottomPanelY;
let panelGap = 15;

// Time parameters
let tMin = 0, tMax = 10;
let currentTime = 0;
let isPlaying = false;
let animationSpeed = 1.0; // seconds per second

// Motion scenarios
const scenarios = [
  {
    name: 'Polynomial',
    description: 's(t) = t^3/30 - t^2/2 + 2t',
    position: t => (t*t*t)/30 - (t*t)/2 + 2*t,
    velocity: t => (t*t)/10 - t + 2,
    acceleration: t => t/5 - 1
  },
  {
    name: 'Sinusoidal',
    description: 's(t) = 5sin(t/2)',
    position: t => 5 * Math.sin(t/2),
    velocity: t => 2.5 * Math.cos(t/2),
    acceleration: t => -1.25 * Math.sin(t/2)
  },
  {
    name: 'Quadratic',
    description: 's(t) = -t^2/5 + 2t',
    position: t => -(t*t)/5 + 2*t,
    velocity: t => -2*t/5 + 2,
    acceleration: t => -0.4
  },
  {
    name: 'Exponential Decay',
    description: 's(t) = 8(1 - e^(-t/3))',
    position: t => 8 * (1 - Math.exp(-t/3)),
    velocity: t => (8/3) * Math.exp(-t/3),
    acceleration: t => -(8/9) * Math.exp(-t/3)
  }
];
let currentScenario = 0;

// Particle trace history
let traceHistory = [];
let maxTraceLength = 100;

// Control positions
let playBtnX, playBtnY, playBtnW;
let timeSliderX, timeSliderY, timeSliderW;
let scenarioBtnX, scenarioBtnY, scenarioBtnW;
let speedSliderX, speedSliderY, speedSliderW;
let resetBtnX, resetBtnY;

// Dragging state
let isDraggingTimeSlider = false;
let isDraggingSpeedSlider = false;

// Frame timing
let lastFrameTime = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();
  lastFrameTime = millis();

  describe('Interactive visualization showing position, velocity, and acceleration graphs synchronized with an animated particle demonstrating the relationship between derivatives and motion.', LABEL);
}

function updateLayoutPositions() {
  // Panel layout - 2x2 grid
  let availableWidth = canvasWidth - 2 * margin - panelGap;
  let availableHeight = drawHeight - chartTop - margin - panelGap;

  panelWidth = (availableWidth - panelGap) / 2;
  panelHeight = (availableHeight - panelGap) / 2;

  leftPanelX = margin;
  rightPanelX = margin + panelWidth + panelGap;
  topPanelY = chartTop;
  bottomPanelY = chartTop + panelHeight + panelGap;

  // Control positions - Row 1: Play button, time slider
  playBtnX = margin;
  playBtnY = drawHeight + 15;
  playBtnW = 70;

  timeSliderX = playBtnX + playBtnW + 20;
  timeSliderY = drawHeight + 28;
  timeSliderW = canvasWidth / 2 - timeSliderX - 30;

  // Row 1 continued: Scenario buttons
  scenarioBtnX = canvasWidth / 2 + 10;
  scenarioBtnY = drawHeight + 8;
  scenarioBtnW = 80;

  // Row 2: Speed slider, Reset button
  speedSliderX = 80;
  speedSliderY = drawHeight + 70;
  speedSliderW = canvasWidth / 2 - 130;

  resetBtnX = canvasWidth / 2 + 10;
  resetBtnY = drawHeight + 55;
}

function draw() {
  updateCanvasSize();

  // Update time if playing
  if (isPlaying) {
    let currentFrameTime = millis();
    let deltaTime = (currentFrameTime - lastFrameTime) / 1000;
    lastFrameTime = currentFrameTime;

    currentTime += deltaTime * animationSpeed;
    if (currentTime > tMax) {
      currentTime = tMin;
      traceHistory = []; // Reset trace on loop
    }

    // Add to trace history
    let scenario = scenarios[currentScenario];
    let pos = scenario.position(currentTime);
    traceHistory.push({t: currentTime, pos: pos});
    if (traceHistory.length > maxTraceLength) {
      traceHistory.shift();
    }
  } else {
    lastFrameTime = millis();
  }

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

  // Draw the four panels
  drawPositionGraph();
  drawVelocityGraph();
  drawAccelerationGraph();
  drawAnimationPanel();

  // Draw synchronized time marker on graphs
  drawTimeMarkers();

  // Draw current values display
  drawValuesDisplay();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Motion Analysis: Position, Velocity, and Acceleration', canvasWidth / 2, 5);
}

function drawPositionGraph() {
  let x = leftPanelX;
  let y = topPanelY;
  let w = panelWidth;
  let h = panelHeight;

  // Background
  fill(245, 250, 255);
  stroke(180);
  strokeWeight(1);
  rect(x, y, w, h, 4);

  // Title
  fill(50, 100, 200);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Position s(t)', x + w/2, y + 3);

  // Draw axes and curve
  let graphX = x + 35;
  let graphW = w - 45;
  let graphY = y + 20;
  let graphH = h - 35;

  drawGraphAxes(graphX, graphY, graphW, graphH, 't', 's');
  drawFunctionCurve(graphX, graphY, graphW, graphH, scenarios[currentScenario].position, color(50, 100, 200));
}

function drawVelocityGraph() {
  let x = rightPanelX;
  let y = topPanelY;
  let w = panelWidth;
  let h = panelHeight;

  // Background
  fill(255, 250, 245);
  stroke(180);
  strokeWeight(1);
  rect(x, y, w, h, 4);

  // Title
  fill(200, 100, 50);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text("Velocity v(t) = s'(t)", x + w/2, y + 3);

  // Draw axes and curve
  let graphX = x + 35;
  let graphW = w - 45;
  let graphY = y + 20;
  let graphH = h - 35;

  drawGraphAxes(graphX, graphY, graphW, graphH, 't', 'v');
  drawFunctionCurve(graphX, graphY, graphW, graphH, scenarios[currentScenario].velocity, color(200, 100, 50));

  // Draw zero line emphasis
  let scenario = scenarios[currentScenario];
  let yRange = getYRange(scenario.velocity);
  let zeroY = map(0, yRange.min, yRange.max, graphY + graphH, graphY);
  if (zeroY > graphY && zeroY < graphY + graphH) {
    stroke(150);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(graphX, zeroY, graphX + graphW, zeroY);
    drawingContext.setLineDash([]);
  }
}

function drawAccelerationGraph() {
  let x = leftPanelX;
  let y = bottomPanelY;
  let w = panelWidth;
  let h = panelHeight;

  // Background
  fill(250, 245, 255);
  stroke(180);
  strokeWeight(1);
  rect(x, y, w, h, 4);

  // Title
  fill(150, 50, 200);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text("Acceleration a(t) = v'(t) = s''(t)", x + w/2, y + 3);

  // Draw axes and curve
  let graphX = x + 35;
  let graphW = w - 45;
  let graphY = y + 20;
  let graphH = h - 35;

  drawGraphAxes(graphX, graphY, graphW, graphH, 't', 'a');
  drawFunctionCurve(graphX, graphY, graphW, graphH, scenarios[currentScenario].acceleration, color(150, 50, 200));

  // Draw zero line emphasis
  let scenario = scenarios[currentScenario];
  let yRange = getYRange(scenario.acceleration);
  let zeroY = map(0, yRange.min, yRange.max, graphY + graphH, graphY);
  if (zeroY > graphY && zeroY < graphY + graphH) {
    stroke(150);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(graphX, zeroY, graphX + graphW, zeroY);
    drawingContext.setLineDash([]);
  }
}

function drawAnimationPanel() {
  let x = rightPanelX;
  let y = bottomPanelY;
  let w = panelWidth;
  let h = panelHeight;

  // Background
  fill(245, 255, 250);
  stroke(180);
  strokeWeight(1);
  rect(x, y, w, h, 4);

  // Title
  fill(0, 150, 100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Particle Motion (Number Line)', x + w/2, y + 3);

  // Number line
  let lineY = y + h * 0.5;
  let lineX = x + 30;
  let lineW = w - 60;

  // Number line track
  stroke(100);
  strokeWeight(2);
  line(lineX, lineY, lineX + lineW, lineY);

  // Tick marks
  let scenario = scenarios[currentScenario];
  let posRange = getYRange(scenario.position);
  let tickStep = Math.ceil((posRange.max - posRange.min) / 6);
  if (tickStep === 0) tickStep = 1;

  stroke(100);
  strokeWeight(1);
  fill(80);
  textSize(9);
  textAlign(CENTER, TOP);

  for (let val = Math.ceil(posRange.min); val <= Math.floor(posRange.max); val += tickStep) {
    let tx = map(val, posRange.min, posRange.max, lineX, lineX + lineW);
    line(tx, lineY - 5, tx, lineY + 5);
    text(val, tx, lineY + 8);
  }

  // Draw trace history
  if (traceHistory.length > 1) {
    noFill();
    stroke(0, 150, 100, 100);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < traceHistory.length; i++) {
      let pt = traceHistory[i];
      let px = map(pt.pos, posRange.min, posRange.max, lineX, lineX + lineW);
      let py = lineY - 20 + (i / traceHistory.length) * 10; // Slight vertical offset for visibility
      vertex(px, py);
    }
    endShape();

    // Trail dots
    for (let i = 0; i < traceHistory.length; i += 5) {
      let pt = traceHistory[i];
      let px = map(pt.pos, posRange.min, posRange.max, lineX, lineX + lineW);
      let alpha = map(i, 0, traceHistory.length, 50, 200);
      fill(0, 150, 100, alpha);
      noStroke();
      circle(px, lineY - 15, 4);
    }
  }

  // Draw particle
  let currentPos = scenario.position(currentTime);
  let currentVel = scenario.velocity(currentTime);
  let particleX = map(currentPos, posRange.min, posRange.max, lineX, lineX + lineW);

  // Velocity arrow
  let arrowScale = 15;
  let arrowLen = currentVel * arrowScale / Math.max(Math.abs(getYRange(scenario.velocity).max), Math.abs(getYRange(scenario.velocity).min));
  arrowLen = constrain(arrowLen, -50, 50);

  stroke(200, 100, 50);
  strokeWeight(2);
  line(particleX, lineY, particleX + arrowLen, lineY);

  // Arrow head
  if (Math.abs(arrowLen) > 5) {
    let headDir = arrowLen > 0 ? 1 : -1;
    let headX = particleX + arrowLen;
    fill(200, 100, 50);
    noStroke();
    triangle(headX, lineY, headX - headDir * 8, lineY - 5, headX - headDir * 8, lineY + 5);
  }

  // Particle body
  fill(0, 150, 100);
  stroke(0, 100, 70);
  strokeWeight(2);
  circle(particleX, lineY, 20);

  // Direction indicator on particle
  fill(255);
  noStroke();
  if (currentVel > 0.1) {
    triangle(particleX + 2, lineY, particleX - 4, lineY - 4, particleX - 4, lineY + 4);
  } else if (currentVel < -0.1) {
    triangle(particleX - 2, lineY, particleX + 4, lineY - 4, particleX + 4, lineY + 4);
  } else {
    circle(particleX, lineY, 6);
  }

  // Labels
  fill(80);
  noStroke();
  textSize(10);
  textAlign(LEFT, TOP);
  text('Position: ' + currentPos.toFixed(2), x + 10, y + h - 45);

  fill(200, 100, 50);
  text('Velocity: ' + currentVel.toFixed(2), x + 10, y + h - 30);

  // Direction interpretation
  fill(0, 120, 80);
  textSize(9);
  let dirText = '';
  if (currentVel > 0.1) dirText = 'Moving RIGHT';
  else if (currentVel < -0.1) dirText = 'Moving LEFT';
  else dirText = 'Momentarily STATIONARY';
  text(dirText, x + 10, y + h - 15);
}

function drawGraphAxes(x, y, w, h, xLabel, yLabel) {
  // Grid
  stroke(230);
  strokeWeight(1);

  // Vertical grid lines (time)
  for (let i = 0; i <= 5; i++) {
    let gx = x + (i / 5) * w;
    line(gx, y, gx, y + h);
  }

  // Horizontal grid lines
  for (let i = 0; i <= 4; i++) {
    let gy = y + (i / 4) * h;
    line(x, gy, x + w, gy);
  }

  // Axes
  stroke(100);
  strokeWeight(1);
  line(x, y + h, x + w, y + h); // X-axis
  line(x, y, x, y + h); // Y-axis

  // Labels
  fill(100);
  noStroke();
  textSize(9);
  textAlign(CENTER, TOP);
  text(xLabel, x + w + 10, y + h - 5);
  textAlign(RIGHT, CENTER);
  text(yLabel, x - 3, y + 5);

  // Time axis labels
  textAlign(CENTER, TOP);
  textSize(8);
  text('0', x, y + h + 2);
  text(tMax.toString(), x + w, y + h + 2);
}

function drawFunctionCurve(x, y, w, h, func, col) {
  let yRange = getYRange(func);

  stroke(col);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let px = 0; px <= w; px += 2) {
    let t = map(px, 0, w, tMin, tMax);
    let val = func(t);
    let py = map(val, yRange.min, yRange.max, y + h, y);
    py = constrain(py, y, y + h);
    vertex(x + px, py);
  }
  endShape();
}

function getYRange(func) {
  let minVal = Infinity;
  let maxVal = -Infinity;

  for (let t = tMin; t <= tMax; t += 0.1) {
    let val = func(t);
    if (val < minVal) minVal = val;
    if (val > maxVal) maxVal = val;
  }

  // Add some padding
  let padding = (maxVal - minVal) * 0.1;
  if (padding === 0) padding = 1;

  return {min: minVal - padding, max: maxVal + padding};
}

function drawTimeMarkers() {
  let scenario = scenarios[currentScenario];

  // Position graph marker
  drawMarkerOnGraph(leftPanelX, topPanelY, panelWidth, panelHeight,
                    scenario.position, color(50, 100, 200));

  // Velocity graph marker
  drawMarkerOnGraph(rightPanelX, topPanelY, panelWidth, panelHeight,
                    scenario.velocity, color(200, 100, 50));

  // Acceleration graph marker
  drawMarkerOnGraph(leftPanelX, bottomPanelY, panelWidth, panelHeight,
                    scenario.acceleration, color(150, 50, 200));
}

function drawMarkerOnGraph(panelX, panelY, panelW, panelH, func, col) {
  let graphX = panelX + 35;
  let graphW = panelW - 45;
  let graphY = panelY + 20;
  let graphH = panelH - 35;

  let yRange = getYRange(func);

  // Vertical time line
  let tx = map(currentTime, tMin, tMax, graphX, graphX + graphW);

  stroke(100, 100, 100, 150);
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(tx, graphY, tx, graphY + graphH);
  drawingContext.setLineDash([]);

  // Point on curve
  let val = func(currentTime);
  let ty = map(val, yRange.min, yRange.max, graphY + graphH, graphY);
  ty = constrain(ty, graphY, graphY + graphH);

  fill(col);
  stroke(255);
  strokeWeight(2);
  circle(tx, ty, 10);
}

function drawValuesDisplay() {
  let scenario = scenarios[currentScenario];
  let s = scenario.position(currentTime);
  let v = scenario.velocity(currentTime);
  let a = scenario.acceleration(currentTime);

  // Display box in top right
  let boxX = rightPanelX + panelWidth - 95;
  let boxY = topPanelY + 18;
  let boxW = 90;
  let boxH = 60;

  fill(255, 255, 255, 230);
  stroke(180);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 5);

  textAlign(LEFT, TOP);
  textSize(10);

  fill(50, 100, 200);
  text('s(t) = ' + s.toFixed(2), boxX + 5, boxY + 5);

  fill(200, 100, 50);
  text('v(t) = ' + v.toFixed(2), boxX + 5, boxY + 20);

  fill(150, 50, 200);
  text('a(t) = ' + a.toFixed(2), boxX + 5, boxY + 35);

  fill(80);
  text('t = ' + currentTime.toFixed(2), boxX + 5, boxY + 48);
}

function drawControls() {
  // Row 1: Play/Pause button
  fill(isPlaying ? '#f44336' : '#4CAF50');
  stroke(isPlaying ? '#c62828' : '#388E3C');
  strokeWeight(1);
  rect(playBtnX, playBtnY, playBtnW, 28, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(isPlaying ? 'Pause' : 'Play', playBtnX + playBtnW/2, playBtnY + 14);

  // Time slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('t = ' + currentTime.toFixed(1), playBtnX + playBtnW + 10, timeSliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(timeSliderX, timeSliderY - 5, timeSliderW, 10, 5);

  // Slider handle
  let timeHandleX = map(currentTime, tMin, tMax, timeSliderX, timeSliderX + timeSliderW);
  fill(isDraggingTimeSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(timeHandleX, timeSliderY, 16);

  // Scenario buttons
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Scenario:', scenarioBtnX - 60, scenarioBtnY + 14);

  for (let i = 0; i < scenarios.length; i++) {
    let bx = scenarioBtnX + (i % 2) * (scenarioBtnW + 5);
    let by = scenarioBtnY + Math.floor(i / 2) * 32;

    fill(currentScenario === i ? '#4CAF50' : '#e0e0e0');
    stroke(currentScenario === i ? '#388E3C' : '#bdbdbd');
    strokeWeight(1);
    rect(bx, by, scenarioBtnW, 28, 5);

    fill(currentScenario === i ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(scenarios[i].name, bx + scenarioBtnW/2, by + 14);
  }

  // Row 2: Speed slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Speed: ' + animationSpeed.toFixed(1) + 'x', margin, speedSliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(speedSliderX, speedSliderY - 5, speedSliderW, 10, 5);

  // Slider handle
  let speedHandleX = map(animationSpeed, 0.1, 3.0, speedSliderX, speedSliderX + speedSliderW);
  fill(isDraggingSpeedSlider ? '#9933ff' : '#bb66ff');
  noStroke();
  circle(speedHandleX, speedSliderY, 16);

  // Reset button
  fill('#FF9800');
  stroke('#F57C00');
  strokeWeight(1);
  rect(resetBtnX, resetBtnY, 60, 28, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Reset', resetBtnX + 30, resetBtnY + 14);

  // Formula display
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text(scenarios[currentScenario].description, resetBtnX + 75, speedSliderY);
}

function mousePressed() {
  // Check play button
  if (mouseX >= playBtnX && mouseX <= playBtnX + playBtnW &&
      mouseY >= playBtnY && mouseY <= playBtnY + 28) {
    isPlaying = !isPlaying;
    lastFrameTime = millis();
    return;
  }

  // Check time slider
  let timeHandleX = map(currentTime, tMin, tMax, timeSliderX, timeSliderX + timeSliderW);
  if (dist(mouseX, mouseY, timeHandleX, timeSliderY) < 12) {
    isDraggingTimeSlider = true;
    return;
  }

  // Check time slider track
  if (mouseY > timeSliderY - 15 && mouseY < timeSliderY + 15 &&
      mouseX > timeSliderX && mouseX < timeSliderX + timeSliderW) {
    currentTime = map(mouseX, timeSliderX, timeSliderX + timeSliderW, tMin, tMax);
    currentTime = constrain(currentTime, tMin, tMax);
    isDraggingTimeSlider = true;
    traceHistory = [];
    return;
  }

  // Check speed slider
  let speedHandleX = map(animationSpeed, 0.1, 3.0, speedSliderX, speedSliderX + speedSliderW);
  if (dist(mouseX, mouseY, speedHandleX, speedSliderY) < 12) {
    isDraggingSpeedSlider = true;
    return;
  }

  // Check speed slider track
  if (mouseY > speedSliderY - 15 && mouseY < speedSliderY + 15 &&
      mouseX > speedSliderX && mouseX < speedSliderX + speedSliderW) {
    animationSpeed = map(mouseX, speedSliderX, speedSliderX + speedSliderW, 0.1, 3.0);
    animationSpeed = constrain(animationSpeed, 0.1, 3.0);
    isDraggingSpeedSlider = true;
    return;
  }

  // Check scenario buttons
  for (let i = 0; i < scenarios.length; i++) {
    let bx = scenarioBtnX + (i % 2) * (scenarioBtnW + 5);
    let by = scenarioBtnY + Math.floor(i / 2) * 32;

    if (mouseX >= bx && mouseX <= bx + scenarioBtnW &&
        mouseY >= by && mouseY <= by + 28) {
      currentScenario = i;
      currentTime = 0;
      traceHistory = [];
      return;
    }
  }

  // Check reset button
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 60 &&
      mouseY >= resetBtnY && mouseY <= resetBtnY + 28) {
    currentTime = 0;
    isPlaying = false;
    traceHistory = [];
    return;
  }
}

function mouseDragged() {
  if (isDraggingTimeSlider) {
    currentTime = map(mouseX, timeSliderX, timeSliderX + timeSliderW, tMin, tMax);
    currentTime = constrain(currentTime, tMin, tMax);
    traceHistory = [];
  }
  if (isDraggingSpeedSlider) {
    animationSpeed = map(mouseX, speedSliderX, speedSliderX + speedSliderW, 0.1, 3.0);
    animationSpeed = constrain(animationSpeed, 0.1, 3.0);
    animationSpeed = Math.round(animationSpeed * 10) / 10;
  }
}

function mouseReleased() {
  isDraggingTimeSlider = false;
  isDraggingSpeedSlider = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayoutPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  updateLayoutPositions();
}
