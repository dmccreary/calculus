// Differentiability Checker MicroSim
// Bloom Level: Apply (L3), Verbs: apply, execute, implement
// Learning Objective: Students will apply a systematic process to determine
// differentiability at a point by checking if f(a) is defined, if f is continuous
// at a, computing left and right derivatives, and verifying they are equal.
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 80;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphTop = 70;
let graphBottom;
let xMin = -3;
let xMax = 5;
let yMin = -2;
let yMax = 6;

// State variables
let currentFunction = 0;
let targetA = 1;  // The point we're checking differentiability at
let currentStep = 0;  // 0=not started, 1-5=steps, 6=conclusion
let stepTimer = 0;
let stepResults = [null, null, null, null, null];  // Results for each step
let leftDerivative = null;
let rightDerivative = null;
let failureReason = '';

// Function presets
const functions = [
    { name: "A: Smooth", description: "f(x) = x^2", a: 1 },
    { name: "B: Corner", description: "f(x) = |x - 1|", a: 1 },
    { name: "C: Cusp", description: "f(x) = x^(2/3)", a: 0 },
    { name: "D: Discontinuity", description: "Jump at x = 1", a: 1 },
    { name: "E: Vertical Tangent", description: "f(x) = cbrt(x)", a: 0 }
];

// Button coordinates
let functionButtons = [];
let stepButtonX, stepButtonY, stepButtonW, stepButtonH;
let autoButtonX, autoButtonY, autoButtonW, autoButtonH;
let resetButtonX, resetButtonY, resetButtonW, resetButtonH;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Calculate button positions
    stepButtonX = 10;
    stepButtonY = drawHeight + 85;
    stepButtonW = 100;
    stepButtonH = 28;

    autoButtonX = 120;
    autoButtonY = drawHeight + 85;
    autoButtonW = 90;
    autoButtonH = 28;

    resetButtonX = 220;
    resetButtonY = drawHeight + 85;
    resetButtonW = 60;
    resetButtonH = 28;

    describe('Interactive step-through tool for checking differentiability at a point with Delta robot mascot', LABEL);
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
    graphRight = canvasWidth - 180;  // Leave room for checklist panel
    graphBottom = drawHeight - 40;

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Differentiability Checker', canvasWidth * 0.30, 8);
    textSize(14);
    text(functions[currentFunction].name, canvasWidth * 0.30, 32);

    // Draw components
    drawAxes();
    drawFunction();
    drawTargetPoint();
    drawDelta();
    drawChecklistPanel();
    drawConclusion();
    drawControls();

    // Step animation
    if (currentStep > 0 && currentStep <= 5) {
        stepTimer++;
        if (stepTimer > 30) {  // 30 frames per step
            stepTimer = 0;
            evaluateStep(currentStep);
            // Check if we should continue or stop early
            if (stepResults[currentStep - 1] === false && currentStep <= 2) {
                // If f(a) undefined or not continuous, skip to conclusion
                currentStep = 6;
            } else {
                currentStep++;
            }
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

    // Clamp axes to graph bounds
    if (y0 >= graphTop && y0 <= graphBottom) {
        line(graphLeft, y0, graphRight, y0);
    }
    if (x0 >= graphLeft && x0 <= graphRight) {
        line(x0, graphTop, x0, graphBottom);
    }

    // Labels
    fill(0);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
        let px = map(x, xMin, xMax, graphLeft, graphRight);
        if (y0 >= graphTop && y0 <= graphBottom) {
            text(x, px, y0 + 3);
        } else {
            text(x, px, graphBottom + 3);
        }
    }
    textAlign(RIGHT, CENTER);
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
        if (y !== 0) {
            let py = map(y, yMin, yMax, graphBottom, graphTop);
            if (x0 >= graphLeft && x0 <= graphRight) {
                text(y, x0 - 5, py);
            } else {
                text(y, graphLeft - 5, py);
            }
        }
    }

    textSize(12);
    textAlign(CENTER, TOP);
    text('x', graphRight + 10, y0 >= graphTop && y0 <= graphBottom ? y0 - 5 : graphBottom - 15);
    textAlign(RIGHT, CENTER);
    text('y', x0 >= graphLeft && x0 <= graphRight ? x0 + 5 : graphLeft + 15, graphTop - 10);
}

function drawFunction() {
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    switch(currentFunction) {
        case 0:  // f(x) = x^2 (smooth)
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                let y = x * x;
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop - 10 && py <= graphBottom + 10) vertex(px, constrain(py, graphTop, graphBottom));
            }
            endShape();
            break;

        case 1:  // f(x) = |x - 1| (corner at x = 1)
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                let y = abs(x - 1);
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop - 10 && py <= graphBottom + 10) vertex(px, constrain(py, graphTop, graphBottom));
            }
            endShape();
            break;

        case 2:  // f(x) = x^(2/3) (cusp at x = 0)
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                let y = Math.sign(x) * Math.pow(abs(x), 2/3);
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop - 10 && py <= graphBottom + 10) vertex(px, constrain(py, graphTop, graphBottom));
            }
            endShape();
            break;

        case 3:  // Jump discontinuity at x = 1
            // Left piece: f(x) = x for x < 1
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                if (x >= 1 - 0.02) continue;
                let y = x;
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop && py <= graphBottom) vertex(px, py);
            }
            endShape();
            // Right piece: f(x) = x + 2 for x >= 1
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                if (x < 1) continue;
                let y = x + 2;
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop && py <= graphBottom) vertex(px, py);
            }
            endShape();
            // Draw endpoints
            let jumpX = map(1, xMin, xMax, graphLeft, graphRight);
            let leftY = map(1, yMin, yMax, graphBottom, graphTop);
            let rightY = map(3, yMin, yMax, graphBottom, graphTop);
            stroke(0, 100, 200);
            fill('aliceblue');
            circle(jumpX, leftY, 10);  // Open circle on left
            fill(0, 100, 200);
            circle(jumpX, rightY, 10);  // Solid circle on right
            break;

        case 4:  // f(x) = cbrt(x) (vertical tangent at x = 0)
            beginShape();
            for (let px = graphLeft; px <= graphRight; px++) {
                let x = map(px, graphLeft, graphRight, xMin, xMax);
                let y = Math.cbrt(x);
                let py = map(y, yMin, yMax, graphBottom, graphTop);
                if (py >= graphTop - 10 && py <= graphBottom + 10) vertex(px, constrain(py, graphTop, graphBottom));
            }
            endShape();
            break;
    }
}

function drawTargetPoint() {
    let px = map(targetA, xMin, xMax, graphLeft, graphRight);

    // Dashed vertical line at x = a
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
    text('a = ' + targetA.toFixed(1), px, graphTop - 5);

    // Highlight point on curve if defined
    let fVal = getFunctionValue(targetA);
    if (fVal !== null && fVal >= yMin && fVal <= yMax) {
        let py = map(fVal, yMin, yMax, graphBottom, graphTop);
        fill(255, 200, 0);
        stroke(200, 150, 0);
        strokeWeight(2);
        circle(px, py, 14);
    }
}

function drawDelta() {
    let px = map(targetA, xMin, xMax, graphLeft, graphRight);
    let fVal = getFunctionValue(targetA);

    let deltaY;
    let isHovering = false;

    if (fVal !== null && fVal >= yMin && fVal <= yMax) {
        deltaY = map(fVal, yMin, yMax, graphBottom, graphTop);
    } else {
        deltaY = graphTop + 80;
        isHovering = true;
    }

    // Draw Delta robot
    let triSize = 16;
    push();
    translate(px, deltaY - triSize - 20);

    if (isHovering) {
        let hover = sin(frameCount * 0.1) * 3;
        translate(0, hover);
    }

    // Determine tilt based on derivative at point
    let tilt = 0;
    if (currentStep >= 4 && leftDerivative !== null && rightDerivative !== null &&
        leftDerivative === rightDerivative && isFinite(leftDerivative)) {
        tilt = atan(leftDerivative) * 0.5;  // Scale down for visual
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
    circle(-4, 0, 5);
    circle(4, 0, 5);
    fill(0);
    circle(-4, 0, 2.5);
    circle(4, 0, 2.5);

    // Wheels
    fill(80);
    stroke(60);
    strokeWeight(1);
    circle(-triSize/2 + 2, triSize/2 + 2, 5);
    circle(triSize/2 - 2, triSize/2 + 2, 5);

    pop();

    // Thought bubble showing current step
    if (currentStep > 0 && currentStep <= 5) {
        fill(255, 255, 230);
        stroke(180);
        strokeWeight(1);
        let bubbleX = px + 25;
        let bubbleY = deltaY - triSize - 50;
        ellipse(bubbleX, bubbleY, 30, 20);
        fill(100);
        noStroke();
        textSize(11);
        textAlign(CENTER, CENTER);
        text(currentStep + '/5', bubbleX, bubbleY);
    }
}

function drawChecklistPanel() {
    let panelX = canvasWidth - 175;
    let panelY = graphTop - 10;
    let panelW = 170;
    let panelH = 220;

    // Panel background
    fill(255, 255, 255, 245);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Title
    fill(60);
    noStroke();
    textSize(13);
    textAlign(CENTER, TOP);
    text('Differentiability Check', panelX + panelW/2, panelY + 6);

    // Step 1: f(a) defined
    let step1Y = panelY + 30;
    drawStepRow(panelX + 8, step1Y, '1. Is f(a) defined?', stepResults[0], currentStep === 1);

    // Step 2: f continuous at a
    let step2Y = panelY + 58;
    drawStepRow(panelX + 8, step2Y, '2. Is f continuous at a?', stepResults[1], currentStep === 2);

    // Step 3: Compute f'-(a)
    let step3Y = panelY + 86;
    let leftVal = leftDerivative !== null ?
        (isFinite(leftDerivative) ? leftDerivative.toFixed(2) : (leftDerivative > 0 ? '+Inf' : '-Inf')) : '?';
    drawStepRow(panelX + 8, step3Y, "3. f'-(a) = " + leftVal, stepResults[2], currentStep === 3);

    // Step 4: Compute f'+(a)
    let step4Y = panelY + 114;
    let rightVal = rightDerivative !== null ?
        (isFinite(rightDerivative) ? rightDerivative.toFixed(2) : (rightDerivative > 0 ? '+Inf' : '-Inf')) : '?';
    drawStepRow(panelX + 8, step4Y, "4. f'+(a) = " + rightVal, stepResults[3], currentStep === 4);

    // Step 5: Are they equal and finite?
    let step5Y = panelY + 142;
    drawStepRow(panelX + 8, step5Y, '5. Equal & finite?', stepResults[4], currentStep === 5);

    // Separator line
    stroke(200);
    strokeWeight(1);
    line(panelX + 10, panelY + 170, panelX + panelW - 10, panelY + 170);

    // Current formula display
    fill(80);
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);
    text(functions[currentFunction].description, panelX + 10, panelY + 180);
    text('at a = ' + targetA.toFixed(1), panelX + 10, panelY + 195);
}

function drawStepRow(x, y, label, result, isActive) {
    // Background highlight if active
    if (isActive) {
        fill(255, 255, 200);
        noStroke();
        rect(x - 3, y - 2, 160, 22, 4);
    }

    // Icon
    let iconX = x;
    if (result === true) {
        fill(50, 180, 80);
        textSize(14);
        text('\u2713', iconX, y);  // Checkmark
    } else if (result === false) {
        fill(220, 80, 80);
        textSize(14);
        text('\u2717', iconX, y);  // X mark
    } else {
        fill(180);
        textSize(14);
        text('\u25CB', iconX, y);  // Empty circle
    }

    // Label
    if (result === false) {
        fill(180, 60, 60);
    } else if (result === true) {
        fill(40, 120, 60);
    } else {
        fill(80);
    }
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);
    text(label, x + 15, y + 2);
}

function drawConclusion() {
    if (currentStep !== 6) return;

    let allPass = stepResults[0] && stepResults[1] && stepResults[2] && stepResults[3] && stepResults[4];
    let panelX = canvasWidth - 175;
    let verdictY = graphTop + 230;

    // Verdict box
    if (allPass) {
        fill(50, 180, 80);
        stroke(30, 140, 60);
    } else {
        fill(220, 100, 100);
        stroke(180, 60, 60);
    }
    strokeWeight(2);
    rect(panelX, verdictY, 170, 50, 6);

    // Verdict text
    fill(255);
    noStroke();
    textSize(13);
    textAlign(CENTER, TOP);

    if (allPass) {
        text('DIFFERENTIABLE', panelX + 85, verdictY + 8);
        textSize(10);
        text("f'(a) = " + leftDerivative.toFixed(2), panelX + 85, verdictY + 28);
    } else {
        text('NOT DIFFERENTIABLE', panelX + 85, verdictY + 8);
        textSize(10);
        // Wrap failure reason if needed
        let reason = failureReason;
        if (reason.length > 25) {
            let mid = reason.lastIndexOf(' ', 25);
            if (mid > 10) {
                text(reason.substring(0, mid), panelX + 85, verdictY + 25);
                text(reason.substring(mid + 1), panelX + 85, verdictY + 36);
            } else {
                text(reason, panelX + 85, verdictY + 30);
            }
        } else {
            text(reason, panelX + 85, verdictY + 30);
        }
    }
}

function drawControls() {
    // Function selector buttons (Row 1)
    textSize(11);
    let btnY = drawHeight + 8;
    let btnW = (canvasWidth - 20) / 5;

    for (let i = 0; i < 5; i++) {
        let btnX = 10 + i * btnW;

        if (i === currentFunction) {
            fill(100, 150, 200);
            stroke(70, 120, 170);
        } else {
            fill(240);
            stroke(180);
        }
        strokeWeight(1);
        rect(btnX, btnY, btnW - 5, 22, 4);

        fill(i === currentFunction ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        text(String.fromCharCode(65 + i), btnX + (btnW - 5)/2, btnY + 11);

        functionButtons[i] = { x: btnX, y: btnY, w: btnW - 5, h: 22 };
    }

    // Point slider (Row 2)
    fill(60);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('a = ' + targetA.toFixed(1), 10, drawHeight + 50);

    // Slider track
    let sliderX = sliderLeftMargin;
    let sliderW = canvasWidth - sliderLeftMargin - margin;
    stroke(180);
    strokeWeight(4);
    line(sliderX, drawHeight + 50, sliderX + sliderW, drawHeight + 50);

    // Slider handle
    let handleX = map(targetA, xMin + 0.5, xMax - 0.5, sliderX, sliderX + sliderW);
    fill(100, 150, 200);
    stroke(70, 120, 170);
    strokeWeight(2);
    circle(handleX, drawHeight + 50, 16);

    // Step Through button
    if (currentStep === 0) {
        fill(100, 180, 100);
        stroke(70, 140, 70);
    } else if (currentStep <= 5) {
        fill(200, 180, 100);
        stroke(170, 150, 70);
    } else {
        fill(180);
        stroke(140);
    }
    strokeWeight(1);
    rect(stepButtonX, stepButtonY, stepButtonW, stepButtonH, 4);
    fill(currentStep === 0 ? 255 : (currentStep <= 5 ? 60 : 120));
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(currentStep === 0 ? 'Step Through' : (currentStep <= 5 ? 'Stepping...' : 'Done'),
         stepButtonX + stepButtonW/2, stepButtonY + stepButtonH/2);

    // Auto Check button
    fill(currentStep === 0 ? color(100, 150, 200) : color(180));
    stroke(currentStep === 0 ? color(70, 120, 170) : color(140));
    strokeWeight(1);
    rect(autoButtonX, autoButtonY, autoButtonW, autoButtonH, 4);
    fill(currentStep === 0 ? 255 : 120);
    noStroke();
    text('Auto Check', autoButtonX + autoButtonW/2, autoButtonY + autoButtonH/2);

    // Reset button
    fill(200, 150, 100);
    stroke(170, 120, 70);
    strokeWeight(1);
    rect(resetButtonX, resetButtonY, resetButtonW, resetButtonH, 4);
    fill(255);
    noStroke();
    text('Reset', resetButtonX + resetButtonW/2, resetButtonY + resetButtonH/2);
}

function evaluateStep(step) {
    let a = targetA;

    switch(step) {
        case 1:  // Is f(a) defined?
            let fVal = getFunctionValue(a);
            stepResults[0] = (fVal !== null);
            if (!stepResults[0]) {
                failureReason = 'f(a) is undefined';
            }
            break;

        case 2:  // Is f continuous at a?
            if (!stepResults[0]) {
                stepResults[1] = false;
                failureReason = 'f(a) is undefined';
            } else {
                stepResults[1] = isContinuousAt(a);
                if (!stepResults[1]) {
                    failureReason = 'f is not continuous at a';
                }
            }
            break;

        case 3:  // Compute left derivative
            leftDerivative = getLeftDerivative(a);
            stepResults[2] = (leftDerivative !== null);
            if (!stepResults[2]) {
                failureReason = "f'-(a) does not exist";
            }
            break;

        case 4:  // Compute right derivative
            rightDerivative = getRightDerivative(a);
            stepResults[3] = (rightDerivative !== null);
            if (!stepResults[3]) {
                failureReason = "f'+(a) does not exist";
            }
            break;

        case 5:  // Are they equal and finite?
            if (leftDerivative !== null && rightDerivative !== null) {
                let equal = abs(leftDerivative - rightDerivative) < 0.001;
                let finite = isFinite(leftDerivative) && isFinite(rightDerivative);
                stepResults[4] = equal && finite;
                if (!stepResults[4]) {
                    if (!finite) {
                        failureReason = 'Derivative is infinite (vertical tangent)';
                    } else {
                        failureReason = "f'-(a) \u2260 f'+(a) (corner/cusp)";
                    }
                }
            } else {
                stepResults[4] = false;
            }
            break;
    }
}

function getFunctionValue(x) {
    switch(currentFunction) {
        case 0: return x * x;  // x^2
        case 1: return abs(x - 1);  // |x - 1|
        case 2: return Math.sign(x) * Math.pow(abs(x), 2/3);  // x^(2/3)
        case 3:  // Jump at x = 1
            if (x < 1) return x;
            return x + 2;
        case 4: return Math.cbrt(x);  // cbrt(x)
    }
    return null;
}

function isContinuousAt(a) {
    let fVal = getFunctionValue(a);
    if (fVal === null) return false;

    // Check if limit from left equals limit from right equals f(a)
    let h = 0.001;
    let leftLim = getFunctionValue(a - h);
    let rightLim = getFunctionValue(a + h);

    if (leftLim === null || rightLim === null) return false;

    // For jump discontinuity case
    if (currentFunction === 3 && abs(a - 1) < 0.05) {
        return false;  // Known discontinuity at x = 1
    }

    return abs(leftLim - rightLim) < 0.1 && abs(fVal - leftLim) < 0.1;
}

function getLeftDerivative(a) {
    let h = 0.0001;
    let fVal = getFunctionValue(a);
    let fLeft = getFunctionValue(a - h);

    if (fVal === null || fLeft === null) return null;

    let deriv = (fVal - fLeft) / h;

    // Handle special cases
    if (currentFunction === 2 && abs(a) < 0.01) {
        return -Infinity;  // Cusp at 0
    }
    if (currentFunction === 4 && abs(a) < 0.01) {
        return Infinity;  // Vertical tangent at 0
    }

    return deriv;
}

function getRightDerivative(a) {
    let h = 0.0001;
    let fVal = getFunctionValue(a);
    let fRight = getFunctionValue(a + h);

    if (fVal === null || fRight === null) return null;

    let deriv = (fRight - fVal) / h;

    // Handle special cases
    if (currentFunction === 2 && abs(a) < 0.01) {
        return Infinity;  // Cusp at 0
    }
    if (currentFunction === 4 && abs(a) < 0.01) {
        return Infinity;  // Vertical tangent at 0
    }

    return deriv;
}

function mousePressed() {
    // Check function buttons
    for (let i = 0; i < 5; i++) {
        let btn = functionButtons[i];
        if (btn && mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            currentFunction = i;
            targetA = functions[i].a;
            resetCheck();
            return;
        }
    }

    // Step Through button
    if (mouseX >= stepButtonX && mouseX <= stepButtonX + stepButtonW &&
        mouseY >= stepButtonY && mouseY <= stepButtonY + stepButtonH) {
        if (currentStep === 0) {
            currentStep = 1;
            stepTimer = 0;
        }
        return;
    }

    // Auto Check button
    if (mouseX >= autoButtonX && mouseX <= autoButtonX + autoButtonW &&
        mouseY >= autoButtonY && mouseY <= autoButtonY + autoButtonH) {
        if (currentStep === 0) {
            // Run all steps immediately
            for (let s = 1; s <= 5; s++) {
                evaluateStep(s);
                if (stepResults[s - 1] === false && s <= 2) break;
            }
            currentStep = 6;
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
    let sliderX = sliderLeftMargin;
    let sliderW = canvasWidth - sliderLeftMargin - margin;
    let sliderY = drawHeight + 50;

    if (mouseY >= sliderY - 15 && mouseY <= sliderY + 15 &&
        mouseX >= sliderX - 10 && mouseX <= sliderX + sliderW + 10) {
        targetA = map(constrain(mouseX, sliderX, sliderX + sliderW),
                      sliderX, sliderX + sliderW,
                      xMin + 0.5, xMax - 0.5);
        targetA = round(targetA * 10) / 10;  // Round to 1 decimal
        resetCheck();
    }
}

function resetCheck() {
    currentStep = 0;
    stepTimer = 0;
    stepResults = [null, null, null, null, null];
    leftDerivative = null;
    rightDerivative = null;
    failureReason = '';
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
