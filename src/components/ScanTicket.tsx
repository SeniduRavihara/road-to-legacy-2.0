"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { approveQr } from "@/firebase/api";
import { useEffect, useRef, useState } from "react";
import QrScan from "react-qr-reader";

const ScanTicket = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState("");
  const [discription, setDiscription] = useState("");
  const [approving, setApproving] = useState(false);
  const [approved, setApproved] = useState(false);
  const qrRef = useRef<QrScan | null>(null);

  useEffect(() => {
    if (approved) {
      setTimeout(() => {
        setApproved(false);
        setEmail("");
      }, 1000);
    }
  }, [approved]);

  const handleScan = async (data: string | null) => {
    if (data && !approving && !approved) {
      setApproving(true);

      try {
        const { success, email, discription } = await approveQr(data);

        if (success) {
          console.log("HELLO", success);
          setApproved(true);
          setEmail(email);
        } else {
          if (discription) setDiscription(discription);
        }
      } catch (error) {
        console.error("QR approval error:", error);
      } finally {
        setApproving(false);
        setDiscription("");
      }
    }
  };

  const handleError = (err: Error): void => {
    console.error("QR Scan Error:", err);
  };

  // ✅ Trigger file input for image upload scanning
  const handleUpload = () => {
    if (qrRef.current) {
      qrRef.current.openImageDialog(); // This works only when `legacyMode` is enabled
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-5 flex flex-col items-center justify-center sm:rounded-xl rounded-xl">
        <DialogHeader>
          <DialogTitle>QR Code Scanner</DialogTitle>
        </DialogHeader>


        {/* 📷 Real-time QR Code Scanner */}
        <QrScan
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", maxWidth: "320px" }}
        />

        {/* 🖼 Upload Image for QR Scanning (Hidden by Default) */}
        <QrScan
          ref={qrRef}
          onError={handleError}
          onScan={handleScan}
          legacyMode // ✅ Needed for manual trigger
          style={{ display: "none" }} // Hide the secondary scanner
        />

        <div className="mt-4 text-lg">{email}</div>

        {/* Upload Image Button */}
        <button
          onClick={handleUpload}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Upload Image
        </button>

        {/* 🔄 Loading Animation */}
        {approving && (
          <video autoPlay muted loop playsInline width="30">
            <source src="/aprove-loading.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* ✅ Approved Animation */}
        {approved && (
          <video autoPlay muted playsInline width="30">
            <source src="/aprove-animate.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}

        {discription && <div>{discription}</div>}

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default ScanTicket;
