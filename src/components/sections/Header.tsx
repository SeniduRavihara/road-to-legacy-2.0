import Link from "next/link";

const Header = () => {
  return (
    <header className=" text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Road To Legacy 2.0</h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/" passHref className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard" passHref className="hover:underline">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
