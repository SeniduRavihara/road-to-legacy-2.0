// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import Ticket from "./Ticket";

// const TicketDownload = () => {
//   const generatePDF = () => {
//     const element = document.getElementById("content-to-print");

//     if (element) {
//       html2canvas(element).then((canvas) => {
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");

//         const imgWidth = 210;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;

//         pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//         pdf.save("document.pdf");
//       });
//     }
//   };

//   return (
//     <div className="flex flex-col items-center bg-blue-300 w-screen h-screen p-10">
//       <div className="w-[1000px]  bg-white">
//         <Ticket />
//       </div>

//       <button
//         onClick={generatePDF}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Download PDF
//       </button>
//     </div>
//   );
// };
// export default TicketDownload;
