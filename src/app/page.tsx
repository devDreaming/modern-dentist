import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section className="relative -mx-6 -mt-12 w-[calc(100%+3rem)] h-screen">
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
            <Link
              href="#"
              className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-black font-medium transition-transform border-2 border-black hover:scale-110 hover:bg-zinc-100"
            >
              Schedule Your Appointment Today 🔹
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
