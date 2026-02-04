// Limit Laws Practice MicroSim
// Interactive practice for applying limit laws
// Bloom Level: Apply (L3), Verb: Calculate

let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Problem state
let currentProblem = null;
let userAnswer = '';
let feedback = '';
let feedbackColor = [0, 0, 0];
let score = 0;
let attempts = 0;
let showingSolution = false;
let difficulty = 'basic';

// UI elements
let difficultySelect;
let newProblemButton;
let checkButton;
let showSolutionButton;

// Problem generators
let basicProblems = [
    { expr: '5x', target: 3, answer: 15, steps: ['Direct substitution: 5(3) = 15'] },
    { expr: '2x + 1', target: 4, answer: 9, steps: ['Sum rule: lim(2x) + lim(1)', '= 2(4) + 1 = 9'] },
    { expr: 'x²', target: 2, answer: 4, steps: ['Power rule: (lim x)²', '= 2² = 4'] },
    { expr: '3x - 2', target: 5, answer: 13, steps: ['Sum rule: lim(3x) - lim(2)', '= 3(5) - 2 = 13'] },
    { expr: '4', target: 7, answer: 4, steps: ['Constant rule: lim(4) = 4'] }
];

let intermediateProblems = [
    { expr: 'x² + 3x', target: 2, answer: 10, steps: ['Sum rule: lim(x²) + lim(3x)', '= 4 + 6 = 10'] },
    { expr: '2x² - x', target: 3, answer: 15, steps: ['Difference rule: lim(2x²) - lim(x)', '= 2(9) - 3 = 15'] },
    { expr: '(x + 1)(x - 1)', target: 4, answer: 15, steps: ['Product rule: lim(x+1) · lim(x-1)', '= 5 · 3 = 15'] },
    { expr: 'x³ - 2x', target: 2, answer: 4, steps: ['Sum rule: lim(x³) - lim(2x)', '= 8 - 4 = 4'] },
    { expr: '5x + x²', target: -1, answer: -4, steps: ['Sum rule: lim(5x) + lim(x²)', '= -5 + 1 = -4'] }
];

let challengeProblems = [
    { expr: '(2x² - x)/(x + 1)', target: 1, answer: 0.5, steps: ['Quotient rule: lim(2x² - x)/lim(x + 1)', '= (2 - 1)/(1 + 1) = 1/2 = 0.5'] },
    { expr: '(x² + 2x + 1)/(x + 1)', target: 2, answer: 3, steps: ['Factor: (x + 1)²/(x + 1) = x + 1', 'lim(x + 1) = 3'] },
    { expr: '(3x³ - x)/(x² + 1)', target: 1, answer: 1, steps: ['Quotient rule: (3 - 1)/(1 + 1)', '= 2/2 = 1'] },
    { expr: '(x + 2)³', target: 1, answer: 27, steps: ['Power rule: [lim(x + 2)]³', '= 3³ = 27'] },
    { expr: '(x² - 4)/(x - 2)', target: 2, answer: 4, steps: ['Factor: (x+2)(x-2)/(x-2)', '= lim(x + 2) = 4'] }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Difficulty selector
    difficultySelect = createSelect();
    difficultySelect.position(100, drawHeight + 5);
    difficultySelect.option('Basic', 'basic');
    difficultySelect.option('Intermediate', 'intermediate');
    difficultySelect.option('Challenge', 'challenge');
    difficultySelect.changed(() => {
        difficulty = difficultySelect.value();
        generateProblem();
    });

    // New Problem button
    newProblemButton = createButton('New Problem');
    newProblemButton.position(10, drawHeight + 40);
    newProblemButton.mousePressed(generateProblem);

    // Check Answer button
    checkButton = createButton('Check Answer');
    checkButton.position(110, drawHeight + 40);
    checkButton.mousePressed(checkAnswer);

    // Show Solution button
    showSolutionButton = createButton('Show Solution');
    showSolutionButton.position(220, drawHeight + 40);
    showSolutionButton.mousePressed(toggleSolution);

    generateProblem();

    describe('Practice limit laws with interactive problems', LABEL);
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
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(22);
    text('Limit Laws Practice', canvasWidth/2, 15);

    // Score
    textSize(14);
    textAlign(RIGHT, TOP);
    text('Score: ' + score + '/' + attempts, canvasWidth - 20, 15);

    // Draw problem
    if (currentProblem) {
        drawProblem();
    }

    // Draw answer input area
    drawAnswerArea();

    // Draw feedback
    if (feedback) {
        textSize(16);
        textAlign(CENTER, TOP);
        fill(feedbackColor[0], feedbackColor[1], feedbackColor[2]);
        noStroke();
        text(feedback, canvasWidth/2, 250);
    }

    // Show solution if toggled
    if (showingSolution && currentProblem) {
        drawSolution();
    }

    // Control labels
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text('Difficulty:', 10, drawHeight + 15);
}

function drawProblem() {
    let centerX = canvasWidth / 2;

    // Problem box
    fill(255);
    stroke(100, 150, 200);
    strokeWeight(2);
    rect(centerX - 150, 55, 300, 80, 10);

    // "Find:" label
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text('Find the limit:', centerX, 65);

    // Limit expression
    textSize(24);
    textAlign(CENTER, CENTER);
    let limitText = 'lim     (' + currentProblem.expr + ')';
    text(limitText, centerX, 105);

    // x → target (subscript style)
    textSize(14);
    text('x→' + currentProblem.target, centerX - 55, 115);
}

function drawAnswerArea() {
    let centerX = canvasWidth / 2;

    // Answer input box
    fill(255);
    stroke(150);
    strokeWeight(2);
    rect(centerX - 80, 160, 160, 50, 8);

    // Label
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text('Your Answer:', centerX, 145);

    // User answer display
    textSize(24);
    textAlign(CENTER, CENTER);
    if (userAnswer === '') {
        fill(180);
        text('Type a number', centerX, 185);
    } else {
        fill(0);
        text(userAnswer, centerX, 185);
    }

    // Cursor blink
    if (frameCount % 60 < 30 && userAnswer === '') {
        stroke(0);
        strokeWeight(2);
        line(centerX, 170, centerX, 200);
    }
}

function drawSolution() {
    let y = 290;

    fill(240, 248, 255);
    stroke(100, 150, 200);
    strokeWeight(1);
    rect(30, y, canvasWidth - 60, 20 + currentProblem.steps.length * 25, 8);

    fill(0, 80, 150);
    noStroke();
    textSize(14);
    textAlign(LEFT, TOP);
    text('Solution:', 45, y + 8);

    fill(0);
    textSize(13);
    for (let i = 0; i < currentProblem.steps.length; i++) {
        text(currentProblem.steps[i], 45, y + 28 + i * 22);
    }

    textSize(16);
    fill(0, 120, 0);
    text('Answer: ' + currentProblem.answer, 45, y + 28 + currentProblem.steps.length * 22 + 5);
}

function generateProblem() {
    let problems;
    if (difficulty === 'basic') {
        problems = basicProblems;
    } else if (difficulty === 'intermediate') {
        problems = intermediateProblems;
    } else {
        problems = challengeProblems;
    }

    currentProblem = problems[Math.floor(Math.random() * problems.length)];
    userAnswer = '';
    feedback = '';
    showingSolution = false;
}

function checkAnswer() {
    if (!currentProblem || userAnswer === '') return;

    let numAnswer = parseFloat(userAnswer);
    attempts++;

    if (Math.abs(numAnswer - currentProblem.answer) < 0.01) {
        feedback = 'Correct!';
        feedbackColor = [0, 150, 0];
        score++;
    } else {
        feedback = 'Incorrect. Try again or see solution.';
        feedbackColor = [200, 0, 0];
    }
}

function toggleSolution() {
    showingSolution = !showingSolution;
}

function keyPressed() {
    if (key >= '0' && key <= '9') {
        userAnswer += key;
    } else if (key === '-' && userAnswer === '') {
        userAnswer = '-';
    } else if (key === '.' && !userAnswer.includes('.')) {
        userAnswer += '.';
    } else if (keyCode === BACKSPACE) {
        userAnswer = userAnswer.slice(0, -1);
    } else if (keyCode === ENTER) {
        checkAnswer();
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
