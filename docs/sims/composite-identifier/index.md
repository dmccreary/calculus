---
title: Composite Function Identifier
description: An interactive MicroSim for training students to recognize composite functions and decompose them into inside (g) and outside (f) functions, preparing them for the chain rule.
quality_score: 90
image: /sims/composite-identifier/composite-identifier.png
og:image: /sims/composite-identifier/composite-identifier.png
twitter:image: /sims/composite-identifier/composite-identifier.png
social:
   cards: false
---
# Composite Function Identifier

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Composite Function Identifier MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Composite Function Identifier MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim provides active practice in recognizing and decomposing composite functions. Before students can successfully apply the chain rule, they must be able to identify:

1. **The Inside Function g(x)**: The inner expression that gets "fed into" the outer function
2. **The Outside Function f(u)**: The outer wrapper that operates on the result of g(x)

!!! quote "Delta Moment"
    "Think of it like Russian nesting dolls! The inside function is the small doll at the center, and the outside function is the bigger doll that wraps around it. When I roll along a composite function, I'm actually going through layers!"

### Three Difficulty Levels

- **Simple**: Basic compositions like cos(x^3), e^(2x+1), or (5x-1)^7
- **Medium**: More complex expressions like ln(sin(x)), sqrt(3x-2), or 1/(x^2+1)
- **Nested**: Deep compositions like sin(cos(x)), e^(sin(x^2)), or (cos(2x))^3

### Visual Layer Diagram

The MicroSim includes a visual "layers" diagram showing how the function is built from the inside out. This helps students see the structure before attempting decomposition.

### How to Use

1. Read the composite function displayed at the top
2. Click on the "Inside Function" box and type g(x)
3. Click on the "Outside Function" box and type f(u) (use `u` as the placeholder)
4. Click "Check Answer" to see if you're correct
5. Use "Show Solution" if you need help understanding the decomposition

### Tips for Success

- Look for the "outermost" operation - that's your outside function
- Whatever is inside that operation is your inside function
- Use `u` in the outside function to show where g(x) would be substituted
- Common outside patterns: sin(u), cos(u), e^u, u^n, ln(u), sqrt(u), 1/u

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/composite-identifier/main.html" height="562px" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will identify composite functions and decompose them into inside and outside functions.

**Bloom's Taxonomy Level**: Analyze (L4)

**Bloom's Verbs**: Analyze, Distinguish, Deconstruct

### Grade Level

High School AP Calculus (Grades 11-12)

### Prerequisites

- Understanding of function notation f(x)
- Knowledge of common functions (polynomial, trigonometric, exponential, logarithmic)
- Familiarity with function composition notation f(g(x))

### Duration

15-20 minutes

### Activity Sequence

1. **Introduction (3 minutes)**
   - Review function composition notation f(g(x))
   - Explain the "Russian nesting doll" analogy for composite functions
   - Demonstrate with one example: cos(x^3)

2. **Guided Practice (5 minutes)**
   - Work through 2-3 "Simple" problems as a class
   - Use the layer diagram to show the structure
   - Emphasize: "What operation would you do LAST when evaluating?"

3. **Independent Practice (8-10 minutes)**
   - Students work through problems at their own pace
   - Encourage progression from Simple to Medium to Nested
   - Target: At least 5-6 correctly identified compositions

4. **Wrap-up Discussion (2 minutes)**
   - Ask: "What patterns did you notice?"
   - Connect to the chain rule: d/dx[f(g(x))] = f'(g(x)) * g'(x)
   - Preview: "Now that you can identify these functions, you can differentiate them!"

### Assessment Questions

1. For the function e^(x^2+1), identify the inside and outside functions.

2. What is g(x) and f(u) for the composite function sin(5x)?

3. In the function (cos(x))^4, which function is the "outside" function?

4. Decompose sqrt(ln(x)) into inside and outside functions.

5. Why is it important to correctly identify the inside and outside functions before applying the chain rule?

### Common Misconceptions

- **Misconception**: The function written first (leftmost) is always the outside function.
  **Correction**: The outside function is the LAST operation you would perform when evaluating.

- **Misconception**: g(x) = x for simple expressions like sin(2x).
  **Correction**: The inside function is 2x, not x. The multiplication happens before the sine.

- **Misconception**: You need to simplify before decomposing.
  **Correction**: Decompose based on the structure as written.

### Extension Activities

- Challenge students to write their own composite functions and quiz partners
- Have students create a "composition tree" showing multiple levels of nesting
- Connect to chain rule applications: if you can decompose it, you can differentiate it

## Instructional Rationale

Active identification practice is essential before students can successfully apply the chain rule. The most common error in chain rule application is failing to correctly identify what constitutes the "inside" versus "outside" function. By providing:

- **Immediate feedback**: Students discover errors right away
- **Visual layer diagrams**: Abstract concepts become concrete
- **Progressive difficulty**: Students build confidence before tackling complex cases
- **Multiple representations**: Seeing the same structure in different functions builds pattern recognition

This MicroSim addresses the prerequisite skill that is often assumed but rarely explicitly taught.

## References

- [Chain Rule - Wikipedia](https://en.wikipedia.org/wiki/Chain_rule)
- [Function Composition - Khan Academy](https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:functions/x2ec2f6f830c9fb89:composing-functions/v/function-composition)
- [AP Calculus AB/BC Course Description - College Board](https://apcentral.collegeboard.org/courses/ap-calculus-ab)
