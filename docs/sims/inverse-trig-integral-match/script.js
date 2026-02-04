// Inverse Trig Integral Match MicroSim
// Learning Objective: Students will match integrands to their corresponding
// inverse trig antiderivatives (Bloom Level 4: Analyze)
// Bloom Verbs: differentiate, distinguish, classify
// MicroSim template version 2026.02
// schema: https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 800;
let drawHeight = 520;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Layout constants
let margin = 15;
let chartTop = 55;
let defaultTextSize = 14;

// Category definitions
const categories = [
  {
    name: 'Arcsin Type',
    shortName: 'arcsin',
    color: '#E3F2FD',
    borderColor: '#2196F3',
    textColor: '#1565C0',
    formula: '\u222B 1/\u221A(a\u00B2-u\u00B2) du = arcsin(u/a) + C',
    hint: 'Look for: 1 over square root of (constant minus variable squared)'
  },
  {
    name: 'Arctan Type',
    shortName: 'arctan',
    color: '#E8F5E9',
    borderColor: '#4CAF50',
    textColor: '#2E7D32',
    formula: '\u222B 1/(a\u00B2+u\u00B2) du = (1/a)arctan(u/a) + C',
    hint: 'Look for: 1 over (constant plus variable squared)'
  },
  {
    name: 'Arcsec Type',
    shortName: 'arcsec',
    color: '#FFF3E0',
    borderColor: '#FF9800',
    textColor: '#E65100',
    formula: '\u222B 1/(u\u221A(u\u00B2-a\u00B2)) du = (1/a)arcsec(|u|/a) + C',
    hint: 'Look for: variable times square root of (variable squared minus constant)'
  }
];

// Integrand problems - each has display form, category index, and explanation
const integrands = [
  {
    display: '1/\u221A(1-x\u00B2)',
    latex: '1/sqrt(1-x^2)',
    category: 0,
    explanation: 'Form: 1/\u221A(a\u00B2-u\u00B2) with a=1, u=x',
    difficulty: 1
  },
  {
    display: '1/(1+x\u00B2)',
    latex: '1/(1+x^2)',
    category: 1,
    explanation: 'Form: 1/(a\u00B2+u\u00B2) with a=1, u=x',
    difficulty: 1
  },
  {
    display: '1/(x\u221A(x\u00B2-1))',
    latex: '1/(x*sqrt(x^2-1))',
    category: 2,
    explanation: 'Form: 1/(u\u221A(u\u00B2-a\u00B2)) with a=1, u=x',
    difficulty: 1
  },
  {
    display: '1/\u221A(1-4x\u00B2)',
    latex: '1/sqrt(1-4x^2)',
    category: 0,
    explanation: 'Form: 1/\u221A(1-(2x)\u00B2) with a=1, u=2x',
    difficulty: 2
  },
  {
    display: '1/(4+x\u00B2)',
    latex: '1/(4+x^2)',
    category: 1,
    explanation: 'Form: 1/(a\u00B2+u\u00B2) with a=2, u=x',
    difficulty: 2
  },
  {
    display: '1/(x\u221A(x\u00B2-4))',
    latex: '1/(x*sqrt(x^2-4))',
    category: 2,
    explanation: 'Form: 1/(u\u221A(u\u00B2-a\u00B2)) with a=2, u=x',
    difficulty: 2
  },
  {
    display: '1/\u221A(9-x\u00B2)',
    latex: '1/sqrt(9-x^2)',
    category: 0,
    explanation: 'Form: 1/\u221A(a\u00B2-u\u00B2) with a=3, u=x',
    difficulty: 2
  },
  {
    display: '1/(9+x\u00B2)',
    latex: '1/(9+x^2)',
    category: 1,
    explanation: 'Form: 1/(a\u00B2+u\u00B2) with a=3, u=x',
    difficulty: 2
  },
  {
    display: '1/(x\u221A(x\u00B2-9))',
    latex: '1/(x*sqrt(x^2-9))',
    category: 2,
    explanation: 'Form: 1/(u\u221A(u\u00B2-a\u00B2)) with a=3, u=x',
    difficulty: 2
  },
  {
    display: '2/\u221A(1-x\u00B2)',
    latex: '2/sqrt(1-x^2)',
    category: 0,
    explanation: 'Factor out 2: 2 \u00D7 arcsin(x) form',
    difficulty: 3
  },
  {
    display: '3/(1+x\u00B2)',
    latex: '3/(1+x^2)',
    category: 1,
    explanation: 'Factor out 3: 3 \u00D7 arctan(x) form',
    difficulty: 3
  },
  {
    display: '1/\u221A(4-9x\u00B2)',
    latex: '1/sqrt(4-9x^2)',
    category: 0,
    explanation: 'Form: 1/\u221A(4-(3x)\u00B2) = 1/\u221A(a\u00B2-u\u00B2)',
    difficulty: 3
  }
];

// Game state
let currentProblem = null;
let selectedCategory = -1;
let score = 0;
let totalAttempts = 0;
let streak = 0;
let bestStreak = 0;
let showHint = false;
let showExplanation = false;
let lastResult = null; // 'correct', 'incorrect', or null
let resultTimer = 0;
let problemHistory = [];
let difficulty = 1;
let quizMode = false;
let availableProblems = [];

// UI element positions (calculated in updateLayout)
let categoryBoxes = [];
let problemBox = { x: 0, y: 0, w: 0, h: 0 };
let checkBtnBox = { x: 0, y: 0, w: 0, h: 0 };
let hintBtnBox = { x: 0, y: 0, w: 0, h: 0 };
let nextBtnBox = { x: 0, y: 0, w: 0, h: 0 };
let difficultyBtns = [];
let resetBtnBox = { x: 0, y: 0, w: 0, h: 0 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  updateLayout();
  resetAvailableProblems();
  nextProblem();

  describe('Inverse Trig Integral Match: Match integrands to their inverse trig antiderivative types by clicking categories.', LABEL);
}

function updateLayout() {
  // Category boxes - three columns across the top
  let colWidth = (canvasWidth - 4 * margin) / 3;
  let catHeight = 130;
  let catY = chartTop + 5;

  categoryBoxes = [];
  for (let i = 0; i < 3; i++) {
    categoryBoxes.push({
      x: margin + i * (colWidth + margin),
      y: catY,
      w: colWidth,
      h: catHeight
    });
  }

  // Problem display box - centered below categories
  let problemY = catY + catHeight + 20;
  let problemW = Math.min(400, canvasWidth - 2 * margin);
  problemBox = {
    x: (canvasWidth - problemW) / 2,
    y: problemY,
    w: problemW,
    h: 100
  };

  // Buttons row below problem
  let btnRowY = problemBox.y + problemBox.h + 15;
  let btnW = 80;
  let btnH = 32;
  let btnSpacing = 15;
  let totalBtnWidth = 3 * btnW + 2 * btnSpacing;
  let btnStartX = (canvasWidth - totalBtnWidth) / 2;

  checkBtnBox = { x: btnStartX, y: btnRowY, w: btnW, h: btnH };
  hintBtnBox = { x: btnStartX + btnW + btnSpacing, y: btnRowY, w: btnW, h: btnH };
  nextBtnBox = { x: btnStartX + 2 * (btnW + btnSpacing), y: btnRowY, w: btnW, h: btnH };

  // Score and info area
  let infoY = btnRowY + btnH + 20;

  // Difficulty buttons in control area
  let diffBtnW = 60;
  let diffBtnH = 26;
  let diffStartX = margin + 80;
  difficultyBtns = [];
  for (let i = 1; i <= 3; i++) {
    difficultyBtns.push({
      x: diffStartX + (i - 1) * (diffBtnW + 8),
      y: drawHeight + 25,
      w: diffBtnW,
      h: diffBtnH,
      level: i
    });
  }

  // Reset button
  resetBtnBox = {
    x: canvasWidth - margin - 90,
    y: drawHeight + 25,
    w: 80,
    h: 28
  };
}

function resetAvailableProblems() {
  availableProblems = integrands
    .map((p, i) => ({ ...p, index: i }))
    .filter(p => p.difficulty <= difficulty);
  shuffleArray(availableProblems);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function nextProblem() {
  if (availableProblems.length === 0) {
    resetAvailableProblems();
  }

  currentProblem = availableProblems.pop();
  selectedCategory = -1;
  showHint = false;
  showExplanation = false;
  lastResult = null;
}

function draw() {
  updateCanvasSize();
  updateLayout();

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
  drawTitle();

  // Category columns
  drawCategories();

  // Problem display
  drawProblem();

  // Buttons
  drawButtons();

  // Score display
  drawScoreArea();

  // Result feedback overlay
  if (resultTimer > 0) {
    drawResultFeedback();
    resultTimer--;
  }

  // Controls
  drawControls();
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Inverse Trig Integral Pattern Matcher', canvasWidth / 2, 5);

  textSize(13);
  fill(80);
  text('Match each integrand to its inverse trig antiderivative type', canvasWidth / 2, 28);
}

function drawCategories() {
  for (let i = 0; i < 3; i++) {
    let cat = categories[i];
    let box = categoryBoxes[i];
    let isSelected = selectedCategory === i;
    let isCorrect = lastResult === 'correct' && currentProblem && currentProblem.category === i;
    let isWrong = lastResult === 'incorrect' && selectedCategory === i;

    // Box shadow
    fill(0, 0, 0, 15);
    noStroke();
    rect(box.x + 3, box.y + 3, box.w, box.h, 10);

    // Box background
    if (isCorrect) {
      fill('#C8E6C9');
      stroke('#4CAF50');
    } else if (isWrong) {
      fill('#FFCDD2');
      stroke('#F44336');
    } else if (isSelected) {
      fill(cat.color);
      stroke(cat.borderColor);
    } else {
      fill(255);
      stroke('#ccc');
    }
    strokeWeight(isSelected ? 3 : 1);
    rect(box.x, box.y, box.w, box.h, 10);

    // Category name
    fill(cat.textColor);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(15);
    textStyle(BOLD);
    text(cat.name, box.x + box.w / 2, box.y + 10);
    textStyle(NORMAL);

    // Formula
    textSize(11);
    fill(60);
    let formulaLines = wrapText(cat.formula, box.w - 20, 11);
    let lineY = box.y + 35;
    for (let line of formulaLines) {
      text(line, box.x + box.w / 2, lineY);
      lineY += 14;
    }

    // Hint (if showing)
    if (showHint) {
      textSize(10);
      fill(cat.textColor);
      textAlign(CENTER, BOTTOM);
      text(cat.hint, box.x + box.w / 2, box.y + box.h - 8);
    }

    // Click indicator
    if (!lastResult) {
      fill(isSelected ? cat.borderColor : '#999');
      textSize(9);
      textAlign(CENTER, BOTTOM);
      text(isSelected ? 'Selected' : 'Click to select', box.x + box.w / 2, box.y + box.h - 5);
    }
  }
}

function drawProblem() {
  if (!currentProblem) return;

  let box = problemBox;

  // Problem box shadow
  fill(0, 0, 0, 20);
  noStroke();
  rect(box.x + 3, box.y + 3, box.w, box.h, 10);

  // Problem box background
  fill(255);
  stroke('#9C27B0');
  strokeWeight(2);
  rect(box.x, box.y, box.w, box.h, 10);

  // Integral symbol and integrand
  fill('#6A1B9A');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Classify this integral:', box.x + box.w / 2, box.y + 12);

  // Large integrand display
  textSize(28);
  textStyle(BOLD);
  fill('#333');
  text('\u222B ' + currentProblem.display + ' dx', box.x + box.w / 2, box.y + 38);
  textStyle(NORMAL);

  // Difficulty indicator
  textSize(10);
  fill(100);
  textAlign(RIGHT, BOTTOM);
  let stars = '';
  for (let i = 0; i < currentProblem.difficulty; i++) stars += '\u2605';
  for (let i = currentProblem.difficulty; i < 3; i++) stars += '\u2606';
  text('Difficulty: ' + stars, box.x + box.w - 10, box.y + box.h - 5);

  // Show explanation after answer
  if (showExplanation && lastResult) {
    fill(lastResult === 'correct' ? '#2E7D32' : '#C62828');
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text(currentProblem.explanation, box.x + box.w / 2, box.y + box.h - 5);
  }
}

function drawButtons() {
  // Check button
  let isCheckEnabled = selectedCategory >= 0 && !lastResult;
  drawButton(checkBtnBox, 'Check', isCheckEnabled ? '#4CAF50' : '#BDBDBD',
             isCheckEnabled ? '#388E3C' : '#9E9E9E', !isCheckEnabled);

  // Hint button
  drawButton(hintBtnBox, showHint ? 'Hint On' : 'Hint',
             showHint ? '#FFB74D' : '#FF9800',
             showHint ? '#F57C00' : '#EF6C00', false);

  // Next button
  let isNextEnabled = lastResult !== null;
  drawButton(nextBtnBox, 'Next', isNextEnabled ? '#2196F3' : '#BDBDBD',
             isNextEnabled ? '#1976D2' : '#9E9E9E', !isNextEnabled);
}

function drawButton(box, label, bgColor, borderColor, disabled) {
  fill(bgColor);
  stroke(borderColor);
  strokeWeight(1);
  rect(box.x, box.y, box.w, box.h, 5);

  fill(disabled ? '#666' : 'white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text(label, box.x + box.w / 2, box.y + box.h / 2);
}

function drawScoreArea() {
  let infoY = problemBox.y + problemBox.h + 60;

  // Score box
  fill(255);
  stroke('#ddd');
  strokeWeight(1);
  let scoreBoxW = 280;
  let scoreBoxX = (canvasWidth - scoreBoxW) / 2;
  rect(scoreBoxX, infoY, scoreBoxW, 50, 8);

  // Score text
  fill(60);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);

  let accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;
  text('Score: ' + score + '/' + totalAttempts + ' (' + accuracy + '%)', canvasWidth / 2, infoY + 8);

  textSize(12);
  fill(80);
  text('Current streak: ' + streak + '  |  Best streak: ' + bestStreak, canvasWidth / 2, infoY + 30);
}

function drawResultFeedback() {
  let isCorrect = lastResult === 'correct';

  // Semi-transparent overlay at top
  fill(isCorrect ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)');
  noStroke();
  let fbW = 200;
  let fbH = 50;
  let fbX = (canvasWidth - fbW) / 2;
  let fbY = chartTop - 5;
  rect(fbX, fbY, fbW, fbH, 8);

  fill('white');
  textAlign(CENTER, CENTER);
  textSize(20);
  textStyle(BOLD);
  text(isCorrect ? 'Correct!' : 'Incorrect', canvasWidth / 2, fbY + fbH / 2);
  textStyle(NORMAL);
}

function drawControls() {
  // Difficulty label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Difficulty:', margin, drawHeight + 38);

  // Difficulty buttons
  for (let btn of difficultyBtns) {
    let isSelected = difficulty === btn.level;
    fill(isSelected ? '#9C27B0' : '#e0e0e0');
    stroke(isSelected ? '#7B1FA2' : '#999');
    strokeWeight(isSelected ? 2 : 1);
    rect(btn.x, btn.y, btn.w, btn.h, 5);

    fill(isSelected ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    let label = btn.level === 1 ? 'Easy' : btn.level === 2 ? 'Medium' : 'Hard';
    text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
  }

  // Reset button
  fill('#f44336');
  stroke('#c62828');
  strokeWeight(1);
  rect(resetBtnBox.x, resetBtnBox.y, resetBtnBox.w, resetBtnBox.h, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Reset', resetBtnBox.x + resetBtnBox.w / 2, resetBtnBox.y + resetBtnBox.h / 2);

  // Instructions
  fill(100);
  textSize(10);
  textAlign(LEFT, TOP);
  text('Click a category, then Check. Higher difficulty = more variations.', margin, drawHeight + 58);
}

function wrapText(txt, maxWidth, fontSize) {
  textSize(fontSize);
  let words = txt.split(' ');
  let lines = [];
  let currentLine = '';

  for (let word of words) {
    let testLine = currentLine + (currentLine ? ' ' : '') + word;
    if (textWidth(testLine) > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function mousePressed() {
  // Check category clicks
  if (!lastResult) {
    for (let i = 0; i < categoryBoxes.length; i++) {
      let box = categoryBoxes[i];
      if (mouseX >= box.x && mouseX <= box.x + box.w &&
          mouseY >= box.y && mouseY <= box.y + box.h) {
        selectedCategory = i;
        return;
      }
    }
  }

  // Check button
  if (pointInBox(mouseX, mouseY, checkBtnBox) && selectedCategory >= 0 && !lastResult) {
    checkAnswer();
    return;
  }

  // Hint button
  if (pointInBox(mouseX, mouseY, hintBtnBox)) {
    showHint = !showHint;
    return;
  }

  // Next button
  if (pointInBox(mouseX, mouseY, nextBtnBox) && lastResult !== null) {
    nextProblem();
    return;
  }

  // Difficulty buttons
  for (let btn of difficultyBtns) {
    if (pointInBox(mouseX, mouseY, btn)) {
      if (difficulty !== btn.level) {
        difficulty = btn.level;
        resetAvailableProblems();
        nextProblem();
        score = 0;
        totalAttempts = 0;
        streak = 0;
      }
      return;
    }
  }

  // Reset button
  if (pointInBox(mouseX, mouseY, resetBtnBox)) {
    resetGame();
    return;
  }
}

function pointInBox(px, py, box) {
  return px >= box.x && px <= box.x + box.w && py >= box.y && py <= box.y + box.h;
}

function checkAnswer() {
  if (!currentProblem || selectedCategory < 0) return;

  totalAttempts++;

  if (selectedCategory === currentProblem.category) {
    lastResult = 'correct';
    score++;
    streak++;
    if (streak > bestStreak) bestStreak = streak;
  } else {
    lastResult = 'incorrect';
    streak = 0;
  }

  showExplanation = true;
  resultTimer = 90;

  problemHistory.push({
    problem: currentProblem,
    selected: selectedCategory,
    correct: lastResult === 'correct'
  });
}

function resetGame() {
  score = 0;
  totalAttempts = 0;
  streak = 0;
  problemHistory = [];
  resetAvailableProblems();
  nextProblem();
}

function keyPressed() {
  // Number keys 1-3 to select category
  if (key === '1' && !lastResult) selectedCategory = 0;
  if (key === '2' && !lastResult) selectedCategory = 1;
  if (key === '3' && !lastResult) selectedCategory = 2;

  // Enter to check or advance
  if (keyCode === ENTER || keyCode === RETURN) {
    if (lastResult !== null) {
      nextProblem();
    } else if (selectedCategory >= 0) {
      checkAnswer();
    }
  }

  // H for hint
  if (key === 'h' || key === 'H') {
    showHint = !showHint;
  }

  // R for reset
  if (key === 'r' || key === 'R') {
    resetGame();
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayout();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.min(Math.floor(container.width), 900);
}
