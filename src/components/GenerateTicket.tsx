import { invitation } from "@/assets";
import { sendEmail } from "@/firebase/api";
import { storage } from "@/firebase/config"; // Adjust path to Firebase config
import { createEmailHTML } from "@/lib/utils";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import html2canvas from "html2canvas";
import ExportedImage from "next-image-export-optimizer";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function GenerateTicket({
  name = "sen",
  email,
  uni,
}: {
  name: string;
  email: string;
  uni: string;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleDownload = async () => {
    const element = document.getElementById("ticket");
    if (!element) return;

    await document.fonts.ready;

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

    // Trigger the download
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "invitation.png";
    link.click();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleDownload();
    }, 1500); // Wait a bit for image & QR to render

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Share URLs (WhatsApp, Telegram) with the download URL
  // const shareUrl = `Check out my event ticket! Here it is: ${encodeURIComponent(downloadURL)}`;
  // const whatsappUrl = `https://api.whatsapp.com/send?text=${shareUrl}`;
  // const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(downloadURL)}&text=${shareUrl}`;

  return (
    <div>
      <div className="relative rounded-lg" id="ticket">
        <ExportedImage
          src={invitation}
          alt="Invitation"
          width={400}
          height={400}
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

      {/* <Button
        onClick={handleDownload}
        className="bg-green-500 text-white mt-10"
      >
        Download QR Code
      </Button> */}

      {imageUrl && (
        <Button
        className="mt-10"
          onClick={() =>
            sendEmail(email, "Welcome", createEmailHTML(name, imageUrl))
          }
        >
          Send The Email
        </Button>
      )}

      {/* WhatsApp Share Button */}
      {/* <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Share on WhatsApp
      </a> */}

      {/* Telegram Share Button */}
      {/* <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Share on Telegram
      </a> */}
    </div>
  );
}
