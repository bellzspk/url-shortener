import { useEffect, useState } from "react";
import "./App.css";
import InputShortener from "./components/InputShortener";
import BackgroundAnimate from "./components/BackgroundAnimate";
import LinkResult from "./components/LinkResult";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [urlHistory, setUrlHistory] = useState([]);
  const [urlCache, setUrlCache] = useState({});

  useEffect(() => {
    const savedHistory = localStorage.getItem("urlHistory");
    const savedCache = localStorage.getItem("urlCache");
    if (savedHistory) {
      setUrlHistory(JSON.parse(savedHistory));
    }
    if (savedCache) {
      setUrlCache(JSON.parse(savedCache));
    }
  }, []);

  return (
    <div className="container">
      <BackgroundAnimate />
      <InputShortener setInputValue={setInputValue} />
      <LinkResult
        inputValue={inputValue}
        urlHistory={urlHistory}
        urlCache={urlCache}
        setUrlHistory={setUrlHistory}
        setUrlCache={setUrlCache}
      />
    </div>
  );
}

export default App;
