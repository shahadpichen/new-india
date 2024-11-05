import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
        {/* <LogInWithAnonAadhaar
          nullifierSeed={1234}
          fieldsToReveal={["revealPinCode"]}
        /> */}
        {!latestProof ? (
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
    </>
  );
}
