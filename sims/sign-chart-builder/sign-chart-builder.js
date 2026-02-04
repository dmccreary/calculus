// Sign Chart Builder - Interactive Sign Chart Construction for Derivatives
// Students construct sign charts to determine intervals of increase and decrease
// Bloom Level: Apply (L3), Verbs: demonstrate, execute, construct
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Layout regions
let functionAreaHeight = 80;   // Top area for function display
let graphAreaHeight = 150;     // Graph preview area
let numberLineY;               // Y position of number line
let numberLineHeight = 120;    // Height for sign chart area
let summaryAreaY;              // Y position of summary area

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphTop;
let graphBottom;
let xMin = -4;
let xMax = 4;
let yMin = -10;
let yMax = 10;

// Control buttons (canvas-based)
let checkButtonX, checkButtonY, checkButtonW = 100, checkButtonH = 28;
let newFuncButtonX, newFuncButtonY, newFuncButtonW = 100, newFuncButtonH = 28;
let resetButtonX, resetButtonY, resetButtonW = 80, resetButtonH = 28;
let showGraphButtonX, showGraphButtonY, showGraphButtonW = 100, showGraphButtonH = 28;

// Dropdown for function selection (rendered as canvas buttons)
let functionButtons = [];
let selectedFunctionIndex = 0;

// State variables
let showGraph = true;
let showResults = false;
let userCriticalPoints = [];  // User-placed critical point x-values
let userSigns = {};           // User's sign selections for each interval: {intervalIndex: '+' or '-'}
let testPoints = [];          // Test points placed by user

// Number line interaction
let isDraggingPoint = false;
let draggedPointIndex = -1;
let hoverInterval = -1;

// Current function
let currentFunc;

// Function definitions with their derivatives
let functions = [
    {
        name: 'f(x) = x^3 - 3x',
        f: x => Math.pow(x, 3) - 3 * x,
        df: x => 3 * Math.pow(x, 2) - 3,
        criticalPoints: [-1, 1],
        displayName: 'x^3 - 3x'
    },
    {
        name: 'f(x) = x^2 - 4',
        f: x => Math.pow(x, 2) - 4,
        df: x => 2 * x,
        criticalPoints: [0],
        displayName: 'x^2 - 4'
    },
    {
        name: 'f(x) = x^3 - 12x',
        f: x => Math.pow(x, 3) - 12 * x,
        df: x => 3 * Math.pow(x, 2) - 12,
        criticalPoints: [-2, 2],
        displayName: 'x^3 - 12x'
    },
    {
        name: 'f(x) = x^4 - 8x^2',
        f: x => Math.pow(x, 4) - 8 * Math.pow(x, 2),
        df: x => 4 * Math.pow(x, 3) - 16 * x,
        criticalPoints: [-2, 0, 2],
        displayName: 'x^4 - 8x^2'
    },
    {
        name: 'f(x) = -x^2 + 2x + 3',
        f: x => -Math.pow(x, 2) + 2 * x + 3,
        df: x => -2 * x + 2,
        criticalPoints: [1],
        displayName: '-x^2 + 2x + 3'
    }
];

// Derivative display strings
let derivativeStrings = [
    "f'(x) = 3x^2 - 3",
    "f'(x) = 2x",
    "f'(x) = 3x^2 - 12",
    "f'(x) = 4x^3 - 16x",
    "f'(x) = -2x + 2"
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    currentFunc = functions[selectedFunctionIndex];
    updateLayoutPositions();
    updateButtonPositions();

    describe('Interactive sign chart builder where students place critical points and determine signs of derivatives to find intervals of increase and decrease', LABEL);
}

function updateLayoutPositions() {
    graphTop = functionAreaHeight + 10;
    graphBottom = graphTop + graphAreaHeight - 20;
    numberLineY = functionAreaHeight + graphAreaHeight + 30;
    summaryAreaY = numberLineY + numberLineHeight + 10;
}

function updateButtonPositions() {
    // Row 1: Function selection buttons
    let funcX = 10;
    functionButtons = [];
    for (let i = 0; i < functions.length; i++) {
        functionButtons.push({
            index: i,
            x: funcX,
            y: drawHeight + 10,
            w: 50,
            h: 24
        });
        funcX += 55;
    }

    // Row 2: Action buttons
    checkButtonX = 10;
    checkButtonY = drawHeight + 45;

    resetButtonX = checkButtonX + checkButtonW + 10;
    resetButtonY = drawHeight + 45;

    showGraphButtonX = resetButtonX + resetButtonW + 10;
    showGraphButtonY = drawHeight + 45;
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

    // Draw all components
    drawFunctionArea();
    if (showGraph) {
        drawGraphPreview();
    }
    drawNumberLine();
    drawIntervalRegions();
    drawCriticalPoints();
    drawTestPoints();
    drawSummary();
    drawControls();
    drawInstructions();
}

function drawFunctionArea() {
    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Sign Chart Builder', canvasWidth / 2, 8);

    // Function display
    textSize(16);
    fill(0, 80, 160);
    text(currentFunc.name, canvasWidth / 2, 32);

    // Derivative display
    textSize(14);
    fill(80);
    text(derivativeStrings[selectedFunctionIndex], canvasWidth / 2, 54);
}

function drawGraphPreview() {
    // Draw graph area border
    stroke(200);
    strokeWeight(1);
    fill(255);
    rect(graphLeft - 5, graphTop - 5, graphRight - graphLeft + 10, graphBottom - graphTop + 10, 5);

    // Draw axes
    stroke(150);
    strokeWeight(1);

    // X-axis
    let y0 = map(0, yMin, yMax, graphBottom, graphTop);
    if (y0 >= graphTop && y0 <= graphBottom) {
        line(graphLeft, y0, graphRight, y0);
    }

    // Y-axis
    let x0 = map(0, xMin, xMax, graphLeft, graphRight);
    if (x0 >= graphLeft && x0 <= graphRight) {
        line(x0, graphTop, x0, graphBottom);
    }

    // Draw the function curve with color coding
    strokeWeight(3);
    noFill();

    // Draw in segments based on sign of derivative
    let segments = getIntervals();

    for (let seg of segments) {
        let segStart = Math.max(seg.start, xMin);
        let segEnd = Math.min(seg.end, xMax);

        // Determine color based on actual derivative sign
        let testX = (segStart + segEnd) / 2;
        let dfVal = currentFunc.df(testX);

        if (showResults) {
            stroke(dfVal > 0 ? color(50, 180, 100) : color(220, 80, 80));
        } else {
            stroke(0, 100, 200);
        }

        beginShape();
        for (let px = map(segStart, xMin, xMax, graphLeft, graphRight);
             px <= map(segEnd, xMin, xMax, graphLeft, graphRight);
             px += 2) {
            let x = map(px, graphLeft, graphRight, xMin, xMax);
            let y = currentFunc.f(x);
            let py = map(y, yMin, yMax, graphBottom, graphTop);
            if (py >= graphTop - 5 && py <= graphBottom + 5) {
                vertex(px, constrain(py, graphTop, graphBottom));
            }
        }
        endShape();
    }

    // Draw critical points on graph
    if (showResults) {
        for (let cp of currentFunc.criticalPoints) {
            let px = map(cp, xMin, xMax, graphLeft, graphRight);
            let py = map(currentFunc.f(cp), yMin, yMax, graphBottom, graphTop);
            if (py >= graphTop && py <= graphBottom) {
                fill(255, 200, 50);
                stroke(200, 150, 0);
                strokeWeight(2);
                circle(px, py, 12);
            }
        }
    }

    // Draw axis labels
    fill(100);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text('x', graphRight + 15, y0 - 5);
    textAlign(RIGHT, CENTER);
    text('y', x0 - 5, graphTop - 10);
}

function drawNumberLine() {
    let nlLeft = 60;
    let nlRight = canvasWidth - 60;
    let nlY = numberLineY;

    // Label
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, BOTTOM);
    text("f'(x) Sign Chart:", 10, nlY - 25);

    // Number line base
    stroke(0);
    strokeWeight(2);
    line(nlLeft, nlY, nlRight, nlY);

    // Tick marks and labels
    textSize(12);
    textAlign(CENTER, TOP);
    fill(0);
    noStroke();

    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
        let px = map(x, xMin, xMax, nlLeft, nlRight);
        stroke(0);
        strokeWeight(1);
        line(px, nlY - 5, px, nlY + 5);
        noStroke();
        text(x, px, nlY + 8);
    }

    // Draw infinity symbols at ends
    textSize(14);
    text('-oo', nlLeft - 15, nlY + 8);
    text('+oo', nlRight + 15, nlY + 8);
}

function drawIntervalRegions() {
    let nlLeft = 60;
    let nlRight = canvasWidth - 60;
    let nlY = numberLineY;

    // Get all critical points (user's or actual if showing results)
    let critPoints = showResults ? currentFunc.criticalPoints : userCriticalPoints.slice().sort((a, b) => a - b);

    // Create intervals
    let intervals = [];
    let prev = xMin;
    for (let cp of critPoints) {
        if (cp > xMin && cp < xMax) {
            intervals.push({ start: prev, end: cp });
            prev = cp;
        }
    }
    intervals.push({ start: prev, end: xMax });

    // Draw interval regions
    for (let i = 0; i < intervals.length; i++) {
        let int = intervals[i];
        let x1 = map(int.start, xMin, xMax, nlLeft, nlRight);
        let x2 = map(int.end, xMin, xMax, nlLeft, nlRight);
        let midX = (x1 + x2) / 2;

        // Determine color and sign
        let sign = userSigns[i];
        let isCorrect = null;

        if (showResults) {
            let testX = (int.start + int.end) / 2;
            let actualSign = currentFunc.df(testX) > 0 ? '+' : '-';
            isCorrect = (sign === actualSign);

            // Color background based on correctness
            if (sign) {
                if (isCorrect) {
                    fill(180, 255, 180, 150);  // Green for correct
                } else {
                    fill(255, 180, 180, 150);  // Red for incorrect
                }
            } else {
                fill(255, 255, 200, 150);  // Yellow for not answered
            }
        } else if (sign) {
            fill(sign === '+' ? color(200, 255, 200, 150) : color(255, 200, 200, 150));
        } else if (hoverInterval === i) {
            fill(230, 230, 250, 150);
        } else {
            fill(255, 255, 255, 100);
        }

        noStroke();
        rect(x1 + 2, nlY - 40, x2 - x1 - 4, 35, 3);

        // Draw sign symbol
        textSize(24);
        textAlign(CENTER, CENTER);
        if (sign) {
            fill(sign === '+' ? color(0, 150, 0) : color(200, 0, 0));
            text(sign, midX, nlY - 22);
        } else if (!showResults) {
            fill(150);
            textSize(12);
            text('click', midX, nlY - 22);
        }

        // Show actual sign if showing results and user was wrong or didn't answer
        if (showResults && (!sign || !isCorrect)) {
            let testX = (int.start + int.end) / 2;
            let actualSign = currentFunc.df(testX) > 0 ? '+' : '-';
            textSize(16);
            fill(100);
            text('(' + actualSign + ')', midX, nlY - 48);
        }
    }
}

function drawCriticalPoints() {
    let nlLeft = 60;
    let nlRight = canvasWidth - 60;
    let nlY = numberLineY;

    // Draw user's critical points
    for (let i = 0; i < userCriticalPoints.length; i++) {
        let cp = userCriticalPoints[i];
        let px = map(cp, xMin, xMax, nlLeft, nlRight);

        // Highlight if dragging
        if (isDraggingPoint && draggedPointIndex === i) {
            fill(255, 200, 50);
            stroke(200, 150, 0);
        } else {
            fill(100, 150, 255);
            stroke(50, 100, 200);
        }
        strokeWeight(2);
        circle(px, nlY, 16);

        // Label
        fill(50);
        noStroke();
        textSize(11);
        textAlign(CENTER, BOTTOM);
        text('x=' + cp.toFixed(1), px, nlY - 12);
    }

    // Show actual critical points if showing results
    if (showResults) {
        textSize(10);
        fill(0, 150, 0);
        textAlign(CENTER, TOP);

        for (let cp of currentFunc.criticalPoints) {
            let px = map(cp, xMin, xMax, nlLeft, nlRight);

            // Check if user placed a point close to this
            let found = userCriticalPoints.some(ucp => Math.abs(ucp - cp) < 0.3);

            if (!found) {
                // Draw missed critical point
                stroke(200, 0, 0);
                strokeWeight(2);
                fill(255, 200, 200);
                circle(px, nlY, 14);
                noStroke();
                fill(200, 0, 0);
                text('missed: x=' + cp, px, nlY + 25);
            } else {
                // Mark as correct
                noStroke();
                fill(0, 150, 0);
                text('correct!', px, nlY + 25);
            }
        }
    }
}

function drawTestPoints() {
    let nlLeft = 60;
    let nlRight = canvasWidth - 60;
    let nlY = numberLineY;

    for (let tp of testPoints) {
        let px = map(tp.x, xMin, xMax, nlLeft, nlRight);
        let dfVal = currentFunc.df(tp.x);

        // Draw test point marker
        fill(dfVal > 0 ? color(50, 180, 100) : color(220, 80, 80));
        noStroke();

        // Triangle pointing up or down
        if (dfVal > 0) {
            triangle(px - 6, nlY + 55, px + 6, nlY + 55, px, nlY + 45);
        } else {
            triangle(px - 6, nlY + 45, px + 6, nlY + 45, px, nlY + 55);
        }

        // Value label
        textSize(10);
        textAlign(CENTER, TOP);
        text("f'(" + tp.x.toFixed(1) + ")=" + dfVal.toFixed(2), px, nlY + 58);
    }
}

function drawSummary() {
    let summaryY = summaryAreaY;

    fill(0);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Summary:', 10, summaryY);

    if (showResults) {
        let intervals = getIntervalDescriptions();
        let increasing = intervals.filter(i => i.sign === '+').map(i => i.desc);
        let decreasing = intervals.filter(i => i.sign === '-').map(i => i.desc);

        textSize(12);
        fill(0, 150, 0);
        let incText = increasing.length > 0 ? 'Increasing: ' + increasing.join(', ') : 'Increasing: none';
        text(incText, 10, summaryY + 20);

        fill(200, 0, 0);
        let decText = decreasing.length > 0 ? 'Decreasing: ' + decreasing.join(', ') : 'Decreasing: none';
        text(decText, 10, summaryY + 38);
    } else {
        textSize(12);
        fill(100);
        text('Complete the sign chart and click "Check My Work"', 10, summaryY + 20);
    }
}

function getIntervals() {
    let critPoints = currentFunc.criticalPoints.slice().sort((a, b) => a - b);
    let intervals = [];
    let prev = xMin;

    for (let cp of critPoints) {
        if (cp > xMin && cp < xMax) {
            intervals.push({ start: prev, end: cp });
            prev = cp;
        }
    }
    intervals.push({ start: prev, end: xMax });

    return intervals;
}

function getIntervalDescriptions() {
    let critPoints = currentFunc.criticalPoints.slice().sort((a, b) => a - b);
    let descriptions = [];
    let prev = '-oo';

    for (let cp of critPoints) {
        let testX = (prev === '-oo' ? xMin : parseFloat(prev)) + 0.5;
        if (testX >= cp) testX = (parseFloat(prev === '-oo' ? xMin : prev) + cp) / 2;
        let sign = currentFunc.df(testX) > 0 ? '+' : '-';
        descriptions.push({
            desc: '(' + prev + ', ' + cp + ')',
            sign: sign
        });
        prev = cp.toString();
    }

    // Last interval
    let testX = parseFloat(prev) + 0.5;
    let sign = currentFunc.df(testX) > 0 ? '+' : '-';
    descriptions.push({
        desc: '(' + prev + ', +oo)',
        sign: sign
    });

    return descriptions;
}

function drawInstructions() {
    if (!showResults && userCriticalPoints.length === 0) {
        fill(100);
        noStroke();
        textSize(11);
        textAlign(CENTER, TOP);
        text('Double-click on number line to place critical points where f\'(x) = 0', canvasWidth / 2, numberLineY + 75);
        text('Click intervals to set + or - sign. Right-click for test points.', canvasWidth / 2, numberLineY + 88);
    }
}

function drawControls() {
    // Row 1: Function selection
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Function:', 10, drawHeight + 22);

    for (let i = 0; i < functionButtons.length; i++) {
        let btn = functionButtons[i];
        let isSelected = (i === selectedFunctionIndex);
        drawFunctionButton(i + 1, btn.x + 65, btn.y, btn.w, btn.h, isSelected);
    }

    // Row 2: Action buttons
    drawButton('Check My Work', checkButtonX, checkButtonY, checkButtonW, checkButtonH, true);
    drawButton('Reset', resetButtonX, resetButtonY, resetButtonW, resetButtonH, true);

    let graphLabel = showGraph ? 'Hide Graph' : 'Show Graph';
    drawButton(graphLabel, showGraphButtonX, showGraphButtonY, showGraphButtonW, showGraphButtonH, true);
}

function drawButton(label, x, y, w, h, enabled) {
    if (enabled) {
        fill(100, 100, 180);
    } else {
        fill(180);
    }
    stroke(80, 80, 150);
    strokeWeight(1);
    rect(x, y, w, h, 4);

    fill(255);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2);
}

function drawFunctionButton(num, x, y, w, h, isSelected) {
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
    text('f' + num, x + w / 2, y + h / 2);
}

function mousePressed() {
    // Check if in control region
    if (mouseY > drawHeight) {
        // Check function buttons
        for (let i = 0; i < functionButtons.length; i++) {
            let btn = functionButtons[i];
            if (isInButton(mouseX, mouseY, btn.x + 65, btn.y, btn.w, btn.h)) {
                selectedFunctionIndex = i;
                currentFunc = functions[i];
                resetChart();
                return;
            }
        }

        // Check action buttons
        if (isInButton(mouseX, mouseY, checkButtonX, checkButtonY, checkButtonW, checkButtonH)) {
            showResults = true;
            return;
        }

        if (isInButton(mouseX, mouseY, resetButtonX, resetButtonY, resetButtonW, resetButtonH)) {
            resetChart();
            return;
        }

        if (isInButton(mouseX, mouseY, showGraphButtonX, showGraphButtonY, showGraphButtonW, showGraphButtonH)) {
            showGraph = !showGraph;
            return;
        }

        return;
    }

    // Check for clicking on critical points (to drag)
    let nlLeft = 60;
    let nlRight = canvasWidth - 60;
    let nlY = numberLineY;

    for (let i = 0; i < userCriticalPoints.length; i++) {
        let cp = userCriticalPoints[i];
        let px = map(cp, xMin, xMax, nlLeft, nlRight);
        if (dist(mouseX, mouseY, px, nlY) < 12) {
            isDraggingPoint = true;
            draggedPointIndex = i;
            return;
        }
    }

    // Check for clicking on intervals (number line area)
    if (mouseY >= nlY - 45 && mouseY <= nlY + 5) {
        let critPoints = userCriticalPoints.slice().sort((a, b) => a - b);
        let intervals = [];
        let prev = xMin;
        for (let cp of critPoints) {
            if (cp > xMin && cp < xMax) {
                intervals.push({ start: prev, end: cp });
                prev = cp;
            }
        }
        intervals.push({ start: prev, end: xMax });

        for (let i = 0; i < intervals.length; i++) {
            let int = intervals[i];
            let x1 = map(int.start, xMin, xMax, nlLeft, nlRight);
            let x2 = map(int.end, xMin, xMax, nlLeft, nlRight);

            if (mouseX >= x1 && mouseX <= x2) {
                // Toggle sign
                if (!userSigns[i]) {
                    userSigns[i] = '+';
                } else if (userSigns[i] === '+') {
                    userSigns[i] = '-';
                } else {
                    userSigns[i] = null;
                }
                return;
            }
        }
    }
}

function mouseReleased() {
    isDraggingPoint = false;
    draggedPointIndex = -1;
}

function mouseDragged() {
    if (isDraggingPoint && draggedPointIndex >= 0) {
        let nlLeft = 60;
        let nlRight = canvasWidth - 60;
        let newX = map(mouseX, nlLeft, nlRight, xMin, xMax);
        newX = constrain(newX, xMin + 0.5, xMax - 0.5);
        newX = Math.round(newX * 2) / 2; // Snap to 0.5 increments
        userCriticalPoints[draggedPointIndex] = newX;

        // Reset signs when points move
        userSigns = {};
        showResults = false;
    }
}

function doubleClicked() {
    // Add critical point on number line
    let nlLeft = 60;
    let nlRight = canvasWidth - 60;
    let nlY = numberLineY;

    if (mouseY >= nlY - 20 && mouseY <= nlY + 20 && mouseX >= nlLeft && mouseX <= nlRight) {
        let newX = map(mouseX, nlLeft, nlRight, xMin, xMax);
        newX = Math.round(newX * 2) / 2; // Snap to 0.5 increments

        // Don't add if too close to existing point
        if (!userCriticalPoints.some(cp => Math.abs(cp - newX) < 0.4)) {
            userCriticalPoints.push(newX);
            userSigns = {};  // Reset signs
            showResults = false;
        }
    }
}

function mouseMoved() {
    // Update hover state for intervals
    let nlLeft = 60;
    let nlRight = canvasWidth - 60;
    let nlY = numberLineY;

    hoverInterval = -1;

    if (mouseY >= nlY - 45 && mouseY <= nlY + 5) {
        let critPoints = userCriticalPoints.slice().sort((a, b) => a - b);
        let intervals = [];
        let prev = xMin;
        for (let cp of critPoints) {
            if (cp > xMin && cp < xMax) {
                intervals.push({ start: prev, end: cp });
                prev = cp;
            }
        }
        intervals.push({ start: prev, end: xMax });

        for (let i = 0; i < intervals.length; i++) {
            let int = intervals[i];
            let x1 = map(int.start, xMin, xMax, nlLeft, nlRight);
            let x2 = map(int.end, xMin, xMax, nlLeft, nlRight);

            if (mouseX >= x1 && mouseX <= x2) {
                hoverInterval = i;
                break;
            }
        }
    }
}

// Right-click to add test point
function contextMenu(event) {
    event.preventDefault();

    let nlLeft = 60;
    let nlRight = canvasWidth - 60;
    let nlY = numberLineY;

    // Get canvas position
    let canvas = document.querySelector('canvas');
    let rect = canvas.getBoundingClientRect();
    let mx = event.clientX - rect.left;
    let my = event.clientY - rect.top;

    if (my >= nlY - 20 && my <= nlY + 60 && mx >= nlLeft && mx <= nlRight) {
        let testX = map(mx, nlLeft, nlRight, xMin, xMax);
        testX = Math.round(testX * 10) / 10; // Round to 1 decimal

        // Don't add if too close to existing test point or critical point
        if (!testPoints.some(tp => Math.abs(tp.x - testX) < 0.3) &&
            !userCriticalPoints.some(cp => Math.abs(cp - testX) < 0.3)) {
            testPoints.push({ x: testX });
        }
    }
}

function resetChart() {
    userCriticalPoints = [];
    userSigns = {};
    testPoints = [];
    showResults = false;
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

// Set up context menu handler after canvas is created
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        let canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.addEventListener('contextmenu', contextMenu);
        }
    }, 100);
});
