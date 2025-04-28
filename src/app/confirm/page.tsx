// Modified ConfirmPage.tsx
"use client";

import GenerateTicket from "@/components/GenerateTicket";
import { ArrivalConfirmationToggle } from "@/firebase/api";
import { delay } from "@/lib/utils";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useState } from "react";

export default function ConfirmPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [uni, setUni] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [showTicket, setShowTicket] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  

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
      if (response === "yes") {
        await ArrivalConfirmationToggle(email, true);
        // First show the thank you message
        setStatus("success");
        setShowThankYou(true);

        // Then after a delay, show the ticket
        await delay(1000); // 1 seconds to make the thank you message more noticeable
        setShowThankYou(false);
        setShowTicket(true);
      } else {
        await ArrivalConfirmationToggle(email, false);
        setStatus("success");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#191b1f] p-4">
      <div className="w-full max-w-md bg-[#1f2227] rounded-xl shadow-xl border border-[#333842]/20 p-8">
        {status !== "success" && (
          <div className="mb-8 flex flex-col items-center justify-center">
            <ExportedImage
              src="/images/logos/full_logo.png"
              alt="UOM-USJ-UOC logo"
              priority
              className="w-20 h-20 sm:w-32 sm:h-32 cursor-pointer"
              width={64}
              height={64}
              placeholder="blur"
            />
          </div>
        )}

        {status !== "success" && (
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-gray-200">
              {name ? `Hello ${name}!` : "Hello!"}
            </h2>
            <p className="text-gray-400 mt-2">
              We&apos;d like to confirm your attendance at our upcoming event.
            </p>
          </div>
        )}

        {status === "idle" && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center text-gray-300 mb-4">
              Will you be attending?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleSubmit("yes")}
                className="flex items-center justify-center bg-[#262930] hover:bg-[#2c3039] text-white sm:px-6 py-3 rounded-lg font-medium transition-colors border border-[#333842] hover:border-opacity-80"
              >
                <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
                Yes, I&apos;ll be there
              </button>
              <button
                onClick={() => handleSubmit("no")}
                className="flex items-center justify-center bg-[#1f2227] hover:bg-[#262930] text-white px-6 py-3 rounded-lg font-medium transition-colors border border-[#333842] hover:border-opacity-80"
              >
                <XCircle className="mr-2 h-5 w-5 text-gray-400" />
                Sorry, I can&apos;t make it
              </button>
            </div>
          </div>
        )}

        {status === "loading" && (
          <div className="text-center py-8">
            <Loader2 className="h-10 w-10 animate-spin text-[#333842] mx-auto" />
            <p className="text-gray-400 mt-4">Processing your response...</p>
          </div>
        )}


        {status === "success" && showThankYou && (
          <div className="bg-[#262930] rounded-lg p-6 text-center border border-green-500/20">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white">Thank You!</h3>
            <p className="text-gray-300 mt-2">
              Your response has been recorded successfully.
            </p>
          </div>
        )}


        {/* No */}
        {status === "success" && !showThankYou && !showTicket && (
          <div className="bg-[#262930] rounded-lg p-6 text-center border border-green-500/20">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white">Thank You!</h3>
            <p className="text-gray-300 mt-2">
              Your response has been recorded successfully.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-[#262930] rounded-lg p-6 text-center border border-red-500/20">
            <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white">
              Something went wrong
            </h3>
            <p className="text-gray-300 mt-2">
              We couldn&apos;t process your response. Please try again.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 bg-[#1f2227] hover:bg-[#333842] text-gray-200 px-4 py-2 rounded-md font-medium border border-[#333842]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Show ticket if user confirmed yes */}
        {status === "success" && showTicket && (
          <div className="mt-4">
            <h3 className="text-xl font-medium text-white text-center mb-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-3 text-green-400"
              >
                <style>
                  {`
            @keyframes gentleShake {
              0% { transform: rotate(0deg); }
              25% { transform: rotate(-5deg); }
              50% { transform: rotate(0deg); }
              75% { transform: rotate(5deg); }
              100% { transform: rotate(0deg); }
            }
            .ticket-icon {
              animation: gentleShake 1.5s ease-in-out forwards;
              transform-origin: center;
            }
          `}
                </style>
                <g className="ticket-icon">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v2" />
                  <path d="M13 17v2" />
                  <path d="M13 11v2" />
                  <circle cx="13" cy="6" r="0.5" fill="currentColor" />
                  <circle cx="13" cy="12" r="0.5" fill="currentColor" />
                  <circle cx="13" cy="18" r="0.5" fill="currentColor" />
                </g>
              </svg>
              Your Ticket
            </h3>
            <p className="text-gray-300 text-center mb-6">
              Please download or save your ticket for the event entrance.
            </p>
            <GenerateTicket name={name} email={email} uni={uni} />
          </div>
        )}

        <footer className="mt-8 pt-4 border-t border-[#333842]/50 text-center text-sm text-gray-500">
          If you have any questions, please contact us at{" "}
          <a
            href="mailto:itlegacy.team@gmail.com"
            className="text-blue-400 hover:underline"
          >
            itlegacy.team@gmail.com
          </a>
        </footer>
      </div>
    </main>
  );
}
