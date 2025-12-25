document.addEventListener("DOMContentLoaded", () => {

  // Remove intro
  setTimeout(() => {
    const intro = document.getElementById("intro");
    if (intro) intro.remove();
  }, 6000);

  const API_KEY = "1849f2ca-bc3e-4316-9254-33eadc74731c";
  const API_URL = "https://api.sambanova.ai/v1/chat/completions";

  const topicInput = document.getElementById("topic");
  const platformSelect = document.getElementById("platform");
  const toneSelect = document.getElementById("tone");
  const button = document.getElementById("generate-btn");
  const result = document.getElementById("result");

  button.addEventListener("click", async () => {
    const topic = topicInput.value.trim();
    if (!topic) return;

    result.classList.add("hidden");
    result.textContent = "Generating post...";

    const prompt = `
Create a ${toneSelect.value} ${platformSelect.value} post about:
"${topic}"

Return:
Caption:
Hashtags:
Optional variation:
`;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "Meta-Llama-3.1-8B-Instruct",
          messages: [
            {
              role: "system",
              content: "You are Socialify, an AI social media assistant created by Jeff. You generate engaging, platform-appropriate posts."
            },
            { role: "user", content: prompt }
          ]
        })
      });

      const data = await res.json();
      result.textContent = data.choices[0].message.content;
      result.classList.remove("hidden");

    } catch {
      result.textContent = "Something went wrong. Please try again.";
      result.classList.remove("hidden");
    }
  });

});
