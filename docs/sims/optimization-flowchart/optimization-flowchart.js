// Optimization Problem Setup Flowchart MicroSim
// Interactive flowchart showing the step-by-step process for setting up optimization problems
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 700;
let drawHeight = 440;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let defaultTextSize = 14;

// Flowchart data structure
let steps = [];
let currentStep = -1; // -1 means no step highlighted, 0-10 for animation
let isAnimating = false;
let animationTimer = 0;
let animationDelay = 120; // frames between steps (2 seconds at 60fps)

// Button
let walkThroughButton;

// Colors for different sections
const SETUP_COLOR = { fill: '#e3f2fd', stroke: '#1976d2', text: '#0d47a1' };      // Blue
const CALCULUS_COLOR = { fill: '#e8f5e9', stroke: '#388e3c', text: '#1b5e20' };   // Green
const VERIFY_COLOR = { fill: '#fff3e0', stroke: '#f57c00', text: '#e65100' };     // Orange
const DECISION_COLOR = { fill: '#fce4ec', stroke: '#c2185b', text: '#880e4f' };   // Pink
const HIGHLIGHT_COLOR = { fill: '#ffeb3b', stroke: '#f57f17', text: '#000000' };  // Yellow highlight

// Hover state
let hoveredStep = -1;

// Example problem data for each step
const exampleProblem = {
  title: "Maximize area of a rectangular garden against a wall using 100ft of fencing",
  steps: [
    "Read: We want to MAXIMIZE area. We have a fixed amount of fencing (100 ft).",
    "Draw: Rectangle with one side against wall. Label: width = x, length = y.",
    "Objective: A = xy (the area we want to maximize)",
    "Constraint: 2x + y = 100 (fencing for 2 widths + 1 length)",
    "Substitute: y = 100 - 2x, so A(x) = x(100 - 2x) = 100x - 2x^2",
    "Domain: x > 0 (positive width) and y > 0 means x < 50. So 0 < x < 50.",
    "Find critical points: A'(x) = 100 - 4x = 0, so x = 25",
    "This is NOT a closed interval (open: 0 < x < 50), so use derivative test.",
    "Verify: A''(x) = -4 < 0, confirming x = 25 is a maximum.",
    "Answer: x = 25 ft, y = 50 ft. Maximum area = 1250 sq ft."
  ]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Initialize flowchart steps
  initializeSteps();

  // Create Walk Through button
  walkThroughButton = createButton('Walk Through Example');
  walkThroughButton.position(10, drawHeight + 18);
  walkThroughButton.mousePressed(startWalkThrough);
  walkThroughButton.style('font-size', '14px');
  walkThroughButton.style('padding', '8px 16px');
  walkThroughButton.style('cursor', 'pointer');

  describe('Interactive flowchart showing the 10 steps for setting up optimization problems in calculus, with hover explanations and animated walk-through', LABEL);
}

function initializeSteps() {
  // Define all flowchart steps with positions, colors, and content
  // Layout: 3 columns, flowing down

  const col1X = 90;
  const col2X = 280;
  const col3X = 480;
  const startY = 45;
  const stepH = 38;
  const gapY = 50;

  steps = [
    // Setup section (blue) - steps 0-3
    {
      id: 0,
      label: "1. Read Problem",
      detail: "Identify: maximize or minimize?",
      explanation: "Read carefully to determine if you're finding a maximum or minimum. Look for words like 'largest', 'smallest', 'most efficient', 'least cost'.",
      x: col1X, y: startY,
      w: 140, h: stepH,
      type: 'rect',
      section: 'setup',
      icon: 'book'
    },
    {
      id: 1,
      label: "2. Draw Diagram",
      detail: "Label all variables",
      explanation: "Sketch the situation and label ALL quantities with variables. This visual helps you see relationships between quantities.",
      x: col1X, y: startY + gapY,
      w: 140, h: stepH,
      type: 'rect',
      section: 'setup',
      icon: 'pencil'
    },
    {
      id: 2,
      label: "3. Write Objective",
      detail: "Function to optimize",
      explanation: "Write an equation for the quantity you want to maximize or minimize. This is your objective function (often called f or A or V).",
      x: col1X, y: startY + 2*gapY,
      w: 140, h: stepH,
      type: 'rect',
      section: 'setup',
      icon: 'f(x)'
    },
    {
      id: 3,
      label: "4. Write Constraint",
      detail: "What is fixed/given",
      explanation: "Identify the constraint equation - what's being held constant? (e.g., perimeter = 100, surface area = 500)",
      x: col1X, y: startY + 3*gapY,
      w: 140, h: stepH,
      type: 'rect',
      section: 'setup',
      icon: '='
    },
    // Calculus section (green) - steps 4-7
    {
      id: 4,
      label: "5. Reduce to 1 Var",
      detail: "Substitute constraint",
      explanation: "Use the constraint to eliminate one variable from your objective function, leaving a function of a single variable.",
      x: col2X, y: startY + 0.5*gapY,
      w: 140, h: stepH,
      type: 'rect',
      section: 'calculus',
      icon: 'sub'
    },
    {
      id: 5,
      label: "6. Find Domain",
      detail: "Practical restrictions",
      explanation: "Determine the practical domain - what values actually make sense? (lengths > 0, angles between 0 and pi, etc.)",
      x: col2X, y: startY + 1.5*gapY,
      w: 140, h: stepH,
      type: 'rect',
      section: 'calculus',
      icon: '[ ]'
    },
    {
      id: 6,
      label: "7. Find Critical Pts",
      detail: "Solve f'(x) = 0",
      explanation: "Take the derivative and set it equal to zero. Solve for x to find critical points where extrema might occur.",
      x: col2X, y: startY + 2.5*gapY,
      w: 140, h: stepH,
      type: 'rect',
      section: 'calculus',
      icon: "f'"
    },
    {
      id: 7,
      label: "Closed Interval?",
      detail: "[a, b] includes endpoints",
      explanation: "Is your domain a closed interval [a,b]? This determines which method to use for finding the absolute extremum.",
      x: col2X, y: startY + 3.5*gapY,
      w: 140, h: stepH,
      type: 'diamond',
      section: 'calculus',
      icon: '?'
    },
    // Verification section (orange) - steps 8-9
    {
      id: 8,
      label: "8a. Check Endpoints",
      detail: "Compare all values",
      explanation: "YES path: Evaluate f at all critical points AND both endpoints. The largest value is the max, smallest is the min.",
      x: col3X, y: startY + 2*gapY,
      w: 140, h: stepH,
      type: 'rect',
      section: 'verify',
      icon: 'end'
    },
    {
      id: 9,
      label: "8b. Derivative Test",
      detail: "1st or 2nd deriv test",
      explanation: "NO path: Use First or Second Derivative Test to confirm your critical point is a max or min.",
      x: col3X, y: startY + 3.5*gapY,
      w: 140, h: stepH,
      type: 'rect',
      section: 'verify',
      icon: "f''"
    },
    {
      id: 10,
      label: "9. State Answer",
      detail: "In context!",
      explanation: "Give your answer with units and in the context of the original problem. Don't just say x=5, say 'The width should be 5 feet.'",
      x: col3X, y: startY + 5.5*gapY,
      w: 140, h: stepH,
      type: 'rect',
      section: 'verify',
      icon: 'check'
    }
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

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Optimization Problem Setup Flowchart', canvasWidth/2, 8);

  // Subtitle
  textSize(12);
  fill('#666');
  text('Hover over steps for details | Click for example | Walk through animation below', canvasWidth/2, 28);

  // Draw section labels
  drawSectionLabels();

  // Draw arrows first (behind boxes)
  drawArrows();

  // Draw all steps
  for (let step of steps) {
    drawStep(step);
  }

  // Draw info panel if hovering or animating
  if (hoveredStep >= 0 || currentStep >= 0) {
    drawInfoPanel(hoveredStep >= 0 ? hoveredStep : currentStep);
  }

  // Handle animation
  if (isAnimating) {
    animationTimer++;
    if (animationTimer >= animationDelay) {
      animationTimer = 0;
      currentStep++;
      if (currentStep > 10) {
        isAnimating = false;
        currentStep = -1;
        walkThroughButton.html('Walk Through Example');
      }
    }
  }

  // Control area text
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  if (isAnimating) {
    text('Step ' + (currentStep + 1) + ' of 11 - Click button to stop', 180, drawHeight + 30);
  }
}

function drawSectionLabels() {
  textSize(11);
  noStroke();

  // Setup section label
  fill(SETUP_COLOR.text);
  push();
  translate(20, 180);
  rotate(-PI/2);
  textAlign(CENTER, CENTER);
  text('SETUP', 0, 0);
  pop();

  // Calculus section label
  fill(CALCULUS_COLOR.text);
  push();
  translate(210, 180);
  rotate(-PI/2);
  textAlign(CENTER, CENTER);
  text('CALCULUS', 0, 0);
  pop();

  // Verify section label
  fill(VERIFY_COLOR.text);
  push();
  translate(410, 250);
  rotate(-PI/2);
  textAlign(CENTER, CENTER);
  text('VERIFY', 0, 0);
  pop();
}

function drawArrows() {
  stroke('#888');
  strokeWeight(2);
  fill('#888');

  // Arrow helper function
  const drawArrow = (x1, y1, x2, y2, label = '') => {
    line(x1, y1, x2, y2);
    // Arrowhead
    push();
    translate(x2, y2);
    let angle = atan2(y2 - y1, x2 - x1);
    rotate(angle);
    triangle(0, 0, -10, -5, -10, 5);
    pop();

    // Label if provided
    if (label) {
      noStroke();
      textSize(10);
      textAlign(CENTER, CENTER);
      fill('#666');
      let midX = (x1 + x2) / 2;
      let midY = (y1 + y2) / 2;
      text(label, midX, midY - 8);
      stroke('#888');
    }
  };

  // Vertical arrows in column 1 (steps 0-3)
  for (let i = 0; i < 3; i++) {
    drawArrow(steps[i].x, steps[i].y + steps[i].h/2 + 3,
              steps[i].x, steps[i+1].y - steps[i+1].h/2 - 3);
  }

  // Arrow from step 3 to step 4 (curve right)
  let s3 = steps[3];
  let s4 = steps[4];
  noFill();
  beginShape();
  vertex(s3.x + s3.w/2 + 3, s3.y);
  bezierVertex(s3.x + 80, s3.y, s4.x - 80, s4.y, s4.x - s4.w/2 - 3, s4.y);
  endShape();
  // Arrowhead
  fill('#888');
  push();
  translate(s4.x - s4.w/2 - 3, s4.y);
  triangle(0, 0, -10, -5, -10, 5);
  pop();

  // Vertical arrows in column 2 (steps 4-7)
  for (let i = 4; i < 7; i++) {
    drawArrow(steps[i].x, steps[i].y + steps[i].h/2 + 3,
              steps[i].x, steps[i+1].y - steps[i+1].h/2 - 12);
  }

  // Decision diamond arrows (step 7)
  let s7 = steps[7];
  let s8 = steps[8];
  let s9 = steps[9];

  // YES arrow (right and up to step 8)
  noFill();
  stroke('#888');
  beginShape();
  vertex(s7.x + s7.w/2 + 10, s7.y - 10);
  bezierVertex(s7.x + 120, s7.y - 30, s8.x - 100, s8.y, s8.x - s8.w/2 - 3, s8.y);
  endShape();
  fill('#888');
  push();
  translate(s8.x - s8.w/2 - 3, s8.y);
  triangle(0, 0, -10, -5, -10, 5);
  pop();
  noStroke();
  fill('#388e3c');
  textSize(10);
  text('YES', s7.x + 95, s7.y - 25);

  // NO arrow (right and down to step 9)
  stroke('#888');
  noFill();
  beginShape();
  vertex(s7.x + s7.w/2 + 10, s7.y + 10);
  bezierVertex(s7.x + 120, s7.y + 30, s9.x - 100, s9.y, s9.x - s9.w/2 - 3, s9.y);
  endShape();
  fill('#888');
  push();
  translate(s9.x - s9.w/2 - 3, s9.y);
  triangle(0, 0, -10, -5, -10, 5);
  pop();
  noStroke();
  fill('#c2185b');
  textSize(10);
  text('NO', s7.x + 95, s7.y + 35);

  // Arrows from 8 and 9 to 10
  let s10 = steps[10];
  stroke('#888');

  // From step 8 down to step 10
  drawArrow(s8.x, s8.y + s8.h/2 + 3, s10.x, s10.y - s10.h/2 - 3);

  // From step 9 down to meet the arrow from 8
  // Actually draw arrow from 9 to 10
  // drawArrow(s9.x, s9.y + s9.h/2 + 3, s10.x, s10.y - s10.h/2 - 3);
}

function drawStep(step) {
  let colors;
  let isHighlighted = (step.id === hoveredStep) || (step.id === currentStep);

  if (isHighlighted) {
    colors = HIGHLIGHT_COLOR;
  } else {
    switch(step.section) {
      case 'setup': colors = SETUP_COLOR; break;
      case 'calculus': colors = CALCULUS_COLOR; break;
      case 'verify': colors = VERIFY_COLOR; break;
      default: colors = SETUP_COLOR;
    }
  }

  // Draw shape
  fill(colors.fill);
  stroke(colors.stroke);
  strokeWeight(isHighlighted ? 3 : 2);

  if (step.type === 'diamond') {
    // Draw diamond for decision
    push();
    translate(step.x, step.y);
    beginShape();
    vertex(0, -step.h/2 - 8);
    vertex(step.w/2 + 8, 0);
    vertex(0, step.h/2 + 8);
    vertex(-step.w/2 - 8, 0);
    endShape(CLOSE);
    pop();
  } else {
    // Draw rounded rectangle
    rectMode(CENTER);
    rect(step.x, step.y, step.w, step.h, 8);
    rectMode(CORNER);
  }

  // Draw text
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(step.label, step.x, step.y - 5);
  textSize(9);
  fill(isHighlighted ? '#333' : '#666');
  text(step.detail, step.x, step.y + 9);
}

function drawInfoPanel(stepId) {
  if (stepId < 0 || stepId >= steps.length) return;

  let step = steps[stepId];
  let panelW = 220;
  let panelH = 90;
  let panelX = canvasWidth - panelW - 15;
  let panelY = 45;

  // Panel background
  fill(255, 255, 255, 240);
  stroke('#1976d2');
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 8);

  // Panel title
  fill('#1976d2');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text(step.label, panelX + 10, panelY + 8);
  textStyle(NORMAL);

  // Explanation text (word wrapped)
  fill('#333');
  textSize(10);
  textLeading(13);
  let explanation = step.explanation;
  text(explanation, panelX + 10, panelY + 26, panelW - 20, panelH - 35);

  // If animating, show example
  if (currentStep >= 0 && stepId < exampleProblem.steps.length) {
    let exPanelY = panelY + panelH + 10;
    let exPanelH = 60;

    fill(255, 255, 240, 240);
    stroke('#f57c00');
    strokeWeight(2);
    rect(panelX, exPanelY, panelW, exPanelH, 8);

    fill('#e65100');
    noStroke();
    textSize(10);
    textStyle(BOLD);
    text('Example:', panelX + 10, exPanelY + 8);
    textStyle(NORMAL);

    fill('#333');
    textSize(9);
    text(exampleProblem.steps[stepId], panelX + 10, exPanelY + 22, panelW - 20, exPanelH - 28);
  }
}

function startWalkThrough() {
  if (isAnimating) {
    // Stop animation
    isAnimating = false;
    currentStep = -1;
    walkThroughButton.html('Walk Through Example');
  } else {
    // Start animation
    isAnimating = true;
    currentStep = 0;
    animationTimer = 0;
    walkThroughButton.html('Stop Animation');
  }
}

function mouseMoved() {
  // Check if hovering over any step
  hoveredStep = -1;

  for (let step of steps) {
    let halfW = step.w / 2 + (step.type === 'diamond' ? 8 : 0);
    let halfH = step.h / 2 + (step.type === 'diamond' ? 8 : 0);

    if (mouseX > step.x - halfW && mouseX < step.x + halfW &&
        mouseY > step.y - halfH && mouseY < step.y + halfH) {
      hoveredStep = step.id;
      break;
    }
  }
}

function mousePressed() {
  // If clicking on a step, show its example
  if (hoveredStep >= 0 && !isAnimating) {
    currentStep = hoveredStep;
    // Reset after 5 seconds
    setTimeout(() => {
      if (!isAnimating && currentStep === hoveredStep) {
        currentStep = -1;
      }
    }, 5000);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    containerWidth = Math.floor(container.getBoundingClientRect().width);
    canvasWidth = Math.min(containerWidth, 700); // Cap at 700 for this flowchart
  }
}
