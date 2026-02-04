// Implicit Curves Explorer
// Shows tangent lines on implicit curves to build intuition about derivatives
// without explicit formulas

let canvasWidth = 600;
let canvasHeight = 580;
let drawHeight = 500;
let margin = 20;

// Chart layout - following best practices for title + subtitle
let chartTop = 50;
let chartBottom;
let chartLeft;
let chartRight;

// Mathematical coordinate system
let xMin = -5, xMax = 5;
let yMin = -4, yMax = 4;
let scale;
let originX, originY;

// Current curve and point
let curveType = 0;
let curves = ['Circle', 'Ellipse', 'Hyperbola', 'Folium of Descartes', 'Lemniscate'];
let curveEquations = [
    'x² + y² = r²',
    'x²/a² + y²/b² = 1',
    'x²/a² - y²/b² = 1',
    'x³ + y³ = 3axy',
    '(x² + y²)² = a²(x² - y²)'
];

// Point on curve
let pointX = 2;
let pointY = 0;
let isDragging = false;

// Curve parameters
let param1 = 3;  // radius, a value
let param2 = 2;  // b value for ellipse/hyperbola

// UI state
let showTangent = true;
let sliderValue = 0.5;
let sliderDragging = false;

// UI element positions
let dropdownOpen = false;
let dropdownX, dropdownY, dropdownWidth, dropdownHeight;
let checkboxX, checkboxY, checkboxSize = 18;
let sliderX, sliderY, sliderWidth, sliderHeight;
let buttonX, buttonY, buttonWidth, buttonHeight;

function setup() {
    updateCanvasSize();
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');
    textFont('Arial');

    // Set up chart dimensions
    chartLeft = margin + 30;
    chartRight = canvasWidth - margin;
    chartBottom = drawHeight - margin;

    // Calculate scale
    let chartWidth = chartRight - chartLeft;
    let chartHeight = chartBottom - chartTop;
    scale = min(chartWidth / (xMax - xMin), chartHeight / (yMax - yMin));

    // Origin in pixel coordinates
    originX = chartLeft + (0 - xMin) * scale;
    originY = chartTop + (yMax - 0) * scale;

    // UI element positions
    dropdownX = 20;
    dropdownY = drawHeight + 15;
    dropdownWidth = 160;
    dropdownHeight = 28;

    checkboxX = 200;
    checkboxY = drawHeight + 18;

    sliderX = 350;
    sliderY = drawHeight + 25;
    sliderWidth = 120;
    sliderHeight = 8;

    buttonX = 490;
    buttonY = drawHeight + 15;
    buttonWidth = 90;
    buttonHeight = 28;

    // Initialize point on circle
    updateParamsForCurve();
    findPointOnCurve(2, 0);
}

function updateCanvasSize() {
    const container = document.getElementById('canvas-container');
    if (container) {
        canvasWidth = Math.min(container.offsetWidth, 700) - 20;
        canvasHeight = canvasWidth * 0.97;
        drawHeight = canvasHeight - 80;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Recalculate layout
    chartRight = canvasWidth - margin;
    chartBottom = drawHeight - margin;

    let chartWidth = chartRight - chartLeft;
    let chartHeight = chartBottom - chartTop;
    scale = min(chartWidth / (xMax - xMin), chartHeight / (yMax - yMin));

    originX = chartLeft + (0 - xMin) * scale;
    originY = chartTop + (yMax - 0) * scale;

    // Update UI positions
    dropdownY = drawHeight + 15;
    checkboxY = drawHeight + 18;
    sliderY = drawHeight + 25;
    buttonY = drawHeight + 15;
}

function draw() {
    background(245);

    // Title and subtitle
    fill(0);
    textAlign(CENTER, TOP);
    textSize(18);
    text('Implicit Curves Explorer', canvasWidth / 2, 8);

    textSize(14);
    fill(80);
    text(curveEquations[curveType], canvasWidth / 2, 30);

    // Draw chart area
    drawGrid();
    drawAxes();
    drawCurve();
    drawPointAndTangent();
    drawInfo();
    drawControls();
}

function drawGrid() {
    stroke(220);
    strokeWeight(1);

    // Vertical grid lines
    for (let x = ceil(xMin); x <= floor(xMax); x++) {
        let px = originX + x * scale;
        if (px >= chartLeft && px <= chartRight) {
            line(px, chartTop, px, chartBottom);
        }
    }

    // Horizontal grid lines
    for (let y = ceil(yMin); y <= floor(yMax); y++) {
        let py = originY - y * scale;
        if (py >= chartTop && py <= chartBottom) {
            line(chartLeft, py, chartRight, py);
        }
    }
}

function drawAxes() {
    stroke(100);
    strokeWeight(2);

    // X-axis
    if (originY >= chartTop && originY <= chartBottom) {
        line(chartLeft, originY, chartRight, originY);
    }

    // Y-axis
    if (originX >= chartLeft && originX <= chartRight) {
        line(originX, chartTop, originX, chartBottom);
    }

    // Axis labels
    fill(60);
    textSize(12);
    textAlign(CENTER, TOP);

    // X-axis numbers
    for (let x = ceil(xMin); x <= floor(xMax); x++) {
        if (x !== 0) {
            let px = originX + x * scale;
            if (px >= chartLeft && px <= chartRight) {
                text(x, px, originY + 5);
            }
        }
    }

    // Y-axis numbers
    textAlign(RIGHT, CENTER);
    for (let y = ceil(yMin); y <= floor(yMax); y++) {
        if (y !== 0) {
            let py = originY - y * scale;
            if (py >= chartTop && py <= chartBottom) {
                text(y, originX - 8, py);
            }
        }
    }

    // Axis labels
    textSize(14);
    textAlign(CENTER, TOP);
    text('x', chartRight - 10, originY + 5);
    textAlign(RIGHT, CENTER);
    text('y', originX - 8, chartTop + 10);
}

// Implicit function F(x, y) = 0
function implicitF(x, y) {
    switch (curveType) {
        case 0: // Circle: x² + y² - r² = 0
            return x * x + y * y - param1 * param1;
        case 1: // Ellipse: x²/a² + y²/b² - 1 = 0
            return (x * x) / (param1 * param1) + (y * y) / (param2 * param2) - 1;
        case 2: // Hyperbola: x²/a² - y²/b² - 1 = 0
            return (x * x) / (param1 * param1) - (y * y) / (param2 * param2) - 1;
        case 3: // Folium of Descartes: x³ + y³ - 3axy = 0
            return x * x * x + y * y * y - 3 * param1 * x * y;
        case 4: // Lemniscate: (x² + y²)² - a²(x² - y²) = 0
            let r2 = x * x + y * y;
            return r2 * r2 - param1 * param1 * (x * x - y * y);
        default:
            return x * x + y * y - 9;
    }
}

// Partial derivatives for gradient
function dFdx(x, y) {
    switch (curveType) {
        case 0: // Circle
            return 2 * x;
        case 1: // Ellipse
            return 2 * x / (param1 * param1);
        case 2: // Hyperbola
            return 2 * x / (param1 * param1);
        case 3: // Folium
            return 3 * x * x - 3 * param1 * y;
        case 4: // Lemniscate
            let r2 = x * x + y * y;
            return 4 * x * r2 - 2 * param1 * param1 * x;
        default:
            return 2 * x;
    }
}

function dFdy(x, y) {
    switch (curveType) {
        case 0: // Circle
            return 2 * y;
        case 1: // Ellipse
            return 2 * y / (param2 * param2);
        case 2: // Hyperbola
            return -2 * y / (param2 * param2);
        case 3: // Folium
            return 3 * y * y - 3 * param1 * x;
        case 4: // Lemniscate
            let r2 = x * x + y * y;
            return 4 * y * r2 + 2 * param1 * param1 * y;
        default:
            return 2 * y;
    }
}

// Calculate dy/dx using implicit differentiation
function dydx(x, y) {
    let fx = dFdx(x, y);
    let fy = dFdy(x, y);
    if (abs(fy) < 0.0001) return null; // Vertical tangent
    return -fx / fy;
}

// Draw implicit curve using marching squares
function drawCurve() {
    stroke(100, 50, 150);
    strokeWeight(2);
    noFill();

    let resolution = 2; // pixels per cell
    let rows = Math.ceil((chartBottom - chartTop) / resolution);
    let cols = Math.ceil((chartRight - chartLeft) / resolution);

    // Create grid of F values
    for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1; j++) {
            let px0 = chartLeft + i * resolution;
            let py0 = chartTop + j * resolution;
            let px1 = px0 + resolution;
            let py1 = py0 + resolution;

            // Convert to math coordinates
            let x0 = (px0 - originX) / scale;
            let y0 = (originY - py0) / scale;
            let x1 = (px1 - originX) / scale;
            let y1 = (originY - py1) / scale;

            // Evaluate F at corners
            let f00 = implicitF(x0, y0);
            let f10 = implicitF(x1, y0);
            let f01 = implicitF(x0, y1);
            let f11 = implicitF(x1, y1);

            // Check for sign changes (curve crosses this cell)
            let signs = [f00 > 0 ? 1 : 0, f10 > 0 ? 1 : 0, f11 > 0 ? 1 : 0, f01 > 0 ? 1 : 0];
            let config = signs[0] + signs[1] * 2 + signs[2] * 4 + signs[3] * 8;

            if (config !== 0 && config !== 15) {
                // There's a sign change - draw line segment
                let edges = marchingSquaresEdges(config);
                for (let e = 0; e < edges.length; e += 2) {
                    let p1 = interpolateEdge(edges[e], f00, f10, f01, f11, px0, py0, px1, py1);
                    let p2 = interpolateEdge(edges[e + 1], f00, f10, f01, f11, px0, py0, px1, py1);
                    if (p1 && p2) {
                        line(p1.x, p1.y, p2.x, p2.y);
                    }
                }
            }
        }
    }
}

function marchingSquaresEdges(config) {
    // Returns pairs of edges to connect
    // Edges: 0=top, 1=right, 2=bottom, 3=left
    const table = {
        1: [3, 0], 2: [0, 1], 3: [3, 1], 4: [1, 2],
        5: [3, 0, 1, 2], 6: [0, 2], 7: [3, 2], 8: [2, 3],
        9: [2, 0], 10: [0, 1, 2, 3], 11: [2, 1], 12: [1, 3],
        13: [1, 0], 14: [0, 3]
    };
    return table[config] || [];
}

function interpolateEdge(edge, f00, f10, f01, f11, px0, py0, px1, py1) {
    let t;
    switch (edge) {
        case 0: // Top edge
            t = f00 / (f00 - f10);
            if (isNaN(t) || !isFinite(t)) t = 0.5;
            t = constrain(t, 0, 1);
            return { x: px0 + t * (px1 - px0), y: py0 };
        case 1: // Right edge
            t = f10 / (f10 - f11);
            if (isNaN(t) || !isFinite(t)) t = 0.5;
            t = constrain(t, 0, 1);
            return { x: px1, y: py0 + t * (py1 - py0) };
        case 2: // Bottom edge
            t = f01 / (f01 - f11);
            if (isNaN(t) || !isFinite(t)) t = 0.5;
            t = constrain(t, 0, 1);
            return { x: px0 + t * (px1 - px0), y: py1 };
        case 3: // Left edge
            t = f00 / (f00 - f01);
            if (isNaN(t) || !isFinite(t)) t = 0.5;
            t = constrain(t, 0, 1);
            return { x: px0, y: py0 + t * (py1 - py0) };
    }
    return null;
}

function drawPointAndTangent() {
    // Convert point to pixels
    let px = originX + pointX * scale;
    let py = originY - pointY * scale;

    // Only draw if in bounds
    if (px < chartLeft || px > chartRight || py < chartTop || py > chartBottom) {
        return;
    }

    // Draw tangent line
    if (showTangent) {
        let slope = dydx(pointX, pointY);
        if (slope !== null) {
            stroke(220, 100, 50);
            strokeWeight(2);

            // Calculate tangent line endpoints
            let dx = 3;
            let dy = slope * dx;

            let x1 = pointX - dx;
            let y1 = pointY - dy;
            let x2 = pointX + dx;
            let y2 = pointY + dy;

            let px1 = originX + x1 * scale;
            let py1 = originY - y1 * scale;
            let px2 = originX + x2 * scale;
            let py2 = originY - y2 * scale;

            // Clip to chart area
            px1 = constrain(px1, chartLeft, chartRight);
            px2 = constrain(px2, chartLeft, chartRight);
            py1 = constrain(py1, chartTop, chartBottom);
            py2 = constrain(py2, chartTop, chartBottom);

            line(px1, py1, px2, py2);
        } else {
            // Vertical tangent
            stroke(220, 100, 50);
            strokeWeight(2);
            line(px, chartTop, px, chartBottom);
        }
    }

    // Draw point
    fill(50, 100, 200);
    stroke(255);
    strokeWeight(2);
    ellipse(px, py, 14, 14);
}

function drawInfo() {
    // Info box in top-right corner of chart
    let boxX = chartRight - 150;
    let boxY = chartTop + 10;

    fill(255, 255, 255, 230);
    stroke(180);
    strokeWeight(1);
    rect(boxX, boxY, 140, 70, 5);

    fill(0);
    textAlign(LEFT, TOP);
    textSize(12);
    text('Point: (' + pointX.toFixed(2) + ', ' + pointY.toFixed(2) + ')', boxX + 10, boxY + 10);

    let slope = dydx(pointX, pointY);
    if (slope !== null) {
        text('dy/dx = ' + slope.toFixed(3), boxX + 10, boxY + 30);

        // Angle
        let angle = atan(slope) * 180 / PI;
        text('Angle: ' + angle.toFixed(1) + '\u00B0', boxX + 10, boxY + 50);
    } else {
        text('dy/dx = undefined', boxX + 10, boxY + 30);
        text('Vertical tangent', boxX + 10, boxY + 50);
    }
}

function drawControls() {
    // Control area background
    fill(235);
    noStroke();
    rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);

    // Separator line
    stroke(200);
    strokeWeight(1);
    line(0, drawHeight, canvasWidth, drawHeight);

    // Dropdown
    drawDropdown();

    // Checkbox
    drawCheckbox();

    // Slider
    drawSlider();

    // Random button
    drawButton();
}

function drawDropdown() {
    // Main dropdown button
    fill(255);
    stroke(150);
    strokeWeight(1);
    rect(dropdownX, dropdownY, dropdownWidth, dropdownHeight, 4);

    fill(0);
    textAlign(LEFT, CENTER);
    textSize(13);
    text(curves[curveType], dropdownX + 10, dropdownY + dropdownHeight / 2);

    // Arrow
    fill(100);
    noStroke();
    let arrowX = dropdownX + dropdownWidth - 20;
    let arrowY = dropdownY + dropdownHeight / 2;
    triangle(arrowX, arrowY - 4, arrowX + 8, arrowY - 4, arrowX + 4, arrowY + 4);

    // Dropdown menu when open
    if (dropdownOpen) {
        fill(255);
        stroke(150);
        strokeWeight(1);
        let menuHeight = curves.length * 26;
        rect(dropdownX, dropdownY + dropdownHeight, dropdownWidth, menuHeight, 4);

        for (let i = 0; i < curves.length; i++) {
            let itemY = dropdownY + dropdownHeight + i * 26;

            // Highlight on hover
            if (mouseY > itemY && mouseY < itemY + 26 &&
                mouseX > dropdownX && mouseX < dropdownX + dropdownWidth) {
                fill(230, 230, 250);
                noStroke();
                rect(dropdownX + 2, itemY + 2, dropdownWidth - 4, 24, 2);
            }

            fill(0);
            textAlign(LEFT, CENTER);
            textSize(12);
            text(curves[i], dropdownX + 10, itemY + 13);
        }
    }
}

function drawCheckbox() {
    // Checkbox
    stroke(150);
    strokeWeight(1);
    fill(showTangent ? [100, 50, 150] : 255);
    rect(checkboxX, checkboxY, checkboxSize, checkboxSize, 3);

    // Checkmark
    if (showTangent) {
        stroke(255);
        strokeWeight(2);
        noFill();
        line(checkboxX + 4, checkboxY + 10, checkboxX + 8, checkboxY + 14);
        line(checkboxX + 8, checkboxY + 14, checkboxX + 14, checkboxY + 5);
    }

    // Label
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(13);
    text('Show Tangent', checkboxX + checkboxSize + 8, checkboxY + checkboxSize / 2);
}

function drawSlider() {
    // Label
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(12);
    let paramLabel = curveType <= 2 ? 'Size' : 'Parameter';
    text(paramLabel + ':', sliderX - 35, sliderY);

    // Track
    fill(200);
    noStroke();
    rect(sliderX, sliderY - sliderHeight / 2, sliderWidth, sliderHeight, 4);

    // Filled portion
    fill(100, 50, 150);
    rect(sliderX, sliderY - sliderHeight / 2, sliderWidth * sliderValue, sliderHeight, 4);

    // Handle
    let handleX = sliderX + sliderWidth * sliderValue;
    fill(255);
    stroke(100, 50, 150);
    strokeWeight(2);
    ellipse(handleX, sliderY, 16, 16);

    // Value
    fill(0);
    noStroke();
    textAlign(LEFT, CENTER);
    text(param1.toFixed(1), sliderX + sliderWidth + 10, sliderY);
}

function drawButton() {
    // Button
    let isHover = mouseX > buttonX && mouseX < buttonX + buttonWidth &&
                  mouseY > buttonY && mouseY < buttonY + buttonHeight;

    fill(isHover ? [80, 40, 130] : [100, 50, 150]);
    noStroke();
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 5);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(13);
    text('Random Point', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
}

function mousePressed() {
    // Check dropdown
    if (mouseX > dropdownX && mouseX < dropdownX + dropdownWidth) {
        if (mouseY > dropdownY && mouseY < dropdownY + dropdownHeight) {
            dropdownOpen = !dropdownOpen;
            return;
        }

        if (dropdownOpen) {
            let menuTop = dropdownY + dropdownHeight;
            for (let i = 0; i < curves.length; i++) {
                let itemY = menuTop + i * 26;
                if (mouseY > itemY && mouseY < itemY + 26) {
                    curveType = i;
                    dropdownOpen = false;
                    updateParamsForCurve();
                    findInitialPoint();
                    return;
                }
            }
        }
    }

    // Close dropdown if clicking elsewhere
    if (dropdownOpen) {
        dropdownOpen = false;
        return;
    }

    // Check checkbox
    if (mouseX > checkboxX && mouseX < checkboxX + checkboxSize &&
        mouseY > checkboxY && mouseY < checkboxY + checkboxSize) {
        showTangent = !showTangent;
        return;
    }

    // Check slider
    if (mouseX > sliderX - 10 && mouseX < sliderX + sliderWidth + 10 &&
        mouseY > sliderY - 15 && mouseY < sliderY + 15) {
        sliderDragging = true;
        updateSlider();
        return;
    }

    // Check button
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth &&
        mouseY > buttonY && mouseY < buttonY + buttonHeight) {
        findRandomPoint();
        return;
    }

    // Check point dragging on chart
    let px = originX + pointX * scale;
    let py = originY - pointY * scale;
    if (dist(mouseX, mouseY, px, py) < 20) {
        isDragging = true;
        return;
    }

    // Click on chart to move point
    if (mouseX > chartLeft && mouseX < chartRight &&
        mouseY > chartTop && mouseY < chartBottom) {
        let mx = (mouseX - originX) / scale;
        let my = (originY - mouseY) / scale;
        findPointOnCurve(mx, my);
    }
}

function mouseDragged() {
    if (sliderDragging) {
        updateSlider();
        return;
    }

    if (isDragging) {
        let mx = (mouseX - originX) / scale;
        let my = (originY - mouseY) / scale;
        findPointOnCurve(mx, my);
    }
}

function mouseReleased() {
    isDragging = false;
    sliderDragging = false;
}

function updateSlider() {
    sliderValue = constrain((mouseX - sliderX) / sliderWidth, 0, 1);

    // Map slider to parameter range
    let minParam = 0.5;
    let maxParam = 4;
    param1 = minParam + sliderValue * (maxParam - minParam);

    // Update secondary parameter for ellipse/hyperbola
    if (curveType === 1 || curveType === 2) {
        param2 = param1 * 0.6;
    }

    // Re-find point on new curve
    findPointOnCurve(pointX, pointY);
}

function updateParamsForCurve() {
    switch (curveType) {
        case 0: // Circle
            param1 = 3;
            break;
        case 1: // Ellipse
            param1 = 3;
            param2 = 2;
            break;
        case 2: // Hyperbola
            param1 = 2;
            param2 = 1.5;
            break;
        case 3: // Folium
            param1 = 2;
            break;
        case 4: // Lemniscate
            param1 = 3;
            break;
    }
    sliderValue = (param1 - 0.5) / 3.5;
}

function findInitialPoint() {
    switch (curveType) {
        case 0: // Circle - right side
            pointX = param1;
            pointY = 0;
            break;
        case 1: // Ellipse - right vertex
            pointX = param1;
            pointY = 0;
            break;
        case 2: // Hyperbola - right branch
            pointX = param1 * 1.2;
            pointY = param2 * sqrt((pointX * pointX) / (param1 * param1) - 1);
            break;
        case 3: // Folium - loop
            let t = 0.8;
            pointX = 3 * param1 * t / (1 + t * t * t);
            pointY = 3 * param1 * t * t / (1 + t * t * t);
            break;
        case 4: // Lemniscate - right loop
            pointX = param1 * 0.9;
            let r2 = pointX * pointX;
            let disc = param1 * param1 - r2;
            if (disc > 0) {
                pointY = sqrt(disc * r2 / param1 / param1);
            } else {
                pointY = 0;
            }
            break;
    }

    // Snap to curve
    findPointOnCurve(pointX, pointY);
}

function findPointOnCurve(targetX, targetY) {
    // Newton's method to find closest point on curve
    let x = targetX;
    let y = targetY;

    // Start by moving toward the curve
    for (let iter = 0; iter < 50; iter++) {
        let f = implicitF(x, y);
        let fx = dFdx(x, y);
        let fy = dFdy(x, y);

        let gradMag = sqrt(fx * fx + fy * fy);
        if (gradMag < 0.0001) break;

        // Move along gradient toward curve
        let step = f / (gradMag * gradMag);
        x -= fx * step;
        y -= fy * step;

        if (abs(f) < 0.001) break;
    }

    // Check if point is valid
    if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
        return;
    }

    // Keep in bounds
    x = constrain(x, xMin + 0.5, xMax - 0.5);
    y = constrain(y, yMin + 0.5, yMax - 0.5);

    // Verify point is on curve
    if (abs(implicitF(x, y)) < 0.1) {
        pointX = x;
        pointY = y;
    }
}

function findRandomPoint() {
    let attempts = 0;
    while (attempts < 100) {
        let x, y;

        switch (curveType) {
            case 0: // Circle
                let angle = random(TWO_PI);
                x = param1 * cos(angle);
                y = param1 * sin(angle);
                break;
            case 1: // Ellipse
                let t1 = random(TWO_PI);
                x = param1 * cos(t1);
                y = param2 * sin(t1);
                break;
            case 2: // Hyperbola
                let t2 = random(-2, 2);
                let sign = random() > 0.5 ? 1 : -1;
                x = sign * param1 * cosh(t2);
                y = param2 * sinh(t2);
                break;
            case 3: // Folium
                let t3 = random(0.1, 3);
                x = 3 * param1 * t3 / (1 + t3 * t3 * t3);
                y = 3 * param1 * t3 * t3 / (1 + t3 * t3 * t3);
                break;
            case 4: // Lemniscate
                let t4 = random(-0.7, 0.7);
                let r = param1 * sqrt(cos(2 * t4));
                x = r * cos(t4);
                y = r * sin(t4);
                break;
            default:
                x = random(-3, 3);
                y = random(-3, 3);
        }

        // Check bounds
        if (x >= xMin + 0.5 && x <= xMax - 0.5 &&
            y >= yMin + 0.5 && y <= yMax - 0.5) {
            findPointOnCurve(x, y);
            return;
        }
        attempts++;
    }
}

// Hyperbolic functions for hyperbola
function cosh(x) {
    return (exp(x) + exp(-x)) / 2;
}

function sinh(x) {
    return (exp(x) - exp(-x)) / 2;
}
