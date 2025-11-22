import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZenLog - Your Gratitude & Happiness Journal",
  description: "Capture small moments of happiness and find peace in daily reflections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
