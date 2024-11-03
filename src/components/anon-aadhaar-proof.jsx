import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "@anon-aadhaar/react";
import { useEffect } from "react";
import { useProver } from "@anon-aadhaar/react";

export default function Proof() {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <>
      <div>
        <LogInWithAnonAadhaar
          nullifierSeed={1234}
          fieldsToReveal={["revealPinCode"]}
        />
        {/* <p>{anonAadhaar?.status}</p> */}
      </div>
      {/* <div>
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            {latestProof && (
              <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
            )}
          </>
        )}
      </div> */}
    </>
  );
}
