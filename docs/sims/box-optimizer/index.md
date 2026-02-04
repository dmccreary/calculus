---
title: Box Volume Optimizer
description: Interactive MicroSim demonstrating how cutting squares from cardboard corners affects the volume of the resulting box. Students examine the optimization problem V(x) = x(L-2x)(W-2x).
quality_score: 92
image: /sims/box-optimizer/box-optimizer.png
og:image: /sims/box-optimizer/box-optimizer.png
twitter:image: /sims/box-optimizer/box-optimizer.png
social:
   cards: false
---
# Box Volume Optimizer

<iframe src="main.html" height="602px" width="100%" scrolling="no"></iframe>

[Run the Box Optimizer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Box Optimizer MicroSim with the p5.js editor](https://editor.p5js.org/)

## About This MicroSim

Place the following line in your website to include this in your course:

```html
<iframe src="https://dmccreary.github.io/calculus/sims/box-optimizer/main.html" height="602px" scrolling="no"></iframe>
```

The **Box Optimizer** is a classic calculus optimization problem brought to life. When you cut equal squares from the corners of a flat cardboard sheet and fold up the sides, you create an open-top box. But what size should those cuts be to maximize the volume?

This MicroSim lets you explore this question visually. You'll see:

1. **Flat Cardboard Template** (left): Watch the cut squares change size as you adjust x
2. **3D Box View** (center): See the resulting box in 3D with folding animation
3. **Volume Graph** (right): The function V(x) = x(L-2x)(W-2x) with your current position marked

## How to Use

1. **Drag the slider** to change the cut size (x) and watch all three views update
2. **Click "Animate Fold"** to see the flat cardboard fold into a 3D box
3. **Click "Show Optimal"** to jump directly to the maximum volume
4. **Change cardboard dimensions** by clicking the input boxes and typing new values (press Enter to apply)
5. **Watch the data panel** to see current dimensions, volume, and percentage of maximum

## The Math Behind It

For a cardboard sheet of length L and width W, cutting squares of size x from each corner gives:

- **Box length**: L - 2x
- **Box width**: W - 2x
- **Box height**: x

The **volume function** is:

$$V(x) = x(L - 2x)(W - 2x)$$

To find the maximum, we take the derivative and set it to zero:

$$V'(x) = 12x^2 - 4(L + W)x + LW = 0$$

Using the quadratic formula gives us the optimal cut size.

!!! quote "Delta Moment"
    "See how the volume graph has that beautiful peak? That's where the magic happens!
    Too small a cut and you get a shallow tray. Too big and you're folding up tiny walls.
    The sweet spot is where V'(x) = 0. Calculus helps us find it exactly!"

## Lesson Plan

### Learning Objectives

By the end of this activity, students will be able to:

1. **Explain** how changing the cut size affects each dimension of the resulting box
2. **Connect** the visual representation to the algebraic volume function V(x) = x(L-2x)(W-2x)
3. **Analyze** the volume function graph to identify critical points and maximum volume
4. **Apply** the optimization process to find the ideal cut size for different cardboard dimensions

### Suggested Activities

**Activity 1: Exploration (10 min)**

- Start with default 18" x 12" cardboard
- Have students predict: "What cut size do you think maximizes volume?"
- Let them explore with the slider, then click "Show Optimal" to check

**Activity 2: Pattern Finding (15 min)**

- Try different cardboard dimensions (square vs. rectangular)
- Record the optimal x for each dimension set
- Look for patterns: Is there a relationship between dimensions and optimal cut?

**Activity 3: Calculus Connection (10 min)**

- Show that V'(x) = 0 gives the same answer as "Show Optimal"
- Discuss why the derivative equals zero at maximum
- Connect second derivative test to confirm maximum vs. minimum

### Assessment Questions

1. For an 18" x 12" sheet, approximately what fraction of the width is the optimal cut?
2. What happens to the volume if you cut exactly W/2 from each corner? Why?
3. If you double both L and W, what happens to the maximum volume?

## References

- [Box Optimization Problem - Khan Academy](https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-analytical-applications-new/ab-5-11/v/optimization-box-volume-graphically)
- [AP Calculus AB: Optimization Problems](https://apcentral.collegeboard.org/)
- [Interactive Calculus Visualizations](https://www.geogebra.org/m/calculus)
