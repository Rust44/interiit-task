import Sidebar from "@/components/home/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default async function GodownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <ResizablePanelGroup
          className="w-full"
          direction="horizontal"
        >
          <ResizablePanel defaultSize={15} maxSize={50}>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <div className="flex-1">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
