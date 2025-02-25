import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <p className="text-lg">© 2025 Road To Legacy 2.0. All Rights Reserved.</p>
      <p className="text-sm mt-2">Powered by [Your University Name]</p>
      <Link href="/admin" passHref className="hover:underline">
        Admin
      </Link>
    </footer>
  );
};

export default Footer;
