"use client";
import { invitation } from "@/assets";
import html2canvas from "html2canvas";
import ExportedImage from "next-image-export-optimizer";
import { QRCodeCanvas } from "qrcode.react";
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
  const handleDownload = async () => {
    const element = document.getElementById("ticket");
    if (!element) return;

    // Wait for fonts/images
    await document.fonts.ready;

    const canvas = await html2canvas(element, {
      useCORS: true, // required if image is external
      scale: 2, // higher quality
    });

    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = "invitation.png";
    link.click();
  };

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
          <div className=" ">
            <QRCodeCanvas
              id="myqr"
              value={name}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              includeMargin={true}
              marginSize={1}
            />
          </div>
        </div>

        <h2 className="absolute top-[482px] left-[100px]">{name}</h2>
        <h2 className="absolute top-[535px] left-[100px]">{email}</h2>
        <h2 className="absolute top-[594px] left-[100px]">{uni}</h2>
      </div>

      <Button
        onClick={handleDownload}
        className="bg-green-500 text-white mt-10"
      >
        Download QR Code
      </Button>
    </div>
  );
}
