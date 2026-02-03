# Quiz: Differentiability

Test your understanding of differentiability with these review questions.

---

#### 1. If a function is differentiable at a point, it must also be:

<div class="upper-alpha" markdown>
1. Increasing at that point
2. Continuous at that point
3. Defined on all real numbers
4. Equal to zero at that point
</div>

??? question "Show Answer"
    The correct answer is **B**. Differentiability implies continuity—if f'(a) exists, then f must be continuous at a. This is a fundamental theorem in calculus. The converse is false: continuity does not imply differentiability.

    **Concept Tested:** Differentiability Implies Continuity

---

#### 2. Which of the following is NOT a point where a function can fail to be differentiable?

<div class="upper-alpha" markdown>
1. A corner point
2. A cusp
3. A point where the function is continuous and smooth
4. A vertical tangent
</div>

??? question "Show Answer"
    The correct answer is **C**. If a function is continuous and smooth (no sharp features) at a point, it's differentiable there. Corners, cusps, and vertical tangents all prevent differentiability.

    **Concept Tested:** Non-Differentiable Points

---

#### 3. The function f(x) = |x| is not differentiable at x = 0 because:

<div class="upper-alpha" markdown>
1. It is not continuous at x = 0
2. It has a corner (left and right derivatives differ)
3. It has a vertical tangent
4. It approaches infinity
</div>

??? question "Show Answer"
    The correct answer is **B**. At x = 0, the left derivative is −1 and the right derivative is +1. Since these one-sided derivatives are different, the derivative doesn't exist at x = 0. This creates a corner or "V" shape.

    **Concept Tested:** Corner Point

---

#### 4. The function f(x) = x^(2/3) has what type of non-differentiable point at x = 0?

<div class="upper-alpha" markdown>
1. Corner
2. Jump discontinuity
3. Cusp
4. Removable discontinuity
</div>

??? question "Show Answer"
    The correct answer is **C**. At x = 0, the function f(x) = x^(2/3) has a cusp—the curve comes to a sharp point where the derivative approaches ±∞ from both sides. The tangent line would be vertical.

    **Concept Tested:** Cusp

---

#### 5. If a function has a vertical tangent at x = a, which statement is true?

<div class="upper-alpha" markdown>
1. f(a) is undefined
2. f'(a) = 0
3. f'(a) does not exist (approaches ±∞)
4. The function is discontinuous at x = a
</div>

??? question "Show Answer"
    The correct answer is **C**. A vertical tangent means the slope is infinite (undefined). The derivative doesn't exist at that point, but the function itself is continuous there. The curve is so steep it's vertical.

    **Concept Tested:** Vertical Tangent Point

---

#### 6. Which statement about the relationship between continuity and differentiability is correct?

<div class="upper-alpha" markdown>
1. If a function is continuous, it must be differentiable
2. If a function is differentiable, it might not be continuous
3. Continuity is necessary but not sufficient for differentiability
4. Differentiability is necessary for continuity
</div>

??? question "Show Answer"
    The correct answer is **C**. Continuity is necessary (differentiable implies continuous) but not sufficient (continuous doesn't imply differentiable). A function must be continuous to be differentiable, but continuity alone doesn't guarantee differentiability.

    **Concept Tested:** Continuous Not Implies Differentiable

---

#### 7. What can you conclude if the left-hand derivative and right-hand derivative at x = a are equal?

<div class="upper-alpha" markdown>
1. The function is continuous at x = a
2. The function is differentiable at x = a
3. The function has a corner at x = a
4. The limit exists at x = a
</div>

??? question "Show Answer"
    The correct answer is **B**. When both one-sided derivatives exist and are equal, the (two-sided) derivative exists at that point. This is the definition of differentiability at a point.

    **Concept Tested:** One-Sided Derivative

---

#### 8. The principle of local linearity means that:

<div class="upper-alpha" markdown>
1. All functions are linear
2. Differentiable functions look like straight lines when zoomed in sufficiently
3. The derivative is always constant
4. Linear functions are the only differentiable functions
</div>

??? question "Show Answer"
    The correct answer is **B**. Local linearity means that if you zoom in far enough on a differentiable function at any point, the graph will look like a straight line—its tangent line. This is why linear approximation works.

    **Concept Tested:** Local Linearity

---

#### 9. For the piecewise function f(x) = {x² if x ≤ 1; 2x−1 if x > 1}, is f differentiable at x = 1?

<div class="upper-alpha" markdown>
1. Yes, because both pieces are differentiable
2. Yes, because the function is continuous at x = 1
3. No, because the left and right derivatives are different
4. No, because piecewise functions are never differentiable
</div>

??? question "Show Answer"
    The correct answer is **C**. Left derivative at x = 1: d/dx(x²) = 2x = 2. Right derivative at x = 1: d/dx(2x−1) = 2. Both equal 2! Check continuity: both give f(1) = 1. Actually, f IS differentiable at x = 1. Let me reconsider...

    The correct answer is **A** (or we need to verify). Left: f'(1⁻) = 2(1) = 2. Right: f'(1⁺) = 2. They match! And f(1) = 1 from left, 2(1)−1 = 1 from right. So f is continuous and differentiable.

    **Concept Tested:** Differentiability at a Point

---

#### 10. Where is f(x) = √(x − 2) differentiable?

<div class="upper-alpha" markdown>
1. All real numbers
2. x > 2 only
3. x ≥ 2
4. x < 2 only
</div>

??? question "Show Answer"
    The correct answer is **B**. The function f(x) = √(x − 2) is defined for x ≥ 2, but it has a vertical tangent at x = 2 (derivative approaches infinity). It's differentiable only for x > 2, where f'(x) = 1/(2√(x−2)).

    **Concept Tested:** Differentiable Function
