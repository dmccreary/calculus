// Exponential and Logarithm Relationship MicroSim
// Learning Objective: Students will compare exponential and logarithmic functions,
// recognizing them as inverse functions reflected across y = x.
// Bloom Level: Understand (L2)

let canvasWidth = 600;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scale = 35;

// Parameters
let base = Math.E;
let showLog = true;
let showYEqualsX = true;

// Draggable point
let pointX = 1;
let isDragging = false;

// Slider for base
let sliderX, sliderY, sliderW;
let isDraggingSlider = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth / 2;
  originY = drawHeight / 2 + 20;

  updateSliderPosition();

  describe('Exponential and Logarithm Relationship: See how exp and log are inverse functions reflected across y = x.', LABEL);
}

function updateSliderPosition() {
  sliderX = 100;
  sliderY = drawHeight + 25;
  sliderW = canvasWidth - 250;
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
  text('Exponential & Logarithm Relationship', canvasWidth / 2, 5);

  // Draw coordinate system
  drawAxes();

  // Draw y = x line
  if (showYEqualsX) {
    drawYEqualsX();
  }

  // Draw exponential
  drawExponential();

  // Draw logarithm
  if (showLog) {
    drawLogarithm();
  }

  // Draw corresponding points
  drawCorrespondingPoints();

  // Draw legend
  drawLegend();

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
  for (let i = -4; i <= 4; i++) {
    if (i !== 0) {
      let x = originX + i * scale;
      if (x > margin && x < canvasWidth - margin) {
        text(i, x, originY + 3);
      }
    }
  }
  textAlign(RIGHT, CENTER);
  for (let i = -4; i <= 4; i++) {
    if (i !== 0) {
      let y = originY - i * scale;
      if (y > 30 && y < drawHeight - 20) {
        text(i, originX - 5, y);
      }
    }
  }
}

function drawYEqualsX() {
  stroke(150);
  strokeWeight(1);
  drawingContext.setLineDash([8, 8]);
  line(margin, originY - (margin - originX) / scale * scale,
       canvasWidth - margin, originY - (canvasWidth - margin - originX) / scale * scale);
  drawingContext.setLineDash([]);

  // Label
  fill(100);
  noStroke();
  textSize(12);
  push();
  translate(canvasWidth - margin - 20, 50);
  rotate(-PI/4);
  text('y = x', 0, 0);
  pop();
}

function drawExponential() {
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = margin; px < canvasWidth - margin; px += 2) {
    let x = (px - originX) / scale;
    let y = Math.pow(base, x);
    if (!isNaN(y) && isFinite(y) && y < 15) {
      let sy = originY - y * scale;
      if (sy > 30) {
        vertex(px, sy);
      }
    }
  }
  endShape();
}

function drawLogarithm() {
  stroke(200, 100, 50);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = margin; px < canvasWidth - margin; px += 2) {
    let x = (px - originX) / scale;
    if (x > 0) {
      let y = Math.log(x) / Math.log(base);
      if (!isNaN(y) && isFinite(y) && Math.abs(y) < 15) {
        let sy = originY - y * scale;
        if (sy > 30 && sy < drawHeight - 20) {
          vertex(px, sy);
        }
      }
    }
  }
  endShape();
}

function drawCorrespondingPoints() {
  // Point on exponential: (pointX, base^pointX)
  let expY = Math.pow(base, pointX);

  if (expY < 10) {
    let sx1 = originX + pointX * scale;
    let sy1 = originY - expY * scale;

    // Point on exp
    fill(50, 100, 200);
    stroke(0);
    strokeWeight(2);
    if (sy1 > 30 && sy1 < drawHeight - 20) {
      circle(sx1, sy1, 14);
    }

    // Corresponding point on log: (base^pointX, pointX)
    if (showLog) {
      let sx2 = originX + expY * scale;
      let sy2 = originY - pointX * scale;

      if (sx2 < canvasWidth - margin && sy2 > 30 && sy2 < drawHeight - 20) {
        fill(200, 100, 50);
        circle(sx2, sy2, 14);

        // Reflection line
        stroke(100);
        strokeWeight(1);
        drawingContext.setLineDash([4, 4]);
        line(sx1, sy1, sx2, sy2);
        drawingContext.setLineDash([]);
      }
    }
  }
}

function drawLegend() {
  let legendX = 10;
  let legendY = 35;

  // Exponential
  stroke(50, 100, 200);
  strokeWeight(3);
  line(legendX, legendY, legendX + 25, legendY);
  fill('black');
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  let baseStr = base === Math.E ? 'e' : base.toFixed(1);
  text('y = ' + baseStr + '^x', legendX + 30, legendY);

  // Logarithm
  if (showLog) {
    stroke(200, 100, 50);
    strokeWeight(3);
    line(legendX, legendY + 18, legendX + 25, legendY + 18);
    fill('black');
    noStroke();
    let logStr = base === Math.E ? 'ln(x)' : 'log_' + baseStr + '(x)';
    text('y = ' + logStr, legendX + 30, legendY + 18);
  }
}

function drawInfoPanel() {
  let panelX = canvasWidth - 160;
  let panelY = 35;
  let panelW = 150;
  let panelH = 90;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  let baseStr = base === Math.E ? 'e' : base.toFixed(2);
  text('Base: ' + baseStr, panelX + 10, panelY + 10);

  let expY = Math.pow(base, pointX);
  fill(50, 100, 200);
  text('exp: (' + pointX.toFixed(2) + ', ' + expY.toFixed(2) + ')', panelX + 10, panelY + 30);

  if (showLog && expY < 10) {
    fill(200, 100, 50);
    text('log: (' + expY.toFixed(2) + ', ' + pointX.toFixed(2) + ')', panelX + 10, panelY + 48);
  }

  fill('black');
  textSize(11);
  text('Coordinates swap!', panelX + 10, panelY + 70);
}

function drawControls() {
  // Base slider
  let baseStr = base === Math.E ? 'e ≈ 2.718' : base.toFixed(2);
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Base: ' + baseStr, 10, sliderY);

  let handleX = map(base, 1.5, 4, sliderX, sliderX + sliderW);
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 4, sliderW, 8, 4);
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleX, sliderY, 16);

  // Snap to e button
  let eBtnX = sliderX + sliderW + 15;
  fill(base === Math.E ? '#4CAF50' : '#ddd');
  stroke(base === Math.E ? '#388E3C' : '#999');
  strokeWeight(1);
  rect(eBtnX, sliderY - 14, 60, 28, 5);
  fill(base === Math.E ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Use e', eBtnX + 30, sliderY);

  // Instructions
  fill('black');
  textAlign(RIGHT, CENTER);
  textSize(11);
  text('Drag on exp curve', canvasWidth - 10, sliderY);
}

function mousePressed() {
  // Check slider
  let handleX = map(base, 1.5, 4, sliderX, sliderX + sliderW);
  if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check e button
  let eBtnX = sliderX + sliderW + 15;
  if (mouseX >= eBtnX && mouseX <= eBtnX + 60 &&
      mouseY >= sliderY - 14 && mouseY <= sliderY + 14) {
    base = Math.E;
    return;
  }

  // Check if clicking on exponential curve
  if (mouseY > 30 && mouseY < drawHeight - 20) {
    isDragging = true;
    updatePointFromMouse();
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    base = map(mouseX, sliderX, sliderX + sliderW, 1.5, 4);
    base = constrain(base, 1.5, 4);
    // Snap to e if close
    if (Math.abs(base - Math.E) < 0.1) {
      base = Math.E;
    }
  }

  if (isDragging) {
    updatePointFromMouse();
  }
}

function mouseReleased() {
  isDraggingSlider = false;
  isDragging = false;
}

function updatePointFromMouse() {
  pointX = (mouseX - originX) / scale;
  pointX = constrain(pointX, -3, 3);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateSliderPosition();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  originX = canvasWidth / 2;
  updateSliderPosition();
}
