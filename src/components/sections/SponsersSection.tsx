import SponserCard from "../SponserCard";

const SponsersSection = () => {
  return (
    <section className="px-4 -mt-20 text-white text-center mb-40">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Sponsors</h2>
      <p className="text-sm md:text-base max-w-2xl mx-auto mb-10">
        We extend our heartfelt gratitude to our sponsors who make Road to
        Legacy 2.0 possible. Their support helps us empower the next generation
        of IT professionals.
      </p>

      <div className="flex flex-wrap justify-center items-center mt-10 gap-8">
        {/* Replace these placeholders with actual sponsor logos */}
        <SponserCard
          image="/images/sponsers/wso2-logo.png"
          width={100}
          height={50}
          membership="GOLD"
        />
        <SponserCard
          image="/images/sponsers/fortude-logo.png"
          width={200}
          height={50}
          membership="GOLD"
        />
      </div>
    </section>
  );
};

export default SponsersSection;
