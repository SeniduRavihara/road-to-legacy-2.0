"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/config";
import { collection, doc, writeBatch } from "firebase/firestore";
import { UploadCloud } from "lucide-react";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

// Using the same Delegate interface for consistency
interface OCMember {
  id: string;
  firstName: string;
  lastName: string;
  certificateName: string;
  email: string;
  contactNumber: string;
  university: string;
  role?: string;
  team?: string;
  photographUrl?: string;
  timestamp?: string;
}

const OCUploaderPage = () => {
  const [ocMembers, setOcMembers] = useState<OCMember[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const result = e.target?.result;
          if (result instanceof ArrayBuffer) {
            const data = new Uint8Array(result);
            const workbook = XLSX.read(data, { type: "array" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData: { [key: string]: string }[] =
              XLSX.utils.sheet_to_json(worksheet);

            const parsedMembers: OCMember[] = jsonData.map(
              (row: { [key: string]: string }, index: number): OCMember => {
                const fullName = row["Name (Ex:Movindu Chandra)"] || "";
                const nameParts = fullName.split(" ");
                const firstName = nameParts[0] || "";
                const lastName = nameParts.slice(1).join(" ") || "";

                // Data transformation
                let team = row["Team Name"] || "";
                if (team.endsWith(" Team")) {
                  team = team.replace(" Team", "").trim();
                }

                let role = row["Your Position"] || "";
                if (role === "Team Lead" || role === "Lead") {
                  role = "Leader";
                }

                return {
                  id: row["Email address"] || `delegate-${index}`,
                  firstName,
                  lastName,
                  certificateName:
                    row[
                      "The name you want in E-Certificate(Ex:M.D.M.C.Matharage)"
                    ] || fullName,
                  email: row["Email address"] || "",
                  role: role,
                  team: team,
                  contactNumber: row["Whatsapp Number"] || "",
                  university: row["University Name"] || "",
                  photographUrl:
                    row["Your Official Photograph(In RTL T-Shirt)"] || "",
                  timestamp: row["Times"] || "",
                };
              }
            );

            setOcMembers(parsedMembers);
            setUploadResult(null); // Reset result on new file
          }
        } catch (error) {
          console.error("Error parsing Excel file:", error);
          setUploadResult({
            success: false,
            message: "Error parsing Excel file. Please check the format.",
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleUpload = async () => {
    if (ocMembers.length === 0) {
      setUploadResult({
        success: false,
        message: "No members to upload. Please select a valid Excel file.",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadResult(null);

    try {
      const batch = writeBatch(db);
      const ocMembersCollection = collection(db, "ocmembers");

      ocMembers.forEach((member) => {
        // Use email as the document ID for uniqueness
        const docRef = doc(ocMembersCollection, member.email);
        batch.set(docRef, member);
      });

      await batch.commit();

      // Simulate progress for visual feedback as batch commit is atomic
      for (let i = 0; i <= 100; i++) {
        setUploadProgress(i);
        await new Promise((res) => setTimeout(res, 5));
      }

      setUploadResult({
        success: true,
        message: `Successfully uploaded ${ocMembers.length} OC members to Firebase!`,
      });
    } catch (error) {
      console.error("Error uploading to Firebase:", error);
      setUploadResult({
        success: false,
        message: `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (ocMembers.length === 0) {
      alert("No data to download. Please upload a file first.");
      return;
    }

    const dataToExport = ocMembers.map((member) => ({
      Times: member.timestamp,
      "Email address": member.email,
      "Name (Ex:Movindu Chandra)": `${member.firstName} ${member.lastName}`,
      "Whatsapp Number": member.contactNumber,
      "University Name": member.university,
      "Team Name": member.team,
      "Your Official Photograph(In RTL T-Shirt)": member.photographUrl,
      "Your Position": member.role,
      "The name you want in E-Certificate(Ex:M.D.M.C.Matharage)":
        member.certificateName,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transformed OC Data");
    XLSX.writeFile(workbook, "Transformed-OC-Members.xlsx");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <UploadCloud className="w-8 h-8 mr-3 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Upload OC Members
          </h1>
        </div>

        <p className="text-gray-600 mb-6">
          Select an Excel file with the OC member details to upload them to the
          &apos;ocmembers&apos; collection in Firebase.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OC Members Excel File (.xlsx)
            </label>
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              disabled={isUploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {fileName && (
              <p className="text-sm text-gray-500 mt-2">
                Selected file: {fileName}
              </p>
            )}
          </div>

          <Button
            onClick={handleUpload}
            disabled={isUploading || ocMembers.length === 0}
            className="w-full"
          >
            {isUploading
              ? "Uploading..."
              : `Upload ${ocMembers.length} Members`}
          </Button>

          <Button
            onClick={handleDownload}
            disabled={ocMembers.length === 0}
            className="w-full mt-2"
            variant="outline"
          >
            Download Transformed Excel
          </Button>
        </div>

        {isUploading && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}

        {uploadResult && (
          <div
            className={`mt-6 p-4 rounded-md ${
              uploadResult.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <p className="font-bold">
              {uploadResult.success ? "Success" : "Error"}
            </p>
            <p>{uploadResult.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OCUploaderPage;
