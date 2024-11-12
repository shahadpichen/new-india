import React, { useState, useMemo, useEffect } from "react";
import MainLayout from "../components/layout/main-layout";
import PetitionCard from "../components/petitions/petition-card";
import Sidebar from "../components/petitions/petition-sidebar";
import { getPetitionsData } from "../data/petitionsData";
import { getPincodeDetails } from "../data/indianData";
import { useNavigate, useParams } from "react-router-dom";

const getRelativeTimeString = (date) => {
  const now = new Date();
  const diffInMs = now - new Date(date);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 30) return `${diffInDays} days ago`;
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  return `${diffInYears} years ago`;
};

const Petitions = () => {
  const navigate = useNavigate();
  const { state, pincode } = useParams();

  const [activeSort, setActiveSort] = useState("latest");
  const [petitions, setPetitions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(state || "Select State");
  const [pincodeInput, setPincodeInput] = useState(pincode || "");
  const [pincodeResults, setPincodeResults] = useState([]);

  useEffect(() => {
    const fetchPetitions = async () => {
      setIsLoading(true);
      const data = await getPetitionsData();
      setPetitions(data);
      setIsLoading(false);
    };

    fetchPetitions();
  }, []);

  useEffect(() => {
    let url = "/petitions/india";
    if (selectedState !== "Select State") {
      url += `/${selectedState}`;
      if (pincodeInput) {
        url += `/${pincodeInput}`;
      }
    }
    navigate(url);
  }, [selectedState, pincodeInput, navigate]);

  const filteredPetitions = useMemo(() => {
    return petitions.filter((petition) => {
      if (
        selectedState !== "Select State" &&
        petition.state !== selectedState
      ) {
        return false;
      }
      if (pincodeInput && petition.pincode !== pincodeInput) {
        return false;
      }
      if (
        searchQuery &&
        !petition.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [selectedState, pincodeInput, petitions, searchQuery]);

  const sortedPetitions = useMemo(() => {
    switch (activeSort) {
      case "latest":
        return [...filteredPetitions].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "most-upvoted":
        return [...filteredPetitions].sort(
          (a, b) => b.supporters - a.supporters
        );
      default:
        return filteredPetitions;
    }
  }, [filteredPetitions, activeSort]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePincodeChange = async (e) => {
    const value = e.target.value;
    setPincodeInput(value);

    if (value.length === 6) {
      setIsLoading(true);
      try {
        const details = await getPincodeDetails(value);
        if (details) {
          setSelectedState(details.state);
          setPincodeResults([details]);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleIndiaClick = () => {
    setSelectedState("Select State");
    setPincodeInput("");
    navigate("/petitions/india");
  };

  return (
    <MainLayout>
      <div className="flex w-full justify-center">
        <Sidebar
          selectedState={selectedState}
          pincodeInput={pincodeInput}
          pincodeResults={pincodeResults}
          isLoading={isLoading}
          onStateChange={setSelectedState}
          onPincodeChange={handlePincodeChange}
          onIndiaClick={handleIndiaClick}
        />
        <div className="px-6 py-8 w-[65%] h-[93vh] overflow-y-auto">
          <div className="flex w-full items-center gap-2 mb-6">
            <div className="w-full">
              <input
                type="text"
                placeholder="Search petitions..."
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2 border text-sm border-gray-300 focus:outline-none w-full "
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
                className={`px-3 py-2 w-[9vw] ${
                  activeSort === "most-upvoted"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Most Upvoted
              </button>
            </div>
          </div>

          <div className="mx-auto space-y-6">
            {sortedPetitions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-base text-center text-gray-600">
                  {selectedState === "Select State"
                    ? "No petitions found in India yet. Area looks clean! 🌟"
                    : `No petitions found in ${selectedState}${
                        pincodeInput ? ` (PIN: ${pincodeInput})` : ""
                      }. Area looks peaceful! 🌿`}
                </p>
              </div>
            ) : (
              sortedPetitions.map((petition) => (
                <PetitionCard
                  key={petition.id}
                  petition={petition}
                  getRelativeTimeString={getRelativeTimeString}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Petitions;
