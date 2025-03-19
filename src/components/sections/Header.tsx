import { logo } from "@/assets";
import ExportedImage from "next-image-export-optimizer";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Header = () => {
  return (
    <header className=" text-white py-4 px-6 flex justify-between items-center bg-transparent">
      <div className="flex">
        <ExportedImage src={logo} alt="logo" className="w-14" />
        <h1 className="text-5xl">RTL</h1>
      </div>

      <div className="hidden sm:flex">UOM-USJ-UOC</div>

      <div className="hidden sm:flex gap-2">
        <FaFacebook className="w-8 h-8" />
        <FaLinkedin className="w-8 h-8" />
      </div>
    </header>
  );
};

export default Header;
