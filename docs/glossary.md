# Glossary of Terms

This glossary provides definitions for key calculus concepts used throughout this textbook. Definitions follow ISO 11179 metadata standards: precise, concise, distinct, and non-circular.

#### Absolute Convergence

A property of an infinite series where the series of absolute values also converges.

A series with absolute convergence is "strongly" convergent—you can rearrange its terms without changing the sum. This contrasts with conditional convergence.

**Example:** The series Σ(-1)ⁿ/n² converges absolutely because Σ1/n² converges.

#### Acceleration

The rate of change of velocity with respect to time, measured as the second derivative of position.

In Delta's world, acceleration tells her whether she's speeding up or slowing down as she rolls along a curve. When acceleration and velocity have the same sign, she's speeding up!

**Example:** If position is s(t) = t³ - 6t², then acceleration is a(t) = s''(t) = 6t - 12.

#### Accumulation Function

A function defined as the integral of another function from a fixed lower bound to a variable upper bound.

The Fundamental Theorem of Calculus (Part 1) tells us that the derivative of an accumulation function gives back the original integrand.

**Example:** F(x) = ∫₀ˣ sin(t) dt is an accumulation function whose derivative is sin(x).

#### Alternating Series

An infinite series whose terms alternate between positive and negative values.

The alternating series test provides conditions under which these series converge: terms must decrease in absolute value and approach zero.

**Example:** 1 - 1/2 + 1/3 - 1/4 + ... is an alternating harmonic series.

#### Alternating Series Test

A convergence test stating that an alternating series converges if its terms decrease in absolute value and approach zero.

Also called the Leibniz Test. This is one of the friendlier convergence tests because it gives you a bonus: an error bound.

**Example:** The series Σ(-1)ⁿ⁺¹/n converges because 1/n decreases and approaches 0.

#### Antiderivative

A function F(x) whose derivative equals a given function f(x).

Finding antiderivatives is the reverse process of differentiation. Every continuous function has infinitely many antiderivatives, differing by a constant.

**Example:** F(x) = x³/3 is an antiderivative of f(x) = x² because F'(x) = x².

#### Arc Length

The distance measured along a curve between two points.

For a smooth curve y = f(x) from a to b, arc length is computed using L = ∫ₐᵇ √(1 + [f'(x)]²) dx.

**Example:** The arc length of y = x^(3/2) from x = 0 to x = 4 requires evaluating ∫₀⁴ √(1 + 9x/4) dx.

#### Arccos

The inverse function of cosine, returning the angle whose cosine is a given value.

Domain: [-1, 1]; Range: [0, π]. Also written as cos⁻¹(x).

**Example:** arccos(1/2) = π/3 because cos(π/3) = 1/2.

#### Arcsin

The inverse function of sine, returning the angle whose sine is a given value.

Domain: [-1, 1]; Range: [-π/2, π/2]. Also written as sin⁻¹(x).

**Example:** arcsin(1/2) = π/6 because sin(π/6) = 1/2.

#### Arctan

The inverse function of tangent, returning the angle whose tangent is a given value.

Domain: all real numbers; Range: (-π/2, π/2). Also written as tan⁻¹(x).

**Example:** arctan(1) = π/4 because tan(π/4) = 1.

#### Area Between Curves

The region enclosed between two functions, calculated using definite integrals.

Set up as ∫(top function - bottom function) dx for vertical slices, or ∫(right - left) dy for horizontal slices.

**Example:** Area between y = x² and y = x from 0 to 1 is ∫₀¹ (x - x²) dx = 1/6.

#### Asymptote

A line that a curve approaches but never reaches as the input or output becomes arbitrarily large.

Asymptotes describe the limiting behavior of functions. They can be vertical, horizontal, or oblique (slant).

**Example:** The function y = 1/x has a vertical asymptote at x = 0 and a horizontal asymptote at y = 0.

#### Average Rate of Change

The ratio of the change in output to the change in input over an interval.

Geometrically, this equals the slope of the secant line connecting two points on a curve. Calculus lets us shrink this to an instant.

**Example:** For f(x) = x², the average rate of change from x = 1 to x = 3 is (9-1)/(3-1) = 4.

#### Average Value

The mean value of a function over an interval, computed as the definite integral divided by the interval length.

Formula: (1/(b-a)) ∫ₐᵇ f(x) dx. This represents the height of a rectangle with the same area as the region under the curve.

**Example:** The average value of sin(x) on [0, π] is (1/π)∫₀^π sin(x) dx = 2/π.

#### Binomial Series

The Taylor series expansion of (1 + x)^k for any real exponent k.

This generalizes the binomial theorem to non-integer and negative exponents, converging for |x| < 1.

**Example:** (1 + x)^(1/2) = 1 + x/2 - x²/8 + x³/16 - ...

#### Bounded Function

A function whose output values stay within fixed upper and lower limits.

A function is bounded if there exists M such that |f(x)| ≤ M for all x in the domain.

**Example:** sin(x) is bounded because -1 ≤ sin(x) ≤ 1 for all x.

#### Candidates Test

A method for finding absolute extrema on a closed interval by evaluating the function at critical points and endpoints.

Also called the Closed Interval Method. Compare all candidate values to identify the absolute maximum and minimum.

**Example:** For f(x) = x³ - 3x on [-2, 2], evaluate f at x = -1, 1 (critical points) and x = ±2 (endpoints).

#### Cardioid

A heart-shaped polar curve with equation r = a(1 + cos θ) or r = a(1 + sin θ).

The name comes from the Greek word for "heart." Cardioids are special cases of limaçons.

**Example:** r = 1 + cos θ produces a cardioid passing through the origin when θ = π.

#### Carrying Capacity

In logistic growth, the maximum sustainable population that an environment can support.

Represented by K in the logistic equation dP/dt = kP(1 - P/K). The population approaches K as time increases.

**Example:** A pond ecosystem might have a carrying capacity of 500 fish.

#### Chain Rule

A differentiation rule for composite functions: the derivative of f(g(x)) equals f'(g(x)) · g'(x).

In Leibniz notation: dy/dx = (dy/du) · (du/dx). Think of it as "outside derivative times inside derivative."

**Example:** d/dx[sin(x²)] = cos(x²) · 2x = 2x cos(x²).

#### Comparison Test

A convergence test that compares a series to a known convergent or divergent series.

Direct Comparison: if 0 ≤ aₙ ≤ bₙ and Σbₙ converges, then Σaₙ converges. Similar logic for divergence.

**Example:** Σ1/(n² + 1) converges by comparison with Σ1/n².

#### Complete the Square

An algebraic technique for rewriting quadratic expressions to reveal their structure.

Useful for integration when the denominator is a quadratic that doesn't factor nicely.

**Example:** x² + 4x + 5 = (x + 2)² + 1, which leads to an arctangent integral.

#### Composite Function

A function formed by applying one function to the output of another, written as (f ∘ g)(x) = f(g(x)).

The inner function g is evaluated first, then its output becomes the input to f.

**Example:** If f(x) = x² and g(x) = sin(x), then (f ∘ g)(x) = sin²(x).

#### Concave Down

A curve that bends downward, where the second derivative is negative.

A concave down graph looks like a frown (or an upside-down bowl). Delta would say, "The climb is easing up!"

**Example:** f(x) = -x² is concave down everywhere because f''(x) = -2 < 0.

#### Concave Up

A curve that bends upward, where the second derivative is positive.

A concave up graph looks like a smile (or a bowl). Delta would say, "This hill is getting steeper—I'm working harder!"

**Example:** f(x) = x² is concave up everywhere because f''(x) = 2 > 0.

#### Concavity

The direction in which a curve bends, determined by the sign of the second derivative.

Concavity helps distinguish between different types of extrema and tells us about the rate of change of the rate of change.

**Example:** Where f''(x) > 0, the graph is concave up; where f''(x) < 0, it's concave down.

#### Conditional Convergence

A property of a series that converges but does not converge absolutely.

Conditionally convergent series are delicate—rearranging terms can change the sum or even make it diverge!

**Example:** The alternating harmonic series Σ(-1)ⁿ⁺¹/n converges conditionally.

#### Constant of Integration

An arbitrary constant C added to an indefinite integral to represent all possible antiderivatives.

Since the derivative of a constant is zero, infinitely many antiderivatives exist, differing by a constant.

**Example:** ∫2x dx = x² + C, where C can be any real number.

#### Constant Multiple Rule

A differentiation or integration rule stating that constants can be factored out.

For derivatives: d/dx[c·f(x)] = c·f'(x). For integrals: ∫c·f(x) dx = c·∫f(x) dx.

**Example:** d/dx[5x³] = 5·d/dx[x³] = 5·3x² = 15x².

#### Constant Rule

The derivative of a constant function is zero.

Makes sense because constants don't change—and derivatives measure change!

**Example:** d/dx[7] = 0.

#### Continuity

A property of a function where small changes in input produce small changes in output, with no breaks or jumps.

Informally, you can draw the graph without lifting your pencil. Formally, the limit equals the function value.

**Example:** f(x) = x² is continuous everywhere; f(x) = 1/x is continuous except at x = 0.

#### Continuity at a Point

A function is continuous at x = a if f(a) exists, lim(x→a) f(x) exists, and these two values are equal.

All three conditions must hold. Think of it as "you can reach the destination, the path leads somewhere, and they're the same place."

**Example:** f(x) = |x| is continuous at x = 0 because f(0) = 0 and lim(x→0) |x| = 0.

#### Convergent Sequence

A sequence whose terms approach a finite limit as the index increases without bound.

We write lim(n→∞) aₙ = L, meaning terms get arbitrarily close to L.

**Example:** The sequence aₙ = 1/n converges to 0.

#### Convergent Series

An infinite series whose partial sums approach a finite limit.

The sum "settles down" to a specific value as we add more and more terms.

**Example:** Σ(1/2)ⁿ from n=0 to ∞ converges to 2.

#### Coordinate System

A method for specifying points in space using numbers relative to reference axes.

Common systems include rectangular (Cartesian), polar, cylindrical, and spherical coordinates.

**Example:** The point (3, 4) in rectangular coordinates corresponds to (5, arctan(4/3)) in polar coordinates.

#### Corner Point

A point on a graph where the curve has a sharp corner, making the function non-differentiable there.

At corners, left and right derivatives exist but are different, so the tangent line is undefined.

**Example:** f(x) = |x| has a corner at x = 0.

#### Critical Number

A value in the domain of a function where the derivative equals zero or does not exist.

Critical numbers are candidates for local extrema. Not all critical numbers yield extrema, but all local extrema occur at critical numbers.

**Example:** For f(x) = x³ - 3x, the critical numbers are x = ±1 where f'(x) = 3x² - 3 = 0.

#### Critical Point

A point on a function's graph where the derivative is zero or undefined.

Delta calls these "flat spots worth investigating." They're where the function might have a peak, valley, or plateau.

**Example:** (0, 0) is a critical point of f(x) = x³ because f'(0) = 0.

#### Cross-Section Method

A technique for finding volumes by integrating the area of cross-sectional slices perpendicular to an axis.

If A(x) is the cross-sectional area at position x, then V = ∫ₐᵇ A(x) dx.

**Example:** A solid with square cross-sections of side length sin(x) from 0 to π has volume ∫₀^π sin²(x) dx.

#### Curvature

A measure of how sharply a curve bends at a given point.

Higher curvature means the curve turns more sharply; zero curvature means a straight line.

**Example:** A circle of radius r has constant curvature 1/r everywhere.

#### Cusp

A point where a curve comes to a sharp point with vertical tangent, making the function non-differentiable.

At a cusp, the derivative approaches ±∞ from both sides.

**Example:** f(x) = x^(2/3) has a cusp at x = 0.

#### Decay Constant

A positive constant k in exponential decay models describing the rate of decrease.

In the equation A(t) = A₀e^(-kt), larger k means faster decay.

**Example:** Radioactive carbon-14 has a decay constant of approximately 0.000121 per year.

#### Decreasing Function

A function where larger inputs produce smaller outputs over an interval.

Equivalently, a function is decreasing where its derivative is negative.

**Example:** f(x) = -x is decreasing everywhere because f'(x) = -1 < 0.

#### Definite Integral

The limit of Riemann sums, representing the signed area between a function and the x-axis over an interval.

Written as ∫ₐᵇ f(x) dx, where a is the lower limit and b is the upper limit.

**Example:** ∫₀^π sin(x) dx = 2 represents the area under one arch of the sine curve.

#### Derivative

The instantaneous rate of change of a function, measuring how the output changes as the input changes.

Geometrically, the derivative at a point equals the slope of the tangent line to the graph at that point.

**Example:** If f(x) = x², then f'(x) = 2x, so the derivative at x = 3 is 6.

#### Derivative at a Point

The value of a function's derivative evaluated at a specific input value.

This gives the instantaneous rate of change at that particular moment.

**Example:** For f(x) = x³, the derivative at x = 2 is f'(2) = 3(2)² = 12.

#### Derivative Function

A function that gives the derivative value for each input in the domain of the original function.

Also called simply "the derivative," it maps each x to the slope of the tangent line at that x.

**Example:** If f(x) = sin(x), then the derivative function is f'(x) = cos(x).

#### Derivative Notation

Symbols used to represent derivatives, including f'(x), dy/dx, Df, and ẏ.

Different notations suit different contexts: Leibniz notation (dy/dx) is great for chain rule and related rates.

**Example:** f'(x), dy/dx, and Df all represent the derivative of y = f(x).

#### Differentiability

A property of functions that have a well-defined derivative at a point or throughout a region.

Differentiable functions are locally linear—they can be approximated by their tangent lines near any point.

**Example:** f(x) = x² is differentiable everywhere; f(x) = |x| is not differentiable at x = 0.

#### Differential

An infinitesimally small change in a variable, written as dx or dy.

Differentials provide a way to approximate small changes: dy ≈ f'(x) dx.

**Example:** For y = x², dy = 2x dx approximates the change in y for small changes in x.

#### Differential Equation

An equation involving a function and one or more of its derivatives.

Solving a differential equation means finding all functions that satisfy the relationship.

**Example:** dy/dx = 2x is a differential equation with solution y = x² + C.

#### Direct Substitution

A method for evaluating limits by substituting the limit value directly into the function.

Works when the function is continuous at the limit point.

**Example:** lim(x→2)(x² + 1) = 2² + 1 = 5 by direct substitution.

#### Direction Field

A graphical representation showing the slope of solutions at various points, synonymous with slope field.

Each small line segment shows the direction a solution curve would travel through that point.

**Example:** For dy/dx = x + y, the direction field shows positive slopes in the first quadrant.

#### Discontinuity

A point where a function fails to be continuous, having a break, jump, or other irregularity.

Types include removable (hole), jump, and infinite (vertical asymptote) discontinuities.

**Example:** f(x) = 1/x has an infinite discontinuity at x = 0.

#### Disk Method

A technique for finding volumes of revolution by integrating the areas of circular disk cross-sections.

For revolution around the x-axis: V = π∫ₐᵇ [f(x)]² dx.

**Example:** The volume of a cone with height h and radius r can be found using the disk method.

#### Displacement

The net change in position, calculated as the integral of velocity.

Unlike total distance, displacement can be positive, negative, or zero.

**Example:** If velocity is v(t) = t - 2 on [0, 4], displacement is ∫₀⁴(t - 2)dt = 0.

#### Divergent Sequence

A sequence that does not approach any finite limit as the index increases.

The terms may grow without bound, oscillate, or behave chaotically.

**Example:** The sequence aₙ = (-1)ⁿ diverges because it oscillates between -1 and 1.

#### Divergent Series

An infinite series whose partial sums do not approach a finite limit.

The sum either grows without bound or fails to settle on any value.

**Example:** The harmonic series Σ1/n diverges even though its terms approach zero.

#### Domain

The set of all input values for which a function is defined.

Identifying domain restrictions is crucial for finding discontinuities and setting up problems correctly.

**Example:** The domain of f(x) = √x is [0, ∞) because we can't take square roots of negative numbers.

#### Dominant Term

The term in an expression that grows fastest as the variable approaches infinity, controlling end behavior.

For polynomials, this is the highest-degree term. It determines horizontal asymptotes and end behavior.

**Example:** In 3x⁴ - 2x² + 5, the dominant term is 3x⁴ as x → ∞.

#### Doubling Time

The time required for an exponentially growing quantity to double in size.

For the model P(t) = P₀e^(kt), doubling time is t = ln(2)/k.

**Example:** If a population grows at 5% per year, doubling time is ln(2)/0.05 ≈ 13.9 years.

#### End Behavior

The behavior of a function as the input approaches positive or negative infinity.

Describes what happens to f(x) as x → ∞ and as x → -∞.

**Example:** For f(x) = x³, end behavior shows f(x) → ∞ as x → ∞ and f(x) → -∞ as x → -∞.

#### Endpoint Extrema

Maximum or minimum values that occur at the endpoints of a closed interval.

When using the Candidates Test, always evaluate the function at endpoints.

**Example:** f(x) = x on [0, 1] has minimum 0 at the left endpoint and maximum 1 at the right.

#### Equilibrium Solution

A constant solution to a differential equation, representing a steady state.

Equilibrium solutions appear as horizontal lines in slope fields.

**Example:** For dy/dx = y(1 - y), the equilibrium solutions are y = 0 and y = 1.

#### Error Bound

An upper limit on the error when approximating a value using a truncated series or numerical method.

Error bounds tell us how accurate our approximation is guaranteed to be.

**Example:** For alternating series, the error is bounded by the absolute value of the first omitted term.

#### Euler's Method

A numerical technique for approximating solutions to differential equations using small step sizes.

Each step uses the slope at the current point to estimate the next point: yₙ₊₁ = yₙ + h·f(xₙ, yₙ).

**Example:** With step size h = 0.1, Euler's method approximates solutions by repeated linear steps.

#### Even Function

A function satisfying f(-x) = f(x), symmetric about the y-axis.

Recognizing even functions simplifies integration because ∫₋ₐᵃ f(x) dx = 2∫₀ᵃ f(x) dx.

**Example:** f(x) = x² and f(x) = cos(x) are even functions.

#### Exponential Decay

A model where a quantity decreases at a rate proportional to its current value.

Described by the equation A(t) = A₀e^(-kt) where k > 0.

**Example:** Radioactive decay follows an exponential decay model.

#### Exponential Function

A function of the form f(x) = aˣ where the variable appears in the exponent.

The natural exponential function eˣ is special because its derivative equals itself.

**Example:** f(x) = 2ˣ is an exponential function with base 2.

#### Exponential Growth

A model where a quantity increases at a rate proportional to its current value.

Described by the equation A(t) = A₀e^(kt) where k > 0.

**Example:** Compound interest and early-stage population growth follow exponential models.

#### Extreme Value Theorem

A theorem stating that a continuous function on a closed interval attains both a maximum and minimum value.

Guarantees the existence of extrema but doesn't tell you where they occur.

**Example:** f(x) = sin(x) on [0, 2π] must have a maximum and minimum because it's continuous on a closed interval.

#### Factoring for Limits

An algebraic technique for evaluating limits by factoring to cancel common factors.

Useful for 0/0 indeterminate forms where direct substitution fails.

**Example:** lim(x→2)(x² - 4)/(x - 2) = lim(x→2)(x + 2) = 4 after factoring.

#### First Derivative Test

A method for classifying critical points by analyzing the sign change of the first derivative.

If f' changes from positive to negative, there's a local maximum; negative to positive indicates a local minimum.

**Example:** For f(x) = x³ - 3x, f' changes sign at x = -1 (max) and x = 1 (min).

#### Function

A rule that assigns exactly one output value to each input value in its domain.

Functions are the fundamental objects of calculus—we study how they change and accumulate.

**Example:** f(x) = x² assigns to each real number x its square.

#### Function Notation

The symbolic way of writing functions using f(x) or similar notation.

The notation f(x) reads "f of x" and represents the output when x is the input.

**Example:** If f(x) = 2x + 1, then f(3) = 7.

#### Function Transformations

Operations that modify a function's graph through shifts, stretches, compressions, and reflections.

Understanding transformations helps sketch graphs and recognize function families.

**Example:** g(x) = 2f(x - 3) + 1 shifts f right 3, stretches vertically by 2, then shifts up 1.

#### Fundamental Theorem of Calculus

Two related theorems connecting differentiation and integration as inverse operations.

Part 1: d/dx[∫ₐˣ f(t) dt] = f(x). Part 2: ∫ₐᵇ f(x) dx = F(b) - F(a) where F' = f.

**Example:** ∫₀² x² dx = [x³/3]₀² = 8/3 - 0 = 8/3 using FTC Part 2.

#### General Solution

A solution to a differential equation containing arbitrary constants representing all possible solutions.

Applying initial conditions converts a general solution to a particular solution.

**Example:** The general solution to dy/dx = 2x is y = x² + C.

#### Geometric Series

An infinite series where each term is a constant multiple (common ratio) of the previous term.

Converges to a/(1-r) when |r| < 1, where a is the first term and r is the common ratio.

**Example:** 1 + 1/2 + 1/4 + 1/8 + ... = 1/(1 - 1/2) = 2.

#### Global Maximum

The largest value of a function over its entire domain.

Also called absolute maximum. May occur at a critical point or an endpoint.

**Example:** f(x) = -x² has a global maximum of 0 at x = 0.

#### Global Minimum

The smallest value of a function over its entire domain.

Also called absolute minimum. May occur at a critical point or an endpoint.

**Example:** f(x) = x² has a global minimum of 0 at x = 0.

#### Graphing Functions

The process of creating a visual representation of a function's input-output relationship.

Key features include intercepts, asymptotes, extrema, inflection points, and end behavior.

**Example:** Graphing f(x) = x³ - 3x reveals a local maximum at x = -1 and local minimum at x = 1.

#### Half-Life

The time required for an exponentially decaying quantity to reduce to half its initial value.

For A(t) = A₀e^(-kt), half-life is t₁/₂ = ln(2)/k.

**Example:** Carbon-14 has a half-life of approximately 5,730 years.

#### Harmonic Series

The infinite series 1 + 1/2 + 1/3 + 1/4 + ..., which diverges despite its terms approaching zero.

A classic example demonstrating that terms approaching zero doesn't guarantee convergence.

**Example:** Σ(1/n) from n = 1 to ∞ diverges, growing without bound (very slowly).

#### Higher-Order Derivative

A derivative of a derivative, representing successive rates of change.

The second derivative measures acceleration; third derivative measures jerk, and so on.

**Example:** If f(x) = x⁴, then f'(x) = 4x³, f''(x) = 12x², f'''(x) = 24x.

#### Horizontal Asymptote

A horizontal line that a graph approaches as x approaches positive or negative infinity.

Found by evaluating lim(x→±∞) f(x).

**Example:** f(x) = 1/x has horizontal asymptote y = 0.

#### Horizontal Tangent

A point where the tangent line is horizontal, meaning the derivative equals zero.

Horizontal tangents often indicate local extrema, but not always (consider y = x³ at x = 0).

**Example:** f(x) = x² has a horizontal tangent at x = 0 where f'(0) = 0.

#### Implicit Differentiation

A technique for finding derivatives when y is not explicitly solved in terms of x.

Differentiate both sides with respect to x, treating y as a function of x and using the chain rule.

**Example:** For x² + y² = 25, implicit differentiation gives 2x + 2y(dy/dx) = 0, so dy/dx = -x/y.

#### Implicit Function

A function defined by an equation relating x and y without solving for y explicitly.

The relationship F(x, y) = 0 implicitly defines y as a function of x (possibly multi-valued).

**Example:** The equation x² + y² = 1 implicitly defines y as a function of x.

#### Improper Integral

A definite integral with infinite limits or an integrand with a discontinuity in the interval.

Evaluated as a limit of proper integrals.

**Example:** ∫₁^∞ (1/x²) dx = lim(b→∞)[−1/x]₁ᵇ = 1.

#### Increasing Function

A function where larger inputs produce larger outputs over an interval.

Equivalently, a function is increasing where its derivative is positive.

**Example:** f(x) = x³ is increasing everywhere because f'(x) = 3x² ≥ 0.

#### Indefinite Integral

An antiderivative expressed with an arbitrary constant of integration.

Written as ∫f(x) dx = F(x) + C where F'(x) = f(x).

**Example:** ∫cos(x) dx = sin(x) + C.

#### Indeterminate Form

An expression like 0/0 or ∞/∞ where the limit cannot be determined without further analysis.

L'Hospital's Rule and algebraic techniques help resolve indeterminate forms.

**Example:** lim(x→0)(sin x)/x has the indeterminate form 0/0.

#### Infinite Discontinuity

A discontinuity where the function approaches positive or negative infinity.

Creates a vertical asymptote in the graph.

**Example:** f(x) = 1/x has an infinite discontinuity at x = 0.

#### Infinite Limit

A limit where the function values grow without bound as the input approaches a specific value.

Written as lim(x→a) f(x) = ∞ or = -∞.

**Example:** lim(x→0⁺) 1/x = ∞.

#### Inflection Point

A point where a function's concavity changes from up to down or down to up.

At inflection points, the second derivative is zero or undefined and changes sign.

**Example:** f(x) = x³ has an inflection point at x = 0 where concavity changes.

#### Initial Condition

A specified value of a solution at a particular point, used to determine a particular solution.

Given as an ordered pair (x₀, y₀) satisfying the solution.

**Example:** For dy/dx = 2x with y(0) = 3, the initial condition y(0) = 3 gives y = x² + 3.

#### Initial Value Problem

A differential equation together with initial conditions specifying a unique solution.

Abbreviated IVP. The solution satisfies both the differential equation and initial conditions.

**Example:** dy/dx = y with y(0) = 1 has solution y = eˣ.

#### Instantaneous Rate of Change

The rate of change at a specific instant, defined as the limit of average rates.

This is exactly what the derivative measures.

**Example:** If position is s(t) = t², instantaneous velocity at t = 3 is s'(3) = 6.

#### Instantaneous Velocity

The velocity at a specific moment, equal to the derivative of position.

Delta's "tilt" at any instant is her instantaneous velocity!

**Example:** For s(t) = t³ - 2t, instantaneous velocity is v(t) = 3t² - 2.

#### Integrand

The function being integrated, appearing between the integral sign and the differential.

In ∫f(x) dx, the integrand is f(x).

**Example:** In ∫x² dx, the integrand is x².

#### Integral Test

A convergence test comparing a series to a related improper integral.

If ∫₁^∞ f(x) dx converges, so does Σf(n), and vice versa.

**Example:** Σ1/n² converges because ∫₁^∞ 1/x² dx = 1 converges.

#### Integration by Parts

A technique for integrating products, based on the product rule for derivatives.

Formula: ∫u dv = uv - ∫v du. Choose u and dv strategically using LIATE.

**Example:** ∫x·eˣ dx = x·eˣ - ∫eˣ dx = x·eˣ - eˣ + C.

#### Intermediate Value Theorem

A theorem stating that a continuous function on [a, b] takes every value between f(a) and f(b).

Useful for proving existence of roots without finding them explicitly.

**Example:** Since f(x) = x² - 2 is continuous with f(1) = -1 and f(2) = 2, there exists c in (1, 2) where f(c) = 0.

#### Interval of Convergence

The set of all x-values for which a power series converges.

Can be an open interval, closed interval, half-open interval, or a single point.

**Example:** The series Σxⁿ has interval of convergence (-1, 1).

#### Inverse Function

A function that reverses another function, denoted f⁻¹(x).

If f(a) = b, then f⁻¹(b) = a. Only one-to-one functions have inverses.

**Example:** If f(x) = 2x + 3, then f⁻¹(x) = (x - 3)/2.

#### Inverse Function Theorem

A theorem relating the derivative of a function to the derivative of its inverse.

(f⁻¹)'(b) = 1/f'(a) where b = f(a).

**Example:** Since f(x) = x³ has f'(x) = 3x², the inverse f⁻¹(x) = x^(1/3) has derivative 1/(3x^(2/3)).

#### Inverse Trigonometric Function

A function that returns the angle whose trigonometric ratio is a given value.

Includes arcsin, arccos, arctan, arcsec, arccsc, and arccot with restricted ranges.

**Example:** arcsin(1/2) = π/6 returns the angle whose sine is 1/2.

#### Isocline

A curve in a slope field along which all slopes have the same value.

Setting dy/dx = constant gives the equation of an isocline.

**Example:** For dy/dx = x + y, the isocline where slope = 0 is the line y = -x.

#### Jerk

The rate of change of acceleration, equal to the third derivative of position.

Important in physics and engineering for understanding sudden changes in motion.

**Example:** For s(t) = t⁴, jerk is j(t) = s'''(t) = 24t.

#### Jump Discontinuity

A discontinuity where the left and right limits exist but are different.

The function "jumps" from one value to another.

**Example:** f(x) = floor(x) has jump discontinuities at all integers.

#### L'Hospital's Rule

A technique for evaluating indeterminate limits by differentiating numerator and denominator separately.

Applies to 0/0 and ∞/∞ forms: lim f(x)/g(x) = lim f'(x)/g'(x) if the latter exists.

**Example:** lim(x→0)(sin x)/x = lim(x→0)(cos x)/1 = 1.

#### Lagrange Error Bound

An upper bound on the error when approximating a function with its Taylor polynomial.

|Rₙ(x)| ≤ M|x - a|^(n+1)/(n+1)! where M bounds |f^(n+1)| on the interval.

**Example:** For the Maclaurin series of sin(x), the error bound helps determine how many terms are needed.

#### Left-Hand Limit

The limit of a function as the input approaches a value from the left (smaller values).

Written as lim(x→a⁻) f(x).

**Example:** For f(x) = |x|/x, lim(x→0⁻) f(x) = -1.

#### Left Riemann Sum

An approximation of a definite integral using the function value at the left endpoint of each subinterval.

Lₙ = Σf(xᵢ₋₁)Δx for subintervals [xᵢ₋₁, xᵢ].

**Example:** For f(x) = x² on [0, 2] with n = 4, use heights f(0), f(0.5), f(1), f(1.5).

#### Leibniz Notation

Derivative notation using the form dy/dx, emphasizing the ratio of differentials.

Particularly useful for chain rule, implicit differentiation, and related rates.

**Example:** dy/dx indicates the derivative of y with respect to x.

#### Lemniscate

A figure-eight shaped polar curve with equation r² = a²cos(2θ) or r² = a²sin(2θ).

Named for the Latin word for "ribbon."

**Example:** r² = 4cos(2θ) produces a lemniscate centered at the origin.

#### Limaçon

A polar curve with equation r = a + b cos(θ) or r = a + b sin(θ).

The shape varies from dimpled to cardioid to looped depending on the ratio a/b.

**Example:** r = 2 + cos(θ) is a limaçon with an inner loop when |b| > |a|.

#### Limit

The value that a function approaches as its input approaches a specified value.

Limits are the foundational concept of calculus, underlying both derivatives and integrals.

**Example:** lim(x→2)(x² - 4)/(x - 2) = 4, even though the function is undefined at x = 2.

#### Limit at Infinity

The value a function approaches as the input grows without bound.

Written as lim(x→∞) f(x) or lim(x→-∞) f(x).

**Example:** lim(x→∞) 1/x = 0.

#### Limit Comparison Test

A convergence test comparing the limit of the ratio of two series' terms.

If lim(aₙ/bₙ) = L where 0 < L < ∞, then both series converge or both diverge.

**Example:** Compare Σ1/(n² + 1) with Σ1/n² since their ratio approaches 1.

#### Limit Laws

Rules for combining limits, including sum, difference, product, quotient, and power rules.

These laws allow breaking complex limits into simpler pieces.

**Example:** lim(x→a)[f(x) + g(x)] = lim(x→a)f(x) + lim(x→a)g(x) if both limits exist.

#### Limit Notation

The symbolic expression lim(x→a) f(x) = L indicating the limit value.

Read as "the limit of f(x) as x approaches a equals L."

**Example:** lim(x→3) x² = 9.

#### Limit of Riemann Sum

The value that Riemann sums approach as the number of subdivisions increases.

This limit defines the definite integral.

**Example:** lim(n→∞) Σᵢ₌₁ⁿ (i/n)²·(1/n) = ∫₀¹ x² dx = 1/3.

#### Linear Approximation

An estimate of a function value using the tangent line at a nearby point.

Formula: f(x) ≈ f(a) + f'(a)(x - a) for x near a.

**Example:** √4.1 ≈ 2 + (1/4)(0.1) = 2.025 using linearization at a = 4.

#### Local Linearity

The property that differentiable functions closely resemble their tangent lines near any point.

This is why linear approximation works for small intervals.

**Example:** Zooming in on the graph of f(x) = sin(x) near x = 0 shows it looks like y = x.

#### Local Maximum

A point where the function value is larger than all nearby values.

A local max occurs where f' changes from positive to negative.

**Example:** f(x) = -x² has a local (and global) maximum at x = 0.

#### Local Minimum

A point where the function value is smaller than all nearby values.

A local min occurs where f' changes from negative to positive.

**Example:** f(x) = x² has a local (and global) minimum at x = 0.

#### Logarithmic Differentiation

A technique using logarithms to simplify differentiation of products, quotients, and variable exponents.

Take ln of both sides, differentiate implicitly, then solve for dy/dx.

**Example:** For y = xˣ, take ln: ln y = x ln x, then differentiate: y'/y = ln x + 1.

#### Logarithmic Function

A function of the form f(x) = logₐ(x), the inverse of exponential functions.

The natural logarithm ln(x) = logₑ(x) is most important in calculus.

**Example:** ln(e²) = 2 and e^(ln 5) = 5.

#### Logistic Growth

A growth model with a rate proportional to both current population and available capacity.

The logistic equation dP/dt = kP(1 - P/K) produces S-shaped growth curves.

**Example:** Population growth often follows logistic patterns, slowing as resources become limited.

#### Maclaurin Series

A Taylor series centered at x = 0.

Special case of Taylor series with simplified formulas for common functions.

**Example:** eˣ = 1 + x + x²/2! + x³/3! + ... (Maclaurin series for eˣ).

#### Marginal Cost

The derivative of the cost function, representing the cost to produce one additional unit.

Economists use marginal analysis to make optimal production decisions.

**Example:** If C(x) = 100 + 5x + 0.01x², marginal cost is C'(x) = 5 + 0.02x.

#### Marginal Revenue

The derivative of the revenue function, representing additional revenue from selling one more unit.

Profit is maximized when marginal revenue equals marginal cost.

**Example:** If R(x) = 10x - 0.02x², marginal revenue is R'(x) = 10 - 0.04x.

#### Mean Value Theorem

A theorem stating that for a differentiable function, there exists a point where the instantaneous rate equals the average rate.

If f is continuous on [a, b] and differentiable on (a, b), then f'(c) = (f(b) - f(a))/(b - a) for some c in (a, b).

**Example:** For f(x) = x² on [0, 2], the MVT guarantees a point where f'(c) = 2, namely c = 1.

#### Mean Value Theorem for Integrals

A theorem stating that a continuous function achieves its average value at some point in the interval.

There exists c in [a, b] where f(c) = (1/(b-a))∫ₐᵇ f(x) dx.

**Example:** For f(x) = x² on [0, 3], average value is 3, achieved at x = √3.

#### Midpoint Riemann Sum

An approximation using the function value at the midpoint of each subinterval.

Generally more accurate than left or right Riemann sums for the same number of subdivisions.

**Example:** For f(x) = x² on [0, 2] with n = 2, use heights f(0.5) and f(1.5).

#### Monotonicity

The property of a function that is either entirely increasing or entirely decreasing on an interval.

A function is monotonic if it changes direction only at isolated points or not at all.

**Example:** f(x) = eˣ is monotonically increasing on all of ℝ.

#### Natural Logarithm

The logarithm with base e, denoted ln(x).

The natural log is special because d/dx[ln x] = 1/x and ∫(1/x) dx = ln|x| + C.

**Example:** ln(e) = 1 and ln(1) = 0.

#### Net Change Theorem

A theorem stating that the integral of a rate of change gives the net change in the quantity.

∫ₐᵇ f'(x) dx = f(b) - f(a).

**Example:** ∫₀³ v(t) dt gives net displacement (not total distance) over [0, 3].

#### Newton's Law of Cooling

A model stating that the rate of temperature change is proportional to the temperature difference with surroundings.

dT/dt = -k(T - Tₛ) where Tₛ is the surrounding temperature.

**Example:** A cup of coffee at 90°C cooling in a 20°C room follows this model.

#### Non-Differentiable Point

A point where a function is continuous but the derivative does not exist.

Occurs at corners, cusps, and vertical tangents.

**Example:** f(x) = |x| is non-differentiable at x = 0 (corner).

#### nth Term Test

A test stating that if lim(n→∞) aₙ ≠ 0, then the series Σaₙ diverges.

Also called the Divergence Test. Passing this test (terms → 0) doesn't prove convergence!

**Example:** Σn/(n+1) diverges because lim aₙ = 1 ≠ 0.

#### Number Line

A visual representation of real numbers as points on a line.

Used to show intervals, inequalities, and sign analysis for derivatives.

**Example:** The solution to |x| < 2 is the interval (-2, 2) shown on a number line.

#### Numerical Estimation

Approximating values using numerical methods rather than exact algebraic solutions.

Includes Riemann sums, Euler's method, and Newton's method.

**Example:** Estimating ∫₀¹ eˣ² dx using midpoint Riemann sums since no closed form exists.

#### Objective Function

The function to be maximized or minimized in an optimization problem.

Express in terms of a single variable using constraint equations.

**Example:** When maximizing area with fixed perimeter, A = xy is the objective function.

#### Oblique Asymptote

A slanted line that a graph approaches as x approaches infinity, occurring when the degree of the numerator exceeds the denominator by exactly one.

Also called a slant asymptote. Found using polynomial long division.

**Example:** f(x) = (x² + 1)/x has oblique asymptote y = x.

#### Odd Function

A function satisfying f(-x) = -f(x), symmetric about the origin.

For odd functions, ∫₋ₐᵃ f(x) dx = 0.

**Example:** f(x) = x³ and f(x) = sin(x) are odd functions.

#### One-Sided Derivative

A derivative computed using only values from one side of the point.

Useful for analyzing behavior at endpoints and discontinuities.

**Example:** The right derivative of |x| at 0 is 1; the left derivative is -1.

#### One-Sided Limit

A limit where the input approaches from only one direction (left or right).

The two-sided limit exists only if both one-sided limits exist and are equal.

**Example:** lim(x→0⁺) 1/x = +∞ and lim(x→0⁻) 1/x = -∞.

#### Optimization

The process of finding maximum or minimum values of a function subject to constraints.

Set f'(x) = 0, solve for critical points, and verify you've found an extremum.

**Example:** Finding the dimensions of a box with maximum volume given fixed surface area.

#### p-Series

A series of the form Σ(1/nᵖ) for a fixed exponent p.

Converges if p > 1, diverges if p ≤ 1.

**Example:** Σ1/n² converges (p = 2 > 1); Σ1/√n diverges (p = 1/2 < 1).

#### Parameter

An independent variable that determines the coordinates of points on a parametric curve.

Usually denoted t, representing time or another quantity.

**Example:** In x = cos(t), y = sin(t), the parameter t traces out a circle.

#### Parametric Arc Length

The length of a parametric curve calculated using L = ∫ₐᵇ √[(dx/dt)² + (dy/dt)²] dt.

This formula accounts for motion in both x and y directions.

**Example:** For x = t², y = t³ on [0, 1], arc length involves √(4t² + 9t⁴).

#### Parametric Curve

A curve defined by giving x and y coordinates as functions of a parameter.

Allows representation of curves that aren't functions, including spirals and loops.

**Example:** x = 2cos(t), y = 2sin(t) parametrizes a circle of radius 2.

#### Parametric Equation

An equation expressing coordinates as functions of a parameter.

Pairs of equations x = f(t), y = g(t) define a parametric curve.

**Example:** x = t, y = t² parametrizes the parabola y = x².

#### Partial Fractions

A technique for decomposing rational functions into simpler fractions for integration.

Works when the degree of numerator is less than the degree of denominator.

**Example:** 1/(x²-1) = 1/2·[1/(x-1) - 1/(x+1)].

#### Partial Sum

The sum of the first n terms of an infinite series.

If partial sums approach a limit, the series converges to that limit.

**Example:** The partial sums of 1 + 1/2 + 1/4 + ... are 1, 3/2, 7/4, 15/8, ... → 2.

#### Particular Solution

A specific solution to a differential equation satisfying given initial conditions.

Obtained by determining the constant of integration from initial values.

**Example:** y = x² + 3 is the particular solution to dy/dx = 2x with y(0) = 3.

#### Piecewise Function

A function defined by different formulas on different parts of its domain.

Analyze continuity and differentiability at the boundary points.

**Example:** f(x) = {x² if x < 0; x if x ≥ 0} is piecewise-defined.

#### Polar Area Formula

The formula A = (1/2)∫ₐᵇ r² dθ for area enclosed by a polar curve.

Derived by summing areas of thin triangular sectors.

**Example:** Area inside r = 2cos(θ) is (1/2)∫₀^π 4cos²(θ) dθ = π.

#### Polar Axis

The ray from the pole at angle 0, corresponding to the positive x-axis.

The reference direction for measuring angles in polar coordinates.

**Example:** The polar axis is typically drawn pointing to the right.

#### Polar Coordinates

A coordinate system using distance from the origin (r) and angle from the polar axis (θ).

Well-suited for curves with radial symmetry.

**Example:** The point (1, 1) in Cartesian is (√2, π/4) in polar coordinates.

#### Polar Curve

A curve defined by an equation in polar coordinates, r = f(θ).

Includes roses, limaçons, cardioids, lemniscates, and spirals.

**Example:** r = sin(2θ) is a four-petaled rose curve.

#### Pole

The origin in a polar coordinate system.

All points with r = 0 map to the pole, regardless of θ.

**Example:** The pole is the center point from which all distances are measured.

#### Polynomial Function

A function consisting of terms with non-negative integer powers of the variable.

The degree is the highest power. Polynomials are continuous and differentiable everywhere.

**Example:** f(x) = 3x⁴ - 2x² + 5x - 1 is a polynomial of degree 4.

#### Position Function

A function s(t) giving the location of an object at time t.

Velocity is s'(t); acceleration is s''(t).

**Example:** s(t) = -16t² + 64t + 80 models the height of a projectile.

#### Position Vector

A vector from the origin to a point, representing location in space.

For a particle at (x, y), the position vector is r(t) = ⟨x(t), y(t)⟩.

**Example:** r(t) = ⟨cos(t), sin(t)⟩ gives positions on the unit circle.

#### Power Rule

A differentiation rule stating d/dx[xⁿ] = nxⁿ⁻¹.

Works for any real exponent n.

**Example:** d/dx[x⁵] = 5x⁴.

#### Power Rule for Integration

An integration rule stating ∫xⁿ dx = xⁿ⁺¹/(n+1) + C for n ≠ -1.

The reverse of the power rule for derivatives.

**Example:** ∫x³ dx = x⁴/4 + C.

#### Power Series

An infinite series of the form Σaₙ(x - c)ⁿ centered at c.

Represents functions as infinite polynomials within the interval of convergence.

**Example:** Σxⁿ/n! = eˣ for all x.

#### Prime Notation

Derivative notation using tick marks, such as f'(x) for the first derivative.

f''(x) denotes the second derivative, f'''(x) the third.

**Example:** If f(x) = x³, then f'(x) = 3x².

#### Product Rule

A rule for differentiating products: d/dx[f(x)g(x)] = f'(x)g(x) + f(x)g'(x).

Memorize as "derivative of first times second, plus first times derivative of second."

**Example:** d/dx[x·sin(x)] = sin(x) + x·cos(x).

#### Projectile Motion

The motion of an object under gravity with initial velocity but no other forces.

Modeled parametrically: x(t) = v₀cos(θ)t, y(t) = v₀sin(θ)t - (1/2)gt².

**Example:** A ball thrown at 20 m/s at 45° follows a parabolic path.

#### Quotient Rule

A rule for differentiating quotients: d/dx[f(x)/g(x)] = [f'(x)g(x) - f(x)g'(x)]/[g(x)]².

Often remembered as "low d-high minus high d-low over low squared."

**Example:** d/dx[sin(x)/x] = [x·cos(x) - sin(x)]/x².

#### Radian Measure

An angle measure where one radian equals the angle subtended by an arc equal to the radius.

Radians are essential for calculus because derivative formulas for trig functions require radians.

**Example:** 180° = π radians, so 90° = π/2 radians.

#### Radius of Convergence

The value R such that a power series converges for |x - c| < R and diverges for |x - c| > R.

Found using the ratio test. Endpoints must be checked separately.

**Example:** The series Σxⁿ has radius of convergence R = 1.

#### Range

The set of all output values of a function.

Also called the image of the function.

**Example:** The range of f(x) = x² is [0, ∞).

#### Rate of Change

How quickly one quantity changes relative to another.

Average rate uses a difference quotient; instantaneous rate uses a derivative.

**Example:** Speed is the rate of change of distance with respect to time.

#### Ratio Test

A convergence test using the limit of |aₙ₊₁/aₙ|.

If this limit is less than 1, the series converges; greater than 1, it diverges.

**Example:** Σn!/nⁿ: ratio |aₙ₊₁/aₙ| → 1/e < 1, so it converges.

#### Rationalization

An algebraic technique multiplying by a conjugate to eliminate radicals.

Useful for evaluating limits with radicals in numerator or denominator.

**Example:** lim(x→0)(√(x+1) - 1)/x: multiply by (√(x+1) + 1)/(√(x+1) + 1).

#### Rational Function

A function that is the ratio of two polynomial functions.

Domain excludes values where the denominator equals zero.

**Example:** f(x) = (x² + 1)/(x - 3) is a rational function.

#### Real Numbers

The set of all rational and irrational numbers, corresponding to points on a number line.

Calculus primarily deals with functions of real variables.

**Example:** π, √2, -3, and 0.5 are all real numbers.

#### Rectangular Form

Coordinates or equations expressed using x and y in the Cartesian system.

Contrast with polar form using r and θ.

**Example:** x² + y² = 4 is the rectangular form of the polar equation r = 2.

#### Related Rates

Problems involving the rates of change of related quantities, solved using implicit differentiation.

Set up an equation relating the quantities, then differentiate with respect to time.

**Example:** If a balloon's radius increases at 2 cm/s, how fast is the volume increasing?

#### Removable Discontinuity

A discontinuity that can be "removed" by redefining the function at a single point.

Occurs when the limit exists but doesn't equal the function value (or function is undefined).

**Example:** f(x) = (x² - 1)/(x - 1) has a removable discontinuity at x = 1.

#### Riemann Sum

An approximation of a definite integral using rectangles.

Left, right, midpoint, and trapezoidal are common types.

**Example:** Σf(xᵢ)Δx approximates ∫ₐᵇ f(x) dx.

#### Right-Hand Limit

The limit of a function as the input approaches a value from the right (larger values).

Written as lim(x→a⁺) f(x).

**Example:** For f(x) = |x|/x, lim(x→0⁺) f(x) = 1.

#### Right Riemann Sum

An approximation using the function value at the right endpoint of each subinterval.

Rₙ = Σf(xᵢ)Δx for subintervals [xᵢ₋₁, xᵢ].

**Example:** For f(x) = x² on [0, 2] with n = 4, use heights f(0.5), f(1), f(1.5), f(2).

#### Rolle's Theorem

A special case of the Mean Value Theorem when f(a) = f(b).

If f is continuous on [a, b], differentiable on (a, b), and f(a) = f(b), then f'(c) = 0 for some c.

**Example:** f(x) = sin(x) on [0, π] has f(0) = f(π) = 0, so f'(c) = 0 somewhere (at c = π/2).

#### Root Test

A convergence test using lim(n→∞) |aₙ|^(1/n).

If this limit is less than 1, the series converges; greater than 1, it diverges.

**Example:** Σ(n/(n+1))ⁿ²: use the root test since terms have n in the exponent.

#### Rose Curve

A polar curve with equation r = a cos(nθ) or r = a sin(nθ) forming petal shapes.

Has n petals if n is odd, 2n petals if n is even.

**Example:** r = cos(3θ) is a three-petaled rose.

#### Secant Line

A line passing through two points on a curve.

The slope of a secant line equals the average rate of change over that interval.

**Example:** The secant line through (1, 1) and (3, 9) on y = x² has slope 4.

#### Second Derivative

The derivative of the derivative, measuring the rate of change of the rate of change.

Positive second derivative indicates concave up; negative indicates concave down.

**Example:** If f(x) = x³, then f'(x) = 3x² and f''(x) = 6x.

#### Second Derivative Test

A method for classifying critical points using the sign of the second derivative.

At a critical point: f'' > 0 means local minimum; f'' < 0 means local maximum; f'' = 0 is inconclusive.

**Example:** For f(x) = x⁴, f'(0) = 0 and f''(0) = 0, so the test is inconclusive.

#### Separable Differential Equation

A differential equation that can be written with all y terms on one side and all x terms on the other.

Solved by separating variables and integrating both sides.

**Example:** dy/dx = xy can be written as dy/y = x dx and integrated.

#### Sequence

An ordered list of numbers following a pattern, written as {aₙ}.

Each number in the sequence is called a term.

**Example:** The sequence aₙ = 1/n is 1, 1/2, 1/3, 1/4, ...

#### Series

The sum of the terms of a sequence.

An infinite series is written as Σaₙ = a₁ + a₂ + a₃ + ...

**Example:** The series Σ(1/2)ⁿ = 1/2 + 1/4 + 1/8 + ... = 1.

#### Shell Method

A technique for finding volumes of revolution using cylindrical shells.

V = 2π∫ₐᵇ (radius)(height) dx. Useful when the axis is parallel to the variable of integration.

**Example:** Rotating y = x² around the y-axis: V = 2π∫₀ʳ x·x² dx.

#### Sign Chart

A diagram showing where a function or its derivatives are positive, negative, or zero.

Used to determine intervals of increase/decrease and concavity.

**Example:** For f'(x) = (x-1)(x+2), the sign chart shows f' < 0 on (-2, 1).

#### Sigma Notation

Compact notation Σᵢ₌₁ⁿ aᵢ for sums.

The variable i is the index of summation, ranging from the lower to upper limit.

**Example:** Σᵢ₌₁⁴ i² = 1 + 4 + 9 + 16 = 30.

#### Slope Field

A graphical representation of a differential equation showing slopes at various points.

Each short line segment shows the slope of solutions passing through that point.

**Example:** For dy/dx = y, the slope field shows steeper slopes for larger y values.

#### Speed

The absolute value of velocity, representing how fast an object is moving regardless of direction.

Speed = |v(t)|. Unlike velocity, speed is always non-negative.

**Example:** If v(t) = t - 2, speed is |t - 2|.

#### Spiral

A polar curve where r continuously increases or decreases as θ increases.

The Archimedean spiral r = aθ is a common example.

**Example:** r = θ/2 spirals outward, getting farther from the origin as θ increases.

#### Squeeze Theorem

A theorem stating that if f(x) ≤ g(x) ≤ h(x) and lim f(x) = lim h(x) = L, then lim g(x) = L.

Useful for proving limits that can't be evaluated directly.

**Example:** lim(x→0) x²sin(1/x) = 0 because -x² ≤ x²sin(1/x) ≤ x² and both bounds → 0.

#### Stable Equilibrium

An equilibrium solution where nearby solutions converge toward it.

If disturbed slightly, the system returns to equilibrium.

**Example:** In dy/dx = -y, the equilibrium y = 0 is stable.

#### Step Size

The increment h used in numerical methods like Euler's method.

Smaller step sizes generally give more accurate approximations but require more computation.

**Example:** With step size h = 0.1, Euler's method moves from x = 0 to x = 0.1 to x = 0.2, etc.

#### Substitution Method

An integration technique that reverses the chain rule.

Choose u = g(x), find du = g'(x) dx, and rewrite the integral in terms of u.

**Example:** ∫2x cos(x²) dx: let u = x², du = 2x dx, giving ∫cos(u) du = sin(u) + C.

#### Sum Rule

A differentiation or integration rule for sums of functions.

d/dx[f(x) + g(x)] = f'(x) + g'(x). Similarly for integrals.

**Example:** d/dx[x² + sin(x)] = 2x + cos(x).

#### Tangent Line

A line that touches a curve at exactly one point locally and has the same slope as the curve there.

The equation is y - f(a) = f'(a)(x - a) at the point (a, f(a)).

**Example:** The tangent to y = x² at (1, 1) is y - 1 = 2(x - 1), or y = 2x - 1.

#### Taylor Polynomial

A polynomial approximation of a function centered at a point, using derivatives at that point.

The nth-degree Taylor polynomial Pₙ(x) matches f through n derivatives at x = a.

**Example:** P₂(x) = 1 + x + x²/2 approximates eˣ near x = 0.

#### Taylor Series

An infinite series representation of a function as a sum of terms based on derivatives at a center point.

f(x) = Σₙ₌₀^∞ f⁽ⁿ⁾(a)/n! · (x-a)ⁿ.

**Example:** sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + ...

#### Telescoping Series

A series where consecutive terms cancel, leaving only a few terms in each partial sum.

Write out partial sums to see the cancellation pattern.

**Example:** Σ[1/n - 1/(n+1)] = (1 - 1/2) + (1/2 - 1/3) + ... = 1.

#### Total Distance

The sum of absolute values of displacements, equal to ∫|v(t)| dt.

Unlike displacement, total distance counts all movement regardless of direction.

**Example:** A ball thrown up and caught travels total distance = 2 × max height.

#### Trapezoidal Rule

A numerical integration method using trapezoids instead of rectangles.

Tₙ = (Δx/2)[f(x₀) + 2f(x₁) + ... + 2f(xₙ₋₁) + f(xₙ)].

**Example:** More accurate than left or right Riemann sums for the same number of subdivisions.

#### Trigonometric Function

Functions based on angles and ratios in triangles: sine, cosine, tangent, and their reciprocals.

Essential in calculus for modeling periodic phenomena.

**Example:** sin(x) and cos(x) have derivatives that cycle through each other.

#### Trigonometric Identities

Equations relating trigonometric functions that are true for all valid inputs.

Used to simplify expressions before differentiation or integration.

**Example:** sin²(x) + cos²(x) = 1 is the Pythagorean identity.

#### Two-Sided Limit

A limit where both left-hand and right-hand limits exist and are equal.

This is the standard notion of "limit" in calculus.

**Example:** lim(x→0) x² = 0 because both one-sided limits equal 0.

#### u-Substitution

A technique for integration that reverses the chain rule, using a substitution u = g(x).

The key is recognizing that du = g'(x) dx appears in the integrand.

**Example:** ∫sin(x)cos(x) dx: let u = sin(x), du = cos(x) dx, giving ∫u du = u²/2.

#### Unbounded Behavior

Function values that grow without limit as input approaches a specific value or infinity.

Indicated by infinite limits or limits at infinity.

**Example:** lim(x→0⁺) 1/x = +∞ shows unbounded behavior.

#### Unit Circle

A circle of radius 1 centered at the origin, fundamental for defining trigonometric functions.

Coordinates on the unit circle: (cos θ, sin θ).

**Example:** At θ = π/4, the unit circle point is (√2/2, √2/2).

#### Unstable Equilibrium

An equilibrium solution where nearby solutions diverge away from it.

Small perturbations cause the system to move away from equilibrium.

**Example:** In dy/dx = y, the equilibrium y = 0 is unstable.

#### Variable of Integration

The variable with respect to which integration is performed, appearing in dx, dt, etc.

A "dummy variable" that can be renamed without changing the integral's value.

**Example:** In ∫x² dx, the variable of integration is x.

#### Vector-Valued Function

A function whose output is a vector, written as r(t) = ⟨f(t), g(t)⟩.

Describes paths in the plane or space as the parameter varies.

**Example:** r(t) = ⟨cos t, sin t⟩ traces the unit circle.

#### Velocity

The rate of change of position with respect to time, given by the derivative of position.

Velocity includes direction (can be negative); speed is its absolute value.

**Example:** If s(t) = t² - 4t, then v(t) = s'(t) = 2t - 4.

#### Velocity Vector

A vector giving both speed and direction of motion at an instant.

v(t) = r'(t) = ⟨x'(t), y'(t)⟩.

**Example:** For r(t) = ⟨t², t³⟩, velocity is v(t) = ⟨2t, 3t²⟩.

#### Vertical Asymptote

A vertical line x = a that a graph approaches as the function values become unbounded.

Occurs where the denominator of a rational function equals zero.

**Example:** f(x) = 1/(x - 2) has a vertical asymptote at x = 2.

#### Vertical Tangent

A point where the tangent line is vertical, meaning the derivative is undefined (approaches infinity).

The curve passes through the point but the slope is infinitely steep.

**Example:** f(x) = x^(1/3) has a vertical tangent at x = 0.

#### Volume by Revolution

The volume of a solid formed by rotating a region around an axis.

Calculated using disk, washer, or shell methods.

**Example:** Rotating y = √x from 0 to 4 around the x-axis gives V = π∫₀⁴ x dx = 8π.

#### Washer Method

A technique for finding volumes of revolution with hollow centers, using concentric circles.

V = π∫ₐᵇ [(outer radius)² - (inner radius)²] dx.

**Example:** Rotating the region between y = x and y = x² around the x-axis.
