import "./App.css";
import InputShortener from "./components/InputShortener";
import LinkResult from "./components/LinkResult";
import BackgroundAnimate from "./components/BackgroundAnimate";

function App() {

  return (
    <div className="container">
      <InputShortener/>
      <LinkResult/>
      <BackgroundAnimate/>
    </div>
  );
}

export default App;