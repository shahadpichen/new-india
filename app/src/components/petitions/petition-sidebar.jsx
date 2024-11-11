import React from "react";
import { indianStates } from "../../data/indianData";
import "../../styles/petitions.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
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
    <aside className="flex flex-col justify-between w-40 py-[10vh] pl-6 border-r max-h-[93vh] space-y-6">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col text-sm items-end space-y-4">
          <div className="w-full petitions-sidebar ">
            <button
              onClick={() => navigate("/submit-petition")}
              className="w-full py-2 px-4 bg-green-100 text-green-700 font-semibold"
            >
              Submit Petition
            </button>
          </div>
          <button
            onClick={onIndiaClick}
            className="w-full py-2 px-4 bg-orange-100 text-orange-600 font-semibold"
          >
            India
          </button>

          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full py-2 px-4 border border-r-0 focus:outline-none focus:border-orange-500"
          >
            <option disabled>Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <div className="relative w-full">
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
    </aside>
  );
};

export default Sidebar;
