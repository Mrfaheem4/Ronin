import { useEffect, useState, useRef } from "react";
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
        // first scroll — trigger FirstPage reveal
        setFirstDone(true);
        return;
      }

      if (e.deltaY > 0 && firstDone && !showSecond) {
        // second scroll — transition to page 2
        transitioning.current = true;
        setShowSecond(true);
        setTimeout(() => {
          transitioning.current = false;
        }, 1500);
      }

      if (e.deltaY < 0 && showSecond) {
        // scroll back up
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
      <div
        className="absolute inset-0 transition-opacity duration-[1500ms]"
        style={{ opacity: showSecond ? 0 : 1 }}
      >
        <FirstPage started={firstDone} />
      </div>

      <div
        className="absolute inset-0 transition-opacity duration-[1500ms]"
        style={{
          opacity: showSecond ? 1 : 0,
          pointerEvents: showSecond ? "auto" : "none",
        }}
      >
        <SecondPage started={showSecond} />
      </div>
    </div>
  );
}

export default App;
