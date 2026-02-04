// Derivative from Graph - Estimate Derivatives by Drawing Tangent Lines
// Students practice estimating derivatives graphically by drawing tangent lines
// and comparing their slope to the actual derivative value.
// Bloom Level: Apply (L3), Verbs: estimate, calculate, demonstrate
// MicroSim template version 2026.02

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
let xMin = -3;
let xMax = 3;
let yMin = -4;
let yMax = 6;

// Control buttons (canvas-based)
let checkButtonX, checkButtonY, checkButtonW = 95, checkButtonH = 28;
let newFuncButtonX, newFuncButtonY, newFuncButtonW = 95, newFuncButtonH = 28;
let clearButtonX, clearButtonY, clearButtonW = 75, clearButtonH = 28;
let difficultyButtons = [];

// State variables
let currentFunction = 0;
let difficulty = 'Easy';
let pointX = 1;
let pointY;

// User's tangent line
let userLineStart = null;
let userLineEnd = null;
let isDrawingLine = false;
let userSlope = null;

// Results display
let showResults = false;
let actualSlope;
let percentError;

// Function definitions for each difficulty
// Easy: parabolas, Medium: cubics, Hard: trig
let functions = {
    'Easy': [
        { f: x => x * x, df: x => 2 * x, name: 'f(x) = x squared' },
        { f: x => -x * x + 4, df: x => -2 * x, name: 'f(x) = -x squared + 4' },
        { f: x => 0.5 * x * x - 1, df: x => x, name: 'f(x) = 0.5x squared - 1' },
        { f: x => 2 * x * x - 3, df: x => 4 * x, name: 'f(x) = 2x squared - 3' }
    ],
    'Medium': [
        { f: x => x * x * x / 3, df: x => x * x, name: 'f(x) = x cubed / 3' },
        { f: x => x * x * x - x, df: x => 3 * x * x - 1, name: 'f(x) = x cubed - x' },
        { f: x => -x * x * x / 2 + 2 * x, df: x => -1.5 * x * x + 2, name: 'f(x) = -x cubed/2 + 2x' },
        { f: x => x * x * x / 4 + x * x / 2, df: x => 0.75 * x * x + x, name: 'f(x) = x cubed/4 + x squared/2' }
    ],
    'Hard': [
        { f: x => 2 * Math.sin(x), df: x => 2 * Math.cos(x), name: 'f(x) = 2sin(x)' },
        { f: x => Math.cos(x) + x, df: x => -Math.sin(x) + 1, name: 'f(x) = cos(x) + x' },
        { f: x => Math.sin(2 * x), df: x => 2 * Math.cos(2 * x), name: 'f(x) = sin(2x)' },
        { f: x => x + Math.sin(x), df: x => 1 + Math.cos(x), name: 'f(x) = x + sin(x)' }
    ]
};

// Current function object
let currentFunc;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize with random function
    selectNewFunction();

    // Set button positions
    updateButtonPositions();

    describe('Interactive derivative estimation exercise where students draw tangent lines on curves and compare their estimated slope to the actual derivative', LABEL);
}

function updateButtonPositions() {
    // Row 1: Check, New Function, Clear buttons
    checkButtonX = 10;
    checkButtonY = drawHeight + 10;

    newFuncButtonX = checkButtonX + checkButtonW + 10;
    newFuncButtonY = drawHeight + 10;

    clearButtonX = newFuncButtonX + newFuncButtonW + 10;
    clearButtonY = drawHeight + 10;

    // Row 2: Difficulty buttons
    let diffX = 100;
    difficultyButtons = [
        { label: 'Easy', x: diffX, y: drawHeight + 48, w: 55, h: 24 },
        { label: 'Medium', x: diffX + 60, y: drawHeight + 48, w: 65, h: 24 },
        { label: 'Hard', x: diffX + 130, y: drawHeight + 48, w: 55, h: 24 }
    ];
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
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Update graph bounds
    graphRight = canvasWidth - 40;
    graphBottom = drawHeight - 40;

    // Draw elements
    drawTitle();
    drawAxes();
    drawFunction();
    drawPoint();
    drawUserLine();

    if (showResults) {
        drawActualTangent();
        drawResultsPanel();
    }

    drawInstructions();
    drawControls();
}

function drawTitle() {
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Estimate the Derivative', canvasWidth / 2, 8);
    textSize(14);
    fill(80);
    text(currentFunc.name, canvasWidth / 2, 30);
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
        if (x !== 0) {
            let px = map(x, xMin, xMax, graphLeft, graphRight);
            if (px >= graphLeft && px <= graphRight) {
                text(x, px, y0Label + 5);
            }
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
}

function drawFunction() {
    // Draw the curve
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    beginShape();
    for (let px = graphLeft; px <= graphRight; px += 2) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        let y = currentFunc.f(x);
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop - 10 && py <= graphBottom + 10) {
            vertex(px, py);
        }
    }
    endShape();
}

function drawPoint() {
    // Draw the point where we estimate the derivative
    let px = map(pointX, xMin, xMax, graphLeft, graphRight);
    let py = map(pointY, yMin, yMax, graphBottom, graphTop);

    if (py >= graphTop && py <= graphBottom) {
        // Point
        fill(50, 180, 100);
        noStroke();
        circle(px, py, 16);

        // Label
        fill(30, 120, 60);
        textSize(14);
        textAlign(LEFT, BOTTOM);
        noStroke();
        text('P(' + pointX.toFixed(1) + ', ' + pointY.toFixed(2) + ')', px + 12, py - 5);
    }
}

function drawUserLine() {
    if (userLineStart && userLineEnd) {
        stroke(220, 100, 50);
        strokeWeight(3);

        // Extend line to graph edges
        let dx = userLineEnd.x - userLineStart.x;
        let dy = userLineEnd.y - userLineStart.y;

        if (Math.abs(dx) > 5) {
            // Calculate slope in pixel space
            let pixelSlope = dy / dx;

            // Extend to graph boundaries
            let x1 = graphLeft;
            let y1 = userLineStart.y + pixelSlope * (graphLeft - userLineStart.x);
            let x2 = graphRight;
            let y2 = userLineStart.y + pixelSlope * (graphRight - userLineStart.x);

            line(x1, y1, x2, y2);

            // Calculate and display user's slope
            let x1Graph = map(userLineStart.x, graphLeft, graphRight, xMin, xMax);
            let y1Graph = map(userLineStart.y, graphBottom, graphTop, yMin, yMax);
            let x2Graph = map(userLineEnd.x, graphLeft, graphRight, xMin, xMax);
            let y2Graph = map(userLineEnd.y, graphBottom, graphTop, yMin, yMax);

            userSlope = (y2Graph - y1Graph) / (x2Graph - x1Graph);

            // Display user's slope
            fill(220, 100, 50);
            noStroke();
            textSize(14);
            textAlign(LEFT, TOP);
            text('Your slope: ' + userSlope.toFixed(3), graphLeft + 10, graphTop + 10);
        }
    }
}

function drawActualTangent() {
    // Draw actual tangent line (dashed green)
    let tangentSlope = currentFunc.df(pointX);
    let px = map(pointX, xMin, xMax, graphLeft, graphRight);
    let py = map(pointY, yMin, yMax, graphBottom, graphTop);

    stroke(100, 200, 100);
    strokeWeight(2);
    drawingContext.setLineDash([8, 4]);

    // Convert slope to pixel space
    let rise = -tangentSlope * (yMax - yMin) / (graphBottom - graphTop);
    let run = (xMax - xMin) / (graphRight - graphLeft);
    let pixelSlope = rise / run;

    // Extend to graph boundaries
    let x1 = graphLeft;
    let y1 = py + pixelSlope * (graphLeft - px);
    let x2 = graphRight;
    let y2 = py + pixelSlope * (graphRight - px);

    line(x1, y1, x2, y2);
    drawingContext.setLineDash([]);
}

function drawResultsPanel() {
    // Panel on right side
    let panelWidth = 140;
    let panelX = canvasWidth - panelWidth - 10;
    let panelY = graphTop + 10;
    let panelHeight = 100;

    // Background
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    // Content
    fill(0);
    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);

    let yPos = panelY + 10;

    text('Results:', panelX + 10, yPos);
    yPos += 20;

    fill(220, 100, 50);
    text('Your slope: ' + (userSlope ? userSlope.toFixed(3) : 'N/A'), panelX + 10, yPos);
    yPos += 18;

    fill(100, 200, 100);
    text('Actual: ' + actualSlope.toFixed(3), panelX + 10, yPos);
    yPos += 18;

    // Percent error
    if (userSlope !== null) {
        if (Math.abs(actualSlope) < 0.001) {
            percentError = Math.abs(userSlope) * 100;
        } else {
            percentError = Math.abs((userSlope - actualSlope) / actualSlope) * 100;
        }

        if (percentError < 10) {
            fill(50, 180, 100);
            text('Excellent! ' + percentError.toFixed(1) + '% error', panelX + 10, yPos);
        } else if (percentError < 25) {
            fill(200, 150, 50);
            text('Good! ' + percentError.toFixed(1) + '% error', panelX + 10, yPos);
        } else {
            fill(200, 80, 80);
            text(percentError.toFixed(1) + '% error', panelX + 10, yPos);
        }
    }
}

function drawInstructions() {
    if (!showResults && !userLineStart) {
        fill(100);
        noStroke();
        textSize(12);
        textAlign(CENTER, TOP);
        text('Click and drag through point P to draw a tangent line', canvasWidth / 2, graphBottom + 5);
    }
}

function drawControls() {
    // Row 1 buttons
    drawButton('Check Answer', checkButtonX, checkButtonY, checkButtonW, checkButtonH, userLineStart !== null);
    drawButton('New Function', newFuncButtonX, newFuncButtonY, newFuncButtonW, newFuncButtonH, true);
    drawButton('Clear Line', clearButtonX, clearButtonY, clearButtonW, clearButtonH, userLineStart !== null);

    // Row 2: Difficulty label and buttons
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Difficulty:', 10, drawHeight + 60);

    for (let btn of difficultyButtons) {
        let isSelected = (difficulty === btn.label);
        drawDifficultyButton(btn.label, btn.x, btn.y, btn.w, btn.h, isSelected);
    }
}

function drawButton(label, x, y, w, h, enabled) {
    // Button background
    if (enabled) {
        fill(100, 100, 180);
    } else {
        fill(180);
    }
    stroke(80, 80, 150);
    strokeWeight(1);
    rect(x, y, w, h, 4);

    // Button text
    fill(255);
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    text(label, x + w/2, y + h/2);
}

function drawDifficultyButton(label, x, y, w, h, isSelected) {
    if (isSelected) {
        fill(80, 140, 200);
        stroke(60, 100, 160);
    } else {
        fill(220);
        stroke(180);
    }
    strokeWeight(1);
    rect(x, y, w, h, 4);

    if (isSelected) {
        fill(255);
    } else {
        fill(60);
    }
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(label, x + w/2, y + h/2);
}

function selectNewFunction() {
    let funcList = functions[difficulty];
    currentFunction = Math.floor(Math.random() * funcList.length);
    currentFunc = funcList[currentFunction];

    // Select a random x position for the point
    if (difficulty === 'Easy') {
        pointX = Math.floor(Math.random() * 5 - 2); // -2 to 2
        if (pointX === 0) pointX = 1;
    } else if (difficulty === 'Medium') {
        pointX = (Math.random() * 4 - 2); // -2 to 2
        pointX = Math.round(pointX * 2) / 2; // Round to 0.5
    } else {
        pointX = Math.round((Math.random() * 4 - 2) * 10) / 10; // -2 to 2, one decimal
    }

    pointY = currentFunc.f(pointX);
    actualSlope = currentFunc.df(pointX);

    // Reset user line
    userLineStart = null;
    userLineEnd = null;
    userSlope = null;
    showResults = false;
}

function mousePressed() {
    // Check if in control region
    if (mouseY > drawHeight) {
        // Check buttons
        if (isInButton(mouseX, mouseY, checkButtonX, checkButtonY, checkButtonW, checkButtonH)) {
            if (userLineStart) {
                showResults = true;
            }
            return;
        }

        if (isInButton(mouseX, mouseY, newFuncButtonX, newFuncButtonY, newFuncButtonW, newFuncButtonH)) {
            selectNewFunction();
            return;
        }

        if (isInButton(mouseX, mouseY, clearButtonX, clearButtonY, clearButtonW, clearButtonH)) {
            userLineStart = null;
            userLineEnd = null;
            userSlope = null;
            showResults = false;
            return;
        }

        // Check difficulty buttons
        for (let btn of difficultyButtons) {
            if (isInButton(mouseX, mouseY, btn.x, btn.y, btn.w, btn.h)) {
                difficulty = btn.label;
                selectNewFunction();
                return;
            }
        }

        return;
    }

    // Start drawing line in graph area
    if (mouseX >= graphLeft && mouseX <= graphRight &&
        mouseY >= graphTop && mouseY <= graphBottom) {
        isDrawingLine = true;
        userLineStart = { x: mouseX, y: mouseY };
        userLineEnd = { x: mouseX, y: mouseY };
        showResults = false;
    }
}

function mouseDragged() {
    if (isDrawingLine && mouseX >= graphLeft && mouseX <= graphRight) {
        userLineEnd = { x: mouseX, y: mouseY };
    }
}

function mouseReleased() {
    isDrawingLine = false;
}

function isInButton(mx, my, bx, by, bw, bh) {
    return mx >= bx && mx <= bx + bw && my >= by && my <= by + bh;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateButtonPositions();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
