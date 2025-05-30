import cn from "classnames";

const views = [
  { key: "overall", label: "Overall" },
  { key: "negative", label: "Negative" },
  { key: "neutral", label: "Neutral" },
  { key: "positive", label: "Positive" },
];

export default function Controls({ selected, onChange }) {
  return (
    <div className="flex justify-center space-x-3 my-4">
      {views.map(v => (
        <button
          key={v.key}
          onClick={() => onChange(v.key)}
          className={cn(
            "px-3 py-1 rounded-md font-medium transition",
            selected === v.key
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          )}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
