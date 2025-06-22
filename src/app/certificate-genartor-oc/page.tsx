"use client";

import { Cloud, ExternalLink, Pause, Settings } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

// We need to import XLSX library at the top
import { db, storage } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadString,
} from "firebase/storage";
import * as XLSX from "xlsx";

// Type Definitions
interface Delegate {
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
}

interface CertificateConfig {
  width: number;
  height: number;
  nameX: number;
  nameY: number;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  textAlign: string;
  eventName: string;
  eventDate: string;
  roleX: number;
  roleY: number;
  roleFontSize: number;
  teamX: number;
  teamY: number;
  teamFontSize: number;
}

interface FirebaseConfig {
  enabled: boolean;
  folderPath: string;
  generatePublicLinks: boolean;
}

interface CertificateData {
  delegate: Delegate;
  dataURL: string;
  filename: string;
}

interface UploadResult {
  success: boolean;
  url?: string;
  filename: string;
  delegate: Delegate;
  uploadedAt?: string;
  error?: string;
}

const CertificateGenerator: React.FC = () => {
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [uploadedCertificates, setUploadedCertificates] = useState<
    UploadResult[]
  >([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [certificateConfig, setCertificateConfig] = useState<CertificateConfig>(
    {
      width: 1200,
      height: 800,
      nameX: 1000, // This will be the center X position
      nameY: 710,
      fontSize: 48,
      fontFamily: "serif",
      textColor: "#fffff",
      textAlign: "center", // Always center-align the text
      eventName: "Road To Legacy 2.0",
      eventDate: "May 31, 2025",
      roleX: 1650,
      roleY: 790,
      roleFontSize: 35,
      teamX: 475,
      teamY: 845,
      teamFontSize: 35,
    }
  );
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseConfig>({
    enabled: true,
    folderPath: "oc_certificates",
    generatePublicLinks: true,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  //   const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample delegate data
  const sampleDelegates: Delegate[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      certificateName: "John Doe",
      email: "john@example.com",
      role: "Co-Chair",
      team: "Executive Committee",
      contactNumber: "1234567890",
      university: "University of Example",
      photographUrl: "",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      certificateName: "Jane Smith",
      email: "jane@example.com",
      role: "Member",
      team: "Marketing Team",
      contactNumber: "0987654321",
      university: "Example State University",
      photographUrl: "",
    },
    {
      id: "3",
      firstName: "Bob",
      lastName: "Johnson",
      certificateName: "Bob Johnson",
      email: "bob@example.com",
      role: "Member",
      team: "Finance Team",
      contactNumber: "1122334455",
      university: "Tech University",
      photographUrl: "",
    },
  ];

  const handleBackgroundUpload = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          const img = new Image();
          img.onload = () => {
            setBackgroundImage(img);
            // Update canvas size to match image
            setCertificateConfig((prev) => ({
              ...prev,
              width: img.width,
              height: img.height,
            }));
          };
          img.src = result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelegatesUpload = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const result = e.target?.result;
          if (result instanceof ArrayBuffer) {
            const data = new Uint8Array(result);
            const workbook = XLSX.read(data, { type: "array" });

            // Get the first worksheet
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Convert to JSON
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

            // Map the Excel columns to delegate properties
            const parsedDelegates: Delegate[] = jsonData.map(
              (row: { [key: string]: string }, index: number): Delegate => {
                const fullName = row["Name (Ex:Movindu Chandra)"] || "";
                const nameParts = fullName.split(" ");
                const firstName = nameParts[0] || "";
                const lastName = nameParts.slice(1).join(" ") || "";

                return {
                  id: row["Email address"] || `delegate-${index}`,
                  firstName,
                  lastName,
                  certificateName:
                    row[
                      "The name you want in E-Certificate(Ex:M.D.M.C.Matharage)"
                    ] || fullName,
                  email: row["Email address"] || "",
                  role: row["Your Position"] || "",
                  team: row["Team Name"] || "",
                  contactNumber: row["Whatsapp Number"] || "",
                  university: row["University Name"] || "",
                  photographUrl:
                    row["Your Official Photograph(In Your Position)"] || "",
                };
              }
            );

            setDelegates(parsedDelegates);
            setCurrentIndex(0);
            alert(
              `Successfully loaded ${parsedDelegates.length} delegates from Excel file`
            );
          }
        } catch (error) {
          console.error("Error parsing Excel file:", error);
          alert("Error parsing Excel file. Please check the format.");
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const generateSingleCertificate = async (
    delegate: Delegate
  ): Promise<CertificateData> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        throw new Error("Canvas not found");
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Canvas context not found");
      }

      // Set canvas size
      canvas.width = certificateConfig.width;
      canvas.height = certificateConfig.height;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (backgroundImage) {
        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      } else {
        // Draw default background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add border
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Add default certificate text
        ctx.fillStyle = "#000000";
        ctx.font = "36px serif";
        ctx.textAlign = "center";
        ctx.fillText("Certificate of Participation", canvas.width / 2, 150);

        ctx.font = "24px serif";
        ctx.fillText(`${certificateConfig.eventName}`, canvas.width / 2, 200);
        ctx.fillText(
          `${certificateConfig.eventDate}`,
          canvas.width / 2,
          canvas.height - 100
        );
      }

      // Draw name with center alignment
      ctx.fillStyle = certificateConfig.textColor;
      ctx.font = `${certificateConfig.fontSize}px ${certificateConfig.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const nameText =
        delegate.certificateName ||
        delegate.firstName + " " + delegate.lastName;
      ctx.fillText(nameText, certificateConfig.nameX, certificateConfig.nameY);

      // Draw role
      if (delegate.role) {
        ctx.font = `${certificateConfig.roleFontSize}px ${certificateConfig.fontFamily}`;
        ctx.fillText(
          delegate.role,
          certificateConfig.roleX,
          certificateConfig.roleY
        );
      }

      // Draw team
      if (delegate.team) {
        ctx.font = `${certificateConfig.teamFontSize}px ${certificateConfig.fontFamily}`;
        ctx.fillText(
          delegate.team,
          certificateConfig.teamX,
          certificateConfig.teamY
        );
      }

      // Get data URL for Firebase upload
      const dataURL = canvas.toDataURL("image/png");

      resolve({
        delegate,
        dataURL,
        filename: `${delegate.certificateName || delegate.firstName}_certificate.png`,
      });
    });
  };

  // Firebase upload function
  const uploadToFirebase = async (
    certificateData: CertificateData
  ): Promise<UploadResult> => {
    try {
      // For demo purposes, we'll simulate the Firebase upload
      // In real implementation, uncomment and use the actual Firebase code:

      const certificateName =
        certificateData.delegate.certificateName ||
        `${certificateData.delegate.firstName}_${certificateData.delegate.lastName}`;

      // Upload image to Firebase Storage
      const storageRef: StorageReference = ref(
        storage,
        `${firebaseConfig.folderPath}/${certificateName}-certificate.png`
      );

      await uploadString(storageRef, certificateData.dataURL, "data_url");

      // Get the public URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      const delegateDocRef = doc(db, "ocmembers", certificateData.delegate.id);
      await updateDoc(delegateDocRef, {
        certificateURL: downloadURL,
      });

      return {
        success: true,
        url: downloadURL,
        filename: certificateData.filename,
        delegate: certificateData.delegate,
        uploadedAt: new Date().toISOString(),
      };

      // Simulated Firebase upload for demo
      //   await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

      //   const certificateName = certificateData.delegate.certificateName ||
      //                         `${certificateData.delegate.firstName}_${certificateData.delegate.lastName}`;

      //   return {
      //     success: true,
      //     url: `https://firebasestorage.googleapis.com/v0/b/your-project.appspot.com/o/${firebaseConfig.folderPath}%2F${encodeURIComponent(certificateName)}-certificate.png?alt=media`,
      //     filename: certificateData.filename,
      //     delegate: certificateData.delegate,
      //     uploadedAt: new Date().toISOString()
      //   };
    } catch (error) {
      console.error("Error uploading to Firebase:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        filename: certificateData.filename,
        delegate: certificateData.delegate,
      };
    }
  };

  const generateAndUploadAll = async (): Promise<void> => {
    if (delegates.length === 0) {
      setDelegates(sampleDelegates);
      return;
    }

    setIsGenerating(true);
    setUploadProgress(0);
    const uploaded: UploadResult[] = [];
    const failed: UploadResult[] = [];

    for (let i = 0; i < delegates.length; i++) {
      setCurrentIndex(i);
      setUploadProgress(Math.round((i / delegates.length) * 100));

      try {
        // Generate certificate
        const certificateData = await generateSingleCertificate(delegates[i]);

        // Upload to Firebase
        const uploadResult = await uploadToFirebase(certificateData);

        if (uploadResult.success) {
          uploaded.push(uploadResult);
        } else {
          failed.push(uploadResult);
        }

        // Small delay to prevent overwhelming Firebase
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error) {
        failed.push({
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          delegate: delegates[i],
          filename: `${delegates[i].firstName}_certificate.png`,
        });
      }
    }

    setUploadProgress(100);
    setUploadedCertificates(uploaded);
    setIsGenerating(false);

    if (failed.length > 0) {
      alert(
        `Upload completed with ${uploaded.length} successes and ${failed.length} failures. Check console for details.`
      );
      console.error("Failed uploads:", failed);
    } else {
      alert(
        `Successfully uploaded ${uploaded.length} certificates to Firebase Storage!`
      );
    }
  };

  const generatePreview = async (): Promise<void> => {
    const currentDelegate = delegates[currentIndex] || sampleDelegates[0];
    await generateSingleCertificate(currentDelegate);
  };

  const downloadCertificatesList = (): void => {
    const csvContent = [
      ["Name", "Email", "Certificate URL", "Upload Date"],
      ...uploadedCertificates.map((cert) => [
        cert.delegate.certificateName ||
          `${cert.delegate.firstName} ${cert.delegate.lastName}`,
        cert.delegate.email,
        cert.url || "",
        cert.uploadedAt || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "certificate-urls.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleConfigChange = (
    field: keyof CertificateConfig,
    value: string | number
  ): void => {
    setCertificateConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFirebaseConfigChange = (
    field: keyof FirebaseConfig,
    value: string | boolean
  ): void => {
    setFirebaseConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          <Cloud className="w-8 h-8 inline mr-3 text-blue-600" />
          Firebase Certificate Generator
        </h1>

        {/* Upload Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Upload Files</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Background Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delegates Excel File (.xlsx)
                </label>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleDelegatesUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-4 text-gray-700">
            <h3 className="text-lg font-semibold">Certificate Configuration</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Name Center X
                </label>
                <input
                  type="number"
                  value={certificateConfig.nameX}
                  onChange={(e) =>
                    handleConfigChange("nameX", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Name Center Y
                </label>
                <input
                  type="number"
                  value={certificateConfig.nameY}
                  onChange={(e) =>
                    handleConfigChange("nameY", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Font Size
                </label>
                <input
                  type="number"
                  value={certificateConfig.fontSize}
                  onChange={(e) =>
                    handleConfigChange(
                      "fontSize",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Text Color
                </label>
                <input
                  type="color"
                  value={certificateConfig.textColor}
                  onChange={(e) =>
                    handleConfigChange("textColor", e.target.value)
                  }
                  className="w-full h-8 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Role Center X
                </label>
                <input
                  type="number"
                  value={certificateConfig.roleX}
                  onChange={(e) =>
                    handleConfigChange("roleX", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Role Center Y
                </label>
                <input
                  type="number"
                  value={certificateConfig.roleY}
                  onChange={(e) =>
                    handleConfigChange("roleY", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Role Font Size
                </label>
                <input
                  type="number"
                  value={certificateConfig.roleFontSize}
                  onChange={(e) =>
                    handleConfigChange(
                      "roleFontSize",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Team Center X
                </label>
                <input
                  type="number"
                  value={certificateConfig.teamX}
                  onChange={(e) =>
                    handleConfigChange("teamX", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Team Center Y
                </label>
                <input
                  type="number"
                  value={certificateConfig.teamY}
                  onChange={(e) =>
                    handleConfigChange("teamY", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Team Font Size
                </label>
                <input
                  type="number"
                  value={certificateConfig.teamFontSize}
                  onChange={(e) =>
                    handleConfigChange(
                      "teamFontSize",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Firebase Configuration */}
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <h4 className="font-medium text-blue-800 mb-2">
                Firebase Settings
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-blue-700">
                    Storage Folder
                  </label>
                  <input
                    type="text"
                    value={firebaseConfig.folderPath}
                    onChange={(e) =>
                      handleFirebaseConfigChange("folderPath", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                    placeholder="certificates"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-blue-50 text-blue-700 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">
                Status: {delegates.length} delegates loaded
              </p>
              {isGenerating && (
                <div className="mt-2">
                  <p className="text-sm text-blue-600">
                    Uploading certificate {currentIndex + 1} of{" "}
                    {delegates.length}...
                  </p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-500 mt-1">
                    {uploadProgress}% Complete
                  </p>
                </div>
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={generatePreview}
                disabled={isGenerating}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Preview
              </button>
              <button
                onClick={generateAndUploadAll}
                disabled={isGenerating}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {isGenerating ? (
                  <Pause className="w-4 h-4 inline mr-2" />
                ) : (
                  <Cloud className="w-4 h-4 inline mr-2" />
                )}
                Upload All to Firebase
              </button>
            </div>
          </div>
        </div>

        {/* Upload Results */}
        {uploadedCertificates.length > 0 && (
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-green-800">
                {uploadedCertificates.length} certificates uploaded successfully
                to Firebase Storage!
              </p>
              <button
                onClick={downloadCertificatesList}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                <ExternalLink className="w-4 h-4 inline mr-2" />
                Download URLs List
              </button>
            </div>

            <div className="max-h-48 overflow-y-auto text-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-200">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Firebase URL</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedCertificates.map((cert, index) => (
                    <tr key={index} className="border-b border-green-100">
                      <td className="py-1">
                        {cert.delegate.certificateName ||
                          `${cert.delegate.firstName} ${cert.delegate.lastName}`}
                      </td>
                      <td className="py-1">{cert.delegate.email}</td>
                      <td className="py-1">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          View Certificate
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Preview */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Certificate Preview</h3>
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50 inline-block">
            <canvas
              ref={canvasRef}
              width={certificateConfig.width}
              height={certificateConfig.height}
              className="max-w-full h-auto border border-gray-400"
              style={{
                maxWidth: "800px",
                height: "auto",
              }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Current delegate:{" "}
            {delegates[currentIndex]?.certificateName || "Sample Certificate"}
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Firebase Integration Instructions
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>
            Install Firebase SDK:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              npm install firebase
            </code>
          </li>
          <li>
            Create your Firebase config file and import it at the top of this
            component
          </li>
          <li>
            Uncomment the Firebase import statements and the actual upload code
            in the{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              uploadToFirebase
            </code>{" "}
            function
          </li>
          <li>
            Upload your certificate background image and delegates Excel file
          </li>
          <li>Configure the certificate name position and styling</li>
          <li>Use &quot;Preview&quot; to test the certificate layout</li>
          <li>
            Click &quot;Upload All to Firebase&quot; to generate and upload all
            certificates
          </li>
          <li>Download the CSV file with all Firebase URLs for easy access</li>
        </ol>

        <div className="mt-4 p-3 bg-yellow-50 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> The current implementation includes a
            simulated Firebase upload for demonstration. To use real Firebase
            Storage, uncomment the Firebase code in the{" "}
            <code>uploadToFirebase</code> function and provide your Firebase
            configuration.
          </p>
        </div>

        <div className="mt-3 p-3 bg-blue-50 rounded">
          <p className="text-sm text-blue-800">
            <strong>Firebase Setup:</strong> Make sure your Firebase Storage
            rules allow uploads to the certificates folder, and that you have
            proper authentication set up in your application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;
