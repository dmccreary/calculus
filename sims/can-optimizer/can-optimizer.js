// Can Optimizer MicroSim
// Demonstrates optimization: finding optimal can dimensions to minimize surface area for a fixed volume
// Uses p5.js with WEBGL for 3D cylinder visualization
// Canvas-based controls (no DOM elements)
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 750;
let drawHeight = 420;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 20;
let defaultTextSize = 14;

// 3D View area (left side)
let view3DWidth = 280;
let view3DHeight = 250;
let view3DLeft = 20;
let view3DTop = 55;

// Graph area (right side)
let graphLeft, graphRight, graphTop, graphBottom;

// Optimization parameters
let volume = 1000; // cm³
let radius = 5.4; // cm (current radius)
let minRadius = 1;
let maxRadius = 15;

// Calculated values
let height_val = 0;
let topBottomArea = 0;
let lateralArea = 0;
let totalArea = 0;
let optimalRadius = 0;
let minSurfaceArea = 0;

// UI State
let showBreakdown = true;

// Control buttons
let buttons = [];
let radiusSlider = { x: 0, y: 0, w: 200, h: 20, dragging: false };
let volumeInput = { x: 0, y: 0, w: 80, h: 24, value: "1000", active: false };

// Rotation for 3D view
let rotationY = 0;

// Font for WEBGL mode
let myFont;

function preload() {
  myFont = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceSansPro-Regular.otf');
}

function setup() {
  updateCanvasSize();
  var cnv = createCanvas(canvasWidth, canvasHeight, WEBGL);
  var mainElement = document.querySelector('main');
  if (mainElement) {
    cnv.parent(mainElement);
  }

  textFont(myFont);

  // Initialize calculations
  calculateOptimal();
  calculateDimensions();

  describe('Interactive can optimizer showing 3D cylinder and surface area graph. Students explore how radius affects surface area for a fixed volume.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Translate to 2D-like coordinates (WEBGL origin is center)
  translate(-canvasWidth/2, -canvasHeight/2, 0);

  // Background
  background(255);

  // Drawing area
  fill(240, 248, 255); // aliceblue
  stroke(192); // silver
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill(250);
  stroke(192);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(0);
  noStroke();
  textSize(20);
  textAlign(CENTER, TOP);
  text('Can Optimizer: Minimize Surface Area', canvasWidth/2, 8);

  // Subtitle with formula
  textSize(14);
  fill(80);
  text('S(r) = 2πr² + 2V/r  where V = ' + volume + ' cm³', canvasWidth/2, 32);

  // Calculate dimensions with current radius
  calculateDimensions();

  // Draw 3D cylinder view
  draw3DView();

  // Draw graph
  drawGraph();

  // Draw data panel
  drawDataPanel();

  // Draw controls
  drawControls();

  // Update rotation
  rotationY += 0.005;
}

function calculateOptimal() {
  // For S = 2πr² + 2V/r, dS/dr = 4πr - 2V/r² = 0
  // r³ = V/(2π), r = (V/(2π))^(1/3)
  optimalRadius = Math.pow(volume / (2 * PI), 1/3);
  let optimalHeight = volume / (PI * optimalRadius * optimalRadius);
  minSurfaceArea = 2 * PI * optimalRadius * optimalRadius + 2 * PI * optimalRadius * optimalHeight;
}

function calculateDimensions() {
  // h = V / (πr²)
  height_val = volume / (PI * radius * radius);

  // Areas
  topBottomArea = 2 * PI * radius * radius;
  lateralArea = 2 * PI * radius * height_val;
  totalArea = topBottomArea + lateralArea;
}

function surfaceArea(r) {
  if (r <= 0) return Infinity;
  let h = volume / (PI * r * r);
  return 2 * PI * r * r + 2 * PI * r * h;
}

function draw3DView() {
  // 3D view border
  stroke(150);
  strokeWeight(1);
  noFill();
  rect(view3DLeft, view3DTop, view3DWidth, view3DHeight);

  // Label
  fill(0);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('3D Cylinder View', view3DLeft + view3DWidth/2, view3DTop + 5);

  // Push matrix for 3D cylinder
  push();

  // Move to center of 3D view area (z=100 to prevent depth-clipping against 2D panels)
  translate(view3DLeft + view3DWidth/2, view3DTop + view3DHeight/2 + 20, 100);

  // Apply rotation
  rotateX(0.4);
  rotateY(rotationY);

  // Scale for visualization (max display size)
  let maxDisplayRadius = 80;
  let maxDisplayHeight = 180;
  let scaleFactor = min(maxDisplayRadius / max(radius, 1), maxDisplayHeight / max(height_val, 1), 8);

  let displayRadius = radius * scaleFactor;
  let displayHeight = height_val * scaleFactor;

  // Constrain display dimensions
  displayRadius = constrain(displayRadius, 15, maxDisplayRadius);
  displayHeight = constrain(displayHeight, 30, maxDisplayHeight);

  // Draw cylinder
  if (showBreakdown) {
    // Top and bottom circles (blue)
    fill(100, 150, 255, 200);
    stroke(50, 100, 200);
    strokeWeight(1);

    // Top circle
    push();
    translate(0, -displayHeight/2, 0);
    rotateX(HALF_PI);
    ellipse(0, 0, displayRadius * 2, displayRadius * 2);
    pop();

    // Bottom circle
    push();
    translate(0, displayHeight/2, 0);
    rotateX(HALF_PI);
    ellipse(0, 0, displayRadius * 2, displayRadius * 2);
    pop();

    // Lateral surface (orange/red)
    fill(255, 150, 100, 180);
    stroke(200, 100, 50);
    drawCylinderSurface(displayRadius, displayHeight, 24);
  } else {
    // Solid color cylinder
    fill(100, 180, 220, 200);
    stroke(60, 120, 160);
    strokeWeight(1);

    // Top
    push();
    translate(0, -displayHeight/2, 0);
    rotateX(HALF_PI);
    ellipse(0, 0, displayRadius * 2, displayRadius * 2);
    pop();

    // Bottom
    push();
    translate(0, displayHeight/2, 0);
    rotateX(HALF_PI);
    ellipse(0, 0, displayRadius * 2, displayRadius * 2);
    pop();

    // Surface
    drawCylinderSurface(displayRadius, displayHeight, 24);
  }

  pop();

  // Dimension labels (in 2D overlay)
  fill(0);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text('r = ' + radius.toFixed(2) + ' cm', view3DLeft + 10, view3DTop + view3DHeight - 35);
  text('h = ' + height_val.toFixed(2) + ' cm', view3DLeft + 10, view3DTop + view3DHeight - 18);
}

function drawCylinderSurface(r, h, segments) {
  // Draw lateral surface as quad strip
  beginShape(QUAD_STRIP);
  for (let i = 0; i <= segments; i++) {
    let angle = map(i, 0, segments, 0, TWO_PI);
    let x = r * cos(angle);
    let z = r * sin(angle);
    vertex(x, -h/2, z);
    vertex(x, h/2, z);
  }
  endShape();
}

function drawGraph() {
  // Graph area dimensions
  graphLeft = view3DLeft + view3DWidth + 40;
  graphRight = canvasWidth - 40;
  graphTop = 70;
  graphBottom = drawHeight - 60;

  let graphWidth = graphRight - graphLeft;
  let graphHeight = graphBottom - graphTop;

  // Graph background
  fill(255);
  stroke(150);
  strokeWeight(1);
  rect(graphLeft, graphTop, graphWidth, graphHeight);

  // Graph title
  fill(0);
  noStroke();
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('Surface Area S(r) vs Radius', graphLeft + graphWidth/2, graphTop - 5);

  // Axis labels
  textSize(11);
  textAlign(CENTER, TOP);
  text('Radius (cm)', graphLeft + graphWidth/2, graphBottom + 25);

  push();
  translate(graphLeft - 30, graphTop + graphHeight/2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text('Surface Area (cm²)', 0, 0);
  pop();

  // Calculate y-axis range
  let minY = minSurfaceArea * 0.8;
  let maxY = max(surfaceArea(minRadius), surfaceArea(maxRadius), minSurfaceArea * 3);

  // Grid lines
  stroke(230);
  strokeWeight(1);

  // Vertical grid
  for (let r = minRadius; r <= maxRadius; r += 2) {
    let x = map(r, minRadius, maxRadius, graphLeft, graphRight);
    line(x, graphTop, x, graphBottom);
  }

  // Horizontal grid
  let yStep = (maxY - minY) / 5;
  for (let i = 0; i <= 5; i++) {
    let y = map(i, 0, 5, graphBottom, graphTop);
    line(graphLeft, y, graphRight, y);
  }

  // Axis tick labels
  fill(80);
  noStroke();
  textSize(10);

  // X-axis ticks
  textAlign(CENTER, TOP);
  for (let r = minRadius; r <= maxRadius; r += 2) {
    let x = map(r, minRadius, maxRadius, graphLeft, graphRight);
    text(r, x, graphBottom + 3);
  }

  // Y-axis ticks
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 5; i++) {
    let yVal = minY + i * yStep;
    let y = map(yVal, minY, maxY, graphBottom, graphTop);
    text(Math.round(yVal), graphLeft - 5, y);
  }

  // Draw the S(r) curve
  stroke(70, 130, 180);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let r = minRadius; r <= maxRadius; r += 0.1) {
    let sa = surfaceArea(r);
    if (sa < maxY * 1.5) {
      let x = map(r, minRadius, maxRadius, graphLeft, graphRight);
      let y = map(sa, minY, maxY, graphBottom, graphTop);
      y = constrain(y, graphTop, graphBottom);
      vertex(x, y);
    }
  }
  endShape();

  // Mark optimal point
  let optX = map(optimalRadius, minRadius, maxRadius, graphLeft, graphRight);
  let optY = map(minSurfaceArea, minY, maxY, graphBottom, graphTop);

  fill(0, 180, 0);
  noStroke();
  ellipse(optX, optY, 10, 10);

  // Optimal label
  textSize(10);
  textAlign(LEFT, BOTTOM);
  fill(0, 140, 0);
  text('Optimal', optX + 8, optY - 2);
  text('r=' + optimalRadius.toFixed(2), optX + 8, optY + 10);

  // Current radius line
  let currX = map(radius, minRadius, maxRadius, graphLeft, graphRight);
  let currY = map(totalArea, minY, maxY, graphBottom, graphTop);
  currY = constrain(currY, graphTop, graphBottom);

  stroke(220, 50, 50);
  strokeWeight(1);
  dashedLine(currX, graphTop, currX, graphBottom, 5);

  // Current point
  fill(220, 50, 50);
  noStroke();
  ellipse(currX, currY, 8, 8);

  // Current label
  textAlign(CENTER, BOTTOM);
  fill(180, 40, 40);
  textSize(9);
  text('Current', currX, graphTop - 2);
}

function dashedLine(x1, y1, x2, y2, dashLen) {
  let d = dist(x1, y1, x2, y2);
  let steps = floor(d / dashLen);
  for (let i = 0; i < steps; i += 2) {
    let t1 = i / steps;
    let t2 = min((i + 1) / steps, 1);
    line(
      lerp(x1, x2, t1), lerp(y1, y2, t1),
      lerp(x1, x2, t2), lerp(y1, y2, t2)
    );
  }
}

function drawDataPanel() {
  // Data panel on the right side of 3D view
  let panelX = view3DLeft;
  let panelY = view3DTop + view3DHeight + 10;
  let panelW = view3DWidth;
  let panelH = drawHeight - panelY - 10;

  fill(248, 250, 252);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 5);

  fill(0);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);

  let lineHeight = 16;
  let startY = panelY + 8;
  let col1X = panelX + 10;
  let col2X = panelX + panelW/2 + 10;

  // Column 1
  text('Volume: ' + volume.toFixed(0) + ' cm³', col1X, startY);
  text('Radius: ' + radius.toFixed(2) + ' cm', col1X, startY + lineHeight);
  text('Height: ' + height_val.toFixed(2) + ' cm', col1X, startY + lineHeight * 2);

  // Column 2
  if (showBreakdown) {
    fill(80, 130, 200);
    text('Top+Bottom: ' + topBottomArea.toFixed(1) + ' cm²', col2X, startY);
    fill(200, 100, 50);
    text('Lateral: ' + lateralArea.toFixed(1) + ' cm²', col2X, startY + lineHeight);
    fill(0);
  }
  text('Total Area: ' + totalArea.toFixed(1) + ' cm²', col2X, startY + lineHeight * 2);

  // Percentage above minimum
  let pctAbove = ((totalArea - minSurfaceArea) / minSurfaceArea * 100);
  if (pctAbove < 0.1) {
    fill(0, 160, 0);
    text('Optimal!', col1X, startY + lineHeight * 3);
  } else {
    fill(180, 100, 0);
    text('+' + pctAbove.toFixed(1) + '% above min', col1X, startY + lineHeight * 3);
  }
}

function drawControls() {
  let controlY = drawHeight + 15;

  // Row 1: Radius slider
  fill(0);
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Radius:', 20, controlY + 10);

  // Slider track
  radiusSlider.x = 90;
  radiusSlider.y = controlY + 3;
  radiusSlider.w = 180;
  radiusSlider.h = 16;

  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(radiusSlider.x, radiusSlider.y, radiusSlider.w, radiusSlider.h, 8);

  // Slider fill
  let sliderFill = map(radius, minRadius, maxRadius, 0, radiusSlider.w);
  fill(100, 150, 220);
  noStroke();
  rect(radiusSlider.x, radiusSlider.y, sliderFill, radiusSlider.h, 8, 0, 0, 8);

  // Slider handle
  let handleX = radiusSlider.x + sliderFill;
  fill(70, 120, 200);
  stroke(50, 90, 160);
  strokeWeight(2);
  ellipse(handleX, radiusSlider.y + radiusSlider.h/2, 18, 18);

  // Slider value
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  text(radius.toFixed(2) + ' cm', radiusSlider.x + radiusSlider.w + 10, controlY + 10);

  // Row 1: Volume input
  let volumeX = 380;
  text('Volume:', volumeX, controlY + 10);

  volumeInput.x = volumeX + 60;
  volumeInput.y = controlY;
  volumeInput.w = 70;
  volumeInput.h = 22;

  fill(volumeInput.active ? 255 : 248);
  stroke(volumeInput.active ? 100 : 180);
  strokeWeight(volumeInput.active ? 2 : 1);
  rect(volumeInput.x, volumeInput.y, volumeInput.w, volumeInput.h, 3);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(volumeInput.value, volumeInput.x + volumeInput.w/2, volumeInput.y + volumeInput.h/2);

  textAlign(LEFT, CENTER);
  text('cm³', volumeInput.x + volumeInput.w + 5, controlY + 10);

  // Row 2: Buttons
  let row2Y = controlY + 35;

  buttons = [];

  // Show Breakdown toggle
  buttons.push({
    x: 20, y: row2Y, w: 130, h: 28,
    label: showBreakdown ? 'Hide Breakdown' : 'Show Breakdown',
    action: () => { showBreakdown = !showBreakdown; }
  });

  // Find Optimal button
  buttons.push({
    x: 160, y: row2Y, w: 110, h: 28,
    label: 'Find Optimal',
    action: () => {
      radius = optimalRadius;
      calculateDimensions();
    },
    highlight: true
  });

  // Draw buttons
  for (let btn of buttons) {
    // Button background
    if (btn.highlight) {
      fill(70, 140, 70);
    } else {
      fill(100, 140, 200);
    }
    stroke(btn.highlight ? 50 : 70, btn.highlight ? 110 : 110, btn.highlight ? 50 : 170);
    strokeWeight(1);
    rect(btn.x, btn.y, btn.w, btn.h, 5);

    // Button text
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(btn.label, btn.x + btn.w/2, btn.y + btn.h/2);
  }

  // Help text
  textSize(11);
  fill(100);
  textAlign(LEFT, CENTER);
  text('Drag the slider to explore how radius affects surface area. The optimal radius minimizes material used.', 20, row2Y + 45);
}

function mousePressed() {
  // Check volume input click
  if (mouseX > volumeInput.x && mouseX < volumeInput.x + volumeInput.w &&
      mouseY > volumeInput.y && mouseY < volumeInput.y + volumeInput.h) {
    volumeInput.active = true;
    volumeInput.value = '';
    return;
  } else if (volumeInput.active) {
    // Finalize volume input
    let newVol = parseFloat(volumeInput.value);
    if (!isNaN(newVol) && newVol > 0 && newVol < 100000) {
      volume = newVol;
      calculateOptimal();
      calculateDimensions();
    }
    volumeInput.value = volume.toString();
    volumeInput.active = false;
  }

  // Check slider click
  if (mouseX > radiusSlider.x && mouseX < radiusSlider.x + radiusSlider.w &&
      mouseY > radiusSlider.y && mouseY < radiusSlider.y + radiusSlider.h + 10) {
    radiusSlider.dragging = true;
    updateRadiusFromMouse();
    return;
  }

  // Check button clicks
  for (let btn of buttons) {
    if (mouseX > btn.x && mouseX < btn.x + btn.w &&
        mouseY > btn.y && mouseY < btn.y + btn.h) {
      btn.action();
      return;
    }
  }
}

function mouseDragged() {
  if (radiusSlider.dragging) {
    updateRadiusFromMouse();
  }
}

function mouseReleased() {
  radiusSlider.dragging = false;
}

function updateRadiusFromMouse() {
  let sliderX = constrain(mouseX, radiusSlider.x, radiusSlider.x + radiusSlider.w);
  radius = map(sliderX, radiusSlider.x, radiusSlider.x + radiusSlider.w, minRadius, maxRadius);
  radius = constrain(radius, minRadius, maxRadius);
  calculateDimensions();
}

function keyPressed() {
  if (volumeInput.active) {
    if (keyCode === ENTER || keyCode === RETURN) {
      let newVol = parseFloat(volumeInput.value);
      if (!isNaN(newVol) && newVol > 0 && newVol < 100000) {
        volume = newVol;
        calculateOptimal();
        calculateDimensions();
      }
      volumeInput.value = volume.toString();
      volumeInput.active = false;
    } else if (keyCode === BACKSPACE) {
      volumeInput.value = volumeInput.value.slice(0, -1);
    } else if (key >= '0' && key <= '9' || key === '.') {
      if (volumeInput.value.length < 8) {
        volumeInput.value += key;
      }
    }
    return false;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    containerWidth = Math.floor(container.getBoundingClientRect().width);
    canvasWidth = max(containerWidth, 600);
  }
}
