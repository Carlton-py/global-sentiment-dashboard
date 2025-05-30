// src/App.jsx
import { useEffect, useState } from "react";
import { fetchSentiments } from "./utils/loadSentiments";
import MapChart from "./components/MapChart";
import Controls from "./components/Controls";
import Legend from "./components/Legend";

export default function App() {
  const [data, setData] = useState([]);
  const [view, setView] = useState("overall");
  const [detail, setDetail] = useState(null);

  // Load CSV on mount
  useEffect(() => {
    fetchSentiments()
      .then((rows) => setData(rows))
      .catch((e) => console.error("Failed to load CSV", e));
  }, []);

  // When a country is clicked, prepare detail
  const handleCountryClick = (countryName, val) => {
    const regions = data.filter((d) =>
      countryName.toLowerCase().includes(d.country.toLowerCase())
    );
    const breakdown = regions.reduce(
      (acc, { value }) => {
        const key = ["negative", "neutral", "positive"][value];
        acc[key]++;
        return acc;
      },
      { negative: 0, neutral: 0, positive: 0 }
    );
    setDetail({ countryName, val, breakdown, regions });
  };

  if (data.length === 0) {
    return <div className="p-6 text-center">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        Global Sentiment Dashboard
      </h1>

      <Controls selected={view} onChange={setView} />
      <Legend />

      <div className="border rounded-lg overflow-hidden h-[600px] mb-6">
        <MapChart data={data} onCountryClick={handleCountryClick} />
      </div>

      {detail && (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mb-6 border-l-4 border-blue-600">
          {/* Country Name */}
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            {detail.countryName}
          </h2>

          {/* Overall Pill */}
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-600 mr-2">
              Overall:
            </span>
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                detail.val === 0
                  ? "bg-red-200 text-red-900"
                  : detail.val === 1
                  ? "bg-yellow-200 text-yellow-900"
                  : "bg-green-200 text-green-900"
              }`}
            >
              {["Negative", "Neutral", "Positive"][detail.val]}
            </span>
          </div>

          {/* Breakdown Badges */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Negative", count: detail.breakdown.negative, color: "red" },
              { label: "Neutral", count: detail.breakdown.neutral, color: "yellow" },
              { label: "Positive", count: detail.breakdown.positive, color: "green" },
            ].map(({ label, count, color }) => (
              <div
                key={label}
                className={`flex flex-col items-center p-4 bg-${color}-50 rounded-lg`}
              >
                <span className={`text-lg font-bold text-${color}-700`}>
                  {count}
                </span>
                <span className={`mt-1 text-sm font-medium text-${color}-600`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Region List */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Regions</h3>
            <ul className="divide-y divide-gray-200 max-h-56 overflow-auto">
              {detail.regions.map(({ region, value }) => (
                <li
                  key={region}
                  className="flex justify-between items-center py-2 hover:bg-gray-50 px-2 rounded"
                >
                  <span className="text-sm text-gray-700">{region}</span>
                  <span
                    className={`text-sm font-semibold ${
                      value === 0
                        ? "text-red-600"
                        : value === 1
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {["Negative", "Neutral", "Positive"][value]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Close Button */}
          <div className="mt-6 text-right">
            <button
              onClick={() => setDetail(null)}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
