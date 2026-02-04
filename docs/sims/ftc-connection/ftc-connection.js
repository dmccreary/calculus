// FTC Connection Visualization MicroSim
// Show how FTC Part 1 and Part 2 are two sides of the same relationship
// Bloom Level 4: Analyze

let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Panel dimensions
let panel1Top = 50;
let panel1Bottom = 150;
let panel2Top = 170;
let panel2Bottom = 270;
let panel3Top = 290;
let panel3Bottom = 390;
let panelLeft = 60;
let panelRight;

// Parameters
let a = 0;
let b = 2;
let currentX = 1;

// View mode: 0=Part1, 1=Part2, 2=Both
let viewMode = 2;

// Function selection
let funcIndex = 0;
let funcNames = ['x²', 'sin(x)', '2x', 'eˣ'];
let funcDefs = [
  (x) => x * x,
  (x) => Math.sin(x),
  (x) => 2 * x,
  (x) => Math.exp(x)
];
let antiderivatives = [
  (x) => x * x * x / 3,
  (x) => -Math.cos(x),
  (x) => x * x,
  (x) => Math.exp(x)
];
let antiderivativeNames = ['x³/3', '-cos(x)', 'x²', 'eˣ'];

// UI elements
let xSlider, funcSelect, viewRadios;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create x slider
  xSlider = createSlider(-1, 3, currentX, 0.1);
  xSlider.position(sliderLeftMargin, drawHeight + 5);
  xSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Create function dropdown
  funcSelect = createSelect();
  funcSelect.position(10, drawHeight + 40);
  for (let i = 0; i < funcNames.length; i++) {
    funcSelect.option('f(x) = ' + funcNames[i], i);
  }
  funcSelect.changed(() => funcIndex = parseInt(funcSelect.value()));

  // Create view mode selector
  let viewSelect = createSelect();
  viewSelect.position(130, drawHeight + 40);
  viewSelect.option('Part 1 Focus', 0);
  viewSelect.option('Part 2 Focus', 1);
  viewSelect.option('Both Parts', 2);
  viewSelect.selected('Both Parts');
  viewSelect.changed(function() {
    viewMode = parseInt(this.value());
  });

  describe('FTC connection visualization showing how Part 1 and Part 2 relate', LABEL);
}

function draw() {
  updateCanvasSize();
  panelRight = canvasWidth - 40;

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Update values
  currentX = xSlider.value();

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  text('The Fundamental Theorem Connection', canvasWidth / 2, 5);

  // Draw the three panels
  drawPanel1(); // f(x) - the integrand
  drawPanel2(); // F(x) - the antiderivative
  drawPanel3(); // Accumulation function

  // Draw connection arrows
  drawConnections();

  // FTC statements
  drawFTCStatements();

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('x: ' + currentX.toFixed(1), 10, drawHeight + 15);
}

function getYRange(funcDef, xMin, xMax) {
  let minY = 0, maxY = 0;
  for (let x = xMin; x <= xMax; x += 0.1) {
    let y = funcDef(x);
    if (!isNaN(y) && isFinite(y)) {
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  let padding = (maxY - minY) * 0.2 || 1;
  return { min: minY - padding, max: maxY + padding };
}

function drawPanel1() {
  // Panel for f(x)
  let highlight = (viewMode === 0 || viewMode === 2);

  fill(255);
  stroke(highlight ? color(0, 150, 0) : 200);
  strokeWeight(highlight ? 2 : 1);
  rect(panelLeft - 10, panel1Top, panelRight - panelLeft + 20, panel1Bottom - panel1Top, 5);

  // Label
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('f(x) = ' + funcNames[funcIndex] + ' (integrand)', panelLeft, panel1Top + 3);

  let yRange = getYRange(funcDefs[funcIndex], -1, 3);
  let zeroY = map(0, yRange.min, yRange.max, panel1Bottom - 5, panel1Top + 20);

  // X-axis
  stroke(150);
  strokeWeight(1);
  line(panelLeft, zeroY, panelRight, zeroY);

  // Shade area from a to x (for Part 1 visualization)
  if (viewMode === 0 || viewMode === 2) {
    for (let px = panelLeft; px < panelRight; px++) {
      let x = map(px, panelLeft, panelRight, -1, 3);
      if (x >= a && x <= currentX) {
        let y = funcDefs[funcIndex](x);
        let py = map(y, yRange.min, yRange.max, panel1Bottom - 5, panel1Top + 20);
        stroke(100, 150, 255, 80);
        line(px, zeroY, px, py);
      }
    }
  }

  // Draw curve
  stroke(0, 100, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = panelLeft; px <= panelRight; px++) {
    let x = map(px, panelLeft, panelRight, -1, 3);
    let y = funcDefs[funcIndex](x);
    let py = map(y, yRange.min, yRange.max, panel1Bottom - 5, panel1Top + 20);
    vertex(px, py);
  }
  endShape();

  // Mark current x
  let xPos = map(currentX, -1, 3, panelLeft, panelRight);
  let yAtX = funcDefs[funcIndex](currentX);
  let pyAtX = map(yAtX, yRange.min, yRange.max, panel1Bottom - 5, panel1Top + 20);

  fill(255, 0, 0);
  stroke(200, 0, 0);
  strokeWeight(2);
  circle(xPos, pyAtX, 8);

  // Value annotation
  fill('black');
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  text('f(' + currentX.toFixed(1) + ')=' + yAtX.toFixed(2), xPos + 5, pyAtX);
}

function drawPanel2() {
  // Panel for F(x) - antiderivative
  let highlight = (viewMode === 1 || viewMode === 2);

  fill(255);
  stroke(highlight ? color(0, 0, 200) : 200);
  strokeWeight(highlight ? 2 : 1);
  rect(panelLeft - 10, panel2Top, panelRight - panelLeft + 20, panel2Bottom - panel2Top, 5);

  // Label
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('F(x) = ' + antiderivativeNames[funcIndex] + ' (antiderivative)', panelLeft, panel2Top + 3);

  let yRange = getYRange(antiderivatives[funcIndex], -1, 3);
  let zeroY = map(0, yRange.min, yRange.max, panel2Bottom - 5, panel2Top + 20);

  // X-axis
  stroke(150);
  strokeWeight(1);
  line(panelLeft, zeroY, panelRight, zeroY);

  // Draw curve
  stroke(0, 0, 200);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = panelLeft; px <= panelRight; px++) {
    let x = map(px, panelLeft, panelRight, -1, 3);
    let y = antiderivatives[funcIndex](x);
    let py = map(y, yRange.min, yRange.max, panel2Bottom - 5, panel2Top + 20);
    vertex(px, py);
  }
  endShape();

  // For Part 2: mark F(a) and F(b)
  if (viewMode === 1 || viewMode === 2) {
    let aPos = map(a, -1, 3, panelLeft, panelRight);
    let bPos = map(b, -1, 3, panelLeft, panelRight);
    let Fa = antiderivatives[funcIndex](a);
    let Fb = antiderivatives[funcIndex](b);
    let pyA = map(Fa, yRange.min, yRange.max, panel2Bottom - 5, panel2Top + 20);
    let pyB = map(Fb, yRange.min, yRange.max, panel2Bottom - 5, panel2Top + 20);

    fill(255, 150, 0);
    stroke(200, 100, 0);
    strokeWeight(2);
    circle(aPos, pyA, 8);
    circle(bPos, pyB, 8);

    // Annotation
    fill('black');
    noStroke();
    textSize(9);
    text('F(a)', aPos - 15, pyA);
    text('F(b)', bPos + 5, pyB);
  }

  // Mark current x
  let xPos = map(currentX, -1, 3, panelLeft, panelRight);
  let yAtX = antiderivatives[funcIndex](currentX);
  let pyAtX = map(yAtX, yRange.min, yRange.max, panel2Bottom - 5, panel2Top + 20);

  fill(255, 0, 0);
  stroke(200, 0, 0);
  strokeWeight(2);
  circle(xPos, pyAtX, 8);
}

function drawPanel3() {
  // Panel for accumulation / showing slope = f(x)
  fill(255);
  stroke(150, 100, 150);
  strokeWeight(1);
  rect(panelLeft - 10, panel3Top, panelRight - panelLeft + 20, panel3Bottom - panel3Top, 5);

  // Label
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Connection: d/dx[F(x)] = f(x)', panelLeft, panel3Top + 3);

  // Show the relationship visually
  let yRange = getYRange(antiderivatives[funcIndex], -1, 3);

  // Draw F(x) curve
  stroke(0, 0, 200, 100);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let px = panelLeft; px <= panelRight; px++) {
    let x = map(px, panelLeft, panelRight, -1, 3);
    let y = antiderivatives[funcIndex](x);
    let py = map(y, yRange.min, yRange.max, panel3Bottom - 5, panel3Top + 25);
    vertex(px, py);
  }
  endShape();

  // Draw tangent line at current x
  let xPos = map(currentX, -1, 3, panelLeft, panelRight);
  let Fx = antiderivatives[funcIndex](currentX);
  let slope = funcDefs[funcIndex](currentX); // F'(x) = f(x)!
  let pyFx = map(Fx, yRange.min, yRange.max, panel3Bottom - 5, panel3Top + 25);

  // Tangent line
  stroke(255, 0, 0);
  strokeWeight(2);
  let dx = 40;
  let dy = slope * (3 - (-1)) / (panelRight - panelLeft) * dx;
  let scaledDy = dy * (panel3Bottom - panel3Top - 30) / (yRange.max - yRange.min);
  line(xPos - dx, pyFx + scaledDy, xPos + dx, pyFx - scaledDy);

  // Point
  fill(255, 0, 0);
  circle(xPos, pyFx, 8);

  // Slope annotation
  fill('black');
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  text('Slope = f(x) = ' + slope.toFixed(2), canvasWidth / 2, panel3Bottom - 20);
}

function drawConnections() {
  // Draw arrows showing the relationships
  let arrowX = panelRight + 15;

  // Arrow from f to F (integration)
  stroke(0, 150, 0);
  strokeWeight(2);
  drawArrow(arrowX, (panel1Top + panel1Bottom) / 2, arrowX, (panel2Top + panel2Bottom) / 2, 'down');

  // Arrow from F to f (differentiation)
  stroke(0, 0, 200);
  drawArrow(arrowX + 20, (panel2Top + panel2Bottom) / 2, arrowX + 20, (panel1Top + panel1Bottom) / 2, 'up');

  // Labels
  fill(0, 150, 0);
  noStroke();
  textSize(9);
  textAlign(LEFT, CENTER);
  text('∫', arrowX - 8, (panel1Bottom + panel2Top) / 2);

  fill(0, 0, 200);
  text('d/dx', arrowX + 12, (panel1Bottom + panel2Top) / 2);
}

function drawArrow(x1, y1, x2, y2, dir) {
  line(x1, y1, x2, y2);
  let arrowSize = 6;
  if (dir === 'down') {
    line(x2, y2, x2 - arrowSize, y2 - arrowSize);
    line(x2, y2, x2 + arrowSize, y2 - arrowSize);
  } else {
    line(x2, y2, x2 - arrowSize, y2 + arrowSize);
    line(x2, y2, x2 + arrowSize, y2 + arrowSize);
  }
}

function drawFTCStatements() {
  // Info box at bottom
  let boxY = 400;
  fill(255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(10, boxY, canvasWidth - 20, 95, 5);

  fill('black');
  noStroke();
  textSize(10);
  textAlign(LEFT, TOP);

  let y = boxY + 5;
  fill(0, 100, 0);
  text('FTC Part 1: d/dx[∫ₐˣ f(t)dt] = f(x)', 15, y);

  y += 15;
  fill(0, 0, 150);
  text('FTC Part 2: ∫ₐᵇ f(x)dx = F(b) - F(a)', 15, y);

  y += 18;
  fill('black');
  textSize(9);
  text('At x = ' + currentX.toFixed(1) + ':', 15, y);
  y += 12;
  text('• f(x) = ' + funcDefs[funcIndex](currentX).toFixed(3), 20, y);
  y += 12;
  text('• F(x) = ' + antiderivatives[funcIndex](currentX).toFixed(3), 20, y);
  y += 12;
  text('• Slope of F at x = f(x) ✓', 20, y);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  xSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
