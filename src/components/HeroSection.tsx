const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[400px] flex flex-col justify-center items-center text-white text-center px-6"
      style={{ backgroundImage: "url('/event-banner.jpg')" }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">Road To Legacy 2.0</h1>
        <p className="text-lg">Join us for an unforgettable experience!</p>
      </div>
    </section>
  );
};

export default HeroSection;
