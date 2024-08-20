import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./Navbar";
import "./theme-config.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body>
        <Theme accentColor="violet">
          <NavBar />
          <main className="px-5">
            <Container>{children}</Container>
          </main>
        </Theme>
      </body>
    </html>
  );
}
