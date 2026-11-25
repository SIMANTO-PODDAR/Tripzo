import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tripzo",
  description: "Tripzo is a modern travel experience sharing platform that enables travelers to share authentic stories enhanced by AI-powered content generation and image analysis. Tripzo connects travelers worldwide, allowing them to create, share, and discover authentic travel stories. With AI-powered tools for story generation and image analysis, users can craft compelling narratives and gain deeper insights into their travel experiences. Travelers share real experiences and connect with a global community. Explorers discover destinations through authentic stories and AI-enhanced content. Tripzo provides a seamless platform for storytelling and discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" data-theme='light'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>

          <Navbar />

          <div className="container mx-auto">
            {children}
          </div>

          <Footer />

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
