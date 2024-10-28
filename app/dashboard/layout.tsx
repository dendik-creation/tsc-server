import type { Metadata } from "next";
import "../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/partials/Header";
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
    <html lang="en">
      <body className={`antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <main className="m-4 w-full">
            <Header classNames="mb-8" />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}