// One-Sided Limits Comparison MicroSim
// Compares left and right limits to determine if two-sided limit exists
// Bloom Level: Analyze (L4), Verb: Compare

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

// Function presets
let functions = [
    {
        name: 'Jump at x=1',
        targetX: 1,
        xMin: -1, xMax: 4, yMin: -1, yMax: 6,
        left: (x) => x + 1,
        right: (x) => x + 3,
        leftLimit: 2,
        rightLimit: 4,
        exists: false
    },
    {
        name: 'Continuous at x=2',
        targetX: 2,
        xMin: 0, xMax: 5, yMin: -1, yMax: 8,
        left: (x) => x * x - 1,
        right: (x) => x * x - 1,
        leftLimit: 3,
        rightLimit: 3,
        exists: true
    },
    {
        name: 'Hole at x=2',
        targetX: 2,
        xMin: -1, xMax: 5, yMin: -1, yMax: 7,
        left: (x) => x + 2,
        right: (x) => x + 2,
        leftLimit: 4,
        rightLimit: 4,
        exists: true
    },
    {
        name: 'Jump at x=0',
        targetX: 0,
        xMin: -3, xMax: 3, yMin: -4, yMax: 4,
        left: (x) => -2,
        right: (x) => 2,
        leftLimit: -2,
        rightLimit: 2,
        exists: false
    }
];

let currentFuncIndex = 0;
let currentFunc;
let currentDistance = 0.5;

// UI elements
let functionSelect;
let distanceSlider;
let animateButton;
let resetButton;
let isAnimating = false;
let animationPhase = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    currentFunc = functions[0];

    // Function selector
    functionSelect = createSelect();
    functionSelect.position(10, drawHeight + 5);
    for (let i = 0; i < functions.length; i++) {
        functionSelect.option(functions[i].name, i);
    }
    functionSelect.changed(() => {
        currentFuncIndex = parseInt(functionSelect.value());
        currentFunc = functions[currentFuncIndex];
        resetAnimation();
    });

    // Distance slider
    distanceSlider = createSlider(0.01, 0.5, 0.5, 0.01);
    distanceSlider.position(sliderLeftMargin + 60, drawHeight + 40);
    distanceSlider.size(canvasWidth - sliderLeftMargin - 60 - margin);
    distanceSlider.input(() => { currentDistance = distanceSlider.value(); });

    // Animate button
    animateButton = createButton('Animate');
    animateButton.position(10, drawHeight + 50);
    animateButton.mousePressed(startAnimation);

    // Reset button
    resetButton = createButton('Reset');
    resetButton.position(80, drawHeight + 50);
    resetButton.mousePressed(resetAnimation);

    describe('Compare left and right limits to determine if two-sided limit exists', LABEL);
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
    graphRight = canvasWidth - 120;
    graphBottom = drawHeight - 40;

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('One-Sided Limits Comparison', canvasWidth/2 - 40, 8);
    textSize(14);
    text(currentFunc.name, canvasWidth/2 - 40, 32);

    // Draw axes and function
    drawAxes();
    drawFunction();
    drawApproachPoints();
    drawInfoPanel();

    // Animation update
    if (isAnimating) {
        animationPhase += 0.015;
        currentDistance = 0.5 * (1 - animationPhase);
        if (currentDistance < 0.01) {
            currentDistance = 0.01;
            isAnimating = false;
        }
        distanceSlider.value(currentDistance);
    }

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('Distance: ' + currentDistance.toFixed(2), sliderLeftMargin - 60, drawHeight + 50);
}

function drawAxes() {
    let cf = currentFunc;

    stroke(220);
    strokeWeight(1);

    // Grid
    for (let x = Math.ceil(cf.xMin); x <= cf.xMax; x++) {
        let px = map(x, cf.xMin, cf.xMax, graphLeft, graphRight);
        line(px, graphTop, px, graphBottom);
    }
    for (let y = Math.ceil(cf.yMin); y <= cf.yMax; y++) {
        let py = map(y, cf.yMin, cf.yMax, graphBottom, graphTop);
        line(graphLeft, py, graphRight, py);
    }

    // Axes
    stroke(0);
    strokeWeight(2);
    let y0 = map(0, cf.yMin, cf.yMax, graphBottom, graphTop);
    let x0 = map(0, cf.xMin, cf.xMax, graphLeft, graphRight);
    y0 = constrain(y0, graphTop, graphBottom);
    x0 = constrain(x0, graphLeft, graphRight);
    line(graphLeft, y0, graphRight, y0);
    line(x0, graphTop, x0, graphBottom);

    // Labels
    fill(0);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    for (let x = Math.ceil(cf.xMin); x <= cf.xMax; x++) {
        let px = map(x, cf.xMin, cf.xMax, graphLeft, graphRight);
        text(x, px, y0 + 3);
    }
    textAlign(RIGHT, CENTER);
    for (let y = Math.ceil(cf.yMin); y <= cf.yMax; y++) {
        if (y !== 0) {
            let py = map(y, cf.yMin, cf.yMax, graphBottom, graphTop);
            text(y, x0 - 5, py);
        }
    }
}

function drawFunction() {
    let cf = currentFunc;

    // Left side (teal)
    stroke(0, 150, 150);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, cf.xMin, cf.xMax);
        if (x >= cf.targetX - 0.05) continue;
        let y = cf.left(x);
        let py = map(y, cf.yMin, cf.yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Right side (orange)
    stroke(200, 100, 0);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, cf.xMin, cf.xMax);
        if (x <= cf.targetX + 0.05) continue;
        let y = cf.right(x);
        let py = map(y, cf.yMin, cf.yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Vertical line at target
    let targetPx = map(cf.targetX, cf.xMin, cf.xMax, graphLeft, graphRight);
    stroke(150);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(targetPx, graphTop, targetPx, graphBottom);
    drawingContext.setLineDash([]);
}

function drawApproachPoints() {
    let cf = currentFunc;

    // Left approach point (teal)
    let leftX = cf.targetX - currentDistance;
    let leftY = cf.left(leftX);
    let leftPx = map(leftX, cf.xMin, cf.xMax, graphLeft, graphRight);
    let leftPy = map(leftY, cf.yMin, cf.yMax, graphBottom, graphTop);

    fill(0, 150, 150);
    noStroke();
    circle(leftPx, leftPy, 16);

    // Right approach point (orange)
    let rightX = cf.targetX + currentDistance;
    let rightY = cf.right(rightX);
    let rightPx = map(rightX, cf.xMin, cf.xMax, graphLeft, graphRight);
    let rightPy = map(rightY, cf.yMin, cf.yMax, graphBottom, graphTop);

    fill(200, 100, 0);
    noStroke();
    circle(rightPx, rightPy, 16);

    // Dashed lines to limit values
    stroke(0, 150, 150, 150);
    strokeWeight(2);
    drawingContext.setLineDash([4, 4]);
    let leftLimitPy = map(cf.leftLimit, cf.yMin, cf.yMax, graphBottom, graphTop);
    line(graphLeft, leftLimitPy, graphRight, leftLimitPy);

    stroke(200, 100, 0, 150);
    let rightLimitPy = map(cf.rightLimit, cf.yMin, cf.yMax, graphBottom, graphTop);
    if (abs(leftLimitPy - rightLimitPy) > 5) {
        line(graphLeft, rightLimitPy, graphRight, rightLimitPy);
    }
    drawingContext.setLineDash([]);
}

function drawInfoPanel() {
    let cf = currentFunc;
    let panelX = canvasWidth - 115;
    let panelY = graphTop;
    let panelW = 110;
    let panelH = 140;

    // Panel background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Content
    fill(0);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);

    let y = panelY + 10;

    // Left limit
    fill(0, 120, 120);
    text('Left limit:', panelX + 8, y);
    y += 16;
    textSize(14);
    text(cf.leftLimit.toFixed(2), panelX + 8, y);
    y += 24;

    // Right limit
    textSize(12);
    fill(180, 90, 0);
    text('Right limit:', panelX + 8, y);
    y += 16;
    textSize(14);
    text(cf.rightLimit.toFixed(2), panelX + 8, y);
    y += 28;

    // Two-sided limit exists?
    textSize(12);
    fill(0);
    text('Two-sided:', panelX + 8, y);
    y += 18;

    if (cf.exists) {
        fill(0, 150, 0);
        textSize(14);
        text('= ' + cf.leftLimit.toFixed(1), panelX + 8, y);
    } else {
        fill(200, 0, 0);
        textSize(13);
        text('DNE', panelX + 8, y);
    }
}

function startAnimation() {
    isAnimating = true;
    animationPhase = 0;
    currentDistance = 0.5;
}

function resetAnimation() {
    isAnimating = false;
    currentDistance = 0.5;
    distanceSlider.value(0.5);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    distanceSlider.size(canvasWidth - sliderLeftMargin - 60 - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
