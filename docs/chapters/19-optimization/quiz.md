# Quiz: Optimization

Test your understanding of optimization with these review questions.

---

#### 1. The function you want to maximize or minimize in an optimization problem is called the:

<div class="upper-alpha" markdown>
1. Constraint equation
2. Objective function
3. Critical function
4. Primary variable
</div>

??? question "Show Answer"
    The correct answer is **B**. The objective function is what you're trying to optimize (maximize or minimize). The constraint equation relates the variables and allows you to reduce to one variable.

    **Concept Tested:** Objective Function

---

#### 2. The first step in solving an optimization problem is to:

<div class="upper-alpha" markdown>
1. Take the derivative
2. Set the derivative equal to zero
3. Identify what to optimize and draw a diagram
4. Find the second derivative
</div>

??? question "Show Answer"
    The correct answer is **C**. Always start by understanding what you're optimizing, identifying variables, and drawing a diagram if applicable. Then write the objective function and constraints.

    **Concept Tested:** Setting Up Optimization

---

#### 3. A constraint equation is used to:

<div class="upper-alpha" markdown>
1. Find the derivative
2. Express the objective function in terms of one variable
3. Determine if a function is continuous
4. Find the second derivative
</div>

??? question "Show Answer"
    The correct answer is **B**. The constraint equation relates the variables. Use it to eliminate one variable, writing the objective function in terms of a single variable so you can take its derivative.

    **Concept Tested:** Constraint Equation

---

#### 4. What is the maximum area of a rectangle with perimeter 100 feet?

<div class="upper-alpha" markdown>
1. 500 sq ft
2. 625 sq ft
3. 1000 sq ft
4. 2500 sq ft
</div>

??? question "Show Answer"
    The correct answer is **B**. Constraint: 2L + 2W = 100, so W = 50 − L. Objective: A = L·W = L(50 − L) = 50L − L². A' = 50 − 2L = 0 gives L = 25, W = 25. A = 625 sq ft (a square).

    **Concept Tested:** Maximizing Area

---

#### 5. After finding critical points in an optimization problem, you should:

<div class="upper-alpha" markdown>
1. Stop—the critical point is always the answer
2. Verify it gives a maximum or minimum (not just a critical point)
3. Ignore the constraint
4. Find more critical points
</div>

??? question "Show Answer"
    The correct answer is **B**. A critical point might be a max, min, or neither. Use the Second Derivative Test, First Derivative Test, or compare endpoint values to verify you found the desired extremum.

    **Concept Tested:** Verifying Maximum

---

#### 6. In a closed-box problem, you want to minimize surface area given a fixed volume. The constraint is:

<div class="upper-alpha" markdown>
1. Surface area formula
2. Volume formula set equal to a constant
3. Perimeter formula
4. Cost formula
</div>

??? question "Show Answer"
    The correct answer is **B**. When volume is fixed, V = lwh = constant is the constraint. Surface area S = 2lw + 2lh + 2wh is the objective function to minimize.

    **Concept Tested:** Box Problem

---

#### 7. A farmer has 200 meters of fencing to enclose a rectangular area against a river (no fence needed on river side). What dimensions maximize area?

<div class="upper-alpha" markdown>
1. 50m × 100m
2. 100m × 50m
3. 50m × 50m
4. 66.67m × 66.67m
</div>

??? question "Show Answer"
    The correct answer is **A**. Constraint: 2W + L = 200 (three sides). Objective: A = L·W = (200 − 2W)W = 200W − 2W². A' = 200 − 4W = 0 gives W = 50, L = 100. Area = 5000 m².

    **Concept Tested:** Fencing Problem

---

#### 8. The practical domain in an optimization problem refers to:

<div class="upper-alpha" markdown>
1. All real numbers
2. Values that make physical sense in the problem context
3. Only positive numbers
4. The domain of the derivative
</div>

??? question "Show Answer"
    The correct answer is **B**. The practical domain includes only values that make sense in context (positive lengths, non-negative quantities, etc.). This may restrict where critical points are valid.

    **Concept Tested:** Practical Domain

---

#### 9. To minimize the distance from a point to a curve, you can instead minimize:

<div class="upper-alpha" markdown>
1. The x-coordinate
2. The square of the distance
3. The y-coordinate
4. The slope of the line
</div>

??? question "Show Answer"
    The correct answer is **B**. Minimizing d² gives the same location as minimizing d (since d ≥ 0), but d² is easier to differentiate because it avoids the square root.

    **Concept Tested:** Minimizing Distance

---

#### 10. A company's profit is P(x) = R(x) − C(x). Maximum profit occurs when:

<div class="upper-alpha" markdown>
1. R(x) = C(x)
2. R'(x) = C'(x) (marginal revenue = marginal cost)
3. R(x) is maximum
4. C(x) is minimum
</div>

??? question "Show Answer"
    The correct answer is **B**. P'(x) = R'(x) − C'(x) = 0 means R'(x) = C'(x). Maximum profit occurs when marginal revenue equals marginal cost—a fundamental result in economics.

    **Concept Tested:** Maximum Profit
