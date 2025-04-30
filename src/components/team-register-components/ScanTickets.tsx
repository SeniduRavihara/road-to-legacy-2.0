"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import QrScan from "react-qr-reader";
import { Loader2, CheckCircle, AlertCircle, Upload } from "lucide-react";

const ScanTicket = ({
  children,
  type,
  setTeamData,
  teamData,
}: {
  children: React.ReactNode;
  type: "leader" | "member";
  setTeamData: React.Dispatch<
    React.SetStateAction<{
      teamName: string;
      leaderEmail: string;
      members: string[];
    }>
  >;
  teamData: {
    teamName: string;
    leaderEmail: string;
    members: string[];
  }
}) => {
  // States for QR scanning
  const [openDialog, setOpenDialog] = useState(false);
  const [scannerReady, setScannerReady] = useState(false);
  const qrRef = useRef<QrScan | null>(null);

  // States for feedback
  const [scannedData, setScannedData] = useState("");
  const [status, setStatus] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize scanner with slight delay
  useEffect(() => {
    if (openDialog) {
      setTimeout(() => setScannerReady(true), 500);
      setStatus("idle");
      setScannedData("");
      setErrorMessage("");
    } else {
      setScannerReady(false);
    }
  }, [openDialog]);

  // Reset feedback states after successful scan
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        setStatus("idle");
        setScannedData("");
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (status === "error") {
      const timer = setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const validateQrData = (data: string): boolean => {
    // Basic validation - adjust based on your QR code format
    if (!data || data.length < 5) {
      setErrorMessage("Invalid QR code format");
      return false;
    }

    // Check if it's already in the team
    if (type === "member") {
      // Check against our local copy of the team data
      const isDuplicate =
        teamData.members.includes(data) || data === teamData.leaderEmail;

      if (isDuplicate) {
        setErrorMessage("This member is already in your team");
        return false;
      }
    }

    return true;
  };

  const handleScan = (data: string | null) => {
    if (!data || status === "scanning" || status === "success") return;

    setStatus("scanning");
    setScannedData(data);

    try {
      // Validate the scanned data
      if (!validateQrData(data)) {
        setStatus("error");
        return;
      }

      // Update team data based on scan type
      if (type === "leader") {
        setTeamData((prev) => ({
          ...prev,
          leaderEmail: data,
        }));
        setStatus("success");

        // Also update our local copy
        setTeamData((prev) => ({
          ...prev,
          leaderEmail: data,
        }));

        // Auto close dialog after success for leader
        setTimeout(() => setOpenDialog(false), 1500);
      } else {
        // Member handling
        setTeamData((prev) => {
          const updatedMembers = [...prev.members];

          // Find first empty slot or add to end
          const emptyIndex = updatedMembers.findIndex(
            (member) => member === ""
          );

          if (emptyIndex !== -1) {
            updatedMembers[emptyIndex] = data;
          } else {
            updatedMembers.push(data);
          }

          return {
            ...prev,
            members: updatedMembers,
          };
        });


        setStatus("success");
      }
    } catch (err) {
      console.error("Processing error:", err);
      setStatus("error");
      setErrorMessage("Failed to process QR code");
    }
  };

  const handleError = (err: Error): void => {
    console.error("QR Scan Error:", err);
    setStatus("error");
    setErrorMessage(
      "Camera error: " + (err.message || "Failed to access camera")
    );
  };

  const handleUpload = () => {
    if (qrRef.current) {
      qrRef.current.openImageDialog();
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-6 flex flex-col items-center justify-center rounded-xl bg-[#191b1f] border-[#333842] text-gray-100">
        <DialogHeader className="w-full">
          <DialogTitle className="text-center text-xl text-gray-100">
            {type === "leader" ? "Scan Leader Code" : "Scan Member Code"}
          </DialogTitle>
        </DialogHeader>

        <div className="w-full max-w-sm">
          {/* Scan instruction */}
          <p className="text-center text-sm text-gray-400">
            Position QR code in the center of the camera view
          </p>

          {/* QR Scanner */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            {scannerReady ? (
              <QrScan
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
                className="aspect-square"
              />
            ) : (
              <div className="w-full aspect-square bg-[#1f2227] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#333842]" />
              </div>
            )}

            {/* Scan overlay */}
            {scannerReady && status === "idle" && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 border-2 border-dashed border-[#2c3039] opacity-70 rounded-lg"></div>
                <div className="absolute inset-1/4 border-2 border-[#333842] rounded-lg animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Upload QR from image option */}
          {scannerReady && (
            <QrScan
              ref={qrRef}
              onError={handleError}
              onScan={handleScan}
              legacyMode
              style={{ display: "none" }}
            />
          )}

          {/* Status display */}
          <div className="min-h-16 mb-3 mt-2 flex flex-col items-center justify-center gap-2">
            {status === "scanning" && (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 text-[#333842] animate-spin" />
                <span className="text-sm text-gray-300">Processing...</span>
              </div>
            )}

            {status === "success" && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400 animate-bounce" />
                <span className="text-sm font-medium text-green-400">
                  Successfully added
                </span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-sm text-red-400">{errorMessage}</span>
              </div>
            )}

            {scannedData && (
              <div className="text-sm font-mono bg-[#262930] px-2 py-1 rounded-md max-w-full truncate text-gray-300">
                {scannedData}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-[#262930] border border-[#333842] text-gray-300 rounded-lg flex items-center gap-2 hover:bg-[#2c3039] transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
            </button>

            <button
              onClick={() => setOpenDialog(false)}
              className="px-4 py-2 bg-[#1f2227] border border-[#262930] text-gray-400 rounded-lg hover:bg-[#262930] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default ScanTicket;
