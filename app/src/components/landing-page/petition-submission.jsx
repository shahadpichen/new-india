import React from "react";
import { useNavigate } from "react-router-dom";
import Proof from "../auth/anon-aadhaar-proof";
import "../../styles/landing-page.css";

function PetitionSubmission() {
  const navigate = useNavigate();

  return (
    <section className="text-left mt-20">
      <h1 className="text-2xl font-semibold mb-5">
        Anonymously Submit Your Petition
      </h1>

      <div className="max-w-xl flex gap-2 petitions-submission">
        <Proof />
        <button
          onClick={() => navigate("/petitions")}
          className="px-4 py-1 border border-orange-500 rounded-lg text-orange-500 font-semibold hover:bg-gray-50"
        >
          View Petitions
        </button>
      </div>

      <p className="text-gray-600 mt-8">
        Share your concerns without revealing your identity. We use Anon Aadhaar
        to ensure that petitions are from Indian citizens only, safeguarding
        your privacy while ensuring authenticity.
      </p>
    </section>
  );
}

export default PetitionSubmission;
