"use client";

import Link from "next/link";

const services = [
  {
    title: "Teeth\nWhitening",
    description: "Enhance your smile with advanced whitening treatments for long-lasting results.",
  },
  {
    title: "Routine\nCheckup",
    description: "Maintain optimal oral health with regular checkups and preventive care.",
  },
  {
    title: "Dental\nImplants",
    description: "Replace missing teeth with high-quality implants for a natural and lasting solution.",
  },
  {
    title: "Orthodontic\nBraces",
    description: "Align your teeth perfectly with modern orthodontic treatments for all ages.",
  },
  {
    title: "Dental\nCrowns",
    description: "Protect and restore damaged teeth with durable and natural-looking crowns.",
  },
  {
    title: "Tooth\nFilling",
    description: "Fix cavities and restore teeth with high-quality, long-lasting fillings.",
  },
];

export default function ServicesGrid() {
  return (
    <section
      className="relative py-16 px-6"
      style={{
        background: "linear-gradient(135deg, #B8E8E8 0%, #D4F1F1 25%, #E8F8F8 50%, #C5EBEB 75%, #A8E0E0 100%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Our <span className="text-[#0D6D6E]">Services</span>
        </h2>
        <p className="text-center font-bold mb-2">
          Comprehensive Dental Solutions for a Healthier Smile
        </p>
        <p className="text-center text-sm mb-12">
          We offer a range of professional dental services to keep your smile bright and healthy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href="/services"
              className="bg-[#0D6D6E] rounded-2xl p-6 border border-[#0D6D6E]/20 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer block text-white"
            >
              <h3 className="text-xl font-bold text-center mb-3 whitespace-pre-line">
                {service.title}
              </h3>
              <p className="text-sm text-center font-medium mb-6">
                {service.description}
              </p>
              <span className="block text-center text-sm">
                Read More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
