"use client";
import { invitation } from "@/assets";
import ExportedImage from "next-image-export-optimizer";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

export default function GenerateTicket({
  name = "sen",
  email,
  uni,
}: {
  name: string;
  email: string;
  uni: string;
}) {
  const [ticket, setTicket] = useState("senu");

  const downloadQR = () => {
    // const canvas = document.getElementById("myqr") as HTMLCanvasElement;
    // const pngUrl = canvas
    //   .toDataURL("image/png")
    //   .replace("image/png", "image/octet-stream");
    // const downloadLink = document.createElement("a");
    // downloadLink.href = pngUrl;
    // downloadLink.download = "myqr.png";
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);
  };

  // const generateTicket = async () => {
  //   const ticketData = {
  //     name: "John Doe",
  //     event: "University Fest",
  //     date: "2025-05-20",
  //     seat: "A1",
  //     qrCode: Math.random().toString(36).substring(2, 15),
  //   };

  //   const docRef = await addDoc(collection(db, "tickets"), ticketData);
  //   setTicket({ id: docRef.id, ...ticketData });
  // };

  return (
    <div>
      {/* <button onClick={generateTicket} className="bg-blue-500 text-white">
        Generate Ticket
      </button> */}

      <div className="relative" id="ticket">
        <ExportedImage
          src={invitation}
          alt="Invitation"
          className="rounded-lg shadow-md mb-4"
          width={400}
          height={400}
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

      <button onClick={downloadQR} className="bg-green-500 text-white">
        Download QR Code
      </button>
    </div>
  );
}
