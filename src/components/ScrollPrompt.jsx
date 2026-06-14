import { useEffect, useState } from "react";

export default function ScrollPrompt() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const trigger = () => setVisible(false);

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
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{
        zIndex: 10,
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease",
      }}
    >
      <p
        style={{
          fontFamily: "Japanese",
          fontSize: "clamp(1rem, 3vw, 2rem)",
          color: "white",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
        }}
      >
        scroll
      </p>
    </div>
  );
}
