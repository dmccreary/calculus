// Vertical Asymptote Explorer MicroSim
// Students explain how one-sided limits determine function behavior near vertical asymptotes
// Bloom Level: Understand (L2), Verb: Explain

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 180;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphTop = 60;
let graphBottom;

// Function presets with asymptote info
let functions = [
    {
        name: '1/x',
        asymptotes: [0],
        xMin: -4, xMax: 4, yMin: -8, yMax: 8,
        fn: (x) => 1/x,
        leftBehavior: ['-inf'],  // behavior from left of each asymptote
        rightBehavior: ['+inf']  // behavior from right of each asymptote
    },
    {
        name: '1/x^2',
        asymptotes: [0],
        xMin: -4, xMax: 4, yMin: -2, yMax: 10,
        fn: (x) => 1/(x*x),
        leftBehavior: ['+inf'],
        rightBehavior: ['+inf']
    },
    {
        name: 'x/((x-2)(x+1))',
        asymptotes: [-1, 2],
        xMin: -4, xMax: 5, yMin: -6, yMax: 6,
        fn: (x) => x/((x-2)*(x+1)),
        leftBehavior: ['+inf', '-inf'],
        rightBehavior: ['-inf', '+inf']
    },
    {
        name: '1/(x-1)',
        asymptotes: [1],
        xMin: -3, xMax: 5, yMin: -8, yMax: 8,
        fn: (x) => 1/(x-1),
        leftBehavior: ['-inf'],
        rightBehavior: ['+inf']
    }
];

let currentFuncIndex = 0;
let currentFunc;
let currentAsymptoteIndex = 0;
let currentDistance = 1.0;

// UI elements
let functionSelect;
let distanceSlider;
let directionSelect;
let animateButton;
let resetButton;
let isAnimating = false;
let animationPhase = 0;
let showDirection = 'both'; // 'left', 'right', 'both'

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    currentFunc = functions[0];

    // Function selector
    functionSelect = createSelect();
    functionSelect.position(10, drawHeight + 5);
    for (let i = 0; i < functions.length; i++) {
        functionSelect.option('f(x) = ' + functions[i].name, i);
    }
    functionSelect.changed(() => {
        currentFuncIndex = parseInt(functionSelect.value());
        currentFunc = functions[currentFuncIndex];
        currentAsymptoteIndex = 0;
        resetAnimation();
    });

    // Distance slider
    distanceSlider = createSlider(0.02, 2, 1.0, 0.02);
    distanceSlider.position(sliderLeftMargin, drawHeight + 5);
    distanceSlider.size(canvasWidth - sliderLeftMargin - margin);
    distanceSlider.input(() => { currentDistance = distanceSlider.value(); });

    // Direction select
    directionSelect = createSelect();
    directionSelect.position(sliderLeftMargin, drawHeight + 45);
    directionSelect.option('Both sides', 'both');
    directionSelect.option('From left', 'left');
    directionSelect.option('From right', 'right');
    directionSelect.changed(() => { showDirection = directionSelect.value(); });

    // Animate button
    animateButton = createButton('Animate');
    animateButton.position(10, drawHeight + 50);
    animateButton.mousePressed(startAnimation);

    // Reset button
    resetButton = createButton('Reset');
    resetButton.position(80, drawHeight + 50);
    resetButton.mousePressed(resetAnimation);

    describe('Interactive visualization of vertical asymptotes showing one-sided limit behavior', LABEL);
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
    graphRight = canvasWidth - 130;
    graphBottom = drawHeight - 30;

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Vertical Asymptote Explorer', canvasWidth/2 - 50, 8);
    textSize(14);
    text('f(x) = ' + currentFunc.name, canvasWidth/2 - 50, 32);

    // Draw components
    drawAxes();
    drawAsymptotes();
    drawFunction();
    drawApproachPoints();
    drawInfoPanel();

    // Animation update
    if (isAnimating) {
        animationPhase += 0.015;
        currentDistance = 2.0 * (1 - animationPhase);
        if (currentDistance < 0.02) {
            currentDistance = 0.02;
            isAnimating = false;
        }
        distanceSlider.value(currentDistance);
    }

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('Dist: ' + currentDistance.toFixed(2), sliderLeftMargin - 65, drawHeight + 15);
    text('Show:', sliderLeftMargin - 50, drawHeight + 55);
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

function drawAsymptotes() {
    let cf = currentFunc;

    stroke(200, 50, 50);
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);

    for (let i = 0; i < cf.asymptotes.length; i++) {
        let asymX = cf.asymptotes[i];
        let px = map(asymX, cf.xMin, cf.xMax, graphLeft, graphRight);
        line(px, graphTop, px, graphBottom);

        // Label
        fill(180, 40, 40);
        noStroke();
        textSize(12);
        textAlign(CENTER, TOP);
        text('x = ' + asymX, px, graphTop - 15);
        stroke(200, 50, 50);
    }
    drawingContext.setLineDash([]);
}

function drawFunction() {
    let cf = currentFunc;

    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    // Draw function in segments, avoiding asymptotes
    let segments = [];
    let currentSegment = [];

    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, cf.xMin, cf.xMax);

        // Check if near any asymptote
        let nearAsymptote = false;
        for (let asymX of cf.asymptotes) {
            if (abs(x - asymX) < 0.08) {
                nearAsymptote = true;
                break;
            }
        }

        if (nearAsymptote) {
            if (currentSegment.length > 0) {
                segments.push(currentSegment);
                currentSegment = [];
            }
        } else {
            let y = cf.fn(x);
            let py = map(y, cf.yMin, cf.yMax, graphBottom, graphTop);
            if (py >= graphTop - 50 && py <= graphBottom + 50) {
                currentSegment.push({px: px, py: constrain(py, graphTop, graphBottom)});
            } else {
                if (currentSegment.length > 0) {
                    segments.push(currentSegment);
                    currentSegment = [];
                }
            }
        }
    }
    if (currentSegment.length > 0) {
        segments.push(currentSegment);
    }

    // Draw each segment
    for (let seg of segments) {
        beginShape();
        for (let pt of seg) {
            vertex(pt.px, pt.py);
        }
        endShape();
    }
}

function drawApproachPoints() {
    let cf = currentFunc;

    // Use first asymptote for approach visualization
    let asymX = cf.asymptotes[currentAsymptoteIndex];

    // Left approach point (teal)
    if (showDirection === 'left' || showDirection === 'both') {
        let leftX = asymX - currentDistance;
        if (leftX >= cf.xMin) {
            let leftY = cf.fn(leftX);
            let leftPx = map(leftX, cf.xMin, cf.xMax, graphLeft, graphRight);
            let leftPy = map(leftY, cf.yMin, cf.yMax, graphBottom, graphTop);
            leftPy = constrain(leftPy, graphTop, graphBottom);

            // Draw point
            fill(0, 150, 150);
            noStroke();
            circle(leftPx, leftPy, 14);

            // Draw arrow showing direction
            stroke(0, 150, 150);
            strokeWeight(3);
            let arrowDir = cf.leftBehavior[currentAsymptoteIndex] === '+inf' ? -1 : 1;
            let arrowY = leftPy + arrowDir * 20;
            arrowY = constrain(arrowY, graphTop + 10, graphBottom - 10);
            line(leftPx, leftPy, leftPx, arrowY);
            // Arrowhead
            if (arrowDir < 0) {
                line(leftPx, arrowY, leftPx - 5, arrowY + 8);
                line(leftPx, arrowY, leftPx + 5, arrowY + 8);
            } else {
                line(leftPx, arrowY, leftPx - 5, arrowY - 8);
                line(leftPx, arrowY, leftPx + 5, arrowY - 8);
            }
        }
    }

    // Right approach point (orange)
    if (showDirection === 'right' || showDirection === 'both') {
        let rightX = asymX + currentDistance;
        if (rightX <= cf.xMax) {
            let rightY = cf.fn(rightX);
            let rightPx = map(rightX, cf.xMin, cf.xMax, graphLeft, graphRight);
            let rightPy = map(rightY, cf.yMin, cf.yMax, graphBottom, graphTop);
            rightPy = constrain(rightPy, graphTop, graphBottom);

            // Draw point
            fill(200, 100, 0);
            noStroke();
            circle(rightPx, rightPy, 14);

            // Draw arrow showing direction
            stroke(200, 100, 0);
            strokeWeight(3);
            let arrowDir = cf.rightBehavior[currentAsymptoteIndex] === '+inf' ? -1 : 1;
            let arrowY = rightPy + arrowDir * 20;
            arrowY = constrain(arrowY, graphTop + 10, graphBottom - 10);
            line(rightPx, rightPy, rightPx, arrowY);
            // Arrowhead
            if (arrowDir < 0) {
                line(rightPx, arrowY, rightPx - 5, arrowY + 8);
                line(rightPx, arrowY, rightPx + 5, arrowY + 8);
            } else {
                line(rightPx, arrowY, rightPx - 5, arrowY - 8);
                line(rightPx, arrowY, rightPx + 5, arrowY - 8);
            }
        }
    }
}

function drawInfoPanel() {
    let cf = currentFunc;
    let asymX = cf.asymptotes[currentAsymptoteIndex];
    let panelX = canvasWidth - 125;
    let panelY = graphTop;
    let panelW = 120;
    let panelH = 180;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Content
    fill(0);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);

    let y = panelY + 10;

    // Asymptote info
    fill(180, 40, 40);
    text('Asymptote:', panelX + 8, y);
    y += 16;
    textSize(14);
    text('x = ' + asymX, panelX + 8, y);
    y += 24;

    // Left limit
    textSize(12);
    fill(0, 120, 120);
    text('From left:', panelX + 8, y);
    y += 16;
    let leftX = asymX - currentDistance;
    let leftY = leftX >= cf.xMin ? cf.fn(leftX) : NaN;
    textSize(13);
    if (!isNaN(leftY) && isFinite(leftY)) {
        text('y = ' + leftY.toFixed(2), panelX + 8, y);
    } else {
        text('y ' + cf.leftBehavior[currentAsymptoteIndex].replace('inf', '\u221E'), panelX + 8, y);
    }
    y += 22;

    // Right limit
    textSize(12);
    fill(180, 90, 0);
    text('From right:', panelX + 8, y);
    y += 16;
    let rightX = asymX + currentDistance;
    let rightY = rightX <= cf.xMax ? cf.fn(rightX) : NaN;
    textSize(13);
    if (!isNaN(rightY) && isFinite(rightY)) {
        text('y = ' + rightY.toFixed(2), panelX + 8, y);
    } else {
        text('y ' + cf.rightBehavior[currentAsymptoteIndex].replace('inf', '\u221E'), panelX + 8, y);
    }
    y += 26;

    // One-sided limit notation
    textSize(11);
    fill(0);
    text('One-sided limits:', panelX + 8, y);
    y += 16;
    fill(0, 100, 100);
    text('lim\u207B: ' + cf.leftBehavior[currentAsymptoteIndex].replace('inf', '\u221E').replace('+', '+').replace('-', '-'), panelX + 8, y);
    y += 14;
    fill(160, 80, 0);
    text('lim\u207A: ' + cf.rightBehavior[currentAsymptoteIndex].replace('inf', '\u221E').replace('+', '+').replace('-', '-'), panelX + 8, y);
}

function startAnimation() {
    isAnimating = true;
    animationPhase = 0;
    currentDistance = 2.0;
}

function resetAnimation() {
    isAnimating = false;
    currentDistance = 1.0;
    distanceSlider.value(1.0);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    distanceSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
