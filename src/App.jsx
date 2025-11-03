import "./App.css";
import InputShortener from "./components/InputShortener";
import LinkResult from "./components/LinkResult";

function App() {

  return (
    <div className="container">
      <InputShortener/>
      <LinkResult/>
    </div>
  );
}

export default App;