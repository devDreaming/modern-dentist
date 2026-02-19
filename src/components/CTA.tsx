import AnimatedButton from "@/components/AnimatedButton";

export default function CTA() {
  return (
    <section className="relative py-24">
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
        <AnimatedButton bookAppointment>Book your appointment today and experience exceptional care!</AnimatedButton>
      </div>
    </section>
  );
}
