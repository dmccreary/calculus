// Rate Interpretation Dashboard MicroSim
// Interpret derivative values in context by connecting numerical rates to physical meaning
// Bloom Level: Analyze (L4), Verb: interpret, analyze, connect
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let sliderLeftMargin = 80;
let defaultTextSize = 16;

// Graph dimensions within drawing area
let graphMargin = 50;
let graphLeft, graphRight, graphTop, graphBottom;
let graphWidth, graphHeight;

// Dashboard panel dimensions
let dashboardLeft, dashboardWidth;

// Context definitions with realistic functions and units
let contexts = [
  {
    name: 'Population Growth',
    functionLabel: 'P(t)',
    derivativeLabel: 'Growth Rate',
    xLabel: 'Time',
    yLabel: 'Population',
    xUnit: 'years',
    yUnit: 'thousands',
    derivativeUnit: 'thousand/year',
    color: [46, 125, 50],  // Green
    fn: (t) => 50 + 30 * Math.log(1 + t),  // Logarithmic growth
    fnPrime: (t) => 30 / (1 + t),
    xMin: 0,
    xMax: 10,
    yMin: 40,
    yMax: 130,
    interpretation: (rate, t) => {
      if (rate > 5) return `Population is growing rapidly at ${rate.toFixed(1)} thousand people per year`;
      if (rate > 2) return `Population is growing steadily at ${rate.toFixed(1)} thousand people per year`;
      if (rate > 0) return `Population growth is slowing: only ${rate.toFixed(1)} thousand per year`;
      return `Population is stable`;
    }
  },
  {
    name: 'Cooling Coffee',
    functionLabel: 'T(t)',
    derivativeLabel: 'Cooling Rate',
    xLabel: 'Time',
    yLabel: 'Temperature',
    xUnit: 'minutes',
    yUnit: 'F',
    derivativeUnit: 'F/min',
    color: [198, 40, 40],  // Deep red
    fn: (t) => 70 + 110 * Math.exp(-0.15 * t),  // Newton's law of cooling
    fnPrime: (t) => -16.5 * Math.exp(-0.15 * t),
    xMin: 0,
    xMax: 20,
    yMin: 60,
    yMax: 190,
    interpretation: (rate, t) => {
      if (rate < -10) return `Coffee cooling rapidly at ${Math.abs(rate).toFixed(1)} deg F per minute`;
      if (rate < -5) return `Coffee cooling moderately at ${Math.abs(rate).toFixed(1)} deg F per minute`;
      if (rate < -1) return `Coffee cooling slowly at ${Math.abs(rate).toFixed(1)} deg F per minute`;
      return `Coffee nearly at room temperature`;
    }
  },
  {
    name: 'Drug Concentration',
    functionLabel: 'C(t)',
    derivativeLabel: 'Absorption/Elimination Rate',
    xLabel: 'Time',
    yLabel: 'Concentration',
    xUnit: 'hours',
    yUnit: 'mg/L',
    derivativeUnit: 'mg/L per hour',
    color: [106, 27, 154],  // Purple
    fn: (t) => 100 * t * Math.exp(-0.5 * t),  // Drug kinetics curve
    fnPrime: (t) => 100 * Math.exp(-0.5 * t) * (1 - 0.5 * t),
    xMin: 0,
    xMax: 10,
    yMin: 0,
    yMax: 80,
    interpretation: (rate, t) => {
      if (rate > 10) return `Drug absorbing quickly: concentration rising ${rate.toFixed(1)} mg/L per hour`;
      if (rate > 0) return `Drug still absorbing: concentration rising ${rate.toFixed(1)} mg/L per hour`;
      if (rate > -5) return `Drug eliminating slowly at ${Math.abs(rate).toFixed(1)} mg/L per hour`;
      return `Drug eliminating rapidly at ${Math.abs(rate).toFixed(1)} mg/L per hour`;
    }
  },
  {
    name: 'Stock Price',
    functionLabel: 'S(t)',
    derivativeLabel: 'Price Velocity',
    xLabel: 'Time',
    yLabel: 'Price',
    xUnit: 'months',
    yUnit: '$',
    derivativeUnit: '$/month',
    color: [21, 101, 192],  // Blue
    fn: (t) => 100 + 20 * Math.sin(0.5 * t) + 5 * t,  // Oscillating with trend
    fnPrime: (t) => 10 * Math.cos(0.5 * t) + 5,
    xMin: 0,
    xMax: 15,
    yMin: 70,
    yMax: 200,
    interpretation: (rate, t) => {
      if (rate > 10) return `Stock price surging: +$${rate.toFixed(2)} per month`;
      if (rate > 0) return `Stock price rising: +$${rate.toFixed(2)} per month`;
      if (rate > -5) return `Stock price falling slowly: $${rate.toFixed(2)} per month`;
      return `Stock price dropping: $${rate.toFixed(2)} per month`;
    }
  }
];

let currentContextIndex = 0;
let currentContext;

// Time slider value
let currentTime = 2;

// Display toggles
let showTangent = true;
let showInterpretation = true;

// Animation for prediction
let isPredicting = false;
let predictionProgress = 0;
let predictionSpeed = 0.02;

// UI elements
let contextSelect;
let timeSlider;
let tangentToggle;
let interpretToggle;
let predictButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  currentContext = contexts[0];
  currentTime = (currentContext.xMin + currentContext.xMax) / 4;

  updateGraphBounds();

  // Context selector
  contextSelect = createSelect();
  contextSelect.position(10, drawHeight + 8);
  for (let i = 0; i < contexts.length; i++) {
    contextSelect.option(contexts[i].name, i);
  }
  contextSelect.changed(() => {
    currentContextIndex = parseInt(contextSelect.value());
    currentContext = contexts[currentContextIndex];
    currentTime = (currentContext.xMin + currentContext.xMax) / 4;
    timeSlider.elt.min = currentContext.xMin;
    timeSlider.elt.max = currentContext.xMax;
    timeSlider.value(currentTime);
    isPredicting = false;
  });

  // Time slider
  timeSlider = createSlider(currentContext.xMin, currentContext.xMax, currentTime, 0.1);
  timeSlider.position(sliderLeftMargin, drawHeight + 45);
  timeSlider.size(canvasWidth * 0.4 - sliderLeftMargin - 10);
  timeSlider.input(() => {
    currentTime = timeSlider.value();
    isPredicting = false;
  });

  // Tangent line toggle button
  tangentToggle = createButton('Tangent: ON');
  tangentToggle.position(canvasWidth * 0.42, drawHeight + 8);
  tangentToggle.mousePressed(() => {
    showTangent = !showTangent;
    tangentToggle.html(showTangent ? 'Tangent: ON' : 'Tangent: OFF');
  });

  // Interpretation toggle button
  interpretToggle = createButton('Interp: ON');
  interpretToggle.position(canvasWidth * 0.42 + 100, drawHeight + 8);
  interpretToggle.mousePressed(() => {
    showInterpretation = !showInterpretation;
    interpretToggle.html(showInterpretation ? 'Interp: ON' : 'Interp: OFF');
  });

  // Predict button
  predictButton = createButton('Predict Next');
  predictButton.position(canvasWidth * 0.42, drawHeight + 45);
  predictButton.mousePressed(() => {
    isPredicting = true;
    predictionProgress = 0;
  });

  describe('Interactive dashboard for interpreting derivative values across multiple real-world contexts including population growth, cooling coffee, drug concentration, and stock prices', LABEL);
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

  // Get current values
  let ctx = currentContext;
  let t = currentTime;
  let y = ctx.fn(t);
  let rate = ctx.fnPrime(t);

  // Draw title and subtitle
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Rate Interpretation Dashboard', canvasWidth / 2, 8);
  textSize(14);
  fill(ctx.color[0], ctx.color[1], ctx.color[2]);
  text(ctx.name + ': ' + ctx.functionLabel, canvasWidth / 2, 32);

  // Draw the graph panel (left side)
  drawGraphPanel(ctx, t, y, rate);

  // Draw the dashboard panel (right side)
  drawDashboardPanel(ctx, t, y, rate);

  // Handle prediction animation
  if (isPredicting) {
    predictionProgress += predictionSpeed;
    if (predictionProgress >= 1) {
      predictionProgress = 1;
      isPredicting = false;
    }
  }

  // Draw control labels
  drawControlLabels();
}

function updateGraphBounds() {
  // Graph takes left 55% of the canvas
  graphLeft = graphMargin + 20;
  graphRight = canvasWidth * 0.55 - 20;
  graphTop = 60;
  graphBottom = drawHeight - 30;
  graphWidth = graphRight - graphLeft;
  graphHeight = graphBottom - graphTop;

  // Dashboard takes right 45%
  dashboardLeft = canvasWidth * 0.55;
  dashboardWidth = canvasWidth - dashboardLeft - 15;
}

function drawGraphPanel(ctx, t, y, rate) {
  // Panel background
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(10, 55, graphRight - 5, drawHeight - 65, 8);

  // Draw axes and grid
  drawAxes(ctx);

  // Draw the function curve
  drawFunction(ctx);

  // Draw tangent line at current point
  if (showTangent) {
    drawTangentLine(ctx, t, y, rate);
  }

  // Draw current point
  let px = map(t, ctx.xMin, ctx.xMax, graphLeft, graphRight);
  let py = map(y, ctx.yMin, ctx.yMax, graphBottom, graphTop);

  // Point highlight
  fill(ctx.color[0], ctx.color[1], ctx.color[2]);
  noStroke();
  circle(px, py, 14);

  // Draw prediction visualization
  if (predictionProgress > 0) {
    drawPrediction(ctx, t, y, rate);
  }

  // Panel title
  fill(60);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('Function Graph with Tangent Line', (10 + graphRight - 5) / 2 + 15, 58);
}

function drawAxes(ctx) {
  stroke('#ddd');
  strokeWeight(1);

  // Vertical grid lines
  let xStep = (ctx.xMax - ctx.xMin) / 10;
  for (let x = ctx.xMin; x <= ctx.xMax; x += xStep) {
    let px = map(x, ctx.xMin, ctx.xMax, graphLeft, graphRight);
    if (px >= graphLeft && px <= graphRight) {
      line(px, graphTop, px, graphBottom);
    }
  }

  // Horizontal grid lines
  let yStep = (ctx.yMax - ctx.yMin) / 8;
  for (let y = ctx.yMin; y <= ctx.yMax; y += yStep) {
    let py = map(y, ctx.yMin, ctx.yMax, graphBottom, graphTop);
    if (py >= graphTop && py <= graphBottom) {
      line(graphLeft, py, graphRight, py);
    }
  }

  // Main axes
  stroke(100);
  strokeWeight(2);

  // X-axis (at y=0 if visible, else at bottom)
  let y0 = map(0, ctx.yMin, ctx.yMax, graphBottom, graphTop);
  if (y0 >= graphTop && y0 <= graphBottom) {
    line(graphLeft, y0, graphRight, y0);
  } else {
    line(graphLeft, graphBottom, graphRight, graphBottom);
  }

  // Y-axis (at x=0 if visible, else at left)
  let x0 = map(0, ctx.xMin, ctx.xMax, graphLeft, graphRight);
  if (x0 >= graphLeft && x0 <= graphRight) {
    line(x0, graphTop, x0, graphBottom);
  } else {
    line(graphLeft, graphTop, graphLeft, graphBottom);
  }

  // Axis labels
  fill(80);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);

  // X-axis labels
  for (let x = ctx.xMin; x <= ctx.xMax; x += xStep * 2) {
    let px = map(x, ctx.xMin, ctx.xMax, graphLeft, graphRight);
    if (px >= graphLeft && px <= graphRight) {
      text(x.toFixed(0), px, graphBottom + 3);
    }
  }

  // Y-axis labels
  textAlign(RIGHT, CENTER);
  for (let y = ctx.yMin; y <= ctx.yMax; y += yStep * 2) {
    let py = map(y, ctx.yMin, ctx.yMax, graphBottom, graphTop);
    if (py >= graphTop && py <= graphBottom) {
      text(y.toFixed(0), graphLeft - 5, py);
    }
  }

  // Axis titles
  textSize(11);
  textAlign(CENTER, TOP);
  text(ctx.xLabel + ' (' + ctx.xUnit + ')', (graphLeft + graphRight) / 2, graphBottom + 14);

  push();
  translate(graphLeft - 35, (graphTop + graphBottom) / 2);
  rotate(-PI / 2);
  textAlign(CENTER, BOTTOM);
  text(ctx.yLabel + ' (' + ctx.yUnit + ')', 0, 0);
  pop();
}

function drawFunction(ctx) {
  stroke(ctx.color[0], ctx.color[1], ctx.color[2]);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = graphLeft; px <= graphRight; px += 2) {
    let x = map(px, graphLeft, graphRight, ctx.xMin, ctx.xMax);
    let y = ctx.fn(x);
    let py = map(y, ctx.yMin, ctx.yMax, graphBottom, graphTop);
    if (py >= graphTop - 10 && py <= graphBottom + 10) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();
}

function drawTangentLine(ctx, t, y, rate) {
  // Calculate tangent line endpoints
  let tangentLength = (ctx.xMax - ctx.xMin) * 0.15;

  let x1 = t - tangentLength;
  let y1 = y + rate * (x1 - t);
  let x2 = t + tangentLength;
  let y2 = y + rate * (x2 - t);

  // Clamp to graph bounds
  x1 = max(ctx.xMin, x1);
  x2 = min(ctx.xMax, x2);
  y1 = y + rate * (x1 - t);
  y2 = y + rate * (x2 - t);

  let px1 = map(x1, ctx.xMin, ctx.xMax, graphLeft, graphRight);
  let py1 = map(y1, ctx.yMin, ctx.yMax, graphBottom, graphTop);
  let px2 = map(x2, ctx.xMin, ctx.xMax, graphLeft, graphRight);
  let py2 = map(y2, ctx.yMin, ctx.yMax, graphBottom, graphTop);

  stroke(255, 100, 50);
  strokeWeight(3);
  line(px1, py1, px2, py2);

  // Slope indicator arrow
  if (rate !== 0) {
    let arrowSize = 8;
    let angle = atan2(py2 - py1, px2 - px1);
    let arrowX = (px1 + px2) / 2 + 30;
    let arrowY = (py1 + py2) / 2;

    push();
    translate(arrowX, arrowY);
    rotate(angle);
    fill(255, 100, 50);
    noStroke();
    triangle(0, 0, -arrowSize * 1.5, -arrowSize / 2, -arrowSize * 1.5, arrowSize / 2);
    pop();
  }
}

function drawPrediction(ctx, t, y, rate) {
  // Linear approximation: y_next = y + rate * dt
  let dt = (ctx.xMax - ctx.xMin) * 0.08;
  let predictedY = y + rate * dt * predictionProgress;
  let predictedT = t + dt * predictionProgress;

  // Draw prediction path (dashed)
  stroke(100, 200, 100);
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);

  let px1 = map(t, ctx.xMin, ctx.xMax, graphLeft, graphRight);
  let py1 = map(y, ctx.yMin, ctx.yMax, graphBottom, graphTop);
  let px2 = map(predictedT, ctx.xMin, ctx.xMax, graphLeft, graphRight);
  let py2 = map(predictedY, ctx.yMin, ctx.yMax, graphBottom, graphTop);

  line(px1, py1, px2, py2);
  drawingContext.setLineDash([]);

  // Draw predicted point
  fill(100, 200, 100);
  noStroke();
  circle(px2, py2, 10);

  // Draw actual function value at predicted time
  if (predictionProgress >= 1) {
    let actualY = ctx.fn(t + dt);
    let pyActual = map(actualY, ctx.yMin, ctx.yMax, graphBottom, graphTop);

    // Error indicator
    stroke(255, 100, 100, 150);
    strokeWeight(2);
    drawingContext.setLineDash([3, 3]);
    line(px2, py2, px2, pyActual);
    drawingContext.setLineDash([]);

    fill(255, 100, 100);
    noStroke();
    circle(px2, pyActual, 8);

    // Labels
    textSize(10);
    fill(100, 200, 100);
    textAlign(LEFT, BOTTOM);
    text('Predicted', px2 + 5, py2 - 2);
    fill(255, 100, 100);
    textAlign(LEFT, TOP);
    text('Actual', px2 + 5, pyActual + 2);
  }
}

function drawDashboardPanel(ctx, t, y, rate) {
  let panelX = dashboardLeft;
  let panelY = 55;
  let panelW = dashboardWidth;
  let panelH = drawHeight - 65;

  // Panel background
  fill(255, 255, 255, 245);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  // Panel title
  fill(60);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('Rate Dashboard', panelX + panelW / 2, panelY + 5);

  let contentX = panelX + 15;
  let contentY = panelY + 28;
  let lineHeight = 22;

  // Current time display
  fill(80);
  textSize(13);
  textAlign(LEFT, TOP);
  text(ctx.xLabel + ':', contentX, contentY);
  fill(ctx.color[0], ctx.color[1], ctx.color[2]);
  textSize(18);
  text(t.toFixed(1) + ' ' + ctx.xUnit, contentX + 50, contentY - 2);
  contentY += lineHeight + 8;

  // Current value display
  fill(80);
  textSize(13);
  text(ctx.functionLabel + ':', contentX, contentY);
  fill(ctx.color[0], ctx.color[1], ctx.color[2]);
  textSize(18);
  text(y.toFixed(1) + ' ' + ctx.yUnit, contentX + 50, contentY - 2);
  contentY += lineHeight + 15;

  // Derivative value display with large prominent number
  fill(80);
  textSize(13);
  text('Rate of Change:', contentX, contentY);
  contentY += lineHeight;

  // Large derivative value
  fill(ctx.color[0], ctx.color[1], ctx.color[2]);
  textSize(32);
  textAlign(CENTER, TOP);
  text(rate.toFixed(2), panelX + panelW / 2, contentY);
  contentY += 38;

  // Units
  fill(100);
  textSize(14);
  text(ctx.derivativeUnit, panelX + panelW / 2, contentY);
  contentY += lineHeight + 10;

  // Direction indicator (arrow)
  drawDirectionIndicator(panelX + panelW / 2, contentY + 25, rate);
  contentY += 60;

  // Verbal interpretation
  if (showInterpretation) {
    fill(60);
    textSize(12);
    textAlign(LEFT, TOP);

    // Interpretation box
    let interpY = contentY;
    let interpH = 70;
    fill(240, 245, 250);
    stroke(200);
    strokeWeight(1);
    rect(contentX - 5, interpY, panelW - 25, interpH, 6);

    fill(60);
    noStroke();
    textSize(11);

    // Word wrap the interpretation
    let interpretation = ctx.interpretation(rate, t);
    let words = interpretation.split(' ');
    let line = '';
    let y = interpY + 10;
    let maxWidth = panelW - 40;

    for (let word of words) {
      let testLine = line + word + ' ';
      if (textWidth(testLine) > maxWidth && line !== '') {
        text(line.trim(), contentX, y);
        line = word + ' ';
        y += 16;
      } else {
        line = testLine;
      }
    }
    text(line.trim(), contentX, y);

    contentY = interpY + interpH + 10;
  }

  // Linear approximation preview
  if (predictionProgress >= 1) {
    let dt = (ctx.xMax - ctx.xMin) * 0.08;
    let predictedY = y + rate * dt;
    let actualY = ctx.fn(t + dt);
    let error = Math.abs(actualY - predictedY);

    fill(80);
    textSize(11);
    textAlign(LEFT, TOP);
    text('Linear Approximation:', contentX, contentY);
    contentY += 16;

    fill(100, 200, 100);
    textSize(10);
    text('Predicted: ' + predictedY.toFixed(2) + ' ' + ctx.yUnit, contentX, contentY);
    contentY += 14;

    fill(255, 100, 100);
    text('Actual: ' + actualY.toFixed(2) + ' ' + ctx.yUnit, contentX, contentY);
    contentY += 14;

    fill(80);
    text('Error: ' + error.toFixed(3) + ' ' + ctx.yUnit, contentX, contentY);
  }
}

function drawDirectionIndicator(cx, cy, rate) {
  let size = 40;

  // Background circle
  fill(240);
  stroke(200);
  strokeWeight(2);
  circle(cx, cy, size * 2);

  // Arrow based on rate sign
  noStroke();
  if (rate > 0.1) {
    // Increasing - up arrow (green)
    fill(76, 175, 80);
    push();
    translate(cx, cy);
    // Scale arrow based on rate magnitude
    let scale = min(1.5, 0.5 + Math.abs(rate) / 20);
    triangle(-size / 3 * scale, size / 4 * scale, size / 3 * scale, size / 4 * scale, 0, -size / 2 * scale);
    rect(-size / 8 * scale, -size / 4 * scale, size / 4 * scale, size / 2 * scale);
    pop();

    // Label
    fill(76, 175, 80);
    textSize(11);
    textAlign(CENTER, TOP);
    text('INCREASING', cx, cy + size + 5);
  } else if (rate < -0.1) {
    // Decreasing - down arrow (red)
    fill(244, 67, 54);
    push();
    translate(cx, cy);
    let scale = min(1.5, 0.5 + Math.abs(rate) / 20);
    triangle(-size / 3 * scale, -size / 4 * scale, size / 3 * scale, -size / 4 * scale, 0, size / 2 * scale);
    rect(-size / 8 * scale, -size / 4 * scale, size / 4 * scale, size / 2 * scale);
    pop();

    // Label
    fill(244, 67, 54);
    textSize(11);
    textAlign(CENTER, TOP);
    text('DECREASING', cx, cy + size + 5);
  } else {
    // Stable - horizontal line (gray)
    fill(158, 158, 158);
    rect(cx - size / 2, cy - size / 10, size, size / 5, 3);

    // Label
    fill(158, 158, 158);
    textSize(11);
    textAlign(CENTER, TOP);
    text('STABLE', cx, cy + size + 5);
  }
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);

  // Time slider label
  text('Time: ' + currentTime.toFixed(1), 10, drawHeight + 55);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateGraphBounds();

  // Reposition and resize controls
  timeSlider.size(canvasWidth * 0.4 - sliderLeftMargin - 10);
  tangentToggle.position(canvasWidth * 0.42, drawHeight + 8);
  interpretToggle.position(canvasWidth * 0.42 + 100, drawHeight + 8);
  predictButton.position(canvasWidth * 0.42, drawHeight + 45);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
