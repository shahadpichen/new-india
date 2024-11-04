import React from "react";
import { BiSolidUpArrow } from "react-icons/bi";

const PetitionCard = ({ petition, getRelativeTimeString }) => {
  return (
    <div className="flex justify-between border gap-5 border-gray-200 rounded-sm p-4 hover:bg-gray-50 relative">
      <span className="absolute top-2 right-2 text-xs text-gray-500">
        {getRelativeTimeString(petition.createdAt)}
      </span>
      <div className="flex flex-col pt-4">
        <h2 className="text-lg font-medium mb-1">{petition.title}</h2>
        <p className="text-sm text-gray-500 mb-2">{petition.description}</p>
        <div className="flex gap-2 text-xs text-gray-800">
          <span className="bg-gray-200 px-3 py-1 rounded-full">
            {petition.state}
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded-full">
            {petition.location}
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded-full">
            PIN: {petition.pincode}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center text-sm">
        <button className="flex flex-col items-center justify-center rounded-sm px-3 py-1 border border-orange-400 text-orange-400 font-medium hover:bg-orange-100 transition-colors">
          <BiSolidUpArrow />
          {petition.supporters}
        </button>
      </div>
    </div>
  );
};

export default PetitionCard;
