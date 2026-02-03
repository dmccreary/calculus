// Asymptote Analyzer MicroSim
// Learning Objective: Students will interpret the relationship between rational
// function formulas and their asymptotes.
// Bloom Level: Understand (L2)

let canvasWidth = 650;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scale = 30;

// Rational functions
let functions = [
  {
    name: 'f(x) = 1/x',
    f: x => 1 / x,
    vertAsymp: [0],
    horizAsymp: 0,
    desc: 'Vertical: x = 0\nHorizontal: y = 0'
  },
  {
    name: 'f(x) = 1/(x-2)',
    f: x => 1 / (x - 2),
    vertAsymp: [2],
    horizAsymp: 0,
    desc: 'Vertical: x = 2\nHorizontal: y = 0'
  },
  {
    name: 'f(x) = x/(x²-1)',
    f: x => x / (x * x - 1),
    vertAsymp: [-1, 1],
    horizAsymp: 0,
    desc: 'Vertical: x = -1, x = 1\nHorizontal: y = 0'
  },
  {
    name: 'f(x) = (2x+1)/(x-3)',
    f: x => (2 * x + 1) / (x - 3),
    vertAsymp: [3],
    horizAsymp: 2,
    desc: 'Vertical: x = 3\nHorizontal: y = 2'
  },
  {
    name: 'f(x) = x²/(x²+1)',
    f: x => (x * x) / (x * x + 1),
    vertAsymp: [],
    horizAsymp: 1,
    desc: 'Vertical: none\nHorizontal: y = 1'
  }
];
let currentFunc = 0;

// Trace mode
let traceX = 0;
let showTrace = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth / 2;
  originY = drawHeight / 2;

  describe('Asymptote Analyzer: Explore vertical and horizontal asymptotes of rational functions.', LABEL);
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

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Asymptote Analyzer: ' + functions[currentFunc].name, canvasWidth / 2, 5);

  // Draw coordinate system
  drawAxes();

  // Draw asymptotes
  drawAsymptotes();

  // Draw function
  drawRationalFunction();

  // Draw trace
  if (showTrace) {
    drawTrace();
  }

  // Draw info panel
  drawInfoPanel();

  // Draw controls
  drawControls();
}

function drawAxes() {
  // Grid
  stroke(230);
  strokeWeight(1);
  for (let i = -10; i <= 10; i++) {
    let x = originX + i * scale;
    let y = originY - i * scale;
    if (x > margin && x < canvasWidth - margin) {
      line(x, 30, x, drawHeight - 20);
    }
    if (y > 30 && y < drawHeight - 20) {
      line(margin, y, canvasWidth - margin, y);
    }
  }

  // Axes
  stroke(0);
  strokeWeight(2);
  line(margin, originY, canvasWidth - margin, originY);
  line(originX, 30, originX, drawHeight - 20);

  // Tick labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = -6; i <= 6; i++) {
    if (i !== 0) {
      let x = originX + i * scale;
      if (x > margin && x < canvasWidth - margin) {
        text(i, x, originY + 3);
      }
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = -5; i <= 5; i++) {
    if (i !== 0) {
      let y = originY - i * scale;
      if (y > 30 && y < drawHeight - 20) {
        text(i, originX - 5, y);
      }
    }
  }
}

function drawAsymptotes() {
  let func = functions[currentFunc];

  // Vertical asymptotes
  stroke(255, 100, 100);
  strokeWeight(2);
  drawingContext.setLineDash([8, 8]);
  for (let va of func.vertAsymp) {
    let x = originX + va * scale;
    if (x > margin && x < canvasWidth - margin) {
      line(x, 30, x, drawHeight - 20);

      // Label
      fill(200, 50, 50);
      noStroke();
      textSize(12);
      textAlign(CENTER, BOTTOM);
      text('x = ' + va, x, 28);
    }
  }

  // Horizontal asymptote
  if (func.horizAsymp !== null) {
    stroke(100, 100, 255);
    strokeWeight(2);
    let y = originY - func.horizAsymp * scale;
    if (y > 30 && y < drawHeight - 20) {
      line(margin, y, canvasWidth - margin, y);

      // Label
      fill(50, 50, 200);
      noStroke();
      textSize(12);
      textAlign(LEFT, BOTTOM);
      text('y = ' + func.horizAsymp, margin + 5, y - 3);
    }
  }
  drawingContext.setLineDash([]);
}

function drawRationalFunction() {
  let func = functions[currentFunc];

  stroke(50, 150, 50);
  strokeWeight(3);
  noFill();

  // Draw in segments to avoid crossing asymptotes
  let segments = getSegments(func);

  for (let seg of segments) {
    beginShape();
    for (let px = seg.start; px <= seg.end; px += 1) {
      let x = (px - originX) / scale;
      let y = func.f(x);

      if (!isNaN(y) && isFinite(y) && Math.abs(y) < 20) {
        let sy = originY - y * scale;
        if (sy > -100 && sy < drawHeight + 100) {
          vertex(px, constrain(sy, -50, drawHeight + 50));
        }
      }
    }
    endShape();
  }
}

function getSegments(func) {
  let segments = [];
  let boundaries = [margin, canvasWidth - margin];

  // Add vertical asymptote positions
  for (let va of func.vertAsymp) {
    let x = originX + va * scale;
    if (x > margin && x < canvasWidth - margin) {
      boundaries.push(x - 2);
      boundaries.push(x + 2);
    }
  }

  boundaries.sort((a, b) => a - b);

  for (let i = 0; i < boundaries.length - 1; i += 2) {
    segments.push({ start: boundaries[i], end: boundaries[i + 1] });
  }

  return segments;
}

function drawTrace() {
  let func = functions[currentFunc];
  let x = traceX;
  let y = func.f(x);

  if (!isNaN(y) && isFinite(y) && Math.abs(y) < 20) {
    let sx = originX + x * scale;
    let sy = originY - y * scale;

    // Vertical line to x-axis
    stroke(150);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(sx, sy, sx, originY);
    line(sx, sy, originX, sy);
    drawingContext.setLineDash([]);

    // Point
    fill(50, 150, 50);
    stroke(0);
    strokeWeight(2);
    circle(sx, sy, 12);

    // Value display
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text('x = ' + x.toFixed(2), sx + 8, sy - 5);
    text('f(x) = ' + y.toFixed(3), sx + 8, sy + 12);
  }
}

function drawInfoPanel() {
  let func = functions[currentFunc];

  let panelX = 10;
  let panelY = 35;
  let panelW = 170;
  let panelH = 75;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  let lines = func.desc.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('Vertical')) {
      fill(200, 50, 50);
    } else if (lines[i].startsWith('Horizontal')) {
      fill(50, 50, 200);
    }
    text(lines[i], panelX + 10, panelY + 10 + i * 18);
  }

  // Approaching behavior
  fill(50, 150, 50);
  textSize(11);
  if (func.vertAsymp.length > 0) {
    text('As x → ' + func.vertAsymp[0] + ', f(x) → ±∞', panelX + 10, panelY + 52);
  } else {
    text('No vertical asymptote', panelX + 10, panelY + 52);
  }
}

function drawControls() {
  // Function selector buttons
  let btnY = drawHeight + 15;
  let btnW = (canvasWidth - 40) / functions.length - 5;
  let btnH = 28;

  for (let i = 0; i < functions.length; i++) {
    let btnX = 10 + i * (btnW + 5);
    let isSelected = (i === currentFunc);

    fill(isSelected ? '#2196F3' : '#ddd');
    stroke(isSelected ? '#1565C0' : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(btnX, btnY, btnW, btnH, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(functions[i].name, btnX + btnW/2, btnY + btnH/2);
  }

  // Instructions
  let instrY = drawHeight + 55;
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Move mouse over graph to trace. Red dashed = vertical asymptote. Blue dashed = horizontal asymptote.', 10, instrY);

  // Legend
  let legendY = drawHeight + 75;
  stroke(255, 100, 100);
  strokeWeight(2);
  drawingContext.setLineDash([6, 6]);
  line(10, legendY, 40, legendY);
  drawingContext.setLineDash([]);

  fill('black');
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Vertical', 45, legendY);

  stroke(100, 100, 255);
  strokeWeight(2);
  drawingContext.setLineDash([6, 6]);
  line(110, legendY, 140, legendY);
  drawingContext.setLineDash([]);

  fill('black');
  noStroke();
  text('Horizontal', 145, legendY);

  stroke(50, 150, 50);
  strokeWeight(3);
  line(220, legendY, 250, legendY);

  fill('black');
  noStroke();
  text('Function', 255, legendY);
}

function mouseMoved() {
  if (mouseY > 30 && mouseY < drawHeight - 20) {
    traceX = (mouseX - originX) / scale;
  }
}

function mousePressed() {
  // Check function buttons
  let btnY = drawHeight + 15;
  let btnW = (canvasWidth - 40) / functions.length - 5;
  let btnH = 28;

  for (let i = 0; i < functions.length; i++) {
    let btnX = 10 + i * (btnW + 5);
    if (mouseX >= btnX && mouseX <= btnX + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
      currentFunc = i;
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  originX = canvasWidth / 2;
}
