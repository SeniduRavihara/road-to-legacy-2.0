"use client";
import { useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import QrReader from "react-qr-reader";

export default function ScanTicket() {
  const [scanResult, setScanResult] = useState(null);
  const [valid, setValid] = useState(null);

  const handleScan = async (qrCode) => {
    if (!qrCode) return;

    const q = query(collection(db, "tickets"), where("qrCode", "==", qrCode));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setValid(true);
      setScanResult(querySnapshot.docs[0].data());
    } else {
      setValid(false);
    }
  };

  return (
    <div>
      <QrReader delay={300} onScan={handleScan} style={{ width: "100%" }} />
      {valid !== null && (
        <div className={valid ? "text-green-500" : "text-red-500"}>
          {valid ? "Valid Ticket" : "Invalid Ticket"}
        </div>
      )}
    </div>
  );
}
