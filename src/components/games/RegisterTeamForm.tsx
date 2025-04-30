"use client";

import { ScanQrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ScanTicket from "../team-register-components/ScanTickets";

const RegisterTeamForm = () => {
  const router = useRouter();
  const [teamData, setTeamData] = useState({
    teamName: "",
    leaderEmail: "",
    members: ["", "", ""], // Default 3 member slots
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes for team name and leader
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle member email changes
  const handleMemberChange = (index: number, value: string) => {
    const updatedMembers = [...teamData.members];
    updatedMembers[index] = value;
    setTeamData((prev) => ({
      ...prev,
      members: updatedMembers,
    }));
  };

  // Add another member field
  const addMember = () => {
    if (teamData.members.length < 5) {
      setTeamData((prev) => ({
        ...prev,
        members: [...prev.members, ""],
      }));
    }
  };

  // Remove a member field
  const removeMember = (index: number) => {
    if (teamData.members.length > 1) {
      const updatedMembers = teamData.members.filter((_, i) => i !== index);
      setTeamData((prev) => ({
        ...prev,
        members: updatedMembers,
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    if (!teamData.teamName.trim()) {
      setError("Team name is required");
      return false;
    }

    if (!teamData.leaderEmail.trim()) {
      setError("Leader email is required");
      return false;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(teamData.leaderEmail)) {
      setError("Please enter a valid leader email");
      return false;
    }

    // Validate member emails
    const validMembers = teamData.members.filter(
      (email) => email.trim() !== ""
    );
    if (validMembers.length === 0) {
      setError("Please add at least one team member");
      return false;
    }

    for (const email of validMembers) {
      if (!emailRegex.test(email)) {
        setError("Please enter valid email addresses for all members");
        return false;
      }
    }

    return true;
  };


  // Handle form submission
  interface TeamData {
    teamName: string;
    leaderEmail: string;
    members: string[];
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Remove empty member fields
      const filteredMembers = teamData.members.filter(
        (email) => email.trim() !== ""
      );

      // In a real application, you would send this data to your backend
      const teamDataToSubmit: TeamData = {
        ...teamData,
        members: filteredMembers,
      };

      console.log("Submitting team data:", teamDataToSubmit);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to the game page
      router.push(`/game?team=${encodeURIComponent(teamData.teamName)}`);
    } catch (error) {
      console.error("Error registering team:", error);
      setError("Failed to register team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191B1F] p-4">
      <div className="w-full max-w-md bg-[#2c3039] rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold text-[#f2f2f7] mb-6 text-center">
          Team Registration
        </h1>

        {error && (
          <div className="bg-[#191b1f] border-l-4 border-red-500 text-red-300 p-4 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Team Name */}
          <div className="mb-4">
            <label
              htmlFor="teamName"
              className="block text-[#f2f2f7] text-sm font-medium mb-2"
            >
              Team Name *
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={teamData.teamName}
              onChange={handleInputChange}
              className="w-full bg-[#333842] text-[#f2f2f7] border-none rounded p-3 focus:ring-2 focus:ring-[#191b1f] focus:outline-none"
              placeholder="Enter your team name"
              required
            />
          </div>

          {/* Leader Email */}
          <div className="mb-6">
            <label
              htmlFor="leaderEmail"
              className="block text-[#f2f2f7] text-sm font-medium mb-2"
            >
              Team Leader Email *
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                id="leaderEmail"
                name="leaderEmail"
                value={teamData.leaderEmail}
                onChange={handleInputChange}
                className="w-full bg-[#333842] text-[#f2f2f7] border-none rounded p-3 focus:ring-2 focus:ring-[#191b1f] focus:outline-none"
                placeholder="leader@example.com"
                required
              />

              <ScanTicket
                type="leader"
                setTeamData={setTeamData}
                teamData={teamData}
              >
                <ScanQrCode
                  className={`w-8 h-8 sm:w-12 sm:h-12 sm:p-2 p-1  rounded-2xl cursor-pointer duration-300 flex items-center justify-center text-[#c7c7c7] sm:hover:bg-blue-600`}
                />
              </ScanTicket>
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-6">
            <label className="block text-[#f2f2f7] text-sm font-medium mb-2">
              Team Members *
            </label>

            <div className="w-full flex items-center justify-center">
              <ScanTicket
                type="member"
                setTeamData={setTeamData}
                teamData={teamData}
              >
                <ScanQrCode
                  className={` m-5 w-10 h-10 sm:w-16 sm:h-16 sm:p-2 p-1  rounded-2xl cursor-pointer duration-300 flex items-center justify-center text-[#c7c7c7] sm:hover:bg-blue-600`}
                />
              </ScanTicket>
            </div>

            {teamData.members.map((member, index) => (
              <div key={index} className="flex mb-2 gap-2">
                <input
                  type="email"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  className="flex-1 bg-[#333842] text-[#f2f2f7] border-none rounded p-3 focus:ring-2 focus:ring-[#191b1f] focus:outline-none"
                  placeholder={`member${index + 1}@example.com`}
                />
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="bg-[#191b1f] text-[#f2f2f7] px-3 rounded hover:bg-red-700 transition"
                >
                  ✕
                </button>
              </div>
            ))}

            {teamData.members.length < 5 && (
              <button
                type="button"
                onClick={addMember}
                className="mt-2 text-sm bg-[#333842] text-[#f2f2f7] px-3 py-1 rounded hover:bg-[#191b1f] transition flex items-center"
              >
                <span className="mr-1">+</span> Add Another Member
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#191b1f] text-[#f2f2f7] py-3 rounded-md font-medium hover:bg-opacity-90 transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Registering..." : "Register Team"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeamForm;
