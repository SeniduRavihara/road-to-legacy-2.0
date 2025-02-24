// "use client";
// import { db } from "@/firebase/config";
// import { addDoc, collection } from "firebase/firestore";
// // import { QRCode } from "qrcode.react";
// import { useState } from "react";

// export default function GenerateTicket() {
//   const [ticket, setTicket] = useState(null);

//   const generateTicket = async () => {
//     const ticketData = {
//       name: "John Doe",
//       event: "University Fest",
//       date: "2025-05-20",
//       seat: "A1",
//       qrCode: Math.random().toString(36).substring(2, 15),
//     };

//     const docRef = await addDoc(collection(db, "tickets"), ticketData);
//     setTicket({ id: docRef.id, ...ticketData });
//   };

//   return (
//     <div>
//       <button onClick={generateTicket} className="bg-blue-500 text-white">
//         Generate Ticket
//       </button>
//       {ticket && (
//         <div>
//           {/* <QRCode value={ticket.qrCode} /> */}
//           <p>Name: {ticket.name}</p>
//           <p>Seat: {ticket.seat}</p>
//         </div>
//       )}
//     </div>
//   );
// }
