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
          <Nav />
          <main className="px-6 grow">{children}</main>
          <Footer />
        </AppointmentProvider>
      </body>
    </html>
  );
}
