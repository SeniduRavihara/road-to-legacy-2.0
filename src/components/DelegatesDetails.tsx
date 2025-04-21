"use client";

import { db } from "@/firebase/config";
import { DelegatesType } from "@/types";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { columns } from "./delegates-data/Coloumns";
import { DataTable } from "./delegates-data/DataTable";
import { Card, CardContent } from "./ui/card";

const DelegatesDetails = () => {
  const [delegatesData, setDelegatesData] = useState<DelegatesType[] | null>(
    []
  );

  const toggleArrived = async (selectedDelegate: DelegatesType | null) => {
    console.log("Arrived:", selectedDelegate);
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
    console.log("Arrived:", selectedDelegate);
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

  const exportToExcel = (data: DelegatesType[]) => {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }

  const worksheetData = data.map((delegate) => ({
    "First Name": delegate.firstName,
    Email: delegate.email,
    Arrived: delegate.arrived ? "Yes" : "No",
    "Confirm Arrival": delegate.confirmArrival ? "Yes" : "No",
    Selected: delegate.selected ? "Yes" : "No",
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Delegates");

  XLSX.writeFile(workbook, "Delegates_List.xlsx");
};

  useEffect(() => {
    const collectionRef = collection(db, "delegates");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const usersDataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as DelegatesType[];

      console.log(usersDataArr);

      setDelegatesData(usersDataArr);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="mb-20">
      <Card>
        <CardContent>
          {delegatesData && (
            <DataTable
              columns={columns(delegatesData, toggleArrived, toggleSelect)}
              data={delegatesData?.map((delegate) => ({
                firstName: delegate.firstName,
                email: delegate.email,
                arrived: delegate.arrived,
                confirmArrival: delegate.confirmArrival,
                selected: delegate.selected,
              }))}
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
