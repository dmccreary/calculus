# Foundations of Calculus

## Meet Your Guide
![](../../img/delta-v1.png)
<details>
<summary>Image Description</summary>
Please generate a high resolution wide-landscape, professional textbook illustration with a 16:9 width:height ratio

--style: 3D rendered illustration, soft shadows, clean lines
--mood: friendly, curious, welcoming educational
--colors: primary teal (#009688), accent orange (#FF5722), green glow (#00E676)
--quality: high resolution, professional textbook illustration

A friendly triangular robot mascot named Delta, designed for a high school calculus textbook. The robot has an equilateral triangle-shaped body made of smooth teal/turquoise metal (hex #009688) with rounded corners for a friendly appearance. The triangle is oriented with one vertex pointing upward like the Greek letter delta (Δ).

Near the top vertex (apex), Delta has two large, expressive circular LED eyes that glow warm orange (#FF5722), giving her a curious and enthusiastic expression. The eyes are slightly different sizes, with the larger one raised as if asking a question.

At the two bottom vertices of the triangle, small rubber-treaded wheels are attached, allowing Delta to roll along mathematical curves. The wheels are dark gray with visible treads.

Along the left edge of the triangle body, a glowing green LED strip (#00E676) acts as a "slope indicator" that shows the steepness of whatever surface Delta is on.

Delta has small retractable measuring arms on each side - thin metallic appendages with small grabber claws, currently folded against the body.

Next to Delta's is a backpack with the name "integral journal" where she stores accumulated data.

At the very top of the apex, a thin flexible antenna with a small glowing orange ball at the tip wobbles playfully.

The robot has a slightly tilted pose (about 5-10 degrees), as if standing on a slope, which reinforces her connection to derivatives and slopes.

Background: Delta is positioned on a stylized mathematical landscape - a smooth 3D curve that looks like rolling hills, rendered in soft purple and blue gradients. Grid lines subtly suggest a coordinate system. The scene has warm, inviting lighting.

Style: Modern 3D render with soft lighting, slightly cartoonish proportions for approachability, suitable for
an educational textbook. Clean, professional, and appealing to high school students. Similar aesthetic to Pixar or educational app mascots.

</details>

!!! quote "Delta Says"
    "Hey there! I'm Delta—a curious little triangular robot who *lives* for exploring
    mathematical landscapes. See this shape I'm rocking? It's not just for looks.
    The Greek letter delta (Δ) means *change*, and that's basically my whole personality.

    Throughout this course, you and I are going on an adventure together. We'll climb
    the slopes of functions, slide into valleys, hunt for peaks, and discover that
    calculus is really just two big questions: *How fast is something changing?* and
    *How much has accumulated along the way?*

    Fair warning: I love puns, I get excited about flat spots (you'll see why), and
    I firmly believe that calculus is a superpower. By the end of this course, you'll
    have it too.

    Ready? Let's take this one infinitesimal step at a time!"

## Summary

This chapter establishes the essential prerequisite knowledge from precalculus that forms the foundation for all calculus concepts. Students will review functions and their properties, including domain, range, composition, and inverses. The chapter covers the major function families—polynomial, rational, exponential, logarithmic, and trigonometric—along with graphing techniques and transformations.

After completing this chapter, you'll have a solid foundation for understanding limits and derivatives—and Delta will be ready to start exploring some curves!

## Why Foundations Matter

Before we can ask "How steep is this curve?" we need to understand what curves look like in the first place. This chapter is like packing your backpack before a hiking trip:

- **Functions** are the landscapes Delta will explore
- **Domain and range** tell us where Delta can and can't go
- **Transformations** show us how one landscape relates to another
- **Different function families** give us different types of terrain to master

!!! quote "Delta Moment"
    "I know, I know—you're thinking 'I already learned functions in precalc!' But trust me,
    we're going to see them differently now. Instead of just graphing them, we're going
    to *walk* on them. And when you walk on a curve, you start noticing things like:
    Where is it steep? Where is it flat? Where does it go forever?

    Those questions? That's calculus whispering to you."

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Function
2. Domain and Range
3. Function Notation
4. Composite Function
5. Inverse Function
6. Graphing Functions
7. Piecewise Function
8. Even and Odd Functions
9. Function Transformations
10. Polynomial Function
11. Rational Function
12. Exponential Function
13. Logarithmic Function
14. Trigonometric Function
15. Unit Circle
16. Radian Measure
17. Trigonometric Identities
18. Coordinate System
19. Number Line
20. Real Numbers

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md), specifically:

- Algebra II (polynomial, rational, exponential, and logarithmic functions)
- Precalculus or Trigonometry (trigonometric functions, identities, and equations)
- Functions and Graphs (domain, range, composition, and transformations)

## What's Ahead

Once we've reviewed these foundations, Delta will be ready to tackle the big ideas:

- **Chapter 2**: We'll learn about *limits*—what happens as Delta gets infinitely close to a point
- **Chapter 6**: We'll discover *derivatives*—how Delta measures her tilt at any instant
- **Chapter 20**: We'll explore *integrals*—how Delta tracks her total journey in her backpack

!!! quote "Delta's Sidequest"
    "Before we dive into calculus proper, I have a challenge for you: pick your favorite
    function from precalc—maybe a parabola, maybe a sine wave—and imagine actually
    *walking* on it. Where would you be climbing? Where would you be sliding downhill?
    Where would you stop to catch your breath on flat ground?

    That mental exercise? You just did calculus. Informally, but still. High five!"

---

## The Language of Change

Before Delta can explore the slopes of curves, she needs to understand the landscapes themselves. Every calculus adventure begins with functions—the mathematical machines that describe how one quantity depends on another. In this chapter, we'll review the essential tools from precalculus that make calculus possible.

Think of this chapter as gathering your gear before a hiking trip. You wouldn't climb a mountain without knowing how to read a trail map. Similarly, you can't do calculus without understanding functions, their graphs, and their behaviors.

### What Is a Function?

A **function** is a rule that assigns exactly one output to each input. If you think of it as a machine, you feed in a number, the machine does something to it, and out pops exactly one result.

#### The Function Machine

<iframe src="../../sims/function-machine/main.html" width="100%" height="450px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Function Machine MicroSim</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will explain how a function processes inputs to produce outputs, demonstrating the "one input, one output" rule.

Visual Elements:
- A "machine" graphic in the center with an input hopper on the left and output chute on the right
- Input number entry field (or slider from -10 to 10)
- Function selector dropdown: f(x) = 2x, f(x) = x², f(x) = |x|, f(x) = sin(x)
- Animated number flowing into machine, transformation shown inside, output appearing
- Table showing last 5 input-output pairs

Interactive Controls:
- Number input or slider for x value
- Function dropdown selector
- "Process" button to animate the transformation
- "Clear History" button

Data Visibility Requirements:
Stage 1: Show input value x entering the machine
Stage 2: Show the formula being applied (e.g., "2 × 3 = 6")
Stage 3: Show output value emerging

Instructional Rationale: Step-through visualization helps students see that each input produces exactly one output, reinforcing the definition of a function.

Canvas size: 600×400px, responsive
Implementation: p5.js with canvas-based controls
</details>

The key property of a function is this: for every input, there's exactly *one* output. You can't put in 3 and get both 9 and -9 back—that would break the rule.

!!! quote "Delta Moment"
    "Think of me as a function! Give me any point on a curve, and I'll tell you exactly
    one slope. No ambiguity, no multiple answers—just one honest tilt reading."

### Function Notation

When we write $f(x) = x^2 + 3$, we're giving the function a name ($f$) and describing what it does to its input ($x$). The notation $f(x)$ is read as "f of x" and represents the output when $x$ is the input.

Common notations you'll encounter:

| Notation | Meaning |
|----------|---------|
| $f(x)$ | The output of function $f$ when the input is $x$ |
| $f(2)$ | The output when $x = 2$ |
| $f(a + h)$ | The output when the input is the expression $a + h$ |
| $y = f(x)$ | The variable $y$ represents the output of $f$ |

Function notation becomes essential in calculus because we need to talk about what happens at specific points, and what happens as inputs change.

**Example:** If $f(x) = x^2 - 4x + 7$, then:

- $f(0) = 0^2 - 4(0) + 7 = 7$
- $f(3) = 3^2 - 4(3) + 7 = 9 - 12 + 7 = 4$
- $f(a) = a^2 - 4a + 7$

### Domain and Range

The **domain** of a function is the set of all valid inputs—every $x$ value you're allowed to plug in. The **range** is the set of all possible outputs—every $y$ value the function can produce.

Why do some inputs get rejected? Usually for one of these reasons:

- **Division by zero**: If $f(x) = \frac{1}{x-2}$, then $x = 2$ is not in the domain
- **Square roots of negatives**: If $f(x) = \sqrt{x}$, then negative numbers aren't in the domain (for real numbers)
- **Logarithms of non-positives**: If $f(x) = \ln(x)$, then $x$ must be positive

#### Diagram: Domain and Range Visualizer

<iframe src="../../sims/domain-range-visualizer/main.html" width="100%" height="487px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Domain and Range Visualizer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Interpret

Learning Objective: Students will interpret domain and range graphically, connecting algebraic restrictions to visual representations on the coordinate plane.

Visual Elements:
- Coordinate plane with function graph
- Horizontal number line below graph showing domain (highlighted in green)
- Vertical number line to the left showing range (highlighted in blue)
- Vertical dashed lines at domain boundaries
- Horizontal dashed lines at range boundaries
- Function selector dropdown

Functions to include:
- $f(x) = x^2$ (domain: all reals, range: $y \geq 0$)
- $f(x) = \sqrt{x}$ (domain: $x \geq 0$, range: $y \geq 0$)
- $f(x) = \frac{1}{x}$ (domain: $x \neq 0$, range: $y \neq 0$)
- $f(x) = \sin(x)$ (domain: all reals, range: $-1 \leq y \leq 1$)

Interactive Controls:
- Function dropdown selector
- Mouse hover on graph highlights corresponding domain and range points
- Toggle buttons to show/hide domain and range highlights

Instructional Rationale: Visual mapping between graph features and domain/range helps students connect algebraic restrictions to geometric meaning.

Canvas size: 700×500px, responsive
Implementation: p5.js
</details>

!!! quote "Delta Says"
    "Domain tells me where I'm *allowed* to walk. Range tells me how *high* or *low*
    I might end up. Before I explore any curve, I need to know my boundaries!"

### Real Numbers and the Number Line

All the numbers we typically use in calculus are **real numbers**—they include:

- Natural numbers: 1, 2, 3, ...
- Integers: ..., -2, -1, 0, 1, 2, ...
- Rational numbers: fractions like $\frac{3}{4}$ or $-\frac{7}{2}$
- Irrational numbers: $\sqrt{2}$, $\pi$, $e$

We visualize real numbers on a **number line**, where every point corresponds to exactly one real number, and every real number corresponds to exactly one point.

The real number line extends infinitely in both directions. In calculus, we'll often talk about:

- **Intervals**: portions of the number line like $[2, 5]$ or $(-\infty, 3)$
- **Approaching values**: what happens as $x$ gets closer and closer to some number
- **Infinity**: not a number, but a concept describing unbounded growth

| Interval Notation | Meaning | Number Line |
|-------------------|---------|-------------|
| $[a, b]$ | All numbers from $a$ to $b$, including both | Closed dots at both ends |
| $(a, b)$ | All numbers from $a$ to $b$, excluding both | Open dots at both ends |
| $[a, b)$ | Includes $a$, excludes $b$ | Closed at $a$, open at $b$ |
| $(-\infty, b]$ | All numbers up to and including $b$ | Arrow left, closed at $b$ |

### The Coordinate System

To graph functions, we use the **Cartesian coordinate system**—a plane defined by two perpendicular number lines called axes.

- The horizontal axis is the **$x$-axis** (inputs)
- The vertical axis is the **$y$-axis** (outputs)
- The point where they cross is the **origin** $(0, 0)$
- Every point in the plane has coordinates $(x, y)$

#### Diagram: Coordinate System Explorer

<iframe src="../../sims/coordinate-system-explorer/main.html" width="100%" height="450px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Coordinate System Explorer</summary>
Type: microsim

Bloom Level: Remember (L1)
Bloom Verb: Identify

Learning Objective: Students will identify points in the coordinate plane and name the quadrant where each point lies.

Visual Elements:
- Standard coordinate plane with grid lines
- Four quadrants labeled (I, II, III, IV)
- Origin clearly marked
- Delta mascot that moves to clicked location
- Coordinate display showing (x, y) of current position

Interactive Controls:
- Click anywhere on the plane to place a point
- Coordinates update in real-time as mouse moves
- "Quiz Mode" button: shows a point, student identifies coordinates
- "Place Point" mode: student enters coordinates, Delta moves there

Instructional Rationale: Direct manipulation builds spatial intuition and reinforces the coordinate system as the foundation for all graphing.

Canvas size: 500×500px, responsive
Implementation: p5.js
</details>

The coordinate system divides the plane into four **quadrants**:

- **Quadrant I**: $x > 0$ and $y > 0$ (upper right)
- **Quadrant II**: $x < 0$ and $y > 0$ (upper left)
- **Quadrant III**: $x < 0$ and $y < 0$ (lower left)
- **Quadrant IV**: $x > 0$ and $y < 0$ (lower right)

---

## Graphing Functions

The graph of a function is the set of all points $(x, f(x))$ plotted on the coordinate plane. It's a visual representation of how outputs change as inputs change—exactly the kind of landscape Delta loves to explore.

### Reading Graphs

From a graph, you can extract a wealth of information:

- **Function values**: the height of the graph at any $x$
- **Zeros/roots**: where the graph crosses the $x$-axis
- **Intercepts**: where the graph crosses either axis
- **Increasing/decreasing behavior**: where the graph rises or falls
- **Maximum and minimum values**: the peaks and valleys

!!! quote "Delta Moment"
    "When I look at a graph, I see a hiking trail. The high points are summits,
    the low points are valleys, and the slopes tell me how hard I'll be working.
    Every graph is an adventure waiting to happen!"

### The Vertical Line Test

How do you know if a graph represents a function? Use the **vertical line test**: if any vertical line crosses the graph more than once, it's not a function.

Why? Because a function can only have one output for each input. If a vertical line (which represents a single $x$ value) hits the graph twice, that $x$ has two outputs—rule broken!

#### Diagram: Vertical Line Test Interactive

<iframe src="../../sims/vertical-line-test/main.html" width="100%" height="400px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Vertical Line Test Interactive</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Use

Learning Objective: Students will use the vertical line test to determine whether a given graph represents a function.

Visual Elements:
- Graph display area with various curves
- Draggable vertical line that follows mouse horizontally
- Intersection points highlighted when vertical line crosses graph
- Counter showing number of intersections
- "Is it a function?" indicator (green check or red X)

Graphs to include:
- Parabola $y = x^2$ (passes - function)
- Circle $x^2 + y^2 = 9$ (fails - not a function)
- Sine wave (passes - function)
- Sideways parabola $x = y^2$ (fails - not a function)
- Cubic $y = x^3$ (passes - function)

Interactive Controls:
- Graph selector buttons or dropdown
- Mouse controls vertical line position
- Reset button

Instructional Rationale: Active testing reinforces the "one output per input" concept through direct manipulation.

Canvas size: 600×400px, responsive
Implementation: p5.js
</details>

---

## Building New Functions

Once you know basic functions, you can combine them to create new ones. This is where function operations become powerful.

### Composite Functions

A **composite function** is created by feeding the output of one function into another. If you have functions $f$ and $g$, the composite $f \circ g$ (read "f composed with g") means:

#### Composite Function Definition

$(f \circ g)(x) = f(g(x))$

where:

- $g(x)$ is evaluated first (the "inner" function)
- The result becomes the input to $f$ (the "outer" function)

**Example:** If $f(x) = x^2$ and $g(x) = x + 3$:

- $(f \circ g)(x) = f(g(x)) = f(x + 3) = (x + 3)^2$
- $(g \circ f)(x) = g(f(x)) = g(x^2) = x^2 + 3$

Notice that $f \circ g \neq g \circ f$ in general—order matters!

#### Diagram: Function Composition Visualizer

<iframe src="../../sims/function-composition/main.html" width="100%" height="450px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Function Composition Visualizer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will explain how composite functions work by tracing values through two function "machines" in sequence.

Visual Elements:
- Two function machines arranged in series
- Input enters first machine (g), output becomes input to second machine (f)
- Animated flow showing value transformation at each stage
- Display showing: Input → g(x) → intermediate value → f(intermediate) → final output
- Both functions displayed algebraically

Interactive Controls:
- Input slider (-5 to 5)
- Function selectors for f and g:
  - Options: x², x+2, 2x, √x, |x|
- "Swap Order" button to demonstrate f∘g vs g∘f
- "Animate" button to show value flowing through

Data Visibility Requirements:
Stage 1: Input value x appears
Stage 2: First function g applied, show calculation
Stage 3: Intermediate result displayed
Stage 4: Second function f applied to intermediate
Stage 5: Final result shown with full chain

Instructional Rationale: Step-by-step animation demystifies composition by making the sequence of operations visible.

Canvas size: 700×450px, responsive
Implementation: p5.js
</details>

!!! tip "Calculus Preview"
    The **chain rule** in calculus tells us how to find the derivative of composite
    functions. Understanding composition now will make the chain rule feel natural later.

### Inverse Functions

An **inverse function** "undoes" what the original function does. If $f$ takes $a$ to $b$, then $f^{-1}$ takes $b$ back to $a$.

#### Inverse Function Property

$f^{-1}(f(x)) = x$ and $f(f^{-1}(x)) = x$

For a function to have an inverse, it must be **one-to-one**: each output comes from exactly one input. Graphically, this means it passes the **horizontal line test**—no horizontal line crosses the graph more than once.

**Example:** The function $f(x) = x^3$ has inverse $f^{-1}(x) = \sqrt[3]{x}$

- $f(2) = 8$, and $f^{-1}(8) = 2$ ✓

**Non-example:** The function $f(x) = x^2$ does *not* have an inverse over all real numbers because $f(2) = f(-2) = 4$. Which input does $f^{-1}(4)$ return?

!!! warning "Common Confusion"
    The notation $f^{-1}(x)$ means the inverse function, NOT $\frac{1}{f(x)}$.
    These are completely different! The superscript -1 here indicates inverse, not a power.

#### Finding Inverse Functions Graphically

The graph of $f^{-1}$ is the reflection of the graph of $f$ across the line $y = x$. This makes sense: if $(a, b)$ is on the graph of $f$, then $(b, a)$ is on the graph of $f^{-1}$.

#### Diagram: Inverse Function Reflector

<iframe src="../../sims/inverse-function-reflector/main.html" width="100%" height="500px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Inverse Function Reflector</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Compare

Learning Objective: Students will compare a function and its inverse graphically, identifying the reflection relationship across the line y = x.

Visual Elements:
- Coordinate plane with y = x line shown as dashed
- Original function f(x) in blue
- Inverse function f⁻¹(x) in orange (can be toggled on/off)
- Point on f(x) and corresponding point on f⁻¹(x) highlighted
- Connecting line showing the reflection

Functions with inverses:
- $f(x) = 2x + 1$ and $f^{-1}(x) = \frac{x-1}{2}$
- $f(x) = x^3$ and $f^{-1}(x) = \sqrt[3]{x}$
- $f(x) = e^x$ and $f^{-1}(x) = \ln(x)$
- $f(x) = \sqrt{x}$ (x≥0) and $f^{-1}(x) = x^2$ (x≥0)

Interactive Controls:
- Function selector dropdown
- Checkbox to show/hide inverse
- Checkbox to show/hide y = x line
- Draggable point on f(x) that shows corresponding inverse point

Instructional Rationale: Visual reflection reinforces that inverse functions "swap" x and y coordinates.

Canvas size: 550×500px, responsive
Implementation: p5.js
</details>

---

## Function Transformations

One of the most powerful tools in mathematics is understanding how basic functions can be stretched, shifted, and flipped to create new functions. Instead of memorizing countless graph shapes, you can master a few parent functions and transform them.

### Parent Functions

A **parent function** is the simplest form of a function family. Here are the ones you should know:

| Function Family | Parent Function | Basic Shape |
|-----------------|-----------------|-------------|
| Linear | $f(x) = x$ | Straight line through origin |
| Quadratic | $f(x) = x^2$ | U-shaped parabola |
| Cubic | $f(x) = x^3$ | S-shaped curve |
| Square root | $f(x) = \sqrt{x}$ | Half parabola on its side |
| Absolute value | $f(x) = \|x\|$ | V-shape |
| Reciprocal | $f(x) = \frac{1}{x}$ | Two branches (hyperbola) |

### Transformation Rules

Starting from any parent function $f(x)$, you can apply transformations:

| Transformation | Notation | Effect |
|----------------|----------|--------|
| Vertical shift up | $f(x) + k$ | Moves graph up by $k$ units |
| Vertical shift down | $f(x) - k$ | Moves graph down by $k$ units |
| Horizontal shift right | $f(x - h)$ | Moves graph right by $h$ units |
| Horizontal shift left | $f(x + h)$ | Moves graph left by $h$ units |
| Vertical stretch | $a \cdot f(x)$ where $\|a\| > 1$ | Stretches graph vertically |
| Vertical compression | $a \cdot f(x)$ where $0 < \|a\| < 1$ | Compresses graph vertically |
| Horizontal stretch | $f(bx)$ where $0 < \|b\| < 1$ | Stretches graph horizontally |
| Horizontal compression | $f(bx)$ where $\|b\| > 1$ | Compresses graph horizontally |
| Reflection over x-axis | $-f(x)$ | Flips graph upside down |
| Reflection over y-axis | $f(-x)$ | Flips graph left-right |

!!! quote "Delta's Sidequest"
    "The weird thing about horizontal transformations? They work *opposite* to what you'd
    expect! $f(x - 3)$ shifts RIGHT, not left. I remember it this way: the minus sign
    is trying to 'push' the input value to the left, so the whole graph has to
    slide right to compensate."

#### Diagram: Transformation Playground

<iframe src="../../sims/transformation-playground/main.html" width="100%" height="550px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Transformation Playground</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will demonstrate understanding of function transformations by manipulating parameters and predicting the resulting graph changes.

Visual Elements:
- Coordinate plane with parent function shown in light gray
- Transformed function shown in bold color
- Formula display showing current transformation: $a \cdot f(b(x - h)) + k$
- Parameter values displayed next to sliders
- Key points labeled on both parent and transformed functions

Interactive Controls:
- Parent function selector: $x^2$, $|x|$, $\sqrt{x}$, $\sin(x)$, $x^3$
- Slider for $a$ (vertical stretch/reflection): -3 to 3
- Slider for $b$ (horizontal stretch/reflection): -3 to 3
- Slider for $h$ (horizontal shift): -5 to 5
- Slider for $k$ (vertical shift): -5 to 5
- "Reset" button to return to parent function
- Checkbox to show/hide parent function

Challenge Mode:
- Show target transformed graph
- Student adjusts sliders to match
- Check answer button

Instructional Rationale: Direct manipulation with immediate visual feedback builds transformation intuition faster than memorizing rules.

Canvas size: 700×550px, responsive
Implementation: p5.js with canvas-based sliders
</details>

### Even and Odd Functions

Some functions have special symmetry properties that simplify their analysis.

An **even function** satisfies $f(-x) = f(x)$ for all $x$ in its domain. Graphically, even functions are symmetric about the $y$-axis—if you fold the graph along the $y$-axis, both halves match.

**Examples of even functions:** $f(x) = x^2$, $f(x) = |x|$, $f(x) = \cos(x)$

An **odd function** satisfies $f(-x) = -f(x)$ for all $x$ in its domain. Graphically, odd functions have rotational symmetry about the origin—if you rotate the graph 180°, it looks the same.

**Examples of odd functions:** $f(x) = x^3$, $f(x) = x$, $f(x) = \sin(x)$

!!! note "Most Functions Are Neither"
    Many functions are neither even nor odd. For example, $f(x) = x^2 + x$ has no
    special symmetry. Don't assume every function must be one or the other!

---

## Piecewise Functions

A **piecewise function** is defined by different formulas on different parts of its domain. You use one rule here, another rule there.

#### Piecewise Function Definition

A piecewise function has the form:

$$f(x) = \begin{cases} \text{formula}_1 & \text{if } x \text{ satisfies condition}_1 \\ \text{formula}_2 & \text{if } x \text{ satisfies condition}_2 \\ \vdots & \vdots \end{cases}$$

**Example:** The absolute value function can be written as a piecewise function:

$$|x| = \begin{cases} x & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}$$

Piecewise functions are important in calculus because they can model real situations where behavior changes based on conditions—tax brackets, shipping costs, speed limits, and more.

#### Diagram: Piecewise Function Builder

<iframe src="../../sims/piecewise-builder/main.html" width="100%" height="500px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Piecewise Function Builder</summary>
Type: microsim

Bloom Level: Create (L6)
Bloom Verb: Construct

Learning Objective: Students will construct piecewise functions by defining different rules for different domains and observe the resulting graph.

Visual Elements:
- Coordinate plane with piecewise function graph
- Different colored segments for each piece
- Open/closed dots at boundaries showing continuity
- Formula display showing current piecewise definition
- Delta walking along the function, pausing at breakpoints

Interactive Controls:
- Add/remove piece buttons (max 4 pieces)
- For each piece:
  - Function type dropdown (linear, quadratic, constant)
  - Parameter inputs or sliders
  - Domain boundary inputs
  - Include/exclude boundary toggles (open vs closed dot)
- Preset examples: absolute value, floor function, step function

Instructional Rationale: Building piecewise functions helps students understand how multiple rules combine and prepares them for analyzing continuity.

Canvas size: 700×500px, responsive
Implementation: p5.js
</details>

!!! quote "Delta Moment"
    "Walking on a piecewise function is like hiking a trail with different terrains.
    Smooth pavement here, gravel there, maybe a wooden bridge. The question I always
    ask at the boundaries: Can I cross smoothly, or is there a step I might trip on?"

---

## The Polynomial Family

**Polynomial functions** are built from powers of $x$ with constant coefficients. They're some of the most well-behaved functions in mathematics—smooth, continuous, and defined everywhere.

#### General Polynomial Form

$$P(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0$$

where:

- $n$ is a non-negative integer (the **degree**)
- $a_n, a_{n-1}, \ldots, a_0$ are constants (the **coefficients**)
- $a_n \neq 0$ (the **leading coefficient**)

### Types of Polynomials

| Degree | Name | General Form | Example |
|--------|------|--------------|---------|
| 0 | Constant | $f(x) = c$ | $f(x) = 5$ |
| 1 | Linear | $f(x) = ax + b$ | $f(x) = 2x - 3$ |
| 2 | Quadratic | $f(x) = ax^2 + bx + c$ | $f(x) = x^2 - 4x + 3$ |
| 3 | Cubic | $f(x) = ax^3 + bx^2 + cx + d$ | $f(x) = x^3 - 2x$ |
| 4 | Quartic | $f(x) = ax^4 + \cdots$ | $f(x) = x^4 - 1$ |

### Polynomial Behavior

The degree and leading coefficient determine the end behavior:

- **Even degree, positive leading coefficient**: Both ends go up ($\nearrow \quad \nwarrow$)
- **Even degree, negative leading coefficient**: Both ends go down ($\searrow \quad \swarrow$)
- **Odd degree, positive leading coefficient**: Falls left, rises right ($\swarrow \quad \nearrow$)
- **Odd degree, negative leading coefficient**: Rises left, falls right ($\nwarrow \quad \searrow$)

#### Diagram: Polynomial Explorer

<iframe src="../../sims/polynomial-explorer/main.html" width="100%" height="550px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Polynomial Explorer</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine

Learning Objective: Students will examine how the degree and leading coefficient of a polynomial affect its shape and end behavior.

Visual Elements:
- Large coordinate plane with polynomial graph
- End behavior arrows showing direction at left/right extremes
- Zeros marked with dots on x-axis
- Turning points highlighted
- Degree and leading coefficient displayed prominently
- Delta icon at current position showing local slope

Interactive Controls:
- Degree selector (1 through 5)
- Leading coefficient slider (-3 to 3)
- Additional coefficient sliders for lower terms
- "Randomize" button for exploration
- End behavior prediction quiz mode

Information Panel:
- Current polynomial equation
- Degree: n
- Leading coefficient: positive/negative
- End behavior description
- Number of turning points (at most n-1)

Instructional Rationale: Manipulating polynomials builds intuition for how degree and coefficients shape graphs—essential for curve sketching in calculus.

Canvas size: 700×550px, responsive
Implementation: p5.js
</details>

!!! tip "Calculus Preview"
    Polynomials are the easiest functions to differentiate. The **power rule**—which
    you'll learn in the derivatives chapter—makes finding their slopes a breeze.

---

## Rational Functions

A **rational function** is the ratio of two polynomials:

#### Rational Function Form

$$f(x) = \frac{P(x)}{Q(x)}$$

where:

- $P(x)$ is the numerator polynomial
- $Q(x)$ is the denominator polynomial
- $Q(x) \neq 0$ (we can't divide by zero)

### Asymptotes

Rational functions often have **asymptotes**—lines that the graph approaches but never touches.

**Vertical asymptotes** occur where the denominator equals zero (and the numerator doesn't). The function "blows up" to infinity.

**Horizontal asymptotes** describe end behavior as $x \to \pm\infty$:

- If degree(numerator) < degree(denominator): horizontal asymptote at $y = 0$
- If degree(numerator) = degree(denominator): horizontal asymptote at $y = \frac{\text{leading coeff of } P}{\text{leading coeff of } Q}$
- If degree(numerator) > degree(denominator): no horizontal asymptote (may have slant asymptote)

**Example:** For $f(x) = \frac{2x + 1}{x - 3}$:

- Vertical asymptote at $x = 3$ (denominator = 0)
- Horizontal asymptote at $y = 2$ (degrees equal, ratio of leading coefficients = 2/1)

#### Diagram: Asymptote Analyzer

<iframe src="../../sims/asymptote-analyzer/main.html" width="100%" height="500px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Asymptote Analyzer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Interpret

Learning Objective: Students will interpret the relationship between rational function formulas and their asymptotes, understanding why the graph approaches but never crosses vertical asymptotes.

Visual Elements:
- Coordinate plane with rational function graph
- Vertical asymptotes shown as dashed red lines
- Horizontal asymptote shown as dashed blue line
- Values displayed as x approaches asymptote from left and right
- Delta approaching asymptote, getting pushed away

Interactive Controls:
- Preset function selector
- Input fields for numerator and denominator coefficients (simple cases)
- Zoom in/out on asymptotes
- "Trace" mode: show function values as x approaches asymptote

Functions to include:
- $f(x) = \frac{1}{x}$
- $f(x) = \frac{1}{x-2}$
- $f(x) = \frac{x}{x^2-1}$
- $f(x) = \frac{2x+1}{x-3}$
- $f(x) = \frac{x^2}{x^2+1}$ (no vertical asymptote)

Instructional Rationale: Seeing the function values explode near vertical asymptotes and stabilize near horizontal asymptotes builds intuition for limits.

Canvas size: 650×500px, responsive
Implementation: p5.js
</details>

!!! quote "Delta Says"
    "Vertical asymptotes are like invisible walls I can never cross. I can get
    infinitely close, but the closer I get, the more the curve rockets away
    from me. Horizontal asymptotes are different—they're like destinations I
    approach but never quite reach. The journey never ends!"

---

## Exponential and Logarithmic Functions

These two function families are inverses of each other and are essential for modeling growth, decay, and many natural phenomena.

### Exponential Functions

An **exponential function** has the form:

#### Exponential Function

$f(x) = a \cdot b^x$

where:

- $a$ is the initial value (the y-intercept when $x = 0$)
- $b$ is the base, with $b > 0$ and $b \neq 1$
- If $b > 1$: exponential growth
- If $0 < b < 1$: exponential decay

The most important exponential function in calculus uses the base $e \approx 2.71828$:

$$f(x) = e^x$$

Why $e$? Because $e^x$ is the unique function that equals its own derivative—it's the function whose rate of change at any point equals its value at that point!

### Logarithmic Functions

The **logarithm** is the inverse of the exponential. If $b^y = x$, then $\log_b(x) = y$.

#### Logarithm Definition

$\log_b(x) = y \iff b^y = x$

where:

- $b$ is the base (same restrictions as exponentials)
- $x > 0$ (we can only take logs of positive numbers)
- The **natural logarithm** $\ln(x) = \log_e(x)$ uses base $e$

Key properties:

- $\log_b(1) = 0$ (because $b^0 = 1$)
- $\log_b(b) = 1$ (because $b^1 = b$)
- $\log_b(xy) = \log_b(x) + \log_b(y)$
- $\log_b\left(\frac{x}{y}\right) = \log_b(x) - \log_b(y)$
- $\log_b(x^n) = n \cdot \log_b(x)$

#### Diagram: Exponential and Logarithm Relationship

<iframe src="../../sims/exp-log-relationship/main.html" width="100%" height="500px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Exponential and Logarithm Relationship</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Compare

Learning Objective: Students will compare exponential and logarithmic functions, recognizing them as inverse functions reflected across the line y = x.

Visual Elements:
- Both $b^x$ and $\log_b(x)$ graphed on same coordinate plane
- Line y = x shown as dashed line
- Reflection relationship highlighted with connecting segments
- Point on one curve, corresponding point on other curve
- Base value displayed prominently

Interactive Controls:
- Base slider (1.5 to 4, including e ≈ 2.718)
- Draggable point on exponential curve (shows corresponding log point)
- Toggle for showing/hiding y = x line
- Toggle for showing/hiding log function
- "Snap to e" button

Key values displayed:
- Coordinates of selected points
- $e^x$ value at point
- $\ln(x)$ value at point

Instructional Rationale: Seeing exp and log as reflections across y = x reinforces the inverse relationship and prepares students for derivatives of these functions.

Canvas size: 600×500px, responsive
Implementation: p5.js
</details>

!!! tip "Calculus Preview"
    The derivative of $e^x$ is $e^x$—the function is its own derivative!
    The derivative of $\ln(x)$ is $\frac{1}{x}$. These elegant results make
    exponentials and logarithms central to calculus.

---

## Trigonometric Functions

Trigonometry provides functions that model periodic behavior—anything that cycles, oscillates, or repeats. From sound waves to seasonal temperatures, trig functions are everywhere.

### The Unit Circle

The **unit circle** is a circle with radius 1 centered at the origin. It's the foundation for understanding trigonometric functions.

For any angle $\theta$ measured from the positive $x$-axis:

- The $x$-coordinate of the point on the unit circle is $\cos(\theta)$
- The $y$-coordinate is $\sin(\theta)$

#### Diagram: Interactive Unit Circle

<iframe src="../../sims/unit-circle/main.html" width="100%" height="550px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Interactive Unit Circle</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Students will explain the relationship between angles on the unit circle and the values of sine and cosine, connecting circular motion to the graphs of trig functions.

Visual Elements:
- Unit circle with radius 1, centered at origin
- Angle θ shown from positive x-axis
- Point P on circle with coordinates displayed
- Horizontal line from P to y-axis (showing cos θ)
- Vertical line from P to x-axis (showing sin θ)
- Sine and cosine graphs to the right, showing current values
- Reference angles marked (0°, 30°, 45°, 60°, 90°, etc.)
- Delta riding on the circle edge

Interactive Controls:
- Draggable point on circle (or angle slider 0 to 360°)
- Toggle between degrees and radians
- Show/hide reference triangle
- Show/hide corresponding points on sin and cos graphs
- "Animate" button to make point travel around circle continuously

Information Panel:
- Angle in degrees and radians
- sin(θ) value
- cos(θ) value
- tan(θ) value (when defined)
- Quadrant indicator

Instructional Rationale: Connecting the unit circle to function graphs helps students understand why trig functions behave as they do.

Canvas size: 800×550px (wider to fit both circle and graphs), responsive
Implementation: p5.js
</details>

### Radian Measure

While degrees are familiar (360° in a circle), calculus uses **radians** because they make derivatives work out cleanly.

#### Radian Definition

One radian is the angle that creates an arc length equal to the radius.

Since circumference = $2\pi r$, a full circle = $2\pi$ radians.

| Degrees | Radians |
|---------|---------|
| 0° | 0 |
| 30° | $\frac{\pi}{6}$ |
| 45° | $\frac{\pi}{4}$ |
| 60° | $\frac{\pi}{3}$ |
| 90° | $\frac{\pi}{2}$ |
| 180° | $\pi$ |
| 270° | $\frac{3\pi}{2}$ |
| 360° | $2\pi$ |

!!! warning "Radians Required!"
    In calculus, we always use radians. The derivative formulas for sine and cosine
    only work in radians. When you see $\sin(x)$ in calculus, assume $x$ is in radians.

### The Six Trigonometric Functions

| Function | Definition | Domain | Range |
|----------|------------|--------|-------|
| $\sin(\theta)$ | y-coordinate on unit circle | All real numbers | $[-1, 1]$ |
| $\cos(\theta)$ | x-coordinate on unit circle | All real numbers | $[-1, 1]$ |
| $\tan(\theta)$ | $\frac{\sin(\theta)}{\cos(\theta)}$ | $\theta \neq \frac{\pi}{2} + n\pi$ | All real numbers |
| $\csc(\theta)$ | $\frac{1}{\sin(\theta)}$ | $\theta \neq n\pi$ | $(-\infty, -1] \cup [1, \infty)$ |
| $\sec(\theta)$ | $\frac{1}{\cos(\theta)}$ | $\theta \neq \frac{\pi}{2} + n\pi$ | $(-\infty, -1] \cup [1, \infty)$ |
| $\cot(\theta)$ | $\frac{\cos(\theta)}{\sin(\theta)}$ | $\theta \neq n\pi$ | All real numbers |

### Trigonometric Identities

These identities simplify expressions and solve equations. Memorize the fundamental ones:

**Pythagorean Identities:**

- $\sin^2(\theta) + \cos^2(\theta) = 1$
- $1 + \tan^2(\theta) = \sec^2(\theta)$
- $1 + \cot^2(\theta) = \csc^2(\theta)$

**Sum and Difference Formulas:**

- $\sin(A + B) = \sin A \cos B + \cos A \sin B$
- $\cos(A + B) = \cos A \cos B - \sin A \sin B$

**Double Angle Formulas:**

- $\sin(2\theta) = 2\sin(\theta)\cos(\theta)$
- $\cos(2\theta) = \cos^2(\theta) - \sin^2(\theta) = 2\cos^2(\theta) - 1 = 1 - 2\sin^2(\theta)$

#### Diagram: Trig Identity Visualizer

<iframe src="../../sims/trig-identity-visualizer/main.html" width="100%" height="500px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Trig Identity Visualizer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Interpret

Learning Objective: Students will interpret the Pythagorean identity $\sin^2(\theta) + \cos^2(\theta) = 1$ geometrically using the unit circle.

Visual Elements:
- Unit circle with angle θ marked
- Right triangle inside circle showing sin θ (opposite), cos θ (adjacent), and radius 1 (hypotenuse)
- Squares drawn on each side of the triangle
- Area calculations shown: sin²θ, cos²θ, and their sum = 1
- Pythagorean theorem visualization

Interactive Controls:
- Angle slider (0 to 2π)
- Toggle between identities:
  - Pythagorean: sin²θ + cos²θ = 1
  - tan θ = sin θ / cos θ
  - sec²θ = 1 + tan²θ
- Show/hide area squares
- Numerical values displayed

Instructional Rationale: Seeing identities as geometric relationships makes them memorable and meaningful rather than arbitrary formulas to memorize.

Canvas size: 600×500px, responsive
Implementation: p5.js
</details>

!!! quote "Delta's Pun Corner"
    "Why do I love the unit circle? Because it really brings everything *full circle*!
    ...Okay, that one was bad even for me."

---

## Graphing Trigonometric Functions

Sine and cosine create smooth, wave-like graphs that repeat forever. Understanding their shape prepares you for analyzing periodic phenomena in calculus.

### Amplitude, Period, and Phase Shift

For the function $f(x) = A\sin(Bx + C) + D$:

| Parameter | Effect |
|-----------|--------|
| $A$ | **Amplitude**: vertical stretch, height of waves = $\|A\|$ |
| $B$ | **Period**: horizontal compression, period = $\frac{2\pi}{\|B\|}$ |
| $C$ | **Phase shift**: horizontal shift by $-\frac{C}{B}$ |
| $D$ | **Vertical shift**: moves midline up/down by $D$ |

#### Diagram: Trig Graph Transformer

<iframe src="../../sims/trig-graph-transformer/main.html" width="100%" height="550px" scrolling="no" style="border: none;"></iframe>

<details markdown="1">
<summary>Trig Graph Transformer</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate

Learning Objective: Students will demonstrate understanding of amplitude, period, phase shift, and vertical shift by manipulating parameters and predicting resulting changes to trigonometric graphs.

Visual Elements:
- Large graph area showing transformed trig function
- Parent function (sin x or cos x) shown in light gray for reference
- Midline shown as horizontal dashed line
- Amplitude marked with vertical arrows
- One period highlighted/bracketed
- Formula displayed: A·sin(Bx + C) + D with current values

Interactive Controls:
- Function selector: sin, cos, tan
- Slider A (amplitude): 0.5 to 3
- Slider B (period modifier): 0.5 to 4
- Slider C (phase shift): -π to π
- Slider D (vertical shift): -3 to 3
- Reset button
- Show/hide parent function toggle

Challenge Mode:
- Target graph displayed
- Student matches parameters
- Check answer with feedback

Instructional Rationale: Manipulating each parameter individually reveals its specific effect, building intuition for how the equation encodes the graph's shape.

Canvas size: 750×550px, responsive
Implementation: p5.js with canvas-based sliders
</details>

---

## Chapter Summary

Congratulations! You've reviewed the essential tools that make calculus possible. Let's recap what Delta has in her toolkit now:

### Functions and Their Properties

- A **function** assigns exactly one output to each input
- **Function notation** $f(x)$ lets us talk about specific inputs and outputs
- **Domain** is where a function is defined; **range** is what outputs are possible
- The **coordinate system** lets us graph functions and visualize their behavior

### Building and Transforming Functions

- **Composite functions** feed outputs of one function into another
- **Inverse functions** undo what the original function does
- **Transformations** shift, stretch, and flip graphs in predictable ways
- **Even functions** are symmetric about the y-axis; **odd functions** have rotational symmetry
- **Piecewise functions** use different rules on different domains

### Major Function Families

- **Polynomials**: smooth, continuous, well-behaved everywhere
- **Rational functions**: polynomial ratios with possible asymptotes
- **Exponentials**: model growth and decay; $e^x$ is special
- **Logarithms**: inverse of exponentials; $\ln(x)$ is most important
- **Trigonometric functions**: model periodic behavior; defined via the unit circle

!!! quote "Delta Says"
    "We've packed our backpack with all the precalculus tools we need. I can recognize
    any terrain we'll encounter—polynomial hills, rational function valleys with their
    asymptote walls, exponential growth spurts, and the beautiful periodic waves of
    trig functions.

    Now comes the exciting part: instead of just *describing* these curves, we're going
    to ask the calculus questions—How steep is it? How much accumulates? What happens
    as we get infinitely close?

    Chapter 2, here we come!"

---

## Concept Checklist

Before moving on, make sure you can:

- [ ] Evaluate functions using function notation
- [ ] Determine domain and range from formulas and graphs
- [ ] Plot points and read coordinates on the Cartesian plane
- [ ] Apply the vertical line test to identify functions
- [ ] Compute and interpret composite functions
- [ ] Find inverse functions algebraically and graphically
- [ ] Apply transformation rules to shift, stretch, and reflect graphs
- [ ] Identify even and odd functions
- [ ] Graph and analyze piecewise functions
- [ ] Describe polynomial end behavior from degree and leading coefficient
- [ ] Identify vertical and horizontal asymptotes of rational functions
- [ ] Work with exponential functions and their properties
- [ ] Use logarithm properties to simplify expressions
- [ ] Locate angles on the unit circle and find their sine and cosine
- [ ] Convert between degrees and radians
- [ ] Apply fundamental trigonometric identities
- [ ] Identify amplitude, period, and shifts of transformed trig functions

---

??? question "Self-Check: Are You Ready for Limits?"
    **Question:** Consider the function $f(x) = \frac{x^2 - 4}{x - 2}$.

    1. What is the domain of this function?
    2. Can you simplify the expression?
    3. What happens to $f(x)$ as $x$ gets very close to 2?

    *Click to reveal answer...*

    **Answers:**
    1. Domain: all real numbers except $x = 2$ (division by zero)
    2. $f(x) = \frac{(x-2)(x+2)}{x-2} = x + 2$ for $x \neq 2$
    3. As $x$ approaches 2, $f(x)$ approaches $2 + 2 = 4$

    This is exactly the kind of question that limits will help us answer precisely!
    The function isn't defined at $x = 2$, but it "wants" to equal 4 there.

