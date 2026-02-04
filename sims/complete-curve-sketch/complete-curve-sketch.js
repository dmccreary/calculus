// Complete Curve Sketch MicroSim
// Learning Objective: Students will demonstrate the complete curve sketching process
// by building the graph step-by-step, adding each feature one at a time.
// Bloom Level: Apply (L3)

let canvasWidth = 750;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Coordinate system
let originX, originY;
let scale = 35;

// Step tracking
let currentStep = 0;
const maxSteps = 8;
const stepNames = [
  "Draw axes & domain",
  "Plot intercepts",
  "Vertical asymptotes",
  "Horizontal asymptote",
  "Increasing/decreasing",
  "Local extrema",
  "Concavity regions",
  "Final smooth curve"
];

// Function definitions with all properties
const functions = [
  {
    name: "f(x) = x^2/(x^2-1)",
    displayName: "x\u00B2/(x\u00B2-1)",
    f: x => (x * x) / (x * x - 1),
    fPrime: x => (-2 * x) / Math.pow(x * x - 1, 2),
    fDoublePrime: x => (6 * x * x + 2) / Math.pow(x * x - 1, 3),
    vertAsymp: [-1, 1],
    horizAsymp: 1,
    xIntercepts: [{x: 0, label: "(0, 0)"}],
    yIntercept: {y: 0, label: "(0, 0)"},
    localMax: null,
    localMin: {x: 0, y: 0},
    domainRestrictions: "x != -1, x != 1",
    increasing: [[-10, -1], [1, 10]], // regions where curve increases (approaching from outside)
    decreasing: [[-1, 0], [0, 1]],
    concaveUp: [[-10, -1], [1, 10]],
    concaveDown: [[-1, 1]]
  },
  {
    name: "f(x) = x^3/(x^2+1)",
    displayName: "x\u00B3/(x\u00B2+1)",
    f: x => (x * x * x) / (x * x + 1),
    fPrime: x => (x * x * (x * x + 3)) / Math.pow(x * x + 1, 2),
    fDoublePrime: x => (2 * x * (3 - x * x)) / Math.pow(x * x + 1, 3),
    vertAsymp: [],
    horizAsymp: null,  // No horizontal asymptote (oblique behavior)
    xIntercepts: [{x: 0, label: "(0, 0)"}],
    yIntercept: {y: 0, label: "(0, 0)"},
    localMax: null,
    localMin: null,
    domainRestrictions: "All real numbers",
    increasing: [[-10, 10]],
    decreasing: [],
    concaveUp: [[-Math.sqrt(3), 0], [Math.sqrt(3), 10]],
    concaveDown: [[-10, -Math.sqrt(3)], [0, Math.sqrt(3)]]
  },
  {
    name: "f(x) = (x-1)/(x^2-4)",
    displayName: "(x-1)/(x\u00B2-4)",
    f: x => (x - 1) / (x * x - 4),
    fPrime: x => (-x * x + 2 * x - 4) / Math.pow(x * x - 4, 2),
    fDoublePrime: x => (2 * (x * x * x - 3 * x * x + 12 * x - 4)) / Math.pow(x * x - 4, 3),
    vertAsymp: [-2, 2],
    horizAsymp: 0,
    xIntercepts: [{x: 1, label: "(1, 0)"}],
    yIntercept: {y: 0.25, label: "(0, 0.25)"},
    localMax: null,
    localMin: null,
    domainRestrictions: "x != -2, x != 2",
    increasing: [],
    decreasing: [[-10, -2], [-2, 2], [2, 10]],
    concaveUp: [[-2, 0.35], [2, 10]],
    concaveDown: [[-10, -2], [0.35, 2]]
  }
];

let currentFunc = 0;

// Button positions
let buttons = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  originX = canvasWidth * 0.4;  // Offset left to make room for checklist
  originY = drawHeight / 2;

  describe('Complete Curve Sketch: Build a graph step-by-step adding intercepts, asymptotes, extrema, and concavity.', LABEL);
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
  text('Complete Curve Sketch: ' + functions[currentFunc].displayName, canvasWidth * 0.4, 5);

  // Subtitle
  textSize(14);
  fill(100);
  text('Step ' + (currentStep + 1) + ' of ' + maxSteps + ': ' + stepNames[currentStep], canvasWidth * 0.4, 28);

  // Draw based on current step
  drawCurrentStep();

  // Draw checklist panel
  drawChecklist();

  // Draw controls
  drawControls();
}

function drawCurrentStep() {
  let func = functions[currentFunc];

  // Step 0: Always draw axes
  if (currentStep >= 0) {
    drawAxes();
    drawDomainRestrictions(func);
  }

  // Step 1: Plot intercepts
  if (currentStep >= 1) {
    drawIntercepts(func);
  }

  // Step 2: Vertical asymptotes
  if (currentStep >= 2) {
    drawVerticalAsymptotes(func);
  }

  // Step 3: Horizontal asymptote
  if (currentStep >= 3) {
    drawHorizontalAsymptote(func);
  }

  // Step 4: Increasing/decreasing arrows
  if (currentStep >= 4) {
    drawIncreasingDecreasing(func);
  }

  // Step 5: Local extrema
  if (currentStep >= 5) {
    drawLocalExtrema(func);
  }

  // Step 6: Concavity regions
  if (currentStep >= 6) {
    drawConcavityRegions(func);
  }

  // Step 7: Final curve
  if (currentStep >= 7) {
    drawFinalCurve(func);
  }
}

function drawAxes() {
  let graphLeft = 50;
  let graphRight = canvasWidth * 0.65;
  let graphTop = 50;
  let graphBottom = drawHeight - 30;

  // Grid
  stroke(230);
  strokeWeight(1);
  for (let i = -8; i <= 8; i++) {
    let x = originX + i * scale;
    let y = originY - i * scale;
    if (x > graphLeft && x < graphRight) {
      line(x, graphTop, x, graphBottom);
    }
    if (y > graphTop && y < graphBottom) {
      line(graphLeft, y, graphRight, y);
    }
  }

  // Axes
  stroke(0);
  strokeWeight(2);
  // X-axis
  line(graphLeft, originY, graphRight, originY);
  // Y-axis
  line(originX, graphTop, originX, graphBottom);

  // Arrows
  fill(0);
  noStroke();
  triangle(graphRight, originY, graphRight - 8, originY - 4, graphRight - 8, originY + 4);
  triangle(originX, graphTop, originX - 4, graphTop + 8, originX + 4, graphTop + 8);

  // Labels
  textSize(12);
  textAlign(CENTER, TOP);
  text('x', graphRight - 5, originY + 5);
  textAlign(RIGHT, CENTER);
  text('y', originX - 8, graphTop + 10);

  // Tick marks and numbers
  textSize(10);
  textAlign(CENTER, TOP);
  for (let i = -5; i <= 5; i++) {
    if (i !== 0) {
      let x = originX + i * scale;
      if (x > graphLeft && x < graphRight) {
        stroke(0);
        strokeWeight(1);
        line(x, originY - 3, x, originY + 3);
        noStroke();
        fill(0);
        text(i, x, originY + 5);
      }
    }
  }

  textAlign(RIGHT, CENTER);
  for (let i = -3; i <= 4; i++) {
    if (i !== 0) {
      let y = originY - i * scale;
      if (y > graphTop && y < graphBottom) {
        stroke(0);
        strokeWeight(1);
        line(originX - 3, y, originX + 3, y);
        noStroke();
        fill(0);
        text(i, originX - 6, y);
      }
    }
  }
}

function drawDomainRestrictions(func) {
  // Show domain info
  fill(100);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  text('Domain: ' + func.domainRestrictions, 55, 55);
}

function drawIntercepts(func) {
  let graphLeft = 50;
  let graphRight = canvasWidth * 0.65;
  let graphTop = 50;
  let graphBottom = drawHeight - 30;

  // X-intercepts
  fill(0, 180, 0);
  noStroke();
  for (let intercept of func.xIntercepts) {
    let sx = originX + intercept.x * scale;
    let sy = originY;
    if (sx > graphLeft && sx < graphRight) {
      stroke(0, 150, 0);
      strokeWeight(2);
      fill(0, 200, 0);
      circle(sx, sy, 12);

      // Label
      noStroke();
      fill(0, 130, 0);
      textSize(11);
      textAlign(CENTER, TOP);
      text(intercept.label, sx, sy + 10);
    }
  }

  // Y-intercept (if different from x-intercept)
  if (func.yIntercept.y !== 0) {
    let sx = originX;
    let sy = originY - func.yIntercept.y * scale;
    if (sy > graphTop && sy < graphBottom) {
      stroke(0, 150, 0);
      strokeWeight(2);
      fill(0, 200, 0);
      circle(sx, sy, 12);

      // Label
      noStroke();
      fill(0, 130, 0);
      textSize(11);
      textAlign(LEFT, CENTER);
      text(func.yIntercept.label, sx + 10, sy);
    }
  }
}

function drawVerticalAsymptotes(func) {
  let graphTop = 50;
  let graphBottom = drawHeight - 30;

  stroke(220, 50, 50);
  strokeWeight(2);
  drawingContext.setLineDash([10, 6]);

  for (let va of func.vertAsymp) {
    let x = originX + va * scale;
    line(x, graphTop, x, graphBottom);

    // Arrows showing direction
    drawingContext.setLineDash([]);
    fill(220, 50, 50);
    noStroke();

    // Up arrow on left side
    triangle(x - 8, graphTop + 30, x - 12, graphTop + 45, x - 4, graphTop + 45);
    // Down arrow on right side
    triangle(x + 8, graphBottom - 30, x + 4, graphBottom - 45, x + 12, graphBottom - 45);

    // Label
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text('x = ' + va, x, graphTop - 2);

    drawingContext.setLineDash([10, 6]);
    stroke(220, 50, 50);
    strokeWeight(2);
  }

  drawingContext.setLineDash([]);
}

function drawHorizontalAsymptote(func) {
  if (func.horizAsymp === null) {
    // Show "No horizontal asymptote" message
    fill(50, 100, 200);
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);
    text('No horizontal asymptote (oblique behavior)', 55, 70);
    return;
  }

  let graphLeft = 50;
  let graphRight = canvasWidth * 0.65;

  let y = originY - func.horizAsymp * scale;

  stroke(50, 100, 200);
  strokeWeight(2);
  drawingContext.setLineDash([10, 6]);
  line(graphLeft, y, graphRight, y);
  drawingContext.setLineDash([]);

  // Label
  fill(50, 100, 200);
  noStroke();
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text('y = ' + func.horizAsymp, graphLeft + 5, y - 3);
}

function drawIncreasingDecreasing(func) {
  // Draw subtle arrows along the curve to show direction
  let graphLeft = 50;
  let graphRight = canvasWidth * 0.65;

  // Draw small curve segments with directional indicators
  textSize(10);
  fill(100, 100, 100);
  noStroke();

  // For each region, draw an arrow
  for (let region of func.increasing) {
    let midX = (region[0] + region[1]) / 2;
    // Avoid asymptotes
    for (let va of func.vertAsymp) {
      if (midX > va - 0.5 && midX < va + 0.5) {
        midX = region[0] + 0.3;
      }
    }
    let sx = originX + midX * scale;
    let sy = originY - func.f(midX) * scale;

    if (sx > graphLeft && sx < graphRight && sy > 50 && sy < drawHeight - 30) {
      push();
      translate(sx, sy);
      rotate(-PI/4);  // Upward direction
      stroke(0, 150, 0);
      strokeWeight(2);
      line(-10, 0, 10, 0);
      fill(0, 150, 0);
      noStroke();
      triangle(10, 0, 5, -4, 5, 4);
      pop();
    }
  }

  for (let region of func.decreasing) {
    let midX = (region[0] + region[1]) / 2;
    // Avoid asymptotes
    for (let va of func.vertAsymp) {
      if (midX > va - 0.5 && midX < va + 0.5) {
        midX = region[0] + 0.3;
      }
    }
    let sx = originX + midX * scale;
    let sy = originY - func.f(midX) * scale;

    if (sx > graphLeft && sx < graphRight && sy > 50 && sy < drawHeight - 30) {
      push();
      translate(sx, sy);
      rotate(PI/4);  // Downward direction
      stroke(200, 100, 0);
      strokeWeight(2);
      line(-10, 0, 10, 0);
      fill(200, 100, 0);
      noStroke();
      triangle(10, 0, 5, -4, 5, 4);
      pop();
    }
  }
}

function drawLocalExtrema(func) {
  let graphLeft = 50;
  let graphRight = canvasWidth * 0.65;
  let graphTop = 50;
  let graphBottom = drawHeight - 30;

  // Local maximum
  if (func.localMax !== null) {
    let sx = originX + func.localMax.x * scale;
    let sy = originY - func.localMax.y * scale;

    if (sx > graphLeft && sx < graphRight && sy > graphTop && sy < graphBottom) {
      stroke(255, 140, 0);
      strokeWeight(3);
      fill(255, 180, 50);
      circle(sx, sy, 14);

      // Label
      noStroke();
      fill(200, 100, 0);
      textSize(11);
      textAlign(CENTER, BOTTOM);
      text('MAX', sx, sy - 10);
    }
  }

  // Local minimum
  if (func.localMin !== null) {
    let sx = originX + func.localMin.x * scale;
    let sy = originY - func.localMin.y * scale;

    if (sx > graphLeft && sx < graphRight && sy > graphTop && sy < graphBottom) {
      stroke(255, 140, 0);
      strokeWeight(3);
      fill(255, 180, 50);
      circle(sx, sy, 14);

      // Label
      noStroke();
      fill(200, 100, 0);
      textSize(11);
      textAlign(CENTER, TOP);
      text('MIN (' + func.localMin.x + ', ' + func.localMin.y + ')', sx, sy + 10);
    }
  }
}

function drawConcavityRegions(func) {
  let graphLeft = 50;
  let graphRight = canvasWidth * 0.65;
  let graphTop = 50;
  let graphBottom = drawHeight - 30;

  // Concave up regions - light purple shading
  for (let region of func.concaveUp) {
    let x1 = Math.max(graphLeft, originX + region[0] * scale);
    let x2 = Math.min(graphRight, originX + region[1] * scale);

    // Check for asymptotes in region
    for (let va of func.vertAsymp) {
      let vaX = originX + va * scale;
      if (vaX > x1 && vaX < x2) {
        // Split the region
        if (x1 < vaX - 5) {
          fill(200, 180, 220, 80);
          noStroke();
          rect(x1, graphTop, vaX - 5 - x1, graphBottom - graphTop);
        }
        x1 = vaX + 5;
      }
    }

    if (x1 < x2) {
      fill(200, 180, 220, 80);
      noStroke();
      rect(x1, graphTop, x2 - x1, graphBottom - graphTop);
    }
  }

  // Concave down regions - light cyan shading
  for (let region of func.concaveDown) {
    let x1 = Math.max(graphLeft, originX + region[0] * scale);
    let x2 = Math.min(graphRight, originX + region[1] * scale);

    // Check for asymptotes in region
    for (let va of func.vertAsymp) {
      let vaX = originX + va * scale;
      if (vaX > x1 && vaX < x2) {
        // Split the region
        if (x1 < vaX - 5) {
          fill(180, 220, 220, 80);
          noStroke();
          rect(x1, graphTop, vaX - 5 - x1, graphBottom - graphTop);
        }
        x1 = vaX + 5;
      }
    }

    if (x1 < x2) {
      fill(180, 220, 220, 80);
      noStroke();
      rect(x1, graphTop, x2 - x1, graphBottom - graphTop);
    }
  }

  // Legend for concavity
  fill(200, 180, 220, 150);
  noStroke();
  rect(55, 83, 12, 12);
  fill(80);
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Concave Up', 70, 89);

  fill(180, 220, 220, 150);
  noStroke();
  rect(145, 83, 12, 12);
  fill(80);
  text('Concave Down', 160, 89);
}

function drawFinalCurve(func) {
  let graphLeft = 50;
  let graphRight = canvasWidth * 0.65;

  stroke(0, 100, 200);
  strokeWeight(3);
  noFill();

  // Get segments avoiding asymptotes
  let segments = getSegments(func, graphLeft, graphRight);

  for (let seg of segments) {
    beginShape();
    for (let px = seg.start; px <= seg.end; px += 1) {
      let x = (px - originX) / scale;
      let y = func.f(x);

      if (!isNaN(y) && isFinite(y) && Math.abs(y) < 15) {
        let sy = originY - y * scale;
        if (sy > -50 && sy < drawHeight + 50) {
          vertex(px, constrain(sy, 0, drawHeight));
        }
      }
    }
    endShape();
  }
}

function getSegments(func, graphLeft, graphRight) {
  let segments = [];
  let boundaries = [graphLeft, graphRight];

  // Add vertical asymptote positions
  for (let va of func.vertAsymp) {
    let x = originX + va * scale;
    if (x > graphLeft && x < graphRight) {
      boundaries.push(x - 3);
      boundaries.push(x + 3);
    }
  }

  boundaries.sort((a, b) => a - b);

  for (let i = 0; i < boundaries.length - 1; i += 2) {
    if (boundaries[i] < boundaries[i + 1]) {
      segments.push({ start: boundaries[i], end: boundaries[i + 1] });
    }
  }

  return segments;
}

function drawChecklist() {
  let panelX = canvasWidth * 0.68;
  let panelY = 40;
  let panelW = canvasWidth * 0.30;
  let panelH = 280;

  // Panel background
  fill(255, 255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  // Title
  fill(50);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text('Curve Sketching Steps:', panelX + 10, panelY + 10);

  // Steps
  textSize(12);
  for (let i = 0; i < stepNames.length; i++) {
    let yPos = panelY + 35 + i * 28;

    // Checkbox
    stroke(150);
    strokeWeight(1);
    if (i <= currentStep) {
      fill(0, 180, 0);
    } else {
      fill(255);
    }
    rect(panelX + 10, yPos, 16, 16, 3);

    // Checkmark
    if (i <= currentStep) {
      stroke(255);
      strokeWeight(2);
      line(panelX + 13, yPos + 9, panelX + 17, yPos + 13);
      line(panelX + 17, yPos + 13, panelX + 23, yPos + 5);
    }

    // Step name
    noStroke();
    if (i === currentStep) {
      fill(0, 100, 200);
      textStyle(BOLD);
    } else if (i < currentStep) {
      fill(100);
      textStyle(NORMAL);
    } else {
      fill(150);
      textStyle(NORMAL);
    }
    text((i + 1) + '. ' + stepNames[i], panelX + 32, yPos + 2);
  }
  textStyle(NORMAL);

  // Color legend at bottom
  let legendY = panelY + panelH - 55;
  textSize(10);
  fill(80);
  text('Legend:', panelX + 10, legendY);

  // Green - intercepts
  fill(0, 200, 0);
  circle(panelX + 20, legendY + 18, 10);
  fill(80);
  text('Intercepts', panelX + 30, legendY + 14);

  // Red dashed - vertical asymptotes
  stroke(220, 50, 50);
  strokeWeight(2);
  drawingContext.setLineDash([4, 3]);
  line(panelX + 100, legendY + 18, panelX + 120, legendY + 18);
  drawingContext.setLineDash([]);
  noStroke();
  fill(80);
  text('Vert. Asymp.', panelX + 125, legendY + 14);

  // Blue dashed - horizontal asymptote
  stroke(50, 100, 200);
  strokeWeight(2);
  drawingContext.setLineDash([4, 3]);
  line(panelX + 10, legendY + 35, panelX + 30, legendY + 35);
  drawingContext.setLineDash([]);
  noStroke();
  fill(80);
  text('Horiz. Asymp.', panelX + 35, legendY + 31);

  // Orange - extrema
  fill(255, 180, 50);
  stroke(255, 140, 0);
  strokeWeight(2);
  circle(panelX + 120, legendY + 35, 10);
  noStroke();
  fill(80);
  text('Extrema', panelX + 130, legendY + 31);
}

function drawControls() {
  let btnY = drawHeight + 12;
  let btnH = 30;

  // Button definitions
  buttons = [
    { x: 15, w: 80, label: 'Previous', action: 'prev' },
    { x: 105, w: 90, label: 'Next Step', action: 'next' },
    { x: 205, w: 80, label: 'Show All', action: 'all' },
    { x: 295, w: 85, label: 'Start Over', action: 'reset' }
  ];

  for (let btn of buttons) {
    let isHovered = mouseX >= btn.x && mouseX <= btn.x + btn.w &&
                    mouseY >= btnY && mouseY <= btnY + btnH;

    // Disable styling for prev at step 0, next at last step
    let isDisabled = (btn.action === 'prev' && currentStep === 0) ||
                     (btn.action === 'next' && currentStep === maxSteps - 1);

    if (isDisabled) {
      fill(220);
      stroke(180);
    } else if (isHovered) {
      fill(100, 150, 220);
      stroke(70, 120, 190);
    } else {
      fill(70, 130, 200);
      stroke(50, 100, 160);
    }
    strokeWeight(2);
    rect(btn.x, btnY, btn.w, btnH, 5);

    fill(isDisabled ? 150 : 255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text(btn.label, btn.x + btn.w/2, btnY + btnH/2);
  }

  // Function selector
  let selectY = drawHeight + 55;
  fill(50);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Function:', 15, selectY + 12);

  // Function buttons
  let funcBtnX = 90;
  let funcBtnW = (canvasWidth - 120) / functions.length - 5;

  for (let i = 0; i < functions.length; i++) {
    let btnX = funcBtnX + i * (funcBtnW + 5);
    let isSelected = (i === currentFunc);
    let isHovered = mouseX >= btnX && mouseX <= btnX + funcBtnW &&
                    mouseY >= selectY && mouseY <= selectY + 28;

    if (isSelected) {
      fill(70, 130, 200);
      stroke(50, 100, 160);
    } else if (isHovered) {
      fill(200, 210, 230);
      stroke(150);
    } else {
      fill(240);
      stroke(180);
    }
    strokeWeight(isSelected ? 2 : 1);
    rect(btnX, selectY, funcBtnW, 28, 4);

    fill(isSelected ? 255 : 50);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(functions[i].displayName, btnX + funcBtnW/2, selectY + 14);
  }
}

function mousePressed() {
  let btnY = drawHeight + 12;
  let btnH = 30;

  // Check control buttons
  for (let btn of buttons) {
    if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
      if (btn.action === 'prev' && currentStep > 0) {
        currentStep--;
      } else if (btn.action === 'next' && currentStep < maxSteps - 1) {
        currentStep++;
      } else if (btn.action === 'all') {
        currentStep = maxSteps - 1;
      } else if (btn.action === 'reset') {
        currentStep = 0;
      }
      return;
    }
  }

  // Check function buttons
  let selectY = drawHeight + 55;
  let funcBtnX = 90;
  let funcBtnW = (canvasWidth - 120) / functions.length - 5;

  for (let i = 0; i < functions.length; i++) {
    let btnX = funcBtnX + i * (funcBtnW + 5);
    if (mouseX >= btnX && mouseX <= btnX + funcBtnW &&
        mouseY >= selectY && mouseY <= selectY + 28) {
      if (currentFunc !== i) {
        currentFunc = i;
        currentStep = 0;  // Reset to step 0 when changing function
      }
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
  originX = canvasWidth * 0.4;
}
