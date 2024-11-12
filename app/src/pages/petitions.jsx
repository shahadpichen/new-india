import React, { useState, useMemo, useEffect } from "react";
import MainLayout from "../components/layout/main-layout";
import Sidebar from "../components/petitions/petition-sidebar";
import SearchAndSort from "../components/petitions/search-and-sort";
import PetitionsList from "../components/petitions/petitions-list";
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
          <SearchAndSort
            searchQuery={searchQuery}
            onSearch={handleSearch}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
          />
          <PetitionsList
            petitions={sortedPetitions}
            selectedState={selectedState}
            pincodeInput={pincodeInput}
            getRelativeTimeString={getRelativeTimeString}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Petitions;
