import { useEffect, useState } from "react";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  useEffect(() => {
    if (inputValue.length) {
      setShortenLink(inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);
  
  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <button
            className={copied ? "copied" : ""}
            onClick={() => copyToClipboard(shortenLink)}
          >
            {!copied ? "Copy to clipboard" : "Copied !"}
          </button>
        </div>
      )}
    </>
  );
};

export default LinkResult;
