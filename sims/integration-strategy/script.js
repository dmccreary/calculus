// Integration Strategy Decision Flowchart
// Interactive SVG-based decision tree for choosing integration techniques

(function() {
    'use strict';

    // ============================================================
    // Configuration
    // ============================================================
    const COLORS = {
        green:       { fill: '#2e7d32', light: '#e8f5e9', stroke: '#1b5e20', text: '#fff' },
        blue:        { fill: '#1565c0', light: '#e3f2fd', stroke: '#0d47a1', text: '#fff' },
        orange:      { fill: '#e65100', light: '#fff3e0', stroke: '#bf360c', text: '#fff' },
        decision:    { fill: '#fdd835', stroke: '#f9a825', text: '#333' },
        start:       { fill: '#6a1b9a', light: '#f3e5f5', stroke: '#4a148c', text: '#fff' },
        connector:   '#666',
        highlight:   '#ff5722',
        bgPanel:     '#f9f9fb',
        quizCorrect: '#4caf50',
        quizWrong:   '#f44336'
    };

    const FONT = "'Segoe UI', Arial, sans-serif";

    // ============================================================
    // Node definitions
    // ============================================================
    // type: 'decision' (diamond), 'action' (rounded rect), 'start' (stadium)
    // category: green | blue | orange | start  (determines colour)
    const nodes = [
        {
            id: 'start',
            type: 'start',
            category: 'start',
            label: 'What does your\nintegral look like?',
            x: 400, y: 40, w: 220, h: 52,
            info: 'Begin here. Look at the integrand and ask the questions below to find the right technique.',
            example: null
        },
        // --- Decision 1: basic ---
        {
            id: 'd1',
            type: 'decision',
            category: 'decision',
            label: 'Is it a basic\nantiderivative form?',
            x: 400, y: 140, w: 210, h: 80,
            info: 'Check if the integrand matches a standard rule directly: power rule, exponential, trig, or 1/x.',
            example: null
        },
        {
            id: 'a_basic',
            type: 'action',
            category: 'green',
            label: 'Apply basic\nantiderivative rule',
            x: 130, y: 140, w: 180, h: 56,
            info: 'Use the matching basic rule. Power rule, exponential rule, basic trig antiderivatives, or ln|x|.',
            example: {
                integral: '\\(\\int x^4\\,dx\\)',
                steps: [
                    'Recognise power rule form: \\(\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C\\)',
                    'Apply with n = 4:',
                    '\\(\\frac{x^5}{5} + C\\)'
                ]
            }
        },
        // --- Decision 2: simplify ---
        {
            id: 'd2',
            type: 'decision',
            category: 'decision',
            label: 'Can you simplify\nalgebraically?',
            x: 400, y: 270, w: 210, h: 80,
            info: 'Can you expand, factor, split a fraction, or use a trig identity to rewrite the integrand into a simpler form?',
            example: null
        },
        {
            id: 'a_simplify',
            type: 'action',
            category: 'orange',
            label: 'Simplify first,\nthen integrate',
            x: 130, y: 270, w: 180, h: 56,
            info: 'Rewrite the integrand using algebra or trig identities, then apply basic rules.',
            example: {
                integral: '\\(\\int \\frac{x^2 + 3}{x}\\,dx\\)',
                steps: [
                    'Split the fraction:',
                    '\\(\\int \\left(x + \\frac{3}{x}\\right)dx\\)',
                    'Integrate term by term:',
                    '\\(\\frac{x^2}{2} + 3\\ln|x| + C\\)'
                ]
            }
        },
        // --- Decision 3: u-sub ---
        {
            id: 'd3',
            type: 'decision',
            category: 'decision',
            label: 'Do you see a function\nand its derivative?',
            x: 400, y: 400, w: 220, h: 80,
            info: 'Look for a composite structure f(g(x))g\'(x). If you can identify an inner function whose derivative also appears (up to a constant), u-substitution will work.',
            example: null
        },
        {
            id: 'a_usub',
            type: 'action',
            category: 'blue',
            label: 'Use u-substitution',
            x: 130, y: 400, w: 180, h: 56,
            info: 'Let u = inner function, find du, substitute, integrate, then back-substitute.',
            example: {
                integral: '\\(\\int 2x\\cos(x^2)\\,dx\\)',
                steps: [
                    'Let \\(u = x^2\\), so \\(du = 2x\\,dx\\)',
                    'Substitute: \\(\\int \\cos(u)\\,du\\)',
                    'Integrate: \\(\\sin(u) + C\\)',
                    'Back-substitute: \\(\\sin(x^2) + C\\)'
                ]
            }
        },
        // --- Decision 4: rational ---
        {
            id: 'd4',
            type: 'decision',
            category: 'decision',
            label: 'Is it a rational\nfunction P(x)/Q(x)?',
            x: 400, y: 530, w: 210, h: 80,
            info: 'Is the integrand a ratio of two polynomials? If so, compare the degrees of numerator and denominator.',
            example: null
        },
        {
            id: 'a_rational',
            type: 'action',
            category: 'orange',
            label: 'Long division or\npartial fractions',
            x: 130, y: 530, w: 180, h: 56,
            info: 'If deg(P) >= deg(Q), do polynomial long division first. Then decompose the proper fraction into partial fractions and integrate each term.',
            example: {
                integral: '\\(\\int \\frac{1}{x^2 - 1}\\,dx\\)',
                steps: [
                    'Factor: \\(x^2-1 = (x-1)(x+1)\\)',
                    'Partial fractions: \\(\\frac{1}{(x-1)(x+1)} = \\frac{A}{x-1}+\\frac{B}{x+1}\\)',
                    'Solve: A = 1/2, B = -1/2',
                    '\\(\\frac{1}{2}\\ln|x-1| - \\frac{1}{2}\\ln|x+1| + C\\)'
                ]
            }
        },
        // --- Decision 5: quadratic ---
        {
            id: 'd5',
            type: 'decision',
            category: 'decision',
            label: 'Is there a quadratic\nexpression inside?',
            x: 400, y: 660, w: 220, h: 80,
            info: 'Look for expressions like ax^2 + bx + c under a square root or in a denominator. Completing the square can transform it into a standard form.',
            example: null
        },
        {
            id: 'a_complete',
            type: 'action',
            category: 'blue',
            label: 'Complete the square,\nthen substitute',
            x: 130, y: 660, w: 180, h: 56,
            info: 'Rewrite the quadratic in the form a(x-h)^2 + k, then use a trig or u-substitution to match an inverse trig or logarithmic form.',
            example: {
                integral: '\\(\\int \\frac{1}{x^2+4x+5}\\,dx\\)',
                steps: [
                    'Complete the square: \\(x^2+4x+5 = (x+2)^2+1\\)',
                    'Let \\(u = x+2\\), \\(du = dx\\)',
                    '\\(\\int \\frac{1}{u^2+1}\\,du = \\arctan(u)+C\\)',
                    '\\(\\arctan(x+2)+C\\)'
                ]
            }
        },
        // --- Fallback ---
        {
            id: 'a_fallback',
            type: 'action',
            category: 'orange',
            label: 'Try other techniques\nor numerical methods',
            x: 400, y: 780, w: 200, h: 56,
            info: 'If none of the above strategies apply, consider integration by parts (coming in a later chapter), trig substitution, or numerical approximation.',
            example: {
                integral: '\\(\\int e^{-x^2}\\,dx\\)',
                steps: [
                    'This integral has no elementary antiderivative.',
                    'Use numerical methods (Riemann sums, trapezoidal rule).',
                    'Related to the error function: erf(x).'
                ]
            }
        }
    ];

    // ============================================================
    // Edge definitions
    // ============================================================
    // label: text on the edge, path: 'yes' or 'no'
    const edges = [
        { from: 'start', to: 'd1', label: '', path: '' },
        { from: 'd1', to: 'a_basic', label: 'Yes', path: 'yes' },
        { from: 'd1', to: 'd2', label: 'No', path: 'no' },
        { from: 'd2', to: 'a_simplify', label: 'Yes', path: 'yes' },
        { from: 'd2', to: 'd3', label: 'No', path: 'no' },
        { from: 'd3', to: 'a_usub', label: 'Yes', path: 'yes' },
        { from: 'd3', to: 'd4', label: 'No', path: 'no' },
        { from: 'd4', to: 'a_rational', label: 'Yes', path: 'yes' },
        { from: 'd4', to: 'd5', label: 'No', path: 'no' },
        { from: 'd5', to: 'a_complete', label: 'Yes', path: 'yes' },
        { from: 'd5', to: 'a_fallback', label: 'No', path: 'no' },
    ];

    // ============================================================
    // Quiz data
    // ============================================================
    const quizQuestions = [
        {
            integral: '\\(\\int 3x^2\\,dx\\)',
            correctPath: ['start','d1','a_basic'],
            correctId: 'a_basic',
            explanation: 'This is a direct power rule problem: apply the basic antiderivative rule.'
        },
        {
            integral: '\\(\\int \\frac{x^3+1}{x}\\,dx\\)',
            correctPath: ['start','d1','d2','a_simplify'],
            correctId: 'a_simplify',
            explanation: 'Split the fraction into x^2 + 1/x, then integrate each term.'
        },
        {
            integral: '\\(\\int 2x e^{x^2}\\,dx\\)',
            correctPath: ['start','d1','d2','d3','a_usub'],
            correctId: 'a_usub',
            explanation: 'Let u = x^2, du = 2x dx. This is a classic u-substitution.'
        },
        {
            integral: '\\(\\int \\frac{3}{x^2-4}\\,dx\\)',
            correctPath: ['start','d1','d2','d3','d4','a_rational'],
            correctId: 'a_rational',
            explanation: 'Factor the denominator as (x-2)(x+2) and use partial fractions.'
        },
        {
            integral: '\\(\\int \\frac{1}{x^2+6x+13}\\,dx\\)',
            correctPath: ['start','d1','d2','d3','d4','d5','a_complete'],
            correctId: 'a_complete',
            explanation: 'Complete the square: (x+3)^2 + 4, then use arctan form.'
        }
    ];

    // ============================================================
    // State
    // ============================================================
    let hoveredNode = null;
    let selectedNode = null;
    let highlightedPath = [];
    let quizMode = false;
    let currentQuizIdx = 0;
    let quizAnswer = null;      // node id the user clicked
    let quizFeedback = '';
    let quizScore = 0;
    let quizTotal = 0;
    let quizFinished = false;

    // ============================================================
    // Helpers
    // ============================================================
    function nodeById(id) {
        return nodes.find(n => n.id === id);
    }

    function getNodeColor(node) {
        if (node.type === 'decision') return COLORS.decision;
        return COLORS[node.category] || COLORS.green;
    }

    // ============================================================
    // SVG rendering
    // ============================================================
    function buildSVG() {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 660 860');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.fontFamily = FONT;

        // --- Defs: arrowhead ---
        const defs = document.createElementNS(svgNS, 'defs');
        const marker = document.createElementNS(svgNS, 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '10');
        marker.setAttribute('refY', '3.5');
        marker.setAttribute('orient', 'auto');
        const arrowPoly = document.createElementNS(svgNS, 'polygon');
        arrowPoly.setAttribute('points', '0 0, 10 3.5, 0 7');
        arrowPoly.setAttribute('fill', COLORS.connector);
        marker.appendChild(arrowPoly);
        defs.appendChild(marker);

        // highlighted arrowhead
        const markerH = marker.cloneNode(true);
        markerH.setAttribute('id', 'arrowhead-hl');
        markerH.querySelector('polygon').setAttribute('fill', COLORS.highlight);
        defs.appendChild(markerH);

        svg.appendChild(defs);

        // --- Draw edges ---
        edges.forEach(e => {
            const from = nodeById(e.from);
            const to = nodeById(e.to);
            if (!from || !to) return;

            const isHighlighted = highlightedPath.includes(e.from) && highlightedPath.includes(e.to) &&
                Math.abs(highlightedPath.indexOf(e.to) - highlightedPath.indexOf(e.from)) === 1;

            const g = document.createElementNS(svgNS, 'g');
            g.setAttribute('data-edge', e.from + '-' + e.to);

            let pathD;
            // "Yes" edges go left to action node
            if (e.path === 'yes') {
                const startX = from.x - from.w / 2;
                const startY = from.y + from.h / 2;
                const endX = to.x + to.w / 2;
                const endY = to.y + to.h / 2;
                // horizontal then vertical connector (L-shaped)
                const midY = startY;
                pathD = `M ${startX} ${midY} L ${endX + 8} ${midY} L ${endX + 8} ${endY}`;
                // Actually let's do a cleaner path: straight horizontal
                pathD = `M ${startX} ${from.y + from.h/2} L ${to.x + to.w/2 + 2} ${to.y + to.h/2}`;
            } else {
                // "No" edges go straight down
                const startX = from.x;
                const startY = from.y + from.h / 2 + (from.type === 'decision' ? 4 : 0);
                const endX = to.x;
                const endY = to.y - to.h / 2 - (to.type === 'decision' ? 4 : 0);
                pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
            }

            const pathEl = document.createElementNS(svgNS, 'path');
            pathEl.setAttribute('d', pathD);
            pathEl.setAttribute('fill', 'none');
            pathEl.setAttribute('stroke', isHighlighted ? COLORS.highlight : COLORS.connector);
            pathEl.setAttribute('stroke-width', isHighlighted ? '3' : '2');
            pathEl.setAttribute('marker-end', isHighlighted ? 'url(#arrowhead-hl)' : 'url(#arrowhead)');
            g.appendChild(pathEl);

            // edge label
            if (e.label) {
                const lx = e.path === 'yes'
                    ? (from.x - from.w/2 + to.x + to.w/2) / 2
                    : from.x + 14;
                const ly = e.path === 'yes'
                    ? from.y + from.h/2 - 8
                    : (from.y + from.h/2 + to.y - to.h/2) / 2 + 4;
                const labelText = document.createElementNS(svgNS, 'text');
                labelText.setAttribute('x', lx);
                labelText.setAttribute('y', ly);
                labelText.setAttribute('text-anchor', 'middle');
                labelText.setAttribute('font-size', '13');
                labelText.setAttribute('font-weight', 'bold');
                labelText.setAttribute('fill', isHighlighted ? COLORS.highlight : '#555');
                labelText.textContent = e.label;
                g.appendChild(labelText);
            }

            svg.appendChild(g);
        });

        // --- Draw nodes ---
        nodes.forEach(node => {
            const g = document.createElementNS(svgNS, 'g');
            g.setAttribute('data-node-id', node.id);
            g.style.cursor = 'pointer';

            const col = getNodeColor(node);
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode === node.id;
            const isOnPath = highlightedPath.includes(node.id);
            const isQuizTarget = quizMode && quizAnswer === node.id;

            let strokeColor = col.stroke;
            let strokeWidth = 2;
            if (isOnPath) { strokeColor = COLORS.highlight; strokeWidth = 3; }
            if (isHovered) { strokeWidth = 3; }
            if (isSelected) { strokeColor = COLORS.highlight; strokeWidth = 4; }
            if (isQuizTarget) {
                const q = quizQuestions[currentQuizIdx];
                strokeColor = (quizAnswer === q.correctId) ? COLORS.quizCorrect : COLORS.quizWrong;
                strokeWidth = 4;
            }

            if (node.type === 'decision') {
                // Diamond
                const points = [
                    [node.x, node.y - node.h/2],
                    [node.x + node.w/2, node.y],
                    [node.x, node.y + node.h/2],
                    [node.x - node.w/2, node.y]
                ].map(p => p.join(',')).join(' ');
                const poly = document.createElementNS(svgNS, 'polygon');
                poly.setAttribute('points', points);
                poly.setAttribute('fill', col.fill);
                poly.setAttribute('stroke', strokeColor);
                poly.setAttribute('stroke-width', strokeWidth);
                g.appendChild(poly);
            } else if (node.type === 'start') {
                // Stadium shape (pill)
                const rect = document.createElementNS(svgNS, 'rect');
                rect.setAttribute('x', node.x - node.w/2);
                rect.setAttribute('y', node.y - node.h/2);
                rect.setAttribute('width', node.w);
                rect.setAttribute('height', node.h);
                rect.setAttribute('rx', node.h/2);
                rect.setAttribute('ry', node.h/2);
                rect.setAttribute('fill', col.fill);
                rect.setAttribute('stroke', strokeColor);
                rect.setAttribute('stroke-width', strokeWidth);
                g.appendChild(rect);
            } else {
                // Rounded rectangle
                const rect = document.createElementNS(svgNS, 'rect');
                rect.setAttribute('x', node.x - node.w/2);
                rect.setAttribute('y', node.y - node.h/2);
                rect.setAttribute('width', node.w);
                rect.setAttribute('height', node.h);
                rect.setAttribute('rx', '10');
                rect.setAttribute('ry', '10');
                rect.setAttribute('fill', col.fill);
                rect.setAttribute('stroke', strokeColor);
                rect.setAttribute('stroke-width', strokeWidth);
                g.appendChild(rect);
            }

            // Category colour indicator (small dot) for action nodes
            if (node.type === 'action') {
                const dot = document.createElementNS(svgNS, 'circle');
                dot.setAttribute('cx', node.x - node.w/2 + 14);
                dot.setAttribute('cy', node.y - node.h/2 + 14);
                dot.setAttribute('r', '5');
                dot.setAttribute('fill', '#fff');
                dot.setAttribute('opacity', '0.5');
                g.appendChild(dot);
            }

            // Multi-line label
            const lines = node.label.split('\n');
            lines.forEach((line, i) => {
                const text = document.createElementNS(svgNS, 'text');
                text.setAttribute('x', node.x);
                const lineH = node.type === 'decision' ? 15 : 16;
                const totalH = lines.length * lineH;
                text.setAttribute('y', node.y - totalH/2 + lineH * (i + 0.8));
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('font-size', node.type === 'decision' ? '12' : '13');
                text.setAttribute('font-weight', '600');
                text.setAttribute('fill', col.text);
                text.setAttribute('pointer-events', 'none');
                text.textContent = line;
                g.appendChild(text);
            });

            // Event listeners
            g.addEventListener('mouseenter', () => {
                hoveredNode = node.id;
                updateInfoPanel(node);
            });
            g.addEventListener('mouseleave', () => {
                hoveredNode = null;
                if (!selectedNode && !quizMode) resetInfoPanel();
            });
            g.addEventListener('click', () => handleNodeClick(node));

            svg.appendChild(g);
        });

        return svg;
    }

    // ============================================================
    // Info panel
    // ============================================================
    function updateInfoPanel(node) {
        const title = document.getElementById('info-title');
        const content = document.getElementById('info-content');
        if (!title || !content) return;

        title.textContent = node.label.replace(/\n/g, ' ');
        let html = '<p>' + node.info + '</p>';
        if (node.example) {
            html += '<p style="margin-top:8px;font-size:13px;color:#888;">Click for worked example.</p>';
        }
        content.innerHTML = html;
        if (window.MathJax) MathJax.typeset([content]);
    }

    function showWorkedExample(node) {
        const title = document.getElementById('info-title');
        const content = document.getElementById('info-content');
        if (!title || !content || !node.example) return;

        title.textContent = 'Worked Example';
        let html = '<p class="example-integral">' + node.example.integral + '</p>';
        html += '<ol class="example-steps">';
        node.example.steps.forEach(s => {
            html += '<li>' + s + '</li>';
        });
        html += '</ol>';
        content.innerHTML = html;
        if (window.MathJax) MathJax.typeset([content]);
    }

    function resetInfoPanel() {
        const title = document.getElementById('info-title');
        const content = document.getElementById('info-content');
        if (!title || !content) return;
        title.textContent = 'Integration Strategy';
        content.innerHTML = '<p>Hover over a node to learn about that step. Click action nodes (colored rectangles) to see worked examples.</p>';
    }

    function showQuizUI() {
        const title = document.getElementById('info-title');
        const content = document.getElementById('info-content');
        if (!title || !content) return;

        if (quizFinished) {
            title.textContent = 'Quiz Complete!';
            content.innerHTML = '<p style="font-size:18px;font-weight:bold;">Score: ' + quizScore + ' / ' + quizTotal + '</p>' +
                '<p>' + (quizScore === quizTotal ? 'Perfect score -- you have mastered the decision tree!' : 'Review the flowchart and try again!') + '</p>' +
                '<button id="restart-quiz-btn" class="panel-btn" style="margin-top:10px;">Restart Quiz</button>';
            const rbtn = document.getElementById('restart-quiz-btn');
            if (rbtn) rbtn.addEventListener('click', restartQuiz);
            return;
        }

        const q = quizQuestions[currentQuizIdx];
        title.textContent = 'Quiz (' + (currentQuizIdx + 1) + '/' + quizQuestions.length + ')';
        let html = '<p>Which technique should you use for:</p>';
        html += '<p class="example-integral" style="font-size:18px;">' + q.integral + '</p>';
        if (quizAnswer) {
            const correct = quizAnswer === q.correctId;
            html += '<p style="color:' + (correct ? COLORS.quizCorrect : COLORS.quizWrong) + ';font-weight:bold;">' +
                (correct ? 'Correct!' : 'Not quite.') + '</p>';
            html += '<p>' + q.explanation + '</p>';
            html += '<button id="next-quiz-btn" class="panel-btn" style="margin-top:10px;">' +
                (currentQuizIdx < quizQuestions.length - 1 ? 'Next Question' : 'See Results') + '</button>';
        } else {
            html += '<p style="color:#888;">Click the correct <strong>action node</strong> (colored rectangle) in the flowchart.</p>';
        }
        content.innerHTML = html;

        const nbtn = document.getElementById('next-quiz-btn');
        if (nbtn) nbtn.addEventListener('click', advanceQuiz);

        if (window.MathJax) MathJax.typeset([content]);
    }

    // ============================================================
    // Interaction handlers
    // ============================================================
    function handleNodeClick(node) {
        if (quizMode) {
            if (quizAnswer) return; // already answered
            if (node.type !== 'action') return; // only accept action nodes
            quizAnswer = node.id;
            const q = quizQuestions[currentQuizIdx];
            if (quizAnswer === q.correctId) quizScore++;
            highlightedPath = q.correctPath;
            quizTotal++;
            render();
            showQuizUI();
            return;
        }

        if (node.type === 'action' && node.example) {
            selectedNode = node.id;
            // Highlight path from start to this node
            highlightedPath = findPathTo(node.id);
            render();
            showWorkedExample(node);
        }
    }

    function findPathTo(targetId) {
        // BFS from start
        const queue = [['start']];
        const visited = new Set();
        while (queue.length) {
            const path = queue.shift();
            const current = path[path.length - 1];
            if (current === targetId) return path;
            if (visited.has(current)) continue;
            visited.add(current);
            edges.filter(e => e.from === current).forEach(e => {
                queue.push([...path, e.to]);
            });
        }
        return [];
    }

    function startQuiz() {
        quizMode = true;
        currentQuizIdx = 0;
        quizAnswer = null;
        quizFeedback = '';
        quizScore = 0;
        quizTotal = 0;
        quizFinished = false;
        highlightedPath = [];
        selectedNode = null;
        render();
        showQuizUI();
    }

    function advanceQuiz() {
        currentQuizIdx++;
        quizAnswer = null;
        highlightedPath = [];
        if (currentQuizIdx >= quizQuestions.length) {
            quizFinished = true;
        }
        render();
        showQuizUI();
    }

    function restartQuiz() {
        startQuiz();
    }

    function exitQuiz() {
        quizMode = false;
        quizFinished = false;
        highlightedPath = [];
        selectedNode = null;
        render();
        resetInfoPanel();
    }

    // ============================================================
    // Legend
    // ============================================================
    function buildLegend() {
        const div = document.createElement('div');
        div.className = 'legend';
        const items = [
            { color: COLORS.green.fill, label: 'Basic technique' },
            { color: COLORS.blue.fill, label: 'Substitution' },
            { color: COLORS.orange.fill, label: 'Algebraic manipulation' },
            { color: COLORS.decision.fill, label: 'Decision', textColor: '#333' }
        ];
        items.forEach(item => {
            const span = document.createElement('span');
            span.className = 'legend-item';
            const swatch = document.createElement('span');
            swatch.className = 'legend-swatch';
            swatch.style.background = item.color;
            span.appendChild(swatch);
            span.appendChild(document.createTextNode(item.label));
            div.appendChild(span);
        });
        return div;
    }

    // ============================================================
    // Render
    // ============================================================
    function render() {
        const container = document.getElementById('flowchart-container');
        if (!container) return;
        container.innerHTML = '';
        container.appendChild(buildSVG());
    }

    // ============================================================
    // Init
    // ============================================================
    function init() {
        const diagram = document.getElementById('flowchart-container');
        if (!diagram) return;

        render();

        // Legend
        const legendSlot = document.getElementById('legend-slot');
        if (legendSlot) legendSlot.appendChild(buildLegend());

        // Buttons
        const quizBtn = document.getElementById('quiz-btn');
        if (quizBtn) quizBtn.addEventListener('click', startQuiz);

        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            if (quizMode) { exitQuiz(); return; }
            highlightedPath = [];
            selectedNode = null;
            render();
            resetInfoPanel();
        });

        resetInfoPanel();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
