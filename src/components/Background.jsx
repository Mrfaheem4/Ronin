import { useEffect, useState, useRef } from "react";

function Background() {
  const [started, setStarted] = useState(false);
  const audioRef = useRef(null);

  // Audio setup
  useEffect(() => {
    audioRef.current = new Audio("/audio/burn.mp3");
    audioRef.current.volume = 0.9;
  }, []);

  // Scroll trigger
  useEffect(() => {
    const trigger = () => {
      if (!started) {
        setStarted(true);
        audioRef.current?.play();
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 10) trigger();
    };
    const handleWheel = (e) => {
      if (e.deltaY !== 0) trigger();
    };
    const handleTouch = () => trigger();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [started]);

  return (
    <div className="fixed inset-0 w-screen h-screen -z-10">
      <img
        src="/images/background3.png"
        className="w-full h-full object-cover"
        style={{ filter: "grayscale(100%) brightness(0)" }}
        alt="Background Dark"
      />

      {started && (
        <div
          className="absolute inset-0"
          style={{
            maskImage: "url(/images/mask.gif)",
            WebkitMaskImage: "url(/images/mask.gif)",
            maskSize: "cover",
            WebkitMaskSize: "cover",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            animation: "fadeIn 4s ease forwards",
          }}
        >
          <img
            src="/images/background3.png"
            className="w-full h-full object-cover"
            alt="Background Color"
          />
        </div>
      )}
    </div>
  );
}

export default Background;
