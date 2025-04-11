// import React, { useEffect } from "react";
// import { jsPDF } from "jspdf";
// // import "./styles/InvitationCard.css";

// const InvitationCard = () => {
//   useEffect(() => {
//     const doc = new jsPDF({
//       orientation: "portrait",
//       unit: "in",
//       format: [2.125, 3.375],
//     });

//     doc.addImage("Road to Leagacy 2.0.png", "PNG", 0.44, -0.3, 1.3, 1.3);
//     doc.setFont("times", "bold");
//     doc.setFontSize(9);
//     doc.setTextColor("#212420");
//     doc.text("ROAD TO LEAGACY 2.0", 1.0625, 0.85, null, null, "center");

//     doc.setFont("times", "normal");
//     doc.setFontSize(7);
//     doc.setTextColor("#212420");
//     doc.text(
//       "Take a step into the future.",
//       1.0625,
//       0.985,
//       null,
//       null,
//       "center"
//     );

//     doc.setFillColor("#212420");
//     doc.triangle(0, 1.9, 2.129, 1.18, 2.129, 1.9, "F");
//     doc.rect(0, 1.9, 2.125, 1.697, "F");

//     doc.setFillColor("#212420");
//     doc.rect(0.59, 1.1, 1, 1, "F");
//     doc.addImage("Untitled.png", "PNG", 0.64, 1.15, 0.9, 0.9);

//     doc.addImage(
//       "profile-circle-svgrepo-com.png",
//       "PNG",
//       0.24,
//       2.25,
//       0.17,
//       0.17
//     );
//     doc.addImage("mail-shield-svgrepo-com.png", "PNG", 0.24, 2.5, 0.17, 0.17);
//     doc.addImage("graduate-cap-svgrepo-com.png", "PNG", 0.24, 2.75, 0.17, 0.17);

//     doc.setFont("times", "normal");
//     doc.setFontSize(7);
//     doc.setTextColor("#fff");
//     doc.text("Nimesha Kavindu", 0.5, 2.35, null, null, "left");
//     doc.text("nimeshakavindu91@gmail.com", 0.5, 2.6, null, null, "left");
//     doc.text(
//       "University of Sri Jayewardenepura",
//       0.5,
//       2.85,
//       null,
//       null,
//       "left"
//     );

//     doc.setFontSize(5.5);
//     doc.text("#hackMeIfYouCan", 0.1, 3.3, null, null, "left");

//     doc.setFont("times", "normal");
//     doc.setFontSize(5.5);
//     doc.setTextColor("#fff");
//     doc.text("© USJ | UOC | UOM", 2.03, 3.3, null, null, "right");

//     document
//       .getElementById("idcard-preview")
//       .setAttribute("src", URL.createObjectURL(doc.output("blob")));
//   }, []);

//   return (
//     <div>
//       <iframe
//         src=""
//         frameBorder="0"
//         id="idcard-preview"
//         title="id card preview"
//         style={{ width: "100%", height: "700px" }}
//       ></iframe>
//     </div>
//   );
// };

// export default InvitationCard;
