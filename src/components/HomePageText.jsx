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

  if (!triggered.current && !visible) {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 10, opacity: 0 }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 10,
        opacity: visible ? 1 : 0,
        transition: "opacity 1.5s ease",
        transform: `translateY(${scrollY * 0.3}px) translate(${mouse.x * 5}px, ${mouse.y * 3}px)`,
      }}
    >
      <p
        style={{
          fontFamily: "MingImperial",
          fontSize: "12vh",
          color: "#666263",
          letterSpacing: "0.2em",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          width: "100%",
          position: "absolute",
        }}
      >
        Ronin
      </p>

      <div
        style={{
          position: "absolute",
          top: "58%",
          left: "6%",
          background:
            "linear-gradient(to right, #1a1008, #2d1f0e 8%, #241508 50%, #2d1f0e 92%, #1a1008)",
          border: "1px solid #3a2510",
          borderLeft: "none",
          borderRight: "none",
          padding: "2rem 3rem",
          maxWidth: "420px",
          opacity: 0.8,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #6b4a1e, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #6b4a1e, transparent)",
          }}
        />

        <p
          style={{
            fontFamily: "Mashiro",
            color: "white",
            textAlign: "center",
            letterSpacing: "0.2em",
            fontSize: "1.5rem",
          }}
        >
          The path of the ronin is not one of shadows,,
          <br />
          But of cold, relentless purpose.
        </p>
      </div>
    </div>
  );
}
