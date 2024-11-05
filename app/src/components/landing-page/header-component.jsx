import React from "react";
import {
  AnonAadhaarProof,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";

function Header() {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();

  React.useEffect(() => {
    if (latestProof) {
      console.log("Pincode:", latestProof.proof.pincode);
    }
  }, [latestProof]);

  return (
    <header>
      <h1
        className="text-center text-2xl font-semibold my-10"
        style={{
          WebkitTextFillColor: "#FFFFFF",
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "#000",
        }}
      >
        Anon-Petition
      </h1>

      <div className="absolute right-8 top-8 flex flex-col items-end gap-2">
        {anonAadhaar?.status === "logged-in" && (
          <>
            {latestProof && (
              <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
