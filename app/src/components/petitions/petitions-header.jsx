import React from "react";

const PetitionsHeader = ({ activeSort, setActiveSort }) => {
  return (
    <header className="flex items-center border-b h-[7vh] px-8">
      <nav className="flex gap-6">
        <button
          onClick={() => setActiveSort("latest")}
          className={`py-2 font-medium ${
            activeSort === "latest"
              ? "text-orange-500"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Latest
        </button>

        <button
          onClick={() => setActiveSort("most-upvoted")}
          className={`py-2 font-medium ${
            activeSort === "most-upvoted"
              ? "text-orange-500"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Most Upvoted
        </button>
      </nav>
    </header>
  );
};

export default PetitionsHeader;
