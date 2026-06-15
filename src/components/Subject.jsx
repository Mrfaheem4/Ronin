import { useEffect, useState } from "react";
import { useScrollParallax, useMouseParallax } from "../hooks/useParallax";

export default function Subject() {
  const [started, setStarted] = useState(false);
  const scrollY = useScrollParallax();
  const mouse = useMouseParallax();

  useEffect(() => {
    const trigger = () => {
      if (!started) setStarted(true);
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
    <div
      className="fixed inset-0 flex items-end justify-center"
      style={{
        zIndex: 5,
        transform: `translateY(${scrollY * 0.15}px) translate(${mouse.x * 10}px, ${mouse.y * 5}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          width: "70%",
          height: "80%",
          background:
            "radial-gradient(ellipse at center, rgba(180,0,0,0.4) 0%, transparent 90%)",
          filter: "blur(40px)",
          transition: "opacity 4s ease",
          opacity: started ? 1 : 0,
        }}
      />
      <img
        src="/images/closeup_bg.png"
        alt="Subject"
        className="h-[80vh] w-auto object-contain pointer-none:"
        style={{
          filter: started
            ? "grayscale(0%) brightness(1)"
            : "grayscale(100%) brightness(0.2)",
          transition: "filter 4s ease",
        }}
      />
    </div>
  );
}
