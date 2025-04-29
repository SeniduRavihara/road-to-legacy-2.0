import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as functions from "firebase-functions";
import OpenAI from "openai";
import { Resend } from "resend";
import { content } from "./trainData";

dotenv.config();

const resend = new Resend(process.env.RESEND_KEY);
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

const gemi = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
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

app.get("/ask", async (req: Request, res: Response) => {
  const question = req.query.question || "What is Road to Legacy 2.0?";

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "system",
          content: content.trim(),
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

app.get("/ask-gemi", async (req: Request, res: Response) => {
  const question = req.query.question || "What is Road to Legacy 2.0?";

  const systemPrompt = content.trim();

  const response = await gemi.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Here is some important context:\n\n${systemPrompt}\n\nNow, answer the following question:\n${question}`,
          },
        ],
      },
    ],
  });

  try {
    const answer = response.text || "No response generated.";
    res.status(200).json({ answer });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Error generating response",
      details: (error as Error).message,
    });
  }
});

// Export the Express app as a Firebase HTTPS Function
export const api = functions.https.onRequest(app);
