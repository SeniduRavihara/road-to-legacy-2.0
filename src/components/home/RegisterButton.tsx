import { ChevronsRight } from "lucide-react";
import Link from "next/link";

const RegisterButton = () => {
  return (
    <Link href="/register" className="bg-blue-600 z-10 m-5 cursor-pointer flex items-center justify-center gap-3 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300">
      <span>Register Now</span>
      <ChevronsRight />
    </Link>
  );
};
export default RegisterButton;
