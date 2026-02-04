// Profit Optimizer MicroSim
// Students differentiate between revenue, cost, and profit functions
// to understand how their relationships determine optimal production level
// MicroSim template version 2026.02
// schema: https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 395;
let controlHeight = 155;  // 4 rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

// Graph dimensions within drawing area
let graphMargin = 60;
let graphLeft, graphRight, graphTop, graphBottom;
let graphWidth, graphHeight;

// Economic model parameters
let quantity = 50;           // Current quantity (x)
let fixedCost = 200;         // Fixed cost component
let variableCost = 2;        // Variable cost per unit
let basePrice = 30;          // Price at quantity = 0
let demandSlope = 0.2;       // How much price drops per unit

// Mode and display state
let isExploreMode = true;    // true = Explore, false = Challenge
let showProfit = true;       // Whether to show profit curve
let showMaxProfit = false;   // Whether to highlight max profit point
let maxProfitX = 0;          // x value where profit is maximum
let maxProfitY = 0;          // maximum profit value

// UI control regions (canvas-based)
let controls = {
  quantitySlider: { x: 0, y: 0, w: 0, h: 20, min: 0, max: 100, value: 50 },
  fixedCostSlider: { x: 0, y: 0, w: 0, h: 20, min: 0, max: 500, value: 200 },
  variableCostSlider: { x: 0, y: 0, w: 0, h: 20, min: 0, max: 10, value: 2 },
  basePriceSlider: { x: 0, y: 0, w: 0, h: 20, min: 10, max: 50, value: 30 },
  demandSlopeSlider: { x: 0, y: 0, w: 0, h: 20, min: 0.05, max: 0.5, value: 0.2 },
  modeButton: { x: 10, y: 0, w: 90, h: 28 },
  showProfitButton: { x: 110, y: 0, w: 100, h: 28 },
  findMaxButton: { x: 220, y: 0, w: 120, h: 28 }
};

let draggingSlider = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);
  updateControlPositions();
  calculateMaxProfit();

  describe('Interactive visualization showing revenue, cost, and profit curves with controls to explore optimal production quantity', LABEL);
}

function draw() {
  updateCanvasSize();
  updateControlPositions();

  // Draw background regions
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update graph bounds
  updateGraphBounds();

  // Draw title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Profit Optimizer', canvasWidth * 0.35, 8);
  textSize(14);
  fill('#666');
  text('R(x) = Revenue | C(x) = Cost | P(x) = Profit', canvasWidth * 0.35, 32);

  // Draw axes and grid
  drawAxes();

  // Draw break-even points
  drawBreakEvenPoints();

  // Draw shaded profit region
  drawProfitRegion();

  // Draw the three curves
  drawCurves();

  // Draw vertical line at current quantity
  drawCurrentQuantityLine();

  // Draw max profit point if enabled
  if (showMaxProfit) {
    drawMaxProfitPoint();
  }

  // Draw info panel
  drawInfoPanel();

  // Draw controls
  drawControls();
}

function updateGraphBounds() {
  graphLeft = graphMargin + 10;
  graphRight = canvasWidth - 180;  // Leave room for info panel
  graphTop = 55;
  graphBottom = drawHeight - 30;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;
}

// Economic functions
function revenue(x) {
  // R(x) = p(x) * x where p(x) = basePrice - demandSlope * x
  let price = basePrice - demandSlope * x;
  return price > 0 ? price * x : 0;
}

function cost(x) {
  // C(x) = fixedCost + variableCost * x
  return fixedCost + variableCost * x;
}

function profit(x) {
  return revenue(x) - cost(x);
}

function marginalRevenue(x) {
  // MR = dR/dx = basePrice - 2 * demandSlope * x
  return basePrice - 2 * demandSlope * x;
}

function marginalCost(x) {
  // MC = dC/dx = variableCost
  return variableCost;
}

function calculateMaxProfit() {
  // Maximum profit where MR = MC
  // basePrice - 2 * demandSlope * x = variableCost
  // x = (basePrice - variableCost) / (2 * demandSlope)
  maxProfitX = (basePrice - variableCost) / (2 * demandSlope);
  maxProfitX = constrain(maxProfitX, 0, 100);
  maxProfitY = profit(maxProfitX);
}

function findBreakEvenPoints() {
  // Solve P(x) = 0, which is R(x) = C(x)
  // (basePrice - demandSlope * x) * x = fixedCost + variableCost * x
  // basePrice*x - demandSlope*x^2 = fixedCost + variableCost*x
  // -demandSlope*x^2 + (basePrice - variableCost)*x - fixedCost = 0
  // demandSlope*x^2 - (basePrice - variableCost)*x + fixedCost = 0

  let a = demandSlope;
  let b = -(basePrice - variableCost);
  let c = fixedCost;

  let discriminant = b * b - 4 * a * c;

  if (discriminant < 0) return [];
  if (discriminant === 0) return [(-b) / (2 * a)];

  let x1 = (-b - Math.sqrt(discriminant)) / (2 * a);
  let x2 = (-b + Math.sqrt(discriminant)) / (2 * a);

  let points = [];
  if (x1 >= 0 && x1 <= 100) points.push(x1);
  if (x2 >= 0 && x2 <= 100) points.push(x2);

  return points.sort((a, b) => a - b);
}

function drawAxes() {
  // Find scale for y-axis based on max values
  let maxY = 0;
  for (let x = 0; x <= 100; x += 5) {
    maxY = max(maxY, revenue(x), cost(x));
  }
  maxY = ceil(maxY / 200) * 200;  // Round up to nearest 200

  // Store for use in other functions
  this.yScale = maxY;

  stroke('#ddd');
  strokeWeight(1);

  // Grid lines
  for (let i = 0; i <= 10; i++) {
    let x = map(i * 10, 0, 100, graphLeft, graphRight);
    line(x, graphTop, x, graphBottom);

    let y = map(i, 0, 10, graphBottom, graphTop);
    line(graphLeft, y, graphRight, y);
  }

  // Axes
  stroke('#999');
  strokeWeight(2);
  line(graphLeft, graphBottom, graphRight, graphBottom);  // x-axis
  line(graphLeft, graphTop, graphLeft, graphBottom);      // y-axis

  // Axis labels
  fill('#666');
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);

  for (let i = 0; i <= 100; i += 20) {
    let x = map(i, 0, 100, graphLeft, graphRight);
    text(i, x, graphBottom + 5);
  }

  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 10; i += 2) {
    let y = map(i, 0, 10, graphBottom, graphTop);
    let val = (maxY * i / 10);
    text('$' + val.toFixed(0), graphLeft - 5, y);
  }

  // Axis titles
  textSize(14);
  textAlign(CENTER, TOP);
  text('Quantity (x)', (graphLeft + graphRight) / 2, graphBottom + 18);

  push();
  translate(graphLeft - 45, (graphTop + graphBottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text('Dollars ($)', 0, 0);
  pop();
}

function drawCurves() {
  let maxY = this.yScale || 2000;

  // Revenue curve (green)
  stroke('#4CAF50');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let x = 0; x <= 100; x += 1) {
    let px = map(x, 0, 100, graphLeft, graphRight);
    let py = map(revenue(x), 0, maxY, graphBottom, graphTop);
    py = constrain(py, graphTop, graphBottom);
    vertex(px, py);
  }
  endShape();

  // Cost curve (red)
  stroke('#F44336');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let x = 0; x <= 100; x += 1) {
    let px = map(x, 0, 100, graphLeft, graphRight);
    let py = map(cost(x), 0, maxY, graphBottom, graphTop);
    py = constrain(py, graphTop, graphBottom);
    vertex(px, py);
  }
  endShape();

  // Profit curve (blue) - only in explore mode or if toggled on
  if (showProfit && (isExploreMode || showMaxProfit)) {
    stroke('#2196F3');
    strokeWeight(3);
    noFill();
    beginShape();
    for (let x = 0; x <= 100; x += 1) {
      let px = map(x, 0, 100, graphLeft, graphRight);
      let p = profit(x);
      // Map profit with 0 at the center of the graph area
      let py = map(p, -maxY/2, maxY/2, graphBottom, graphTop);
      py = constrain(py, graphTop, graphBottom);
      vertex(px, py);
    }
    endShape();
  }
}

function drawBreakEvenPoints() {
  let maxY = this.yScale || 2000;
  let breakEvenPoints = findBreakEvenPoints();

  fill('#FF9800');
  noStroke();

  for (let bx of breakEvenPoints) {
    let px = map(bx, 0, 100, graphLeft, graphRight);
    let py = map(revenue(bx), 0, maxY, graphBottom, graphTop);

    // Draw marker
    circle(px, py, 12);

    // Label
    textAlign(CENTER, BOTTOM);
    textSize(11);
    fill('#FF9800');
    text('BE: ' + bx.toFixed(0), px, py - 8);
  }
}

function drawProfitRegion() {
  let maxY = this.yScale || 2000;
  let breakEvenPoints = findBreakEvenPoints();

  if (breakEvenPoints.length >= 2) {
    // Shade profitable region
    fill(76, 175, 80, 40);  // Light green
    noStroke();
    beginShape();

    // Top curve (revenue)
    for (let x = breakEvenPoints[0]; x <= breakEvenPoints[1]; x += 1) {
      let px = map(x, 0, 100, graphLeft, graphRight);
      let py = map(revenue(x), 0, maxY, graphBottom, graphTop);
      py = constrain(py, graphTop, graphBottom);
      vertex(px, py);
    }

    // Bottom curve (cost) - reversed
    for (let x = breakEvenPoints[1]; x >= breakEvenPoints[0]; x -= 1) {
      let px = map(x, 0, 100, graphLeft, graphRight);
      let py = map(cost(x), 0, maxY, graphBottom, graphTop);
      py = constrain(py, graphTop, graphBottom);
      vertex(px, py);
    }

    endShape(CLOSE);
  }
}

function drawCurrentQuantityLine() {
  let maxY = this.yScale || 2000;
  let px = map(quantity, 0, 100, graphLeft, graphRight);

  // Vertical line
  stroke('#9C27B0');
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  line(px, graphTop, px, graphBottom);
  drawingContext.setLineDash([]);

  // Points on curves
  let revY = map(revenue(quantity), 0, maxY, graphBottom, graphTop);
  let costY = map(cost(quantity), 0, maxY, graphBottom, graphTop);

  revY = constrain(revY, graphTop, graphBottom);
  costY = constrain(costY, graphTop, graphBottom);

  // Revenue point (green)
  fill('#4CAF50');
  noStroke();
  circle(px, revY, 10);

  // Cost point (red)
  fill('#F44336');
  circle(px, costY, 10);

  // Gap indicator (profit)
  if (revenue(quantity) > cost(quantity)) {
    stroke('#4CAF50');
    strokeWeight(3);
    line(px + 15, costY, px + 15, revY);

    // Arrow heads
    fill('#4CAF50');
    noStroke();
    triangle(px + 15, costY, px + 12, costY + 6, px + 18, costY + 6);
    triangle(px + 15, revY, px + 12, revY - 6, px + 18, revY - 6);
  } else if (revenue(quantity) < cost(quantity)) {
    stroke('#F44336');
    strokeWeight(3);
    line(px + 15, revY, px + 15, costY);

    // Arrow heads indicating loss
    fill('#F44336');
    noStroke();
    triangle(px + 15, revY, px + 12, revY + 6, px + 18, revY + 6);
    triangle(px + 15, costY, px + 12, costY - 6, px + 18, costY - 6);
  }
}

function drawMaxProfitPoint() {
  let maxY = this.yScale || 2000;

  let px = map(maxProfitX, 0, 100, graphLeft, graphRight);
  let revY = map(revenue(maxProfitX), 0, maxY, graphBottom, graphTop);
  let costY = map(cost(maxProfitX), 0, maxY, graphBottom, graphTop);

  // Highlight vertical line
  stroke('#9C27B0');
  strokeWeight(3);
  line(px, graphTop, px, graphBottom);

  // Star at max profit
  fill('#FFD700');
  stroke('#FF9800');
  strokeWeight(2);
  drawStar(px, (revY + costY) / 2, 15, 8, 5);

  // Label
  noStroke();
  fill('#9C27B0');
  textAlign(CENTER, BOTTOM);
  textSize(12);
  text('Max Profit', px, graphTop - 5);
  text('x = ' + maxProfitX.toFixed(1), px, graphTop + 12);
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += angle) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius2;
    sy = y + sin(a + halfAngle) * radius2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawInfoPanel() {
  let panelX = canvasWidth - 170;
  let panelY = graphTop;
  let panelW = 160;
  let panelH = 220;

  // Panel background
  fill(255, 255, 255, 245);
  stroke('#ccc');
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  // Title
  noStroke();
  fill('#333');
  textAlign(LEFT, TOP);
  textSize(14);
  text('At x = ' + quantity, panelX + 10, panelY + 8);

  // Divider
  stroke('#ddd');
  line(panelX + 10, panelY + 28, panelX + panelW - 10, panelY + 28);

  // Values
  noStroke();
  textSize(13);
  let y = panelY + 38;
  let lineHeight = 22;

  // Revenue
  fill('#4CAF50');
  text('Revenue:', panelX + 10, y);
  fill('#333');
  textAlign(RIGHT, TOP);
  text('$' + revenue(quantity).toFixed(0), panelX + panelW - 10, y);

  // Cost
  y += lineHeight;
  textAlign(LEFT, TOP);
  fill('#F44336');
  text('Cost:', panelX + 10, y);
  fill('#333');
  textAlign(RIGHT, TOP);
  text('$' + cost(quantity).toFixed(0), panelX + panelW - 10, y);

  // Profit
  y += lineHeight;
  textAlign(LEFT, TOP);
  fill('#2196F3');
  text('Profit:', panelX + 10, y);
  let p = profit(quantity);
  fill(p >= 0 ? '#4CAF50' : '#F44336');
  textAlign(RIGHT, TOP);
  text((p >= 0 ? '+' : '') + '$' + p.toFixed(0), panelX + panelW - 10, y);

  // Divider
  y += lineHeight + 5;
  stroke('#ddd');
  line(panelX + 10, y, panelX + panelW - 10, y);

  // Break-even points
  y += 10;
  noStroke();
  fill('#FF9800');
  textAlign(LEFT, TOP);
  textSize(12);
  text('Break-even:', panelX + 10, y);

  let breakEvens = findBreakEvenPoints();
  y += 18;
  fill('#666');
  if (breakEvens.length === 0) {
    text('None (always loss)', panelX + 10, y);
  } else {
    text('x = ' + breakEvens.map(x => x.toFixed(1)).join(', '), panelX + 10, y);
  }

  // Max profit info
  y += 25;
  fill('#9C27B0');
  text('Max Profit:', panelX + 10, y);
  y += 18;
  fill('#666');
  text('x = ' + maxProfitX.toFixed(1), panelX + 10, y);
  text('$' + maxProfitY.toFixed(0), panelX + 80, y);

  // MR = MC condition
  y += 18;
  textSize(11);
  fill('#999');
  text('(where MR = MC)', panelX + 10, y);
}

function drawControls() {
  let y = drawHeight + 10;

  // Row 1: Mode button, Show Profit toggle, Find Max button
  drawButton(controls.modeButton.x, y, controls.modeButton.w, controls.modeButton.h,
             isExploreMode ? 'Explore' : 'Challenge', '#673AB7');

  drawToggleButton(controls.showProfitButton.x, y, controls.showProfitButton.w, controls.showProfitButton.h,
                   'Show Profit', showProfit, '#2196F3');

  drawButton(controls.findMaxButton.x, y, controls.findMaxButton.w, controls.findMaxButton.h,
             'Find Max Profit', '#FF9800');

  // Row 2: Quantity slider
  y = drawHeight + 45;
  drawSliderWithLabel(controls.quantitySlider, 'Quantity (x)', quantity, 0, '', y);

  // Row 3: Cost parameters (two sliders)
  y = drawHeight + 80;
  let halfWidth = (canvasWidth - sliderLeftMargin - margin - 20) / 2;

  // Fixed cost slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Fixed Cost: $' + fixedCost.toFixed(0), 10, y + 10);
  drawSlider(controls.fixedCostSlider, y);

  // Variable cost slider
  let varCostX = sliderLeftMargin + halfWidth + 30;
  text('Var Cost: $' + variableCost.toFixed(1), varCostX - 90, y + 10);
  controls.variableCostSlider.x = varCostX;
  controls.variableCostSlider.w = halfWidth - 20;
  drawSlider(controls.variableCostSlider, y);

  // Row 4: Demand parameters (two sliders)
  y = drawHeight + 115;

  // Base price slider
  text('Base Price: $' + basePrice.toFixed(0), 10, y + 10);
  drawSlider(controls.basePriceSlider, y);

  // Demand slope slider
  text('Demand Slope: ' + demandSlope.toFixed(2), varCostX - 110, y + 10);
  controls.demandSlopeSlider.x = varCostX;
  controls.demandSlopeSlider.w = halfWidth - 20;
  drawSlider(controls.demandSlopeSlider, y);

  // Legend in row 1
  drawLegend();
}

function drawLegend() {
  let x = controls.findMaxButton.x + controls.findMaxButton.w + 20;
  let y = drawHeight + 15;

  textSize(12);
  textAlign(LEFT, CENTER);

  // Revenue
  fill('#4CAF50');
  noStroke();
  rect(x, y, 15, 3);
  fill('#666');
  text('R(x)', x + 20, y + 2);

  // Cost
  x += 55;
  fill('#F44336');
  rect(x, y, 15, 3);
  fill('#666');
  text('C(x)', x + 20, y + 2);

  // Profit
  x += 55;
  fill('#2196F3');
  rect(x, y, 15, 3);
  fill('#666');
  text('P(x)', x + 20, y + 2);
}

function drawButton(x, y, w, h, label, col) {
  // Button background
  fill(col);
  stroke(col);
  strokeWeight(1);
  rect(x, y, w, h, 5);

  // Button text
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text(label, x + w/2, y + h/2);
}

function drawToggleButton(x, y, w, h, label, isOn, col) {
  // Button background
  if (isOn) {
    fill(col);
    stroke(col);
  } else {
    fill('#ccc');
    stroke('#999');
  }
  strokeWeight(1);
  rect(x, y, w, h, 5);

  // Button text
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text(label, x + w/2, y + h/2);
}

function drawSliderWithLabel(slider, label, value, decimals, suffix, y) {
  // Label and value
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text(label + ': ' + value.toFixed(decimals) + suffix, 10, y + 10);

  drawSlider(slider, y);
}

function drawSlider(slider, y) {
  slider.y = y;

  // Track
  fill('#ddd');
  noStroke();
  rect(slider.x, y + 5, slider.w, 10, 5);

  // Filled portion
  let fillW = map(slider.value, slider.min, slider.max, 0, slider.w);
  fill('#9C27B0');
  rect(slider.x, y + 5, fillW, 10, 5);

  // Handle
  let handleX = slider.x + fillW;
  fill('white');
  stroke('#9C27B0');
  strokeWeight(2);
  circle(handleX, y + 10, 18);
}

function updateControlPositions() {
  let halfWidth = (canvasWidth - sliderLeftMargin - margin - 20) / 2;

  controls.quantitySlider.x = sliderLeftMargin;
  controls.quantitySlider.w = canvasWidth - sliderLeftMargin - margin;

  controls.fixedCostSlider.x = sliderLeftMargin;
  controls.fixedCostSlider.w = halfWidth - 20;

  let varCostX = sliderLeftMargin + halfWidth + 30;
  controls.variableCostSlider.x = varCostX;
  controls.variableCostSlider.w = halfWidth - 20;

  controls.basePriceSlider.x = sliderLeftMargin;
  controls.basePriceSlider.w = halfWidth - 20;

  controls.demandSlopeSlider.x = varCostX;
  controls.demandSlopeSlider.w = halfWidth - 20;
}

function mousePressed() {
  let y = drawHeight + 10;

  // Check mode button
  if (isInsideRect(mouseX, mouseY, controls.modeButton.x, y, controls.modeButton.w, controls.modeButton.h)) {
    isExploreMode = !isExploreMode;
    if (!isExploreMode) {
      showProfit = false;  // Hide profit in challenge mode
      showMaxProfit = false;
    } else {
      showProfit = true;
    }
    return;
  }

  // Check show profit button
  if (isInsideRect(mouseX, mouseY, controls.showProfitButton.x, y, controls.showProfitButton.w, controls.showProfitButton.h)) {
    showProfit = !showProfit;
    return;
  }

  // Check find max button
  if (isInsideRect(mouseX, mouseY, controls.findMaxButton.x, y, controls.findMaxButton.w, controls.findMaxButton.h)) {
    showMaxProfit = true;
    quantity = maxProfitX;
    controls.quantitySlider.value = maxProfitX;
    return;
  }

  // Check sliders
  checkSliderPressed(controls.quantitySlider, drawHeight + 45);
  checkSliderPressed(controls.fixedCostSlider, drawHeight + 80);
  checkSliderPressed(controls.variableCostSlider, drawHeight + 80);
  checkSliderPressed(controls.basePriceSlider, drawHeight + 115);
  checkSliderPressed(controls.demandSlopeSlider, drawHeight + 115);
}

function checkSliderPressed(slider, y) {
  if (mouseY >= y && mouseY <= y + 25 &&
      mouseX >= slider.x - 10 && mouseX <= slider.x + slider.w + 10) {
    draggingSlider = slider;
    updateSliderValue(slider);
  }
}

function mouseDragged() {
  if (draggingSlider) {
    updateSliderValue(draggingSlider);
  }
}

function mouseReleased() {
  draggingSlider = null;
}

function updateSliderValue(slider) {
  let newValue = map(mouseX, slider.x, slider.x + slider.w, slider.min, slider.max);
  newValue = constrain(newValue, slider.min, slider.max);
  slider.value = newValue;

  // Update corresponding variable
  if (slider === controls.quantitySlider) {
    quantity = round(newValue);
    slider.value = quantity;
  } else if (slider === controls.fixedCostSlider) {
    fixedCost = round(newValue / 10) * 10;
    slider.value = fixedCost;
    calculateMaxProfit();
  } else if (slider === controls.variableCostSlider) {
    variableCost = round(newValue * 10) / 10;
    slider.value = variableCost;
    calculateMaxProfit();
  } else if (slider === controls.basePriceSlider) {
    basePrice = round(newValue);
    slider.value = basePrice;
    calculateMaxProfit();
  } else if (slider === controls.demandSlopeSlider) {
    demandSlope = round(newValue * 100) / 100;
    slider.value = demandSlope;
    calculateMaxProfit();
  }
}

function isInsideRect(px, py, x, y, w, h) {
  return px >= x && px <= x + w && py >= y && py <= y + h;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateControlPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
