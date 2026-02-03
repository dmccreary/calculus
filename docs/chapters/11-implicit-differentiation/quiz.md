# Quiz: Implicit Differentiation

Test your understanding of implicit differentiation with these review questions.

---

#### 1. Implicit differentiation is used when:

<div class="upper-alpha" markdown>
1. The function is given explicitly as y = f(x)
2. y cannot be easily solved in terms of x
3. The derivative is zero
4. The function is continuous
</div>

??? question "Show Answer"
    The correct answer is **B**. Implicit differentiation is used when y is defined implicitly by an equation (like x² + y² = 25) rather than explicitly as y = f(x). It allows finding dy/dx without solving for y.

    **Concept Tested:** Implicit Function

---

#### 2. When differentiating y² implicitly with respect to x, the result is:

<div class="upper-alpha" markdown>
1. 2y
2. 2y · dy/dx
3. y²
4. 2x
</div>

??? question "Show Answer"
    The correct answer is **B**. When differentiating y² with respect to x, we use the Chain Rule since y is a function of x: d/dx[y²] = 2y · dy/dx.

    **Concept Tested:** Treating y as Function

---

#### 3. For the equation x² + y² = 25, find dy/dx.

<div class="upper-alpha" markdown>
1. −x/y
2. x/y
3. −y/x
4. −2x/2y
</div>

??? question "Show Answer"
    The correct answer is **A**. Differentiate both sides: 2x + 2y(dy/dx) = 0. Solve for dy/dx: 2y(dy/dx) = −2x, so dy/dx = −x/y.

    **Concept Tested:** dy/dx Implicitly

---

#### 4. For xy = 6, what is dy/dx?

<div class="upper-alpha" markdown>
1. −y/x
2. y/x
3. 6/x²
4. −6/x²
</div>

??? question "Show Answer"
    The correct answer is **A**. Use Product Rule on xy: d/dx[xy] = x(dy/dx) + y(1) = 0. Solving: x(dy/dx) = −y, so dy/dx = −y/x.

    **Concept Tested:** Implicit Chain Rule

---

#### 5. For x³ + y³ = 6xy, what is the first step in finding dy/dx?

<div class="upper-alpha" markdown>
1. Solve for y
2. Differentiate both sides with respect to x
3. Substitute values for x and y
4. Factor the equation
</div>

??? question "Show Answer"
    The correct answer is **B**. The first step is to differentiate both sides with respect to x, applying the Chain Rule to terms containing y and the Product Rule where needed. Then solve for dy/dx.

    **Concept Tested:** Implicit Differentiation

---

#### 6. If x² − xy + y² = 3, what is dy/dx?

<div class="upper-alpha" markdown>
1. (2x − y)/(x − 2y)
2. (y − 2x)/(2y − x)
3. (2x − y)/(2y − x)
4. (x − 2y)/(2x − y)
</div>

??? question "Show Answer"
    The correct answer is **B**. Differentiate: 2x − (y + x·dy/dx) + 2y·dy/dx = 0. Rearrange: 2x − y = x·dy/dx − 2y·dy/dx = dy/dx(x − 2y). So dy/dx = (2x − y)/(x − 2y). Hmm, let me recheck: 2x − y − x(dy/dx) + 2y(dy/dx) = 0. So dy/dx(2y − x) = y − 2x, giving dy/dx = (y − 2x)/(2y − x).

    **Concept Tested:** Solving for dy/dx

---

#### 7. To find the equation of a tangent line to an implicit curve at a point:

<div class="upper-alpha" markdown>
1. Find dy/dx and evaluate at the point, then use point-slope form
2. Solve for y first, then differentiate
3. The tangent line is always horizontal
4. Use the second derivative
</div>

??? question "Show Answer"
    The correct answer is **A**. Find dy/dx using implicit differentiation, substitute the coordinates of the point to get the slope, then use point-slope form: y − y₁ = m(x − x₁).

    **Concept Tested:** Tangent Line Implicit

---

#### 8. For sin(y) = x, what is dy/dx?

<div class="upper-alpha" markdown>
1. cos(y)
2. 1/cos(y)
3. −1/cos(y)
4. x/cos(y)
</div>

??? question "Show Answer"
    The correct answer is **B**. Differentiate: cos(y) · dy/dx = 1. Solving: dy/dx = 1/cos(y). Note: this equals sec(y).

    **Concept Tested:** Implicit Equation

---

#### 9. The Inverse Function Theorem relates the derivative of f⁻¹ to:

<div class="upper-alpha" markdown>
1. The second derivative of f
2. The reciprocal of f'
3. The integral of f
4. The reciprocal of f'(f⁻¹(x))
</div>

??? question "Show Answer"
    The correct answer is **D**. The Inverse Function Theorem states: (f⁻¹)'(x) = 1/f'(f⁻¹(x)). The derivative of the inverse is the reciprocal of the derivative of f, evaluated at the inverse function.

    **Concept Tested:** Inverse Function Theorem

---

#### 10. If y⁵ + xy = 2, find dy/dx at the point (1, 1).

<div class="upper-alpha" markdown>
1. −1/6
2. 1/6
3. −1/5
4. −6
</div>

??? question "Show Answer"
    The correct answer is **A**. Differentiate: 5y⁴(dy/dx) + y + x(dy/dx) = 0. At (1,1): 5(1)(dy/dx) + 1 + 1(dy/dx) = 0, so 6(dy/dx) = −1, giving dy/dx = −1/6.

    **Concept Tested:** Derivative of Inverse
