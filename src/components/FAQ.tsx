"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How often should I visit the dentist?",
    answer: "We recommend visiting the dentist every 6 months for a routine checkup and cleaning. However, some patients may need more frequent visits depending on their oral health needs.",
  },
  {
    question: "Does teeth whitening damage enamel?",
    answer: "Professional teeth whitening, when done correctly, does not damage enamel. Our whitening treatments are safe and effective, using carefully formulated products that brighten your smile without harming your teeth.",
  },
  {
    question: "What should I do in a dental emergency?",
    answer: "Contact our office immediately. For knocked-out teeth, keep the tooth moist and try to reinsert it. For severe pain or swelling, rinse with warm salt water and apply a cold compress. We offer emergency appointments for urgent cases.",
  },
  {
    question: "Do you offer treatments for sensitive teeth?",
    answer: "Yes, we offer several treatments for sensitive teeth including fluoride treatments, desensitizing agents, and dental sealants. We'll evaluate your condition and recommend the best solution for you.",
  },
  {
    question: "What payment options do you accept?",
    answer: "We accept most major insurance plans, credit cards, and offer flexible payment plans. Our team can help you understand your coverage and find the best payment option for your needs.",
  },
  {
    question: "At what age should children have their first dental visit?",
    answer: "Children should have their first dental visit by age 1 or within 6 months of their first tooth appearing. Early visits help establish good oral health habits and allow us to monitor development.",
  },
  {
    question: "Do you offer sedation for anxious patients?",
    answer: "Yes, we understand dental anxiety is common. We offer various sedation options including nitrous oxide (laughing gas) and oral sedation to help you feel relaxed and comfortable during your visit.",
  },
  {
    question: "How can I prevent cavities?",
    answer: "Prevent cavities by brushing twice daily with fluoride toothpaste, flossing daily, limiting sugary foods and drinks, and visiting us regularly for checkups and cleanings. We can also apply dental sealants for extra protection.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 overflow-hidden px-6">
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked <span className="text-[#0D6D6E]">Questions</span> (FAQ)
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
              >
                <span className="font-bold text-black">
                  {index + 1}. {faq.question}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 pl-6">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
