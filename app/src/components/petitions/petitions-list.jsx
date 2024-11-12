import React from "react";
import PetitionCard from "./petition-card";

const PetitionsList = ({
  petitions,
  selectedState,
  pincodeInput,
  getRelativeTimeString,
}) => {
  if (petitions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-base text-center text-gray-600">
          {selectedState === "Select State"
            ? "No petitions found in India yet. Area looks clean! 🌟"
            : `No petitions found in ${selectedState}${
                pincodeInput ? ` (PIN: ${pincodeInput})` : ""
              }. Area looks peaceful! 🌿`}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-6">
      {petitions.map((petition) => (
        <PetitionCard
          key={petition.id}
          petition={petition}
          getRelativeTimeString={getRelativeTimeString}
        />
      ))}
    </div>
  );
};

export default PetitionsList;
