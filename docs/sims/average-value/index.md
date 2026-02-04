---
title: Average Value of a Function
description: Interactive visualization showing the average value of a function as the height of a rectangle with equal area to the region under the curve.
image: /sims/average-value/average-value.png
og:image: /sims/average-value/average-value.png
twitter:image: /sims/average-value/average-value.png
quality_score: 85
social:
   cards: false
---

# Average Value of a Function

<iframe src="main.html" height="612px" width="100%" scrolling="no"></iframe>

[Run Average Value Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/){ .md-button }

You can include this MicroSim on your website using the following iframe:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/average-value/main.html" height="612px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim visualizes the **average value of a function** over an interval [a, b]. The core idea is beautifully simple: if you could flatten the region under a curve into a rectangle with the same width, what height would that rectangle need to be? That height is the average value.

Formally, the average value is defined as:

$$f_{avg} = \frac{1}{b - a} \int_a^b f(x) \, dx$$

### What You See

The visualization progresses through three stages:

| Stage | What Appears | What It Shows |
|-------|-------------|---------------|
| Stage 1 | Shaded region under the curve | The actual area under f(x) from a to b |
| Stage 2 | Orange rectangle overlay | A rectangle with height = f_avg and width = b - a |
| Stage 3 | Numerical verification | Both areas displayed side-by-side to confirm they match |

### How to Use

1. **Select a function** from the dropdown menu (x^2, sin x, e^x, or sqrt(x))
2. **Adjust the interval** using the a and b sliders
3. **Click "Show Rectangle"** to reveal the average-value rectangle (Stage 2)
4. **Click "Animate Height"** to watch the rectangle grow from zero to f_avg
5. **Click "Verify Areas"** to see the numerical confirmation (Stage 3)
6. **Click "Reset"** to return to Stage 1

### Key Observations

- The average value rectangle always has the **same area** as the shaded region under the curve
- For increasing functions like e^x, the average value is below the midpoint of the range
- For symmetric functions like sin(x) on [0, pi], the average value reflects the symmetry
- Changing the interval endpoints changes both the area and the average value

!!! quote "Delta Moment"
    "Think about it like this: I rode my bike over a hilly road from point A to point B. The average value is the height of a perfectly flat road that would give me the exact same total elevation experience. Same trip, different terrain, same overall feel!"

### The Connection to the Mean Value Theorem for Integrals

The Mean Value Theorem for Integrals guarantees that for a continuous function f on [a, b], there exists at least one point c in (a, b) where:

$$f(c) = f_{avg} = \frac{1}{b - a} \int_a^b f(x) \, dx$$

This means the horizontal line at f_avg always intersects the curve at least once in the interval.

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Calculate** the average value of a function over an interval
2. **Interpret** the average value geometrically as a rectangle height
3. **Apply** the average value formula to different functions
4. **Connect** the concept to the Mean Value Theorem for Integrals

### Grade Level

High School (AP Calculus AB/BC) and Undergraduate Calculus I

### Duration

15-20 minutes for exploration; can be revisited when studying integration applications

### Prerequisites

Students should be familiar with:

- Definite integrals and the Fundamental Theorem of Calculus
- Area under a curve interpretation
- Basic antiderivatives

### Activities

#### Activity 1: Building Intuition (5 minutes)

1. Start with f(x) = x^2 on [0, 3]
2. Look at Stage 1: estimate what the "average height" might be
3. Click "Show Rectangle" and compare your guess
4. Ask: Is the average value closer to f(0) or f(3)? Why?

#### Activity 2: Comparing Functions (5 minutes)

1. Keep the interval [0, 3] fixed
2. Switch between all four functions
3. Record the average value for each
4. Discuss: Which function has the highest average? Lowest? Why?

#### Activity 3: Interval Effects (5 minutes)

1. Use f(x) = sin(x)
2. Set a = 0 and gradually increase b from 1 to pi
3. Watch how the average value changes
4. What happens at b = pi? At b = 2*pi?
5. Discuss: When is the average value of sin(x) equal to zero?

#### Activity 4: Verification and Proof (5 minutes)

1. For any function, go through all three stages
2. At Stage 3, verify the areas match
3. Try the animation to see the rectangle "find" its correct height
4. Discuss: Why must the areas always be equal?

### Discussion Questions

1. Why is the average value of f(x) = x^2 on [0, 3] not simply (f(0) + f(3))/2 = 4.5?
2. Can the average value of a function be larger than the maximum of the function on the interval? Why or why not?
3. How would you use the average value formula to find the average temperature over a day if temperature is modeled by a continuous function?
4. What is the geometric meaning of the Mean Value Theorem for Integrals?

### Assessment

**Quick Check:**
Calculate the average value of f(x) = 2x on [1, 4]:

1. Find the integral: integral from 1 to 4 of 2x dx = x^2 evaluated from 1 to 4 = 16 - 1 = 15
2. Divide by interval width: 15 / (4 - 1) = 5
3. Verify: f_avg = 5 (the midpoint of f(1) = 2 and f(4) = 8, which makes sense for a linear function!)

**Exit Ticket:**
A car's velocity is modeled by v(t) = t^2 + 1 (in mph) for 0 <= t <= 3 hours. What is the car's average velocity over this time period? What does this tell you about the trip?

### Common Misconceptions to Address

| Misconception | Clarification |
|--------------|---------------|
| "Average value = (f(a) + f(b))/2" | This only works for linear functions. For curved functions, the integral captures the full shape. |
| "The average value is always in the middle of the range" | The average value depends on the shape of the curve, not just the endpoints. |
| "Average value = average of sample points" | While sampling can approximate it, the true average comes from the integral, which accounts for every point. |

## References

1. [Average Value of a Function - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab) - Video explanations and practice problems

2. [Mean Value Theorem for Integrals - Paul's Online Math Notes](https://tutorial.math.lamar.edu/Classes/CalcI/AvgFcnValue.aspx) - Detailed theoretical treatment

3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used in this visualization
