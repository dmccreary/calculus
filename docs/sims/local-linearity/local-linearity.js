// Local Linearity MicroSim
// Demonstrates how curves appear linear when zoomed in sufficiently
// Illustrating the foundation of tangent approximation
// Bloom Level: Understand (L2), Verb: explain, interpret, demonstrate

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Graph parameters
let graphLeft = 60;
let graphRight;
let graphTop = 70;
let graphBottom;

// State variables
let zoomLevel = 1;
let xPoint = 1; // point of tangency
let currentFunction = 0; // 0: x^2, 1: sin(x), 2: x^3, 3: e^x
let showTangent = true;

// Control regions for canvas-based controls
let zoomSlider = { x: 0, y: 0, width: 0, height: 20, min: 1, max: 1000, value: 1 };
let pointSlider = { x: 0, y: 0, width: 0, height: 20, min: -2.5, max: 2.5, value: 1 };
let functionButtons = [];
let tangentToggle = { x: 0, y: 0, width: 120, height: 25, checked: true };

// Dragging state
let draggingZoom = false;
let draggingPoint = false;

// Function definitions
const functions = [
    { name: 'x\u00B2', fn: (x) => x * x, derivative: (x) => 2 * x },
    { name: 'sin(x)', fn: (x) => Math.sin(x), derivative: (x) => Math.cos(x) },
    { name: 'x\u00B3', fn: (x) => x * x * x, derivative: (x) => 3 * x * x },
    { name: 'e\u02E3', fn: (x) => Math.exp(x), derivative: (x) => Math.exp(x) }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Initialize function buttons
    updateFunctionButtons();

    describe('Interactive visualization showing how curves appear linear when zoomed in sufficiently, demonstrating local linearity and tangent approximation', LABEL);
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

    // Update graph bounds
    graphRight = canvasWidth - 150;
    graphBottom = drawHeight - 40;

    // Title and subtitle
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Local Linearity: Zoom In!', canvasWidth * 0.35, 8);
    textSize(14);
    fill(80);
    text('f(x) = ' + functions[currentFunction].name, canvasWidth * 0.35, 30);

    // Draw graph elements
    drawAxes();
    drawFunction();
    if (showTangent) {
        drawTangentLine();
    }
    drawTangentPoint();
    drawInfoPanel();

    // Draw controls
    drawControls();
}

function drawAxes() {
    // Calculate view window based on zoom
    let viewWidth = 6 / zoomLevel;  // At zoom 1, view is 6 units wide (-3 to 3)
    let viewHeight = 6 / zoomLevel;

    let yAtPoint = functions[currentFunction].fn(xPoint);
    let xMin = xPoint - viewWidth / 2;
    let xMax = xPoint + viewWidth / 2;
    let yMin = yAtPoint - viewHeight / 2;
    let yMax = yAtPoint + viewHeight / 2;

    stroke(200);
    strokeWeight(1);

    // Calculate nice grid spacing based on zoom level
    let gridSpacing = getGridSpacing(viewWidth);

    // Grid lines
    let startX = Math.ceil(xMin / gridSpacing) * gridSpacing;
    for (let x = startX; x <= xMax; x += gridSpacing) {
        let px = map(x, xMin, xMax, graphLeft, graphRight);
        if (px >= graphLeft && px <= graphRight) {
            line(px, graphTop, px, graphBottom);
        }
    }

    let startY = Math.ceil(yMin / gridSpacing) * gridSpacing;
    for (let y = startY; y <= yMax; y += gridSpacing) {
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop && py <= graphBottom) {
            line(graphLeft, py, graphRight, py);
        }
    }

    // Axes
    stroke(0);
    strokeWeight(2);
    let y0 = map(0, yMin, yMax, graphBottom, graphTop);
    let x0 = map(0, xMin, xMax, graphLeft, graphRight);

    // X-axis
    if (y0 >= graphTop && y0 <= graphBottom) {
        line(graphLeft, y0, graphRight, y0);
    }
    // Y-axis
    if (x0 >= graphLeft && x0 <= graphRight) {
        line(x0, graphTop, x0, graphBottom);
    }

    // Axis labels
    fill(0);
    noStroke();
    textSize(10);

    textAlign(CENTER, TOP);
    for (let x = startX; x <= xMax; x += gridSpacing) {
        let px = map(x, xMin, xMax, graphLeft, graphRight);
        if (px >= graphLeft + 20 && px <= graphRight - 20) {
            let labelY = constrain(y0, graphTop, graphBottom - 15);
            text(formatNumber(x), px, labelY + 3);
        }
    }

    textAlign(RIGHT, CENTER);
    for (let y = startY; y <= yMax; y += gridSpacing) {
        let py = map(y, yMin, yMax, graphBottom, graphTop);
        if (py >= graphTop + 10 && py <= graphBottom - 10 && Math.abs(y) > gridSpacing * 0.1) {
            let labelX = constrain(x0, graphLeft + 25, graphRight);
            text(formatNumber(y), labelX - 5, py);
        }
    }

    // Axis titles
    textSize(14);
    textAlign(CENTER, TOP);
    text('x', graphRight + 15, constrain(y0, graphTop, graphBottom) - 5);
    textAlign(RIGHT, CENTER);
    text('y', constrain(x0, graphLeft, graphRight) - 10, graphTop - 10);
}

function getGridSpacing(viewWidth) {
    // Choose a nice grid spacing based on view width
    let targetLines = 6; // Aim for about 6 grid lines
    let rawSpacing = viewWidth / targetLines;

    // Round to a nice number
    let magnitude = Math.pow(10, Math.floor(Math.log10(rawSpacing)));
    let normalized = rawSpacing / magnitude;

    let niceSpacing;
    if (normalized < 1.5) niceSpacing = 1;
    else if (normalized < 3) niceSpacing = 2;
    else if (normalized < 7) niceSpacing = 5;
    else niceSpacing = 10;

    return niceSpacing * magnitude;
}

function formatNumber(num) {
    if (Math.abs(num) < 0.0001) return '0';
    if (Math.abs(num) >= 1000) return num.toExponential(1);
    if (Math.abs(num) < 0.01) return num.toExponential(1);
    if (Math.abs(num - Math.round(num)) < 0.0001) return Math.round(num).toString();
    return num.toFixed(3).replace(/\.?0+$/, '');
}

function drawFunction() {
    // Calculate view window based on zoom
    let viewWidth = 6 / zoomLevel;
    let viewHeight = 6 / zoomLevel;

    let yAtPoint = functions[currentFunction].fn(xPoint);
    let xMin = xPoint - viewWidth / 2;
    let xMax = xPoint + viewWidth / 2;
    let yMin = yAtPoint - viewHeight / 2;
    let yMax = yAtPoint + viewHeight / 2;

    // Draw the actual function curve
    stroke(0, 100, 200);
    strokeWeight(3);
    noFill();

    beginShape();
    for (let px = graphLeft; px <= graphRight; px += 1) {
        let x = map(px, graphLeft, graphRight, xMin, xMax);
        let y = functions[currentFunction].fn(x);
        let py = map(y, yMin, yMax, graphBottom, graphTop);

        if (py >= graphTop - 50 && py <= graphBottom + 50) {
            vertex(px, constrain(py, graphTop - 10, graphBottom + 10));
        }
    }
    endShape();
}

function drawTangentLine() {
    // Calculate view window based on zoom
    let viewWidth = 6 / zoomLevel;
    let viewHeight = 6 / zoomLevel;

    let yAtPoint = functions[currentFunction].fn(xPoint);
    let slope = functions[currentFunction].derivative(xPoint);
    let xMin = xPoint - viewWidth / 2;
    let xMax = xPoint + viewWidth / 2;
    let yMin = yAtPoint - viewHeight / 2;
    let yMax = yAtPoint + viewHeight / 2;

    // Tangent line: y - yAtPoint = slope * (x - xPoint)
    stroke(220, 100, 50);
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);

    let x1 = xMin;
    let y1 = yAtPoint + slope * (x1 - xPoint);
    let x2 = xMax;
    let y2 = yAtPoint + slope * (x2 - xPoint);

    let px1 = map(x1, xMin, xMax, graphLeft, graphRight);
    let py1 = map(y1, yMin, yMax, graphBottom, graphTop);
    let px2 = map(x2, xMin, xMax, graphLeft, graphRight);
    let py2 = map(y2, yMin, yMax, graphBottom, graphTop);

    line(px1, py1, px2, py2);
    drawingContext.setLineDash([]);
}

function drawTangentPoint() {
    // Calculate view window based on zoom
    let viewWidth = 6 / zoomLevel;
    let viewHeight = 6 / zoomLevel;

    let yAtPoint = functions[currentFunction].fn(xPoint);
    let xMin = xPoint - viewWidth / 2;
    let xMax = xPoint + viewWidth / 2;
    let yMin = yAtPoint - viewHeight / 2;
    let yMax = yAtPoint + viewHeight / 2;

    // Draw point of tangency
    let px = map(xPoint, xMin, xMax, graphLeft, graphRight);
    let py = map(yAtPoint, yMin, yMax, graphBottom, graphTop);

    if (px >= graphLeft && px <= graphRight && py >= graphTop && py <= graphBottom) {
        fill(0, 150, 100);
        noStroke();
        circle(px, py, 12);
    }
}

function drawInfoPanel() {
    let panelX = graphRight + 10;
    let panelY = graphTop;
    let panelWidth = canvasWidth - graphRight - 15;
    let panelHeight = 210;

    // Panel background
    fill(255, 255, 255, 230);
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

    let yAtPoint = functions[currentFunction].fn(xPoint);
    let slope = functions[currentFunction].derivative(xPoint);

    // Zoom info
    textSize(13);
    fill(0, 100, 200);
    text('Zoom: ' + zoomLevel + 'x', panelX + 8, yPos);
    yPos += lineHeight + 5;

    // Point info
    fill(0);
    textSize(11);
    text('Point: (' + xPoint.toFixed(2) + ', ' + yAtPoint.toFixed(3) + ')', panelX + 8, yPos);
    yPos += lineHeight;

    // Tangent slope
    fill(220, 100, 50);
    text('Slope: ' + slope.toFixed(4), panelX + 8, yPos);
    yPos += lineHeight + 8;

    // Error measurement
    fill(0);
    textSize(11);
    text('Approximation', panelX + 8, yPos);
    yPos += lineHeight - 2;
    text('Error:', panelX + 8, yPos);
    yPos += lineHeight;

    // Calculate max error in visible window
    let viewWidth = 6 / zoomLevel;
    let maxError = calculateMaxError(viewWidth);

    // Color code error
    if (maxError < 0.001) {
        fill(0, 150, 0);
    } else if (maxError < 0.01) {
        fill(100, 150, 0);
    } else if (maxError < 0.1) {
        fill(200, 150, 0);
    } else {
        fill(200, 50, 0);
    }

    textSize(12);
    text(formatError(maxError), panelX + 8, yPos);
    yPos += lineHeight + 10;

    // Message based on zoom level
    fill(80);
    textSize(10);
    textAlign(LEFT, TOP);

    if (zoomLevel >= 100) {
        fill(0, 120, 0);
        text('Nearly', panelX + 8, yPos);
        yPos += 14;
        text('indistinguishable!', panelX + 8, yPos);
    } else if (zoomLevel >= 20) {
        text('Curve looks', panelX + 8, yPos);
        yPos += 14;
        text('very linear', panelX + 8, yPos);
    } else if (zoomLevel >= 5) {
        text('Starting to', panelX + 8, yPos);
        yPos += 14;
        text('look linear', panelX + 8, yPos);
    } else {
        text('Curve is', panelX + 8, yPos);
        yPos += 14;
        text('clearly visible', panelX + 8, yPos);
    }
}

function calculateMaxError(viewWidth) {
    // Calculate maximum error between curve and tangent in visible window
    let yAtPoint = functions[currentFunction].fn(xPoint);
    let slope = functions[currentFunction].derivative(xPoint);

    let maxError = 0;
    let samples = 50;

    for (let i = 0; i <= samples; i++) {
        let dx = (i / samples - 0.5) * viewWidth;
        let x = xPoint + dx;

        let actualY = functions[currentFunction].fn(x);
        let tangentY = yAtPoint + slope * dx;

        let error = Math.abs(actualY - tangentY);
        maxError = Math.max(maxError, error);
    }

    return maxError;
}

function formatError(error) {
    if (error < 0.0000001) return '< 0.0000001';
    if (error < 0.001) return error.toExponential(2);
    return error.toFixed(6);
}

function drawControls() {
    // Update slider positions based on canvas width
    let sliderWidth = canvasWidth - sliderLeftMargin - margin;

    // Row 1: Zoom slider
    zoomSlider.x = sliderLeftMargin;
    zoomSlider.y = drawHeight + 8;
    zoomSlider.width = sliderWidth;

    // Row 2: Point slider
    pointSlider.x = sliderLeftMargin;
    pointSlider.y = drawHeight + 43;
    pointSlider.width = sliderWidth;

    // Row 3: Function buttons and tangent toggle
    updateFunctionButtons();
    tangentToggle.x = canvasWidth - 130;
    tangentToggle.y = drawHeight + 78;

    // Draw zoom slider
    drawSlider(zoomSlider, 'Zoom: ' + zoomLevel + 'x', 10, drawHeight + 18);

    // Draw point slider
    drawSlider(pointSlider, 'Point x: ' + xPoint.toFixed(2), 10, drawHeight + 53);

    // Draw function buttons
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('f(x):', 10, drawHeight + 90);

    for (let i = 0; i < functionButtons.length; i++) {
        let btn = functionButtons[i];

        // Button background
        if (i === currentFunction) {
            fill(0, 100, 200);
        } else {
            fill(200);
        }
        stroke(150);
        strokeWeight(1);
        rect(btn.x, btn.y, btn.width, btn.height, 4);

        // Button text
        fill(i === currentFunction ? 255 : 0);
        noStroke();
        textSize(12);
        textAlign(CENTER, CENTER);
        text(functions[i].name, btn.x + btn.width/2, btn.y + btn.height/2);
    }

    // Draw tangent toggle
    stroke(150);
    strokeWeight(1);
    if (showTangent) {
        fill(220, 100, 50);
    } else {
        fill(200);
    }
    rect(tangentToggle.x, tangentToggle.y, tangentToggle.width, tangentToggle.height, 4);

    fill(showTangent ? 255 : 80);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text('Show Tangent', tangentToggle.x + tangentToggle.width/2, tangentToggle.y + tangentToggle.height/2);
}

function drawSlider(slider, label, labelX, labelY) {
    // Track
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(slider.x, slider.y, slider.width, slider.height, 10);

    // Fill portion
    let fillWidth;
    if (slider === zoomSlider) {
        // Logarithmic mapping for zoom slider
        let logMin = Math.log10(slider.min);
        let logMax = Math.log10(slider.max);
        let logValue = Math.log10(slider.value);
        fillWidth = map(logValue, logMin, logMax, 0, slider.width);
    } else {
        fillWidth = map(slider.value, slider.min, slider.max, 0, slider.width);
    }

    fill(0, 100, 200);
    noStroke();
    rect(slider.x, slider.y, fillWidth, slider.height, 10);

    // Handle
    let handleX = slider.x + fillWidth;
    fill(255);
    stroke(0, 100, 200);
    strokeWeight(2);
    circle(handleX, slider.y + slider.height/2, 18);

    // Label
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text(label, labelX, labelY);
}

function updateFunctionButtons() {
    functionButtons = [];
    let startX = 50;
    let btnWidth = 50;
    let btnHeight = 22;
    let btnGap = 5;

    for (let i = 0; i < functions.length; i++) {
        functionButtons.push({
            x: startX + i * (btnWidth + btnGap),
            y: drawHeight + 78,
            width: btnWidth,
            height: btnHeight
        });
    }
}

function mousePressed() {
    // Check zoom slider
    if (isOverSlider(zoomSlider)) {
        draggingZoom = true;
        updateZoomFromMouse();
    }

    // Check point slider
    if (isOverSlider(pointSlider)) {
        draggingPoint = true;
        updatePointFromMouse();
    }

    // Check function buttons
    for (let i = 0; i < functionButtons.length; i++) {
        let btn = functionButtons[i];
        if (mouseX >= btn.x && mouseX <= btn.x + btn.width &&
            mouseY >= btn.y && mouseY <= btn.y + btn.height) {
            currentFunction = i;
        }
    }

    // Check tangent toggle
    if (mouseX >= tangentToggle.x && mouseX <= tangentToggle.x + tangentToggle.width &&
        mouseY >= tangentToggle.y && mouseY <= tangentToggle.y + tangentToggle.height) {
        showTangent = !showTangent;
    }
}

function mouseDragged() {
    if (draggingZoom) {
        updateZoomFromMouse();
    }
    if (draggingPoint) {
        updatePointFromMouse();
    }
}

function mouseReleased() {
    draggingZoom = false;
    draggingPoint = false;
}

function isOverSlider(slider) {
    return mouseX >= slider.x && mouseX <= slider.x + slider.width &&
           mouseY >= slider.y - 5 && mouseY <= slider.y + slider.height + 5;
}

function updateZoomFromMouse() {
    let t = constrain((mouseX - zoomSlider.x) / zoomSlider.width, 0, 1);
    // Logarithmic mapping for zoom
    let logMin = Math.log10(zoomSlider.min);
    let logMax = Math.log10(zoomSlider.max);
    let logValue = lerp(logMin, logMax, t);
    zoomLevel = Math.round(Math.pow(10, logValue));
    zoomLevel = constrain(zoomLevel, zoomSlider.min, zoomSlider.max);
    zoomSlider.value = zoomLevel;
}

function updatePointFromMouse() {
    let t = constrain((mouseX - pointSlider.x) / pointSlider.width, 0, 1);
    xPoint = lerp(pointSlider.min, pointSlider.max, t);
    xPoint = Math.round(xPoint * 20) / 20; // Round to nearest 0.05
    pointSlider.value = xPoint;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
