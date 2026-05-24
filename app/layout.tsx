import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ManiKanta — Visual Storyteller & Photographer",
  description:
    "Cinematic photography portfolio of ManiKanta. Visual storytelling through light, shadow, and emotion.",
  openGraph: {
    title: "ManiKanta — Visual Storyteller & Photographer",
    description: "Cinematic photography portfolio.",
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
