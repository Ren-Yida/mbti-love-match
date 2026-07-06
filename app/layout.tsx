import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "MBTI 恋爱匹配测评",
  description: "面向内容转化的 MBTI 恋爱测评 MVP"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
