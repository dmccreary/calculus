// Inverse Trig Domains MicroSim
// Learning Objective: Students will identify the domain and range of each
// inverse trigonometric function.
// Bloom Level: Remember (L1)
// MicroSim template version 2026.02
// schema: https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 750;
let drawHeight = 450;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 50;
let chartTop = 55;  // Below title/subtitle
let defaultTextSize = 16;

// Graph dimensions
let graphWidth, graphHeight;
let leftGraphX, rightGraphX;  // x-position of left/right graph centers
let graphY;  // y-center of graphs

// Inverse trig function data
let invTrigFunctions = [
  {
    name: 'arcsin(x)',
    parent: 'sin(x)',
    fn: x => Math.asin(x),
    parentFn: x => Math.sin(x),
    domain: [-1, 1],
    range: [-Math.PI/2, Math.PI/2],
    restrictedDomain: [-Math.PI/2, Math.PI/2],
    domainLabel: '[-1, 1]',
    rangeLabel: '[-pi/2, pi/2]',
    explanation: 'We restrict sine to [-pi/2, pi/2] where it is one-to-one and covers all possible outputs [-1, 1]. This interval contains the origin and is symmetric.'
  },
  {
    name: 'arccos(x)',
    parent: 'cos(x)',
    fn: x => Math.acos(x),
    parentFn: x => Math.cos(x),
    domain: [-1, 1],
    range: [0, Math.PI],
    restrictedDomain: [0, Math.PI],
    domainLabel: '[-1, 1]',
    rangeLabel: '[0, pi]',
    explanation: 'We restrict cosine to [0, pi] where it is one-to-one and covers all outputs [-1, 1]. This interval starts at 0 and is the standard choice.'
  },
  {
    name: 'arctan(x)',
    parent: 'tan(x)',
    fn: x => Math.atan(x),
    parentFn: x => Math.tan(x),
    domain: [-Infinity, Infinity],
    range: [-Math.PI/2, Math.PI/2],
    restrictedDomain: [-Math.PI/2, Math.PI/2],
    domainLabel: '(-inf, inf)',
    rangeLabel: '(-pi/2, pi/2)',
    explanation: 'We restrict tangent to (-pi/2, pi/2) where it is one-to-one and covers all real outputs. The endpoints are vertical asymptotes.'
  },
  {
    name: 'arccot(x)',
    parent: 'cot(x)',
    fn: x => Math.PI/2 - Math.atan(x),  // arccot(x) = pi/2 - arctan(x)
    parentFn: x => 1/Math.tan(x),
    domain: [-Infinity, Infinity],
    range: [0, Math.PI],
    restrictedDomain: [0, Math.PI],
    domainLabel: '(-inf, inf)',
    rangeLabel: '(0, pi)',
    explanation: 'We restrict cotangent to (0, pi) where it is one-to-one. The endpoints 0 and pi are vertical asymptotes of cot(x).'
  },
  {
    name: 'arcsec(x)',
    parent: 'sec(x)',
    fn: x => Math.acos(1/x),
    parentFn: x => 1/Math.cos(x),
    domain: [-Infinity, -1, 1, Infinity],  // |x| >= 1
    range: [0, Math.PI/2, Math.PI/2, Math.PI],
    restrictedDomain: [0, Math.PI],
    domainLabel: '|x| >= 1',
    rangeLabel: '[0, pi/2) U (pi/2, pi]',
    explanation: 'We restrict secant to [0, pi] (excluding pi/2 where sec is undefined). The range excludes values where |sec(x)| < 1.'
  },
  {
    name: 'arccsc(x)',
    parent: 'csc(x)',
    fn: x => Math.asin(1/x),
    parentFn: x => 1/Math.sin(x),
    domain: [-Infinity, -1, 1, Infinity],  // |x| >= 1
    range: [-Math.PI/2, 0, 0, Math.PI/2],
    restrictedDomain: [-Math.PI/2, Math.PI/2],
    domainLabel: '|x| >= 1',
    rangeLabel: '[-pi/2, 0) U (0, pi/2]',
    explanation: 'We restrict cosecant to [-pi/2, pi/2] (excluding 0 where csc is undefined). The range excludes values where |csc(x)| < 1.'
  }
];

let currentFunctionIndex = 0;

// Horizontal line for demonstration
let hLineY = 0.5;  // y-value of horizontal line (in function coordinates)

// UI state
let showBothGraphs = false;
let showExplanation = false;
let activeSlider = false;

// Button positions
let btnWhyX, btnWhyY, btnWhyW, btnWhyH;
let toggleX, toggleY, toggleW, toggleH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateGraphLayout();

  describe('Inverse Trig Domains: Visualize domain restrictions for inverse trig functions using the horizontal line test.', LABEL);
}

function updateGraphLayout() {
  graphWidth = (canvasWidth - 3 * margin) / 2 - 20;
  graphHeight = drawHeight - chartTop - margin - 20;
  leftGraphX = margin + graphWidth/2 + 10;
  rightGraphX = canvasWidth - margin - graphWidth/2 - 10;
  graphY = chartTop + graphHeight/2 + 10;
}

function draw() {
  updateCanvasSize();
  updateGraphLayout();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let func = invTrigFunctions[currentFunctionIndex];

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Inverse Trig Functions: Domain Restrictions', canvasWidth/2, 5);
  textSize(14);
  fill('#666');
  text('Why do we need domain restrictions?', canvasWidth/2, 28);

  // Draw both graphs side by side
  drawParentGraph(func);
  drawInverseGraph(func);

  // Draw horizontal line test on parent graph
  drawHorizontalLineTest(func);

  // Draw domain/range labels
  drawDomainRangeLabels(func);

  // Draw controls
  drawControls(func);

  // Draw explanation if visible
  if (showExplanation) {
    drawExplanationBox(func);
  }
}

function drawParentGraph(func) {
  let gx = leftGraphX;
  let gy = graphY;
  let gw = graphWidth;
  let gh = graphHeight;

  // Graph background
  fill(255);
  stroke('#ccc');
  strokeWeight(1);
  rect(gx - gw/2, gy - gh/2, gw, gh, 5);

  // Title for left graph
  fill('black');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(14);
  text('Original: ' + func.parent, gx, gy - gh/2 - 5);

  // Calculate scale based on function type
  let xMin, xMax, yMin, yMax;
  if (func.name.includes('sec') || func.name.includes('csc')) {
    xMin = -Math.PI * 1.5;
    xMax = Math.PI * 1.5;
    yMin = -4;
    yMax = 4;
  } else if (func.name.includes('tan') || func.name.includes('cot')) {
    xMin = -Math.PI * 1.5;
    xMax = Math.PI * 1.5;
    yMin = -5;
    yMax = 5;
  } else {
    xMin = -2 * Math.PI;
    xMax = 2 * Math.PI;
    yMin = -1.5;
    yMax = 1.5;
  }

  let scaleX = gw / (xMax - xMin);
  let scaleY = gh / (yMax - yMin);

  // Draw grid
  stroke('#eee');
  strokeWeight(1);

  // Vertical grid lines
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    let px = gx + (x - (xMin + xMax)/2) * scaleX;
    if (px > gx - gw/2 && px < gx + gw/2) {
      line(px, gy - gh/2, px, gy + gh/2);
    }
  }

  // Horizontal grid lines
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
    let py = gy - (y - (yMin + yMax)/2) * scaleY;
    if (py > gy - gh/2 && py < gy + gh/2) {
      line(gx - gw/2, py, gx + gw/2, py);
    }
  }

  // Draw axes
  stroke('#999');
  strokeWeight(1.5);
  // x-axis
  let axisY = gy - (0 - (yMin + yMax)/2) * scaleY;
  if (axisY > gy - gh/2 && axisY < gy + gh/2) {
    line(gx - gw/2, axisY, gx + gw/2, axisY);
  }
  // y-axis
  let axisX = gx + (0 - (xMin + xMax)/2) * scaleX;
  if (axisX > gx - gw/2 && axisX < gx + gw/2) {
    line(axisX, gy - gh/2, axisX, gy + gh/2);
  }

  // Draw the full parent function (gray/dashed)
  stroke('#bbb');
  strokeWeight(2);
  noFill();
  drawFunctionCurve(func.parentFn, gx, gy, gw, gh, xMin, xMax, yMin, yMax, false);

  // Draw restricted domain portion (blue, bold)
  stroke('#2196F3');
  strokeWeight(3);
  let rMin = func.restrictedDomain[0];
  let rMax = func.restrictedDomain[1];
  drawFunctionCurve(func.parentFn, gx, gy, gw, gh, rMin, rMax, yMin, yMax, true);

  // Highlight restricted domain on x-axis
  let rMinPx = gx + (rMin - (xMin + xMax)/2) * scaleX;
  let rMaxPx = gx + (rMax - (xMin + xMax)/2) * scaleX;
  rMinPx = constrain(rMinPx, gx - gw/2, gx + gw/2);
  rMaxPx = constrain(rMaxPx, gx - gw/2, gx + gw/2);

  stroke('#4CAF50');
  strokeWeight(4);
  if (axisY > gy - gh/2 && axisY < gy + gh/2) {
    line(rMinPx, axisY, rMaxPx, axisY);
  }

  // Label restricted domain
  fill('#4CAF50');
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  if (axisY < gy + gh/2 - 20) {
    text('Restricted Domain', (rMinPx + rMaxPx)/2, axisY + 5);
  }
}

function drawInverseGraph(func) {
  let gx = rightGraphX;
  let gy = graphY;
  let gw = graphWidth;
  let gh = graphHeight;

  // Graph background
  fill(255);
  stroke('#ccc');
  strokeWeight(1);
  rect(gx - gw/2, gy - gh/2, gw, gh, 5);

  // Title for right graph
  fill('black');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(14);
  text('Inverse: ' + func.name, gx, gy - gh/2 - 5);

  // Calculate scale for inverse function
  let xMin, xMax, yMin, yMax;
  if (func.name.includes('sec') || func.name.includes('csc')) {
    xMin = -5;
    xMax = 5;
    yMin = -Math.PI;
    yMax = Math.PI;
  } else if (func.name.includes('tan') || func.name.includes('cot')) {
    xMin = -5;
    xMax = 5;
    yMin = -Math.PI;
    yMax = Math.PI;
  } else {
    xMin = -2;
    xMax = 2;
    yMin = -Math.PI;
    yMax = Math.PI;
  }

  let scaleX = gw / (xMax - xMin);
  let scaleY = gh / (yMax - yMin);

  // Draw grid
  stroke('#eee');
  strokeWeight(1);

  // Vertical grid lines
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
    let px = gx + (x - (xMin + xMax)/2) * scaleX;
    if (px > gx - gw/2 && px < gx + gw/2) {
      line(px, gy - gh/2, px, gy + gh/2);
    }
  }

  // Horizontal grid lines at multiples of pi/2
  for (let k = -2; k <= 2; k++) {
    let y = k * Math.PI / 2;
    let py = gy - (y - (yMin + yMax)/2) * scaleY;
    if (py > gy - gh/2 && py < gy + gh/2) {
      line(gx - gw/2, py, gx + gw/2, py);
    }
  }

  // Draw axes
  stroke('#999');
  strokeWeight(1.5);
  // x-axis
  let axisY = gy - (0 - (yMin + yMax)/2) * scaleY;
  if (axisY > gy - gh/2 && axisY < gy + gh/2) {
    line(gx - gw/2, axisY, gx + gw/2, axisY);
  }
  // y-axis
  let axisX = gx + (0 - (xMin + xMax)/2) * scaleX;
  if (axisX > gx - gw/2 && axisX < gx + gw/2) {
    line(axisX, gy - gh/2, axisX, gy + gh/2);
  }

  // Draw inverse function
  stroke('#FF5722');
  strokeWeight(3);
  noFill();

  // Handle special cases for sec/csc with discontinuities
  if (func.name === 'arcsec(x)' || func.name === 'arccsc(x)') {
    // Draw left branch (x <= -1)
    beginShape();
    for (let px = gx - gw/2; px <= gx + gw/2; px += 2) {
      let x = (px - gx) / scaleX + (xMin + xMax)/2;
      if (x <= -1) {
        let y = func.fn(x);
        if (isFinite(y) && !isNaN(y)) {
          let py = gy - (y - (yMin + yMax)/2) * scaleY;
          if (py > gy - gh/2 && py < gy + gh/2) {
            vertex(px, py);
          }
        }
      }
    }
    endShape();

    // Draw right branch (x >= 1)
    beginShape();
    for (let px = gx - gw/2; px <= gx + gw/2; px += 2) {
      let x = (px - gx) / scaleX + (xMin + xMax)/2;
      if (x >= 1) {
        let y = func.fn(x);
        if (isFinite(y) && !isNaN(y)) {
          let py = gy - (y - (yMin + yMax)/2) * scaleY;
          if (py > gy - gh/2 && py < gy + gh/2) {
            vertex(px, py);
          }
        }
      }
    }
    endShape();
  } else {
    // Regular inverse function
    beginShape();
    for (let px = gx - gw/2; px <= gx + gw/2; px += 2) {
      let x = (px - gx) / scaleX + (xMin + xMax)/2;
      let y = func.fn(x);
      if (isFinite(y) && !isNaN(y)) {
        let py = gy - (y - (yMin + yMax)/2) * scaleY;
        if (py > gy - gh/2 && py < gy + gh/2) {
          vertex(px, py);
        }
      }
    }
    endShape();
  }

  // Draw y = x line if showing both
  if (showBothGraphs) {
    stroke('#9C27B0');
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    beginShape();
    for (let px = gx - gw/2; px <= gx + gw/2; px += 5) {
      let x = (px - gx) / scaleX + (xMin + xMax)/2;
      let y = x;  // y = x line
      let py = gy - (y - (yMin + yMax)/2) * scaleY;
      if (py > gy - gh/2 && py < gy + gh/2) {
        vertex(px, py);
      }
    }
    endShape();
    drawingContext.setLineDash([]);
  }

  // Label axes
  fill('#666');
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text('x', gx + gw/2 - 10, axisY + 3);
  textAlign(RIGHT, CENTER);
  text('y', axisX - 5, gy - gh/2 + 15);
}

function drawFunctionCurve(fn, gx, gy, gw, gh, xMin, xMax, yMin, yMax, isRestricted) {
  let totalXMin = xMin - (xMax - xMin) * 0.1;
  let totalXMax = xMax + (xMax - xMin) * 0.1;
  let scaleX = gw / (totalXMax - totalXMin);

  // Use the graph's yMin/yMax for consistent scaling
  let graphYMin, graphYMax;
  if (Math.abs(yMax) <= 2) {
    graphYMin = -1.5;
    graphYMax = 1.5;
  } else {
    graphYMin = yMin;
    graphYMax = yMax;
  }
  let scaleY = gh / (graphYMax - graphYMin);

  let prevValid = false;
  beginShape();
  for (let px = gx - gw/2; px <= gx + gw/2; px += 1) {
    let x = (px - gx) / scaleX + (totalXMin + totalXMax)/2;

    // Skip if outside restricted domain when drawing restricted portion
    if (isRestricted && (x < xMin - 0.01 || x > xMax + 0.01)) {
      if (prevValid) {
        endShape();
        beginShape();
        prevValid = false;
      }
      continue;
    }

    let y = fn(x);

    if (isFinite(y) && !isNaN(y) && y >= graphYMin && y <= graphYMax) {
      let py = gy - (y - (graphYMin + graphYMax)/2) * scaleY;
      if (py > gy - gh/2 && py < gy + gh/2) {
        vertex(px, py);
        prevValid = true;
      } else {
        if (prevValid) {
          endShape();
          beginShape();
          prevValid = false;
        }
      }
    } else {
      if (prevValid) {
        endShape();
        beginShape();
        prevValid = false;
      }
    }
  }
  endShape();
}

function drawHorizontalLineTest(func) {
  let gx = leftGraphX;
  let gy = graphY;
  let gw = graphWidth;
  let gh = graphHeight;

  // Calculate y range for this function
  let yMin, yMax;
  if (func.name.includes('sec') || func.name.includes('csc')) {
    yMin = -4;
    yMax = 4;
  } else if (func.name.includes('tan') || func.name.includes('cot')) {
    yMin = -5;
    yMax = 5;
  } else {
    yMin = -1.5;
    yMax = 1.5;
  }

  // Clamp hLineY to valid range for sine/cosine
  let effectiveY = hLineY;
  if (func.name === 'arcsin(x)' || func.name === 'arccos(x)') {
    effectiveY = constrain(hLineY, -1, 1);
  }

  let scaleY = gh / (yMax - yMin);
  let lineScreenY = gy - (effectiveY - (yMin + yMax)/2) * scaleY;

  // Draw horizontal line
  if (lineScreenY > gy - gh/2 && lineScreenY < gy + gh/2) {
    stroke('#FF5722');
    strokeWeight(2);
    line(gx - gw/2, lineScreenY, gx + gw/2, lineScreenY);

    // Find intersection points
    let intersections = findIntersections(func, effectiveY, gx, gy, gw, gh);

    // Draw intersection points
    fill('#FF5722');
    noStroke();
    for (let pt of intersections) {
      // Check if this point is in restricted domain
      let inRestricted = pt.x >= func.restrictedDomain[0] - 0.1 &&
                         pt.x <= func.restrictedDomain[1] + 0.1;

      if (inRestricted) {
        fill('#4CAF50');  // Green for restricted domain
      } else {
        fill('#FF5722');  // Orange for outside
      }
      circle(pt.screenX, lineScreenY, 12);
    }

    // Show intersection count
    let totalIntersections = intersections.length;
    let restrictedIntersections = intersections.filter(pt =>
      pt.x >= func.restrictedDomain[0] - 0.1 &&
      pt.x <= func.restrictedDomain[1] + 0.1
    ).length;

    fill('#333');
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);
    let infoY = gy + gh/2 + 5;
    text('Horizontal line y = ' + effectiveY.toFixed(2), gx - gw/2, infoY);
    text('Full curve: ' + totalIntersections + ' intersection(s)', gx - gw/2, infoY + 14);
    fill('#4CAF50');
    text('Restricted: ' + restrictedIntersections + ' intersection', gx - gw/2, infoY + 28);
  }
}

function findIntersections(func, yVal, gx, gy, gw, gh) {
  let intersections = [];

  // Calculate x range
  let xMin, xMax;
  if (func.name.includes('sec') || func.name.includes('csc')) {
    xMin = -Math.PI * 1.5;
    xMax = Math.PI * 1.5;
  } else if (func.name.includes('tan') || func.name.includes('cot')) {
    xMin = -Math.PI * 1.5;
    xMax = Math.PI * 1.5;
  } else {
    xMin = -2 * Math.PI;
    xMax = 2 * Math.PI;
  }

  let scaleX = gw / (xMax - xMin);

  // Sample the function and find where it crosses yVal
  let step = 0.02;
  let prevY = null;
  for (let x = xMin; x <= xMax; x += step) {
    let y = func.parentFn(x);

    if (prevY !== null && isFinite(y) && isFinite(prevY)) {
      // Check if we crossed the target y value
      if ((prevY <= yVal && y >= yVal) || (prevY >= yVal && y <= yVal)) {
        // Linear interpolation to find crossing point
        let t = (yVal - prevY) / (y - prevY);
        let crossX = x - step + t * step;
        let screenX = gx + (crossX - (xMin + xMax)/2) * scaleX;

        // Avoid duplicates
        let isDuplicate = intersections.some(pt => Math.abs(pt.x - crossX) < 0.1);
        if (!isDuplicate && screenX > gx - gw/2 && screenX < gx + gw/2) {
          intersections.push({ x: crossX, screenX: screenX });
        }
      }
    }
    prevY = y;
  }

  return intersections;
}

function drawDomainRangeLabels(func) {
  // Domain/Range info box
  let boxW = 180;
  let boxH = 55;
  let boxX = canvasWidth - boxW - 10;
  let boxY = chartTop + 5;

  fill(255, 255, 255, 240);
  stroke('#ccc');
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 8);

  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);

  fill('#4CAF50');
  text('Domain: ', boxX + 10, boxY + 8);
  fill('#333');
  text(func.domainLabel, boxX + 65, boxY + 8);

  fill('#2196F3');
  text('Range: ', boxX + 10, boxY + 28);
  fill('#333');
  text(func.rangeLabel, boxX + 65, boxY + 28);
}

function drawControls(func) {
  // Row 1: Function selector buttons
  let btnW = 70;
  let btnH = 28;
  let btnY = drawHeight + 15;
  let startX = 10;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Function:', startX, btnY + btnH/2);

  startX = 75;
  let funcNames = ['arcsin', 'arccos', 'arctan', 'arccot', 'arcsec', 'arccsc'];

  for (let i = 0; i < funcNames.length; i++) {
    let x = startX + i * (btnW + 5);
    let isSelected = (i === currentFunctionIndex);

    fill(isSelected ? '#2196F3' : '#e0e0e0');
    stroke(isSelected ? '#1565C0' : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(x, btnY, btnW, btnH, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(funcNames[i], x + btnW/2, btnY + btnH/2);
  }

  // Row 2: Horizontal line slider
  let sliderY = drawHeight + 55;
  let sliderX = 120;
  let sliderW = 250;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Horizontal line y:', 10, sliderY);

  // Slider track
  fill('#ddd');
  stroke('#999');
  strokeWeight(1);
  rect(sliderX, sliderY - 4, sliderW, 8, 4);

  // Slider handle
  let handleX = map(hLineY, -2, 2, sliderX, sliderX + sliderW);
  fill(activeSlider ? '#0066cc' : '#2196F3');
  noStroke();
  circle(handleX, sliderY, 16);

  // Value display
  fill('black');
  textAlign(LEFT, CENTER);
  text('y = ' + hLineY.toFixed(2), sliderX + sliderW + 15, sliderY);

  // Row 3: Toggle and Why button
  let row3Y = drawHeight + 90;

  // Toggle checkbox
  toggleX = 10;
  toggleY = row3Y - 8;
  toggleW = 16;
  toggleH = 16;

  fill(showBothGraphs ? '#2196F3' : 'white');
  stroke('#999');
  strokeWeight(1);
  rect(toggleX, toggleY, toggleW, toggleH, 2);

  if (showBothGraphs) {
    stroke('white');
    strokeWeight(2);
    line(toggleX + 3, toggleY + 8, toggleX + 7, toggleY + 12);
    line(toggleX + 7, toggleY + 12, toggleX + 13, toggleY + 4);
  }

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Show y = x reflection line', toggleX + 22, row3Y);

  // "Why this range?" button
  btnWhyX = 220;
  btnWhyY = row3Y - 14;
  btnWhyW = 120;
  btnWhyH = 28;

  fill(showExplanation ? '#4CAF50' : '#FF9800');
  stroke(showExplanation ? '#388E3C' : '#F57C00');
  strokeWeight(1);
  rect(btnWhyX, btnWhyY, btnWhyW, btnWhyH, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(showExplanation ? 'Hide explanation' : 'Why this range?', btnWhyX + btnWhyW/2, btnWhyY + btnWhyH/2);
}

function drawExplanationBox(func) {
  let boxW = 350;
  let boxH = 80;
  let boxX = canvasWidth/2 - boxW/2;
  let boxY = drawHeight - boxH - 10;

  fill(255, 255, 240);
  stroke('#FF9800');
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  fill('#333');
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);

  // Word wrap the explanation
  let words = func.explanation.split(' ');
  let lines = [];
  let currentLine = '';
  let maxWidth = boxW - 20;

  for (let word of words) {
    let testLine = currentLine + (currentLine ? ' ' : '') + word;
    textSize(12);
    if (textWidth(testLine) > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], boxX + 10, boxY + 10 + i * 16);
  }
}

function mousePressed() {
  // Check function buttons
  let btnW = 70;
  let btnH = 28;
  let btnY = drawHeight + 15;
  let startX = 75;

  for (let i = 0; i < 6; i++) {
    let x = startX + i * (btnW + 5);
    if (mouseX >= x && mouseX <= x + btnW &&
        mouseY >= btnY && mouseY <= btnY + btnH) {
      currentFunctionIndex = i;
      showExplanation = false;
      return;
    }
  }

  // Check slider
  let sliderY = drawHeight + 55;
  let sliderX = 120;
  let sliderW = 250;
  let handleX = map(hLineY, -2, 2, sliderX, sliderX + sliderW);

  if (dist(mouseX, mouseY, handleX, sliderY) < 15) {
    activeSlider = true;
    return;
  }

  // Check toggle
  if (mouseX >= toggleX && mouseX <= toggleX + 100 &&
      mouseY >= toggleY - 5 && mouseY <= toggleY + toggleH + 5) {
    showBothGraphs = !showBothGraphs;
    return;
  }

  // Check "Why this range?" button
  if (mouseX >= btnWhyX && mouseX <= btnWhyX + btnWhyW &&
      mouseY >= btnWhyY && mouseY <= btnWhyY + btnWhyH) {
    showExplanation = !showExplanation;
    return;
  }
}

function mouseDragged() {
  if (activeSlider) {
    let sliderX = 120;
    let sliderW = 250;
    let newVal = map(mouseX, sliderX, sliderX + sliderW, -2, 2);
    hLineY = constrain(newVal, -2, 2);
    hLineY = Math.round(hLineY * 20) / 20;  // Snap to 0.05
  }
}

function mouseReleased() {
  activeSlider = false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateGraphLayout();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
