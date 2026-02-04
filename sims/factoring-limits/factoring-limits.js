// Factoring Technique for Limits MicroSim
// Shows how factoring reveals limits by canceling common factors
// Bloom Level: Understand (L2), Verb: Explain

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphTop = 70;
let graphBottom;
let xMin = 0;
let xMax = 6;
let yMin = 0;
let yMax = 10;

// State
let showOriginal = true;
let showSimplified = true;
let xApproach = 3;
let currentStep = 0;
let isAnimating = false;
let animationPhase = 0;

// UI elements
let xSlider;
let viewSelect;
let animateButton;

// The function: f(x) = (x² - 9)/(x - 3) = x + 3
let targetX = 3;
let limitValue = 6;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // X approach slider
    xSlider = createSlider(0.5, 5.5, 1.5, 0.01);
    xSlider.position(sliderLeftMargin, drawHeight + 10);
    xSlider.size(canvasWidth - sliderLeftMargin - margin);
    xSlider.input(() => { xApproach = xSlider.value(); });

    // View selector
    viewSelect = createSelect();
    viewSelect.position(10, drawHeight + 5);
    viewSelect.option('Both', 'both');
    viewSelect.option('Original', 'original');
    viewSelect.option('Simplified', 'simplified');
    viewSelect.changed(() => {
        let v = viewSelect.value();
        showOriginal = (v === 'both' || v === 'original');
        showSimplified = (v === 'both' || v === 'simplified');
    });

    describe('Factoring technique visualization showing how canceling reveals limits', LABEL);
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

    // Title and subtitle
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Factoring to Find Limits', canvasWidth/2, 8);
    textSize(14);
    text('f(x) = (x² - 9)/(x - 3)  →  g(x) = x + 3', canvasWidth/2, 30);

    // Draw graph
    drawAxes();

    if (showSimplified) {
        drawSimplifiedFunction();
    }
    if (showOriginal) {
        drawOriginalFunction();
    }

    drawApproachPoint();
    drawAlgebraPanel();

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('x = ' + xApproach.toFixed(2), sliderLeftMargin - 55, drawHeight + 20);
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
        if (y > 0) {
            let py = map(y, yMin, yMax, graphBottom, graphTop);
            text(y, x0 - 5, py);
        }
    }
}

function drawOriginalFunction() {
    // Original function with hole at x = 3
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    // Left of hole
    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        if (x >= targetX - 0.08) break;
        let y = x + 3; // Simplified form
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Right of hole
    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        if (x <= targetX + 0.08) continue;
        let y = x + 3;
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Draw hole at (3, 6)
    let holeX = map(targetX, xMin, xMax, graphLeft, graphRight);
    let holeY = map(limitValue, yMin, yMax, graphBottom, graphTop);
    stroke(0, 100, 200);
    strokeWeight(3);
    fill('aliceblue');
    circle(holeX, holeY, 14);
}

function drawSimplifiedFunction() {
    // Simplified function g(x) = x + 3 (complete line)
    stroke(0, 180, 100);
    strokeWeight(2);
    noFill();

    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        let y = x + 3;
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Solid point at (3, 6)
    let ptX = map(targetX, xMin, xMax, graphLeft, graphRight);
    let ptY = map(limitValue, yMin, yMax, graphBottom, graphTop);
    fill(0, 180, 100);
    noStroke();
    circle(ptX, ptY, 10);
}

function drawApproachPoint() {
    if (abs(xApproach - targetX) < 0.1) return;

    let y = xApproach + 3;
    let px = map(xApproach, xMin, xMax, graphLeft, graphRight);
    let py = map(y, yMin, yMax, graphBottom, graphTop);

    // Moving point
    fill(200, 50, 100);
    noStroke();
    circle(px, py, 14);

    // Coordinate label
    fill(150, 30, 80);
    textSize(11);
    noStroke();
    let labelY = (xApproach < targetX) ? py + 15 : py - 15;
    textAlign(CENTER, CENTER);
    text('(' + xApproach.toFixed(2) + ', ' + y.toFixed(2) + ')', px, labelY);

    // Dashed line to limit
    stroke(200, 50, 100, 100);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    let limitY = map(limitValue, yMin, yMax, graphBottom, graphTop);
    line(px, py, px, limitY);
    drawingContext.setLineDash([]);
}

function drawAlgebraPanel() {
    let panelX = graphRight - 180;
    let panelY = graphTop + 5;
    let panelW = 175;
    let panelH = 100;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Algebra steps
    fill(0);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);

    let y = panelY + 8;
    text('Factoring:', panelX + 10, y);
    y += 18;

    textSize(13);
    fill(0, 80, 160);
    text('(x² - 9)/(x - 3)', panelX + 10, y);
    y += 18;

    fill(80);
    text('= (x+3)(x-3)/(x-3)', panelX + 10, y);
    y += 18;

    fill(0, 140, 80);
    text('= x + 3', panelX + 10, y);
    y += 20;

    fill(0);
    textSize(14);
    text('Limit = 6', panelX + 10, y);
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
