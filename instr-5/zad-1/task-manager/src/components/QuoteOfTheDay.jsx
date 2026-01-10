import { useState, useEffect } from "react";

function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("Błąd pobierania cytatu");
      const data = await response.json();
      setQuote({ text: data.quote, author: data.author });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (loading) return <p style={{ fontSize: "0.8rem" }}>Ładowanie cytatu...</p>;
  if (error)
    return (
      <div style={{ fontSize: "0.8rem" }}>
        <span>Błąd cytatu.</span>
        <button
          onClick={fetchQuote}
          style={{ padding: "2px 5px", marginLeft: "10px" }}
        >
          Spróbuj ponownie
        </button>
      </div>
    );

  return (
    <div
      className="quote-container"
      style={{ margin: "10px 0", fontStyle: "italic" }}
    >
      <p style={{ margin: 0, fontSize: "0.9rem" }}>"{quote.text}"</p>
      <small>- {quote.author}</small>
      <br />
      <button
        onClick={fetchQuote}
        style={{ marginTop: "5px", padding: "2px 8px", fontSize: "0.7rem" }}
      >
        Nowy cytat
      </button>
    </div>
  );
}

export default QuoteOfTheDay;
