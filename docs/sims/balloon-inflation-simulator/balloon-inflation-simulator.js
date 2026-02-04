// Balloon Inflation Simulator MicroSim
// Compares how the rate of radius change varies with different radii and volume flow rates
// Demonstrates the inverse relationship: dr/dt = (dV/dt) / (4*pi*r^2)
// Bloom Level: Analyze (L4), Verb: compare, analyze, discover
// Learning Objective: Students will compare how the rate of radius change varies
// with different radii and volume flow rates, discovering the inverse relationship

let canvasWidth = 700;
let drawHeight = 500;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 55; // Room for title + subtitle
let defaultTextSize = 14;

// Balloon state
let volume = 10;        // cm^3 - initial volume
let radius;             // cm - calculated from volume
let time = 0;           // seconds
let maxVolume = 5000;   // cm^3 - maximum balloon volume
let minVolume = 10;     // cm^3 - minimum starting volume

// Physics parameters
let dVdt = 50;          // cm^3/sec - volume flow rate
let animationSpeed = 1; // Speed multiplier

// Animation state
let isPlaying = false;
let lastFrameTime = 0;

// Data history for graphs
let timeHistory = [];
let volumeHistory = [];
let radiusHistory = [];
let drHistory = [];
let maxHistoryLength = 300;

// Layout regions
let balloonCenterX, balloonCenterY;
let graphLeft, graphRight, graphTop, graphBottom;
let graphWidth, graphHeight;
let graphYOffset = 60; // Starting y for graphs

// Control positions
let flowSliderX, flowSliderY, flowSliderW;
let speedSliderX, speedSliderY, speedSliderW;
let playBtnX, playBtnY;
let resetBtnX, resetBtnY;

// Dragging state
let isDraggingFlowSlider = false;
let isDraggingSpeedSlider = false;

// Air particle animation
let particles = [];
let maxParticles = 20;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();
  resetSimulation();

  describe('Interactive balloon inflation simulation showing how the rate of radius change varies inversely with balloon size. Features animated balloon, volume flow visualization, and graphs of V(t), r(t), and dr/dt.', LABEL);
}

function updateLayoutPositions() {
  // Balloon display area (left side)
  balloonCenterX = 120;
  balloonCenterY = drawHeight / 2 + 20;

  // Graph area (right side) - three small graphs stacked
  graphLeft = 260;
  graphRight = canvasWidth - 15;
  graphWidth = graphRight - graphLeft;
  graphHeight = 90;

  // Control positions
  flowSliderX = 140;
  flowSliderY = drawHeight + 25;
  flowSliderW = 200;

  speedSliderX = 140;
  speedSliderY = drawHeight + 60;
  speedSliderW = 200;

  playBtnX = 400;
  playBtnY = drawHeight + 15;

  resetBtnX = 510;
  resetBtnY = drawHeight + 15;
}

function resetSimulation() {
  volume = minVolume;
  radius = Math.pow((3 * volume) / (4 * Math.PI), 1/3);
  time = 0;
  timeHistory = [];
  volumeHistory = [];
  radiusHistory = [];
  drHistory = [];
  particles = [];
  isPlaying = false;
  recordDataPoint();
}

function calculateRadius(v) {
  // V = (4/3) * pi * r^3, so r = (3V / 4pi)^(1/3)
  return Math.pow((3 * v) / (4 * Math.PI), 1/3);
}

function calculateDrDt(r, dvdt) {
  // From V = (4/3)*pi*r^3, differentiating: dV/dt = 4*pi*r^2 * dr/dt
  // Therefore: dr/dt = (dV/dt) / (4*pi*r^2)
  if (r <= 0) return 0;
  return dvdt / (4 * Math.PI * r * r);
}

function recordDataPoint() {
  timeHistory.push(time);
  volumeHistory.push(volume);
  radiusHistory.push(radius);
  drHistory.push(calculateDrDt(radius, dVdt));

  // Limit history length
  if (timeHistory.length > maxHistoryLength) {
    timeHistory.shift();
    volumeHistory.shift();
    radiusHistory.shift();
    drHistory.shift();
  }
}

function updateSimulation(dt) {
  if (!isPlaying) return;

  // Update time and volume
  let effectiveDt = dt * animationSpeed;
  time += effectiveDt;
  volume += dVdt * effectiveDt;

  // Cap at maximum volume
  if (volume >= maxVolume) {
    volume = maxVolume;
    isPlaying = false;
  }

  // Update radius from new volume
  radius = calculateRadius(volume);

  // Record data every ~0.1 seconds
  if (timeHistory.length === 0 || time - timeHistory[timeHistory.length - 1] >= 0.1) {
    recordDataPoint();
  }

  // Update particles
  updateParticles(effectiveDt);
}

function updateParticles(dt) {
  // Spawn new particles when playing
  if (isPlaying && particles.length < maxParticles && frameCount % 3 === 0) {
    particles.push({
      x: balloonCenterX - 60,
      y: balloonCenterY + 70,
      targetX: balloonCenterX + random(-10, 10),
      targetY: balloonCenterY + random(-10, 10),
      progress: 0,
      size: random(3, 6)
    });
  }

  // Update existing particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].progress += dt * 2;
    if (particles[i].progress >= 1) {
      particles.splice(i, 1);
    }
  }
}

function draw() {
  updateCanvasSize();

  // Calculate time delta
  let currentTime = millis() / 1000;
  let dt = currentTime - lastFrameTime;
  lastFrameTime = currentTime;

  // Clamp dt to prevent huge jumps
  dt = min(dt, 0.05);

  // Update simulation
  updateSimulation(dt);

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

  // Draw balloon visualization
  drawBalloon();

  // Draw air flow visualization
  drawAirFlow();

  // Draw values display
  drawValuesPanel();

  // Draw graphs
  drawVolumeGraph();
  drawRadiusGraph();
  drawDrDtGraph();

  // Draw key observations panel
  drawObservationsPanel();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Balloon Inflation Simulator', canvasWidth / 2, 5);
  textSize(14);
  fill(100);
  text('Discovering: dr/dt = (dV/dt) / (4\u03C0r\u00B2)', canvasWidth / 2, 28);
}

function drawBalloon() {
  // Calculate display radius (scaled for visualization)
  let maxDisplayRadius = 80;
  let minDisplayRadius = 15;
  let maxR = calculateRadius(maxVolume);
  let minR = calculateRadius(minVolume);
  let displayRadius = map(radius, minR, maxR, minDisplayRadius, maxDisplayRadius);

  // Draw balloon string/neck
  stroke(100, 80, 60);
  strokeWeight(3);
  line(balloonCenterX, balloonCenterY + displayRadius, balloonCenterX, balloonCenterY + displayRadius + 40);

  // Draw balloon body (gradient effect)
  noStroke();
  // Outer glow
  for (let i = 5; i >= 0; i--) {
    let alpha = map(i, 0, 5, 50, 10);
    fill(200, 100, 100, alpha);
    ellipse(balloonCenterX, balloonCenterY, (displayRadius + i * 3) * 2);
  }

  // Main balloon
  fill(220, 80, 80, 200);
  ellipse(balloonCenterX, balloonCenterY, displayRadius * 2);

  // Highlight
  fill(255, 255, 255, 100);
  noStroke();
  ellipse(balloonCenterX - displayRadius * 0.3, balloonCenterY - displayRadius * 0.3, displayRadius * 0.5, displayRadius * 0.4);

  // Balloon neck
  fill(180, 60, 60);
  noStroke();
  beginShape();
  vertex(balloonCenterX - 8, balloonCenterY + displayRadius - 5);
  vertex(balloonCenterX + 8, balloonCenterY + displayRadius - 5);
  vertex(balloonCenterX + 4, balloonCenterY + displayRadius + 15);
  vertex(balloonCenterX - 4, balloonCenterY + displayRadius + 15);
  endShape(CLOSE);

  // Radius indicator line
  if (displayRadius > 25) {
    stroke(50, 50, 150);
    strokeWeight(2);
    drawingContext.setLineDash([4, 4]);
    line(balloonCenterX, balloonCenterY, balloonCenterX + displayRadius, balloonCenterY);
    drawingContext.setLineDash([]);

    // Radius label
    fill(50, 50, 150);
    noStroke();
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text('r', balloonCenterX + displayRadius / 2, balloonCenterY - 5);
  }
}

function drawAirFlow() {
  if (!isPlaying && particles.length === 0) return;

  // Draw pump/source indicator
  fill(150, 150, 180);
  stroke(100, 100, 130);
  strokeWeight(2);
  rect(balloonCenterX - 80, balloonCenterY + 55, 40, 30, 5);

  // Pump label
  fill(80);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  text('Air', balloonCenterX - 60, balloonCenterY + 70);

  // Draw particles
  noStroke();
  for (let p of particles) {
    let x = lerp(p.x, p.targetX, p.progress);
    let y = lerp(p.y, p.targetY, p.progress);
    let alpha = map(p.progress, 0, 1, 255, 50);
    fill(100, 150, 255, alpha);
    circle(x, y, p.size);
  }

  // Draw flow arrow when playing
  if (isPlaying) {
    stroke(100, 150, 255, 150);
    strokeWeight(2);
    let arrowX = balloonCenterX - 30;
    let arrowY = balloonCenterY + 70;
    line(arrowX - 15, arrowY, arrowX + 15, arrowY);
    // Arrowhead
    fill(100, 150, 255, 150);
    noStroke();
    triangle(arrowX + 15, arrowY, arrowX + 8, arrowY - 5, arrowX + 8, arrowY + 5);
  }
}

function drawValuesPanel() {
  let panelX = 15;
  let panelY = chartTop + 5;
  let panelW = 215;
  let panelH = 130;

  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text('Current Values:', panelX + 10, panelY + 8);

  textSize(12);
  let yPos = panelY + 28;
  let lineH = 18;

  // Volume
  fill(70, 130, 70);
  text('V = ' + volume.toFixed(1) + ' cm\u00B3', panelX + 10, yPos);
  yPos += lineH;

  // Radius
  fill(70, 70, 180);
  text('r = ' + radius.toFixed(2) + ' cm', panelX + 10, yPos);
  yPos += lineH;

  // dV/dt (input)
  fill(200, 100, 50);
  text('dV/dt = ' + dVdt.toFixed(0) + ' cm\u00B3/s', panelX + 10, yPos);
  yPos += lineH;

  // dr/dt (output)
  let drdt = calculateDrDt(radius, dVdt);
  fill(150, 50, 150);
  text('dr/dt = ' + drdt.toFixed(4) + ' cm/s', panelX + 10, yPos);
  yPos += lineH;

  // Surface area
  let surfaceArea = 4 * Math.PI * radius * radius;
  fill(100, 100, 100);
  text('Surface = ' + surfaceArea.toFixed(1) + ' cm\u00B2', panelX + 10, yPos);
}

function drawObservationsPanel() {
  let panelX = 15;
  let panelY = chartTop + 145;
  let panelW = 215;
  let panelH = 115;

  fill(255, 250, 240);
  stroke(200, 180, 150);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  fill(100, 70, 30);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Key Observations:', panelX + 10, panelY + 8);

  textSize(10);
  fill(80, 60, 40);
  let yPos = panelY + 26;

  text('\u2022 dr/dt decreases as r increases', panelX + 10, yPos);
  yPos += 14;
  text('  (same air flow, bigger surface)', panelX + 10, yPos);
  yPos += 18;

  // Formula
  fill(150, 50, 150);
  textSize(11);
  text('Formula:', panelX + 10, yPos);
  yPos += 14;
  textSize(10);
  text('dr/dt = (dV/dt) / (4\u03C0r\u00B2)', panelX + 20, yPos);
  yPos += 18;

  fill(80, 60, 40);
  textSize(10);
  text('\u2022 Inverse square relationship!', panelX + 10, yPos);
}

function drawVolumeGraph() {
  let gLeft = graphLeft;
  let gTop = graphYOffset;
  let gHeight = graphHeight;

  // Background
  fill(250, 255, 250);
  stroke(200);
  strokeWeight(1);
  rect(gLeft, gTop, graphWidth, gHeight, 4);

  // Title
  fill(70, 130, 70);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text('V(t) - Volume over time', gLeft + 5, gTop + 3);

  // Draw axes
  let plotLeft = gLeft + 35;
  let plotRight = gLeft + graphWidth - 10;
  let plotTop = gTop + 20;
  let plotBottom = gTop + gHeight - 15;
  let plotWidth = plotRight - plotLeft;
  let plotHeight = plotBottom - plotTop;

  stroke(150);
  strokeWeight(1);
  line(plotLeft, plotBottom, plotRight, plotBottom); // x-axis
  line(plotLeft, plotBottom, plotLeft, plotTop);     // y-axis

  // Y-axis labels
  fill(100);
  noStroke();
  textSize(9);
  textAlign(RIGHT, CENTER);
  text('0', plotLeft - 3, plotBottom);
  text(maxVolume.toFixed(0), plotLeft - 3, plotTop);

  // X-axis label
  textAlign(CENTER, TOP);
  text('time', (plotLeft + plotRight) / 2, plotBottom + 2);

  // Draw data
  if (volumeHistory.length > 1) {
    stroke(70, 130, 70);
    strokeWeight(2);
    noFill();
    beginShape();
    let maxTime = max(timeHistory);
    for (let i = 0; i < volumeHistory.length; i++) {
      let x = map(timeHistory[i], 0, max(maxTime, 10), plotLeft, plotRight);
      let y = map(volumeHistory[i], 0, maxVolume, plotBottom, plotTop);
      vertex(x, y);
    }
    endShape();
  }
}

function drawRadiusGraph() {
  let gLeft = graphLeft;
  let gTop = graphYOffset + graphHeight + 15;
  let gHeight = graphHeight;

  // Background
  fill(250, 250, 255);
  stroke(200);
  strokeWeight(1);
  rect(gLeft, gTop, graphWidth, gHeight, 4);

  // Title
  fill(70, 70, 180);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text('r(t) - Radius over time', gLeft + 5, gTop + 3);

  // Draw axes
  let plotLeft = gLeft + 35;
  let plotRight = gLeft + graphWidth - 10;
  let plotTop = gTop + 20;
  let plotBottom = gTop + gHeight - 15;
  let plotWidth = plotRight - plotLeft;
  let plotHeight = plotBottom - plotTop;

  let maxR = calculateRadius(maxVolume);

  stroke(150);
  strokeWeight(1);
  line(plotLeft, plotBottom, plotRight, plotBottom);
  line(plotLeft, plotBottom, plotLeft, plotTop);

  // Y-axis labels
  fill(100);
  noStroke();
  textSize(9);
  textAlign(RIGHT, CENTER);
  text('0', plotLeft - 3, plotBottom);
  text(maxR.toFixed(1), plotLeft - 3, plotTop);

  // X-axis label
  textAlign(CENTER, TOP);
  text('time', (plotLeft + plotRight) / 2, plotBottom + 2);

  // Draw data
  if (radiusHistory.length > 1) {
    stroke(70, 70, 180);
    strokeWeight(2);
    noFill();
    beginShape();
    let maxTime = max(timeHistory);
    for (let i = 0; i < radiusHistory.length; i++) {
      let x = map(timeHistory[i], 0, max(maxTime, 10), plotLeft, plotRight);
      let y = map(radiusHistory[i], 0, maxR, plotBottom, plotTop);
      vertex(x, y);
    }
    endShape();
  }
}

function drawDrDtGraph() {
  let gLeft = graphLeft;
  let gTop = graphYOffset + (graphHeight + 15) * 2;
  let gHeight = graphHeight;

  // Background
  fill(255, 250, 255);
  stroke(200);
  strokeWeight(1);
  rect(gLeft, gTop, graphWidth, gHeight, 4);

  // Title
  fill(150, 50, 150);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text('dr/dt - Rate of radius change', gLeft + 5, gTop + 3);

  // Draw axes
  let plotLeft = gLeft + 35;
  let plotRight = gLeft + graphWidth - 10;
  let plotTop = gTop + 20;
  let plotBottom = gTop + gHeight - 15;

  // Calculate max dr/dt (at minimum radius)
  let minR = calculateRadius(minVolume);
  let maxDr = calculateDrDt(minR, 200); // Use max flow rate for scale

  stroke(150);
  strokeWeight(1);
  line(plotLeft, plotBottom, plotRight, plotBottom);
  line(plotLeft, plotBottom, plotLeft, plotTop);

  // Y-axis labels
  fill(100);
  noStroke();
  textSize(9);
  textAlign(RIGHT, CENTER);
  text('0', plotLeft - 3, plotBottom);
  text(maxDr.toFixed(2), plotLeft - 3, plotTop);

  // X-axis label
  textAlign(CENTER, TOP);
  text('time', (plotLeft + plotRight) / 2, plotBottom + 2);

  // Draw data - this is the key graph showing dr/dt decreasing!
  if (drHistory.length > 1) {
    stroke(150, 50, 150);
    strokeWeight(2);
    noFill();
    beginShape();
    let maxTime = max(timeHistory);
    for (let i = 0; i < drHistory.length; i++) {
      let x = map(timeHistory[i], 0, max(maxTime, 10), plotLeft, plotRight);
      let y = map(drHistory[i], 0, maxDr, plotBottom, plotTop);
      vertex(x, constrain(y, plotTop, plotBottom));
    }
    endShape();
  }

  // Add annotation showing the decrease
  if (drHistory.length > 5) {
    fill(150, 50, 150, 150);
    noStroke();
    textSize(9);
    textAlign(LEFT, TOP);
    text('\u2193 decreasing!', plotRight - 60, plotTop + 5);
  }
}

function drawControls() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  // Flow rate slider label
  text('dV/dt: ' + dVdt.toFixed(0) + ' cm\u00B3/s', 10, flowSliderY);

  // Flow rate slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(flowSliderX, flowSliderY - 6, flowSliderW, 12, 6);

  // Slider fill
  let flowFill = map(dVdt, 10, 200, 0, flowSliderW);
  fill(200, 100, 50);
  noStroke();
  rect(flowSliderX, flowSliderY - 6, flowFill, 12, 6);

  // Slider handle
  let flowHandleX = map(dVdt, 10, 200, flowSliderX, flowSliderX + flowSliderW);
  fill(isDraggingFlowSlider ? '#cc6600' : '#ff8800');
  stroke(255);
  strokeWeight(2);
  circle(flowHandleX, flowSliderY, 20);

  // Speed slider label
  fill('black');
  noStroke();
  text('Speed: ' + animationSpeed.toFixed(1) + 'x', 10, speedSliderY);

  // Speed slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(speedSliderX, speedSliderY - 6, speedSliderW, 12, 6);

  // Slider fill
  let speedFill = map(animationSpeed, 0.5, 3, 0, speedSliderW);
  fill(100, 100, 200);
  noStroke();
  rect(speedSliderX, speedSliderY - 6, speedFill, 12, 6);

  // Slider handle
  let speedHandleX = map(animationSpeed, 0.5, 3, speedSliderX, speedSliderX + speedSliderW);
  fill(isDraggingSpeedSlider ? '#4444cc' : '#6666ff');
  stroke(255);
  strokeWeight(2);
  circle(speedHandleX, speedSliderY, 20);

  // Play/Pause button
  let playBtnW = 100;
  let playBtnH = 35;
  fill(isPlaying ? '#ff6666' : '#66cc66');
  stroke(isPlaying ? '#cc4444' : '#44aa44');
  strokeWeight(2);
  rect(playBtnX, playBtnY, playBtnW, playBtnH, 8);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(isPlaying ? 'Pause' : 'Play', playBtnX + playBtnW / 2, playBtnY + playBtnH / 2);

  // Reset button
  fill('#888888');
  stroke('#666666');
  strokeWeight(2);
  rect(resetBtnX, resetBtnY, 80, playBtnH, 8);

  fill('white');
  noStroke();
  text('Reset', resetBtnX + 40, resetBtnY + playBtnH / 2);

  // Time display
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Time: ' + time.toFixed(1) + 's', playBtnX, playBtnY + playBtnH + 20);

  // Status indicator
  if (volume >= maxVolume) {
    fill(200, 100, 100);
    textAlign(RIGHT, CENTER);
    text('Balloon full!', resetBtnX + 80, playBtnY + playBtnH + 20);
  }
}

function mousePressed() {
  // Check flow slider
  let flowHandleX = map(dVdt, 10, 200, flowSliderX, flowSliderX + flowSliderW);
  if (dist(mouseX, mouseY, flowHandleX, flowSliderY) < 15 ||
      (mouseY > flowSliderY - 15 && mouseY < flowSliderY + 15 &&
       mouseX >= flowSliderX && mouseX <= flowSliderX + flowSliderW)) {
    isDraggingFlowSlider = true;
    updateFlowFromMouse();
    return;
  }

  // Check speed slider
  let speedHandleX = map(animationSpeed, 0.5, 3, speedSliderX, speedSliderX + speedSliderW);
  if (dist(mouseX, mouseY, speedHandleX, speedSliderY) < 15 ||
      (mouseY > speedSliderY - 15 && mouseY < speedSliderY + 15 &&
       mouseX >= speedSliderX && mouseX <= speedSliderX + speedSliderW)) {
    isDraggingSpeedSlider = true;
    updateSpeedFromMouse();
    return;
  }

  // Check play button
  if (mouseX >= playBtnX && mouseX <= playBtnX + 100 &&
      mouseY >= playBtnY && mouseY <= playBtnY + 35) {
    if (volume >= maxVolume) {
      resetSimulation();
    }
    isPlaying = !isPlaying;
    return;
  }

  // Check reset button
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + 80 &&
      mouseY >= resetBtnY && mouseY <= resetBtnY + 35) {
    resetSimulation();
    return;
  }
}

function mouseDragged() {
  if (isDraggingFlowSlider) {
    updateFlowFromMouse();
  }
  if (isDraggingSpeedSlider) {
    updateSpeedFromMouse();
  }
}

function mouseReleased() {
  isDraggingFlowSlider = false;
  isDraggingSpeedSlider = false;
}

function updateFlowFromMouse() {
  dVdt = map(mouseX, flowSliderX, flowSliderX + flowSliderW, 10, 200);
  dVdt = constrain(dVdt, 10, 200);
  dVdt = round(dVdt);
}

function updateSpeedFromMouse() {
  animationSpeed = map(mouseX, speedSliderX, speedSliderX + speedSliderW, 0.5, 3);
  animationSpeed = constrain(animationSpeed, 0.5, 3);
  animationSpeed = round(animationSpeed * 10) / 10;
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
