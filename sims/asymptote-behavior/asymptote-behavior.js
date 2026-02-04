// Asymptote Behavior Visualization MicroSim
// Learning Objective: Students will interpret how functions behave near vertical
// asymptotes and as x approaches infinity, connecting algebraic analysis to visual behavior.
// Bloom Level: Understand (L2) - Interpret

// Canvas dimensions
let canvasWidth = 750;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Chart layout - must start below title and subtitle
let chartTop = 55;
let chartBottom;
let chartLeft;
let chartRight;

// Coordinate system
let scale = 30; // pixels per unit
let originX, originY;

// Delta position (x-value on the curve)
let deltaX = 0;
let deltaSliderMin = -8;
let deltaSliderMax = 8;

// Function selection (0, 1, 2)
let selectedFunction = 0;
let functionNames = [
  'f(x) = 1/x',
  'f(x) = (2x^2+1)/(x^2-4)',
  'f(x) = (x^2-1)/(x-1)'
];

// Show asymptotes toggle
let showAsymptotes = true;

// Function definitions
const functions = [
  {
    name: '1/x',
    f: (x) => 1 / x,
    verticalAsymptotes: [0],
    horizontalAsymptote: 0,
    hole: null,
    holeY: null,
    xRange: [-8, 8]
  },
  {
    name: '(2x^2+1)/(x^2-4)',
    f: (x) => (2 * x * x + 1) / (x * x - 4),
    verticalAsymptotes: [-2, 2],
    horizontalAsymptote: 2,
    hole: null,
    holeY: null,
    xRange: [-8, 8]
  },
  {
    name: '(x^2-1)/(x-1)',
    // Simplifies to x+1 with a hole at x=1
    f: (x) => {
      if (Math.abs(x - 1) < 0.001) return NaN;
      return (x * x - 1) / (x - 1);
    },
    verticalAsymptotes: [],
    horizontalAsymptote: null,
    hole: 1,
    holeY: 2, // At x=1, simplified form gives y=2
    xRange: [-8, 8]
  }
];

// Delta robot triangle shape
function drawDelta(x, y, size, tilt) {
  push();
  translate(x, y);
  rotate(tilt);

  // Delta's triangular body
  fill('#00BCD4'); // Teal color for Delta
  stroke('#00838F');
  strokeWeight(2);
  beginShape();
  vertex(0, -size);
  vertex(-size * 0.866, size * 0.5);
  vertex(size * 0.866, size * 0.5);
  endShape(CLOSE);

  // Eye (small circle)
  fill('white');
  noStroke();
  circle(0, -size * 0.3, size * 0.4);
  fill('#00838F');
  circle(0, -size * 0.3, size * 0.2);

  // Wheels (small rectangles at bottom corners)
  fill('#37474F');
  rect(-size * 0.7, size * 0.4, size * 0.3, size * 0.2, 2);
  rect(size * 0.4, size * 0.4, size * 0.3, size * 0.2, 2);

  pop();
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  describe('Interactive visualization showing how rational functions behave near asymptotes. Delta the robot travels along the curve while displaying x and y values.', LABEL);
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

  // Calculate chart bounds
  chartLeft = margin + 40;
  chartRight = canvasWidth - margin - 120; // Leave room for info panel
  chartBottom = drawHeight - 30;
  originX = (chartLeft + chartRight) / 2;
  originY = (chartTop + chartBottom) / 2;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Asymptote Behavior Visualization', canvasWidth / 2 - 50, 8);

  // Subtitle with current function
  textSize(14);
  fill(100);
  text(functionNames[selectedFunction], canvasWidth / 2 - 50, 32);

  // Draw the coordinate system
  drawGrid();
  drawAxes();

  // Draw the function
  let currentFunc = functions[selectedFunction];
  drawFunction(currentFunc);

  // Draw asymptotes if enabled
  if (showAsymptotes) {
    drawAsymptotes(currentFunc);
  }

  // Draw Delta on the curve
  drawDeltaOnCurve(currentFunc);

  // Draw info panel
  drawInfoPanel(currentFunc);

  // Draw controls
  drawControls();
}

function drawGrid() {
  stroke(220);
  strokeWeight(1);

  // Vertical grid lines
  for (let i = -10; i <= 10; i++) {
    let x = originX + i * scale;
    if (x >= chartLeft && x <= chartRight) {
      line(x, chartTop, x, chartBottom);
    }
  }

  // Horizontal grid lines
  for (let i = -10; i <= 10; i++) {
    let y = originY - i * scale;
    if (y >= chartTop && y <= chartBottom) {
      line(chartLeft, y, chartRight, y);
    }
  }
}

function drawAxes() {
  stroke(100);
  strokeWeight(2);

  // X-axis
  line(chartLeft, originY, chartRight, originY);

  // Y-axis
  line(originX, chartTop, originX, chartBottom);

  // Axis labels
  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);

  // X-axis numbers
  for (let i = -8; i <= 8; i++) {
    if (i !== 0) {
      let x = originX + i * scale;
      if (x >= chartLeft + 15 && x <= chartRight - 15) {
        text(i, x, originY + 5);
      }
    }
  }

  // Y-axis numbers
  textAlign(RIGHT, CENTER);
  for (let i = -5; i <= 5; i++) {
    if (i !== 0) {
      let y = originY - i * scale;
      if (y >= chartTop + 10 && y <= chartBottom - 10) {
        text(i, originX - 8, y);
      }
    }
  }

  // Axis labels
  textSize(14);
  textAlign(CENTER, TOP);
  text('x', chartRight + 15, originY - 5);
  textAlign(RIGHT, CENTER);
  text('y', originX - 5, chartTop - 5);
}

function drawFunction(func) {
  // Calculate color based on distance to asymptotes
  // Use segments to handle discontinuities

  let segments = getSegments(func);

  for (let seg of segments) {
    noFill();
    strokeWeight(3);
    beginShape();

    for (let px = seg.start; px <= seg.end; px += 1) {
      let xVal = (px - originX) / scale;
      let yVal = func.f(xVal);

      if (!isNaN(yVal) && isFinite(yVal)) {
        let py = originY - yVal * scale;

        // Only draw if within chart bounds
        if (py >= chartTop - 50 && py <= chartBottom + 50) {
          // Color based on proximity to asymptotes
          let color = getColorForPosition(xVal, yVal, func);
          stroke(color);
          vertex(px, constrain(py, chartTop, chartBottom));
        }
      }
    }
    endShape();
  }
}

function getSegments(func) {
  let segments = [];
  let boundaries = [chartLeft, chartRight];

  // Add asymptote boundaries
  for (let va of func.verticalAsymptotes) {
    let px = originX + va * scale;
    if (px > chartLeft && px < chartRight) {
      boundaries.push(px - 3);
      boundaries.push(px + 3);
    }
  }

  // Add hole boundary
  if (func.hole !== null) {
    let px = originX + func.hole * scale;
    if (px > chartLeft && px < chartRight) {
      boundaries.push(px - 3);
      boundaries.push(px + 3);
    }
  }

  boundaries.sort((a, b) => a - b);

  for (let i = 0; i < boundaries.length - 1; i++) {
    if (boundaries[i + 1] - boundaries[i] > 6) {
      segments.push({ start: boundaries[i], end: boundaries[i + 1] });
    }
  }

  return segments;
}

function getColorForPosition(x, y, func) {
  // Default curve color
  let baseColor = color(50, 50, 50);

  // Check proximity to vertical asymptotes (make redder)
  let minDistToVA = Infinity;
  for (let va of func.verticalAsymptotes) {
    let dist = Math.abs(x - va);
    if (dist < minDistToVA) minDistToVA = dist;
  }

  // Check proximity to horizontal asymptote (make bluer)
  let distToHA = Infinity;
  if (func.horizontalAsymptote !== null) {
    distToHA = Math.abs(y - func.horizontalAsymptote);
  }

  // Blend colors based on proximity
  if (minDistToVA < 2) {
    // Near vertical asymptote - red gradient
    let intensity = map(minDistToVA, 0, 2, 1, 0);
    return lerpColor(baseColor, color(220, 50, 50), intensity);
  } else if (distToHA < 1 && Math.abs(x) > 3) {
    // Near horizontal asymptote (and away from center) - blue gradient
    let intensity = map(distToHA, 0, 1, 1, 0);
    return lerpColor(baseColor, color(50, 100, 220), intensity);
  }

  return baseColor;
}

function drawAsymptotes(func) {
  drawingContext.setLineDash([8, 6]);
  strokeWeight(2);

  // Vertical asymptotes (red dashed)
  stroke('#E53935');
  for (let va of func.verticalAsymptotes) {
    let x = originX + va * scale;
    if (x >= chartLeft && x <= chartRight) {
      line(x, chartTop, x, chartBottom);
    }
  }

  // Horizontal asymptote (blue dashed)
  if (func.horizontalAsymptote !== null) {
    stroke('#1E88E5');
    let y = originY - func.horizontalAsymptote * scale;
    if (y >= chartTop && y <= chartBottom) {
      line(chartLeft, y, chartRight, y);
    }
  }

  // Draw hole marker if present
  if (func.hole !== null) {
    drawingContext.setLineDash([]);
    let hx = originX + func.hole * scale;
    let hy = originY - func.holeY * scale;
    stroke('#FF9800');
    strokeWeight(2);
    fill('white');
    circle(hx, hy, 12);

    // Label
    fill('#FF9800');
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text('hole at (' + func.hole + ', ' + func.holeY + ')', hx + 10, hy);
  }

  drawingContext.setLineDash([]);
}

function drawDeltaOnCurve(func) {
  // Check if Delta's x is near an asymptote or hole
  let isNearAsymptote = false;
  for (let va of func.verticalAsymptotes) {
    if (Math.abs(deltaX - va) < 0.15) {
      isNearAsymptote = true;
      break;
    }
  }

  // Check if at hole
  let isAtHole = func.hole !== null && Math.abs(deltaX - func.hole) < 0.15;

  if (isNearAsymptote || isAtHole) {
    return; // Don't draw Delta at undefined points
  }

  let yVal = func.f(deltaX);

  if (!isNaN(yVal) && isFinite(yVal) && Math.abs(yVal) < 100) {
    let px = originX + deltaX * scale;
    let py = originY - yVal * scale;

    // Constrain py to chart bounds for visibility
    let displayY = constrain(py, chartTop + 15, chartBottom - 15);

    // Calculate tilt based on derivative (slope)
    let h = 0.01;
    let yNext = func.f(deltaX + h);
    let slope = (yNext - yVal) / h;
    let tilt = atan(slope);

    // Draw Delta
    if (px >= chartLeft && px <= chartRight) {
      drawDelta(px, displayY, 12, tilt);
    }
  }
}

function drawInfoPanel(func) {
  let panelX = chartRight + 10;
  let panelY = chartTop;
  let panelW = canvasWidth - panelX - 10;
  let panelH = 180;

  // Panel background
  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  // Content
  fill(50);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);

  let tx = panelX + 10;
  let ty = panelY + 10;
  let lineHeight = 20;

  // Delta's position
  text('Delta Position:', tx, ty);
  ty += lineHeight;

  // Calculate y value
  let yVal = func.f(deltaX);
  let isNearAsymptote = false;
  for (let va of func.verticalAsymptotes) {
    if (Math.abs(deltaX - va) < 0.15) isNearAsymptote = true;
  }
  let isAtHole = func.hole !== null && Math.abs(deltaX - func.hole) < 0.15;

  fill(80);
  textSize(12);
  text('x = ' + deltaX.toFixed(2), tx, ty);
  ty += lineHeight;

  if (isNearAsymptote) {
    fill('#E53935');
    if (yVal > 0 || (deltaX > func.verticalAsymptotes[0] && func.verticalAsymptotes.length === 1)) {
      text('y -> +\u221E', tx, ty);
    } else {
      text('y -> -\u221E', tx, ty);
    }
    ty += lineHeight + 5;
    textSize(10);
    fill('#E53935');
    text('Approaching vertical', tx, ty);
    ty += 14;
    text('asymptote!', tx, ty);
  } else if (isAtHole) {
    fill('#FF9800');
    text('y = undefined', tx, ty);
    ty += lineHeight + 5;
    textSize(10);
    text('Hole in function!', tx, ty);
    ty += 14;
    text('Limit exists: y -> ' + func.holeY, tx, ty);
  } else if (!isNaN(yVal) && isFinite(yVal)) {
    fill(80);
    text('y = ' + yVal.toFixed(3), tx, ty);
    ty += lineHeight + 5;

    // Show proximity to asymptotes
    if (func.horizontalAsymptote !== null && Math.abs(deltaX) > 3) {
      let distToHA = Math.abs(yVal - func.horizontalAsymptote);
      if (distToHA < 0.5) {
        fill('#1E88E5');
        textSize(10);
        text('Approaching', tx, ty);
        ty += 14;
        text('y = ' + func.horizontalAsymptote, tx, ty);
      }
    }
  }

  // Asymptote info
  ty = panelY + panelH - 55;
  fill(50);
  textSize(11);
  text('Asymptotes:', tx, ty);
  ty += 16;

  // Vertical asymptotes
  if (func.verticalAsymptotes.length > 0) {
    fill('#E53935');
    let vaText = func.verticalAsymptotes.map(v => 'x=' + v).join(', ');
    text('V: ' + vaText, tx, ty);
    ty += 14;
  }

  // Horizontal asymptote
  if (func.horizontalAsymptote !== null) {
    fill('#1E88E5');
    text('H: y=' + func.horizontalAsymptote, tx, ty);
  } else if (func.hole !== null) {
    fill('#FF9800');
    text('Hole at x=' + func.hole, tx, ty);
  }
}

function drawControls() {
  // Row 1: Delta position slider
  let row1Y = drawHeight + 15;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Delta: x=' + deltaX.toFixed(2), 15, row1Y + 5);

  // Slider track
  let sliderX = sliderLeftMargin;
  let sliderW = canvasWidth / 2 - sliderLeftMargin - 20;

  stroke(180);
  strokeWeight(4);
  line(sliderX, row1Y + 5, sliderX + sliderW, row1Y + 5);

  // Slider handle
  let handleX = sliderX + ((deltaX - deltaSliderMin) / (deltaSliderMax - deltaSliderMin)) * sliderW;
  fill('#00BCD4');
  stroke('#00838F');
  strokeWeight(2);
  circle(handleX, row1Y + 5, 18);

  // Row 2: Function selector and asymptote toggle
  let row2Y = drawHeight + 50;

  // Function selector buttons
  let btnX = 15;
  let btnW = 140;
  let btnH = 26;
  let btnGap = 8;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Function:', btnX, row2Y + 5);

  btnX = 85;

  for (let i = 0; i < 3; i++) {
    let isSelected = (selectedFunction === i);

    fill(isSelected ? '#7E57C2' : '#E0E0E0');
    stroke(isSelected ? '#5E35B1' : '#BDBDBD');
    strokeWeight(1);
    rect(btnX, row2Y - 8, btnW, btnH, 4);

    fill(isSelected ? 'white' : '#424242');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(functionNames[i], btnX + btnW/2, row2Y + 5);

    btnX += btnW + btnGap;
  }

  // Asymptote toggle button
  let toggleX = canvasWidth - 160;
  let toggleW = 145;

  fill(showAsymptotes ? '#4CAF50' : '#BDBDBD');
  stroke(showAsymptotes ? '#388E3C' : '#9E9E9E');
  strokeWeight(1);
  rect(toggleX, row2Y - 8, toggleW, btnH, 4);

  fill(showAsymptotes ? 'white' : '#616161');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(showAsymptotes ? 'Asymptotes: ON' : 'Asymptotes: OFF', toggleX + toggleW/2, row2Y + 5);
}

function mousePressed() {
  // Check function selector buttons
  let row2Y = drawHeight + 50;
  let btnX = 85;
  let btnW = 140;
  let btnH = 26;
  let btnGap = 8;

  for (let i = 0; i < 3; i++) {
    if (mouseX >= btnX && mouseX <= btnX + btnW &&
        mouseY >= row2Y - 8 && mouseY <= row2Y - 8 + btnH) {
      selectedFunction = i;
      return;
    }
    btnX += btnW + btnGap;
  }

  // Check asymptote toggle
  let toggleX = canvasWidth - 160;
  let toggleW = 145;

  if (mouseX >= toggleX && mouseX <= toggleX + toggleW &&
      mouseY >= row2Y - 8 && mouseY <= row2Y - 8 + btnH) {
    showAsymptotes = !showAsymptotes;
    return;
  }
}

function mouseDragged() {
  // Delta position slider
  let row1Y = drawHeight + 15;
  let sliderX = sliderLeftMargin;
  let sliderW = canvasWidth / 2 - sliderLeftMargin - 20;
  let sliderY = row1Y + 5;

  if (mouseY >= sliderY - 15 && mouseY <= sliderY + 15 &&
      mouseX >= sliderX - 10 && mouseX <= sliderX + sliderW + 10) {
    let ratio = constrain((mouseX - sliderX) / sliderW, 0, 1);
    deltaX = deltaSliderMin + ratio * (deltaSliderMax - deltaSliderMin);
    deltaX = round(deltaX * 20) / 20; // Round to 0.05
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
