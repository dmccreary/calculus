---
title: L'Hospital's Rule Visualizer
description: Interactive visualization showing how L'Hospital's Rule transforms indeterminate limits by comparing the original ratio with the ratio of derivatives.
image: /sims/lhospitals-rule-visualizer/lhospitals-rule-visualizer.png
og:image: /sims/lhospitals-rule-visualizer/lhospitals-rule-visualizer.png
twitter:image: /sims/lhospitals-rule-visualizer/lhospitals-rule-visualizer.png
quality_score: 85
social:
   cards: false
---

# L'Hospital's Rule Visualizer

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run L'Hospital's Rule Visualizer in Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/lhospitals-rule-visualizer/main.html" height="582px" width="100%" scrolling="no"></iframe>
```

## Description

L'Hospital's Rule is a powerful technique for evaluating limits that result in indeterminate forms like 0/0 or infinity/infinity. This interactive visualization demonstrates **why the rule works** by showing that both the original ratio f(x)/g(x) and the derivative ratio f'(x)/g'(x) approach the same limit.

!!! quote "Delta Moment"
    "When I see 0/0, I used to panic. But L'Hospital's Rule is like having X-ray vision! Instead of looking at f(x)/g(x) directly, I peek at f'(x)/g'(x) and they both take me to the same destination. It's like two different paths up the same mountain!"

### How to Use

1. **X Slider**: Drag to move the point closer to or farther from the target value
2. **Example Selector**: Click to cycle through different indeterminate limit examples
3. **View Toggle**: Switch between showing "Both" graphs, "Original" ratio only, or "Derivatives" ratio only
4. **Animate Button**: Watch the point automatically approach the target value

### What You See

- **Top Graph (Blue)**: The original ratio f(x)/g(x) with a hole at the target x-value
- **Bottom Graph (Orange)**: The derivative ratio f'(x)/g'(x) which is defined at the target
- **Green Dashed Line**: The limit value L that both ratios approach
- **Connection Arrow**: Shows that both ratios converge to the same limit
- **Info Panel**: Real-time calculations showing both ratios converging

### The Key Insight

For a 0/0 indeterminate form at x = a:

$$\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}$$

The original ratio has a hole (undefined) at x = a, but the derivative ratio often exists there. Both approach the same value as x approaches a, which is why L'Hospital's Rule works!

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. Recognize when L'Hospital's Rule applies (indeterminate forms 0/0 or infinity/infinity)
2. Illustrate graphically why the rule produces the correct limit
3. Apply L'Hospital's Rule to evaluate limits
4. Explain the connection between the original ratio and derivative ratio limits

### Target Audience

- AP Calculus students (Grades 11-12)
- College calculus students
- Anyone learning techniques for evaluating limits

### Prerequisites

- Understanding of limits and limit notation
- Familiarity with derivatives
- Knowledge of indeterminate forms

### Activities

**Activity 1: Visual Discovery (5 minutes)**

1. Start with the sin(x)/x example (default)
2. Use the slider to move x closer to 0
3. Observe both the blue and orange curves
4. Notice: The blue curve has a hole at x = 0, but the orange curve passes through that point!
5. What value do both ratios approach?

**Activity 2: Comparing Examples (10 minutes)**

1. Click through all four examples
2. For each, identify:
   - What makes the original ratio undefined at the target?
   - What is the derivative ratio value at the target?
   - What is the common limit?
3. Why does the derivative ratio "resolve" the indeterminate form?

**Activity 3: Animation Analysis (5 minutes)**

1. Select the (e^x - 1)/x example
2. Click "Animate" and watch the approach
3. Notice how both ratio values (shown in the info panel) converge
4. Try stopping at various points to see intermediate values

**Activity 4: View Mode Exploration (5 minutes)**

1. Toggle between "Both", "Original", and "Derivatives" views
2. When viewing only the derivatives ratio, notice it's continuous
3. When viewing only the original ratio, notice the hole
4. Together, they reveal why L'Hospital's Rule works!

### Assessment Questions

1. For $\lim_{x \to 0} \frac{\sin x}{x}$, what are f(x), g(x), f'(x), and g'(x)?

2. Why can't we just substitute x = 0 into $\frac{\sin x}{x}$?

3. Using L'Hospital's Rule, evaluate $\lim_{x \to 0} \frac{e^x - 1}{x}$. Show your work.

4. The limit $\lim_{x \to 2} \frac{x^2 - 4}{x - 2}$ equals 4. Explain graphically why this is true using both the algebraic approach and L'Hospital's Rule.

5. When does L'Hospital's Rule **not** apply? Give an example.

### Common Misconceptions

- **Misconception**: L'Hospital's Rule can be used for any limit.
  **Reality**: It only applies to indeterminate forms 0/0 or infinity/infinity.

- **Misconception**: Taking the derivative of the quotient.
  **Reality**: We take the derivative of numerator AND denominator **separately**, not using the quotient rule.

- **Misconception**: One application always gives the answer.
  **Reality**: Sometimes multiple applications are needed.

## Theoretical Background

L'Hospital's Rule states that if:

1. $\lim_{x \to a} f(x) = \lim_{x \to a} g(x) = 0$ (or both approach infinity)
2. $g'(x) \neq 0$ near a (except possibly at a)
3. $\lim_{x \to a} \frac{f'(x)}{g'(x)}$ exists (or is infinity)

Then:

$$\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}$$

The geometric intuition is that near x = a, f(x) behaves like its tangent line approximation: f(x) is approximately f(a) + f'(a)(x-a). Since f(a) = 0 for a 0/0 form, f(x) is approximately f'(a)(x-a), and similarly g(x) is approximately g'(a)(x-a). The ratio then simplifies to f'(a)/g'(a).

## References

1. [L'Hospital's Rule - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-contextual-applications-new/ab-4-7/a/lhopitals-rule-review) - Comprehensive review with examples

2. [Paul's Online Math Notes - L'Hospital's Rule](https://tutorial.math.lamar.edu/Classes/CalcI/LHospitalsRule.aspx) - Detailed explanations and worked examples

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to create this visualization
