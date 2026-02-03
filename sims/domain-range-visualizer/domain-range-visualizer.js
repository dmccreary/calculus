// Domain and Range Visualizer MicroSim
// Helps students interpret domain and range graphically
// MicroSim template version 2026.02
// schema: https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 85;  // Two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Graph dimensions within drawing area
let graphMargin = 60;
let graphLeft, graphRight, graphTop, graphBottom;
let graphWidth, graphHeight;

// Domain/range number lines
let domainLineY;  // horizontal line below graph
let rangeLineX;   // vertical line left of graph

// Function data
let functions = [
  { name: 'f(x) = x²', fn: x => x*x, domainMin: -Infinity, domainMax: Infinity, rangeMin: 0, rangeMax: Infinity },
  { name: 'f(x) = √x', fn: x => x >= 0 ? Math.sqrt(x) : null, domainMin: 0, domainMax: Infinity, rangeMin: 0, rangeMax: Infinity },
  { name: 'f(x) = 1/x', fn: x => x !== 0 ? 1/x : null, domainMin: -Infinity, domainMax: Infinity, domainHole: 0, rangeMin: -Infinity, rangeMax: Infinity, rangeHole: 0 },
  { name: 'f(x) = sin(x)', fn: x => Math.sin(x), domainMin: -Infinity, domainMax: Infinity, rangeMin: -1, rangeMax: 1 }
];
let currentFunctionIndex = 0;

// UI elements
let functionSelect;
let showDomainCheckbox;
let showRangeCheckbox;
let xSlider;
let currentX = 0;  // Current x-value from slider

// Interaction
let mouseOverCanvas = false;
let hoverX = null;
let hoverY = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Track mouse for hover effects
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => { mouseOverCanvas = false; hoverX = null; hoverY = null; });

  // Calculate graph bounds
  updateGraphBounds();

  // Row 1: Function selector and checkboxes
  functionSelect = createSelect();
  functionSelect.position(10, drawHeight + 8);
  for (let i = 0; i < functions.length; i++) {
    functionSelect.option(functions[i].name, i);
  }
  functionSelect.changed(() => {
    currentFunctionIndex = parseInt(functionSelect.value());
    // Clamp x-value to new function's domain
    clampXToValidDomain();
  });

  showDomainCheckbox = createCheckbox('Show Domain', true);
  showDomainCheckbox.position(180, drawHeight + 10);
  showDomainCheckbox.style('font-size', '14px');

  showRangeCheckbox = createCheckbox('Show Range', true);
  showRangeCheckbox.position(310, drawHeight + 10);
  showRangeCheckbox.style('font-size', '14px');

  // Row 2: X-value slider
  xSlider = createSlider(-5, 5, 0, 0.1);
  xSlider.position(sliderLeftMargin, drawHeight + 45);
  xSlider.size(canvasWidth - sliderLeftMargin - margin);
  xSlider.input(() => {
    currentX = xSlider.value();
  });

  describe('Interactive visualization showing domain and range of functions on a coordinate plane with highlighted number lines and x-value slider', LABEL);
}

// Clamp x-value to valid domain for current function
function clampXToValidDomain() {
  let func = functions[currentFunctionIndex];
  let x = xSlider.value();

  // Handle domain restrictions
  if (func.domainMin !== -Infinity && x < func.domainMin) {
    xSlider.value(func.domainMin);
    currentX = func.domainMin;
  }
  if (func.domainMax !== Infinity && x > func.domainMax) {
    xSlider.value(func.domainMax);
    currentX = func.domainMax;
  }
  // Handle domain holes (e.g., x ≠ 0 for 1/x)
  if (func.domainHole !== undefined && Math.abs(x - func.domainHole) < 0.1) {
    let newX = func.domainHole + 0.1;
    xSlider.value(newX);
    currentX = newX;
  }
}

function draw() {
  updateCanvasSize();
  updateGraphBounds();

  // Draw background regions
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Get current function
  let func = functions[currentFunctionIndex];

  // Draw title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Domain and Range Visualizer', canvasWidth/2, 8);
  textSize(14);
  fill('#666');
  text(func.name, canvasWidth/2, 32);

  // Draw domain number line (below graph)
  drawDomainLine(func);

  // Draw range number line (left of graph)
  drawRangeLine(func);

  // Draw coordinate axes
  drawAxes();

  // Draw function graph
  drawFunction(func);

  // Draw the point controlled by slider (always visible)
  drawSliderPoint(func);

  // Draw domain/range info box
  drawInfoBox(func);

  // Draw slider label and value in control area
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text('x = ' + currentX.toFixed(1), 10, drawHeight + 55);
}

function updateGraphBounds() {
  graphLeft = graphMargin + 30;
  graphRight = canvasWidth - graphMargin;
  graphTop = 55;
  graphBottom = drawHeight - 50;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;
  domainLineY = drawHeight - 25;
  rangeLineX = 25;
}

function drawAxes() {
  stroke('#ccc');
  strokeWeight(1);

  // Draw grid
  let xScale = graphWidth / 10; // -5 to 5
  let yScale = graphHeight / 10; // -5 to 5

  // Vertical grid lines
  for (let i = -5; i <= 5; i++) {
    let x = map(i, -5, 5, graphLeft, graphRight);
    stroke(i === 0 ? '#999' : '#ddd');
    strokeWeight(i === 0 ? 2 : 1);
    line(x, graphTop, x, graphBottom);
  }

  // Horizontal grid lines
  for (let i = -5; i <= 5; i++) {
    let y = map(i, -5, 5, graphBottom, graphTop);
    stroke(i === 0 ? '#999' : '#ddd');
    strokeWeight(i === 0 ? 2 : 1);
    line(graphLeft, y, graphRight, y);
  }

  // Axis labels
  fill('#666');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  for (let i = -4; i <= 4; i += 2) {
    if (i !== 0) {
      let x = map(i, -5, 5, graphLeft, graphRight);
      text(i, x, graphBottom + 3);
    }
  }

  textAlign(RIGHT, CENTER);
  for (let i = -4; i <= 4; i += 2) {
    if (i !== 0) {
      let y = map(i, -5, 5, graphBottom, graphTop);
      text(i, graphLeft - 5, y);
    }
  }

  // Axis names
  textSize(14);
  textAlign(CENTER, TOP);
  text('x', graphRight + 15, map(0, -5, 5, graphBottom, graphTop) - 7);
  textAlign(RIGHT, CENTER);
  text('y', map(0, -5, 5, graphLeft, graphRight) - 5, graphTop - 10);
}

function drawFunction(func) {
  stroke('#2196F3');
  strokeWeight(3);
  noFill();

  beginShape();
  let prevValid = false;

  for (let px = graphLeft; px <= graphRight; px += 2) {
    let x = map(px, graphLeft, graphRight, -5, 5);
    let y = func.fn(x);

    if (y !== null && isFinite(y) && y >= -5 && y <= 5) {
      let py = map(y, -5, 5, graphBottom, graphTop);
      if (!prevValid) {
        // Start new shape segment after gap
        endShape();
        beginShape();
      }
      vertex(px, py);
      prevValid = true;
    } else {
      if (prevValid) {
        endShape();
        beginShape();
      }
      prevValid = false;
    }
  }
  endShape();
}

function drawDomainLine(func) {
  if (!showDomainCheckbox.checked()) return;

  let lineLeft = graphLeft;
  let lineRight = graphRight;

  // Background line
  stroke('#ddd');
  strokeWeight(4);
  line(lineLeft, domainLineY, lineRight, domainLineY);

  // Domain highlight
  stroke('#4CAF50');
  strokeWeight(6);

  let domainStart = func.domainMin === -Infinity ? lineLeft : map(func.domainMin, -5, 5, lineLeft, lineRight);
  let domainEnd = func.domainMax === Infinity ? lineRight : map(func.domainMax, -5, 5, lineLeft, lineRight);

  domainStart = constrain(domainStart, lineLeft, lineRight);
  domainEnd = constrain(domainEnd, lineLeft, lineRight);

  if (func.domainHole !== undefined) {
    // Draw with gap at hole
    let holeX = map(func.domainHole, -5, 5, lineLeft, lineRight);
    line(domainStart, domainLineY, holeX - 5, domainLineY);
    line(holeX + 5, domainLineY, domainEnd, domainLineY);
    // Open circle at hole
    noFill();
    stroke('#4CAF50');
    strokeWeight(2);
    circle(holeX, domainLineY, 10);
  } else {
    line(domainStart, domainLineY, domainEnd, domainLineY);
  }

  // Arrow indicators for infinity
  if (func.domainMin === -Infinity) {
    drawArrow(lineLeft + 10, domainLineY, lineLeft, domainLineY, '#4CAF50');
  }
  if (func.domainMax === Infinity) {
    drawArrow(lineRight - 10, domainLineY, lineRight, domainLineY, '#4CAF50');
  }

  // Label
  noStroke();
  fill('#4CAF50');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Domain', lineLeft, domainLineY + 15);
}

function drawRangeLine(func) {
  if (!showRangeCheckbox.checked()) return;

  let lineTop = graphTop;
  let lineBottom = graphBottom;

  // Background line
  stroke('#ddd');
  strokeWeight(4);
  line(rangeLineX, lineTop, rangeLineX, lineBottom);

  // Range highlight
  stroke('#2196F3');
  strokeWeight(6);

  let rangeStart = func.rangeMin === -Infinity ? lineBottom : map(func.rangeMin, -5, 5, lineBottom, lineTop);
  let rangeEnd = func.rangeMax === Infinity ? lineTop : map(func.rangeMax, -5, 5, lineBottom, lineTop);

  rangeStart = constrain(rangeStart, lineTop, lineBottom);
  rangeEnd = constrain(rangeEnd, lineTop, lineBottom);

  if (func.rangeHole !== undefined) {
    // Draw with gap at hole
    let holeY = map(func.rangeHole, -5, 5, lineBottom, lineTop);
    line(rangeLineX, rangeStart, rangeLineX, holeY + 5);
    line(rangeLineX, holeY - 5, rangeLineX, rangeEnd);
    // Open circle at hole
    noFill();
    stroke('#2196F3');
    strokeWeight(2);
    circle(rangeLineX, holeY, 10);
  } else {
    line(rangeLineX, rangeStart, rangeLineX, rangeEnd);
  }

  // Arrow indicators for infinity
  if (func.rangeMin === -Infinity) {
    drawArrow(rangeLineX, lineBottom - 10, rangeLineX, lineBottom, '#2196F3');
  }
  if (func.rangeMax === Infinity) {
    drawArrow(rangeLineX, lineTop + 10, rangeLineX, lineTop, '#2196F3');
  }

  // Label
  noStroke();
  fill('#2196F3');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  push();
  translate(rangeLineX - 12, (lineTop + lineBottom) / 2);
  rotate(-HALF_PI);
  text('Range', 0, 0);
  pop();
}

function drawArrow(x1, y1, x2, y2, col) {
  stroke(col);
  strokeWeight(3);
  line(x1, y1, x2, y2);

  let angle = atan2(y2 - y1, x2 - x1);
  let arrowSize = 8;

  fill(col);
  noStroke();
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -arrowSize, arrowSize/2, -arrowSize, -arrowSize/2);
  pop();
}

function drawSliderPoint(func) {
  // Get current x from slider
  let x = currentX;
  let y = func.fn(x);

  // Check if point is valid
  if (y === null || !isFinite(y)) {
    // Show "undefined" message
    noStroke();
    fill('#FF5722');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('f(' + x.toFixed(1) + ') is undefined', canvasWidth/2, graphTop + 20);
    return;
  }

  // Clamp y for display purposes
  let yDisplay = constrain(y, -5, 5);
  let yOutOfRange = (y < -5 || y > 5);

  let px = map(x, -5, 5, graphLeft, graphRight);
  let py = map(yDisplay, -5, 5, graphBottom, graphTop);

  // Draw dashed lines to axes
  stroke('#FF5722');
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);

  // Vertical line to x-axis
  let axisY = map(0, -5, 5, graphBottom, graphTop);
  line(px, py, px, axisY);

  // Horizontal line to y-axis
  let axisX = map(0, -5, 5, graphLeft, graphRight);
  line(px, py, axisX, py);

  drawingContext.setLineDash([]);

  // Draw point on curve
  fill('#FF5722');
  noStroke();
  if (!yOutOfRange) {
    circle(px, py, 14);
  } else {
    // Draw arrow indicating point is off-screen
    let arrowY = y > 5 ? graphTop + 10 : graphBottom - 10;
    triangle(px, arrowY, px - 8, arrowY + (y > 5 ? 15 : -15), px + 8, arrowY + (y > 5 ? 15 : -15));
  }

  // Highlight on domain line
  if (showDomainCheckbox.checked()) {
    fill('#FF5722');
    noStroke();
    circle(px, domainLineY, 12);
  }

  // Highlight on range line (if y is in visible range)
  if (showRangeCheckbox.checked() && !yOutOfRange) {
    fill('#FF5722');
    noStroke();
    circle(rangeLineX, py, 12);
  }

  // Coordinate display box
  let boxW = 100;
  let boxH = 45;
  let boxX = px + 15;
  let boxY = py - 25;

  // Keep box on screen
  if (boxX + boxW > graphRight - 10) boxX = px - boxW - 15;
  if (boxY < graphTop) boxY = py + 10;
  if (boxY + boxH > graphBottom) boxY = graphBottom - boxH - 5;

  fill(255, 255, 255, 240);
  stroke('#FF5722');
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 6);

  noStroke();
  fill('#333');
  textSize(13);
  textAlign(LEFT, TOP);
  text('x = ' + x.toFixed(2), boxX + 8, boxY + 6);
  if (yOutOfRange) {
    fill('#FF5722');
    text('y = ' + y.toFixed(2), boxX + 8, boxY + 24);
    textSize(10);
    text('(off graph)', boxX + 8, boxY + 38);
  } else {
    text('y = ' + y.toFixed(2), boxX + 8, boxY + 24);
  }
}

function handleHover(func) {
  // Get x value from mouse position
  let x = map(mouseX, graphLeft, graphRight, -5, 5);
  let y = func.fn(x);

  if (y !== null && isFinite(y) && y >= -5 && y <= 5) {
    hoverX = x;
    hoverY = y;

    let px = mouseX;
    let py = map(y, -5, 5, graphBottom, graphTop);

    // Draw point on curve
    fill('#FF5722');
    noStroke();
    circle(px, py, 12);

    // Draw dashed lines to axes
    stroke('#FF5722');
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);

    // Vertical line to x-axis (domain)
    let axisY = map(0, -5, 5, graphBottom, graphTop);
    line(px, py, px, axisY);

    // Horizontal line to y-axis (range)
    let axisX = map(0, -5, 5, graphLeft, graphRight);
    line(px, py, axisX, py);

    drawingContext.setLineDash([]);

    // Highlight on domain line
    if (showDomainCheckbox.checked()) {
      fill('#FF5722');
      noStroke();
      circle(px, domainLineY, 10);
    }

    // Highlight on range line
    if (showRangeCheckbox.checked()) {
      fill('#FF5722');
      noStroke();
      circle(rangeLineX, py, 10);
    }

    // Coordinate tooltip
    fill(255, 255, 255, 230);
    stroke('#ccc');
    strokeWeight(1);
    let tooltipW = 90;
    let tooltipH = 40;
    let tooltipX = px + 15;
    let tooltipY = py - 20;

    // Keep tooltip on screen
    if (tooltipX + tooltipW > graphRight) tooltipX = px - tooltipW - 15;
    if (tooltipY < graphTop) tooltipY = py + 10;

    rect(tooltipX, tooltipY, tooltipW, tooltipH, 5);

    noStroke();
    fill('#333');
    textSize(12);
    textAlign(LEFT, TOP);
    text('x = ' + x.toFixed(2), tooltipX + 8, tooltipY + 5);
    text('y = ' + y.toFixed(2), tooltipX + 8, tooltipY + 22);
  }
}

function drawInfoBox(func) {
  // Info box with domain/range in mathematical notation
  let boxW = 180;
  let boxH = 55;
  let boxX = canvasWidth - boxW - 10;
  let boxY = graphTop + 5;

  fill(255, 255, 255, 240);
  stroke('#ccc');
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 8);

  noStroke();
  textSize(13);
  textAlign(LEFT, TOP);

  // Domain text
  fill('#4CAF50');
  text('Domain: ', boxX + 10, boxY + 8);
  fill('#333');
  text(getDomainText(func), boxX + 65, boxY + 8);

  // Range text
  fill('#2196F3');
  text('Range: ', boxX + 10, boxY + 30);
  fill('#333');
  text(getRangeText(func), boxX + 65, boxY + 30);
}

function getDomainText(func) {
  if (func.domainHole !== undefined) {
    return 'x ≠ ' + func.domainHole;
  }
  if (func.domainMin === -Infinity && func.domainMax === Infinity) {
    return 'All real numbers';
  }
  if (func.domainMin === 0 && func.domainMax === Infinity) {
    return 'x ≥ 0';
  }
  return '[' + func.domainMin + ', ' + func.domainMax + ']';
}

function getRangeText(func) {
  if (func.rangeHole !== undefined) {
    return 'y ≠ ' + func.rangeHole;
  }
  if (func.rangeMin === -Infinity && func.rangeMax === Infinity) {
    return 'All real numbers';
  }
  if (func.rangeMin === 0 && func.rangeMax === Infinity) {
    return 'y ≥ 0';
  }
  if (func.rangeMin === -1 && func.rangeMax === 1) {
    return '−1 ≤ y ≤ 1';
  }
  return '[' + func.rangeMin + ', ' + func.rangeMax + ']';
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateGraphBounds();
  // Resize the x-value slider
  xSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
