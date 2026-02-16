"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "Absolutely amazing service! The staff is super friendly, and the atmosphere is very welcoming. I felt completely at ease throughout my visit. Highly recommended!",
    name: "James Anderson",
    location: "Jakarta",
    avatarGradient: "from-gray-400 to-gray-500",
  },
  {
    quote: "Best dental experience ever! Everything was explained clearly, and my concerns were addressed. I couldn't be happier with the results!",
    name: "Michael Brown",
    location: "Jakarta",
    avatarGradient: "from-gray-400 to-gray-500",
  },
  {
    quote: "A fantastic clinic! The process was smooth, pain-free, and very efficient. I'm excited for my next visit already!",
    name: "David Wilson",
    location: "Jakarta",
    avatarGradient: "from-orange-400 to-orange-600",
  },
  {
    quote: "The team here truly cares about their patients. Professional, gentle, and always on time. I wouldn't go anywhere else!",
    name: "Sarah Johnson",
    location: "Jakarta",
    avatarGradient: "from-pink-400 to-pink-600",
  },
  {
    quote: "From the moment I walked in, I felt welcomed. The treatment was painless and the results exceeded my expectations!",
    name: "Robert Chen",
    location: "Jakarta",
    avatarGradient: "from-blue-400 to-blue-600",
  },
];

interface TestimonialsGridProps {
  onPrev?: () => void;
  onNext?: () => void;
}

export default function TestimonialsGrid({ onPrev, onNext }: TestimonialsGridProps) {
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
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    onPrev?.();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    onNext?.();
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

    if (isLeftSwipe && currentIndex < maxIndex) {
      handleNext();
    }
    if (isRightSwipe && currentIndex > 0) {
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
    <div>
      {/* Carousel with arrows */}
      <div className="flex items-center gap-4">
        {/* Left Arrow - hidden on mobile */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`w-10 h-10 rounded-full border-2 border-black hidden md:flex items-center justify-center bg-white hover:bg-gray-100 shrink-0 ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span>←</span>
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
                <p className="font-bold italic text-sm mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden mb-3">
                  <div className={`w-full h-full bg-gradient-to-br ${testimonial.avatarGradient}`} />
                </div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow - hidden on mobile */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className={`w-10 h-10 rounded-full border-2 border-black hidden md:flex items-center justify-center bg-white hover:bg-gray-100 shrink-0 ${
            currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span>→</span>
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
  );
}
