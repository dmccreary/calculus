---
title: Function Machine
description: An interactive MicroSim demonstrating how functions process inputs to produce exactly one output, reinforcing the fundamental definition of a function.
quality_score: 85
image: /sims/function-machine/function-machine.png
og:image: /sims/function-machine/function-machine.png
twitter:image: /sims/function-machine/function-machine.png
social:
   cards: false
---
# Function Machine

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Function Machine MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Function Machine MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

The Function Machine visualizes how a mathematical function works: you feed in an input value, the machine applies a rule (the function), and exactly one output emerges. This "one input, one output" property is the defining characteristic of a function.

## How to Use

1. **Set the Input**: Use the slider to choose an input value from -10 to 10
2. **Select a Function**: Click one of the function buttons (2x, x², |x|, or sin)
3. **Process**: Click "Process" to watch the input flow through the machine
4. **Observe**: Watch the calculation displayed inside the machine and the output that emerges
5. **Explore**: The history table tracks your last 5 input-output pairs

## Embedding

Place the following line in your website to include this MicroSim:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/function-machine/main.html" height="482px" width="100%" scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will explain how a function processes inputs to produce outputs, demonstrating the "one input, one output" rule.

### Bloom's Taxonomy Level

**Understand (L2)** - Students interpret and explain the concept of a function as a rule that assigns exactly one output to each input.

### Warm-Up Activity (5 minutes)

Ask students: "If I tell you a mystery number machine doubles every number you put in, what comes out when you put in 5? What about -3?"

### Guided Exploration (10 minutes)

1. Start with f(x) = 2x selected
2. Process several inputs: 0, 1, 5, -3
3. Ask: "What pattern do you notice in the history table?"
4. Switch to f(x) = x² and repeat with the same inputs
5. Ask: "Why does -3 give the same output as 3 for x²?"

### Key Questions for Discussion

- Can you find any input that gives more than one output? Why not?
- For f(x) = |x|, which inputs give the same output?
- For f(x) = sin(x), what's special about input 0?

### Independent Practice

Have students:
1. Predict the output before pressing "Process"
2. Test their prediction
3. Record any surprising results

### Assessment

Students demonstrate understanding by:
- Explaining why every function input produces exactly one output
- Predicting outputs for untested inputs
- Identifying which functions give different/same outputs for positive and negative inputs

## References

- [Function (mathematics) - Wikipedia](https://en.wikipedia.org/wiki/Function_(mathematics))
- [Khan Academy: What is a function?](https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:functions/x2f8bb11595b61c86:evaluating-functions/v/what-is-a-function)
