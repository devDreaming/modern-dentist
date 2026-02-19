import SubPageHero from "@/components/SubPageHero";
import TeamSection from "@/components/TeamSection";

export default function About() {
  return (
    <div className="flex flex-col">
      <SubPageHero
        title="About Us"
        subtitle="Providing top-quality dental care with a gentle touch."
      />
      <TeamSection />
    </div>
  );
}
