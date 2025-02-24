"use client";

import { useState } from "react";
import QrScan from "react-qr-reader";

const QRScanner = () => {
  const [qrscan, setQrscan] = useState("No result");

  const handleScan = (data: string | null) => {
    if (data) {
      setQrscan(data);
    }
  };


  const handleError = (err: Error): void => {
    console.error("QR Scan Error:", err);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="text-2xl font-bold">QR Code Scanner</h1>

      <QrScan
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%", maxWidth: "320px" }}
        // constraints={{
        //   facingMode: "environment", // Use back camera on mobile
        // }}
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Scan Result:</h3>
        <p className="text-gray-600">{qrscan}</p>
      </div>
    </div>
  );
};

export default QRScanner;
