import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Tree Smart Coach",
  description: "Tree Smart Coach DESC",
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
      <body className={`antialiased ${outputSans.className}`}>
        <main>
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
