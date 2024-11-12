import React from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { useAnonAadhaar } from "@anon-aadhaar/react";
import { useProver } from "@anon-aadhaar/react";
import { upvotePetition } from "../../services/petitionService";
import { toast } from "sonner";

const PetitionCard = ({ petition, getRelativeTimeString }) => {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();

  const verifyUserProof = async (proof) => {
    try {
      const response = await fetch("http://localhost:5002/api/verify/proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ proof }),
      });

      const data = await response.json();
      return data.success && data.isValid;
    } catch (error) {
      console.error("User verification error:", error);
      return false;
    }
  };

  const handleVerify = async () => {
    try {
      const storedProof = petition.anon_aadhaar_proof;

      if (!storedProof || !storedProof.proof) {
        toast.error("No proof found for this petition");
        return;
      }

      const response = await fetch("http://localhost:5002/api/verify/proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proof: storedProof,
          title: petition.title,
          description: petition.description,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.isValid) {
          toast.success("Petition proof verified successfully!");
        } else {
          toast.error("Petition proof verification failed!");
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Failed to verify: " + error.message);
    }
  };

  const handleUpvote = async () => {
    if (anonAadhaar?.status !== "logged-in") {
      toast.error("Please login with Anon Aadhaar to upvote");
      return;
    }

    try {
      const nullifier = latestProof.proof.nullifier;
      const userPincode = latestProof.claim.pincode;

      if (!nullifier || !userPincode) {
        toast.error(
          "Could not get verification data. Please try logging in again."
        );
        return;
      }

      const result = await upvotePetition(
        petition.id,
        nullifier,
        userPincode,
        petition.pincode
      );

      toast.success("Petition upvoted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Failed to upvote petition");
    }
  };

  return (
    <div className="w-full flex justify-between border gap-5 border-gray-200 rounded-sm p-4 hover:bg-gray-50 relative">
      <span className="absolute top-2 right-2 text-xs text-gray-500">
        {getRelativeTimeString(petition.inserted_at)}
      </span>
      <div className="flex flex-col pt-2 pb-1">
        <h2 className="text-lg font-medium mb-1">{petition.title}</h2>
        <p className="text-sm text-gray-500 mb-2">{petition.description}</p>
        <div className="flex gap-2 text-xs text-gray-800 pt-2">
          <span className="bg-gray-200 px-3 py-1 rounded-full">
            {petition.state}
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded-full">
            {petition.location}
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded-full">
            PIN: {petition.pincode}
          </span>
          <button
            onClick={handleVerify}
            className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors"
          >
            Verify
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center text-sm">
        <button
          onClick={handleUpvote}
          disabled={anonAadhaar?.status !== "logged-in"}
          className={`flex flex-col items-center justify-center rounded-sm px-3 py-1 border ${
            anonAadhaar?.status === "logged-in"
              ? "border-orange-400 text-orange-400 hover:bg-orange-100"
              : "border-gray-300 text-gray-400 cursor-not-allowed"
          } transition-colors`}
        >
          <BiSolidUpArrow />
          {petition.supporters || 0}
        </button>
      </div>
    </div>
  );
};

export default PetitionCard;
