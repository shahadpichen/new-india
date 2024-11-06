import { supabase } from "./supabaseClient";
import { toast } from "sonner";

export const createPetition = async (petitionData) => {
  const { data, error } = await supabase
    .from("petitions")
    .insert([
      {
        title: petitionData.title,
        description: petitionData.description,
        pincode_details: petitionData.pincodeDetails,
        state: petitionData.state,
        location: petitionData.location,
        pincode: petitionData.pincode,
        supporters: 0,
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
    .select("*")
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
  //   toast.info("Processing upvote...", {
  //     description: `Verifying petition ${petitionId}`,
  //   });

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
