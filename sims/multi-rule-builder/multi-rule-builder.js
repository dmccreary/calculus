// Multi-Rule Builder MicroSim
// Step-by-step tool showing how multiple derivative rules combine
// to differentiate complex functions
// Bloom Level: Apply (L3), Verbs: apply, execute, implement
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Preset functions with their derivation steps
let functions = [
    {
        name: "x^2 sin(x)",
        displayName: "x\u00B2 sin(x)",
        steps: [
            { rule: "Identify", description: "Product of x\u00B2 and sin(x)", highlight: "both", partial: "x\u00B2 \u00B7 sin(x)" },
            { rule: "Product Rule", description: "Apply: (f\u00B7g)' = f'\u00B7g + f\u00B7g'", highlight: "formula", partial: "(x\u00B2)' \u00B7 sin(x) + x\u00B2 \u00B7 (sin(x))'" },
            { rule: "Power Rule", description: "Compute (x\u00B2)' = 2x", highlight: "left", partial: "2x \u00B7 sin(x) + x\u00B2 \u00B7 (sin(x))'" },
            { rule: "Trig Rule", description: "Compute (sin(x))' = cos(x)", highlight: "right", partial: "2x \u00B7 sin(x) + x\u00B2 \u00B7 cos(x)" },
            { rule: "Simplify", description: "Final answer", highlight: "final", partial: "2x sin(x) + x\u00B2 cos(x)" }
        ]
    },
    {
        name: "e^x / x",
        displayName: "e\u02E3 / x",
        steps: [
            { rule: "Identify", description: "Quotient of e\u02E3 and x", highlight: "both", partial: "e\u02E3 / x" },
            { rule: "Quotient Rule", description: "Apply: (f/g)' = (f'\u00B7g - f\u00B7g')/g\u00B2", highlight: "formula", partial: "((e\u02E3)' \u00B7 x - e\u02E3 \u00B7 (x)') / x\u00B2" },
            { rule: "Exp Rule", description: "Compute (e\u02E3)' = e\u02E3", highlight: "left", partial: "(e\u02E3 \u00B7 x - e\u02E3 \u00B7 (x)') / x\u00B2" },
            { rule: "Power Rule", description: "Compute (x)' = 1", highlight: "right", partial: "(e\u02E3 \u00B7 x - e\u02E3 \u00B7 1) / x\u00B2" },
            { rule: "Factor", description: "Factor out e\u02E3", highlight: "simplify", partial: "e\u02E3(x - 1) / x\u00B2" },
            { rule: "Simplify", description: "Final answer", highlight: "final", partial: "(x - 1)e\u02E3 / x\u00B2" }
        ]
    },
    {
        name: "sin(x^2)",
        displayName: "sin(x\u00B2)",
        steps: [
            { rule: "Identify", description: "Composition: sin of x\u00B2", highlight: "both", partial: "sin(x\u00B2)" },
            { rule: "Chain Rule", description: "Apply: (f(g))' = f'(g) \u00B7 g'", highlight: "formula", partial: "cos(x\u00B2) \u00B7 (x\u00B2)'" },
            { rule: "Outer Deriv", description: "Derivative of sin is cos", highlight: "left", partial: "cos(x\u00B2) \u00B7 (x\u00B2)'" },
            { rule: "Inner Deriv", description: "Compute (x\u00B2)' = 2x", highlight: "right", partial: "cos(x\u00B2) \u00B7 2x" },
            { rule: "Simplify", description: "Final answer", highlight: "final", partial: "2x cos(x\u00B2)" }
        ]
    },
    {
        name: "x^3 e^x",
        displayName: "x\u00B3 e\u02E3",
        steps: [
            { rule: "Identify", description: "Product of x\u00B3 and e\u02E3", highlight: "both", partial: "x\u00B3 \u00B7 e\u02E3" },
            { rule: "Product Rule", description: "Apply: (f\u00B7g)' = f'\u00B7g + f\u00B7g'", highlight: "formula", partial: "(x\u00B3)' \u00B7 e\u02E3 + x\u00B3 \u00B7 (e\u02E3)'" },
            { rule: "Power Rule", description: "Compute (x\u00B3)' = 3x\u00B2", highlight: "left", partial: "3x\u00B2 \u00B7 e\u02E3 + x\u00B3 \u00B7 (e\u02E3)'" },
            { rule: "Exp Rule", description: "Compute (e\u02E3)' = e\u02E3", highlight: "right", partial: "3x\u00B2 \u00B7 e\u02E3 + x\u00B3 \u00B7 e\u02E3" },
            { rule: "Factor", description: "Factor out e\u02E3", highlight: "simplify", partial: "e\u02E3(3x\u00B2 + x\u00B3)" },
            { rule: "Simplify", description: "Final answer", highlight: "final", partial: "x\u00B2(3 + x)e\u02E3" }
        ]
    },
    {
        name: "ln(x) / x^2",
        displayName: "ln(x) / x\u00B2",
        steps: [
            { rule: "Identify", description: "Quotient of ln(x) and x\u00B2", highlight: "both", partial: "ln(x) / x\u00B2" },
            { rule: "Quotient Rule", description: "Apply: (f/g)' = (f'\u00B7g - f\u00B7g')/g\u00B2", highlight: "formula", partial: "((ln x)' \u00B7 x\u00B2 - ln(x) \u00B7 (x\u00B2)') / x\u2074" },
            { rule: "Log Rule", description: "Compute (ln x)' = 1/x", highlight: "left", partial: "((1/x) \u00B7 x\u00B2 - ln(x) \u00B7 (x\u00B2)') / x\u2074" },
            { rule: "Power Rule", description: "Compute (x\u00B2)' = 2x", highlight: "right", partial: "((1/x) \u00B7 x\u00B2 - ln(x) \u00B7 2x) / x\u2074" },
            { rule: "Simplify Num", description: "Simplify: x - 2x ln(x)", highlight: "simplify", partial: "(x - 2x ln(x)) / x\u2074" },
            { rule: "Factor", description: "Factor out x", highlight: "simplify", partial: "x(1 - 2 ln(x)) / x\u2074" },
            { rule: "Simplify", description: "Final answer", highlight: "final", partial: "(1 - 2 ln(x)) / x\u00B3" }
        ]
    }
];

// State
let currentFunctionIndex = 0;
let currentStep = 0;
let showAllSteps = false;

// UI elements - canvas-based buttons and dropdown
let dropdownOpen = false;
let dropdownY;
let buttonY1, buttonY2;

// Tree visualization parameters
let treeX, treeY, treeWidth, treeHeight;

// Colors
let ruleColors = {
    "Identify": [100, 150, 200],
    "Product Rule": [220, 120, 60],
    "Quotient Rule": [180, 80, 160],
    "Chain Rule": [80, 160, 120],
    "Power Rule": [60, 140, 200],
    "Trig Rule": [200, 100, 150],
    "Exp Rule": [150, 180, 80],
    "Log Rule": [100, 180, 180],
    "Outer Deriv": [80, 160, 120],
    "Inner Deriv": [120, 200, 160],
    "Factor": [180, 140, 100],
    "Simplify Num": [160, 160, 100],
    "Simplify": [100, 200, 100]
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    describe('Step-by-step derivative rule builder showing how multiple rules combine to differentiate complex functions', LABEL);
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

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Multi-Rule Derivative Builder', canvasWidth / 2, 8);
    textSize(14);
    fill(80);
    text('Step through complex derivatives', canvasWidth / 2, 32);

    // Calculate layout regions
    treeX = margin;
    treeY = 60;
    treeWidth = canvasWidth * 0.4 - margin;
    treeHeight = drawHeight - treeY - 20;

    // Draw main content
    drawFunctionDisplay();
    drawTreeDiagram();
    drawStepsPanel();
    drawControlsCanvas();

    // Draw dropdown menu if open (on top of everything)
    if (dropdownOpen) {
        drawDropdownMenu();
    }
}

function drawFunctionDisplay() {
    let func = functions[currentFunctionIndex];

    // Function box
    let boxX = margin;
    let boxY = treeY;
    let boxW = treeWidth;
    let boxH = 50;

    fill(255, 255, 255, 230);
    stroke(150);
    strokeWeight(1);
    rect(boxX, boxY, boxW, boxH, 8);

    // Function label
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text("f(x) = " + func.displayName, boxX + boxW / 2, boxY + boxH / 2);
}

function drawTreeDiagram() {
    let func = functions[currentFunctionIndex];
    let step = func.steps[Math.min(currentStep, func.steps.length - 1)];

    let treeStartY = treeY + 65;
    let treeAreaH = treeHeight - 65;

    // Background for tree area
    fill(255, 255, 255, 150);
    stroke(200);
    strokeWeight(1);
    rect(treeX, treeStartY, treeWidth, treeAreaH, 8);

    // Tree title
    fill(0);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text("Function Structure", treeX + treeWidth / 2, treeStartY + 5);

    // Draw simplified tree based on function type
    let centerX = treeX + treeWidth / 2;
    let topY = treeStartY + 35;

    // Root node (operation)
    let opName = getOperationType(func.name);
    drawTreeNode(centerX, topY, opName, step.highlight === "formula" ? [255, 200, 100] : [200, 200, 200]);

    // Child nodes
    let childY = topY + 60;
    let spread = treeWidth * 0.35;

    let parts = getFunctionParts(func.name);

    // Left child
    let leftColor = (step.highlight === "left" || step.highlight === "both") ? [100, 200, 150] : [220, 220, 220];
    drawTreeNode(centerX - spread, childY, parts[0], leftColor);

    // Right child
    let rightColor = (step.highlight === "right" || step.highlight === "both") ? [150, 180, 220] : [220, 220, 220];
    drawTreeNode(centerX + spread, childY, parts[1], rightColor);

    // Connect lines
    stroke(150);
    strokeWeight(2);
    line(centerX, topY + 15, centerX - spread, childY - 15);
    line(centerX, topY + 15, centerX + spread, childY - 15);

    // Final result indicator
    if (step.highlight === "final" || step.highlight === "simplify") {
        let resultY = childY + 55;
        fill(100, 200, 100, 200);
        noStroke();
        rect(treeX + 10, resultY, treeWidth - 20, 30, 5);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(11);
        text("Result combined", centerX, resultY + 15);
    }
}

function drawTreeNode(x, y, label, col) {
    fill(col[0], col[1], col[2]);
    stroke(100);
    strokeWeight(1);
    ellipse(x, y, 60, 30);

    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(label, x, y);
}

function getOperationType(funcName) {
    if (funcName.includes('/')) return '\u00F7';
    if (funcName.includes('sin(x^') || funcName.includes('cos(x^')) return '\u2218';
    return '\u00D7';
}

function getFunctionParts(funcName) {
    if (funcName === "x^2 sin(x)") return ["x\u00B2", "sin(x)"];
    if (funcName === "e^x / x") return ["e\u02E3", "x"];
    if (funcName === "sin(x^2)") return ["sin", "x\u00B2"];
    if (funcName === "x^3 e^x") return ["x\u00B3", "e\u02E3"];
    if (funcName === "ln(x) / x^2") return ["ln(x)", "x\u00B2"];
    return ["f", "g"];
}

function drawStepsPanel() {
    let func = functions[currentFunctionIndex];
    let panelX = canvasWidth * 0.4 + 10;
    let panelY = treeY;
    let panelW = canvasWidth - panelX - margin;
    let panelH = drawHeight - treeY - 20;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Panel title
    fill(0);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text("Derivation Steps", panelX + panelW / 2, panelY + 8);

    // Steps list
    let stepY = panelY + 35;
    let lineHeight = 42;
    let maxVisible = showAllSteps ? func.steps.length : currentStep + 1;

    for (let i = 0; i < Math.min(maxVisible, func.steps.length); i++) {
        let step = func.steps[i];
        let isCurrent = (i === currentStep) && !showAllSteps;
        let isFinal = (i === func.steps.length - 1) && (showAllSteps || currentStep >= func.steps.length - 1);

        // Step box
        let boxY = stepY + i * lineHeight;
        if (boxY + lineHeight - 5 > panelY + panelH) break;

        let col = ruleColors[step.rule] || [150, 150, 150];

        if (isCurrent) {
            fill(col[0], col[1], col[2], 80);
            stroke(col[0], col[1], col[2]);
            strokeWeight(2);
        } else if (isFinal) {
            fill(100, 200, 100, 100);
            stroke(80, 180, 80);
            strokeWeight(2);
        } else {
            fill(245);
            stroke(200);
            strokeWeight(1);
        }
        rect(panelX + 5, boxY, panelW - 10, lineHeight - 5, 5);

        // Step number and rule
        fill(isCurrent ? [50, 50, 50] : (isFinal ? [0, 100, 0] : [80, 80, 80]));
        noStroke();
        textAlign(LEFT, TOP);
        textSize(11);
        text((i + 1) + ". " + step.rule, panelX + 10, boxY + 4);

        // Description
        textSize(10);
        fill(100);
        text(step.description, panelX + 10, boxY + 17);

        // Partial result
        textSize(10);
        fill(isFinal ? [0, 120, 0] : [60, 60, 60]);
        textAlign(LEFT, TOP);
        let partialText = step.partial;
        if (partialText.length > 28) {
            partialText = partialText.substring(0, 25) + "...";
        }
        text(partialText, panelX + 10, boxY + 29);
    }

    // Progress indicator
    let progress = (currentStep + 1) / func.steps.length;
    if (showAllSteps) progress = 1;

    let barY = panelY + panelH - 15;
    fill(220);
    noStroke();
    rect(panelX + 10, barY, panelW - 20, 8, 4);

    fill(100, 180, 100);
    rect(panelX + 10, barY, (panelW - 20) * progress, 8, 4);

    // Step counter
    fill(100);
    textAlign(CENTER, TOP);
    textSize(10);
    let stepText = showAllSteps ? "Complete!" : "Step " + (currentStep + 1) + " of " + func.steps.length;
    text(stepText, panelX + panelW / 2, barY - 12);
}

function drawControlsCanvas() {
    // Row 1: Function dropdown
    let row1Y = drawHeight + 10;
    dropdownY = row1Y;

    // Dropdown button
    fill(240);
    stroke(180);
    strokeWeight(1);
    rect(10, row1Y, 200, 28, 5);

    fill(0);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(functions[currentFunctionIndex].displayName, 20, row1Y + 14);

    // Dropdown arrow
    fill(100);
    textAlign(RIGHT, CENTER);
    text(dropdownOpen ? "\u25B2" : "\u25BC", 200, row1Y + 14);

    // Label
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(12);
    text("Function:", 220, row1Y + 14);

    // Row 2: Step buttons
    let row2Y = drawHeight + 45;
    buttonY1 = row2Y;

    // Step Through button
    let stepEnabled = currentStep < functions[currentFunctionIndex].steps.length - 1 && !showAllSteps;
    fill(stepEnabled ? [70, 130, 180] : [180, 180, 180]);
    stroke(stepEnabled ? [50, 100, 140] : [150, 150, 150]);
    strokeWeight(1);
    rect(10, row2Y, 120, 28, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text("Next Step", 70, row2Y + 14);

    // Show All button
    let showEnabled = !showAllSteps;
    fill(showEnabled ? [100, 160, 100] : [180, 180, 180]);
    stroke(showEnabled ? [80, 130, 80] : [150, 150, 150]);
    strokeWeight(1);
    rect(140, row2Y, 120, 28, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text("Show All", 200, row2Y + 14);

    // Row 3: Reset button
    let row3Y = drawHeight + 80;
    buttonY2 = row3Y;

    fill([200, 100, 100]);
    stroke([160, 80, 80]);
    strokeWeight(1);
    rect(10, row3Y, 80, 28, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text("Reset", 50, row3Y + 14);

    // Instructions text
    fill(100);
    textAlign(LEFT, CENTER);
    textSize(11);
    text("Click 'Next Step' to see each rule applied", 100, row3Y + 14);
}

function drawDropdownMenu() {
    let menuX = 10;
    let menuY = dropdownY + 30;
    let menuW = 200;
    let itemH = 28;
    let menuH = functions.length * itemH;

    // Shadow
    fill(0, 0, 0, 30);
    noStroke();
    rect(menuX + 3, menuY + 3, menuW, menuH, 5);

    // Menu background
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(menuX, menuY, menuW, menuH, 5);

    // Menu items
    for (let i = 0; i < functions.length; i++) {
        let itemY = menuY + i * itemH;

        // Highlight on hover (approximate - check in mousePressed)
        if (i === currentFunctionIndex) {
            fill(230, 240, 250);
            noStroke();
            rect(menuX + 2, itemY + 2, menuW - 4, itemH - 4, 3);
        }

        fill(0);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(14);
        text(functions[i].displayName, menuX + 15, itemY + itemH / 2);
    }
}

function mousePressed() {
    // Check dropdown toggle
    if (mouseX >= 10 && mouseX <= 210 && mouseY >= dropdownY && mouseY <= dropdownY + 28) {
        dropdownOpen = !dropdownOpen;
        return;
    }

    // Check dropdown menu selection
    if (dropdownOpen) {
        let menuY = dropdownY + 30;
        let itemH = 28;

        if (mouseX >= 10 && mouseX <= 210 && mouseY >= menuY && mouseY <= menuY + functions.length * itemH) {
            let index = Math.floor((mouseY - menuY) / itemH);
            if (index >= 0 && index < functions.length) {
                currentFunctionIndex = index;
                currentStep = 0;
                showAllSteps = false;
            }
        }
        dropdownOpen = false;
        return;
    }

    // Check Step Through button
    if (mouseX >= 10 && mouseX <= 130 && mouseY >= buttonY1 && mouseY <= buttonY1 + 28) {
        if (currentStep < functions[currentFunctionIndex].steps.length - 1 && !showAllSteps) {
            currentStep++;
        }
        return;
    }

    // Check Show All button
    if (mouseX >= 140 && mouseX <= 260 && mouseY >= buttonY1 && mouseY <= buttonY1 + 28) {
        if (!showAllSteps) {
            showAllSteps = true;
            currentStep = functions[currentFunctionIndex].steps.length - 1;
        }
        return;
    }

    // Check Reset button
    if (mouseX >= 10 && mouseX <= 90 && mouseY >= buttonY2 && mouseY <= buttonY2 + 28) {
        currentStep = 0;
        showAllSteps = false;
        return;
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
