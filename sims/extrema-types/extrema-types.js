// Global vs Local Extrema Visualizer MicroSim
// Bloom Level: Analyze (L4), Verbs: classify, distinguish, compare
// Learning Objective: Students will classify extrema as global or local and
// understand how changing the interval affects which points are global extrema

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let chartTop = 50;
let defaultTextSize = 16;

// Chart dimensions
let chartLeft, chartRight, chartBottom;
let chartWidth, chartHeight;

// Coordinate ranges
let xMin = -3, xMax = 3;
let yMin = -3, yMax = 5;

// Interval being considered
let intervalA = -2.5;
let intervalB = 2.5;

// Current function
let currentFunction = 0;

// Function definitions with their extrema
const functions = [
  {
    name: 'Wavy Cubic',
    displayF: 'f(x) = x\u00B3 - 3x + 1',
    eval: (x) => x*x*x - 3*x + 1,
    criticalPoints: [-1, 1],  // Local max at x=-1, local min at x=1
    yRange: [-3, 5]
  },
  {
    name: 'Double Hump',
    displayF: 'f(x) = -x\u2074 + 4x\u00B2 - 1',
    eval: (x) => -Math.pow(x, 4) + 4*x*x - 1,
    criticalPoints: [-Math.sqrt(2), 0, Math.sqrt(2)],
    yRange: [-4, 4]
  },
  {
    name: 'Sine Wave',
    displayF: 'f(x) = 2sin(x)',
    eval: (x) => 2*Math.sin(x),
    criticalPoints: [-Math.PI/2, Math.PI/2],
    yRange: [-3, 3]
  }
];

// Toggle states
let showGlobalExtrema = true;
let showLocalExtrema = true;
let quizMode = false;
let quizFeedback = '';
let quizFeedbackTimer = 0;

// Hover state
let hoveredPoint = null;

// Dragging state for interval sliders
let draggingA = false;
let draggingB = false;

// Quiz tracking
let quizClicks = [];

// Control positions
let funcBtnX, funcBtnY, funcBtnW;
let toggleGlobalX, toggleLocalX, toggleY;
let sliderAX, sliderBX, sliderY, sliderW;
let quizBtnX, quizBtnY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();
  updateYRange();

  describe('Interactive visualization showing global and local extrema on a function graph. Different colored markers distinguish global maximum (gold star), local maximum (orange circle), global minimum (blue star), and local minimum (light blue circle). Students can adjust the interval to see how extrema classifications change.', LABEL);
}

function updateLayoutPositions() {
  chartLeft = margin + 50;
  chartRight = canvasWidth - margin - 20;
  chartBottom = drawHeight - 30;
  chartWidth = chartRight - chartLeft;
  chartHeight = chartBottom - chartTop;

  // Control row 1: Function buttons
  funcBtnX = 10;
  funcBtnY = drawHeight + 10;
  funcBtnW = 95;

  // Control row 1: Toggles (right side)
  toggleGlobalX = canvasWidth - 280;
  toggleLocalX = canvasWidth - 140;
  toggleY = drawHeight + 10;

  // Control row 2: Interval sliders
  sliderAX = 80;
  sliderBX = canvasWidth/2 + 40;
  sliderY = drawHeight + 55;
  sliderW = canvasWidth/2 - 100;

  // Control row 3: Quiz button
  quizBtnX = 10;
  quizBtnY = drawHeight + 95;
}

function updateYRange() {
  let func = functions[currentFunction];
  yMin = func.yRange[0];
  yMax = func.yRange[1];
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

  // Draw title
  drawTitle();

  // Draw legend
  drawLegend();

  // Draw chart
  drawChart();

  // Draw controls
  drawControls();

  // Update quiz feedback timer
  if (quizFeedbackTimer > 0) {
    quizFeedbackTimer--;
  }
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Global vs Local Extrema Visualizer', canvasWidth/2, 5);
  textSize(13);
  fill(80);
  text(functions[currentFunction].displayF + '  on  [' + intervalA.toFixed(1) + ', ' + intervalB.toFixed(1) + ']', canvasWidth/2, 26);
}

function drawLegend() {
  let legendX = chartRight - 170;
  let legendY = chartTop + 10;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(legendX, legendY, 165, 90, 6);

  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);

  // Global maximum - gold star
  fill(255, 215, 0);
  drawStar(legendX + 15, legendY + 15, 6, 3, 5);
  fill('black');
  text('Global Maximum', legendX + 30, legendY + 15);

  // Local maximum - orange circle
  fill(255, 165, 0);
  noStroke();
  circle(legendX + 15, legendY + 35, 12);
  fill('black');
  text('Local Maximum', legendX + 30, legendY + 35);

  // Global minimum - blue star
  fill(30, 144, 255);
  drawStar(legendX + 15, legendY + 55, 6, 3, 5);
  fill('black');
  text('Global Minimum', legendX + 30, legendY + 55);

  // Local minimum - light blue circle
  fill(135, 206, 250);
  noStroke();
  circle(legendX + 15, legendY + 75, 12);
  fill('black');
  text('Local Minimum', legendX + 30, legendY + 75);
}

function drawChart() {
  let func = functions[currentFunction];

  // Draw grid
  stroke(230);
  strokeWeight(1);

  // Vertical grid
  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    let px = map(x, xMin, xMax, chartLeft, chartRight);
    line(px, chartTop, px, chartBottom);
  }

  // Horizontal grid
  let yStep = (yMax - yMin) / 8;
  for (let i = 0; i <= 8; i++) {
    let y = yMin + i * yStep;
    let py = map(y, yMin, yMax, chartBottom, chartTop);
    line(chartLeft, py, chartRight, py);
  }

  // Draw axes
  stroke(100);
  strokeWeight(1);

  // X-axis
  let y0 = map(0, yMin, yMax, chartBottom, chartTop);
  if (y0 >= chartTop && y0 <= chartBottom) {
    line(chartLeft, y0, chartRight, y0);
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, chartLeft, chartRight);
  if (x0 >= chartLeft && x0 <= chartRight) {
    line(x0, chartTop, x0, chartBottom);
  }

  // Axis labels
  fill(60);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    let px = map(x, xMin, xMax, chartLeft, chartRight);
    text(x, px, chartBottom + 3);
  }

  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 8; i++) {
    let y = yMin + i * yStep;
    let py = map(y, yMin, yMax, chartBottom, chartTop);
    text(y.toFixed(1), chartLeft - 5, py);
  }

  // Draw interval boundaries
  let pxA = map(intervalA, xMin, xMax, chartLeft, chartRight);
  let pxB = map(intervalB, xMin, xMax, chartLeft, chartRight);

  // Shade outside interval
  fill(200, 200, 200, 100);
  noStroke();
  if (pxA > chartLeft) {
    rect(chartLeft, chartTop, pxA - chartLeft, chartHeight);
  }
  if (pxB < chartRight) {
    rect(pxB, chartTop, chartRight - pxB, chartHeight);
  }

  // Draw interval boundary lines
  stroke(100, 100, 200);
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  line(pxA, chartTop, pxA, chartBottom);
  line(pxB, chartTop, pxB, chartBottom);
  drawingContext.setLineDash([]);

  // Draw curve
  stroke(50, 100, 180);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let px = chartLeft; px <= chartRight; px += 2) {
    let x = map(px, chartLeft, chartRight, xMin, xMax);
    let y = func.eval(x);
    let py = map(y, yMin, yMax, chartBottom, chartTop);
    if (py >= chartTop - 20 && py <= chartBottom + 20) {
      vertex(px, constrain(py, chartTop, chartBottom));
    }
  }
  endShape();

  // Find and classify extrema within the interval
  let extrema = findExtrema(func);

  // Draw extrema markers (if not in quiz mode)
  if (!quizMode) {
    hoveredPoint = null;

    for (let ext of extrema) {
      let px = map(ext.x, xMin, xMax, chartLeft, chartRight);
      let py = map(ext.y, yMin, yMax, chartBottom, chartTop);

      // Check if mouse is hovering
      if (dist(mouseX, mouseY, px, py) < 15) {
        hoveredPoint = ext;
      }

      // Draw marker based on type
      if (ext.isGlobal && showGlobalExtrema) {
        if (ext.isMax) {
          // Gold star for global max
          fill(255, 215, 0);
          stroke(200, 170, 0);
          strokeWeight(2);
          drawStar(px, py, 12, 6, 5);
        } else {
          // Blue star for global min
          fill(30, 144, 255);
          stroke(0, 100, 200);
          strokeWeight(2);
          drawStar(px, py, 12, 6, 5);
        }
      } else if (!ext.isGlobal && showLocalExtrema) {
        if (ext.isMax) {
          // Orange circle for local max
          fill(255, 165, 0);
          stroke(200, 130, 0);
          strokeWeight(2);
          circle(px, py, 16);
        } else {
          // Light blue circle for local min
          fill(135, 206, 250);
          stroke(100, 150, 200);
          strokeWeight(2);
          circle(px, py, 16);
        }
      }

      // Draw dashed horizontal line for global extrema
      if (ext.isGlobal && showGlobalExtrema) {
        stroke(ext.isMax ? color(255, 215, 0, 150) : color(30, 144, 255, 150));
        strokeWeight(1);
        drawingContext.setLineDash([4, 4]);
        line(chartLeft, py, chartRight, py);
        drawingContext.setLineDash([]);
      }
    }

    // Draw hover tooltip
    if (hoveredPoint) {
      drawTooltip(hoveredPoint);
    }
  } else {
    // Quiz mode - draw user's clicks
    for (let click of quizClicks) {
      fill(click.correct ? color(0, 200, 0, 150) : color(255, 0, 0, 150));
      stroke(click.correct ? 'green' : 'red');
      strokeWeight(2);
      circle(click.px, click.py, 20);
    }

    // Draw quiz feedback
    if (quizFeedbackTimer > 0 && quizFeedback) {
      fill(quizFeedback.startsWith('Correct') ? color(0, 150, 0) : color(200, 0, 0));
      noStroke();
      textSize(14);
      textAlign(CENTER, TOP);
      text(quizFeedback, canvasWidth/2, chartBottom - 25);
    }
  }

  // Draw endpoint markers
  let endpointA = { x: intervalA, y: func.eval(intervalA) };
  let endpointB = { x: intervalB, y: func.eval(intervalB) };

  for (let ep of [endpointA, endpointB]) {
    let px = map(ep.x, xMin, xMax, chartLeft, chartRight);
    let py = map(ep.y, yMin, yMax, chartBottom, chartTop);

    if (py >= chartTop && py <= chartBottom) {
      // Check if endpoint is a global extremum
      let isGlobalMax = extrema.some(e => e.isGlobal && e.isMax && Math.abs(e.x - ep.x) < 0.01);
      let isGlobalMin = extrema.some(e => e.isGlobal && !e.isMax && Math.abs(e.x - ep.x) < 0.01);

      if (!isGlobalMax && !isGlobalMin && !quizMode) {
        // Regular endpoint marker
        fill(100, 100, 180);
        stroke(60, 60, 140);
        strokeWeight(2);
        circle(px, py, 10);
      }
    }
  }
}

function findExtrema(func) {
  let extrema = [];

  // Find values at critical points and endpoints within interval
  let pointsToCheck = [];

  // Add endpoints
  pointsToCheck.push({ x: intervalA, y: func.eval(intervalA), isEndpoint: true });
  pointsToCheck.push({ x: intervalB, y: func.eval(intervalB), isEndpoint: true });

  // Add critical points within interval
  for (let cp of func.criticalPoints) {
    if (cp > intervalA && cp < intervalB) {
      pointsToCheck.push({ x: cp, y: func.eval(cp), isEndpoint: false });
    }
  }

  // Find global max and min
  let globalMax = -Infinity;
  let globalMin = Infinity;

  for (let p of pointsToCheck) {
    if (p.y > globalMax) globalMax = p.y;
    if (p.y < globalMin) globalMin = p.y;
  }

  // Classify each point
  for (let p of pointsToCheck) {
    if (!p.isEndpoint) {
      // Determine if this is a local max or min by checking derivative sign change
      let isLocalMax = isLocalMaximum(func, p.x);
      let isLocalMin = isLocalMinimum(func, p.x);

      if (isLocalMax) {
        extrema.push({
          x: p.x,
          y: p.y,
          isMax: true,
          isGlobal: Math.abs(p.y - globalMax) < 0.01,
          isEndpoint: false
        });
      }
      if (isLocalMin) {
        extrema.push({
          x: p.x,
          y: p.y,
          isMax: false,
          isGlobal: Math.abs(p.y - globalMin) < 0.01,
          isEndpoint: false
        });
      }
    }
  }

  // Check if endpoints are global extrema
  let endpointA = { x: intervalA, y: func.eval(intervalA) };
  let endpointB = { x: intervalB, y: func.eval(intervalB) };

  if (Math.abs(endpointA.y - globalMax) < 0.01) {
    extrema.push({ x: endpointA.x, y: endpointA.y, isMax: true, isGlobal: true, isEndpoint: true });
  }
  if (Math.abs(endpointA.y - globalMin) < 0.01) {
    extrema.push({ x: endpointA.x, y: endpointA.y, isMax: false, isGlobal: true, isEndpoint: true });
  }
  if (Math.abs(endpointB.y - globalMax) < 0.01) {
    extrema.push({ x: endpointB.x, y: endpointB.y, isMax: true, isGlobal: true, isEndpoint: true });
  }
  if (Math.abs(endpointB.y - globalMin) < 0.01) {
    extrema.push({ x: endpointB.x, y: endpointB.y, isMax: false, isGlobal: true, isEndpoint: true });
  }

  return extrema;
}

function isLocalMaximum(func, x) {
  let delta = 0.01;
  let yLeft = func.eval(x - delta);
  let yCenter = func.eval(x);
  let yRight = func.eval(x + delta);
  return yCenter > yLeft && yCenter > yRight;
}

function isLocalMinimum(func, x) {
  let delta = 0.01;
  let yLeft = func.eval(x - delta);
  let yCenter = func.eval(x);
  let yRight = func.eval(x + delta);
  return yCenter < yLeft && yCenter < yRight;
}

function drawStar(cx, cy, outerR, innerR, points) {
  beginShape();
  for (let i = 0; i < points * 2; i++) {
    let angle = (i * PI / points) - PI/2;
    let r = (i % 2 === 0) ? outerR : innerR;
    vertex(cx + cos(angle) * r, cy + sin(angle) * r);
  }
  endShape(CLOSE);
}

function drawTooltip(point) {
  let px = map(point.x, xMin, xMax, chartLeft, chartRight);
  let py = map(point.y, yMin, yMax, chartBottom, chartTop);

  let classification = '';
  if (point.isGlobal) {
    classification = point.isMax ? 'Global Maximum' : 'Global Minimum';
  } else {
    classification = point.isMax ? 'Local Maximum' : 'Local Minimum';
  }

  let tooltipText = classification + '\n(' + point.x.toFixed(2) + ', ' + point.y.toFixed(2) + ')';

  // Position tooltip
  let tooltipW = 120;
  let tooltipH = 40;
  let tooltipX = px + 15;
  let tooltipY = py - tooltipH/2;

  // Adjust if near edge
  if (tooltipX + tooltipW > chartRight) {
    tooltipX = px - tooltipW - 15;
  }
  if (tooltipY < chartTop) {
    tooltipY = chartTop + 5;
  }
  if (tooltipY + tooltipH > chartBottom) {
    tooltipY = chartBottom - tooltipH - 5;
  }

  // Draw tooltip background
  fill(50, 50, 50, 220);
  noStroke();
  rect(tooltipX, tooltipY, tooltipW, tooltipH, 5);

  // Draw tooltip text
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(11);
  text(classification, tooltipX + tooltipW/2, tooltipY + 12);
  text('(' + point.x.toFixed(2) + ', ' + point.y.toFixed(2) + ')', tooltipX + tooltipW/2, tooltipY + 28);
}

function drawControls() {
  // Row 1: Function selector
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Function:', funcBtnX, funcBtnY + 14);

  for (let i = 0; i < 3; i++) {
    let bx = funcBtnX + 60 + i * (funcBtnW + 5);

    fill(currentFunction === i ? '#4CAF50' : '#e0e0e0');
    stroke(currentFunction === i ? '#388E3C' : '#bdbdbd');
    strokeWeight(1);
    rect(bx, funcBtnY, funcBtnW, 28, 5);

    fill(currentFunction === i ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(functions[i].name, bx + funcBtnW/2, funcBtnY + 14);
  }

  // Row 1: Toggle buttons (right side)
  drawToggleButton(toggleGlobalX, toggleY, 'Show Global', showGlobalExtrema, color(255, 215, 0));
  drawToggleButton(toggleLocalX, toggleY, 'Show Local', showLocalExtrema, color(255, 165, 0));

  // Row 2: Interval sliders
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Interval a: ' + intervalA.toFixed(1), 10, sliderY);

  // Slider track A
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderAX, sliderY - 5, sliderW, 10, 5);

  // Slider handle A
  let handleAX = map(intervalA, xMin, xMax, sliderAX, sliderAX + sliderW);
  fill(draggingA ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleAX, sliderY, 18);

  // Slider B
  text('Interval b: ' + intervalB.toFixed(1), sliderBX - 70, sliderY);

  // Slider track B
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderBX, sliderY - 5, sliderW, 10, 5);

  // Slider handle B
  let handleBX = map(intervalB, xMin, xMax, sliderBX, sliderBX + sliderW);
  fill(draggingB ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleBX, sliderY, 18);

  // Row 3: Quiz mode button
  fill(quizMode ? '#f44336' : '#2196F3');
  stroke(quizMode ? '#c62828' : '#1565C0');
  strokeWeight(1);
  rect(quizBtnX, quizBtnY, 110, 30, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(quizMode ? 'Exit Quiz' : 'Quiz Mode', quizBtnX + 55, quizBtnY + 15);

  // Quiz instructions or reset button
  if (quizMode) {
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Click where you think extrema are located!', quizBtnX + 120, quizBtnY + 15);

    // Reset quiz button
    fill('#FF9800');
    stroke('#F57C00');
    strokeWeight(1);
    rect(canvasWidth - 100, quizBtnY, 90, 30, 5);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    text('Clear Clicks', canvasWidth - 55, quizBtnY + 15);
  } else {
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Hover over markers to see classifications. Adjust the interval to see how extrema change!', quizBtnX + 120, quizBtnY + 15);
  }
}

function drawToggleButton(x, y, label, isOn, accentColor) {
  let btnW = 110;
  let btnH = 28;

  fill(isOn ? accentColor : '#e0e0e0');
  stroke(isOn ? lerpColor(accentColor, color(0), 0.2) : '#bdbdbd');
  strokeWeight(1);
  rect(x, y, btnW, btnH, 5);

  fill(isOn ? 'white' : '#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(label, x + btnW/2, y + btnH/2);
}

function mousePressed() {
  // Check function buttons
  for (let i = 0; i < 3; i++) {
    let bx = funcBtnX + 60 + i * (funcBtnW + 5);
    if (mouseX >= bx && mouseX <= bx + funcBtnW &&
        mouseY >= funcBtnY && mouseY <= funcBtnY + 28) {
      currentFunction = i;
      updateYRange();
      quizClicks = [];
      return;
    }
  }

  // Check toggle buttons
  if (mouseX >= toggleGlobalX && mouseX <= toggleGlobalX + 110 &&
      mouseY >= toggleY && mouseY <= toggleY + 28) {
    showGlobalExtrema = !showGlobalExtrema;
    return;
  }

  if (mouseX >= toggleLocalX && mouseX <= toggleLocalX + 110 &&
      mouseY >= toggleY && mouseY <= toggleY + 28) {
    showLocalExtrema = !showLocalExtrema;
    return;
  }

  // Check interval slider A
  let handleAX = map(intervalA, xMin, xMax, sliderAX, sliderAX + sliderW);
  if (dist(mouseX, mouseY, handleAX, sliderY) < 15) {
    draggingA = true;
    return;
  }
  if (mouseY > sliderY - 12 && mouseY < sliderY + 12 &&
      mouseX > sliderAX && mouseX < sliderAX + sliderW) {
    intervalA = map(mouseX, sliderAX, sliderAX + sliderW, xMin, xMax);
    intervalA = constrain(intervalA, xMin, intervalB - 0.5);
    draggingA = true;
    return;
  }

  // Check interval slider B
  let handleBX = map(intervalB, xMin, xMax, sliderBX, sliderBX + sliderW);
  if (dist(mouseX, mouseY, handleBX, sliderY) < 15) {
    draggingB = true;
    return;
  }
  if (mouseY > sliderY - 12 && mouseY < sliderY + 12 &&
      mouseX > sliderBX && mouseX < sliderBX + sliderW) {
    intervalB = map(mouseX, sliderBX, sliderBX + sliderW, xMin, xMax);
    intervalB = constrain(intervalB, intervalA + 0.5, xMax);
    draggingB = true;
    return;
  }

  // Check quiz button
  if (mouseX >= quizBtnX && mouseX <= quizBtnX + 110 &&
      mouseY >= quizBtnY && mouseY <= quizBtnY + 30) {
    quizMode = !quizMode;
    quizClicks = [];
    quizFeedback = '';
    quizFeedbackTimer = 0;
    return;
  }

  // Check clear clicks button (quiz mode)
  if (quizMode && mouseX >= canvasWidth - 100 && mouseX <= canvasWidth - 10 &&
      mouseY >= quizBtnY && mouseY <= quizBtnY + 30) {
    quizClicks = [];
    return;
  }

  // Handle quiz mode clicks on chart
  if (quizMode && mouseX >= chartLeft && mouseX <= chartRight &&
      mouseY >= chartTop && mouseY <= chartBottom) {
    handleQuizClick(mouseX, mouseY);
  }
}

function handleQuizClick(px, py) {
  let func = functions[currentFunction];
  let extrema = findExtrema(func);

  // Check if click is near any extremum
  let nearestExt = null;
  let nearestDist = Infinity;

  for (let ext of extrema) {
    let extPx = map(ext.x, xMin, xMax, chartLeft, chartRight);
    let extPy = map(ext.y, yMin, yMax, chartBottom, chartTop);
    let d = dist(px, py, extPx, extPy);

    if (d < nearestDist) {
      nearestDist = d;
      nearestExt = ext;
    }
  }

  let isCorrect = nearestDist < 25;

  quizClicks.push({
    px: px,
    py: py,
    correct: isCorrect
  });

  if (isCorrect) {
    let classification = nearestExt.isGlobal ?
      (nearestExt.isMax ? 'Global Maximum' : 'Global Minimum') :
      (nearestExt.isMax ? 'Local Maximum' : 'Local Minimum');
    quizFeedback = 'Correct! ' + classification + ' at (' + nearestExt.x.toFixed(2) + ', ' + nearestExt.y.toFixed(2) + ')';
  } else {
    quizFeedback = 'Not quite! Try clicking closer to a peak or valley on the curve.';
  }
  quizFeedbackTimer = 120; // Show for 2 seconds
}

function mouseDragged() {
  if (draggingA) {
    intervalA = map(mouseX, sliderAX, sliderAX + sliderW, xMin, xMax);
    intervalA = constrain(intervalA, xMin, intervalB - 0.5);
    intervalA = Math.round(intervalA * 10) / 10;
    quizClicks = [];
  }
  if (draggingB) {
    intervalB = map(mouseX, sliderBX, sliderBX + sliderW, xMin, xMax);
    intervalB = constrain(intervalB, intervalA + 0.5, xMax);
    intervalB = Math.round(intervalB * 10) / 10;
    quizClicks = [];
  }
}

function mouseReleased() {
  draggingA = false;
  draggingB = false;
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
