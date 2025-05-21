"use client";

import { sendEmail } from "@/firebase/api";
import { db } from "@/firebase/config";
import { createEmailHTML } from "@/lib/utils";
import { DelegatesExportType, DelegatesType } from "@/types";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { columns } from "./delegates-data/Coloumns";
import { DataTable } from "./delegates-data/DataTable";
import { Card, CardContent } from "./ui/card";

const DelegatesDetails = () => {
  const [emailSendding, setEmailSending] = useState(false);
  const [delegatesData, setDelegatesData] = useState<
    DelegatesExportType[] | null
  >([]);
  const [counts, setCounts] = useState({
    total: 0,
    arrivedCount: 0,
    selectedCount: 0,
    emailSendCount: 0,
  });

  useEffect(() => {
    const collectionRef = collection(db, "delegates");

    const q = query(collectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersDataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as DelegatesExportType[];

      console.log(usersDataArr);

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
    });
  }, [delegatesData]);

  console.log(counts);

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
    if (!selectedDelegate.selected) {
      alert(`Delegate ${selectedDelegate.email} is not selected`);
      return;
    }

    // Check if confirmation email was already sent
    if (selectedDelegate.confirmationEmailSended) {
      alert(
        `Confirmation email already sent to ${selectedDelegate.email}  || ""}`
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
        "Event Arrival Confirmation - RTL 2.0",
        createEmailHTML(
          selectedDelegate.firstName,
          selectedDelegate.confirmationUrl
        )
      );

      // Update Firestore after sending the email
      const delegateDocRef = doc(db, "delegates", selectedDelegate.id); // Use the correct reference to the document
      await updateDoc(delegateDocRef, {
        confirmationEmailSended: true, // Update the confirmationEmailSended field to true
      });

      console.log(`Confirmation email sent to ${selectedDelegate.email}`);

      // Set email sending state to false
      setEmailSending(false);
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailSending(false);
    }
  };

  const exportToExcel = (data: DelegatesExportType[]) => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    const worksheetData = data.map((delegate) => ({
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
      Selected: delegate.selected ? "Yes" : "No",
      "Confirmation Email Sent": delegate.confirmationEmailSended
        ? "Yes"
        : "No",
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

      <button
        onClick={() => exportToExcel(delegatesData || [])}
        className="absolute bottom-5 right-5 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download as Excel
      </button>
    </div>
  );
};
export default DelegatesDetails;
