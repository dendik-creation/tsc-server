import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/partials/Header";
import { UserSessionProvider } from "@/context/UserSessionProvider";
export const metadata: Metadata = {
  title: "Tree Smart Coach",
  description: "Tree Smart Coach DESC",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <UserSessionProvider>
        <AppSidebar />
        <main className="m-6 w-full">
          <Header classNames="mb-8" />
          {children}
        </main>
      </UserSessionProvider>
    </SidebarProvider>
  );
}
