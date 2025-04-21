// app/confirm/page.tsx

"use client";

import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function ConfirmPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [uni, setUni] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setName(params.get("name") || "");
    setEmail(params.get("email") || "");
    setUni(params.get("uni") || "");
  }, []);

  const handleSubmit = async (response: "yes" | "no") => {
    if (!email) return;

    setStatus("loading");
    try {
      await setDoc(doc(db, "event_confirmations", email), {
        email,
        name,
        university: uni,
        response,
        timestamp: new Date().toISOString(),
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold mb-4">
        {name
          ? `Hi ${name}, are you coming to the event?`
          : "Are you attending the event?"}
      </h1>

      {status === "idle" && (
        <div className="flex gap-6">
          <button
            onClick={() => handleSubmit("yes")}
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            YES
          </button>
          <button
            onClick={() => handleSubmit("no")}
            className="bg-red-500 text-white px-6 py-2 rounded"
          >
            NO
          </button>
        </div>
      )}
      {status === "loading" && <p>Sending your response...</p>}
      {status === "success" && (
        <p className="text-green-600">
          ✅ Thanks! Your response has been recorded.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600">
          ❌ Something went wrong. Please try again.
        </p>
      )}
    </main>
  );
}
