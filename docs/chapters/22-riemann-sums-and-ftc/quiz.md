# Quiz: Riemann Sums and the Fundamental Theorem

Test your understanding of Riemann sums and the FTC with these review questions.

---

#### 1. A Riemann sum approximates:

<div class="upper-alpha" markdown>
1. The derivative of a function
2. The area under a curve using rectangles
3. The maximum of a function
4. The limit of a sequence
</div>

??? question "Show Answer"
    The correct answer is **B**. A Riemann sum approximates the area under a curve by dividing the region into rectangles and summing their areas. More rectangles give better approximations.

    **Concept Tested:** Riemann Sum

---

#### 2. In a left Riemann sum, the height of each rectangle is:

<div class="upper-alpha" markdown>
1. The function value at the right endpoint
2. The function value at the left endpoint
3. The average of left and right values
4. The function value at the midpoint
</div>

??? question "Show Answer"
    The correct answer is **B**. In a left Riemann sum, each rectangle's height is the function value at the left endpoint of the subinterval.

    **Concept Tested:** Left Riemann Sum

---

#### 3. The definite integral ∫ₐᵇ f(x) dx is defined as:

<div class="upper-alpha" markdown>
1. F(b) + F(a)
2. The limit of Riemann sums as n→∞
3. f(b) − f(a)
4. The derivative of F(x)
</div>

??? question "Show Answer"
    The correct answer is **B**. The definite integral is defined as the limit of Riemann sums as the number of subintervals approaches infinity (and width approaches zero).

    **Concept Tested:** Definite Integral

---

#### 4. The Fundamental Theorem of Calculus, Part 1 states that d/dx[∫ₐˣ f(t) dt] equals:

<div class="upper-alpha" markdown>
1. f(a)
2. f(x)
3. F(x) − F(a)
4. ∫ₐˣ f'(t) dt
</div>

??? question "Show Answer"
    The correct answer is **B**. FTC Part 1: The derivative of an accumulation function is the integrand evaluated at the upper limit. d/dx[∫ₐˣ f(t) dt] = f(x).

    **Concept Tested:** FTC Part One

---

#### 5. The Fundamental Theorem of Calculus, Part 2 states that ∫ₐᵇ f(x) dx equals:

<div class="upper-alpha" markdown>
1. f(b) − f(a)
2. F(b) − F(a), where F' = f
3. F(a) − F(b)
4. f(b) + f(a)
</div>

??? question "Show Answer"
    The correct answer is **B**. FTC Part 2 (Evaluation Theorem): If F is an antiderivative of f, then ∫ₐᵇ f(x) dx = F(b) − F(a). This connects antiderivatives to definite integrals.

    **Concept Tested:** FTC Part Two

---

#### 6. What is ∫₀² x² dx?

<div class="upper-alpha" markdown>
1. 4
2. 8/3
3. 4/3
4. 2
</div>

??? question "Show Answer"
    The correct answer is **B**. F(x) = x³/3. By FTC: ∫₀² x² dx = F(2) − F(0) = 8/3 − 0 = 8/3.

    **Concept Tested:** Evaluation Theorem

---

#### 7. An accumulation function F(x) = ∫ₐˣ f(t) dt represents:

<div class="upper-alpha" markdown>
1. The slope of f at x
2. The accumulated area under f from a to x
3. The maximum of f
4. The average value of f
</div>

??? question "Show Answer"
    The correct answer is **B**. The accumulation function represents the signed area under f from a to x. As x increases, it "accumulates" more area.

    **Concept Tested:** Accumulation Function

---

#### 8. If d/dx[∫₀ˣ² f(t) dt], you must use:

<div class="upper-alpha" markdown>
1. FTC Part 1 only
2. FTC Part 2 only
3. FTC Part 1 combined with Chain Rule
4. Integration by parts
</div>

??? question "Show Answer"
    The correct answer is **C**. When the upper limit is a function of x (like x²), apply FTC Part 1 and then the Chain Rule: d/dx[∫₀^(g(x)) f(t) dt] = f(g(x)) · g'(x).

    **Concept Tested:** FTC Chain Rule

---

#### 9. The net signed area can be:

<div class="upper-alpha" markdown>
1. Only positive
2. Only negative
3. Positive, negative, or zero
4. Only zero
</div>

??? question "Show Answer"
    The correct answer is **C**. Net signed area counts area above the x-axis as positive and below as negative. The definite integral gives net signed area, which can be positive, negative, or zero.

    **Concept Tested:** Net Signed Area

---

#### 10. The trapezoidal rule approximates area using:

<div class="upper-alpha" markdown>
1. Rectangles with left endpoints
2. Rectangles with right endpoints
3. Trapezoids connecting function values
4. Triangles
</div>

??? question "Show Answer"
    The correct answer is **C**. The trapezoidal rule uses trapezoids instead of rectangles, connecting consecutive function values with line segments. It's generally more accurate than left or right sums.

    **Concept Tested:** Trapezoidal Rule
