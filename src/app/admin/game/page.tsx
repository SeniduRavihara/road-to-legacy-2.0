"use client";

import LeaderBoard from "@/components/games/LeaderBoard";
import { db } from "@/firebase/config";
import { TeamDataType } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const GamePage = () => {
  const [teamData, setTeamData] = useState<TeamDataType[]>([]);

  useEffect(() => {
    const collectionRef = collection(db, "teams");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const teamsDataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as TeamDataType[];

      setTeamData(teamsDataArr);
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      <LeaderBoard teamData={teamData} />
    </div>
  );
};
export default GamePage;
