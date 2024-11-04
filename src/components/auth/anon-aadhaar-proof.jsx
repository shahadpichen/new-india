import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "@anon-aadhaar/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProver } from "@anon-aadhaar/react";

export default function Proof() {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <>
      <div>
        {anonAadhaar?.status === "logged-out" ? (
          <LogInWithAnonAadhaar
            nullifierSeed={1234}
            fieldsToReveal={["revealPinCode"]}
          />
        ) : (
          <button
            onClick={() => navigate("/submit-petition")}
            className="px-4 py-2 border border-[#009a08] rounded-lg text-[#009a08] font-semibold hover:bg-gray-50"
          >
            Submit Petition
          </button>
        )}
        {/* <p>{anonAadhaar?.status}</p> */}
      </div>
      <div>
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            {latestProof && (
              <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
            )}
          </>
        )}
      </div>
    </>
  );
}
