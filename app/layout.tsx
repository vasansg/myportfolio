import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vasanthavanan A/L Kumar | Portfolio",
  description:
    "JPA Scholar & Software Engineering student at UTHM — Laravel, MySQL, Flutter, and IoT. Seeking a Computer Science internship.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${syne.variable} antialiased`}>{children}</body>
    </html>
  );
}
