"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AnimatedButton from "@/components/AnimatedButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/tips", label: "Dental Health Tips" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-2">
        <Link href="/" className="flex items-center text-white">
          <Image src="/favicon.png" alt="Realdent logo" width={48} height={48} />
          <span className="text-2xl pt-3" style={{ fontFamily: "var(--font-love-light)" }}>
            Realdent
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 text-sm uppercase tracking-wide">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`transition-colors hover:text-zinc-300 ${
                    pathname === href
                      ? "text-white font-medium"
                      : "text-zinc-400"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <AnimatedButton bookAppointment variant="dark">BOOK NOW</AnimatedButton>
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4">
          <ul className="flex flex-col text-sm uppercase tracking-wide">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 transition-colors hover:text-zinc-300 ${
                    pathname === href
                      ? "text-white font-medium"
                      : "text-zinc-400"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <AnimatedButton bookAppointment variant="dark" onClick={() => setIsOpen(false)}>BOOK NOW</AnimatedButton>
          </div>
        </div>
      )}
    </nav>
  );
}
