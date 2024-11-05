export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const getPincodeDetails = async (pincode) => {
  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    const data = await response.json();
    if (data[0].Status === "Success") {
      return {
        state: data[0].PostOffice[0].State,
        city: data[0].PostOffice[0].District,
        area: data[0].PostOffice[0].Name,
        circle: data[0].PostOffice[0].Circle,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching pincode details:", error);
    return null;
  }
};

// To get all post offices in a specific pincode
export const getAllPostOffices = async (pincode) => {
  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    const data = await response.json();
    if (data[0].Status === "Success") {
      return data[0].PostOffice;
    }
    return [];
  } catch (error) {
    console.error("Error fetching post offices:", error);
    return [];
  }
};

// To search by post office name
export const searchByPostOffice = async (postOfficeName) => {
  try {
    const response = await fetch(
      `https://api.postalpincode.in/postoffice/${postOfficeName}`
    );
    const data = await response.json();
    if (data[0].Status === "Success") {
      return data[0].PostOffice;
    }
    return [];
  } catch (error) {
    console.error("Error searching post office:", error);
    return [];
  }
};
