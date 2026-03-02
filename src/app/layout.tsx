import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kyma Cyprus | Mediterranean Gastronomy",
  description: "Experience the essence of the Mediterranean at Kyma Cyprus. Fresh flavors, coastal vibes, and authentic hospitality in the heart of Limassol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased font-gilda bg-[#111] text-white overflow-x-hidden">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
