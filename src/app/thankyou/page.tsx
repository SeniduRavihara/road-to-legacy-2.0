"use client";

import GenerateTicket from "@/components/GenerateTicket";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ThankYouPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const uni = searchParams.get("uni");

  console.log("Name:", name);
  console.log("Email:", email);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>

        <Link
          href="/"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Go Back to Home
        </Link>

        {name && email && uni && (
          <div className="mt-10">
            <GenerateTicket name={name} email={email} uni={uni} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankYouPage;
