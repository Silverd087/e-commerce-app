import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  return (
    <div className="relative w-[70vw]">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        placeholder="Search products..."
        className="input input-bordered pl-10 w-full"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
