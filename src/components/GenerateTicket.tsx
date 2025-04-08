import { invitation } from "@/assets";
import { sendEmail } from "@/firebase/api";
import { storage } from "@/firebase/config"; // Adjust path to Firebase config
import { createEmailHTML } from "@/lib/utils";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import html2canvas from "html2canvas";
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
  const [isSending, setIsSending] = useState(false);

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

  const handleSendEmail = async () => {
    setIsSending(true);
    await sendEmail(email, "Welcome", createEmailHTML(name, imageUrl));
    setIsSending(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleDownload();
    }, 1500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Share URLs (WhatsApp, Telegram) with the download URL
  const shareUrl = `Check out my event ticket! Here it is: ${encodeURIComponent(imageUrl)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareUrl}`;
  // const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(imageUrl)}&text=${shareUrl}`;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="inline-block">
        <div
          className="relative rounded-lg transform translate-x-[50px] md:translate-x-0  scale-75 md:scale-100 origin-top-left w-[400px] h-[710px]"
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

      {/* <Button
        onClick={handleDownload}
        className="bg-green-500 text-white mt-10"
      >
        Download QR Code
      </Button> */}

      <div className="relative -top-[150px] md:top-0">
        {imageUrl && (
          <>
            <button
              disabled={isSending}
              className={`mt-5 px-4 py-2 bg-[#045a6d] text-white font-medium rounded-[15px] mr-2 ${
                isSending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#036075] cursor-pointer"
              }`}
              onClick={handleSendEmail}
            >
              {isSending ? "Sending..." : "Get As a Email"}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-5 px-4 py-2 bg-[#045a6d] text-white font-medium rounded-[15px] mr-2 hover:bg-[#036075] cursor-pointer`}
            >
              Share on WhatsApp
            </a>
          </>
        )}
      </div>
    </div>
  );
}
