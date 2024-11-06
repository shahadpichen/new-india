import React from "react";
import { indianStates } from "../../data/indianData";
import Proof from "../auth/anon-aadhaar-proof";
import "../../styles/petitions.css";
import { useNavigate } from "react-router-dom";

const PetitionsSidebar = ({
  selectedState,
  pincodeInput,
  pincodeResults,
  isLoading,
  onStateChange,
  onPincodeChange,
  onIndiaClick,
}) => {
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col justify-between w-80 py-[10vh] pl-6 border-r space-y-6">
      <div className="flex flex-col justify-between">
        <div
          className="text-2xl text-end font-bold mb-8 pr-6 cursor-pointer"
          style={{
            WebkitTextFillColor: "#FFFFFF",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "#000",
          }}
          onClick={() => navigate("/")}
        >
          Anon-Petition
        </div>

        <div className="flex flex-col text-sm items-end space-y-4">
          <div className="w-1/2 petitions-sidebar ">
            <Proof />
          </div>
          <button
            onClick={onIndiaClick}
            className="w-1/2 py-2 px-4 bg-orange-100 text-orange-600 font-semibold"
          >
            India
          </button>

          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-1/2 py-2 px-4 border border-r-0 focus:outline-none focus:border-orange-500"
          >
            <option disabled>Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <div className="relative w-1/2">
            <input
              type="number"
              placeholder="Enter Pincode"
              value={pincodeInput}
              onChange={onPincodeChange}
              className="w-full py-2 px-4 border border-r-0 focus:outline-none focus:border-orange-500"
              maxLength={6}
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin h-4 w-4 rounded-full border-t-transparent"></div>
              </div>
            )}
            {pincodeInput.length === 6 && pincodeResults.length > 0 && (
              <div className="absolute w-full mt-2 py-2 px-4 bg-orange-100 text-orange-600 font-semibold">
                {pincodeResults.map((result, index) => (
                  <div key={index} className="p-2">
                    <div className="text-sm font-medium">{result.area}</div>
                    <div className="text-xs text-gray-600">
                      {result.city}, {result.state}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 pr-1 border-t space-y-4">
        <div className="flex items-center text-sm text-gray-600">
          <p>Powered by Anon Aadhaar for secure verification</p>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <p>Your identity remains completely anonymous</p>
        </div>
      </div>
    </aside>
  );
};

export default PetitionsSidebar;
