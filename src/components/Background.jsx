function Background() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src="/images/background3.png"
        alt="Background"
        className="w-full h-full object-cover grayscale"
        style={{ filter: "grayscale(100%) brightness(0.2)" }}
      />

      <div
        className="absolute inset-0"
        style={{
          maskImage: "url(/images/mask.gif)",
          WebkitMaskImage: "url(/images/mask.gif)",
          maskSize: "cover",
          WebkitMaskSize: "cover",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <img
          src="/images/background3.png"
          alt="Background Color"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Background;
