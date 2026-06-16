import { useEffect, useState, useRef } from "react";
import { useScrollParallax, useMouseParallax } from "../hooks/useParallax";
import ScrollPrompt from "../components/ScrollPrompt";

export default function SecondPage({ started: pageVisible }) {
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef(null);

  const scrollY = useScrollParallax();
  const mouse = useMouseParallax();

  useEffect(() => {
    if (!pageVisible) return;
    if (started) return;

    setStarted(true);
    audioRef.current?.play();
    setTimeout(() => setVisible(true), 3000);
  }, [pageVisible]);

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <ScrollPrompt visible={!started} />

      {/* ── Background ── */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src="/images/background5.png"
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(100%) brightness(0)" }}
          alt="Background Dark"
        />
      </div>

      {/* ── Subject ── */}
      <div
        className="absolute inset-0 flex items-end justify-center"
        style={{
          zIndex: 5,
          transform: `translateY(${started ? scrollY * 0.3 : 120}vh) translate(${mouse.x * 20}px, ${mouse.y * 10}px)`,
          transition: started ? "transform 1.5s ease-out" : "none",
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
          src="/images/front_bg.png"
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

      {/* ── Text ── */}
      <div
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 800ms ease-in-out",
          transform: `translateX(${mouse.x * 3}px) translateY(${scrollY * 0.1 + mouse.y * 1.5}px)`,
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
          Kenshi
        </p>

        <div
          className="absolute top-[60%] left-[65%] max-w-[420px] px-12 py-8 opacity-80 border border-[#3a2510] border-l-0 border-r-0"
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
            className="text-white text-center tracking-[0.2em] text-xl"
            style={{ fontFamily: "Japanese" }}
          >
            The blade does not serve the master,
            <br />
            it serves the silence
          </p>
        </div>
      </div>
    </section>
  );
}
