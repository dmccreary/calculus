# Quiz: Inverse Function Derivatives

Test your understanding of derivatives of inverse functions with these review questions.

---

#### 1. What is d/dx[arcsin(x)]?

<div class="upper-alpha" markdown>
1. 1/√(1 − x²)
2. −1/√(1 − x²)
3. 1/(1 + x²)
4. √(1 − x²)
</div>

??? question "Show Answer"
    The correct answer is **A**. The derivative of arcsin(x) is 1/√(1 − x²), valid for −1 < x < 1. This formula comes from implicit differentiation of sin(y) = x.

    **Concept Tested:** Derivative of Arcsin

---

#### 2. What is d/dx[arccos(x)]?

<div class="upper-alpha" markdown>
1. 1/√(1 − x²)
2. −1/√(1 − x²)
3. 1/(1 + x²)
4. −1/(1 + x²)
</div>

??? question "Show Answer"
    The correct answer is **B**. The derivative of arccos(x) is −1/√(1 − x²). Notice it's the negative of the arcsin derivative, which makes sense since arcsin(x) + arccos(x) = π/2.

    **Concept Tested:** Derivative of Arccos

---

#### 3. What is d/dx[arctan(x)]?

<div class="upper-alpha" markdown>
1. 1/√(1 − x²)
2. −1/√(1 − x²)
3. 1/(1 + x²)
4. sec²(x)
</div>

??? question "Show Answer"
    The correct answer is **C**. The derivative of arctan(x) is 1/(1 + x²). This is valid for all real numbers x and is important for integration.

    **Concept Tested:** Derivative of Arctan

---

#### 4. If f(x) = x³ and f(2) = 8, what is (f⁻¹)'(8)?

<div class="upper-alpha" markdown>
1. 12
2. 1/12
3. 3
4. 1/3
</div>

??? question "Show Answer"
    The correct answer is **B**. Using the Inverse Function Theorem: (f⁻¹)'(8) = 1/f'(f⁻¹(8)) = 1/f'(2). Since f'(x) = 3x², f'(2) = 12, so (f⁻¹)'(8) = 1/12.

    **Concept Tested:** Inverse Derivative Formula

---

#### 5. The domain restriction for arcsin(x) is:

<div class="upper-alpha" markdown>
1. All real numbers
2. −1 ≤ x ≤ 1
3. x ≥ 0
4. −π/2 ≤ x ≤ π/2
</div>

??? question "Show Answer"
    The correct answer is **B**. The domain of arcsin is [−1, 1] because sine only outputs values in this range. The range of arcsin is [−π/2, π/2].

    **Concept Tested:** Inverse Trig Domain

---

#### 6. What is d/dx[arcsec(x)]?

<div class="upper-alpha" markdown>
1. 1/(x√(x² − 1))
2. 1/(|x|√(x² − 1))
3. sec(x)tan(x)
4. −1/(x√(x² − 1))
</div>

??? question "Show Answer"
    The correct answer is **B**. The derivative of arcsec(x) is 1/(|x|√(x² − 1)), valid for |x| > 1. The absolute value is needed to handle both positive and negative x correctly.

    **Concept Tested:** Derivative of Arcsec

---

#### 7. Using the Chain Rule, what is d/dx[arctan(3x)]?

<div class="upper-alpha" markdown>
1. 1/(1 + 9x²)
2. 3/(1 + 9x²)
3. 3/(1 + 3x²)
4. 1/(1 + x²)
</div>

??? question "Show Answer"
    The correct answer is **B**. Using the Chain Rule: d/dx[arctan(3x)] = 1/(1 + (3x)²) · 3 = 3/(1 + 9x²).

    **Concept Tested:** Derivative of Arctan

---

#### 8. If y = sin⁻¹(x), then sin(y) = x. Using implicit differentiation, what is dy/dx?

<div class="upper-alpha" markdown>
1. 1/cos(y)
2. cos(y)
3. 1/sin(y)
4. −1/cos(y)
</div>

??? question "Show Answer"
    The correct answer is **A**. Differentiating sin(y) = x: cos(y)·(dy/dx) = 1, so dy/dx = 1/cos(y). Since sin²(y) + cos²(y) = 1 and sin(y) = x, we get cos(y) = √(1 − x²), giving 1/√(1 − x²).

    **Concept Tested:** Graphical Inverse Derivative

---

#### 9. What is the relationship between the graphs of f and f⁻¹?

<div class="upper-alpha" markdown>
1. They are parallel
2. They are reflections across the line y = x
3. They are perpendicular
4. They are reflections across the x-axis
</div>

??? question "Show Answer"
    The correct answer is **B**. The graph of f⁻¹ is the reflection of the graph of f across the line y = x. Points (a, b) on f correspond to points (b, a) on f⁻¹.

    **Concept Tested:** Graphical Inverse Derivative

---

#### 10. What is d/dx[arcsin(2x)]?

<div class="upper-alpha" markdown>
1. 1/√(1 − 4x²)
2. 2/√(1 − 4x²)
3. 2/√(1 − 2x²)
4. 1/√(1 − 2x)
</div>

??? question "Show Answer"
    The correct answer is **B**. Using the Chain Rule: d/dx[arcsin(2x)] = 1/√(1 − (2x)²) · 2 = 2/√(1 − 4x²).

    **Concept Tested:** Derivative of Arcsin
