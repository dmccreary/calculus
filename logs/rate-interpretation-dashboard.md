# Rate Interpretation Dashboard MicroSim Generation Log

## Generation Details

- **Start Time**: 2026-02-04 00:15:10
- **End Time**: 2026-02-04 00:18:25
- **Duration**: ~3 minutes 15 seconds
- **Generator**: Claude Opus 4.5
- **Skill Used**: microsim-generator (manual implementation)

## MicroSim Specification

- **Name**: rate-interpretation-dashboard
- **Purpose**: Interpret derivative values in context by connecting numerical rates to physical meaning
- **Learning Objective**: Students will interpret derivative values in context by connecting numerical rates to physical meaning (Bloom Level 4: Analyze)
- **Bloom Taxonomy**: Analyze (Level 4)
- **Bloom Verbs**: interpret, analyze, connect
- **Library**: p5.js

## Files Generated

| File | Description | Lines |
|------|-------------|-------|
| `script.js` | Main p5.js simulation code | ~530 |
| `main.html` | Standalone HTML wrapper | 21 |
| `index.md` | MkDocs lesson plan page | ~180 |
| `metadata.json` | Dublin Core metadata | 52 |

## Features Implemented

### Visual Elements
- [x] Multiple context scenarios (population, temperature, economics, medicine)
- [x] Graph showing function with tangent line at selected point
- [x] Dashboard displaying: derivative value, units, verbal interpretation
- [x] Animated "what happens next" prediction based on derivative
- [x] Sign indicator (increasing/decreasing arrow)

### Interactive Controls
- [x] Context selector dropdown (Population Growth, Cooling Coffee, Drug Concentration, Stock Price)
- [x] Time slider to select point where derivative is evaluated
- [x] Toggle for "Show tangent line"
- [x] Toggle for "Show rate interpretation"
- [x] Button for "Predict next value" (linear approximation)

### Behavior
- [x] Derivative value updates as time changes
- [x] Verbal interpretation changes with sign and context
- [x] Prediction shows approximate next value using linear approximation
- [x] Units always displayed prominently

## Context Functions

| Context | Function | Derivative | Units |
|---------|----------|------------|-------|
| Population Growth | P(t) = 50 + 30 ln(1+t) | P'(t) = 30/(1+t) | thousand/year |
| Cooling Coffee | T(t) = 70 + 110 e^(-0.15t) | T'(t) = -16.5 e^(-0.15t) | F/min |
| Drug Concentration | C(t) = 100t e^(-0.5t) | C'(t) = 100 e^(-0.5t)(1-0.5t) | mg/L per hour |
| Stock Price | S(t) = 100 + 20 sin(0.5t) + 5t | S'(t) = 10 cos(0.5t) + 5 | $/month |

## Testing Notes

- Canvas dimensions: 800x520 (responsive width)
- Drawing height: 420px
- Control height: 100px
- Total iframe height recommendation: 522px

## Instructional Design Notes

The MicroSim emphasizes:

1. **Context matters**: The same derivative value means different things in different contexts
2. **Units are essential**: Rate of change must include proper units (change in Y per unit of X)
3. **Sign indicates direction**: Positive = increasing, negative = decreasing
4. **Magnitude indicates speed**: Larger absolute values = faster change
5. **Linear approximation**: Derivatives can predict short-term behavior

## Known Considerations

- Uses p5.js DOM elements (createSelect, createSlider, createButton) for consistency with existing codebase
- Responsive width adjusts graph and dashboard panels proportionally
- Verbal interpretations are context-specific and update with rate sign/magnitude
