// Marginal Cost Analyzer MicroSim
// Calculate and interpret marginal cost as the derivative of the cost function
// Compares marginal cost (derivative) to actual cost differences
// Bloom Level: Apply (L3), Verb: calculate, interpret, compare
// Learning Objective: Students will calculate and interpret marginal cost as
// the derivative of the cost function, comparing it to actual cost differences

let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 55; // Room for title + subtitle
let defaultTextSize = 14;

// Graph region
let graphLeft = 60;
let graphRight;
let graphTop = chartTop + 20;
let graphBottom;
let graphWidth, graphHeight;

// Coordinate ranges
let xMin = 0, xMax = 50;
let yMin = 0, yMax = 2000;

// Current state
let currentX = 20; // Current production level
let currentModel = 0; // 0: Quadratic, 1: Linear, 2: Cubic

// Coefficients for cost models
// Quadratic: C(x) = a + bx + cx^2
let coefA = 100;  // Fixed cost
let coefB = 10;   // Linear coefficient
let coefC = 0.5;  // Quadratic coefficient
let coefD = 0;    // Cubic coefficient (only for cubic model)

// Model definitions
const models = [
  { name: 'Quadratic', formula: 'C(x) = a + bx + cx\u00B2', hasD: false },
  { name: 'Linear', formula: 'C(x) = a + bx', hasD: false },
  { name: 'Cubic', formula: 'C(x) = a + bx + cx\u00B2 + dx\u00B3', hasD: true }
];

// View mode: 0 = cost view, 1 = marginal cost view
let viewMode = 0;

// Control positions
let xSliderX, xSliderY, xSliderW;
let aSliderX, aSliderY, aSliderW;
let bSliderX, bSliderY, bSliderW;
let cSliderX, cSliderY, cSliderW;
let modelBtnX, modelBtnY;
let viewBtnX, viewBtnY;

// Dragging state
let isDraggingXSlider = false;
let isDraggingASlider = false;
let isDraggingBSlider = false;
let isDraggingCSlider = false;

// Bar chart dimensions
let barChartX, barChartY, barChartW, barChartH;

// Table dimensions
let tableX, tableY, tableW, tableH;

// Info panel dimensions
let infoPanelX, infoPanelY, infoPanelW, infoPanelH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();

  describe('Interactive visualization showing marginal cost as the derivative of a cost function. Compares marginal cost to actual cost differences with a graph, table, and bar chart comparison.', LABEL);
}

function updateLayoutPositions() {
  // Main graph region (left side)
  graphLeft = 60;
  graphRight = canvasWidth * 0.48;
  graphTop = chartTop + 25;
  graphBottom = drawHeight - 25;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;

  // Bar chart (top right)
  barChartX = canvasWidth * 0.52;
  barChartY = chartTop + 25;
  barChartW = canvasWidth * 0.22 - 15;
  barChartH = 140;

  // Table (middle right)
  tableX = canvasWidth * 0.52;
  tableY = barChartY + barChartH + 15;
  tableW = canvasWidth * 0.22 - 15;
  tableH = 150;

  // Info panel (right side)
  infoPanelX = canvasWidth * 0.75;
  infoPanelY = chartTop + 25;
  infoPanelW = canvasWidth * 0.25 - 25;
  infoPanelH = 290;

  // Control positions - Row 1: Production level and view toggle
  xSliderX = 120;
  xSliderY = drawHeight + 20;
  xSliderW = canvasWidth * 0.35;

  viewBtnX = canvasWidth * 0.55;
  viewBtnY = drawHeight + 8;

  modelBtnX = canvasWidth * 0.75;
  modelBtnY = drawHeight + 8;

  // Row 2: Coefficient sliders
  aSliderX = 70;
  aSliderY = drawHeight + 55;
  aSliderW = canvasWidth * 0.22;

  bSliderX = canvasWidth * 0.32;
  bSliderY = drawHeight + 55;
  bSliderW = canvasWidth * 0.18;

  cSliderX = canvasWidth * 0.55;
  cSliderY = drawHeight + 55;
  cSliderW = canvasWidth * 0.18;
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title and subtitle
  drawTitle();

  // Draw main graph
  if (viewMode === 0) {
    drawCostGraph();
  } else {
    drawMarginalCostGraph();
  }

  // Draw comparison bar chart
  drawBarChart();

  // Draw data table
  drawTable();

  // Draw business insights panel
  drawInfoPanel();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Marginal Cost Analyzer', canvasWidth / 2, 5);
  textSize(14);
  fill(100);
  text(models[currentModel].formula + '   |   Marginal Cost = C\'(x)', canvasWidth / 2, 28);
}

// Cost function C(x)
function costFunction(x) {
  if (currentModel === 1) {
    // Linear: C(x) = a + bx
    return coefA + coefB * x;
  } else if (currentModel === 2) {
    // Cubic: C(x) = a + bx + cx^2 + dx^3
    return coefA + coefB * x + coefC * x * x + coefD * x * x * x;
  } else {
    // Quadratic: C(x) = a + bx + cx^2
    return coefA + coefB * x + coefC * x * x;
  }
}

// Marginal cost C'(x)
function marginalCost(x) {
  if (currentModel === 1) {
    // Linear: C'(x) = b
    return coefB;
  } else if (currentModel === 2) {
    // Cubic: C'(x) = b + 2cx + 3dx^2
    return coefB + 2 * coefC * x + 3 * coefD * x * x;
  } else {
    // Quadratic: C'(x) = b + 2cx
    return coefB + 2 * coefC * x;
  }
}

// Second derivative C''(x) for concavity
function secondDerivative(x) {
  if (currentModel === 1) {
    return 0;
  } else if (currentModel === 2) {
    return 2 * coefC + 6 * coefD * x;
  } else {
    return 2 * coefC;
  }
}

// Actual cost of next unit: C(x+1) - C(x)
function actualNextUnitCost(x) {
  return costFunction(x + 1) - costFunction(x);
}

function drawCostGraph() {
  // Calculate y range based on current function
  let maxY = costFunction(xMax);
  yMax = Math.max(1000, Math.ceil(maxY / 500) * 500);

  // Panel label
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  fill(50, 100, 200);
  text('Cost Function C(x)', (graphLeft + graphRight) / 2, graphTop - 18);

  // Grid
  stroke(230);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = 0; i <= 50; i += 10) {
    let x = map(i, xMin, xMax, graphLeft, graphRight);
    line(x, graphTop, x, graphBottom);
  }

  // Horizontal grid lines
  for (let i = 0; i <= yMax; i += yMax / 5) {
    let y = map(i, yMin, yMax, graphBottom, graphTop);
    line(graphLeft, y, graphRight, y);
  }

  // Axes
  stroke(0);
  strokeWeight(2);
  line(graphLeft, graphBottom, graphRight, graphBottom); // X-axis
  line(graphLeft, graphTop, graphLeft, graphBottom); // Y-axis

  // Axis labels
  fill(0);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = 0; i <= 50; i += 10) {
    let x = map(i, xMin, xMax, graphLeft, graphRight);
    text(i, x, graphBottom + 5);
  }
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= yMax; i += yMax / 5) {
    let y = map(i, yMin, yMax, graphBottom, graphTop);
    text('$' + i.toFixed(0), graphLeft - 5, y);
  }

  // X-axis title
  textSize(12);
  textAlign(CENTER, TOP);
  fill(60);
  text('Units Produced (x)', (graphLeft + graphRight) / 2, graphBottom + 18);

  // Y-axis title
  push();
  translate(graphLeft - 45, (graphTop + graphBottom) / 2);
  rotate(-PI/2);
  textAlign(CENTER, BOTTOM);
  text('Total Cost ($)', 0, 0);
  pop();

  // Draw cost curve
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px++) {
    let x = map(px, graphLeft, graphRight, xMin, xMax);
    let y = costFunction(x);
    let py = map(y, yMin, yMax, graphBottom, graphTop);
    if (py >= graphTop - 10 && py <= graphBottom + 10) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();

  // Draw tangent line at current point
  let cx = costFunction(currentX);
  let mc = marginalCost(currentX);

  let px = map(currentX, xMin, xMax, graphLeft, graphRight);
  let py = map(cx, yMin, yMax, graphBottom, graphTop);

  if (py >= graphTop && py <= graphBottom) {
    // Calculate tangent line endpoints
    let tangentRange = 8;
    let x1 = currentX - tangentRange;
    let x2 = currentX + tangentRange;
    let y1 = cx + mc * (x1 - currentX);
    let y2 = cx + mc * (x2 - currentX);

    let px1 = map(x1, xMin, xMax, graphLeft, graphRight);
    let px2 = map(x2, xMin, xMax, graphLeft, graphRight);
    let py1 = map(y1, yMin, yMax, graphBottom, graphTop);
    let py2 = map(y2, yMin, yMax, graphBottom, graphTop);

    stroke(255, 100, 50);
    strokeWeight(3);
    line(px1, py1, px2, py2);

    // Draw the point
    fill(255, 100, 50);
    noStroke();
    circle(px, py, 14);

    // Label showing slope
    fill(180, 60, 0);
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text('slope = $' + mc.toFixed(2) + '/unit', px + 10, py - 5);
  }

  // Vertical dashed line at current x
  stroke(150);
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(px, graphTop, px, graphBottom);
  drawingContext.setLineDash([]);
}

function drawMarginalCostGraph() {
  // Calculate y range for marginal cost
  let minMC = Infinity, maxMC = -Infinity;
  for (let x = xMin; x <= xMax; x++) {
    let mc = marginalCost(x);
    if (mc < minMC) minMC = mc;
    if (mc > maxMC) maxMC = mc;
  }
  let mcYMin = Math.floor(minMC / 10) * 10 - 10;
  let mcYMax = Math.ceil(maxMC / 10) * 10 + 10;
  mcYMin = Math.max(0, mcYMin);

  // Panel label
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  fill(200, 100, 50);
  text('Marginal Cost C\'(x)', (graphLeft + graphRight) / 2, graphTop - 18);

  // Grid
  stroke(230);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = 0; i <= 50; i += 10) {
    let x = map(i, xMin, xMax, graphLeft, graphRight);
    line(x, graphTop, x, graphBottom);
  }

  // Horizontal grid lines
  let yStep = (mcYMax - mcYMin) / 5;
  for (let i = mcYMin; i <= mcYMax; i += yStep) {
    let y = map(i, mcYMin, mcYMax, graphBottom, graphTop);
    line(graphLeft, y, graphRight, y);
  }

  // Axes
  stroke(0);
  strokeWeight(2);
  line(graphLeft, graphBottom, graphRight, graphBottom);
  line(graphLeft, graphTop, graphLeft, graphBottom);

  // Axis labels
  fill(0);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = 0; i <= 50; i += 10) {
    let x = map(i, xMin, xMax, graphLeft, graphRight);
    text(i, x, graphBottom + 5);
  }
  textAlign(RIGHT, CENTER);
  for (let i = mcYMin; i <= mcYMax; i += yStep) {
    let y = map(i, mcYMin, mcYMax, graphBottom, graphTop);
    text('$' + i.toFixed(0), graphLeft - 5, y);
  }

  // Axis titles
  textSize(12);
  textAlign(CENTER, TOP);
  fill(60);
  text('Units Produced (x)', (graphLeft + graphRight) / 2, graphBottom + 18);

  push();
  translate(graphLeft - 45, (graphTop + graphBottom) / 2);
  rotate(-PI/2);
  textAlign(CENTER, BOTTOM);
  text('Marginal Cost ($/unit)', 0, 0);
  pop();

  // Draw marginal cost curve
  stroke(200, 100, 50);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px++) {
    let x = map(px, graphLeft, graphRight, xMin, xMax);
    let mc = marginalCost(x);
    let py = map(mc, mcYMin, mcYMax, graphBottom, graphTop);
    if (py >= graphTop - 10 && py <= graphBottom + 10) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();

  // Draw current point
  let mc = marginalCost(currentX);
  let px = map(currentX, xMin, xMax, graphLeft, graphRight);
  let py = map(mc, mcYMin, mcYMax, graphBottom, graphTop);

  if (py >= graphTop && py <= graphBottom) {
    // Horizontal dashed line to y-axis
    stroke(200, 100, 50, 150);
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    line(graphLeft, py, px, py);
    drawingContext.setLineDash([]);

    fill(200, 100, 50);
    noStroke();
    circle(px, py, 14);

    // Value label
    fill(180, 60, 0);
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text('C\'(' + currentX.toFixed(0) + ') = $' + mc.toFixed(2), px + 10, py - 5);
  }

  // Vertical dashed line at current x
  stroke(150);
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(px, graphTop, px, graphBottom);
  drawingContext.setLineDash([]);
}

function drawBarChart() {
  // Panel background
  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(barChartX, barChartY, barChartW, barChartH, 8);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Cost Comparison', barChartX + barChartW / 2, barChartY + 5);

  // Get values
  let mc = marginalCost(currentX);
  let actual = actualNextUnitCost(currentX);

  // Find max for scaling
  let maxVal = Math.max(mc, actual, 1);

  // Bar dimensions
  let barAreaTop = barChartY + 30;
  let barAreaBottom = barChartY + barChartH - 25;
  let barMaxHeight = barAreaBottom - barAreaTop;
  let barWidth = barChartW * 0.25;

  // Marginal cost bar
  let mcBarHeight = (mc / maxVal) * barMaxHeight;
  let mcBarX = barChartX + barChartW * 0.25 - barWidth / 2;

  fill(200, 100, 50);
  noStroke();
  rect(mcBarX, barAreaBottom - mcBarHeight, barWidth, mcBarHeight, 3, 3, 0, 0);

  // Actual cost bar
  let actualBarHeight = (actual / maxVal) * barMaxHeight;
  let actualBarX = barChartX + barChartW * 0.75 - barWidth / 2;

  fill(100, 150, 200);
  rect(actualBarX, barAreaBottom - actualBarHeight, barWidth, actualBarHeight, 3, 3, 0, 0);

  // Labels
  fill('black');
  textSize(10);
  textAlign(CENTER, TOP);
  text("C'(x)", mcBarX + barWidth / 2, barAreaBottom + 3);
  text('\u0394C', actualBarX + barWidth / 2, barAreaBottom + 3);

  // Values on top of bars
  textSize(9);
  textAlign(CENTER, BOTTOM);
  fill(180, 60, 0);
  text('$' + mc.toFixed(2), mcBarX + barWidth / 2, barAreaBottom - mcBarHeight - 2);
  fill(60, 100, 150);
  text('$' + actual.toFixed(2), actualBarX + barWidth / 2, barAreaBottom - actualBarHeight - 2);

  // Difference annotation
  let diff = Math.abs(mc - actual);
  fill(80);
  textSize(9);
  textAlign(CENTER, TOP);
  text('Diff: $' + diff.toFixed(2), barChartX + barChartW / 2, barAreaBottom + 15);
}

function drawTable() {
  // Panel background
  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(tableX, tableY, tableW, tableH, 8);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Data Table', tableX + tableW / 2, tableY + 5);

  // Column headers
  let rowHeight = 18;
  let col1 = tableX + 10;
  let col2 = tableX + tableW * 0.3;
  let col3 = tableX + tableW * 0.55;
  let col4 = tableX + tableW * 0.8;
  let headerY = tableY + 22;

  textSize(9);
  textAlign(LEFT, TOP);
  fill(80);
  text('x', col1, headerY);
  text('C(x)', col2, headerY);
  text("C'(x)", col3, headerY);
  text('\u0394C', col4, headerY);

  // Header line
  stroke(200);
  strokeWeight(1);
  line(tableX + 5, headerY + 14, tableX + tableW - 5, headerY + 14);
  noStroke();

  // Data rows - show values around current x
  let startX = Math.max(0, Math.floor(currentX) - 2);
  let dataY = headerY + 18;

  for (let i = 0; i < 6 && startX + i <= xMax; i++) {
    let x = startX + i;
    let cx = costFunction(x);
    let mc = marginalCost(x);
    let dc = actualNextUnitCost(x);

    // Highlight current row
    if (Math.abs(x - currentX) < 0.5) {
      fill(255, 240, 220);
      noStroke();
      rect(tableX + 3, dataY - 2, tableW - 6, rowHeight, 3);
    }

    fill(0);
    textSize(9);
    textAlign(LEFT, TOP);
    text(x, col1, dataY);
    text('$' + cx.toFixed(0), col2, dataY);
    fill(200, 100, 50);
    text('$' + mc.toFixed(2), col3, dataY);
    fill(100, 150, 200);
    text('$' + dc.toFixed(2), col4, dataY);

    dataY += rowHeight;
  }
}

function drawInfoPanel() {
  // Panel background
  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(infoPanelX, infoPanelY, infoPanelW, infoPanelH, 8);

  // Title
  fill(0, 100, 80);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Business Insights', infoPanelX + infoPanelW / 2, infoPanelY + 8);
  textStyle(NORMAL);

  let lineY = infoPanelY + 30;
  let lineHeight = 22;
  textAlign(LEFT, TOP);
  textSize(11);

  // Current production level
  fill(60);
  text('Production: x = ' + currentX.toFixed(0) + ' units', infoPanelX + 10, lineY);
  lineY += lineHeight;

  // Current total cost
  let cx = costFunction(currentX);
  text('Total Cost: $' + cx.toFixed(2), infoPanelX + 10, lineY);
  lineY += lineHeight;

  // Marginal cost
  let mc = marginalCost(currentX);
  fill(180, 60, 0);
  text('Marginal Cost: $' + mc.toFixed(2) + '/unit', infoPanelX + 10, lineY);
  lineY += lineHeight;

  // Actual next unit cost
  let actual = actualNextUnitCost(currentX);
  fill(60, 100, 150);
  text('Actual Next Unit: $' + actual.toFixed(2), infoPanelX + 10, lineY);
  lineY += lineHeight + 8;

  // Divider
  stroke(220);
  line(infoPanelX + 10, lineY, infoPanelX + infoPanelW - 10, lineY);
  noStroke();
  lineY += 10;

  // Marginal cost trend
  let sd = secondDerivative(currentX);
  fill(0, 100, 80);
  textSize(11);
  if (Math.abs(sd) < 0.001) {
    text('MC Trend: Constant', infoPanelX + 10, lineY);
  } else if (sd > 0) {
    text('MC Trend: Increasing', infoPanelX + 10, lineY);
    lineY += lineHeight - 4;
    textSize(9);
    fill(100);
    text('(diseconomies of scale)', infoPanelX + 10, lineY);
  } else {
    text('MC Trend: Decreasing', infoPanelX + 10, lineY);
    lineY += lineHeight - 4;
    textSize(9);
    fill(100);
    text('(economies of scale)', infoPanelX + 10, lineY);
  }
  lineY += lineHeight + 5;

  // Average cost
  let avgCost = cx / currentX;
  fill(60);
  textSize(11);
  text('Avg Cost: $' + avgCost.toFixed(2) + '/unit', infoPanelX + 10, lineY);
  lineY += lineHeight;

  // Interpretation hint
  fill(100);
  textSize(9);
  lineY += 5;
  if (mc < avgCost) {
    text('MC < Avg: Avg cost falling', infoPanelX + 10, lineY);
  } else if (mc > avgCost) {
    text('MC > Avg: Avg cost rising', infoPanelX + 10, lineY);
  } else {
    text('MC = Avg: Min avg cost!', infoPanelX + 10, lineY);
  }
}

function drawControls() {
  // Row 1: Production level slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Units: ' + currentX.toFixed(0), 10, xSliderY);

  // X slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(xSliderX, xSliderY - 5, xSliderW, 10, 5);

  // X slider handle
  let xHandleX = map(currentX, 1, 50, xSliderX, xSliderX + xSliderW);
  fill(isDraggingXSlider ? '#cc6600' : '#ff8800');
  noStroke();
  circle(xHandleX, xSliderY, 18);

  // View toggle button
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(12);
  text('View:', viewBtnX - 40, viewBtnY + 14);

  fill(viewMode === 0 ? '#4CAF50' : '#2196F3');
  stroke(viewMode === 0 ? '#388E3C' : '#1976D2');
  strokeWeight(1);
  rect(viewBtnX, viewBtnY, 90, 28, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(viewMode === 0 ? 'Cost C(x)' : "Marginal C'(x)", viewBtnX + 45, viewBtnY + 14);

  // Model selector button
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Model:', modelBtnX - 45, modelBtnY + 14);

  fill('#9c27b0');
  stroke('#7b1fa2');
  strokeWeight(1);
  rect(modelBtnX, modelBtnY, 100, 28, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(models[currentModel].name, modelBtnX + 50, modelBtnY + 14);

  // Row 2: Coefficient sliders
  // A slider (fixed cost)
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('a=' + coefA.toFixed(0), 10, aSliderY);

  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(aSliderX, aSliderY - 5, aSliderW, 10, 5);

  let aHandleX = map(coefA, 0, 500, aSliderX, aSliderX + aSliderW);
  fill(isDraggingASlider ? '#666699' : '#9999cc');
  noStroke();
  circle(aHandleX, aSliderY, 16);

  // B slider (linear coefficient)
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  text('b=' + coefB.toFixed(1), bSliderX - 50, bSliderY);

  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(bSliderX, bSliderY - 5, bSliderW, 10, 5);

  let bHandleX = map(coefB, 0, 50, bSliderX, bSliderX + bSliderW);
  fill(isDraggingBSlider ? '#669966' : '#99cc99');
  noStroke();
  circle(bHandleX, bSliderY, 16);

  // C slider (quadratic coefficient)
  if (currentModel !== 1) {
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    text('c=' + coefC.toFixed(2), cSliderX - 55, cSliderY);

    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(cSliderX, cSliderY - 5, cSliderW, 10, 5);

    let cHandleX = map(coefC, -1, 2, cSliderX, cSliderX + cSliderW);
    fill(isDraggingCSlider ? '#996666' : '#cc9999');
    noStroke();
    circle(cHandleX, cSliderY, 16);
  }

  // Row 3: Hint text
  fill(100);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text("Marginal cost C'(x) approximates the cost of producing one more unit", canvasWidth / 2, drawHeight + 95);
}

function mousePressed() {
  // Check X slider
  let xHandleX = map(currentX, 1, 50, xSliderX, xSliderX + xSliderW);
  if (dist(mouseX, mouseY, xHandleX, xSliderY) < 15 ||
      (mouseY > xSliderY - 15 && mouseY < xSliderY + 15 &&
       mouseX > xSliderX && mouseX < xSliderX + xSliderW)) {
    currentX = map(mouseX, xSliderX, xSliderX + xSliderW, 1, 50);
    currentX = constrain(currentX, 1, 50);
    currentX = Math.round(currentX);
    isDraggingXSlider = true;
    return;
  }

  // Check A slider
  let aHandleX = map(coefA, 0, 500, aSliderX, aSliderX + aSliderW);
  if (dist(mouseX, mouseY, aHandleX, aSliderY) < 15 ||
      (mouseY > aSliderY - 15 && mouseY < aSliderY + 15 &&
       mouseX > aSliderX && mouseX < aSliderX + aSliderW)) {
    coefA = map(mouseX, aSliderX, aSliderX + aSliderW, 0, 500);
    coefA = constrain(coefA, 0, 500);
    coefA = Math.round(coefA / 10) * 10;
    isDraggingASlider = true;
    return;
  }

  // Check B slider
  let bHandleX = map(coefB, 0, 50, bSliderX, bSliderX + bSliderW);
  if (dist(mouseX, mouseY, bHandleX, bSliderY) < 15 ||
      (mouseY > bSliderY - 15 && mouseY < bSliderY + 15 &&
       mouseX > bSliderX && mouseX < bSliderX + bSliderW)) {
    coefB = map(mouseX, bSliderX, bSliderX + bSliderW, 0, 50);
    coefB = constrain(coefB, 0, 50);
    coefB = Math.round(coefB * 2) / 2;
    isDraggingBSlider = true;
    return;
  }

  // Check C slider (if visible)
  if (currentModel !== 1) {
    let cHandleX = map(coefC, -1, 2, cSliderX, cSliderX + cSliderW);
    if (dist(mouseX, mouseY, cHandleX, cSliderY) < 15 ||
        (mouseY > cSliderY - 15 && mouseY < cSliderY + 15 &&
         mouseX > cSliderX && mouseX < cSliderX + cSliderW)) {
      coefC = map(mouseX, cSliderX, cSliderX + cSliderW, -1, 2);
      coefC = constrain(coefC, -1, 2);
      coefC = Math.round(coefC * 20) / 20;
      isDraggingCSlider = true;
      return;
    }
  }

  // Check view toggle button
  if (mouseX >= viewBtnX && mouseX <= viewBtnX + 90 &&
      mouseY >= viewBtnY && mouseY <= viewBtnY + 28) {
    viewMode = 1 - viewMode;
    return;
  }

  // Check model selector button
  if (mouseX >= modelBtnX && mouseX <= modelBtnX + 100 &&
      mouseY >= modelBtnY && mouseY <= modelBtnY + 28) {
    currentModel = (currentModel + 1) % 3;
    // Adjust coefficients for new model
    if (currentModel === 1) {
      // Linear model - simplify
      coefC = 0;
      coefD = 0;
    } else if (currentModel === 2) {
      // Cubic model - add small d coefficient
      coefD = 0.01;
    } else {
      coefD = 0;
    }
    return;
  }
}

function mouseDragged() {
  if (isDraggingXSlider) {
    currentX = map(mouseX, xSliderX, xSliderX + xSliderW, 1, 50);
    currentX = constrain(currentX, 1, 50);
    currentX = Math.round(currentX);
  }
  if (isDraggingASlider) {
    coefA = map(mouseX, aSliderX, aSliderX + aSliderW, 0, 500);
    coefA = constrain(coefA, 0, 500);
    coefA = Math.round(coefA / 10) * 10;
  }
  if (isDraggingBSlider) {
    coefB = map(mouseX, bSliderX, bSliderX + bSliderW, 0, 50);
    coefB = constrain(coefB, 0, 50);
    coefB = Math.round(coefB * 2) / 2;
  }
  if (isDraggingCSlider && currentModel !== 1) {
    coefC = map(mouseX, cSliderX, cSliderX + cSliderW, -1, 2);
    coefC = constrain(coefC, -1, 2);
    coefC = Math.round(coefC * 20) / 20;
  }
}

function mouseReleased() {
  isDraggingXSlider = false;
  isDraggingASlider = false;
  isDraggingBSlider = false;
  isDraggingCSlider = false;
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
