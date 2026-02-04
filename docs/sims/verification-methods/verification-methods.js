// Verification Methods Comparison MicroSim
// Helps students judge which verification method is most appropriate for
// different optimization scenarios and apply the chosen method correctly.
// Bloom Level: Evaluate (L5)
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 80; // 2 rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph dimensions
let graphLeft = 50;
let graphRight;
let graphTop = 70;
let graphBottom = 220;

// Method panel dimensions
let panelTop = 235;
let panelHeight = 175;

// Controls
let scenarioSelect;
let methodSelect;
let applyButton;
let compareButton;

// State
let currentScenario = 0;
let currentMethod = -1; // -1 = none selected, 0-2 = specific method
let showAllMethods = false;

// Scenarios with different optimization behaviors
const scenarios = [
  {
    name: "Clear Interior Maximum",
    description: "f(x) = -x\u00B2 + 4x on [0, 5]",
    f: (x) => -x*x + 4*x,
    fPrime: (x) => -2*x + 4,
    fDoublePrime: (x) => -2,
    domain: [0, 5],
    criticalPoints: [2],
    bestMethod: 0, // Second Derivative Test works well
    explanation: "f''(2) = -2 < 0, so x = 2 is a local maximum. Since it's interior and f''(x) is clear, Second Derivative Test is efficient."
  },
  {
    name: "Maximum at Endpoint",
    description: "f(x) = x\u00B3 - 3x on [0, 2]",
    f: (x) => x*x*x - 3*x,
    fPrime: (x) => 3*x*x - 3,
    fDoublePrime: (x) => 6*x,
    domain: [0, 2],
    criticalPoints: [1],
    bestMethod: 2, // Must check endpoints
    explanation: "Critical point at x = 1 gives f(1) = -2. But f(0) = 0 and f(2) = 2. The maximum is at the endpoint x = 2!"
  },
  {
    name: "Second Derivative = 0",
    description: "f(x) = x\u2074 on [-1, 1]",
    f: (x) => x*x*x*x,
    fPrime: (x) => 4*x*x*x,
    fDoublePrime: (x) => 12*x*x,
    domain: [-1, 1],
    criticalPoints: [0],
    bestMethod: 1, // Need First Derivative Test
    explanation: "f''(0) = 0, so Second Derivative Test is INCONCLUSIVE. First Derivative Test shows f'(x) changes from - to +, confirming minimum."
  },
  {
    name: "Multiple Critical Points",
    description: "f(x) = x\u00B3 - 6x\u00B2 + 9x on [0, 4]",
    f: (x) => x*x*x - 6*x*x + 9*x,
    fPrime: (x) => 3*x*x - 12*x + 9,
    fDoublePrime: (x) => 6*x - 12,
    domain: [0, 4],
    criticalPoints: [1, 3],
    bestMethod: 2, // Need careful endpoint comparison
    explanation: "Two critical points: x = 1 (local max) and x = 3 (local min). Must compare all values including endpoints to find global extrema."
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Create scenario dropdown
  scenarioSelect = createSelect();
  scenarioSelect.position(70, drawHeight + 8);
  scenarioSelect.option('1. Clear Interior Maximum');
  scenarioSelect.option('2. Maximum at Endpoint');
  scenarioSelect.option('3. Second Derivative = 0');
  scenarioSelect.option('4. Multiple Critical Points');
  scenarioSelect.changed(scenarioChanged);

  // Create method dropdown
  methodSelect = createSelect();
  methodSelect.position(canvasWidth - 250, drawHeight + 8);
  methodSelect.option('Choose a method...');
  methodSelect.option('Second Derivative Test');
  methodSelect.option('First Derivative Test');
  methodSelect.option('Endpoint Comparison');
  methodSelect.changed(methodChanged);

  // Create Apply Method button
  applyButton = createButton('Apply Method');
  applyButton.position(10, drawHeight + 45);
  applyButton.mousePressed(applyMethod);

  // Create Compare All button
  compareButton = createButton('Compare All');
  compareButton.position(110, drawHeight + 45);
  compareButton.mousePressed(compareAllMethods);

  describe('Interactive MicroSim for comparing verification methods in calculus optimization. Students select scenarios and methods to judge which approach is most appropriate.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Calculate responsive dimensions
  graphRight = canvasWidth - margin;

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Verification Methods Comparison', canvasWidth / 2, 8);

  textSize(14);
  fill(80);
  text('Judge which method works best for each scenario', canvasWidth / 2, 32);

  // Draw the function graph
  drawFunctionGraph();

  // Draw method panels
  if (showAllMethods) {
    drawAllMethodPanels();
  } else if (currentMethod >= 0) {
    drawSingleMethodPanel(currentMethod);
  } else {
    drawInstructionPanel();
  }

  // Draw control labels
  drawControlLabels();
}

function drawFunctionGraph() {
  let scenario = scenarios[currentScenario];

  // Graph background
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(graphLeft - 10, graphTop - 20, graphRight - graphLeft + 20, graphBottom - graphTop + 35, 8);

  // Scenario label
  fill(40);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text(scenario.name + ': ' + scenario.description, graphLeft, graphTop - 15);

  // Draw axes
  stroke(100);
  strokeWeight(1);
  let axisY = graphBottom;
  line(graphLeft, axisY, graphRight, axisY); // x-axis
  line(graphLeft, graphTop, graphLeft, graphBottom); // y-axis

  // Axis labels
  fill(60);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  text('x', (graphLeft + graphRight) / 2, graphBottom + 5);
  textAlign(RIGHT, CENTER);
  text('f(x)', graphLeft - 5, (graphTop + graphBottom) / 2);

  // Calculate y range
  let domain = scenario.domain;
  let yMin = Infinity, yMax = -Infinity;
  for (let x = domain[0]; x <= domain[1]; x += 0.1) {
    let y = scenario.f(x);
    yMin = min(yMin, y);
    yMax = max(yMax, y);
  }
  let yPadding = (yMax - yMin) * 0.1;
  yMin -= yPadding;
  yMax += yPadding;

  // Draw grid
  stroke(230);
  strokeWeight(1);
  for (let i = 0; i <= 5; i++) {
    let x = map(i, 0, 5, graphLeft, graphRight);
    line(x, graphTop, x, graphBottom);
  }
  for (let i = 0; i <= 4; i++) {
    let y = map(i, 0, 4, graphBottom, graphTop);
    line(graphLeft, y, graphRight, y);
  }

  // Draw function curve
  stroke(0, 100, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let px = domain[0]; px <= domain[1]; px += 0.05) {
    let screenX = map(px, domain[0], domain[1], graphLeft + 10, graphRight - 10);
    let screenY = map(scenario.f(px), yMin, yMax, graphBottom - 5, graphTop + 5);
    vertex(screenX, screenY);
  }
  endShape();

  // Mark critical points
  for (let cp of scenario.criticalPoints) {
    let screenX = map(cp, domain[0], domain[1], graphLeft + 10, graphRight - 10);
    let screenY = map(scenario.f(cp), yMin, yMax, graphBottom - 5, graphTop + 5);

    // Point marker
    fill(255, 100, 0);
    noStroke();
    circle(screenX, screenY, 14);

    // Label
    fill(200, 60, 0);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('x=' + cp, screenX, screenY - 10);
  }

  // Mark endpoints
  for (let ep of domain) {
    let screenX = map(ep, domain[0], domain[1], graphLeft + 10, graphRight - 10);
    let screenY = map(scenario.f(ep), yMin, yMax, graphBottom - 5, graphTop + 5);

    stroke(100, 100, 200);
    strokeWeight(2);
    fill(150, 150, 255);
    circle(screenX, screenY, 10);
  }

  // Domain labels
  noStroke();
  fill(80);
  textSize(11);
  textAlign(CENTER, TOP);
  text(domain[0], map(domain[0], domain[0], domain[1], graphLeft + 10, graphRight - 10), graphBottom + 2);
  text(domain[1], map(domain[1], domain[0], domain[1], graphLeft + 10, graphRight - 10), graphBottom + 2);
}

function drawInstructionPanel() {
  let panelWidth = canvasWidth - 2 * margin;

  // Panel background
  fill(255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(margin, panelTop, panelWidth, panelHeight, 8);

  // Instructions
  fill(60);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text('Choose a method and click "Apply Method" to see the analysis', canvasWidth / 2, panelTop + 40);
  text('Or click "Compare All" to see all three methods side by side', canvasWidth / 2, panelTop + 70);

  // Hint about best method
  textSize(14);
  fill(100, 100, 150);
  text('Think about which method will give you the most useful information', canvasWidth / 2, panelTop + 110);
  text('for this particular scenario before revealing the answer!', canvasWidth / 2, panelTop + 130);
}

function drawSingleMethodPanel(methodIndex) {
  let panelWidth = canvasWidth - 2 * margin;

  drawMethodContent(margin, panelTop, panelWidth, panelHeight, methodIndex, true);
}

function drawAllMethodPanels() {
  let scenario = scenarios[currentScenario];
  let panelWidth = (canvasWidth - 4 * margin) / 3;

  for (let i = 0; i < 3; i++) {
    let x = margin + i * (panelWidth + margin);
    let isBest = (i === scenario.bestMethod);
    drawMethodContent(x, panelTop, panelWidth, panelHeight, i, isBest);
  }
}

function drawMethodContent(x, y, w, h, methodIndex, highlight) {
  let scenario = scenarios[currentScenario];

  // Method names and colors
  const methodNames = ['Second Derivative Test', 'First Derivative Test', 'Endpoint Comparison'];
  const methodColors = [[0, 150, 100], [150, 100, 0], [100, 0, 150]];

  // Determine result status
  let isConclusive = true;
  let isBestMethod = (methodIndex === scenario.bestMethod);

  // Panel background color based on result
  let bgColor;
  if (methodIndex === 0 && currentScenario === 2) {
    // Second derivative = 0 case - inconclusive
    bgColor = color(255, 255, 200); // Yellow for inconclusive
    isConclusive = false;
  } else if (isBestMethod && showAllMethods) {
    bgColor = color(220, 255, 220); // Green for best method
  } else {
    bgColor = color(255, 255, 255);
  }

  fill(bgColor);
  stroke(isBestMethod && showAllMethods ? color(0, 150, 0) : color(200));
  strokeWeight(isBestMethod && showAllMethods ? 3 : 1);
  rect(x, y, w, h, 8);

  // Method title
  fill(methodColors[methodIndex][0], methodColors[methodIndex][1], methodColors[methodIndex][2]);
  noStroke();
  textSize(showAllMethods ? 13 : 16);
  textAlign(CENTER, TOP);
  text(methodNames[methodIndex], x + w/2, y + 8);

  // Method content
  textSize(showAllMethods ? 11 : 14);
  fill(40);
  textAlign(LEFT, TOP);

  let textY = y + 30;
  let textX = x + 10;
  let lineHeight = showAllMethods ? 16 : 20;

  if (methodIndex === 0) {
    // Second Derivative Test
    for (let cp of scenario.criticalPoints) {
      let fpp = scenario.fDoublePrime(cp);
      text('At x = ' + cp + ':', textX, textY);
      textY += lineHeight;
      text('  f\'\'(' + cp + ') = ' + fpp.toFixed(2), textX, textY);
      textY += lineHeight;

      if (fpp < 0) {
        fill(0, 130, 0);
        text('  f\'\' < 0: Local Maximum', textX, textY);
      } else if (fpp > 0) {
        fill(0, 130, 0);
        text('  f\'\' > 0: Local Minimum', textX, textY);
      } else {
        fill(180, 100, 0);
        text('  f\'\' = 0: INCONCLUSIVE', textX, textY);
      }
      fill(40);
      textY += lineHeight + 5;
    }
  } else if (methodIndex === 1) {
    // First Derivative Test
    for (let cp of scenario.criticalPoints) {
      let leftVal = scenario.fPrime(cp - 0.1);
      let rightVal = scenario.fPrime(cp + 0.1);

      text('At x = ' + cp + ':', textX, textY);
      textY += lineHeight;

      let leftSign = leftVal > 0 ? '+' : '-';
      let rightSign = rightVal > 0 ? '+' : '-';

      text('  Left of ' + cp + ': f\'(x) is ' + leftSign, textX, textY);
      textY += lineHeight;
      text('  Right of ' + cp + ': f\'(x) is ' + rightSign, textX, textY);
      textY += lineHeight;

      fill(0, 130, 0);
      if (leftVal > 0 && rightVal < 0) {
        text('  Sign: + to - : Local Max', textX, textY);
      } else if (leftVal < 0 && rightVal > 0) {
        text('  Sign: - to + : Local Min', textX, textY);
      } else {
        fill(180, 100, 0);
        text('  No sign change', textX, textY);
      }
      fill(40);
      textY += lineHeight + 5;
    }
  } else {
    // Endpoint Comparison
    let domain = scenario.domain;
    let values = [];

    // Endpoints
    for (let ep of domain) {
      values.push({x: ep, y: scenario.f(ep), type: 'endpoint'});
    }

    // Critical points
    for (let cp of scenario.criticalPoints) {
      if (cp > domain[0] && cp < domain[1]) {
        values.push({x: cp, y: scenario.f(cp), type: 'critical'});
      }
    }

    // Sort by y value
    values.sort((a, b) => b.y - a.y);

    text('Comparing all candidates:', textX, textY);
    textY += lineHeight + 3;

    for (let i = 0; i < values.length; i++) {
      let v = values[i];
      let typeLabel = v.type === 'endpoint' ? '(endpoint)' : '(critical)';
      if (i === 0) {
        fill(0, 130, 0);
        text('  f(' + v.x + ') = ' + v.y.toFixed(2) + ' ' + typeLabel + ' MAX', textX, textY);
      } else if (i === values.length - 1) {
        fill(0, 100, 180);
        text('  f(' + v.x + ') = ' + v.y.toFixed(2) + ' ' + typeLabel + ' MIN', textX, textY);
      } else {
        fill(80);
        text('  f(' + v.x + ') = ' + v.y.toFixed(2) + ' ' + typeLabel, textX, textY);
      }
      fill(40);
      textY += lineHeight;
    }
  }

  // Conclusion indicator
  if (showAllMethods && isBestMethod) {
    fill(0, 150, 0);
    textSize(showAllMethods ? 11 : 13);
    textAlign(CENTER, BOTTOM);
    text('BEST METHOD', x + w/2, y + h - 5);
  } else if (!isConclusive) {
    fill(180, 100, 0);
    textSize(showAllMethods ? 11 : 13);
    textAlign(CENTER, BOTTOM);
    text('INCONCLUSIVE', x + w/2, y + h - 5);
  }
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  // Scenario dropdown label
  text('Scenario:', 10, drawHeight + 20);

  // Method dropdown label
  text('Method:', canvasWidth - 320, drawHeight + 20);

  // Status indicator
  if (showAllMethods) {
    fill(0, 130, 0);
    textAlign(LEFT, CENTER);
    text('Showing all methods - Green border = recommended method', 220, drawHeight + 57);
  } else if (currentMethod >= 0) {
    let scenario = scenarios[currentScenario];
    if (currentMethod === scenario.bestMethod) {
      fill(0, 130, 0);
      text('Good choice! This method works well for this scenario.', 220, drawHeight + 57);
    } else {
      fill(180, 100, 0);
      text('This method works, but another might be more efficient.', 220, drawHeight + 57);
    }
  }
}

function scenarioChanged() {
  let selected = scenarioSelect.value();
  if (selected.startsWith('1.')) currentScenario = 0;
  else if (selected.startsWith('2.')) currentScenario = 1;
  else if (selected.startsWith('3.')) currentScenario = 2;
  else if (selected.startsWith('4.')) currentScenario = 3;

  // Reset method selection
  currentMethod = -1;
  showAllMethods = false;
  methodSelect.selected('Choose a method...');
}

function methodChanged() {
  let selected = methodSelect.value();
  if (selected === 'Choose a method...') currentMethod = -1;
  else if (selected === 'Second Derivative Test') currentMethod = 0;
  else if (selected === 'First Derivative Test') currentMethod = 1;
  else if (selected === 'Endpoint Comparison') currentMethod = 2;

  showAllMethods = false;
}

function applyMethod() {
  if (currentMethod < 0) {
    methodSelect.selected('Second Derivative Test');
    currentMethod = 0;
  }
  showAllMethods = false;
}

function compareAllMethods() {
  showAllMethods = true;
  currentMethod = -1;
  methodSelect.selected('Choose a method...');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  // Reposition method dropdown
  methodSelect.position(canvasWidth - 250, drawHeight + 8);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
