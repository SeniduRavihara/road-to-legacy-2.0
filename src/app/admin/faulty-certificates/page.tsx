"use client";

import { sendEmail } from "@/firebase/api";
import { createCertificateHTML } from "@/lib/utils";
import { useState } from "react";
import * as XLSX from "xlsx";

interface FaultyDelegate {
  Name: string;
  Email: string;
  "Contact Number": string;
  "Certificate URL": string;
  "Upload Date": string;
  id: string;
}

const FaultyCertificatesPage = () => {
  const [delegates, setDelegates] = useState<FaultyDelegate[]>([]);
  const [sending, setSending] = useState(false);
  const [sentIds, setSentIds] = useState<string[]>([]);

  // Handle CSV upload and parse
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      if (!data) return;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json: FaultyDelegate[] = XLSX.utils.sheet_to_json(worksheet);
      setDelegates(json);
    };
    reader.readAsBinaryString(file);
  };

  // Send email to a single delegate
  const sendCertificateEmail = async (delegate: FaultyDelegate) => {
    setSending(true);
    try {
      await sendEmail(
        delegate.Email,
        "Corrected Certificate - Road To Legacy 2.0",
        createCertificateHTML(
          delegate.Name,
          "Road To Legacy 2.0",
          "May 31, 2025",
          `https://roadtolegacy.team/certificate?id=${encodeURIComponent(delegate.id)}`
        )
      );
      setSentIds((prev) => [...prev, delegate.id]);
      alert(`Email sent to ${delegate.Email}`);
    } catch {
      alert(`Failed to send email to ${delegate.Email}`);
    }
    setSending(false);
  };

  // Send emails in batch
  const sendAll = async () => {
    setSending(true);
    for (const delegate of delegates) {
      if (!sentIds.includes(delegate.id)) {
        await sendCertificateEmail(delegate);
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
    setSending(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Send Corrected Certificates</h1>
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleFileUpload}
      />
      {delegates.length > 0 && (
        <>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={sendAll}
            disabled={sending}
          >
            Send All
          </button>
          <table className="mt-6 w-full border">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Certificate URL</th>
                <th>Send</th>
              </tr>
            </thead>
            <tbody>
              {delegates.map((d) => (
                <tr
                  key={d.id}
                  className={sentIds.includes(d.id) ? "bg-green-100" : ""}
                >
                  <td>{d.Name}</td>
                  <td>{d.Email}</td>
                  <td>{d["Contact Number"]}</td>
                  <td>
                    <a
                      href={d["Certificate URL"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Link
                    </a>
                  </td>
                  <td>
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
                      onClick={() => sendCertificateEmail(d)}
                      disabled={sending || sentIds.includes(d.id)}
                    >
                      {sentIds.includes(d.id) ? "Sent" : "Send"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default FaultyCertificatesPage;
