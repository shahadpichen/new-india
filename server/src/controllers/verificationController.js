const { init, verify } = require("@anon-aadhaar/core");

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

const verifyAnonAadhaarProof = async (req, res) => {
  try {
    const storedProof = req.body.proof;

    if (!storedProof || !storedProof.proof) {
      return res.status(400).json({
        success: false,
        message: "No proof found",
      });
    }

    // Verify the proof using the core package's verify function
    const isValid = await verify(storedProof);

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
