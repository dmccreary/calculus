// Discontinuity Classification MicroSim
// Classify discontinuities by analyzing limit behavior at specific points
// Bloom Level: Analyze (L4), Verb: Classify

let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Mode: 'gallery' or 'quiz'
let currentMode = 'gallery';

// Gallery panel parameters
let panelMargin = 10;
let panelRows = 2;
let panelCols = 2;

// Quiz state
let currentQuizType = null;
let quizFeedback = '';
let feedbackColor = [0, 0, 0];
let score = 0;
let attempts = 0;
let showExplanation = false;
let explanationText = '';

// Gallery zoom
let zoomLevel = 1.0;
let selectedPanel = -1; // -1 = none, 0-3 = panel index

// Discontinuity types
const DISCONTINUITY_TYPES = ['Removable', 'Jump', 'Infinite', 'Essential'];

// Button states
let buttons = [];
let modeButton = null;
let newFunctionButton = null;
let zoomSlider = null;

// Discontinuity examples for gallery
const galleryExamples = {
    removable: {
        name: 'Removable',
        description: 'Limit exists, but f(a) is undefined or different',
        leftLimit: 4,
        rightLimit: 4,
        fValue: 'undefined',
        color: [65, 105, 225] // Royal blue
    },
    jump: {
        name: 'Jump',
        description: 'One-sided limits exist but are different',
        leftLimit: 2,
        rightLimit: 5,
        fValue: 5,
        color: [220, 20, 60] // Crimson
    },
    infinite: {
        name: 'Infinite',
        description: 'Function approaches infinity',
        leftLimit: '-infinity',
        rightLimit: '+infinity',
        fValue: 'undefined',
        color: [34, 139, 34] // Forest green
    },
    essential: {
        name: 'Essential',
        description: 'Limit does not exist (oscillation)',
        leftLimit: 'DNE',
        rightLimit: 'DNE',
        fValue: 'undefined',
        color: [148, 0, 211] // Violet
    }
};

// Quiz functions library
const quizFunctions = [
    // Removable discontinuities
    {
        type: 'Removable',
        draw: drawRemovable1,
        explanation: 'The limit from both sides equals 4, but there is a hole at x=2. Since the limit exists but f(2) is undefined, this is a REMOVABLE discontinuity.'
    },
    {
        type: 'Removable',
        draw: drawRemovable2,
        explanation: 'Both one-sided limits equal 3, but f(1) = 6 (different value). The limit exists, so this is a REMOVABLE discontinuity.'
    },
    // Jump discontinuities
    {
        type: 'Jump',
        draw: drawJump1,
        explanation: 'Left limit = 2, Right limit = 5. Since the one-sided limits exist but are different, this is a JUMP discontinuity.'
    },
    {
        type: 'Jump',
        draw: drawJump2,
        explanation: 'Left limit = 4, Right limit = 1. The one-sided limits exist but differ, so this is a JUMP discontinuity.'
    },
    // Infinite discontinuities
    {
        type: 'Infinite',
        draw: drawInfinite1,
        explanation: 'As x approaches 2, the function goes to infinity on both sides. This is an INFINITE (vertical asymptote) discontinuity.'
    },
    {
        type: 'Infinite',
        draw: drawInfinite2,
        explanation: 'Left side goes to -infinity, right side goes to +infinity. Either way, the function is unbounded, making this an INFINITE discontinuity.'
    },
    // Essential discontinuities
    {
        type: 'Essential',
        draw: drawEssential1,
        explanation: 'The function oscillates infinitely as x approaches 0. Neither one-sided limit exists, so this is an ESSENTIAL discontinuity.'
    },
    {
        type: 'Essential',
        draw: drawEssential2,
        explanation: 'Wild oscillation near x=0 means no limit exists. This chaotic behavior defines an ESSENTIAL discontinuity.'
    }
];

let currentQuizFunction = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textFont('Arial');
    generateQuizProblem();

    describe('Interactive discontinuity classification tool with gallery and quiz modes', LABEL);
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
    stroke('silver');
    line(0, drawHeight, canvasWidth, drawHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Discontinuity Classification', canvasWidth/2, 8);

    if (currentMode === 'gallery') {
        drawGalleryMode();
    } else {
        drawQuizMode();
    }

    drawControls();
}

function drawGalleryMode() {
    let panelW = (canvasWidth - panelMargin * 3) / 2;
    let panelH = (drawHeight - 60 - panelMargin * 3) / 2;

    let types = ['removable', 'jump', 'infinite', 'essential'];

    for (let i = 0; i < 4; i++) {
        let col = i % 2;
        let row = Math.floor(i / 2);
        let x = panelMargin + col * (panelW + panelMargin);
        let y = 35 + panelMargin + row * (panelH + panelMargin);

        // Panel background
        let isSelected = selectedPanel === i;
        fill(isSelected ? 245 : 255);
        stroke(isSelected ? 100 : 200);
        strokeWeight(isSelected ? 2 : 1);
        rect(x, y, panelW, panelH, 5);

        // Draw the example graph
        push();
        let graphX = x + 10;
        let graphY = y + 25;
        let graphW = panelW - 20;
        let graphH = panelH - 65;

        drawPanelGraph(types[i], graphX, graphY, graphW, graphH);
        pop();

        // Panel title
        let example = galleryExamples[types[i]];
        fill(example.color[0], example.color[1], example.color[2]);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(14);
        text(example.name, x + panelW/2, y + 5);

        // Limit info
        textSize(10);
        fill(80);
        textAlign(LEFT, BOTTOM);
        let infoY = y + panelH - 5;
        text('L-: ' + formatLimit(example.leftLimit) + '  R+: ' + formatLimit(example.rightLimit), x + 8, infoY);
    }

    // Instructions
    fill(100);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text('Click a panel for details', canvasWidth/2, drawHeight - 18);
}

function drawPanelGraph(type, gx, gy, gw, gh) {
    // Mini axes
    stroke(200);
    strokeWeight(1);
    let midX = gx + gw/2;
    let midY = gy + gh/2;
    line(gx, midY, gx + gw, midY);
    line(midX, gy, midX, gy + gh);

    // Draw discontinuity based on type
    let col = galleryExamples[type].color;
    stroke(col[0], col[1], col[2]);
    strokeWeight(2);
    noFill();

    let discontinuityX = midX;

    if (type === 'removable') {
        // Line with hole
        let yVal = midY - gh * 0.3;
        line(gx + 5, midY + gh*0.2, discontinuityX - 8, yVal);
        line(discontinuityX + 8, yVal, gx + gw - 5, midY - gh*0.4);
        // Hole
        fill('aliceblue');
        stroke(col[0], col[1], col[2]);
        circle(discontinuityX, yVal, 10);
    } else if (type === 'jump') {
        // Two horizontal lines at different heights
        let y1 = midY + gh * 0.15;
        let y2 = midY - gh * 0.25;
        line(gx + 5, y1, discontinuityX - 5, y1);
        line(discontinuityX + 5, y2, gx + gw - 5, y2);
        // Endpoints
        fill('aliceblue');
        circle(discontinuityX - 5, y1, 8);
        fill(col[0], col[1], col[2]);
        noStroke();
        circle(discontinuityX + 5, y2, 6);
    } else if (type === 'infinite') {
        // Vertical asymptote
        stroke(200, 100, 100);
        strokeWeight(1);
        drawingContext.setLineDash([3, 3]);
        line(discontinuityX, gy + 5, discontinuityX, gy + gh - 5);
        drawingContext.setLineDash([]);
        // Curves going to infinity
        stroke(col[0], col[1], col[2]);
        strokeWeight(2);
        noFill();
        // Left branch going up
        beginShape();
        for (let px = gx + 10; px < discontinuityX - 5; px += 2) {
            let t = (px - gx) / (discontinuityX - gx - 5);
            let curveY = midY - gh * 0.4 / (1 - t * 0.9);
            if (curveY > gy + 5) vertex(px, curveY);
        }
        endShape();
        // Right branch going up
        beginShape();
        for (let px = discontinuityX + 5; px < gx + gw - 10; px += 2) {
            let t = (px - discontinuityX) / (gx + gw - discontinuityX);
            let curveY = midY - gh * 0.4 / (t * 0.9 + 0.1);
            if (curveY > gy + 5) vertex(px, curveY);
        }
        endShape();
    } else if (type === 'essential') {
        // Oscillating function
        beginShape();
        for (let px = gx + 10; px < gx + gw - 10; px += 1) {
            let relX = (px - discontinuityX) / (gw * 0.4);
            if (Math.abs(relX) > 0.05) {
                let freq = 8 / Math.abs(relX);
                let amp = gh * 0.25 * Math.min(1, 0.3 / Math.abs(relX));
                let oscY = midY + Math.sin(freq) * amp;
                oscY = constrain(oscY, gy + 10, gy + gh - 10);
                vertex(px, oscY);
            }
        }
        endShape();
    }
}

function drawQuizMode() {
    // Main graph area
    let graphX = 50;
    let graphY = 50;
    let graphW = canvasWidth - 100;
    let graphH = drawHeight - 180;

    // Draw graph background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(graphX, graphY, graphW, graphH, 3);

    // Draw the quiz function
    if (currentQuizFunction) {
        currentQuizFunction.draw(graphX, graphY, graphW, graphH);
    }

    // Score display
    fill(80);
    noStroke();
    textAlign(RIGHT, TOP);
    textSize(12);
    text('Score: ' + score + '/' + attempts, canvasWidth - 15, 32);

    // Classification buttons
    let btnW = (canvasWidth - 50) / 4;
    let btnH = 32;
    let btnY = graphY + graphH + 15;

    for (let i = 0; i < 4; i++) {
        let btnX = 10 + i * (btnW + 10);
        let isHover = mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH;

        // Button colors based on type
        let colors = [[65, 105, 225], [220, 20, 60], [34, 139, 34], [148, 0, 211]];
        let col = colors[i];

        fill(isHover ? color(col[0], col[1], col[2], 200) : color(col[0], col[1], col[2]));
        stroke(50);
        strokeWeight(1);
        rect(btnX, btnY, btnW, btnH, 5);

        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        text(DISCONTINUITY_TYPES[i], btnX + btnW/2, btnY + btnH/2);
    }

    // Feedback area
    if (quizFeedback) {
        fill(feedbackColor[0], feedbackColor[1], feedbackColor[2]);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(14);
        text(quizFeedback, canvasWidth/2, btnY + btnH + 10);
    }

    // Explanation (if showing)
    if (showExplanation && explanationText) {
        fill(255, 255, 240);
        stroke(200);
        strokeWeight(1);
        let expY = btnY + btnH + 35;
        let expH = drawHeight - expY - 5;
        rect(10, expY, canvasWidth - 20, expH, 5);

        fill(60);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(11);
        text(explanationText, 18, expY + 8, canvasWidth - 36, expH - 16);
    }
}

// Quiz drawing functions
function drawRemovable1(gx, gy, gw, gh) {
    drawQuizAxes(gx, gy, gw, gh, -1, 5, -1, 7);

    let midX = gx + gw * 0.4;
    let toY = (v) => map(v, -1, 7, gy + gh, gy);
    let toX = (v) => map(v, -1, 5, gx, gx + gw);

    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    // f(x) = x + 2 with hole at x=2
    beginShape();
    for (let x = -0.5; x < 1.95; x += 0.1) {
        vertex(toX(x), toY(x + 2));
    }
    endShape();
    beginShape();
    for (let x = 2.05; x < 4.5; x += 0.1) {
        vertex(toX(x), toY(x + 2));
    }
    endShape();

    // Hole at (2, 4)
    fill('white');
    stroke(0, 100, 200);
    strokeWeight(2);
    circle(toX(2), toY(4), 12);

    // Mark the discontinuity point
    stroke(200, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(toX(2), gy + 10, toX(2), gy + gh - 10);
    drawingContext.setLineDash([]);

    // Label
    fill(100);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('x = 2', toX(2), gy + gh + 3);
}

function drawRemovable2(gx, gy, gw, gh) {
    drawQuizAxes(gx, gy, gw, gh, -2, 4, -1, 8);

    let toY = (v) => map(v, -1, 8, gy + gh, gy);
    let toX = (v) => map(v, -2, 4, gx, gx + gw);

    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    // f(x) = x + 2 but f(1) = 6
    beginShape();
    for (let x = -1.5; x < 0.95; x += 0.1) {
        vertex(toX(x), toY(x + 2));
    }
    endShape();
    beginShape();
    for (let x = 1.05; x < 3.5; x += 0.1) {
        vertex(toX(x), toY(x + 2));
    }
    endShape();

    // Hole at (1, 3)
    fill('white');
    stroke(0, 100, 200);
    strokeWeight(2);
    circle(toX(1), toY(3), 12);

    // Point at (1, 6)
    fill(0, 100, 200);
    noStroke();
    circle(toX(1), toY(6), 8);

    stroke(200, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(toX(1), gy + 10, toX(1), gy + gh - 10);
    drawingContext.setLineDash([]);

    fill(100);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('x = 1', toX(1), gy + gh + 3);
}

function drawJump1(gx, gy, gw, gh) {
    drawQuizAxes(gx, gy, gw, gh, -1, 5, -1, 7);

    let toY = (v) => map(v, -1, 7, gy + gh, gy);
    let toX = (v) => map(v, -1, 5, gx, gx + gw);

    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    // Left: y = 2
    line(toX(-0.5), toY(2), toX(2) - 8, toY(2));
    // Right: y = 5
    line(toX(2) + 8, toY(5), toX(4.5), toY(5));

    // Open circle at left endpoint
    fill('white');
    stroke(0, 100, 200);
    strokeWeight(2);
    circle(toX(2), toY(2), 10);

    // Filled circle at right endpoint
    fill(0, 100, 200);
    noStroke();
    circle(toX(2), toY(5), 8);

    stroke(200, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(toX(2), gy + 10, toX(2), gy + gh - 10);
    drawingContext.setLineDash([]);

    fill(100);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('x = 2', toX(2), gy + gh + 3);
}

function drawJump2(gx, gy, gw, gh) {
    drawQuizAxes(gx, gy, gw, gh, -2, 4, -1, 6);

    let toY = (v) => map(v, -1, 6, gy + gh, gy);
    let toX = (v) => map(v, -2, 4, gx, gx + gw);

    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    // Left: y = 4
    line(toX(-1.5), toY(4), toX(1) - 8, toY(4));
    // Right: y = 1
    line(toX(1) + 8, toY(1), toX(3.5), toY(1));

    fill('white');
    stroke(0, 100, 200);
    strokeWeight(2);
    circle(toX(1), toY(4), 10);

    fill(0, 100, 200);
    noStroke();
    circle(toX(1), toY(1), 8);

    stroke(200, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(toX(1), gy + 10, toX(1), gy + gh - 10);
    drawingContext.setLineDash([]);

    fill(100);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('x = 1', toX(1), gy + gh + 3);
}

function drawInfinite1(gx, gy, gw, gh) {
    drawQuizAxes(gx, gy, gw, gh, -1, 5, -2, 10);

    let toY = (v) => map(v, -2, 10, gy + gh, gy);
    let toX = (v) => map(v, -1, 5, gx, gx + gw);

    // Vertical asymptote
    stroke(200, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(toX(2), gy + 5, toX(2), gy + gh - 5);
    drawingContext.setLineDash([]);

    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    // f(x) = 1/(x-2)^2 (both sides go to +infinity)
    beginShape();
    for (let x = -0.5; x < 1.85; x += 0.05) {
        let y = 1 / Math.pow(x - 2, 2);
        if (y < 10 && y > -2) vertex(toX(x), toY(y));
    }
    endShape();

    beginShape();
    for (let x = 2.15; x < 4.5; x += 0.05) {
        let y = 1 / Math.pow(x - 2, 2);
        if (y < 10 && y > -2) vertex(toX(x), toY(y));
    }
    endShape();

    fill(100);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('x = 2', toX(2), gy + gh + 3);
}

function drawInfinite2(gx, gy, gw, gh) {
    drawQuizAxes(gx, gy, gw, gh, -2, 4, -8, 8);

    let toY = (v) => map(v, -8, 8, gy + gh, gy);
    let toX = (v) => map(v, -2, 4, gx, gx + gw);

    stroke(200, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(toX(1), gy + 5, toX(1), gy + gh - 5);
    drawingContext.setLineDash([]);

    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    // f(x) = 1/(x-1) (left goes to -inf, right goes to +inf)
    beginShape();
    for (let x = -1.5; x < 0.9; x += 0.05) {
        let y = 1 / (x - 1);
        if (y < 8 && y > -8) vertex(toX(x), toY(y));
    }
    endShape();

    beginShape();
    for (let x = 1.1; x < 3.5; x += 0.05) {
        let y = 1 / (x - 1);
        if (y < 8 && y > -8) vertex(toX(x), toY(y));
    }
    endShape();

    fill(100);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('x = 1', toX(1), gy + gh + 3);
}

function drawEssential1(gx, gy, gw, gh) {
    drawQuizAxes(gx, gy, gw, gh, -1, 1, -2, 2);

    let toY = (v) => map(v, -2, 2, gy + gh, gy);
    let toX = (v) => map(v, -1, 1, gx, gx + gw);

    stroke(200, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(toX(0), gy + 5, toX(0), gy + gh - 5);
    drawingContext.setLineDash([]);

    stroke(0, 100, 200);
    strokeWeight(2);
    noFill();

    // f(x) = sin(1/x)
    beginShape();
    for (let x = -0.9; x < -0.02; x += 0.003) {
        let y = Math.sin(1 / x);
        vertex(toX(x), toY(y));
    }
    endShape();

    beginShape();
    for (let x = 0.02; x < 0.9; x += 0.003) {
        let y = Math.sin(1 / x);
        vertex(toX(x), toY(y));
    }
    endShape();

    fill(100);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('x = 0', toX(0), gy + gh + 3);
}

function drawEssential2(gx, gy, gw, gh) {
    drawQuizAxes(gx, gy, gw, gh, -0.5, 0.5, -2, 2);

    let toY = (v) => map(v, -2, 2, gy + gh, gy);
    let toX = (v) => map(v, -0.5, 0.5, gx, gx + gw);

    stroke(200, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(toX(0), gy + 5, toX(0), gy + gh - 5);
    drawingContext.setLineDash([]);

    stroke(0, 100, 200);
    strokeWeight(2);
    noFill();

    // f(x) = x*sin(1/x) - wilder oscillation
    beginShape();
    for (let x = -0.45; x < -0.01; x += 0.002) {
        let y = Math.sin(1 / x);
        let py = constrain(toY(y), gy + 5, gy + gh - 5);
        vertex(toX(x), py);
    }
    endShape();

    beginShape();
    for (let x = 0.01; x < 0.45; x += 0.002) {
        let y = Math.sin(1 / x);
        let py = constrain(toY(y), gy + 5, gy + gh - 5);
        vertex(toX(x), py);
    }
    endShape();

    fill(100);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    text('x = 0', toX(0), gy + gh + 3);
}

function drawQuizAxes(gx, gy, gw, gh, xMin, xMax, yMin, yMax) {
    // Grid
    stroke(230);
    strokeWeight(1);

    for (let x = Math.ceil(xMin); x <= xMax; x++) {
        let px = map(x, xMin, xMax, gx, gx + gw);
        line(px, gy, px, gy + gh);
    }
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
        let py = map(y, yMin, yMax, gy + gh, gy);
        line(gx, py, gx + gw, py);
    }

    // Axes
    stroke(150);
    strokeWeight(2);
    let y0 = map(0, yMin, yMax, gy + gh, gy);
    let x0 = map(0, xMin, xMax, gx, gx + gw);
    if (y0 > gy && y0 < gy + gh) line(gx, y0, gx + gw, y0);
    if (x0 > gx && x0 < gx + gw) line(x0, gy, x0, gy + gh);

    // Labels
    fill(100);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
        if (x !== 0) {
            let px = map(x, xMin, xMax, gx, gx + gw);
            if (y0 > gy && y0 < gy + gh - 15) {
                text(x, px, y0 + 2);
            }
        }
    }
    textAlign(RIGHT, CENTER);
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
        if (y !== 0) {
            let py = map(y, yMin, yMax, gy + gh, gy);
            if (x0 > gx + 15 && x0 < gx + gw) {
                text(y, x0 - 3, py);
            }
        }
    }
}

function drawControls() {
    // Mode toggle button
    let modeBtnX = 10;
    let modeBtnY = drawHeight + 10;
    let modeBtnW = 100;
    let modeBtnH = 28;

    let isHoverMode = mouseX > modeBtnX && mouseX < modeBtnX + modeBtnW &&
                      mouseY > modeBtnY && mouseY < modeBtnY + modeBtnH;

    fill(isHoverMode ? 220 : 240);
    stroke(150);
    strokeWeight(1);
    rect(modeBtnX, modeBtnY, modeBtnW, modeBtnH, 5);

    fill(50);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(currentMode === 'gallery' ? 'Quiz Mode' : 'Gallery View', modeBtnX + modeBtnW/2, modeBtnY + modeBtnH/2);

    if (currentMode === 'quiz') {
        // New Function button
        let newBtnX = 120;
        let newBtnY = drawHeight + 10;
        let newBtnW = 100;
        let newBtnH = 28;

        let isHoverNew = mouseX > newBtnX && mouseX < newBtnX + newBtnW &&
                         mouseY > newBtnY && mouseY < newBtnY + newBtnH;

        fill(isHoverNew ? 200 : 220);
        stroke(150);
        strokeWeight(1);
        rect(newBtnX, newBtnY, newBtnW, newBtnH, 5);

        fill(50);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text('New Function', newBtnX + newBtnW/2, newBtnY + newBtnH/2);
    }

    // Instructions at bottom
    fill(120);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(11);
    if (currentMode === 'gallery') {
        text('Study the four discontinuity types, then switch to Quiz Mode', canvasWidth/2, canvasHeight - 8);
    } else {
        text('Analyze the graph and classify the discontinuity type', canvasWidth/2, canvasHeight - 8);
    }
}

function formatLimit(val) {
    if (val === 'undefined') return 'undef';
    if (val === '+infinity') return '+inf';
    if (val === '-infinity') return '-inf';
    if (val === 'DNE') return 'DNE';
    return val.toString();
}

function generateQuizProblem() {
    currentQuizFunction = quizFunctions[Math.floor(Math.random() * quizFunctions.length)];
    currentQuizType = currentQuizFunction.type;
    quizFeedback = '';
    showExplanation = false;
    explanationText = '';
}

function checkQuizAnswer(selectedType) {
    attempts++;

    if (selectedType === currentQuizType) {
        score++;
        quizFeedback = 'Correct! This is a ' + currentQuizType + ' discontinuity.';
        feedbackColor = [0, 130, 0];
    } else {
        quizFeedback = 'Not quite. This is a ' + currentQuizType + ' discontinuity.';
        feedbackColor = [180, 0, 0];
    }

    showExplanation = true;
    explanationText = currentQuizFunction.explanation;
}

function mousePressed() {
    // Mode toggle button
    let modeBtnX = 10;
    let modeBtnY = drawHeight + 10;
    let modeBtnW = 100;
    let modeBtnH = 28;

    if (mouseX > modeBtnX && mouseX < modeBtnX + modeBtnW &&
        mouseY > modeBtnY && mouseY < modeBtnY + modeBtnH) {
        currentMode = currentMode === 'gallery' ? 'quiz' : 'gallery';
        if (currentMode === 'quiz') {
            generateQuizProblem();
        }
        return;
    }

    if (currentMode === 'quiz') {
        // New Function button
        let newBtnX = 120;
        let newBtnY = drawHeight + 10;
        let newBtnW = 100;
        let newBtnH = 28;

        if (mouseX > newBtnX && mouseX < newBtnX + newBtnW &&
            mouseY > newBtnY && mouseY < newBtnY + newBtnH) {
            generateQuizProblem();
            return;
        }

        // Classification buttons
        let graphY = 50;
        let graphH = drawHeight - 180;
        let btnW = (canvasWidth - 50) / 4;
        let btnH = 32;
        let btnY = graphY + graphH + 15;

        for (let i = 0; i < 4; i++) {
            let btnX = 10 + i * (btnW + 10);
            if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
                checkQuizAnswer(DISCONTINUITY_TYPES[i]);
                return;
            }
        }
    } else {
        // Gallery panel clicks
        let panelW = (canvasWidth - panelMargin * 3) / 2;
        let panelH = (drawHeight - 60 - panelMargin * 3) / 2;

        for (let i = 0; i < 4; i++) {
            let col = i % 2;
            let row = Math.floor(i / 2);
            let x = panelMargin + col * (panelW + panelMargin);
            let y = 35 + panelMargin + row * (panelH + panelMargin);

            if (mouseX > x && mouseX < x + panelW && mouseY > y && mouseY < y + panelH) {
                selectedPanel = selectedPanel === i ? -1 : i;
                return;
            }
        }
        selectedPanel = -1;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
