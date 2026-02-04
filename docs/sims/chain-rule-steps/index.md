---
title: Chain Rule Steps
description: Interactive step-by-step guide to applying the chain rule for differentiating composite functions with color-coded visualization of inside and outside functions.
image: /sims/chain-rule-steps/chain-rule-steps.png
og:image: /sims/chain-rule-steps/chain-rule-steps.png
twitter:image: /sims/chain-rule-steps/chain-rule-steps.png
quality_score: 85
social:
   cards: false
---

# Chain Rule Steps

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run Chain Rule Steps Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/chain-rule-steps/main.html" height="542px" width="100%" scrolling="no"></iframe>
```

## Description

The Chain Rule Steps MicroSim breaks down the chain rule into five explicit steps, helping students internalize the systematic procedure for differentiating composite functions. Each step is revealed sequentially with color-coded highlighting that distinguishes the inside function (orange) from the outside function (blue).

### The Chain Rule

For a composite function f(g(x)), the chain rule states:

$$\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$$

Or in words: "The derivative of the outside (keeping the inside unchanged) times the derivative of the inside."

### How to Use

1. **Select a difficulty level**: Choose from Basic, Intermediate, or Advanced
2. **Pick a function**: Click one of the four preset functions at your chosen difficulty
3. **Step through the process**: Click "Next Step" to reveal each step of the chain rule
4. **Or show all at once**: Click "Show All" to see the complete solution immediately
5. **Reset and try another**: Click "Reset" to start over with the same function, or select a new one

### The Five Steps

| Step | Action | Example with sin(2x) |
|------|--------|----------------------|
| 1 | Identify inside and outside functions | Inside: 2x, Outside: sin(u) |
| 2 | Differentiate outside, keep inside | cos(2x) |
| 3 | Differentiate inside | 2 |
| 4 | Multiply results | cos(2x) * 2 |
| 5 | Simplify | 2cos(2x) |

### Visual Features

- **Color coding**: Orange highlights the inside function, blue highlights the outside function
- **Animated progression**: Steps fade in smoothly as you advance
- **Current step highlighting**: A pulsing border shows which step you're on
- **Animated arrow**: Points to the next step to reveal

!!! quote "Delta Moment"
    "The chain rule used to terrify me until I learned to break it down. Now I think of it as: 'Outside derivative first, then multiply by the inside derivative.' It's like a two-step dance - outside, inside, done!"

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Apply** the chain rule systematically to differentiate composite functions
2. **Identify** the inside and outside functions in a composite function
3. **Execute** the five-step procedure for any chain rule problem
4. **Implement** the chain rule across various function types (trig, exponential, polynomial)

### Grade Level

High School (AP Calculus AB/BC) and Undergraduate Calculus I

### Duration

15-20 minutes for initial exploration; can be revisited for practice

### Prerequisites

Students should be familiar with:

- Basic derivative rules (power rule, constant multiple rule)
- Derivatives of trigonometric functions
- Derivatives of exponential and logarithmic functions
- The concept of composite functions (function composition)

### Activities

#### Activity 1: Pattern Recognition (5 minutes)

Work through all four Basic functions:

1. sin(2x)
2. (x^2)^3
3. e^(3x)
4. cos(5x)

For each, identify what's similar about the "inside function" - they're all simple expressions.

#### Activity 2: Building Complexity (10 minutes)

Move to Intermediate difficulty and work through:

1. sin(x^2) - Notice the inside is now a function, not just a constant times x
2. (3x+1)^4 - The inside is a linear expression
3. sqrt(x^2+1) - Practice with radical functions
4. ln(2x+3) - Apply to logarithms

Compare Step 5 simplifications - which require more algebraic work?

#### Activity 3: Challenge Problems (5 minutes)

Try the Advanced functions:

1. e^(sin(x)) - Chain rule with exponential and trig
2. sin^2(x) - Recognize this as [sin(x)]^2
3. tan(x^3) - Chain rule with tangent
4. ln(cos(x)) - Composition of logarithm and trig

### Discussion Questions

1. Why do we call it the "chain" rule? (Answer: Because we chain together the derivatives in a specific order)
2. What happens if you forget to multiply by the inside derivative? (Answer: You get an incorrect answer - it's a common error!)
3. When would you need to apply the chain rule twice? (Answer: For compositions like sin(e^(x^2)))

### Assessment

**Quick Check:**
Without using the MicroSim, identify the inside and outside functions for:

1. cos(x^3)
2. (2x-1)^5
3. e^(tan(x))

**Exit Ticket:**
Find d/dx[ln(x^2 + 1)] and show all five steps of your work.

### Common Mistakes to Address

| Mistake | Example | Correction |
|---------|---------|------------|
| Forgetting the inside derivative | d/dx[sin(3x)] = cos(3x) | Must be cos(3x) * 3 = 3cos(3x) |
| Wrong order of operations | Writing derivative of inside first | Always: outside derivative first (with inside unchanged), then multiply by inside derivative |
| Not simplifying | Leaving answer as cos(x^2) * 2x | Rewrite as 2x*cos(x^2) for standard form |

## References

1. [Chain Rule - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-2-new/ab-3-1a/a/chain-rule-review) - Video explanations and practice problems

2. [Chain Rule - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/ChainRule.aspx) - Detailed derivation and examples

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this visualization
