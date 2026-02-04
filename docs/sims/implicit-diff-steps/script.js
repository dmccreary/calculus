// Implicit Differentiation Steps MicroSim
// Walk students through the implicit differentiation process
// with visual highlighting of each step
// Bloom Level: Apply (L3), Verb: apply, execute, implement
// Learning Objective: Students will apply implicit differentiation systematically

let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let chartTop = 50;
let defaultTextSize = 16;

// Preset equations
const presets = [
  {
    name: "x^2 + y^2 = 25",
    original: "x^2 + y^2 = 25",
    steps: [
      {
        description: "Step 1: Differentiate both sides with respect to x",
        work: "d/dx(x^2) + d/dx(y^2) = d/dx(25)",
        highlight: "both"
      },
      {
        description: "Step 2: Apply power rule to x^2, chain rule to y^2",
        work: "2x + 2y * (dy/dx) = 0",
        highlight: "chain"
      },
      {
        description: "Step 3: Isolate dy/dx terms",
        work: "2y * (dy/dx) = -2x",
        highlight: "collect"
      },
      {
        description: "Step 4: Solve for dy/dx",
        work: "dy/dx = -2x / (2y)",
        highlight: "solve"
      },
      {
        description: "Step 5: Simplify",
        work: "dy/dx = -x/y",
        highlight: "final"
      }
    ]
  },
  {
    name: "x^3 + y^3 = 6xy",
    original: "x^3 + y^3 = 6xy",
    steps: [
      {
        description: "Step 1: Differentiate both sides with respect to x",
        work: "d/dx(x^3) + d/dx(y^3) = d/dx(6xy)",
        highlight: "both"
      },
      {
        description: "Step 2: Apply power rule to x^3, chain rule to y^3, product rule to 6xy",
        work: "3x^2 + 3y^2(dy/dx) = 6y + 6x(dy/dx)",
        highlight: "chain"
      },
      {
        description: "Step 3: Collect dy/dx terms on left side",
        work: "3y^2(dy/dx) - 6x(dy/dx) = 6y - 3x^2",
        highlight: "collect"
      },
      {
        description: "Step 4: Factor out dy/dx",
        work: "(dy/dx)(3y^2 - 6x) = 6y - 3x^2",
        highlight: "factor"
      },
      {
        description: "Step 5: Solve for dy/dx",
        work: "dy/dx = (6y - 3x^2) / (3y^2 - 6x)",
        highlight: "solve"
      },
      {
        description: "Step 6: Simplify (factor out 3)",
        work: "dy/dx = (2y - x^2) / (y^2 - 2x)",
        highlight: "final"
      }
    ]
  },
  {
    name: "xy = 1",
    original: "xy = 1",
    steps: [
      {
        description: "Step 1: Differentiate both sides with respect to x",
        work: "d/dx(xy) = d/dx(1)",
        highlight: "both"
      },
      {
        description: "Step 2: Apply product rule: d/dx(xy) = x(dy/dx) + y(1)",
        work: "x(dy/dx) + y = 0",
        highlight: "chain"
      },
      {
        description: "Step 3: Isolate dy/dx",
        work: "x(dy/dx) = -y",
        highlight: "collect"
      },
      {
        description: "Step 4: Solve for dy/dx",
        work: "dy/dx = -y/x",
        highlight: "final"
      }
    ]
  },
  {
    name: "sin(x + y) = y",
    original: "sin(x + y) = y",
    steps: [
      {
        description: "Step 1: Differentiate both sides with respect to x",
        work: "d/dx[sin(x + y)] = d/dx(y)",
        highlight: "both"
      },
      {
        description: "Step 2: Apply chain rule: cos(x+y) * d/dx(x+y)",
        work: "cos(x + y) * (1 + dy/dx) = dy/dx",
        highlight: "chain"
      },
      {
        description: "Step 3: Distribute cos(x + y)",
        work: "cos(x + y) + cos(x + y)(dy/dx) = dy/dx",
        highlight: "distribute"
      },
      {
        description: "Step 4: Collect dy/dx terms on right side",
        work: "cos(x + y) = dy/dx - cos(x + y)(dy/dx)",
        highlight: "collect"
      },
      {
        description: "Step 5: Factor out dy/dx",
        work: "cos(x + y) = (dy/dx)[1 - cos(x + y)]",
        highlight: "factor"
      },
      {
        description: "Step 6: Solve for dy/dx",
        work: "dy/dx = cos(x + y) / [1 - cos(x + y)]",
        highlight: "final"
      }
    ]
  },
  {
    name: "e^(xy) = x - y",
    original: "e^(xy) = x - y",
    steps: [
      {
        description: "Step 1: Differentiate both sides with respect to x",
        work: "d/dx[e^(xy)] = d/dx(x - y)",
        highlight: "both"
      },
      {
        description: "Step 2: Apply chain rule to e^(xy), product rule to xy",
        work: "e^(xy) * d/dx(xy) = 1 - dy/dx",
        highlight: "chain"
      },
      {
        description: "Step 3: Apply product rule: d/dx(xy) = y + x(dy/dx)",
        work: "e^(xy)(y + x*dy/dx) = 1 - dy/dx",
        highlight: "product"
      },
      {
        description: "Step 4: Distribute e^(xy)",
        work: "y*e^(xy) + x*e^(xy)(dy/dx) = 1 - dy/dx",
        highlight: "distribute"
      },
      {
        description: "Step 5: Collect dy/dx terms",
        work: "x*e^(xy)(dy/dx) + dy/dx = 1 - y*e^(xy)",
        highlight: "collect"
      },
      {
        description: "Step 6: Factor out dy/dx",
        work: "(dy/dx)(x*e^(xy) + 1) = 1 - y*e^(xy)",
        highlight: "factor"
      },
      {
        description: "Step 7: Solve for dy/dx",
        work: "dy/dx = (1 - y*e^(xy)) / (x*e^(xy) + 1)",
        highlight: "final"
      }
    ]
  }
];

// State variables
let currentPreset = 0;
let currentStep = 0;
let showAllSteps = false;

// Animation
let fadeProgress = 1.0;
let isAnimating = false;

// Control areas
let presetBtnAreas = [];
let nextBtnArea = {};
let showAllBtnArea = {};
let resetBtnArea = {};

// Colors
const xColor = [50, 100, 200];      // Blue for x terms
const yColor = [50, 150, 50];       // Green for y terms
const dydxColor = [200, 50, 50];    // Red for dy/dx
const stepColors = {
  'both': [100, 100, 100],
  'chain': [50, 150, 50],
  'collect': [150, 100, 50],
  'factor': [100, 50, 150],
  'solve': [200, 50, 50],
  'final': [50, 150, 50],
  'distribute': [100, 100, 150],
  'product': [150, 100, 100]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
  updateButtonAreas();
  describe('Interactive visualization of implicit differentiation showing step-by-step process with color-coded terms.', LABEL);
}

function updateButtonAreas() {
  // Preset buttons - arranged in a row at top of control area
  let btnWidth = 100;
  let btnHeight = 28;
  let btnY = drawHeight + 8;
  let startX = 10;

  presetBtnAreas = [];
  for (let i = 0; i < Math.min(presets.length, 5); i++) {
    presetBtnAreas.push({
      x: startX + i * (btnWidth + 5),
      y: btnY,
      w: btnWidth,
      h: btnHeight,
      index: i
    });
  }

  // Action buttons - below preset buttons
  let actionY = drawHeight + 45;
  let actionBtnWidth = 90;

  nextBtnArea = {
    x: 10,
    y: actionY,
    w: actionBtnWidth,
    h: 28
  };

  showAllBtnArea = {
    x: 110,
    y: actionY,
    w: actionBtnWidth,
    h: 28
  };

  resetBtnArea = {
    x: 210,
    y: actionY,
    w: actionBtnWidth,
    h: 28
  };
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  drawTitle();

  // Draw original equation
  drawOriginalEquation();

  // Draw steps
  drawSteps();

  // Draw controls
  drawControls();

  // Update animation
  if (isAnimating) {
    fadeProgress += 0.05;
    if (fadeProgress >= 1.0) {
      fadeProgress = 1.0;
      isAnimating = false;
    }
  }
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Implicit Differentiation: Step by Step', canvasWidth / 2, 8);

  textSize(14);
  fill(100);
  text('Apply the chain rule to find dy/dx', canvasWidth / 2, 32);
}

function drawOriginalEquation() {
  let preset = presets[currentPreset];
  let y = chartTop + 10;

  // Box for original equation
  fill(255, 255, 240);
  stroke(200, 200, 150);
  strokeWeight(2);
  rect(margin, y, canvasWidth - 2 * margin, 40, 8);

  // Label
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Original Equation:', margin + 10, y + 20);

  // Equation
  fill('black');
  textSize(18);
  textAlign(CENTER, CENTER);
  text(preset.original, canvasWidth / 2, y + 20);
}

function drawSteps() {
  let preset = presets[currentPreset];
  let startY = chartTop + 65;
  let stepHeight = 50;
  let maxVisibleSteps = showAllSteps ? preset.steps.length : (currentStep + 1);

  for (let i = 0; i < maxVisibleSteps && i < preset.steps.length; i++) {
    let step = preset.steps[i];
    let y = startY + i * stepHeight;
    let alpha = 255;

    // Fade in the newest step
    if (i === currentStep && isAnimating && !showAllSteps) {
      alpha = fadeProgress * 255;
    }

    // Step box background
    let bgColor = (i === preset.steps.length - 1 && (showAllSteps || currentStep >= preset.steps.length - 1))
      ? [220, 255, 220] // Light green for final answer
      : [255, 255, 255];

    fill(bgColor[0], bgColor[1], bgColor[2], alpha);
    stroke(150, 150, 150, alpha);
    strokeWeight(1);
    rect(margin, y, canvasWidth - 2 * margin, stepHeight - 5, 5);

    // Step description
    let stepColor = stepColors[step.highlight] || [100, 100, 100];
    fill(stepColor[0], stepColor[1], stepColor[2], alpha);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text(step.description, margin + 10, y + 5);

    // Step work - color coded
    textSize(16);
    textAlign(CENTER, CENTER);
    drawColoredWork(step.work, canvasWidth / 2, y + 32, alpha);

    // Final answer box
    if (i === preset.steps.length - 1 && (showAllSteps || currentStep >= preset.steps.length - 1)) {
      stroke(50, 150, 50, alpha);
      strokeWeight(3);
      noFill();
      rect(margin + 5, y + 3, canvasWidth - 2 * margin - 10, stepHeight - 11, 5);
    }
  }

  // Legend
  drawLegend();
}

function drawColoredWork(work, x, y, alpha) {
  // Parse and color-code the mathematical expression
  // dy/dx in red, y terms in green, x terms in blue

  // For simplicity, we'll display the work with key terms highlighted
  // In a more advanced version, this would parse and render each term

  // Highlight dy/dx
  let displayText = work;

  // Draw the full text first to get positioning
  textAlign(CENTER, CENTER);
  let textW = textWidth(displayText);
  let startX = x - textW / 2;

  // Draw character by character with coloring
  let chars = displayText.split('');
  let currentX = startX;

  // Find dy/dx patterns and color them
  let inDyDx = false;
  let dydxStart = -1;

  for (let i = 0; i < displayText.length; i++) {
    let segment = displayText.substring(i);
    let charColor = [0, 0, 0]; // Default black

    // Check for dy/dx
    if (segment.startsWith('dy/dx') || segment.startsWith('(dy/dx)')) {
      charColor = dydxColor;
    } else if (i > 0 && displayText.substring(i-1, i+4) === '(dy/dx)') {
      charColor = dydxColor;
    } else if (i > 0 && displayText.substring(Math.max(0, i-4), i+1).includes('dy/dx')) {
      charColor = dydxColor;
    }

    // Simple heuristic: if char is part of a known pattern
    let char = chars[i];
    fill(charColor[0], charColor[1], charColor[2], alpha);
    textAlign(LEFT, CENTER);
    text(char, currentX, y);
    currentX += textWidth(char);
  }
}

function drawLegend() {
  let legendY = drawHeight - 35;
  let legendX = margin + 10;

  fill(240, 240, 240);
  stroke(200);
  strokeWeight(1);
  rect(margin, legendY - 5, canvasWidth - 2 * margin, 30, 5);

  textSize(11);
  textAlign(LEFT, CENTER);

  // X terms (blue)
  fill(xColor[0], xColor[1], xColor[2]);
  text('x terms', legendX, legendY + 10);

  // Y terms (green)
  fill(yColor[0], yColor[1], yColor[2]);
  text('y terms', legendX + 80, legendY + 10);

  // dy/dx (red)
  fill(dydxColor[0], dydxColor[1], dydxColor[2]);
  text('dy/dx', legendX + 160, legendY + 10);

  // Instructions
  fill(100);
  textAlign(RIGHT, CENTER);
  text('Click "Next Step" to see each step, or "Show All" to reveal the solution', canvasWidth - margin - 10, legendY + 10);
}

function drawControls() {
  // Preset equation buttons
  textSize(10);
  for (let btn of presetBtnAreas) {
    let isSelected = btn.index === currentPreset;

    // Button background
    if (isSelected) {
      fill(100, 100, 200);
      stroke(50, 50, 150);
    } else {
      fill(240);
      stroke(180);
    }
    strokeWeight(1);
    rect(btn.x, btn.y, btn.w, btn.h, 4);

    // Button text
    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);

    // Truncate long names
    let name = presets[btn.index].name;
    if (name.length > 14) {
      name = name.substring(0, 12) + '...';
    }
    text(name, btn.x + btn.w / 2, btn.y + btn.h / 2);
  }

  // Next Step button
  let canGoNext = currentStep < presets[currentPreset].steps.length - 1 && !showAllSteps;
  fill(canGoNext ? '#4CAF50' : '#bbb');
  stroke(canGoNext ? '#388E3C' : '#999');
  strokeWeight(1);
  rect(nextBtnArea.x, nextBtnArea.y, nextBtnArea.w, nextBtnArea.h, 4);

  fill(canGoNext ? 'white' : '#666');
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Next Step', nextBtnArea.x + nextBtnArea.w / 2, nextBtnArea.y + nextBtnArea.h / 2);

  // Show All button
  let canShowAll = !showAllSteps;
  fill(canShowAll ? '#2196F3' : '#bbb');
  stroke(canShowAll ? '#1976D2' : '#999');
  strokeWeight(1);
  rect(showAllBtnArea.x, showAllBtnArea.y, showAllBtnArea.w, showAllBtnArea.h, 4);

  fill(canShowAll ? 'white' : '#666');
  noStroke();
  textAlign(CENTER, CENTER);
  text('Show All', showAllBtnArea.x + showAllBtnArea.w / 2, showAllBtnArea.y + showAllBtnArea.h / 2);

  // Reset button
  fill('#FF9800');
  stroke('#F57C00');
  strokeWeight(1);
  rect(resetBtnArea.x, resetBtnArea.y, resetBtnArea.w, resetBtnArea.h, 4);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  text('Reset', resetBtnArea.x + resetBtnArea.w / 2, resetBtnArea.y + resetBtnArea.h / 2);

  // Step counter
  fill(100);
  textAlign(RIGHT, CENTER);
  textSize(11);
  let stepText = showAllSteps
    ? `All ${presets[currentPreset].steps.length} steps shown`
    : `Step ${currentStep + 1} of ${presets[currentPreset].steps.length}`;
  text(stepText, canvasWidth - margin, nextBtnArea.y + nextBtnArea.h / 2);
}

function mousePressed() {
  // Check preset buttons
  for (let btn of presetBtnAreas) {
    if (isInsideRect(mouseX, mouseY, btn)) {
      currentPreset = btn.index;
      currentStep = 0;
      showAllSteps = false;
      return;
    }
  }

  // Check Next Step button
  if (isInsideRect(mouseX, mouseY, nextBtnArea)) {
    if (currentStep < presets[currentPreset].steps.length - 1 && !showAllSteps) {
      currentStep++;
      fadeProgress = 0;
      isAnimating = true;
    }
    return;
  }

  // Check Show All button
  if (isInsideRect(mouseX, mouseY, showAllBtnArea)) {
    if (!showAllSteps) {
      showAllSteps = true;
      currentStep = presets[currentPreset].steps.length - 1;
    }
    return;
  }

  // Check Reset button
  if (isInsideRect(mouseX, mouseY, resetBtnArea)) {
    currentStep = 0;
    showAllSteps = false;
    fadeProgress = 1.0;
    isAnimating = false;
    return;
  }
}

function isInsideRect(mx, my, rect) {
  return mx >= rect.x && mx <= rect.x + rect.w &&
         my >= rect.y && my <= rect.y + rect.h;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateButtonAreas();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  canvasWidth = Math.max(canvasWidth, 600); // Minimum width
  updateButtonAreas();
}
