# Quiz: The Chain Rule

Test your understanding of the Chain Rule with these review questions.

---

#### 1. The Chain Rule is used to differentiate:

<div class="upper-alpha" markdown>
1. Products of functions
2. Quotients of functions
3. Composite functions
4. Sums of functions
</div>

??? question "Show Answer"
    The correct answer is **C**. The Chain Rule is specifically for differentiating composite functions—functions of the form f(g(x)) where one function is "inside" another.

    **Concept Tested:** Chain Rule

---

#### 2. If y = f(g(x)), then dy/dx equals:

<div class="upper-alpha" markdown>
1. f'(x) · g'(x)
2. f'(g(x)) · g'(x)
3. f(g'(x))
4. f'(g(x)) + g'(x)
</div>

??? question "Show Answer"
    The correct answer is **B**. The Chain Rule formula: d/dx[f(g(x))] = f'(g(x)) · g'(x). "Derivative of outside (evaluated at inside) times derivative of inside."

    **Concept Tested:** Chain Rule Formula

---

#### 3. What is d/dx[sin(3x)]?

<div class="upper-alpha" markdown>
1. cos(3x)
2. 3cos(3x)
3. cos(3)
4. 3sin(3x)
</div>

??? question "Show Answer"
    The correct answer is **B**. Using the Chain Rule: outer function is sin, inner is 3x. d/dx[sin(3x)] = cos(3x) · 3 = 3cos(3x).

    **Concept Tested:** Trig Chain Rule

---

#### 4. What is d/dx[(x² + 1)⁵]?

<div class="upper-alpha" markdown>
1. 5(x² + 1)⁴
2. 5(2x)⁴
3. 10x(x² + 1)⁴
4. 5x(x² + 1)⁴
</div>

??? question "Show Answer"
    The correct answer is **C**. Using the Power-Chain Rule: d/dx[(x² + 1)⁵] = 5(x² + 1)⁴ · d/dx[x² + 1] = 5(x² + 1)⁴ · 2x = 10x(x² + 1)⁴.

    **Concept Tested:** Power Chain Rule

---

#### 5. What is d/dx[e^(2x)]?

<div class="upper-alpha" markdown>
1. e^(2x)
2. 2e^(2x)
3. 2xe^(2x)
4. e^(2x)/2
</div>

??? question "Show Answer"
    The correct answer is **B**. Using the Chain Rule: d/dx[e^(2x)] = e^(2x) · d/dx[2x] = e^(2x) · 2 = 2e^(2x).

    **Concept Tested:** Exponential Chain Rule

---

#### 6. What is d/dx[ln(x²)]?

<div class="upper-alpha" markdown>
1. 1/x²
2. 2/x
3. 2x/x²
4. 2ln(x)
</div>

??? question "Show Answer"
    The correct answer is **B**. Using the Chain Rule: d/dx[ln(x²)] = (1/x²) · 2x = 2x/x² = 2/x. Alternatively, ln(x²) = 2ln(x), so d/dx = 2/x.

    **Concept Tested:** Log Chain Rule

---

#### 7. What is d/dx[cos²(x)]?

<div class="upper-alpha" markdown>
1. 2cos(x)
2. −2cos(x)sin(x)
3. −sin²(x)
4. 2cos(x)sin(x)
</div>

??? question "Show Answer"
    The correct answer is **B**. Rewrite as [cos(x)]² and use Chain Rule: d/dx[cos²(x)] = 2cos(x) · (−sin(x)) = −2cos(x)sin(x). This equals −sin(2x).

    **Concept Tested:** Nested Chain Rule

---

#### 8. In Leibniz notation, if y = f(u) and u = g(x), the Chain Rule is written as:

<div class="upper-alpha" markdown>
1. dy/dx = dy/du + du/dx
2. dy/dx = (dy/du) · (du/dx)
3. dy/dx = dy/du − du/dx
4. dy/dx = (du/dx) / (dy/du)
</div>

??? question "Show Answer"
    The correct answer is **B**. In Leibniz notation: dy/dx = (dy/du) · (du/dx). The du's appear to "cancel," making this notation intuitive for Chain Rule problems.

    **Concept Tested:** Leibniz Chain Rule

---

#### 9. What is d/dx[√(1 − x²)]?

<div class="upper-alpha" markdown>
1. 1/(2√(1 − x²))
2. −x/√(1 − x²)
3. −2x/√(1 − x²)
4. x/√(1 − x²)
</div>

??? question "Show Answer"
    The correct answer is **B**. Rewrite as (1 − x²)^(1/2). Using Chain Rule: (1/2)(1 − x²)^(−1/2) · (−2x) = −x/√(1 − x²).

    **Concept Tested:** General Power Rule

---

#### 10. What is d/dx[sin(cos(x))]?

<div class="upper-alpha" markdown>
1. cos(cos(x))
2. −sin(x)cos(cos(x))
3. cos(−sin(x))
4. −cos(cos(x))sin(x)
</div>

??? question "Show Answer"
    The correct answer is **D**. This requires nested Chain Rule: d/dx[sin(cos(x))] = cos(cos(x)) · d/dx[cos(x)] = cos(cos(x)) · (−sin(x)) = −cos(cos(x))sin(x).

    **Concept Tested:** Multiple Chain Rule
