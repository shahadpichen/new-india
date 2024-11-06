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
            className="custom-button"
          >
            Submit Petition
          </button>
        )}
        {/* <p>{anonAadhaar?.status}</p> */}
      </div>
    </>
  );
}
