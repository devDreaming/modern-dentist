import Image from "next/image";
import AnimatedButton from "@/components/AnimatedButton";

export default function HomeHero() {
  return (
    <section className="relative -mt-12 h-[calc(100vh)]">
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
      <div className="absolute inset-0 flex items-center px-6">
        <div className="px-6 md:px-12">
          <h1 className="text-4xl md:text-[64px] font-bold text-black leading-[1.3]">Brighter <span className="text-white">Smiles,<br/>Healthier</span> Lives</h1>
          <p className="mt-4 text-md font-bold font-italic">
            A confident smile can change your life—<br/>let us help you achieve it with expert dental care.
          </p>
          <div className="mt-6">
            <AnimatedButton bookAppointment>Schedule Your Appointment Today</AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
}
