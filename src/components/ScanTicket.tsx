"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import QrScan from "react-qr-reader";

const ScanTicket = ({ children }: { children: React.ReactNode }) => {
  const [qrscan, setQrscan] = useState("No result");
  const qrRef = useRef<QrScan | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      setQrscan(data);
    }
  };

  const handleError = (err: Error): void => {
    console.error("QR Scan Error:", err);
  };

  // Trigger file input for image upload scanning
  const handleUpload = () => {
    if (qrRef.current) {
      qrRef.current.openImageDialog();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] flex flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>QR Code Scanner</DialogTitle>
          </DialogHeader>

          {/* 📷 Real-time QR Code Scanner */}
          <QrScan
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%", maxWidth: "320px" }}
            // constraints={{ video: { facingMode: "environment" } }} // Uses the back camera
          />

          {/* 🖼 Upload Image for QR Scanning */}
          <QrScan
            ref={qrRef}
            onError={handleError}
            onScan={handleScan}
            legacyMode // Only used when manually triggered
            style={{ display: "none" }} // Hide the second scanner
          />

          {/* Buttons */}
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Upload Image
          </button>

          {/* Scan Result */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Scan Result:</h3>
            <p className="text-gray-600">{qrscan}</p>
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScanTicket;
