---
title: Nested Chain Rule Unwrap
description: An interactive visualization of nested function differentiation using the chain rule, showing how to "peel the onion" layer by layer and build up the multiplication chain.
quality_score: 92
image: /sims/nested-chain-unwrap/nested-chain-unwrap.png
og:image: /sims/nested-chain-unwrap/nested-chain-unwrap.png
twitter:image: /sims/nested-chain-unwrap/nested-chain-unwrap.png
social:
   cards: false
---
# Nested Chain Rule Unwrap

<iframe src="main.html" height="617" width="100%" scrolling="no"></iframe>

[Run the Nested Chain Unwrap Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/nested-chain-unwrap/main.html" height="617" scrolling="no"></iframe>
```

## About This MicroSim

When you have functions nested inside functions inside more functions (like sin(e^(x^2))), the chain rule has to be applied multiple times. This MicroSim shows you how to "peel the onion" - starting from the outermost function and working your way in, collecting derivative factors as you go.

!!! quote "Delta Moment"
    "Think of nested functions like Russian nesting dolls. To find the derivative, I peel off each layer from outside to inside. Each time I peel, I multiply by that layer's derivative. It's like leaving breadcrumbs on my way to the center!"

## How to Use

1. **Select a nested function** from the dropdown menu
2. **Check the depth** - functions range from 2-layer (easier) to 3-layer (trickier)
3. **Click "Peel Layer"** to reveal the outermost derivative factor
4. **Keep peeling** to work your way to the innermost function
5. **Watch the chain grow** as each derivative factor multiplies the previous ones
6. **Click "Show All"** to reveal the complete solution at once
7. **Click "Reset"** to start fresh with the same function

## The Onion Metaphor

The visual shows nested functions as concentric rings:

- **Outer ring** = outermost function (like sin in sin(e^(x^2)))
- **Middle rings** = intermediate compositions
- **Inner core** = the innermost function (like x^2)

When differentiating, you peel from **outside to inside**, multiplying derivatives as you go.

## Understanding the Chain Rule for Nested Functions

For a function like f(g(h(x))), the chain rule gives us:

$$\frac{d}{dx}[f(g(h(x)))] = f'(g(h(x))) \cdot g'(h(x)) \cdot h'(x)$$

Notice the pattern:

- **Outer derivative** f' is evaluated at the whole inner expression
- **Middle derivative** g' is evaluated at its inner expression
- **Innermost derivative** h' is just with respect to x

Each "peel" reveals one factor in this multiplication chain.

## Example Walkthrough: sin(e^(x^2))

| Layer | Function | Derivative | Substituted |
|-------|----------|------------|-------------|
| 3 (outer) | sin(u) | cos(u) | cos(e^(x^2)) |
| 2 (middle) | e^v | e^v | e^(x^2) |
| 1 (inner) | x^2 | 2x | 2x |

**Final Answer:** cos(e^(x^2)) * e^(x^2) * 2x

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. **Identify** nested composite functions and count their depth
2. **Analyze** the structure of a nested function to determine the order of operations
3. **Apply** the chain rule repeatedly to differentiate deeply nested functions
4. **Construct** the complete derivative by multiplying the factors from each layer

### Bloom's Taxonomy Level

This MicroSim targets **Level 4: Analyze** - students must deconstruct complex nested functions into their component layers and understand how the parts combine.

### Suggested Activities

**Activity 1: Layer Counting (3 min)**

For each function below, count how many "layers" deep it goes:

- cos(x^3) - Answer: 2 layers
- sqrt(sin(2x)) - Answer: 3 layers
- e^(ln(x^2+1)) - Answer: 3 layers

**Activity 2: Predict the Chain (8 min)**

1. Select a 2-layer function from the dropdown
2. Before clicking "Peel Layer", write down what you think each factor will be
3. Peel through and check your predictions
4. Repeat with a 3-layer function

**Activity 3: Work Backwards (10 min)**

Given the derivative cos(x^2) * 2x, what was the original function?

- The 2x suggests the innermost function was x^2
- The cos(x^2) suggests the outer function was sin
- Original: sin(x^2)

Try this with other final answers from the MicroSim.

**Activity 4: Create Your Own (15 min)**

Create a 3-layer nested function and work through its derivative by hand using the onion method:

1. Choose three simple functions (trig, exponential, polynomial, etc.)
2. Nest them together
3. Apply chain rule layer by layer
4. Verify with the techniques shown in this MicroSim

### Common Mistakes to Watch For

- **Inside-out confusion**: Students often start differentiating from the inside. Remember: peel from the outside!
- **Forgetting to substitute back**: The outer derivative must be evaluated at the full inner expression
- **Missing multiplication**: Each layer contributes a factor - don't forget the dots between them!

### Assessment Ideas

- Have students verbally explain their thought process while peeling
- Give problems where students identify which layer is "next" to peel
- Ask students to create their own nested function and explain the chain rule process

## References

- [Chain Rule - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-2-new/ab-3-1a/v/chain-rule-introduction)
- [Nested Chain Rule Examples - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/ChainRule.aspx)
- Chapter 10: The Chain Rule
