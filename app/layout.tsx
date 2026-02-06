import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata updated for OSA HR Solutions Technical Assignment.
 * This improves the professional look in browser tabs and SEO.
 */
export const metadata: Metadata = {
  title: "OSA HR Solutions | Technical Evaluation",
  description: "Secure Login and Signup portal for Technical Round Evaluation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black transition-colors duration-300`}
      >
        {/* Main wrapper to ensure font-mono can be applied globally if desired */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
