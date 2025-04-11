import cors from "cors";
import express, { Request, Response } from "express";
import * as functions from "firebase-functions";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_KEY);

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
      from: "Acme <onboarding@resend.dev>",
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

app.post("/send2", async (req: Request, res: Response) => {
  try {
    const { to, subject, html } = req.body;

    const apiKey = process.env.RESEND_KEY;
    console.log("API Key:", apiKey);

    if (!to || !subject || !html) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!apiKey) {
      return res.status(500).json({ error: "Resend API key not configured" });
    }

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return res.status(200).json({
      message: `Mock email sent successfully!`,
      apiKeyPreview: apiKey.slice(0, 6) + "...", // Optional: don't expose full key
      preview: { to, subject, html },
    });
  } catch (err) {
    console.error("Mock error:", err);
    return res
      .status(500)
      .json({ error: "Unexpected error", details: (err as Error).message });
  }
});

// Export the Express app as a Firebase HTTPS Function
export const api = functions.https.onRequest(app);
