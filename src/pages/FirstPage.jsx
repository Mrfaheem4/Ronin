import { useEffect, useState, useRef, useMemo } from "react";
// import { useScrollParallax, useMouseParallax } from "../hooks/useParallax";
import ScrollPrompt from "../components/ScrollPrompt";
import SmokeLayer from "../components/Smoke";

const KANJI = [
  "刀",
  "侍",
  "血",
  "死",
  "闇",
  "剣",
  "魂",
  "義",
  "道",
  "罪",
  "恥",
  "怒",
  "悲",
  "誇",
  "忠",
  "武",
  "影",
  "夜",
  "風",
  "炎",
  "鬼",
  "龍",
  "天",
  "火",
];

export default function FirstPage() {
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState([]);

  const triggered = useRef(false);
  // const scrollY = useScrollParallax();
  // const mouse = useMouseParallax();

  // Kanji particles
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const duration = Math.random() * 3 + 2;
      const newParticle = {
        id,
        word: KANJI[Math.floor(Math.random() * KANJI.length)],
        size: Math.random() * 48 + 16,
        left: Math.random() * 88 + 2,
        top: Math.random() * 80 + 5,
        duration,
      };
      setParticles((prev) => [...prev.slice(-20), newParticle]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, duration * 1000);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Scroll trigger
  useEffect(() => {
    const trigger = () => {
      if (triggered.current) return;
      triggered.current = true;
      setStarted(true);
      setTimeout(() => setVisible(true), 3000);
    };
    window.addEventListener("scroll", trigger, { passive: true });
    window.addEventListener("wheel", trigger, { passive: true });
    window.addEventListener("touchstart", trigger, { passive: true });
    return () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("wheel", trigger);
      window.removeEventListener("touchstart", trigger);
    };
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <ScrollPrompt visible={!started} />

      <SmokeLayer />
      {/* ── Background ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d0d 55%, #080808 100%)",
          zIndex: 1,
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none select-none"
            style={{
              fontSize: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              color: "grey",
              animation: `floatUp ${p.duration}s ease-in-out forwards`,
              fontFamily: "hkhigerei",
              opacity: 0.8,
            }}
          >
            {p.word}
          </div>
        ))}
      </div>

      {/* ── Subject ── */}
      <div
        className="absolute inset-0 flex items-end justify-center z-10"
        style={{
          zIndex: 5,
          // transform: `translateY(${scrollY * 0.15}px) translate(${mouse.x * 10}px, ${mouse.y * 5}px)`,
        }}
      >
        <img
          src="/images/front_bg.png"
          alt="Subject"
          className="h-[80vh] w-auto object-contain"
          style={{
            filter: started
              ? "grayscale(0%) brightness(1)"
              : "grayscale(100%) brightness(0.2)",
            transition: "filter 4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      {/* ── Title ── */}
      <div
        className="absolute inset-0 pointer-events-none "
        style={{
          zIndex: 4,
          opacity: visible ? 1 : 0,
          transition: "opacity 700ms ease-in-out",
        }}
      >
        <p
          className="absolute top-0 w-full text-center tracking-[0.2em]"
          style={{
            fontFamily: "MingImperial",
            fontSize: "30vh",
            lineHeight: 1,
            color: "white",
            textShadow: "0 2px 40px rgba(0,0,0,0.4)",
          }}
        >
          Ronin
        </p>
      </div>
    </section>
  );
}
