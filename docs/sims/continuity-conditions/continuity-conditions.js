// Three Conditions for Continuity Visualized MicroSim
// Bloom Level: Understand (L2), Verb: Explain
// Learning Objective: Students will explain how each of the three continuity
// conditions corresponds to visual features of a function graph.
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphTop = 80;
let graphBottom;
let xMin = -2;
let xMax = 6;
let yMin = -1;
let yMax = 7;

// State variables
let currentScenario = 0;
let targetC = 2;  // The point we're checking continuity at
let checkPhase = 0;  // 0=not checking, 1=cond1, 2=cond2, 3=cond3, 4=verdict
let checkTimer = 0;
let conditionResults = [null, null, null];  // null=unchecked, true=pass, false=fail

// Scenarios data
const scenarios = [
    { name: "A: Continuous", description: "f(x) = x + 1", c: 2 },
    { name: "B: Hole (f(c) undefined)", description: "f(c) undefined", c: 2 },
    { name: "C: Jump", description: "Left ≠ Right limit", c: 2 },
    { name: "D: Misplaced Point", description: "f(c) ≠ limit", c: 2 },
    { name: "E: Vertical Asymptote", description: "Limit DNE", c: 2 }
];

// Button and slider coordinates
let scenarioButtons = [];
let sliderY;
let checkButtonX, checkButtonY, checkButtonW, checkButtonH;
let resetButtonX, resetButtonY, resetButtonW, resetButtonH;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Calculate control positions
    sliderY = drawHeight + 60;
    checkButtonX = 10;
    checkButtonY = drawHeight + 70;
    checkButtonW = 100;
    checkButtonH = 25;
    resetButtonX = 120;
    resetButtonY = drawHeight + 70;
    resetButtonW = 60;
    resetButtonH = 25;

    describe('Interactive visualization of the three conditions for continuity with Delta robot mascot', LABEL);
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
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Update graph bounds
    graphRight = canvasWidth - 120;  // Leave room for conditions panel
    graphBottom = drawHeight - 50;

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Three Conditions for Continuity', canvasWidth * 0.35, 8);
    textSize(14);
    text(scenarios[currentScenario].name, canvasWidth * 0.35, 32);

    // Draw components
    drawAxes();
    drawFunction();
    drawTargetLine();
    drawDelta();
    drawConditionsPanel();
    drawVerdict();
    drawControls();

    // Animation update
    if (checkPhase > 0 && checkPhase <= 3) {
        checkTimer++;
        if (checkTimer > 40) {  // 40 frames per condition
            checkTimer = 0;
            evaluateCondition(checkPhase);
            checkPhase++;
            if (checkPhase > 3) checkPhase = 4;  // Move to verdict
        }
    }
}

function drawAxes() {
    stroke(220);
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

    textSize(12);
    textAlign(CENTER, TOP);
    text('x', graphRight + 10, y0 - 5);
    textAlign(RIGHT, CENTER);
    text('y', x0 + 5, graphTop - 10);
}

function drawFunction() {
    let c = targetC;

    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    switch(currentScenario) {
        case 0:  // Continuous: f(x) = x + 1
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                let y = x + 1;
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop && py <= graphBottom) vertex(px, py);
            }
            endShape();
            break;

        case 1:  // Hole at c: f(x) = x + 1, but undefined at x = c
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                if (abs(x - c) < 0.08) continue;
                let y = x + 1;
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop && py <= graphBottom) vertex(px, py);
            }
            endShape();
            // Draw hole
            let holeX = map(c, xMin, xMax, graphLeft, graphRight);
            let holeY = map(c + 1, yMin, yMax, graphBottom, graphTop);
            stroke(0, 100, 200);
            fill('aliceblue');
            circle(holeX, holeY, 12);
            break;

        case 2:  // Jump discontinuity
            // Left piece: f(x) = x + 1 for x < c
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                if (x >= c - 0.02) continue;
                let y = x + 1;
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop && py <= graphBottom) vertex(px, py);
            }
            endShape();
            // Right piece: f(x) = x + 3 for x >= c
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                if (x < c) continue;
                let y = x + 3;
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop && py <= graphBottom) vertex(px, py);
            }
            endShape();
            // Draw endpoints
            let leftEndX = map(c, xMin, xMax, graphLeft, graphRight);
            let leftEndY = map(c + 1, yMin, yMax, graphBottom, graphTop);
            let rightEndY = map(c + 3, yMin, yMax, graphBottom, graphTop);
            stroke(0, 100, 200);
            fill('aliceblue');
            circle(leftEndX, leftEndY, 10);  // Open circle on left
            fill(0, 100, 200);
            circle(leftEndX, rightEndY, 10);  // Solid circle on right
            break;

        case 3:  // Misplaced point: f(c) exists but doesn't equal limit
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                if (abs(x - c) < 0.08) continue;
                let y = x + 1;
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop && py <= graphBottom) vertex(px, py);
            }
            endShape();
            // Draw hole at limit
            let holeLimitX = map(c, xMin, xMax, graphLeft, graphRight);
            let holeLimitY = map(c + 1, yMin, yMax, graphBottom, graphTop);
            stroke(0, 100, 200);
            fill('aliceblue');
            circle(holeLimitX, holeLimitY, 12);
            // Draw misplaced point
            let misplacedY = map(5, yMin, yMax, graphBottom, graphTop);
            fill(0, 100, 200);
            circle(holeLimitX, misplacedY, 12);
            break;

        case 4:  // Vertical asymptote at c
            // f(x) = 1/(x - c) + 3
            // Left of asymptote
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                if (x >= c - 0.1) continue;
                let y = 1 / (x - c) + 3;
                if (y < yMin || y > yMax) continue;
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop && py <= graphBottom) vertex(px, py);
            }
            endShape();
            // Right of asymptote
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                if (x <= c + 0.1) continue;
                let y = 1 / (x - c) + 3;
                if (y < yMin || y > yMax) continue;
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop && py <= graphBottom) vertex(px, py);
            }
            endShape();
            // Draw asymptote
            stroke(255, 100, 100);
            strokeWeight(1);
            drawingContext.setLineDash([5, 5]);
            let asymX = map(c, xMin, xMax, graphLeft, graphRight);
            line(asymX, graphTop, asymX, graphBottom);
            drawingContext.setLineDash([]);
            break;
    }
}

function drawTargetLine() {
    let px = map(targetC, xMin, xMax, graphLeft, graphRight);

    // Dashed vertical line at x = c
    stroke(100, 100, 200);
    strokeWeight(2);
    drawingContext.setLineDash([8, 4]);
    line(px, graphTop, px, graphBottom);
    drawingContext.setLineDash([]);

    // Label
    fill(80, 80, 180);
    noStroke();
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text('c = ' + targetC.toFixed(1), px, graphTop - 5);
}

function drawDelta() {
    let px = map(targetC, xMin, xMax, graphLeft, graphRight);
    let functionValue = getFunctionValue(targetC);
    let limitValue = getLimitValue(targetC);

    let deltaY;
    let isHovering = false;

    if (functionValue !== null) {
        deltaY = map(functionValue, yMin, yMax, graphBottom, graphTop);
    } else if (limitValue !== null) {
        deltaY = map(limitValue, yMin, yMax, graphBottom, graphTop);
        isHovering = true;
    } else {
        deltaY = graphTop + 50;
        isHovering = true;
    }

    // Draw Delta robot (triangular)
    let triSize = 18;
    push();
    translate(px, deltaY - triSize - 5);

    // Body (triangle)
    if (isHovering) {
        // Hovering animation
        let hover = sin(frameCount * 0.1) * 3;
        translate(0, hover);
    }

    // Determine tilt based on derivative
    let tilt = 0;
    if (currentScenario === 0 || currentScenario === 1 || currentScenario === 3) {
        tilt = atan(1);  // Slope of 1
    }
    rotate(-tilt);

    // Triangle body
    fill(100, 200, 150);
    stroke(60, 150, 100);
    strokeWeight(2);
    triangle(-triSize/2, triSize/2, triSize/2, triSize/2, 0, -triSize/2);

    // Eyes
    fill(255);
    noStroke();
    circle(-4, 0, 6);
    circle(4, 0, 6);
    fill(0);
    circle(-4, 0, 3);
    circle(4, 0, 3);

    // Wheels
    fill(80);
    stroke(60);
    strokeWeight(1);
    circle(-triSize/2 + 2, triSize/2 + 2, 6);
    circle(triSize/2 - 2, triSize/2 + 2, 6);

    pop();

    // Question mark if confused
    if (isHovering && checkPhase === 0) {
        fill(100, 200, 150);
        noStroke();
        textSize(16);
        textAlign(CENTER, CENTER);
        text('?', px + 15, deltaY - triSize - 15);
    }
}

function drawConditionsPanel() {
    let panelX = canvasWidth - 115;
    let panelY = graphTop - 20;
    let panelW = 110;
    let panelH = 140;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Title
    fill(60);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('Conditions', panelX + panelW/2, panelY + 5);

    // Condition 1: f(c) defined
    let cond1Y = panelY + 30;
    drawConditionRow(panelX + 8, cond1Y, '1. f(c) defined', conditionResults[0], checkPhase === 1);

    // Condition 2: Limit exists
    let cond2Y = panelY + 60;
    drawConditionRow(panelX + 8, cond2Y, '2. Limit exists', conditionResults[1], checkPhase === 2);

    // Condition 3: Limit = f(c)
    let cond3Y = panelY + 90;
    drawConditionRow(panelX + 8, cond3Y, '3. Limit = f(c)', conditionResults[2], checkPhase === 3);
}

function drawConditionRow(x, y, label, result, isAnimating) {
    // Background highlight if animating
    if (isAnimating) {
        fill(255, 255, 200);
        noStroke();
        rect(x - 3, y - 2, 100, 24, 4);
    }

    // Icon
    if (result === true) {
        fill(50, 180, 80);
        noStroke();
        textSize(16);
        textAlign(LEFT, TOP);
        text('✓', x, y);
    } else if (result === false) {
        fill(220, 80, 80);
        noStroke();
        textSize(16);
        textAlign(LEFT, TOP);
        text('✗', x, y);
    } else {
        fill(180);
        noStroke();
        textSize(16);
        textAlign(LEFT, TOP);
        text('○', x, y);
    }

    // Label
    if (result === false) {
        fill(180, 60, 60);
    } else if (result === true) {
        fill(40, 120, 60);
    } else {
        fill(80);
    }
    textSize(11);
    textAlign(LEFT, TOP);
    text(label, x + 15, y + 2);
}

function drawVerdict() {
    if (checkPhase !== 4) return;

    let allPass = conditionResults[0] && conditionResults[1] && conditionResults[2];
    let verdictY = graphTop + 170;
    let verdictX = canvasWidth - 60;

    // Verdict box
    if (allPass) {
        fill(50, 180, 80);
    } else {
        fill(220, 80, 80);
    }
    stroke(allPass ? color(30, 140, 60) : color(180, 60, 60));
    strokeWeight(2);
    rect(verdictX - 55, verdictY - 15, 110, 30, 6);

    // Text
    fill(255);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(allPass ? 'CONTINUOUS' : 'DISCONTINUOUS', verdictX, verdictY);
}

function drawControls() {
    // Scenario selector buttons
    textSize(11);
    let btnY = drawHeight + 8;
    let btnW = (canvasWidth - 20) / 5;

    for (let i = 0; i < 5; i++) {
        let btnX = 10 + i * btnW;

        // Button background
        if (i === currentScenario) {
            fill(100, 150, 200);
            stroke(70, 120, 170);
        } else {
            fill(240);
            stroke(180);
        }
        strokeWeight(1);
        rect(btnX, btnY, btnW - 5, 22, 4);

        // Button label
        fill(i === currentScenario ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        text(String.fromCharCode(65 + i), btnX + (btnW - 5)/2, btnY + 11);

        scenarioButtons[i] = { x: btnX, y: btnY, w: btnW - 5, h: 22 };
    }

    // Slider for c
    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('c = ' + targetC.toFixed(1), 10, drawHeight + 45);

    // Slider track
    let sliderX = 60;
    let sliderW = canvasWidth - 200;
    stroke(180);
    strokeWeight(4);
    line(sliderX, drawHeight + 45, sliderX + sliderW, drawHeight + 45);

    // Slider handle
    let handleX = map(targetC, xMin + 0.5, xMax - 0.5, sliderX, sliderX + sliderW);
    fill(100, 150, 200);
    stroke(70, 120, 170);
    strokeWeight(2);
    circle(handleX, drawHeight + 45, 16);

    // Check button
    if (checkPhase === 0) {
        fill(100, 180, 100);
        stroke(70, 140, 70);
    } else {
        fill(180);
        stroke(140);
    }
    strokeWeight(1);
    rect(checkButtonX, checkButtonY, checkButtonW, checkButtonH, 4);
    fill(checkPhase === 0 ? 255 : 120);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Check at c', checkButtonX + checkButtonW/2, checkButtonY + checkButtonH/2);

    // Reset button
    fill(200, 150, 100);
    stroke(170, 120, 70);
    strokeWeight(1);
    rect(resetButtonX, resetButtonY, resetButtonW, resetButtonH, 4);
    fill(255);
    noStroke();
    text('Reset', resetButtonX + resetButtonW/2, resetButtonY + resetButtonH/2);
}

function evaluateCondition(condNum) {
    let c = targetC;

    switch(condNum) {
        case 1:  // f(c) defined
            conditionResults[0] = (getFunctionValue(c) !== null);
            break;
        case 2:  // Limit exists
            conditionResults[1] = (getLimitValue(c) !== null);
            break;
        case 3:  // Limit = f(c)
            let fVal = getFunctionValue(c);
            let limVal = getLimitValue(c);
            conditionResults[2] = (fVal !== null && limVal !== null && abs(fVal - limVal) < 0.001);
            break;
    }
}

function getFunctionValue(x) {
    let c = 2;  // The discontinuity point
    switch(currentScenario) {
        case 0: return x + 1;  // Continuous
        case 1: return abs(x - c) < 0.01 ? null : x + 1;  // Hole
        case 2: return x < c ? null : x + 3;  // Jump (using right value at c)
        case 3: return abs(x - c) < 0.01 ? 5 : x + 1;  // Misplaced point
        case 4: return abs(x - c) < 0.01 ? null : 1/(x - c) + 3;  // Asymptote
    }
    return null;
}

function getLimitValue(x) {
    let c = 2;
    switch(currentScenario) {
        case 0: return x + 1;  // Continuous
        case 1: return x + 1;  // Hole - limit exists
        case 2: return null;  // Jump - limit DNE (left ≠ right)
        case 3: return x + 1;  // Misplaced - limit exists
        case 4: return null;  // Asymptote - limit DNE
    }
    return null;
}

function mousePressed() {
    // Check scenario buttons
    for (let i = 0; i < 5; i++) {
        let btn = scenarioButtons[i];
        if (btn && mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            currentScenario = i;
            resetCheck();
            return;
        }
    }

    // Check button
    if (mouseX >= checkButtonX && mouseX <= checkButtonX + checkButtonW &&
        mouseY >= checkButtonY && mouseY <= checkButtonY + checkButtonH) {
        if (checkPhase === 0) {
            checkPhase = 1;
            checkTimer = 0;
            conditionResults = [null, null, null];
        }
        return;
    }

    // Reset button
    if (mouseX >= resetButtonX && mouseX <= resetButtonX + resetButtonW &&
        mouseY >= resetButtonY && mouseY <= resetButtonY + resetButtonH) {
        resetCheck();
        return;
    }
}

function mouseDragged() {
    // Slider drag
    let sliderX = 60;
    let sliderW = canvasWidth - 200;
    let sliderY = drawHeight + 45;

    if (mouseY >= sliderY - 15 && mouseY <= sliderY + 15 &&
        mouseX >= sliderX - 10 && mouseX <= sliderX + sliderW + 10) {
        targetC = map(constrain(mouseX, sliderX, sliderX + sliderW),
                      sliderX, sliderX + sliderW,
                      xMin + 0.5, xMax - 0.5);
        targetC = round(targetC * 10) / 10;  // Round to 1 decimal
        resetCheck();
    }
}

function resetCheck() {
    checkPhase = 0;
    checkTimer = 0;
    conditionResults = [null, null, null];
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
