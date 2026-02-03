# Quiz: Understanding Limits

Test your understanding of limits and limit notation with these review questions.

---

#### 1. What does lim(x→3) f(x) = 7 mean?

<div class="upper-alpha" markdown>
1. f(3) = 7
2. As x gets closer to 3, f(x) gets closer to 7
3. f(x) equals 7 when x is near 3
4. The function is undefined at x = 3
</div>

??? question "Show Answer"
    The correct answer is **B**. A limit describes what value a function approaches as the input approaches a target value. It does not require that f(3) = 7—the function might not even be defined at x = 3. The limit describes behavior near the point, not at the point.

    **Concept Tested:** Limit

---

#### 2. For a two-sided limit to exist, which condition must be met?

<div class="upper-alpha" markdown>
1. The function must be defined at the limit point
2. The left-hand and right-hand limits must both exist and be equal
3. The function must be continuous everywhere
4. The limit must equal the function value
</div>

??? question "Show Answer"
    The correct answer is **B**. A two-sided limit exists if and only if both one-sided limits exist and are equal. The function need not be defined at the point, and the limit need not equal the function value (if defined). This is the fundamental condition for limit existence.

    **Concept Tested:** Two-Sided Limit

---

#### 3. What is lim(x→2⁻) f(x) called?

<div class="upper-alpha" markdown>
1. The two-sided limit
2. The right-hand limit
3. The left-hand limit
4. The derivative
</div>

??? question "Show Answer"
    The correct answer is **C**. The notation x→2⁻ (with the minus superscript) indicates approaching 2 from the left, meaning from values less than 2. This is called the left-hand limit. The notation x→2⁺ would indicate the right-hand limit.

    **Concept Tested:** Left-Hand Limit

---

#### 4. According to the limit laws, if lim(x→a) f(x) = 4 and lim(x→a) g(x) = 3, what is lim(x→a) [f(x) + g(x)]?

<div class="upper-alpha" markdown>
1. 12
2. 7
3. 1
4. Cannot be determined
</div>

??? question "Show Answer"
    The correct answer is **B**. The Sum Rule for limits states that lim[f(x) + g(x)] = lim f(x) + lim g(x), provided both limits exist. Therefore, lim(x→a) [f(x) + g(x)] = 4 + 3 = 7.

    **Concept Tested:** Sum Rule for Limits

---

#### 5. If lim(x→a) f(x) = 5 and lim(x→a) g(x) = 2, what is lim(x→a) [f(x) · g(x)]?

<div class="upper-alpha" markdown>
1. 7
2. 3
3. 10
4. 2.5
</div>

??? question "Show Answer"
    The correct answer is **C**. The Product Rule for limits states that lim[f(x) · g(x)] = lim f(x) · lim g(x), provided both limits exist. Therefore, lim(x→a) [f(x) · g(x)] = 5 · 2 = 10.

    **Concept Tested:** Product Rule for Limits

---

#### 6. What is lim(x→4) (x² − 16)/(x − 4)?

<div class="upper-alpha" markdown>
1. 0
2. 4
3. 8
4. Does not exist
</div>

??? question "Show Answer"
    The correct answer is **C**. Direct substitution gives 0/0, so factor: (x² − 16)/(x − 4) = (x+4)(x−4)/(x−4) = x+4 for x ≠ 4. Now lim(x→4)(x+4) = 8. This demonstrates that limits can exist even when functions are undefined at a point.

    **Concept Tested:** Direct Substitution

---

#### 7. If lim(x→2⁻) f(x) = 5 and lim(x→2⁺) f(x) = 3, what can we conclude?

<div class="upper-alpha" markdown>
1. lim(x→2) f(x) = 4 (the average)
2. lim(x→2) f(x) = 5
3. lim(x→2) f(x) = 3
4. lim(x→2) f(x) does not exist
</div>

??? question "Show Answer"
    The correct answer is **D**. Since the left-hand limit (5) does not equal the right-hand limit (3), the two-sided limit does not exist. Both one-sided limits must be equal for the two-sided limit to exist. This often indicates a jump discontinuity.

    **Concept Tested:** Limit Existence

---

#### 8. What is lim(x→0) [3 · f(x)] if lim(x→0) f(x) = 6?

<div class="upper-alpha" markdown>
1. 3
2. 6
3. 9
4. 18
</div>

??? question "Show Answer"
    The correct answer is **D**. The Constant Multiple Rule states that lim[c · f(x)] = c · lim f(x). Therefore, lim(x→0) [3 · f(x)] = 3 · 6 = 18.

    **Concept Tested:** Constant Multiple Rule

---

#### 9. Which of the following statements about limits is FALSE?

<div class="upper-alpha" markdown>
1. A limit can exist even if the function is undefined at that point
2. If lim(x→a) f(x) exists, then f(a) must be defined
3. One-sided limits can exist even when the two-sided limit doesn't
4. The limit of a sum equals the sum of the limits
</div>

??? question "Show Answer"
    The correct answer is **B**. This statement is false—a limit can exist even when f(a) is undefined. For example, lim(x→2) (x²−4)/(x−2) = 4, but the function is undefined at x = 2. Limits describe approach behavior, not point values.

    **Concept Tested:** Limit

---

#### 10. What is lim(x→3) [f(x)]² if lim(x→3) f(x) = 4?

<div class="upper-alpha" markdown>
1. 8
2. 12
3. 16
4. 64
</div>

??? question "Show Answer"
    The correct answer is **C**. The Power Rule for limits states that lim[f(x)]ⁿ = [lim f(x)]ⁿ. Therefore, lim(x→3) [f(x)]² = [4]² = 16.

    **Concept Tested:** Power Rule for Limits
