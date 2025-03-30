"use client"; // ✅ Ensure this is at the top

import { Button } from "@/components/ui/button";
import { getIsAdmin, googleSignIn } from "@/firebase/api";
import { useRouter } from "next/navigation"; // ✅ Correct for App Router
import { FaGoogle } from "react-icons/fa";

const Social = () => {
  const router = useRouter(); // ✅ Ensure this is inside a Client Component

  const handleGooglesignin = async () => {
    try {
      const user = await googleSignIn();
      if (!user) return;

      console.log("SENU");

      const isAdmin = await getIsAdmin(user.uid);

      if (isAdmin) {
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
      className="rounded-xl px-5 py-6 bg-blue-500 text-white hover:bg-blue-400 text-lg flex items-center gap-2 cursor-pointer"
      variant="outline"
      onClick={handleGooglesignin}
    >
      <FaGoogle className="text-2xl" />
      <span>Login with Google</span>
    </Button>
  );
};

export default Social;
