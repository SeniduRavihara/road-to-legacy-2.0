"use client";

import { loginTeam, registerTeam } from "@/firebase/api";
import { ScanQrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ScanTicket from "../team-register-components/ScanTickets";

const RegisterTeamForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [teamData, setTeamData] = useState({
    teamName: "",
    leaderEmail: "",
    members: ["", "", ""], // Default 3 member slots
  });
  const [loginData, setLoginData] = useState({
    teamName: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (error) {
      window.scrollTo({ top: 0, behavior: "smooth" });

      const timer = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // Handle input changes for team name and leader
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login input changes
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
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
    if (validMembers.length < 1) {
      setError("Please add at least 3 team member");
      return false;
    } else if (validMembers.length > 5) {
      setError("Please add at most 5 team member");
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

  // Validate login form
  const validateLoginForm = () => {
    if (!loginData.teamName.trim()) {
      setError("Team name is required");
      return false;
    }

    if (!loginData.email.trim()) {
      setError("Email is required");
      return false;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      setError("Please enter a valid email");
      return false;
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
      const { success, message } = await registerTeam(teamData);

      if (!success) {
        setError(message || "Failed to register team. Please try again.");
        return;
      }

      // Redirect to the game page
      router.push(
        `/game?team=${encodeURIComponent(teamData.teamName)}&editable=true`
      );
    } catch (error) {
      console.error("Error registering team:", error);
      setError("Failed to register team. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle login submission
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateLoginForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Logging in with:", loginData);

      const result = await loginTeam(loginData);

      if (!result.success) {
        setError(result.message || "Login failed.");
        return;
      }

      // Optional: Use result.leader if you want to conditionally allow actions
      router.push(
        `/game?team=${encodeURIComponent(loginData.teamName)}&editable=${result.leader}`
      );
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to login. Please check your team name and email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191B1F] p-4">
      <div className="w-full max-w-md bg-[#2c3039] rounded-lg shadow-xl p-6">
        {/* Toggle between Register and Login */}
        <div className="flex justify-center mb-6 bg-[#191b1f] rounded-md p-1">
          <button
            className={`flex-1 py-2 px-4 rounded-md transition ${
              !isLogin
                ? "bg-[#333842] text-[#f2f2f7]"
                : "bg-transparent text-[#a0a0a5]"
            }`}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
          >
            Register New Team
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md transition ${
              isLogin
                ? "bg-[#333842] text-[#f2f2f7]"
                : "bg-transparent text-[#a0a0a5]"
            }`}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
          >
            Already Registered
          </button>
        </div>

        <h1 className="text-2xl font-bold text-[#f2f2f7] mb-6 text-center">
          {isLogin ? "Team Login" : "Team Registration"}
        </h1>

        {error && (
          <div className="bg-[#191b1f] border-l-4 border-red-500 text-red-300 p-4 mb-4 rounded">
            {error}
          </div>
        )}

        {isLogin ? (
          // Login Form
          <form onSubmit={handleLoginSubmit}>
            {/* Team Name */}
            <div className="mb-4">
              <label
                htmlFor="loginTeamName"
                className="block text-[#f2f2f7] text-sm font-medium mb-2"
              >
                Team Name *
              </label>
              <input
                type="text"
                id="loginTeamName"
                name="teamName"
                value={loginData.teamName}
                onChange={handleLoginInputChange}
                className="w-full bg-[#333842] text-[#f2f2f7] border-none rounded p-3 focus:ring-2 focus:ring-[#191b1f] focus:outline-none"
                placeholder="Enter your team name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="loginEmail"
                className="block text-[#f2f2f7] text-sm font-medium mb-2"
              >
                Your Email *
              </label>
              <div className="flex gap-3">
                <input
                  type="email"
                  id="loginEmail"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  className="w-full bg-[#333842] text-[#f2f2f7] border-none rounded p-3 focus:ring-2 focus:ring-[#191b1f] focus:outline-none"
                  placeholder="your@example.com"
                  required
                />
                {/* <ScanTicket
                  type="login"
                  setTeamData={setLoginData as any}
                  teamData={loginData as any}
                >
                  <ScanQrCode
                    className={`w-8 h-8 sm:w-12 sm:h-12 sm:p-2 p-1 rounded-2xl cursor-pointer duration-300 flex items-center justify-center text-[#c7c7c7] sm:hover:bg-blue-600`}
                  />
                </ScanTicket> */}
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#191b1f] text-[#f2f2f7] py-3 rounded-md font-medium hover:bg-opacity-90 transition ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          // Registration Form
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
                    className={`w-8 h-8 sm:w-12 sm:h-12 sm:p-2 p-1 rounded-2xl cursor-pointer duration-300 flex items-center justify-center text-[#c7c7c7] sm:hover:bg-blue-600`}
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
                    className={`m-5 w-10 h-10 sm:w-16 sm:h-16 sm:p-2 p-1 rounded-2xl cursor-pointer duration-300 flex items-center justify-center text-[#c7c7c7] sm:hover:bg-blue-600`}
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
        )}
      </div>
    </div>
  );
};

export default RegisterTeamForm;
