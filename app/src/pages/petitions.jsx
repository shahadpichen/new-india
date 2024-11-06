import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPincodeDetails } from "../data/indianData";
import { getPetitionsData } from "../data/petitionsData";
import PetitionsSidebar from "../components/petitions/petitions-sidebar";
import PetitionsHeader from "../components/petitions/petitions-header";
import PetitionCard from "../components/petitions/petition-card";

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
  const [selectedState, setSelectedState] = useState(state || "Select State");
  const [pincodeInput, setPincodeInput] = useState(pincode || "");
  const [activeSort, setActiveSort] = useState("latest");
  const [petitions, setPetitions] = useState([]);
  const [pincodeResults, setPincodeResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  useEffect(() => {
    const fetchPetitions = async () => {
      setIsLoading(true);
      const data = await getPetitionsData();
      setPetitions(data);
      setIsLoading(false);
    };

    fetchPetitions();
  }, []);

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
      return true;
    });
  }, [selectedState, pincodeInput, petitions]);

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

  const handleIndiaClick = () => {
    setSelectedState("Select State");
    setPincodeInput("");
    navigate("/petitions/india");
  };

  return (
    <div className="container mx-auto px-4 flex-grow text-black plus-jakarta-sans-uniquifier">
      {isMobile ? (
        <div className="text-center py-12">
          <p className="text-base text-gray-600">
            Please use a laptop or PC for a better experience.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto flex">
          <PetitionsSidebar
            selectedState={selectedState}
            pincodeInput={pincodeInput}
            pincodeResults={pincodeResults}
            isLoading={isLoading}
            onStateChange={setSelectedState}
            onPincodeChange={handlePincodeChange}
            onIndiaClick={handleIndiaClick}
          />

          <div className="flex flex-col h-screen">
            <PetitionsHeader
              activeSort={activeSort}
              setActiveSort={setActiveSort}
            />

            <main className="flex-1 p-8 overflow-y-auto h-[93vh]">
              <div className="max-w-3xl mx-auto space-y-6">
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
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Petitions;
