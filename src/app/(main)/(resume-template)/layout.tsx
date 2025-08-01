import { SidebarProvider } from "@/components/ui/sidebar";
import { ResumeSidebar } from "@/components/resume-sidebar";
import Navbar from "../Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <ResumeSidebar />
        <div className="flex w-full flex-col flex-1">
          <Navbar />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
