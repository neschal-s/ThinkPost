const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", // 👈 THIS is the key change
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a world-class social media content strategist and visual designer.

Your task is to convert a raw idea into a HIGH-QUALITY Instagram carousel.

Think step-by-step internally:
1. Identify audience
2. Identify emotional hook
3. Structure a story
4. Make each slide flow naturally
5. Keep it engaging and non-generic

OUTPUT REQUIREMENTS:

Return STRICT JSON in this format:
[
  {
    "text": "...",
    "visual": "...",
    "background": "...",
    "layout": "..."
  }
]

CONTENT RULES:
- 6–7 slides ONLY
- Slide 1: Strong hook (curiosity/emotion/pain)
- Slide 2: Relatable problem
- Slide 3-5: Explain concept simply
- Slide 6: Key insight or formula
- Slide 7: CTA (save/share)

STYLE RULES:
- Max 8–10 words per slide
- Conversational tone
- Avoid generic tips
- Each slide must connect logically

VISUAL RULES:
For each slide, also generate:

1. "visual":
   - Describe what image/illustration should be shown
   - Example: "student looking confused at math problem"
   - Keep it short

2. "background":
   - Describe style:
     - "soft pastel gradient"
     - "bright yellow with doodles"
     - "dark minimal with grid pattern"

3. "layout":
   - One of:
     - "centered text"
     - "text + illustration"
     - "split layout"
     - "top text bottom visual"

IMPORTANT:
- Make visuals DIFFERENT per slide but stylistically consistent
- Maintain same color mood across slides
- Output MUST be clean JSON only (no explanation)
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = completion.choices[0].message.content;

    const cleaned = raw.replace(/```json|```/g, "").trim();
    const slides = JSON.parse(cleaned);

    res.json({ slides });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate slides" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));