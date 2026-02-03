// Trig Graph Transformer MicroSim
// Learning Objective: Students will demonstrate understanding of amplitude,
// period, phase shift, and vertical shift by manipulating parameters.
// Bloom Level: Apply (L3)

let canvasWidth = 750;
let drawHeight = 400;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scaleX, scaleY;

// Transformation parameters
let A = 1;  // Amplitude
let B = 1;  // Period modifier (period = 2π/B)
let C = 0;  // Phase shift
let D = 0;  // Vertical shift

// Current function
let currentFunc = 0; // 0: sin, 1: cos, 2: tan

// Slider state
let sliders = [];
let activeSlider = -1;

// Show parent
let showParent = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = margin;
  originY = drawHeight / 2;
  scaleX = (canvasWidth - 2 * margin) / (4 * PI);
  scaleY = 60;

  initSliders();

  describe('Trig Graph Transformer: Adjust amplitude, period, phase shift, and vertical shift for trig functions.', LABEL);
}

function initSliders() {
  let row1Y = drawHeight + 25;
  let row2Y = drawHeight + 65;
  let labelW = 50;
  let sliderW = 120;

  sliders = [
    { label: 'A', desc: 'Amplitude', value: 1, min: 0.5, max: 3, step: 0.1, x: labelW + 60, y: row1Y, w: sliderW },
    { label: 'B', desc: 'Frequency', value: 1, min: 0.5, max: 4, step: 0.5, x: labelW + 60 + sliderW + 100, y: row1Y, w: sliderW },
    { label: 'C', desc: 'Phase', value: 0, min: -PI, max: PI, step: 0.1, x: labelW + 60, y: row2Y, w: sliderW },
    { label: 'D', desc: 'Vertical', value: 0, min: -2, max: 2, step: 0.1, x: labelW + 60 + sliderW + 100, y: row2Y, w: sliderW }
  ];
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

  // Read slider values
  A = sliders[0].value;
  B = sliders[1].value;
  C = sliders[2].value;
  D = sliders[3].value;

  // Draw coordinate system
  drawAxes();

  // Draw parent function (gray)
  if (showParent) {
    drawParentFunction();
  }

  // Draw transformed function
  drawTransformedFunction();

  // Draw title and formula
  drawTitle();

  // Draw measurement annotations
  drawAnnotations();

  // Draw controls
  drawControls();
}

function drawAxes() {
  // Grid
  stroke(230);
  strokeWeight(1);

  // Vertical grid lines at multiples of π/2
  for (let i = 0; i <= 8; i++) {
    let x = originX + i * (PI / 2) * scaleX;
    if (x <= canvasWidth - margin) {
      line(x, 30, x, drawHeight - 20);
    }
  }

  // Horizontal grid lines
  for (let i = -3; i <= 3; i++) {
    let y = originY - i * scaleY;
    if (y > 30 && y < drawHeight - 20) {
      line(margin, y, canvasWidth - margin, y);
    }
  }

  // Axes
  stroke(0);
  strokeWeight(2);
  line(margin, originY, canvasWidth - margin, originY);
  line(margin, 30, margin, drawHeight - 20);

  // X-axis labels
  fill('black');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  let xLabels = ['0', 'π/2', 'π', '3π/2', '2π', '5π/2', '3π', '7π/2', '4π'];
  for (let i = 0; i < xLabels.length; i++) {
    let x = originX + i * (PI / 2) * scaleX;
    if (x <= canvasWidth - margin) {
      text(xLabels[i], x, originY + 5);
    }
  }

  // Y-axis labels
  textAlign(RIGHT, CENTER);
  for (let i = -3; i <= 3; i++) {
    if (i !== 0) {
      let y = originY - i * scaleY;
      if (y > 30 && y < drawHeight - 20) {
        text(i, margin - 5, y);
      }
    }
  }
}

function drawParentFunction() {
  stroke(200);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let px = margin; px <= canvasWidth - margin; px += 2) {
    let x = (px - originX) / scaleX;
    let y = getParentValue(x);
    if (!isNaN(y) && isFinite(y) && Math.abs(y) < 10) {
      let sy = originY - y * scaleY;
      vertex(px, sy);
    }
  }
  endShape();
}

function drawTransformedFunction() {
  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();

  beginShape();
  for (let px = margin; px <= canvasWidth - margin; px += 2) {
    let x = (px - originX) / scaleX;
    // y = A * f(B*x + C) + D
    let innerX = B * x + C;
    let y = A * getParentValue(innerX) + D;
    if (!isNaN(y) && isFinite(y) && Math.abs(y) < 10) {
      let sy = originY - y * scaleY;
      vertex(px, sy);
    }
  }
  endShape();
}

function getParentValue(x) {
  switch(currentFunc) {
    case 0: return sin(x);
    case 1: return cos(x);
    case 2: return tan(x);
    default: return sin(x);
  }
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Trig Graph Transformer', canvasWidth / 2, 5);

  // Formula
  textSize(14);
  let funcName = currentFunc === 0 ? 'sin' : (currentFunc === 1 ? 'cos' : 'tan');
  let formula = 'y = ' + A.toFixed(1) + ' · ' + funcName + '(' + B.toFixed(1) + 'x';
  if (C >= 0) formula += ' + ' + C.toFixed(1);
  else formula += ' - ' + (-C).toFixed(1);
  formula += ')';
  if (D >= 0) formula += ' + ' + D.toFixed(1);
  else formula += ' - ' + (-D).toFixed(1);

  text(formula, canvasWidth / 2, 28);
}

function drawAnnotations() {
  // Amplitude indicator
  if (A !== 1) {
    let midX = originX + PI * scaleX;
    let topY = originY - (A + D) * scaleY;
    let bottomY = originY - (-A + D) * scaleY;
    let midlineY = originY - D * scaleY;

    stroke(255, 100, 100);
    strokeWeight(2);
    // Amplitude arrows
    line(midX - 20, midlineY, midX - 20, topY);
    line(midX - 25, topY + 10, midX - 20, topY);
    line(midX - 15, topY + 10, midX - 20, topY);

    fill(255, 100, 100);
    noStroke();
    textSize(12);
    textAlign(RIGHT, CENTER);
    text('A=' + A.toFixed(1), midX - 25, (midlineY + topY) / 2);
  }

  // Period indicator
  let period = 2 * PI / B;
  let periodPx = period * scaleX;
  if (periodPx < canvasWidth - 2 * margin) {
    let y = originY + D * scaleY + 30;
    stroke(100, 200, 100);
    strokeWeight(2);
    line(originX, y, originX + periodPx, y);
    // End caps
    line(originX, y - 5, originX, y + 5);
    line(originX + periodPx, y - 5, originX + periodPx, y + 5);

    fill(100, 200, 100);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Period = 2π/' + B.toFixed(1), originX + periodPx / 2, y + 5);
  }

  // Midline indicator
  if (D !== 0) {
    let midlineY = originY - D * scaleY;
    stroke(100, 100, 255);
    strokeWeight(1);
    drawingContext.setLineDash([6, 6]);
    line(margin, midlineY, canvasWidth - margin, midlineY);
    drawingContext.setLineDash([]);

    fill(100, 100, 255);
    noStroke();
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text('Midline y=' + D.toFixed(1), margin + 5, midlineY - 3);
  }
}

function drawControls() {
  // Sliders
  for (let i = 0; i < sliders.length; i++) {
    drawSlider(sliders[i], i);
  }

  // Function selector
  let funcY = drawHeight + 105;
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Function:', 10, funcY);

  let funcs = ['sin', 'cos', 'tan'];
  let btnW = 50;
  let btnH = 28;
  let btnX = 80;

  for (let i = 0; i < funcs.length; i++) {
    let x = btnX + i * (btnW + 10);
    let isSelected = (i === currentFunc);

    fill(isSelected ? '#2196F3' : '#ddd');
    stroke(isSelected ? '#1565C0' : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(x, funcY - btnH/2, btnW, btnH, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(funcs[i], x + btnW/2, funcY);
  }

  // Show parent checkbox
  let cbX = 260;
  fill(showParent ? '#2196F3' : 'white');
  stroke('#999');
  strokeWeight(1);
  rect(cbX, funcY - 8, 16, 16, 2);
  if (showParent) {
    stroke('white');
    strokeWeight(2);
    line(cbX + 3, funcY, cbX + 7, funcY + 4);
    line(cbX + 7, funcY + 4, cbX + 13, funcY - 4);
  }
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Show parent', cbX + 22, funcY);

  // Reset button
  let resetX = canvasWidth - 70;
  fill('#f44336');
  stroke('#c62828');
  strokeWeight(1);
  rect(resetX, funcY - btnH/2, 60, btnH, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Reset', resetX + 30, funcY);
}

function drawSlider(s, index) {
  let handleX = map(s.value, s.min, s.max, s.x, s.x + s.w);

  // Label
  fill('black');
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(14);
  text(s.label + ' (' + s.desc + '):', s.x - 10, s.y);

  // Value
  textAlign(LEFT, CENTER);
  let valStr = s.label === 'C' ? (s.value / PI).toFixed(1) + 'π' : s.value.toFixed(1);
  text(valStr, s.x + s.w + 10, s.y);

  // Track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(s.x, s.y - 4, s.w, 8, 4);

  // Handle
  fill(activeSlider === index ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleX, s.y, 16);
}

function mousePressed() {
  // Check sliders
  for (let i = 0; i < sliders.length; i++) {
    let s = sliders[i];
    let handleX = map(s.value, s.min, s.max, s.x, s.x + s.w);
    if (dist(mouseX, mouseY, handleX, s.y) < 15) {
      activeSlider = i;
      return;
    }
  }

  // Check function buttons
  let funcY = drawHeight + 105;
  let btnW = 50;
  let btnH = 28;
  let btnX = 80;

  for (let i = 0; i < 3; i++) {
    let x = btnX + i * (btnW + 10);
    if (mouseX >= x && mouseX <= x + btnW &&
        mouseY >= funcY - btnH/2 && mouseY <= funcY + btnH/2) {
      currentFunc = i;
      return;
    }
  }

  // Check show parent checkbox
  let cbX = 260;
  if (mouseX >= cbX && mouseX <= cbX + 100 &&
      mouseY >= funcY - 10 && mouseY <= funcY + 10) {
    showParent = !showParent;
    return;
  }

  // Check reset button
  let resetX = canvasWidth - 70;
  if (mouseX >= resetX && mouseX <= resetX + 60 &&
      mouseY >= funcY - btnH/2 && mouseY <= funcY + btnH/2) {
    sliders[0].value = 1;  // A
    sliders[1].value = 1;  // B
    sliders[2].value = 0;  // C
    sliders[3].value = 0;  // D
  }
}

function mouseDragged() {
  if (activeSlider >= 0) {
    let s = sliders[activeSlider];
    let newVal = map(mouseX, s.x, s.x + s.w, s.min, s.max);
    newVal = constrain(newVal, s.min, s.max);
    newVal = Math.round(newVal / s.step) * s.step;
    s.value = newVal;
  }
}

function mouseReleased() {
  activeSlider = -1;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  scaleX = (canvasWidth - 2 * margin) / (4 * PI);
}
