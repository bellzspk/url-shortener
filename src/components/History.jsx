import { useState, useEffect } from "react";

const History = ({
  urlHistory,
  setUrlHistory,
  setUrlCache,
}) => {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
  };

  useEffect(() => {
    if (!copiedId) return;
    const timer = setTimeout(() => {
      setCopiedId(null);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copiedId]);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setUrlHistory([]);
      setUrlCache({});
      localStorage.removeItem("urlHistory");
      localStorage.removeItem("urlCache");
    }
  };

  return (
    <div className="historyContainer">
      <div className="historyHeader">
        <div className="historyTitle">
          📋 Link History ({urlHistory.length})
        </div>

        {urlHistory.length > 0 && (
          <button className="clearButton" onClick={clearHistory}>
            Clear History
          </button>
        )}
      </div>

      {urlHistory.length === 0 ? (
        <div className="emptyState">
          <div className="emptyStateIcon">🔗</div>
          <p>No URLs shortened yet</p>
          <p className="emptyStateSubtext">Enter a URL above to get started!</p>
        </div>
      ) : (
        <div className="historyList">
          {urlHistory.map((item, index) => (
            <div
              key={item.id}
              className="historyItem"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="historyItemHeader">
                <p className="shortUrl">🔗 {item.short}</p>
                <span className="timestamp">{item.created}</span>
              </div>
              <div className="urlContainer">
                <p className="originalUrl" title={item.original}>
                  {item.original}
                </p>
                <button
                  className="copyButton"
                  onClick={() => copyToClipboard(item.short, item.id)}
                >
                  {copiedId === item.id ? "Copied !" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;