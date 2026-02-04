// Differentiability and Continuity Relationship MicroSim
// Visualize the set relationship between differentiable and continuous functions
// Bloom Level: Understand (L2), Verbs: explain, interpret, classify

let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Venn diagram parameters
let outerRadius, innerRadius;
let centerX, centerY;

// Selected example and region
let selectedExample = null;
let hoveredRegion = null;

// Animation
let pulsePhase = 0;
let mouseOverCanvas = false;

// Example functions for each region
const examples = {
    differentiable: [
        {
            name: 'f(x) = x\u00B2',
            description: 'Smooth polynomial - differentiable everywhere',
            explanation: 'Polynomials are differentiable at every point. The function f(x) = x\u00B2 has derivative f\'(x) = 2x, which exists for all x.',
            drawFunc: drawParabola
        },
        {
            name: 'f(x) = sin(x)',
            description: 'Smooth trigonometric function',
            explanation: 'Sine and cosine are differentiable everywhere. They are the classic examples of smooth, wave-like functions with continuous derivatives.',
            drawFunc: drawSine
        },
        {
            name: 'f(x) = e\u02E3',
            description: 'Exponential - infinitely differentiable',
            explanation: 'The exponential function is special: its derivative equals itself! It is differentiable (and continuous) everywhere.',
            drawFunc: drawExponential
        }
    ],
    continuousNotDiff: [
        {
            name: 'f(x) = |x| at x=0',
            description: 'Corner point - not differentiable',
            explanation: 'Absolute value is continuous everywhere but has a "corner" at x=0. The left slope is -1 and the right slope is +1, so no single tangent line exists.',
            drawFunc: drawAbsoluteValue
        },
        {
            name: 'f(x) = x\u00B9\u00B3 at x=0',
            description: 'Cusp - vertical tangent',
            explanation: 'The cube root function has a cusp at x=0. Though continuous, the tangent becomes vertical there, so the derivative is undefined.',
            drawFunc: drawCubeRoot
        },
        {
            name: 'f(x) = x\u00B2\u00B3 at x=0',
            description: 'Cusp - sharper than cube root',
            explanation: 'Similar to cube root but with a sharper cusp. The function x^(2/3) is continuous at 0 but has a vertical tangent, so not differentiable.',
            drawFunc: drawTwoThirds
        }
    ],
    discontinuous: [
        {
            name: 'Step function',
            description: 'Jump discontinuity',
            explanation: 'A step function jumps from one value to another. At the jump, it is neither continuous nor differentiable.',
            drawFunc: drawStepFunction
        },
        {
            name: 'f(x) = 1/x at x=0',
            description: 'Infinite discontinuity',
            explanation: 'This function has a vertical asymptote at x=0. It is discontinuous there (and therefore not differentiable either).',
            drawFunc: drawOneOverX
        },
        {
            name: 'Hole function',
            description: 'Removable discontinuity',
            explanation: 'A function with a "hole" is discontinuous at that point. Without continuity, differentiability is impossible.',
            drawFunc: drawHoleFunction
        }
    ]
};

// Button definitions for example selection
let exampleButtons = [];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textFont('Arial');

    // Track mouse enter/leave for animation control
    canvas.mouseOver(() => mouseOverCanvas = true);
    canvas.mouseOut(() => mouseOverCanvas = false);

    describe('Interactive Venn diagram showing that all differentiable functions are continuous, but not all continuous functions are differentiable. Click examples to see where they belong.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Calculate Venn diagram dimensions based on canvas width
    centerX = canvasWidth * 0.35;
    centerY = drawHeight * 0.45;
    outerRadius = Math.min(canvasWidth * 0.28, drawHeight * 0.32);
    innerRadius = outerRadius * 0.55;

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);
    stroke('silver');
    line(0, drawHeight, canvasWidth, drawHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Differentiability & Continuity', canvasWidth * 0.4, 8);

    // Subtitle
    textSize(12);
    fill(100);
    text('Differentiable \u2282 Continuous', canvasWidth * 0.4, 28);

    // Update animation
    if (mouseOverCanvas) {
        pulsePhase += 0.03;
    }

    // Detect hovered region
    detectHoveredRegion();

    // Draw the Venn diagram
    drawVennDiagram();

    // Draw the info panel on the right
    drawInfoPanel();

    // Draw controls
    drawControls();
}

function detectHoveredRegion() {
    if (mouseY > drawHeight) {
        hoveredRegion = null;
        return;
    }

    let dx = mouseX - centerX;
    let dy = mouseY - centerY;
    let distFromCenter = Math.sqrt(dx * dx + dy * dy);

    if (distFromCenter <= innerRadius) {
        hoveredRegion = 'differentiable';
    } else if (distFromCenter <= outerRadius) {
        hoveredRegion = 'continuousNotDiff';
    } else if (distFromCenter <= outerRadius * 1.6 && mouseX < centerX + outerRadius * 1.3) {
        hoveredRegion = 'discontinuous';
    } else {
        hoveredRegion = null;
    }
}

function drawVennDiagram() {
    // Draw "outside" region label (discontinuous)
    let discPulse = (selectedExample && examples.discontinuous.includes(selectedExample)) ?
                    5 + 3 * Math.sin(pulsePhase * 2) : 0;

    // Discontinuous region (background - outside circles)
    noFill();
    stroke(hoveredRegion === 'discontinuous' ? color(180, 60, 60) : color(200, 100, 100));
    strokeWeight(hoveredRegion === 'discontinuous' ? 3 : 2);

    // Draw a rounded rectangle for the "outside" region
    let outsideX = centerX - outerRadius * 1.3;
    let outsideY = centerY - outerRadius * 1.25;
    let outsideW = outerRadius * 2.6;
    let outsideH = outerRadius * 2.5;

    if (selectedExample && examples.discontinuous.includes(selectedExample)) {
        fill(255, 220, 220, 100);
    } else if (hoveredRegion === 'discontinuous') {
        fill(255, 235, 235, 80);
    } else {
        noFill();
    }
    rect(outsideX, outsideY, outsideW, outsideH, 15);

    // Outer circle (continuous functions)
    let contPulse = (selectedExample && examples.continuousNotDiff.includes(selectedExample)) ?
                    5 + 3 * Math.sin(pulsePhase * 2) : 0;

    if (selectedExample && examples.continuousNotDiff.includes(selectedExample)) {
        fill(220, 235, 255, 180);
    } else if (hoveredRegion === 'continuousNotDiff') {
        fill(230, 240, 255, 120);
    } else {
        fill(240, 248, 255, 200);
    }

    stroke(hoveredRegion === 'continuousNotDiff' ? color(70, 130, 200) : color(100, 150, 220));
    strokeWeight(hoveredRegion === 'continuousNotDiff' ? 3 : 2);
    ellipse(centerX, centerY, (outerRadius + contPulse) * 2, (outerRadius + contPulse) * 2);

    // Inner circle (differentiable functions)
    let diffPulse = (selectedExample && examples.differentiable.includes(selectedExample)) ?
                    5 + 3 * Math.sin(pulsePhase * 2) : 0;

    if (selectedExample && examples.differentiable.includes(selectedExample)) {
        fill(200, 255, 200, 200);
    } else if (hoveredRegion === 'differentiable') {
        fill(220, 255, 220, 150);
    } else {
        fill(230, 255, 230, 200);
    }

    stroke(hoveredRegion === 'differentiable' ? color(50, 150, 50) : color(80, 180, 80));
    strokeWeight(hoveredRegion === 'differentiable' ? 3 : 2);
    ellipse(centerX, centerY, (innerRadius + diffPulse) * 2, (innerRadius + diffPulse) * 2);

    // Labels
    noStroke();
    textAlign(CENTER, CENTER);

    // Inner label - Differentiable
    fill(30, 100, 30);
    textSize(11);
    text('Differentiable', centerX, centerY - innerRadius * 0.1);
    textSize(9);
    fill(60, 120, 60);
    text('(smooth curves)', centerX, centerY + innerRadius * 0.25);

    // Outer ring label - Continuous but not differentiable
    fill(40, 80, 150);
    textSize(10);
    let ringLabelY = centerY + outerRadius * 0.75;
    text('Continuous', centerX, ringLabelY - 8);
    text('not Diff.', centerX, ringLabelY + 6);
    textSize(8);
    fill(70, 110, 170);
    text('(corners, cusps)', centerX, ringLabelY + 20);

    // Outside label - Discontinuous
    fill(140, 50, 50);
    textSize(10);
    let discLabelX = centerX - outerRadius * 1.0;
    let discLabelY = centerY - outerRadius * 0.95;
    textAlign(LEFT, TOP);
    text('Discontinuous', discLabelX, discLabelY);
    textSize(8);
    fill(160, 80, 80);
    text('(jumps, holes)', discLabelX, discLabelY + 14);

    // Key insight arrow
    drawKeyInsight();
}

function drawKeyInsight() {
    // Draw an arrow showing the implication
    let arrowX = centerX + outerRadius * 0.6;
    let arrowY = centerY - outerRadius * 0.9;

    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(9);

    // Arrow from inner to outer
    stroke(100);
    strokeWeight(1.5);
    let ax1 = centerX + innerRadius * 0.7;
    let ay1 = centerY - innerRadius * 0.5;
    let ax2 = centerX + outerRadius * 0.5;
    let ay2 = centerY - outerRadius * 0.6;

    line(ax1, ay1, ax2, ay2);

    // Arrowhead
    push();
    translate(ax2, ay2);
    let angle = atan2(ay2 - ay1, ax2 - ax1);
    rotate(angle);
    fill(100);
    noStroke();
    triangle(0, 0, -8, -4, -8, 4);
    pop();

    // Implication text
    noStroke();
    fill(60);
    textSize(8);
    textAlign(CENTER, CENTER);
    text('implies', (ax1 + ax2)/2 + 5, (ay1 + ay2)/2 - 8);
}

function drawInfoPanel() {
    // Info panel on right side
    let panelX = canvasWidth * 0.66;
    let panelY = 45;
    let panelW = canvasWidth * 0.32;
    let panelH = drawHeight - 55;

    fill(255, 255, 250);
    stroke(200);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    noStroke();

    if (selectedExample) {
        // Show selected example details
        fill(40);
        textAlign(LEFT, TOP);
        textSize(12);
        textStyle(BOLD);
        text(selectedExample.name, panelX + 8, panelY + 10, panelW - 16);
        textStyle(NORMAL);

        textSize(10);
        fill(80);
        text(selectedExample.description, panelX + 8, panelY + 30, panelW - 16);

        // Mini graph
        let graphY = panelY + 55;
        let graphH = 80;
        fill(255);
        stroke(220);
        rect(panelX + 5, graphY, panelW - 10, graphH, 3);

        // Draw mini axes
        stroke(200);
        strokeWeight(1);
        let midX = panelX + panelW / 2;
        let midY = graphY + graphH / 2;
        line(panelX + 10, midY, panelX + panelW - 10, midY);
        line(midX, graphY + 5, midX, graphY + graphH - 5);

        // Draw the function
        selectedExample.drawFunc(panelX + 10, graphY + 5, panelW - 20, graphH - 10);

        // Explanation
        noStroke();
        fill(60);
        textSize(9);
        textAlign(LEFT, TOP);
        text(selectedExample.explanation, panelX + 8, graphY + graphH + 10, panelW - 16, panelH - graphH - 80);

        // Category indicator
        let category = '';
        let catColor;
        if (examples.differentiable.includes(selectedExample)) {
            category = 'Differentiable (and continuous)';
            catColor = color(50, 150, 50);
        } else if (examples.continuousNotDiff.includes(selectedExample)) {
            category = 'Continuous but NOT differentiable';
            catColor = color(50, 100, 180);
        } else {
            category = 'Discontinuous (and not differentiable)';
            catColor = color(180, 60, 60);
        }

        fill(catColor);
        textSize(9);
        textStyle(BOLD);
        textAlign(CENTER, BOTTOM);
        text(category, panelX + panelW/2, panelY + panelH - 8, panelW - 10);
        textStyle(NORMAL);

    } else {
        // Default instructions
        fill(80);
        textAlign(CENTER, TOP);
        textSize(11);
        text('Click an example below', panelX + panelW/2, panelY + 15);
        text('to see where it belongs', panelX + panelW/2, panelY + 30);

        // Key insight
        textAlign(LEFT, TOP);
        textSize(10);
        fill(60);
        let insightY = panelY + 60;

        fill(30, 100, 30);
        textStyle(BOLD);
        text('Key Insight:', panelX + 8, insightY);
        textStyle(NORMAL);

        fill(60);
        textSize(9);
        text('If a function is differentiable at a point, it MUST be continuous there.', panelX + 8, insightY + 18, panelW - 16);

        text('But the reverse is NOT true! A function can be continuous without being differentiable.', panelX + 8, insightY + 55, panelW - 16);

        // Visual summary
        fill(40);
        textAlign(CENTER, CENTER);
        textSize(10);
        text('Differentiable', panelX + panelW/2, insightY + 115);
        textSize(14);
        text('\u2193', panelX + panelW/2, insightY + 130);
        textSize(10);
        text('Continuous', panelX + panelW/2, insightY + 145);

        fill(150, 50, 50);
        textSize(9);
        text('(but NOT vice versa!)', panelX + panelW/2, insightY + 165);
    }
}

function drawControls() {
    // Example buttons in control area
    let btnY = drawHeight + 8;
    let btnH = 22;
    let section1X = 5;
    let section2X = canvasWidth * 0.36;
    let section3X = canvasWidth * 0.68;
    let sectionW = canvasWidth * 0.30;

    // Section labels
    fill(50);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(9);

    fill(50, 130, 50);
    text('Differentiable:', section1X, btnY);
    fill(50, 90, 160);
    text('Cont. not Diff.:', section2X, btnY);
    fill(160, 60, 60);
    text('Discontinuous:', section3X, btnY);

    // Draw example buttons
    btnY += 14;
    let btnW = sectionW - 5;

    exampleButtons = [];

    // Differentiable examples
    for (let i = 0; i < 3; i++) {
        let ex = examples.differentiable[i];
        let bx = section1X;
        let by = btnY + i * (btnH + 2);
        drawExampleButton(bx, by, btnW, btnH - 2, ex, color(80, 160, 80));
        exampleButtons.push({x: bx, y: by, w: btnW, h: btnH - 2, example: ex});
    }

    // Continuous not differentiable examples
    for (let i = 0; i < 3; i++) {
        let ex = examples.continuousNotDiff[i];
        let bx = section2X;
        let by = btnY + i * (btnH + 2);
        drawExampleButton(bx, by, btnW, btnH - 2, ex, color(80, 130, 200));
        exampleButtons.push({x: bx, y: by, w: btnW, h: btnH - 2, example: ex});
    }

    // Discontinuous examples
    for (let i = 0; i < 3; i++) {
        let ex = examples.discontinuous[i];
        let bx = section3X;
        let by = btnY + i * (btnH + 2);
        drawExampleButton(bx, by, btnW, btnH - 2, ex, color(200, 100, 100));
        exampleButtons.push({x: bx, y: by, w: btnW, h: btnH - 2, example: ex});
    }
}

function drawExampleButton(x, y, w, h, example, baseColor) {
    let isSelected = selectedExample === example;
    let isHover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;

    if (isSelected) {
        fill(baseColor);
        stroke(50);
        strokeWeight(2);
    } else if (isHover) {
        fill(red(baseColor), green(baseColor), blue(baseColor), 180);
        stroke(100);
        strokeWeight(1);
    } else {
        fill(red(baseColor), green(baseColor), blue(baseColor), 120);
        stroke(150);
        strokeWeight(1);
    }

    rect(x, y, w, h, 3);

    fill(isSelected || isHover ? 255 : 50);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(8);

    // Shortened name for button
    let shortName = example.name.replace('f(x) = ', '');
    text(shortName, x + w/2, y + h/2);
}

// Drawing functions for each example
function drawParabola(gx, gy, gw, gh) {
    stroke(50, 130, 50);
    strokeWeight(2);
    noFill();

    let midX = gx + gw/2;
    let midY = gy + gh/2;

    beginShape();
    for (let px = gx; px <= gx + gw; px += 2) {
        let x = (px - midX) / (gw * 0.15);
        let y = x * x;
        let py = midY - y * (gh * 0.08);
        if (py > gy && py < gy + gh) {
            vertex(px, py);
        }
    }
    endShape();
}

function drawSine(gx, gy, gw, gh) {
    stroke(50, 130, 50);
    strokeWeight(2);
    noFill();

    let midY = gy + gh/2;

    beginShape();
    for (let px = gx; px <= gx + gw; px += 2) {
        let x = (px - gx) / gw * 4 * PI - 2 * PI;
        let y = Math.sin(x);
        let py = midY - y * (gh * 0.35);
        vertex(px, py);
    }
    endShape();
}

function drawExponential(gx, gy, gw, gh) {
    stroke(50, 130, 50);
    strokeWeight(2);
    noFill();

    let midX = gx + gw/2;

    beginShape();
    for (let px = gx; px <= gx + gw; px += 2) {
        let x = (px - midX) / (gw * 0.3);
        let y = Math.exp(x);
        let py = gy + gh - y * (gh * 0.15);
        if (py > gy && py < gy + gh) {
            vertex(px, py);
        }
    }
    endShape();
}

function drawAbsoluteValue(gx, gy, gw, gh) {
    stroke(50, 100, 180);
    strokeWeight(2);
    noFill();

    let midX = gx + gw/2;
    let midY = gy + gh * 0.7;

    // Left branch
    line(gx, gy + 10, midX, midY);
    // Right branch
    line(midX, midY, gx + gw, gy + 10);

    // Mark the corner
    fill(255, 200, 200);
    stroke(200, 50, 50);
    strokeWeight(2);
    circle(midX, midY, 8);
}

function drawCubeRoot(gx, gy, gw, gh) {
    stroke(50, 100, 180);
    strokeWeight(2);
    noFill();

    let midX = gx + gw/2;
    let midY = gy + gh/2;

    beginShape();
    for (let px = gx; px <= gx + gw; px += 2) {
        let x = (px - midX) / (gw * 0.3);
        let y = Math.sign(x) * Math.pow(Math.abs(x), 1/3);
        let py = midY - y * (gh * 0.35);
        vertex(px, py);
    }
    endShape();

    // Mark the cusp
    fill(255, 200, 200);
    stroke(200, 50, 50);
    strokeWeight(2);
    circle(midX, midY, 8);
}

function drawTwoThirds(gx, gy, gw, gh) {
    stroke(50, 100, 180);
    strokeWeight(2);
    noFill();

    let midX = gx + gw/2;
    let bottomY = gy + gh - 10;

    beginShape();
    for (let px = gx; px <= gx + gw; px += 2) {
        let x = (px - midX) / (gw * 0.4);
        let y = Math.pow(Math.abs(x), 2/3);
        let py = bottomY - y * (gh * 0.7);
        vertex(px, py);
    }
    endShape();

    // Mark the cusp
    fill(255, 200, 200);
    stroke(200, 50, 50);
    strokeWeight(2);
    circle(midX, bottomY, 8);
}

function drawStepFunction(gx, gy, gw, gh) {
    stroke(180, 60, 60);
    strokeWeight(2);

    let midX = gx + gw/2;
    let y1 = gy + gh * 0.7;
    let y2 = gy + gh * 0.3;

    // Left part
    line(gx, y1, midX - 5, y1);
    // Right part
    line(midX + 5, y2, gx + gw, y2);

    // Open circle (left endpoint)
    fill('white');
    stroke(180, 60, 60);
    circle(midX, y1, 8);

    // Filled circle (right endpoint)
    fill(180, 60, 60);
    noStroke();
    circle(midX, y2, 6);

    // Vertical dashed line
    stroke(200, 150, 150);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(midX, gy + 5, midX, gy + gh - 5);
    drawingContext.setLineDash([]);
}

function drawOneOverX(gx, gy, gw, gh) {
    stroke(180, 60, 60);
    strokeWeight(2);
    noFill();

    let midX = gx + gw/2;
    let midY = gy + gh/2;

    // Left branch
    beginShape();
    for (let px = gx + 5; px < midX - 5; px += 2) {
        let x = (px - midX) / (gw * 0.2);
        let y = 1 / x;
        let py = midY - y * (gh * 0.1);
        if (py > gy + 5 && py < gy + gh - 5) {
            vertex(px, py);
        }
    }
    endShape();

    // Right branch
    beginShape();
    for (let px = midX + 5; px < gx + gw - 5; px += 2) {
        let x = (px - midX) / (gw * 0.2);
        let y = 1 / x;
        let py = midY - y * (gh * 0.1);
        if (py > gy + 5 && py < gy + gh - 5) {
            vertex(px, py);
        }
    }
    endShape();

    // Vertical asymptote
    stroke(200, 150, 150);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(midX, gy + 5, midX, gy + gh - 5);
    drawingContext.setLineDash([]);
}

function drawHoleFunction(gx, gy, gw, gh) {
    stroke(180, 60, 60);
    strokeWeight(2);
    noFill();

    let midX = gx + gw/2;
    let midY = gy + gh/2;

    // Line with hole (y = x simplified from (x^2-1)/(x-1))
    line(gx + 5, gy + gh - 15, midX - 8, midY);
    line(midX + 8, midY, gx + gw - 5, gy + 15);

    // Hole
    fill('white');
    stroke(180, 60, 60);
    strokeWeight(2);
    circle(midX, midY, 10);
}

function mousePressed() {
    // Check example buttons
    for (let btn of exampleButtons) {
        if (mouseX > btn.x && mouseX < btn.x + btn.w &&
            mouseY > btn.y && mouseY < btn.y + btn.h) {
            if (selectedExample === btn.example) {
                selectedExample = null; // Deselect
            } else {
                selectedExample = btn.example;
            }
            return;
        }
    }

    // Click on Venn diagram regions
    if (mouseY < drawHeight) {
        let dx = mouseX - centerX;
        let dy = mouseY - centerY;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= innerRadius) {
            // Clicked on differentiable region - show first differentiable example
            selectedExample = examples.differentiable[0];
        } else if (dist <= outerRadius) {
            // Clicked on continuous not diff region
            selectedExample = examples.continuousNotDiff[0];
        } else if (dist <= outerRadius * 1.6 && mouseX < centerX + outerRadius * 1.3) {
            // Clicked on discontinuous region
            selectedExample = examples.discontinuous[0];
        }
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
