---
title: Rate Interpretation Dashboard
description: Interactive dashboard for interpreting derivative values in context by connecting numerical rates to physical meaning across multiple real-world scenarios.
image: /sims/rate-interpretation-dashboard/rate-interpretation-dashboard.png
og:image: /sims/rate-interpretation-dashboard/rate-interpretation-dashboard.png
twitter:image: /sims/rate-interpretation-dashboard/rate-interpretation-dashboard.png
social:
   cards: false
---
# Rate Interpretation Dashboard

<iframe src="main.html" height="522px" width="100%" scrolling="no"></iframe>

[Run the Rate Interpretation Dashboard Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Rate Interpretation Dashboard with the p5.js editor](https://editor.p5js.org/)

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/rate-interpretation-dashboard/main.html" height="522px" scrolling="no"></iframe>
```

## Description

This MicroSim presents a comprehensive dashboard for understanding derivative values in real-world contexts. The derivative is not just a number - it tells a story about how quantities change, and that story changes depending on the context.

**Left Panel: Function Graph**
Shows the function with an optional tangent line at the current time point. The slope of this tangent line equals the derivative (rate of change).

**Right Panel: Rate Dashboard**
Displays the current derivative value prominently with:

- Current time and function value
- Large derivative value with proper units
- Direction indicator (increasing/decreasing arrow)
- Verbal interpretation of what the rate means in context
- Linear approximation prediction results

### Four Real-World Contexts

1. **Population Growth**: Logarithmic growth model showing how population increases rapidly at first, then slows as it approaches a carrying capacity. The derivative represents thousands of people per year.

2. **Cooling Coffee**: Newton's Law of Cooling showing exponential decay toward room temperature. The negative derivative represents degrees lost per minute.

3. **Drug Concentration**: Pharmacokinetic curve showing drug absorption then elimination. The derivative starts positive (absorption) then becomes negative (elimination).

4. **Stock Price**: Oscillating price with trend, showing how rates can be positive or negative over time.

!!! quote "Delta Moment"
    "Numbers without context are just... numbers. But -16.5? That's my coffee getting cold at 16.5 degrees per minute! Now THAT means something. The derivative tells the story."

## How to Use

1. **Select a Context**: Use the dropdown to switch between Population Growth, Cooling Coffee, Drug Concentration, and Stock Price
2. **Move the Time Slider**: Drag to see how the derivative changes at different points in time
3. **Toggle Tangent Line**: Show/hide the tangent line on the graph
4. **Toggle Interpretation**: Show/hide the verbal interpretation of the rate
5. **Predict Next**: Click to visualize the linear approximation and compare predicted vs. actual values

### Key Observations

- The same mathematical operation (derivative) has different physical meanings depending on context
- Units matter: "thousand people per year" vs. "degrees F per minute" vs. "mg/L per hour"
- The sign tells direction: positive means increasing, negative means decreasing
- The magnitude tells speed: larger absolute values mean faster change

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Interpret** derivative values with appropriate units in real-world contexts (Bloom Level 4: Analyze)
2. **Analyze** how the sign and magnitude of a derivative relate to the behavior of a quantity
3. **Connect** the graphical representation (tangent slope) to the numerical rate and verbal interpretation
4. **Predict** short-term behavior using linear approximation based on the derivative

### Bloom's Taxonomy Level

**Analyze (Level 4)**: Students must break down the derivative concept into its components (sign, magnitude, units) and interpret each component in context.

### Prerequisites

- Understanding of derivatives as rates of change
- Familiarity with tangent lines and their slopes
- Basic understanding of exponential and logarithmic functions

### Suggested Activities

**Activity 1: Context Translation (10 minutes)**
For each context, have students:

- Record the derivative value at t = 2
- Write a complete sentence interpreting what this number means
- Identify the units and explain why they make sense

**Activity 2: Sign Investigation (8 minutes)**
Switch to Drug Concentration context:

- Find the time where the derivative equals zero
- What is happening physically at this moment?
- What changes before and after this point?

**Activity 3: Prediction Practice (10 minutes)**
Using any context:

1. At time t, note the current value and derivative
2. Predict the value at t + small increment using linear approximation
3. Click "Predict Next" to compare with actual value
4. Discuss: When is the prediction good? When does it fail?

**Activity 4: Compare Contexts (7 minutes)**
Discussion questions:

- Which context has the largest derivative magnitude? Why?
- In which context does the derivative change sign?
- How do the units help you understand what the derivative measures?

### Assessment

**Formative Assessment**: Ask students to explain in their own words:

1. What does a derivative of -5.2 degrees F/min mean for cooling coffee?
2. If a drug's concentration rate is +8 mg/L per hour, is the drug being absorbed or eliminated?
3. Why might a stock price have a derivative of +$15/month one time and -$8/month another time?

**Summative Assessment**: Given a new context (e.g., water draining from a tank), students should be able to:

- Identify appropriate units for the derivative
- Interpret positive, negative, and zero derivative values
- Explain what the derivative tells us about the situation

### Common Misconceptions

1. **Confusing value and rate**: Students may confuse "the temperature is 150F" with "the temperature is changing at -10F/min"
2. **Ignoring units**: Students may report derivatives without proper units
3. **Sign confusion**: Students may forget that negative rates indicate decrease

### Time Required

20-25 minutes for full exploration and discussion

## Technical Notes

The functions used in each context are:

- **Population**: P(t) = 50 + 30 ln(1 + t) (logarithmic growth)
- **Coffee**: T(t) = 70 + 110 e^(-0.15t) (Newton's Law of Cooling)
- **Drug**: C(t) = 100t e^(-0.5t) (one-compartment pharmacokinetic model)
- **Stock**: S(t) = 100 + 20 sin(0.5t) + 5t (oscillation with trend)

## References

- [Khan Academy: Interpreting the meaning of the derivative in context](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-1-new/ab-2-7/v/interpreting-the-meaning-of-the-derivative-in-context)
- [AP Calculus AB: Interpreting the Derivative](https://apcentral.collegeboard.org/)
- Newton's Law of Cooling - Physics applications of calculus
- Pharmacokinetics - Mathematical modeling in medicine
