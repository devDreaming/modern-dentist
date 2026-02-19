import SubPageHero from "@/components/SubPageHero";
import FAQ from "@/components/FAQ";

export default function Tips() {
  return (
    <div className="flex flex-col">
      <SubPageHero
        title="Dental Health"
        subtitle="Achieve a brighter, healthier smile with expert tips and advice. Explore daily dental routines, diet tips, and solutions to common dental issues for you and your family."
      />
      <FAQ />
    </div>
  );
}
