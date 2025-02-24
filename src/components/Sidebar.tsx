import { ScanQrCode, User } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-20 py-10 gap-8 flex flex-col items-center justify-center bg-blue-400 rounded-tr-3xl rounded-br-3xl rounded-3xl ml-3 border-4 border-white">
      <Link href="/admin/" className="relative z-10">
        <User className="w-10 h-10 text-white" />
      </Link>

      <Link href="/admin/verify-and-attend" className="relative z-10">
        <ScanQrCode className="w-10 h-10 text-white" />
      </Link>

      {/* <li>
            <Button className="">Logout</Button>
          </li> */}
    </div>
  );
};

export default Sidebar;
