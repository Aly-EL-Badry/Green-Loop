import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Green-Loop | حلقة الاستدامة الخضراء - احسب أثرك البيئي",
  description:
    "موقع تفاعلي لحساب البصمة الكربونية وتوعية الأفراد بأثر عاداتهم اليومية على المناخ. أدخل بياناتك اليومية واكتشف أثرك البيئي.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${alexandria.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col antialiased bg-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
