import Sidebar from "@/components/home/Sidebar";

export default async function GodownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
