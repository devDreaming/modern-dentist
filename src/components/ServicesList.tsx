import Image from "next/image";

const services = [
  {
    title: "Teeth Whitening",
    description:
      "Enhance your smile with our advanced whitening treatments. We use professional-grade products that deliver long-lasting results, brightening your teeth several shades in just one visit.",
    image: "/images/whitening.png",
    features: [
      "In-office whitening in under an hour",
      "Take-home whitening kits available",
      "Safe for sensitive teeth",
    ],
  },
  {
    title: "Dental Implants",
    description:
      "Replace missing teeth with high-quality implants that look, feel, and function like natural teeth. Our implants provide a permanent solution for tooth loss.",
    image: "/images/implants.png",
    features: [
      "Titanium implants for durability",
      "Natural-looking crowns",
      "Lifetime solution with proper care",
    ],
  },
  {
    title: "Orthodontic Braces",
    description:
      "Achieve a perfectly aligned smile with our orthodontic treatments. We offer traditional braces and clear aligners to suit your lifestyle and preferences.",
    image: "/images/braces.png",
    features: [
      "Traditional metal braces",
      "Clear ceramic braces",
      "Invisalign clear aligners",
    ],
  },
  {
    title: "Tooth Filling",
    description:
      "Fix cavities and restore teeth with our modern filling options. We offer tooth-colored fillings that are both durable and aesthetically pleasing.",
    image: "/images/filling.png",
    features: [
      "Composite resin fillings",
      "Mercury-free options",
      "Minimally invasive procedures",
    ],
  },
];

export default function ServicesList() {
  return (
    <section 
      className="py-16 px-6"
      style={{
        background: "linear-gradient(135deg, #B8E8E8 0%, #D4F1F1 25%, #E8F8F8 50%, #C5EBEB 75%, #A8E0E0 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 items-center`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#B8E8E8]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0D6D6E] mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-[#0D6D6E] shrink-0 mt-0.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
