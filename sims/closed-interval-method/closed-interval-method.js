// Closed Interval Method MicroSim
// Demonstrates finding absolute extrema on closed intervals
// Students work through the 3-step process: Find Candidates, Evaluate All, Identify Extrema
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
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Graph region dimensions
let graphLeft, graphRight, graphTop, graphBottom;
let graphWidth, graphHeight;

// Side panel for candidate table
let panelWidth = 180;
let panelLeft;

// Interval endpoints
let a = -1;
let b = 4;

// Function selection
let currentFunctionIndex = 0;
let functions = [
  {
    name: "x^3 - 3x^2 + 1",
    f: x => x*x*x - 3*x*x + 1,
    fprime: x => 3*x*x - 6*x,
    criticalPointsFn: (a, b) => {
      // f'(x) = 3x^2 - 6x = 3x(x-2) = 0 at x=0, x=2
      let pts = [];
      if (0 >= a && 0 <= b) pts.push(0);
      if (2 >= a && 2 <= b) pts.push(2);
      return pts;
    },
    defaultA: -1, defaultB: 4
  },
  {
    name: "sin(x)",
    f: x => Math.sin(x),
    fprime: x => Math.cos(x),
    criticalPointsFn: (a, b) => {
      // f'(x) = cos(x) = 0 at x = pi/2 + n*pi
      let pts = [];
      for (let n = -5; n <= 5; n++) {
        let cp = Math.PI/2 + n * Math.PI;
        if (cp > a && cp < b) pts.push(cp);
      }
      return pts;
    },
    defaultA: 0, defaultB: 6.28
  },
  {
    name: "x^2 - 4x + 3",
    f: x => x*x - 4*x + 3,
    fprime: x => 2*x - 4,
    criticalPointsFn: (a, b) => {
      // f'(x) = 2x - 4 = 0 at x = 2
      let pts = [];
      if (2 > a && 2 < b) pts.push(2);
      return pts;
    },
    defaultA: 0, defaultB: 5
  },
  {
    name: "-x^2 + 6x - 5",
    f: x => -x*x + 6*x - 5,
    fprime: x => -2*x + 6,
    criticalPointsFn: (a, b) => {
      // f'(x) = -2x + 6 = 0 at x = 3
      let pts = [];
      if (3 > a && 3 < b) pts.push(3);
      return pts;
    },
    defaultA: 0, defaultB: 6
  },
  {
    name: "x^4 - 4x^2",
    f: x => x*x*x*x - 4*x*x,
    fprime: x => 4*x*x*x - 8*x,
    criticalPointsFn: (a, b) => {
      // f'(x) = 4x^3 - 8x = 4x(x^2 - 2) = 0 at x=0, x=sqrt(2), x=-sqrt(2)
      let pts = [];
      let sq2 = Math.sqrt(2);
      if (0 > a && 0 < b) pts.push(0);
      if (sq2 > a && sq2 < b) pts.push(sq2);
      if (-sq2 > a && -sq2 < b) pts.push(-sq2);
      return pts;
    },
    defaultA: -2.5, defaultB: 2.5
  }
];

// State management
let step = 0; // 0: initial, 1: candidates found, 2: evaluated, 3: extrema identified
let candidates = []; // {x, fx, type, isMax, isMin}
let criticalPoints = [];

// Dropdown state
let dropdownOpen = false;
let dropdownY = drawHeight + 8;
let dropdownHeight = 25;
let dropdownWidth = 180;

// Slider state
let draggingA = false;
let draggingB = false;
let sliderY1 = drawHeight + 45;
let sliderY2 = drawHeight + 75;
let sliderHeight = 20;

// Button positions
let btnY = drawHeight + 100;
let btnHeight = 22;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);
  textFont('Arial');

  // Initialize with first function's defaults
  a = functions[0].defaultA;
  b = functions[0].defaultB;

  describe('Interactive Closed Interval Method MicroSim for finding absolute extrema on closed intervals', LABEL);
}

function draw() {
  updateCanvasSize();
  updateGraphDimensions();

  // Draw backgrounds
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Closed Interval Method', (canvasWidth - panelWidth) / 2, 8);

  // Draw subtitle with function
  textSize(14);
  fill('#666');
  text('f(x) = ' + functions[currentFunctionIndex].name, (canvasWidth - panelWidth) / 2, 32);

  // Draw the graph
  drawGraph();

  // Draw side panel
  drawCandidatePanel();

  // Draw controls
  drawControls();

  // Draw dropdown menu if open (on top of everything)
  if (dropdownOpen) {
    drawDropdownMenu();
  }
}

function updateGraphDimensions() {
  panelLeft = canvasWidth - panelWidth - 10;
  graphLeft = margin + 30;
  graphRight = panelLeft - 20;
  graphTop = 55;
  graphBottom = drawHeight - 30;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;
}

function drawGraph() {
  let func = functions[currentFunctionIndex];

  // Calculate y range based on function values in interval
  let yMin = Infinity, yMax = -Infinity;
  let samples = 200;
  for (let i = 0; i <= samples; i++) {
    let x = a + (b - a) * i / samples;
    let y = func.f(x);
    if (isFinite(y)) {
      yMin = Math.min(yMin, y);
      yMax = Math.max(yMax, y);
    }
  }

  // Add some padding to y range
  let yPadding = (yMax - yMin) * 0.15;
  if (yPadding < 0.5) yPadding = 0.5;
  yMin -= yPadding;
  yMax += yPadding;

  // Draw grid
  stroke(220);
  strokeWeight(1);

  // Vertical grid lines
  let xStep = niceStep(b - a);
  for (let x = Math.ceil(a / xStep) * xStep; x <= b; x += xStep) {
    let px = map(x, a, b, graphLeft, graphRight);
    line(px, graphTop, px, graphBottom);
  }

  // Horizontal grid lines
  let yStep = niceStep(yMax - yMin);
  for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
    let py = map(y, yMin, yMax, graphBottom, graphTop);
    line(graphLeft, py, graphRight, py);
  }

  // Draw axes if in range
  stroke(150);
  strokeWeight(1);
  if (a <= 0 && b >= 0) {
    let xAxis = map(0, a, b, graphLeft, graphRight);
    line(xAxis, graphTop, xAxis, graphBottom);
  }
  if (yMin <= 0 && yMax >= 0) {
    let yAxis = map(0, yMin, yMax, graphBottom, graphTop);
    line(graphLeft, yAxis, graphRight, yAxis);
  }

  // Draw x-axis labels
  fill(100);
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  for (let x = Math.ceil(a / xStep) * xStep; x <= b; x += xStep) {
    let px = map(x, a, b, graphLeft, graphRight);
    text(formatNumber(x), px, graphBottom + 3);
  }

  // Draw y-axis labels
  textAlign(RIGHT, CENTER);
  for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
    let py = map(y, yMin, yMax, graphBottom, graphTop);
    if (py > graphTop + 10 && py < graphBottom - 10) {
      text(formatNumber(y), graphLeft - 5, py);
    }
  }

  // Draw interval boundary lines
  stroke(100, 100, 255, 150);
  strokeWeight(2);
  let leftBoundary = map(a, a, b, graphLeft, graphRight);
  let rightBoundary = map(b, a, b, graphLeft, graphRight);
  line(leftBoundary, graphTop, leftBoundary, graphBottom);
  line(rightBoundary, graphTop, rightBoundary, graphBottom);

  // Draw function curve
  stroke(0, 100, 200);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i <= samples; i++) {
    let x = a + (b - a) * i / samples;
    let y = func.f(x);
    if (isFinite(y) && y >= yMin - 1 && y <= yMax + 1) {
      let px = map(x, a, b, graphLeft, graphRight);
      let py = map(y, yMin, yMax, graphBottom, graphTop);
      vertex(px, py);
    }
  }
  endShape();

  // Draw endpoints (blue squares)
  if (step >= 1) {
    drawEndpoint(a, func.f(a), yMin, yMax, 'Endpoint');
    drawEndpoint(b, func.f(b), yMin, yMax, 'Endpoint');
  }

  // Draw critical points (orange dots)
  if (step >= 1) {
    for (let cp of criticalPoints) {
      drawCriticalPoint(cp, func.f(cp), yMin, yMax);
    }
  }

  // Draw absolute max/min indicators
  if (step >= 3) {
    for (let c of candidates) {
      let px = map(c.x, a, b, graphLeft, graphRight);
      let py = map(c.fx, yMin, yMax, graphBottom, graphTop);

      if (c.isMax) {
        // Draw crown for max (green)
        drawCrown(px, py - 25, color(0, 180, 0));
        fill(0, 180, 0);
        noStroke();
        textAlign(CENTER, BOTTOM);
        textSize(12);
        text('MAX', px, py - 30);
      }
      if (c.isMin) {
        // Draw valley for min (red)
        drawValley(px, py + 25, color(220, 0, 0));
        fill(220, 0, 0);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(12);
        text('MIN', px, py + 30);
      }
    }
  }

  // Draw interval label
  fill(60);
  noStroke();
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('[' + formatNumber(a) + ', ' + formatNumber(b) + ']', (graphLeft + graphRight) / 2, graphBottom + 18);
}

function drawEndpoint(x, y, yMin, yMax, label) {
  let px = map(x, a, b, graphLeft, graphRight);
  let py = map(y, yMin, yMax, graphBottom, graphTop);

  // Blue square for endpoints
  fill(50, 100, 200);
  stroke(30, 60, 150);
  strokeWeight(2);
  rectMode(CENTER);
  rect(px, py, 14, 14);
  rectMode(CORNER);

  // Show value annotation
  if (step >= 2) {
    fill(50, 100, 200);
    noStroke();
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('(' + formatNumber(x) + ', ' + formatNumber(y) + ')', px, py - 10);
  }
}

function drawCriticalPoint(x, y, yMin, yMax) {
  let px = map(x, a, b, graphLeft, graphRight);
  let py = map(y, yMin, yMax, graphBottom, graphTop);

  // Orange dot for critical points
  fill(255, 140, 0);
  stroke(200, 100, 0);
  strokeWeight(2);
  ellipse(px, py, 14, 14);

  // Show value annotation
  if (step >= 2) {
    fill(255, 140, 0);
    noStroke();
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('(' + formatNumber(x) + ', ' + formatNumber(y) + ')', px, py - 10);
  }
}

function drawCrown(x, y, col) {
  fill(col);
  stroke(0);
  strokeWeight(1);
  beginShape();
  vertex(x - 10, y + 8);
  vertex(x - 10, y);
  vertex(x - 5, y + 5);
  vertex(x, y - 5);
  vertex(x + 5, y + 5);
  vertex(x + 10, y);
  vertex(x + 10, y + 8);
  endShape(CLOSE);
}

function drawValley(x, y, col) {
  fill(col);
  stroke(0);
  strokeWeight(1);
  beginShape();
  vertex(x - 10, y - 8);
  vertex(x - 10, y);
  vertex(x - 5, y - 5);
  vertex(x, y + 5);
  vertex(x + 5, y - 5);
  vertex(x + 10, y);
  vertex(x + 10, y - 8);
  endShape(CLOSE);
}

function drawCandidatePanel() {
  // Panel background
  fill(250, 250, 255);
  stroke(180);
  strokeWeight(1);
  rect(panelLeft, graphTop - 5, panelWidth, graphHeight + 10, 5);

  // Panel title
  fill(60);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('Candidate Table', panelLeft + panelWidth/2, graphTop + 5);

  // Step indicator
  textSize(11);
  fill(100);
  let stepText = '';
  if (step === 0) stepText = 'Step 1: Find Candidates';
  else if (step === 1) stepText = 'Step 2: Evaluate All';
  else if (step === 2) stepText = 'Step 3: Identify Extrema';
  else if (step === 3) stepText = 'Complete!';
  text(stepText, panelLeft + panelWidth/2, graphTop + 22);

  // Draw table header
  let tableY = graphTop + 45;
  fill(230, 235, 245);
  noStroke();
  rect(panelLeft + 5, tableY, panelWidth - 10, 20);

  fill(60);
  textSize(11);
  textAlign(LEFT, CENTER);
  text('  x', panelLeft + 10, tableY + 10);
  text('f(x)', panelLeft + 55, tableY + 10);
  text('Type', panelLeft + 105, tableY + 10);

  // Draw horizontal line
  stroke(180);
  line(panelLeft + 5, tableY + 20, panelLeft + panelWidth - 5, tableY + 20);

  // Draw candidate rows
  let rowY = tableY + 25;
  let rowHeight = 22;

  if (step >= 1) {
    for (let i = 0; i < candidates.length; i++) {
      let c = candidates[i];

      // Highlight max/min rows
      if (step >= 3) {
        if (c.isMax && c.isMin) {
          fill(255, 200, 150);
        } else if (c.isMax) {
          fill(200, 255, 200);
        } else if (c.isMin) {
          fill(255, 200, 200);
        } else {
          fill(255);
        }
        noStroke();
        rect(panelLeft + 5, rowY + i * rowHeight - 8, panelWidth - 10, rowHeight - 2);
      }

      fill(60);
      noStroke();
      textSize(11);
      textAlign(LEFT, CENTER);

      // x value
      text(formatNumber(c.x), panelLeft + 10, rowY + i * rowHeight);

      // f(x) value (show after step 2)
      if (step >= 2) {
        text(formatNumber(c.fx), panelLeft + 55, rowY + i * rowHeight);
      } else {
        fill(150);
        text('?', panelLeft + 65, rowY + i * rowHeight);
        fill(60);
      }

      // Type
      let typeText = c.type;
      if (c.type === 'Critical') {
        fill(255, 140, 0);
      } else {
        fill(50, 100, 200);
      }
      text(typeText, panelLeft + 105, rowY + i * rowHeight);
    }
  } else {
    // Show placeholder
    fill(150);
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Click "Find Candidates"', panelLeft + panelWidth/2, rowY + 20);
    text('to begin', panelLeft + panelWidth/2, rowY + 35);
  }

  // Show max/min summary at bottom
  if (step >= 3) {
    let maxC = candidates.find(c => c.isMax);
    let minC = candidates.find(c => c.isMin);

    let summaryY = graphBottom - 40;

    fill(0, 150, 0);
    textSize(10);
    textAlign(LEFT, TOP);
    noStroke();
    text('Abs Max: ' + formatNumber(maxC.fx), panelLeft + 10, summaryY);
    text('at x = ' + formatNumber(maxC.x), panelLeft + 10, summaryY + 12);

    fill(200, 0, 0);
    text('Abs Min: ' + formatNumber(minC.fx), panelLeft + 10, summaryY + 30);
    text('at x = ' + formatNumber(minC.x), panelLeft + 10, summaryY + 42);
  }
}

function drawControls() {
  // Function dropdown
  fill(60);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Function:', 10, dropdownY + dropdownHeight/2);

  // Dropdown button
  let dropX = 85;
  fill(dropdownOpen ? 230 : 245);
  stroke(150);
  strokeWeight(1);
  rect(dropX, dropdownY, dropdownWidth, dropdownHeight, 3);

  fill(60);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text(functions[currentFunctionIndex].name, dropX + 8, dropdownY + dropdownHeight/2);

  // Dropdown arrow
  fill(100);
  noStroke();
  triangle(dropX + dropdownWidth - 15, dropdownY + 8,
           dropX + dropdownWidth - 5, dropdownY + 8,
           dropX + dropdownWidth - 10, dropdownY + 17);

  // Slider A (left endpoint)
  drawSlider('a (left):', sliderY1, a, -5, 10, 'a');

  // Slider B (right endpoint)
  drawSlider('b (right):', sliderY2, b, -5, 10, 'b');

  // Action buttons
  let btnWidth = (canvasWidth - 50) / 4;
  let btnGap = 10;
  let btnX = 10;

  // Find Candidates button
  drawButton('Find Candidates', btnX, btnY, btnWidth, step === 0);
  btnX += btnWidth + btnGap;

  // Evaluate All button
  drawButton('Evaluate All', btnX, btnY, btnWidth, step === 1);
  btnX += btnWidth + btnGap;

  // Identify Extrema button
  drawButton('Identify Extrema', btnX, btnY, btnWidth, step === 2);
  btnX += btnWidth + btnGap;

  // Reset button
  drawButton('Reset', btnX, btnY, btnWidth - 10, true);
}

function drawSlider(label, y, value, minVal, maxVal, which) {
  // Label
  fill(60);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text(label + ' ' + formatNumber(value), 10, y + sliderHeight/2);

  // Slider track
  let trackX = sliderLeftMargin;
  let trackWidth = canvasWidth - sliderLeftMargin - margin - panelWidth - 20;

  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(trackX, y + 7, trackWidth, 6, 3);

  // Slider handle
  let handleX = map(value, minVal, maxVal, trackX, trackX + trackWidth);
  handleX = constrain(handleX, trackX, trackX + trackWidth);

  fill(100, 150, 220);
  stroke(60, 100, 180);
  strokeWeight(2);
  ellipse(handleX, y + 10, 16, 16);
}

function drawButton(label, x, y, w, active) {
  if (active) {
    fill(100, 150, 220);
    stroke(60, 100, 180);
  } else {
    fill(180);
    stroke(150);
  }
  strokeWeight(1);
  rect(x, y, w, btnHeight, 3);

  fill(active ? 255 : 220);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text(label, x + w/2, y + btnHeight/2);
}

function drawDropdownMenu() {
  let dropX = 85;
  let menuY = dropdownY + dropdownHeight;

  // Draw menu background
  fill(255);
  stroke(150);
  strokeWeight(1);
  rect(dropX, menuY, dropdownWidth, functions.length * 25 + 5, 0, 0, 3, 3);

  // Draw menu items
  for (let i = 0; i < functions.length; i++) {
    let itemY = menuY + 2 + i * 25;

    // Highlight on hover
    if (mouseX > dropX && mouseX < dropX + dropdownWidth &&
        mouseY > itemY && mouseY < itemY + 25) {
      fill(230, 240, 255);
      noStroke();
      rect(dropX + 2, itemY, dropdownWidth - 4, 25);
    }

    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text(functions[i].name, dropX + 8, itemY + 12);
  }
}

function mousePressed() {
  let dropX = 85;

  // Check dropdown click
  if (mouseX > dropX && mouseX < dropX + dropdownWidth &&
      mouseY > dropdownY && mouseY < dropdownY + dropdownHeight) {
    dropdownOpen = !dropdownOpen;
    return;
  }

  // Check dropdown menu selection
  if (dropdownOpen) {
    let menuY = dropdownY + dropdownHeight;
    if (mouseX > dropX && mouseX < dropX + dropdownWidth &&
        mouseY > menuY && mouseY < menuY + functions.length * 25 + 5) {
      let index = floor((mouseY - menuY - 2) / 25);
      if (index >= 0 && index < functions.length) {
        currentFunctionIndex = index;
        a = functions[index].defaultA;
        b = functions[index].defaultB;
        resetState();
      }
      dropdownOpen = false;
      return;
    }
    dropdownOpen = false;
  }

  // Check slider A
  let trackX = sliderLeftMargin;
  let trackWidth = canvasWidth - sliderLeftMargin - margin - panelWidth - 20;

  if (mouseY > sliderY1 && mouseY < sliderY1 + sliderHeight) {
    if (mouseX > trackX - 10 && mouseX < trackX + trackWidth + 10) {
      draggingA = true;
    }
  }

  // Check slider B
  if (mouseY > sliderY2 && mouseY < sliderY2 + sliderHeight) {
    if (mouseX > trackX - 10 && mouseX < trackX + trackWidth + 10) {
      draggingB = true;
    }
  }

  // Check buttons
  let btnWidth = (canvasWidth - 50) / 4;
  let btnGap = 10;
  let btnX = 10;

  if (mouseY > btnY && mouseY < btnY + btnHeight) {
    // Find Candidates
    if (mouseX > btnX && mouseX < btnX + btnWidth && step === 0) {
      findCandidates();
    }
    btnX += btnWidth + btnGap;

    // Evaluate All
    if (mouseX > btnX && mouseX < btnX + btnWidth && step === 1) {
      evaluateAll();
    }
    btnX += btnWidth + btnGap;

    // Identify Extrema
    if (mouseX > btnX && mouseX < btnX + btnWidth && step === 2) {
      identifyExtrema();
    }
    btnX += btnWidth + btnGap;

    // Reset
    if (mouseX > btnX && mouseX < btnX + btnWidth - 10) {
      resetState();
    }
  }
}

function mouseDragged() {
  let trackX = sliderLeftMargin;
  let trackWidth = canvasWidth - sliderLeftMargin - margin - panelWidth - 20;

  if (draggingA) {
    a = map(mouseX, trackX, trackX + trackWidth, -5, 10);
    a = constrain(a, -5, b - 0.5);
    a = round(a * 10) / 10;
    resetState();
  }

  if (draggingB) {
    b = map(mouseX, trackX, trackX + trackWidth, -5, 10);
    b = constrain(b, a + 0.5, 10);
    b = round(b * 10) / 10;
    resetState();
  }
}

function mouseReleased() {
  draggingA = false;
  draggingB = false;
}

function findCandidates() {
  let func = functions[currentFunctionIndex];
  candidates = [];

  // Add endpoints
  candidates.push({ x: a, fx: null, type: 'Endpoint', isMax: false, isMin: false });
  candidates.push({ x: b, fx: null, type: 'Endpoint', isMax: false, isMin: false });

  // Find and add critical points in interval
  criticalPoints = func.criticalPointsFn(a, b);
  for (let cp of criticalPoints) {
    candidates.push({ x: cp, fx: null, type: 'Critical', isMax: false, isMin: false });
  }

  // Sort by x value
  candidates.sort((c1, c2) => c1.x - c2.x);

  step = 1;
}

function evaluateAll() {
  let func = functions[currentFunctionIndex];

  for (let c of candidates) {
    c.fx = func.f(c.x);
  }

  step = 2;
}

function identifyExtrema() {
  let maxVal = -Infinity;
  let minVal = Infinity;

  for (let c of candidates) {
    if (c.fx > maxVal) maxVal = c.fx;
    if (c.fx < minVal) minVal = c.fx;
  }

  for (let c of candidates) {
    c.isMax = (Math.abs(c.fx - maxVal) < 0.0001);
    c.isMin = (Math.abs(c.fx - minVal) < 0.0001);
  }

  step = 3;
}

function resetState() {
  step = 0;
  candidates = [];
  criticalPoints = [];
}

function niceStep(range) {
  let rough = range / 5;
  let mag = Math.pow(10, Math.floor(Math.log10(rough)));
  let norm = rough / mag;

  if (norm < 1.5) return mag;
  if (norm < 3) return 2 * mag;
  if (norm < 7) return 5 * mag;
  return 10 * mag;
}

function formatNumber(n) {
  if (Math.abs(n) < 0.001) return '0';
  if (Math.abs(n - Math.round(n)) < 0.001) return Math.round(n).toString();
  return n.toFixed(2);
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
