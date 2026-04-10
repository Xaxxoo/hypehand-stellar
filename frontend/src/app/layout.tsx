import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HypeHand - Stellar Gifting Platform",
  description:
    "Crypto gifting app built on the Stellar blockchain. Send token gifts, track progress, and engage with creators.",
};

function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-white">
          ✨ HypeHand
        </Link>
        <div className="flex gap-6">
          <Link
            href="/"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/gift"
            className="text-sm text-gray-300 transition hover:text-white"
          >
            Send Gift
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-gray-950 text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
