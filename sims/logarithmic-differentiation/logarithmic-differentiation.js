// Logarithmic Differentiation - Step-by-Step Guide
// Guide students through the logarithmic differentiation process with multiple examples
// Bloom Level: Apply (L3), Verbs: apply, calculate, solve
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 450;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// Layout parameters
let leftPanelWidth, rightPanelWidth;
let panelTop = 55;
let panelHeight;

// State variables
let currentCategory = 'Products';
let currentExampleIndex = 0;
let currentStep = 0;
let showWhyExplanation = false;
let tryItMode = false;
let tryItSelectedOption = -1;
let tryItCorrect = null;

// Animation
let highlightAlpha = 0;
let highlightDirection = 1;

// Control buttons
let categoryButtons = [];
let nextStepButton, whyButton, tryItButton, resetButton;

// Categories of examples
const categories = ['Products', 'Quotients', 'Powers', 'Variable Exp'];

// Example problems with step-by-step solutions
const examples = {
    'Products': [
        {
            original: 'y = x^2 (x+1)^3 (x+2)^4',
            steps: [
                {
                    action: 'Take ln of both sides',
                    left: 'ln(y)',
                    right: 'ln(x^2 (x+1)^3 (x+2)^4)',
                    why: 'Taking the natural log allows us to use log properties to simplify the expression.',
                    property: null
                },
                {
                    action: 'Apply product rule for logs',
                    left: 'ln(y)',
                    right: 'ln(x^2) + ln((x+1)^3) + ln((x+2)^4)',
                    why: 'ln(ab) = ln(a) + ln(b) converts products to sums, which are easier to differentiate.',
                    property: 'product',
                    highlight: [0, 1, 2]
                },
                {
                    action: 'Apply power rule for logs',
                    left: 'ln(y)',
                    right: '2ln(x) + 3ln(x+1) + 4ln(x+2)',
                    why: 'ln(a^n) = n*ln(a) brings exponents down as coefficients.',
                    property: 'power',
                    highlight: [0, 1, 2]
                },
                {
                    action: 'Differentiate both sides',
                    left: '(1/y)(dy/dx)',
                    right: '2/x + 3/(x+1) + 4/(x+2)',
                    why: 'Use implicit differentiation on ln(y) and chain rule: d/dx[ln(y)] = (1/y)(dy/dx)',
                    property: null
                },
                {
                    action: 'Solve for dy/dx',
                    left: 'dy/dx',
                    right: 'y[2/x + 3/(x+1) + 4/(x+2)]',
                    why: 'Multiply both sides by y to isolate dy/dx.',
                    property: null
                },
                {
                    action: 'Substitute original y',
                    left: 'dy/dx',
                    right: 'x^2(x+1)^3(x+2)^4 [2/x + 3/(x+1) + 4/(x+2)]',
                    why: 'Replace y with the original expression to get the final answer.',
                    property: null
                }
            ]
        },
        {
            original: 'y = x(x+1)(x+2)',
            steps: [
                {
                    action: 'Take ln of both sides',
                    left: 'ln(y)',
                    right: 'ln(x(x+1)(x+2))',
                    why: 'Taking ln converts products to sums via log properties.',
                    property: null
                },
                {
                    action: 'Apply product rule for logs',
                    left: 'ln(y)',
                    right: 'ln(x) + ln(x+1) + ln(x+2)',
                    why: 'ln(abc) = ln(a) + ln(b) + ln(c)',
                    property: 'product',
                    highlight: [0, 1, 2]
                },
                {
                    action: 'Differentiate both sides',
                    left: '(1/y)(dy/dx)',
                    right: '1/x + 1/(x+1) + 1/(x+2)',
                    why: 'd/dx[ln(u)] = (1/u)(du/dx). Each term differentiates simply.',
                    property: null
                },
                {
                    action: 'Solve for dy/dx',
                    left: 'dy/dx',
                    right: 'x(x+1)(x+2) [1/x + 1/(x+1) + 1/(x+2)]',
                    why: 'Multiply by y and substitute the original function.',
                    property: null
                }
            ]
        }
    ],
    'Quotients': [
        {
            original: 'y = (x+1)^2 / (x+2)^3',
            steps: [
                {
                    action: 'Take ln of both sides',
                    left: 'ln(y)',
                    right: 'ln((x+1)^2 / (x+2)^3)',
                    why: 'Logarithms convert quotients to differences.',
                    property: null
                },
                {
                    action: 'Apply quotient rule for logs',
                    left: 'ln(y)',
                    right: 'ln((x+1)^2) - ln((x+2)^3)',
                    why: 'ln(a/b) = ln(a) - ln(b) converts division to subtraction.',
                    property: 'quotient',
                    highlight: [0, 1]
                },
                {
                    action: 'Apply power rule for logs',
                    left: 'ln(y)',
                    right: '2ln(x+1) - 3ln(x+2)',
                    why: 'ln(a^n) = n*ln(a) brings exponents down.',
                    property: 'power',
                    highlight: [0, 1]
                },
                {
                    action: 'Differentiate both sides',
                    left: '(1/y)(dy/dx)',
                    right: '2/(x+1) - 3/(x+2)',
                    why: 'Differentiate each logarithm using chain rule.',
                    property: null
                },
                {
                    action: 'Solve for dy/dx',
                    left: 'dy/dx',
                    right: '[(x+1)^2/(x+2)^3] [2/(x+1) - 3/(x+2)]',
                    why: 'Multiply by y and substitute original expression.',
                    property: null
                }
            ]
        },
        {
            original: 'y = sqrt(x) / (x+1)',
            steps: [
                {
                    action: 'Rewrite with exponent',
                    left: 'y',
                    right: 'x^(1/2) / (x+1)',
                    why: 'Express sqrt(x) as x^(1/2) for easier manipulation.',
                    property: null
                },
                {
                    action: 'Take ln of both sides',
                    left: 'ln(y)',
                    right: 'ln(x^(1/2)) - ln(x+1)',
                    why: 'Apply ln and use quotient rule immediately.',
                    property: 'quotient',
                    highlight: [0, 1]
                },
                {
                    action: 'Apply power rule',
                    left: 'ln(y)',
                    right: '(1/2)ln(x) - ln(x+1)',
                    why: 'Bring the 1/2 exponent down as a coefficient.',
                    property: 'power',
                    highlight: [0]
                },
                {
                    action: 'Differentiate both sides',
                    left: '(1/y)(dy/dx)',
                    right: '1/(2x) - 1/(x+1)',
                    why: 'd/dx[(1/2)ln(x)] = 1/(2x)',
                    property: null
                },
                {
                    action: 'Solve for dy/dx',
                    left: 'dy/dx',
                    right: '[sqrt(x)/(x+1)] [1/(2x) - 1/(x+1)]',
                    why: 'Final answer with y substituted back.',
                    property: null
                }
            ]
        }
    ],
    'Powers': [
        {
            original: 'y = (sin x)^x',
            steps: [
                {
                    action: 'Take ln of both sides',
                    left: 'ln(y)',
                    right: 'ln((sin x)^x)',
                    why: 'This has x in both base and exponent - log diff is essential!',
                    property: null
                },
                {
                    action: 'Apply power rule for logs',
                    left: 'ln(y)',
                    right: 'x * ln(sin x)',
                    why: 'ln(a^n) = n*ln(a) brings x down as a coefficient.',
                    property: 'power',
                    highlight: [0]
                },
                {
                    action: 'Differentiate using product rule',
                    left: '(1/y)(dy/dx)',
                    right: 'ln(sin x) + x*(cos x/sin x)',
                    why: 'd/dx[x*ln(sin x)] = ln(sin x)*1 + x*(cos x/sin x) by product rule.',
                    property: null
                },
                {
                    action: 'Simplify',
                    left: '(1/y)(dy/dx)',
                    right: 'ln(sin x) + x*cot(x)',
                    why: 'cos(x)/sin(x) = cot(x)',
                    property: null
                },
                {
                    action: 'Solve for dy/dx',
                    left: 'dy/dx',
                    right: '(sin x)^x [ln(sin x) + x*cot(x)]',
                    why: 'Multiply by y = (sin x)^x for the final answer.',
                    property: null
                }
            ]
        },
        {
            original: 'y = x^(cos x)',
            steps: [
                {
                    action: 'Take ln of both sides',
                    left: 'ln(y)',
                    right: 'ln(x^(cos x))',
                    why: 'Variable base and exponent require logarithmic differentiation.',
                    property: null
                },
                {
                    action: 'Apply power rule for logs',
                    left: 'ln(y)',
                    right: 'cos(x) * ln(x)',
                    why: 'The exponent cos(x) comes down as a coefficient.',
                    property: 'power',
                    highlight: [0]
                },
                {
                    action: 'Differentiate using product rule',
                    left: '(1/y)(dy/dx)',
                    right: '-sin(x)*ln(x) + cos(x)/x',
                    why: 'Product rule: d/dx[cos(x)*ln(x)] = -sin(x)*ln(x) + cos(x)*(1/x)',
                    property: null
                },
                {
                    action: 'Solve for dy/dx',
                    left: 'dy/dx',
                    right: 'x^(cos x) [cos(x)/x - sin(x)*ln(x)]',
                    why: 'Multiply by y and rearrange for cleaner form.',
                    property: null
                }
            ]
        }
    ],
    'Variable Exp': [
        {
            original: 'y = x^x',
            steps: [
                {
                    action: 'Take ln of both sides',
                    left: 'ln(y)',
                    right: 'ln(x^x)',
                    why: 'The classic example! x appears in both base and exponent.',
                    property: null
                },
                {
                    action: 'Apply power rule for logs',
                    left: 'ln(y)',
                    right: 'x * ln(x)',
                    why: 'ln(x^x) = x*ln(x) by the power rule.',
                    property: 'power',
                    highlight: [0]
                },
                {
                    action: 'Differentiate using product rule',
                    left: '(1/y)(dy/dx)',
                    right: 'ln(x) + x*(1/x)',
                    why: 'd/dx[x*ln(x)] = 1*ln(x) + x*(1/x) = ln(x) + 1',
                    property: null
                },
                {
                    action: 'Simplify',
                    left: '(1/y)(dy/dx)',
                    right: 'ln(x) + 1',
                    why: 'x*(1/x) = 1, so we get ln(x) + 1',
                    property: null
                },
                {
                    action: 'Solve for dy/dx',
                    left: 'dy/dx',
                    right: 'x^x (ln(x) + 1)',
                    why: 'This famous result: d/dx[x^x] = x^x(ln(x) + 1)',
                    property: null
                }
            ]
        },
        {
            original: 'y = (1+x)^(1/x)',
            steps: [
                {
                    action: 'Take ln of both sides',
                    left: 'ln(y)',
                    right: 'ln((1+x)^(1/x))',
                    why: 'This form appears in the limit definition of e!',
                    property: null
                },
                {
                    action: 'Apply power rule for logs',
                    left: 'ln(y)',
                    right: '(1/x) * ln(1+x)',
                    why: 'Exponent 1/x comes down as coefficient.',
                    property: 'power',
                    highlight: [0]
                },
                {
                    action: 'Differentiate using quotient rule',
                    left: '(1/y)(dy/dx)',
                    right: '[-ln(1+x)/x^2] + [1/(x(1+x))]',
                    why: 'd/dx[(1/x)*ln(1+x)] requires quotient/product rule.',
                    property: null
                },
                {
                    action: 'Simplify',
                    left: '(1/y)(dy/dx)',
                    right: '[1/(x(1+x))] - [ln(1+x)/x^2]',
                    why: 'Rearranged for clarity.',
                    property: null
                },
                {
                    action: 'Solve for dy/dx',
                    left: 'dy/dx',
                    right: '(1+x)^(1/x) [1/(x(1+x)) - ln(1+x)/x^2]',
                    why: 'Final answer with y substituted.',
                    property: null
                }
            ]
        }
    ]
};

// Try-it mode options for each step type
const tryItOptions = {
    'product': ['ln(ab) = ln(a) + ln(b)', 'ln(a/b) = ln(a) - ln(b)', 'ln(a^n) = n*ln(a)'],
    'quotient': ['ln(ab) = ln(a) + ln(b)', 'ln(a/b) = ln(a) - ln(b)', 'ln(a^n) = n*ln(a)'],
    'power': ['ln(ab) = ln(a) + ln(b)', 'ln(a/b) = ln(a) - ln(b)', 'ln(a^n) = n*ln(a)']
};

const correctAnswers = {
    'product': 0,
    'quotient': 1,
    'power': 2
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    updateLayout();

    describe('Interactive logarithmic differentiation guide showing step-by-step process with color-coded transformations and explanations', LABEL);
}

function updateLayout() {
    leftPanelWidth = (canvasWidth - 3 * margin) / 2;
    rightPanelWidth = leftPanelWidth;
    panelHeight = drawHeight - panelTop - 60;

    // Category buttons
    let btnWidth = (canvasWidth - 5 * margin) / 4;
    categoryButtons = [];
    for (let i = 0; i < categories.length; i++) {
        categoryButtons.push({
            label: categories[i],
            x: margin + i * (btnWidth + margin/2),
            y: drawHeight + 10,
            w: btnWidth,
            h: 28
        });
    }

    // Control buttons
    let row2Y = drawHeight + 48;
    nextStepButton = { label: 'Next Step', x: margin, y: row2Y, w: 80, h: 26 };
    whyButton = { label: 'Why?', x: margin + 90, y: row2Y, w: 55, h: 26 };
    tryItButton = { label: 'Try It', x: margin + 155, y: row2Y, w: 55, h: 26 };
    resetButton = { label: 'Reset', x: margin + 220, y: row2Y, w: 55, h: 26 };
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    fill(250, 252, 255);
    stroke(200);
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill(245);
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Animate highlight
    highlightAlpha += highlightDirection * 3;
    if (highlightAlpha > 80 || highlightAlpha < 20) {
        highlightDirection *= -1;
    }

    drawTitle();
    drawPanels();
    drawControls();

    if (showWhyExplanation) {
        drawWhyPanel();
    }

    if (tryItMode) {
        drawTryItPanel();
    }
}

function drawTitle() {
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Logarithmic Differentiation', canvasWidth / 2, 8);
    textStyle(NORMAL);
    textSize(14);
    fill(80);

    let currentEx = examples[currentCategory][currentExampleIndex];
    text(currentEx.original, canvasWidth / 2, 30);
}

function drawPanels() {
    let currentEx = examples[currentCategory][currentExampleIndex];
    let currentStepData = currentStep < currentEx.steps.length ? currentEx.steps[currentStep] : null;

    // Left panel - Original form / current equation
    let leftX = margin;
    let rightX = margin * 2 + leftPanelWidth;

    // Panel backgrounds
    fill(255);
    stroke(180);
    strokeWeight(1);
    rect(leftX, panelTop, leftPanelWidth, panelHeight, 5);
    rect(rightX, panelTop, rightPanelWidth, panelHeight, 5);

    // Panel headers
    fill(70, 100, 170);
    noStroke();
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Left Side', leftX + leftPanelWidth/2, panelTop + 8);
    text('Right Side', rightX + rightPanelWidth/2, panelTop + 8);
    textStyle(NORMAL);

    // Step indicator
    fill(100);
    textSize(12);
    textAlign(LEFT, TOP);
    text('Step ' + (currentStep + 1) + ' of ' + currentEx.steps.length, leftX + 5, panelTop + panelHeight + 5);

    // Draw steps
    drawSteps(leftX, rightX);
}

function drawSteps(leftX, rightX) {
    let currentEx = examples[currentCategory][currentExampleIndex];
    let yPos = panelTop + 35;
    let lineHeight = 45;

    textSize(12);

    for (let i = 0; i <= currentStep && i < currentEx.steps.length; i++) {
        let step = currentEx.steps[i];
        let isCurrentStep = (i === currentStep);

        // Step action label
        fill(isCurrentStep ? color(50, 120, 180) : color(120));
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        text((i + 1) + '. ' + step.action, leftX + 8, yPos);
        textStyle(NORMAL);

        // Left side equation
        let leftEqY = yPos + 18;
        drawColoredEquation(step.left, leftX + 15, leftEqY, leftPanelWidth - 30, step.property, isCurrentStep);

        // Right side equation
        drawColoredEquation(step.right, rightX + 15, leftEqY, rightPanelWidth - 30, step.property, isCurrentStep);

        // Highlight current step
        if (isCurrentStep && step.property) {
            noFill();
            stroke(getPropertyColor(step.property, highlightAlpha));
            strokeWeight(2);
            rect(leftX + 2, yPos - 2, leftPanelWidth - 4, lineHeight - 5, 3);
            rect(rightX + 2, yPos - 2, rightPanelWidth - 4, lineHeight - 5, 3);
        }

        yPos += lineHeight;

        if (yPos > panelTop + panelHeight - 20) break;
    }
}

function drawColoredEquation(eq, x, y, maxWidth, property, highlight) {
    // Color code based on property type
    let baseColor = color(40);

    if (highlight && property) {
        baseColor = getPropertyColor(property, 255);
    }

    fill(baseColor);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);

    // Word wrap if needed
    let words = eq.split(' ');
    let line = '';
    let lineY = y;

    for (let word of words) {
        let testLine = line + word + ' ';
        if (textWidth(testLine) > maxWidth && line !== '') {
            text(line.trim(), x, lineY);
            line = word + ' ';
            lineY += 16;
        } else {
            line = testLine;
        }
    }
    text(line.trim(), x, lineY);
}

function getPropertyColor(property, alpha) {
    switch(property) {
        case 'product': return color(30, 100, 200, alpha); // Blue
        case 'quotient': return color(180, 50, 50, alpha); // Red
        case 'power': return color(50, 150, 50, alpha); // Green
        default: return color(80, alpha);
    }
}

function drawWhyPanel() {
    let currentEx = examples[currentCategory][currentExampleIndex];
    if (currentStep >= currentEx.steps.length) return;

    let step = currentEx.steps[currentStep];

    // Semi-transparent overlay
    fill(0, 0, 0, 100);
    noStroke();
    rect(0, 0, canvasWidth, drawHeight);

    // Why panel
    let panelW = canvasWidth - 60;
    let panelH = 120;
    let panelX = 30;
    let panelY = drawHeight / 2 - panelH / 2;

    fill(255, 255, 240);
    stroke(200, 180, 100);
    strokeWeight(2);
    rect(panelX, panelY, panelW, panelH, 8);

    // Title
    fill(150, 120, 50);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Why This Step?', panelX + panelW/2, panelY + 12);
    textStyle(NORMAL);

    // Explanation
    fill(60);
    textSize(13);
    textAlign(LEFT, TOP);
    text(step.why, panelX + 15, panelY + 38, panelW - 30, panelH - 50);

    // Close hint
    fill(120);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text('Click anywhere to close', panelX + panelW/2, panelY + panelH - 8);
}

function drawTryItPanel() {
    let currentEx = examples[currentCategory][currentExampleIndex];
    if (currentStep >= currentEx.steps.length) return;

    let step = currentEx.steps[currentStep];
    if (!step.property) {
        // No try-it for non-property steps
        tryItMode = false;
        return;
    }

    // Semi-transparent overlay
    fill(0, 0, 0, 100);
    noStroke();
    rect(0, 0, canvasWidth, drawHeight);

    // Try It panel
    let panelW = canvasWidth - 40;
    let panelH = 180;
    let panelX = 20;
    let panelY = drawHeight / 2 - panelH / 2;

    fill(240, 248, 255);
    stroke(100, 150, 200);
    strokeWeight(2);
    rect(panelX, panelY, panelW, panelH, 8);

    // Title
    fill(50, 100, 150);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Which Log Property Should We Apply?', panelX + panelW/2, panelY + 12);
    textStyle(NORMAL);

    // Options
    let options = tryItOptions[step.property];
    let optionY = panelY + 45;
    let optionH = 32;

    for (let i = 0; i < options.length; i++) {
        let optX = panelX + 20;
        let optW = panelW - 40;

        // Option button
        let isSelected = (tryItSelectedOption === i);
        let isCorrect = (i === correctAnswers[step.property]);

        if (tryItCorrect !== null) {
            if (isCorrect) {
                fill(200, 255, 200);
                stroke(100, 200, 100);
            } else if (isSelected && !tryItCorrect) {
                fill(255, 200, 200);
                stroke(200, 100, 100);
            } else {
                fill(250);
                stroke(180);
            }
        } else if (isSelected) {
            fill(220, 235, 255);
            stroke(100, 150, 200);
        } else {
            fill(255);
            stroke(180);
        }

        strokeWeight(1);
        rect(optX, optionY, optW, optionH, 4);

        // Option text
        fill(40);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        text(options[i], optX + optW/2, optionY + optionH/2);

        optionY += optionH + 8;
    }

    // Feedback
    if (tryItCorrect !== null) {
        textSize(14);
        textStyle(BOLD);
        textAlign(CENTER, TOP);
        if (tryItCorrect) {
            fill(50, 150, 50);
            text('Correct! Click anywhere to continue.', panelX + panelW/2, optionY + 5);
        } else {
            fill(180, 50, 50);
            text('Not quite. Try again!', panelX + panelW/2, optionY + 5);
        }
        textStyle(NORMAL);
    }
}

function drawControls() {
    // Category buttons
    for (let btn of categoryButtons) {
        let isSelected = (currentCategory === btn.label);
        drawCategoryButton(btn, isSelected);
    }

    // Action buttons
    let currentEx = examples[currentCategory][currentExampleIndex];
    let canAdvance = currentStep < currentEx.steps.length - 1;
    let hasProperty = currentStep < currentEx.steps.length &&
                      currentEx.steps[currentStep].property !== null;

    drawActionButton(nextStepButton, canAdvance);
    drawActionButton(whyButton, true);
    drawActionButton(tryItButton, hasProperty);
    drawActionButton(resetButton, true);

    // Legend
    drawLegend();
}

function drawCategoryButton(btn, isSelected) {
    if (isSelected) {
        fill(70, 120, 180);
        stroke(50, 100, 160);
    } else {
        fill(220);
        stroke(180);
    }
    strokeWeight(1);
    rect(btn.x, btn.y, btn.w, btn.h, 4);

    fill(isSelected ? 255 : 60);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(btn.label, btn.x + btn.w/2, btn.y + btn.h/2);
}

function drawActionButton(btn, enabled) {
    if (enabled) {
        fill(100, 140, 180);
        stroke(80, 120, 160);
    } else {
        fill(180);
        stroke(160);
    }
    strokeWeight(1);
    rect(btn.x, btn.y, btn.w, btn.h, 4);

    fill(enabled ? 255 : 200);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(btn.label, btn.x + btn.w/2, btn.y + btn.h/2);
}

function drawLegend() {
    let legendX = canvasWidth - 130;
    let legendY = drawHeight + 45;

    textSize(10);
    textAlign(LEFT, CENTER);

    // Products - Blue
    fill(30, 100, 200);
    noStroke();
    rect(legendX, legendY, 12, 12, 2);
    fill(60);
    text('Products', legendX + 16, legendY + 6);

    // Quotients - Red
    legendY += 15;
    fill(180, 50, 50);
    rect(legendX, legendY, 12, 12, 2);
    fill(60);
    text('Quotients', legendX + 16, legendY + 6);

    // Powers - Green
    legendX += 65;
    legendY -= 15;
    fill(50, 150, 50);
    rect(legendX, legendY, 12, 12, 2);
    fill(60);
    text('Powers', legendX + 16, legendY + 6);
}

function mousePressed() {
    // Close overlays on click
    if (showWhyExplanation) {
        showWhyExplanation = false;
        return;
    }

    if (tryItMode) {
        if (tryItCorrect === true) {
            tryItMode = false;
            tryItCorrect = null;
            tryItSelectedOption = -1;
            return;
        }

        // Check option clicks
        let currentEx = examples[currentCategory][currentExampleIndex];
        let step = currentEx.steps[currentStep];
        if (step && step.property) {
            let options = tryItOptions[step.property];
            let panelW = canvasWidth - 40;
            let panelH = 180;
            let panelX = 20;
            let panelY = drawHeight / 2 - panelH / 2;
            let optionY = panelY + 45;
            let optionH = 32;

            for (let i = 0; i < options.length; i++) {
                let optX = panelX + 20;
                let optW = panelW - 40;

                if (mouseX >= optX && mouseX <= optX + optW &&
                    mouseY >= optionY && mouseY <= optionY + optionH) {
                    tryItSelectedOption = i;
                    tryItCorrect = (i === correctAnswers[step.property]);
                    return;
                }
                optionY += optionH + 8;
            }
        }
        return;
    }

    // Check category buttons
    for (let btn of categoryButtons) {
        if (isInButton(mouseX, mouseY, btn)) {
            currentCategory = btn.label;
            currentExampleIndex = 0;
            currentStep = 0;
            return;
        }
    }

    // Check action buttons
    let currentEx = examples[currentCategory][currentExampleIndex];

    if (isInButton(mouseX, mouseY, nextStepButton)) {
        if (currentStep < currentEx.steps.length - 1) {
            currentStep++;
        } else {
            // Move to next example or wrap around
            currentExampleIndex = (currentExampleIndex + 1) % examples[currentCategory].length;
            currentStep = 0;
        }
        return;
    }

    if (isInButton(mouseX, mouseY, whyButton)) {
        showWhyExplanation = true;
        return;
    }

    if (isInButton(mouseX, mouseY, tryItButton)) {
        let step = currentEx.steps[currentStep];
        if (step && step.property) {
            tryItMode = true;
            tryItSelectedOption = -1;
            tryItCorrect = null;
        }
        return;
    }

    if (isInButton(mouseX, mouseY, resetButton)) {
        currentStep = 0;
        return;
    }
}

function isInButton(mx, my, btn) {
    return mx >= btn.x && mx <= btn.x + btn.w &&
           my >= btn.y && my <= btn.y + btn.h;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateLayout();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.min(Math.floor(container.width), 500);
}
