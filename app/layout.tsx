import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

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
      <body
        className={`${inter.variable} ${notoSerif.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
