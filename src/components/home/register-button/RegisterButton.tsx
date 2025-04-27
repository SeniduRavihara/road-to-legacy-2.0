import Link from "next/link";
import "./RegisterButton.css";

const RegisterButton = () => {
  return (
    <Link
      href="/register"
      className="register-button bg-blue-600 z-10 m-5 cursor-pointer flex items-center justify-center gap-3 hover:bg-blue-700 text-white font-bold text-sm md:text-base py-2 md:py-3 px-3 md:px-6 rounded-lg shadow-md transition-all duration-300"
    >
      <span className="register-text">Register Now</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="register-icon"
      >
        <path d="m6 17 5-5-5-5" />
        <path d="m13 17 5-5-5-5" />
      </svg>
    </Link>
  );
};

export default RegisterButton;
