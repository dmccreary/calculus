# Logarithmic Differentiation MicroSim Generation Log

## Timestamps
- **Start:** 2026-02-04 00:15:10
- **End:** 2026-02-04 00:18:13
- **Duration:** ~3 minutes

## Specification

| Field | Value |
|-------|-------|
| Type | microsim |
| Name | logarithmic-differentiation |
| Purpose | Guide students through the logarithmic differentiation process with multiple examples |
| Learning Objective | Students will apply logarithmic differentiation to compute derivatives of complex products, quotients, and variable exponent functions (Bloom Level 3: Apply) |
| Bloom Taxonomy Verb | apply, calculate, solve |
| Implementation | p5.js with step-through animation |

## Visual Elements Implemented

- [x] Split screen: original function left, log form right
- [x] Step-by-step transformation showing each log property applied
- [x] Color coding: products in blue, quotients in red, powers in green
- [x] Final answer with simplification options

## Interactive Controls Implemented

- [x] Example selector: Products, Quotients, Powers, Variable Exponents
- [x] "Next Step" button to advance through derivation
- [x] "Why?" button at each step for explanation
- [x] "Try It" mode: Student selects which log property to apply
- [x] Reset button to restart current example

## Behavior Implemented

- [x] Each step highlights the transformation
- [x] Animated highlight effect on current step
- [x] Error feedback if wrong property selected in Try It mode
- [x] Multiple examples per category (2 examples each)

## Files Generated

| File | Description | Size |
|------|-------------|------|
| logarithmic-differentiation.js | Main p5.js script | ~18KB |
| main.html | Standalone HTML wrapper | 0.5KB |
| index.md | MkDocs lesson plan page | ~7KB |
| metadata.json | Dublin Core metadata | 0.9KB |

## Example Problems Included

### Products (2 examples)
1. y = x^2 (x+1)^3 (x+2)^4 - 6 steps
2. y = x(x+1)(x+2) - 4 steps

### Quotients (2 examples)
1. y = (x+1)^2 / (x+2)^3 - 5 steps
2. y = sqrt(x) / (x+1) - 5 steps

### Powers (2 examples)
1. y = (sin x)^x - 5 steps
2. y = x^(cos x) - 4 steps

### Variable Exponents (2 examples)
1. y = x^x - 5 steps (classic example)
2. y = (1+x)^(1/x) - 5 steps

## Features

1. **Step-by-step progression**: Students can advance at their own pace
2. **Why explanations**: Each step has a detailed explanation of the reasoning
3. **Try It mode**: Interactive quiz for steps involving log properties
4. **Color coding**: Visual distinction between product (blue), quotient (red), and power (green) rules
5. **Multiple categories**: Four types of problems to practice
6. **Animated highlights**: Current step is visually emphasized
7. **Canvas-based UI**: All controls drawn on canvas per project guidelines

## Technical Notes

- Uses canvas-based controls (no p5.js DOM functions)
- Responsive width with max 500px
- Equations displayed with word wrap for longer expressions
- Overlay panels for Why and Try It modes
- Legend shows color coding scheme

## Testing Checklist

- [ ] All category buttons work
- [ ] Next Step advances correctly
- [ ] Why button shows explanations
- [ ] Try It mode gives correct feedback
- [ ] Reset returns to step 0
- [ ] Responsive on narrow screens
- [ ] No DOM positioning issues in iframe
