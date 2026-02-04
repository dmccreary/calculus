// Composite Function Identifier MicroSim
// Train students to recognize composite functions and decompose them
// into inside (g) and outside (f) functions
// Bloom Level: Analyze (L4), Verb: Analyze, Distinguish, Deconstruct

let canvasWidth = 450;
let drawHeight = 480;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Problem state
let currentProblem = null;
let userInside = '';
let userOutside = '';
let feedback = '';
let feedbackColor = [0, 0, 0];
let score = 0;
let attempts = 0;
let showingSolution = false;
let activeField = null; // 'inside' or 'outside'
let difficulty = 'simple';

// Animation
let animPhase = 0;
let animProgress = 0;

// Problem library organized by difficulty
const problemSets = {
    simple: [
        { expr: 'cos(x^3)', inside: 'x^3', outside: 'cos(u)',
          description: 'The cosine function wraps around x cubed',
          layers: ['x^3', 'cos(...)'] },
        { expr: 'e^(2x+1)', inside: '2x+1', outside: 'e^u',
          description: 'The exponential wraps around the linear expression',
          layers: ['2x+1', 'e^(...)'] },
        { expr: '(5x-1)^7', inside: '5x-1', outside: 'u^7',
          description: 'The seventh power wraps around the linear expression',
          layers: ['5x-1', '(...)^7'] },
        { expr: 'sin(4x)', inside: '4x', outside: 'sin(u)',
          description: 'The sine function wraps around 4x',
          layers: ['4x', 'sin(...)'] },
        { expr: 'ln(x^2)', inside: 'x^2', outside: 'ln(u)',
          description: 'The natural log wraps around x squared',
          layers: ['x^2', 'ln(...)'] },
        { expr: '(x+3)^4', inside: 'x+3', outside: 'u^4',
          description: 'The fourth power wraps around x+3',
          layers: ['x+3', '(...)^4'] },
        { expr: 'tan(2x)', inside: '2x', outside: 'tan(u)',
          description: 'The tangent function wraps around 2x',
          layers: ['2x', 'tan(...)'] },
        { expr: 'e^(x^2)', inside: 'x^2', outside: 'e^u',
          description: 'The exponential wraps around x squared',
          layers: ['x^2', 'e^(...)'] }
    ],
    medium: [
        { expr: 'cos(x^2+1)', inside: 'x^2+1', outside: 'cos(u)',
          description: 'Cosine wraps around a quadratic expression',
          layers: ['x^2+1', 'cos(...)'] },
        { expr: 'sqrt(3x-2)', inside: '3x-2', outside: 'sqrt(u)',
          description: 'Square root wraps around a linear expression',
          layers: ['3x-2', 'sqrt(...)'] },
        { expr: 'ln(sin(x))', inside: 'sin(x)', outside: 'ln(u)',
          description: 'Natural log wraps around sine',
          layers: ['sin(x)', 'ln(...)'] },
        { expr: 'e^(cos(x))', inside: 'cos(x)', outside: 'e^u',
          description: 'Exponential wraps around cosine',
          layers: ['cos(x)', 'e^(...)'] },
        { expr: '(x^2-4)^5', inside: 'x^2-4', outside: 'u^5',
          description: 'Fifth power wraps around a quadratic',
          layers: ['x^2-4', '(...)^5'] },
        { expr: 'sin(e^x)', inside: 'e^x', outside: 'sin(u)',
          description: 'Sine wraps around exponential',
          layers: ['e^x', 'sin(...)'] },
        { expr: '1/(x^2+1)', inside: 'x^2+1', outside: '1/u',
          description: 'Reciprocal wraps around a quadratic',
          layers: ['x^2+1', '1/(...)'] },
        { expr: 'tan(x^3)', inside: 'x^3', outside: 'tan(u)',
          description: 'Tangent wraps around x cubed',
          layers: ['x^3', 'tan(...)'] }
    ],
    nested: [
        { expr: 'sin(cos(x))', inside: 'cos(x)', outside: 'sin(u)',
          description: 'Sine wraps around cosine (trig inside trig)',
          layers: ['x', 'cos(...)', 'sin(...)'] },
        { expr: 'e^(sin(x^2))', inside: 'sin(x^2)', outside: 'e^u',
          description: 'Exponential wraps around sin(x^2)',
          layers: ['x^2', 'sin(...)', 'e^(...)'] },
        { expr: '(cos(2x))^3', inside: 'cos(2x)', outside: 'u^3',
          description: 'Cube wraps around cos(2x)',
          layers: ['2x', 'cos(...)', '(...)^3'] },
        { expr: 'ln(x^2+e^x)', inside: 'x^2+e^x', outside: 'ln(u)',
          description: 'Natural log wraps around a sum',
          layers: ['x^2+e^x', 'ln(...)'] },
        { expr: 'sqrt(1+sin(x))', inside: '1+sin(x)', outside: 'sqrt(u)',
          description: 'Square root wraps around 1+sin(x)',
          layers: ['sin(x)', '1+...', 'sqrt(...)'] },
        { expr: '(e^x+1)^4', inside: 'e^x+1', outside: 'u^4',
          description: 'Fourth power wraps around e^x+1',
          layers: ['e^x', '...+1', '(...)^4'] },
        { expr: 'cos(ln(x))', inside: 'ln(x)', outside: 'cos(u)',
          description: 'Cosine wraps around natural log',
          layers: ['x', 'ln(...)', 'cos(...)'] },
        { expr: 'e^(x^2+2x)', inside: 'x^2+2x', outside: 'e^u',
          description: 'Exponential wraps around a polynomial',
          layers: ['x^2+2x', 'e^(...)'] }
    ]
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    generateProblem();

    describe('Composite Function Identifier: Practice decomposing composite functions into inside and outside functions for chain rule application.', LABEL);
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
    stroke('silver');
    line(0, drawHeight, canvasWidth, drawHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20);
    text('Composite Function Identifier', canvasWidth/2, 8);

    textSize(13);
    fill(80);
    text('Decompose f(g(x)) into inside and outside functions', canvasWidth/2, 32);

    // Score
    textSize(12);
    textAlign(RIGHT, TOP);
    fill(60);
    text('Score: ' + score + '/' + attempts, canvasWidth - 15, 55);

    // Draw function display
    if (currentProblem) {
        drawFunctionDisplay();
        drawInputBoxes();
        drawLayerDiagram();
    }

    // Feedback
    if (feedback) {
        drawFeedback();
    }

    // Solution
    if (showingSolution && currentProblem) {
        drawSolution();
    }

    // Controls
    drawControls();
}

function drawFunctionDisplay() {
    let boxX = margin;
    let boxY = 70;
    let boxW = canvasWidth - 2*margin;
    let boxH = 60;

    // Main function box
    fill(240, 248, 255);
    stroke(100, 150, 200);
    strokeWeight(2);
    rect(boxX, boxY, boxW, boxH, 8);

    // Label
    fill(0, 80, 150);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Composite Function:', boxX + 10, boxY + 8);

    // Function expression
    fill(0);
    textSize(26);
    textAlign(CENTER, CENTER);
    text('f(x) = ' + currentProblem.expr, canvasWidth/2, boxY + 38);
}

function drawInputBoxes() {
    let boxY = 145;
    let boxW = (canvasWidth - 3*margin) / 2;
    let boxH = 70;

    // Inside function box (green theme)
    let insideX = margin;
    let isInsideActive = activeField === 'inside';
    fill(isInsideActive ? 230 : 245, 255, isInsideActive ? 230 : 245);
    stroke(isInsideActive ? '#2E7D32' : '#81C784');
    strokeWeight(isInsideActive ? 3 : 2);
    rect(insideX, boxY, boxW, boxH, 8);

    fill('#2E7D32');
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text('Inside Function g(x)', insideX + boxW/2, boxY + 8);

    // User input for inside
    textSize(20);
    fill(userInside ? 0 : 180);
    textAlign(CENTER, CENTER);
    text(userInside || 'Click to type', insideX + boxW/2, boxY + 48);

    // Outside function box (blue theme)
    let outsideX = 2*margin + boxW;
    let isOutsideActive = activeField === 'outside';
    fill(isOutsideActive ? 230 : 245, isOutsideActive ? 230 : 245, 255);
    stroke(isOutsideActive ? '#1565C0' : '#64B5F6');
    strokeWeight(isOutsideActive ? 3 : 2);
    rect(outsideX, boxY, boxW, boxH, 8);

    fill('#1565C0');
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text('Outside Function f(u)', outsideX + boxW/2, boxY + 8);

    // User input for outside
    textSize(20);
    fill(userOutside ? 0 : 180);
    textAlign(CENTER, CENTER);
    text(userOutside || 'Click to type', outsideX + boxW/2, boxY + 48);

    // Helper text
    fill(100);
    textSize(11);
    textAlign(CENTER, TOP);
    text('g(x) = ?', insideX + boxW/2, boxY + boxH + 5);
    text('f(u) = ? (use u for the inside)', outsideX + boxW/2, boxY + boxH + 5);
}

function drawLayerDiagram() {
    let diagramY = 255;
    let diagramH = 85;

    // Diagram box
    fill(255, 255, 250);
    stroke(200, 200, 180);
    strokeWeight(1);
    rect(margin, diagramY, canvasWidth - 2*margin, diagramH, 5);

    fill(100, 80, 50);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    text('Function "Layers" (outside wraps inside):', margin + 10, diagramY + 8);

    // Draw layer visualization
    let layers = currentProblem.layers;
    let layerW = (canvasWidth - 2*margin - 40) / layers.length;
    let arrowY = diagramY + 55;

    for (let i = 0; i < layers.length; i++) {
        let x = margin + 20 + i * layerW;

        // Layer box
        let depth = layers.length - i - 1;
        let hue = map(depth, 0, layers.length, 120, 220);
        fill(hue, 200, 220);
        stroke(hue - 30, 150, 180);
        strokeWeight(1);
        rect(x, arrowY - 15, layerW - 10, 30, 4);

        // Layer text
        fill(30);
        noStroke();
        textSize(12);
        textAlign(CENTER, CENTER);
        text(layers[i], x + (layerW - 10)/2, arrowY);

        // Arrow
        if (i < layers.length - 1) {
            stroke(100);
            strokeWeight(2);
            let arrowX = x + layerW - 8;
            line(arrowX, arrowY, arrowX + 6, arrowY);
            triangle(arrowX + 10, arrowY, arrowX + 4, arrowY - 4, arrowX + 4, arrowY + 4);
        }
    }

    // Inner/Outer labels
    fill(80);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text('Inner', margin + 20 + layerW/2 - 5, diagramY + diagramH - 18);
    text('Outer', margin + 20 + (layers.length - 0.5) * layerW - 5, diagramY + diagramH - 18);
}

function drawFeedback() {
    let fbY = 345;

    fill(feedbackColor[0], feedbackColor[1], feedbackColor[2]);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text(feedback, canvasWidth/2, fbY);
}

function drawSolution() {
    let solY = 370;
    let solH = 95;

    fill(255, 255, 230);
    stroke(200, 180, 100);
    strokeWeight(1);
    rect(margin, solY, canvasWidth - 2*margin, solH, 6);

    fill(100, 80, 0);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Solution:', margin + 10, solY + 8);

    fill(0, 100, 0);
    textSize(16);
    text('Inside g(x) = ' + currentProblem.inside, margin + 15, solY + 30);

    fill(0, 0, 150);
    text('Outside f(u) = ' + currentProblem.outside, margin + 15, solY + 52);

    fill(60);
    textSize(12);
    let descWidth = canvasWidth - 2*margin - 30;
    text(currentProblem.description, margin + 15, solY + 74, descWidth, 30);
}

function drawControls() {
    let ctrlY = drawHeight + 10;

    // Difficulty selector label
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(13);
    text('Difficulty:', 10, ctrlY + 12);

    // Difficulty buttons
    let difficulties = ['simple', 'medium', 'nested'];
    let diffLabels = ['Simple', 'Medium', 'Nested'];
    let btnW = 60;
    let btnH = 24;
    let btnX = 75;

    for (let i = 0; i < difficulties.length; i++) {
        let x = btnX + i * (btnW + 5);
        let isSelected = difficulty === difficulties[i];
        let isHover = mouseX > x && mouseX < x + btnW &&
                      mouseY > ctrlY && mouseY < ctrlY + btnH;

        fill(isSelected ? '#7B1FA2' : (isHover ? 230 : 240));
        stroke(isSelected ? '#4A148C' : 180);
        strokeWeight(isSelected ? 2 : 1);
        rect(x, ctrlY, btnW, btnH, 4);

        fill(isSelected ? 'white' : 'black');
        noStroke();
        textSize(11);
        textAlign(CENTER, CENTER);
        text(diffLabels[i], x + btnW/2, ctrlY + btnH/2);
    }

    // Action buttons row
    let actionY = ctrlY + 35;
    let actionBtnW = 90;
    let actionBtnH = 28;

    // New Function button
    let newBtnX = 10;
    let isHoverNew = mouseX > newBtnX && mouseX < newBtnX + actionBtnW &&
                     mouseY > actionY && mouseY < actionY + actionBtnH;
    fill(isHoverNew ? '#1E88E5' : '#2196F3');
    stroke('#1565C0');
    strokeWeight(1);
    rect(newBtnX, actionY, actionBtnW, actionBtnH, 5);
    fill('white');
    noStroke();
    textSize(12);
    text('New Function', newBtnX + actionBtnW/2, actionY + actionBtnH/2);

    // Check Answer button
    let checkBtnX = newBtnX + actionBtnW + 10;
    let isHoverCheck = mouseX > checkBtnX && mouseX < checkBtnX + actionBtnW &&
                       mouseY > actionY && mouseY < actionY + actionBtnH;
    fill(isHoverCheck ? '#43A047' : '#4CAF50');
    stroke('#2E7D32');
    strokeWeight(1);
    rect(checkBtnX, actionY, actionBtnW, actionBtnH, 5);
    fill('white');
    noStroke();
    text('Check Answer', checkBtnX + actionBtnW/2, actionY + actionBtnH/2);

    // Show Solution button
    let showBtnX = checkBtnX + actionBtnW + 10;
    let isHoverShow = mouseX > showBtnX && mouseX < showBtnX + actionBtnW &&
                      mouseY > actionY && mouseY < actionY + actionBtnH;
    fill(isHoverShow ? '#FB8C00' : '#FF9800');
    stroke('#EF6C00');
    strokeWeight(1);
    rect(showBtnX, actionY, actionBtnW, actionBtnH, 5);
    fill('white');
    noStroke();
    text(showingSolution ? 'Hide Solution' : 'Show Solution', showBtnX + actionBtnW/2, actionY + actionBtnH/2);

    // Clear button
    let clearBtnX = showBtnX + actionBtnW + 10;
    let clearBtnW = 60;
    let isHoverClear = mouseX > clearBtnX && mouseX < clearBtnX + clearBtnW &&
                       mouseY > actionY && mouseY < actionY + actionBtnH;
    fill(isHoverClear ? '#757575' : '#9E9E9E');
    stroke('#616161');
    strokeWeight(1);
    rect(clearBtnX, actionY, clearBtnW, actionBtnH, 5);
    fill('white');
    noStroke();
    text('Clear', clearBtnX + clearBtnW/2, actionY + actionBtnH/2);
}

function generateProblem() {
    let problems = problemSets[difficulty];
    currentProblem = problems[Math.floor(Math.random() * problems.length)];
    userInside = '';
    userOutside = '';
    feedback = '';
    showingSolution = false;
    activeField = null;
}

function checkAnswer() {
    if (!currentProblem || (!userInside && !userOutside)) {
        feedback = 'Please enter both inside and outside functions';
        feedbackColor = [150, 100, 0];
        return;
    }

    attempts++;

    // Normalize answers for comparison
    let normUserInside = normalizeExpression(userInside);
    let normUserOutside = normalizeExpression(userOutside);
    let normCorrectInside = normalizeExpression(currentProblem.inside);
    let normCorrectOutside = normalizeExpression(currentProblem.outside);

    let insideCorrect = normUserInside === normCorrectInside;
    let outsideCorrect = normUserOutside === normCorrectOutside;

    if (insideCorrect && outsideCorrect) {
        score++;
        feedback = 'Correct! You identified both functions!';
        feedbackColor = [0, 130, 0];
    } else if (insideCorrect) {
        feedback = 'Inside is correct, but check your outside function';
        feedbackColor = [200, 100, 0];
    } else if (outsideCorrect) {
        feedback = 'Outside is correct, but check your inside function';
        feedbackColor = [200, 100, 0];
    } else {
        feedback = 'Not quite. Try again or see the solution.';
        feedbackColor = [180, 0, 0];
    }
}

function normalizeExpression(expr) {
    // Normalize expression for comparison
    return expr.toLowerCase()
        .replace(/\s+/g, '')           // Remove spaces
        .replace(/\*\*/g, '^')         // ** to ^
        .replace(/sqrt/g, 'sqrt')      // Keep sqrt
        .replace(/\^1(?![0-9])/g, '')  // Remove ^1
        .replace(/\(\(/g, '(')         // Simplify double parens
        .replace(/\)\)/g, ')')
        .replace(/^\((.+)\)$/, '$1');  // Remove outer parens if wrapping entire expr
}

function toggleSolution() {
    showingSolution = !showingSolution;
}

function clearInputs() {
    userInside = '';
    userOutside = '';
    feedback = '';
    activeField = null;
}

function mousePressed() {
    let boxY = 145;
    let boxW = (canvasWidth - 3*margin) / 2;
    let boxH = 70;

    // Check input boxes
    let insideX = margin;
    let outsideX = 2*margin + boxW;

    if (mouseX > insideX && mouseX < insideX + boxW &&
        mouseY > boxY && mouseY < boxY + boxH) {
        activeField = 'inside';
        return;
    }

    if (mouseX > outsideX && mouseX < outsideX + boxW &&
        mouseY > boxY && mouseY < boxY + boxH) {
        activeField = 'outside';
        return;
    }

    // Difficulty buttons
    let ctrlY = drawHeight + 10;
    let difficulties = ['simple', 'medium', 'nested'];
    let btnW = 60;
    let btnH = 24;
    let btnX = 75;

    for (let i = 0; i < difficulties.length; i++) {
        let x = btnX + i * (btnW + 5);
        if (mouseX > x && mouseX < x + btnW &&
            mouseY > ctrlY && mouseY < ctrlY + btnH) {
            difficulty = difficulties[i];
            generateProblem();
            return;
        }
    }

    // Action buttons
    let actionY = ctrlY + 35;
    let actionBtnW = 90;
    let actionBtnH = 28;

    // New Function
    let newBtnX = 10;
    if (mouseX > newBtnX && mouseX < newBtnX + actionBtnW &&
        mouseY > actionY && mouseY < actionY + actionBtnH) {
        generateProblem();
        return;
    }

    // Check Answer
    let checkBtnX = newBtnX + actionBtnW + 10;
    if (mouseX > checkBtnX && mouseX < checkBtnX + actionBtnW &&
        mouseY > actionY && mouseY < actionY + actionBtnH) {
        checkAnswer();
        return;
    }

    // Show Solution
    let showBtnX = checkBtnX + actionBtnW + 10;
    if (mouseX > showBtnX && mouseX < showBtnX + actionBtnW &&
        mouseY > actionY && mouseY < actionY + actionBtnH) {
        toggleSolution();
        return;
    }

    // Clear
    let clearBtnX = showBtnX + actionBtnW + 10;
    let clearBtnW = 60;
    if (mouseX > clearBtnX && mouseX < clearBtnX + clearBtnW &&
        mouseY > actionY && mouseY < actionY + actionBtnH) {
        clearInputs();
        return;
    }

    // Click outside deselects
    activeField = null;
}

function keyPressed() {
    if (!activeField) return false;

    let validChars = '0123456789xue^+-*/()sincotanqrlg. ';

    if (key.length === 1 && validChars.includes(key.toLowerCase())) {
        if (activeField === 'inside') {
            userInside += key;
        } else {
            userOutside += key;
        }
    } else if (keyCode === BACKSPACE) {
        if (activeField === 'inside') {
            userInside = userInside.slice(0, -1);
        } else {
            userOutside = userOutside.slice(0, -1);
        }
    } else if (keyCode === ENTER) {
        checkAnswer();
    } else if (keyCode === TAB) {
        // Toggle between fields
        activeField = activeField === 'inside' ? 'outside' : 'inside';
    }

    return false;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
