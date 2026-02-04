// Direction of Motion Analyzer MicroSim
// Analyzes when an object moves in positive vs negative direction
// and identifies when it changes direction (v(t) = 0)
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 800;
let drawHeight = 450;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 20;
let defaultTextSize = 16;

// Layout regions
let numberLineY;
let velocityGraphTop = 70;
let velocityGraphBottom;
let velocityGraphLeft = 60;
let velocityGraphRight;

// Animation state
let isPlaying = false;
let currentTime = 0;
let animationSpeed = 0.02;
let particleX = 0;
let particlePosition = 0;

// Controls
let scenarioIndex = 0;
let showVelocityRegions = true;

// Button states
let playButtonHovered = false;
let resetButtonHovered = false;
let regionToggleHovered = false;
let scenarioButtonsHovered = [false, false, false, false];

// Time range for animation
let tMin = 0;
let tMax = 6;

// Preset scenarios with position functions
const scenarios = [
  {
    name: "Parabolic Motion",
    posFunc: (t) => -t * t + 4 * t,  // s(t) = -t^2 + 4t
    velFunc: (t) => -2 * t + 4,      // v(t) = -2t + 4
    posLabel: "s(t) = -t^2 + 4t",
    velLabel: "v(t) = -2t + 4",
    zeros: [2],  // v(t) = 0 at t = 2
    description: "Object thrown upward, slows down, stops, returns"
  },
  {
    name: "Cubic Motion",
    posFunc: (t) => (t - 1) * (t - 3) * (t - 5) / 4 + 2,
    velFunc: (t) => (3 * t * t - 18 * t + 23) / 4,
    posLabel: "s(t) = (t-1)(t-3)(t-5)/4 + 2",
    velLabel: "v(t) = (3t^2 - 18t + 23)/4",
    zeros: [1.85, 4.15],  // Approximate zeros
    description: "Object with two direction changes"
  },
  {
    name: "Sinusoidal Motion",
    posFunc: (t) => 2 * Math.sin(Math.PI * t / 2),
    velFunc: (t) => Math.PI * Math.cos(Math.PI * t / 2),
    posLabel: "s(t) = 2sin(pi*t/2)",
    velLabel: "v(t) = pi*cos(pi*t/2)",
    zeros: [1, 3, 5],  // v(t) = 0 at t = 1, 3, 5
    description: "Oscillating back and forth"
  },
  {
    name: "Linear Motion",
    posFunc: (t) => 0.5 * t - 1,
    velFunc: (t) => 0.5,
    posLabel: "s(t) = 0.5t - 1",
    velLabel: "v(t) = 0.5",
    zeros: [],
    description: "Constant positive velocity"
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  resetAnimation();

  describe('Interactive visualization showing direction of motion based on velocity sign. A particle moves along a number line while the velocity graph shows positive and negative regions.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Update animation if playing
  if (isPlaying) {
    currentTime += animationSpeed;
    if (currentTime > tMax) {
      currentTime = tMax;
      isPlaying = false;
    }
    updateParticlePosition();
  }

  // Background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Direction of Motion Analyzer', canvasWidth / 2, 8);

  textSize(14);
  fill(80);
  text('When is velocity positive, negative, or zero?', canvasWidth / 2, 32);

  // Calculate layout
  numberLineY = drawHeight - 80;
  velocityGraphBottom = numberLineY - 60;
  velocityGraphRight = canvasWidth - 40;

  // Draw velocity graph
  drawVelocityGraph();

  // Draw number line with particle
  drawNumberLine();

  // Draw timeline showing intervals
  drawIntervalTimeline();

  // Draw controls
  drawControls();
}

function drawVelocityGraph() {
  let scenario = scenarios[scenarioIndex];
  let graphWidth = velocityGraphRight - velocityGraphLeft;
  let graphHeight = velocityGraphBottom - velocityGraphTop;
  let graphCenterY = velocityGraphTop + graphHeight / 2;

  // Graph background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(velocityGraphLeft, velocityGraphTop, graphWidth, graphHeight, 5);

  // Draw velocity regions if enabled
  if (showVelocityRegions) {
    noStroke();

    // Sample and draw positive/negative regions
    for (let px = 0; px < graphWidth; px += 2) {
      let t = map(px, 0, graphWidth, tMin, tMax);
      let v = scenario.velFunc(t);
      let screenX = velocityGraphLeft + px;

      if (v > 0) {
        fill(100, 200, 100, 80);  // Green for positive
        let h = min(map(v, 0, 5, 0, graphHeight / 2), graphHeight / 2);
        rect(screenX, graphCenterY - h, 2, h);
      } else if (v < 0) {
        fill(255, 100, 100, 80);  // Red for negative
        let h = min(map(-v, 0, 5, 0, graphHeight / 2), graphHeight / 2);
        rect(screenX, graphCenterY, 2, h);
      }
    }
  }

  // Draw axes
  stroke(100);
  strokeWeight(1);
  // Time axis (horizontal at y=0 for velocity)
  line(velocityGraphLeft, graphCenterY, velocityGraphRight, graphCenterY);
  // Y axis
  line(velocityGraphLeft, velocityGraphTop, velocityGraphLeft, velocityGraphBottom);

  // Axis labels
  fill(60);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('t (time)', (velocityGraphLeft + velocityGraphRight) / 2, velocityGraphBottom + 3);

  push();
  translate(velocityGraphLeft - 35, graphCenterY);
  rotate(-PI/2);
  textAlign(CENTER, BOTTOM);
  text('v(t)', 0, 0);
  pop();

  // Draw tick marks and labels on time axis
  textSize(10);
  textAlign(CENTER, TOP);
  fill(80);
  for (let t = 0; t <= tMax; t++) {
    let x = map(t, tMin, tMax, velocityGraphLeft, velocityGraphRight);
    stroke(150);
    line(x, graphCenterY - 3, x, graphCenterY + 3);
    noStroke();
    text(t, x, graphCenterY + 5);
  }

  // Y-axis labels
  textAlign(RIGHT, CENTER);
  for (let v = -4; v <= 4; v += 2) {
    if (v !== 0) {
      let y = map(v, -5, 5, velocityGraphBottom, velocityGraphTop);
      if (y > velocityGraphTop + 10 && y < velocityGraphBottom - 10) {
        stroke(220);
        line(velocityGraphLeft, y, velocityGraphRight, y);
        noStroke();
        text(v, velocityGraphLeft - 5, y);
      }
    }
  }

  // Draw velocity curve
  stroke(0, 100, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = 0; px <= graphWidth; px += 2) {
    let t = map(px, 0, graphWidth, tMin, tMax);
    let v = scenario.velFunc(t);
    let screenX = velocityGraphLeft + px;
    let screenY = map(v, -5, 5, velocityGraphBottom, velocityGraphTop);
    screenY = constrain(screenY, velocityGraphTop, velocityGraphBottom);
    vertex(screenX, screenY);
  }
  endShape();

  // Mark zeros (direction change points)
  for (let zero of scenario.zeros) {
    if (zero >= tMin && zero <= tMax) {
      let x = map(zero, tMin, tMax, velocityGraphLeft, velocityGraphRight);

      // Vertical dashed line
      stroke(255, 150, 0);
      strokeWeight(2);
      for (let y = velocityGraphTop; y < velocityGraphBottom; y += 8) {
        line(x, y, x, min(y + 4, velocityGraphBottom));
      }

      // Circle at the zero
      fill(255, 150, 0);
      noStroke();
      circle(x, graphCenterY, 12);

      // Label
      fill(180, 100, 0);
      textSize(11);
      textAlign(CENTER, BOTTOM);
      text('v=0', x, velocityGraphTop - 2);
    }
  }

  // Draw current time marker
  let currentX = map(currentTime, tMin, tMax, velocityGraphLeft, velocityGraphRight);
  let currentV = scenario.velFunc(currentTime);
  let currentScreenY = map(currentV, -5, 5, velocityGraphBottom, velocityGraphTop);
  currentScreenY = constrain(currentScreenY, velocityGraphTop, velocityGraphBottom);

  // Vertical line at current time
  stroke(100, 100, 100, 150);
  strokeWeight(1);
  line(currentX, velocityGraphTop, currentX, velocityGraphBottom);

  // Point on curve
  fill(currentV > 0 ? color(0, 150, 0) : (currentV < 0 ? color(200, 0, 0) : color(255, 150, 0)));
  stroke(0);
  strokeWeight(2);
  circle(currentX, currentScreenY, 14);

  // Velocity function label
  fill(0, 100, 200);
  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);
  text(scenario.velLabel, velocityGraphLeft + 10, velocityGraphTop + 8);

  // Legend
  let legendX = velocityGraphRight - 130;
  let legendY = velocityGraphTop + 8;
  textSize(11);

  fill(100, 200, 100);
  rect(legendX, legendY, 12, 12);
  fill(60);
  textAlign(LEFT, CENTER);
  text('v > 0: right', legendX + 16, legendY + 6);

  fill(255, 100, 100);
  rect(legendX, legendY + 16, 12, 12);
  fill(60);
  text('v < 0: left', legendX + 16, legendY + 22);
}

function drawNumberLine() {
  let scenario = scenarios[scenarioIndex];
  let lineLeft = 80;
  let lineRight = canvasWidth - 80;
  let lineWidth = lineRight - lineLeft;

  // Number line label
  fill(40);
  noStroke();
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text('Position (Number Line)', canvasWidth / 2, numberLineY - 35);

  // Draw the number line
  stroke(60);
  strokeWeight(2);
  line(lineLeft, numberLineY, lineRight, numberLineY);

  // Arrowheads
  fill(60);
  noStroke();
  triangle(lineRight + 10, numberLineY, lineRight, numberLineY - 5, lineRight, numberLineY + 5);
  triangle(lineLeft - 10, numberLineY, lineLeft, numberLineY - 5, lineLeft, numberLineY + 5);

  // Tick marks and labels
  textSize(11);
  textAlign(CENTER, TOP);
  fill(80);
  for (let pos = -4; pos <= 4; pos++) {
    let x = map(pos, -5, 5, lineLeft, lineRight);
    stroke(60);
    strokeWeight(1);
    line(x, numberLineY - 5, x, numberLineY + 5);
    noStroke();
    text(pos, x, numberLineY + 8);
  }

  // Origin marker
  stroke(0);
  strokeWeight(2);
  let originX = map(0, -5, 5, lineLeft, lineRight);
  line(originX, numberLineY - 8, originX, numberLineY + 8);

  // Current velocity for direction arrow
  let currentV = scenario.velFunc(currentTime);

  // Draw particle
  let particleScreenX = map(particlePosition, -5, 5, lineLeft, lineRight);
  particleScreenX = constrain(particleScreenX, lineLeft, lineRight);

  // Direction arrow
  if (Math.abs(currentV) > 0.05) {
    let arrowLength = min(Math.abs(currentV) * 15, 40);
    let arrowDir = currentV > 0 ? 1 : -1;
    let arrowStartX = particleScreenX + arrowDir * 18;
    let arrowEndX = arrowStartX + arrowDir * arrowLength;

    stroke(currentV > 0 ? color(0, 150, 0) : color(200, 0, 0));
    strokeWeight(3);
    line(arrowStartX, numberLineY, arrowEndX, numberLineY);

    // Arrowhead
    fill(currentV > 0 ? color(0, 150, 0) : color(200, 0, 0));
    noStroke();
    if (arrowDir > 0) {
      triangle(arrowEndX + 8, numberLineY, arrowEndX, numberLineY - 6, arrowEndX, numberLineY + 6);
    } else {
      triangle(arrowEndX - 8, numberLineY, arrowEndX, numberLineY - 6, arrowEndX, numberLineY + 6);
    }
  }

  // Particle circle
  let particleColor;
  if (Math.abs(currentV) < 0.05) {
    particleColor = color(255, 150, 0);  // Orange when stopped
  } else if (currentV > 0) {
    particleColor = color(0, 150, 0);    // Green moving right
  } else {
    particleColor = color(200, 0, 0);    // Red moving left
  }

  fill(particleColor);
  stroke(0);
  strokeWeight(2);
  circle(particleScreenX, numberLineY, 24);

  // Direction label
  fill(40);
  noStroke();
  textSize(12);
  textAlign(CENTER, BOTTOM);
  let dirLabel;
  if (Math.abs(currentV) < 0.05) {
    dirLabel = 'STOPPED (changing direction)';
  } else if (currentV > 0) {
    dirLabel = 'Moving RIGHT (+)';
  } else {
    dirLabel = 'Moving LEFT (-)';
  }
  text(dirLabel, particleScreenX, numberLineY - 18);

  // Current position and velocity readout
  textSize(12);
  textAlign(LEFT, TOP);
  fill(60);
  text('t = ' + currentTime.toFixed(2), lineLeft, numberLineY + 25);
  text('s(t) = ' + particlePosition.toFixed(2), lineLeft + 80, numberLineY + 25);
  text('v(t) = ' + currentV.toFixed(2), lineLeft + 180, numberLineY + 25);
}

function drawIntervalTimeline() {
  let scenario = scenarios[scenarioIndex];
  let timelineY = drawHeight - 18;
  let timelineLeft = velocityGraphLeft;
  let timelineRight = velocityGraphRight;
  let timelineWidth = timelineRight - timelineLeft;
  let timelineHeight = 14;

  // Label
  fill(60);
  noStroke();
  textSize(11);
  textAlign(RIGHT, CENTER);
  text('Direction:', timelineLeft - 5, timelineY);

  // Draw colored intervals
  noStroke();
  let lastZero = tMin;
  let allZeros = [tMin, ...scenario.zeros.filter(z => z > tMin && z < tMax), tMax];

  for (let i = 0; i < allZeros.length - 1; i++) {
    let startT = allZeros[i];
    let endT = allZeros[i + 1];
    let midT = (startT + endT) / 2;
    let v = scenario.velFunc(midT);

    let startX = map(startT, tMin, tMax, timelineLeft, timelineRight);
    let endX = map(endT, tMin, tMax, timelineLeft, timelineRight);

    if (v > 0) {
      fill(100, 200, 100);
    } else if (v < 0) {
      fill(255, 100, 100);
    } else {
      fill(200);
    }

    rect(startX, timelineY - timelineHeight/2, endX - startX, timelineHeight);
  }

  // Border
  stroke(100);
  strokeWeight(1);
  noFill();
  rect(timelineLeft, timelineY - timelineHeight/2, timelineWidth, timelineHeight);

  // Current time indicator
  let currentX = map(currentTime, tMin, tMax, timelineLeft, timelineRight);
  stroke(0);
  strokeWeight(2);
  line(currentX, timelineY - timelineHeight/2 - 3, currentX, timelineY + timelineHeight/2 + 3);
}

function drawControls() {
  let controlY = drawHeight + 10;

  // Scenario selection label
  fill(40);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text('Scenario:', margin, controlY);

  // Scenario buttons
  let buttonStartX = margin + 70;
  let buttonWidth = (canvasWidth - buttonStartX - margin - 10) / 4;
  let buttonHeight = 28;

  for (let i = 0; i < scenarios.length; i++) {
    let bx = buttonStartX + i * (buttonWidth + 5);
    let isSelected = (i === scenarioIndex);
    let isHovered = scenarioButtonsHovered[i];

    // Button background
    if (isSelected) {
      fill(0, 100, 200);
    } else if (isHovered) {
      fill(200, 220, 240);
    } else {
      fill(230);
    }
    stroke(isSelected ? color(0, 80, 160) : color(180));
    strokeWeight(1);
    rect(bx, controlY, buttonWidth - 5, buttonHeight, 5);

    // Button text
    fill(isSelected ? 255 : 40);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text(scenarios[i].name, bx + (buttonWidth - 5) / 2, controlY + buttonHeight / 2);
  }

  // Second row of controls
  let row2Y = controlY + 40;

  // Play/Pause button
  let playBtnX = margin;
  let playBtnWidth = 80;

  if (playButtonHovered) {
    fill(isPlaying ? color(220, 200, 200) : color(200, 240, 200));
  } else {
    fill(isPlaying ? color(255, 220, 220) : color(220, 255, 220));
  }
  stroke(isPlaying ? color(200, 100, 100) : color(100, 200, 100));
  strokeWeight(2);
  rect(playBtnX, row2Y, playBtnWidth, buttonHeight, 5);

  fill(isPlaying ? color(180, 50, 50) : color(50, 150, 50));
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text(isPlaying ? 'Pause' : 'Play', playBtnX + playBtnWidth / 2, row2Y + buttonHeight / 2);

  // Reset button
  let resetBtnX = playBtnX + playBtnWidth + 10;
  let resetBtnWidth = 70;

  if (resetButtonHovered) {
    fill(220, 220, 240);
  } else {
    fill(230);
  }
  stroke(180);
  strokeWeight(1);
  rect(resetBtnX, row2Y, resetBtnWidth, buttonHeight, 5);

  fill(60);
  noStroke();
  text('Reset', resetBtnX + resetBtnWidth / 2, row2Y + buttonHeight / 2);

  // Toggle velocity regions button
  let toggleBtnX = resetBtnX + resetBtnWidth + 20;
  let toggleBtnWidth = 150;

  if (showVelocityRegions) {
    fill(regionToggleHovered ? color(180, 220, 180) : color(200, 240, 200));
    stroke(100, 180, 100);
  } else {
    fill(regionToggleHovered ? color(220, 220, 220) : color(240, 240, 240));
    stroke(180);
  }
  strokeWeight(1);
  rect(toggleBtnX, row2Y, toggleBtnWidth, buttonHeight, 5);

  fill(60);
  noStroke();
  textSize(12);
  text(showVelocityRegions ? 'Regions: ON' : 'Regions: OFF', toggleBtnX + toggleBtnWidth / 2, row2Y + buttonHeight / 2);

  // Speed slider area
  let speedLabelX = toggleBtnX + toggleBtnWidth + 30;
  fill(60);
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Speed:', speedLabelX, row2Y + buttonHeight / 2);

  // Draw speed slider
  let sliderX = speedLabelX + 50;
  let sliderWidth = canvasWidth - sliderX - margin - 50;
  let sliderY = row2Y + buttonHeight / 2;

  // Slider track
  stroke(180);
  strokeWeight(4);
  line(sliderX, sliderY, sliderX + sliderWidth, sliderY);

  // Slider handle position based on animation speed
  let handleX = map(animationSpeed, 0.005, 0.05, sliderX, sliderX + sliderWidth);

  // Slider handle
  fill(0, 100, 200);
  stroke(0, 80, 160);
  strokeWeight(2);
  circle(handleX, sliderY, 16);

  // Speed labels
  fill(100);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text('Slow', sliderX, sliderY + 12);
  text('Fast', sliderX + sliderWidth, sliderY + 12);

  // Third row: Description
  let row3Y = row2Y + 40;
  fill(80);
  textSize(12);
  textAlign(LEFT, TOP);
  text(scenarios[scenarioIndex].description, margin, row3Y);

  // Current function
  fill(0, 100, 200);
  textAlign(RIGHT, TOP);
  text(scenarios[scenarioIndex].posLabel, canvasWidth - margin, row3Y);
}

function updateParticlePosition() {
  let scenario = scenarios[scenarioIndex];
  particlePosition = scenario.posFunc(currentTime);
}

function resetAnimation() {
  currentTime = 0;
  isPlaying = false;
  updateParticlePosition();
}

function mousePressed() {
  let controlY = drawHeight + 10;
  let buttonHeight = 28;

  // Check scenario buttons
  let buttonStartX = margin + 70;
  let buttonWidth = (canvasWidth - buttonStartX - margin - 10) / 4;

  for (let i = 0; i < scenarios.length; i++) {
    let bx = buttonStartX + i * (buttonWidth + 5);
    if (mouseX >= bx && mouseX <= bx + buttonWidth - 5 &&
        mouseY >= controlY && mouseY <= controlY + buttonHeight) {
      scenarioIndex = i;
      resetAnimation();
      return;
    }
  }

  // Second row controls
  let row2Y = controlY + 40;

  // Play/Pause button
  let playBtnX = margin;
  let playBtnWidth = 80;
  if (mouseX >= playBtnX && mouseX <= playBtnX + playBtnWidth &&
      mouseY >= row2Y && mouseY <= row2Y + buttonHeight) {
    isPlaying = !isPlaying;
    return;
  }

  // Reset button
  let resetBtnX = playBtnX + playBtnWidth + 10;
  let resetBtnWidth = 70;
  if (mouseX >= resetBtnX && mouseX <= resetBtnX + resetBtnWidth &&
      mouseY >= row2Y && mouseY <= row2Y + buttonHeight) {
    resetAnimation();
    return;
  }

  // Toggle regions button
  let toggleBtnX = resetBtnX + resetBtnWidth + 20;
  let toggleBtnWidth = 150;
  if (mouseX >= toggleBtnX && mouseX <= toggleBtnX + toggleBtnWidth &&
      mouseY >= row2Y && mouseY <= row2Y + buttonHeight) {
    showVelocityRegions = !showVelocityRegions;
    return;
  }

  // Speed slider
  let speedLabelX = toggleBtnX + toggleBtnWidth + 30;
  let sliderX = speedLabelX + 50;
  let sliderWidth = canvasWidth - sliderX - margin - 50;
  let sliderY = row2Y + buttonHeight / 2;

  if (mouseX >= sliderX - 10 && mouseX <= sliderX + sliderWidth + 10 &&
      mouseY >= sliderY - 15 && mouseY <= sliderY + 15) {
    let newX = constrain(mouseX, sliderX, sliderX + sliderWidth);
    animationSpeed = map(newX, sliderX, sliderX + sliderWidth, 0.005, 0.05);
    return;
  }

  // Click on velocity graph to set time
  if (mouseX >= velocityGraphLeft && mouseX <= velocityGraphRight &&
      mouseY >= velocityGraphTop && mouseY <= velocityGraphBottom) {
    currentTime = map(mouseX, velocityGraphLeft, velocityGraphRight, tMin, tMax);
    currentTime = constrain(currentTime, tMin, tMax);
    updateParticlePosition();
    return;
  }
}

function mouseDragged() {
  let controlY = drawHeight + 10;
  let buttonHeight = 28;
  let row2Y = controlY + 40;

  // Speed slider dragging
  let toggleBtnX = margin + 80 + 10 + 70 + 20;
  let toggleBtnWidth = 150;
  let speedLabelX = toggleBtnX + toggleBtnWidth + 30;
  let sliderX = speedLabelX + 50;
  let sliderWidth = canvasWidth - sliderX - margin - 50;
  let sliderY = row2Y + buttonHeight / 2;

  if (mouseX >= sliderX - 20 && mouseX <= sliderX + sliderWidth + 20 &&
      mouseY >= row2Y - 10 && mouseY <= row2Y + buttonHeight + 20) {
    let newX = constrain(mouseX, sliderX, sliderX + sliderWidth);
    animationSpeed = map(newX, sliderX, sliderX + sliderWidth, 0.005, 0.05);
    return;
  }

  // Dragging on velocity graph to scrub time
  if (mouseX >= velocityGraphLeft && mouseX <= velocityGraphRight &&
      mouseY >= velocityGraphTop - 20 && mouseY <= velocityGraphBottom + 20) {
    currentTime = map(mouseX, velocityGraphLeft, velocityGraphRight, tMin, tMax);
    currentTime = constrain(currentTime, tMin, tMax);
    updateParticlePosition();
    isPlaying = false;
    return;
  }
}

function mouseMoved() {
  let controlY = drawHeight + 10;
  let buttonHeight = 28;

  // Check scenario buttons hover
  let buttonStartX = margin + 70;
  let buttonWidth = (canvasWidth - buttonStartX - margin - 10) / 4;

  for (let i = 0; i < scenarios.length; i++) {
    let bx = buttonStartX + i * (buttonWidth + 5);
    scenarioButtonsHovered[i] = (mouseX >= bx && mouseX <= bx + buttonWidth - 5 &&
                                  mouseY >= controlY && mouseY <= controlY + buttonHeight);
  }

  // Second row controls hover
  let row2Y = controlY + 40;

  // Play button hover
  let playBtnX = margin;
  let playBtnWidth = 80;
  playButtonHovered = (mouseX >= playBtnX && mouseX <= playBtnX + playBtnWidth &&
                       mouseY >= row2Y && mouseY <= row2Y + buttonHeight);

  // Reset button hover
  let resetBtnX = playBtnX + playBtnWidth + 10;
  let resetBtnWidth = 70;
  resetButtonHovered = (mouseX >= resetBtnX && mouseX <= resetBtnX + resetBtnWidth &&
                        mouseY >= row2Y && mouseY <= row2Y + buttonHeight);

  // Toggle button hover
  let toggleBtnX = resetBtnX + resetBtnWidth + 20;
  let toggleBtnWidth = 150;
  regionToggleHovered = (mouseX >= toggleBtnX && mouseX <= toggleBtnX + toggleBtnWidth &&
                         mouseY >= row2Y && mouseY <= row2Y + buttonHeight);
}

function keyPressed() {
  if (key === ' ') {
    isPlaying = !isPlaying;
    return false;
  }
  if (key === 'r' || key === 'R') {
    resetAnimation();
    return false;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
