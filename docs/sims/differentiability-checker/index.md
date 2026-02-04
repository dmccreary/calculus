---
title: Differentiability Checker
description: Step-through tool for checking differentiability at a point
---

# Differentiability Checker

<iframe src="main.html" width="100%" height="570px" scrolling="no" style="border: none; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"></iframe>

## About This MicroSim

This interactive tool guides you through the systematic process of checking whether a function is differentiable at a point.

### The Differentiability Checklist

1. **Is f(a) defined?** The function must have a value at the point
2. **Is f continuous at a?** The limit must equal the function value
3. **Compute f'₋(a)** - the left-hand derivative
4. **Compute f'₊(a)** - the right-hand derivative
5. **Are they equal and finite?** Both one-sided derivatives must match

### How to Use

1. **Select a function** from the preset buttons (A-E)
2. Click **"Step Through"** to advance one step at a time
3. Or click **"Auto Check"** to see all steps automatically
4. Watch the checklist populate with ✓ or ✗ for each step
5. See the **final verdict**: Differentiable or Not Differentiable (with reason)

### Test Functions

| Function | Type | Expected Result |
|----------|------|-----------------|
| f(x) = x² | Smooth | Differentiable |
| f(x) = \|x - 1\| | Corner | Not differentiable at x = 1 |
| f(x) = x^(2/3) | Cusp | Not differentiable at x = 0 |
| Jump function | Discontinuity | Not differentiable |
| f(x) = ∛x | Vertical tangent | Not differentiable at x = 0 |

### Learning Objectives

- Apply a systematic process to determine differentiability (Bloom Level 3: Apply)
- Identify the reason when differentiability fails

## Edit and Explore

[Edit this MicroSim in the p5.js Editor](https://editor.p5js.org/)
