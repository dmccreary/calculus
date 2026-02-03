# Quiz: Continuity

Test your understanding of continuity concepts with these review questions.

---

#### 1. What are the three conditions required for a function to be continuous at x = a?

<div class="upper-alpha" markdown>
1. f(a) exists, f'(a) exists, and f''(a) exists
2. f(a) exists, lim(x→a) f(x) exists, and lim(x→a) f(x) = f(a)
3. The function is defined for all x near a
4. The graph has no sharp corners at x = a
</div>

??? question "Show Answer"
    The correct answer is **B**. The three conditions for continuity at a point are: (1) f(a) must exist, (2) the limit as x approaches a must exist, and (3) the limit must equal the function value. All three conditions must hold.

    **Concept Tested:** Three Conditions for Continuity

---

#### 2. A function has a removable discontinuity at x = 3. What does this mean?

<div class="upper-alpha" markdown>
1. The limit does not exist at x = 3
2. The limit exists but doesn't equal f(3), or f(3) is undefined
3. The function approaches infinity at x = 3
4. The left and right limits are different at x = 3
</div>

??? question "Show Answer"
    The correct answer is **B**. A removable discontinuity (or "hole") occurs when the limit exists at a point but either f(a) is undefined or f(a) ≠ lim(x→a) f(x). It can be "removed" by defining or redefining the function at that point.

    **Concept Tested:** Removable Discontinuity

---

#### 3. Which type of discontinuity occurs when lim(x→a⁻) f(x) ≠ lim(x→a⁺) f(x)?

<div class="upper-alpha" markdown>
1. Removable discontinuity
2. Jump discontinuity
3. Infinite discontinuity
4. Oscillating discontinuity
</div>

??? question "Show Answer"
    The correct answer is **B**. A jump discontinuity occurs when both one-sided limits exist but are not equal. The function "jumps" from one value to another. This is common in piecewise functions and step functions.

    **Concept Tested:** Jump Discontinuity

---

#### 4. At what type of discontinuity does the function approach infinity?

<div class="upper-alpha" markdown>
1. Removable discontinuity
2. Jump discontinuity
3. Infinite discontinuity
4. Essential discontinuity
</div>

??? question "Show Answer"
    The correct answer is **C**. An infinite discontinuity occurs when the function values become unbounded (approach ±∞) as x approaches a certain value. This creates a vertical asymptote in the graph.

    **Concept Tested:** Infinite Discontinuity

---

#### 5. If f and g are both continuous at x = a, which of the following must also be continuous at x = a?

<div class="upper-alpha" markdown>
1. f(x)/g(x) always
2. f(x) + g(x)
3. f(x)/g(x) only if g(a) ≠ 0
4. Both B and C
</div>

??? question "Show Answer"
    The correct answer is **D**. The sum of continuous functions is always continuous. The quotient is continuous where the denominator is non-zero. These are fundamental properties used throughout calculus.

    **Concept Tested:** Continuous Function

---

#### 6. Which statement about polynomial functions is true?

<div class="upper-alpha" markdown>
1. They are continuous only on bounded intervals
2. They are continuous everywhere on the real numbers
3. They have at least one discontinuity
4. They are continuous except at their zeros
</div>

??? question "Show Answer"
    The correct answer is **B**. Polynomial functions are continuous everywhere on the real number line—they have no breaks, jumps, or asymptotes. This makes them particularly nice to work with in calculus.

    **Concept Tested:** Continuity of Polynomials

---

#### 7. For the piecewise function f(x) = {x² if x < 2; 3x − 2 if x ≥ 2}, is f continuous at x = 2?

<div class="upper-alpha" markdown>
1. Yes, because both pieces are polynomials
2. Yes, because the left and right limits both equal 4
3. No, because the formulas are different
4. No, because there's always a jump at piecewise boundaries
</div>

??? question "Show Answer"
    The correct answer is **B**. Check: lim(x→2⁻) x² = 4, lim(x→2⁺) (3x−2) = 4, and f(2) = 3(2)−2 = 4. All three values are equal, so f is continuous at x = 2. The formulas being different doesn't automatically create discontinuity.

    **Concept Tested:** Piecewise Continuity

---

#### 8. What does the Intermediate Value Theorem guarantee?

<div class="upper-alpha" markdown>
1. Every continuous function has a maximum and minimum
2. If f is continuous on [a,b] and k is between f(a) and f(b), then f(c) = k for some c in (a,b)
3. The limit of a continuous function always exists
4. Continuous functions are differentiable
</div>

??? question "Show Answer"
    The correct answer is **B**. The Intermediate Value Theorem states that a continuous function on a closed interval takes on every value between f(a) and f(b). This is useful for proving existence of roots without finding them explicitly.

    **Concept Tested:** Intermediate Value Theorem

---

#### 9. Where is the function f(x) = 1/(x − 5) discontinuous?

<div class="upper-alpha" markdown>
1. x = 0
2. x = 1
3. x = 5
4. Nowhere; it's continuous everywhere
</div>

??? question "Show Answer"
    The correct answer is **C**. The function f(x) = 1/(x − 5) has an infinite discontinuity at x = 5 because the denominator equals zero there, causing the function to be undefined and approach infinity.

    **Concept Tested:** Continuity of Rationals

---

#### 10. To make f(x) = (x² − 9)/(x − 3) continuous at x = 3, what value should f(3) be defined as?

<div class="upper-alpha" markdown>
1. 0
2. 3
3. 6
4. 9
</div>

??? question "Show Answer"
    The correct answer is **C**. Factor: (x² − 9)/(x − 3) = (x+3)(x−3)/(x−3) = x+3 for x ≠ 3. The limit as x→3 is 6. To make the function continuous, define f(3) = 6 to match this limit.

    **Concept Tested:** Removing Discontinuities
