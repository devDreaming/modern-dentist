"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppointment } from "@/context/AppointmentContext";

const cards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: "Experienced\nDentists",
    description: "Providing top-notch dental care with expertise.",
    href: "/about",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    title: "Convenient\nAppointments",
    description: "Flexible scheduling to fit your busy life.",
    href: "#",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: "Personalized\nTreatments",
    description: "Tailored solutions for your dental needs.",
    href: "/services",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { openModal } = useAppointment();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why <span className="text-[#0D6D6E]">Choose Us?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const className = `bg-[#B8E8E8] rounded-2xl p-6 text-center shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer block ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`;
            const style = {
              transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
            };
            const content = (
              <>
                <div className="w-16 h-16 mx-auto mb-4 bg-[#0D6D6E] rounded-full flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0D6D6E] mb-2 whitespace-pre-line">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-700">{card.description}</p>
              </>
            );

            if (index === 1) {
              return (
                <button
                  key={index}
                  onClick={openModal}
                  className={className}
                  style={style}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={index}
                href={card.href}
                className={className}
                style={style}
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
