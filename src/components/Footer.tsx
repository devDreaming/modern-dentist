import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/tips", label: "Dental Health Tips" },
  { href: "#", label: "Book an Appointment" },
];

const services = [
  "Teeth Whitening",
  "Routine Checkup",
  "Dental Implants",
  "Orthodontic Braces",
  "Dental Crowns",
  "Tooth Filling",
];

export default function Footer() {
  return (
    <footer className="bg-[#0D6D6E] text-white">
      {/* Top Section */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex items-center gap-2">
            <Image src="/favicon.png" alt="Realdent logo" width={64} height={64} />
            <span
              className="text-3xl text-white"
              style={{ fontFamily: "var(--font-love-light)" }}
            >
              Realdent
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Contact Details</h3>
            <p className="text-sm">
              📍 Address: 64C East Crest, Melane Plaza, DanyBoyle, TT 33546
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">📞 Call Us:</h3>
            <p className="text-sm">+1 (800) 555-5555</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Social Media</h3>
            <div className="flex gap-3">
              <Link href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 overflow-hidden">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#1877F2"/>
                  <path d="M16.671 15.469l.547-3.469h-3.343v-2.25c0-.949.478-1.875 2.016-1.875h1.559V4.922s-1.415-.234-2.767-.234c-2.824 0-4.67 1.664-4.67 4.68V12H7.078v3.469h2.935V24h3.612v-8.531h2.796l.25-1.5z" fill="white"/>
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">Tagline</h3>
            <p className="text-sm mb-6">
              Taking care of your oral health with professional dental services.
            </p>

            <h3 className="text-xl font-bold mb-3">Introduction</h3>
            <p className="text-sm mb-6">
              Regular checkups help in detecting early warning signs of dental
              issues. Visit your dentist regularly to maintain a healthy smile!
            </p>

            <h3 className="text-xl font-bold mb-3">Trust Factor</h3>
            <p className="text-sm">Trusted by over 15,000 Happy Patients!</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm hover:text-[#12FFE9] transition-colors"
                  >
                    - {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm">- {service}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-sm">
              ✉️ Subscribe to Our Newsletter
            </p>
            <p className="text-sm mt-2">
              Stay updated with the latest dental care tips & exclusive offers!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
