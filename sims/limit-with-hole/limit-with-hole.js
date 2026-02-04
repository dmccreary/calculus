// Limit Visualization with Hole MicroSim
// Shows f(x) = (x²-4)/(x-2) = x+2 with hole at (2,4)
// Bloom Level: Understand (L2), Verb: Interpret

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
let graphTop = 50;
let graphBottom;
let xMin = -1;
let xMax = 5;
let yMin = -1;
let yMax = 7;

// Animation state
let distanceSlider;
let approachSelect;
let animateButton;
let resetButton;
let isAnimating = false;
let animationPhase = 0;
let currentDistance = 0.5;
let approachDirection = 'both'; // 'left', 'right', 'both'

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Distance slider
    distanceSlider = createSlider(0.001, 0.5, 0.5, 0.001);
    distanceSlider.position(sliderLeftMargin, drawHeight + 5);
    distanceSlider.size(canvasWidth - sliderLeftMargin - margin);
    distanceSlider.input(() => { currentDistance = distanceSlider.value(); });

    // Approach direction select
    approachSelect = createSelect();
    approachSelect.position(sliderLeftMargin, drawHeight + 40);
    approachSelect.option('Both', 'both');
    approachSelect.option('Left', 'left');
    approachSelect.option('Right', 'right');
    approachSelect.changed(() => { approachDirection = approachSelect.value(); });

    // Animate button
    animateButton = createButton('Animate');
    animateButton.position(10, drawHeight + 50);
    animateButton.mousePressed(startAnimation);

    // Reset button
    resetButton = createButton('Reset');
    resetButton.position(80, drawHeight + 50);
    resetButton.mousePressed(resetAnimation);

    describe('Interactive visualization of a limit with a hole at (2,4)', LABEL);
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
    text('Limit Visualization with Hole', canvasWidth/2, 8);
    textSize(14);
    text('f(x) = (x² - 4)/(x - 2)', canvasWidth/2, 30);

    // Draw axes and graph
    drawAxes();
    drawFunction();
    drawApproachPoints();
    drawLimitLine();

    // Animation update
    if (isAnimating) {
        animationPhase += 0.02;
        currentDistance = 0.5 * (1 - animationPhase);
        if (currentDistance < 0.001) {
            currentDistance = 0.001;
            isAnimating = false;
        }
        distanceSlider.value(currentDistance);
    }

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('Distance: ' + currentDistance.toFixed(3), 10, drawHeight + 15);
    text('Approach:', 10, drawHeight + 50);
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
        line(graphLeft, py, graphRight, py);
    }

    // Axes
    stroke(0);
    strokeWeight(2);
    // x-axis
    let y0 = map(0, yMin, yMax, graphBottom, graphTop);
    line(graphLeft, y0, graphRight, y0);
    // y-axis
    let x0 = map(0, xMin, xMax, graphLeft, graphRight);
    line(x0, graphTop, x0, graphBottom);

    // Labels
    fill(0);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
        let px = map(x, xMin, xMax, graphLeft, graphRight);
        text(x, px, y0 + 5);
    }
    textAlign(RIGHT, CENTER);
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
        if (y !== 0) {
            let py = map(y, yMin, yMax, graphBottom, graphTop);
            text(y, x0 - 5, py);
        }
    }

    // Axis labels
    textSize(14);
    textAlign(CENTER, TOP);
    text('x', graphRight + 15, y0 - 5);
    textAlign(RIGHT, CENTER);
    text('y', x0 - 10, graphTop - 10);
}

function drawFunction() {
    // Draw f(x) = x + 2 (the simplified form)
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        // Skip near x = 2 to show the hole
        if (abs(x - 2) < 0.05) continue;
        let y = x + 2; // f(x) = x + 2
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Draw hole at (2, 4)
    let holeX = map(2, xMin, xMax, graphLeft, graphRight);
    let holeY = map(4, yMin, yMax, graphBottom, graphTop);
    stroke(0, 100, 200);
    strokeWeight(3);
    fill('aliceblue');
    circle(holeX, holeY, 12);
}

function drawApproachPoints() {
    let leftX = 2 - currentDistance;
    let rightX = 2 + currentDistance;
    let leftY = leftX + 2;
    let rightY = rightX + 2;

    // Draw approach points
    if (approachDirection === 'left' || approachDirection === 'both') {
        let px = map(leftX, xMin, xMax, graphLeft, graphRight);
        let py = map(leftY, yMin, yMax, graphBottom, graphTop);
        fill(0, 150, 100);
        noStroke();
        circle(px, py, 14);

        // Value label
        fill(0, 100, 50);
        textSize(11);
        textAlign(CENTER, TOP);
        noStroke();
        text('(' + leftX.toFixed(3) + ', ' + leftY.toFixed(3) + ')', px, py + 12);
    }

    if (approachDirection === 'right' || approachDirection === 'both') {
        let px = map(rightX, xMin, xMax, graphLeft, graphRight);
        let py = map(rightY, yMin, yMax, graphBottom, graphTop);
        fill(200, 100, 0);
        noStroke();
        circle(px, py, 14);

        // Value label
        fill(150, 75, 0);
        textSize(11);
        textAlign(CENTER, BOTTOM);
        noStroke();
        text('(' + rightX.toFixed(3) + ', ' + rightY.toFixed(3) + ')', px, py - 12);
    }
}

function drawLimitLine() {
    // Dashed line at y = 4
    let py = map(4, yMin, yMax, graphBottom, graphTop);
    stroke(255, 100, 100);
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    line(graphLeft, py, graphRight, py);
    drawingContext.setLineDash([]);

    // Label
    fill(200, 50, 50);
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('L = 4', graphRight + 5, py);
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
    distanceSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
