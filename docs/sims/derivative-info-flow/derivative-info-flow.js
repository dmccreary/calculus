// Derivative Information Flow Chart MicroSim
// Shows how information flows from f'' to f' to f
// Helps students understand the chain of logical implications between derivatives
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 200;
let defaultTextSize = 16;

// Box definitions
let boxes = [];
let arrows = [];
let connections = [];

// State management
let hoveredProperty = null;
let hoveredArrow = null;
let selectedProperty = null;
let traceStep = -1;
let traceScenario = [];

// Buttons
let traceButton;
let resetButton;

// Colors
const colors = {
  positive: '#22c55e', // green
  negative: '#ef4444', // red
  zero: '#3b82f6',     // blue
  highlight: '#fbbf24', // amber
  boxBg: '#f8fafc',
  boxBorder: '#64748b',
  arrowColor: '#475569',
  textColor: '#1e293b'
};

// Box properties data
const boxData = {
  fDoublePrime: {
    title: "f'' (Second Derivative)",
    properties: [
      { text: "f'' > 0", id: "fpp_pos", type: "positive" },
      { text: "f'' < 0", id: "fpp_neg", type: "negative" },
      { text: "f'' = 0 (sign change)", id: "fpp_zero", type: "zero" }
    ]
  },
  fPrime: {
    title: "f' (First Derivative)",
    properties: [
      { text: "f' increasing", id: "fp_inc", type: "positive" },
      { text: "f' decreasing", id: "fp_dec", type: "negative" },
      { text: "f' has extremum", id: "fp_ext", type: "zero" },
      { text: "f' > 0", id: "fp_pos", type: "positive" },
      { text: "f' < 0", id: "fp_neg", type: "negative" },
      { text: "f' = 0 (sign change)", id: "fp_zero", type: "zero" }
    ]
  },
  f: {
    title: "f (Original Function)",
    properties: [
      { text: "f concave up", id: "f_cup", type: "positive" },
      { text: "f concave down", id: "f_cdown", type: "negative" },
      { text: "f has inflection point", id: "f_infl", type: "zero" },
      { text: "f increasing", id: "f_inc", type: "positive" },
      { text: "f decreasing", id: "f_dec", type: "negative" },
      { text: "f has local extremum", id: "f_ext", type: "zero" }
    ]
  }
};

// Connection definitions (implications)
const connectionData = [
  // f'' to f' connections
  { from: "fpp_pos", to: "fp_inc", explanation: "If f'' > 0, then f' is increasing (slope getting steeper)" },
  { from: "fpp_neg", to: "fp_dec", explanation: "If f'' < 0, then f' is decreasing (slope getting less steep)" },
  { from: "fpp_zero", to: "fp_ext", explanation: "If f'' = 0 with sign change, f' has a local max or min" },

  // f' to f connections (from derivative properties)
  { from: "fp_inc", to: "f_cup", explanation: "If f' is increasing, f is concave up (curving upward)" },
  { from: "fp_dec", to: "f_cdown", explanation: "If f' is decreasing, f is concave down (curving downward)" },
  { from: "fp_ext", to: "f_infl", explanation: "If f' has an extremum, f has an inflection point" },
  { from: "fp_pos", to: "f_inc", explanation: "If f' > 0, then f is increasing (going uphill)" },
  { from: "fp_neg", to: "f_dec", explanation: "If f' < 0, then f is decreasing (going downhill)" },
  { from: "fp_zero", to: "f_ext", explanation: "If f' = 0 with sign change, f has a local max or min" }
];

// Trace scenarios
const traceScenarios = [
  {
    name: "Positive Chain",
    steps: [
      { highlight: ["fpp_pos"], message: "Start: f'' > 0 (positive second derivative)" },
      { highlight: ["fpp_pos", "fp_inc"], message: "Since f'' > 0, the first derivative f' is increasing" },
      { highlight: ["fp_inc", "f_cup"], message: "Since f' is increasing, the original function f is concave up" }
    ]
  },
  {
    name: "Negative Chain",
    steps: [
      { highlight: ["fpp_neg"], message: "Start: f'' < 0 (negative second derivative)" },
      { highlight: ["fpp_neg", "fp_dec"], message: "Since f'' < 0, the first derivative f' is decreasing" },
      { highlight: ["fp_dec", "f_cdown"], message: "Since f' is decreasing, the original function f is concave down" }
    ]
  },
  {
    name: "Zero Crossing Chain",
    steps: [
      { highlight: ["fpp_zero"], message: "Start: f'' = 0 with sign change" },
      { highlight: ["fpp_zero", "fp_ext"], message: "Sign change in f'' means f' has a local extremum" },
      { highlight: ["fp_ext", "f_infl"], message: "Extremum in f' means f has an inflection point" }
    ]
  }
];

let currentScenarioIndex = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create buttons
  traceButton = createButton('Trace Example');
  traceButton.position(10, drawHeight + 10);
  traceButton.mousePressed(startTrace);

  resetButton = createButton('Reset');
  resetButton.position(120, drawHeight + 10);
  resetButton.mousePressed(resetVisualization);

  // Initialize box positions
  initializeBoxes();

  describe('Interactive diagram showing how information flows from second derivative to first derivative to original function, with clickable properties and trace examples', LABEL);
}

function initializeBoxes() {
  let boxWidth = 180;
  let boxSpacing = (canvasWidth - 3 * boxWidth - 2 * margin) / 2;
  let startX = margin;
  let boxY = 60;

  boxes = [
    {
      ...boxData.fDoublePrime,
      x: startX,
      y: boxY,
      w: boxWidth,
      h: 110,
      key: 'fDoublePrime'
    },
    {
      ...boxData.fPrime,
      x: startX + boxWidth + boxSpacing,
      y: boxY,
      w: boxWidth,
      h: 190,
      key: 'fPrime'
    },
    {
      ...boxData.f,
      x: startX + 2 * (boxWidth + boxSpacing),
      y: boxY,
      w: boxWidth,
      h: 190,
      key: 'f'
    }
  ];

  // Update box widths based on canvas
  updateBoxPositions();
}

function updateBoxPositions() {
  let boxWidth = Math.min(200, (canvasWidth - 4 * margin) / 3);
  let boxSpacing = (canvasWidth - 3 * boxWidth - 2 * margin) / 2;
  let startX = margin;

  boxes[0].x = startX;
  boxes[0].w = boxWidth;
  boxes[1].x = startX + boxWidth + boxSpacing;
  boxes[1].w = boxWidth;
  boxes[2].x = startX + 2 * (boxWidth + boxSpacing);
  boxes[2].w = boxWidth;
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.textColor);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('Derivative Information Flow', canvasWidth / 2, 15);
  textSize(14);
  fill('#64748b');
  text('Click a property to see its implications, or hover over arrows for explanations', canvasWidth / 2, 42);

  // Draw arrows first (behind boxes)
  drawArrows();

  // Draw boxes
  drawBoxes();

  // Draw tooltip if hovering
  drawTooltip();

  // Draw trace message if active
  drawTraceMessage();

  // Draw control labels
  drawControlLabels();

  // Reset text settings
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawBoxes() {
  for (let box of boxes) {
    // Box background
    fill(colors.boxBg);
    stroke(colors.boxBorder);
    strokeWeight(2);
    rect(box.x, box.y, box.w, box.h, 8);

    // Box title
    fill(colors.textColor);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text(box.title, box.x + box.w / 2, box.y + 8);

    // Draw properties
    let propY = box.y + 35;
    let propHeight = 22;

    for (let prop of box.properties) {
      let isHighlighted = isPropertyHighlighted(prop.id);
      let isHovered = hoveredProperty === prop.id;
      let isSelected = selectedProperty === prop.id;

      // Property background
      let bgColor = getPropertyColor(prop.type, isHighlighted || isSelected);
      if (isHovered && !isHighlighted && !isSelected) {
        bgColor = color(200, 200, 200);
      }

      fill(bgColor);
      noStroke();
      rect(box.x + 5, propY, box.w - 10, propHeight, 4);

      // Property text
      fill(isHighlighted || isSelected ? 'white' : colors.textColor);
      textAlign(CENTER, CENTER);
      textSize(12);
      text(prop.text, box.x + box.w / 2, propY + propHeight / 2);

      // Store property bounds for click detection
      prop.bounds = { x: box.x + 5, y: propY, w: box.w - 10, h: propHeight };

      propY += propHeight + 4;
    }
  }
}

function getPropertyColor(type, highlight) {
  if (!highlight) return color(240, 240, 240);

  switch(type) {
    case 'positive': return color(colors.positive);
    case 'negative': return color(colors.negative);
    case 'zero': return color(colors.zero);
    default: return color(colors.highlight);
  }
}

function drawArrows() {
  // Draw main flow arrows between boxes
  let arrow1Start = { x: boxes[0].x + boxes[0].w, y: boxes[0].y + boxes[0].h / 2 };
  let arrow1End = { x: boxes[1].x, y: boxes[1].y + 50 };

  let arrow2Start = { x: boxes[1].x + boxes[1].w, y: boxes[1].y + boxes[1].h / 2 };
  let arrow2End = { x: boxes[2].x, y: boxes[2].y + boxes[2].h / 2 };

  // Check if hovering over arrows
  let hover1 = isNearArrow(mouseX, mouseY, arrow1Start, arrow1End);
  let hover2 = isNearArrow(mouseX, mouseY, arrow2Start, arrow2End);

  // Draw arrow 1 (f'' to f')
  drawArrow(arrow1Start.x, arrow1Start.y, arrow1End.x, arrow1End.y, hover1 ? colors.highlight : colors.arrowColor, hover1 ? 4 : 3);

  // Arrow 1 label
  let mid1X = (arrow1Start.x + arrow1End.x) / 2;
  let mid1Y = (arrow1Start.y + arrow1End.y) / 2 - 15;
  fill(hover1 ? colors.highlight : colors.arrowColor);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text("f'' is the", mid1X, mid1Y - 8);
  text("derivative of f'", mid1X, mid1Y + 6);

  // Draw arrow 2 (f' to f)
  drawArrow(arrow2Start.x, arrow2Start.y, arrow2End.x, arrow2End.y, hover2 ? colors.highlight : colors.arrowColor, hover2 ? 4 : 3);

  // Arrow 2 label
  let mid2X = (arrow2Start.x + arrow2End.x) / 2;
  let mid2Y = (arrow2Start.y + arrow2End.y) / 2 - 15;
  fill(hover2 ? colors.highlight : colors.arrowColor);
  text("f' is the", mid2X, mid2Y - 8);
  text("derivative of f", mid2X, mid2Y + 6);

  // Store arrow info for tooltip
  if (hover1) {
    hoveredArrow = "Think of f'' as measuring how f' changes. When f'' is positive, f' is increasing; when f'' is negative, f' is decreasing.";
  } else if (hover2) {
    hoveredArrow = "Think of f' as measuring how f changes. When f' is positive, f is increasing; when f' is negative, f is decreasing.";
  } else {
    hoveredArrow = null;
  }

  // Draw connection lines for highlighted properties
  if (selectedProperty || traceStep >= 0) {
    drawConnectionLines();
  }
}

function drawArrow(x1, y1, x2, y2, col, weight) {
  stroke(col);
  strokeWeight(weight);
  line(x1, y1, x2, y2);

  // Arrowhead
  let angle = atan2(y2 - y1, x2 - x1);
  let arrowSize = 12;

  fill(col);
  noStroke();
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(-arrowSize, -arrowSize/2, -arrowSize, arrowSize/2, 0, 0);
  pop();
}

function isNearArrow(mx, my, start, end) {
  // Check if point is near the line segment
  let d = distToSegment(mx, my, start.x, start.y, end.x, end.y);
  return d < 15;
}

function distToSegment(px, py, x1, y1, x2, y2) {
  let A = px - x1;
  let B = py - y1;
  let C = x2 - x1;
  let D = y2 - y1;

  let dot = A * C + B * D;
  let lenSq = C * C + D * D;
  let param = lenSq !== 0 ? dot / lenSq : -1;

  let xx, yy;
  if (param < 0) {
    xx = x1; yy = y1;
  } else if (param > 1) {
    xx = x2; yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  return dist(px, py, xx, yy);
}

function drawConnectionLines() {
  let highlightedIds = getHighlightedIds();

  for (let conn of connectionData) {
    if (highlightedIds.includes(conn.from) && highlightedIds.includes(conn.to)) {
      let fromProp = findProperty(conn.from);
      let toProp = findProperty(conn.to);

      if (fromProp && toProp && fromProp.bounds && toProp.bounds) {
        let col = getPropertyColor(fromProp.type, true);
        stroke(col);
        strokeWeight(3);

        let x1 = fromProp.bounds.x + fromProp.bounds.w;
        let y1 = fromProp.bounds.y + fromProp.bounds.h / 2;
        let x2 = toProp.bounds.x;
        let y2 = toProp.bounds.y + toProp.bounds.h / 2;

        // Draw curved connection
        noFill();
        let midX = (x1 + x2) / 2;
        bezier(x1, y1, midX, y1, midX, y2, x2, y2);
      }
    }
  }
}

function findProperty(id) {
  for (let box of boxes) {
    for (let prop of box.properties) {
      if (prop.id === id) return prop;
    }
  }
  return null;
}

function getHighlightedIds() {
  let ids = [];

  if (traceStep >= 0 && traceScenario.length > 0) {
    let step = traceScenario[traceStep];
    if (step) ids = step.highlight;
  } else if (selectedProperty) {
    ids = [selectedProperty];
    // Add connected properties
    for (let conn of connectionData) {
      if (conn.from === selectedProperty) {
        ids.push(conn.to);
      }
      if (conn.to === selectedProperty) {
        ids.push(conn.from);
      }
    }
  }

  return ids;
}

function isPropertyHighlighted(id) {
  return getHighlightedIds().includes(id);
}

function drawTooltip() {
  if (hoveredArrow && mouseY < drawHeight) {
    let tipWidth = min(300, canvasWidth - 40);
    let tipHeight = 60;
    let tipX = constrain(mouseX - tipWidth / 2, 10, canvasWidth - tipWidth - 10);
    let tipY = mouseY + 20;

    if (tipY + tipHeight > drawHeight - 10) {
      tipY = mouseY - tipHeight - 10;
    }

    fill(255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(tipX, tipY, tipWidth, tipHeight, 5);

    fill(colors.textColor);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text(hoveredArrow, tipX + 8, tipY + 8, tipWidth - 16, tipHeight - 16);
  }
}

function drawTraceMessage() {
  if (traceStep >= 0 && traceScenario.length > 0) {
    let step = traceScenario[traceStep];
    if (step) {
      // Message box at bottom of drawing area
      let msgY = drawHeight - 70;
      let msgHeight = 60;

      fill(255, 255, 220);
      stroke(colors.highlight);
      strokeWeight(2);
      rect(margin, msgY, canvasWidth - 2 * margin, msgHeight, 8);

      fill(colors.textColor);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(14);
      text(step.message, canvasWidth / 2, msgY + 20);

      // Step indicator
      textSize(12);
      fill('#64748b');
      text(`Step ${traceStep + 1} of ${traceScenario.length} - Click "Trace Example" for next step`, canvasWidth / 2, msgY + 45);
    }
  }
}

function drawControlLabels() {
  fill(colors.textColor);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);

  let scenarioName = traceScenarios[currentScenarioIndex].name;
  text('Scenario: ' + scenarioName, 220, drawHeight + 25);
}

function mousePressed() {
  // Check if clicking on a property
  for (let box of boxes) {
    for (let prop of box.properties) {
      if (prop.bounds &&
          mouseX > prop.bounds.x && mouseX < prop.bounds.x + prop.bounds.w &&
          mouseY > prop.bounds.y && mouseY < prop.bounds.y + prop.bounds.h) {

        if (selectedProperty === prop.id) {
          selectedProperty = null; // Deselect if clicking same
        } else {
          selectedProperty = prop.id;
          traceStep = -1; // Clear trace mode
        }
        return;
      }
    }
  }

  // If clicking elsewhere in drawing area, deselect
  if (mouseY < drawHeight) {
    selectedProperty = null;
  }
}

function mouseMoved() {
  // Track hovered property
  hoveredProperty = null;

  for (let box of boxes) {
    for (let prop of box.properties) {
      if (prop.bounds &&
          mouseX > prop.bounds.x && mouseX < prop.bounds.x + prop.bounds.w &&
          mouseY > prop.bounds.y && mouseY < prop.bounds.y + prop.bounds.h) {
        hoveredProperty = prop.id;
        cursor(HAND);
        return;
      }
    }
  }

  // Check if near arrows
  let arrow1Start = { x: boxes[0].x + boxes[0].w, y: boxes[0].y + boxes[0].h / 2 };
  let arrow1End = { x: boxes[1].x, y: boxes[1].y + 50 };
  let arrow2Start = { x: boxes[1].x + boxes[1].w, y: boxes[1].y + boxes[1].h / 2 };
  let arrow2End = { x: boxes[2].x, y: boxes[2].y + boxes[2].h / 2 };

  if (isNearArrow(mouseX, mouseY, arrow1Start, arrow1End) ||
      isNearArrow(mouseX, mouseY, arrow2Start, arrow2End)) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function startTrace() {
  selectedProperty = null;

  if (traceStep < 0) {
    // Start new trace
    traceScenario = traceScenarios[currentScenarioIndex].steps;
    traceStep = 0;
  } else {
    // Advance to next step
    traceStep++;
    if (traceStep >= traceScenario.length) {
      // Move to next scenario or reset
      currentScenarioIndex = (currentScenarioIndex + 1) % traceScenarios.length;
      traceStep = -1;
      traceScenario = [];
    }
  }
}

function resetVisualization() {
  selectedProperty = null;
  traceStep = -1;
  traceScenario = [];
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  updateBoxPositions();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
