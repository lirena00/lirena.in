import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Saksham Kushwaha | lirena00 | Portfolio",
  description:
    "Saksham Kushwaha (lirena00), a 19-year-old CS undergrad and full-stack developer, blends web dev with anime-inspired creativity. I have built tools like Monochromate and Animood, contribute to open-source, and write sharp one-shot stories drawn from my weeb roots.",
  icons: [{ rel: "icon", url: "/favicon.jpg" }],
  openGraph: {
    title: "Saksham Kushwaha | lirena00",
    images: [{ url: "/og.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Script
          strategy="afterInteractive"
          src="https://analytics.lirena.in/script.js"
          data-website-id="7d9f0467-9f61-4fb1-ac4f-6d712106dec5"
        />
        {children}
      </body>
    </html>
  );
}
