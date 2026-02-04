// Differentiation Rule Selector - Interactive Decision Tree
// Helps students select the most efficient differentiation technique
// Students evaluate function structure through guided questions
// MicroSim template version 2026.02

// Canvas dimensions - responsive width
let containerWidth;
let canvasWidth = 800;
let drawHeight = 480;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let defaultTextSize = 16;

// Decision tree nodes
let nodes = [];
let currentNode = 0;
let path = []; // Track user's path through tree

// Node types: 'question', 'rule'
// Tree structure
const treeData = [
  // Node 0: Start
  {
    id: 0,
    type: 'question',
    text: 'Is it a single term\n(no + or -)?',
    yesNode: 1,
    noNode: 2,
    example: 'Single: 3x^4, sin(x)\nMultiple: x^2 + 3x',
    x: 0.5,
    y: 0.12
  },
  // Node 1: Power rule check
  {
    id: 1,
    type: 'question',
    text: 'Is it cx^n form?\n(constant times x to a power)',
    yesNode: 3,
    noNode: 4,
    example: 'Yes: 5x^3, -2x^{-1}\nNo: sin(x), e^x',
    x: 0.25,
    y: 0.32
  },
  // Node 2: Sum/difference check
  {
    id: 2,
    type: 'question',
    text: 'Is it a sum or\ndifference of terms?',
    yesNode: 5,
    noNode: 6,
    example: 'Yes: x^2 + 3x - 1\nNo: x^2 * sin(x)',
    x: 0.75,
    y: 0.32
  },
  // Node 3: Power + Constant Multiple Rule (TERMINAL)
  {
    id: 3,
    type: 'rule',
    text: 'Power Rule +\nConstant Multiple',
    formula: 'd/dx[cx^n] = cnx^{n-1}',
    example: 'd/dx[5x^3] = 15x^2',
    color: [0, 150, 80],
    x: 0.12,
    y: 0.55
  },
  // Node 4: Check for composition
  {
    id: 4,
    type: 'question',
    text: 'Is it a composition\nf(g(x))?',
    yesNode: 7,
    noNode: 8,
    example: 'Yes: sin(x^2), (3x+1)^5\nNo: x*sin(x)',
    x: 0.38,
    y: 0.55
  },
  // Node 5: Sum/Difference Rule (TERMINAL)
  {
    id: 5,
    type: 'rule',
    text: 'Sum/Difference Rule',
    formula: 'd/dx[f+g] = f\' + g\'',
    example: 'd/dx[x^2+3x] = 2x+3',
    color: [0, 100, 200],
    x: 0.62,
    y: 0.55
  },
  // Node 6: Product/Quotient check
  {
    id: 6,
    type: 'question',
    text: 'Is it a product\nof functions?',
    yesNode: 9,
    noNode: 10,
    example: 'Yes: x^2 * sin(x)\nNo: x^2 / sin(x)',
    x: 0.88,
    y: 0.55
  },
  // Node 7: Chain Rule (TERMINAL)
  {
    id: 7,
    type: 'rule',
    text: 'Chain Rule',
    formula: 'd/dx[f(g(x))] = f\'(g(x))*g\'(x)',
    example: 'd/dx[sin(x^2)] = cos(x^2)*2x',
    color: [180, 80, 0],
    x: 0.25,
    y: 0.78
  },
  // Node 8: Special function
  {
    id: 8,
    type: 'rule',
    text: 'Special Function Rule',
    formula: 'Use: trig, exp, log rules',
    example: 'd/dx[sin(x)] = cos(x)',
    color: [120, 60, 150],
    x: 0.50,
    y: 0.78
  },
  // Node 9: Product Rule (TERMINAL)
  {
    id: 9,
    type: 'rule',
    text: 'Product Rule',
    formula: 'd/dx[f*g] = f\'g + fg\'',
    example: 'd/dx[x^2*sin(x)] = 2x*sin(x)+x^2*cos(x)',
    color: [200, 50, 100],
    x: 0.75,
    y: 0.78
  },
  // Node 10: Quotient Rule (TERMINAL)
  {
    id: 10,
    type: 'rule',
    text: 'Quotient Rule',
    formula: 'd/dx[f/g] = (f\'g - fg\')/g^2',
    example: 'd/dx[x/sin(x)] = (sin(x)-x*cos(x))/sin^2(x)',
    color: [50, 130, 150],
    x: 1.0,
    y: 0.78
  }
];

// Buttons
let resetButton;

// Animation state
let highlightPhase = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textSize(defaultTextSize);

  // Create reset button
  resetButton = createButton('Start Over');
  resetButton.position(10, drawHeight + 15);
  resetButton.mousePressed(resetTree);

  // Initialize path
  path = [0];
  currentNode = 0;

  describe('Interactive decision tree to help students select the appropriate differentiation rule. Click Yes or No to answer questions about the function structure, and the tree highlights the path to the correct rule.', LABEL);
}

function draw() {
  updateCanvasSize();
  highlightPhase += 0.05;

  // Background
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
  textSize(20);
  text('Differentiation Rule Selector', canvasWidth / 2, 8);

  textSize(13);
  fill(80);
  text('Answer questions about your function to find the right differentiation rule', canvasWidth / 2, 32);

  // Draw all connections first (behind nodes)
  drawConnections();

  // Draw all nodes
  for (let node of treeData) {
    drawNode(node);
  }

  // Draw current node info panel
  drawInfoPanel();

  // Draw control labels
  drawControlLabels();
}

function drawConnections() {
  // Draw lines connecting nodes
  for (let node of treeData) {
    if (node.type === 'question') {
      let startX = node.x * (canvasWidth - 100) + 50;
      let startY = node.y * (drawHeight - 80) + 50;

      // Yes connection
      if (node.yesNode !== undefined) {
        let targetNode = treeData[node.yesNode];
        let endX = targetNode.x * (canvasWidth - 100) + 50;
        let endY = targetNode.y * (drawHeight - 80) + 50;

        // Check if this connection is in the path
        let inPath = false;
        for (let i = 0; i < path.length - 1; i++) {
          if (path[i] === node.id && path[i + 1] === node.yesNode) {
            inPath = true;
            break;
          }
        }

        if (inPath) {
          stroke(0, 180, 0);
          strokeWeight(3);
        } else {
          stroke(180);
          strokeWeight(1);
        }

        line(startX, startY + 25, endX, endY - 25);

        // "Yes" label
        let midX = (startX + endX) / 2;
        let midY = (startY + 25 + endY - 25) / 2;
        noStroke();
        fill(inPath ? color(0, 140, 0) : 120);
        textSize(11);
        textAlign(CENTER, CENTER);
        text('Yes', midX - 15, midY);
      }

      // No connection
      if (node.noNode !== undefined) {
        let targetNode = treeData[node.noNode];
        let endX = targetNode.x * (canvasWidth - 100) + 50;
        let endY = targetNode.y * (drawHeight - 80) + 50;

        // Check if this connection is in the path
        let inPath = false;
        for (let i = 0; i < path.length - 1; i++) {
          if (path[i] === node.id && path[i + 1] === node.noNode) {
            inPath = true;
            break;
          }
        }

        if (inPath) {
          stroke(200, 0, 0);
          strokeWeight(3);
        } else {
          stroke(180);
          strokeWeight(1);
        }

        line(startX, startY + 25, endX, endY - 25);

        // "No" label
        let midX = (startX + endX) / 2;
        let midY = (startY + 25 + endY - 25) / 2;
        noStroke();
        fill(inPath ? color(180, 0, 0) : 120);
        textSize(11);
        textAlign(CENTER, CENTER);
        text('No', midX + 15, midY);
      }
    }
  }
}

function drawNode(node) {
  let x = node.x * (canvasWidth - 100) + 50;
  let y = node.y * (drawHeight - 80) + 50;

  let isInPath = path.includes(node.id);
  let isCurrent = node.id === currentNode;

  // Node dimensions
  let nodeWidth = node.type === 'question' ? 120 : 100;
  let nodeHeight = node.type === 'question' ? 50 : 45;

  // Draw node background
  if (node.type === 'question') {
    // Diamond shape for questions
    if (isCurrent) {
      // Pulsing highlight for current node
      let pulse = sin(highlightPhase) * 0.3 + 0.7;
      fill(255, 255 * pulse, 150 * pulse);
      stroke(255, 150, 0);
      strokeWeight(3);
    } else if (isInPath) {
      fill(220, 255, 220);
      stroke(0, 150, 0);
      strokeWeight(2);
    } else {
      fill(255);
      stroke(150);
      strokeWeight(1);
    }

    // Draw rounded rectangle for question
    rect(x - nodeWidth/2, y - nodeHeight/2, nodeWidth, nodeHeight, 8);

    // Question text
    noStroke();
    fill(40);
    textAlign(CENTER, CENTER);
    textSize(11);

    // Split text by newlines
    let lines = node.text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], x, y + (i - (lines.length-1)/2) * 13);
    }

    // Draw Yes/No buttons if current
    if (isCurrent) {
      drawYesNoButtons(x, y, nodeHeight);
    }

  } else {
    // Rule node (terminal)
    if (isInPath) {
      // Pulsing effect for reached rule
      let pulse = sin(highlightPhase * 2) * 0.15 + 0.85;
      fill(node.color[0] * pulse, node.color[1] * pulse, node.color[2] * pulse);
      stroke(node.color[0] * 0.7, node.color[1] * 0.7, node.color[2] * 0.7);
      strokeWeight(3);
    } else {
      fill(240);
      stroke(180);
      strokeWeight(1);
    }

    rect(x - nodeWidth/2, y - nodeHeight/2, nodeWidth, nodeHeight, 10);

    // Rule text
    noStroke();
    fill(isInPath ? 255 : 100);
    textAlign(CENTER, CENTER);
    textSize(10);

    let lines = node.text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], x, y + (i - (lines.length-1)/2) * 12);
    }
  }
}

function drawYesNoButtons(x, y, nodeHeight) {
  let btnY = y + nodeHeight/2 + 12;
  let btnWidth = 40;
  let btnHeight = 20;

  // Yes button
  fill(200, 255, 200);
  stroke(0, 150, 0);
  strokeWeight(2);
  rect(x - btnWidth - 5, btnY - btnHeight/2, btnWidth, btnHeight, 5);

  noStroke();
  fill(0, 100, 0);
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Yes', x - btnWidth/2 - 5, btnY);

  // No button
  fill(255, 200, 200);
  stroke(200, 0, 0);
  strokeWeight(2);
  rect(x + 5, btnY - btnHeight/2, btnWidth, btnHeight, 5);

  noStroke();
  fill(150, 0, 0);
  text('No', x + btnWidth/2 + 5, btnY);
}

function drawInfoPanel() {
  let node = treeData[currentNode];

  // Info panel at bottom of drawing area
  let panelX = 10;
  let panelY = drawHeight - 95;
  let panelWidth = canvasWidth - 20;
  let panelHeight = 85;

  fill(255, 255, 240);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelWidth, panelHeight, 8);

  noStroke();
  textAlign(LEFT, TOP);

  if (node.type === 'question') {
    // Show example for current question
    fill(60);
    textSize(13);
    text('Examples:', panelX + 10, panelY + 8);

    fill(80);
    textSize(12);
    let exampleLines = node.example.split('\n');
    for (let i = 0; i < exampleLines.length; i++) {
      text(exampleLines[i], panelX + 10, panelY + 28 + i * 16);
    }

    // Instructions
    fill(100);
    textSize(11);
    textAlign(RIGHT, BOTTOM);
    text('Click Yes or No to continue through the decision tree', panelX + panelWidth - 10, panelY + panelHeight - 8);

  } else {
    // Show rule details
    fill(node.color[0], node.color[1], node.color[2]);
    textSize(14);
    text('Rule Found: ' + node.text.replace('\n', ' '), panelX + 10, panelY + 8);

    fill(40);
    textSize(13);
    text('Formula: ' + node.formula, panelX + 10, panelY + 30);

    fill(60);
    textSize(12);
    text('Example: ' + node.example, panelX + 10, panelY + 52);

    // Success message
    fill(0, 120, 0);
    textSize(11);
    textAlign(RIGHT, BOTTOM);
    text('You found the appropriate rule! Click "Start Over" to try another function.', panelX + panelWidth - 10, panelY + panelHeight - 8);
  }
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  // Path display
  let pathText = 'Path: ';
  for (let i = 0; i < path.length; i++) {
    let node = treeData[path[i]];
    if (node.type === 'rule') {
      pathText += node.text.split('\n')[0];
    } else {
      pathText += 'Q' + (path[i] + 1);
      if (i < path.length - 1) {
        // Show Yes or No based on which branch was taken
        let nextId = path[i + 1];
        if (node.yesNode === nextId) {
          pathText += '(Y)';
        } else {
          pathText += '(N)';
        }
        pathText += ' -> ';
      }
    }
  }

  textSize(12);
  fill(80);
  text(pathText, 100, drawHeight + 25);

  // Current status
  let node = treeData[currentNode];
  if (node.type === 'rule') {
    fill(0, 120, 0);
    text('Result: ' + node.text.replace('\n', ' '), 100, drawHeight + 45);
  } else {
    fill(60);
    text('Answering: ' + node.text.replace('\n', ' '), 100, drawHeight + 45);
  }
}

function mousePressed() {
  let node = treeData[currentNode];

  // Only respond to clicks if current node is a question
  if (node.type !== 'question') return;

  let x = node.x * (canvasWidth - 100) + 50;
  let y = node.y * (drawHeight - 80) + 50;
  let nodeHeight = 50;

  let btnY = y + nodeHeight/2 + 12;
  let btnWidth = 40;
  let btnHeight = 20;

  // Check Yes button
  if (mouseX >= x - btnWidth - 5 && mouseX <= x - 5 &&
      mouseY >= btnY - btnHeight/2 && mouseY <= btnY + btnHeight/2) {
    // Yes clicked
    if (node.yesNode !== undefined) {
      currentNode = node.yesNode;
      path.push(currentNode);
    }
  }

  // Check No button
  if (mouseX >= x + 5 && mouseX <= x + btnWidth + 5 &&
      mouseY >= btnY - btnHeight/2 && mouseY <= btnY + btnHeight/2) {
    // No clicked
    if (node.noNode !== undefined) {
      currentNode = node.noNode;
      path.push(currentNode);
    }
  }
}

function resetTree() {
  currentNode = 0;
  path = [0];
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
