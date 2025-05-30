export default function Legend() {
  return (
    <div className="flex justify-center space-x-6 my-2">
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 bg-[#388E3C] rounded-sm" />
        <span className="text-sm">Positive</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 bg-[#FBC02D] rounded-sm" />
        <span className="text-sm">Neutral</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 bg-[#D32F2F] rounded-sm" />
        <span className="text-sm">Negative</span>
      </div>
    </div>
  );
}
