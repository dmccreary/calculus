// End Behavior Explorer MicroSim
// Students examine how leading term characteristics determine end behavior
// of polynomial and rational functions
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout constants
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph region
let graphTop = 60;
let graphBottom;
let graphLeft;
let graphRight;
let originX, originY;

// Controls
let functionTypeButton;
let leadCoefSlider;
let degreeSlider;
let zoomSlider;
let animateButton;

// State
let isPolynomial = true;
let leadCoef = 1;
let degree = 2;
let zoomLevel = 5;

// Animation state
let isAnimating = false;
let deltaX = 0;
let deltaDirection = 1; // 1 = going right (toward +infinity)
let animationPhase = 0; // 0 = rest, 1 = going right, 2 = pause, 3 = going left

// For rational functions
let numDegree = 2;
let denomDegree = 1;

// End behavior arrows
let leftArrowY = 0;
let rightArrowY = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);

    textSize(defaultTextSize);

    // Row 1: Function type button and Lead Coefficient slider
    functionTypeButton = createButton('Polynomial');
    functionTypeButton.position(10, drawHeight + 8);
    functionTypeButton.mousePressed(toggleFunctionType);
    functionTypeButton.style('width', '90px');

    leadCoefSlider = createSlider(-5, 5, leadCoef, 0.5);
    leadCoefSlider.position(sliderLeftMargin, drawHeight + 8);
    leadCoefSlider.size(canvasWidth - sliderLeftMargin - margin);

    // Row 2: Degree slider and Animate button
    degreeSlider = createSlider(1, 6, degree, 1);
    degreeSlider.position(sliderLeftMargin, drawHeight + 43);
    degreeSlider.size(canvasWidth - sliderLeftMargin - margin - 90);

    animateButton = createButton('Animate');
    animateButton.position(canvasWidth - 80, drawHeight + 43);
    animateButton.mousePressed(startAnimation);

    // Row 3: Zoom slider
    zoomSlider = createSlider(1, 20, zoomLevel, 1);
    zoomSlider.position(sliderLeftMargin, drawHeight + 78);
    zoomSlider.size(canvasWidth - sliderLeftMargin - margin);

    describe('End Behavior Explorer: Interactive visualization showing how polynomial and rational function leading terms determine behavior as x approaches infinity', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing region
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control region
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Update values from sliders
    leadCoef = leadCoefSlider.value();
    if (isPolynomial) {
        degree = degreeSlider.value();
    } else {
        numDegree = degreeSlider.value();
    }
    zoomLevel = zoomSlider.value();

    // Calculate graph boundaries
    graphLeft = margin + 30;
    graphRight = canvasWidth - margin;
    graphBottom = drawHeight - margin;
    originX = (graphLeft + graphRight) / 2;
    originY = (graphTop + graphBottom) / 2;

    // Draw title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('End Behavior Explorer', canvasWidth / 2, 8);

    // Draw subtitle with function
    textSize(14);
    let funcStr = isPolynomial ? getPolynomialString() : getRationalString();
    text(funcStr, canvasWidth / 2, 32);

    // Draw axes and graph
    drawAxes();
    drawFunction();
    drawEndBehaviorArrows();
    drawEndBehaviorTable();

    // Animation update
    if (isAnimating) {
        updateAnimation();
        drawDelta();
    }

    // Draw control labels
    drawControlLabels();
}

function getPolynomialString() {
    let sign = leadCoef >= 0 ? '' : '';
    let coefStr = leadCoef === 1 ? '' : (leadCoef === -1 ? '-' : leadCoef.toString());
    return 'f(x) = ' + coefStr + 'x^' + degree + ' + ...';
}

function getRationalString() {
    return 'f(x) = x^' + numDegree + ' / x^' + denomDegree;
}

function drawAxes() {
    stroke(200);
    strokeWeight(1);

    // Grid lines
    let xRange = zoomLevel;
    let yRange = zoomLevel;
    let xStep = (graphRight - graphLeft) / (2 * xRange);
    let yStep = (graphBottom - graphTop) / (2 * yRange);

    // Vertical grid lines
    for (let i = -xRange; i <= xRange; i++) {
        let x = originX + i * xStep;
        if (x >= graphLeft && x <= graphRight) {
            stroke(230);
            line(x, graphTop, x, graphBottom);
        }
    }

    // Horizontal grid lines
    for (let i = -yRange; i <= yRange; i++) {
        let y = originY + i * yStep;
        if (y >= graphTop && y <= graphBottom) {
            stroke(230);
            line(graphLeft, y, graphRight, y);
        }
    }

    // Axes
    stroke(100);
    strokeWeight(2);
    // X-axis
    line(graphLeft, originY, graphRight, originY);
    // Y-axis
    line(originX, graphTop, originX, graphBottom);

    // Axis labels
    fill('black');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('x', graphRight - 10, originY + 5);
    textAlign(RIGHT, CENTER);
    text('y', originX - 8, graphTop + 10);

    // Scale labels
    textSize(10);
    textAlign(CENTER, TOP);
    text(zoomLevel, graphRight - 5, originY + 3);
    text(-zoomLevel, graphLeft + 5, originY + 3);
    textAlign(RIGHT, CENTER);
    text(zoomLevel, originX - 3, graphTop + 10);
    text(-zoomLevel, originX - 3, graphBottom - 5);
}

function drawFunction() {
    stroke('blue');
    strokeWeight(2);
    noFill();

    let xRange = zoomLevel;
    let yRange = zoomLevel;

    beginShape();
    for (let px = graphLeft; px <= graphRight; px += 2) {
        let x = map(px, graphLeft, graphRight, -xRange, xRange);
        let y = evaluateFunction(x);

        // Clamp y to reasonable range for display
        if (abs(y) > yRange * 5) {
            endShape();
            beginShape();
            continue;
        }

        let py = map(y, -yRange, yRange, graphBottom, graphTop);

        if (py >= graphTop - 50 && py <= graphBottom + 50) {
            vertex(px, py);
        } else {
            endShape();
            beginShape();
        }
    }
    endShape();
}

function evaluateFunction(x) {
    if (isPolynomial) {
        // Leading term only for end behavior emphasis
        return leadCoef * pow(x, degree);
    } else {
        // Rational function
        if (abs(x) < 0.01) return 0;
        return pow(x, numDegree) / pow(x, denomDegree);
    }
}

function getEndBehavior() {
    // Returns [leftBehavior, rightBehavior] where behavior is 'up' or 'down'
    if (isPolynomial) {
        let isEven = (degree % 2 === 0);
        let isPositive = (leadCoef > 0);

        if (isPositive && isEven) {
            return ['up', 'up']; // Both ends go up
        } else if (isPositive && !isEven) {
            return ['down', 'up']; // Left down, right up
        } else if (!isPositive && isEven) {
            return ['down', 'down']; // Both ends go down
        } else {
            return ['up', 'down']; // Left up, right down
        }
    } else {
        // Rational function end behavior
        let degreeDiff = numDegree - denomDegree;
        if (degreeDiff > 0) {
            // Behaves like polynomial of degree = diff
            let isEven = (degreeDiff % 2 === 0);
            if (isEven) {
                return ['up', 'up'];
            } else {
                return ['down', 'up'];
            }
        } else if (degreeDiff === 0) {
            // Horizontal asymptote at y = 1
            return ['flat', 'flat'];
        } else {
            // Horizontal asymptote at y = 0
            return ['zero', 'zero'];
        }
    }
}

function drawEndBehaviorArrows() {
    let [leftBehavior, rightBehavior] = getEndBehavior();

    // Arrow positions at graph edges
    let arrowSize = 15;

    // Left arrow (x -> -infinity)
    let leftX = graphLeft + 10;
    let leftY;
    if (leftBehavior === 'up') {
        leftY = graphTop + 20;
        drawArrow(leftX, leftY + 30, leftX, leftY, 'purple');
    } else if (leftBehavior === 'down') {
        leftY = graphBottom - 20;
        drawArrow(leftX, leftY - 30, leftX, leftY, 'purple');
    } else if (leftBehavior === 'flat' || leftBehavior === 'zero') {
        leftY = originY;
        drawArrow(leftX + 30, leftY, leftX, leftY, 'purple');
    }

    // Right arrow (x -> +infinity)
    let rightX = graphRight - 10;
    let rightY;
    if (rightBehavior === 'up') {
        rightY = graphTop + 20;
        drawArrow(rightX, rightY + 30, rightX, rightY, 'purple');
    } else if (rightBehavior === 'down') {
        rightY = graphBottom - 20;
        drawArrow(rightX, rightY - 30, rightX, rightY, 'purple');
    } else if (rightBehavior === 'flat' || rightBehavior === 'zero') {
        rightY = originY;
        drawArrow(rightX - 30, rightY, rightX, rightY, 'purple');
    }

    // Store for Delta animation
    leftArrowY = leftY;
    rightArrowY = rightY;
}

function drawArrow(x1, y1, x2, y2, col) {
    stroke(col);
    strokeWeight(3);
    line(x1, y1, x2, y2);

    // Arrowhead
    let angle = atan2(y2 - y1, x2 - x1);
    let arrowSize = 10;
    fill(col);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
    pop();
}

function drawEndBehaviorTable() {
    // Info panel in upper right
    let panelX = graphRight - 130;
    let panelY = graphTop + 5;
    let panelW = 125;
    let panelH = 75;

    // Semi-transparent background
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Table content
    fill('black');
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);

    let [leftBehavior, rightBehavior] = getEndBehavior();

    // Get arrow symbols
    let leftSymbol = getArrowSymbol(leftBehavior);
    let rightSymbol = getArrowSymbol(rightBehavior);

    text('End Behavior:', panelX + 8, panelY + 8);

    textSize(10);
    text('as x -> -inf: y -> ' + leftSymbol, panelX + 8, panelY + 25);
    text('as x -> +inf: y -> ' + rightSymbol, panelX + 8, panelY + 40);

    // Notation
    textSize(12);
    textAlign(CENTER, TOP);
    let notation = leftSymbol + ' ' + rightSymbol;
    text(notation, panelX + panelW / 2, panelY + 56);
}

function getArrowSymbol(behavior) {
    if (behavior === 'up') return '+inf';
    if (behavior === 'down') return '-inf';
    if (behavior === 'flat') return '1';
    if (behavior === 'zero') return '0';
    return '?';
}

function toggleFunctionType() {
    isPolynomial = !isPolynomial;
    functionTypeButton.html(isPolynomial ? 'Polynomial' : 'Rational');
    if (!isPolynomial) {
        denomDegree = max(1, degree - 1);
    }
}

function startAnimation() {
    if (!isAnimating) {
        isAnimating = true;
        deltaX = originX;
        animationPhase = 1;
        deltaDirection = 1;
        animateButton.html('Stop');
    } else {
        isAnimating = false;
        animationPhase = 0;
        animateButton.html('Animate');
    }
}

function updateAnimation() {
    let speed = 3;

    if (animationPhase === 1) {
        // Going right toward +infinity
        deltaX += speed;
        if (deltaX > graphRight - 20) {
            animationPhase = 2;
            setTimeout(() => {
                animationPhase = 3;
                deltaX = originX;
            }, 500);
        }
    } else if (animationPhase === 3) {
        // Going left toward -infinity
        deltaX -= speed;
        if (deltaX < graphLeft + 20) {
            animationPhase = 4;
            setTimeout(() => {
                animationPhase = 1;
                deltaX = originX;
            }, 500);
        }
    }
}

function drawDelta() {
    // Calculate Delta's y position on the curve
    let xRange = zoomLevel;
    let yRange = zoomLevel;
    let x = map(deltaX, graphLeft, graphRight, -xRange, xRange);
    let y = evaluateFunction(x);
    let py = map(y, -yRange, yRange, graphBottom, graphTop);

    // Clamp py to graph region
    py = constrain(py, graphTop, graphBottom);

    // Draw Delta as a small triangle robot
    let size = 15;

    // Calculate tilt based on derivative
    let dx = 0.01;
    let y1 = evaluateFunction(x - dx);
    let y2 = evaluateFunction(x + dx);
    let slope = (y2 - y1) / (2 * dx);
    let tiltAngle = atan(slope);

    push();
    translate(deltaX, py);
    rotate(tiltAngle);

    // Body (triangle)
    fill('teal');
    stroke('darkcyan');
    strokeWeight(2);
    triangle(-size / 2, size / 2, size / 2, size / 2, 0, -size / 2);

    // Eye
    fill('white');
    noStroke();
    ellipse(0, 0, 6, 6);
    fill('black');
    ellipse(deltaDirection > 0 ? 1 : -1, 0, 3, 3);

    // Wheels
    fill('gray');
    stroke('darkgray');
    strokeWeight(1);
    ellipse(-size / 3, size / 2 + 3, 6, 6);
    ellipse(size / 3, size / 2 + 3, 6, 6);

    pop();

    // Draw speech bubble when at edges
    if (deltaX > graphRight - 50 || deltaX < graphLeft + 50) {
        let bubbleX = deltaX + (deltaX > originX ? -60 : 60);
        let bubbleY = py - 30;

        fill(255, 255, 255, 220);
        stroke(150);
        strokeWeight(1);
        rect(bubbleX - 40, bubbleY - 15, 80, 30, 8);

        fill('black');
        noStroke();
        textSize(10);
        textAlign(CENTER, CENTER);

        let [leftBeh, rightBeh] = getEndBehavior();
        let msg = '';
        if (deltaX > originX) {
            msg = rightBeh === 'up' ? 'Going up!' : (rightBeh === 'down' ? 'Going down!' : 'Leveling off!');
        } else {
            msg = leftBeh === 'up' ? 'Going up!' : (leftBeh === 'down' ? 'Going down!' : 'Leveling off!');
        }
        text(msg, bubbleX, bubbleY);
    }
}

function drawControlLabels() {
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);

    // Row 1 label
    let coefDisplay = leadCoef >= 0 ? '+' + leadCoef : leadCoef.toString();
    text('Lead Coef: ' + coefDisplay, 105, drawHeight + 20);

    // Row 2 label
    if (isPolynomial) {
        text('Degree: ' + degree, 10, drawHeight + 55);
    } else {
        text('Num Deg: ' + numDegree, 10, drawHeight + 55);
    }

    // Row 3 label
    text('Zoom: ' + zoomLevel, 10, drawHeight + 90);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    leadCoefSlider.size(canvasWidth - sliderLeftMargin - margin);
    degreeSlider.size(canvasWidth - sliderLeftMargin - margin - 90);
    zoomSlider.size(canvasWidth - sliderLeftMargin - margin);
    animateButton.position(canvasWidth - 80, drawHeight + 43);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
