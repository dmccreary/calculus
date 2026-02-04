// Zoom to Linear MicroSim
// Demonstrates that sufficiently zoomed-in views of differentiable functions appear linear
// MicroSim template version 2026.02
// schema: https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Graph dimensions within drawing area
let graphMargin = 50;
let graphLeft, graphRight, graphTop, graphBottom;
let graphWidth, graphHeight;

// View window parameters
let centerX = 1;  // Point where tangent is drawn
let centerY;      // Computed from function
let zoomLevel = 1;  // 1x to 100x zoom
let maxZoom = 100;

// Function data
let functions = [
  {
    name: 'f(x) = sin(x)',
    fn: x => Math.sin(x),
    deriv: x => Math.cos(x),
    defaultX: Math.PI / 4
  },
  {
    name: 'f(x) = x²',
    fn: x => x * x,
    deriv: x => 2 * x,
    defaultX: 1
  },
  {
    name: 'f(x) = eˣ',
    fn: x => Math.exp(x),
    deriv: x => Math.exp(x),
    defaultX: 0.5
  },
  {
    name: 'f(x) = x³',
    fn: x => x * x * x,
    deriv: x => 3 * x * x,
    defaultX: 0.8
  },
  {
    name: 'f(x) = ln(x)',
    fn: x => x > 0 ? Math.log(x) : null,
    deriv: x => x > 0 ? 1 / x : null,
    defaultX: 1.5
  },
  {
    name: 'f(x) = cos(x)',
    fn: x => Math.cos(x),
    deriv: x => -Math.sin(x),
    defaultX: Math.PI / 3
  }
];
let currentFunctionIndex = 0;

// UI state
let isDraggingPoint = false;
let isAutoZooming = false;
let autoZoomDirection = 1;  // 1 for zooming in, -1 for zooming out
let autoZoomSpeed = 0.02;

// Canvas-based button dimensions
let buttonWidth = 80;
let buttonHeight = 28;
let resetButtonX, resetButtonY;
let autoZoomButtonX, autoZoomButtonY;

// Function selector
let funcButtonWidth = 85;
let funcButtonHeight = 26;
let funcButtonStartX = 10;
let funcButtonY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Initialize center point
  let func = functions[currentFunctionIndex];
  centerX = func.defaultX;
  centerY = func.fn(centerX);

  // Calculate graph bounds
  updateGraphBounds();

  describe('Interactive visualization showing how zooming in on differentiable functions makes them appear linear, matching the tangent line', LABEL);
}

function draw() {
  updateCanvasSize();
  updateGraphBounds();

  // Handle auto-zoom animation
  if (isAutoZooming) {
    zoomLevel *= (1 + autoZoomDirection * autoZoomSpeed);
    zoomLevel = constrain(zoomLevel, 1, maxZoom);
    if (zoomLevel >= maxZoom || zoomLevel <= 1) {
      autoZoomDirection *= -1;
      if (zoomLevel <= 1) {
        isAutoZooming = false;
      }
    }
  }

  // Draw background regions
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Get current function
  let func = functions[currentFunctionIndex];
  centerY = func.fn(centerX);

  // Draw title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Zoom to Linear: Local Linearity', canvasWidth / 2, 8);
  textSize(14);
  fill('#666');
  text(func.name + ' at x = ' + centerX.toFixed(3), canvasWidth / 2, 32);

  // Draw the graph area
  drawAxes();
  drawFunction(func);
  drawTangentLine(func);
  drawCenterPoint(func);

  // Draw zoom info
  drawZoomInfo();

  // Draw controls
  drawControls();
}

function updateGraphBounds() {
  graphLeft = graphMargin + 10;
  graphRight = canvasWidth - graphMargin;
  graphTop = 60;
  graphBottom = drawHeight - 40;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;

  // Button positions
  resetButtonX = canvasWidth - buttonWidth - margin;
  resetButtonY = drawHeight + 65;
  autoZoomButtonX = canvasWidth - buttonWidth * 2 - margin - 10;
  autoZoomButtonY = drawHeight + 65;
  funcButtonY = drawHeight + 10;
}

function drawAxes() {
  let func = functions[currentFunctionIndex];

  // Calculate view window based on zoom level
  let halfWindowX = 3 / zoomLevel;
  let halfWindowY = 3 / zoomLevel;

  let xMin = centerX - halfWindowX;
  let xMax = centerX + halfWindowX;
  let yMin = centerY - halfWindowY;
  let yMax = centerY + halfWindowY;

  // Draw background
  fill('white');
  noStroke();
  rect(graphLeft, graphTop, graphWidth, graphHeight);

  // Clip to graph area
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(graphLeft, graphTop, graphWidth, graphHeight);
  drawingContext.clip();

  // Draw grid lines
  stroke('#eee');
  strokeWeight(1);

  // Calculate nice grid spacing based on zoom
  let gridSpacing = calculateGridSpacing(halfWindowX * 2);

  // Vertical grid lines
  let startX = Math.floor(xMin / gridSpacing) * gridSpacing;
  for (let x = startX; x <= xMax; x += gridSpacing) {
    let px = map(x, xMin, xMax, graphLeft, graphRight);
    if (Math.abs(x - centerX) < gridSpacing * 0.001) {
      stroke('#bbb');
      strokeWeight(2);
    } else {
      stroke('#ddd');
      strokeWeight(1);
    }
    line(px, graphTop, px, graphBottom);
  }

  // Horizontal grid lines
  let startY = Math.floor(yMin / gridSpacing) * gridSpacing;
  for (let y = startY; y <= yMax; y += gridSpacing) {
    let py = map(y, yMin, yMax, graphBottom, graphTop);
    if (Math.abs(y - centerY) < gridSpacing * 0.001) {
      stroke('#bbb');
      strokeWeight(2);
    } else {
      stroke('#ddd');
      strokeWeight(1);
    }
    line(graphLeft, py, graphRight, py);
  }

  drawingContext.restore();

  // Draw border
  stroke('#999');
  strokeWeight(2);
  noFill();
  rect(graphLeft, graphTop, graphWidth, graphHeight);

  // Draw axis labels at corners
  fill('#666');
  noStroke();
  textSize(11);

  textAlign(LEFT, TOP);
  text('x: ' + xMin.toFixed(zoomLevel > 10 ? 4 : 2), graphLeft + 5, graphBottom + 5);

  textAlign(RIGHT, TOP);
  text('x: ' + xMax.toFixed(zoomLevel > 10 ? 4 : 2), graphRight - 5, graphBottom + 5);

  textAlign(RIGHT, BOTTOM);
  text('y: ' + yMax.toFixed(zoomLevel > 10 ? 4 : 2), graphLeft - 5, graphTop + 15);

  textAlign(RIGHT, TOP);
  text('y: ' + yMin.toFixed(zoomLevel > 10 ? 4 : 2), graphLeft - 5, graphBottom - 5);
}

function calculateGridSpacing(range) {
  let magnitude = Math.pow(10, Math.floor(Math.log10(range)));
  let normalized = range / magnitude;

  if (normalized < 2) return magnitude * 0.2;
  if (normalized < 5) return magnitude * 0.5;
  return magnitude;
}

function drawFunction(func) {
  // Calculate view window
  let halfWindowX = 3 / zoomLevel;
  let halfWindowY = 3 / zoomLevel;

  let xMin = centerX - halfWindowX;
  let xMax = centerX + halfWindowX;
  let yMin = centerY - halfWindowY;
  let yMax = centerY + halfWindowY;

  // Clip to graph area
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(graphLeft, graphTop, graphWidth, graphHeight);
  drawingContext.clip();

  // Draw the function curve
  stroke('#2196F3');
  strokeWeight(3);
  noFill();

  beginShape();
  let prevValid = false;
  let step = (xMax - xMin) / 300;  // High resolution

  for (let x = xMin; x <= xMax; x += step) {
    let y = func.fn(x);

    if (y !== null && isFinite(y)) {
      let px = map(x, xMin, xMax, graphLeft, graphRight);
      let py = map(y, yMin, yMax, graphBottom, graphTop);

      if (!prevValid) {
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

  drawingContext.restore();
}

function drawTangentLine(func) {
  // Calculate derivative at center point
  let slope = func.deriv(centerX);
  if (slope === null || !isFinite(slope)) return;

  // Calculate view window
  let halfWindowX = 3 / zoomLevel;
  let halfWindowY = 3 / zoomLevel;

  let xMin = centerX - halfWindowX;
  let xMax = centerX + halfWindowX;
  let yMin = centerY - halfWindowY;
  let yMax = centerY + halfWindowY;

  // Clip to graph area
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(graphLeft, graphTop, graphWidth, graphHeight);
  drawingContext.clip();

  // Tangent line: y - centerY = slope * (x - centerX)
  // y = slope * x - slope * centerX + centerY
  let tangentAtXMin = slope * (xMin - centerX) + centerY;
  let tangentAtXMax = slope * (xMax - centerX) + centerY;

  let px1 = graphLeft;
  let py1 = map(tangentAtXMin, yMin, yMax, graphBottom, graphTop);
  let px2 = graphRight;
  let py2 = map(tangentAtXMax, yMin, yMax, graphBottom, graphTop);

  // Draw tangent line (dashed at low zoom, solid at high zoom)
  stroke('#E91E63');
  strokeWeight(2);

  if (zoomLevel < 10) {
    // Dashed line at low zoom
    drawingContext.setLineDash([8, 4]);
  } else {
    // Solid line at high zoom
    drawingContext.setLineDash([]);
  }

  line(px1, py1, px2, py2);
  drawingContext.setLineDash([]);

  drawingContext.restore();
}

function drawCenterPoint(func) {
  // Calculate view window
  let halfWindowX = 3 / zoomLevel;
  let halfWindowY = 3 / zoomLevel;

  let xMin = centerX - halfWindowX;
  let xMax = centerX + halfWindowX;
  let yMin = centerY - halfWindowY;
  let yMax = centerY + halfWindowY;

  let px = map(centerX, xMin, xMax, graphLeft, graphRight);
  let py = map(centerY, yMin, yMax, graphBottom, graphTop);

  // Only draw if point is visible
  if (px >= graphLeft && px <= graphRight && py >= graphTop && py <= graphBottom) {
    // Outer glow
    noStroke();
    fill(255, 87, 34, 50);
    circle(px, py, 24);

    // Main point
    fill('#FF5722');
    stroke('white');
    strokeWeight(2);
    circle(px, py, 14);
  }
}

function drawZoomInfo() {
  // Zoom factor display
  let boxW = 140;
  let boxH = 70;
  let boxX = graphRight - boxW - 10;
  let boxY = graphTop + 10;

  fill(255, 255, 255, 230);
  stroke('#ccc');
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 8);

  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);

  fill('#333');
  text('Zoom: ' + zoomLevel.toFixed(1) + 'x', boxX + 10, boxY + 8);

  // Show slope
  let func = functions[currentFunctionIndex];
  let slope = func.deriv(centerX);
  if (slope !== null && isFinite(slope)) {
    fill('#E91E63');
    text('Slope: ' + slope.toFixed(4), boxX + 10, boxY + 28);
  }

  // Visual indicator of linearity
  fill('#666');
  textSize(12);
  if (zoomLevel >= 50) {
    fill('#4CAF50');
    text('Nearly identical!', boxX + 10, boxY + 50);
  } else if (zoomLevel >= 20) {
    text('Very close...', boxX + 10, boxY + 50);
  } else if (zoomLevel >= 5) {
    text('Getting closer...', boxX + 10, boxY + 50);
  } else {
    text('Zoom in more!', boxX + 10, boxY + 50);
  }
}

function drawControls() {
  // Row 1: Function selector buttons
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Function:', 10, funcButtonY + funcButtonHeight / 2);

  for (let i = 0; i < functions.length; i++) {
    let bx = funcButtonStartX + 70 + i * (funcButtonWidth + 5);
    let by = funcButtonY;

    // Button background
    if (i === currentFunctionIndex) {
      fill('#2196F3');
    } else {
      fill('#e0e0e0');
    }
    stroke('#999');
    strokeWeight(1);
    rect(bx, by, funcButtonWidth, funcButtonHeight, 4);

    // Button text
    noStroke();
    fill(i === currentFunctionIndex ? 'white' : '#333');
    textSize(11);
    textAlign(CENTER, CENTER);
    text(functions[i].name, bx + funcButtonWidth / 2, by + funcButtonHeight / 2);
  }

  // Row 2: Zoom slider
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Zoom:', 10, drawHeight + 55);

  // Slider track
  let sliderX = sliderLeftMargin - 20;
  let sliderY = drawHeight + 50;
  let sliderW = canvasWidth - sliderLeftMargin - buttonWidth * 2 - 50;
  let sliderH = 10;

  fill('#ddd');
  stroke('#999');
  strokeWeight(1);
  rect(sliderX, sliderY, sliderW, sliderH, 5);

  // Slider filled portion (logarithmic scale)
  let logMin = Math.log(1);
  let logMax = Math.log(maxZoom);
  let logVal = Math.log(zoomLevel);
  let fillRatio = (logVal - logMin) / (logMax - logMin);

  fill('#2196F3');
  noStroke();
  rect(sliderX, sliderY, sliderW * fillRatio, sliderH, 5);

  // Slider handle
  let handleX = sliderX + sliderW * fillRatio;
  fill('white');
  stroke('#2196F3');
  strokeWeight(2);
  circle(handleX, sliderY + sliderH / 2, 20);

  // Zoom labels
  noStroke();
  fill('#666');
  textSize(10);
  textAlign(LEFT, TOP);
  text('1x', sliderX, sliderY + 15);
  textAlign(RIGHT, TOP);
  text('100x', sliderX + sliderW, sliderY + 15);

  // Auto-zoom button
  if (isAutoZooming) {
    fill('#FF5722');
  } else {
    fill('#4CAF50');
  }
  stroke('#666');
  strokeWeight(1);
  rect(autoZoomButtonX, autoZoomButtonY, buttonWidth, buttonHeight, 5);

  noStroke();
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  text(isAutoZooming ? 'Stop' : 'Auto Zoom', autoZoomButtonX + buttonWidth / 2, autoZoomButtonY + buttonHeight / 2);

  // Reset button
  fill('#9E9E9E');
  stroke('#666');
  strokeWeight(1);
  rect(resetButtonX, resetButtonY, buttonWidth, buttonHeight, 5);

  noStroke();
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Reset', resetButtonX + buttonWidth / 2, resetButtonY + buttonHeight / 2);

  // Row 3: Instructions
  noStroke();
  fill('#666');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Click and drag on the graph to move the tangent point', 10, drawHeight + 88);
}

function mousePressed() {
  // Check function buttons
  for (let i = 0; i < functions.length; i++) {
    let bx = funcButtonStartX + 70 + i * (funcButtonWidth + 5);
    let by = funcButtonY;

    if (mouseX >= bx && mouseX <= bx + funcButtonWidth &&
        mouseY >= by && mouseY <= by + funcButtonHeight) {
      currentFunctionIndex = i;
      let func = functions[currentFunctionIndex];
      centerX = func.defaultX;
      centerY = func.fn(centerX);
      zoomLevel = 1;
      isAutoZooming = false;
      return;
    }
  }

  // Check zoom slider
  let sliderX = sliderLeftMargin - 20;
  let sliderY = drawHeight + 50;
  let sliderW = canvasWidth - sliderLeftMargin - buttonWidth * 2 - 50;

  if (mouseX >= sliderX && mouseX <= sliderX + sliderW &&
      mouseY >= sliderY - 10 && mouseY <= sliderY + 25) {
    updateZoomFromMouse(sliderX, sliderW);
    return;
  }

  // Check auto-zoom button
  if (mouseX >= autoZoomButtonX && mouseX <= autoZoomButtonX + buttonWidth &&
      mouseY >= autoZoomButtonY && mouseY <= autoZoomButtonY + buttonHeight) {
    isAutoZooming = !isAutoZooming;
    if (isAutoZooming) {
      autoZoomDirection = 1;  // Start zooming in
    }
    return;
  }

  // Check reset button
  if (mouseX >= resetButtonX && mouseX <= resetButtonX + buttonWidth &&
      mouseY >= resetButtonY && mouseY <= resetButtonY + buttonHeight) {
    let func = functions[currentFunctionIndex];
    centerX = func.defaultX;
    centerY = func.fn(centerX);
    zoomLevel = 1;
    isAutoZooming = false;
    return;
  }

  // Check if clicking in graph area to drag point
  if (mouseX >= graphLeft && mouseX <= graphRight &&
      mouseY >= graphTop && mouseY <= graphBottom) {
    isDraggingPoint = true;
    updateCenterFromMouse();
  }
}

function mouseDragged() {
  // Dragging zoom slider
  let sliderX = sliderLeftMargin - 20;
  let sliderY = drawHeight + 50;
  let sliderW = canvasWidth - sliderLeftMargin - buttonWidth * 2 - 50;

  if (mouseY >= sliderY - 15 && mouseY <= sliderY + 30 &&
      mouseX >= sliderX - 10 && mouseX <= sliderX + sliderW + 10) {
    updateZoomFromMouse(sliderX, sliderW);
    return;
  }

  // Dragging point in graph
  if (isDraggingPoint) {
    updateCenterFromMouse();
  }
}

function mouseReleased() {
  isDraggingPoint = false;
}

function updateZoomFromMouse(sliderX, sliderW) {
  let ratio = constrain((mouseX - sliderX) / sliderW, 0, 1);
  // Logarithmic scale
  let logMin = Math.log(1);
  let logMax = Math.log(maxZoom);
  let logVal = logMin + ratio * (logMax - logMin);
  zoomLevel = Math.exp(logVal);
  zoomLevel = constrain(zoomLevel, 1, maxZoom);
}

function updateCenterFromMouse() {
  let func = functions[currentFunctionIndex];

  // Calculate view window
  let halfWindowX = 3 / zoomLevel;
  let halfWindowY = 3 / zoomLevel;

  let xMin = centerX - halfWindowX;
  let xMax = centerX + halfWindowX;

  // Map mouse to x value
  let newX = map(mouseX, graphLeft, graphRight, xMin, xMax);

  // Check if function is defined at this x
  let newY = func.fn(newX);
  if (newY !== null && isFinite(newY)) {
    centerX = newX;
    centerY = newY;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateGraphBounds();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
