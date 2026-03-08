import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import DragScroll from "@/components/DragScroll"; // 1. Import the new component
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Gaurav Raj Singh | Portfolio",
  description: "Creative Developer & Designer building cool things with discipline.",
  icons: {
    icon: "logo-circular.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <Preloader />
          <CustomCursor />
          <DragScroll /> {/* 2. Add it right next to your cursor */}
          <ScrollProgress />
          <SmoothScroll>
            <div className="min-h-screen px-5 md:px-[5%] py-6 max-w-[1200px] mx-auto overflow-x-hidden flex flex-col">
              <Navbar />
              <div className="flex-grow">
                {children}
              </div>
              <Footer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}