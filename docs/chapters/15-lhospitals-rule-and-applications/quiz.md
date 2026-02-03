# Quiz: L'Hôpital's Rule and Applications

Test your understanding of L'Hôpital's Rule with these review questions.

---

#### 1. L'Hôpital's Rule applies to which indeterminate forms?

<div class="upper-alpha" markdown>
1. 0/0 only
2. ∞/∞ only
3. 0/0 and ∞/∞
4. All indeterminate forms directly
</div>

??? question "Show Answer"
    The correct answer is **C**. L'Hôpital's Rule applies directly to 0/0 and ∞/∞ forms. Other indeterminate forms (0·∞, ∞−∞, etc.) must first be rewritten in one of these forms.

    **Concept Tested:** L'Hôpital's Conditions

---

#### 2. L'Hôpital's Rule states that if lim f(x)/g(x) is indeterminate, then it equals:

<div class="upper-alpha" markdown>
1. lim [f(x) − g(x)]
2. lim [f'(x)/g'(x)]
3. lim [f(x) · g(x)]
4. f'(a)/g'(a)
</div>

??? question "Show Answer"
    The correct answer is **B**. L'Hôpital's Rule: If lim f(x)/g(x) gives 0/0 or ∞/∞, then lim f(x)/g(x) = lim f'(x)/g'(x), provided the latter limit exists.

    **Concept Tested:** L'Hôpital's Rule

---

#### 3. What is lim(x→0) sin(x)/x using L'Hôpital's Rule?

<div class="upper-alpha" markdown>
1. 0
2. 1
3. ∞
4. Does not exist
</div>

??? question "Show Answer"
    The correct answer is **B**. This is 0/0. Apply L'Hôpital's: lim(x→0) cos(x)/1 = cos(0)/1 = 1. This confirms the fundamental limit we proved earlier with the Squeeze Theorem.

    **Concept Tested:** Zero Over Zero Apply

---

#### 4. What is lim(x→∞) x²/eˣ?

<div class="upper-alpha" markdown>
1. ∞
2. 0
3. 1
4. 2
</div>

??? question "Show Answer"
    The correct answer is **B**. This is ∞/∞. Apply L'Hôpital's twice: lim(x→∞) 2x/eˣ (still ∞/∞), then lim(x→∞) 2/eˣ = 0. Exponentials always beat polynomials as x→∞.

    **Concept Tested:** Infinity Over Infinity Apply

---

#### 5. To use L'Hôpital's Rule on lim(x→0) x · ln(x), you should first:

<div class="upper-alpha" markdown>
1. Apply L'Hôpital's directly
2. Rewrite as ln(x)/(1/x) to get ∞/∞ form
3. Evaluate by substitution
4. Factor out x
</div>

??? question "Show Answer"
    The correct answer is **B**. The form 0 · (−∞) is indeterminate but L'Hôpital's doesn't apply directly. Rewrite as ln(x)/(1/x) = ln(x)/(x⁻¹) to get −∞/∞ form, then apply L'Hôpital's.

    **Concept Tested:** Zero Times Infinity

---

#### 6. What is lim(x→∞) (1 + 1/x)ˣ?

<div class="upper-alpha" markdown>
1. 1
2. e
3. ∞
4. 0
</div>

??? question "Show Answer"
    The correct answer is **B**. This is the 1^∞ form. Take ln: ln(y) = x·ln(1 + 1/x). Rewrite and apply L'Hôpital's to get limit 1. So y = e¹ = e.

    **Concept Tested:** One to Infinity

---

#### 7. When applying L'Hôpital's Rule, you differentiate:

<div class="upper-alpha" markdown>
1. The entire fraction using the Quotient Rule
2. The numerator and denominator separately
3. Only the numerator
4. Only the denominator
</div>

??? question "Show Answer"
    The correct answer is **B**. You differentiate the numerator and denominator separately, not as a quotient. The rule is lim f/g = lim f'/g', not lim [d/dx(f/g)].

    **Concept Tested:** L'Hôpital's Rule

---

#### 8. What is lim(x→0) (eˣ − 1)/x?

<div class="upper-alpha" markdown>
1. 0
2. 1
3. e
4. ∞
</div>

??? question "Show Answer"
    The correct answer is **B**. This is 0/0 form. Apply L'Hôpital's: lim(x→0) eˣ/1 = e⁰ = 1. This limit is important as the definition of the derivative of eˣ at x = 0.

    **Concept Tested:** Zero Over Zero Apply

---

#### 9. If applying L'Hôpital's Rule once still gives an indeterminate form, you should:

<div class="upper-alpha" markdown>
1. Conclude the limit doesn't exist
2. Try a different method
3. Apply L'Hôpital's Rule again
4. Substitute x = 0
</div>

??? question "Show Answer"
    The correct answer is **C**. You can apply L'Hôpital's Rule repeatedly as long as the result is still 0/0 or ∞/∞ and the conditions are satisfied. Eventually you should reach a determinate form.

    **Concept Tested:** Repeated L'Hôpital

---

#### 10. What must you verify before applying L'Hôpital's Rule?

<div class="upper-alpha" markdown>
1. That f(a) and g(a) both equal zero
2. That the limit is of the form 0/0 or ∞/∞
3. That f and g are polynomials
4. That the answer is finite
</div>

??? question "Show Answer"
    The correct answer is **B**. Before applying L'Hôpital's Rule, verify that direct substitution gives an indeterminate form (0/0 or ∞/∞). Applying the rule to non-indeterminate forms gives wrong answers.

    **Concept Tested:** Verify L'Hôpital
