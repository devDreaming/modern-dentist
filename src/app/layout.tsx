import type { Metadata } from "next";
import { Love_Light, Montagu_Slab, Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { AppointmentProvider } from "@/context/AppointmentContext";

const loveLight = Love_Light({
  variable: "--font-love-light",
  subsets: ["latin"],
  weight: "400",
});

const montaguSlab = Montagu_Slab({
  variable: "--font-montagu-slab",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Modern Dentist",
  description: "Modern dental care for the whole family",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${loveLight.variable} ${montaguSlab.variable} ${montserrat.variable} antialiased min-h-screen flex flex-col`}
      >
        <AppointmentProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-white focus:text-[#0D6D6E] focus:font-medium focus:rounded-lg focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Nav />
          <main id="main-content" className="grow overflow-visible">{children}</main>
          <Footer />
        </AppointmentProvider>
      </body>
    </html>
  );
}
