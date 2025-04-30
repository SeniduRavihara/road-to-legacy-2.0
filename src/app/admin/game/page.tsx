"use client"

import LeaderBoard from "@/components/games/LeaderBoard";
import { db } from "@/firebase/config";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const GamePage = () => {

  // const [results, setResults] = useState<>([]);

  useEffect(() => {
    // const documentRef = collection(db, "teams");

    // const unsubscribe = onSnapshot(documentRef, (documentSnapshot) => {
    //   if (documentSnapshot.exists()) {
    //     const data = documentSnapshot.data()

    //     const optionData: OptionsType = {
    //       ...data,
    //       gameStartTime: convertTimestampToDate(data.gameStartTime),
    //     };

    //     setOptions(optionData);
    //     console.log("Options Data fetched successfully", optionData);
    //   } else {
    //     setCurrentUserData(null);
    //     console.log("Document does not exist.");
    //   }
    // });
    // return unsubscribe;
  }, []);

  return (
    <div>
      <LeaderBoard />
    </div>
  );
};
export default GamePage;
