import { useEffect } from "react";
import Background from "./components/Background";
import Subject from "./components/Subject";
import ScrollPrompt from "./components/ScrollPrompt";
import HomePageText from "./components/HomePageText";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Background />
      <HomePageText />
      <Subject />
      <ScrollPrompt />
    </>
  );
}

export default App;
