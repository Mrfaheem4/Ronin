import { useEffect } from "react";
import FirstPage from "./pages/FirstPage";
// import SecondPage from "./pages/SecondPage/SecondPage";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <FirstPage />
      {/* <SecondPage /> */}
    </>
  );
}

export default App;
