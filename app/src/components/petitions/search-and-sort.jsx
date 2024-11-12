import React from "react";
import Proof from "../auth/anon-aadhaar-proof";
import {
  AnonAadhaarProof,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";

const SearchAndSort = ({
  searchQuery,
  onSearch,
  activeSort,
  setActiveSort,
}) => {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();

  return (
    <div className="flex w-full items-center gap-2 mb-6">
      <div className="w-full">
        <input
          type="text"
          placeholder="Search petitions..."
          value={searchQuery}
          onChange={onSearch}
          className="px-4 py-2 border text-sm border-gray-300 focus:outline-none w-full"
        />
      </div>
      <div className="w-fit flex items-center justify-end space-x-2 text-sm">
        <button
          onClick={() => setActiveSort("latest")}
          className={`px-4 py-2  ${
            activeSort === "latest"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => setActiveSort("most-upvoted")}
          className={`px-3 py-2.5 w-[9vw] ${
            activeSort === "most-upvoted"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Most Upvoted
        </button>

        {anonAadhaar?.status === "logged-in" ? (
          <></>
        ) : (
          <div className="petitions-topbar">
            <Proof />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndSort;
