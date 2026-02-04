// Sin(x)/x Visualization MicroSim
// Shows fundamental trig limit with unit circle and graph
// Bloom Level: Understand (L2), Verb: Explain

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Layout - split view
let circleSize = 140;
let circleCenterX, circleCenterY;
let graphLeft, graphRight, graphTop, graphBottom;

// State
let xValue = 1.0;
let showTable = false;

// UI elements
let xSlider;
let tableCheckbox;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // X value slider
    xSlider = createSlider(-2, 2, 1.0, 0.01);
    xSlider.position(sliderLeftMargin, drawHeight + 10);
    xSlider.size(canvasWidth - sliderLeftMargin - margin);
    xSlider.input(() => {
        xValue = xSlider.value();
        if (Math.abs(xValue) < 0.02) xValue = 0.02 * Math.sign(xValue) || 0.02;
    });

    // Table checkbox
    tableCheckbox = createCheckbox(' Show Table', false);
    tableCheckbox.position(10, drawHeight + 25);
    tableCheckbox.changed(() => { showTable = tableCheckbox.checked(); });

    describe('Visualization showing why sin(x)/x approaches 1 as x approaches 0', LABEL);
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
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Update layout
    circleCenterX = canvasWidth * 0.22;
    circleCenterY = drawHeight * 0.5;
    graphLeft = canvasWidth * 0.48;
    graphRight = canvasWidth - 25;
    graphTop = 70;
    graphBottom = drawHeight - 50;

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('The Fundamental Trig Limit', canvasWidth/2, 8);
    textSize(14);
    text('lim sin(x)/x = 1', canvasWidth/2, 30);
    textSize(11);
    text('x→0', canvasWidth/2 - 35, 38);

    // Draw both views
    drawUnitCircle();
    drawGraph();
    drawValueDisplay();

    if (showTable) {
        drawTable();
    }

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('x = ' + xValue.toFixed(2), 10, drawHeight + 10);
}

function drawUnitCircle() {
    let cx = circleCenterX;
    let cy = circleCenterY;
    let r = circleSize / 2;

    // Circle
    stroke(200);
    strokeWeight(2);
    noFill();
    circle(cx, cy, circleSize);

    // Axes
    stroke(150);
    strokeWeight(1);
    line(cx - r - 15, cy, cx + r + 15, cy);
    line(cx, cy - r - 15, cx, cy + r + 15);

    // Arc for angle x (radians)
    let angle = xValue;

    // Draw arc
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();
    if (angle >= 0) {
        arc(cx, cy, circleSize, circleSize, -angle, 0);
    } else {
        arc(cx, cy, circleSize, circleSize, 0, -angle);
    }

    // Point on circle
    let px = cx + r * Math.cos(angle);
    let py = cy - r * Math.sin(angle);

    fill(0, 100, 200);
    noStroke();
    circle(px, py, 10);

    // Vertical line (sin x)
    stroke(200, 50, 50);
    strokeWeight(3);
    line(px, cy, px, py);

    // Labels
    fill(0);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);

    // Arc length label
    fill(0, 80, 180);
    let arcLabelAngle = angle / 2;
    let arcLabelR = r + 12;
    let arcLabelX = cx + arcLabelR * Math.cos(arcLabelAngle);
    let arcLabelY = cy - arcLabelR * Math.sin(arcLabelAngle);
    text('arc = ' + Math.abs(xValue).toFixed(2), arcLabelX, arcLabelY);

    // Sin label
    fill(180, 40, 40);
    text('sin = ' + Math.sin(xValue).toFixed(3), px + 8, (cy + py) / 2);

    // Radius line
    stroke(100);
    strokeWeight(1);
    line(cx, cy, px, py);

    // Caption
    fill(0);
    textSize(11);
    textAlign(CENTER, TOP);
    text('Unit Circle', cx, cy + r + 20);
}

function drawGraph() {
    let xMin = -2.5;
    let xMax = 2.5;
    let yMin = -0.5;
    let yMax = 1.5;

    // Grid
    stroke(230);
    strokeWeight(1);
    for (let x = -2; x <= 2; x++) {
        let px = map(x, xMin, xMax, graphLeft, graphRight);
        line(px, graphTop, px, graphBottom);
    }
    for (let y = 0; y <= 1; y += 0.5) {
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        line(graphLeft, py, graphRight, py);
    }

    // Axes
    stroke(100);
    strokeWeight(1);
    let y0 = map(0, yMin, yMax, graphBottom, graphTop);
    let x0 = map(0, xMin, xMax, graphLeft, graphRight);
    line(graphLeft, y0, graphRight, y0);
    line(x0, graphTop, x0, graphBottom);

    // Axis labels
    fill(0);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    for (let x = -2; x <= 2; x++) {
        if (x !== 0) {
            let px = map(x, xMin, xMax, graphLeft, graphRight);
            text(x, px, y0 + 2);
        }
    }
    textAlign(RIGHT, CENTER);
    text('1', x0 - 3, map(1, yMin, yMax, graphBottom, graphTop));

    // Draw sin(x)/x function
    stroke(0, 150, 100);
    strokeWeight(2);
    noFill();

    let prevPy = null;
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        if (Math.abs(x) < 0.01) {
            prevPy = null;
            continue;
        }
        let y = Math.sin(x) / x;
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom && prevPy !== null) {
            line(px - 1, prevPy, px, py);
        }
        prevPy = py;
    }

    // Hole at x = 0, y = 1
    let holeX = map(0, xMin, xMax, graphLeft, graphRight);
    let holeY = map(1, yMin, yMax, graphBottom, graphTop);
    stroke(0, 150, 100);
    strokeWeight(2);
    fill('aliceblue');
    circle(holeX, holeY, 10);

    // Current point
    if (Math.abs(xValue) >= 0.02) {
        let ratio = Math.sin(xValue) / xValue;
        let ptX = map(xValue, xMin, xMax, graphLeft, graphRight);
        let ptY = map(ratio, yMin, yMax, graphBottom, graphTop);

        if (ptX >= graphLeft && ptX <= graphRight && ptY >= graphTop && ptY <= graphBottom) {
            fill(200, 50, 100);
            noStroke();
            circle(ptX, ptY, 12);
        }
    }

    // Horizontal dashed line at y = 1
    stroke(100, 100, 100, 150);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(graphLeft, holeY, graphRight, holeY);
    drawingContext.setLineDash([]);

    // Label
    fill(80);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('L = 1', graphRight + 3, holeY);

    // Caption
    fill(0);
    textSize(11);
    textAlign(CENTER, TOP);
    text('y = sin(x)/x', (graphLeft + graphRight) / 2, graphBottom + 15);
}

function drawValueDisplay() {
    let sinX = Math.sin(xValue);
    let ratio = sinX / xValue;

    let boxX = canvasWidth - 95;
    let boxY = graphTop - 5;
    let boxW = 90;
    let boxH = 65;

    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(boxX, boxY, boxW, boxH, 6);

    fill(0);
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);

    let y = boxY + 6;
    text('x = ' + xValue.toFixed(3), boxX + 6, y);
    y += 16;
    text('sin(x) = ' + sinX.toFixed(4), boxX + 6, y);
    y += 16;
    fill(0, 120, 80);
    textSize(12);
    text('ratio = ' + ratio.toFixed(5), boxX + 6, y);
}

function drawTable() {
    let tableX = 20;
    let tableY = 80;
    let colW = 55;
    let rowH = 18;

    let values = [0.5, 0.1, 0.01, 0.001];

    fill(255, 255, 255, 245);
    stroke(180);
    strokeWeight(1);
    rect(tableX, tableY, colW * 3 + 10, rowH * (values.length + 1) + 10, 6);

    fill(0);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);

    // Header
    let y = tableY + rowH / 2 + 5;
    text('x', tableX + colW / 2, y);
    text('sin(x)', tableX + colW * 1.5, y);
    text('ratio', tableX + colW * 2.5, y);

    // Data
    textSize(9);
    for (let i = 0; i < values.length; i++) {
        y += rowH;
        let x = values[i];
        let s = Math.sin(x);
        let r = s / x;
        text(x.toString(), tableX + colW / 2, y);
        text(s.toFixed(5), tableX + colW * 1.5, y);
        text(r.toFixed(6), tableX + colW * 2.5, y);
    }
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
