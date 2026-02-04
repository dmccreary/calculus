// Speed Change Analyzer MicroSim
// Visualizes when an object is speeding up vs slowing down based on velocity and acceleration signs
// Bloom Level: Analyze (L4), Verb: analyze, determine, evaluate
// Learning Objective: Students will determine when an object speeds up or slows down

let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 50;
let defaultTextSize = 16;

// Graph regions - three stacked graphs
let graphLeft, graphRight;
let graph1Top, graph1Bottom; // Position
let graph2Top, graph2Bottom; // Velocity
let graph3Top, graph3Bottom; // Acceleration
let graphHeight;

// Animation
let isPlaying = false;
let currentTime = 0;
let animationSpeed = 0.02;
let particleX = 0;

// Time range
let tMin = 0, tMax = 6;

// Position function selection
let currentFunction = 0;
const functions = [
  { name: 'Cubic', display: 's(t) = t^3 - 6t^2 + 9t', formula: 't^3 - 6t^2 + 9t' },
  { name: 'Quadratic', display: 's(t) = -t^2 + 4t', formula: '-t^2 + 4t' },
  { name: 'Sine', display: 's(t) = 3sin(t)', formula: '3sin(t)' },
  { name: 'Polynomial', display: 's(t) = t^4/8 - t^2', formula: 't^4/8 - t^2' }
];

// Toggle states
let showSignTable = true;

// Control positions
let sliderX, sliderY, sliderW;
let playBtnX, playBtnY, playBtnW, playBtnH;
let funcBtnsX, funcBtnsY;
let toggleBtnX, toggleBtnY;
let isDraggingSlider = false;

// Colors
const speedUpColor = [76, 175, 80, 80]; // Green with transparency
const slowDownColor = [244, 67, 54, 80]; // Red with transparency
const positionColor = [30, 136, 229]; // Blue
const velocityColor = [255, 152, 0]; // Orange
const accelColor = [156, 39, 176]; // Purple

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayoutPositions();

  describe('Interactive visualization showing when an object speeds up or slows down based on velocity and acceleration signs. Three graphs show position, velocity, and acceleration with color-coded regions.', LABEL);
}

function updateLayoutPositions() {
  // Graph positioning
  graphLeft = margin + 55;
  graphRight = canvasWidth - margin - 10;

  // Three graphs stacked vertically
  let totalGraphHeight = drawHeight - chartTop - 30;
  graphHeight = totalGraphHeight / 3 - 15;

  graph1Top = chartTop + 5;
  graph1Bottom = graph1Top + graphHeight;

  graph2Top = graph1Bottom + 20;
  graph2Bottom = graph2Top + graphHeight;

  graph3Top = graph2Bottom + 20;
  graph3Bottom = graph3Top + graphHeight;

  // Control positions
  sliderX = 90;
  sliderY = drawHeight + 25;
  sliderW = canvasWidth - 420;

  playBtnX = canvasWidth - 310;
  playBtnY = drawHeight + 10;
  playBtnW = 70;
  playBtnH = 32;

  funcBtnsX = 10;
  funcBtnsY = drawHeight + 55;

  toggleBtnX = canvasWidth - 220;
  toggleBtnY = drawHeight + 10;
}

function draw() {
  updateCanvasSize();

  // Animation update
  if (isPlaying) {
    currentTime += animationSpeed;
    if (currentTime > tMax) {
      currentTime = tMin;
    }
  }

  // Drawing area background
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

  // Draw color-coded regions on all graphs
  drawSpeedRegions();

  // Draw all three graphs
  drawPositionGraph();
  drawVelocityGraph();
  drawAccelerationGraph();

  // Draw current time line
  drawCurrentTimeLine();

  // Draw animated particle (on position graph)
  drawParticle();

  // Draw sign comparison table
  if (showSignTable) {
    drawSignTable();
  }

  // Draw controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Speed Change Analyzer', canvasWidth / 2, 5);
  textSize(13);
  fill(80);
  text(functions[currentFunction].display, canvasWidth / 2, 26);
}

// Position function and derivatives
function position(t) {
  switch (currentFunction) {
    case 0: return Math.pow(t, 3) - 6 * Math.pow(t, 2) + 9 * t; // Cubic
    case 1: return -Math.pow(t, 2) + 4 * t; // Quadratic
    case 2: return 3 * Math.sin(t); // Sine
    case 3: return Math.pow(t, 4) / 8 - Math.pow(t, 2); // Polynomial
    default: return 0;
  }
}

function velocity(t) {
  switch (currentFunction) {
    case 0: return 3 * Math.pow(t, 2) - 12 * t + 9; // 3t^2 - 12t + 9
    case 1: return -2 * t + 4; // -2t + 4
    case 2: return 3 * Math.cos(t); // 3cos(t)
    case 3: return Math.pow(t, 3) / 2 - 2 * t; // t^3/2 - 2t
    default: return 0;
  }
}

function acceleration(t) {
  switch (currentFunction) {
    case 0: return 6 * t - 12; // 6t - 12
    case 1: return -2; // -2
    case 2: return -3 * Math.sin(t); // -3sin(t)
    case 3: return 1.5 * Math.pow(t, 2) - 2; // 3t^2/2 - 2
    default: return 0;
  }
}

// Calculate appropriate y-range for each function type
function getYRange(funcType) {
  switch (currentFunction) {
    case 0: return { pos: [-2, 6], vel: [-4, 10], acc: [-15, 25] };
    case 1: return { pos: [-2, 5], vel: [-10, 6], acc: [-4, 1] };
    case 2: return { pos: [-4, 4], vel: [-4, 4], acc: [-4, 4] };
    case 3: return { pos: [-2, 6], vel: [-3, 5], acc: [-3, 6] };
    default: return { pos: [-5, 5], vel: [-5, 5], acc: [-5, 5] };
  }
}

function drawSpeedRegions() {
  let ranges = getYRange(currentFunction);

  // Draw colored regions on all three graphs
  let graphs = [
    { top: graph1Top, bottom: graph1Bottom, yRange: ranges.pos },
    { top: graph2Top, bottom: graph2Bottom, yRange: ranges.vel },
    { top: graph3Top, bottom: graph3Bottom, yRange: ranges.acc }
  ];

  // Sample through time to find regions
  let step = 0.02;
  for (let t = tMin; t < tMax; t += step) {
    let v = velocity(t);
    let a = acceleration(t);

    // Determine if speeding up or slowing down
    let speedingUp = (v > 0 && a > 0) || (v < 0 && a < 0);

    let x1 = map(t, tMin, tMax, graphLeft, graphRight);
    let x2 = map(t + step, tMin, tMax, graphLeft, graphRight);

    noStroke();
    if (speedingUp) {
      fill(speedUpColor[0], speedUpColor[1], speedUpColor[2], speedUpColor[3]);
    } else {
      fill(slowDownColor[0], slowDownColor[1], slowDownColor[2], slowDownColor[3]);
    }

    // Draw on all three graphs
    for (let g of graphs) {
      rect(x1, g.top, x2 - x1 + 1, g.bottom - g.top);
    }
  }
}

function drawPositionGraph() {
  let ranges = getYRange(currentFunction);
  let yMin = ranges.pos[0], yMax = ranges.pos[1];

  // Label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  push();
  translate(margin - 5, (graph1Top + graph1Bottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Position', 0, 0);
  pop();

  // Draw axes and grid
  drawGraphAxes(graph1Top, graph1Bottom, yMin, yMax, 's(t)');

  // Draw position curve
  stroke(positionColor[0], positionColor[1], positionColor[2]);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px++) {
    let t = map(px, graphLeft, graphRight, tMin, tMax);
    let s = position(t);
    let py = map(s, yMin, yMax, graph1Bottom, graph1Top);
    if (py >= graph1Top - 5 && py <= graph1Bottom + 5) {
      vertex(px, constrain(py, graph1Top, graph1Bottom));
    }
  }
  endShape();
}

function drawVelocityGraph() {
  let ranges = getYRange(currentFunction);
  let yMin = ranges.vel[0], yMax = ranges.vel[1];

  // Label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  push();
  translate(margin - 5, (graph2Top + graph2Bottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Velocity', 0, 0);
  pop();

  // Draw axes and grid
  drawGraphAxes(graph2Top, graph2Bottom, yMin, yMax, 'v(t)');

  // Draw velocity curve
  stroke(velocityColor[0], velocityColor[1], velocityColor[2]);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px++) {
    let t = map(px, graphLeft, graphRight, tMin, tMax);
    let v = velocity(t);
    let py = map(v, yMin, yMax, graph2Bottom, graph2Top);
    if (py >= graph2Top - 5 && py <= graph2Bottom + 5) {
      vertex(px, constrain(py, graph2Top, graph2Bottom));
    }
  }
  endShape();
}

function drawAccelerationGraph() {
  let ranges = getYRange(currentFunction);
  let yMin = ranges.acc[0], yMax = ranges.acc[1];

  // Label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  push();
  translate(margin - 5, (graph3Top + graph3Bottom) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Acceleration', 0, 0);
  pop();

  // Draw axes and grid
  drawGraphAxes(graph3Top, graph3Bottom, yMin, yMax, 'a(t)');

  // Draw acceleration curve
  stroke(accelColor[0], accelColor[1], accelColor[2]);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = graphLeft; px <= graphRight; px++) {
    let t = map(px, graphLeft, graphRight, tMin, tMax);
    let a = acceleration(t);
    let py = map(a, yMin, yMax, graph3Bottom, graph3Top);
    if (py >= graph3Top - 5 && py <= graph3Bottom + 5) {
      vertex(px, constrain(py, graph3Top, graph3Bottom));
    }
  }
  endShape();
}

function drawGraphAxes(top, bottom, yMin, yMax, label) {
  // Grid
  stroke(220);
  strokeWeight(1);

  // Vertical grid lines
  for (let t = Math.ceil(tMin); t <= tMax; t++) {
    let x = map(t, tMin, tMax, graphLeft, graphRight);
    line(x, top, x, bottom);
  }

  // Horizontal grid lines
  let yStep = (yMax - yMin) / 4;
  for (let i = 0; i <= 4; i++) {
    let y = map(i, 0, 4, bottom, top);
    line(graphLeft, y, graphRight, y);
  }

  // X-axis (y=0)
  let y0 = map(0, yMin, yMax, bottom, top);
  if (y0 > top && y0 < bottom) {
    stroke(150);
    strokeWeight(1.5);
    line(graphLeft, y0, graphRight, y0);
  }

  // Y-axis (left edge)
  stroke(100);
  strokeWeight(1);
  line(graphLeft, top, graphLeft, bottom);

  // Y-axis labels
  fill(80);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(9);
  for (let i = 0; i <= 4; i++) {
    let val = yMin + (yMax - yMin) * i / 4;
    let y = map(val, yMin, yMax, bottom, top);
    text(val.toFixed(1), graphLeft - 3, y);
  }

  // Function label
  textAlign(LEFT, TOP);
  textSize(11);
  text(label, graphLeft + 5, top + 3);
}

function drawCurrentTimeLine() {
  let x = map(currentTime, tMin, tMax, graphLeft, graphRight);

  stroke(100, 100, 100);
  strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  line(x, graph1Top, x, graph3Bottom);
  drawingContext.setLineDash([]);

  // Time label at bottom
  fill(60);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(10);
  text('t = ' + currentTime.toFixed(2), x, graph3Bottom + 2);
}

function drawParticle() {
  let ranges = getYRange(currentFunction);
  let x = map(currentTime, tMin, tMax, graphLeft, graphRight);
  let s = position(currentTime);
  let y = map(s, ranges.pos[0], ranges.pos[1], graph1Bottom, graph1Top);

  // Constrain to graph area
  y = constrain(y, graph1Top, graph1Bottom);

  // Get velocity and acceleration for this moment
  let v = velocity(currentTime);
  let a = acceleration(currentTime);
  let speedingUp = (v > 0 && a > 0) || (v < 0 && a < 0);

  // Particle size based on speed magnitude
  let speedMag = Math.abs(v);
  let maxSpeed = Math.max(...[0, 1, 2, 3, 4, 5, 6].map(t => Math.abs(velocity(t))));
  let particleSize = map(speedMag, 0, maxSpeed, 12, 28);

  // Color based on speeding up or slowing down
  if (speedingUp) {
    fill(76, 175, 80); // Green
    stroke(56, 142, 60);
  } else {
    fill(244, 67, 54); // Red
    stroke(211, 47, 47);
  }
  strokeWeight(2);
  circle(x, y, particleSize);

  // Direction arrow inside particle
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  if (v > 0.1) {
    text('\u25B6', x, y); // Right arrow
  } else if (v < -0.1) {
    text('\u25C0', x, y); // Left arrow
  } else {
    text('\u25CF', x, y); // Dot for near-zero velocity
  }

  // Also mark current points on velocity and acceleration graphs
  let vy = map(v, ranges.vel[0], ranges.vel[1], graph2Bottom, graph2Top);
  let ay = map(a, ranges.acc[0], ranges.acc[1], graph3Bottom, graph3Top);

  vy = constrain(vy, graph2Top, graph2Bottom);
  ay = constrain(ay, graph3Top, graph3Bottom);

  // Velocity point
  fill(velocityColor[0], velocityColor[1], velocityColor[2]);
  stroke(255);
  strokeWeight(2);
  circle(x, vy, 12);

  // Acceleration point
  fill(accelColor[0], accelColor[1], accelColor[2]);
  circle(x, ay, 12);
}

function drawSignTable() {
  let tableX = canvasWidth - 180;
  let tableY = graph1Top + 10;
  let tableW = 165;
  let tableH = 110;

  // Background
  fill(255, 255, 255, 240);
  stroke(150);
  strokeWeight(1);
  rect(tableX, tableY, tableW, tableH, 8);

  // Get current values
  let v = velocity(currentTime);
  let a = acceleration(currentTime);
  let speedingUp = (v > 0 && a > 0) || (v < 0 && a < 0);

  // Title
  fill(40);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Sign Comparison', tableX + tableW/2, tableY + 6);
  textStyle(NORMAL);

  // Values
  textAlign(LEFT, TOP);
  textSize(13);

  // Velocity row
  fill(velocityColor[0], velocityColor[1], velocityColor[2]);
  text('v(t) = ' + v.toFixed(2), tableX + 10, tableY + 28);
  fill(60);
  textAlign(RIGHT, TOP);
  text(v >= 0 ? '(+)' : '(-)', tableX + tableW - 10, tableY + 28);

  // Acceleration row
  textAlign(LEFT, TOP);
  fill(accelColor[0], accelColor[1], accelColor[2]);
  text('a(t) = ' + a.toFixed(2), tableX + 10, tableY + 48);
  fill(60);
  textAlign(RIGHT, TOP);
  text(a >= 0 ? '(+)' : '(-)', tableX + tableW - 10, tableY + 48);

  // Divider
  stroke(200);
  strokeWeight(1);
  line(tableX + 10, tableY + 68, tableX + tableW - 10, tableY + 68);

  // Result
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  textStyle(BOLD);
  if (speedingUp) {
    fill(76, 175, 80);
    text('SPEEDING UP', tableX + tableW/2, tableY + 75);
  } else {
    fill(244, 67, 54);
    text('SLOWING DOWN', tableX + tableW/2, tableY + 75);
  }
  textStyle(NORMAL);

  // Explanation
  textSize(10);
  fill(100);
  if (speedingUp) {
    text('Same signs: |v| increases', tableX + tableW/2, tableY + 94);
  } else {
    text('Opposite signs: |v| decreases', tableX + tableW/2, tableY + 94);
  }
}

function drawControls() {
  // Time slider label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('t = ' + currentTime.toFixed(2), 10, sliderY);

  // Slider track
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 5, sliderW, 10, 5);

  // Slider handle
  let handleX = map(currentTime, tMin, tMax, sliderX, sliderX + sliderW);
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(handleX, sliderY, 20);

  // Play/Pause button
  fill(isPlaying ? '#f44336' : '#4CAF50');
  stroke(isPlaying ? '#d32f2f' : '#388E3C');
  strokeWeight(1);
  rect(playBtnX, playBtnY, playBtnW, playBtnH, 6);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(isPlaying ? 'Pause' : 'Play', playBtnX + playBtnW/2, playBtnY + playBtnH/2);

  // Show/Hide Sign Table button
  fill(showSignTable ? '#2196F3' : '#9E9E9E');
  stroke(showSignTable ? '#1976D2' : '#757575');
  strokeWeight(1);
  rect(toggleBtnX, toggleBtnY, 80, playBtnH, 6);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(showSignTable ? 'Hide Table' : 'Show Table', toggleBtnX + 40, toggleBtnY + playBtnH/2);

  // Function selector buttons
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Position:', funcBtnsX, funcBtnsY + 14);

  let btnStartX = funcBtnsX + 60;
  let btnW = 85;
  for (let i = 0; i < functions.length; i++) {
    let bx = btnStartX + i * (btnW + 5);

    fill(currentFunction === i ? '#673AB7' : '#e0e0e0');
    stroke(currentFunction === i ? '#512DA8' : '#bdbdbd');
    strokeWeight(1);
    rect(bx, funcBtnsY, btnW, 28, 5);

    fill(currentFunction === i ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(functions[i].name, bx + btnW/2, funcBtnsY + 14);
  }

  // Legend
  let legendX = canvasWidth - 200;
  let legendY = funcBtnsY;

  fill(speedUpColor[0], speedUpColor[1], speedUpColor[2], 180);
  stroke(76, 175, 80);
  strokeWeight(1);
  rect(legendX, legendY, 16, 12, 2);
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Speeding Up', legendX + 22, legendY + 6);

  fill(slowDownColor[0], slowDownColor[1], slowDownColor[2], 180);
  stroke(244, 67, 54);
  strokeWeight(1);
  rect(legendX + 95, legendY, 16, 12, 2);
  fill(60);
  noStroke();
  text('Slowing Down', legendX + 117, legendY + 6);
}

function mousePressed() {
  // Check slider handle
  let handleX = map(currentTime, tMin, tMax, sliderX, sliderX + sliderW);
  if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
    isDraggingSlider = true;
    isPlaying = false;
    return;
  }

  // Check slider track
  if (mouseY > sliderY - 12 && mouseY < sliderY + 12 &&
      mouseX > sliderX && mouseX < sliderX + sliderW) {
    currentTime = map(mouseX, sliderX, sliderX + sliderW, tMin, tMax);
    currentTime = constrain(currentTime, tMin, tMax);
    isDraggingSlider = true;
    isPlaying = false;
    return;
  }

  // Check play/pause button
  if (mouseX >= playBtnX && mouseX <= playBtnX + playBtnW &&
      mouseY >= playBtnY && mouseY <= playBtnY + playBtnH) {
    isPlaying = !isPlaying;
    return;
  }

  // Check show/hide table button
  if (mouseX >= toggleBtnX && mouseX <= toggleBtnX + 80 &&
      mouseY >= toggleBtnY && mouseY <= toggleBtnY + playBtnH) {
    showSignTable = !showSignTable;
    return;
  }

  // Check function selector buttons
  let btnStartX = funcBtnsX + 60;
  let btnW = 85;
  for (let i = 0; i < functions.length; i++) {
    let bx = btnStartX + i * (btnW + 5);
    if (mouseX >= bx && mouseX <= bx + btnW &&
        mouseY >= funcBtnsY && mouseY <= funcBtnsY + 28) {
      currentFunction = i;
      currentTime = tMin;
      return;
    }
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    currentTime = map(mouseX, sliderX, sliderX + sliderW, tMin, tMax);
    currentTime = constrain(currentTime, tMin, tMax);
    currentTime = Math.round(currentTime * 100) / 100;
  }
}

function mouseReleased() {
  isDraggingSlider = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayoutPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = Math.max(canvasWidth, 600); // Minimum width
  updateLayoutPositions();
}
