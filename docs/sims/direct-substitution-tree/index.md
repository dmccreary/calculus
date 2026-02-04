---
title: Direct Substitution Decision Tree
description: Interactive flowchart guiding students through the decision process for evaluating limits
image: /sims/direct-substitution-tree/direct-substitution-tree.png
---

# Direct Substitution Decision Tree

<iframe src="main.html" height="400px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive decision tree guides students through the systematic process of evaluating limits. It shows when direct substitution works and what to do when it produces indeterminate forms.

### The Process

1. **Start**: Given any limit $\lim_{x \to c} f(x)$
2. **Try substitution**: Calculate f(c)
3. **Check the result**:
   - Real number → That's the limit!
   - 0/0 → Use algebraic techniques (factoring, rationalization)
   - nonzero/0 → Investigate infinite limits
   - Other forms → Apply advanced techniques

## How to Use

Hover over any node in the flowchart to see detailed information in the info panel on the right. Each step explains what to do and why.

### Color Coding

- **Purple (Start)**: Where every limit problem begins
- **Green**: Process steps and success
- **Yellow**: Decision points requiring evaluation
- **Orange**: Algebraic techniques needed
- **Red**: Infinite limit investigation needed

## Lesson Plan

### Learning Objectives

After using this MicroSim, students will be able to:

1. Apply a systematic approach to evaluating limits
2. Recognize when direct substitution works vs. fails
3. Identify the appropriate technique based on the result of substitution

### Suggested Activities

1. **Trace Problems**: Given specific limits, trace through the flowchart to determine the approach
2. **Classify Results**: Given substitution results (like 0/0 or 5/0), identify the next step
3. **Create Examples**: Write limits that follow each path through the flowchart

### Assessment Questions

1. What does it mean when direct substitution gives you 0/0?
2. When can you conclude the limit equals f(c)?
3. What should you investigate when substitution gives 3/0?

## Embedding

```html
<iframe src="https://dmccreary.github.io/calculus/sims/direct-substitution-tree/main.html"
        height="400px" width="100%" scrolling="no"></iframe>
```
