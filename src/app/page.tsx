import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesGrid from "@/components/ServicesGrid";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import CTA from "@/components/CTA";
import HomeHero from "@/components/HomeHero";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeHero />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Services Section */}
      <ServicesGrid />

      {/* Testimonials Section */}
      <TestimonialsGrid />

      {/* CTA Section */}
      <CTA />
    </div>
  );
}
