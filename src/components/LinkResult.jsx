import axios from "axios";
import { useEffect, useState } from "react";
import History from "./History";

const LinkResult = ({
  inputValue,
  urlHistory,
  urlCache,
  setUrlHistory,
  setUrlCache,
}) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const fetchData = async () => {
    // Check if URL already exists in cache
    if (urlCache[inputValue]) {
      setShortenLink(urlCache[inputValue]);
      return;
    }

    try {
      setLoading(true);
      setError(false);
      setShortenLink("");

      const res = await axios(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
          inputValue
        )}`
      );
      let result = res.data;

      setShortenLink(result);

      // Store in cache
      setUrlCache((prev) => ({
        ...prev,
        [inputValue]: result,
      }));

      // Add to history
      const newUrl = {
        id: Date.now(),
        original: inputValue,
        short: result,
        created: new Date().toLocaleString(),
      };

      setUrlHistory((prev) => [newUrl, ...prev]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!inputValue.length) {
      setShortenLink("");
      setError(false);
      return;
    }
    setError(false);
    fetchData();
  }, [inputValue]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (urlHistory.length > 0) {
      localStorage.setItem("urlHistory", JSON.stringify(urlHistory));
    }
  }, [urlHistory]);

  // Save cache to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(urlCache).length > 0) {
      localStorage.setItem("urlCache", JSON.stringify(urlCache));
    }
  }, [urlCache]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  // if (loading) {
  //   return <p className="noData">Loading...</p>;
  // }

  // if (error) {
  //   return <p className="noData">Something went wrong :(</p>;
  // }

  return (
    <>
      {loading && <p className="noData">Loading...</p>}
      {error && <p className="noData">Something went wrong :(</p>}
      {shortenLink && !loading && !error && (
        <div className="result">
          <p>{shortenLink}</p>
          <button
            className={copied ? "copied" : ""}
            onClick={() => copyToClipboard(shortenLink)}
          >
            {!copied ? "Copy" : "Copied !"}
          </button>
        </div>
      )}
      <History
        urlHistory={urlHistory}
        setUrlHistory={setUrlHistory}
        setUrlCache={setUrlCache}
        copyToClipboard={copyToClipboard}
      />
    </>
  );
};

export default LinkResult;
