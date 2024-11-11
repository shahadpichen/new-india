import React from "react";
import { useNavigate } from "react-router-dom";
import Proof from "../auth/anon-aadhaar-proof";
import "../../styles/landing-page.css";

function PetitionSubmission() {
  const navigate = useNavigate();

  return (
    <section className="mt-14">
      <div className="flex justify-center md:justify-start gap-2 petitions-submission">
        {/* <Proof /> */}
        <button
          onClick={() => navigate("/petitions")}
          className="px-4 py-1 border border-orange-500 text-orange-500 font-semibold hover:bg-gray-50"
        >
          Participate on NewIndia
        </button>
      </div>
    </section>
  );
}

export default PetitionSubmission;
