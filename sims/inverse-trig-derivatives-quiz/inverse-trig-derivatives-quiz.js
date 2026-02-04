// Inverse Trig Derivatives Quiz MicroSim
// Learning Objective: Students will apply the inverse trigonometric derivative formulas to compute derivatives (Bloom Level 3: Apply)
// Bloom Verbs: calculate, apply, solve
// MicroSim template version 2026.02

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;
let chartTop = 50;
let defaultTextSize = 16;

// Inverse trig data: function, derivative, graph function, domain info
const inverseTrigFunctions = [
  {
    name: 'arcsin(x)',
    displayName: 'arcsin(x)',
    derivative: '1/sqrt(1-x^2)',
    derivDisplay: '1/\u221A(1-x\u00B2)',
    f: (x) => Math.asin(x),
    fPrime: (x) => 1 / Math.sqrt(1 - x * x),
    domain: [-0.99, 0.99],
    range: [-Math.PI/2, Math.PI/2],
    hint: 'Think: 1 over square root of (1 minus x squared)'
  },
  {
    name: 'arccos(x)',
    displayName: 'arccos(x)',
    derivative: '-1/sqrt(1-x^2)',
    derivDisplay: '-1/\u221A(1-x\u00B2)',
    f: (x) => Math.acos(x),
    fPrime: (x) => -1 / Math.sqrt(1 - x * x),
    domain: [-0.99, 0.99],
    range: [0, Math.PI],
    hint: 'Same as arcsin but negative!'
  },
  {
    name: 'arctan(x)',
    displayName: 'arctan(x)',
    derivative: '1/(1+x^2)',
    derivDisplay: '1/(1+x\u00B2)',
    f: (x) => Math.atan(x),
    fPrime: (x) => 1 / (1 + x * x),
    domain: [-4, 4],
    range: [-Math.PI/2, Math.PI/2],
    hint: 'Think: 1 over (1 plus x squared)'
  },
  {
    name: 'arccot(x)',
    displayName: 'arccot(x)',
    derivative: '-1/(1+x^2)',
    derivDisplay: '-1/(1+x\u00B2)',
    f: (x) => Math.PI/2 - Math.atan(x),
    fPrime: (x) => -1 / (1 + x * x),
    domain: [-4, 4],
    range: [0, Math.PI],
    hint: 'Same as arctan but negative!'
  },
  {
    name: 'arcsec(x)',
    displayName: 'arcsec(x)',
    derivative: '1/(|x|sqrt(x^2-1))',
    derivDisplay: '1/(|x|\u221A(x\u00B2-1))',
    f: (x) => Math.acos(1/x),
    fPrime: (x) => 1 / (Math.abs(x) * Math.sqrt(x * x - 1)),
    domain: [-4, -1.01],
    domain2: [1.01, 4],
    range: [0, Math.PI],
    hint: 'Think: 1 over absolute x times sqrt(x squared minus 1)'
  },
  {
    name: 'arccsc(x)',
    displayName: 'arccsc(x)',
    derivative: '-1/(|x|sqrt(x^2-1))',
    derivDisplay: '-1/(|x|\u221A(x\u00B2-1))',
    f: (x) => Math.asin(1/x),
    fPrime: (x) => -1 / (Math.abs(x) * Math.sqrt(x * x - 1)),
    domain: [-4, -1.01],
    domain2: [1.01, 4],
    range: [-Math.PI/2, Math.PI/2],
    hint: 'Same as arcsec but negative!'
  }
];

// Card state
let cards = [];
let cardWidth = 200;
let cardHeight = 120;
let cardSpacing = 15;

// Selected card for graphing/evaluation
let selectedCard = 0;

// Quiz state
let userInput = '';
let isTyping = false;
let activeCard = -1;
let showHint = false;
let lastFeedback = '';
let feedbackTimer = 0;

// Mastery tracking: need 3 correct in a row to master
let masteryCount = []; // streak for each card
let mastered = []; // boolean for each card

// Evaluation slider
let evalX = 0.5;
let sliderX, sliderY, sliderW;
let isDraggingSlider = false;

// Graph region
let graphX, graphY, graphW, graphH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  initializeCards();
  updateLayoutPositions();

  describe('Inverse Trig Derivatives Quiz: Click cards to practice derivative formulas, track mastery with 3 correct in a row.', LABEL);
}

function initializeCards() {
  cards = [];
  masteryCount = [];
  mastered = [];

  for (let i = 0; i < 6; i++) {
    cards.push({
      flipped: false,
      flipProgress: 0,
      data: inverseTrigFunctions[i]
    });
    masteryCount.push(0);
    mastered.push(false);
  }
}

function updateLayoutPositions() {
  // Graph region - left side
  graphX = margin;
  graphY = chartTop;
  graphW = 240;
  graphH = 200;

  // Slider position
  sliderX = margin + 80;
  sliderY = drawHeight + 25;
  sliderW = Math.min(250, canvasWidth * 0.35);
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
  drawTitle();

  // Draw progress tracker
  drawProgressTracker();

  // Draw cards
  drawCards();

  // Draw graph of selected function
  drawGraph();

  // Draw derivative value panel
  drawDerivativePanel();

  // Draw feedback
  if (feedbackTimer > 0) {
    drawFeedback();
    feedbackTimer--;
  }

  // Draw controls
  drawControls();

  // Draw input area if active
  if (isTyping && activeCard >= 0) {
    drawInputArea();
  }
}

function drawTitle() {
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Inverse Trig Derivatives Quiz', canvasWidth / 2, 5);

  textSize(13);
  fill(80);
  text('Click a card to test yourself. 3 correct in a row = Mastered!', canvasWidth / 2, 28);
}

function drawProgressTracker() {
  let masteredCount = mastered.filter(m => m).length;

  fill(60);
  noStroke();
  textAlign(RIGHT, TOP);
  textSize(14);
  text('Progress: ' + masteredCount + '/6 mastered', canvasWidth - 15, 8);

  // Progress bar
  let barX = canvasWidth - 120;
  let barY = 28;
  let barW = 105;
  let barH = 12;

  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(barX, barY, barW, barH, 3);

  if (masteredCount > 0) {
    fill('#4CAF50');
    noStroke();
    rect(barX + 1, barY + 1, (barW - 2) * masteredCount / 6, barH - 2, 2);
  }
}

function drawCards() {
  let startY = chartTop;
  let startX = canvasWidth - 230;

  // Draw 6 cards in a 2x3 grid on the right side
  for (let i = 0; i < 6; i++) {
    let row = Math.floor(i / 2);
    let col = i % 2;

    let cw = 100;
    let ch = 70;
    let x = startX + col * (cw + 10);
    let y = startY + row * (ch + 8);

    drawCard(i, x, y, cw, ch);
  }
}

function drawCard(index, x, y, w, h) {
  let card = cards[index];
  let isMastered = mastered[index];
  let isSelected = selectedCard === index;
  let isActive = activeCard === index;

  // Card shadow
  fill(0, 0, 0, 20);
  noStroke();
  rect(x + 2, y + 2, w, h, 8);

  // Card background
  if (isMastered) {
    fill(200, 240, 200); // Green tint for mastered
    stroke(100, 180, 100);
  } else if (isSelected) {
    fill(230, 240, 255);
    stroke(100, 150, 200);
  } else if (isActive) {
    fill(255, 250, 220);
    stroke(200, 180, 100);
  } else {
    fill(255);
    stroke(180);
  }
  strokeWeight(isSelected ? 2 : 1);
  rect(x, y, w, h, 8);

  // Card content
  noStroke();
  textAlign(CENTER, CENTER);

  // Function name
  fill(60);
  textSize(11);
  text('d/dx', x + w/2, y + 15);

  fill(isMastered ? '#2E7D32' : '#333');
  textSize(13);
  text(card.data.displayName, x + w/2, y + 35);

  // Status indicator
  if (isMastered) {
    fill('#4CAF50');
    textSize(16);
    text('\u2713', x + w - 15, y + 12);
  } else {
    // Streak dots
    fill(200);
    textSize(10);
    let dots = '';
    for (let j = 0; j < 3; j++) {
      dots += masteryCount[index] > j ? '\u25CF' : '\u25CB';
    }
    text(dots, x + w/2, y + h - 12);
  }

  // Click hint
  if (!isMastered && !card.flipped) {
    fill(150);
    textSize(8);
    text('Click to quiz', x + w/2, y + h - 12);
  }

  // Show derivative if flipped
  if (card.flipped) {
    // Overlay with derivative
    fill(255, 255, 240, 250);
    stroke(100, 150, 100);
    strokeWeight(1);
    rect(x, y, w, h, 8);

    fill('#1565C0');
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text(card.data.derivDisplay, x + w/2, y + h/2);

    fill(100);
    textSize(9);
    text('(Click to hide)', x + w/2, y + h - 10);
  }
}

function drawGraph() {
  let func = inverseTrigFunctions[selectedCard];

  // Graph background
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(graphX, graphY, graphW, graphH, 5);

  // Graph title
  fill(60);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('y = ' + func.displayName, graphX + graphW/2, graphY + 5);

  // Set up coordinate system
  let centerX = graphX + graphW / 2;
  let centerY = graphY + graphH / 2 + 10;
  let scaleX = graphW / 10;
  let scaleY = graphH / (Math.PI + 0.5);

  // Draw grid
  stroke(230);
  strokeWeight(1);
  for (let i = -4; i <= 4; i++) {
    let gx = centerX + i * scaleX;
    if (gx > graphX + 5 && gx < graphX + graphW - 5) {
      line(gx, graphY + 20, gx, graphY + graphH - 10);
    }
  }

  // Draw axes
  stroke(150);
  strokeWeight(1);
  line(graphX + 10, centerY, graphX + graphW - 10, centerY); // x-axis
  line(centerX, graphY + 20, centerX, graphY + graphH - 10); // y-axis

  // Axis labels
  fill(100);
  noStroke();
  textSize(9);
  textAlign(CENTER, TOP);
  text('x', graphX + graphW - 15, centerY + 2);
  textAlign(RIGHT, CENTER);
  text('y', centerX - 5, graphY + 25);

  // Draw function curve
  stroke(50, 100, 200);
  strokeWeight(2);
  noFill();

  // Handle functions with split domains (arcsec, arccsc)
  if (func.domain2) {
    // First part of domain
    beginShape();
    for (let px = graphX + 10; px < graphX + graphW - 10; px += 2) {
      let x = (px - centerX) / scaleX;
      if (x >= func.domain[0] && x <= func.domain[1]) {
        let y = func.f(x);
        if (!isNaN(y) && isFinite(y)) {
          let py = centerY - y * scaleY;
          if (py > graphY + 15 && py < graphY + graphH - 5) {
            vertex(px, py);
          }
        }
      }
    }
    endShape();

    // Second part of domain
    beginShape();
    for (let px = graphX + 10; px < graphX + graphW - 10; px += 2) {
      let x = (px - centerX) / scaleX;
      if (x >= func.domain2[0] && x <= func.domain2[1]) {
        let y = func.f(x);
        if (!isNaN(y) && isFinite(y)) {
          let py = centerY - y * scaleY;
          if (py > graphY + 15 && py < graphY + graphH - 5) {
            vertex(px, py);
          }
        }
      }
    }
    endShape();
  } else {
    // Normal continuous domain
    beginShape();
    for (let px = graphX + 10; px < graphX + graphW - 10; px += 2) {
      let x = (px - centerX) / scaleX;
      if (x >= func.domain[0] && x <= func.domain[1]) {
        let y = func.f(x);
        if (!isNaN(y) && isFinite(y)) {
          let py = centerY - y * scaleY;
          if (py > graphY + 15 && py < graphY + graphH - 5) {
            vertex(px, py);
          }
        }
      }
    }
    endShape();
  }

  // Draw tangent line at evalX point
  let validX = isValidX(evalX, func);
  if (validX) {
    let fVal = func.f(evalX);
    let slope = func.fPrime(evalX);

    if (!isNaN(fVal) && isFinite(fVal) && !isNaN(slope) && isFinite(slope)) {
      let pointPx = centerX + evalX * scaleX;
      let pointPy = centerY - fVal * scaleY;

      // Draw tangent line
      stroke(220, 80, 80);
      strokeWeight(2);

      let dx = 50;
      let x1 = pointPx - dx;
      let y1 = pointPy + slope * (dx / scaleX) * scaleY;
      let x2 = pointPx + dx;
      let y2 = pointPy - slope * (dx / scaleX) * scaleY;

      // Clip to graph region
      x1 = constrain(x1, graphX + 5, graphX + graphW - 5);
      x2 = constrain(x2, graphX + 5, graphX + graphW - 5);
      y1 = constrain(y1, graphY + 15, graphY + graphH - 5);
      y2 = constrain(y2, graphY + 15, graphY + graphH - 5);

      line(x1, y1, x2, y2);

      // Draw point
      fill(200, 60, 60);
      noStroke();
      circle(pointPx, pointPy, 8);
    }
  }
}

function isValidX(x, func) {
  if (func.domain2) {
    return (x >= func.domain[0] && x <= func.domain[1]) ||
           (x >= func.domain2[0] && x <= func.domain2[1]);
  }
  return x >= func.domain[0] && x <= func.domain[1];
}

function drawDerivativePanel() {
  let func = inverseTrigFunctions[selectedCard];
  let panelX = graphX;
  let panelY = graphY + graphH + 15;
  let panelW = graphW;
  let panelH = 85;

  // Panel background
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 5);

  fill(60);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Derivative at x = ' + evalX.toFixed(2) + ':', panelX + 10, panelY + 8);

  // Calculate derivative value
  let validX = isValidX(evalX, func);

  if (validX) {
    let derivVal = func.fPrime(evalX);

    if (!isNaN(derivVal) && isFinite(derivVal)) {
      textSize(12);
      fill('#1565C0');
      text("d/dx[" + func.displayName + "] = " + func.derivDisplay, panelX + 10, panelY + 28);

      fill(60);
      textSize(11);
      text("At x = " + evalX.toFixed(2) + ":", panelX + 10, panelY + 48);

      fill('#C62828');
      textSize(14);
      text("= " + derivVal.toFixed(4), panelX + 10, panelY + 65);
    }
  } else {
    fill('#C62828');
    textSize(11);
    text("x = " + evalX.toFixed(2) + " is outside the domain", panelX + 10, panelY + 35);

    fill(100);
    textSize(10);
    if (func.domain2) {
      text("Domain: x \u2264 " + func.domain[1].toFixed(1) + " or x \u2265 " + func.domain2[0].toFixed(1), panelX + 10, panelY + 55);
    } else {
      text("Domain: " + func.domain[0].toFixed(1) + " < x < " + func.domain[1].toFixed(1), panelX + 10, panelY + 55);
    }
  }
}

function drawFeedback() {
  let isCorrect = lastFeedback === 'correct';

  // Feedback overlay
  fill(isCorrect ? 'rgba(76, 175, 80, 0.95)' : 'rgba(244, 67, 54, 0.95)');
  noStroke();
  let fbX = canvasWidth / 2 - 120;
  let fbY = drawHeight / 2 - 40;
  rect(fbX, fbY, 240, 80, 10);

  fill('white');
  textAlign(CENTER, CENTER);
  textSize(20);
  text(isCorrect ? 'Correct!' : 'Not quite...', canvasWidth / 2, fbY + 25);

  if (!isCorrect && activeCard >= 0) {
    textSize(12);
    text('Answer: ' + inverseTrigFunctions[activeCard].derivDisplay, canvasWidth / 2, fbY + 50);
  }

  if (isCorrect && mastered[activeCard]) {
    textSize(12);
    text('Card Mastered!', canvasWidth / 2, fbY + 55);
  }
}

function drawInputArea() {
  let card = cards[activeCard];

  // Input area background
  let inputX = graphX;
  let inputY = graphY + graphH + 110;
  let inputW = graphW;
  let inputH = 100;

  fill(255, 255, 240);
  stroke(200, 180, 100);
  strokeWeight(2);
  rect(inputX, inputY, inputW, inputH, 8);

  // Prompt
  fill(60);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('What is d/dx[' + card.data.displayName + ']?', inputX + inputW/2, inputY + 8);

  // Input field
  fill(255);
  stroke(150);
  strokeWeight(1);
  rect(inputX + 15, inputY + 30, inputW - 30, 28, 4);

  // User input text
  fill(0);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  let cursor = frameCount % 60 < 30 ? '|' : '';
  text(userInput + cursor, inputX + 22, inputY + 44);

  // Hint
  if (showHint) {
    fill('#FF8F00');
    textSize(10);
    textAlign(CENTER, TOP);
    text('Hint: ' + card.data.hint, inputX + inputW/2, inputY + 62);
  }

  // Buttons
  let btnY = inputY + inputH - 28;

  // Check button
  fill('#4CAF50');
  stroke('#388E3C');
  strokeWeight(1);
  rect(inputX + 15, btnY, 65, 22, 4);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Check', inputX + 47, btnY + 11);

  // Hint button
  fill(showHint ? '#FFB74D' : '#FF9800');
  stroke('#F57C00');
  strokeWeight(1);
  rect(inputX + 88, btnY, 55, 22, 4);
  fill('white');
  noStroke();
  text('Hint', inputX + 115, btnY + 11);

  // Cancel button
  fill('#9E9E9E');
  stroke('#757575');
  strokeWeight(1);
  rect(inputX + inputW - 75, btnY, 60, 22, 4);
  fill('white');
  noStroke();
  text('Cancel', inputX + inputW - 45, btnY + 11);
}

function drawControls() {
  // x-value slider label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('x = ' + evalX.toFixed(2), margin, sliderY);

  // Slider track
  let sliderHandleX = map(evalX, -4, 4, sliderX, sliderX + sliderW);
  fill(220);
  stroke(180);
  strokeWeight(1);
  rect(sliderX, sliderY - 4, sliderW, 8, 4);

  // Slider handle
  fill(isDraggingSlider ? '#0066cc' : '#0088ff');
  noStroke();
  circle(sliderHandleX, sliderY, 16);

  // Slider range label
  fill(100);
  textSize(10);
  textAlign(LEFT, CENTER);
  text('-4', sliderX, sliderY + 18);
  textAlign(RIGHT, CENTER);
  text('4', sliderX + sliderW, sliderY + 18);

  // Reset button
  let resetX = sliderX + sliderW + 30;
  let btnY = drawHeight + 15;

  fill('#f44336');
  stroke('#c62828');
  strokeWeight(1);
  rect(resetX, btnY, 80, 28, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Reset All', resetX + 40, btnY + 14);

  // Show All Answers button
  let showAllX = resetX + 95;
  fill('#2196F3');
  stroke('#1976D2');
  strokeWeight(1);
  rect(showAllX, btnY, 100, 28, 5);
  fill('white');
  noStroke();
  text('Show Answers', showAllX + 50, btnY + 14);

  // Instructions
  fill(100);
  textSize(10);
  textAlign(LEFT, TOP);
  text('Drag slider to evaluate derivative at different x values', margin, drawHeight + 50);
}

function mousePressed() {
  // Check slider
  let sliderHandleX = map(evalX, -4, 4, sliderX, sliderX + sliderW);
  if (dist(mouseX, mouseY, sliderHandleX, sliderY) < 15) {
    isDraggingSlider = true;
    return;
  }

  // Check slider track click
  if (mouseY >= sliderY - 10 && mouseY <= sliderY + 10 &&
      mouseX >= sliderX && mouseX <= sliderX + sliderW) {
    isDraggingSlider = true;
    evalX = map(mouseX, sliderX, sliderX + sliderW, -4, 4);
    evalX = constrain(evalX, -4, 4);
    evalX = Math.round(evalX * 20) / 20;
    return;
  }

  // Check input area buttons
  if (isTyping && activeCard >= 0) {
    let inputX = graphX;
    let inputY = graphY + graphH + 110;
    let inputW = graphW;
    let inputH = 100;
    let btnY = inputY + inputH - 28;

    // Check button
    if (mouseX >= inputX + 15 && mouseX <= inputX + 80 &&
        mouseY >= btnY && mouseY <= btnY + 22) {
      checkAnswer();
      return;
    }

    // Hint button
    if (mouseX >= inputX + 88 && mouseX <= inputX + 143 &&
        mouseY >= btnY && mouseY <= btnY + 22) {
      showHint = true;
      return;
    }

    // Cancel button
    if (mouseX >= inputX + inputW - 75 && mouseX <= inputX + inputW - 15 &&
        mouseY >= btnY && mouseY <= btnY + 22) {
      cancelInput();
      return;
    }
  }

  // Check control buttons
  let resetX = sliderX + sliderW + 30;
  let btnY = drawHeight + 15;

  // Reset button
  if (mouseX >= resetX && mouseX <= resetX + 80 &&
      mouseY >= btnY && mouseY <= btnY + 28) {
    resetProgress();
    return;
  }

  // Show All Answers button
  let showAllX = resetX + 95;
  if (mouseX >= showAllX && mouseX <= showAllX + 100 &&
      mouseY >= btnY && mouseY <= btnY + 28) {
    showAllAnswers();
    return;
  }

  // Check card clicks
  if (mouseY < drawHeight && mouseX > canvasWidth - 250) {
    let startY = chartTop;
    let startX = canvasWidth - 230;

    for (let i = 0; i < 6; i++) {
      let row = Math.floor(i / 2);
      let col = i % 2;

      let cw = 100;
      let ch = 70;
      let x = startX + col * (cw + 10);
      let y = startY + row * (ch + 8);

      if (mouseX >= x && mouseX <= x + cw && mouseY >= y && mouseY <= y + ch) {
        handleCardClick(i);
        return;
      }
    }
  }
}

function handleCardClick(index) {
  selectedCard = index;

  if (cards[index].flipped) {
    // Hide the answer
    cards[index].flipped = false;
  } else if (!mastered[index]) {
    // Start quiz for this card
    activeCard = index;
    isTyping = true;
    userInput = '';
    showHint = false;
  }
}

function checkAnswer() {
  if (activeCard < 0) return;

  let card = cards[activeCard];
  let answer = userInput.toLowerCase().replace(/\s+/g, '');

  // Normalize the correct answer for comparison
  let correct = card.data.derivative.toLowerCase().replace(/\s+/g, '');

  // Allow various acceptable formats
  let acceptableAnswers = [
    correct,
    correct.replace(/sqrt/g, '\u221A'),
    correct.replace(/\^2/g, '\u00B2'),
    correct.replace(/abs\(x\)/g, '|x|'),
    card.data.derivDisplay.toLowerCase().replace(/\s+/g, '')
  ];

  // Additional variations
  if (correct.includes('sqrt(1-x^2)')) {
    acceptableAnswers.push('1/sqrt(1-x^2)');
    acceptableAnswers.push('1/(sqrt(1-x^2))');
    acceptableAnswers.push('1/\u221A(1-x\u00B2)');
  }
  if (correct.includes('1+x^2')) {
    acceptableAnswers.push('1/(1+x^2)');
    acceptableAnswers.push('1/(1+x\u00B2)');
  }

  let isCorrect = acceptableAnswers.some(a => answer === a.toLowerCase().replace(/\s+/g, ''));

  if (isCorrect) {
    masteryCount[activeCard]++;
    if (masteryCount[activeCard] >= 3) {
      mastered[activeCard] = true;
    }
    lastFeedback = 'correct';
    cards[activeCard].flipped = true;
  } else {
    masteryCount[activeCard] = 0; // Reset streak on wrong answer
    lastFeedback = 'incorrect';
    cards[activeCard].flipped = true; // Show correct answer
  }

  feedbackTimer = 120;
  isTyping = false;
  userInput = '';
  showHint = false;
}

function cancelInput() {
  isTyping = false;
  activeCard = -1;
  userInput = '';
  showHint = false;
}

function resetProgress() {
  for (let i = 0; i < 6; i++) {
    masteryCount[i] = 0;
    mastered[i] = false;
    cards[i].flipped = false;
  }
  activeCard = -1;
  isTyping = false;
  userInput = '';
}

function showAllAnswers() {
  for (let i = 0; i < 6; i++) {
    cards[i].flipped = true;
  }
}

function mouseDragged() {
  if (isDraggingSlider) {
    evalX = map(mouseX, sliderX, sliderX + sliderW, -4, 4);
    evalX = constrain(evalX, -4, 4);
    evalX = Math.round(evalX * 20) / 20;
  }
}

function mouseReleased() {
  isDraggingSlider = false;
}

function keyPressed() {
  if (!isTyping || activeCard < 0) return true;

  if (keyCode === ENTER || keyCode === RETURN) {
    checkAnswer();
    return false;
  }

  if (keyCode === ESCAPE) {
    cancelInput();
    return false;
  }

  if (keyCode === BACKSPACE) {
    userInput = userInput.slice(0, -1);
    return false;
  }

  return true;
}

function keyTyped() {
  if (!isTyping || activeCard < 0) return true;

  // Allow typing
  if (key.length === 1 && userInput.length < 30) {
    userInput += key;
    return false;
  }
  return true;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  updateLayoutPositions();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
  updateLayoutPositions();
}
