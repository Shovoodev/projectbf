// import express, { Request, Response } from "express";
// import PDFDocument from "pdfkit";
// import { getKinByUserId } from "../db/kinDetails";
// import { getDeceasedByUserId } from "../db/deceasedPerson";
// import { getAttendenceByUserId } from "../db/attendence";

// const router = express.Router();

// export const pdfController = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     const attendances = await getAttendenceByUserId(userId);
//     const kin = await getKinByUserId(userId);
//     const deceased = await getDeceasedByUserId(userId);

//     if (!attendances || attendances.length === 0) {
//       return res.status(404).json({ message: "No attendance data found" });
//     }

//     const totalPrice = attendances.reduce(
//       (sum: number, a: any) => sum + (a.totalPriceImpact || 0),
//       0
//     );

//     const doc = new PDFDocument({ margin: 50 });

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=report-${userId}.pdf`
//     );

//     doc.pipe(res);

//     /* =========================
//        HELPERS
//     ========================= */
//     const sectionTitle = (title: string) => {
//       doc.fontSize(14).text(title, { underline: true }).moveDown(0.5);
//     };

//     const keyValue = (key: string, value: any) => {
//       doc.fontSize(11).text(`${key}: ${value ?? "N/A"}`);
//     };

//     const drawDivider = () => {
//       doc.moveDown();
//       doc
//         .strokeColor("#aaaaaa")
//         .lineWidth(1)
//         .moveTo(50, doc.y)
//         .lineTo(550, doc.y)
//         .stroke();
//       doc.moveDown();
//     };

//     /* =========================
//        HEADER
//     ========================= */
//     doc
//       .fontSize(20)
//       .text("User Attendance Report", { align: "center" })
//       .moveDown();

//     keyValue("User ID", userId);

//     keyValue("Total Price", `€${totalPrice}`);

//     drawDivider();

//     /* =========================
//        RESPONSES
//     ========================= */
//     sectionTitle("Responses");

//     attendances.forEach((a: any, index: number) => {
//       doc
//         .fontSize(11)
//         .text(`${index + 1}. ${a.questionText ?? "Question"}`)
//         .text(`   Answer: ${a.textAnswer ?? "N/A"}`)
//         .text(`   Price Impact: €${a.totalPriceImpact ?? 0}`)
//         .moveDown(0.5);
//     });

//     drawDivider();

//     /* =========================
//        KIN DETAILS
//     ========================= */
//     sectionTitle("Kin Details");

//     if (kin) {
//       keyValue(
//         "Name",
//         `${kin.salutation} ${kin.givenName} ${kin.surname}`
//       );
//       keyValue("Relation", kin.relation);
//       keyValue("Mobile", kin.mobile);
//       keyValue("Address", kin.currentAddress);
//     } else {
//       doc.fontSize(11).text("No kin details available");
//     }

//     drawDivider();

//     /* =========================
//        DECEASED DETAILS
//     ========================= */
//     sectionTitle("Deceased Details");

//     if (deceased) {
//       keyValue(
//         "Name",
//         `${deceased.salutation} ${deceased.givenName} ${deceased.surname}`
//       );
//       keyValue("Date of Death", deceased.dateOfDeath);
//       keyValue("Address", deceased.address);
//       keyValue("Reason", deceased.deceasedPassedReason);
//       keyValue("Current Location", deceased.deceasedNow);
//       keyValue(
//         "Battery Powered Devices",
//         deceased.batterypowereddevices
//       );
//       keyValue(
//         "Regular Doctor Address",
//         deceased.regulardoctoraddress
//       );
//     } else {
//       doc.fontSize(11).text("No deceased details available");
//     }

//     doc.end();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to generate PDF" });
//   }
// };

// export default router;
