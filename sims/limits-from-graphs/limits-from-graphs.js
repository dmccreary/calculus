// Limits from Graphs Practice MicroSim
// Practice reading limits from graphical representations
// Bloom Level: Apply (L3), Verb: Determine

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphTop = 60;
let graphBottom;
let xMin = -2;
let xMax = 6;
let yMin = -2;
let yMax = 6;

// Problem state
let currentGraph = null;
let targetX = 2;
let userLeftLimit = '';
let userRightLimit = '';
let userTwoSided = '';
let feedback = '';
let feedbackColor = [0, 0, 0];
let score = 0;
let attempts = 0;
let difficulty = 'basic';
let inputFocus = 'left'; // 'left', 'right', 'two'
let traceX = null;

// Graph types
let graphs = {
    basic: [
        // Continuous function
        {
            type: 'continuous',
            targetX: 2,
            left: (x) => x + 1,
            right: (x) => x + 1,
            leftLimit: 3,
            rightLimit: 3,
            twoSided: 3,
            hasHole: false
        },
        // Parabola
        {
            type: 'continuous',
            targetX: 1,
            left: (x) => x * x,
            right: (x) => x * x,
            leftLimit: 1,
            rightLimit: 1,
            twoSided: 1,
            hasHole: false
        }
    ],
    intermediate: [
        // Removable discontinuity (hole)
        {
            type: 'hole',
            targetX: 2,
            left: (x) => x + 2,
            right: (x) => x + 2,
            leftLimit: 4,
            rightLimit: 4,
            twoSided: 4,
            hasHole: true,
            holeY: 4,
            pointY: 1
        },
        // Different function value
        {
            type: 'hole',
            targetX: 3,
            left: (x) => 2 * x - 1,
            right: (x) => 2 * x - 1,
            leftLimit: 5,
            rightLimit: 5,
            twoSided: 5,
            hasHole: true,
            holeY: 5,
            pointY: 2
        }
    ],
    challenge: [
        // Jump discontinuity
        {
            type: 'jump',
            targetX: 2,
            left: (x) => x,
            right: (x) => x + 2,
            leftLimit: 2,
            rightLimit: 4,
            twoSided: 'DNE',
            hasHole: false
        },
        // Another jump
        {
            type: 'jump',
            targetX: 1,
            left: (x) => 3,
            right: (x) => -x + 2,
            leftLimit: 3,
            rightLimit: 1,
            twoSided: 'DNE',
            hasHole: false
        }
    ]
};

// UI elements
let difficultySelect;
let newGraphButton;
let checkButton;
let showAnswerButton;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Difficulty selector
    difficultySelect = createSelect();
    difficultySelect.position(80, drawHeight + 5);
    difficultySelect.option('Basic', 'basic');
    difficultySelect.option('Intermediate', 'intermediate');
    difficultySelect.option('Challenge', 'challenge');
    difficultySelect.changed(() => {
        difficulty = difficultySelect.value();
        generateGraph();
    });

    // New Graph button
    newGraphButton = createButton('New Graph');
    newGraphButton.position(10, drawHeight + 35);
    newGraphButton.mousePressed(generateGraph);

    // Check Answer button
    checkButton = createButton('Check');
    checkButton.position(110, drawHeight + 35);
    checkButton.mousePressed(checkAnswer);

    // Show Answer button
    showAnswerButton = createButton('Show Answer');
    showAnswerButton.position(170, drawHeight + 35);
    showAnswerButton.mousePressed(showAnswer);

    generateGraph();

    describe('Practice reading limits from graphs', LABEL);
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
    textSize(18);
    text('Limits from Graphs', canvasWidth/2 - 40, 8);
    textSize(14);
    text('Find the limit as x → ' + currentGraph.targetX, canvasWidth/2 - 40, 30);

    // Score
    textAlign(RIGHT, TOP);
    textSize(12);
    text('Score: ' + score + '/' + attempts, canvasWidth - 15, 8);

    // Draw graph
    drawAxes();
    drawFunction();
    drawTargetLine();
    drawInputPanel();

    // Trace point on mouseover
    if (traceX !== null) {
        drawTracePoint();
    }

    // Feedback
    if (feedback) {
        textSize(14);
        textAlign(CENTER, TOP);
        fill(feedbackColor[0], feedbackColor[1], feedbackColor[2]);
        noStroke();
        text(feedback, canvasWidth/2, drawHeight - 30);
    }

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('Difficulty:', 10, drawHeight + 15);
}

function drawAxes() {
    stroke(220);
    strokeWeight(1);

    // Grid
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
        let px = map(x, xMin, xMax, graphLeft, graphRight);
        line(px, graphTop, px, graphBottom);
    }
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        line(graphLeft, py, graphRight, py);
    }

    // Axes
    stroke(0);
    strokeWeight(2);
    let y0 = map(0, yMin, yMax, graphBottom, graphTop);
    let x0 = map(0, xMin, xMax, graphLeft, graphRight);
    line(graphLeft, y0, graphRight, y0);
    line(x0, graphTop, x0, graphBottom);

    // Labels
    fill(0);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
        let px = map(x, xMin, xMax, graphLeft, graphRight);
        text(x, px, y0 + 3);
    }
    textAlign(RIGHT, CENTER);
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
        if (y !== 0) {
            let py = map(y, yMin, yMax, graphBottom, graphTop);
            text(y, x0 - 5, py);
        }
    }
}

function drawFunction() {
    let cg = currentGraph;

    // Left side
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        if (x >= cg.targetX - 0.05) break;
        let y = cg.left(x);
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Right side
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        if (x <= cg.targetX + 0.05) continue;
        let y = cg.right(x);
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Draw hole if applicable
    if (cg.hasHole) {
        let hx = map(cg.targetX, xMin, xMax, graphLeft, graphRight);
        let hy = map(cg.holeY, yMin, yMax, graphBottom, graphTop);
        stroke(0, 100, 200);
        strokeWeight(3);
        fill('aliceblue');
        circle(hx, hy, 12);

        // Isolated point
        fill(0, 100, 200);
        noStroke();
        let py = map(cg.pointY, yMin, yMax, graphBottom, graphTop);
        circle(hx, py, 10);
    }
}

function drawTargetLine() {
    let px = map(currentGraph.targetX, xMin, xMax, graphLeft, graphRight);
    stroke(200, 100, 100, 150);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(px, graphTop, px, graphBottom);
    drawingContext.setLineDash([]);
}

function drawInputPanel() {
    let panelX = canvasWidth - 115;
    let panelY = graphTop;
    let panelW = 110;
    let panelH = 160;

    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    fill(0);
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);

    let y = panelY + 8;

    // Left limit input
    text('Left limit:', panelX + 8, y);
    y += 16;
    drawInputBox(panelX + 8, y, 60, 22, userLeftLimit, inputFocus === 'left');
    y += 32;

    // Right limit input
    text('Right limit:', panelX + 8, y);
    y += 16;
    drawInputBox(panelX + 8, y, 60, 22, userRightLimit, inputFocus === 'right');
    y += 32;

    // Two-sided limit input
    text('Two-sided:', panelX + 8, y);
    y += 16;
    drawInputBox(panelX + 8, y, 60, 22, userTwoSided, inputFocus === 'two');

    textSize(9);
    fill(100);
    text('(or DNE)', panelX + 8, y + 24);
}

function drawInputBox(x, y, w, h, value, focused) {
    fill(255);
    stroke(focused ? color(0, 100, 200) : color(180));
    strokeWeight(focused ? 2 : 1);
    rect(x, y, w, h, 4);

    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(value || (focused ? '_' : ''), x + w/2, y + h/2);
}

function drawTracePoint() {
    let cg = currentGraph;
    let y;

    if (traceX < cg.targetX) {
        y = cg.left(traceX);
    } else {
        y = cg.right(traceX);
    }

    let px = map(traceX, xMin, xMax, graphLeft, graphRight);
    let py = map(y, yMin, yMax, graphBottom, graphTop);

    if (py >= graphTop && py <= graphBottom) {
        fill(200, 50, 100);
        noStroke();
        circle(px, py, 12);

        fill(0);
        textSize(10);
        textAlign(CENTER, BOTTOM);
        noStroke();
        text('(' + traceX.toFixed(2) + ', ' + y.toFixed(2) + ')', px, py - 8);
    }
}

function generateGraph() {
    let graphList = graphs[difficulty];
    currentGraph = graphList[Math.floor(Math.random() * graphList.length)];
    userLeftLimit = '';
    userRightLimit = '';
    userTwoSided = '';
    feedback = '';
    inputFocus = 'left';
}

function checkAnswer() {
    let cg = currentGraph;
    attempts++;

    let leftCorrect = parseFloat(userLeftLimit) === cg.leftLimit;
    let rightCorrect = parseFloat(userRightLimit) === cg.rightLimit;
    let twoCorrect = (userTwoSided.toUpperCase() === 'DNE' && cg.twoSided === 'DNE') ||
                     (parseFloat(userTwoSided) === cg.twoSided);

    if (leftCorrect && rightCorrect && twoCorrect) {
        feedback = 'Correct!';
        feedbackColor = [0, 150, 0];
        score++;
    } else {
        let wrong = [];
        if (!leftCorrect) wrong.push('left');
        if (!rightCorrect) wrong.push('right');
        if (!twoCorrect) wrong.push('two-sided');
        feedback = 'Check: ' + wrong.join(', ');
        feedbackColor = [200, 0, 0];
    }
}

function showAnswer() {
    let cg = currentGraph;
    userLeftLimit = cg.leftLimit.toString();
    userRightLimit = cg.rightLimit.toString();
    userTwoSided = cg.twoSided.toString();
    feedback = 'Answer shown';
    feedbackColor = [100, 100, 100];
}

function mousePressed() {
    let panelX = canvasWidth - 115;
    let panelY = graphTop;

    // Check which input box was clicked
    if (mouseX > panelX + 8 && mouseX < panelX + 68) {
        if (mouseY > panelY + 24 && mouseY < panelY + 46) {
            inputFocus = 'left';
        } else if (mouseY > panelY + 72 && mouseY < panelY + 94) {
            inputFocus = 'right';
        } else if (mouseY > panelY + 120 && mouseY < panelY + 142) {
            inputFocus = 'two';
        }
    }
}

function mouseMoved() {
    // Trace on graph
    if (mouseX > graphLeft && mouseX < graphRight && mouseY > graphTop && mouseY < graphBottom) {
        traceX = map(mouseX, graphLeft, graphRight, xMin, xMax);
    } else {
        traceX = null;
    }
}

function keyPressed() {
    let targetInput;
    if (inputFocus === 'left') targetInput = 'userLeftLimit';
    else if (inputFocus === 'right') targetInput = 'userRightLimit';
    else targetInput = 'userTwoSided';

    if (key >= '0' && key <= '9') {
        window[targetInput] += key;
    } else if (key === '-' && window[targetInput] === '') {
        window[targetInput] = '-';
    } else if (key === '.' && !window[targetInput].includes('.')) {
        window[targetInput] += '.';
    } else if (key === 'd' || key === 'D') {
        if (inputFocus === 'two') userTwoSided = 'DNE';
    } else if (keyCode === BACKSPACE) {
        window[targetInput] = window[targetInput].slice(0, -1);
    } else if (keyCode === TAB) {
        if (inputFocus === 'left') inputFocus = 'right';
        else if (inputFocus === 'right') inputFocus = 'two';
        else inputFocus = 'left';
        return false;
    } else if (keyCode === ENTER) {
        checkAnswer();
    }
    return false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
