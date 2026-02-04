---
title: Multi-Rule Derivative Builder
description: An interactive step-by-step tool that shows how multiple derivative rules combine to differentiate complex functions, building procedural knowledge and metacognitive awareness.
quality_score: 92
image: /sims/multi-rule-builder/multi-rule-builder.png
og:image: /sims/multi-rule-builder/multi-rule-builder.png
twitter:image: /sims/multi-rule-builder/multi-rule-builder.png
social:
   cards: false
---
# Multi-Rule Derivative Builder

<iframe src="main.html" height="517" width="100%" scrolling="no"></iframe>

[Run the Multi-Rule Builder Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/multi-rule-builder/main.html" height="517" scrolling="no"></iframe>
```

## About This MicroSim

This interactive tool helps you see how multiple derivative rules work together when differentiating complex functions. Instead of trying to memorize one giant formula, you'll learn to break problems into smaller steps - exactly how mathematicians actually think about derivatives.

!!! quote "Delta Moment"
    "Every complex derivative is just a bunch of simple rules stacked together. It's like LEGO - you're not building one complicated piece, you're clicking together pieces you already know!"

## How to Use

1. **Select a function** from the dropdown menu (like x^2 sin(x) or e^x/x)
2. **Click "Next Step"** to advance through each rule application
3. **Watch the tree diagram** highlight which part of the function is being differentiated
4. **See the derivation panel** show the rule used and the partial result
5. **Click "Show All"** to reveal the complete derivation at once
6. **Click "Reset"** to start over with the same function

## What You'll Learn

- **Product Rule**: When you have f(x) times g(x)
- **Quotient Rule**: When you have f(x) divided by g(x)
- **Chain Rule**: When you have a composition like sin(x^2)
- **Power Rule**: For terms like x^n
- **Trigonometric Derivatives**: sin, cos, and friends
- **Exponential and Logarithmic Rules**: For e^x and ln(x)

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Identify** which derivative rules apply to a given function
2. **Apply** multiple rules in the correct sequence
3. **Execute** the complete differentiation of functions involving products, quotients, and compositions
4. **Verify** their work by checking each step

### Suggested Activities

**Activity 1: Predict Then Check (5 min)**

1. Select a function from the dropdown
2. Write down on paper which rules you think you'll need
3. Step through the MicroSim to check your prediction

**Activity 2: Work Along (10 min)**

1. Select "x^3 e^x" from the dropdown
2. On paper, write f(x) = x^3 e^x
3. As you click "Next Step", perform each calculation yourself
4. Compare your answer to the MicroSim's result

**Activity 3: Challenge Problems (15 min)**

Try differentiating these on paper first, then verify:

- x^2 sin(x) - uses Product Rule + Power Rule + Trig Rule
- e^x / x - uses Quotient Rule + Exp Rule + Power Rule
- sin(x^2) - uses Chain Rule + Trig Rule + Power Rule

### Assessment Ideas

- Have students explain why a particular rule was chosen at each step
- Ask students to create their own complex function and predict the steps needed
- Time how long it takes to differentiate functions before and after practice

## References

- [Product Rule - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-8/v/product-rule)
- [Quotient Rule - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-9/v/quotient-rule)
- [Chain Rule - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-2-new/ab-3-1a/v/chain-rule-introduction)
- Chapter 8: Basic Derivative Rules
- Chapter 9: Product, Quotient, and Transcendental Derivatives
- Chapter 10: The Chain Rule
