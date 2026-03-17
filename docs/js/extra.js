document.addEventListener("DOMContentLoaded", function () {

    // Mcollege placement Delta admonition title keywords to pose image and CSS class
    const deltaPoses = [
        { keywords: ["welcome"],                  image: "welcome.png",      css: "delta-welcome" },
        { keywords: ["moment", "thinking", "insight"], image: "thinking.png",   css: "delta-thinking" },
        { keywords: ["sidequest", "tip", "hint"],  image: "tip.png",          css: "delta-tip" },
        { keywords: ["warning", "careful", "mistake"], image: "warning.png",  css: "delta-warning" },
        { keywords: ["celebration", "pun corner", "excellent", "great"], image: "celebration.png", css: "delta-celebration" },
        { keywords: ["encourage", "got this", "you can"], image: "encouraging.png", css: "delta-encouraging" },
    ];

    // Derive site root once from the extra.js script src
    const scriptEl = document.querySelector('script[src*="extra.js"]');
    const siteRoot = scriptEl ? scriptEl.src.replace(/js\/extra\.js.*$/, "") : "";

    // Find all quote admonitions with "Delta" in the title
    document.querySelectorAll(".admonition.quote").forEach((admonition) => {
        const titleEl = admonition.querySelector(".admonition-title");
        if (!titleEl) return;
        const titleText = titleEl.textContent.toLowerCase();
        if (!titleText.includes("delta")) return;

        // Match title to a pose, default to neutral
        let pose = { image: "neutral.png", css: "delta-neutral" };
        for (const p of deltaPoses) {
            if (p.keywords.some((kw) => titleText.includes(kw))) {
                pose = p;
                break;
            }
        }

        admonition.classList.add(pose.css);

        // Inject the pose-specific Delta image floated left of body text
        const firstP = admonition.querySelector("p:not(.admonition-title)");
        if (firstP) {
            const img = document.createElement("img");
            img.src = siteRoot + "img/mascot/" + pose.image;
            img.alt = "Delta the slope-walking explorer";
            img.className = "delta-admonition-img";
            firstP.insertBefore(img, firstP.firstChild);
        }
    });

    // Find all admonitions with the "prompt" class
    document.querySelectorAll(".admonition.prompt").forEach((admonition) => {
        // Create a "Copy" button
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.className = "copy-button";

        // Append the button to the admonition
        admonition.appendChild(copyButton);

        // Add event listener for the button
        copyButton.addEventListener("click", () => {
            // Collect all text content inside the admonition except the title and button
            const promptText = Array.from(admonition.querySelectorAll("p:not(.admonition-title)"))
                .map((p) => p.textContent.trim())
                .join("\n");

            if (promptText) {
                // Copy the collected text to the clipboard
                navigator.clipboard.writeText(promptText).then(
                    () => {
                        // Show feedback on successful copy
                        copyButton.textContent = "Copied!";
                        setTimeout(() => (copyButton.textContent = "Copy"), 2000);
                    },
                    (err) => {
                        console.error("Failed to copy text: ", err);
                    }
                );
            } else {
                console.error("No prompt text found to copy.");
            }
        });
    });
});