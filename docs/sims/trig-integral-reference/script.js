// Trig Integral Reference MicroSim
// Interactive reference showing all six basic trig integrals with visual connections to derivatives
// Learning Objective: Students will recall the integrals of the six basic trigonometric forms
// Bloom Level: Remember (L1)
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 520;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Integral data: [integrand, antiderivative, isPositive (for color coding), memoryAid]
const trigIntegrals = [
  {
    integrand: 'sin(x)',
    antiderivative: '-cos(x) + C',
    positive: false,
    memoryAid: 'Sine integrates to minus cosine (opposite sign of derivative)'
  },
  {
    integrand: 'cos(x)',
    antiderivative: 'sin(x) + C',
    positive: true,
    memoryAid: 'Cosine integrates to sine (same as derivative goes backward)'
  },
  {
    integrand: 'sec\u00B2(x)',
    antiderivative: 'tan(x) + C',
    positive: true,
    memoryAid: 'Secant squared is the derivative of tangent'
  },
  {
    integrand: 'csc\u00B2(x)',
    antiderivative: '-cot(x) + C',
    positive: false,
    memoryAid: 'Cosecant squared integrates to minus cotangent (co-functions get negative)'
  },
  {
    integrand: 'sec(x)tan(x)',
    antiderivative: 'sec(x) + C',
    positive: true,
    memoryAid: 'This IS the derivative of secant, so integration reverses it'
  },
  {
    integrand: 'csc(x)cot(x)',
    antiderivative: '-csc(x) + C',
    positive: false,
    memoryAid: 'Co-function pattern: negative cosecant'
  }
];

// Card state
let cards = [];
let cardWidth = 200;
let cardHeight = 150;
let cardSpacing = 20;

// Selected card for detail view
let selectedCard = -1;

// Quiz mode state
let quizMode = false;
let quizInput = '';
let activeQuizCard = -1;
let quizFeedback = '';
let feedbackTimer = 0;
let quizScore = { correct: 0, attempts: 0 };

// Show verification toggle
let showVerification = false;

// Animation state
let flowAnimations = [];
let hoverCard = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  initializeCards();

  describe('Interactive reference showing all six basic trig integrals with visual connections to their derivatives. Click cards to see details and quiz yourself.', LABEL);
}

function initializeCards() {
  cards = [];
  for (let i = 0; i < 6; i++) {
    cards.push({
      revealed: false,
      flowProgress: 0,
      data: trigIntegrals[i]
    });
  }
  flowAnimations = [];
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('Trigonometric Integrals Reference', canvasWidth / 2, 8);

  // Subtitle
  textSize(14);
  fill(100);
  text('\u222B f(x) dx = F(x) + C  |  Click a card to see the integral', canvasWidth / 2, 34);

  // Update animations
  updateFlowAnimations();

  // Track hover
  updateHover();

  // Draw cards
  drawCards();

  // Draw hover tooltip
  if (hoverCard >= 0 && !quizMode) {
    drawTooltip();
  }

  // Draw quiz feedback
  if (feedbackTimer > 0) {
    drawFeedback();
    feedbackTimer--;
  }

  // Draw controls
  drawControls();

  // Draw quiz input if active
  if (quizMode && activeQuizCard >= 0) {
    drawQuizInput();
  }
}

function drawCards() {
  let startY = 60;
  let totalWidth = 3 * cardWidth + 2 * cardSpacing;
  let startX = (canvasWidth - totalWidth) / 2;

  // Draw cards in 2 rows of 3
  for (let i = 0; i < 6; i++) {
    let row = Math.floor(i / 3);
    let col = i % 3;

    let x = startX + col * (cardWidth + cardSpacing);
    let y = startY + row * (cardHeight + cardSpacing + 30);

    drawCard(i, x, y);
  }
}

function drawCard(index, x, y) {
  let card = cards[index];
  let isPositive = card.data.positive;
  let isHovered = hoverCard === index;
  let isSelected = selectedCard === index;

  // Card shadow
  fill(0, 0, 0, isHovered ? 50 : 30);
  noStroke();
  rect(x + 4, y + 4, cardWidth, cardHeight, 12);

  // Card background with color coding
  if (card.revealed || !quizMode) {
    if (isPositive) {
      fill(isHovered ? '#d0e8ff' : '#e3f2fd'); // Light blue for positive
      stroke(isSelected ? '#1976D2' : '#90CAF9');
    } else {
      fill(isHovered ? '#ffe0e0' : '#ffebee'); // Light red for negative
      stroke(isSelected ? '#c62828' : '#ef9a9a');
    }
  } else {
    fill(isHovered ? '#f0f0f0' : '#fafafa');
    stroke('#ccc');
  }
  strokeWeight(isSelected ? 3 : 2);
  rect(x, y, cardWidth, cardHeight, 12);

  // Draw integral symbol and integrand at top
  noStroke();
  textAlign(CENTER, TOP);

  // Integral symbol
  fill(80);
  textSize(18);
  text('\u222B', x + 25, y + 20);

  // Integrand
  fill(0);
  textSize(18);
  text(card.data.integrand + ' dx', x + cardWidth / 2 + 10, y + 22);

  // Derivative/Integral arrows
  drawArrows(x, y, card, isPositive);

  // Antiderivative (bottom section)
  if (card.revealed || !quizMode) {
    // Show antiderivative with flow animation
    let alpha = quizMode ? 255 : map(card.flowProgress, 0, 1, 0, 255);
    if (!quizMode && card.flowProgress < 1) {
      alpha = 255; // Always show if not in quiz mode
    }

    if (isPositive) {
      fill(30, 100, 180, alpha);
    } else {
      fill(180, 50, 50, alpha);
    }
    textSize(18);
    textAlign(CENTER, CENTER);
    text(card.data.antiderivative, x + cardWidth / 2, y + cardHeight - 35);

    // Show verification if toggled
    if (showVerification && (card.revealed || !quizMode)) {
      drawVerification(x, y, card, isPositive, alpha);
    }
  } else {
    // Quiz mode - show placeholder
    fill(150);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Click to answer', x + cardWidth / 2, y + cardHeight - 35);
  }

  // Pair indicator
  fill(180);
  textSize(10);
  textAlign(RIGHT, TOP);
  let pairLabels = ['sin/cos pair', 'sec\u00B2/csc\u00B2 pair', 'sec tan/csc cot pair'];
  text(pairLabels[Math.floor(index / 2)], x + cardWidth - 8, y + 8);
}

function drawArrows(x, y, card, isPositive) {
  let arrowY = y + cardHeight / 2;
  let leftX = x + 30;
  let rightX = x + cardWidth - 30;
  let midX = x + cardWidth / 2;

  // Draw bidirectional arrow showing derivative-integral relationship
  stroke(isPositive ? '#1976D2' : '#c62828');
  strokeWeight(2);

  // Horizontal line
  line(leftX, arrowY, rightX, arrowY);

  // Top arrow (derivative direction: right to left conceptually, but we show it going down)
  // Bottom arrow (integral direction)

  // Draw small labels
  noStroke();
  fill(100);
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text('d/dx', midX, arrowY - 5);
  textAlign(CENTER, TOP);
  text('\u222B dx', midX, arrowY + 5);

  // Arrow heads showing the cycle
  stroke(isPositive ? '#1976D2' : '#c62828');
  strokeWeight(2);

  // Left arrowhead (pointing left for derivative)
  line(leftX, arrowY, leftX + 8, arrowY - 5);
  line(leftX, arrowY, leftX + 8, arrowY + 5);

  // Right arrowhead (pointing right for integral)
  line(rightX, arrowY, rightX - 8, arrowY - 5);
  line(rightX, arrowY, rightX - 8, arrowY + 5);
}

function drawVerification(x, y, card, isPositive, alpha) {
  // Show d/dx of the antiderivative equals the integrand
  fill(100, 100, 100, alpha);
  textSize(10);
  textAlign(CENTER, BOTTOM);
  let verifyText = 'd/dx[' + card.data.antiderivative.replace(' + C', '') + '] = ' + card.data.integrand;
  text(verifyText, x + cardWidth / 2, y + cardHeight - 5);
}

function drawTooltip() {
  if (hoverCard < 0) return;

  let card = cards[hoverCard];
  let tip = card.data.memoryAid;

  // Calculate position
  let tipWidth = textWidth(tip) + 20;
  textSize(12);
  tipWidth = min(tipWidth, 280);
  let tipHeight = 40;

  let tipX = mouseX + 15;
  let tipY = mouseY - tipHeight - 10;

  // Keep on screen
  if (tipX + tipWidth > canvasWidth - 10) {
    tipX = canvasWidth - tipWidth - 10;
  }
  if (tipY < 60) {
    tipY = mouseY + 20;
  }

  // Draw tooltip background
  fill(50, 50, 50, 230);
  noStroke();
  rect(tipX, tipY, tipWidth, tipHeight, 6);

  // Draw tooltip text
  fill(255);
  textSize(11);
  textAlign(LEFT, CENTER);
  text(tip, tipX + 10, tipY + tipHeight / 2, tipWidth - 20);
}

function drawControls() {
  let btnHeight = 30;
  let btnY = drawHeight + 15;
  let spacing = 12;

  // Quiz Mode button
  let quizBtnX = 15;
  let quizBtnW = 90;
  fill(quizMode ? '#f44336' : '#7B1FA2');
  stroke(quizMode ? '#c62828' : '#6A1B9A');
  strokeWeight(1);
  rect(quizBtnX, btnY, quizBtnW, btnHeight, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(quizMode ? 'Exit Quiz' : 'Quiz Mode', quizBtnX + quizBtnW / 2, btnY + btnHeight / 2);

  // Show All button
  let showAllX = quizBtnX + quizBtnW + spacing;
  let showAllW = 75;
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(showAllX, btnY, showAllW, btnHeight, 5);
  fill(60);
  noStroke();
  text('Show All', showAllX + showAllW / 2, btnY + btnHeight / 2);

  // Hide All button
  let hideAllX = showAllX + showAllW + spacing;
  let hideAllW = 70;
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(hideAllX, btnY, hideAllW, btnHeight, 5);
  fill(60);
  noStroke();
  text('Hide All', hideAllX + hideAllW / 2, btnY + btnHeight / 2);

  // Verification toggle checkbox
  let checkX = hideAllX + hideAllW + spacing + 10;
  let checkY = btnY + 7;
  let checkSize = 16;

  stroke(100);
  strokeWeight(1);
  fill(showVerification ? '#7B1FA2' : 255);
  rect(checkX, checkY, checkSize, checkSize, 3);

  if (showVerification) {
    stroke(255);
    strokeWeight(2);
    line(checkX + 3, checkY + 8, checkX + 7, checkY + 12);
    line(checkX + 7, checkY + 12, checkX + 13, checkY + 4);
  }

  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Show Verification', checkX + checkSize + 6, checkY + checkSize / 2);

  // Quiz score (if in quiz mode)
  if (quizMode && quizScore.attempts > 0) {
    fill(60);
    textAlign(RIGHT, CENTER);
    textSize(12);
    let scoreText = 'Score: ' + quizScore.correct + '/' + quizScore.attempts;
    text(scoreText, canvasWidth - 15, btnY + btnHeight / 2);
  }

  // Legend
  textAlign(LEFT, TOP);
  textSize(10);
  fill(30, 100, 180);
  rect(canvasWidth - 160, btnY + 3, 12, 12, 2);
  fill(60);
  text('Positive result', canvasWidth - 145, btnY + 4);

  fill(180, 50, 50);
  rect(canvasWidth - 160, btnY + 18, 12, 12, 2);
  fill(60);
  text('Negative result', canvasWidth - 145, btnY + 19);
}

function drawFeedback() {
  let isCorrect = quizFeedback === 'correct';

  fill(isCorrect ? 'rgba(76, 175, 80, 0.95)' : 'rgba(244, 67, 54, 0.95)');
  noStroke();
  rect(canvasWidth / 2 - 120, drawHeight / 2 - 40, 240, 80, 12);

  fill('white');
  textAlign(CENTER, CENTER);
  textSize(20);
  text(isCorrect ? 'Correct!' : 'Not quite...', canvasWidth / 2, drawHeight / 2 - 15);

  if (!isCorrect && activeQuizCard >= 0) {
    textSize(12);
    text('Answer: ' + cards[activeQuizCard].data.antiderivative, canvasWidth / 2, drawHeight / 2 + 15);
  }
}

function drawQuizInput() {
  // Input box
  let inputX = canvasWidth / 2 - 160;
  let inputY = drawHeight - 60;
  let inputW = 320;
  let inputH = 38;

  fill(255);
  stroke('#7B1FA2');
  strokeWeight(2);
  rect(inputX, inputY, inputW, inputH, 6);

  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(16);
  let displayText = quizInput + (frameCount % 60 < 30 ? '|' : '');
  text(displayText, inputX + 12, inputY + inputH / 2);

  // Placeholder
  if (quizInput === '') {
    fill(160);
    text('Type the antiderivative (e.g., -cos(x) + C)', inputX + 12, inputY + inputH / 2);
  }

  // Instructions
  fill(100);
  textSize(10);
  textAlign(CENTER, TOP);
  text('Press Enter to check | Escape to cancel | Include "+ C"', canvasWidth / 2, inputY + inputH + 4);
}

function updateFlowAnimations() {
  for (let i = flowAnimations.length - 1; i >= 0; i--) {
    let anim = flowAnimations[i];
    let card = cards[anim.cardIndex];

    card.flowProgress += 0.05;

    if (card.flowProgress >= 1) {
      card.flowProgress = 1;
      flowAnimations.splice(i, 1);
    }
  }
}

function updateHover() {
  hoverCard = -1;
  if (mouseY < drawHeight && mouseY > 60) {
    hoverCard = getCardAtPosition(mouseX, mouseY);
  }
}

function mousePressed() {
  // Check controls first
  let btnHeight = 30;
  let btnY = drawHeight + 15;
  let spacing = 12;

  // Quiz Mode button
  let quizBtnX = 15;
  let quizBtnW = 90;
  if (mouseX >= quizBtnX && mouseX <= quizBtnX + quizBtnW &&
      mouseY >= btnY && mouseY <= btnY + btnHeight) {
    toggleQuizMode();
    return;
  }

  // Show All button
  let showAllX = quizBtnX + quizBtnW + spacing;
  let showAllW = 75;
  if (mouseX >= showAllX && mouseX <= showAllX + showAllW &&
      mouseY >= btnY && mouseY <= btnY + btnHeight) {
    showAllCards();
    return;
  }

  // Hide All button
  let hideAllX = showAllX + showAllW + spacing;
  let hideAllW = 70;
  if (mouseX >= hideAllX && mouseX <= hideAllX + hideAllW &&
      mouseY >= btnY && mouseY <= btnY + btnHeight) {
    hideAllCards();
    return;
  }

  // Verification checkbox
  let checkX = hideAllX + hideAllW + spacing + 10;
  let checkY = btnY + 7;
  let checkSize = 16;
  if (mouseX >= checkX && mouseX <= checkX + checkSize + 100 &&
      mouseY >= checkY && mouseY <= checkY + checkSize) {
    showVerification = !showVerification;
    return;
  }

  // Check cards
  if (mouseY < drawHeight && mouseY > 60) {
    let clickedCard = getCardAtPosition(mouseX, mouseY);
    if (clickedCard >= 0) {
      if (quizMode && !cards[clickedCard].revealed) {
        activeQuizCard = clickedCard;
        quizInput = '';
      } else {
        // Toggle selection and reveal
        if (selectedCard === clickedCard) {
          selectedCard = -1;
        } else {
          selectedCard = clickedCard;
          if (!cards[clickedCard].revealed) {
            revealCard(clickedCard);
          }
        }
      }
    }
  }
}

function getCardAtPosition(mx, my) {
  let startY = 60;
  let totalWidth = 3 * cardWidth + 2 * cardSpacing;
  let startX = (canvasWidth - totalWidth) / 2;

  for (let i = 0; i < 6; i++) {
    let row = Math.floor(i / 3);
    let col = i % 3;

    let x = startX + col * (cardWidth + cardSpacing);
    let y = startY + row * (cardHeight + cardSpacing + 30);

    if (mx >= x && mx <= x + cardWidth && my >= y && my <= y + cardHeight) {
      return i;
    }
  }
  return -1;
}

function revealCard(index) {
  let card = cards[index];
  if (!card.revealed) {
    card.revealed = true;
    card.flowProgress = 0;
    flowAnimations.push({ cardIndex: index });
  }
}

function toggleQuizMode() {
  quizMode = !quizMode;
  if (quizMode) {
    // Reset for quiz
    hideAllCards();
    quizScore = { correct: 0, attempts: 0 };
    activeQuizCard = -1;
    quizInput = '';
    selectedCard = -1;
  } else {
    activeQuizCard = -1;
    quizInput = '';
  }
}

function showAllCards() {
  if (quizMode) return;

  for (let i = 0; i < 6; i++) {
    if (!cards[i].revealed) {
      revealCard(i);
    }
  }
}

function hideAllCards() {
  for (let i = 0; i < 6; i++) {
    cards[i].revealed = false;
    cards[i].flowProgress = 0;
  }
  activeQuizCard = -1;
  quizInput = '';
  selectedCard = -1;
}

function keyPressed() {
  if (!quizMode || activeQuizCard < 0) return true;

  if (keyCode === ENTER || keyCode === RETURN) {
    checkQuizAnswer();
    return false;
  }

  if (keyCode === ESCAPE) {
    activeQuizCard = -1;
    quizInput = '';
    return false;
  }

  if (keyCode === BACKSPACE) {
    quizInput = quizInput.slice(0, -1);
    return false;
  }

  return true;
}

function keyTyped() {
  if (!quizMode || activeQuizCard < 0) return true;

  if (key.length === 1) {
    quizInput += key;
    return false;
  }
  return true;
}

function checkQuizAnswer() {
  if (activeQuizCard < 0) return;

  let card = cards[activeQuizCard];

  // Normalize answer for comparison
  let answer = normalizeAnswer(quizInput);
  let correct = normalizeAnswer(card.data.antiderivative);

  // Allow variations
  let correctVariations = [
    correct,
    correct.replace(/\+ c/g, '+c'),
    correct.replace(/\+c/g, '+ c'),
    correct.replace(/\u00B2/g, '^2'),
    correct.replace(/\^2/g, '\u00B2')
  ];

  // Also accept without the + C
  let withoutC = correct.replace(/\s*\+\s*c/g, '');
  correctVariations.push(withoutC);

  quizScore.attempts++;

  let isCorrect = correctVariations.some(v => v === answer || v === answer.replace(/\s/g, ''));

  if (isCorrect) {
    quizScore.correct++;
    quizFeedback = 'correct';
    revealCard(activeQuizCard);
  } else {
    quizFeedback = 'incorrect';
  }

  feedbackTimer = 120; // 2 seconds
  let prevCard = activeQuizCard;
  activeQuizCard = -1;
  quizInput = '';

  // Keep reference for feedback display
  if (!isCorrect) {
    activeQuizCard = prevCard;
    setTimeout(() => { activeQuizCard = -1; }, 2000);
  }
}

function normalizeAnswer(str) {
  return str.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/\u00B2/g, '^2')
    .replace(/\*/g, '');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.min(Math.floor(container.width), 700);
}
