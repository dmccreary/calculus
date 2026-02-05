---
title: All Three Asymptote Types
description: Interactive comparison of vertical, horizontal, and oblique asymptotes showing their defining characteristics and behavior.
quality_score: 92
image: /sims/asymptote-types/asymptote-types.png
og:image: /sims/asymptote-types/asymptote-types.png
twitter:image: /sims/asymptote-types/asymptote-types.png
social:
   cards: false
---
# All Three Asymptote Types

<iframe src="main.html" height="482px" scrolling="no"></iframe>

[Run the Asymptote Types MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit this MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

This visualization helps you differentiate between the three types of asymptotes by showing them side-by-side with their characteristic behaviors:

**Vertical Asymptote (Red):** The function approaches positive or negative infinity as x approaches a specific value. Example: f(x) = 1/(x-2) has a vertical asymptote at x = 2.

**Horizontal Asymptote (Blue):** The function levels off to a constant value as x approaches positive or negative infinity. Example: f(x) = (2x+1)/(x+3) has a horizontal asymptote at y = 2.

**Oblique/Slant Asymptote (Green):** The function approaches a slanted line as x approaches infinity. Example: f(x) = (x^2-1)/(x-2) has an oblique asymptote at y = x + 2.

## Controls

- **Individual/Compare Button:** Toggle between viewing each asymptote type in its own panel or all three overlaid on one graph
- **Vertical/Horizontal/Oblique Toggles:** Show or hide each asymptote type to focus your analysis
- **Zoom Slider:** Zoom out to see long-range asymptotic behavior

## Embed This MicroSim

Place the following line in your website to include this simulation:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/asymptote-types/main.html"
   width ="100%" height="482px" scrolling="no">
</iframe>
```

## Lesson Plan

### Learning Objective

Students will differentiate between vertical, horizontal, and oblique asymptotes by analyzing their defining characteristics.

**Bloom's Taxonomy Level:** Analyze (L4)
**Action Verb:** Differentiate

### Prerequisites

- Understanding of rational functions
- Familiarity with limits and infinity notation
- Basic graphing skills

### Classroom Activity (15-20 minutes)

**Stage 1: Individual Exploration (5 min)**

1. Start in "Individual" view mode
2. Observe each panel and note:
   - What happens to the function near the asymptote?
   - How does the function behave far from the asymptote?
3. Use the zoom slider to see long-range behavior

**Stage 2: Comparison Analysis (5 min)**

1. Switch to "Compare" view
2. Toggle each asymptote type on/off to isolate behaviors
3. Answer: How can you tell which type of asymptote a function has just by looking at its graph?

**Stage 3: Mathematical Definitions (5 min)**

Guide students to formalize their observations:

| Type | Mathematical Definition | Visual Characteristic |
|------|------------------------|----------------------|
| Vertical | lim(x->a) f(x) = +/- infinity | Function shoots up/down at a specific x |
| Horizontal | lim(x->+/-infinity) f(x) = L | Function levels off far from origin |
| Oblique | f(x) - (mx+b) -> 0 as x -> infinity | Function approaches a slanted line |

### Assessment Questions

1. A function has f(x) -> 3 as x -> infinity. What type of asymptote is y = 3?
2. If dividing a rational function gives a linear quotient with a remainder, what type of asymptote does it have?
3. Why can't a polynomial have a vertical asymptote?

### Extensions

- Have students create their own rational functions with specific asymptote types
- Explore functions with multiple vertical asymptotes
- Investigate when a function crosses its horizontal asymptote

## References

- [Asymptotes - Khan Academy](https://www.khanacademy.org/math/precalculus/x9e81a4f98389efdf:rational-functions/x9e81a4f98389efdf:end-behavior-of-rational-functions/a/end-behavior-of-rational-functions)
- [Types of Asymptotes - Math is Fun](https://www.mathsisfun.com/algebra/asymptote.html)
