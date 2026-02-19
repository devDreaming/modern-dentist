"use client";

import { useState } from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Dr. James Chen",
    role: "Lead Dentist",
    image: "/images/james.svg",
    bio: "With over 15 years of experience, Dr. Chen specializes in cosmetic dentistry and dental implants. He is passionate about creating beautiful, healthy smiles.",
    credentials: "DDS, University of California",
  },
  {
    name: "Dr. Michael Thompson",
    role: "Orthodontist",
    image: "/images/michael.png",
    bio: "Dr. Thompson is an expert in orthodontic treatments, including Invisalign and traditional braces. He believes everyone deserves a confident smile.",
    credentials: "DMD, Harvard School of Dental Medicine",
  },
  {
    name: "Dr. Eli Rodriguez",
    role: "Pediatric Dentist",
    image: "/images/eli.png",
    bio: "Dr. Rodriguez specializes in children's dentistry, making dental visits fun and stress-free for young patients and their families.",
    credentials: "DDS, NYU College of Dentistry",
  },
];

interface FlipCardProps {
  member: (typeof teamMembers)[0];
}

function FlipCard({ member }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group h-80 w-full cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full rounded-2xl bg-[#B8E8E8] p-6 flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 rounded-full bg-[#0D6D6E] mb-4 flex items-center justify-center overflow-hidden">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-20 h-20 text-white/80"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <h3 className="text-xl font-bold text-black">{member.name}</h3>
            <p className="text-[#0D6D6E] font-medium">{member.role}</p>
            <p className="mt-4 text-sm text-gray-600">Click to learn more</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full rounded-2xl bg-[#0D6D6E] p-6 flex flex-col items-center justify-center text-center text-white">
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-[#12FFE9] font-medium mb-4">{member.role}</p>
            <p className="text-sm leading-relaxed mb-4">{member.bio}</p>
            <p className="text-xs text-white/70 italic">{member.credentials}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Meet Our <span className="text-[#0D6D6E]">Experts</span>
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Our team of skilled dental professionals is dedicated to providing you with the highest quality care.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <FlipCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
