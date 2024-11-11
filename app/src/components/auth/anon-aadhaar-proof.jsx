import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ethers } from "ethers";

export default function Proof({ title, description }) {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  // Hash the title and description to create a valid signal
  const getSignal = () => {
    const combinedString = `${title}:${description}`;
    // Convert the string to a numerical value using keccak256 hash
    const hash = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(combinedString)
    );
    // Convert the hash to a decimal string (removing '0x' prefix)
    return window.BigInt(hash).toString();
  };

  // Store the original data that was used to generate the proof
  useEffect(() => {
    if (latestProof) {
      latestProof.originalData = {
        title,
        description,
      };
    }
  }, [latestProof, title, description]);

  return (
    <>
      <div>
        {!latestProof ? (
          <LogInWithAnonAadhaar
            nullifierSeed={1234}
            fieldsToReveal={["revealPinCode"]}
            signal={getSignal()}
          />
        ) : (
          <button
            onClick={() => navigate("/submit-petition")}
            className="custom-button"
          >
            Submit Petition
          </button>
        )}
      </div>
    </>
  );
}
