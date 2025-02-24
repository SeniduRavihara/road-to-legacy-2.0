"use client"; // ✅ Ensure this is at the top

import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { getUserRole, googleSignIn } from "@/firebase/api";
import { useRouter } from "next/navigation"; // ✅ Correct for App Router

const Social = () => {
  const router = useRouter(); // ✅ Ensure this is inside a Client Component

  const handleGooglesignin = async () => {
    try {
      const user = await googleSignIn();
      if (!user) return;

      const roles = await getUserRole(user.uid);
      if (roles === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/"); // Redirect non-admin users
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <Button
      size="lg"
      className="rounded-full px-5 py-4 bg-blue-500 text-white hover:bg-blue-400 text-lg flex items-center gap-2"
      variant="outline"
      onClick={handleGooglesignin}
    >
      <FaGoogle className="text-2xl" />
      <span>Login with Google</span>
    </Button>
  );
};

export default Social;
