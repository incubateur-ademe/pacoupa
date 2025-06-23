"use client";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], // You can customize this
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={[inter.className, "h-full"].join(" ")}>{children}</div>;
}
