// Critical Point Finder MicroSim
// Help students identify critical points by finding where f'(x) = 0 or f'(x) doesn't exist.
// Bloom Level: Apply (L3), Verbs: solve, calculate, identify
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 520;  // Room for two graphs
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 100;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphGap = 30;  // Gap between the two graphs

// Top graph (f(x)) dimensions
let fGraphTop = 50;
let fGraphHeight = 180;
let fGraphBottom;

// Bottom graph (f'(x)) dimensions
let fpGraphTop;
let fpGraphHeight = 180;
let fpGraphBottom;

// Axis ranges
let xMin = -4;
let xMax = 4;
let yMinF = -8;
let yMaxF = 8;
let yMinFp = -8;
let yMaxFp = 8;

// Zoom level
let zoomLevel = 1;

// State variables
let showDerivativeGraph = true;
let showSolution = false;
let currentStep = 0;
let maxSteps = 0;

// Function selection
let functionTypes = ['Polynomial', 'Absolute Value', 'Rational', 'Piecewise'];
let currentTypeIndex = 0;
let currentFunctionIndex = 0;
let currentFunc = null;

// Critical points storage
let criticalPoints = [];
let solutionSteps = [];

// Control button positions and dimensions
let dropdownX, dropdownY, dropdownW = 130, dropdownH = 26;
let dropdownOpen = false;

let findButtonX, findButtonY, findButtonW = 130, findButtonH = 28;
let resetButtonX, resetButtonY, resetButtonW = 70, resetButtonH = 28;

let toggleX, toggleY, toggleW = 20, toggleH = 20;
let zoomSliderX, zoomSliderY, zoomSliderW, zoomSliderH = 20;

// Function definitions
let functions = {
    'Polynomial': [
        {
            f: x => Math.pow(x, 3) - 3*x,
            df: x => 3*Math.pow(x, 2) - 3,
            fStr: 'f(x) = x^3 - 3x',
            dfStr: "f'(x) = 3x^2 - 3",
            criticalPointsFn: () => [
                { x: -1, type: 'zero', fVal: 2, dfVal: 0 },
                { x: 1, type: 'zero', fVal: -2, dfVal: 0 }
            ],
            steps: [
                "Step 1: Find f'(x) = 3x^2 - 3",
                "Step 2: Set f'(x) = 0: 3x^2 - 3 = 0",
                "Step 3: Solve: 3(x^2 - 1) = 0",
                "Step 4: Factor: 3(x-1)(x+1) = 0",
                "Step 5: x = -1 or x = 1",
                "Critical points: (-1, 2) and (1, -2)"
            ]
        },
        {
            f: x => Math.pow(x, 4) - 4*Math.pow(x, 2),
            df: x => 4*Math.pow(x, 3) - 8*x,
            fStr: 'f(x) = x^4 - 4x^2',
            dfStr: "f'(x) = 4x^3 - 8x",
            criticalPointsFn: () => [
                { x: -Math.sqrt(2), type: 'zero', fVal: -4, dfVal: 0 },
                { x: 0, type: 'zero', fVal: 0, dfVal: 0 },
                { x: Math.sqrt(2), type: 'zero', fVal: -4, dfVal: 0 }
            ],
            steps: [
                "Step 1: Find f'(x) = 4x^3 - 8x",
                "Step 2: Set f'(x) = 0: 4x^3 - 8x = 0",
                "Step 3: Factor: 4x(x^2 - 2) = 0",
                "Step 4: Solve: x = 0 or x^2 = 2",
                "Step 5: x = 0, x = -sqrt(2), x = sqrt(2)",
                "Critical points at x = -1.41, 0, 1.41"
            ]
        },
        {
            f: x => Math.pow(x, 2) - 4*x + 3,
            df: x => 2*x - 4,
            fStr: 'f(x) = x^2 - 4x + 3',
            dfStr: "f'(x) = 2x - 4",
            criticalPointsFn: () => [
                { x: 2, type: 'zero', fVal: -1, dfVal: 0 }
            ],
            steps: [
                "Step 1: Find f'(x) = 2x - 4",
                "Step 2: Set f'(x) = 0: 2x - 4 = 0",
                "Step 3: Solve: 2x = 4",
                "Step 4: x = 2",
                "Step 5: f(2) = 4 - 8 + 3 = -1",
                "Critical point: (2, -1)"
            ]
        }
    ],
    'Absolute Value': [
        {
            f: x => Math.abs(x) - 2,
            df: x => x === 0 ? NaN : (x > 0 ? 1 : -1),
            fStr: 'f(x) = |x| - 2',
            dfStr: "f'(x) = x/|x| (undefined at 0)",
            criticalPointsFn: () => [
                { x: 0, type: 'dne', fVal: -2, dfVal: NaN }
            ],
            steps: [
                "Step 1: f(x) = |x| - 2 has a corner at x = 0",
                "Step 2: For x > 0: f'(x) = 1",
                "Step 3: For x < 0: f'(x) = -1",
                "Step 4: Left limit ≠ Right limit at x = 0",
                "Step 5: f'(0) does not exist (DNE)",
                "Critical point: (0, -2) where f'(x) DNE"
            ]
        },
        {
            f: x => Math.abs(x - 1) + Math.abs(x + 1) - 4,
            df: x => {
                if (x < -1) return -2;
                if (x > 1) return 2;
                return 0;
            },
            fStr: 'f(x) = |x-1| + |x+1| - 4',
            dfStr: "f'(x) = sgn(x-1) + sgn(x+1)",
            criticalPointsFn: () => [
                { x: -1, type: 'dne', fVal: -2, dfVal: NaN },
                { x: 1, type: 'dne', fVal: -2, dfVal: NaN }
            ],
            steps: [
                "Step 1: Corners occur at x = -1 and x = 1",
                "Step 2: For x < -1: f'(x) = -2",
                "Step 3: For -1 < x < 1: f'(x) = 0",
                "Step 4: For x > 1: f'(x) = 2",
                "Step 5: f' is undefined at x = -1 and x = 1",
                "Critical points: (-1, -2) and (1, -2) - DNE"
            ]
        }
    ],
    'Rational': [
        {
            f: x => x === 0 ? NaN : x + 1/x,
            df: x => x === 0 ? NaN : 1 - 1/(x*x),
            fStr: 'f(x) = x + 1/x',
            dfStr: "f'(x) = 1 - 1/x^2",
            criticalPointsFn: () => [
                { x: -1, type: 'zero', fVal: -2, dfVal: 0 },
                { x: 1, type: 'zero', fVal: 2, dfVal: 0 }
            ],
            steps: [
                "Step 1: Find f'(x) = 1 - 1/x^2",
                "Step 2: Set f'(x) = 0: 1 - 1/x^2 = 0",
                "Step 3: Solve: 1/x^2 = 1",
                "Step 4: x^2 = 1",
                "Step 5: x = 1 or x = -1",
                "Critical points: (-1, -2) and (1, 2)"
            ]
        },
        {
            f: x => Math.pow(x, 2) / (x*x + 1),
            df: x => (2*x) / Math.pow(x*x + 1, 2),
            fStr: 'f(x) = x^2/(x^2+1)',
            dfStr: "f'(x) = 2x/(x^2+1)^2",
            criticalPointsFn: () => [
                { x: 0, type: 'zero', fVal: 0, dfVal: 0 }
            ],
            steps: [
                "Step 1: Use quotient rule",
                "Step 2: f'(x) = 2x/(x^2+1)^2",
                "Step 3: Set f'(x) = 0: numerator = 0",
                "Step 4: 2x = 0",
                "Step 5: x = 0",
                "Critical point: (0, 0)"
            ]
        }
    ],
    'Piecewise': [
        {
            f: x => x < 0 ? -x*x : x*x,
            df: x => x === 0 ? NaN : (x < 0 ? -2*x : 2*x),
            fStr: 'f(x) = -x^2 if x<0, x^2 if x>=0',
            dfStr: "f'(x) = -2x if x<0, 2x if x>0",
            criticalPointsFn: () => [
                { x: 0, type: 'dne', fVal: 0, dfVal: NaN }
            ],
            steps: [
                "Step 1: Check continuity at x = 0: lim = 0 = f(0) ✓",
                "Step 2: Left derivative: lim -2x as x→0- = 0",
                "Step 3: Right derivative: lim 2x as x→0+ = 0",
                "Step 4: Both derivatives equal at x = 0",
                "Step 5: Actually differentiable! f'(0) = 0",
                "Critical point: (0, 0) where f'(x) = 0"
            ]
        },
        {
            f: x => x < 1 ? Math.pow(x, 2) : 2*x - 1,
            df: x => x === 1 ? NaN : (x < 1 ? 2*x : 2),
            fStr: 'f(x) = x^2 if x<1, 2x-1 if x>=1',
            dfStr: "f'(x) = 2x if x<1, 2 if x>1",
            criticalPointsFn: () => [
                { x: 0, type: 'zero', fVal: 0, dfVal: 0 }
            ],
            steps: [
                "Step 1: Check for f'(x) = 0: 2x = 0 → x = 0",
                "Step 2: Check continuity at x = 1",
                "Step 3: f(1-) = 1, f(1) = 1 ✓ continuous",
                "Step 4: Left derivative at 1: 2(1) = 2",
                "Step 5: Right derivative at 1: 2 (they match!)",
                "Critical point: (0, 0) where f'(x) = 0"
            ]
        }
    ]
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize with first function
    selectFunction(0, 0);
    updateControlPositions();

    describe('Interactive critical point finder showing f(x) and f\'(x) graphs with step-by-step solutions', LABEL);
}

function selectFunction(typeIndex, funcIndex) {
    currentTypeIndex = typeIndex;
    let type = functionTypes[typeIndex];
    let funcList = functions[type];
    currentFunctionIndex = funcIndex % funcList.length;
    currentFunc = funcList[currentFunctionIndex];

    // Reset solution state
    showSolution = false;
    currentStep = 0;
    solutionSteps = currentFunc.steps;
    maxSteps = solutionSteps.length;
    criticalPoints = currentFunc.criticalPointsFn();
}

function updateControlPositions() {
    // Row 1: Dropdown and Find button
    dropdownX = 10;
    dropdownY = drawHeight + 10;

    findButtonX = dropdownX + dropdownW + 15;
    findButtonY = drawHeight + 10;

    resetButtonX = findButtonX + findButtonW + 10;
    resetButtonY = drawHeight + 10;

    // Row 2: Toggle and zoom slider
    toggleX = 10;
    toggleY = drawHeight + 48;

    zoomSliderX = 180;
    zoomSliderY = drawHeight + 55;
    zoomSliderW = canvasWidth - zoomSliderX - 30;
}

function draw() {
    updateCanvasSize();

    // Update graph dimensions
    graphRight = canvasWidth - 40;
    fGraphBottom = fGraphTop + fGraphHeight;
    fpGraphTop = fGraphBottom + graphGap;
    fpGraphBottom = fpGraphTop + fpGraphHeight;

    // Apply zoom
    let zoomedXMin = xMin / zoomLevel;
    let zoomedXMax = xMax / zoomLevel;

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Draw title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Critical Point Finder', canvasWidth / 2, 8);

    textSize(13);
    fill(80);
    text(currentFunc.fStr, canvasWidth / 2, 30);

    // Draw f(x) graph
    drawGraph('f(x)', fGraphTop, fGraphBottom, yMinF, yMaxF, zoomedXMin, zoomedXMax, true);

    // Draw f'(x) graph if toggled on
    if (showDerivativeGraph) {
        drawGraph("f'(x)", fpGraphTop, fpGraphBottom, yMinFp, yMaxFp, zoomedXMin, zoomedXMax, false);
    }

    // Draw critical points if solution is showing
    if (showSolution && currentStep > 0) {
        drawCriticalPoints(zoomedXMin, zoomedXMax);
    }

    // Draw solution steps panel
    if (showSolution) {
        drawSolutionPanel();
    }

    // Draw controls
    drawControls();
}

function drawGraph(label, gTop, gBottom, yMin, yMax, xMinZ, xMaxZ, isF) {
    // Graph background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(graphLeft, gTop, graphRight - graphLeft, gBottom - gTop);

    // Grid lines
    stroke(230);
    strokeWeight(0.5);

    // Vertical grid
    for (let x = Math.ceil(xMinZ); x <= xMaxZ; x++) {
        let px = map(x, xMinZ, xMaxZ, graphLeft, graphRight);
        if (px >= graphLeft && px <= graphRight) {
            line(px, gTop, px, gBottom);
        }
    }

    // Horizontal grid
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
        let py = map(y, yMin, yMax, gBottom, gTop);
        if (py >= gTop && py <= gBottom) {
            line(graphLeft, py, graphRight, py);
        }
    }

    // Axes
    stroke(0);
    strokeWeight(1.5);

    // X-axis (y=0)
    let y0 = map(0, yMin, yMax, gBottom, gTop);
    if (y0 >= gTop && y0 <= gBottom) {
        line(graphLeft, y0, graphRight, y0);
    }

    // Y-axis (x=0)
    let x0 = map(0, xMinZ, xMaxZ, graphLeft, graphRight);
    if (x0 >= graphLeft && x0 <= graphRight) {
        line(x0, gTop, x0, gBottom);
    }

    // Axis labels
    fill(0);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);

    // X-axis labels
    let yLabelPos = y0 >= gTop && y0 <= gBottom ? y0 + 3 : gBottom - 12;
    for (let x = Math.ceil(xMinZ); x <= xMaxZ; x++) {
        if (x !== 0) {
            let px = map(x, xMinZ, xMaxZ, graphLeft, graphRight);
            if (px >= graphLeft + 10 && px <= graphRight - 10) {
                text(x, px, yLabelPos);
            }
        }
    }

    // Y-axis labels
    textAlign(RIGHT, CENTER);
    let xLabelPos = x0 >= graphLeft && x0 <= graphRight ? x0 - 5 : graphLeft + 15;
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
        if (y !== 0) {
            let py = map(y, yMin, yMax, gBottom, gTop);
            if (py >= gTop + 10 && py <= gBottom - 10) {
                text(y, xLabelPos, py);
            }
        }
    }

    // Graph label
    fill(50);
    textSize(14);
    textAlign(LEFT, TOP);
    noStroke();
    text(label, graphLeft + 5, gTop + 5);

    // Draw y=0 line for derivative graph (to see where f'(x) = 0)
    if (!isF) {
        stroke(200, 100, 100);
        strokeWeight(1);
        drawingContext.setLineDash([4, 4]);
        if (y0 >= gTop && y0 <= gBottom) {
            line(graphLeft, y0, graphRight, y0);
        }
        drawingContext.setLineDash([]);
    }

    // Draw function curve
    stroke(isF ? color(0, 100, 200) : color(200, 100, 50));
    strokeWeight(2.5);
    noFill();

    beginShape();
    let lastValid = false;
    for (let px = graphLeft; px <= graphRight; px += 1) {
        let x = map(px, graphLeft, graphRight, xMinZ, xMaxZ);
        let y;
        if (isF) {
            y = currentFunc.f(x);
        } else {
            y = currentFunc.df(x);
        }

        if (isFinite(y) && !isNaN(y)) {
            let py = map(y, yMin, yMax, gBottom, gTop);
            if (py >= gTop - 5 && py <= gBottom + 5) {
                if (!lastValid) {
                    endShape();
                    beginShape();
                }
                vertex(px, constrain(py, gTop, gBottom));
                lastValid = true;
            } else {
                if (lastValid) {
                    endShape();
                    beginShape();
                }
                lastValid = false;
            }
        } else {
            if (lastValid) {
                endShape();
                beginShape();
            }
            lastValid = false;
        }
    }
    endShape();
}

function drawCriticalPoints(xMinZ, xMaxZ) {
    for (let cp of criticalPoints) {
        let px = map(cp.x, xMinZ, xMaxZ, graphLeft, graphRight);

        if (px < graphLeft || px > graphRight) continue;

        // Vertical dashed line through both graphs
        stroke(100, 180, 100);
        strokeWeight(2);
        drawingContext.setLineDash([6, 4]);

        // Line through f(x) graph
        line(px, fGraphTop, px, fGraphBottom);

        // Line through f'(x) graph if showing
        if (showDerivativeGraph) {
            line(px, fpGraphTop, px, fpGraphBottom);
        }

        drawingContext.setLineDash([]);

        // Mark point on f(x)
        let pyF = map(cp.fVal, yMinF, yMaxF, fGraphBottom, fGraphTop);
        if (pyF >= fGraphTop && pyF <= fGraphBottom) {
            fill(100, 180, 100);
            noStroke();
            circle(px, pyF, 12);

            // Label
            fill(30, 100, 50);
            textSize(11);
            textAlign(LEFT, BOTTOM);
            noStroke();
            let label = '(' + cp.x.toFixed(2) + ', ' + cp.fVal.toFixed(2) + ')';
            text(label, px + 8, pyF - 5);
        }

        // Mark point on f'(x) if showing
        if (showDerivativeGraph) {
            let pyFp;
            if (cp.type === 'zero') {
                pyFp = map(0, yMinFp, yMaxFp, fpGraphBottom, fpGraphTop);
            } else {
                // DNE - draw open circle
                pyFp = map(0, yMinFp, yMaxFp, fpGraphBottom, fpGraphTop);
            }

            if (pyFp >= fpGraphTop && pyFp <= fpGraphBottom) {
                if (cp.type === 'zero') {
                    fill(200, 100, 50);
                    noStroke();
                    circle(px, pyFp, 10);

                    // Label
                    fill(150, 50, 0);
                    textSize(10);
                    textAlign(LEFT, TOP);
                    text("f'=0", px + 6, pyFp + 2);
                } else {
                    // Open circle for DNE
                    fill(255);
                    stroke(200, 50, 50);
                    strokeWeight(2);
                    circle(px, pyFp, 10);

                    // Label
                    fill(180, 50, 50);
                    noStroke();
                    textSize(10);
                    textAlign(LEFT, TOP);
                    text("f' DNE", px + 6, pyFp + 2);
                }
            }
        }
    }
}

function drawSolutionPanel() {
    // Panel on the right side
    let panelWidth = min(220, canvasWidth * 0.45);
    let panelX = canvasWidth - panelWidth - 10;
    let panelY = fGraphTop;
    let panelHeight = min(currentStep + 1, maxSteps) * 22 + 50;

    // Background
    fill(255, 255, 255, 245);
    stroke(150);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    // Header
    fill(0);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Solution Steps:', panelX + 10, panelY + 8);

    // Steps
    textSize(11);
    let yPos = panelY + 30;
    for (let i = 0; i < min(currentStep, maxSteps); i++) {
        fill(i === currentStep - 1 ? color(0, 100, 180) : color(60));
        text(solutionSteps[i], panelX + 10, yPos, panelWidth - 20, 50);
        yPos += 22;
    }

    // Next step button if not done
    if (currentStep < maxSteps) {
        let btnX = panelX + 10;
        let btnY = yPos + 5;
        let btnW = 90;
        let btnH = 24;

        fill(80, 140, 200);
        stroke(60, 100, 160);
        strokeWeight(1);
        rect(btnX, btnY, btnW, btnH, 4);

        fill(255);
        noStroke();
        textSize(12);
        textAlign(CENTER, CENTER);
        text('Next Step', btnX + btnW/2, btnY + btnH/2);
    } else {
        fill(50, 150, 80);
        textSize(12);
        textAlign(LEFT, TOP);
        noStroke();
        text('Solution complete!', panelX + 10, yPos + 5);
    }
}

function drawControls() {
    // Row 1: Dropdown
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Function:', 10, drawHeight + 23);

    // Dropdown button (showing current type)
    let dropX = 80;
    fill(dropdownOpen ? color(230) : color(245));
    stroke(180);
    strokeWeight(1);
    rect(dropX, dropdownY, dropdownW, dropdownH, 4);

    fill(0);
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text(functionTypes[currentTypeIndex], dropX + 8, dropdownY + dropdownH/2);

    // Dropdown arrow
    fill(100);
    noStroke();
    let arrowX = dropX + dropdownW - 18;
    let arrowY = dropdownY + dropdownH/2;
    triangle(arrowX, arrowY - 3, arrowX + 8, arrowY - 3, arrowX + 4, arrowY + 4);

    // Dropdown menu if open
    if (dropdownOpen) {
        for (let i = 0; i < functionTypes.length; i++) {
            let optY = dropdownY + dropdownH + i * 24;
            fill(i === currentTypeIndex ? color(200, 220, 255) : color(255));
            stroke(180);
            strokeWeight(1);
            rect(dropX, optY, dropdownW, 24);

            fill(0);
            noStroke();
            textSize(13);
            textAlign(LEFT, CENTER);
            text(functionTypes[i], dropX + 8, optY + 12);
        }
    }

    // Find Critical Points button
    let findX = dropX + dropdownW + 10;
    fill(showSolution ? color(180) : color(100, 140, 200));
    stroke(80, 100, 160);
    strokeWeight(1);
    rect(findX, findButtonY, findButtonW, findButtonH, 4);

    fill(255);
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    text('Find Critical Pts', findX + findButtonW/2, findButtonY + findButtonH/2);

    // Reset button
    let resetX = findX + findButtonW + 10;
    fill(color(180, 100, 100));
    stroke(140, 70, 70);
    strokeWeight(1);
    rect(resetX, resetButtonY, resetButtonW, resetButtonH, 4);

    fill(255);
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    text('Reset', resetX + resetButtonW/2, resetButtonY + resetButtonH/2);

    // Row 2: Toggle for derivative graph
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text("Show f'(x):", 10, drawHeight + 60);

    // Toggle checkbox
    let chkX = 90;
    let chkY = drawHeight + 50;
    fill(showDerivativeGraph ? color(80, 140, 200) : color(255));
    stroke(showDerivativeGraph ? color(60, 100, 160) : color(180));
    strokeWeight(1);
    rect(chkX, chkY, toggleW, toggleH, 3);

    if (showDerivativeGraph) {
        stroke(255);
        strokeWeight(2);
        line(chkX + 4, chkY + toggleH/2, chkX + 8, chkY + toggleH - 4);
        line(chkX + 8, chkY + toggleH - 4, chkX + toggleW - 4, chkY + 4);
    }

    // Zoom slider
    fill('black');
    noStroke();
    textSize(14);
    textAlign(LEFT, CENTER);
    text('Zoom: ' + zoomLevel.toFixed(1) + 'x', 130, drawHeight + 60);

    // Slider track
    let sliderX = 220;
    let sliderY = drawHeight + 55;
    let sliderW = canvasWidth - sliderX - 20;

    fill(220);
    noStroke();
    rect(sliderX, sliderY, sliderW, 10, 5);

    // Slider knob
    let knobX = map(zoomLevel, 0.5, 3, sliderX, sliderX + sliderW);
    fill(100, 140, 200);
    stroke(80, 100, 160);
    strokeWeight(1);
    circle(knobX, sliderY + 5, 16);

    // Row 3: Next/Prev function buttons
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);

    let navY = drawHeight + 82;

    // Prev button
    fill(color(150));
    stroke(120);
    strokeWeight(1);
    rect(10, navY - 10, 50, 22, 4);
    fill(255);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text('< Prev', 35, navY);

    // Function counter
    fill('black');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    let funcList = functions[functionTypes[currentTypeIndex]];
    text((currentFunctionIndex + 1) + '/' + funcList.length, 90, navY);

    // Next button
    fill(color(150));
    stroke(120);
    strokeWeight(1);
    rect(115, navY - 10, 50, 22, 4);
    fill(255);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text('Next >', 140, navY);

    // Derivative formula display
    fill(80);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text(currentFunc.dfStr, 180, navY);
}

function mousePressed() {
    // Check if click is in control region
    if (mouseY > drawHeight) {
        let dropX = 80;

        // Check dropdown
        if (mouseX >= dropX && mouseX <= dropX + dropdownW &&
            mouseY >= dropdownY && mouseY <= dropdownY + dropdownH) {
            dropdownOpen = !dropdownOpen;
            return;
        }

        // Check dropdown options if open
        if (dropdownOpen) {
            for (let i = 0; i < functionTypes.length; i++) {
                let optY = dropdownY + dropdownH + i * 24;
                if (mouseX >= dropX && mouseX <= dropX + dropdownW &&
                    mouseY >= optY && mouseY <= optY + 24) {
                    currentTypeIndex = i;
                    selectFunction(i, 0);
                    dropdownOpen = false;
                    return;
                }
            }
        }

        dropdownOpen = false;

        // Check Find button
        let findX = dropX + dropdownW + 10;
        if (mouseX >= findX && mouseX <= findX + findButtonW &&
            mouseY >= findButtonY && mouseY <= findButtonY + findButtonH) {
            if (!showSolution) {
                showSolution = true;
                currentStep = 1;
            }
            return;
        }

        // Check Reset button
        let resetX = findX + findButtonW + 10;
        if (mouseX >= resetX && mouseX <= resetX + resetButtonW &&
            mouseY >= resetButtonY && mouseY <= resetButtonY + resetButtonH) {
            showSolution = false;
            currentStep = 0;
            return;
        }

        // Check toggle
        let chkX = 90;
        let chkY = drawHeight + 50;
        if (mouseX >= chkX && mouseX <= chkX + toggleW &&
            mouseY >= chkY && mouseY <= chkY + toggleH) {
            showDerivativeGraph = !showDerivativeGraph;
            return;
        }

        // Check prev/next buttons
        let navY = drawHeight + 82;
        if (mouseY >= navY - 10 && mouseY <= navY + 12) {
            if (mouseX >= 10 && mouseX <= 60) {
                // Prev
                let funcList = functions[functionTypes[currentTypeIndex]];
                currentFunctionIndex = (currentFunctionIndex - 1 + funcList.length) % funcList.length;
                selectFunction(currentTypeIndex, currentFunctionIndex);
                return;
            }
            if (mouseX >= 115 && mouseX <= 165) {
                // Next
                let funcList = functions[functionTypes[currentTypeIndex]];
                currentFunctionIndex = (currentFunctionIndex + 1) % funcList.length;
                selectFunction(currentTypeIndex, currentFunctionIndex);
                return;
            }
        }

        return;
    }

    // Check solution panel "Next Step" button
    if (showSolution && currentStep < maxSteps) {
        let panelWidth = min(220, canvasWidth * 0.45);
        let panelX = canvasWidth - panelWidth - 10;
        let btnX = panelX + 10;
        let btnY = fGraphTop + 30 + currentStep * 22 + 5;
        let btnW = 90;
        let btnH = 24;

        if (mouseX >= btnX && mouseX <= btnX + btnW &&
            mouseY >= btnY && mouseY <= btnY + btnH) {
            currentStep++;
            return;
        }
    }
}

function mouseDragged() {
    // Handle zoom slider
    let sliderX = 220;
    let sliderY = drawHeight + 55;
    let sliderW = canvasWidth - sliderX - 20;

    if (mouseY >= sliderY - 10 && mouseY <= sliderY + 20 &&
        mouseX >= sliderX - 10 && mouseX <= sliderX + sliderW + 10) {
        zoomLevel = constrain(map(mouseX, sliderX, sliderX + sliderW, 0.5, 3), 0.5, 3);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateControlPositions();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
