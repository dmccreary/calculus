// Squeeze Theorem Visualization MicroSim
// Shows how a function is squeezed between upper and lower bounds
// Bloom Level: Understand (L2), Verb: Illustrate

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
let graphTop = 60;
let graphBottom;

// Examples
let examples = [
    {
        name: 'x²sin(1/x)',
        xMin: -0.8, xMax: 0.8, yMin: -0.3, yMax: 0.3,
        targetX: 0,
        limit: 0,
        lower: (x) => -x * x,
        upper: (x) => x * x,
        middle: (x) => x === 0 ? 0 : x * x * Math.sin(1 / x),
        lowerLabel: '-x²',
        upperLabel: 'x²',
        middleLabel: 'x²sin(1/x)'
    },
    {
        name: 'xcos(1/x)',
        xMin: -0.5, xMax: 0.5, yMin: -0.6, yMax: 0.6,
        targetX: 0,
        limit: 0,
        lower: (x) => -Math.abs(x),
        upper: (x) => Math.abs(x),
        middle: (x) => x === 0 ? 0 : x * Math.cos(1 / x),
        lowerLabel: '-|x|',
        upperLabel: '|x|',
        middleLabel: 'xcos(1/x)'
    },
    {
        name: 'sin(x)/x near 0',
        xMin: -2, xMax: 2, yMin: -0.5, yMax: 1.5,
        targetX: 0,
        limit: 1,
        lower: (x) => x === 0 ? 1 : Math.cos(x),
        upper: (x) => 1,
        middle: (x) => x === 0 ? 1 : Math.sin(x) / x,
        lowerLabel: 'cos(x)',
        upperLabel: '1',
        middleLabel: 'sin(x)/x'
    }
];

let currentExampleIndex = 0;
let currentExample;
let currentDistance = 0.4;
let isAnimating = false;
let animationPhase = 0;

// UI elements
let exampleSelect;
let distanceSlider;
let animateButton;
let resetButton;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    currentExample = examples[0];

    // Example selector
    exampleSelect = createSelect();
    exampleSelect.position(10, drawHeight + 5);
    for (let i = 0; i < examples.length; i++) {
        exampleSelect.option(examples[i].name, i);
    }
    exampleSelect.changed(() => {
        currentExampleIndex = parseInt(exampleSelect.value());
        currentExample = examples[currentExampleIndex];
        resetAnimation();
    });

    // Distance slider
    distanceSlider = createSlider(0.01, 0.5, 0.4, 0.01);
    distanceSlider.position(sliderLeftMargin + 50, drawHeight + 40);
    distanceSlider.size(canvasWidth - sliderLeftMargin - 50 - margin);
    distanceSlider.input(() => { currentDistance = distanceSlider.value(); });

    // Animate button
    animateButton = createButton('Squeeze');
    animateButton.position(10, drawHeight + 50);
    animateButton.mousePressed(startAnimation);

    // Reset button
    resetButton = createButton('Reset');
    resetButton.position(80, drawHeight + 50);
    resetButton.mousePressed(resetAnimation);

    describe('Squeeze Theorem visualization showing a function trapped between bounds', LABEL);
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

    // Update graph bounds
    graphRight = canvasWidth - 40;
    graphBottom = drawHeight - 40;

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Squeeze Theorem', canvasWidth/2, 8);
    textSize(14);
    text(currentExample.middleLabel + ' squeezed by ' + currentExample.lowerLabel + ' and ' + currentExample.upperLabel, canvasWidth/2, 32);

    // Draw components
    drawAxes();
    drawSqueezeZone();
    drawFunctions();
    drawApproachIndicator();
    drawInfoPanel();

    // Animation update
    if (isAnimating) {
        animationPhase += 0.015;
        currentDistance = 0.5 * (1 - animationPhase * 0.95);
        if (currentDistance < 0.025) {
            currentDistance = 0.025;
            isAnimating = false;
        }
        distanceSlider.value(currentDistance);
    }

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('Distance: ' + currentDistance.toFixed(2), sliderLeftMargin - 50, drawHeight + 50);
}

function drawAxes() {
    let ce = currentExample;

    stroke(220);
    strokeWeight(1);

    // Grid lines
    let xStep = (ce.xMax - ce.xMin) / 8;
    let yStep = (ce.yMax - ce.yMin) / 8;

    for (let x = ce.xMin; x <= ce.xMax; x += xStep) {
        let px = map(x, ce.xMin, ce.xMax, graphLeft, graphRight);
        line(px, graphTop, px, graphBottom);
    }
    for (let y = ce.yMin; y <= ce.yMax; y += yStep) {
        let py = map(y, ce.yMin, ce.yMax, graphBottom, graphTop);
        line(graphLeft, py, graphRight, py);
    }

    // Axes
    stroke(0);
    strokeWeight(2);
    let y0 = map(0, ce.yMin, ce.yMax, graphBottom, graphTop);
    let x0 = map(0, ce.xMin, ce.xMax, graphLeft, graphRight);
    y0 = constrain(y0, graphTop, graphBottom);
    x0 = constrain(x0, graphLeft, graphRight);
    line(graphLeft, y0, graphRight, y0);
    line(x0, graphTop, x0, graphBottom);

    // Axis labels
    fill(0);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text(ce.xMin.toFixed(1), graphLeft, y0 + 3);
    text(ce.xMax.toFixed(1), graphRight, y0 + 3);
    text('0', x0 + 8, y0 + 3);

    textAlign(RIGHT, CENTER);
    text(ce.yMin.toFixed(1), x0 - 5, graphBottom);
    text(ce.yMax.toFixed(1), x0 - 5, graphTop);
}

function drawSqueezeZone() {
    let ce = currentExample;

    // Shaded region between bounds
    fill(200, 230, 255, 100);
    noStroke();

    beginShape();
    // Upper bound (left to right)
    for (let px = graphLeft; px <= graphRight; px += 2) {
        let x = map(px, graphLeft, graphRight, ce.xMin, ce.xMax);
        let y = ce.upper(x);
        let py = map(y, ce.yMin, ce.yMax, graphBottom, graphTop);
        py = constrain(py, graphTop, graphBottom);
        vertex(px, py);
    }
    // Lower bound (right to left)
    for (let px = graphRight; px >= graphLeft; px -= 2) {
        let x = map(px, graphLeft, graphRight, ce.xMin, ce.xMax);
        let y = ce.lower(x);
        let py = map(y, ce.yMin, ce.yMax, graphBottom, graphTop);
        py = constrain(py, graphTop, graphBottom);
        vertex(px, py);
    }
    endShape(CLOSE);
}

function drawFunctions() {
    let ce = currentExample;

    // Upper bound (red)
    stroke(220, 80, 80);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, ce.xMin, ce.xMax);
        let y = ce.upper(x);
        let py = map(y, ce.yMin, ce.yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Lower bound (blue)
    stroke(80, 80, 220);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, ce.xMin, ce.xMax);
        let y = ce.lower(x);
        let py = map(y, ce.yMin, ce.yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Middle function (green)
    stroke(0, 180, 80);
    strokeWeight(3);
    noFill();
    let prevPy = null;
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, ce.xMin, ce.xMax);
        if (Math.abs(x) < 0.001) continue; // Skip very near 0
        let y = ce.middle(x);
        let py = map(y, ce.yMin, ce.yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            if (prevPy !== null && Math.abs(py - prevPy) < 50) {
                line(px - 1, prevPy, px, py);
            }
            prevPy = py;
        } else {
            prevPy = null;
        }
    }
}

function drawApproachIndicator() {
    let ce = currentExample;

    // Vertical lines showing squeeze region
    let leftX = ce.targetX - currentDistance * (ce.xMax - ce.xMin);
    let rightX = ce.targetX + currentDistance * (ce.xMax - ce.xMin);

    stroke(150, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);

    let leftPx = map(leftX, ce.xMin, ce.xMax, graphLeft, graphRight);
    let rightPx = map(rightX, ce.xMin, ce.xMax, graphLeft, graphRight);
    let targetPx = map(ce.targetX, ce.xMin, ce.xMax, graphLeft, graphRight);

    if (leftPx >= graphLeft) line(leftPx, graphTop, leftPx, graphBottom);
    if (rightPx <= graphRight) line(rightPx, graphTop, rightPx, graphBottom);

    // Horizontal line at limit
    stroke(0, 150, 0, 150);
    let limitPy = map(ce.limit, ce.yMin, ce.yMax, graphBottom, graphTop);
    line(graphLeft, limitPy, graphRight, limitPy);
    drawingContext.setLineDash([]);

    // Limit point
    fill(0, 180, 80);
    noStroke();
    circle(targetPx, limitPy, 12);
}

function drawInfoPanel() {
    let ce = currentExample;
    let panelX = canvasWidth - 120;
    let panelY = graphTop;
    let panelW = 115;
    let panelH = 100;

    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill(0);
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);

    let y = panelY + 8;
    fill(220, 80, 80);
    text('Upper: ' + ce.upperLabel, panelX + 8, y);
    y += 18;

    fill(0, 150, 60);
    text('Middle: ' + ce.middleLabel, panelX + 8, y);
    y += 18;

    fill(80, 80, 220);
    text('Lower: ' + ce.lowerLabel, panelX + 8, y);
    y += 26;

    fill(0);
    textSize(13);
    text('Limit = ' + ce.limit, panelX + 8, y);
}

function startAnimation() {
    isAnimating = true;
    animationPhase = 0;
    currentDistance = 0.5;
}

function resetAnimation() {
    isAnimating = false;
    currentDistance = 0.4;
    distanceSlider.value(0.4);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    distanceSlider.size(canvasWidth - sliderLeftMargin - 50 - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
