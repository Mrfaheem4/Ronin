import { useEffect, useState, useRef } from "react";
import { useScrollParallax, useMouseParallax } from "../hooks/useParallax";

export default function HomePageText() {
  const [visible, setVisible] = useState(false);
  const triggered = useRef(false);
  const scrollY = useScrollParallax();
  const mouse = useMouseParallax();

  useEffect(() => {
    const trigger = () => {
      if (triggered.current) return;
      triggered.current = true;
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

  // Don't render at all until triggered
  if (!triggered.current && !visible) {
    return (
      <div
        className="fixed inset-0 flex justify-center pointer-events-none"
        style={{ zIndex: 10, opacity: 0 }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 flex justify-center pointer-events-none"
      style={{
        zIndex: 10,
        opacity: visible ? 1 : 0,
        transition: "opacity 1.5s ease",
        transform: `translateY(${scrollY * 0.3}px) translate(${mouse.x * 5}px, ${mouse.y * 3}px)`,
      }}
    >
      <p
        style={{
          fontFamily: "Japanese",
          fontSize: "12vh",
          color: "#666263",
          letterSpacing: "0.2em",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Ronin
      </p>
    </div>
  );
}
