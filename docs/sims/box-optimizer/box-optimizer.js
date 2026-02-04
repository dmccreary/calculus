// Box Optimizer MicroSim
// Demonstrates how cutting squares from cardboard corners affects box volume
// Students examine the relationship between cut size x and resulting volume V(x)
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 800;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Layout regions
let margin = 15;
let flatViewWidth, boxViewWidth, graphWidth;
let flatViewX, boxViewX, graphX;
let topRowHeight = 280;
let graphHeight = 200;
let graphY;

// Cardboard dimensions (default 12 x 18)
let cardboardLength = 18;
let cardboardWidth = 12;

// Cut size
let cutSize = 2;
let maxCut;
let optimalCut;
let maxVolume;

// Animation state
let isAnimating = false;
let animationProgress = 0;
let animationSpeed = 0.02;

// View mode: 'flat', '3d', or 'both'
let viewMode = 'both';

// Control regions (canvas-based buttons)
let buttons = [];
let slider = {x: 0, y: 0, width: 0, height: 20, value: 2, min: 0.1, max: 6, dragging: false};

// Text input simulation
let lengthInput = {value: '18', active: false, x: 0, y: 0, width: 50, height: 24};
let widthInput = {value: '12', active: false, x: 0, y: 0, width: 50, height: 24};

// 3D rotation
let rotationX = -0.4;
let rotationY = 0.3;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
    canvas.parent(document.querySelector('main'));

    calculateOptimal();
    setupControls();

    describe('Interactive box optimization showing how corner cut size affects volume. Shows flat cardboard, 3D box, and volume function graph.', LABEL);
}

function setupControls() {
    // Calculate button positions
    let btnY = drawHeight + 15;
    let btnHeight = 30;
    let btnWidth = 100;

    buttons = [
        {label: 'Animate Fold', x: margin, y: btnY, width: btnWidth, height: btnHeight, action: 'animate'},
        {label: 'Show Optimal', x: margin + btnWidth + 10, y: btnY, width: btnWidth, height: btnHeight, action: 'optimal'},
        {label: 'Reset', x: margin + 2*(btnWidth + 10), y: btnY, width: 70, height: btnHeight, action: 'reset'}
    ];

    // Slider for cut size
    slider.x = margin + 3*(btnWidth + 10) + 80;
    slider.y = btnY + 5;
    slider.width = 200;
}

function draw() {
    updateCanvasSize();

    // Translate to corner for 2D-style drawing (WEBGL centers at 0,0)
    push();
    translate(-canvasWidth/2, -canvasHeight/2);

    // Background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill(0);
    noStroke();
    textSize(20);
    textAlign(CENTER, TOP);
    text('Box Volume Optimization', canvasWidth/2, 8);

    // Calculate layout
    calculateLayout();

    // Update animation
    if (isAnimating) {
        animationProgress += animationSpeed;
        if (animationProgress >= 1) {
            animationProgress = 1;
            isAnimating = false;
        }
    }

    // Draw the three panels
    drawFlatView();
    drawVolumeGraph();

    // Draw controls
    drawControls();

    // Draw data panel
    drawDataPanel();

    pop();

    // Draw 3D box (needs to be outside the 2D translation)
    draw3DBox();
}

function calculateLayout() {
    // Three columns
    let availableWidth = canvasWidth - 4*margin;
    flatViewWidth = availableWidth * 0.32;
    boxViewWidth = availableWidth * 0.32;
    graphWidth = availableWidth * 0.36;

    flatViewX = margin;
    boxViewX = margin + flatViewWidth + margin;
    graphX = boxViewX + boxViewWidth + margin;

    graphY = 40;
}

function drawFlatView() {
    push();
    translate(flatViewX, 40);

    // Panel background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, flatViewWidth, topRowHeight);

    // Panel title
    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text('Flat Cardboard Template', flatViewWidth/2, 5);

    // Scale to fit
    let scale = min((flatViewWidth - 40) / cardboardLength, (topRowHeight - 60) / cardboardWidth);
    let offsetX = (flatViewWidth - cardboardLength * scale) / 2;
    let offsetY = 30 + (topRowHeight - 60 - cardboardWidth * scale) / 2;

    push();
    translate(offsetX, offsetY);

    // Draw cardboard outline
    stroke(100);
    strokeWeight(2);
    fill(210, 180, 140); // tan color for cardboard
    rect(0, 0, cardboardLength * scale, cardboardWidth * scale);

    let x = cutSize;
    let xs = x * scale;

    // Draw cut squares (corners) in gray
    fill(180);
    stroke(100);
    strokeWeight(1);
    // Top-left
    rect(0, 0, xs, xs);
    // Top-right
    rect((cardboardLength - x) * scale, 0, xs, xs);
    // Bottom-left
    rect(0, (cardboardWidth - x) * scale, xs, xs);
    // Bottom-right
    rect((cardboardLength - x) * scale, (cardboardWidth - x) * scale, xs, xs);

    // Draw dashed fold lines
    stroke(50, 50, 200);
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);

    // Vertical fold lines
    line(xs, xs, xs, (cardboardWidth - x) * scale);
    line((cardboardLength - x) * scale, xs, (cardboardLength - x) * scale, (cardboardWidth - x) * scale);

    // Horizontal fold lines
    line(xs, xs, (cardboardLength - x) * scale, xs);
    line(xs, (cardboardWidth - x) * scale, (cardboardLength - x) * scale, (cardboardWidth - x) * scale);

    drawingContext.setLineDash([]);

    // Dimension labels
    fill(0);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);

    // Length label
    text(cardboardLength + ' in', cardboardLength * scale / 2, cardboardWidth * scale + 5);

    // Width label
    push();
    translate(-10, cardboardWidth * scale / 2);
    rotate(-PI/2);
    text(cardboardWidth + ' in', 0, 0);
    pop();

    // Cut size label
    textAlign(LEFT, TOP);
    fill(100);
    text('x = ' + cutSize.toFixed(2), xs + 3, 3);

    pop();
    pop();
}

function draw3DBox() {
    // Calculate box dimensions
    let boxLength = cardboardLength - 2 * cutSize;
    let boxWidth = cardboardWidth - 2 * cutSize;
    let boxHeight = cutSize;

    if (boxLength <= 0 || boxWidth <= 0 || boxHeight <= 0) return;

    // Position for 3D view (in WEBGL coordinates)
    let centerX = -canvasWidth/2 + boxViewX + boxViewWidth/2;
    let centerY = -canvasHeight/2 + 40 + topRowHeight/2 + 20;

    push();
    translate(centerX, centerY, 0);

    // Apply rotation
    rotateX(rotationX);
    rotateY(rotationY);

    // Scale factor for 3D box
    let scale3D = min(boxViewWidth * 0.4 / max(boxLength, boxWidth), 80 / max(boxLength, boxWidth, boxHeight));

    // Animation: fold up the sides
    let foldAngle = isAnimating || animationProgress > 0 ? animationProgress * PI/2 : PI/2;

    // Draw the box
    stroke(100);
    strokeWeight(1);

    // Base
    fill(210, 180, 140);
    push();
    translate(0, boxHeight * scale3D / 2, 0);
    box(boxLength * scale3D, 2, boxWidth * scale3D);
    pop();

    // Sides (fold animation)
    if (foldAngle > 0) {
        // Front side
        push();
        translate(0, boxHeight * scale3D / 2, boxWidth * scale3D / 2);
        rotateX(-foldAngle);
        translate(0, -boxHeight * scale3D / 2, 0);
        fill(180, 150, 120);
        box(boxLength * scale3D, boxHeight * scale3D, 2);
        pop();

        // Back side
        push();
        translate(0, boxHeight * scale3D / 2, -boxWidth * scale3D / 2);
        rotateX(foldAngle);
        translate(0, -boxHeight * scale3D / 2, 0);
        fill(180, 150, 120);
        box(boxLength * scale3D, boxHeight * scale3D, 2);
        pop();

        // Left side
        push();
        translate(-boxLength * scale3D / 2, boxHeight * scale3D / 2, 0);
        rotateZ(foldAngle);
        translate(0, -boxHeight * scale3D / 2, 0);
        fill(160, 130, 100);
        box(2, boxHeight * scale3D, boxWidth * scale3D);
        pop();

        // Right side
        push();
        translate(boxLength * scale3D / 2, boxHeight * scale3D / 2, 0);
        rotateZ(-foldAngle);
        translate(0, -boxHeight * scale3D / 2, 0);
        fill(160, 130, 100);
        box(2, boxHeight * scale3D, boxWidth * scale3D);
        pop();
    }

    pop();

    // Draw panel border and title in 2D
    push();
    translate(-canvasWidth/2, -canvasHeight/2);

    fill(255, 255, 255, 0);
    stroke(200);
    strokeWeight(1);
    rect(boxViewX, 40, boxViewWidth, topRowHeight);

    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text('3D Box View', boxViewX + boxViewWidth/2, 45);

    // Dimension labels for 3D box
    textSize(11);
    fill(80);
    let boxL = (cardboardLength - 2*cutSize).toFixed(2);
    let boxW = (cardboardWidth - 2*cutSize).toFixed(2);
    let boxH = cutSize.toFixed(2);
    text('L: ' + boxL + ' x W: ' + boxW + ' x H: ' + boxH, boxViewX + boxViewWidth/2, topRowHeight + 20);

    pop();
}

function drawVolumeGraph() {
    push();
    translate(graphX, graphY);

    // Panel background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, graphWidth, topRowHeight);

    // Panel title
    fill(0);
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text('Volume Function V(x)', graphWidth/2, 5);

    // Graph area
    let gMargin = 45;
    let gWidth = graphWidth - 2*gMargin;
    let gHeight = topRowHeight - 80;
    let gX = gMargin;
    let gY = 30;

    // Graph background
    fill(250);
    stroke(220);
    rect(gX, gY, gWidth, gHeight);

    // Draw axes
    stroke(0);
    strokeWeight(1);
    // X-axis
    line(gX, gY + gHeight, gX + gWidth, gY + gHeight);
    // Y-axis
    line(gX, gY, gX, gY + gHeight);

    // Axis labels
    fill(0);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text('Cut Size x (in)', gX + gWidth/2, gY + gHeight + 5);

    push();
    translate(gX - 25, gY + gHeight/2);
    rotate(-PI/2);
    textAlign(CENTER, BOTTOM);
    text('Volume (in^3)', 0, 0);
    pop();

    // Calculate max for scaling
    maxCut = cardboardWidth / 2;

    // Find max volume for scaling
    let tempMax = 0;
    for (let t = 0.1; t <= maxCut; t += 0.1) {
        let v = calculateVolume(t);
        if (v > tempMax) tempMax = v;
    }

    // Draw the curve
    stroke(0, 100, 200);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let t = 0.1; t <= maxCut; t += 0.05) {
        let v = calculateVolume(t);
        let px = gX + (t / maxCut) * gWidth;
        let py = gY + gHeight - (v / (tempMax * 1.1)) * gHeight;
        vertex(px, py);
    }
    endShape();

    // Mark optimal point
    stroke(0, 180, 0);
    strokeWeight(2);
    let optX = gX + (optimalCut / maxCut) * gWidth;
    let optY = gY + gHeight - (maxVolume / (tempMax * 1.1)) * gHeight;
    fill(0, 180, 0);
    circle(optX, optY, 10);

    // Mark current point
    let currentVolume = calculateVolume(cutSize);
    let curX = gX + (cutSize / maxCut) * gWidth;
    let curY = gY + gHeight - (currentVolume / (tempMax * 1.1)) * gHeight;

    // Vertical line to current point
    stroke(200, 0, 0);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(curX, gY + gHeight, curX, curY);
    drawingContext.setLineDash([]);

    // Current point marker
    fill(200, 0, 0);
    noStroke();
    circle(curX, curY, 12);

    // Labels
    textSize(9);
    fill(0, 180, 0);
    textAlign(LEFT, BOTTOM);
    text('Max: (' + optimalCut.toFixed(2) + ', ' + maxVolume.toFixed(1) + ')', optX + 5, optY - 5);

    fill(200, 0, 0);
    textAlign(LEFT, TOP);
    text('Current', curX + 5, curY + 5);

    // X-axis tick marks
    stroke(0);
    strokeWeight(1);
    textSize(9);
    fill(0);
    textAlign(CENTER, TOP);
    for (let t = 0; t <= maxCut; t += 1) {
        let tx = gX + (t / maxCut) * gWidth;
        line(tx, gY + gHeight, tx, gY + gHeight + 4);
        text(t, tx, gY + gHeight + 6);
    }

    pop();
}

function drawDataPanel() {
    // Data panel below the three views
    let panelY = topRowHeight + 55;
    let panelHeight = drawHeight - panelY - 10;

    push();
    translate(margin, panelY);

    // Background
    fill(245, 248, 250);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, canvasWidth - 2*margin, panelHeight, 5);

    // Calculate values
    let boxLength = cardboardLength - 2 * cutSize;
    let boxWidth = cardboardWidth - 2 * cutSize;
    let boxHeight = cutSize;
    let currentVolume = calculateVolume(cutSize);
    let percentOfMax = (currentVolume / maxVolume) * 100;

    // Display data
    fill(0);
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);

    let col1 = 15;
    let col2 = 200;
    let col3 = 420;
    let rowY = panelHeight / 2;

    // Column 1: Dimensions
    text('Box Dimensions:', col1, rowY - 15);
    textSize(12);
    fill(60);
    text('Length: ' + boxLength.toFixed(2) + ' in', col1 + 10, rowY + 5);
    text('Width: ' + boxWidth.toFixed(2) + ' in', col1 + 10, rowY + 22);
    text('Height: ' + boxHeight.toFixed(2) + ' in', col1 + 10, rowY + 39);

    // Column 2: Volume
    fill(0);
    textSize(13);
    text('Volume:', col2, rowY - 15);
    textSize(16);
    fill(0, 100, 200);
    text('V = ' + currentVolume.toFixed(2) + ' in^3', col2 + 10, rowY + 12);

    // Column 3: Comparison to optimal
    fill(0);
    textSize(13);
    text('Optimization:', col3, rowY - 15);
    textSize(12);

    // Progress bar
    let barWidth = 150;
    let barHeight = 16;
    let barX = col3 + 10;
    let barY = rowY + 5;

    // Background bar
    fill(220);
    stroke(180);
    rect(barX, barY, barWidth, barHeight, 3);

    // Fill bar
    let fillWidth = (percentOfMax / 100) * barWidth;
    if (percentOfMax > 95) {
        fill(0, 180, 0);
    } else if (percentOfMax > 70) {
        fill(255, 180, 0);
    } else {
        fill(200, 100, 100);
    }
    noStroke();
    rect(barX, barY, fillWidth, barHeight, 3);

    // Percentage text
    fill(0);
    textAlign(RIGHT, CENTER);
    text(percentOfMax.toFixed(1) + '% of max', barX + barWidth + 60, barY + barHeight/2);

    // Formula display
    textAlign(LEFT, CENTER);
    textSize(11);
    fill(80);
    text('V(x) = x(' + cardboardLength + '-2x)(' + cardboardWidth + '-2x)', col3 + 10, rowY + 35);

    pop();
}

function drawControls() {
    push();
    translate(0, 0);

    // Draw buttons
    for (let btn of buttons) {
        // Button background
        if (isMouseOverButton(btn)) {
            fill(220, 230, 255);
        } else {
            fill(240);
        }
        stroke(150);
        strokeWeight(1);
        rect(btn.x, btn.y, btn.width, btn.height, 5);

        // Button text
        fill(0);
        noStroke();
        textSize(12);
        textAlign(CENTER, CENTER);
        text(btn.label, btn.x + btn.width/2, btn.y + btn.height/2);
    }

    // Draw slider
    drawSlider();

    // Draw dimension inputs
    drawDimensionInputs();

    pop();
}

function drawSlider() {
    let sliderY = drawHeight + 55;

    // Slider label
    fill(0);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Cut Size (x):', margin, sliderY + 10);

    // Slider track
    let trackX = margin + 85;
    let trackWidth = 250;
    slider.x = trackX;
    slider.y = sliderY;
    slider.width = trackWidth;

    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(trackX, sliderY + 3, trackWidth, 14, 7);

    // Slider fill
    let fillWidth = ((cutSize - slider.min) / (slider.max - slider.min)) * trackWidth;
    fill(100, 150, 220);
    noStroke();
    rect(trackX, sliderY + 3, fillWidth, 14, 7);

    // Slider handle
    let handleX = trackX + fillWidth;
    fill(255);
    stroke(100);
    strokeWeight(2);
    circle(handleX, sliderY + 10, 20);

    // Value display
    fill(0);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text(cutSize.toFixed(2) + ' in', trackX + trackWidth + 15, sliderY + 10);
}

function drawDimensionInputs() {
    let inputY = drawHeight + 55;
    let inputX = margin + 420;

    // Labels
    fill(0);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Cardboard:', inputX, inputY + 10);

    // Length input
    lengthInput.x = inputX + 75;
    lengthInput.y = inputY;

    fill(lengthInput.active ? 255 : 245);
    stroke(lengthInput.active ? 100 : 180);
    strokeWeight(1);
    rect(lengthInput.x, lengthInput.y, lengthInput.width, lengthInput.height, 3);

    fill(0);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text(lengthInput.value, lengthInput.x + lengthInput.width/2, lengthInput.y + lengthInput.height/2);

    // "x" between inputs
    text('x', lengthInput.x + lengthInput.width + 8, inputY + 10);

    // Width input
    widthInput.x = lengthInput.x + lengthInput.width + 20;
    widthInput.y = inputY;

    fill(widthInput.active ? 255 : 245);
    stroke(widthInput.active ? 100 : 180);
    rect(widthInput.x, widthInput.y, widthInput.width, widthInput.height, 3);

    fill(0);
    noStroke();
    text(widthInput.value, widthInput.x + widthInput.width/2, widthInput.y + widthInput.height/2);

    // Units
    textAlign(LEFT, CENTER);
    text('inches', widthInput.x + widthInput.width + 8, inputY + 10);
}

function calculateVolume(x) {
    let l = cardboardLength - 2*x;
    let w = cardboardWidth - 2*x;
    let h = x;
    if (l <= 0 || w <= 0 || h <= 0) return 0;
    return l * w * h;
}

function calculateOptimal() {
    // V(x) = x(L-2x)(W-2x) = x(LW - 2Lx - 2Wx + 4x^2) = 4x^3 - 2(L+W)x^2 + LWx
    // V'(x) = 12x^2 - 4(L+W)x + LW = 0
    // Using quadratic formula
    let L = cardboardLength;
    let W = cardboardWidth;
    let a = 12;
    let b = -4*(L + W);
    let c = L * W;

    let discriminant = b*b - 4*a*c;
    let x1 = (-b - sqrt(discriminant)) / (2*a);
    let x2 = (-b + sqrt(discriminant)) / (2*a);

    // Choose the valid root (must be positive and less than W/2)
    maxCut = W / 2;
    optimalCut = (x1 > 0 && x1 < maxCut) ? x1 : x2;
    maxVolume = calculateVolume(optimalCut);

    // Update slider max
    slider.max = maxCut - 0.1;
    if (cutSize > slider.max) cutSize = optimalCut;
}

function isMouseOverButton(btn) {
    let mx = mouseX + canvasWidth/2;
    let my = mouseY + canvasHeight/2;
    return mx > btn.x && mx < btn.x + btn.width && my > btn.y && my < btn.y + btn.height;
}

function mousePressed() {
    let mx = mouseX + canvasWidth/2;
    let my = mouseY + canvasHeight/2;

    // Check buttons
    for (let btn of buttons) {
        if (isMouseOverButton(btn)) {
            handleButtonClick(btn.action);
            return;
        }
    }

    // Check slider
    let sliderY = drawHeight + 55;
    if (mx > slider.x && mx < slider.x + slider.width &&
        my > sliderY && my < sliderY + 24) {
        slider.dragging = true;
        updateSliderFromMouse(mx);
    }

    // Check dimension inputs
    if (mx > lengthInput.x && mx < lengthInput.x + lengthInput.width &&
        my > lengthInput.y && my < lengthInput.y + lengthInput.height) {
        lengthInput.active = true;
        widthInput.active = false;
    } else if (mx > widthInput.x && mx < widthInput.x + widthInput.width &&
               my > widthInput.y && my < widthInput.y + widthInput.height) {
        widthInput.active = true;
        lengthInput.active = false;
    } else {
        lengthInput.active = false;
        widthInput.active = false;
    }
}

function mouseDragged() {
    if (slider.dragging) {
        let mx = mouseX + canvasWidth/2;
        updateSliderFromMouse(mx);
    }
}

function mouseReleased() {
    slider.dragging = false;
}

function updateSliderFromMouse(mx) {
    let ratio = constrain((mx - slider.x) / slider.width, 0, 1);
    cutSize = slider.min + ratio * (slider.max - slider.min);
    cutSize = round(cutSize * 100) / 100; // Round to 2 decimal places
}

function handleButtonClick(action) {
    if (action === 'animate') {
        isAnimating = true;
        animationProgress = 0;
    } else if (action === 'optimal') {
        cutSize = optimalCut;
    } else if (action === 'reset') {
        cutSize = 2;
        animationProgress = 1;
        isAnimating = false;
    }
}

function keyPressed() {
    // Handle input for dimension fields
    if (lengthInput.active || widthInput.active) {
        let input = lengthInput.active ? lengthInput : widthInput;

        if (key >= '0' && key <= '9') {
            if (input.value.length < 4) {
                input.value += key;
            }
        } else if (key === '.' && !input.value.includes('.')) {
            input.value += '.';
        } else if (keyCode === BACKSPACE) {
            input.value = input.value.slice(0, -1);
        } else if (keyCode === ENTER) {
            // Apply changes
            let newLength = parseFloat(lengthInput.value) || 18;
            let newWidth = parseFloat(widthInput.value) || 12;

            // Ensure length >= width
            if (newLength < newWidth) {
                [newLength, newWidth] = [newWidth, newLength];
            }

            cardboardLength = constrain(newLength, 4, 30);
            cardboardWidth = constrain(newWidth, 4, cardboardLength);

            lengthInput.value = cardboardLength.toString();
            widthInput.value = cardboardWidth.toString();

            calculateOptimal();
            cutSize = min(cutSize, slider.max);

            lengthInput.active = false;
            widthInput.active = false;
        }
        return false; // Prevent default behavior
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
