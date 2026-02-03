# Quiz: Related Rates and Linear Approximation

Test your understanding of related rates and linear approximation with these review questions.

---

#### 1. Related rates problems involve:

<div class="upper-alpha" markdown>
1. Rates that have no connection
2. Quantities that change with respect to a common variable (usually time)
3. Only constant rates
4. Rates that are always equal
</div>

??? question "Show Answer"
    The correct answer is **B**. Related rates problems involve multiple quantities that change with respect to a common variable, typically time. An equation relates the quantities, and implicit differentiation relates their rates.

    **Concept Tested:** Related Rates

---

#### 2. The first step in solving a related rates problem is:

<div class="upper-alpha" markdown>
1. Differentiate immediately
2. Draw a diagram and identify all variables and given rates
3. Solve for the unknown variable
4. Plug in numbers
</div>

??? question "Show Answer"
    The correct answer is **B**. Always start by drawing a diagram, labeling variables, and identifying what rates are given and what rate you need to find. Then find an equation relating the quantities.

    **Concept Tested:** Related Rates Setup

---

#### 3. A ladder 10 ft long leans against a wall. If the bottom slides away at 2 ft/sec, how fast is the top sliding down when the bottom is 6 ft from the wall?

<div class="upper-alpha" markdown>
1. 1.5 ft/sec
2. 2 ft/sec
3. 2.5 ft/sec
4. 3 ft/sec
</div>

??? question "Show Answer"
    The correct answer is **A**. Use x² + y² = 100. Differentiate: 2x(dx/dt) + 2y(dy/dt) = 0. When x = 6, y = 8. So 2(6)(2) + 2(8)(dy/dt) = 0, giving dy/dt = −1.5 ft/sec (negative means sliding down).

    **Concept Tested:** Ladder Problem

---

#### 4. The linear approximation formula is:

<div class="upper-alpha" markdown>
1. f(x) ≈ f(a) + f'(a)(x − a)
2. f(x) ≈ f(a) + f''(a)(x − a)
3. f(x) ≈ f'(a)(x − a)
4. f(x) ≈ f(a)f'(x)
</div>

??? question "Show Answer"
    The correct answer is **A**. Linear approximation (tangent line approximation): L(x) = f(a) + f'(a)(x − a). This approximates f(x) near x = a using the tangent line at a.

    **Concept Tested:** Linearization Formula

---

#### 5. Using linear approximation, estimate √4.1 given that √4 = 2.

<div class="upper-alpha" markdown>
1. 2.01
2. 2.025
3. 2.05
4. 2.1
</div>

??? question "Show Answer"
    The correct answer is **B**. Let f(x) = √x, a = 4. f'(x) = 1/(2√x), f'(4) = 1/4. L(4.1) = 2 + (1/4)(0.1) = 2 + 0.025 = 2.025.

    **Concept Tested:** Tangent Line Approximation

---

#### 6. What is the differential dy if y = x³?

<div class="upper-alpha" markdown>
1. dy = 3x²
2. dy = 3x² dx
3. dy = x³ dx
4. dy = 3x dx
</div>

??? question "Show Answer"
    The correct answer is **B**. The differential dy = f'(x) dx. For y = x³, dy = 3x² dx. This represents the change in y along the tangent line for a small change dx in x.

    **Concept Tested:** Differential

---

#### 7. A spherical balloon is inflated so that its radius increases at 3 cm/sec. How fast is the volume increasing when r = 10 cm?

<div class="upper-alpha" markdown>
1. 400π cm³/sec
2. 1200π cm³/sec
3. 4000π cm³/sec
4. 1200 cm³/sec
</div>

??? question "Show Answer"
    The correct answer is **B**. V = (4/3)πr³. Differentiate: dV/dt = 4πr²(dr/dt). When r = 10, dr/dt = 3: dV/dt = 4π(100)(3) = 1200π cm³/sec.

    **Concept Tested:** Balloon Problem

---

#### 8. The error in linear approximation is generally smaller when:

<div class="upper-alpha" markdown>
1. x is far from a
2. x is close to a
3. f'(a) is large
4. f(a) is large
</div>

??? question "Show Answer"
    The correct answer is **B**. Linear approximation is most accurate when x is close to the center point a. The error grows as we move away from a, especially when the function has large curvature.

    **Concept Tested:** Error in Approximation

---

#### 9. A 5-foot tall person walks away from a 20-foot lamppost at 4 ft/sec. How fast is their shadow lengthening?

<div class="upper-alpha" markdown>
1. 1 ft/sec
2. 4/3 ft/sec
3. 3 ft/sec
4. 4 ft/sec
</div>

??? question "Show Answer"
    The correct answer is **B**. Using similar triangles: 20/(x+s) = 5/s, giving 20s = 5x + 5s, so s = x/3. Differentiate: ds/dt = (1/3)(dx/dt) = (1/3)(4) = 4/3 ft/sec.

    **Concept Tested:** Shadow Problem

---

#### 10. If dy = f'(x) dx, what does dy represent geometrically?

<div class="upper-alpha" markdown>
1. The actual change in y
2. The change in y along the tangent line
3. The slope of the curve
4. The area under the curve
</div>

??? question "Show Answer"
    The correct answer is **B**. The differential dy represents the change in y along the tangent line (linear approximation) for a change dx in x. It approximates but doesn't equal the actual change Δy.

    **Concept Tested:** dy Notation
