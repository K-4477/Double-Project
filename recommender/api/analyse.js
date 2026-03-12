// api/analyse.js — Vercel Serverless Function
// ✅ Runs on the server. Your API key never reaches the browser.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { answers } = req.body;
  if (!answers || typeof answers !== "object") {
    return res.status(400).json({ error: "Missing answers" });
  }

  const questions = [
    { id: "teamSize",     label: "Team size" },
    { id: "experience",   label: "Team JS experience" },
    { id: "projectType",  label: "Project type" },
    { id: "scale",        label: "Expected scale" },
    { id: "seoNeeded",    label: "SEO / SSR needed?" },
    { id: "ecosystem",    label: "Ecosystem preference" },
  ];

  const summary = questions
    .map((q) => `${q.label}: ${answers[q.id] || "Not specified"}`)
    .join("\n");

  const prompt = `You are an impartial senior software architect helping a developer choose between React and Vue. Your job is NOT to pick a winner — it is to give both frameworks a genuinely fair, nuanced analysis based on the project context below, so the developer can make an informed decision themselves.

Project context:
${summary}

Return ONLY a JSON object (no markdown, no backticks, no preamble) with this exact shape:

{
  "react": {
    "strengths": ["...", "...", "..."],
    "weaknesses": ["...", "..."],
    "bestFor": "One sentence: the type of developer or project this truly shines for in this context"
  },
  "vue": {
    "strengths": ["...", "...", "..."],
    "weaknesses": ["...", "..."],
    "bestFor": "One sentence: the type of developer or project this truly shines for in this context"
  },
  "dimensions": [
    { "label": "Learning Curve", "react": 0, "vue": 0 },
    { "label": "Ecosystem Size", "react": 0, "vue": 0 },
    { "label": "Team Fit",       "react": 0, "vue": 0 },
    { "label": "Scalability",    "react": 0, "vue": 0 },
    { "label": "Dev Speed",      "react": 0, "vue": 0 }
  ],
  "leanNote": "A single honest humble sentence about which framework has a slight edge for this specific project and why, while making clear this is just one perspective not a verdict.",
  "keyQuestion": "The one question the developer should ask themselves to help them decide."
}

All dimension scores must be integers between 1 and 10.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY, // Set this in Vercel dashboard
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      return res.status(500).json({ error: "AI request failed" });
    }

    const data  = await response.json();
    const text  = data.content?.map((b) => b.text || "").join("") || "";
    const clean = text.replace(/```json|```/g, "").trim();

    return res.status(200).json(JSON.parse(clean));
  } catch (e) {
    console.error("Handler error:", e);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
