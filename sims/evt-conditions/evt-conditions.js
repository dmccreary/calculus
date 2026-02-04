// EVT Conditions Explorer MicroSim
// Demonstrates why both EVT conditions (continuity and closed interval) are necessary
// Learning Objective: Students will evaluate whether EVT conditions are satisfied
// and predict consequences (Bloom Level 5: Evaluate)
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph region
let graphLeft, graphRight, graphTop, graphBottom;
let graphWidth, graphHeight;

// Interval and function parameters
let leftEndpoint = -2;
let rightEndpoint = 3;
let leftClosed = true;
let rightClosed = true;
let currentScenario = 'continuous'; // 'continuous', 'discontinuous', 'removable'

// Animation state
let showExtrema = false;
let animationPhase = 0;
let approachAnimation = false;
let approachX = 0;

// Controls
let scenarioSelect;
let leftSlider, rightSlider;
let leftToggleBtn, rightToggleBtn;
let findExtremaBtn;

// Colors
const colors = {
  function: '#2196F3',
  functionFill: 'rgba(33, 150, 243, 0.1)',
  maximum: '#4CAF50',
  minimum: '#FF9800',
  discontinuity: '#F44336',
  closedEndpoint: '#000000',
  openEndpoint: '#FFFFFF',
  interval: '#9C27B0'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create scenario dropdown
  scenarioSelect = createSelect();
  scenarioSelect.position(90, drawHeight + 8);
  scenarioSelect.option('Continuous on closed', 'continuous');
  scenarioSelect.option('Jump discontinuity', 'discontinuous');
  scenarioSelect.option('Removable discontinuity', 'removable');
  scenarioSelect.changed(onScenarioChange);

  // Create endpoint sliders
  leftSlider = createSlider(-4, 2, leftEndpoint, 0.5);
  leftSlider.position(sliderLeftMargin, drawHeight + 40);
  leftSlider.size(canvasWidth / 2 - sliderLeftMargin - 10);
  leftSlider.input(onSliderChange);

  rightSlider = createSlider(-1, 5, rightEndpoint, 0.5);
  rightSlider.position(canvasWidth / 2 + sliderLeftMargin - 70, drawHeight + 40);
  rightSlider.size(canvasWidth / 2 - sliderLeftMargin - 10 + 70);
  rightSlider.input(onSliderChange);

  // Create toggle buttons
  leftToggleBtn = createButton('[a, (closed)');
  leftToggleBtn.position(10, drawHeight + 75);
  leftToggleBtn.mousePressed(toggleLeft);

  rightToggleBtn = createButton('b] (closed)');
  rightToggleBtn.position(130, drawHeight + 75);
  rightToggleBtn.mousePressed(toggleRight);

  // Create find extrema button
  findExtremaBtn = createButton('Find Extrema');
  findExtremaBtn.position(250, drawHeight + 75);
  findExtremaBtn.mousePressed(findExtrema);
  findExtremaBtn.style('background-color', '#4CAF50');
  findExtremaBtn.style('color', 'white');
  findExtremaBtn.style('border', 'none');
  findExtremaBtn.style('padding', '5px 15px');
  findExtremaBtn.style('cursor', 'pointer');

  updateButtonLabels();

  describe('Interactive visualization showing why the Extreme Value Theorem requires both continuity and a closed interval. Users can toggle conditions to see counterexamples.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Calculate graph region
  graphLeft = margin + 40;
  graphRight = canvasWidth - margin - 140;
  graphTop = 60;
  graphBottom = drawHeight - margin - 20;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;

  // Get slider values
  leftEndpoint = leftSlider.value();
  rightEndpoint = rightSlider.value();

  // Ensure left < right
  if (leftEndpoint >= rightEndpoint) {
    rightEndpoint = leftEndpoint + 0.5;
    rightSlider.value(rightEndpoint);
  }

  // Draw components
  drawTitle();
  drawAxes();
  drawFunction();
  drawIntervalMarkers();
  drawChecklist();
  drawMessage();

  if (showExtrema) {
    drawExtremaMarkers();
  }

  if (approachAnimation) {
    drawApproachAnimation();
    animationPhase += 0.02;
  }

  // Draw control labels
  drawControlLabels();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('EVT Conditions Explorer', canvasWidth / 2 - 50, 10);
  textSize(14);
  fill('#666');
  text('Extreme Value Theorem Requirements', canvasWidth / 2 - 50, 35);
}

function drawAxes() {
  stroke('#ccc');
  strokeWeight(1);

  // Grid lines
  let xMin = -5, xMax = 6;
  let yMin = -2, yMax = 6;

  for (let x = xMin; x <= xMax; x++) {
    let px = map(x, xMin, xMax, graphLeft, graphRight);
    if (px >= graphLeft && px <= graphRight) {
      line(px, graphTop, px, graphBottom);
    }
  }

  for (let y = yMin; y <= yMax; y++) {
    let py = map(y, yMin, yMax, graphBottom, graphTop);
    if (py >= graphTop && py <= graphBottom) {
      line(graphLeft, py, graphRight, py);
    }
  }

  // Axes
  stroke('black');
  strokeWeight(2);

  // X-axis
  let yAxisY = map(0, -2, 6, graphBottom, graphTop);
  line(graphLeft, yAxisY, graphRight, yAxisY);

  // Y-axis
  let xAxisX = map(0, -5, 6, graphLeft, graphRight);
  if (xAxisX >= graphLeft && xAxisX <= graphRight) {
    line(xAxisX, graphTop, xAxisX, graphBottom);
  }

  // Axis labels
  fill('black');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);

  for (let x = -4; x <= 5; x += 2) {
    let px = map(x, -5, 6, graphLeft, graphRight);
    if (px >= graphLeft && px <= graphRight) {
      text(x, px, yAxisY + 5);
    }
  }

  textAlign(RIGHT, CENTER);
  for (let y = 0; y <= 5; y += 2) {
    let py = map(y, -2, 6, graphBottom, graphTop);
    if (py >= graphTop && py <= graphBottom) {
      let labelX = map(0, -5, 6, graphLeft, graphRight);
      labelX = max(graphLeft - 5, min(labelX - 5, graphRight));
      text(y, labelX, py);
    }
  }
}

function evaluateFunction(x) {
  // Base function: f(x) = -0.3x^2 + x + 3 (parabola opening down)
  let baseValue = -0.3 * x * x + x + 3;

  if (currentScenario === 'continuous') {
    return baseValue;
  } else if (currentScenario === 'discontinuous') {
    // Jump discontinuity at x = 1
    if (x < 1) {
      return baseValue;
    } else {
      return baseValue - 2; // Jump down by 2
    }
  } else if (currentScenario === 'removable') {
    // Removable discontinuity - function defined everywhere except at maximum
    return baseValue;
  }
  return baseValue;
}

function hasDiscontinuityAt(x) {
  if (currentScenario === 'discontinuous' && Math.abs(x - 1) < 0.01) {
    return true;
  }
  if (currentScenario === 'removable') {
    // Maximum occurs at x = 5/3 for our function
    let maxX = 5/3;
    if (Math.abs(x - maxX) < 0.1 && x >= leftEndpoint && x <= rightEndpoint) {
      return true;
    }
  }
  return false;
}

function drawFunction() {
  let xMin = -5, xMax = 6;
  let yMin = -2, yMax = 6;

  // Draw the function curve
  noFill();
  stroke(colors.function);
  strokeWeight(3);

  beginShape();
  let prevInInterval = false;

  for (let px = graphLeft; px <= graphRight; px += 1) {
    let x = map(px, graphLeft, graphRight, xMin, xMax);
    let y = evaluateFunction(x);
    let py = map(y, yMin, yMax, graphBottom, graphTop);

    let inInterval = x >= leftEndpoint && x <= rightEndpoint;

    // Handle discontinuity in drawing
    if (currentScenario === 'discontinuous' && Math.abs(x - 1) < 0.05) {
      endShape();
      beginShape();
      continue;
    }

    if (currentScenario === 'removable') {
      let maxX = 5/3;
      if (Math.abs(x - maxX) < 0.05 && inInterval) {
        endShape();
        beginShape();
        continue;
      }
    }

    if (py >= graphTop && py <= graphBottom) {
      if (inInterval) {
        stroke(colors.function);
        strokeWeight(3);
      } else {
        stroke('#aaa');
        strokeWeight(1.5);
      }
      vertex(px, py);
    }
  }
  endShape();

  // Draw discontinuity markers
  if (currentScenario === 'discontinuous') {
    let discX = 1;
    let px = map(discX, xMin, xMax, graphLeft, graphRight);

    // Left limit
    let yLeft = evaluateFunction(discX - 0.01);
    let pyLeft = map(yLeft, yMin, yMax, graphBottom, graphTop);

    // Right value
    let yRight = evaluateFunction(discX + 0.01);
    let pyRight = map(yRight, yMin, yMax, graphBottom, graphTop);

    // Open circle at left limit
    stroke(colors.discontinuity);
    strokeWeight(2);
    fill('white');
    circle(px, pyLeft, 10);

    // Filled circle at right value
    fill(colors.discontinuity);
    circle(px, pyRight, 10);
  }

  if (currentScenario === 'removable') {
    let maxX = 5/3;
    if (maxX >= leftEndpoint && maxX <= rightEndpoint) {
      let px = map(maxX, xMin, xMax, graphLeft, graphRight);
      let y = evaluateFunction(maxX);
      let py = map(y, yMin, yMax, graphBottom, graphTop);

      // Open circle at the hole
      stroke(colors.discontinuity);
      strokeWeight(2);
      fill('white');
      circle(px, py, 12);
    }
  }
}

function drawIntervalMarkers() {
  let xMin = -5, xMax = 6;
  let yMin = -2, yMax = 6;

  let pxLeft = map(leftEndpoint, xMin, xMax, graphLeft, graphRight);
  let pxRight = map(rightEndpoint, xMin, xMax, graphLeft, graphRight);
  let yAxisY = map(0, yMin, yMax, graphBottom, graphTop);

  // Interval line on x-axis
  stroke(colors.interval);
  strokeWeight(4);
  line(pxLeft, yAxisY, pxRight, yAxisY);

  // Endpoint markers
  strokeWeight(2);

  // Left endpoint
  if (leftClosed) {
    fill(colors.interval);
    stroke(colors.interval);
  } else {
    fill('white');
    stroke(colors.interval);
  }
  circle(pxLeft, yAxisY, 12);

  // Bracket notation
  fill(colors.interval);
  noStroke();
  textSize(16);
  textAlign(CENTER, TOP);
  text(leftClosed ? '[' : '(', pxLeft, yAxisY + 10);

  // Right endpoint
  if (rightClosed) {
    fill(colors.interval);
    stroke(colors.interval);
  } else {
    fill('white');
    stroke(colors.interval);
  }
  strokeWeight(2);
  circle(pxRight, yAxisY, 12);

  fill(colors.interval);
  noStroke();
  text(rightClosed ? ']' : ')', pxRight, yAxisY + 10);

  // Interval label
  textSize(14);
  let intervalStr = (leftClosed ? '[' : '(') + leftEndpoint + ', ' + rightEndpoint + (rightClosed ? ']' : ')');
  text(intervalStr, (pxLeft + pxRight) / 2, yAxisY + 25);
}

function drawChecklist() {
  let checkX = canvasWidth - 130;
  let checkY = 70;

  // Background panel
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(checkX - 10, checkY - 10, 130, 90, 10);

  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  fill('black');
  text('EVT Checklist:', checkX, checkY);

  checkY += 25;

  // Check continuity
  let isContinuous = currentScenario === 'continuous';
  fill(isContinuous ? colors.maximum : colors.discontinuity);
  text(isContinuous ? '\u2713' : '\u2717', checkX, checkY);
  fill('black');
  text(' Continuous?', checkX + 15, checkY);

  checkY += 22;

  // Check closed interval
  let isClosed = leftClosed && rightClosed;
  fill(isClosed ? colors.maximum : colors.discontinuity);
  text(isClosed ? '\u2713' : '\u2717', checkX, checkY);
  fill('black');
  text(' Closed interval?', checkX + 15, checkY);
}

function drawMessage() {
  let msgX = canvasWidth - 130;
  let msgY = 175;

  // Message panel
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(msgX - 10, msgY - 10, 130, 180, 10);

  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  fill('black');

  let isContinuous = currentScenario === 'continuous';
  let isClosed = leftClosed && rightClosed;

  if (isContinuous && isClosed) {
    fill(colors.maximum);
    text('EVT APPLIES!', msgX, msgY);
    fill('black');
    textSize(11);
    text('Both conditions met.\nGuaranteed global\nmax and min exist\non this interval.', msgX, msgY + 20);
  } else if (!isContinuous) {
    fill(colors.discontinuity);
    text('EVT FAILS', msgX, msgY);
    fill('black');
    textSize(11);
    if (currentScenario === 'discontinuous') {
      text('Jump discontinuity\nat x=1 breaks\ncontinuity. Max may\nnot exist on the\nfunction.', msgX, msgY + 20);
    } else {
      text('Removable\ndiscontinuity at the\nmaximum! The\nfunction never\nactually reaches\nthis y-value.', msgX, msgY + 20);
    }
  } else if (!isClosed) {
    fill(colors.minimum);
    text('EVT FAILS', msgX, msgY);
    fill('black');
    textSize(11);
    let msg = 'Open endpoint(s)!\n';
    if (!leftClosed && !rightClosed) {
      msg += 'Values at both\nendpoints are\nexcluded. Extremum\nmay "escape" at\nthe boundary.';
    } else if (!leftClosed) {
      msg += 'Left endpoint\nexcluded. If min is\nthere, we can get\narbitrarily close\nbut never reach it.';
    } else {
      msg += 'Right endpoint\nexcluded. If max is\nthere, we can get\narbitrarily close\nbut never reach it.';
    }
    text(msg, msgX, msgY + 20);
  }
}

function drawExtremaMarkers() {
  let xMin = -5, xMax = 6;
  let yMin = -2, yMax = 6;

  let isContinuous = currentScenario === 'continuous';
  let isClosed = leftClosed && rightClosed;

  // Find max and min on the interval
  let maxY = -Infinity, minY = Infinity;
  let maxX = leftEndpoint, minX = leftEndpoint;

  for (let x = leftEndpoint; x <= rightEndpoint; x += 0.01) {
    if (currentScenario === 'removable') {
      let critX = 5/3;
      if (Math.abs(x - critX) < 0.05) continue;
    }

    let y = evaluateFunction(x);
    if (y > maxY) {
      maxY = y;
      maxX = x;
    }
    if (y < minY) {
      minY = y;
      minX = x;
    }
  }

  // Check endpoints
  if (leftClosed) {
    let y = evaluateFunction(leftEndpoint);
    if (y > maxY) { maxY = y; maxX = leftEndpoint; }
    if (y < minY) { minY = y; minX = leftEndpoint; }
  }
  if (rightClosed) {
    let y = evaluateFunction(rightEndpoint);
    if (y > maxY) { maxY = y; maxX = rightEndpoint; }
    if (y < minY) { minY = y; minX = rightEndpoint; }
  }

  // Draw markers
  let pxMax = map(maxX, xMin, xMax, graphLeft, graphRight);
  let pyMax = map(maxY, yMin, yMax, graphBottom, graphTop);
  let pxMin = map(minX, xMin, xMax, graphLeft, graphRight);
  let pyMin = map(minY, yMin, yMax, graphBottom, graphTop);

  // Pulsing animation
  let pulse = 1 + 0.2 * sin(animationPhase * 5);

  if (isContinuous && isClosed) {
    // Maximum marker
    fill(colors.maximum);
    noStroke();
    circle(pxMax, pyMax, 15 * pulse);
    fill('white');
    textSize(10);
    textAlign(CENTER, CENTER);
    text('MAX', pxMax, pyMax);

    // Minimum marker
    fill(colors.minimum);
    noStroke();
    circle(pxMin, pyMin, 15 * pulse);
    fill('white');
    text('MIN', pxMin, pyMin);

    // Labels
    fill('black');
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Max: (' + maxX.toFixed(1) + ', ' + maxY.toFixed(1) + ')', pxMax + 12, pyMax);
    text('Min: (' + minX.toFixed(1) + ', ' + minY.toFixed(1) + ')', pxMin + 12, pyMin);
  } else {
    // Show where extrema would be with question marks
    fill(colors.discontinuity);
    noStroke();
    textSize(20);
    textAlign(CENTER, CENTER);

    if (!isContinuous && currentScenario === 'removable') {
      let critX = 5/3;
      let px = map(critX, xMin, xMax, graphLeft, graphRight);
      let py = map(evaluateFunction(critX), yMin, yMax, graphBottom, graphTop);
      text('?', px, py - 20);
      textSize(10);
      text('Max unreachable!', px, py - 35);
    }

    if (!leftClosed) {
      text('?', pxMin - 5, pyMin);
    }
    if (!rightClosed) {
      text('?', pxMax + 5, pyMax);
    }
  }

  animationPhase += 0.05;
}

function drawApproachAnimation() {
  let xMin = -5, xMax = 6;
  let yMin = -2, yMax = 6;

  // Animate a point approaching an open endpoint
  let targetX = !leftClosed ? leftEndpoint : rightEndpoint;
  let direction = !leftClosed ? 1 : -1;

  // Oscillating approach
  let distance = 0.5 * (1 + cos(animationPhase * 3)) * 0.5;
  approachX = targetX + direction * distance;

  if (approachX >= leftEndpoint && approachX <= rightEndpoint) {
    let y = evaluateFunction(approachX);
    let px = map(approachX, xMin, xMax, graphLeft, graphRight);
    let py = map(y, yMin, yMax, graphBottom, graphTop);

    // Draw approaching point
    fill('#E91E63');
    noStroke();
    circle(px, py, 10);

    // Trail
    stroke('#E91E63');
    strokeWeight(1);
    for (let i = 1; i <= 5; i++) {
      let trailX = approachX + direction * i * 0.1;
      if (trailX >= leftEndpoint && trailX <= rightEndpoint) {
        let trailY = evaluateFunction(trailX);
        let tpx = map(trailX, xMin, xMax, graphLeft, graphRight);
        let tpy = map(trailY, yMin, yMax, graphBottom, graphTop);
        fill(233, 30, 99, 200 - i * 30);
        noStroke();
        circle(tpx, tpy, 6 - i * 0.8);
      }
    }
  }
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);

  // Row 1: Scenario label
  text('Scenario:', 10, drawHeight + 18);

  // Row 2: Slider labels with values
  text('a = ' + leftEndpoint.toFixed(1), 10, drawHeight + 50);
  text('b = ' + rightEndpoint.toFixed(1), canvasWidth / 2 + 10, drawHeight + 50);
}

// Event handlers
function onScenarioChange() {
  currentScenario = scenarioSelect.value();
  showExtrema = false;
  approachAnimation = false;
}

function onSliderChange() {
  showExtrema = false;
  approachAnimation = false;
}

function toggleLeft() {
  leftClosed = !leftClosed;
  updateButtonLabels();
  showExtrema = false;
  if (!leftClosed) {
    approachAnimation = true;
    animationPhase = 0;
  } else {
    approachAnimation = false;
  }
}

function toggleRight() {
  rightClosed = !rightClosed;
  updateButtonLabels();
  showExtrema = false;
  if (!rightClosed) {
    approachAnimation = true;
    animationPhase = 0;
  } else {
    approachAnimation = false;
  }
}

function updateButtonLabels() {
  leftToggleBtn.html(leftClosed ? '[a, (closed)' : '(a, (open)');
  rightToggleBtn.html(rightClosed ? 'b] (closed)' : 'b) (open)');
}

function findExtrema() {
  showExtrema = true;
  animationPhase = 0;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);

  // Resize sliders
  leftSlider.size(canvasWidth / 2 - sliderLeftMargin - 10);
  rightSlider.position(canvasWidth / 2 + sliderLeftMargin - 70, drawHeight + 40);
  rightSlider.size(canvasWidth / 2 - sliderLeftMargin - 10 + 70);

  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
