"use client";

import GameGuidelines from "@/components/games/GameGuidelines";
import RegisterTeamForm from "@/components/games/RegisterTeamForm";
import { useState } from "react";

const RegisterTeam = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  if (!showRegistration) {
    return <GameGuidelines onProceed={() => setShowRegistration(true)} />;
  }

  return (
    <div>
      <RegisterTeamForm />
    </div>
  );
};

export default RegisterTeam;
