const { init, verify } = require("@anon-aadhaar/core");
const { ethers } = require("ethers");
const { BigNumber } = require("@ethersproject/bignumber");
const { zeroPad } = require("@ethersproject/bytes");
const { keccak256 } = require("@ethersproject/keccak256");

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

// Add the hash function
function hash(message) {
  message = BigNumber.from(message).toTwos(256).toHexString();
  message = zeroPad(message, 32);
  return (BigInt(keccak256(message)) >> BigInt(3)).toString();
}

const verifyAnonAadhaarProof = async (req, res) => {
  try {
    const { proof, title, description } = req.body;

    if (!proof || !proof.proof || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing proof, title, or description",
      });
    }

    // Generate signal hash from title and description
    const combinedString = `${title}:${description}`;
    const initialHash = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(combinedString)
    );
    const expectedSignalHash = hash(initialHash);

    console.log("Expected signal hash:", expectedSignalHash);

    // Get signal hash from proof
    const proofSignalHash = proof.proof.signalHash;

    // Compare signal hashes
    if (expectedSignalHash !== proofSignalHash) {
      return res.status(400).json({
        success: false,
        message: "Signal hash mismatch - petition data has been tampered with",
        expected: expectedSignalHash,
        received: proofSignalHash,
      });
    }

    // Verify the proof itself
    const isValid = await verify(proof);

    return res.json({
      success: true,
      isValid,
      signalVerified: true,
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
