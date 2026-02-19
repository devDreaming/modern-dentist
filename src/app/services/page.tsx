import SubPageHero from "@/components/SubPageHero";
import ServicesList from "@/components/ServicesList";

export default function Services() {
  return (
    <div className="flex flex-col">
      <SubPageHero
        title="Our Services"
        subtitle="We offer a range of advanced dental treatments to keep your smile healthy, bright, and confident. From routine checkups to specialized procedures, our expert team is here to provide the best care for you and your family."
      />
      <ServicesList />
    </div>
  );
}
