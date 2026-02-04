// Secant Lines Approaching Tangent Line MicroSim
// Visualizes how secant lines approach the tangent line as h approaches 0
// f(x) = x^2, derivative f'(x) = 2x
// Bloom Level: Understand (L2), Verb: explain, interpret

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphTop = 70;
let graphBottom;
let xMin = -2;
let xMax = 4;
let yMin = -1;
let yMax = 10;

// Controls
let hSlider;
let xPSlider;
let animateButton;
let resetButton;

// State
let h = 2;
let xP = 1;
let isAnimating = false;
let animationSpeed = 0.02;

// Table data for (h, slope) pairs
let slopeTable = [];
let tableHValues = [2, 1, 0.5, 0.1, 0.01];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // h slider (distance from P to Q)
    hSlider = createSlider(0.01, 2, 2, 0.01);
    hSlider.position(sliderLeftMargin, drawHeight + 5);
    hSlider.size(canvasWidth - sliderLeftMargin - margin);
    hSlider.input(() => {
        h = hSlider.value();
        updateTable();
    });

    // x position slider for point P
    xPSlider = createSlider(-1.5, 3, 1, 0.1);
    xPSlider.position(sliderLeftMargin, drawHeight + 40);
    xPSlider.size(canvasWidth - sliderLeftMargin - margin);
    xPSlider.input(() => {
        xP = xPSlider.value();
        updateTable();
    });

    // Animation button
    animateButton = createButton('Watch h approach 0');
    animateButton.position(10, drawHeight + 80);
    animateButton.mousePressed(startAnimation);

    // Reset button
    resetButton = createButton('Reset');
    resetButton.position(145, drawHeight + 80);
    resetButton.mousePressed(resetAnimation);

    // Initialize table
    updateTable();

    describe('Interactive visualization showing secant lines approaching the tangent line as h approaches 0 on f(x) = x squared', LABEL);
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
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Update graph bounds
    graphRight = canvasWidth - 150;
    graphBottom = drawHeight - 40;

    // Title and subtitle
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Secant Lines Approaching Tangent', canvasWidth * 0.35, 8);
    textSize(14);
    fill(80);
    text('f(x) = x\u00B2', canvasWidth * 0.35, 30);

    // Draw graph elements
    drawAxes();
    drawParabola();
    drawTangentLine();
    drawSecantLine();
    drawPoints();
    drawInfoPanel();

    // Animation update
    if (isAnimating) {
        h -= animationSpeed;
        if (h <= 0.01) {
            h = 0.01;
            isAnimating = false;
        }
        hSlider.value(h);
        updateTable();
    }

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('h: ' + h.toFixed(2), 10, drawHeight + 15);
    text('Point P at x: ' + xP.toFixed(1), 10, drawHeight + 50);
}

function drawAxes() {
    stroke(200);
    strokeWeight(1);

    // Grid lines
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
        let px = map(x, xMin, xMax, graphLeft, graphRight);
        line(px, graphTop, px, graphBottom);
    }
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            line(graphLeft, py, graphRight, py);
        }
    }

    // Axes
    stroke(0);
    strokeWeight(2);
    let y0 = map(0, yMin, yMax, graphBottom, graphTop);
    let x0 = map(0, xMin, xMax, graphLeft, graphRight);

    // Constrain axes to graph region
    if (y0 >= graphTop && y0 <= graphBottom) {
        line(graphLeft, y0, graphRight, y0);
    }
    if (x0 >= graphLeft && x0 <= graphRight) {
        line(x0, graphTop, x0, graphBottom);
    }

    // Axis labels
    fill(0);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);

    let y0Label = constrain(y0, graphTop, graphBottom);
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
        let px = map(x, xMin, xMax, graphLeft, graphRight);
        if (px >= graphLeft && px <= graphRight) {
            text(x, px, y0Label + 5);
        }
    }

    textAlign(RIGHT, CENTER);
    let x0Label = constrain(x0, graphLeft, graphRight);
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
        if (y !== 0) {
            let py = map(y, yMin, yMax, graphBottom, graphTop);
            if (py >= graphTop && py <= graphBottom) {
                text(y, x0Label - 5, py);
            }
        }
    }

    // Axis titles
    textSize(14);
    textAlign(CENTER, TOP);
    text('x', graphRight + 15, y0Label - 5);
    textAlign(RIGHT, CENTER);
    text('y', x0Label - 10, graphTop - 10);
}

function drawParabola() {
    // Draw f(x) = x^2
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    beginShape();
    for (let px = graphLeft; px <= graphRight; px += 2) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        let y = x * x;
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();
}

function drawTangentLine() {
    // Tangent line at point P with slope = 2*xP (derivative of x^2)
    let tangentSlope = 2 * xP;
    let yP = xP * xP;

    // Draw tangent line (ghost line showing target)
    stroke(100, 200, 100, 150);
    strokeWeight(2);
    drawingContext.setLineDash([8, 4]);

    // Line extends across visible region
    let x1 = xMin;
    let y1 = yP + tangentSlope * (x1 - xP);
    let x2 = xMax;
    let y2 = yP + tangentSlope * (x2 - xP);

    let px1 = map(x1, xMin, xMax, graphLeft, graphRight);
    let py1 = map(y1, yMin, yMax, graphBottom, graphTop);
    let px2 = map(x2, xMin, xMax, graphLeft, graphRight);
    let py2 = map(y2, yMin, yMax, graphBottom, graphTop);

    line(px1, py1, px2, py2);
    drawingContext.setLineDash([]);
}

function drawSecantLine() {
    // Secant line through P and Q
    let yP = xP * xP;
    let xQ = xP + h;
    let yQ = xQ * xQ;

    // Secant slope = (yQ - yP) / (xQ - xP) = (yQ - yP) / h
    let secantSlope = (yQ - yP) / h;

    // Draw secant line
    stroke(220, 100, 50);
    strokeWeight(3);

    // Line extends across visible region
    let x1 = xMin;
    let y1 = yP + secantSlope * (x1 - xP);
    let x2 = xMax;
    let y2 = yP + secantSlope * (x2 - xP);

    let px1 = map(x1, xMin, xMax, graphLeft, graphRight);
    let py1 = map(y1, yMin, yMax, graphBottom, graphTop);
    let px2 = map(x2, xMin, xMax, graphLeft, graphRight);
    let py2 = map(y2, yMin, yMax, graphBottom, graphTop);

    line(px1, py1, px2, py2);
}

function drawPoints() {
    let yP = xP * xP;
    let xQ = xP + h;
    let yQ = xQ * xQ;

    // Point P (fixed)
    let pxP = map(xP, xMin, xMax, graphLeft, graphRight);
    let pyP = map(yP, yMin, yMax, graphBottom, graphTop);

    if (pyP >= graphTop && pyP <= graphBottom) {
        fill(0, 150, 100);
        noStroke();
        circle(pxP, pyP, 14);

        // Label P
        fill(0, 100, 50);
        textSize(14);
        textAlign(CENTER, TOP);
        noStroke();
        text('P', pxP - 15, pyP - 5);
    }

    // Point Q (moving)
    let pxQ = map(xQ, xMin, xMax, graphLeft, graphRight);
    let pyQ = map(yQ, yMin, yMax, graphBottom, graphTop);

    if (pxQ >= graphLeft && pxQ <= graphRight && pyQ >= graphTop && pyQ <= graphBottom) {
        fill(220, 100, 50);
        noStroke();
        circle(pxQ, pyQ, 14);

        // Label Q
        fill(180, 70, 30);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        noStroke();
        text('Q', pxQ + 15, pyQ + 5);
    }
}

function drawInfoPanel() {
    // Info panel on right side
    let panelX = graphRight + 10;
    let panelY = graphTop;
    let panelWidth = canvasWidth - graphRight - 15;
    let panelHeight = 250;

    // Panel background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    // Panel content
    fill(0);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);

    let yPos = panelY + 10;
    let lineHeight = 18;

    // Current values
    let yP = xP * xP;
    let xQ = xP + h;
    let yQ = xQ * xQ;
    let secantSlope = (yQ - yP) / h;
    let tangentSlope = 2 * xP;

    text('Current:', panelX + 5, yPos);
    yPos += lineHeight;

    textSize(11);
    text('h = ' + h.toFixed(3), panelX + 5, yPos);
    yPos += lineHeight;

    text('Secant slope:', panelX + 5, yPos);
    yPos += lineHeight - 4;
    text(secantSlope.toFixed(4), panelX + 5, yPos);
    yPos += lineHeight;

    // Tangent slope (limit)
    fill(100, 200, 100);
    text('Limit slope:', panelX + 5, yPos);
    yPos += lineHeight - 4;
    text(tangentSlope.toFixed(4), panelX + 5, yPos);
    yPos += lineHeight + 5;

    // Table header
    fill(0);
    textSize(11);
    text('h', panelX + 8, yPos);
    text('slope', panelX + 55, yPos);
    yPos += lineHeight;

    // Horizontal line
    stroke(180);
    line(panelX + 5, yPos - 5, panelX + panelWidth - 5, yPos - 5);
    noStroke();

    // Table data
    for (let i = 0; i < slopeTable.length; i++) {
        let entry = slopeTable[i];
        if (h <= entry.h) {
            fill(220, 100, 50);
        } else {
            fill(150);
        }
        text(entry.h.toFixed(2), panelX + 8, yPos);
        text(entry.slope.toFixed(4), panelX + 55, yPos);
        yPos += lineHeight - 2;
    }

    // Final message when h is very small
    if (h <= 0.02) {
        yPos += 5;
        fill(100, 200, 100);
        textSize(10);
        text('As h \u2192 0,', panelX + 5, yPos);
        yPos += lineHeight - 4;
        text('slope \u2192 ' + tangentSlope.toFixed(2), panelX + 5, yPos);
    }
}

function updateTable() {
    slopeTable = [];
    let yP = xP * xP;

    for (let hVal of tableHValues) {
        let xQ = xP + hVal;
        let yQ = xQ * xQ;
        let slope = (yQ - yP) / hVal;
        slopeTable.push({ h: hVal, slope: slope });
    }
}

function startAnimation() {
    isAnimating = true;
    h = 2;
    hSlider.value(h);
}

function resetAnimation() {
    isAnimating = false;
    h = 2;
    xP = 1;
    hSlider.value(h);
    xPSlider.value(xP);
    updateTable();
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    hSlider.size(canvasWidth - sliderLeftMargin - margin);
    xPSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
