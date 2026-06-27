import type { Metadata } from "next";
import { Spectral, Jost, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nayanam — Wedding & Portrait Photography",
  description:
    "Nayanam — wedding and portrait photography. Quietly documenting the moments worth keeping.",
  openGraph: {
    title: "Nayanam — Wedding & Portrait Photography",
    description: "Quietly documenting the moments worth keeping.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${jost.variable} ${spaceMono.variable}`}
    >
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
