import React from "react";
import {
  FaUserShield,
  FaSearch,
  FaRegLightbulb,
  FaThumbsUp,
} from "react-icons/fa";

function WhyUseSection() {
  return (
    <section className="mt-24">
      <h2 className="text-2xl font-semibold mb-4">Why Use Anon-Petition?</h2>
      <ul className="space-y-2">
        <li className="flex items-center mb-2">
          <FaUserShield className="w-4 h-4 mr-2 text-gray-500" />
          Full anonymity with Aadhaar verification
        </li>
        <li className="flex items-center mb-2">
          <FaSearch className="w-4 h-4 mr-2 text-gray-500" />
          Easily find and support relevant petitions
        </li>
        <li className="flex items-center mb-2">
          <FaRegLightbulb className="w-4 h-4 mr-2 text-gray-500" />
          Platform for Indian citizens' voices to be heard
        </li>
        <li className="flex items-center mb-2">
          <FaThumbsUp className="w-4 h-4 mr-2 text-gray-500" />
          Support others by upvoting petitions you resonate with
        </li>
      </ul>
    </section>
  );
}

export default WhyUseSection;
