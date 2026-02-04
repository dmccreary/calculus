// Product Rule Geometric Visualization MicroSim
// Illustrates the product rule geometrically using the area interpretation
// Shows why d(fg) = f*dg + g*df has TWO terms
// Bloom Level: Understand (L2), Verb: explain, interpret, demonstrate

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph parameters - rectangle visualization area
let rectLeft = 60;
let rectTop = 80;
let maxRectWidth = 200;
let maxRectHeight = 200;

// Function presets: [name, f(x) formula string, f function, g function, f' function, g' function]
let functionPresets = [
    { name: "f=x, g=x", f: x => x, g: x => x, fPrime: x => 1, gPrime: x => 1, fLabel: "x", gLabel: "x" },
    { name: "f=x, g=x^2", f: x => x, g: x => x*x, fPrime: x => 1, gPrime: x => 2*x, fLabel: "x", gLabel: "x\u00B2" },
    { name: "f=x^2, g=x", f: x => x*x, g: x => x, fPrime: x => 2*x, gPrime: x => 1, fLabel: "x\u00B2", gLabel: "x" },
    { name: "f=2x, g=3x", f: x => 2*x, g: x => 3*x, fPrime: x => 2, gPrime: x => 3, fLabel: "2x", gLabel: "3x" }
];
let currentPreset = 0;

// Controls
let xSlider;
let dxSlider;
let presetSelect;
let animateButton;
let resetButton;

// State
let xVal = 1.5;
let dx = 0.5;
let isAnimating = false;
let animationSpeed = 0.01;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // x value slider
    xSlider = createSlider(0.5, 3, 1.5, 0.1);
    xSlider.position(sliderLeftMargin, drawHeight + 5);
    xSlider.size(canvasWidth - sliderLeftMargin - margin);
    xSlider.input(() => {
        xVal = xSlider.value();
    });

    // Delta x slider
    dxSlider = createSlider(0.01, 1, 0.5, 0.01);
    dxSlider.position(sliderLeftMargin, drawHeight + 40);
    dxSlider.size(canvasWidth - sliderLeftMargin - margin);
    dxSlider.input(() => {
        dx = dxSlider.value();
    });

    // Preset selector
    presetSelect = createSelect();
    presetSelect.position(10, drawHeight + 80);
    for (let i = 0; i < functionPresets.length; i++) {
        presetSelect.option(functionPresets[i].name, i);
    }
    presetSelect.changed(() => {
        currentPreset = parseInt(presetSelect.value());
    });

    // Animate button
    animateButton = createButton('Shrink \u0394x');
    animateButton.position(140, drawHeight + 80);
    animateButton.mousePressed(startAnimation);

    // Reset button
    resetButton = createButton('Reset');
    resetButton.position(230, drawHeight + 80);
    resetButton.mousePressed(resetAnimation);

    describe('Interactive visualization showing the product rule geometrically as area changes. The L-shaped region shows why the derivative of fg has two terms.', LABEL);
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

    // Get current functions
    let preset = functionPresets[currentPreset];
    let fVal = preset.f(xVal);
    let gVal = preset.g(xVal);
    let fNew = preset.f(xVal + dx);
    let gNew = preset.g(xVal + dx);
    let deltaF = fNew - fVal;
    let deltaG = gNew - gVal;

    // Title and subtitle
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Product Rule: Area Interpretation', canvasWidth * 0.4, 8);
    textSize(14);
    fill(80);
    text('d(f\u00B7g) = f\u00B7dg + g\u00B7df', canvasWidth * 0.4, 30);

    // Draw the rectangle visualization
    drawProductRectangle(fVal, gVal, deltaF, deltaG, preset);

    // Draw info panel
    drawInfoPanel(fVal, gVal, deltaF, deltaG, preset);

    // Animation update
    if (isAnimating) {
        dx -= animationSpeed;
        if (dx <= 0.01) {
            dx = 0.01;
            isAnimating = false;
        }
        dxSlider.value(dx);
    }

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('x: ' + xVal.toFixed(1), 10, drawHeight + 15);
    text('\u0394x: ' + dx.toFixed(2), 10, drawHeight + 50);
}

function drawProductRectangle(fVal, gVal, deltaF, deltaG, preset) {
    // Scale factors to fit in visualization area
    let maxF = Math.max(fVal + deltaF, 5);
    let maxG = Math.max(gVal + deltaG, 5);
    let scaleF = maxRectWidth / maxF;
    let scaleG = maxRectHeight / maxG;

    // Scaled dimensions
    let rectW = fVal * scaleF;
    let rectH = gVal * scaleG;
    let dW = deltaF * scaleF;
    let dH = deltaG * scaleG;

    let baseX = rectLeft;
    let baseY = rectTop + maxRectHeight;

    // Original rectangle f(x) * g(x) - light blue
    fill(173, 216, 230, 200);
    stroke(0, 100, 200);
    strokeWeight(2);
    rect(baseX, baseY - rectH, rectW, rectH);

    // Label the original area
    fill(0, 80, 160);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    if (rectW > 50 && rectH > 30) {
        text('f \u00B7 g', baseX + rectW/2, baseY - rectH/2);
    }

    // Top strip: f * delta_g (horizontal strip) - green
    fill(144, 238, 144, 200);
    stroke(0, 150, 0);
    strokeWeight(2);
    rect(baseX, baseY - rectH - dH, rectW, dH);

    // Label top strip
    if (dH > 15 && rectW > 40) {
        fill(0, 100, 0);
        noStroke();
        textSize(12);
        text('f \u00B7 \u0394g', baseX + rectW/2, baseY - rectH - dH/2);
    }

    // Right strip: delta_f * g (vertical strip) - orange
    fill(255, 200, 100, 200);
    stroke(200, 100, 0);
    strokeWeight(2);
    rect(baseX + rectW, baseY - rectH, dW, rectH);

    // Label right strip
    if (dW > 15 && rectH > 30) {
        fill(180, 80, 0);
        noStroke();
        textSize(12);
        push();
        translate(baseX + rectW + dW/2, baseY - rectH/2);
        rotate(-HALF_PI);
        text('g \u00B7 \u0394f', 0, 0);
        pop();
    }

    // Corner rectangle: delta_f * delta_g - red (negligible)
    fill(255, 150, 150, 200);
    stroke(200, 50, 50);
    strokeWeight(1);
    rect(baseX + rectW, baseY - rectH - dH, dW, dH);

    // Label corner if big enough
    if (dW > 20 && dH > 15) {
        fill(180, 50, 50);
        noStroke();
        textSize(10);
        text('\u0394f\u00B7\u0394g', baseX + rectW + dW/2, baseY - rectH - dH/2);
    }

    // Dimension labels
    fill(0);
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);

    // f(x) label at bottom
    text('f(' + preset.fLabel + ') = ' + fVal.toFixed(2), baseX + rectW/2, baseY + 5);

    // f(x+dx) label at bottom
    if (dW > 5) {
        textSize(10);
        text('\u0394f=' + deltaF.toFixed(2), baseX + rectW + dW/2, baseY + 5);
    }

    // g(x) label on left
    textAlign(RIGHT, CENTER);
    textSize(12);
    text('g(' + preset.gLabel + ')=' + gVal.toFixed(2), baseX - 5, baseY - rectH/2);

    // delta g label on left
    if (dH > 5) {
        textSize(10);
        text('\u0394g=' + deltaG.toFixed(2), baseX - 5, baseY - rectH - dH/2);
    }

    // Draw bracket showing total width = f + delta_f
    stroke(100);
    strokeWeight(1);
    let bracketY = baseY + 25;
    line(baseX, bracketY, baseX + rectW + dW, bracketY);
    line(baseX, bracketY - 3, baseX, bracketY + 3);
    line(baseX + rectW + dW, bracketY - 3, baseX + rectW + dW, bracketY + 3);
    noStroke();
    fill(80);
    textAlign(CENTER, TOP);
    textSize(10);
    text('f(x+\u0394x) = ' + (fVal + deltaF).toFixed(2), baseX + (rectW + dW)/2, bracketY + 5);
}

function drawInfoPanel(fVal, gVal, deltaF, deltaG, preset) {
    // Info panel on right side
    let panelX = rectLeft + maxRectWidth + 60;
    let panelY = rectTop;
    let panelWidth = canvasWidth - panelX - 10;
    let panelHeight = 280;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    // Panel content
    fill(0);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);

    let yPos = panelY + 10;
    let lineHeight = 18;

    // Title
    textSize(13);
    fill(0);
    text('Area Change:', panelX + 8, yPos);
    yPos += lineHeight + 5;

    // Calculate areas
    let originalArea = fVal * gVal;
    let newArea = (fVal + deltaF) * (gVal + deltaG);
    let totalChange = newArea - originalArea;

    let topStrip = fVal * deltaG;
    let rightStrip = gVal * deltaF;
    let corner = deltaF * deltaG;

    textSize(11);

    // Original area
    fill(0, 80, 160);
    text('Original: f\u00B7g', panelX + 8, yPos);
    yPos += lineHeight - 4;
    text('= ' + originalArea.toFixed(3), panelX + 20, yPos);
    yPos += lineHeight + 2;

    // Top strip (f * dg)
    fill(0, 100, 0);
    text('Top strip: f\u00B7\u0394g', panelX + 8, yPos);
    yPos += lineHeight - 4;
    text('= ' + topStrip.toFixed(3), panelX + 20, yPos);
    yPos += lineHeight + 2;

    // Right strip (g * df)
    fill(180, 80, 0);
    text('Right strip: g\u00B7\u0394f', panelX + 8, yPos);
    yPos += lineHeight - 4;
    text('= ' + rightStrip.toFixed(3), panelX + 20, yPos);
    yPos += lineHeight + 2;

    // Corner (df * dg) - negligible
    fill(180, 50, 50);
    text('Corner: \u0394f\u00B7\u0394g', panelX + 8, yPos);
    yPos += lineHeight - 4;
    text('= ' + corner.toFixed(4), panelX + 20, yPos);
    yPos += lineHeight + 5;

    // Divider line
    stroke(180);
    line(panelX + 5, yPos, panelX + panelWidth - 5, yPos);
    noStroke();
    yPos += 8;

    // Total change
    fill(0);
    textSize(12);
    text('Total \u0394(f\u00B7g):', panelX + 8, yPos);
    yPos += lineHeight;
    textSize(11);
    text('= ' + totalChange.toFixed(3), panelX + 20, yPos);
    yPos += lineHeight + 5;

    // Show the formula
    fill(100, 0, 150);
    textSize(10);
    text('As \u0394x \u2192 0:', panelX + 8, yPos);
    yPos += lineHeight - 2;
    text('d(fg) = f\u00B7dg + g\u00B7df', panelX + 8, yPos);
    yPos += lineHeight + 2;

    // Show percentage of corner
    let cornerPercent = (corner / totalChange * 100);
    if (isFinite(cornerPercent)) {
        fill(180, 50, 50);
        textSize(10);
        text('Corner is ' + cornerPercent.toFixed(1) + '%', panelX + 8, yPos);
        yPos += lineHeight - 2;
        if (cornerPercent < 5) {
            fill(0, 120, 0);
            text('(negligible!)', panelX + 8, yPos);
        }
    }
}

function startAnimation() {
    isAnimating = true;
    dx = 1;
    dxSlider.value(dx);
}

function resetAnimation() {
    isAnimating = false;
    xVal = 1.5;
    dx = 0.5;
    currentPreset = 0;
    xSlider.value(xVal);
    dxSlider.value(dx);
    presetSelect.selected('0');
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    xSlider.size(canvasWidth - sliderLeftMargin - margin);
    dxSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
