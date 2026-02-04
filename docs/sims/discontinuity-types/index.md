---
title: Discontinuity Classification
description: An interactive MicroSim for classifying discontinuities by analyzing limit behavior at specific points, featuring both a gallery view of all four types and a quiz mode for practice.
quality_score: 90
image: /sims/discontinuity-types/discontinuity-types.png
og:image: /sims/discontinuity-types/discontinuity-types.png
twitter:image: /sims/discontinuity-types/discontinuity-types.png
social:
   cards: false
---
# Discontinuity Classification

<iframe src="main.html" height="502px" width="100%" scrolling="no"></iframe>

[Run the Discontinuity Classification MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Discontinuity Classification MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim helps you learn to classify the four types of discontinuities by analyzing limit behavior at specific points:

1. **Removable Discontinuity**: The limit exists (both one-sided limits are equal), but either f(a) is undefined or f(a) differs from the limit. Graphically, this appears as a "hole" in the graph.

2. **Jump Discontinuity**: Both one-sided limits exist, but they are not equal. The function "jumps" from one value to another at the point of discontinuity.

3. **Infinite Discontinuity**: The function approaches positive or negative infinity as x approaches the point of discontinuity. This creates a vertical asymptote.

4. **Essential Discontinuity**: The limit does not exist because the function oscillates infinitely or behaves chaotically near the point. Neither one-sided limit exists.

### Two Modes

- **Gallery View**: Study reference examples of all four discontinuity types side by side. Each panel shows the graph with the one-sided limit values displayed.

- **Quiz Mode**: Test your classification skills. A random function with a discontinuity is displayed, and you must identify which type it is. Immediate feedback explains why your answer is correct or incorrect.

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/discontinuity-types/main.html" height="502px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will classify discontinuities by analyzing limit behavior at specific points.

**Bloom's Taxonomy Level**: Analyze (L4)

**Bloom's Verb**: Classify

### Grade Level

High School AP Calculus (Grades 11-12)

### Prerequisites

- Understanding of limits and limit notation
- Knowledge of one-sided limits
- Familiarity with function graphs
- Understanding of what it means for a limit to exist or not exist

### Duration

15-20 minutes

### Activity Sequence

1. **Introduction (3 minutes)**
   - Open the MicroSim in Gallery View
   - Review the four discontinuity types with the class
   - Point out the key distinguishing features in each panel

2. **Guided Exploration (5 minutes)**
   - Click each panel to highlight it
   - Discuss the one-sided limit values shown
   - Ask students: "What makes each type different?"

3. **Independent Practice (7-10 minutes)**
   - Have students switch to Quiz Mode
   - Students work through at least 5-6 quiz questions
   - Encourage students to read the explanations for each answer

4. **Wrap-up Discussion (2-3 minutes)**
   - Ask students to articulate the decision process for classification
   - Create a class flowchart: "How do I classify a discontinuity?"

### Assessment Questions

1. If both one-sided limits equal 5, but f(2) = 3, what type of discontinuity is at x = 2?

2. At x = 1, the left-hand limit is 4 and the right-hand limit is 7. What type of discontinuity is this?

3. If a function has a vertical asymptote at x = 3, what type of discontinuity does it have there?

4. The function sin(1/x) oscillates infinitely as x approaches 0. What type of discontinuity is at x = 0?

### Extension Activities

- Have students create their own examples of each discontinuity type
- Challenge students to write piecewise functions that produce each type
- Discuss real-world situations that model each discontinuity type

## References

- [Discontinuity - Wikipedia](https://en.wikipedia.org/wiki/Classification_of_discontinuities)
- [Types of Discontinuities - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new/ab-1-10/v/types-of-discontinuities)
- [AP Calculus AB/BC Course Description - College Board](https://apcentral.collegeboard.org/courses/ap-calculus-ab)
