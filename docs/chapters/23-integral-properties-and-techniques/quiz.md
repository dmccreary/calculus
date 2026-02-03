# Quiz: Integral Properties and Techniques

Test your understanding of integral properties and techniques with these review questions.

---

#### 1. The property ∫ₐᵇ f(x) dx + ∫ᵇᶜ f(x) dx = ∫ₐᶜ f(x) dx is called:

<div class="upper-alpha" markdown>
1. The Sum Rule
2. The Additivity Property
3. The Product Rule
4. The Chain Rule
</div>

??? question "Show Answer"
    The correct answer is **B**. The Additivity Property allows splitting an integral at any point c between a and b, or combining adjacent integrals. The areas add together.

    **Concept Tested:** Additivity Property

---

#### 2. What is ∫ₐᵃ f(x) dx?

<div class="upper-alpha" markdown>
1. f(a)
2. 2f(a)
3. 0
4. Undefined
</div>

??? question "Show Answer"
    The correct answer is **C**. When the limits of integration are equal, the integral is zero. There's no "width" to the region, so no area.

    **Concept Tested:** Zero Width Integral

---

#### 3. If ∫ₐᵇ f(x) dx = 5, then ∫ᵇᵃ f(x) dx equals:

<div class="upper-alpha" markdown>
1. 5
2. −5
3. 0
4. 10
</div>

??? question "Show Answer"
    The correct answer is **B**. Reversing the limits of integration negates the integral: ∫ᵇᵃ f(x) dx = −∫ₐᵇ f(x) dx = −5.

    **Concept Tested:** Reversing Limits

---

#### 4. If f is an even function, then ∫₋ₐᵃ f(x) dx equals:

<div class="upper-alpha" markdown>
1. 0
2. 2∫₀ᵃ f(x) dx
3. ∫₀ᵃ f(x) dx
4. −2∫₀ᵃ f(x) dx
</div>

??? question "Show Answer"
    The correct answer is **B**. For even functions (symmetric about y-axis), the integral from −a to a equals twice the integral from 0 to a.

    **Concept Tested:** Even Function Integral

---

#### 5. If f is an odd function, then ∫₋ₐᵃ f(x) dx equals:

<div class="upper-alpha" markdown>
1. 0
2. 2∫₀ᵃ f(x) dx
3. ∫₀ᵃ f(x) dx
4. a·f(0)
</div>

??? question "Show Answer"
    The correct answer is **A**. For odd functions (symmetric about origin), the positive and negative areas cancel, giving ∫₋ₐᵃ f(x) dx = 0.

    **Concept Tested:** Odd Function Integral

---

#### 6. To evaluate ∫2x·cos(x²) dx, the best technique is:

<div class="upper-alpha" markdown>
1. Product Rule
2. u-substitution with u = x²
3. Integration by parts
4. Partial fractions
</div>

??? question "Show Answer"
    The correct answer is **B**. Notice that 2x is the derivative of x². Let u = x², du = 2x dx. The integral becomes ∫cos(u) du = sin(u) + C = sin(x²) + C.

    **Concept Tested:** u-Substitution

---

#### 7. When using u-substitution on a definite integral, you should:

<div class="upper-alpha" markdown>
1. Always back-substitute at the end
2. Change the limits of integration to u-values
3. Ignore the limits until the end
4. Either change limits OR back-substitute, but not both
</div>

??? question "Show Answer"
    The correct answer is **D**. You can either change the limits to u-values and evaluate directly, OR keep original limits and back-substitute at the end. Both work; don't mix them.

    **Concept Tested:** Changing Bounds

---

#### 8. The average value of f on [a, b] is given by:

<div class="upper-alpha" markdown>
1. [f(a) + f(b)]/2
2. (1/(b−a)) ∫ₐᵇ f(x) dx
3. ∫ₐᵇ f(x) dx
4. (b−a) ∫ₐᵇ f(x) dx
</div>

??? question "Show Answer"
    The correct answer is **B**. The average value formula is (1/(b−a)) ∫ₐᵇ f(x) dx. It represents the height of a rectangle with the same area as the region under f.

    **Concept Tested:** Average Value Formula

---

#### 9. What is ∫(x³ + 1)/(x + 1) dx?

<div class="upper-alpha" markdown>
1. Use u-substitution
2. Use polynomial long division first
3. Use partial fractions
4. Cannot be integrated
</div>

??? question "Show Answer"
    The correct answer is **B**. When the numerator degree ≥ denominator degree, use long division first. x³ + 1 = (x + 1)(x² − x + 1), so the fraction simplifies to x² − x + 1, which integrates easily.

    **Concept Tested:** Long Division Method

---

#### 10. What is ∫₀^π sin(x) dx?

<div class="upper-alpha" markdown>
1. 0
2. 1
3. 2
4. π
</div>

??? question "Show Answer"
    The correct answer is **C**. F(x) = −cos(x). ∫₀^π sin(x) dx = [−cos(x)]₀^π = −cos(π) − (−cos(0)) = −(−1) − (−1) = 1 + 1 = 2.

    **Concept Tested:** Integral Properties
