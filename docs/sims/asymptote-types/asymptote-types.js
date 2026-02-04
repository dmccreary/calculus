// All Three Asymptote Types MicroSim
// Learning Objective: Students will differentiate between vertical, horizontal,
// and oblique asymptotes by analyzing their defining characteristics.
// Bloom Level: Analyze (L4) - Differentiate

// Canvas dimensions
let canvasWidth = 750;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// View mode: 'panels' or 'compare'
let viewMode = 'panels';

// Asymptote visibility toggles
let showVertical = true;
let showHorizontal = true;
let showOblique = true;

// Zoom level
let zoomLevel = 1.5;
let zoomSlider;

// Panel dimensions (for individual view)
let panelWidth;
let panelMargin = 10;
let panelTop = 50;

// Coordinate scales
let baseScale = 25;

// Example functions for each asymptote type
// Vertical: f(x) = 1/(x-2) has vertical asymptote at x=2
// Horizontal: f(x) = (2x+1)/(x+3) has horizontal asymptote at y=2
// Oblique: f(x) = (x^2-1)/(x-2) has oblique asymptote y=x+2

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  describe('Interactive comparison of three asymptote types: vertical, horizontal, and oblique. Toggle views and zoom to analyze their differences.', LABEL);
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
  textSize(20);
  text('All Three Asymptote Types', canvasWidth / 2, 8);

  // Subtitle
  textSize(14);
  fill(100);
  text('Vertical | Horizontal | Oblique', canvasWidth / 2, 30);

  // Draw based on view mode
  if (viewMode === 'panels') {
    drawIndividualPanels();
  } else {
    drawComparisonView();
  }

  // Draw controls
  drawControls();
}

function drawIndividualPanels() {
  panelWidth = (canvasWidth - 4 * panelMargin) / 3;
  let panelHeight = drawHeight - panelTop - 20;
  let scale = baseScale * zoomLevel;

  // Panel 1: Vertical Asymptote
  drawPanel(panelMargin, panelTop, panelWidth, panelHeight,
            'Vertical', '#E57373', 'x = 2',
            'f(x) = 1/(x-2)',
            (x) => 1 / (x - 2),
            [2], null, null,
            showVertical, scale);

  // Panel 2: Horizontal Asymptote
  drawPanel(panelMargin * 2 + panelWidth, panelTop, panelWidth, panelHeight,
            'Horizontal', '#64B5F6', 'y = 2',
            'f(x) = (2x+1)/(x+3)',
            (x) => (2 * x + 1) / (x + 3),
            [], 2, null,
            showHorizontal, scale);

  // Panel 3: Oblique Asymptote
  drawPanel(panelMargin * 3 + panelWidth * 2, panelTop, panelWidth, panelHeight,
            'Oblique', '#81C784', 'y = x + 2',
            'f(x) = (x^2-1)/(x-2)',
            (x) => (x * x - 1) / (x - 2),
            [2], null, (x) => x + 2,
            showOblique, scale);
}

function drawPanel(px, py, pw, ph, title, color, asymptoteEq, funcLabel, func, vertAsymps, horizAsymp, obliqueFunc, showAsymp, scale) {
  // Panel background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(px, py, pw, ph, 5);

  // Panel title
  fill(color);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text(title + ' Asymptote', px + pw/2, py + 5);

  // Function label
  fill(80);
  textSize(11);
  text(funcLabel, px + pw/2, py + 22);

  // Asymptote equation
  textSize(12);
  fill(color);
  text('Asymptote: ' + asymptoteEq, px + pw/2, py + ph - 18);

  // Set up coordinate system for this panel
  let originX = px + pw / 2;
  let originY = py + ph / 2 + 10;
  let graphWidth = pw - 20;
  let graphHeight = ph - 60;

  // Clip to panel
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(px + 5, py + 40, pw - 10, ph - 60);
  drawingContext.clip();

  // Draw mini grid
  stroke(230);
  strokeWeight(1);
  for (let i = -10; i <= 10; i++) {
    let gx = originX + i * scale;
    let gy = originY - i * scale;
    if (gx > px && gx < px + pw) {
      line(gx, py + 40, gx, py + ph - 20);
    }
    if (gy > py + 40 && gy < py + ph - 20) {
      line(px + 5, gy, px + pw - 5, gy);
    }
  }

  // Draw axes
  stroke(150);
  strokeWeight(1);
  line(px + 5, originY, px + pw - 5, originY);
  line(originX, py + 40, originX, py + ph - 20);

  // Draw asymptotes if enabled
  if (showAsymp) {
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);

    // Vertical asymptotes
    if (vertAsymps.length > 0 && title === 'Vertical') {
      stroke(color);
      for (let va of vertAsymps) {
        let ax = originX + va * scale;
        if (ax > px && ax < px + pw) {
          line(ax, py + 40, ax, py + ph - 20);
        }
      }
    }

    // Horizontal asymptote
    if (horizAsymp !== null) {
      stroke(color);
      let ay = originY - horizAsymp * scale;
      if (ay > py + 40 && ay < py + ph - 20) {
        line(px + 5, ay, px + pw - 5, ay);
      }
    }

    // Oblique asymptote
    if (obliqueFunc !== null) {
      stroke(color);
      let x1 = -10;
      let x2 = 10;
      let y1 = obliqueFunc(x1);
      let y2 = obliqueFunc(x2);
      let sx1 = originX + x1 * scale;
      let sy1 = originY - y1 * scale;
      let sx2 = originX + x2 * scale;
      let sy2 = originY - y2 * scale;
      line(sx1, sy1, sx2, sy2);
    }

    drawingContext.setLineDash([]);
  }

  // Draw function curve
  stroke(50);
  strokeWeight(2);
  noFill();

  // Draw in segments to handle asymptotes
  let segments = [];
  let boundaries = [-10, 10];
  for (let va of vertAsymps) {
    boundaries.push(va - 0.1);
    boundaries.push(va + 0.1);
  }
  boundaries.sort((a, b) => a - b);

  for (let i = 0; i < boundaries.length - 1; i++) {
    if (boundaries[i + 1] - boundaries[i] > 0.2) {
      segments.push({start: boundaries[i], end: boundaries[i + 1]});
    }
  }

  for (let seg of segments) {
    beginShape();
    for (let x = seg.start; x <= seg.end; x += 0.05) {
      let y = func(x);
      if (!isNaN(y) && isFinite(y) && Math.abs(y) < 15) {
        let sx = originX + x * scale;
        let sy = originY - y * scale;
        vertex(sx, sy);
      }
    }
    endShape();
  }

  drawingContext.restore();
}

function drawComparisonView() {
  let scale = baseScale * zoomLevel;
  let originX = canvasWidth / 2;
  let originY = panelTop + (drawHeight - panelTop - 20) / 2 + 10;
  let graphLeft = margin + 20;
  let graphRight = canvasWidth - margin - 20;
  let graphTop = panelTop + 10;
  let graphBottom = drawHeight - 30;

  // Clip to graph area
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(graphLeft, graphTop, graphRight - graphLeft, graphBottom - graphTop);
  drawingContext.clip();

  // Draw grid
  stroke(230);
  strokeWeight(1);
  for (let i = -15; i <= 15; i++) {
    let gx = originX + i * scale;
    let gy = originY - i * scale;
    if (gx > graphLeft && gx < graphRight) {
      line(gx, graphTop, gx, graphBottom);
    }
    if (gy > graphTop && gy < graphBottom) {
      line(graphLeft, gy, graphRight, gy);
    }
  }

  // Draw axes
  stroke(100);
  strokeWeight(2);
  line(graphLeft, originY, graphRight, originY);
  line(originX, graphTop, originX, graphBottom);

  // Axis labels
  fill(80);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = -10; i <= 10; i++) {
    if (i !== 0) {
      let lx = originX + i * scale;
      if (lx > graphLeft + 20 && lx < graphRight - 20) {
        text(i, lx, originY + 3);
      }
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = -10; i <= 10; i++) {
    if (i !== 0) {
      let ly = originY - i * scale;
      if (ly > graphTop + 10 && ly < graphBottom - 10) {
        text(i, originX - 5, ly);
      }
    }
  }

  // Vertical asymptote function: f(x) = 1/(x-2)
  if (showVertical) {
    // Draw asymptote line
    stroke('#E57373');
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    let vax = originX + 2 * scale;
    if (vax > graphLeft && vax < graphRight) {
      line(vax, graphTop, vax, graphBottom);
    }
    drawingContext.setLineDash([]);

    // Draw function
    stroke('#C62828');
    strokeWeight(2);
    noFill();
    // Left of asymptote
    beginShape();
    for (let x = -10; x < 1.9; x += 0.05) {
      let y = 1 / (x - 2);
      if (Math.abs(y) < 15) {
        vertex(originX + x * scale, originY - y * scale);
      }
    }
    endShape();
    // Right of asymptote
    beginShape();
    for (let x = 2.1; x <= 10; x += 0.05) {
      let y = 1 / (x - 2);
      if (Math.abs(y) < 15) {
        vertex(originX + x * scale, originY - y * scale);
      }
    }
    endShape();
  }

  // Horizontal asymptote function: f(x) = (2x+1)/(x+3)
  if (showHorizontal) {
    // Draw asymptote line
    stroke('#64B5F6');
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    let hay = originY - 2 * scale;
    line(graphLeft, hay, graphRight, hay);
    drawingContext.setLineDash([]);

    // Draw function
    stroke('#1565C0');
    strokeWeight(2);
    noFill();
    // Left of vertical asymptote at x=-3
    beginShape();
    for (let x = -10; x < -3.1; x += 0.05) {
      let y = (2 * x + 1) / (x + 3);
      if (Math.abs(y) < 15) {
        vertex(originX + x * scale, originY - y * scale);
      }
    }
    endShape();
    // Right of vertical asymptote
    beginShape();
    for (let x = -2.9; x <= 10; x += 0.05) {
      let y = (2 * x + 1) / (x + 3);
      if (Math.abs(y) < 15) {
        vertex(originX + x * scale, originY - y * scale);
      }
    }
    endShape();
  }

  // Oblique asymptote function: f(x) = (x^2-1)/(x-2)
  if (showOblique) {
    // Draw asymptote line y = x + 2
    stroke('#81C784');
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    let ox1 = -10, oy1 = -10 + 2;
    let ox2 = 10, oy2 = 10 + 2;
    line(originX + ox1 * scale, originY - oy1 * scale,
         originX + ox2 * scale, originY - oy2 * scale);
    drawingContext.setLineDash([]);

    // Draw function
    stroke('#2E7D32');
    strokeWeight(2);
    noFill();
    // Left of vertical asymptote at x=2
    beginShape();
    for (let x = -10; x < 1.9; x += 0.05) {
      let y = (x * x - 1) / (x - 2);
      if (Math.abs(y) < 15) {
        vertex(originX + x * scale, originY - y * scale);
      }
    }
    endShape();
    // Right of vertical asymptote
    beginShape();
    for (let x = 2.1; x <= 10; x += 0.05) {
      let y = (x * x - 1) / (x - 2);
      if (Math.abs(y) < 15) {
        vertex(originX + x * scale, originY - y * scale);
      }
    }
    endShape();
  }

  drawingContext.restore();

  // Draw legend
  drawLegend();
}

function drawLegend() {
  let legendX = margin + 10;
  let legendY = drawHeight - 65;
  let legendW = 200;
  let legendH = 55;

  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(legendX, legendY, legendW, legendH, 5);

  let lx = legendX + 10;
  let ly = legendY + 12;

  // Vertical
  if (showVertical) {
    stroke('#E57373');
    strokeWeight(2);
    drawingContext.setLineDash([4, 3]);
    line(lx, ly, lx + 25, ly);
    drawingContext.setLineDash([]);
    stroke('#C62828');
    line(lx + 30, ly, lx + 50, ly);
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Vertical: x = 2', lx + 55, ly);
  }

  ly += 16;

  // Horizontal
  if (showHorizontal) {
    stroke('#64B5F6');
    strokeWeight(2);
    drawingContext.setLineDash([4, 3]);
    line(lx, ly, lx + 25, ly);
    drawingContext.setLineDash([]);
    stroke('#1565C0');
    line(lx + 30, ly, lx + 50, ly);
    fill(80);
    noStroke();
    textSize(11);
    text('Horizontal: y = 2', lx + 55, ly);
  }

  ly += 16;

  // Oblique
  if (showOblique) {
    stroke('#81C784');
    strokeWeight(2);
    drawingContext.setLineDash([4, 3]);
    line(lx, ly, lx + 25, ly);
    drawingContext.setLineDash([]);
    stroke('#2E7D32');
    line(lx + 30, ly, lx + 50, ly);
    fill(80);
    noStroke();
    textSize(11);
    text('Oblique: y = x + 2', lx + 55, ly);
  }
}

function drawControls() {
  // Row 1: View mode and asymptote toggles
  let btnY = drawHeight + 12;
  let btnH = 28;

  // View mode button
  let viewBtnW = 100;
  let viewBtnX = 15;
  fill(viewMode === 'panels' ? '#9C27B0' : '#7B1FA2');
  stroke('#6A1B9A');
  strokeWeight(1);
  rect(viewBtnX, btnY, viewBtnW, btnH, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(viewMode === 'panels' ? 'Individual' : 'Compare', viewBtnX + viewBtnW/2, btnY + btnH/2);

  // Toggle buttons
  let toggleX = viewBtnX + viewBtnW + 20;
  let toggleW = 85;
  let toggleGap = 8;

  // Vertical toggle
  fill(showVertical ? '#E57373' : '#ddd');
  stroke(showVertical ? '#C62828' : '#999');
  rect(toggleX, btnY, toggleW, btnH, 5);
  fill(showVertical ? 'white' : '#666');
  noStroke();
  textSize(11);
  text('Vertical', toggleX + toggleW/2, btnY + btnH/2);

  // Horizontal toggle
  toggleX += toggleW + toggleGap;
  fill(showHorizontal ? '#64B5F6' : '#ddd');
  stroke(showHorizontal ? '#1565C0' : '#999');
  rect(toggleX, btnY, toggleW, btnH, 5);
  fill(showHorizontal ? 'white' : '#666');
  noStroke();
  text('Horizontal', toggleX + toggleW/2, btnY + btnH/2);

  // Oblique toggle
  toggleX += toggleW + toggleGap;
  fill(showOblique ? '#81C784' : '#ddd');
  stroke(showOblique ? '#2E7D32' : '#999');
  rect(toggleX, btnY, toggleW, btnH, 5);
  fill(showOblique ? 'white' : '#666');
  noStroke();
  text('Oblique', toggleX + toggleW/2, btnY + btnH/2);

  // Row 2: Zoom slider
  let row2Y = drawHeight + 50;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Zoom: ' + zoomLevel.toFixed(1) + 'x', 15, row2Y + 10);

  // Draw slider track
  let sliderX = sliderLeftMargin;
  let sliderW = canvasWidth - sliderLeftMargin - margin;
  let sliderY = row2Y + 10;

  stroke(180);
  strokeWeight(4);
  line(sliderX, sliderY, sliderX + sliderW, sliderY);

  // Slider handle
  let handleX = sliderX + ((zoomLevel - 0.5) / 3.5) * sliderW;
  fill('#2196F3');
  stroke('#1565C0');
  strokeWeight(2);
  circle(handleX, sliderY, 18);

  // Instructions
  fill(100);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(11);
  text('Click buttons to toggle. Drag slider to zoom.', canvasWidth - 15, row2Y + 10);
}

function mousePressed() {
  // Check view mode button
  let btnY = drawHeight + 12;
  let btnH = 28;
  let viewBtnW = 100;
  let viewBtnX = 15;

  if (mouseX >= viewBtnX && mouseX <= viewBtnX + viewBtnW &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    viewMode = (viewMode === 'panels') ? 'compare' : 'panels';
    return;
  }

  // Check toggle buttons
  let toggleX = viewBtnX + viewBtnW + 20;
  let toggleW = 85;
  let toggleGap = 8;

  // Vertical toggle
  if (mouseX >= toggleX && mouseX <= toggleX + toggleW &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    showVertical = !showVertical;
    return;
  }

  // Horizontal toggle
  toggleX += toggleW + toggleGap;
  if (mouseX >= toggleX && mouseX <= toggleX + toggleW &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    showHorizontal = !showHorizontal;
    return;
  }

  // Oblique toggle
  toggleX += toggleW + toggleGap;
  if (mouseX >= toggleX && mouseX <= toggleX + toggleW &&
      mouseY >= btnY && mouseY <= btnY + btnH) {
    showOblique = !showOblique;
    return;
  }
}

function mouseDragged() {
  // Handle zoom slider
  let row2Y = drawHeight + 50;
  let sliderX = sliderLeftMargin;
  let sliderW = canvasWidth - sliderLeftMargin - margin;
  let sliderY = row2Y + 10;

  if (mouseY >= sliderY - 15 && mouseY <= sliderY + 15 &&
      mouseX >= sliderX && mouseX <= sliderX + sliderW) {
    let ratio = (mouseX - sliderX) / sliderW;
    zoomLevel = 0.5 + ratio * 3.5;
    zoomLevel = constrain(zoomLevel, 0.5, 4.0);
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
