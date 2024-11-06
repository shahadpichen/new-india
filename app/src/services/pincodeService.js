import { createClient } from "@supabase/supabase-js";

const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_KEY");

export const getPincodeDetails = async (pincode) => {
  const { data, error } = await supabase
    .from("pincodes")
    .select("*")
    .eq("pincode", pincode)
    .single();

  if (error) {
    console.error("Error fetching pincode:", error);
    return null;
  }

  return data;
};

export const searchPincodes = async (searchTerm) => {
  const { data, error } = await supabase
    .from("pincodes")
    .select("*")
    .or(
      `
      city.ilike.%${searchTerm}%,
      state.ilike.%${searchTerm}%,
      area.ilike.%${searchTerm}%
    `
    )
    .limit(10);

  if (error) {
    console.error("Error searching pincodes:", error);
    return [];
  }

  return data;
};
