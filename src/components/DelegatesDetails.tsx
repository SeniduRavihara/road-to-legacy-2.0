"use client";

import { db } from "@/firebase/config";
import { DelegatesType } from "@/types";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
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
              columns={columns(delegatesData, toggleArrived)}
              data={delegatesData?.map((delegate) => ({
                name: delegate.name,
                email: delegate.email,
                arrived: delegate.arrived,
              }))}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default DelegatesDetails;
