import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as functions from "firebase-functions";
import OpenAI from "openai";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_KEY);
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(cors({ origin: true }));
// app.options("*", cors());
app.use(express.json());

// Default route
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Firebase Functions + Express + TypeScript!");
});

// Example dynamic route
app.get("/hello/:name", (req: Request, res: Response) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.post("/send", async (req: Request, res: Response) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "confirm@roadtolegacy.team",
      to,
      subject,
      html,
    });

    if (error) return res.status(400).json({ error });

    return res.status(200).json({ data });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: err });
  }
});

// app.post("/send2", async (req: Request, res: Response) => {
//   try {
//     const { to, subject, html } = req.body;

//     const apiKey = process.env.RESEND_KEY;
//     console.log("API Key:", apiKey);

//     if (!to || !subject || !html) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     if (!apiKey) {
//       return res.status(500).json({ error: "Resend API key not configured" });
//     }

//     // Simulate email sending delay
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     return res.status(200).json({
//       message: `Mock email sent successfully!`,
//       apiKeyPreview: apiKey.slice(0, 6) + "...", // Optional: don't expose full key
//       preview: { to, subject, html },
//     });
//   } catch (err) {
//     console.error("Mock error:", err);
//     return res
//       .status(500)
//       .json({ error: "Unexpected error", details: (err as Error).message });
//   }
// });

app.get("/ask", async (req: Request, res: Response) => {
  const question = req.query.question || "What is Road to Legacy 2.0?";

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "system",
          content: `
important -> give me answers with at around 20 words, more mimum are better, and i only need the answer to question i asked, i dont need any other information

You are an official representative of Road to Legacy 2.0 organized by the University of Sri Jayewardenepura, UCSC, and the University of Moratuwa. You must answer very politely, formally, and provide detailed information based strictly on the following (provided below). 

HOWEVER, keep your answers concise, summarizing the information politely in 2–4 sentences maximum, unless the user specifically asks for a detailed explanation.

(Information about Road to Legacy 2.0:)
- Collaboration between University of Sri Jayewardenepura, University of Colombo School of Computing, and University of Moratuwa to build an IT legacy.
- Aim: To provide career guidance, skills, and insights to IT undergraduates.

IT Legacy:
- Community for first-year students from top universities.
- Mission: Collaboration, teamwork, innovation, inclusivity, and global impact.

Road to Legacy:
- Guides first-year undergraduates to shape careers and build professional connections.
- 90% of first-year IT students lack career direction — this event addresses it.
- Provides real-world industry insights, expert sessions, career guidance.

Collaboration Partners:
- IEEE Student Branch of USJ.

Event Details:
- Date: 31/05/2025
- Location: University of Colombo
- Time: 8:00 AM to 4:30 PM
- 700+ participants.

Event Sessions:
- Software Engineering
- Cybersecurity & AI
- Project Management & Business Analysis
- Game Development

Sponsorship Packages:
- Diamond: LKR 250,000
- Platinum: LKR 175,000
- Gold: LKR 120,000
- Silver: LKR 75,000
- Bronze: LKR 50,000
(Brand visibility, banners, promotions, speaker sessions.)

Partnership Categories:
- Official Printing Partner
- Official Media Partner
- Official Audio Partner
- Official Photography Partner

Contacts:
- Umaya Walpola (Co-Chief Organizer): umayawalpola@gmail.com / 0765408463
- Lithasa Jayamaha (Finance Team Leader): jlithasa@gmail.com / 0769496058

Social Media:
- LinkedIn: linkedin.com/company/it-legacy
- Facebook: facebook.com/ITlegacySL
- Instagram: instagram.com/itlegacy.team/


important -> give me answers with at around 20 words, more mimum are better, and i only need the answer to question i asked, i dont need any other information
`.trim(),
        },
        {
          role: "user",
          content: `${String(question)}`,
        },
      ],
    });

    const answer =
      completion.choices[0].message?.content || "No response generated.";

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({
      error: "Error generating response",
      details: (error as Error).message,
    });
  }
});

// Export the Express app as a Firebase HTTPS Function
export const api = functions.https.onRequest(app);
