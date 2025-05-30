// Modified ConfirmPage.tsx
"use client";

import { AlertCircle } from "lucide-react";

export default function ConfirmPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#191b1f] p-4">
      <div className="w-full max-w-md bg-[#1f2227] rounded-xl shadow-xl border border-[#333842]/20 p-8">
        <div className="bg-[#262930] rounded-lg p-6 text-center border border-orange-500/20">
          <AlertCircle className="h-12 w-12 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">
            Attendance Confirmation Closed
          </h3>
          <p className="text-gray-300 mb-4">
            The attendance confirmation period has ended. We are no longer accepting responses for this event.
          </p>
          <p className="text-gray-400 text-sm">
            Please contact the event organizers if you have any questions.
          </p>
        </div>
      </div>
    </main>
  );
}