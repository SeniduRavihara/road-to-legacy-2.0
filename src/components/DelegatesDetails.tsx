"use client";

import { db } from "@/firebase/config";
import { DelegatesType } from "@/types";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { columns } from "./delegates-data/Coloumns";
import { DataTable } from "./delegates-data/DataTable";
import { Card, CardContent } from "./ui/card";

const mockDelegatesData: DelegatesType[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    arrived: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    arrived: false,
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    arrived: false,
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    arrived: false,
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    arrived: false,
  },
  {
    id: "6",
    name: "Diana White",
    email: "diana.white@example.com",
    arrived: false,
  },
  {
    id: "7",
    name: "Ethan Martinez",
    email: "ethan.martinez@example.com",
    arrived: false,
  },
  {
    id: "8",
    name: "Fiona Garcia",
    email: "fiona.garcia@example.com",
    arrived: false,
  },
  {
    id: "9",
    name: "George Anderson",
    email: "george.anderson@example.com",
    arrived: false,
  },
  {
    id: "10",
    name: "Hannah Thomas",
    email: "hannah.thomas@example.com",
    arrived: false,
  },
  {
    id: "11",
    name: "Isaac Rodriguez",
    email: "isaac.rodriguez@example.com",
    arrived: false,
  },
  {
    id: "12",
    name: "Julia Harris",
    email: "julia.harris@example.com",
    arrived: false,
  },
  {
    id: "13",
    name: "Kevin Lewis",
    email: "kevin.lewis@example.com",
    arrived: false,
  },
  {
    id: "14",
    name: "Laura Clark",
    email: "laura.clark@example.com",
    arrived: false,
  },
];

const DelegatesDetails = () => {
  const [delegatesData, setDelegatesData] = useState<DelegatesType[] | null>(
    mockDelegatesData
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

  useEffect(() => {
    const collectionRef = collection(db, "delegates");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const usersDataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as DelegatesType[];

      setDelegatesData(usersDataArr);
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <Card>
        <CardContent>
          {delegatesData && (
            <DataTable
              columns={columns(delegatesData, toggleArrived)}
              data={delegatesData?.map((delegate) => ({
                name: delegate.name,
                email: delegate.email,
              }))}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default DelegatesDetails;
