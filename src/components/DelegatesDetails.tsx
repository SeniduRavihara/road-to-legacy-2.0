"use client";

import { sendEmail } from "@/firebase/api";
import { db } from "@/firebase/config";
import { convertTimestampToDate, createOCCertificateHTML } from "@/lib/utils";
import { DelegatesExportType, DelegatesType } from "@/types";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { columns } from "./delegates-data/Coloumns";
import { DataTable } from "./delegates-data/DataTable";
import { Card, CardContent } from "./ui/card";

const DelegatesDetails = () => {
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [emailSendding, setEmailSending] = useState(false);
  const [delegatesData, setDelegatesData] = useState<
    DelegatesExportType[] | null
  >([]);
  const [counts, setCounts] = useState({
    total: 0,
    arrivedCount: 0,
    selectedCount: 0,
    emailSendCount: 0,
    confirmedCount: 0,
  });

  // console.log(
  //   delegatesData?.filter((delegate) => delegate.confirmArrival).length || 0
  // );

  useEffect(() => {
    const collectionRef = collection(db, "delegates");

    // const q = query(collectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const usersDataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as DelegatesExportType[];

      console.log(usersDataArr.filter(user=> user.confirmArrival));

      setDelegatesData(usersDataArr);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setCounts({
      total: delegatesData?.length || 0,
      arrivedCount:
        delegatesData?.filter((delegate) => delegate.arrived).length || 0,
      selectedCount:
        delegatesData?.filter((delegate) => delegate.selected).length || 0,
      emailSendCount:
        delegatesData?.filter((delegate) => delegate.confirmationEmailSended)
          .length || 0,
      confirmedCount:
        delegatesData?.filter((delegate) => delegate.confirmArrival).length ||
        0,
    });
  }, [delegatesData]);

  // console.log(counts);

  const toggleArrived = async (selectedDelegate: DelegatesType | null) => {
    // console.log("Arrived:", selectedDelegate);
    if (!selectedDelegate) return;

    try {
      const documentRef = doc(db, "delegates", selectedDelegate?.id);

      await updateDoc(documentRef, {
        arrived: !selectedDelegate.arrived,
      });
    } catch (error) {
      console.error("Error toggling arrived status:", error);
    }
  };

  const toggleSelect = async (selectedDelegate: DelegatesType | null) => {
    // console.log("Arrived:", selectedDelegate);
    if (!selectedDelegate) return;

    try {
      const documentRef = doc(db, "delegates", selectedDelegate?.id);

      await updateDoc(documentRef, {
        selected: !selectedDelegate.selected,
      });
    } catch (error) {
      console.error("Error toggling arrived status:", error);
    }
  };

  const sendConfirmationEmail = async (
    selectedDelegate: DelegatesType | null
  ) => {
    // Check if selectedDelegate is null or undefined
    if (!selectedDelegate) {
      alert("No delegate selected");
      return;
    }

    // Check if delegate is not selected
    // if (!selectedDelegate.selected) {
    //   alert(`Delegate ${selectedDelegate.email} is not selected`);
    //   return;
    // }

    // Check if confirmation email was already sent
    if (selectedDelegate.certificateSended) {
      alert(
        `Certificate email already sent to ${selectedDelegate.email || ""}`
      );
      return;
    }

    try {
      console.log("Arrived:", selectedDelegate);

      // Set email sending state to true
      setEmailSending(true);

      // Send the email (assuming sendEmail is a function you've defined)
      await sendEmail(
        selectedDelegate.email,
        "Certificate of Participation - Road To Legacy 2.0",
        createOCCertificateHTML(
          selectedDelegate.certificateName,
          selectedDelegate.role || "",
          `https://roadtolegacy.team/certificate?id=${encodeURIComponent(selectedDelegate.id)}&oc=true`
        )
      );

      // Update Firestore after sending the email
      const delegateDocRef = doc(db, "ocmembers", selectedDelegate.id);
      await updateDoc(delegateDocRef, {
        certificateSended: true,
      });

      console.log(`Confirmation email sent to ${selectedDelegate.email}`);

      // Set email sending state to false
      setEmailSending(false);
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailSending(false);
    }
  };

  const sendNext10 = async () => {
    if (!delegatesData) {
      alert("No delegates data available");
      return;
    }

    // Filter delegates who are selected and haven't received certificates yet
    const pendingDelegates = delegatesData.filter(
      (delegate) => !delegate.certificateSended
    );

    console.log("Pending Delegates:", pendingDelegates);

    if (pendingDelegates.length === 0) {
      alert("No pending emails to send or no delegates selected");
      return;
    }

    const BATCH_SIZE = 10;
    const startIndex = currentBatchIndex * BATCH_SIZE;
    const endIndex = startIndex + BATCH_SIZE;

    // Get the next 10 delegates
    const nextBatch = pendingDelegates.slice(startIndex, endIndex);

    if (nextBatch.length === 0) {
      alert("All emails have been sent! Resetting to start from beginning.");
      setCurrentBatchIndex(0);
      return;
    }

    const confirmation = window.confirm(
      `Send emails to next ${nextBatch.length} delegates? (Batch ${currentBatchIndex + 1})\nRemaining: ${pendingDelegates.length - startIndex} delegates`
    );

    if (!confirmation) return;

    console.log(
      `Sending batch ${currentBatchIndex + 1}: emails ${startIndex + 1} to ${Math.min(endIndex, pendingDelegates.length)}`
    );

    // Send emails to this batch using your existing sendConfirmationEmail function
    for (let i = 0; i < nextBatch.length; i++) {
      const delegate = nextBatch[i];
      const globalIndex = startIndex + i + 1;

      console.log(
        `Sending email ${globalIndex}/${pendingDelegates.length} to ${delegate.email}`
      );

      try {
        await sendConfirmationEmail(delegate);
        console.log(
          `✅ Email ${globalIndex} sent successfully to ${delegate.email}`
        );

        // Add a small delay between emails (optional)
        if (i < nextBatch.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
        }
      } catch (error) {
        console.error(
          `❌ Failed to send email ${globalIndex} to ${delegate.email}:`,
          error
        );
        // Continue with next email even if one fails
      }
    }

    // Move to next batch
    setCurrentBatchIndex(currentBatchIndex + 1);

    const remaining = pendingDelegates.length - endIndex;
    if (remaining > 0) {
      alert(
        `Batch ${currentBatchIndex + 1} completed! ${nextBatch.length} emails sent. ${remaining} emails remaining.`
      );
    } else {
      alert(
        `All emails sent! Total: ${pendingDelegates.length} emails completed. Resetting for next time.`
      );
      setCurrentBatchIndex(0); // Reset for next time
    }
  };

  const exportToExcel = (data: DelegatesExportType[]) => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const worksheetData = data.map((delegate) => ({
      "Delegate ID": delegate.id,
      "First Name": delegate.firstName,
      "Last Name": delegate.lastName,
      "Certificate Name": delegate.certificateName,
      Email: delegate.email,
      "Contact Number": delegate.contactNumber,
      "Emergency Contact": delegate.emergencyContact,
      NIC: delegate.nic,
      University: delegate.university,
      Faculty: delegate.faculty,
      Department: delegate.department,
      "University Reg. No": delegate.universityRegNo,
      "A/L Year": delegate.alYear,
      "Meal Preference": delegate.mealPreference,
      "Heard About": delegate.hearAbout,
      "Heard About (Other)": delegate.hearAboutOther,
      Suggestions: delegate.suggestions,
      Arrived: delegate.arrived ? "Yes" : "No",
      "Confirm Arrival": delegate.confirmArrival ? "Yes" : "No",
      "Confirmed Date Time": delegate.confirmedDateTime
        ? convertTimestampToDate(delegate.confirmedDateTime).toLocaleString()
        : "",
      Selected: delegate.selected ? "Yes" : "No",
      "Confirmation Email Sent": delegate.confirmationEmailSended
        ? "Yes"
        : "No",
      "Confirmation URL": delegate.confirmationUrl,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Delegates");

    XLSX.writeFile(workbook, "Delegates_List.xlsx");
  };

  return (
    <div className="mb-20">
      <Card>
        <CardContent>
          {delegatesData && (
            <DataTable
              columns={columns(
                delegatesData,
                toggleArrived,
                toggleSelect,
                sendConfirmationEmail,
                emailSendding
              )}
              data={delegatesData?.map((delegate) => ({
                firstName: delegate.firstName,
                email: delegate.email,
                arrived: delegate.arrived,
                confirmArrival: delegate.confirmArrival,
                selected: delegate.selected,
              }))}
              counts={counts}
            />
          )}
        </CardContent>
      </Card>

      <div className="w-full flex justify-center items-center">
        <button
          onClick={() => exportToExcel(delegatesData || [])}
          className="absolute bottom-5 right-5 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download as Excel
        </button>
        <button
          onClick={() => sendNext10()}
          className="absolute bottom-5 right-56 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send 10 By 10
        </button>
      </div>
    </div>
  );
};
export default DelegatesDetails;
