const Hero = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="w-50% flex flex-col items-center mt-10">
          <h2 className="md:text-4xl text-2xl text-gray-800 font-semibold">
            Motivational quotes for everyone
          </h2>
          <img
            src="motiHero.png"
            alt="Hero"
            className="py-5"
            style={{ width: "250px" }}
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
