---
title: Global vs Local Extrema Visualizer
description: Interactive MicroSim helping students distinguish between global and local maxima/minima on function graphs, with adjustable intervals and quiz mode.
quality_score: 92
image: /sims/extrema-types/extrema-types.png
og:image: /sims/extrema-types/extrema-types.png
twitter:image: /sims/extrema-types/extrema-types.png
social:
   cards: false
---
# Global vs Local Extrema Visualizer

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Global vs Local Extrema Visualizer Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit with the p5.js Editor](https://editor.p5js.org/)

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/extrema-types/main.html" height="602px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim helps students understand the crucial distinction between **global (absolute) extrema** and **local (relative) extrema** on a function graph. Understanding this distinction is fundamental to calculus optimization problems.

### Key Features

- **Multiple Function Types**: Choose from three different functions with varying extrema patterns:
  - Wavy Cubic: f(x) = x^3 - 3x + 1
  - Double Hump: f(x) = -x^4 + 4x^2 - 1
  - Sine Wave: f(x) = 2sin(x)

- **Visual Markers**: Different colored markers distinguish each type of extremum:
  - **Gold Star**: Global maximum
  - **Orange Circle**: Local maximum
  - **Blue Star**: Global minimum
  - **Light Blue Circle**: Local minimum

- **Adjustable Interval**: Two sliders let you change the domain [a, b] being considered. Watch how extrema classifications change as the interval narrows or widens!

- **Dashed Reference Lines**: Horizontal dashed lines at global extrema heights help visualize why these are the highest and lowest points.

- **Interactive Hover**: Hover over any marker to see its classification and exact coordinates.

- **Quiz Mode**: Test your understanding by clicking where you think extrema are located. Get immediate feedback on your classifications.

### Understanding the Concepts

**Global Extrema** (also called absolute extrema):
- The **global maximum** is the highest point on the entire interval
- The **global minimum** is the lowest point on the entire interval
- There can only be one global max value and one global min value (though they may occur at multiple x-values)

**Local Extrema** (also called relative extrema):
- A **local maximum** is higher than all nearby points
- A **local minimum** is lower than all nearby points
- A function can have many local extrema

**Key Insight**: When you change the interval, global extrema may change while local extrema stay the same (as long as they remain in the interval). This demonstrates why the domain matters for optimization problems!

!!! quote "Delta Moment"
    "See that peak? From where I'm standing, it looks like the highest point around. But zoom out and... whoa, there's an even taller peak! That's the difference between local and global. It's all about perspective!"

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Classify** extrema as global or local based on their position relative to other points (Bloom Level 4: Analyze)
2. **Distinguish** between global maximum, local maximum, global minimum, and local minimum
3. **Compare** how extrema classifications change when the interval is modified
4. **Predict** which points will become global extrema when the interval changes

### Target Audience

- AP Calculus AB/BC students
- College Calculus I students
- Prerequisites: Understanding of what maximum and minimum mean, basic function graphing

### Suggested Activities

**Activity 1: Exploration (5 minutes)**

1. Start with the "Wavy Cubic" function
2. Identify all the extrema on the default interval
3. Hover over each marker to verify your classifications

**Activity 2: Interval Investigation (10 minutes)**

1. Slowly narrow the interval from the left (increase a)
2. Observe: When does a local extremum become a global extremum?
3. Observe: When does an endpoint become a global extremum?
4. Discuss: Why do we need to check endpoints when finding global extrema on closed intervals?

**Activity 3: Function Comparison (8 minutes)**

1. Switch between all three functions
2. Count the local vs global extrema on each
3. Discuss: How does the function shape affect the number of extrema?

**Activity 4: Quiz Challenge (10 minutes)**

1. Enter Quiz Mode
2. For each function, click where you think all extrema are located
3. Compare your mental classifications with the actual markers
4. Clear and retry to improve accuracy

### Discussion Questions

1. Can a point be both a local and global extremum? (Yes! Every global extremum is also local)
2. Why might an endpoint be a global extremum? (Because we only consider points in the interval)
3. If f'(x) = 0 at a point, is it guaranteed to be an extremum? (No - think of x^3 at x=0)
4. How does the Extreme Value Theorem relate to what we see here?

### Assessment Ideas

- Give students a new function and ask them to sketch and label all extrema
- Have students explain in writing why a specific point changed from local to global when the interval changed
- Quiz: Provide coordinates and ask students to classify each extremum type

## References

1. [Wikipedia: Maxima and Minima](https://en.wikipedia.org/wiki/Maxima_and_minima) - Comprehensive overview of extrema concepts with formal definitions and examples.

2. [Khan Academy: Absolute and Relative Extrema](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-2/v/relative-maxima-and-minima) - Video explanations and practice problems on distinguishing between global and local extrema.

3. [Paul's Online Math Notes: Finding Absolute Extrema](https://tutorial.math.lamar.edu/Classes/CalcI/AbsExtrema.aspx) - Detailed worked examples showing the closed interval method for finding absolute extrema.

4. [College Board AP Calculus Course Description](https://apcentral.collegeboard.org/courses/ap-calculus-ab) - Official learning objectives including extrema identification (Unit 5).
