// Piecewise Function Builder MicroSim
// Learning Objective: Students will construct piecewise functions by defining
// different rules for different domains and observe the resulting graph.
// Bloom Level: Create (L6)

let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scale = 30;

// Piecewise function definition
let pieces = [
  { type: 'linear', m: 1, b: 2, start: -5, end: -1, includeStart: true, includeEnd: false },
  { type: 'constant', c: 1, start: -1, end: 2, includeStart: true, includeEnd: false },
  { type: 'quadratic', a: 1, start: 2, end: 5, includeStart: true, includeEnd: true }
];

let selectedPiece = 0;

// Preset examples
let presets = [
  {
    name: 'Custom',
    pieces: pieces
  },
  {
    name: 'Absolute Value',
    pieces: [
      { type: 'linear', m: -1, b: 0, start: -5, end: 0, includeStart: true, includeEnd: false },
      { type: 'linear', m: 1, b: 0, start: 0, end: 5, includeStart: true, includeEnd: true }
    ]
  },
  {
    name: 'Step Function',
    pieces: [
      { type: 'constant', c: -1, start: -5, end: -2, includeStart: true, includeEnd: false },
      { type: 'constant', c: 0, start: -2, end: 2, includeStart: true, includeEnd: false },
      { type: 'constant', c: 1, start: 2, end: 5, includeStart: true, includeEnd: true }
    ]
  },
  {
    name: 'Piecewise Linear',
    pieces: [
      { type: 'linear', m: 2, b: 4, start: -5, end: -1, includeStart: true, includeEnd: true },
      { type: 'linear', m: -1, b: 1, start: -1, end: 3, includeStart: false, includeEnd: true },
      { type: 'linear', m: 0.5, b: -3.5, start: 3, end: 5, includeStart: false, includeEnd: true }
    ]
  }
];
let currentPreset = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth * 0.4;
  originY = drawHeight / 2;

  describe('Piecewise Function Builder: Construct piecewise functions by selecting different rules for different domains.', LABEL);
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
  text('Piecewise Function Builder', canvasWidth / 2, 5);

  // Draw coordinate system
  drawAxes();

  // Draw piecewise function
  drawPiecewiseFunction();

  // Draw function definition panel
  drawDefinitionPanel();

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
    if (x > margin && x < canvasWidth - 180) {
      line(x, 30, x, drawHeight - 20);
    }
    if (y > 30 && y < drawHeight - 20) {
      line(margin, y, canvasWidth - 180, y);
    }
  }

  // Axes
  stroke(0);
  strokeWeight(2);
  line(margin, originY, canvasWidth - 180, originY);
  line(originX, 30, originX, drawHeight - 20);

  // Tick labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = -5; i <= 5; i++) {
    if (i !== 0) {
      let x = originX + i * scale;
      if (x > margin && x < canvasWidth - 180) {
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

function drawPiecewiseFunction() {
  let colors = [
    color(50, 100, 200),
    color(200, 100, 50),
    color(50, 150, 100),
    color(150, 50, 150)
  ];

  for (let i = 0; i < pieces.length; i++) {
    let p = pieces[i];
    let c = colors[i % colors.length];

    stroke(c);
    strokeWeight(3);
    noFill();

    // Draw the function piece
    beginShape();
    for (let x = p.start; x <= p.end; x += 0.05) {
      let y = evaluatePiece(p, x);
      if (!isNaN(y) && isFinite(y)) {
        let sx = originX + x * scale;
        let sy = originY - y * scale;
        if (sx > margin && sx < canvasWidth - 180 && sy > 30 && sy < drawHeight - 20) {
          vertex(sx, sy);
        }
      }
    }
    endShape();

    // Draw endpoints
    let startY = evaluatePiece(p, p.start);
    let endY = evaluatePiece(p, p.end);

    // Start point
    let startSX = originX + p.start * scale;
    let startSY = originY - startY * scale;
    if (startSX > margin && startSX < canvasWidth - 180) {
      stroke(c);
      strokeWeight(2);
      if (p.includeStart) {
        fill(c);
      } else {
        fill('white');
      }
      circle(startSX, startSY, 10);
    }

    // End point
    let endSX = originX + p.end * scale;
    let endSY = originY - endY * scale;
    if (endSX > margin && endSX < canvasWidth - 180) {
      stroke(c);
      strokeWeight(2);
      if (p.includeEnd) {
        fill(c);
      } else {
        fill('white');
      }
      circle(endSX, endSY, 10);
    }
  }
}

function evaluatePiece(p, x) {
  switch (p.type) {
    case 'linear':
      return p.m * x + p.b;
    case 'constant':
      return p.c;
    case 'quadratic':
      return p.a * (x - p.start) * (x - p.start);
    default:
      return 0;
  }
}

function drawDefinitionPanel() {
  let panelX = canvasWidth - 170;
  let panelY = 35;
  let panelW = 160;
  let panelH = drawHeight - 55;

  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('f(x) =', panelX + 10, panelY + 10);

  let colors = [
    color(50, 100, 200),
    color(200, 100, 50),
    color(50, 150, 100),
    color(150, 50, 150)
  ];

  let y = panelY + 35;
  for (let i = 0; i < pieces.length; i++) {
    let p = pieces[i];
    let c = colors[i % colors.length];

    // Colored indicator
    fill(c);
    noStroke();
    rect(panelX + 10, y, 8, 40, 2);

    // Function rule
    fill('black');
    textSize(12);
    let rule = '';
    switch (p.type) {
      case 'linear':
        rule = p.m + 'x' + (p.b >= 0 ? ' + ' : ' - ') + Math.abs(p.b);
        break;
      case 'constant':
        rule = p.c.toString();
        break;
      case 'quadratic':
        rule = p.a + '(x-' + p.start + ')²';
        break;
    }
    text(rule, panelX + 25, y + 5);

    // Domain
    textSize(10);
    let startBracket = p.includeStart ? '[' : '(';
    let endBracket = p.includeEnd ? ']' : ')';
    text('if x ∈ ' + startBracket + p.start + ', ' + p.end + endBracket, panelX + 25, y + 22);

    y += 50;
  }

  // Legend for open/closed dots
  y = panelY + panelH - 45;
  textSize(10);
  fill('black');
  text('Legend:', panelX + 10, y);

  fill(100);
  circle(panelX + 20, y + 18, 8);
  fill('black');
  text('= included', panelX + 30, y + 14);

  fill('white');
  stroke(100);
  strokeWeight(1);
  circle(panelX + 20, y + 32, 8);
  fill('black');
  noStroke();
  text('= excluded', panelX + 30, y + 28);
}

function drawControls() {
  // Preset buttons
  let btnY = drawHeight + 15;
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Presets:', 10, btnY + 12);

  let btnX = 80;
  let btnW = 100;
  let btnH = 28;
  for (let i = 0; i < presets.length; i++) {
    let x = btnX + i * (btnW + 10);
    let isSelected = (i === currentPreset);

    fill(isSelected ? '#2196F3' : '#ddd');
    stroke(isSelected ? '#1565C0' : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(x, btnY, btnW, btnH, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(presets[i].name, x + btnW/2, btnY + btnH/2);
  }

  // Instructions
  let instrY = drawHeight + 55;
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('A piecewise function uses different formulas for different parts of its domain.', 10, instrY);
  text('Filled dots (●) mean the point is included; open dots (○) mean excluded.', 10, instrY + 18);
}

function mousePressed() {
  // Check preset buttons
  let btnY = drawHeight + 15;
  let btnX = 80;
  let btnW = 100;
  let btnH = 28;

  for (let i = 0; i < presets.length; i++) {
    let x = btnX + i * (btnW + 10);
    if (mouseX >= x && mouseX <= x + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
      currentPreset = i;
      pieces = JSON.parse(JSON.stringify(presets[i].pieces));
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
  originX = canvasWidth * 0.35;
}
