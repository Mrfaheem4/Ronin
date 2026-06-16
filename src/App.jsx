import { useEffect, useRef, useState } from "react";
import FirstPage from "./pages/FirstPage";
import SecondPage from "./pages/SecondPage";

function App() {
  const [firstDone, setFirstDone] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const transitioning = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (transitioning.current) return;

      if (e.deltaY > 0 && !firstDone) {
        transitioning.current = true;
        setFirstDone(true);
        setTimeout(() => {
          transitioning.current = false;
        }, 5000);
        return;
      }

      if (e.deltaY > 0 && firstDone && !showSecond) {
        transitioning.current = true;
        setShowSecond(true);
        setTimeout(() => {
          transitioning.current = false;
        }, 1500);
        return;
      }

      if (e.deltaY < 0 && showSecond) {
        transitioning.current = true;
        setShowSecond(false);
        setTimeout(() => {
          transitioning.current = false;
        }, 1500);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [firstDone, showSecond]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Page 1 — fades out when page 2 comes in */}
      <div
        className="absolute inset-0"
        style={{
          opacity: showSecond ? 0 : 1,
          transition: "opacity 1.5s ease-out",
        }}
      >
        <FirstPage started={firstDone} />
      </div>

      {/* Page 2 — slides up from below */}
      {/* <div
        className="absolute inset-0"
        style={{
          transform: showSecond ? "translateY(0)" : "translateY(100%)",
          transition: "transform 1.5s ease-out",
          pointerEvents: showSecond ? "auto" : "none",
        }}
      >
        <SecondPage started={showSecond} />
      </div> */}
    </div>
  );
}

export default App;
