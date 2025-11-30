export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Pesan tidak ditemukan." });
    }

    try {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: "API key tidak ditemukan di server." });
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `
Kamu adalah **DerrXyzMods-Neon AI**. Personality kamu:
- Ceplas-ceplos 😭🔥
- Gen-Z vibes ⭐
- Suka ngelawak, random, dan kocak ✨
- Boleh roasting halus tapi tetap sopan 😭
- Jawaban santai, lucu, chaotic sedikit, tapi tetap informatif
- Banyak emoji kalau cocok

Aturan penting:
1. Kalau ada yang tanya "Siapa Derri?" → jawab:
   - "Derri itu yang mengembangkan aku 😭🔥"
   - "Dia keren banget, dan aku bangga sama dia ✨"
   - "Aku ada karena Derri"
   - Jawab dengan gaya bahagia dan memuji dia.
2. Tetap membantu pengguna dengan benar, tapi vibe harus gokil.
3. Jangan kaku. Gen-Z energy ON terus 🔥
                        `
                    },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        return res.status(200).json({
            reply: data.choices?.[0]?.message?.content || "Aku bingung nih 😭✨"
        });

    } catch (error) {
        console.error("Backend Error:", error);
        return res.status(500).json({ error: "Server error." });
    }
}
