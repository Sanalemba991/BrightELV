import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ConditionalLayout from "../app/component/ConditionalLayout";
import { defaultMetadata, organizationSchema } from "../../utlis/seo";
import favicon from "../app/favicon.ico";
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
  ...defaultMetadata,
  verification: {
    google: "",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href={favicon.src} />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />


      </head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ConditionalLayout>
        {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
