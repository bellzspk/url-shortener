import axios from "axios";
import { useEffect, useState } from "react";

const LinkResult = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false); 
      setShortenLink(""); 
    
      const res = await axios(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
          inputValue
        )}`
      );
      
      setShortenLink(res.data);
    } catch (error) {
      setError(true); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    } else {
      setShortenLink("");
      setError(false);
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p className="noData">Loading...</p>;
  }

  if (error) {
    return <p className="noData">Something went wrong :(</p>;
  }

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