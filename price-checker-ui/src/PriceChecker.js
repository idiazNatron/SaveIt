import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function PriceChecker() {
  const [query, setQuery] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/search?query=${encodeURIComponent(query)}&zipcode=${zipcode}`);
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setError('No results found. Try a different product or zip code.');
        setResults([]);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">SaveIt – Real-Time Price & Coupon Finder</h1>
      <div className="flex flex-col gap-2 mb-6 sm:flex-row">
        <input
          className="border p-2 flex-grow"
          placeholder="Search for a product (e.g., laundry detergent)"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <input
          className="border p-2 w-full sm:w-40"
          placeholder="Optional Zip Code"
          value={zipcode}
          onChange={e => setZipcode(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={search}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {results.length > 0 && (
        <div className="grid gap-4">
          {results.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <div className="text-lg font-semibold">{item.name}</div>
              <div className="text-sm text-gray-600">From: {item.source}</div>
              <div className="text-green-700 font-bold text-lg">${item.price.toFixed(2)}</div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Product
              </a>
              {item.coupon && (
                <div className="mt-2 text-sm text-purple-700 flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  {item.coupon}
                  {item.coupon_link && (
                    <a
                      href={item.coupon_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline ml-2"
                    >
                      View Coupon
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
