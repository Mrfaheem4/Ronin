import { useEffect, useState, useRef } from "react";
import { useScrollParallax, useMouseParallax } from "../hooks/useParallax";
import ScrollPrompt from "../components/ScrollPrompt";

export default function FirstPage() {
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef(null);
  const triggered = useRef(false);

  const scrollY = useScrollParallax();
  const mouse = useMouseParallax();

  // Audio setup
  useEffect(() => {
    audioRef.current = new Audio("/audio/burn.mp3");
    audioRef.current.volume = 0.9;
  }, []);

  // Single scroll trigger
  useEffect(() => {
    const trigger = () => {
      if (triggered.current) return;
      triggered.current = true;

      setStarted(true);
      audioRef.current?.play();
      setTimeout(() => setVisible(true), 5660);
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
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <ScrollPrompt visible={!started} />
      {/* ── Background ── */}
      <div className="absolute inset-0 w-full h-full -z-10">
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

      {/* ── Subject── */}
      <div
        className="absolute inset-0 flex items-end justify-center"
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
          className="h-[80vh] w-auto object-contain"
          style={{
            filter: started
              ? "grayscale(0%) brightness(1)"
              : "grayscale(100%) brightness(0.2)",
            transition: "filter 4s ease",
          }}
        />
      </div>

      {/* ── HomePageText ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-[1500ms] ease-in-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateY(${scrollY * 0.3}px) translate(${mouse.x * 5}px, ${mouse.y * 3}px)`,
        }}
      >
        <p
          className="absolute w-full text-center tracking-[0.2em] [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]"
          style={{
            fontFamily: "MingImperial",
            fontSize: "30vh",
            color: "white",
          }}
        >
          Ronin
        </p>

        <div
          className="absolute top-[58%] left-[6%] max-w-[420px] px-12 py-8 opacity-80 border border-[#3a2510] border-l-0 border-r-0"
          style={{
            background:
              "linear-gradient(to right, #1a1008, #2d1f0e 8%, #241508 50%, #2d1f0e 92%, #1a1008)",
          }}
        >
          <div
            className="absolute top-3 left-[10%] right-[10%] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #6b4a1e, transparent)",
            }}
          />
          <div
            className="absolute bottom-3 left-[10%] right-[10%] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #6b4a1e, transparent)",
            }}
          />
          <p
            className="text-white text-center tracking-[0.2em] text-2xl"
            style={{ fontFamily: "Mashiro" }}
          >
            The path of the Ronin is not one of shadows,,
            <br />
            But of cold, relentless purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
