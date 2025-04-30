"use client";

import { INITIAL_DATA_CONTEXT } from "@/constants";
import { db } from "@/firebase/config";
import { AdminDataType, DataContextType, OptionsType } from "@/types";
import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext<DataContextType>(INITIAL_DATA_CONTEXT);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUserData, setCurrentUserData] = useState<AdminDataType | null>(
    null
  );
  const [options, setOptions] = useState<OptionsType | null>(null);

  function convertTimestampToDate(timestamp: Timestamp | Date): Date {
    return timestamp instanceof Timestamp
      ? new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
      : timestamp;
  }

  useEffect(() => {
    const documentRef = doc(db, "site-data", "options");

    const unsubscribe = onSnapshot(documentRef, (documentSnapshot) => {
      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data() as OptionsType;

        const optionData: OptionsType = {
          ...data,
          gameStartTime: convertTimestampToDate(data.gameStartTime),
        };

        setOptions(optionData);
        console.log("Options Data fetched successfully", optionData);
      } else {
        setCurrentUserData(null);
        console.log("Document does not exist.");
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUserData,
    setCurrentUserData,
    options,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
export default DataContextProvider;
