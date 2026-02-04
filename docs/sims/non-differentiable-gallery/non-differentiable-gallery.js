// Non-Differentiable Points Gallery MicroSim
// Interactive gallery showing three types of non-differentiable points
// with animated secant lines from both sides
// Bloom Level: Analyze (L4), Verbs: classify, distinguish, compare

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Panel dimensions (calculated in setup)
let panelWidth;
let panelHeight = 280;
let panelTop = 60;
let panelGap = 10;

// Current view mode
let currentType = 0; // 0 = Corner, 1 = Cusp, 2 = Vertical Tangent
let typeNames = ['Corner', 'Cusp', 'Vertical Tangent'];
let typeFunctions = ['f(x) = |x|', 'f(x) = x^(2/3)', 'f(x) = x^(1/3)'];

// Animation state
let h = 1.0; // Distance from origin for secant points
let isAnimating = false;
let animationSpeed = 0.015;
let minH = 0.02;

// Button positions (calculated in setup)
let buttons = [];
let animateButton = { x: 0, y: 0, w: 150, h: 30 };
let resetButton = { x: 0, y: 0, w: 70, h: 30 };

// Zoom level
let zoomLevel = 1;
let zoomLevels = [1, 2, 4];
let zoomIndex = 0;

// Graph parameters
let graphMargin = 30;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    describe('Interactive gallery showing three types of non-differentiable points: corner, cusp, and vertical tangent, with animated secant lines approaching from both sides', LABEL);
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

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Non-Differentiable Points Gallery', canvasWidth / 2, 8);
    textSize(14);
    fill(80);
    text('Why the derivative fails at certain points', canvasWidth / 2, 32);

    // Calculate panel dimensions
    panelWidth = canvasWidth - 2 * margin;

    // Draw type selector tabs
    drawTypeTabs();

    // Draw the current panel
    drawPanel(currentType);

    // Draw controls
    drawControls();

    // Update animation
    if (isAnimating) {
        h -= animationSpeed;
        if (h <= minH) {
            h = minH;
            isAnimating = false;
        }
    }
}

function drawTypeTabs() {
    let tabWidth = (canvasWidth - 2 * margin) / 3;
    let tabY = panelTop - 25;
    let tabHeight = 22;

    buttons = [];

    for (let i = 0; i < 3; i++) {
        let tabX = margin + i * tabWidth;

        // Store button position
        buttons.push({ x: tabX, y: tabY, w: tabWidth, h: tabHeight, type: i });

        // Draw tab
        if (i === currentType) {
            fill(70, 130, 180);
            stroke(50, 100, 150);
        } else {
            fill(220);
            stroke(180);
        }
        strokeWeight(1);
        rect(tabX, tabY, tabWidth, tabHeight, 5, 5, 0, 0);

        // Tab label
        noStroke();
        fill(i === currentType ? 255 : 60);
        textAlign(CENTER, CENTER);
        textSize(12);
        text(typeNames[i], tabX + tabWidth / 2, tabY + tabHeight / 2);
    }
}

function drawPanel(type) {
    let panelX = margin;
    let panelY = panelTop;

    // Panel background
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 0, 0, 8, 8);

    // Graph area within panel
    let graphLeft = panelX + graphMargin;
    let graphRight = panelX + panelWidth - graphMargin - 120; // Leave room for info
    let graphTop = panelY + graphMargin;
    let graphBottom = panelY + panelHeight - graphMargin;
    let graphWidth = graphRight - graphLeft;
    let graphHeight = graphBottom - graphTop;

    // Coordinate system range based on zoom
    let range = 2 / zoomLevel;

    // Draw grid
    stroke(230);
    strokeWeight(1);
    let gridStep = 0.5 / zoomLevel;
    for (let v = -range; v <= range; v += gridStep) {
        // Vertical grid lines
        let px = map(v, -range, range, graphLeft, graphRight);
        if (px >= graphLeft && px <= graphRight) {
            line(px, graphTop, px, graphBottom);
        }
        // Horizontal grid lines
        let py = map(v, -range, range, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            line(graphLeft, py, graphRight, py);
        }
    }

    // Draw axes
    stroke(100);
    strokeWeight(2);
    // X-axis
    let y0 = map(0, -range, range, graphBottom, graphTop);
    if (y0 >= graphTop && y0 <= graphBottom) {
        line(graphLeft, y0, graphRight, y0);
    }
    // Y-axis
    let x0 = map(0, -range, range, graphLeft, graphRight);
    if (x0 >= graphLeft && x0 <= graphRight) {
        line(x0, graphTop, x0, graphBottom);
    }

    // Draw the function curve
    drawFunction(type, graphLeft, graphRight, graphTop, graphBottom, range);

    // Draw secant lines from both sides
    drawSecantLines(type, graphLeft, graphRight, graphTop, graphBottom, range);

    // Draw info panel
    drawInfoPanel(type, panelX + panelWidth - 115, panelY + 10);
}

function drawFunction(type, gLeft, gRight, gTop, gBottom, range) {
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    beginShape();
    for (let px = gLeft; px <= gRight; px += 1) {
        let x = map(px, gLeft, gRight, -range, range);
        let y = evaluateFunction(type, x);

        if (y !== null && isFinite(y) && abs(y) <= range * 1.5) {
            let py = map(y, -range, range, gBottom, gTop);
            if (py >= gTop - 10 && py <= gBottom + 10) {
                vertex(px, constrain(py, gTop, gBottom));
            }
        }
    }
    endShape();

    // For cusp and vertical tangent, draw both sides separately to handle discontinuous derivative
    if (type === 1 || type === 2) {
        // These functions are continuous, but the visual might need help near x=0
        // Already handled above since functions are defined for all x
    }
}

function evaluateFunction(type, x) {
    switch(type) {
        case 0: // Corner: f(x) = |x|
            return abs(x);
        case 1: // Cusp: f(x) = x^(2/3)
            // x^(2/3) = (x^2)^(1/3) to handle negative x
            return pow(abs(x), 2/3);
        case 2: // Vertical tangent: f(x) = x^(1/3)
            // Cube root, preserving sign
            return x >= 0 ? pow(x, 1/3) : -pow(-x, 1/3);
        default:
            return 0;
    }
}

function evaluateDerivative(type, x) {
    // Returns derivative (or null if undefined)
    let epsilon = 0.0001;
    if (abs(x) < epsilon) return null; // At the problematic point

    switch(type) {
        case 0: // f(x) = |x|, f'(x) = sign(x)
            return x > 0 ? 1 : -1;
        case 1: // f(x) = x^(2/3), f'(x) = (2/3)x^(-1/3)
            let cbrt = x >= 0 ? pow(x, 1/3) : -pow(-x, 1/3);
            return (2/3) / cbrt;
        case 2: // f(x) = x^(1/3), f'(x) = (1/3)x^(-2/3)
            return (1/3) / pow(abs(x), 2/3);
        default:
            return 0;
    }
}

function drawSecantLines(type, gLeft, gRight, gTop, gBottom, range) {
    // Point at origin (the non-differentiable point)
    let x0 = 0;
    let y0 = evaluateFunction(type, x0);

    // Left secant point
    let xL = -h;
    let yL = evaluateFunction(type, xL);

    // Right secant point
    let xR = h;
    let yR = evaluateFunction(type, xR);

    // Calculate slopes
    let slopeL = (yL - y0) / (xL - x0);
    let slopeR = (yR - y0) / (xR - x0);

    // Map origin to screen
    let px0 = map(x0, -range, range, gLeft, gRight);
    let py0 = map(y0, -range, range, gBottom, gTop);

    // Draw left secant line (red/orange)
    stroke(220, 80, 50);
    strokeWeight(2);
    drawLineWithSlope(px0, py0, slopeL, gLeft, gRight, gTop, gBottom, range);

    // Draw right secant line (green)
    stroke(50, 180, 80);
    strokeWeight(2);
    drawLineWithSlope(px0, py0, slopeR, gLeft, gRight, gTop, gBottom, range);

    // Draw the two approaching points
    let pxL = map(xL, -range, range, gLeft, gRight);
    let pyL = map(yL, -range, range, gBottom, gTop);
    let pxR = map(xR, -range, range, gLeft, gRight);
    let pyR = map(yR, -range, range, gBottom, gTop);

    // Left point
    if (pxL >= gLeft && pxL <= gRight && pyL >= gTop && pyL <= gBottom) {
        fill(220, 80, 50);
        noStroke();
        circle(pxL, pyL, 10);
    }

    // Right point
    if (pxR >= gLeft && pxR <= gRight && pyR >= gTop && pyR <= gBottom) {
        fill(50, 180, 80);
        noStroke();
        circle(pxR, pyR, 10);
    }

    // Origin point (the non-differentiable point)
    if (px0 >= gLeft && px0 <= gRight && py0 >= gTop && py0 <= gBottom) {
        fill(100, 100, 200);
        noStroke();
        circle(px0, py0, 12);
    }
}

function drawLineWithSlope(px, py, slope, gLeft, gRight, gTop, gBottom, range) {
    // Convert slope from function space to screen space
    let screenSlope = -slope * ((gRight - gLeft) / (2 * range)) / ((gBottom - gTop) / (2 * range));

    // Find line endpoints at graph boundaries
    let x1 = gLeft;
    let y1 = py + screenSlope * (x1 - px);
    let x2 = gRight;
    let y2 = py + screenSlope * (x2 - px);

    // Clip to graph bounds
    y1 = constrain(y1, gTop, gBottom);
    y2 = constrain(y2, gTop, gBottom);

    line(x1, y1, x2, y2);
}

function drawInfoPanel(type, x, y) {
    // Info panel background
    fill(250, 250, 255);
    stroke(180);
    strokeWeight(1);
    rect(x, y, 110, panelHeight - 20, 5);

    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);

    let lineY = y + 8;
    let lineH = 16;

    // Type name
    textSize(12);
    fill(70, 130, 180);
    text(typeNames[type], x + 5, lineY);
    lineY += lineH + 2;

    // Function
    textSize(10);
    fill(0, 100, 200);
    text(typeFunctions[type], x + 5, lineY);
    lineY += lineH + 5;

    // Current h value
    fill(0);
    textSize(10);
    text('h = ' + h.toFixed(3), x + 5, lineY);
    lineY += lineH + 5;

    // One-sided derivatives
    stroke(180);
    line(x + 5, lineY, x + 105, lineY);
    noStroke();
    lineY += 8;

    // Calculate current secant slopes
    let x0 = 0;
    let y0 = evaluateFunction(type, x0);
    let yL = evaluateFunction(type, -h);
    let yR = evaluateFunction(type, h);
    let slopeL = (yL - y0) / (-h);
    let slopeR = (yR - y0) / h;

    // Left slope
    fill(220, 80, 50);
    text('Left slope:', x + 5, lineY);
    lineY += lineH - 2;
    textSize(11);
    if (abs(slopeL) > 1000) {
        text(slopeL < 0 ? '-\u221E' : '+\u221E', x + 5, lineY);
    } else {
        text(slopeL.toFixed(3), x + 5, lineY);
    }
    lineY += lineH + 3;

    // Right slope
    textSize(10);
    fill(50, 180, 80);
    text('Right slope:', x + 5, lineY);
    lineY += lineH - 2;
    textSize(11);
    if (abs(slopeR) > 1000) {
        text(slopeR < 0 ? '-\u221E' : '+\u221E', x + 5, lineY);
    } else {
        text(slopeR.toFixed(3), x + 5, lineY);
    }
    lineY += lineH + 8;

    // Why it fails
    stroke(180);
    line(x + 5, lineY, x + 105, lineY);
    noStroke();
    lineY += 8;

    fill(80);
    textSize(9);
    text('Why no derivative:', x + 5, lineY);
    lineY += lineH - 2;

    fill(150, 50, 50);
    textSize(9);
    let reason = getFailureReason(type);
    // Word wrap
    let words = reason.split(' ');
    let currentLine = '';
    for (let word of words) {
        let testLine = currentLine + word + ' ';
        if (textWidth(testLine) > 100) {
            text(currentLine, x + 5, lineY);
            lineY += lineH - 4;
            currentLine = word + ' ';
        } else {
            currentLine = testLine;
        }
    }
    text(currentLine, x + 5, lineY);
}

function getFailureReason(type) {
    switch(type) {
        case 0:
            return 'Left limit = -1, Right limit = +1. Different one-sided limits!';
        case 1:
            return 'Both limits approach infinity, but from opposite signs.';
        case 2:
            return 'Both limits are positive infinity. Tangent line is vertical!';
        default:
            return '';
    }
}

function drawControls() {
    let btnY = drawHeight + 15;

    // Animate button
    animateButton.x = margin;
    animateButton.y = btnY;
    animateButton.w = 140;
    animateButton.h = 28;

    // Draw animate button
    if (isAnimating) {
        fill(100, 150, 200);
    } else {
        fill(70, 130, 180);
    }
    stroke(50, 100, 150);
    strokeWeight(1);
    rect(animateButton.x, animateButton.y, animateButton.w, animateButton.h, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(isAnimating ? 'Animating...' : 'Watch h Approach 0',
         animateButton.x + animateButton.w/2, animateButton.y + animateButton.h/2);

    // Reset button
    resetButton.x = margin + 150;
    resetButton.y = btnY;
    resetButton.w = 60;
    resetButton.h = 28;

    fill(180);
    stroke(150);
    rect(resetButton.x, resetButton.y, resetButton.w, resetButton.h, 5);

    fill(60);
    noStroke();
    text('Reset', resetButton.x + resetButton.w/2, resetButton.y + resetButton.h/2);

    // Zoom controls
    let zoomX = margin + 230;
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(12);
    text('Zoom: ' + zoomLevel + 'x', zoomX, btnY + 14);

    // Zoom buttons
    let zoomBtnW = 28;
    let zoomInBtn = { x: zoomX + 70, y: btnY, w: zoomBtnW, h: 28 };
    let zoomOutBtn = { x: zoomX + 100, y: btnY, w: zoomBtnW, h: 28 };

    // Store for click detection
    this.zoomInBtn = zoomInBtn;
    this.zoomOutBtn = zoomOutBtn;

    fill(220);
    stroke(180);
    rect(zoomOutBtn.x, zoomOutBtn.y, zoomOutBtn.w, zoomOutBtn.h, 5);
    rect(zoomInBtn.x, zoomInBtn.y, zoomInBtn.w, zoomInBtn.h, 5);

    fill(60);
    noStroke();
    textAlign(CENTER, CENTER);
    text('-', zoomOutBtn.x + zoomOutBtn.w/2, zoomOutBtn.y + zoomOutBtn.h/2);
    text('+', zoomInBtn.x + zoomInBtn.w/2, zoomInBtn.y + zoomInBtn.h/2);

    // h value display and slider representation
    let sliderY = drawHeight + 52;
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(12);
    text('h = ' + h.toFixed(3), margin, sliderY + 8);

    // Draw a visual slider track
    let sliderX = margin + 80;
    let sliderW = canvasWidth - sliderX - margin;

    fill(230);
    stroke(180);
    rect(sliderX, sliderY + 4, sliderW, 8, 4);

    // Slider position
    let sliderPos = map(h, minH, 1, sliderX, sliderX + sliderW);
    fill(70, 130, 180);
    noStroke();
    circle(sliderPos, sliderY + 8, 16);

    // Store slider info for dragging
    this.slider = { x: sliderX, y: sliderY, w: sliderW, pos: sliderPos };
}

function mousePressed() {
    // Check type tabs
    for (let btn of buttons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            currentType = btn.type;
            return;
        }
    }

    // Check animate button
    if (mouseX >= animateButton.x && mouseX <= animateButton.x + animateButton.w &&
        mouseY >= animateButton.y && mouseY <= animateButton.y + animateButton.h) {
        if (!isAnimating) {
            isAnimating = true;
            h = 1.0;
        }
        return;
    }

    // Check reset button
    if (mouseX >= resetButton.x && mouseX <= resetButton.x + resetButton.w &&
        mouseY >= resetButton.y && mouseY <= resetButton.y + resetButton.h) {
        h = 1.0;
        isAnimating = false;
        return;
    }

    // Check zoom buttons
    if (this.zoomInBtn && mouseX >= this.zoomInBtn.x && mouseX <= this.zoomInBtn.x + this.zoomInBtn.w &&
        mouseY >= this.zoomInBtn.y && mouseY <= this.zoomInBtn.y + this.zoomInBtn.h) {
        zoomIndex = min(zoomIndex + 1, zoomLevels.length - 1);
        zoomLevel = zoomLevels[zoomIndex];
        return;
    }

    if (this.zoomOutBtn && mouseX >= this.zoomOutBtn.x && mouseX <= this.zoomOutBtn.x + this.zoomOutBtn.w &&
        mouseY >= this.zoomOutBtn.y && mouseY <= this.zoomOutBtn.y + this.zoomOutBtn.h) {
        zoomIndex = max(zoomIndex - 1, 0);
        zoomLevel = zoomLevels[zoomIndex];
        return;
    }

    // Check slider
    if (this.slider && mouseY >= this.slider.y && mouseY <= this.slider.y + 20) {
        updateSliderFromMouse();
    }
}

function mouseDragged() {
    // Drag slider
    if (this.slider && mouseY >= this.slider.y - 10 && mouseY <= this.slider.y + 30) {
        updateSliderFromMouse();
    }
}

function updateSliderFromMouse() {
    if (this.slider) {
        isAnimating = false;
        let newH = map(mouseX, this.slider.x, this.slider.x + this.slider.w, minH, 1);
        h = constrain(newH, minH, 1);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.floor(container.getBoundingClientRect().width);
    }
}
