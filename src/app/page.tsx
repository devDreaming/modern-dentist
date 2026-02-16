import Image from "next/image";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesGrid from "@/components/ServicesGrid";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import AnimatedButton from "@/components/AnimatedButton";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative -mx-6 -mt-12 w-[calc(100%+3rem)] h-[calc(100vh-60px)]">
        <Image
          src="/hero-img.png"
          alt="Modern dental care"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #12FFE9, rgba(93, 128, 115, 0))",
          }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-12">
            <h1 className="text-4xl md:text-[64px] font-bold text-black leading-[1.3]">Brighter <span className="text-white">Smiles,<br/>Healthier</span> Lives</h1>
            <p className="mt-4 text-md font-bold font-italic">
              A confident smile can change your life—<br/>let us help you achieve it with expert dental care.
            </p>
            <div className="mt-6">
              <AnimatedButton href="#">Schedule Your Appointment Today</AnimatedButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Services Section */}
      <section
        className="relative -mx-6 w-[calc(100%+3rem)] py-16"
        style={{
          background: "linear-gradient(135deg, #B8E8E8 0%, #D4F1F1 25%, #E8F8F8 50%, #C5EBEB 75%, #A8E0E0 100%)",
        }}
      >
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our <span className="text-[#0D6D6E]">Services</span>
          </h2>
          <p className="text-center font-bold mb-2">
            Comprehensive Dental Solutions for a Healthier Smile
          </p>
          <p className="text-center text-sm mb-12">
            We offer a range of professional dental services to keep your smile bright and healthy.
          </p>

          <ServicesGrid />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative -mx-6 w-[calc(100%+3rem)] py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our <span className="text-[#0D6D6E]">Happy<br />Patients</span> Say
            </h2>
            <div className="mt-4 md:mt-0 text-right">
              <div className="flex items-center justify-end gap-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-yellow-400">⭐</span>
                <span className="text-xl font-bold">5.0</span>
              </div>
              <p className="text-sm font-medium">Customer Rating</p>
              <p className="text-sm text-gray-500">(Google Reviews)</p>
            </div>
          </div>

          {/* Testimonials Carousel */}
          <TestimonialsGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative -mx-6 w-[calc(100%+3rem)] py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-img.png')" }}
        />
        <div className="absolute inset-0 bg-[#12FFE9]/80" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-black italic leading-tight mb-6">
            Creating Healthy,<br />Beautiful Smiles for All Ages
          </h2>
          <p className="text-black font-bold italic mb-10 max-w-3xl mx-auto">
            Providing Compassionate Dental Care for Every Generation. Your family&apos;s oral health is our priority. We offer expert dental services tailored to bring you confident, healthy smiles.
          </p>
          <AnimatedButton href="#">Book your appointment today and experience exceptional care!</AnimatedButton>
        </div>
      </section>
    </div>
  );
}
