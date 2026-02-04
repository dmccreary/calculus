// Concavity Explorer MicroSim
// Students explore concave up/down regions and connect them to the sign of f''(x)
// Drag a point along the curve to see the tangent line rotate and observe how
// the slope changes in concave up vs concave down regions.
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout parameters
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

// Graph regions
let mainGraphTop = 50;
let mainGraphBottom = 280;
let mainGraphHeight = mainGraphBottom - mainGraphTop;

let f2GraphTop = 310;
let f2GraphBottom = 430;
let f2GraphHeight = f2GraphBottom - f2GraphTop;

// Function and derivative parameters
let xMin = -3;
let xMax = 3;
let currentX = 0.5; // draggable point x-position
let isDragging = false;

// UI state
let showSecondDerivative = true;
let showSlopeValues = true;
let currentFunctionIndex = 0;

// Function definitions: [name, f(x), f'(x), f''(x), yScale]
let functions = [
  {
    name: "x^3 - 3x",
    f: (x) => x * x * x - 3 * x,
    fp: (x) => 3 * x * x - 3,
    fpp: (x) => 6 * x,
    yScale: 6,
    yScaleF2: 20
  },
  {
    name: "sin(x)",
    f: (x) => Math.sin(x),
    fp: (x) => Math.cos(x),
    fpp: (x) => -Math.sin(x),
    yScale: 1.5,
    yScaleF2: 1.5
  },
  {
    name: "x^4 - 2x^2",
    f: (x) => x * x * x * x - 2 * x * x,
    fp: (x) => 4 * x * x * x - 4 * x,
    fpp: (x) => 12 * x * x - 4,
    yScale: 3,
    yScaleF2: 35
  },
  {
    name: "e^(-x^2)",
    f: (x) => Math.exp(-x * x),
    fp: (x) => -2 * x * Math.exp(-x * x),
    fpp: (x) => (4 * x * x - 2) * Math.exp(-x * x),
    yScale: 1.2,
    yScaleF2: 2.5
  }
];

// Canvas-based control regions
let dropdownX, dropdownY, dropdownWidth, dropdownHeight;
let dropdownOpen = false;
let btn1X, btn1Y, btnWidth, btnHeight;
let btn2X, btn2Y;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Initialize control positions
  updateControlPositions();

  describe('Interactive concavity explorer showing function graph with tangent line and second derivative graph. Drag the point to explore concave up and concave down regions.', LABEL);
}

function updateControlPositions() {
  // Dropdown for function selection
  dropdownX = 10;
  dropdownY = drawHeight + 8;
  dropdownWidth = 140;
  dropdownHeight = 30;

  // Toggle buttons
  btnWidth = 100;
  btnHeight = 30;
  btn1X = dropdownX + dropdownWidth + 15;
  btn1Y = drawHeight + 8;
  btn2X = btn1X + btnWidth + 10;
  btn2Y = drawHeight + 8;
}

function draw() {
  updateCanvasSize();
  updateControlPositions();

  // Draw background
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
  textSize(24);
  text('Concavity Explorer', canvasWidth / 2, 8);

  // Subtitle showing current function
  textSize(14);
  fill(80);
  text('f(x) = ' + functions[currentFunctionIndex].name, canvasWidth / 2, 32);

  // Get current function
  let func = functions[currentFunctionIndex];

  // Draw main function graph
  drawMainGraph(func);

  // Draw second derivative graph if enabled
  if (showSecondDerivative) {
    drawSecondDerivativeGraph(func);
  }

  // Draw vertical connecting line at current x
  let screenX = mapX(currentX);
  stroke(100, 100, 100, 150);
  strokeWeight(1);
  setLineDash([5, 5]);
  line(screenX, mainGraphTop, screenX, showSecondDerivative ? f2GraphBottom : mainGraphBottom);
  setLineDash([]);

  // Draw annotation panel
  drawAnnotationPanel(func);

  // Draw controls
  drawControls();
}

function drawMainGraph(func) {
  let graphLeft = margin + 30;
  let graphRight = canvasWidth - margin - 20;
  let graphWidth = graphRight - graphLeft;
  let graphMidY = (mainGraphTop + mainGraphBottom) / 2;

  // Draw axes
  stroke(150);
  strokeWeight(1);
  // X-axis
  line(graphLeft, graphMidY, graphRight, graphMidY);
  // Y-axis
  let originX = graphLeft + graphWidth * (-xMin) / (xMax - xMin);
  line(originX, mainGraphTop, originX, mainGraphBottom);

  // Axis labels
  fill(100);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('x', graphRight + 10, graphMidY - 5);
  textAlign(LEFT, CENTER);
  text('y', originX + 5, mainGraphTop + 5);

  // Draw gridlines
  stroke(220);
  strokeWeight(0.5);
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    if (x !== 0) {
      let sx = mapX(x);
      line(sx, mainGraphTop + 5, sx, mainGraphBottom - 5);
      // X-axis tick labels
      noStroke();
      fill(120);
      textAlign(CENTER, TOP);
      textSize(10);
      text(x, sx, graphMidY + 2);
      stroke(220);
    }
  }

  // Draw function curve with color-coded concavity
  strokeWeight(3);
  noFill();
  let prevX = null;
  let prevY = null;
  let step = (xMax - xMin) / 200;

  for (let x = xMin; x <= xMax; x += step) {
    let y = func.f(x);
    let fpp = func.fpp(x);
    let screenX = mapX(x);
    let screenY = mapYMain(y, func.yScale);

    // Clamp to drawing region
    if (screenY < mainGraphTop || screenY > mainGraphBottom) {
      prevX = null;
      prevY = null;
      continue;
    }

    if (prevX !== null) {
      // Color based on concavity
      if (fpp > 0.01) {
        stroke(30, 100, 200); // Blue for concave up
      } else if (fpp < -0.01) {
        stroke(220, 120, 30); // Orange for concave down
      } else {
        stroke(100, 100, 100); // Gray for inflection
      }
      line(prevX, prevY, screenX, screenY);
    }
    prevX = screenX;
    prevY = screenY;
  }

  // Draw tangent line at current x
  let y = func.f(currentX);
  let slope = func.fp(currentX);
  let screenCX = mapX(currentX);
  let screenCY = mapYMain(y, func.yScale);

  // Draw tangent line
  stroke(200, 50, 50);
  strokeWeight(2);
  let tangentLen = 0.8;
  let x1 = currentX - tangentLen;
  let y1 = y - slope * tangentLen;
  let x2 = currentX + tangentLen;
  let y2 = y + slope * tangentLen;

  let sx1 = mapX(x1);
  let sy1 = mapYMain(y1, func.yScale);
  let sx2 = mapX(x2);
  let sy2 = mapYMain(y2, func.yScale);

  // Clamp tangent line to graph region
  sy1 = constrain(sy1, mainGraphTop, mainGraphBottom);
  sy2 = constrain(sy2, mainGraphTop, mainGraphBottom);

  line(sx1, sy1, sx2, sy2);

  // Draw draggable point
  fill(200, 50, 50);
  noStroke();
  ellipse(screenCX, screenCY, 16, 16);

  // Y-axis label
  fill(80);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  push();
  translate(margin + 10, (mainGraphTop + mainGraphBottom) / 2);
  rotate(-HALF_PI);
  text('f(x)', 0, 0);
  pop();
}

function drawSecondDerivativeGraph(func) {
  let graphLeft = margin + 30;
  let graphRight = canvasWidth - margin - 20;
  let graphWidth = graphRight - graphLeft;
  let graphMidY = (f2GraphTop + f2GraphBottom) / 2;

  // Section label
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text("f''(x) graph:", margin, f2GraphTop - 10);

  // Draw axes
  stroke(150);
  strokeWeight(1);
  // X-axis (y=0 line)
  line(graphLeft, graphMidY, graphRight, graphMidY);
  // Y-axis
  let originX = graphLeft + graphWidth * (-xMin) / (xMax - xMin);
  line(originX, f2GraphTop, originX, f2GraphBottom);

  // Fill positive/negative regions
  noStroke();
  let step = (xMax - xMin) / 200;

  for (let x = xMin; x <= xMax; x += step) {
    let fpp = func.fpp(x);
    let screenX = mapX(x);
    let screenY = mapYF2(fpp, func.yScaleF2);

    screenY = constrain(screenY, f2GraphTop, f2GraphBottom);

    let barWidth = (canvasWidth - 2 * margin - 50) / 200 + 1;

    if (fpp > 0) {
      fill(30, 100, 200, 60); // Blue fill for positive (concave up)
      rect(screenX - barWidth/2, screenY, barWidth, graphMidY - screenY);
    } else {
      fill(220, 120, 30, 60); // Orange fill for negative (concave down)
      rect(screenX - barWidth/2, graphMidY, barWidth, screenY - graphMidY);
    }
  }

  // Draw f''(x) curve
  stroke(80);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let x = xMin; x <= xMax; x += step) {
    let fpp = func.fpp(x);
    let screenX = mapX(x);
    let screenY = mapYF2(fpp, func.yScaleF2);
    screenY = constrain(screenY, f2GraphTop, f2GraphBottom);
    vertex(screenX, screenY);
  }
  endShape();

  // Draw marker at current x
  let fpp = func.fpp(currentX);
  let markerX = mapX(currentX);
  let markerY = mapYF2(fpp, func.yScaleF2);
  markerY = constrain(markerY, f2GraphTop, f2GraphBottom);

  fill(200, 50, 50);
  noStroke();
  ellipse(markerX, markerY, 12, 12);

  // Y-axis label
  fill(80);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  push();
  translate(margin + 10, (f2GraphTop + f2GraphBottom) / 2);
  rotate(-HALF_PI);
  text("f''(x)", 0, 0);
  pop();
}

function drawAnnotationPanel(func) {
  let panelWidth = 180;
  let panelHeight = showSlopeValues ? 120 : 80;
  let panelX = canvasWidth - panelWidth - 15;
  let panelY = mainGraphTop + 10;

  // Panel background
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 10);

  // Get current values
  let y = func.f(currentX);
  let slope = func.fp(currentX);
  let fpp = func.fpp(currentX);

  // Determine concavity
  let concavity, concavityColor;
  if (fpp > 0.01) {
    concavity = "Concave UP";
    concavityColor = color(30, 100, 200);
  } else if (fpp < -0.01) {
    concavity = "Concave DOWN";
    concavityColor = color(220, 120, 30);
  } else {
    concavity = "Inflection Point";
    concavityColor = color(100, 100, 100);
  }

  // Draw annotation text
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);

  let textX = panelX + 10;
  let textY = panelY + 10;
  let lineHeight = 22;

  fill(0);
  text("x = " + currentX.toFixed(2), textX, textY);
  textY += lineHeight;

  fill(concavityColor);
  textStyle(BOLD);
  text(concavity, textX, textY);
  textStyle(NORMAL);
  textY += lineHeight;

  fill(80);
  text("f''(x) = " + fpp.toFixed(2), textX, textY);
  textY += lineHeight;

  if (showSlopeValues) {
    text("Slope = " + slope.toFixed(2), textX, textY);
    textY += lineHeight;

    // Show slope behavior
    let slopeBehavior;
    if (fpp > 0.01) {
      slopeBehavior = "Slope increasing";
    } else if (fpp < -0.01) {
      slopeBehavior = "Slope decreasing";
    } else {
      slopeBehavior = "Slope change = 0";
    }
    textSize(12);
    fill(100);
    text(slopeBehavior, textX, textY);
  }
}

function drawControls() {
  // Function dropdown
  fill(240);
  stroke(180);
  strokeWeight(1);
  rect(dropdownX, dropdownY, dropdownWidth, dropdownHeight, 5);

  // Dropdown text
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text(functions[currentFunctionIndex].name, dropdownX + 8, dropdownY + dropdownHeight / 2);

  // Dropdown arrow
  fill(100);
  let arrowX = dropdownX + dropdownWidth - 20;
  let arrowY = dropdownY + dropdownHeight / 2;
  triangle(arrowX, arrowY - 4, arrowX + 10, arrowY - 4, arrowX + 5, arrowY + 4);

  // Dropdown menu if open
  if (dropdownOpen) {
    fill(255);
    stroke(180);
    rect(dropdownX, dropdownY + dropdownHeight, dropdownWidth, dropdownHeight * functions.length, 5);

    noStroke();
    for (let i = 0; i < functions.length; i++) {
      let itemY = dropdownY + dropdownHeight + i * dropdownHeight;

      // Highlight on hover
      if (mouseY > itemY && mouseY < itemY + dropdownHeight &&
          mouseX > dropdownX && mouseX < dropdownX + dropdownWidth) {
        fill(220);
        noStroke();
        rect(dropdownX + 2, itemY + 2, dropdownWidth - 4, dropdownHeight - 4, 3);
      }

      fill(0);
      textAlign(LEFT, CENTER);
      text(functions[i].name, dropdownX + 8, itemY + dropdownHeight / 2);
    }
  }

  // Toggle button 1: f''(x) Graph
  fill(showSecondDerivative ? color(30, 100, 200) : color(200));
  stroke(150);
  strokeWeight(1);
  rect(btn1X, btn1Y, btnWidth, btnHeight, 5);

  fill(showSecondDerivative ? 255 : 80);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text("f''(x) Graph", btn1X + btnWidth / 2, btn1Y + btnHeight / 2);

  // Toggle button 2: Slope Values
  fill(showSlopeValues ? color(30, 100, 200) : color(200));
  stroke(150);
  strokeWeight(1);
  rect(btn2X, btn2Y, btnWidth, btnHeight, 5);

  fill(showSlopeValues ? 255 : 80);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text("Slope Values", btn2X + btnWidth / 2, btn2Y + btnHeight / 2);
}

// Coordinate mapping functions
function mapX(x) {
  let graphLeft = margin + 30;
  let graphRight = canvasWidth - margin - 20;
  return map(x, xMin, xMax, graphLeft, graphRight);
}

function mapYMain(y, yScale) {
  let graphMidY = (mainGraphTop + mainGraphBottom) / 2;
  return graphMidY - (y / yScale) * (mainGraphHeight / 2);
}

function mapYF2(y, yScale) {
  let graphMidY = (f2GraphTop + f2GraphBottom) / 2;
  return graphMidY - (y / yScale) * (f2GraphHeight / 2);
}

function screenXToMathX(sx) {
  let graphLeft = margin + 30;
  let graphRight = canvasWidth - margin - 20;
  return map(sx, graphLeft, graphRight, xMin, xMax);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function mousePressed() {
  // Check dropdown
  if (mouseX > dropdownX && mouseX < dropdownX + dropdownWidth &&
      mouseY > dropdownY && mouseY < dropdownY + dropdownHeight) {
    dropdownOpen = !dropdownOpen;
    return;
  }

  // Check dropdown menu items
  if (dropdownOpen) {
    for (let i = 0; i < functions.length; i++) {
      let itemY = dropdownY + dropdownHeight + i * dropdownHeight;
      if (mouseX > dropdownX && mouseX < dropdownX + dropdownWidth &&
          mouseY > itemY && mouseY < itemY + dropdownHeight) {
        currentFunctionIndex = i;
        dropdownOpen = false;
        return;
      }
    }
    dropdownOpen = false;
  }

  // Check toggle buttons
  if (mouseX > btn1X && mouseX < btn1X + btnWidth &&
      mouseY > btn1Y && mouseY < btn1Y + btnHeight) {
    showSecondDerivative = !showSecondDerivative;
    return;
  }

  if (mouseX > btn2X && mouseX < btn2X + btnWidth &&
      mouseY > btn2Y && mouseY < btn2Y + btnHeight) {
    showSlopeValues = !showSlopeValues;
    return;
  }

  // Check if clicking on draggable point or in graph area
  let func = functions[currentFunctionIndex];
  let pointY = func.f(currentX);
  let screenCX = mapX(currentX);
  let screenCY = mapYMain(pointY, func.yScale);

  if (dist(mouseX, mouseY, screenCX, screenCY) < 20 ||
      (mouseY > mainGraphTop && mouseY < mainGraphBottom && mouseX > margin + 30 && mouseX < canvasWidth - margin - 20)) {
    isDragging = true;
    updateDragPosition();
  }
}

function mouseDragged() {
  if (isDragging) {
    updateDragPosition();
  }
}

function mouseReleased() {
  isDragging = false;
}

function updateDragPosition() {
  let newX = screenXToMathX(mouseX);
  currentX = constrain(newX, xMin + 0.1, xMax - 0.1);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  updateControlPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
