// Fencing Optimizer MicroSim
// Learning Objective: Students will solve fencing optimization problems by manipulating
// dimensions and observing how area changes, connecting visual intuition with calculus-based solutions.
// Bloom Level: Apply (L3)
// Bloom Verb: Solve
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Problem parameters
let totalFencing = 400;  // Total fencing available (constraint)
let xValue = 100;        // Current x dimension (parallel to river)
let sliderMin = 0;
let sliderMax = 200;     // Will be recalculated based on totalFencing

// Calculated values
let yValue;              // y = (F - x) / 2 where F is total fencing
let area;                // A = x * y

// Mode toggles
let showSolution = false;
let exploreMode = true;  // true = Explore Mode, false = Solve Mode

// UI element positions
let xSliderX, xSliderY, xSliderW;
let fenceInputX, fenceInputY, fenceInputW;
let solutionButtonX, solutionButtonY, solutionButtonW, solutionButtonH;
let modeButtonX, modeButtonY, modeButtonW, modeButtonH;

// Dragging state
let isDraggingXSlider = false;

// Layout regions
let fieldTop = 50;
let fieldHeight = 180;
let graphTop = 250;
let graphHeight = 180;

// Input state for fencing amount
let fenceInputActive = false;
let fenceInputText = "400";

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateControlPositions();
  updateCalculations();

  describe('Fencing optimization MicroSim showing a rectangular field next to a river with interactive controls to find maximum area.', LABEL);
}

function updateControlPositions() {
  // Slider for x value
  xSliderX = 120;
  xSliderY = drawHeight + 25;
  xSliderW = Math.min(250, canvasWidth * 0.35);

  // Fencing input field
  fenceInputX = xSliderX + xSliderW + 60;
  fenceInputY = drawHeight + 12;
  fenceInputW = 70;

  // Show Solution button
  solutionButtonX = fenceInputX + fenceInputW + 30;
  solutionButtonY = drawHeight + 12;
  solutionButtonW = 110;
  solutionButtonH = 28;

  // Mode toggle button
  modeButtonX = solutionButtonX;
  modeButtonY = drawHeight + 50;
  modeButtonW = 110;
  modeButtonH = 28;

  // Update slider max based on fencing
  sliderMax = totalFencing / 2;
}

function updateCalculations() {
  // Constraint: x + 2y = F (total fencing), where x is parallel to river
  // So y = (F - x) / 2
  yValue = (totalFencing - xValue) / 2;
  yValue = Math.max(0, yValue);

  // Area = x * y
  area = xValue * yValue;
}

function draw() {
  updateCanvasSize();
  updateCalculations();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Fencing Problem Optimizer', canvasWidth / 2, 8);
  textSize(14);
  fill(80);
  text('Maximize area with one side along a river (no fence needed)', canvasWidth / 2, 32);

  // Draw the field view
  drawFieldView();

  // Draw the graph
  drawAreaGraph();

  // Draw controls
  drawControls();

  // Draw data display panel
  drawDataPanel();
}

function drawFieldView() {
  let fieldCenterX = canvasWidth * 0.28;
  let fieldCenterY = fieldTop + fieldHeight / 2 + 15;

  // Scale factor for drawing
  let maxDim = Math.max(sliderMax, totalFencing / 2);
  let scaleFactor = Math.min(180 / maxDim, 150 / (totalFencing / 2));

  let rectWidth = xValue * scaleFactor;
  let rectHeight = yValue * scaleFactor;

  // Draw river (wavy blue line at top)
  let riverY = fieldCenterY - rectHeight / 2 - 10;
  stroke(30, 100, 200);
  strokeWeight(8);
  noFill();
  beginShape();
  for (let px = fieldCenterX - 130; px <= fieldCenterX + 130; px += 5) {
    let waveY = riverY + sin((px - fieldCenterX) * 0.08) * 6;
    vertex(px, waveY);
  }
  endShape();

  // River label
  fill(30, 100, 200);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(12);
  text('RIVER (no fence needed)', fieldCenterX, riverY - 12);

  // Draw field rectangle
  let rectX = fieldCenterX - rectWidth / 2;
  let rectY = fieldCenterY - rectHeight / 2;

  // Field fill - green grass
  fill(100, 180, 100, 150);
  stroke(60, 120, 60);
  strokeWeight(2);
  rect(rectX, rectY, rectWidth, rectHeight);

  // Draw fence (three sides - not the river side)
  stroke(139, 90, 43);  // Brown for fence
  strokeWeight(4);
  // Left side
  line(rectX, rectY, rectX, rectY + rectHeight);
  // Bottom side
  line(rectX, rectY + rectHeight, rectX + rectWidth, rectY + rectHeight);
  // Right side
  line(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth, rectY);

  // No fence on river side (dashed line)
  stroke(100, 100, 100);
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(rectX, rectY, rectX + rectWidth, rectY);
  drawingContext.setLineDash([]);

  // Dimension labels
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);

  // x dimension (bottom)
  text('x = ' + xValue.toFixed(0) + ' m', fieldCenterX, rectY + rectHeight + 20);

  // y dimension (side)
  push();
  translate(rectX - 20, fieldCenterY);
  rotate(-PI/2);
  text('y = ' + yValue.toFixed(0) + ' m', 0, 0);
  pop();

  // Area in center
  textSize(16);
  fill(0, 100, 0);
  text('Area = ' + area.toFixed(0) + ' m^2', fieldCenterX, fieldCenterY);

  // Check if at maximum
  let optimalX = totalFencing / 2;
  if (Math.abs(xValue - optimalX) < 2) {
    fill(255, 200, 0);
    stroke(200, 150, 0);
    strokeWeight(2);
    textSize(18);
    textAlign(CENTER, CENTER);
    text('MAXIMUM!', fieldCenterX, fieldCenterY - 30);
    noStroke();
  }
}

function drawAreaGraph() {
  let graphLeft = canvasWidth * 0.55;
  let graphRight = canvasWidth - 30;
  let graphBottom = graphTop + graphHeight - 20;
  let graphDrawHeight = graphHeight - 40;

  // Graph background
  fill(252, 252, 255);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft, graphTop, graphRight - graphLeft, graphHeight, 5);

  // Graph title
  fill(50);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  text('A(x) = x(F - x)/2 = ' + (totalFencing/2).toFixed(0) + 'x - 0.5x^2', (graphLeft + graphRight) / 2, graphTop + 5);

  // Axes
  stroke(100);
  strokeWeight(1);
  // x-axis
  line(graphLeft + 35, graphBottom, graphRight - 10, graphBottom);
  // y-axis
  line(graphLeft + 35, graphTop + 25, graphLeft + 35, graphBottom);

  // Axis labels
  fill(80);
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  text('x (meters)', (graphLeft + 35 + graphRight - 10) / 2, graphBottom + 5);

  push();
  translate(graphLeft + 12, (graphTop + 25 + graphBottom) / 2);
  rotate(-PI/2);
  textAlign(CENTER, BOTTOM);
  text('Area (m^2)', 0, 0);
  pop();

  // Calculate scale
  let xScale = (graphRight - 10 - graphLeft - 35) / sliderMax;
  let maxArea = (totalFencing / 2) * (totalFencing / 4);  // Maximum possible area
  let yScale = graphDrawHeight / (maxArea * 1.1);

  // Draw the area function A(x) = x * (F - x) / 2
  stroke(0, 100, 200);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = graphLeft + 35; px <= graphRight - 10; px += 2) {
    let x = (px - graphLeft - 35) / xScale;
    if (x >= 0 && x <= sliderMax) {
      let y = (x * (totalFencing - x)) / 2;
      let py = graphBottom - y * yScale;
      if (py >= graphTop + 25) {
        vertex(px, py);
      }
    }
  }
  endShape();

  // Draw optimal point (maximum)
  let optimalX = totalFencing / 2;
  let optimalArea = (optimalX * (totalFencing - optimalX)) / 2;
  let optPx = graphLeft + 35 + optimalX * xScale;
  let optPy = graphBottom - optimalArea * yScale;

  // Vertical dashed line at critical point
  stroke(200, 100, 100);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(optPx, graphTop + 25, optPx, graphBottom);
  drawingContext.setLineDash([]);

  // Mark optimal point
  if (showSolution || !exploreMode) {
    fill(255, 200, 0);
    stroke(200, 150, 0);
    strokeWeight(2);
    circle(optPx, optPy, 14);

    // Label
    fill(150, 100, 0);
    noStroke();
    textSize(10);
    textAlign(LEFT, BOTTOM);
    text('Max at x=' + optimalX.toFixed(0), optPx + 10, optPy - 5);
  }

  // Draw current point
  let currentPx = graphLeft + 35 + xValue * xScale;
  let currentPy = graphBottom - area * yScale;

  fill(0, 150, 200);
  stroke(0, 100, 150);
  strokeWeight(2);
  circle(currentPx, currentPy, 12);

  // x-axis tick marks
  fill(80);
  noStroke();
  textSize(9);
  textAlign(CENTER, TOP);
  for (let tick = 0; tick <= sliderMax; tick += sliderMax / 4) {
    let tickX = graphLeft + 35 + tick * xScale;
    stroke(150);
    strokeWeight(1);
    line(tickX, graphBottom, tickX, graphBottom + 3);
    noStroke();
    text(tick.toFixed(0), tickX, graphBottom + 5);
  }

  // y-axis tick marks
  textAlign(RIGHT, CENTER);
  let yTickStep = Math.pow(10, Math.floor(Math.log10(maxArea))) / 2;
  for (let tick = 0; tick <= maxArea * 1.1; tick += yTickStep) {
    let tickY = graphBottom - tick * yScale;
    if (tickY >= graphTop + 25) {
      stroke(150);
      strokeWeight(1);
      line(graphLeft + 32, tickY, graphLeft + 35, tickY);
      noStroke();
      text(tick.toFixed(0), graphLeft + 30, tickY);
    }
  }
}

function drawDataPanel() {
  let panelX = canvasWidth * 0.55;
  let panelY = fieldTop;
  let panelW = canvasWidth - panelX - 20;
  let panelH = 85;

  // Panel background
  fill(255, 255, 255, 240);
  stroke(180);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  // Panel content
  fill('black');
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);

  let yPos = panelY + 10;
  let lineHeight = 18;

  fill(50);
  textSize(11);
  text('Current Values:', panelX + 10, yPos);
  yPos += lineHeight;

  textSize(12);
  fill(0, 100, 150);
  text('x = ' + xValue.toFixed(1) + ' m', panelX + 10, yPos);
  yPos += lineHeight;

  fill(100, 50, 150);
  text('y = ' + yValue.toFixed(1) + ' m', panelX + 10, yPos);
  yPos += lineHeight;

  let fencingUsed = xValue + 2 * yValue;
  fill(139, 90, 43);
  text('Fencing: ' + fencingUsed.toFixed(0) + ' / ' + totalFencing.toFixed(0) + ' m', panelX + 10, yPos);

  // Show solution info if enabled
  if (showSolution || !exploreMode) {
    let solPanelY = panelY + panelH + 10;
    let solPanelH = 95;

    fill(255, 250, 240);
    stroke(200, 180, 150);
    strokeWeight(1);
    rect(panelX, solPanelY, panelW, solPanelH, 8);

    fill(150, 100, 0);
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);
    text('Solution (Calculus):', panelX + 10, solPanelY + 8);

    fill(80);
    textSize(10);
    let optX = totalFencing / 2;
    let optY = totalFencing / 4;
    let optArea = optX * optY;

    text("A(x) = x(F-x)/2 = (F/2)x - x^2/2", panelX + 10, solPanelY + 26);
    text("A'(x) = F/2 - x = 0", panelX + 10, solPanelY + 40);
    text("x* = F/2 = " + optX.toFixed(0) + " m", panelX + 10, solPanelY + 54);
    text("y* = F/4 = " + optY.toFixed(0) + " m", panelX + 10, solPanelY + 68);
    fill(0, 120, 0);
    text("Max Area = " + optArea.toFixed(0) + " m^2", panelX + 10, solPanelY + 82);
  }
}

function drawControls() {
  // X slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('x value: ' + xValue.toFixed(0), 10, xSliderY);

  // Draw slider track
  let sliderHandleX = map(xValue, sliderMin, sliderMax, xSliderX, xSliderX + xSliderW);
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(xSliderX, xSliderY - 6, xSliderW, 12, 6);

  // Draw slider fill (progress)
  fill(100, 180, 230);
  noStroke();
  rect(xSliderX, xSliderY - 6, sliderHandleX - xSliderX, 12, 6, 0, 0, 6);

  // Draw slider handle
  fill(isDraggingXSlider ? '#0066cc' : '#0088ff');
  stroke('#006699');
  strokeWeight(2);
  circle(sliderHandleX, xSliderY, 22);

  // Slider range labels
  fill(100);
  noStroke();
  textSize(10);
  textAlign(LEFT, TOP);
  text('0', xSliderX, xSliderY + 12);
  textAlign(RIGHT, TOP);
  text(sliderMax.toFixed(0), xSliderX + xSliderW, xSliderY + 12);

  // Fencing input label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Fencing:', fenceInputX - 55, fenceInputY + 14);

  // Fencing input field
  fill(fenceInputActive ? 'white' : '#f8f8f8');
  stroke(fenceInputActive ? '#0088ff' : '#ccc');
  strokeWeight(fenceInputActive ? 2 : 1);
  rect(fenceInputX, fenceInputY, fenceInputW, 28, 4);

  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(fenceInputText + ' m', fenceInputX + fenceInputW / 2, fenceInputY + 14);

  // Show Solution button
  if (exploreMode) {
    fill(showSolution ? '#4CAF50' : '#2196F3');
    stroke(showSolution ? '#388E3C' : '#1976D2');
  } else {
    fill('#9E9E9E');
    stroke('#757575');
  }
  strokeWeight(1);
  rect(solutionButtonX, solutionButtonY, solutionButtonW, solutionButtonH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(showSolution ? 'Hide Solution' : 'Show Solution', solutionButtonX + solutionButtonW / 2, solutionButtonY + solutionButtonH / 2);

  // Mode toggle button
  fill(exploreMode ? '#FF9800' : '#9C27B0');
  stroke(exploreMode ? '#F57C00' : '#7B1FA2');
  strokeWeight(1);
  rect(modeButtonX, modeButtonY, modeButtonW, modeButtonH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(exploreMode ? 'Explore Mode' : 'Solve Mode', modeButtonX + modeButtonW / 2, modeButtonY + modeButtonH / 2);

  // Instructions
  fill(100);
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Drag slider to change x. Enter fencing amount.', 10, drawHeight + 80);
}

function mousePressed() {
  // Check x slider
  let sliderHandleX = map(xValue, sliderMin, sliderMax, xSliderX, xSliderX + xSliderW);
  if (dist(mouseX, mouseY, sliderHandleX, xSliderY) < 15) {
    isDraggingXSlider = true;
    return;
  }

  // Check if clicked on slider track
  if (mouseY >= xSliderY - 12 && mouseY <= xSliderY + 12 &&
      mouseX >= xSliderX && mouseX <= xSliderX + xSliderW) {
    isDraggingXSlider = true;
    xValue = map(mouseX, xSliderX, xSliderX + xSliderW, sliderMin, sliderMax);
    xValue = constrain(xValue, sliderMin, sliderMax);
    xValue = Math.round(xValue);
    return;
  }

  // Check fencing input field
  if (mouseX >= fenceInputX && mouseX <= fenceInputX + fenceInputW &&
      mouseY >= fenceInputY && mouseY <= fenceInputY + 28) {
    fenceInputActive = true;
    fenceInputText = "";
    return;
  } else {
    if (fenceInputActive) {
      // Validate and apply input
      let newFencing = parseFloat(fenceInputText);
      if (!isNaN(newFencing) && newFencing > 0 && newFencing <= 2000) {
        totalFencing = newFencing;
        sliderMax = totalFencing / 2;
        xValue = Math.min(xValue, sliderMax);
        updateControlPositions();
      }
      fenceInputText = totalFencing.toFixed(0);
    }
    fenceInputActive = false;
  }

  // Check show solution button
  if (exploreMode && mouseX >= solutionButtonX && mouseX <= solutionButtonX + solutionButtonW &&
      mouseY >= solutionButtonY && mouseY <= solutionButtonY + solutionButtonH) {
    showSolution = !showSolution;
    return;
  }

  // Check mode toggle button
  if (mouseX >= modeButtonX && mouseX <= modeButtonX + modeButtonW &&
      mouseY >= modeButtonY && mouseY <= modeButtonY + modeButtonH) {
    exploreMode = !exploreMode;
    if (!exploreMode) {
      showSolution = true;  // Always show solution in Solve Mode
    }
    return;
  }
}

function mouseDragged() {
  if (isDraggingXSlider) {
    xValue = map(mouseX, xSliderX, xSliderX + xSliderW, sliderMin, sliderMax);
    xValue = constrain(xValue, sliderMin, sliderMax);
    xValue = Math.round(xValue);
  }
}

function mouseReleased() {
  isDraggingXSlider = false;
}

function keyPressed() {
  if (fenceInputActive) {
    if (keyCode === ENTER || keyCode === RETURN) {
      let newFencing = parseFloat(fenceInputText);
      if (!isNaN(newFencing) && newFencing > 0 && newFencing <= 2000) {
        totalFencing = newFencing;
        sliderMax = totalFencing / 2;
        xValue = Math.min(xValue, sliderMax);
        updateControlPositions();
      }
      fenceInputText = totalFencing.toFixed(0);
      fenceInputActive = false;
    } else if (keyCode === BACKSPACE) {
      fenceInputText = fenceInputText.slice(0, -1);
    } else if (key >= '0' && key <= '9') {
      if (fenceInputText.length < 5) {
        fenceInputText += key;
      }
    } else if (key === '.' && !fenceInputText.includes('.')) {
      fenceInputText += key;
    }
    return false;  // Prevent default behavior
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateControlPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.max(600, Math.floor(container.width));
  updateControlPositions();
}
