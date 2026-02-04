// Two Moving Objects Distance MicroSim
// Examines how the rate of distance change between two moving objects
// depends on their positions and velocities
// Bloom Level: Analyze (L4), Verb: examine, analyze, investigate

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 120;
let defaultTextSize = 14;

// Map area (top-down view)
let mapLeft = 20;
let mapRight;
let mapTop = 50;
let mapBottom;
let mapCenterX, mapCenterY;

// Graph area (d(t) vs time)
let graphLeft, graphRight, graphTop, graphBottom;

// Scale: pixels per mile
let scale = 1.5;

// Car A state (moves north/south from origin)
let carASpeed = 50; // mph
let carADirection = 'N'; // N or S

// Car B state (moves east/west from origin)
let carBSpeed = 40; // mph
let carBDirection = 'E'; // E or W

// Time state
let currentTime = 0; // hours
let maxTime = 5; // hours
let isPlaying = false;
let playSpeed = 0.005; // hours per frame

// History for graph
let distanceHistory = [];
let maxHistoryPoints = 200;

// UI Controls
let speedASlider = { x: 0, y: 0, width: 0, height: 16, min: 20, max: 100, value: 50 };
let speedBSlider = { x: 0, y: 0, width: 0, height: 16, min: 20, max: 100, value: 40 };
let timeSlider = { x: 0, y: 0, width: 0, height: 16, min: 0, max: 5, value: 0 };

let directionAButtons = [];
let directionBButtons = [];
let playButton = { x: 0, y: 0, width: 70, height: 26 };
let resetButton = { x: 0, y: 0, width: 60, height: 26 };

// Dragging state
let draggingSpeedA = false;
let draggingSpeedB = false;
let draggingTime = false;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    updateLayout();
    resetSimulation();

    describe('Two moving objects distance visualization showing how the rate of distance change depends on positions and velocities', LABEL);
}

function updateLayout() {
    // Map area takes left 60% of drawing area
    mapRight = canvasWidth * 0.55;
    mapBottom = drawHeight - 20;
    mapCenterX = (mapLeft + mapRight) / 2;
    mapCenterY = (mapTop + mapBottom) / 2;

    // Graph area takes right side
    graphLeft = canvasWidth * 0.6;
    graphRight = canvasWidth - 20;
    graphTop = mapTop + 20;
    graphBottom = drawHeight - 40;

    // Adjust scale based on map size
    scale = Math.min((mapRight - mapLeft) / 400, (mapBottom - mapTop) / 400);
}

function draw() {
    updateCanvasSize();
    updateLayout();

    // Update time if playing
    if (isPlaying) {
        currentTime += playSpeed;
        if (currentTime >= maxTime) {
            currentTime = maxTime;
            isPlaying = false;
        }
        timeSlider.value = currentTime;
        updateDistanceHistory();
    }

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Two Moving Objects', canvasWidth / 2, 5);
    textSize(14);
    fill(80);
    text('Rate of Distance Change', canvasWidth / 2, 26);

    // Draw components
    drawMap();
    drawDistanceGraph();
    drawObservationPanel();
    drawControls();
}

function getCarAPosition(t) {
    let distance = carASpeed * t;
    let y = (carADirection === 'N') ? distance : -distance;
    return { x: 0, y: y };
}

function getCarBPosition(t) {
    let distance = carBSpeed * t;
    let x = (carBDirection === 'E') ? distance : -distance;
    return { x: x, y: 0 };
}

function getDistance(t) {
    let posA = getCarAPosition(t);
    let posB = getCarBPosition(t);
    return Math.sqrt(Math.pow(posA.x - posB.x, 2) + Math.pow(posA.y - posB.y, 2));
}

function getRateOfDistanceChange(t) {
    // dd/dt = (a * da/dt + b * db/dt) / d
    // where a = position along Car A's axis, b = position along Car B's axis
    // da/dt = speed of A (with sign for direction)
    // db/dt = speed of B (with sign for direction)
    let posA = getCarAPosition(t);
    let posB = getCarBPosition(t);

    let a = posA.y; // Car A's distance from origin (along y-axis)
    let b = posB.x; // Car B's distance from origin (along x-axis)
    let d = getDistance(t);

    if (d < 0.001) return 0; // Avoid division by zero at t=0

    // da/dt (rate of change of a)
    let dadt = (carADirection === 'N') ? carASpeed : -carASpeed;
    // db/dt (rate of change of b)
    let dbdt = (carBDirection === 'E') ? carBSpeed : -carBSpeed;

    // Using d(sqrt(a^2 + b^2))/dt = (a*da/dt + b*db/dt) / sqrt(a^2 + b^2)
    let dddt = (a * dadt + b * dbdt) / d;

    return dddt;
}

function drawMap() {
    // Map background
    fill(245, 250, 245);
    stroke(200);
    strokeWeight(1);
    rect(mapLeft, mapTop, mapRight - mapLeft, mapBottom - mapTop);

    // Draw roads (axes)
    stroke(180);
    strokeWeight(2);
    // Horizontal road (Car B's path)
    line(mapLeft, mapCenterY, mapRight, mapCenterY);
    // Vertical road (Car A's path)
    line(mapCenterX, mapTop, mapCenterX, mapBottom);

    // Origin marker
    fill(100);
    noStroke();
    circle(mapCenterX, mapCenterY, 10);

    // Direction labels
    fill(100);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('N', mapCenterX, mapTop + 15);
    text('S', mapCenterX, mapBottom - 15);
    text('E', mapRight - 15, mapCenterY);
    text('W', mapLeft + 15, mapCenterY);

    // Get positions
    let posA = getCarAPosition(currentTime);
    let posB = getCarBPosition(currentTime);

    // Convert to pixel coordinates
    let carAPixelX = mapCenterX + posA.x * scale;
    let carAPixelY = mapCenterY - posA.y * scale; // Flip y for screen coords
    let carBPixelX = mapCenterX + posB.x * scale;
    let carBPixelY = mapCenterY - posB.y * scale;

    // Draw distance line
    stroke(255, 100, 100);
    strokeWeight(2);
    drawingContext.setLineDash([5, 3]);
    line(carAPixelX, carAPixelY, carBPixelX, carBPixelY);
    drawingContext.setLineDash([]);

    // Draw velocity vectors
    let vectorLength = 25;
    strokeWeight(2);

    // Car A velocity vector
    stroke(0, 150, 0);
    let aVectorEnd = (carADirection === 'N') ? carAPixelY - vectorLength : carAPixelY + vectorLength;
    line(carAPixelX, carAPixelY, carAPixelX, aVectorEnd);
    // Arrow head
    let aDir = (carADirection === 'N') ? -1 : 1;
    line(carAPixelX, aVectorEnd, carAPixelX - 5, aVectorEnd - aDir * 8);
    line(carAPixelX, aVectorEnd, carAPixelX + 5, aVectorEnd - aDir * 8);

    // Car B velocity vector
    stroke(0, 0, 200);
    let bVectorEnd = (carBDirection === 'E') ? carBPixelX + vectorLength : carBPixelX - vectorLength;
    line(carBPixelX, carBPixelY, bVectorEnd, carBPixelY);
    // Arrow head
    let bDir = (carBDirection === 'E') ? 1 : -1;
    line(bVectorEnd, carBPixelY, bVectorEnd - bDir * 8, carBPixelY - 5);
    line(bVectorEnd, carBPixelY, bVectorEnd - bDir * 8, carBPixelY + 5);

    // Draw cars
    // Car A (green circle)
    fill(0, 180, 0);
    noStroke();
    circle(carAPixelX, carAPixelY, 18);
    fill(255);
    textSize(10);
    textAlign(CENTER, CENTER);
    text('A', carAPixelX, carAPixelY);

    // Car B (blue circle)
    fill(0, 100, 200);
    noStroke();
    circle(carBPixelX, carBPixelY, 18);
    fill(255);
    text('B', carBPixelX, carBPixelY);

    // Distance label at midpoint
    let midX = (carAPixelX + carBPixelX) / 2;
    let midY = (carAPixelY + carBPixelY) / 2;
    let dist = getDistance(currentTime);

    fill(150, 50, 50);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text('d = ' + dist.toFixed(1) + ' mi', midX + 15, midY - 10);
}

function drawDistanceGraph() {
    // Graph title
    fill('black');
    noStroke();
    textSize(12);
    textAlign(CENTER, TOP);
    text('d(t) vs time', (graphLeft + graphRight) / 2, mapTop);

    // Graph background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(graphLeft, graphTop, graphRight - graphLeft, graphBottom - graphTop);

    // Calculate max distance for scaling
    let maxDistance = 0;
    for (let t = 0; t <= maxTime; t += 0.1) {
        let d = getDistance(t);
        if (d > maxDistance) maxDistance = d;
    }
    maxDistance = Math.ceil(maxDistance / 50) * 50; // Round up to nearest 50
    if (maxDistance < 50) maxDistance = 50;

    // Grid lines
    stroke(230);
    strokeWeight(1);
    // Vertical grid (time)
    for (let t = 1; t <= maxTime; t++) {
        let x = map(t, 0, maxTime, graphLeft, graphRight);
        line(x, graphTop, x, graphBottom);
    }
    // Horizontal grid (distance)
    let dStep = maxDistance / 4;
    for (let d = dStep; d <= maxDistance; d += dStep) {
        let y = map(d, 0, maxDistance, graphBottom, graphTop);
        line(graphLeft, y, graphRight, y);
    }

    // Axes
    stroke(100);
    strokeWeight(1);
    line(graphLeft, graphBottom, graphRight, graphBottom);
    line(graphLeft, graphTop, graphLeft, graphBottom);

    // Axis labels
    fill(100);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);
    for (let t = 0; t <= maxTime; t++) {
        let x = map(t, 0, maxTime, graphLeft, graphRight);
        text(t, x, graphBottom + 3);
    }
    text('t (hrs)', (graphLeft + graphRight) / 2, graphBottom + 15);

    textAlign(RIGHT, CENTER);
    for (let d = 0; d <= maxDistance; d += dStep) {
        let y = map(d, 0, maxDistance, graphBottom, graphTop);
        text(Math.round(d), graphLeft - 3, y);
    }

    // Draw distance curve
    stroke(255, 100, 100);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let t = 0; t <= maxTime; t += 0.05) {
        let d = getDistance(t);
        let x = map(t, 0, maxTime, graphLeft, graphRight);
        let y = map(d, 0, maxDistance, graphBottom, graphTop);
        vertex(x, constrain(y, graphTop, graphBottom));
    }
    endShape();

    // Current time marker
    let currX = map(currentTime, 0, maxTime, graphLeft, graphRight);
    let currD = getDistance(currentTime);
    let currY = map(currD, 0, maxDistance, graphBottom, graphTop);

    stroke(0, 150, 0);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(currX, graphBottom, currX, currY);
    drawingContext.setLineDash([]);

    fill(0, 150, 0);
    noStroke();
    circle(currX, currY, 8);
}

function drawObservationPanel() {
    // Panel on right side of map area
    let panelX = mapRight + 5;
    let panelY = mapTop;
    let panelW = graphLeft - mapRight - 10;
    let panelH = 110;

    // Values
    let posA = getCarAPosition(currentTime);
    let posB = getCarBPosition(currentTime);
    let dist = getDistance(currentTime);
    let rate = getRateOfDistanceChange(currentTime);

    // Panel background
    fill(255, 255, 255, 240);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 6);

    // Content
    fill(0);
    noStroke();
    textSize(10);
    textAlign(LEFT, TOP);

    let y = panelY + 6;
    let lineH = 14;

    text('t = ' + currentTime.toFixed(2) + ' hrs', panelX + 5, y);
    y += lineH;

    fill(0, 150, 0);
    text('a = ' + Math.abs(posA.y).toFixed(1) + ' mi', panelX + 5, y);
    y += lineH;

    fill(0, 100, 200);
    text('b = ' + Math.abs(posB.x).toFixed(1) + ' mi', panelX + 5, y);
    y += lineH;

    fill(150, 50, 50);
    text('d = ' + dist.toFixed(1) + ' mi', panelX + 5, y);
    y += lineH + 2;

    fill(0);
    textSize(9);
    text('dd/dt = ' + rate.toFixed(1) + ' mph', panelX + 5, y);
    y += lineH;

    // Closer or farther indicator
    if (Math.abs(rate) < 0.5) {
        fill(100, 100, 100);
        text('Nearly constant', panelX + 5, y);
    } else if (rate > 0) {
        fill(200, 50, 50);
        text('Getting farther', panelX + 5, y);
    } else {
        fill(50, 150, 50);
        text('Getting closer', panelX + 5, y);
    }
}

function drawControls() {
    let sliderWidth = canvasWidth - sliderLeftMargin - margin - 50;
    let row1Y = drawHeight + 10;
    let row2Y = drawHeight + 40;
    let row3Y = drawHeight + 70;
    let row4Y = drawHeight + 105;
    let row5Y = drawHeight + 140;

    // Update slider positions
    speedASlider.x = sliderLeftMargin;
    speedASlider.y = row1Y;
    speedASlider.width = sliderWidth;
    speedASlider.value = carASpeed;

    speedBSlider.x = sliderLeftMargin;
    speedBSlider.y = row2Y;
    speedBSlider.width = sliderWidth;
    speedBSlider.value = carBSpeed;

    timeSlider.x = sliderLeftMargin;
    timeSlider.y = row3Y;
    timeSlider.width = sliderWidth;

    // Draw Speed A slider with direction buttons
    drawSlider(speedASlider, 'Car A: ' + carASpeed + ' mph', 10, row1Y + 8);
    drawDirectionButtons('A', canvasWidth - margin - 45, row1Y - 2, carADirection);

    // Draw Speed B slider with direction buttons
    drawSlider(speedBSlider, 'Car B: ' + carBSpeed + ' mph', 10, row2Y + 8);
    drawDirectionButtons('B', canvasWidth - margin - 45, row2Y - 2, carBDirection);

    // Draw Time slider
    drawSlider(timeSlider, 't = ' + currentTime.toFixed(2) + ' hrs', 10, row3Y + 8);

    // Play/Pause button
    playButton.x = 10;
    playButton.y = row4Y;

    fill(isPlaying ? '#FF9800' : '#4CAF50');
    stroke(isPlaying ? '#F57C00' : '#388E3C');
    strokeWeight(1);
    rect(playButton.x, playButton.y, playButton.width, playButton.height, 5);

    fill(255);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(isPlaying ? 'Pause' : 'Play', playButton.x + playButton.width/2, playButton.y + playButton.height/2);

    // Reset button
    resetButton.x = playButton.x + playButton.width + 10;
    resetButton.y = row4Y;

    fill('#f44336');
    stroke('#d32f2f');
    strokeWeight(1);
    rect(resetButton.x, resetButton.y, resetButton.width, resetButton.height, 5);

    fill(255);
    noStroke();
    text('Reset', resetButton.x + resetButton.width/2, resetButton.y + resetButton.height/2);

    // Formula display
    fill(80);
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Formula: dd/dt = (a\u00B7da/dt + b\u00B7db/dt) / d', resetButton.x + resetButton.width + 15, row4Y + 13);

    // Instructions
    fill(100);
    textSize(11);
    textAlign(LEFT, TOP);
    text('Adjust speeds and directions to see how dd/dt changes with position and velocity.', 10, row5Y);
}

function drawSlider(slider, label, labelX, labelY) {
    // Track background
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(slider.x, slider.y, slider.width, slider.height, 8);

    // Filled portion
    let fillWidth = map(slider.value, slider.min, slider.max, 0, slider.width);

    fill(0, 120, 200);
    noStroke();
    rect(slider.x, slider.y, fillWidth, slider.height, 8);

    // Handle
    let handleX = slider.x + fillWidth;
    fill(255);
    stroke(0, 120, 200);
    strokeWeight(2);
    circle(handleX, slider.y + slider.height/2, 16);

    // Label
    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    text(label, labelX, labelY);
}

function drawDirectionButtons(car, x, y, currentDir) {
    let btnSize = 20;
    let buttons = (car === 'A') ? ['N', 'S'] : ['E', 'W'];

    // Store button positions for click detection
    if (car === 'A') {
        directionAButtons = [];
    } else {
        directionBButtons = [];
    }

    for (let i = 0; i < buttons.length; i++) {
        let btnX = x + i * (btnSize + 3);
        let btnY = y;
        let dir = buttons[i];
        let isSelected = (dir === currentDir);

        fill(isSelected ? (car === 'A' ? '#4CAF50' : '#2196F3') : '#e0e0e0');
        stroke(isSelected ? (car === 'A' ? '#388E3C' : '#1976D2') : '#bdbdbd');
        strokeWeight(1);
        rect(btnX, btnY, btnSize, btnSize, 4);

        fill(isSelected ? 255 : 80);
        noStroke();
        textSize(10);
        textAlign(CENTER, CENTER);
        text(dir, btnX + btnSize/2, btnY + btnSize/2);

        if (car === 'A') {
            directionAButtons.push({ x: btnX, y: btnY, w: btnSize, h: btnSize, dir: dir });
        } else {
            directionBButtons.push({ x: btnX, y: btnY, w: btnSize, h: btnSize, dir: dir });
        }
    }
}

function resetSimulation() {
    currentTime = 0;
    timeSlider.value = 0;
    isPlaying = false;
    distanceHistory = [];
}

function updateDistanceHistory() {
    distanceHistory.push({ t: currentTime, d: getDistance(currentTime) });
    if (distanceHistory.length > maxHistoryPoints) {
        distanceHistory.shift();
    }
}

function isOverSlider(slider) {
    return mouseX >= slider.x && mouseX <= slider.x + slider.width &&
           mouseY >= slider.y - 5 && mouseY <= slider.y + slider.height + 5;
}

function updateSliderFromMouse(slider) {
    let t = constrain((mouseX - slider.x) / slider.width, 0, 1);
    return lerp(slider.min, slider.max, t);
}

function mousePressed() {
    // Check sliders
    if (isOverSlider(speedASlider)) {
        draggingSpeedA = true;
        carASpeed = Math.round(updateSliderFromMouse(speedASlider));
    }
    if (isOverSlider(speedBSlider)) {
        draggingSpeedB = true;
        carBSpeed = Math.round(updateSliderFromMouse(speedBSlider));
    }
    if (isOverSlider(timeSlider)) {
        draggingTime = true;
        currentTime = updateSliderFromMouse(timeSlider);
        currentTime = Math.round(currentTime * 100) / 100;
        timeSlider.value = currentTime;
    }

    // Check direction buttons for Car A
    for (let btn of directionAButtons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            carADirection = btn.dir;
        }
    }

    // Check direction buttons for Car B
    for (let btn of directionBButtons) {
        if (mouseX >= btn.x && mouseX <= btn.x + btn.w &&
            mouseY >= btn.y && mouseY <= btn.y + btn.h) {
            carBDirection = btn.dir;
        }
    }

    // Check play button
    if (mouseX >= playButton.x && mouseX <= playButton.x + playButton.width &&
        mouseY >= playButton.y && mouseY <= playButton.y + playButton.height) {
        isPlaying = !isPlaying;
    }

    // Check reset button
    if (mouseX >= resetButton.x && mouseX <= resetButton.x + resetButton.width &&
        mouseY >= resetButton.y && mouseY <= resetButton.y + resetButton.height) {
        resetSimulation();
    }
}

function mouseDragged() {
    if (draggingSpeedA) {
        carASpeed = Math.round(updateSliderFromMouse(speedASlider));
        carASpeed = constrain(carASpeed, speedASlider.min, speedASlider.max);
    }
    if (draggingSpeedB) {
        carBSpeed = Math.round(updateSliderFromMouse(speedBSlider));
        carBSpeed = constrain(carBSpeed, speedBSlider.min, speedBSlider.max);
    }
    if (draggingTime) {
        currentTime = updateSliderFromMouse(timeSlider);
        currentTime = Math.round(currentTime * 100) / 100;
        currentTime = constrain(currentTime, timeSlider.min, timeSlider.max);
        timeSlider.value = currentTime;
    }
}

function mouseReleased() {
    draggingSpeedA = false;
    draggingSpeedB = false;
    draggingTime = false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateLayout();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
