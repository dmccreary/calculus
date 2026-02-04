---
title: Differentiation Rule Selector
description: An interactive decision tree that helps students choose the appropriate differentiation rule by evaluating function structure through guided questions.
image: /sims/rule-selector/rule-selector.png
og:image: /sims/rule-selector/rule-selector.png
twitter:image: /sims/rule-selector/rule-selector.png
quality_score: 85
social:
   cards: false
---

# Differentiation Rule Selector

<iframe src="main.html" height="542px" width="100%" scrolling="no"></iframe>

[Run the Rule Selector MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the Rule Selector MicroSim with the p5.js editor](https://editor.p5js.org/)

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/rule-selector/main.html"
        height="542px"
        width="100%"
        scrolling="no">
</iframe>
```

## Description

This interactive decision tree helps students develop metacognitive awareness when selecting differentiation techniques. Instead of blindly applying rules, students learn to systematically evaluate the structure of a function to determine the most efficient differentiation approach.

### How It Works

1. **Start at the top** with a function you want to differentiate
2. **Answer Yes or No** to each question about the function's structure
3. **Follow the highlighted path** through the decision tree
4. **Arrive at the appropriate rule** with formula and example

### Decision Tree Logic

The tree guides students through these key questions:

| Question | If Yes | If No |
|----------|--------|-------|
| Is it a single term (no + or -)? | Check if it's power form | Check for sum/difference |
| Is it cx^n form? | Use Power Rule | Check for composition |
| Is it a sum/difference? | Use Sum/Difference Rule | Check for product |
| Is it a composition f(g(x))? | Use Chain Rule | Use special function rules |
| Is it a product of functions? | Use Product Rule | Use Quotient Rule |

### Visual Features

- **Pulsing current node** shows where you are in the decision process
- **Highlighted path** traces your choices through the tree
- **Color-coded terminal nodes** distinguish different rules
- **Info panel** shows examples and formulas for the current rule

!!! quote "Delta Moment"
    "Before I roll down any curve, I need to know what I'm dealing with. Is it a simple slope? A product of terrains? This decision tree is like my GPS for derivatives - it helps me choose the right tool before I start calculating!"

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Evaluate** function structure to identify appropriate differentiation techniques
2. **Select** the most efficient rule from Power, Sum/Difference, Product, Quotient, and Chain rules
3. **Justify** their rule selection based on function characteristics

### Grade Level

High School (AP Calculus AB/BC) and Undergraduate Calculus I

### Duration

15-20 minutes for introduction; can be used repeatedly as a reference tool

### Prerequisites

Students should be familiar with:

- Basic derivative rules (power, constant multiple)
- Sum and difference rules
- Product and quotient rules
- Chain rule
- Special function derivatives (trig, exponential, logarithmic)

### Activities

#### Activity 1: Guided Exploration (10 minutes)

Have students work through these functions using the decision tree:

1. f(x) = 5x^3 (Power Rule)
2. f(x) = x^2 + 3x - 7 (Sum/Difference Rule)
3. f(x) = x^2 sin(x) (Product Rule)
4. f(x) = sin(x^2) (Chain Rule)
5. f(x) = x/(x+1) (Quotient Rule)

#### Activity 2: Rule Justification (10 minutes)

For each function below, have students:
1. Use the decision tree to find the rule
2. Write down the path they took (e.g., "Q1(N) -> Q2(Y) -> Sum Rule")
3. Explain WHY each answer led them down that path

| Function | Expected Rule |
|----------|---------------|
| (2x+1)^4 | Chain Rule |
| e^x cos(x) | Product Rule |
| 4x^{-2} + 3x | Sum Rule, then Power Rule |
| tan(x)/x | Quotient Rule |

#### Activity 3: Create Your Own (5 minutes)

Students create one function for each terminal rule and verify using the decision tree.

### Assessment

**Quick Check Questions:**

1. What is the FIRST question you should ask about any function before differentiating?
2. How do you distinguish between when to use Product Rule vs. Chain Rule?
3. Why is identifying "single term" vs "multiple terms" the first decision point?

**Exit Ticket:**

Given f(x) = x^2 e^{3x}, trace through the decision tree and explain each choice. Then compute the derivative.

### Differentiation Strategies

- **For struggling students**: Start with simpler functions that clearly fit one category
- **For advanced students**: Present functions that require multiple rules (e.g., chain + product)

## References

- [AP Calculus AB/BC Course Description](https://apcentral.collegeboard.org/courses/ap-calculus-ab)
- [Paul's Online Math Notes - Differentiation Formulas](https://tutorial.math.lamar.edu/classes/calci/diffformulas.aspx)
- [Khan Academy - Derivative Rules](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new)
