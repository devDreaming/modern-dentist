import Image from "next/image";

interface SubPageHeroProps {
  title: string;
  subtitle?: string;
}

export default function SubPageHero({ title, subtitle }: SubPageHeroProps) {
  return (
    <section className="relative">
      <div className="relative min-h-[450px]">
        <Image
          src="/dentist-chair.png"
          alt="Dental office"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #12FFE9 35%, rgba(93, 128, 115, 0))",
          }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-12">
            <h1 className="text-4xl md:text-[64px] font-bold text-black leading-[1.3]">{title}</h1>
            {subtitle && (
              <p className="mt-3 text-black max-w-2xl font-bold">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
