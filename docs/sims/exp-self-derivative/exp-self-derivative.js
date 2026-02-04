// e^x is Its Own Derivative MicroSim
// Demonstrates that for f(x) = e^x, the function value equals the slope at every point
// The tangent line slope always equals e^x, making e^x unique
// Bloom Level: Understand (L2), Verb: explain, interpret, demonstrate

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphTop = 70;
let graphBottom;
let xMin = -3.5;
let xMax = 3.5;
let yMin = -1;
let yMax = 12;

// Controls
let xSlider;
let showTangentCheckbox;
let compareButton;

// State
let currentX = 0;
let showTangent = true;
let isComparing = false;
let comparePhase = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // x-value slider
    xSlider = createSlider(-3, 3, 0, 0.01);
    xSlider.position(sliderLeftMargin, drawHeight + 5);
    xSlider.size(canvasWidth - sliderLeftMargin - margin);
    xSlider.input(() => {
        currentX = xSlider.value();
        isComparing = false;
    });

    // Show tangent checkbox
    showTangentCheckbox = createCheckbox(' Show Tangent', true);
    showTangentCheckbox.position(10, drawHeight + 45);
    showTangentCheckbox.changed(() => {
        showTangent = showTangentCheckbox.checked();
    });

    // Compare button
    compareButton = createButton('Compare y and slope');
    compareButton.position(150, drawHeight + 45);
    compareButton.mousePressed(startCompare);

    describe('Interactive visualization showing that e to the x equals its own derivative - the function value always equals the tangent slope', LABEL);
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
    graphRight = canvasWidth - 170;
    graphBottom = drawHeight - 40;

    // Title and subtitle
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('e^x is Its Own Derivative!', canvasWidth * 0.35, 8);
    textSize(14);
    fill(80);
    text('f(x) = e^x, f\'(x) = e^x', canvasWidth * 0.35, 30);

    // Draw graph elements
    drawAxes();
    drawExpCurve();
    if (showTangent) {
        drawTangentLine();
    }
    drawPoint();
    drawInfoPanel();

    // Animation for comparison mode
    if (isComparing) {
        comparePhase += 0.05;
        if (comparePhase > TWO_PI * 3) {
            isComparing = false;
            comparePhase = 0;
        }
    }

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('x: ' + currentX.toFixed(2), 10, drawHeight + 15);
}

function drawAxes() {
    stroke(200);
    strokeWeight(1);

    // Grid lines
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
        let px = map(x, xMin, xMax, graphLeft, graphRight);
        line(px, graphTop, px, graphBottom);
    }
    for (let y = Math.ceil(yMin); y <= yMax; y += 2) {
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
    for (let y = 0; y <= yMax; y += 2) {
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            text(y, x0Label - 5, py);
        }
    }

    // Axis titles
    textSize(14);
    textAlign(CENTER, TOP);
    text('x', graphRight + 15, y0Label - 5);
    textAlign(RIGHT, CENTER);
    text('y', x0Label - 10, graphTop - 10);
}

function drawExpCurve() {
    // Draw f(x) = e^x
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    beginShape();
    for (let px = graphLeft; px <= graphRight; px += 2) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        let y = Math.exp(x);
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop - 20 && py <= graphBottom + 20) {
            vertex(px, py);
        }
    }
    endShape();
}

function drawTangentLine() {
    // Tangent line at current point
    // For e^x, slope = e^x at the point
    let yVal = Math.exp(currentX);
    let slope = yVal; // This is the key insight: slope = y value!

    // Draw tangent line
    stroke(220, 100, 50);
    strokeWeight(2);

    // Line extends across visible region
    let x1 = xMin;
    let y1 = yVal + slope * (x1 - currentX);
    let x2 = xMax;
    let y2 = yVal + slope * (x2 - currentX);

    let px1 = map(x1, xMin, xMax, graphLeft, graphRight);
    let py1 = map(y1, yMin, yMax, graphBottom, graphTop);
    let px2 = map(x2, xMin, xMax, graphLeft, graphRight);
    let py2 = map(y2, yMin, yMax, graphBottom, graphTop);

    line(px1, py1, px2, py2);
}

function drawPoint() {
    let yVal = Math.exp(currentX);

    // Point on curve
    let px = map(currentX, xMin, xMax, graphLeft, graphRight);
    let py = map(yVal, yMin, yMax, graphBottom, graphTop);

    if (py >= graphTop && py <= graphBottom) {
        // Highlight effect during comparison
        if (isComparing) {
            let pulse = sin(comparePhase * 2) * 0.5 + 0.5;
            fill(255, 200, 0, pulse * 200);
            noStroke();
            circle(px, py, 30 + pulse * 10);
        }

        fill(0, 150, 100);
        noStroke();
        circle(px, py, 14);

        // Label
        fill(0, 100, 50);
        textSize(14);
        textAlign(LEFT, CENTER);
        noStroke();
        text('P', px + 10, py - 10);
    }
}

function drawInfoPanel() {
    // Info panel on right side
    let panelX = graphRight + 10;
    let panelY = graphTop;
    let panelWidth = canvasWidth - graphRight - 15;
    let panelHeight = 220;

    // Panel background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    // Panel content
    fill(0);
    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);

    let yPos = panelY + 12;
    let lineHeight = 22;

    // Current values
    let yVal = Math.exp(currentX);
    let slope = yVal; // For e^x, slope = y value

    // x value
    text('At x = ' + currentX.toFixed(2), panelX + 8, yPos);
    yPos += lineHeight + 5;

    // y value (function value)
    fill(0, 100, 200);
    textSize(12);
    text('y = e^x', panelX + 8, yPos);
    yPos += lineHeight - 4;
    textSize(15);
    fill(0, 100, 200);
    text('= ' + yVal.toFixed(4), panelX + 8, yPos);
    yPos += lineHeight + 8;

    // Slope value
    fill(220, 100, 50);
    textSize(12);
    text('Slope = dy/dx', panelX + 8, yPos);
    yPos += lineHeight - 4;
    textSize(15);
    text('= ' + slope.toFixed(4), panelX + 8, yPos);
    yPos += lineHeight + 10;

    // Highlight the equality
    if (isComparing) {
        let pulse = sin(comparePhase * 2) * 0.5 + 0.5;
        fill(255, 220, 0, pulse * 255);
        noStroke();
        rect(panelX + 3, yPos - 3, panelWidth - 6, 45, 5);
    }

    // The key insight
    fill(0, 120, 60);
    textSize(12);
    noStroke();
    text('They match!', panelX + 8, yPos);
    yPos += lineHeight - 2;
    textSize(11);
    fill(60);
    text('y = slope', panelX + 8, yPos);
    yPos += lineHeight - 4;
    text('at EVERY point', panelX + 8, yPos);

    // Delta Moment at bottom of panel
    yPos = panelY + panelHeight - 25;
    fill(100);
    textSize(10);
    textAlign(LEFT, TOP);
    text('"My height IS', panelX + 8, yPos);
    text(' my slope!"', panelX + 8, yPos + 11);
}

function startCompare() {
    isComparing = true;
    comparePhase = 0;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    xSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
