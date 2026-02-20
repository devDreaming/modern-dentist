"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "Absolutely amazing service! The staff is super friendly, and the atmosphere is very welcoming. I felt completely at ease throughout my visit. Highly recommended!",
    name: "James Anderson",
    location: "Jakarta",
  },
  {
    quote: "Best dental experience ever! Everything was explained clearly, and my concerns were addressed. I couldn't be happier with the results!",
    name: "Sherry Brown",
    location: "Hamilton",
  },
  {
    quote: "A fantastic clinic! The process was smooth, pain-free, and very efficient. I'm excited for my next visit already!",
    name: "David Wilson",
    location: "Lindan",
  },
  {
    quote: "The team here truly cares about their patients. Professional, gentle, and always on time. I wouldn't go anywhere else!",
    name: "Sarah Johnson",
    location: "Hamilton",
  },
  {
    quote: "From the moment I walked in, I felt welcomed. The treatment was painless and the results exceeded my expectations!",
    name: "Robert Wood",
    location: "Jakarta",
  },
];

export default function TestimonialsGrid() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  // Reset index if it exceeds maxIndex after resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // Calculate transform based on screen size
  const getTransform = () => {
    if (isMobile) {
      return `translateX(calc(-${currentIndex} * (100% + 1.5rem)))`;
    }
    return `translateX(calc(-${currentIndex} * (100% / 3 + 0.5rem)))`;
  };

  return (
    <section className="relative py-16 bg-white px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our <span className="text-[#0D6D6E]">Happy Patients</span> Say
        </h2>

        {/* Carousel with arrows */}
        <div className="flex items-center gap-4">
        {/* Left Arrow - hidden on mobile */}
        <button
          onClick={handlePrev}
          className="hidden md:flex items-center justify-center shrink-0 text-gray-600 hover:text-[#0D6D6E] transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Carousel Container */}
        <div
          className="overflow-hidden flex-1"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: getTransform(),
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#B8E8E8] rounded-2xl p-6 flex flex-col items-center text-center shrink-0 w-full md:w-[calc(33.333%-1rem)]"
              >
                <p className="italic text-sm mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow - hidden on mobile */}
        <button
          onClick={handleNext}
          className="hidden md:flex items-center justify-center shrink-0 text-gray-600 hover:text-[#0D6D6E] transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index ? "bg-[#0D6D6E]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
