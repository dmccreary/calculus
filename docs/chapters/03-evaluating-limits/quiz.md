# Quiz: Evaluating Limits

Test your understanding of limit evaluation techniques with these review questions.

---

#### 1. What is an indeterminate form?

<div class="upper-alpha" markdown>
1. A limit that equals zero
2. A limit that equals infinity
3. An expression like 0/0 where the limit cannot be determined without further analysis
4. A limit that does not exist
</div>

??? question "Show Answer"
    The correct answer is **C**. An indeterminate form such as 0/0 or ∞/∞ means the limit cannot be determined from the form alone—the actual limit could be any value, infinity, or not exist. Further algebraic work is needed to find the answer.

    **Concept Tested:** Indeterminate Form

---

#### 2. When direct substitution in a limit yields 0/0, what should you do first?

<div class="upper-alpha" markdown>
1. Conclude the limit does not exist
2. Try algebraic techniques like factoring or rationalization
3. Assume the limit equals 0
4. Graph the function to find the answer
</div>

??? question "Show Answer"
    The correct answer is **B**. The 0/0 form is a signal to use algebraic techniques such as factoring, rationalization, or simplifying complex fractions. These methods can remove the problematic factor and reveal the true limit value.

    **Concept Tested:** Zero Over Zero Form

---

#### 3. What is lim(x→2) (x² − 4)/(x − 2)?

<div class="upper-alpha" markdown>
1. 0
2. 2
3. 4
4. Does not exist
</div>

??? question "Show Answer"
    The correct answer is **C**. Factor the numerator: (x² − 4)/(x − 2) = (x+2)(x−2)/(x−2) = x+2 for x ≠ 2. Now direct substitution gives lim(x→2)(x+2) = 4.

    **Concept Tested:** Factoring for Limits

---

#### 4. To evaluate lim(x→0) (√(x+4) − 2)/x, which technique is most appropriate?

<div class="upper-alpha" markdown>
1. Factoring
2. Long division
3. Rationalization (multiply by conjugate)
4. Direct substitution
</div>

??? question "Show Answer"
    The correct answer is **C**. When a limit involves a difference of square roots, multiply by the conjugate. Here, multiply by (√(x+4) + 2)/(√(x+4) + 2) to eliminate the radical from the numerator and reveal the limit.

    **Concept Tested:** Rationalization

---

#### 5. The Squeeze Theorem states that if f(x) ≤ g(x) ≤ h(x) near x = a, and lim f(x) = lim h(x) = L, then:

<div class="upper-alpha" markdown>
1. lim g(x) might be any value between f(a) and h(a)
2. lim g(x) = L
3. lim g(x) does not exist
4. g(a) = L
</div>

??? question "Show Answer"
    The correct answer is **B**. The Squeeze Theorem guarantees that if g(x) is "squeezed" between f(x) and h(x), and both f and h approach L, then g must also approach L. This is useful for limits involving oscillating functions.

    **Concept Tested:** Squeeze Theorem

---

#### 6. What is lim(x→0) sin(x)/x?

<div class="upper-alpha" markdown>
1. 0
2. 1
3. ∞
4. Does not exist
</div>

??? question "Show Answer"
    The correct answer is **B**. This is one of the most important limits in calculus: lim(x→0) sin(x)/x = 1 (when x is in radians). This result is proven using the Squeeze Theorem and is essential for finding derivatives of trigonometric functions.

    **Concept Tested:** Sin x Over x Limit

---

#### 7. What is lim(x→0) (1 − cos(x))/x?

<div class="upper-alpha" markdown>
1. 0
2. 1
3. 1/2
4. Does not exist
</div>

??? question "Show Answer"
    The correct answer is **A**. This is another fundamental trigonometric limit: lim(x→0) (1 − cos(x))/x = 0. You can verify this using rationalization or the identity 1 − cos(x) = 2sin²(x/2) combined with the sin(x)/x limit.

    **Concept Tested:** Special Trig Limits

---

#### 8. If lim(x→0) f(x) = 3 and g(x) = x², what is lim(x→0) f(g(x))?

<div class="upper-alpha" markdown>
1. 0
2. 3
3. 9
4. Cannot be determined
</div>

??? question "Show Answer"
    The correct answer is **B**. For limit of composition, if g(x)→0 as x→0, and lim(t→0) f(t) = 3, then lim(x→0) f(g(x)) = 3. As x approaches 0, g(x) = x² approaches 0, and f approaches 3 as its input approaches 0.

    **Concept Tested:** Limit of Composition

---

#### 9. What is lim(x→∞) 1/x?

<div class="upper-alpha" markdown>
1. ∞
2. 0
3. 1
4. Does not exist
</div>

??? question "Show Answer"
    The correct answer is **B**. As x grows without bound, 1/x gets smaller and smaller, approaching 0. This is an example of an infinite limit (limit at infinity), fundamental for analyzing end behavior and horizontal asymptotes.

    **Concept Tested:** Infinite Limit

---

#### 10. When evaluating a limit from a table of values, what pattern indicates the limit exists?

<div class="upper-alpha" markdown>
1. The function values are all different
2. The function values approach the same number from both sides
3. The function values alternate between positive and negative
4. The function values are increasing
</div>

??? question "Show Answer"
    The correct answer is **B**. When using tables for numerical estimation, if function values from both sides of the limit point approach the same number, this suggests the limit exists and equals that number. Convergence from both directions is the key indicator.

    **Concept Tested:** Limits from Tables
