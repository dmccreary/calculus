// Nested Chain Unwrap MicroSim
// Visualizes how nested compositions are differentiated layer by layer
// using repeated chain rule applications - the "onion peeling" method
// Bloom Level: Analyze (L4), Verbs: analyze, deconstruct, examine
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Preset nested functions with their layers
let functions = [
    {
        name: "sin(e^(x^2))",
        displayName: "sin(e^(x\u00B2))",
        depth: 3,
        layers: [
            {
                func: "x\u00B2",
                derivative: "2x",
                substitutedDerivative: "2x",
                color: [100, 180, 255],
                description: "Innermost: x squared"
            },
            {
                func: "e^v",
                derivative: "e^v",
                substitutedDerivative: "e^(x\u00B2)",
                color: [150, 220, 150],
                description: "Middle: e to the v"
            },
            {
                func: "sin(u)",
                derivative: "cos(u)",
                substitutedDerivative: "cos(e^(x\u00B2))",
                color: [255, 180, 100],
                description: "Outer: sin of u"
            }
        ],
        finalAnswer: "cos(e^(x\u00B2)) \u00B7 e^(x\u00B2) \u00B7 2x"
    },
    {
        name: "sqrt(ln(x))",
        displayName: "\u221A(ln(x))",
        depth: 2,
        layers: [
            {
                func: "ln(x)",
                derivative: "1/x",
                substitutedDerivative: "1/x",
                color: [100, 180, 255],
                description: "Inner: natural log"
            },
            {
                func: "\u221Av = v^(1/2)",
                derivative: "1/(2\u221Av)",
                substitutedDerivative: "1/(2\u221A(ln x))",
                color: [255, 180, 100],
                description: "Outer: square root"
            }
        ],
        finalAnswer: "1/(2\u221A(ln x)) \u00B7 1/x"
    },
    {
        name: "(x^3 + 1)^4",
        displayName: "(x\u00B3 + 1)\u2074",
        depth: 2,
        layers: [
            {
                func: "x\u00B3 + 1",
                derivative: "3x\u00B2",
                substitutedDerivative: "3x\u00B2",
                color: [100, 180, 255],
                description: "Inner: x cubed plus 1"
            },
            {
                func: "u\u2074",
                derivative: "4u\u00B3",
                substitutedDerivative: "4(x\u00B3 + 1)\u00B3",
                color: [255, 180, 100],
                description: "Outer: u to the 4th"
            }
        ],
        finalAnswer: "4(x\u00B3 + 1)\u00B3 \u00B7 3x\u00B2"
    },
    {
        name: "cos(sin(x))",
        displayName: "cos(sin(x))",
        depth: 2,
        layers: [
            {
                func: "sin(x)",
                derivative: "cos(x)",
                substitutedDerivative: "cos(x)",
                color: [100, 180, 255],
                description: "Inner: sine of x"
            },
            {
                func: "cos(u)",
                derivative: "-sin(u)",
                substitutedDerivative: "-sin(sin(x))",
                color: [255, 180, 100],
                description: "Outer: cosine of u"
            }
        ],
        finalAnswer: "-sin(sin(x)) \u00B7 cos(x)"
    },
    {
        name: "e^(cos(x^2))",
        displayName: "e^(cos(x\u00B2))",
        depth: 3,
        layers: [
            {
                func: "x\u00B2",
                derivative: "2x",
                substitutedDerivative: "2x",
                color: [100, 180, 255],
                description: "Innermost: x squared"
            },
            {
                func: "cos(v)",
                derivative: "-sin(v)",
                substitutedDerivative: "-sin(x\u00B2)",
                color: [150, 220, 150],
                description: "Middle: cosine of v"
            },
            {
                func: "e^u",
                derivative: "e^u",
                substitutedDerivative: "e^(cos(x\u00B2))",
                color: [255, 180, 100],
                description: "Outer: e to the u"
            }
        ],
        finalAnswer: "e^(cos(x\u00B2)) \u00B7 (-sin(x\u00B2)) \u00B7 2x"
    },
    {
        name: "ln(tan(2x))",
        displayName: "ln(tan(2x))",
        depth: 3,
        layers: [
            {
                func: "2x",
                derivative: "2",
                substitutedDerivative: "2",
                color: [100, 180, 255],
                description: "Innermost: 2x"
            },
            {
                func: "tan(v)",
                derivative: "sec\u00B2(v)",
                substitutedDerivative: "sec\u00B2(2x)",
                color: [150, 220, 150],
                description: "Middle: tangent of v"
            },
            {
                func: "ln(u)",
                derivative: "1/u",
                substitutedDerivative: "1/tan(2x)",
                color: [255, 180, 100],
                description: "Outer: natural log"
            }
        ],
        finalAnswer: "1/tan(2x) \u00B7 sec\u00B2(2x) \u00B7 2"
    },
    {
        name: "sin^3(x^2)",
        displayName: "sin\u00B3(x\u00B2)",
        depth: 3,
        layers: [
            {
                func: "x\u00B2",
                derivative: "2x",
                substitutedDerivative: "2x",
                color: [100, 180, 255],
                description: "Innermost: x squared"
            },
            {
                func: "sin(v)",
                derivative: "cos(v)",
                substitutedDerivative: "cos(x\u00B2)",
                color: [150, 220, 150],
                description: "Middle: sine of v"
            },
            {
                func: "u\u00B3",
                derivative: "3u\u00B2",
                substitutedDerivative: "3sin\u00B2(x\u00B2)",
                color: [255, 180, 100],
                description: "Outer: u cubed"
            }
        ],
        finalAnswer: "3sin\u00B2(x\u00B2) \u00B7 cos(x\u00B2) \u00B7 2x"
    }
];

// State
let currentFunctionIndex = 0;
let currentLayer = -1; // -1 means no layers peeled yet
let showAll = false;
let animationProgress = 0;
let isAnimating = false;

// UI elements
let dropdownOpen = false;
let dropdownY;
let buttonY1;

// Colors
let onionColors = [
    [100, 180, 255],   // Inner - blue
    [150, 220, 150],   // Middle - green
    [255, 180, 100],   // Outer - orange
    [220, 130, 180]    // Extra outer - pink
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    describe('Interactive visualization of nested chain rule applications showing layers like peeling an onion', LABEL);
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
    drawTitle();

    // Onion diagram
    drawOnionDiagram();

    // Derivative chain panel
    drawDerivativeChain();

    // Controls
    drawControlsCanvas();

    // Dropdown menu if open
    if (dropdownOpen) {
        drawDropdownMenu();
    }

    // Handle animation
    if (isAnimating) {
        animationProgress += 0.05;
        if (animationProgress >= 1) {
            animationProgress = 0;
            isAnimating = false;
        }
    }
}

function drawTitle() {
    let func = functions[currentFunctionIndex];

    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Nested Chain Rule: "Peel the Onion"', canvasWidth / 2, 5);

    textSize(14);
    fill(80);
    text('f(x) = ' + func.displayName, canvasWidth / 2, 28);

    // Depth indicator
    textSize(11);
    fill(120);
    text('Depth: ' + func.depth + ' layers', canvasWidth / 2, 46);
}

function drawOnionDiagram() {
    let func = functions[currentFunctionIndex];
    let centerX = canvasWidth / 2;
    let centerY = 165;
    let maxRadius = 95;
    let layerCount = func.layers.length;

    // Draw label
    fill(60);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text('Function Layers (Outside to Inside)', centerX, 63);

    // Draw each layer as concentric rings (outer to inner)
    for (let i = layerCount - 1; i >= 0; i--) {
        let layer = func.layers[i];
        let layerRadius = maxRadius * (i + 1) / layerCount;
        let innerRadius = i > 0 ? maxRadius * i / layerCount : 0;

        // Determine if this layer is "peeled"
        let isPeeled = showAll || (currentLayer >= (layerCount - 1 - i));

        // Layer color
        let col = layer.color;
        if (isPeeled) {
            fill(col[0], col[1], col[2], 180);
            stroke(col[0] * 0.7, col[1] * 0.7, col[2] * 0.7);
        } else {
            fill(col[0], col[1], col[2], 80);
            stroke(200);
        }
        strokeWeight(2);

        // Draw ring
        circle(centerX, centerY, layerRadius * 2);

        // Draw layer label
        let labelRadius = (layerRadius + innerRadius) / 2;
        if (labelRadius < 10) labelRadius = layerRadius / 2;

        fill(isPeeled ? 0 : 120);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);

        // Position label on the right side of the ring
        let labelX = centerX + labelRadius * 0.7;
        let labelY = centerY;

        if (i === layerCount - 1) {
            // Outermost - label on top
            labelY = centerY - labelRadius * 0.5;
            labelX = centerX;
        } else if (i === 0) {
            // Innermost - center
            labelX = centerX;
            labelY = centerY;
        }

        let layerNum = layerCount - i;
        text('L' + layerNum + ': ' + truncateText(layer.func, 12), labelX, labelY);
    }

    // Legend for peel order
    let legendY = centerY + maxRadius + 15;
    textSize(10);
    fill(100);
    textAlign(CENTER, TOP);
    text('Peel from outside \u2192 inside (L' + layerCount + ' to L1)', centerX, legendY);
}

function truncateText(str, maxLen) {
    if (str.length <= maxLen) return str;
    return str.substring(0, maxLen - 2) + '..';
}

function drawDerivativeChain() {
    let func = functions[currentFunctionIndex];
    let panelX = margin;
    let panelY = 285;
    let panelW = canvasWidth - margin * 2;
    let panelH = drawHeight - panelY - 10;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Panel title
    fill(0);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    text('Chain Rule: Multiply the Derivatives', panelX + panelW / 2, panelY + 5);

    // Chain rule formula
    textSize(10);
    fill(100);
    text("d/dx[f(g(h(x)))] = f'(g(h)) \u00B7 g'(h) \u00B7 h'(x)", panelX + panelW / 2, panelY + 22);

    // Draw the peeled layers and their derivatives
    let layerCount = func.layers.length;
    let revealedLayers = showAll ? layerCount : Math.min(currentLayer + 1, layerCount);

    let startY = panelY + 42;
    let lineHeight = 38;

    // Show each revealed layer
    for (let i = 0; i < revealedLayers; i++) {
        // We peel from outer (last in array) to inner (first in array)
        let layerIndex = layerCount - 1 - i;
        let layer = func.layers[layerIndex];

        let rowY = startY + i * lineHeight;
        if (rowY + lineHeight > panelY + panelH - 40) break;

        // Layer box
        let col = layer.color;
        fill(col[0], col[1], col[2], 100);
        stroke(col[0] * 0.8, col[1] * 0.8, col[2] * 0.8);
        strokeWeight(1);
        rect(panelX + 5, rowY, panelW - 10, lineHeight - 4, 5);

        // Layer number and function
        fill(0);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(11);
        text('Layer ' + (layerCount - layerIndex) + ': ' + layer.func, panelX + 12, rowY + 3);

        // Arrow and derivative
        fill(80);
        textSize(10);
        text('\u2192 derivative: ' + layer.derivative, panelX + 12, rowY + 17);

        // Substituted value
        fill(50, 100, 50);
        text('= ' + layer.substitutedDerivative, panelX + panelW / 2, rowY + 17);
    }

    // Multiplication chain at bottom
    if (revealedLayers > 0) {
        let chainY = panelY + panelH - 35;

        fill(240, 240, 255);
        stroke(180, 180, 220);
        strokeWeight(1);
        rect(panelX + 5, chainY, panelW - 10, 28, 5);

        fill(0);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(10);
        text('Chain:', panelX + 10, chainY + 14);

        // Build the multiplication chain
        let chainText = "";
        for (let i = 0; i < revealedLayers; i++) {
            let layerIndex = layerCount - 1 - i;
            if (i > 0) chainText += " \u00B7 ";
            chainText += func.layers[layerIndex].substitutedDerivative;
        }

        textAlign(LEFT, CENTER);
        fill(0, 80, 160);
        textSize(9);
        // Truncate if too long
        if (chainText.length > 50) {
            chainText = chainText.substring(0, 47) + "...";
        }
        text(chainText, panelX + 50, chainY + 14);
    }

    // Show final answer when complete
    if (showAll || currentLayer >= layerCount - 1) {
        let finalY = panelY + panelH - 8;
        fill(0, 120, 0);
        textAlign(CENTER, BOTTOM);
        textSize(11);
        text('Final: f\'(x) = ' + func.finalAnswer, panelX + panelW / 2, finalY);
    }
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
    textSize(13);
    text(functions[currentFunctionIndex].displayName, 18, row1Y + 14);

    // Dropdown arrow
    fill(100);
    textAlign(RIGHT, CENTER);
    text(dropdownOpen ? '\u25B2' : '\u25BC', 200, row1Y + 14);

    // Depth indicator badge
    let func = functions[currentFunctionIndex];
    fill(func.depth === 2 ? [100, 180, 100] : (func.depth === 3 ? [180, 140, 60] : [200, 100, 100]));
    noStroke();
    rect(215, row1Y + 4, 45, 20, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(func.depth + '-layer', 237.5, row1Y + 14);

    // Row 2: Action buttons
    let row2Y = drawHeight + 45;
    buttonY1 = row2Y;

    let layerCount = functions[currentFunctionIndex].layers.length;
    let canPeel = currentLayer < layerCount - 1 && !showAll;

    // Peel Layer button
    fill(canPeel ? [70, 150, 180] : [180, 180, 180]);
    stroke(canPeel ? [50, 120, 150] : [150, 150, 150]);
    strokeWeight(1);
    rect(10, row2Y, 110, 28, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('\uD83E\uDDC5 Peel Layer', 65, row2Y + 14);

    // Show All button
    let showEnabled = !showAll;
    fill(showEnabled ? [100, 160, 100] : [180, 180, 180]);
    stroke(showEnabled ? [80, 130, 80] : [150, 150, 150]);
    strokeWeight(1);
    rect(130, row2Y, 100, 28, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text('Show All', 180, row2Y + 14);

    // Reset button
    fill([200, 100, 100]);
    stroke([160, 80, 80]);
    strokeWeight(1);
    rect(240, row2Y, 70, 28, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text('Reset', 275, row2Y + 14);

    // Row 3: Progress and hint
    let row3Y = drawHeight + 80;

    // Progress bar
    let progress = showAll ? 1 : (currentLayer + 1) / layerCount;
    if (currentLayer < 0) progress = 0;

    fill(220);
    noStroke();
    rect(10, row3Y, canvasWidth - 20, 8, 4);

    fill(100, 180, 150);
    rect(10, row3Y, (canvasWidth - 20) * progress, 8, 4);

    // Progress text
    fill(100);
    textAlign(LEFT, TOP);
    textSize(10);
    let peeled = showAll ? layerCount : Math.max(0, currentLayer + 1);
    text('Layers peeled: ' + peeled + ' of ' + layerCount, 10, row3Y + 12);

    // Hint
    textAlign(RIGHT, TOP);
    fill(120);
    if (showAll || currentLayer >= layerCount - 1) {
        text('Complete! Each factor is one layer\'s derivative.', canvasWidth - 10, row3Y + 12);
    } else if (currentLayer < 0) {
        text('Click "Peel Layer" to start from the outside.', canvasWidth - 10, row3Y + 12);
    } else {
        text('Keep peeling to reach the innermost layer.', canvasWidth - 10, row3Y + 12);
    }
}

function drawDropdownMenu() {
    let menuX = 10;
    let menuY = dropdownY + 30;
    let menuW = 200;
    let itemH = 32;
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

        // Highlight current selection
        if (i === currentFunctionIndex) {
            fill(230, 240, 250);
            noStroke();
            rect(menuX + 2, itemY + 2, menuW - 4, itemH - 4, 3);
        }

        // Function name
        fill(0);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(13);
        text(functions[i].displayName, menuX + 12, itemY + itemH / 2 - 4);

        // Depth badge
        let func = functions[i];
        fill(func.depth === 2 ? [180, 220, 180] : (func.depth === 3 ? [255, 220, 180] : [255, 180, 180]));
        noStroke();
        rect(menuX + menuW - 55, itemY + 6, 45, 18, 8);
        fill(80);
        textAlign(CENTER, CENTER);
        textSize(9);
        text(func.depth + '-layer', menuX + menuW - 32.5, itemY + 15);
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
        let itemH = 32;

        if (mouseX >= 10 && mouseX <= 210 && mouseY >= menuY && mouseY <= menuY + functions.length * itemH) {
            let index = Math.floor((mouseY - menuY) / itemH);
            if (index >= 0 && index < functions.length) {
                currentFunctionIndex = index;
                currentLayer = -1;
                showAll = false;
            }
        }
        dropdownOpen = false;
        return;
    }

    // Check Peel Layer button
    if (mouseX >= 10 && mouseX <= 120 && mouseY >= buttonY1 && mouseY <= buttonY1 + 28) {
        let layerCount = functions[currentFunctionIndex].layers.length;
        if (currentLayer < layerCount - 1 && !showAll) {
            currentLayer++;
            isAnimating = true;
            animationProgress = 0;
        }
        return;
    }

    // Check Show All button
    if (mouseX >= 130 && mouseX <= 230 && mouseY >= buttonY1 && mouseY <= buttonY1 + 28) {
        if (!showAll) {
            showAll = true;
            currentLayer = functions[currentFunctionIndex].layers.length - 1;
        }
        return;
    }

    // Check Reset button
    if (mouseX >= 240 && mouseX <= 310 && mouseY >= buttonY1 && mouseY <= buttonY1 + 28) {
        currentLayer = -1;
        showAll = false;
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
