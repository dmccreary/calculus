// Marginal Analysis Calculator MicroSim
// Learning Objective: Students will calculate and interpret marginal cost, revenue, and profit
// for economic decision-making (Bloom Level 3: Apply)
// Bloom Verbs: calculate, interpret, apply
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 520;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let chartTop = 50;
let defaultTextSize = 16;

// Graph dimensions (three graphs stacked)
let graphHeight;
let graphMargin = 15;

// Current state
let productionLevel = 500;
let displayMode = 0; // 0: Show both, 1: Show marginals, 2: Show totals

// Cost function coefficients: C(x) = ax^2 + bx + c (quadratic)
let costA = 0.00005;
let costB = 0.02;
let costC = 500;

// Revenue function: R(x) = px - qx^2 (linear or quadratic)
let revenueP = 0.15;
let revenueQ = 0.00003;

// Slider state (canvas-based)
let sliderX, sliderY, sliderW;
let isDraggingSlider = false;
let sliderMin = 0;
let sliderMax = 1000;

// Coefficient sliders
let coeffSliders = [];
let isDraggingCoeffSlider = -1;

// Buttons
let modeButtonX, modeButtonY, modeButtonW, modeButtonH;
let findOptimalButtonX, findOptimalButtonY, findOptimalButtonW, findOptimalButtonH;

// Animation for find optimal
let isAnimating = false;
let animationTarget = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateControlPositions();

  describe('Marginal Analysis Calculator: Three stacked graphs showing Cost, Revenue, and Profit functions with tangent lines indicating marginal values. Interactive slider controls production level.', LABEL);
}

function updateControlPositions() {
  graphHeight = (drawHeight - chartTop - 40) / 3 - graphMargin;

  sliderX = 140;
  sliderY = drawHeight + 25;
  sliderW = Math.min(300, canvasWidth * 0.4);

  modeButtonX = sliderX + sliderW + 30;
  modeButtonY = drawHeight + 12;
  modeButtonW = 100;
  modeButtonH = 26;

  findOptimalButtonX = modeButtonX + modeButtonW + 15;
  findOptimalButtonY = drawHeight + 12;
  findOptimalButtonW = 130;
  findOptimalButtonH = 26;
}

function draw() {
  updateCanvasSize();

  // Animation update
  if (isAnimating) {
    let diff = animationTarget - productionLevel;
    if (Math.abs(diff) < 1) {
      productionLevel = animationTarget;
      isAnimating = false;
    } else {
      productionLevel += diff * 0.1;
    }
  }

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Marginal Analysis Calculator', canvasWidth / 2, 5);
  textSize(13);
  fill(80);
  text('C(x) = ' + formatCoeff(costA) + 'x^2 + ' + formatCoeff(costB) + 'x + ' + costC.toFixed(0) +
       '    R(x) = ' + formatCoeff(revenueP) + 'x - ' + formatCoeff(revenueQ) + 'x^2', canvasWidth / 2, 28);

  // Draw the three graphs
  drawCostGraph();
  drawRevenueGraph();
  drawProfitGraph();

  // Draw info panel
  drawInfoPanel();

  // Draw controls
  drawControls();
}

function formatCoeff(val) {
  if (val >= 0.01) return val.toFixed(2);
  if (val >= 0.001) return val.toFixed(3);
  return val.toFixed(5);
}

// Cost function and its derivative
function C(x) {
  return costA * x * x + costB * x + costC;
}

function MC(x) {
  return 2 * costA * x + costB;
}

// Revenue function and its derivative
function R(x) {
  return revenueP * x - revenueQ * x * x;
}

function MR(x) {
  return revenueP - 2 * revenueQ * x;
}

// Profit function and its derivative
function P(x) {
  return R(x) - C(x);
}

function MP(x) {
  return MR(x) - MC(x);
}

// Find optimal production (where MC = MR)
function findOptimalProduction() {
  // MC = MR
  // 2*costA*x + costB = revenueP - 2*revenueQ*x
  // 2*costA*x + 2*revenueQ*x = revenueP - costB
  // x = (revenueP - costB) / (2*costA + 2*revenueQ)
  let denominator = 2 * costA + 2 * revenueQ;
  if (Math.abs(denominator) < 0.0000001) return 500;
  let optX = (revenueP - costB) / denominator;
  return constrain(optX, 0, 1000);
}

// Find break-even points (where P(x) = 0, i.e., R(x) = C(x))
function findBreakEvenPoints() {
  // R(x) = C(x)
  // revenueP*x - revenueQ*x^2 = costA*x^2 + costB*x + costC
  // -revenueQ*x^2 - costA*x^2 + revenueP*x - costB*x - costC = 0
  // -(revenueQ + costA)*x^2 + (revenueP - costB)*x - costC = 0
  let a = -(revenueQ + costA);
  let b = revenueP - costB;
  let c = -costC;

  let discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return [];

  let sqrtD = Math.sqrt(discriminant);
  let x1 = (-b + sqrtD) / (2 * a);
  let x2 = (-b - sqrtD) / (2 * a);

  let results = [];
  if (x1 >= 0 && x1 <= 1000) results.push(x1);
  if (x2 >= 0 && x2 <= 1000 && Math.abs(x2 - x1) > 0.01) results.push(x2);

  return results.sort((a, b) => a - b);
}

function drawCostGraph() {
  let graphY = chartTop;
  let graphBottom = graphY + graphHeight;
  let graphLeft = margin;
  let graphRight = canvasWidth - 180;

  // Graph background
  fill(255, 252, 250);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft, graphY, graphRight - graphLeft, graphHeight, 4);

  // Graph label
  fill(150, 80, 50);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Cost C(x)', graphLeft + 5, graphY + 3);

  // Calculate scale
  let xScale = (graphRight - graphLeft) / sliderMax;
  let maxC = C(sliderMax);
  let yScale = (graphHeight - 20) / maxC;

  // Draw cost function
  if (displayMode !== 1) {
    stroke(200, 100, 50);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let px = graphLeft; px <= graphRight; px += 2) {
      let x = (px - graphLeft) / xScale;
      let y = C(x);
      let py = graphBottom - 10 - y * yScale;
      if (py >= graphY && py <= graphBottom) {
        vertex(px, py);
      }
    }
    endShape();
  }

  // Draw tangent line at current production level
  if (displayMode !== 2) {
    let x0 = productionLevel;
    let y0 = C(x0);
    let slope = MC(x0);

    let px0 = graphLeft + x0 * xScale;
    let py0 = graphBottom - 10 - y0 * yScale;

    // Draw tangent line
    stroke(220, 50, 50);
    strokeWeight(2);
    let lineLen = 80;
    let dx = lineLen / 2;
    let dy = slope * (dx / xScale) * yScale;
    line(px0 - dx, py0 + dy, px0 + dx, py0 - dy);

    // Draw point
    fill(220, 50, 50);
    noStroke();
    circle(px0, py0, 10);
  }
}

function drawRevenueGraph() {
  let graphY = chartTop + graphHeight + graphMargin;
  let graphBottom = graphY + graphHeight;
  let graphLeft = margin;
  let graphRight = canvasWidth - 180;

  // Graph background
  fill(250, 255, 252);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft, graphY, graphRight - graphLeft, graphHeight, 4);

  // Graph label
  fill(50, 150, 80);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Revenue R(x)', graphLeft + 5, graphY + 3);

  // Calculate scale
  let xScale = (graphRight - graphLeft) / sliderMax;
  let maxR = 0;
  for (let x = 0; x <= sliderMax; x += 10) {
    maxR = Math.max(maxR, R(x));
  }
  maxR = Math.max(maxR, 10);
  let yScale = (graphHeight - 20) / maxR;

  // Draw revenue function
  if (displayMode !== 1) {
    stroke(50, 180, 100);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let px = graphLeft; px <= graphRight; px += 2) {
      let x = (px - graphLeft) / xScale;
      let y = R(x);
      let py = graphBottom - 10 - y * yScale;
      if (py >= graphY && py <= graphBottom) {
        vertex(px, py);
      }
    }
    endShape();
  }

  // Draw tangent line at current production level
  if (displayMode !== 2) {
    let x0 = productionLevel;
    let y0 = R(x0);
    let slope = MR(x0);

    let px0 = graphLeft + x0 * xScale;
    let py0 = graphBottom - 10 - y0 * yScale;
    py0 = constrain(py0, graphY, graphBottom);

    // Draw tangent line
    stroke(0, 150, 80);
    strokeWeight(2);
    let lineLen = 80;
    let dx = lineLen / 2;
    let dy = slope * (dx / xScale) * yScale;
    line(px0 - dx, py0 + dy, px0 + dx, py0 - dy);

    // Draw point
    fill(0, 150, 80);
    noStroke();
    circle(px0, py0, 10);
  }
}

function drawProfitGraph() {
  let graphY = chartTop + 2 * (graphHeight + graphMargin);
  let graphBottom = graphY + graphHeight;
  let graphLeft = margin;
  let graphRight = canvasWidth - 180;

  // Graph background
  fill(252, 250, 255);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft, graphY, graphRight - graphLeft, graphHeight, 4);

  // Graph label
  fill(100, 50, 150);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Profit P(x) = R(x) - C(x)', graphLeft + 5, graphY + 3);

  // Calculate scale - need to handle negative profits
  let xScale = (graphRight - graphLeft) / sliderMax;
  let minP = 0, maxP = 0;
  for (let x = 0; x <= sliderMax; x += 10) {
    let p = P(x);
    minP = Math.min(minP, p);
    maxP = Math.max(maxP, p);
  }
  let range = Math.max(maxP - minP, 10);
  let yScale = (graphHeight - 25) / range;
  let zeroY = graphBottom - 12 - (-minP) * yScale;

  // Draw zero line
  if (zeroY >= graphY + 15 && zeroY <= graphBottom - 5) {
    stroke(150);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(graphLeft, zeroY, graphRight, zeroY);
    drawingContext.setLineDash([]);

    fill(100);
    noStroke();
    textSize(9);
    textAlign(RIGHT, CENTER);
    text('0', graphLeft - 3, zeroY);
  }

  // Draw profit zone (where P > 0) as shaded region
  let breakEvenPts = findBreakEvenPoints();
  if (displayMode !== 1 && breakEvenPts.length === 2) {
    fill(100, 200, 100, 40);
    noStroke();
    beginShape();
    for (let x = breakEvenPts[0]; x <= breakEvenPts[1]; x += 5) {
      let px = graphLeft + x * xScale;
      let py = zeroY - P(x) * yScale;
      py = constrain(py, graphY + 15, graphBottom - 5);
      vertex(px, py);
    }
    // Close along zero line
    vertex(graphLeft + breakEvenPts[1] * xScale, zeroY);
    vertex(graphLeft + breakEvenPts[0] * xScale, zeroY);
    endShape(CLOSE);
  }

  // Draw profit function
  if (displayMode !== 1) {
    noFill();
    strokeWeight(2);
    beginShape();
    for (let px = graphLeft; px <= graphRight; px += 2) {
      let x = (px - graphLeft) / xScale;
      let p = P(x);
      let py = zeroY - p * yScale;

      // Color based on profit/loss
      if (p >= 0) {
        stroke(100, 180, 100);
      } else {
        stroke(200, 100, 100);
      }

      if (py >= graphY + 10 && py <= graphBottom) {
        vertex(px, py);
      }
    }
    endShape();
  }

  // Mark optimal point
  let optX = findOptimalProduction();
  let optPx = graphLeft + optX * xScale;
  let optPy = zeroY - P(optX) * yScale;
  optPy = constrain(optPy, graphY + 15, graphBottom - 5);

  // Vertical line at optimal
  stroke(150, 100, 200);
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(optPx, graphY + 15, optPx, graphBottom - 5);
  drawingContext.setLineDash([]);

  // Star marker at optimal
  fill(200, 150, 50);
  stroke(150, 100, 0);
  strokeWeight(1);
  drawStar(optPx, optPy, 6, 12, 5);

  // Mark break-even points
  for (let bep of breakEvenPts) {
    let bepPx = graphLeft + bep * xScale;
    fill(100);
    stroke(50);
    strokeWeight(1);
    circle(bepPx, zeroY, 8);
  }

  // Draw tangent line at current production level
  if (displayMode !== 2) {
    let x0 = productionLevel;
    let y0 = P(x0);
    let slope = MP(x0);

    let px0 = graphLeft + x0 * xScale;
    let py0 = zeroY - y0 * yScale;
    py0 = constrain(py0, graphY + 15, graphBottom - 5);

    // Draw tangent line
    stroke(150, 50, 200);
    strokeWeight(2);
    let lineLen = 80;
    let dx = lineLen / 2;
    let dy = slope * (dx / xScale) * yScale;
    line(px0 - dx, py0 + dy, px0 + dx, py0 - dy);

    // Draw point
    fill(150, 50, 200);
    noStroke();
    circle(px0, py0, 10);
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI/2; a < TWO_PI - PI/2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawInfoPanel() {
  let panelX = canvasWidth - 170;
  let panelY = chartTop;
  let panelW = 165;
  let panelH = drawHeight - chartTop - 10;

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

  // Current production level
  fill(50);
  textSize(11);
  text('Production: x = ' + productionLevel.toFixed(0), panelX + 8, yPos);
  yPos += lineHeight + 5;

  // Divider
  stroke(220);
  line(panelX + 8, yPos, panelX + panelW - 8, yPos);
  noStroke();
  yPos += 8;

  // Marginal values
  fill(80);
  textSize(10);
  text('Marginal Values (slopes):', panelX + 8, yPos);
  yPos += lineHeight;

  let mc = MC(productionLevel);
  let mr = MR(productionLevel);
  let mp = MP(productionLevel);

  // MC
  fill(220, 50, 50);
  textSize(11);
  text('MC = $' + mc.toFixed(4) + '/unit', panelX + 8, yPos);
  yPos += lineHeight;

  // MR
  fill(0, 150, 80);
  text('MR = $' + mr.toFixed(4) + '/unit', panelX + 8, yPos);
  yPos += lineHeight;

  // MP
  fill(150, 50, 200);
  text('MP = $' + mp.toFixed(4) + '/unit', panelX + 8, yPos);
  yPos += lineHeight + 5;

  // Decision indicator
  fill(50);
  textSize(10);
  if (Math.abs(mr - mc) < 0.001) {
    fill(255, 200, 0);
    stroke(200, 150, 0);
    strokeWeight(1);
    rect(panelX + 8, yPos, panelW - 16, 22, 4);
    fill(80);
    noStroke();
    textAlign(CENTER, CENTER);
    text('MC = MR: Optimal!', panelX + panelW/2, yPos + 11);
    textAlign(LEFT, TOP);
  } else if (mr > mc) {
    fill(200, 255, 200);
    stroke(150, 200, 150);
    strokeWeight(1);
    rect(panelX + 8, yPos, panelW - 16, 22, 4);
    fill(50, 120, 50);
    noStroke();
    textAlign(CENTER, CENTER);
    text('MR > MC: Produce more', panelX + panelW/2, yPos + 11);
    textAlign(LEFT, TOP);
  } else {
    fill(255, 200, 200);
    stroke(200, 150, 150);
    strokeWeight(1);
    rect(panelX + 8, yPos, panelW - 16, 22, 4);
    fill(120, 50, 50);
    noStroke();
    textAlign(CENTER, CENTER);
    text('MR < MC: Produce less', panelX + panelW/2, yPos + 11);
    textAlign(LEFT, TOP);
  }
  yPos += 32;

  // Divider
  stroke(220);
  line(panelX + 8, yPos, panelX + panelW - 8, yPos);
  noStroke();
  yPos += 8;

  // Total values
  fill(80);
  textSize(10);
  text('Total Values:', panelX + 8, yPos);
  yPos += lineHeight;

  let c = C(productionLevel);
  let r = R(productionLevel);
  let p = P(productionLevel);

  fill(200, 100, 50);
  textSize(11);
  text('C(x) = $' + c.toFixed(2), panelX + 8, yPos);
  yPos += lineHeight;

  fill(50, 180, 100);
  text('R(x) = $' + r.toFixed(2), panelX + 8, yPos);
  yPos += lineHeight;

  fill(p >= 0 ? [100, 180, 100] : [200, 100, 100]);
  text('P(x) = $' + p.toFixed(2), panelX + 8, yPos);
  yPos += lineHeight + 8;

  // Divider
  stroke(220);
  line(panelX + 8, yPos, panelX + panelW - 8, yPos);
  noStroke();
  yPos += 8;

  // Key points
  fill(80);
  textSize(10);
  text('Key Points:', panelX + 8, yPos);
  yPos += lineHeight;

  // Optimal production
  let optX = findOptimalProduction();
  fill(200, 150, 50);
  textSize(10);
  text('Optimal: x = ' + optX.toFixed(0), panelX + 8, yPos);
  yPos += lineHeight - 2;
  fill(100);
  text('  Max profit = $' + P(optX).toFixed(2), panelX + 8, yPos);
  yPos += lineHeight;

  // Break-even points
  let breakEvenPts = findBreakEvenPoints();
  fill(100);
  textSize(10);
  if (breakEvenPts.length === 0) {
    text('No break-even (loss)', panelX + 8, yPos);
  } else if (breakEvenPts.length === 1) {
    text('Break-even: x = ' + breakEvenPts[0].toFixed(0), panelX + 8, yPos);
  } else {
    text('Break-even: x = ' + breakEvenPts[0].toFixed(0) + ', ' + breakEvenPts[1].toFixed(0), panelX + 8, yPos);
  }
}

function drawControls() {
  // Production slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Production: ' + productionLevel.toFixed(0), 10, sliderY);

  // Draw slider track
  let sliderHandleX = map(productionLevel, sliderMin, sliderMax, sliderX, sliderX + sliderW);
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 5, sliderW, 10, 5);

  // Draw slider handle
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(sliderHandleX, sliderY, 20);

  // Slider range labels
  fill(100);
  textSize(10);
  textAlign(LEFT, TOP);
  text('0', sliderX, sliderY + 12);
  textAlign(RIGHT, TOP);
  text('1000', sliderX + sliderW, sliderY + 12);

  // Display mode button
  let modeLabels = ['Show Both', 'Marginals', 'Totals'];
  fill(displayMode === 0 ? '#4CAF50' : (displayMode === 1 ? '#2196F3' : '#FF9800'));
  stroke(displayMode === 0 ? '#388E3C' : (displayMode === 1 ? '#1976D2' : '#F57C00'));
  strokeWeight(1);
  rect(modeButtonX, modeButtonY, modeButtonW, modeButtonH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(modeLabels[displayMode], modeButtonX + modeButtonW / 2, modeButtonY + modeButtonH / 2);

  // Find optimal button
  fill('#9C27B0');
  stroke('#7B1FA2');
  strokeWeight(1);
  rect(findOptimalButtonX, findOptimalButtonY, findOptimalButtonW, findOptimalButtonH, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Find Optimal', findOptimalButtonX + findOptimalButtonW / 2, findOptimalButtonY + findOptimalButtonH / 2);

  // Coefficient controls - second row
  let coeffY = drawHeight + 55;
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Cost: a=' + formatCoeff(costA) + '  b=' + formatCoeff(costB) + '  c=' + costC.toFixed(0), 10, coeffY);
  text('Revenue: p=' + formatCoeff(revenueP) + '  q=' + formatCoeff(revenueQ), 10, coeffY + 18);

  // Help text
  fill(120);
  textSize(9);
  textAlign(RIGHT, CENTER);
  text('Hint: MC = MR at optimal production', canvasWidth - 10, coeffY + 9);
}

function mousePressed() {
  // Check production slider
  let sliderHandleX = map(productionLevel, sliderMin, sliderMax, sliderX, sliderX + sliderW);
  if (dist(mouseX, mouseY, sliderHandleX, sliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check if clicked on slider track
  if (mouseY >= sliderY - 12 && mouseY <= sliderY + 12 &&
      mouseX >= sliderX && mouseX <= sliderX + sliderW) {
    isDraggingSlider = true;
    productionLevel = map(mouseX, sliderX, sliderX + sliderW, sliderMin, sliderMax);
    productionLevel = constrain(productionLevel, sliderMin, sliderMax);
    productionLevel = Math.round(productionLevel);
    return;
  }

  // Check display mode button
  if (mouseX >= modeButtonX && mouseX <= modeButtonX + modeButtonW &&
      mouseY >= modeButtonY && mouseY <= modeButtonY + modeButtonH) {
    displayMode = (displayMode + 1) % 3;
    return;
  }

  // Check find optimal button
  if (mouseX >= findOptimalButtonX && mouseX <= findOptimalButtonX + findOptimalButtonW &&
      mouseY >= findOptimalButtonY && mouseY <= findOptimalButtonY + findOptimalButtonH) {
    animationTarget = findOptimalProduction();
    isAnimating = true;
    return;
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    productionLevel = map(mouseX, sliderX, sliderX + sliderW, sliderMin, sliderMax);
    productionLevel = constrain(productionLevel, sliderMin, sliderMax);
    productionLevel = Math.round(productionLevel);
  }
}

function mouseReleased() {
  isDraggingSlider = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateControlPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.max(500, Math.floor(container.width));
  updateControlPositions();
}
