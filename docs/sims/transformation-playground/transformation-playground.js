// Transformation Playground MicroSim
// Learning Objective: Students will demonstrate understanding of function
// transformations by manipulating parameters and predicting graph changes.
// Bloom Level: Apply (L3)

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scale = 35;

// Parent functions
let parentFunctions = [
  { name: 'x²', f: x => x * x },
  { name: '|x|', f: x => Math.abs(x) },
  { name: '√x', f: x => x >= 0 ? Math.sqrt(x) : NaN },
  { name: 'sin(x)', f: x => Math.sin(x) },
  { name: 'x³', f: x => x * x * x }
];
let currentParent = 0;

// Transformation parameters
let a = 1;  // Vertical stretch/reflection
let b = 1;  // Horizontal stretch/reflection
let h = 0;  // Horizontal shift
let k = 0;  // Vertical shift

// Slider state
let sliders = [];
let activeSlider = -1;

// Show parent function toggle
let showParent = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth / 2;
  originY = drawHeight / 2 + 30;

  initSliders();

  describe('Transformation Playground: Adjust a, b, h, k parameters to transform parent functions.', LABEL);
}

function initSliders() {
  let sliderY1 = drawHeight + 20;
  let sliderY2 = drawHeight + 55;
  let labelW = 60;
  let sliderW = 120;
  let gap = 30;

  sliders = [
    { label: 'a', value: 1, min: -3, max: 3, step: 0.1, x: labelW, y: sliderY1, w: sliderW },
    { label: 'b', value: 1, min: -3, max: 3, step: 0.1, x: labelW + sliderW + gap + labelW, y: sliderY1, w: sliderW },
    { label: 'h', value: 0, min: -5, max: 5, step: 0.5, x: labelW, y: sliderY2, w: sliderW },
    { label: 'k', value: 0, min: -5, max: 5, step: 0.5, x: labelW + sliderW + gap + labelW, y: sliderY2, w: sliderW }
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
  a = sliders[0].value;
  b = sliders[1].value;
  h = sliders[2].value;
  k = sliders[3].value;

  // Draw coordinate system
  drawAxes();

  // Draw parent function (gray)
  if (showParent) {
    drawParentFunction();
  }

  // Draw transformed function
  drawTransformedFunction();

  // Title and formula
  drawTitle();

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
  for (let i = -5; i <= 5; i++) {
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

function drawParentFunction() {
  let parent = parentFunctions[currentParent];

  stroke(200, 200, 200);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = margin; px < canvasWidth - margin; px += 2) {
    let x = (px - originX) / scale;
    let y = parent.f(x);
    if (!isNaN(y) && isFinite(y) && Math.abs(y) < 20) {
      let sy = originY - y * scale;
      if (sy > 30 && sy < drawHeight - 20) {
        vertex(px, sy);
      }
    }
  }
  endShape();
}

function drawTransformedFunction() {
  let parent = parentFunctions[currentParent];

  stroke(50, 100, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = margin; px < canvasWidth - margin; px += 2) {
    let x = (px - originX) / scale;
    // Apply transformation: a * f(b(x - h)) + k
    let innerX = b * (x - h);
    let y = a * parent.f(innerX) + k;
    if (!isNaN(y) && isFinite(y) && Math.abs(y) < 20) {
      let sy = originY - y * scale;
      if (sy > 30 && sy < drawHeight - 20) {
        vertex(px, sy);
      }
    }
  }
  endShape();
}

function drawTitle() {
  let parent = parentFunctions[currentParent];

  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Transformation Playground', canvasWidth / 2, 5);

  // Formula
  textSize(16);
  let formula = formatFormula(parent.name);
  text(formula, canvasWidth / 2, 28);

  // Legend
  textSize(12);
  textAlign(LEFT, TOP);
  stroke(200);
  strokeWeight(2);
  line(10, 55, 30, 55);
  noStroke();
  fill(150);
  text('Parent: f(x) = ' + parent.name, 35, 50);

  stroke(50, 100, 200);
  strokeWeight(3);
  line(10, 75, 30, 75);
  noStroke();
  fill('black');
  text('Transformed', 35, 70);
}

function formatFormula(parentName) {
  let aStr = a === 1 ? '' : (a === -1 ? '-' : a.toFixed(1));
  let bStr = b === 1 ? '' : (b === -1 ? '-' : b.toFixed(1));
  let hStr = h === 0 ? 'x' : (h > 0 ? '(x - ' + h.toFixed(1) + ')' : '(x + ' + (-h).toFixed(1) + ')');
  let kStr = k === 0 ? '' : (k > 0 ? ' + ' + k.toFixed(1) : ' - ' + (-k).toFixed(1));

  if (b !== 1) {
    hStr = bStr + hStr;
  }

  let innerPart = hStr;
  if (parentName === 'x²') {
    innerPart = '(' + hStr + ')²';
  } else if (parentName === '|x|') {
    innerPart = '|' + hStr + '|';
  } else if (parentName === '√x') {
    innerPart = '√(' + hStr + ')';
  } else if (parentName === 'sin(x)') {
    innerPart = 'sin(' + hStr + ')';
  } else if (parentName === 'x³') {
    innerPart = '(' + hStr + ')³';
  }

  return 'y = ' + aStr + innerPart + kStr;
}

function drawControls() {
  // Sliders
  for (let i = 0; i < sliders.length; i++) {
    drawSlider(sliders[i], i);
  }

  // Parent function selector
  let btnY = drawHeight + 15;
  let btnX = canvasWidth - 250;
  let btnW = 45;
  let btnH = 25;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Parent:', btnX - 50, btnY + btnH/2);

  for (let i = 0; i < parentFunctions.length; i++) {
    let x = btnX + i * (btnW + 3);
    let isSelected = (i === currentParent);

    fill(isSelected ? '#2196F3' : '#ddd');
    stroke(isSelected ? '#1565C0' : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(x, btnY, btnW, btnH, 4);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(parentFunctions[i].name, x + btnW/2, btnY + btnH/2);
  }

  // Reset button
  let resetX = canvasWidth - 60;
  let resetY = drawHeight + 55;
  fill('#f44336');
  stroke('#c62828');
  strokeWeight(1);
  rect(resetX, resetY, 50, 28, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Reset', resetX + 25, resetY + 14);

  // Show parent checkbox
  let cbX = canvasWidth - 250;
  let cbY = drawHeight + 55;
  fill(showParent ? '#2196F3' : 'white');
  stroke('#999');
  strokeWeight(1);
  rect(cbX, cbY + 5, 16, 16, 2);
  if (showParent) {
    stroke('white');
    strokeWeight(2);
    line(cbX + 3, cbY + 13, cbX + 7, cbY + 17);
    line(cbX + 7, cbY + 17, cbX + 13, cbY + 9);
  }
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Show parent', cbX + 22, cbY + 13);
}

function drawSlider(s, index) {
  let handleX = map(s.value, s.min, s.max, s.x, s.x + s.w);

  // Label
  fill('black');
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(14);
  text(s.label + ' = ' + s.value.toFixed(1), s.x - 5, s.y);

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

  // Check parent function buttons
  let btnY = drawHeight + 15;
  let btnX = canvasWidth - 250;
  let btnW = 45;
  let btnH = 25;

  for (let i = 0; i < parentFunctions.length; i++) {
    let x = btnX + i * (btnW + 3);
    if (mouseX >= x && mouseX <= x + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
      currentParent = i;
      return;
    }
  }

  // Check reset button
  let resetX = canvasWidth - 60;
  let resetY = drawHeight + 55;
  if (mouseX >= resetX && mouseX <= resetX + 50 &&
      mouseY >= resetY && mouseY <= resetY + 28) {
    sliders[0].value = 1;  // a
    sliders[1].value = 1;  // b
    sliders[2].value = 0;  // h
    sliders[3].value = 0;  // k
    return;
  }

  // Check show parent checkbox
  let cbX = canvasWidth - 250;
  let cbY = drawHeight + 55;
  if (mouseX >= cbX && mouseX <= cbX + 100 &&
      mouseY >= cbY && mouseY <= cbY + 25) {
    showParent = !showParent;
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
  originX = canvasWidth / 2;
  scale = Math.min(35, (canvasWidth - 2 * margin) / 14);
}
