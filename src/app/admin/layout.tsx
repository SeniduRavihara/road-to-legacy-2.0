import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-row items-center justify-between">
      <Sidebar />

      <div className=" w-full h-full">{children}</div>
    </div>
  );
}
