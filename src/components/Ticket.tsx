import { invitation } from "@/assets";
import ExportedImage from "next-image-export-optimizer";
import { QRCodeCanvas } from "qrcode.react";
const Ticket = ({
  name = "sen",
  email,
  uni,
}: {
  name: string;
  email: string;
  uni: string;
}) => {
  return (
    <div
      className="relative rounded-lg w-[400px] h-[710px]"
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
  );
};
export default Ticket;
