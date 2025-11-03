import { useEffect, useState } from "react";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  useEffect(() => {
    if (inputValue.length) {
      setShortenLink(inputValue);
    }
  }, [inputValue]);
  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <button>Copy to clipboard</button>
        </div>
      )}
    </>
  );
};

export default LinkResult;
