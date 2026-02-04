// Three Connected Graphs Explorer MicroSim
// Shows f(x), f'(x), and f''(x) in three stacked panels with synchronized cursor
// Bloom Level: Analyze (L4), Verb: Examine
// Learning Objective: Students will examine the relationships between f, f', and f''
// by interacting with all three graphs simultaneously, tracing how features on one
// graph correspond to features on the others.

let canvasWidth = 700;
let drawHeight = 560;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 50;
let defaultTextSize = 16;

// Panel dimensions
let panelHeight;
let panelGap = 10;
let panelLeft, panelRight;

// Coordinate ranges
let xMin = -3.5, xMax = 3.5;
let yMinF, yMaxF;    // Adjusted per function
let yMinFp, yMaxFp;  // for f'(x)
let yMinFpp, yMaxFpp; // for f''(x)

// Current state
let currentX = 0.5;
let currentFunction = 0; // 0=cubic, 1=quartic, 2=sine, 3=rational
let showF = true;
let showFp = true;
let showFpp = true;
let isAnimating = false;
let animationPhase = 0;

// Function definitions with display info and ranges
const functions = [
  {
    name: 'Cubic',
    displayF: 'f(x) = x\u00B3 - 3x',
    displayFp: "f'(x) = 3x\u00B2 - 3",
    displayFpp: "f''(x) = 6x",
    yRangeF: [-5, 5],
    yRangeFp: [-5, 10],
    yRangeFpp: [-15, 15]
  },
  {
    name: 'Quartic',
    displayF: 'f(x) = x\u2074 - 4x\u00B2',
    displayFp: "f'(x) = 4x\u00B3 - 8x",
    displayFpp: "f''(x) = 12x\u00B2 - 8",
    yRangeF: [-6, 6],
    yRangeFp: [-12, 12],
    yRangeFpp: [-10, 30]
  },
  {
    name: 'Sine',
    displayF: 'f(x) = sin(x)',
    displayFp: "f'(x) = cos(x)",
    displayFpp: "f''(x) = -sin(x)",
    yRangeF: [-1.5, 1.5],
    yRangeFp: [-1.5, 1.5],
    yRangeFpp: [-1.5, 1.5]
  },
  {
    name: 'Rational',
    displayF: 'f(x) = x/(x\u00B2+1)',
    displayFp: "f'(x) = (1-x\u00B2)/(x\u00B2+1)\u00B2",
    displayFpp: "f''(x) = 2x(x\u00B2-3)/(x\u00B2+1)\u00B3",
    yRangeF: [-1, 1],
    yRangeFp: [-0.5, 1.2],
    yRangeFpp: [-0.8, 0.8]
  }
];

// Colors
const colorF = [50, 100, 200];      // Blue for f(x)
const colorFp = [0, 150, 80];       // Green for f'(x)
const colorFpp = [180, 60, 140];    // Purple for f''(x)

// Control positions
let sliderX, sliderY, sliderW;
let funcBtnX, funcBtnY, funcBtnW;
let checkboxY;
let animBtnX, animBtnY;

// Dragging state
let isDraggingSlider = false;
let isDraggingOnPanel = false;

// Critical points and inflection points cache
let criticalPoints = [];
let inflectionPoints = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();
  updateYRanges();
  findSpecialPoints();

  describe('Interactive visualization showing f(x), its first derivative f\'(x), and second derivative f\'\'(x) in three synchronized panels. Drag the cursor to examine relationships between the graphs and discover critical points and inflection points.', LABEL);
}

function updateLayoutPositions() {
  // Calculate visible panel count
  let visiblePanels = (showF ? 1 : 0) + (showFp ? 1 : 0) + (showFpp ? 1 : 0);
  if (visiblePanels === 0) visiblePanels = 1;

  // Calculate panel dimensions
  let availableHeight = drawHeight - chartTop - 25;
  panelHeight = (availableHeight - (visiblePanels - 1) * panelGap) / visiblePanels;

  panelLeft = margin + 45;
  panelRight = canvasWidth - margin - 15;

  // Control positions
  sliderX = 55;
  sliderY = drawHeight + 18;
  sliderW = canvasWidth * 0.35;

  funcBtnX = sliderX + sliderW + 60;
  funcBtnY = drawHeight + 8;
  funcBtnW = 65;

  checkboxY = drawHeight + 50;

  animBtnX = funcBtnX;
  animBtnY = drawHeight + 70;
}

function updateYRanges() {
  let f = functions[currentFunction];
  yMinF = f.yRangeF[0];
  yMaxF = f.yRangeF[1];
  yMinFp = f.yRangeFp[0];
  yMaxFp = f.yRangeFp[1];
  yMinFpp = f.yRangeFpp[0];
  yMaxFpp = f.yRangeFpp[1];
}

function findSpecialPoints() {
  criticalPoints = [];
  inflectionPoints = [];

  // Find critical points (where f' = 0 or changes sign)
  // Find inflection points (where f'' = 0 and changes sign)
  let prevFp = evaluateFp(xMin);
  let prevFpp = evaluateFpp(xMin);

  for (let x = xMin + 0.01; x <= xMax; x += 0.01) {
    let currFp = evaluateFp(x);
    let currFpp = evaluateFpp(x);

    // Check for critical point (f' crosses zero)
    if (prevFp * currFp < 0) {
      // Binary search for more precise location
      let lo = x - 0.01, hi = x;
      for (let i = 0; i < 10; i++) {
        let mid = (lo + hi) / 2;
        if (evaluateFp(mid) * prevFp < 0) hi = mid;
        else lo = mid;
      }
      let cpX = (lo + hi) / 2;
      let cpY = evaluateF(cpX);
      let fppAtCp = evaluateFpp(cpX);
      let type = fppAtCp > 0 ? 'min' : (fppAtCp < 0 ? 'max' : 'saddle');
      criticalPoints.push({ x: cpX, y: cpY, type: type });
    }

    // Check for inflection point (f'' crosses zero with sign change)
    if (prevFpp * currFpp < 0) {
      let lo = x - 0.01, hi = x;
      for (let i = 0; i < 10; i++) {
        let mid = (lo + hi) / 2;
        if (evaluateFpp(mid) * prevFpp < 0) hi = mid;
        else lo = mid;
      }
      let ipX = (lo + hi) / 2;
      let ipY = evaluateF(ipX);
      inflectionPoints.push({ x: ipX, y: ipY });
    }

    prevFp = currFp;
    prevFpp = currFpp;
  }
}

function draw() {
  updateCanvasSize();

  // Handle animation
  if (isAnimating) {
    animationPhase += 0.02;
    currentX = xMin + (xMax - xMin) * (0.5 + 0.45 * sin(animationPhase));
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

  // Draw title
  drawTitle();

  // Calculate panel positions
  let panelIndex = 0;
  let panelPositions = [];

  if (showF) {
    panelPositions.push({ top: chartTop + panelIndex * (panelHeight + panelGap), type: 'f' });
    panelIndex++;
  }
  if (showFp) {
    panelPositions.push({ top: chartTop + panelIndex * (panelHeight + panelGap), type: 'fp' });
    panelIndex++;
  }
  if (showFpp) {
    panelPositions.push({ top: chartTop + panelIndex * (panelHeight + panelGap), type: 'fpp' });
    panelIndex++;
  }

  // Draw panels
  for (let p of panelPositions) {
    if (p.type === 'f') {
      drawPanel(1, p.top, colorF, 'f(x)', functions[currentFunction].displayF, yMinF, yMaxF, evaluateF, true, false);
    } else if (p.type === 'fp') {
      drawPanel(2, p.top, colorFp, "f'(x)", functions[currentFunction].displayFp, yMinFp, yMaxFp, evaluateFp, false, false);
    } else if (p.type === 'fpp') {
      drawPanel(3, p.top, colorFpp, "f''(x)", functions[currentFunction].displayFpp, yMinFpp, yMaxFpp, evaluateFpp, false, true);
    }
  }

  // Draw info panel
  drawInfoPanel();

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Three Connected Graphs Explorer', canvasWidth / 2, 5);
  textSize(12);
  fill(80);
  text('Examining the relationships between f, f\', and f\'\'', canvasWidth / 2, 26);
}

function drawPanel(panelNum, topY, col, label, formula, yMin, yMax, evalFunc, showSpecialPoints, showInflectionMarkers) {
  let bottomY = topY + panelHeight;

  // Panel background
  fill(255, 255, 255, 220);
  stroke(200);
  strokeWeight(1);
  rect(panelLeft - 40, topY, panelRight - panelLeft + 50, panelHeight, 5);

  // Panel label
  fill(col[0], col[1], col[2]);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text(label, panelLeft - 35, topY + 5);

  // Formula
  textAlign(RIGHT, TOP);
  textSize(11);
  fill(100);
  text(formula, panelRight + 5, topY + 5);

  // Graph area
  let graphTop = topY + 24;
  let graphBottom = bottomY - 8;
  let graphHeight = graphBottom - graphTop;

  // Draw increasing/decreasing shading for f(x) panel
  if (panelNum === 1 && showFp) {
    drawRegionShading(graphTop, graphBottom, yMin, yMax);
  }

  // Grid
  stroke(235);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = Math.ceil(xMin); i <= xMax; i++) {
    let x = map(i, xMin, xMax, panelLeft, panelRight);
    line(x, graphTop, x, graphBottom);
  }

  // Horizontal grid lines
  let yStep = (yMax - yMin) / 4;
  for (let i = 0; i <= 4; i++) {
    let yVal = yMin + i * yStep;
    let y = map(yVal, yMin, yMax, graphBottom, graphTop);
    line(panelLeft, y, panelRight, y);
  }

  // Axes
  stroke(120);
  strokeWeight(1);

  // X-axis
  let y0 = map(0, yMin, yMax, graphBottom, graphTop);
  if (y0 > graphTop && y0 < graphBottom) {
    line(panelLeft, y0, panelRight, y0);
    // X-axis labels
    noStroke();
    fill(100);
    textSize(9);
    textAlign(CENTER, TOP);
    for (let i = Math.ceil(xMin); i <= xMax; i++) {
      if (i !== 0) {
        let x = map(i, xMin, xMax, panelLeft, panelRight);
        text(i, x, y0 + 2);
      }
    }
  }

  // Y-axis
  let x0 = map(0, xMin, xMax, panelLeft, panelRight);
  if (x0 > panelLeft && x0 < panelRight) {
    stroke(120);
    line(x0, graphTop, x0, graphBottom);
  }

  // Draw curve
  stroke(col[0], col[1], col[2]);
  strokeWeight(2.5);
  noFill();

  beginShape();
  for (let px = panelLeft; px <= panelRight; px += 2) {
    let x = map(px, panelLeft, panelRight, xMin, xMax);
    let y = evalFunc(x);
    let py = map(y, yMin, yMax, graphBottom, graphTop);

    if (py >= graphTop - 20 && py <= graphBottom + 20) {
      vertex(px, constrain(py, graphTop, graphBottom));
    }
  }
  endShape();

  // Draw synchronized vertical line at current x
  let currPx = map(currentX, xMin, xMax, panelLeft, panelRight);
  stroke(100, 100, 180);
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]);
  line(currPx, graphTop, currPx, graphBottom);
  drawingContext.setLineDash([]);

  // Draw special points markers
  if (showSpecialPoints && showFp) {
    // Draw critical points (local max/min) as blue dots on f(x)
    for (let cp of criticalPoints) {
      let px = map(cp.x, xMin, xMax, panelLeft, panelRight);
      let py = map(cp.y, yMin, yMax, graphBottom, graphTop);
      if (py >= graphTop && py <= graphBottom) {
        fill(50, 100, 220);
        stroke(255);
        strokeWeight(2);
        circle(px, py, 14);

        // Label
        noStroke();
        fill(50, 100, 220);
        textSize(9);
        textAlign(CENTER, BOTTOM);
        text(cp.type === 'max' ? 'max' : 'min', px, py - 10);
      }
    }

    // Draw inflection points as purple dots on f(x)
    if (showFpp) {
      for (let ip of inflectionPoints) {
        let px = map(ip.x, xMin, xMax, panelLeft, panelRight);
        let py = map(ip.y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
          fill(180, 60, 180);
          stroke(255);
          strokeWeight(2);
          // Draw diamond shape for inflection point
          push();
          translate(px, py);
          rotate(PI / 4);
          rectMode(CENTER);
          rect(0, 0, 10, 10);
          pop();
        }
      }
    }
  }

  // Draw zeros of f' as markers (showing where critical points occur)
  if (panelNum === 2) {
    for (let cp of criticalPoints) {
      let px = map(cp.x, xMin, xMax, panelLeft, panelRight);
      let py = map(0, yMin, yMax, graphBottom, graphTop);
      if (py >= graphTop && py <= graphBottom) {
        fill(50, 100, 220);
        stroke(255);
        strokeWeight(2);
        circle(px, py, 10);
      }
    }
  }

  // Draw zeros of f'' as markers (showing where inflection points occur)
  if (panelNum === 3 && showInflectionMarkers) {
    for (let ip of inflectionPoints) {
      let px = map(ip.x, xMin, xMax, panelLeft, panelRight);
      let py = map(0, yMin, yMax, graphBottom, graphTop);
      if (py >= graphTop && py <= graphBottom) {
        fill(180, 60, 180);
        stroke(255);
        strokeWeight(2);
        push();
        translate(px, py);
        rotate(PI / 4);
        rectMode(CENTER);
        rect(0, 0, 8, 8);
        pop();
      }
    }
  }

  // Draw point on curve
  let currY = evalFunc(currentX);
  let currPy = map(currY, yMin, yMax, graphBottom, graphTop);

  if (currPy >= graphTop && currPy <= graphBottom) {
    // Draw tangent line on f(x) panel
    if (panelNum === 1 && showFp) {
      let slope = evaluateFp(currentX);
      drawTangentLine(currPx, currPy, slope, panelLeft, panelRight, graphTop, graphBottom, yMin, yMax);
    }

    fill(col[0], col[1], col[2]);
    stroke(255);
    strokeWeight(2);
    circle(currPx, currPy, 12);

    // Show value
    noStroke();
    fill(col[0], col[1], col[2]);
    textSize(10);
    textAlign(LEFT, CENTER);
    let valText = currY.toFixed(2);
    let textX = currPx + 10;
    if (textX + 40 > panelRight) textX = currPx - 50;
    text(valText, textX, currPy);
  }
}

function drawRegionShading(graphTop, graphBottom, yMin, yMax) {
  // Draw green (increasing) and red (decreasing) shading based on f'
  let stepSize = 3;

  for (let px = panelLeft; px < panelRight; px += stepSize) {
    let x = map(px, panelLeft, panelRight, xMin, xMax);
    let fp = evaluateFp(x);

    noStroke();
    if (fp > 0.01) {
      fill(100, 200, 100, 40); // Green for increasing
    } else if (fp < -0.01) {
      fill(200, 100, 100, 40); // Red for decreasing
    } else {
      continue;
    }

    rect(px, graphTop, stepSize, graphBottom - graphTop);
  }
}

function drawTangentLine(px, py, slope, left, right, top, bottom, yMin, yMax) {
  let scaleX = (right - left) / (xMax - xMin);
  let scaleY = (bottom - top) / (yMax - yMin);
  let visualSlope = slope * scaleY / scaleX;

  let tangentHalfLength = 60;

  stroke(255, 120, 50);
  strokeWeight(2);

  let x1 = px - tangentHalfLength;
  let y1 = py + visualSlope * tangentHalfLength;
  let x2 = px + tangentHalfLength;
  let y2 = py - visualSlope * tangentHalfLength;

  x1 = max(left, x1);
  x2 = min(right, x2);
  y1 = constrain(y1, top, bottom);
  y2 = constrain(y2, top, bottom);

  line(x1, y1, x2, y2);
}

function drawInfoPanel() {
  let boxX = panelLeft - 35;
  let boxY = chartTop + 28;
  let boxW = 145;
  let boxH = 105;

  fill(255, 255, 255, 245);
  stroke(180);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  let fx = evaluateF(currentX);
  let fpx = evaluateFp(currentX);
  let fppx = evaluateFpp(currentX);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('At x = ' + currentX.toFixed(2) + ':', boxX + 8, boxY + 8);

  if (showF) {
    fill(colorF[0], colorF[1], colorF[2]);
    text('f(x) = ' + fx.toFixed(3), boxX + 8, boxY + 26);
  }

  if (showFp) {
    fill(colorFp[0], colorFp[1], colorFp[2]);
    text("f'(x) = " + fpx.toFixed(3), boxX + 8, boxY + 44);
  }

  if (showFpp) {
    fill(colorFpp[0], colorFpp[1], colorFpp[2]);
    text("f''(x) = " + fppx.toFixed(3), boxX + 8, boxY + 62);
  }

  // Show special insight
  noStroke();
  textSize(10);
  fill(80);

  let insight = '';
  if (Math.abs(fpx) < 0.08) {
    fill(50, 100, 200);
    insight = "f' = 0: Horizontal tangent!";
  } else if (Math.abs(fppx) < 0.08 && showFpp) {
    // Check if it's really an inflection point (sign change)
    let fppLeft = evaluateFpp(currentX - 0.1);
    let fppRight = evaluateFpp(currentX + 0.1);
    if (fppLeft * fppRight < 0) {
      fill(180, 60, 180);
      insight = "f'' = 0: Inflection point!";
    }
  } else if (fpx > 0 && showFp) {
    fill(0, 130, 60);
    insight = "f' > 0: f increasing";
  } else if (fpx < 0 && showFp) {
    fill(180, 60, 60);
    insight = "f' < 0: f decreasing";
  }

  if (insight) {
    text(insight, boxX + 8, boxY + 85);
  }
}

function drawControls() {
  // X slider
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('x = ' + currentX.toFixed(2), 10, sliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 5, sliderW, 10, 5);

  // Slider handle
  let handleX = map(currentX, xMin, xMax, sliderX, sliderX + sliderW);
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleX, sliderY, 18);

  // Function selector label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Function:', funcBtnX - 55, funcBtnY + 12);

  // Function buttons
  for (let i = 0; i < 4; i++) {
    let bx = funcBtnX + i * (funcBtnW + 4);

    fill(currentFunction === i ? '#4CAF50' : '#e8e8e8');
    stroke(currentFunction === i ? '#388E3C' : '#bdbdbd');
    strokeWeight(1);
    rect(bx, funcBtnY, funcBtnW, 24, 4);

    fill(currentFunction === i ? 'white' : '#333');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(functions[i].name, bx + funcBtnW / 2, funcBtnY + 12);
  }

  // Checkboxes for toggling graphs
  drawCheckbox(10, checkboxY, showF, 'Show f(x)', colorF);
  drawCheckbox(100, checkboxY, showFp, "Show f'(x)", colorFp);
  drawCheckbox(200, checkboxY, showFpp, "Show f''(x)", colorFpp);

  // Animate button
  fill(isAnimating ? '#f44336' : '#2196F3');
  stroke(isAnimating ? '#c62828' : '#1565C0');
  strokeWeight(1);
  rect(animBtnX, animBtnY, 110, 24, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(isAnimating ? 'Stop Animation' : 'Animate Cursor', animBtnX + 55, animBtnY + 12);

  // Legend
  drawLegend();
}

function drawCheckbox(x, y, checked, label, col) {
  // Checkbox box
  fill(checked ? color(col[0], col[1], col[2]) : 'white');
  stroke(checked ? color(col[0], col[1], col[2]) : '#999');
  strokeWeight(1);
  rect(x, y, 16, 16, 3);

  // Checkmark
  if (checked) {
    stroke('white');
    strokeWeight(2);
    line(x + 3, y + 8, x + 7, y + 12);
    line(x + 7, y + 12, x + 13, y + 4);
  }

  // Label
  fill(col[0], col[1], col[2]);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text(label, x + 20, y + 8);
}

function drawLegend() {
  let legendX = animBtnX + 125;
  let legendY = checkboxY - 5;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(legendX, legendY, 160, 50, 5);

  noStroke();
  textSize(9);
  textAlign(LEFT, CENTER);

  // Green = increasing
  fill(100, 200, 100);
  rect(legendX + 8, legendY + 10, 12, 12);
  fill(60);
  text('f increasing (f\' > 0)', legendX + 25, legendY + 16);

  // Red = decreasing
  fill(200, 100, 100);
  rect(legendX + 8, legendY + 28, 12, 12);
  fill(60);
  text('f decreasing (f\' < 0)', legendX + 25, legendY + 34);
}

// Function evaluators
function evaluateF(x) {
  switch (currentFunction) {
    case 0: return x * x * x - 3 * x;  // x^3 - 3x
    case 1: return Math.pow(x, 4) - 4 * x * x;  // x^4 - 4x^2
    case 2: return Math.sin(x);
    case 3: return x / (x * x + 1);  // x/(x^2+1)
    default: return 0;
  }
}

function evaluateFp(x) {
  switch (currentFunction) {
    case 0: return 3 * x * x - 3;  // 3x^2 - 3
    case 1: return 4 * Math.pow(x, 3) - 8 * x;  // 4x^3 - 8x
    case 2: return Math.cos(x);
    case 3: {
      let denom = x * x + 1;
      return (1 - x * x) / (denom * denom);  // (1-x^2)/(x^2+1)^2
    }
    default: return 0;
  }
}

function evaluateFpp(x) {
  switch (currentFunction) {
    case 0: return 6 * x;  // 6x
    case 1: return 12 * x * x - 8;  // 12x^2 - 8
    case 2: return -Math.sin(x);
    case 3: {
      let denom = x * x + 1;
      return 2 * x * (x * x - 3) / Math.pow(denom, 3);  // 2x(x^2-3)/(x^2+1)^3
    }
    default: return 0;
  }
}

function mousePressed() {
  // Check slider handle
  let handleX = map(currentX, xMin, xMax, sliderX, sliderX + sliderW);
  if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
    isDraggingSlider = true;
    isAnimating = false;
    return;
  }

  // Check slider track click
  if (mouseY > sliderY - 12 && mouseY < sliderY + 12 &&
      mouseX > sliderX && mouseX < sliderX + sliderW) {
    currentX = map(mouseX, sliderX, sliderX + sliderW, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    isDraggingSlider = true;
    isAnimating = false;
    return;
  }

  // Check function buttons
  for (let i = 0; i < 4; i++) {
    let bx = funcBtnX + i * (funcBtnW + 4);
    if (mouseX >= bx && mouseX <= bx + funcBtnW &&
        mouseY >= funcBtnY && mouseY <= funcBtnY + 24) {
      currentFunction = i;
      updateYRanges();
      findSpecialPoints();
      return;
    }
  }

  // Check checkboxes
  if (mouseX >= 10 && mouseX <= 90 && mouseY >= checkboxY && mouseY <= checkboxY + 16) {
    showF = !showF;
    if (!showF && !showFp && !showFpp) showF = true; // Keep at least one visible
    updateLayoutPositions();
    return;
  }
  if (mouseX >= 100 && mouseX <= 190 && mouseY >= checkboxY && mouseY <= checkboxY + 16) {
    showFp = !showFp;
    if (!showF && !showFp && !showFpp) showFp = true;
    updateLayoutPositions();
    return;
  }
  if (mouseX >= 200 && mouseX <= 290 && mouseY >= checkboxY && mouseY <= checkboxY + 16) {
    showFpp = !showFpp;
    if (!showF && !showFp && !showFpp) showFpp = true;
    updateLayoutPositions();
    return;
  }

  // Check animate button
  if (mouseX >= animBtnX && mouseX <= animBtnX + 110 &&
      mouseY >= animBtnY && mouseY <= animBtnY + 24) {
    isAnimating = !isAnimating;
    return;
  }

  // Check if clicking on a graph panel to drag cursor
  if (mouseY >= chartTop && mouseY <= drawHeight - 10 &&
      mouseX >= panelLeft && mouseX <= panelRight) {
    isDraggingOnPanel = true;
    currentX = map(mouseX, panelLeft, panelRight, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    isAnimating = false;
    return;
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    currentX = map(mouseX, sliderX, sliderX + sliderW, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    currentX = Math.round(currentX * 100) / 100;
  }

  if (isDraggingOnPanel) {
    currentX = map(mouseX, panelLeft, panelRight, xMin, xMax);
    currentX = constrain(currentX, xMin, xMax);
    currentX = Math.round(currentX * 100) / 100;
  }
}

function mouseReleased() {
  isDraggingSlider = false;
  isDraggingOnPanel = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayoutPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  sliderW = canvasWidth * 0.35;
  funcBtnX = sliderX + sliderW + 60;
  animBtnX = funcBtnX;
  panelRight = canvasWidth - margin - 15;
}
