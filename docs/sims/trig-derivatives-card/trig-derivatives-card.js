// Trig Derivatives Flashcard MicroSim
// Learning Objective: Students will recall the derivatives of all six trigonometric functions
// Bloom Level: Remember (L1)
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Card data: [function, derivative, isPositive (for color coding)]
const trigDerivatives = [
  { func: 'sin(x)', deriv: 'cos(x)', positive: true },
  { func: 'cos(x)', deriv: '-sin(x)', positive: false },
  { func: 'tan(x)', deriv: 'sec²(x)', positive: true },
  { func: 'cot(x)', deriv: '-csc²(x)', positive: false },
  { func: 'sec(x)', deriv: 'sec(x)tan(x)', positive: true },
  { func: 'csc(x)', deriv: '-csc(x)cot(x)', positive: false }
];

// Card state
let cards = [];
let cardWidth = 160;
let cardHeight = 140;
let cardSpacing = 20;

// Quiz mode state
let quizMode = false;
let quizInput = '';
let activeQuizCard = -1;
let quizFeedback = '';
let feedbackTimer = 0;
let quizScore = { correct: 0, attempts: 0 };

// Animation state
let flipAnimations = [];

// Focus state (dropdown selection)
let focusIndex = -1; // -1 means show all
let dropdownOpen = false;
let dropdownX, dropdownY, dropdownW;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  initializeCards();

  describe('Interactive flashcard reference for memorizing derivatives of trigonometric functions. Click cards to flip and reveal derivatives.', LABEL);
}

function initializeCards() {
  cards = [];
  for (let i = 0; i < 6; i++) {
    cards.push({
      flipped: false,
      flipProgress: 0,
      data: trigDerivatives[i]
    });
  }
  flipAnimations = [];
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
  textSize(20);
  text('Trig Derivatives Flashcards', canvasWidth / 2, 8);

  // Subtitle
  textSize(14);
  fill(100);
  text('Click a card to reveal its derivative', canvasWidth / 2, 32);

  // Update animations
  updateFlipAnimations();

  // Draw cards
  drawCards();

  // Draw quiz feedback
  if (feedbackTimer > 0) {
    drawFeedback();
    feedbackTimer--;
  }

  // Draw controls
  drawControls();

  // Draw dropdown if open
  if (dropdownOpen) {
    drawDropdown();
  }

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
    // Skip cards not in focus
    if (focusIndex >= 0 && focusIndex !== i) continue;

    let row = Math.floor(i / 3);
    let col = i % 3;

    let x, y;
    if (focusIndex >= 0) {
      // Single focused card - center it
      x = canvasWidth / 2 - cardWidth / 2;
      y = drawHeight / 2 - cardHeight / 2;
    } else {
      x = startX + col * (cardWidth + cardSpacing);
      y = startY + row * (cardHeight + cardSpacing + 10);
    }

    drawCard(i, x, y);
  }
}

function drawCard(index, x, y) {
  let card = cards[index];
  let flipProgress = card.flipProgress;

  // Calculate scale for flip animation (1 -> 0 -> 1)
  let scaleX = Math.abs(Math.cos(flipProgress * PI));
  let showBack = flipProgress > 0.5;

  // Determine what to show based on flip state and quiz mode
  let showFront = !showBack;
  if (quizMode && !card.flipped) {
    showFront = true; // In quiz mode, always show function until answered
  }

  push();
  translate(x + cardWidth / 2, y + cardHeight / 2);
  scale(scaleX, 1);
  translate(-cardWidth / 2, -cardHeight / 2);

  // Card shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(3, 3, cardWidth, cardHeight, 10);

  // Card background
  let isPositive = card.data.positive;
  if (showFront) {
    fill(255);
    stroke(180);
  } else {
    // Derivative side - color coded
    if (isPositive) {
      fill(220, 240, 255); // Light blue for positive
      stroke(100, 150, 200);
    } else {
      fill(255, 230, 230); // Light red for negative
      stroke(200, 100, 100);
    }
  }
  strokeWeight(2);
  rect(0, 0, cardWidth, cardHeight, 10);

  // Card content
  noStroke();
  textAlign(CENTER, CENTER);

  if (showFront) {
    // Function side
    fill(60);
    textSize(14);
    text("d/dx", cardWidth / 2, 30);

    fill(0);
    textSize(22);
    text(card.data.func, cardWidth / 2, cardHeight / 2);

    // Click hint
    fill(150);
    textSize(10);
    text(quizMode ? 'Type answer' : 'Click to flip', cardWidth / 2, cardHeight - 20);
  } else {
    // Derivative side
    if (isPositive) {
      fill(30, 100, 180);
    } else {
      fill(180, 50, 50);
    }
    textSize(20);
    text(card.data.deriv, cardWidth / 2, cardHeight / 2);

    // Label
    fill(100);
    textSize(12);
    text('= derivative', cardWidth / 2, cardHeight - 25);
  }

  // Pair indicator (top corner)
  fill(200);
  textSize(10);
  textAlign(LEFT, TOP);
  let pairNum = Math.floor(index / 2) + 1;
  text('Pair ' + pairNum, 8, 8);

  pop();
}

function drawControls() {
  let btnWidth = 80;
  let btnHeight = 28;
  let btnY = drawHeight + 11;
  let spacing = 10;

  // Quiz Mode button
  let quizBtnX = 15;
  fill(quizMode ? '#f44336' : '#4CAF50');
  stroke(quizMode ? '#c62828' : '#388E3C');
  strokeWeight(1);
  rect(quizBtnX, btnY, btnWidth, btnHeight, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(quizMode ? 'Exit Quiz' : 'Quiz Mode', quizBtnX + btnWidth / 2, btnY + btnHeight / 2);

  // Show All button
  let showAllX = quizBtnX + btnWidth + spacing;
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(showAllX, btnY, 70, btnHeight, 5);
  fill(60);
  noStroke();
  text('Show All', showAllX + 35, btnY + btnHeight / 2);

  // Hide All button
  let hideAllX = showAllX + 70 + spacing;
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(hideAllX, btnY, 70, btnHeight, 5);
  fill(60);
  noStroke();
  text('Hide All', hideAllX + 35, btnY + btnHeight / 2);

  // Focus dropdown
  dropdownW = 120;
  dropdownX = canvasWidth - dropdownW - 15;
  dropdownY = btnY;

  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(dropdownX, dropdownY, dropdownW, btnHeight, 5);
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  let focusText = focusIndex < 0 ? 'All Functions' : trigDerivatives[focusIndex].func;
  text(focusText, dropdownX + 8, dropdownY + btnHeight / 2);

  // Dropdown arrow
  fill(100);
  textAlign(RIGHT, CENTER);
  text(dropdownOpen ? '\u25B2' : '\u25BC', dropdownX + dropdownW - 8, dropdownY + btnHeight / 2);

  // Quiz score (if in quiz mode)
  if (quizMode && quizScore.attempts > 0) {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(11);
    let scoreText = 'Score: ' + quizScore.correct + '/' + quizScore.attempts;
    text(scoreText, (hideAllX + dropdownX) / 2, btnY + btnHeight / 2);
  }
}

function drawDropdown() {
  let itemHeight = 26;
  let numItems = 7; // All + 6 functions
  let menuHeight = itemHeight * numItems;
  let menuY = dropdownY - menuHeight;

  // Menu background
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(dropdownX, menuY, dropdownW, menuHeight, 5);

  // Menu items
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);

  for (let i = 0; i < numItems; i++) {
    let itemY = menuY + i * itemHeight;

    // Highlight on hover
    if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
        mouseY >= itemY && mouseY < itemY + itemHeight) {
      fill(230, 240, 255);
      rect(dropdownX + 2, itemY + 2, dropdownW - 4, itemHeight - 4, 3);
    }

    fill(60);
    let itemText = i === 0 ? 'All Functions' : trigDerivatives[i - 1].func;
    text(itemText, dropdownX + 10, itemY + itemHeight / 2);
  }
}

function drawFeedback() {
  let isCorrect = quizFeedback === 'correct';

  fill(isCorrect ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)');
  noStroke();
  rect(canvasWidth / 2 - 100, drawHeight / 2 - 30, 200, 60, 10);

  fill('white');
  textAlign(CENTER, CENTER);
  textSize(18);
  text(isCorrect ? 'Correct!' : 'Try Again', canvasWidth / 2, drawHeight / 2 - 5);

  if (!isCorrect && activeQuizCard >= 0) {
    textSize(12);
    text('Answer: ' + cards[activeQuizCard].data.deriv, canvasWidth / 2, drawHeight / 2 + 18);
  }
}

function drawQuizInput() {
  // Input box at bottom of drawing area
  let inputX = canvasWidth / 2 - 150;
  let inputY = drawHeight - 50;
  let inputW = 300;
  let inputH = 35;

  fill(255);
  stroke(100, 150, 200);
  strokeWeight(2);
  rect(inputX, inputY, inputW, inputH, 5);

  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(16);
  text(quizInput + (frameCount % 60 < 30 ? '|' : ''), inputX + 10, inputY + inputH / 2);

  // Hint text
  if (quizInput === '') {
    fill(180);
    text('Type the derivative and press Enter', inputX + 10, inputY + inputH / 2);
  }

  // Submit hint
  fill(100);
  textSize(11);
  textAlign(CENTER, TOP);
  text('Press Enter to check answer, Escape to cancel', canvasWidth / 2, inputY + inputH + 5);
}

function updateFlipAnimations() {
  for (let i = flipAnimations.length - 1; i >= 0; i--) {
    let anim = flipAnimations[i];
    let card = cards[anim.cardIndex];

    card.flipProgress += anim.direction * 0.08;

    if (card.flipProgress >= 1) {
      card.flipProgress = 1;
      card.flipped = true;
      flipAnimations.splice(i, 1);
    } else if (card.flipProgress <= 0) {
      card.flipProgress = 0;
      card.flipped = false;
      flipAnimations.splice(i, 1);
    }
  }
}

function mousePressed() {
  // Check dropdown first
  if (dropdownOpen) {
    let itemHeight = 26;
    let numItems = 7;
    let menuHeight = itemHeight * numItems;
    let menuY = dropdownY - menuHeight;

    if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
        mouseY >= menuY && mouseY < dropdownY) {
      let itemIndex = Math.floor((mouseY - menuY) / itemHeight);
      focusIndex = itemIndex - 1; // -1 for "All", 0-5 for functions
      dropdownOpen = false;
      return;
    }
    dropdownOpen = false;
    return;
  }

  // Check controls
  let btnWidth = 80;
  let btnHeight = 28;
  let btnY = drawHeight + 11;
  let spacing = 10;

  // Quiz Mode button
  let quizBtnX = 15;
  if (mouseX >= quizBtnX && mouseX <= quizBtnX + btnWidth &&
      mouseY >= btnY && mouseY <= btnY + btnHeight) {
    toggleQuizMode();
    return;
  }

  // Show All button
  let showAllX = quizBtnX + btnWidth + spacing;
  if (mouseX >= showAllX && mouseX <= showAllX + 70 &&
      mouseY >= btnY && mouseY <= btnY + btnHeight) {
    showAllCards();
    return;
  }

  // Hide All button
  let hideAllX = showAllX + 70 + spacing;
  if (mouseX >= hideAllX && mouseX <= hideAllX + 70 &&
      mouseY >= btnY && mouseY <= btnY + btnHeight) {
    hideAllCards();
    return;
  }

  // Dropdown
  if (mouseX >= dropdownX && mouseX <= dropdownX + dropdownW &&
      mouseY >= dropdownY && mouseY <= dropdownY + btnHeight) {
    dropdownOpen = !dropdownOpen;
    return;
  }

  // Check cards
  if (mouseY < drawHeight) {
    let clickedCard = getCardAtPosition(mouseX, mouseY);
    if (clickedCard >= 0) {
      if (quizMode && !cards[clickedCard].flipped) {
        activeQuizCard = clickedCard;
        quizInput = '';
      } else if (!quizMode) {
        flipCard(clickedCard);
      }
    }
  }
}

function getCardAtPosition(mx, my) {
  let startY = 60;
  let totalWidth = 3 * cardWidth + 2 * cardSpacing;
  let startX = (canvasWidth - totalWidth) / 2;

  for (let i = 0; i < 6; i++) {
    if (focusIndex >= 0 && focusIndex !== i) continue;

    let row = Math.floor(i / 3);
    let col = i % 3;

    let x, y;
    if (focusIndex >= 0) {
      x = canvasWidth / 2 - cardWidth / 2;
      y = drawHeight / 2 - cardHeight / 2;
    } else {
      x = startX + col * (cardWidth + cardSpacing);
      y = startY + row * (cardHeight + cardSpacing + 10);
    }

    if (mx >= x && mx <= x + cardWidth && my >= y && my <= y + cardHeight) {
      return i;
    }
  }
  return -1;
}

function flipCard(index) {
  let card = cards[index];

  // Check if already animating
  for (let anim of flipAnimations) {
    if (anim.cardIndex === index) return;
  }

  flipAnimations.push({
    cardIndex: index,
    direction: card.flipped ? -1 : 1
  });
}

function toggleQuizMode() {
  quizMode = !quizMode;
  if (quizMode) {
    // Reset all cards and score
    hideAllCards();
    quizScore = { correct: 0, attempts: 0 };
    activeQuizCard = -1;
    quizInput = '';
  } else {
    activeQuizCard = -1;
    quizInput = '';
  }
}

function showAllCards() {
  if (quizMode) return;

  for (let i = 0; i < 6; i++) {
    if (!cards[i].flipped) {
      flipCard(i);
    }
  }
}

function hideAllCards() {
  for (let i = 0; i < 6; i++) {
    if (cards[i].flipped) {
      flipCard(i);
    }
  }
  activeQuizCard = -1;
  quizInput = '';
}

function keyPressed() {
  if (!quizMode || activeQuizCard < 0) return false;

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

  // Allow typing
  if (key.length === 1) {
    quizInput += key;
    return false;
  }
  return true;
}

function checkQuizAnswer() {
  if (activeQuizCard < 0) return;

  let card = cards[activeQuizCard];
  let answer = quizInput.toLowerCase().replace(/\s+/g, '');
  let correct = card.data.deriv.toLowerCase().replace(/\s+/g, '');

  // Allow some flexibility in answers
  let correctVariations = [
    correct,
    correct.replace(/²/g, '^2'),
    correct.replace(/\^2/g, '²')
  ];

  quizScore.attempts++;

  if (correctVariations.includes(answer)) {
    quizScore.correct++;
    quizFeedback = 'correct';
    flipCard(activeQuizCard);
  } else {
    quizFeedback = 'incorrect';
  }

  feedbackTimer = 90; // 1.5 seconds at 60fps
  activeQuizCard = -1;
  quizInput = '';
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}
