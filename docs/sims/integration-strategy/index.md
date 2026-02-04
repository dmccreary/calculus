---
title: Integration Strategy Decision Flowchart
description: An interactive decision tree that guides students through choosing the right integration technique based on the structure of the integrand.
quality_score: 90
image: /sims/integration-strategy/integration-strategy.png
og:image: /sims/integration-strategy/integration-strategy.png
twitter:image: /sims/integration-strategy/integration-strategy.png
social:
   cards: false
---
# Integration Strategy Decision Flowchart

<iframe src="main.html" height="520px" width="100%" scrolling="no"></iframe>

[Run the Integration Strategy Flowchart Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Facing a new integral can feel overwhelming -- there are so many techniques, and picking the wrong one wastes precious time. This interactive decision flowchart turns technique selection from a guessing game into a systematic process. Start at the top and answer each question about the integrand to arrive at the right strategy.

The flowchart is color-coded by technique family:

- **Green** -- Basic antiderivative rules (power rule, trig, exponential)
- **Blue** -- Substitution-based techniques (u-substitution, completing the square)
- **Orange** -- Algebraic manipulation (simplify first, long division, partial fractions)
- **Yellow diamonds** -- Decision points

## How to Use

1. **Hover** over any node to see an explanation in the side panel
2. **Click** an action node (colored rectangle) to see a worked example and highlight the path from start to that technique
3. **Mini-Quiz** button launches a 5-question quiz -- given an integral, click the correct technique node
4. **Reset** clears highlighting and returns to the default view

## Decision Nodes

| # | Question | If Yes |
|---|----------|--------|
| 1 | Is it a basic antiderivative form? | Apply the matching rule directly |
| 2 | Can you simplify algebraically? | Rewrite first, then integrate |
| 3 | Do you see a function and its derivative? | u-substitution |
| 4 | Is it a rational function P(x)/Q(x)? | Long division or partial fractions |
| 5 | Is there a quadratic expression inside? | Complete the square |

If none of the above apply, consider techniques from later chapters (integration by parts, trig substitution) or numerical methods.

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. **Evaluate** the structure of an integrand to determine the best integration technique (Bloom Level 5)
2. **Select** the appropriate method from the available techniques
3. **Judge** whether an integral requires algebraic simplification before applying a rule

### Suggested Activities

**Introduction (5 min)**

- Display the flowchart and walk through the five decision questions
- Emphasize that the order matters: always check the simplest options first

**Guided Practice (10 min)**

- Click through each action node to show the worked examples
- Discuss how each example matches the decision criteria
- Point out the path highlighting to reinforce the decision sequence

**Independent Practice (10 min)**

- Have students take the Mini-Quiz
- For each question, students should trace the path on the flowchart before clicking their answer
- Discuss any questions that students found tricky

**Extension**

- Give students a worksheet of 10 integrals and have them classify each one using the flowchart before attempting to solve
- Students create their own quiz questions for classmates

### Common Misconceptions

- Jumping straight to u-substitution without first checking if the integral is a basic form
- Forgetting to check if algebraic simplification (splitting fractions, expanding) makes the problem trivial
- Attempting partial fractions when the degree of the numerator is greater than or equal to the denominator (long division first!)

## Embed This MicroSim

```html
<iframe src="https://dmccreary.github.io/calculus/sims/integration-strategy/main.html" height="520px" width="100%" scrolling="no"></iframe>
```

## References

- [AP Calculus AB: Integration Techniques](https://apstudents.collegeboard.org/courses/ap-calculus-ab)
- Stewart, J. (2015). *Calculus: Early Transcendentals* (8th ed.). Cengage Learning. Chapter 7.5.
