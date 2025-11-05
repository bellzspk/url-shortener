const History = ({
  urlHistory,
  setUrlHistory,
  setUrlCache,
  copyToClipboard,
}) => {
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
          No URLs shortened yet. Enter a URL above to get started! 🚀
        </div>
      ) : (
        <div className="historyList">
          {urlHistory.map((item, index) => (
            <div
              key={item.id}
              className="historyItem"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div>
                <p className="shortUrl"> {item.short}</p>
              </div>
              <div className="urlContainer">
                <p className="originalUrl">{item.original}</p>
                <button
                  className="copyButton"
                  onClick={() => copyToClipboard(item.short)}
                >
                  Copy
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
