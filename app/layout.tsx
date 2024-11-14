import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import { UserSessionProvider } from "@/context/UserSessionProvider";

export const metadata: Metadata = {
  title: "Tree Smart Coach",
  description: "Tree Smart Coach DESC",
  icons: {
    icon: "/icon/base_icon.png",
  },
};
const outputSans = localFont({
  src: "./fonts/OutputSans_Regular.ttf",
  variable: "--font-output-sans",
  weight: "100 200 300 400 500 600 700 800 900",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/icon/base_icon.png"
          type="image/x-icon"
        />
      </head>
      <body className={`antialiased ${outputSans.className}`}>
        <main>
          <UserSessionProvider>
            {children}
            <Toaster />
          </UserSessionProvider>
        </main>
      </body>
    </html>
  );
}
