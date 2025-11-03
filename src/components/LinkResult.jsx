import { useState } from "react";

const LinkResult = () => {
  const [shortenLink, setShortenLink] = useState("Hello World !");

  return (
    <>
      <div className="result">
        <p>{shortenLink}</p>
        <button>Copy to clipboard</button>
      </div>
    </>
  );
};

export default LinkResult;
