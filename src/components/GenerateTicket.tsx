import { invitation } from "@/assets";
import { storage } from "@/firebase/config"; // Adjust path to Firebase config
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import html2canvas from "html2canvas";
import { CheckCircle, Download, Loader2, Share2 } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export default function GenerateTicket({
  name = "sen",
  email,
  uni,
}: {
  name: string;
  email: string;
  uni: string;
}) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(true);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const generateTicketImage = async () => {
    setIsGenerating(true);
    const element = document.getElementById("ticket");
    if (!element) return null;

    await document.fonts.ready;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/png");

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `invitations/${name}-ticket.png`);
      await uploadString(storageRef, imgData, "data_url");

      // Get the public URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Image URL:", downloadURL);
      setImageUrl(downloadURL);

      setIsGenerating(false);
      return imgData;
    } catch (error) {
      console.error("Error generating ticket:", error);
      setIsGenerating(false);
      return null;
    }
  };

  const triggerDownload = (imgData: string) => {
    // Trigger the download
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `${name}-invitation.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadComplete(true);
    setTimeout(() => setDownloadComplete(false), 2000);
  };

  const handleManualDownload = async () => {
    setDownloadComplete(false);
    const imgData = await generateTicketImage();
    if (imgData) {
      triggerDownload(imgData);
    }
  };

  // const handleSendEmail = async () => {
  //   setIsSending(true);
  //   await sendEmail(email, "Welcome", createEmailHTML(name, imageUrl));
  //   setIsSending(false);
  // };

  // Auto-generate and download on component mount
  useEffect(() => {
    const autoGenerateAndDownload = async () => {
      // Wait a moment for components to render properly
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const imgData = await generateTicketImage();
      if (imgData) {
        triggerDownload(imgData);
      }
    };

    autoGenerateAndDownload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Share URLs (WhatsApp, Telegram) with the download URL
  const shareUrl = `Check out my event ticket! Here it is: ${encodeURIComponent(imageUrl)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareUrl}`;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Ticket Preview */}
      <div className="relative bg-[#262930] p-4 rounded-xl shadow-lg border border-[#333842] mb-6 w-[330px] md:w-[430px] h-[570px] md:h-[750px]">
        <div className="inline-block">
          <div
            className="relative rounded-lg  scale-75 md:scale-100 origin-top-left w-[400px] h-[710px]"
            id="ticket"
          >
            <ExportedImage
              src={invitation}
              alt="Invitation"
              width={400}
              height={710}
              unoptimized={true}
            />

            <div className="absolute top-[230px] left-[100px]">
              <QRCodeCanvas
                id="myqr"
                value={email}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                includeMargin={true}
                marginSize={1}
              />
            </div>

            <h2 className="absolute top-[482px] left-[100px]">{name}</h2>
            <h2 className="absolute top-[535px] left-[100px]">{email}</h2>
            <h2 className="absolute top-[594px] left-[100px]">{uni}</h2>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <button
          onClick={handleManualDownload}
          disabled={isGenerating}
          className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 disabled:opacity-70"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : downloadComplete ? (
            <CheckCircle className="mr-2 h-5 w-5" />
          ) : (
            <Download className="mr-2 h-5 w-5" />
          )}
          {isGenerating
            ? "Generating..."
            : downloadComplete
              ? "Downloaded!"
              : "Download Ticket"}
        </button>

        {imageUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share on WhatsApp
          </a>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center bg-[#262930] p-4 rounded-lg border border-[#333842] w-full max-w-md">
        <p className="text-gray-300 text-sm">
          Your ticket has been automatically downloaded. You can download it
          again or share it via WhatsApp.
        </p>
      </div>
    </div>
  );
}
