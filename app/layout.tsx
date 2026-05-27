import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stories by Nayanam — Visual Storyteller & Photographer",
  description:
    "Cinematic photography portfolio of nayanam. Visual storytelling through light, shadow, and emotion.",
  openGraph: {
    title: "Stories by Nayanam — Visual Storyteller & Photographer",
    description: "Cinematic photography portfolio by nayanam.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
