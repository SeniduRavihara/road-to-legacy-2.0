import ExportedImage from "next-image-export-optimizer";
const Ticket = () => {
  return (
    <div
      id="content-to-print"
      className="bg-black text-white relative w-[1000px] h-[300px]"
    >
      <ExportedImage
        src="/ticket-background.png"
        alt="background"
        fill
        className="absolute"
      />
      <ExportedImage
        src="/qrcode.png"
        alt="qrcode"
        className="absolute mt-10"
        width={200}
        height={200}
      />
      {/* <h2>Sample HTML Content</h2>
      <p>This content will be converted into a PDF.</p>{" "}
      <p>This content will be converted into a PDF.</p> */}
    </div>
  );
};
export default Ticket;
