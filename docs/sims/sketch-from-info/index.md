---
title: Sketch from Derivative Info
description: Students construct function graphs given only derivative information, translating algebraic conditions into visual representations.
quality_score: 90
image: /sims/sketch-from-info/sketch-from-info.png
og:image: /sims/sketch-from-info/sketch-from-info.png
twitter:image: /sims/sketch-from-info/sketch-from-info.png
social:
   cards: false
---
# Sketch from Derivative Info

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run the Sketch from Derivative Info MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Sketch from Derivative Info MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim challenges students to construct function graphs based only on derivative information. Given conditions about where a function is increasing, decreasing, has critical points, and changes concavity, students must sketch a curve that satisfies all the given constraints.

!!! quote "Delta Moment"
    "Now THIS is what I call working backwards! Instead of finding the derivative
    of a function, you're finding the function from its derivative properties.
    It's like being a detective who reconstructs the crime from the clues!"

### How to Use

1. **Read the conditions** listed at the top - these describe the derivative properties your curve must have
2. **Click and drag** on the graph area to sketch your predicted curve
3. **Click "Check"** to see which conditions your sketch satisfies (green check) or fails (red X)
4. **Click "Hint"** to reveal visual helpers one at a time (points, tangent lines, arrows showing direction)
5. **Click "Solution"** to see one valid curve that satisfies all conditions
6. **Click "Clear"** to erase your sketch and try again
7. **Click "New"** to move to a different problem

### Problem Types

The MicroSim includes four problem types of increasing complexity:

1. **Local Maximum** - One critical point with given concavity
2. **Two Extrema** - Local minimum and maximum with concavity change
3. **Inflection Point** - Always increasing with change in concavity
4. **S-Curve** - Points to pass through with inflection point

## Embedding This MicroSim

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/sketch-from-info/main.html" height="502px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will construct function graphs given only derivative information, developing the ability to translate algebraic conditions into visual representations.

**Bloom's Taxonomy Level:** Create (L6)

**Bloom's Verb:** Construct

### Grade Level

High School (AP Calculus) / Undergraduate

### Prerequisites

- Understanding of first and second derivatives
- Knowledge of critical points, local maxima, and local minima
- Understanding of concavity and inflection points
- Ability to interpret derivative signs as increasing/decreasing behavior

### Duration

20-30 minutes

### Classroom Activities

#### Activity 1: Think First (5 minutes)

Before using the MicroSim, have students work in pairs to discuss:

- "If f'(x) > 0, what does the graph look like?"
- "If f''(x) < 0, how does the curve bend?"
- "What must be true at a local maximum?"

#### Activity 2: Guided Exploration (10 minutes)

1. Start with Problem 1 (Local Maximum)
2. Ask students to sketch WITHOUT using hints first
3. Click "Check" to see results
4. Discuss: "What conditions did you miss? Why?"
5. Use hints progressively to understand each condition

#### Activity 3: Challenge Problems (10 minutes)

1. Progress through problems 2-4
2. For each problem, students should:
   - Predict before sketching
   - Sketch their curve
   - Check and refine
   - Compare with the solution

#### Activity 4: Create Your Own (5 minutes)

Have students write their own set of derivative conditions on paper, then trade with a partner to sketch.

### Assessment Opportunities

- **Formative:** Observe which conditions students consistently satisfy or miss
- **Diagnostic:** The "Check" feature reveals specific conceptual gaps
- **Self-assessment:** Students can verify their understanding by comparing to solutions

### Discussion Questions

1. "Can there be more than one correct answer? Why or why not?"
2. "Which conditions are easiest to satisfy? Hardest? Why?"
3. "How does the second derivative condition affect the 'feel' of your curve?"
4. "What happens if you try to draw a curve that's increasing but concave down?"

### Common Misconceptions to Address

- Confusing concave up/down with increasing/decreasing
- Forgetting that f'(x) = 0 means horizontal tangent, not necessarily an extremum
- Assuming the curve must pass through the origin
- Drawing sharp corners instead of smooth curves

### Differentiation

- **For struggling students:** Focus on Problem 1, use all hints before drawing
- **For advanced students:** Try to satisfy all conditions on first attempt, then explain reasoning

## References

- [Curve Sketching Using Derivatives - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-6a/v/curve-sketching-with-calculus-first-derivative)
- [First and Second Derivative Tests - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/ShapeofGraphPtII.aspx)
- AP Calculus AB Course and Exam Description, Unit 5: Analytical Applications of Differentiation
