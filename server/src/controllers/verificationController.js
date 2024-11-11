const { init, verify } = require("@anon-aadhaar/core");
const crypto = require("crypto");

// Define artifact URLs
const artifactsUrls = {
  prod: {
    wasm: "https://anon-aadhaar-artifacts.s3.eu-central-1.amazonaws.com/v2.0.0/aadhaar-verifier.wasm",
    zkey: "https://anon-aadhaar-artifacts.s3.eu-central-1.amazonaws.com/v2.0.0/circuit_final.zkey",
    vk: "https://anon-aadhaar-artifacts.s3.eu-central-1.amazonaws.com/v2.0.0/vkey.json",
  },
};

// Initialize the core package
const initializeAnonAadhaar = async () => {
  const initArgs = {
    wasmURL: artifactsUrls.prod.wasm,
    zkeyURL: artifactsUrls.prod.zkey,
    vkeyURL: artifactsUrls.prod.vk,
    isWebEnv: false,
  };

  try {
    await init(initArgs);
    console.log("AnonAadhaar initialized successfully");
  } catch (error) {
    console.error("Failed to initialize AnonAadhaar:", error);
  }
};

// Initialize when the server starts
initializeAnonAadhaar();

const generatePetitionHash = (title, description, nullifier) => {
  const petitionText = title + description + nullifier;
  return crypto.createHash("sha256").update(petitionText).digest("hex");
};

const verifyAnonAadhaarProof = async (req, res) => {
  try {
    const { proof, petitionDetails } = req.body;

    if (!proof || !proof.proof || !petitionDetails) {
      return res.status(400).json({
        success: false,
        message: "Missing proof or petition details",
      });
    }

    // Generate hash from provided details
    const calculatedHash = generatePetitionHash(
      petitionDetails.title,
      petitionDetails.description,
      proof.proof.nullifier
    );

    // Compare with both stored hash and proof petition hash
    if (
      calculatedHash !== petitionDetails.petition_hash ||
      calculatedHash !== proof.petition
    ) {
      return res.json({
        success: false,
        isValid: false,
        message: "User did not create this petition.",
        details: {
          calculatedHash,
          storedHash: petitionDetails.petition_hash,
          proofHash: proof.petition,
        },
      });
    }

    // If both hashes match, proceed with proof verification
    const isValid = await verify(proof);

    return res.json({
      success: true,
      isValid,
      message: isValid
        ? "Proof verified successfully"
        : "Proof verification failed",
    });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Error verifying proof",
      error: error.message,
    });
  }
};

module.exports = {
  verifyProof: verifyAnonAadhaarProof,
};
