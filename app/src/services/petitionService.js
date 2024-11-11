import { supabase } from "./supabaseClient";

const hashPetitionData = async (title, description, nullifier) => {
  const petitionText = title + description + nullifier;
  const encoder = new TextEncoder();
  const data = encoder.encode(petitionText);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

export const createPetition = async (petitionData) => {
  const petitionHash = await hashPetitionData(
    petitionData.title,
    petitionData.description,
    petitionData.anonAadhaarProof.proof.nullifier
  );

  // Add the hash to the proof
  const modifiedProof = {
    ...petitionData.anonAadhaarProof,
    petition: petitionHash,
  };

  const { data, error } = await supabase
    .from("petitions")
    .insert([
      {
        petition_hash: petitionHash, // Store hash in separate column
        title: petitionData.title,
        description: petitionData.description,
        pincode_details: petitionData.pincodeDetails,
        state: petitionData.state,
        location: petitionData.location,
        pincode: petitionData.pincode,
        supporters: 0,
        anon_aadhaar_proof: modifiedProof,
      },
    ])
    .select();

  if (error) throw error;
  return data;
};

export const submitPetition = createPetition;

export const getPetitions = async () => {
  const { data, error } = await supabase
    .from("petitions")
    .select("*, anon_aadhaar_proof")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const upvotePetition = async (
  petitionId,
  nullifier,
  voterPincode,
  petitionPincode
) => {
  if (voterPincode !== petitionPincode) {
    throw new Error("You can only upvote petitions from your pincode area");
  }

  try {
    const { data: existingUpvote } = await supabase
      .from("petition_upvotes")
      .select("id")
      .eq("petition_id", petitionId)
      .eq("nullifier", nullifier)
      .single();

    if (existingUpvote) {
      throw new Error("You have already upvoted this petition");
    }

    const { data: result, error: rpcError } = await supabase.rpc(
      "increment_petition_supporters",
      {
        p_petition_id: petitionId,
        p_nullifier: nullifier,
        p_voter_pincode: voterPincode,
      }
    );

    if (rpcError) throw rpcError;

    return result;
  } catch (error) {
    if (error.message.includes("unique constraint")) {
      throw new Error("You have already upvoted this petition");
    }
    throw error;
  }
};
