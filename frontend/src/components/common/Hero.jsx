import img from "./Banner.jpg";

const Hero = ({ title, subtitle }) => {
  return (
    <header className="relative  h-64 md:h-80 flex items-center justify-start overflow-hidden">
      <img
        alt="Elegant floral background pattern"
        className="absolute inset-0 w-full h-full object-cover"
        src={img}
      />
      <div className="absolute inset-0 "></div>

      <div className="relative section-container w-full z-10">
        <h1 className="heading-hero">{title}</h1>
        <nav className="text-sm font-medium text-text-light uppercase tracking-wide">
          <a className="hover:underline text-xl text-gray-800" href="#">
            Home
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-800 text-xl">{subtitle}</span>
        </nav>
      </div>
    </header>
  );
};

export default Hero;
