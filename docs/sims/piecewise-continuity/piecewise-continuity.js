// Piecewise Continuity Explorer MicroSim
// Determines whether piecewise functions are continuous at boundary points
// by checking all three conditions for continuity
// Bloom Level: Apply (L3), Verb: Determine

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 70;
let graphRight;
let graphTop = 70;
let graphBottom;
let xMin = -3;
let xMax = 5;
let yMin = -2;
let yMax = 8;

// Preset examples
let presets = [
    {
        name: 'Continuous Piecewise',
        boundary: 2,
        leftFunc: (x) => x + 1,
        rightFunc: (x) => 3,
        leftLabel: 'x + 1',
        rightLabel: '3',
        leftLimit: 3,
        rightLimit: 3,
        functionValue: 3,
        continuous: true
    },
    {
        name: 'Jump Discontinuity',
        boundary: 1,
        leftFunc: (x) => x,
        rightFunc: (x) => x + 2,
        leftLabel: 'x',
        rightLabel: 'x + 2',
        leftLimit: 1,
        rightLimit: 3,
        functionValue: 1,
        continuous: false
    },
    {
        name: 'Removable Discontinuity',
        boundary: 2,
        leftFunc: (x) => x + 2,
        rightFunc: (x) => x + 2,
        leftLabel: 'x + 2',
        rightLabel: 'x + 2',
        leftLimit: 4,
        rightLimit: 4,
        functionValue: 5,  // Function defined at boundary with wrong value
        continuous: false
    },
    {
        name: 'Challenge Case',
        boundary: 0,
        leftFunc: (x) => -x * x + 2,
        rightFunc: (x) => x + 2,
        leftLabel: '-x^2 + 2',
        rightLabel: 'x + 2',
        leftLimit: 2,
        rightLimit: 2,
        functionValue: 2,
        continuous: true
    }
];

let currentPresetIndex = 0;
let currentPreset;

// Animation state
let isAnimating = false;
let animationPhase = 0;
let approachDistance = 0.5;
let checkStep = 0;  // 0: idle, 1: checking f(a), 2: checking left limit, 3: checking right limit, 4: showing verdict

// Button definitions
let buttons = [];
let dropdownOpen = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    currentPreset = presets[0];

    // Define buttons (drawn on canvas)
    initButtons();

    describe('Interactive piecewise continuity explorer checking three conditions for continuity', LABEL);
}

function initButtons() {
    buttons = [
        { id: 'evaluate', label: 'Evaluate Continuity', x: 10, y: drawHeight + 10, w: 150, h: 30 },
        { id: 'reset', label: 'Reset', x: 170, y: drawHeight + 10, w: 70, h: 30 },
        { id: 'dropdown', label: 'Select Example', x: 10, y: drawHeight + 50, w: 180, h: 30, isDropdown: true }
    ];
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
    graphRight = canvasWidth - 140;
    graphBottom = drawHeight - 50;

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Piecewise Continuity Explorer', canvasWidth/2 - 50, 8);
    textSize(14);
    text(currentPreset.name, canvasWidth/2 - 50, 30);

    // Draw components
    drawAxes();
    drawFunction();
    drawBoundaryAnalysis();
    drawInfoPanel();
    drawButtons();
    drawConditionChecklist();

    // Animation update
    if (isAnimating) {
        animationPhase += 0.02;
        approachDistance = 0.5 * Math.pow(1 - animationPhase * 0.8, 2);

        // Step through condition checks
        if (animationPhase > 0.3 && checkStep < 1) checkStep = 1;
        if (animationPhase > 0.5 && checkStep < 2) checkStep = 2;
        if (animationPhase > 0.7 && checkStep < 3) checkStep = 3;
        if (animationPhase > 0.9 && checkStep < 4) checkStep = 4;

        if (animationPhase >= 1.0) {
            isAnimating = false;
            approachDistance = 0.02;
        }
    }

    // Draw dropdown menu last (on top)
    if (dropdownOpen) {
        drawDropdownMenu();
    }
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
    y0 = constrain(y0, graphTop, graphBottom);
    x0 = constrain(x0, graphLeft, graphRight);
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

    // Axis labels
    textSize(12);
    textAlign(CENTER, TOP);
    text('x', graphRight + 10, y0 - 5);
    textAlign(RIGHT, CENTER);
    text('y', x0 - 10, graphTop - 8);
}

function drawFunction() {
    let cp = currentPreset;
    let boundaryPx = map(cp.boundary, xMin, xMax, graphLeft, graphRight);

    // Left piece (blue)
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        if (x >= cp.boundary - 0.02) continue;
        let y = cp.leftFunc(x);
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Right piece (orange)
    stroke(220, 120, 0);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let px = graphLeft; px <= graphRight; px++) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        if (x <= cp.boundary + 0.02) continue;
        let y = cp.rightFunc(x);
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            vertex(px, py);
        }
    }
    endShape();

    // Vertical dashed line at boundary
    stroke(150);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(boundaryPx, graphTop, boundaryPx, graphBottom);
    drawingContext.setLineDash([]);

    // Function labels
    fill(0, 100, 200);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    let leftLabelX = map(cp.boundary - 1.5, xMin, xMax, graphLeft, graphRight);
    let leftLabelY = map(cp.leftFunc(cp.boundary - 1.5), yMin, yMax, graphBottom, graphTop);
    leftLabelY = constrain(leftLabelY - 15, graphTop + 10, graphBottom - 10);
    text('f(x) = ' + cp.leftLabel, leftLabelX, leftLabelY);

    fill(220, 120, 0);
    let rightLabelX = map(cp.boundary + 0.5, xMin, xMax, graphLeft, graphRight);
    let rightLabelY = map(cp.rightFunc(cp.boundary + 0.5), yMin, yMax, graphBottom, graphTop);
    rightLabelY = constrain(rightLabelY - 15, graphTop + 10, graphBottom - 10);
    text('f(x) = ' + cp.rightLabel, rightLabelX, rightLabelY);
}

function drawBoundaryAnalysis() {
    let cp = currentPreset;
    let boundaryPx = map(cp.boundary, xMin, xMax, graphLeft, graphRight);

    // Left-hand limit approach point (blue)
    let leftX = cp.boundary - approachDistance * 2;
    let leftY = cp.leftFunc(leftX);
    let leftPx = map(leftX, xMin, xMax, graphLeft, graphRight);
    let leftPy = map(leftY, yMin, yMax, graphBottom, graphTop);

    fill(0, 100, 200);
    noStroke();
    circle(leftPx, leftPy, 14);

    // Arrow showing approach direction
    stroke(0, 100, 200);
    strokeWeight(2);
    let arrowEndX = boundaryPx - 8;
    line(leftPx + 10, leftPy, arrowEndX - 5, leftPy);
    // Arrowhead
    line(arrowEndX - 5, leftPy, arrowEndX - 12, leftPy - 5);
    line(arrowEndX - 5, leftPy, arrowEndX - 12, leftPy + 5);

    // Right-hand limit approach point (orange)
    let rightX = cp.boundary + approachDistance * 2;
    let rightY = cp.rightFunc(rightX);
    let rightPx = map(rightX, xMin, xMax, graphLeft, graphRight);
    let rightPy = map(rightY, yMin, yMax, graphBottom, graphTop);

    fill(220, 120, 0);
    noStroke();
    circle(rightPx, rightPy, 14);

    // Arrow showing approach direction
    stroke(220, 120, 0);
    strokeWeight(2);
    let arrowStartX = boundaryPx + 8;
    line(rightPx - 10, rightPy, arrowStartX + 5, rightPy);
    // Arrowhead
    line(arrowStartX + 5, rightPy, arrowStartX + 12, rightPy - 5);
    line(arrowStartX + 5, rightPy, arrowStartX + 12, rightPy + 5);

    // Function value at boundary (green dot)
    let funcValuePy = map(cp.functionValue, yMin, yMax, graphBottom, graphTop);
    if (funcValuePy >= graphTop && funcValuePy <= graphBottom) {
        fill(0, 180, 0);
        noStroke();
        circle(boundaryPx, funcValuePy, 14);
    }

    // Left limit value indicator (horizontal dashed line)
    let leftLimitPy = map(cp.leftLimit, yMin, yMax, graphBottom, graphTop);
    stroke(0, 100, 200, 150);
    strokeWeight(2);
    drawingContext.setLineDash([3, 3]);
    line(graphLeft, leftLimitPy, graphRight, leftLimitPy);

    // Right limit value indicator (if different)
    let rightLimitPy = map(cp.rightLimit, yMin, yMax, graphBottom, graphTop);
    if (Math.abs(leftLimitPy - rightLimitPy) > 3) {
        stroke(220, 120, 0, 150);
        line(graphLeft, rightLimitPy, graphRight, rightLimitPy);
    }
    drawingContext.setLineDash([]);

    // Label showing boundary x value
    fill(100);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('x = ' + cp.boundary, boundaryPx, graphBottom + 15);
}

function drawInfoPanel() {
    let cp = currentPreset;
    let panelX = canvasWidth - 135;
    let panelY = graphTop - 10;
    let panelW = 130;
    let panelH = 170;

    // Panel background
    fill(255, 255, 255, 245);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Content
    fill(0);
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);

    let y = panelY + 10;

    // Boundary
    fill(80);
    text('Boundary: x = ' + cp.boundary, panelX + 8, y);
    y += 22;

    // Left limit
    fill(0, 100, 200);
    text('Left limit:', panelX + 8, y);
    y += 14;
    textSize(13);
    text('lim- = ' + cp.leftLimit.toFixed(2), panelX + 12, y);
    y += 22;

    // Right limit
    textSize(11);
    fill(220, 120, 0);
    text('Right limit:', panelX + 8, y);
    y += 14;
    textSize(13);
    text('lim+ = ' + cp.rightLimit.toFixed(2), panelX + 12, y);
    y += 22;

    // Function value
    textSize(11);
    fill(0, 150, 0);
    text('Function value:', panelX + 8, y);
    y += 14;
    textSize(13);
    text('f(' + cp.boundary + ') = ' + cp.functionValue.toFixed(2), panelX + 12, y);
}

function drawConditionChecklist() {
    let cp = currentPreset;
    let panelX = canvasWidth - 135;
    let panelY = graphTop + 170;
    let panelW = 130;
    let panelH = 115;

    // Panel background
    fill(255, 255, 255, 245);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    noStroke();
    textSize(10);
    textAlign(LEFT, TOP);

    let y = panelY + 8;

    // Title
    fill(0);
    textSize(11);
    text('Continuity Check:', panelX + 8, y);
    y += 18;

    textSize(10);

    // Condition 1: f(a) exists
    let cond1Pass = true;  // In our presets, function is always defined
    if (checkStep >= 1) {
        fill(cond1Pass ? color(0, 150, 0) : color(200, 0, 0));
        text((cond1Pass ? 'O' : 'X') + ' f(' + cp.boundary + ') exists', panelX + 8, y);
    } else {
        fill(150);
        text('- f(' + cp.boundary + ') exists?', panelX + 8, y);
    }
    y += 16;

    // Condition 2: Limit exists (both sides equal)
    let cond2Pass = Math.abs(cp.leftLimit - cp.rightLimit) < 0.001;
    if (checkStep >= 2) {
        fill(cond2Pass ? color(0, 150, 0) : color(200, 0, 0));
        text((cond2Pass ? 'O' : 'X') + ' lim exists', panelX + 8, y);
        if (checkStep >= 3) {
            y += 12;
            textSize(9);
            fill(100);
            if (cond2Pass) {
                text('   (lim- = lim+)', panelX + 8, y);
            } else {
                text('   (lim- /= lim+)', panelX + 8, y);
            }
            textSize(10);
        }
    } else {
        fill(150);
        text('- lim exists?', panelX + 8, y);
    }
    y += 18;

    // Condition 3: f(a) = limit
    let cond3Pass = cond2Pass && Math.abs(cp.functionValue - cp.leftLimit) < 0.001;
    if (checkStep >= 3) {
        fill(cond3Pass ? color(0, 150, 0) : color(200, 0, 0));
        text((cond3Pass ? 'O' : 'X') + ' f(' + cp.boundary + ') = lim', panelX + 8, y);
    } else {
        fill(150);
        text('- f(' + cp.boundary + ') = lim?', panelX + 8, y);
    }
    y += 20;

    // Verdict
    if (checkStep >= 4) {
        let continuous = cond1Pass && cond2Pass && cond3Pass;
        fill(255, 255, 255);
        stroke(continuous ? color(0, 150, 0) : color(200, 0, 0));
        strokeWeight(2);
        rect(panelX + 5, y - 2, panelW - 10, 22, 4);

        noStroke();
        fill(continuous ? color(0, 150, 0) : color(200, 0, 0));
        textSize(12);
        textAlign(CENTER, CENTER);
        text(continuous ? 'CONTINUOUS' : 'DISCONTINUOUS', panelX + panelW/2, y + 8);
    }
}

function drawButtons() {
    textAlign(CENTER, CENTER);

    for (let btn of buttons) {
        // Button background
        let isHover = mouseX >= btn.x && mouseX <= btn.x + btn.w &&
                      mouseY >= btn.y && mouseY <= btn.y + btn.h;

        fill(isHover ? color(230, 230, 250) : color(245, 245, 245));
        stroke(150);
        strokeWeight(1);
        rect(btn.x, btn.y, btn.w, btn.h, 5);

        // Button text
        fill(50);
        noStroke();
        textSize(12);

        if (btn.isDropdown) {
            textAlign(LEFT, CENTER);
            text(currentPreset.name, btn.x + 10, btn.y + btn.h/2);
            // Dropdown arrow
            textAlign(RIGHT, CENTER);
            text(dropdownOpen ? '^' : 'v', btn.x + btn.w - 10, btn.y + btn.h/2);
        } else {
            textAlign(CENTER, CENTER);
            text(btn.label, btn.x + btn.w/2, btn.y + btn.h/2);
        }
    }

    // Slider label for approach distance (visual only, not interactive slider)
    fill(50);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Approach: ' + approachDistance.toFixed(2), 10, drawHeight + 95);

    // Slider track
    let sliderX = 100;
    let sliderW = canvasWidth - 140;
    let sliderY = drawHeight + 95;

    stroke(180);
    strokeWeight(2);
    line(sliderX, sliderY, sliderX + sliderW, sliderY);

    // Slider handle
    let handleX = map(approachDistance, 0.02, 0.5, sliderX, sliderX + sliderW);
    fill(100, 100, 200);
    noStroke();
    circle(handleX, sliderY, 14);
}

function drawDropdownMenu() {
    let btn = buttons.find(b => b.id === 'dropdown');
    let menuY = btn.y + btn.h;

    // Menu background
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(btn.x, menuY, btn.w, presets.length * 28, 5);

    // Menu items
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);

    for (let i = 0; i < presets.length; i++) {
        let itemY = menuY + i * 28;
        let isHover = mouseX >= btn.x && mouseX <= btn.x + btn.w &&
                      mouseY >= itemY && mouseY <= itemY + 28;

        if (isHover) {
            fill(230, 230, 250);
            rect(btn.x + 2, itemY + 2, btn.w - 4, 24, 3);
        }

        fill(i === currentPresetIndex ? color(0, 100, 200) : 50);
        text(presets[i].name, btn.x + 10, itemY + 14);
    }
}

function mousePressed() {
    // Check dropdown menu clicks first
    if (dropdownOpen) {
        let btn = buttons.find(b => b.id === 'dropdown');
        let menuY = btn.y + btn.h;

        for (let i = 0; i < presets.length; i++) {
            let itemY = menuY + i * 28;
            if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
                mouseY >= itemY && mouseY <= itemY + 28) {
                currentPresetIndex = i;
                currentPreset = presets[i];
                resetState();
                dropdownOpen = false;
                return;
            }
        }
        dropdownOpen = false;
        return;
    }

    // Check button clicks
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {

            if (btn.id === 'evaluate') {
                startEvaluation();
            } else if (btn.id === 'reset') {
                resetState();
            } else if (btn.id === 'dropdown') {
                dropdownOpen = !dropdownOpen;
            }
            return;
        }
    }

    // Check slider interaction
    let sliderX = 100;
    let sliderW = canvasWidth - 140;
    let sliderY = drawHeight + 95;

    if (mouseY >= sliderY - 10 && mouseY <= sliderY + 10 &&
        mouseX >= sliderX && mouseX <= sliderX + sliderW) {
        approachDistance = map(mouseX, sliderX, sliderX + sliderW, 0.02, 0.5);
        approachDistance = constrain(approachDistance, 0.02, 0.5);
    }
}

function mouseDragged() {
    // Slider dragging
    let sliderX = 100;
    let sliderW = canvasWidth - 140;
    let sliderY = drawHeight + 95;

    if (mouseY >= sliderY - 20 && mouseY <= sliderY + 20 &&
        mouseX >= sliderX - 10 && mouseX <= sliderX + sliderW + 10) {
        approachDistance = map(mouseX, sliderX, sliderX + sliderW, 0.02, 0.5);
        approachDistance = constrain(approachDistance, 0.02, 0.5);
        // Stop animation if user manually adjusts
        isAnimating = false;
    }
}

function startEvaluation() {
    isAnimating = true;
    animationPhase = 0;
    approachDistance = 0.5;
    checkStep = 0;
}

function resetState() {
    isAnimating = false;
    animationPhase = 0;
    approachDistance = 0.5;
    checkStep = 0;
    dropdownOpen = false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
