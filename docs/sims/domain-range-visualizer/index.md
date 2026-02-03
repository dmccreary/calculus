---
title: Domain and Range Visualizer
description: An interactive MicroSim that helps students interpret domain and range graphically by showing function graphs with highlighted number lines.
image: /sims/domain-range-visualizer/domain-range-visualizer.png
og:image: /sims/domain-range-visualizer/domain-range-visualizer.png
twitter:image: /sims/domain-range-visualizer/domain-range-visualizer.png
quality_score: 85
social:
   cards: false
---

# Domain and Range Visualizer

<iframe src="main.html" height="487px" width="100%" scrolling="no" style="border: none;"></iframe>

[Run the Domain and Range Visualizer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

## About This MicroSim

This interactive visualization helps students understand the domain and range of functions by showing:

- A **coordinate plane** with the function graphed
- A **horizontal number line** below the graph showing the **domain** (valid x-values) highlighted in green
- A **vertical number line** to the left showing the **range** (possible y-values) highlighted in blue
- An **x-value slider** that moves a point along the curve, highlighting corresponding positions on both number lines

### Functions Included

| Function | Domain | Range |
|----------|--------|-------|
| f(x) = x² | All real numbers | y ≥ 0 |
| f(x) = √x | x ≥ 0 | y ≥ 0 |
| f(x) = 1/x | x ≠ 0 | y ≠ 0 |
| f(x) = sin(x) | All real numbers | −1 ≤ y ≤ 1 |

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/domain-range-visualizer/main.html"
        height="487px"
        width="100%"
        scrolling="no"
        style="border: none;">
</iframe>
```

## Lesson Plan

### Learning Objective

Students will interpret domain and range graphically, connecting algebraic restrictions to visual representations on the coordinate plane.

**Bloom's Taxonomy Level:** Understand (L2)
**Bloom's Verb:** Interpret

### Grade Level

High School (Grades 10-12) - AP Calculus preparation

### Duration

10-15 minutes

### Prerequisites

- Understanding of function notation
- Familiarity with graphing on the coordinate plane
- Basic knowledge of function types (quadratic, radical, rational, trigonometric)

### Activities

#### Activity 1: Guided Exploration (5 minutes)

1. Start with f(x) = x²
2. Ask students: "Why can you put any x-value into this function?"
3. Ask students: "Why can't the output ever be negative?"
4. Have students hover over the graph and watch the domain/range lines highlight

#### Activity 2: Domain Restrictions (5 minutes)

1. Switch to f(x) = √x
2. Ask: "What happens if you try to find √(-4)? Why isn't negative x in the domain?"
3. Switch to f(x) = 1/x
4. Ask: "What happens when x = 0? Why is there a 'hole' in the domain?"

#### Activity 3: Bounded Range (5 minutes)

1. Switch to f(x) = sin(x)
2. Ask: "No matter what x we choose, what's the highest y can be? The lowest?"
3. Discuss how the range is bounded even though the domain is all real numbers

### Discussion Questions

1. How does the graph tell you about domain restrictions?
2. What visual features indicate range boundaries?
3. For f(x) = 1/x, why are both the domain and range missing the value 0?

### Assessment

Ask students to predict the domain and range of a new function (e.g., f(x) = 1/(x-2)) before graphing it. Have them explain their reasoning using what they learned from the visualizer.

## References

- [Khan Academy: Domain and Range](https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions/x2f8bb11595b61c86:domain-and-range/v/domain-and-range-of-a-function)
- [p5.js Reference](https://p5js.org/reference/)
