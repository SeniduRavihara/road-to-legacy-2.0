"use client";

import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Award, Download, XCircle } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useState } from "react";

interface CertificateData {
  certificateURL: string;
  name?: string;
  certificateName: string;
  // Add other fields as needed based on your Firebase document structure
}

export default function ConfirmPage() {
  const [certificateData, setCertificateData] =
    useState<CertificateData | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [, setCertificateId] = useState<string>("");

  useEffect(() => {
    const fetchCertificateData = async () => {
      setStatus("loading");

      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");

      if (!id) {
        setStatus("error");
        return;
      }

      setCertificateId(id);

      try {
        // Fetch document from Firebase using the ID
        const docRef = doc(db, "delegates", id); // Adjust collection name as needed
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as CertificateData;

          console.log(data);

          if (data.certificateURL) {
            setCertificateData(data);
            setStatus("success");
          } else {
            setStatus("error");
          }
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error fetching certificate:", error);
        setStatus("error");
      }
    };

    fetchCertificateData();
  }, []);

  const handleDownload = async () => {
    if (!certificateData?.certificateURL) return;

    try {
      // Since it's a Firebase Storage download URL, we can use it directly
      const response = await fetch(certificateData.certificateURL);
      const blob = await response.blob();

      // Get file extension from the URL or default to png
      const urlParts = certificateData.certificateURL.split(".");
      const extension = urlParts[urlParts.length - 1].split("?")[0] || "png";

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${certificateData.certificateName}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert("Failed to download certificate. Please try again.");
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (status === "idle" || status === "loading") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#191b1f] p-4">
        <div className="w-full max-w-2xl bg-[#1f2227] rounded-xl shadow-xl border border-[#333842]/20 p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading certificate...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#191b1f] p-4">
      <div className="w-full max-w-2xl bg-[#1f2227] rounded-xl shadow-xl border border-[#333842]/20 p-8">
        {status === "error" && (
          <div className="bg-[#262930] rounded-lg p-6 text-center border border-red-500/20">
            <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white">
              Certificate Not Found
            </h3>
            <p className="text-gray-300 mt-2">
              We couldn&apos;t find your certificate. Please check the URL and
              try again.
            </p>
            <button
              onClick={handleRetry}
              className="mt-4 bg-[#1f2227] hover:bg-[#333842] text-gray-200 px-4 py-2 rounded-md font-medium border border-[#333842] transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {status === "success" && certificateData && (
          <div className="text-center">
            <h3 className="text-xl font-medium text-white mb-4 flex items-center justify-center">
              <Award className="mr-3 text-yellow-400 h-7 w-7 animate-pulse" />
              Your Certificate
            </h3>
            <p className="text-gray-300 mb-6">
              Congratulations! Your certificate is ready for download.
            </p>

            {/* Certificate Display */}
            <div className="bg-[#262930] rounded-lg p-4 border border-[#333842]/20 mb-6">
              <ExportedImage
                src={certificateData.certificateURL}
                alt="Certificate"
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-certificate.png"; // Add a placeholder image
                }}
                width={300}
                height={300}
              />
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Certificate
            </button>

            {/* Additional Info */}
            {certificateData.name && (
              <p className="text-gray-400 mt-4">
                Certificate for:{" "}
                <span className="text-white font-medium">
                  {certificateData.name}
                </span>
              </p>
            )}
          </div>
        )}

        <footer className="mt-8 pt-4 border-t border-[#333842]/50 text-center text-sm text-gray-500">
          If you have any questions, please contact us at{" "}
          <a
            href="mailto:itlegacy.team@gmail.com"
            className="text-blue-400 hover:underline transition-colors"
          >
            itlegacy.team@gmail.com
          </a>
        </footer>
      </div>
    </main>
  );
}
