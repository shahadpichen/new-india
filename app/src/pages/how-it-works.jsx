import React from "react";
import Header from "../components/landing-page/header-component";
import Footer from "../components/landing-page/footer-component";

function HowItWorks() {
  return (
    <div className="container mx-auto px-4 flex-grow text-black plus-jakarta-sans-uniquifier">
      <div className="w-full max-w-2xl mx-auto">
        <Header />

        <div className="max-w-3xl mx-auto mb-auto">
          <h1 className="text-2xl font-bold mb-8">How It Works</h1>

          <section className="mb-8">
            <p className="mb-4 text-gray-700">
              NewIndia is a platform for Indians to coordinate online in a
              decentralized and privacy preserving manner to build a better
              democracy. You can sign petitions, participate in surveys, vote in
              opinion polls, etc. without revealing your identity, yet proving
              you are an Indian resident.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Authentication with AnonAadhaar
            </h2>
            <p className="mb-4 text-gray-700">
              To submit or sign petitions, users must first authenticate using
              AnonAadhaar. This process:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>
                Verifies your Aadhaar card without revealing your identity
              </li>
              <li>Extracts only your PIN code for geographic verification</li>
              <li>Creates anonymous proofs for petition interactions</li>
            </ul>
            <div className="bg-gray-100 p-4 mb-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`// Authentication Component
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";

function PetitionSubmission() {
  const [anonAadhaar] = useAnonAadhaar();

  // Check if user is authenticated
  if (anonAadhaar.status === "logged-in") {
    const userPincode = anonAadhaar.pcd.proof.public.userPincode;
    // Allow petition submission with verified pincode
  }

  return (
        <LogInWithAnonAadhaar
            nullifierSeed={1234}
            fieldsToReveal={["revealPinCode"]}
            signal={getSignal()}
        />  // AnonAadhaar login button
  );
}`}</code>
              </pre>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Petition Creation</h2>
            <p className="mb-4 text-gray-700">
              When a petition is created, the following data is stored in our
              Supabase database:
            </p>
            <div className="bg-gray-100 p-4 mb-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`// Petition data structure
{
  title: string,              // Petition title
  description: string,        // Detailed description
  pincode_details: object,    // Details about the pincode
  state: string,              // State scope
  location: string,           // Location information
  pincode: string,           // Specific pincode
  supporters: number,        // Number of supporters (starts at 0)
  anon_aadhaar_proof: string // Proof from AnonAadhaar
}`}</code>
              </pre>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upvoting System</h2>
            <p className="mb-4 text-gray-700">
              The upvoting system ensures one vote per person per region through
              these mechanisms:
            </p>
            <div className="bg-gray-100 p-4 mb-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`// Upvote verification process
async function upvotePetition(petitionId, nullifier, voterPincode, petitionPincode) {
  // 1. Verify voter is from the same pincode
  if (voterPincode !== petitionPincode) {
    throw new Error("Can only upvote petitions from your pincode area");
  }

  // 2. Check for duplicate votes using nullifier
  const existingUpvote = await checkNullifier(petitionId, nullifier);
  if (existingUpvote) {
    throw new Error("Already upvoted this petition");
  }

  // 3. Increment supporters count and store upvote
  await incrementPetitionSupporters(petitionId, nullifier, voterPincode);
}`}</code>
              </pre>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Geographic Verification
            </h2>
            <p className="mb-4 text-gray-700">
              The system enforces geographic restrictions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Users can only upvote petitions from their own pincode area
              </li>
              <li>The pincode is verified through AnonAadhaar proof</li>
              <li>
                State and national level petitions use the same verification
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
              <p className="text-green-700">
                The authenticity of the data can be verified by anyone using the
                signal hash.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Preventing Duplicate Votes
            </h2>
            <p className="mb-4 text-gray-700">
              Duplicate votes are prevented through:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Unique nullifier hash per user-petition combination</li>
              <li>Database constraints on petition_upvotes table</li>
              <li>Transaction-level checks using Supabase RPC calls</li>
            </ul>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`// Database structure for upvotes
table: petition_upvotes {
  id: uuid
  petition_id: uuid
  nullifier: string      // Unique per user-petition
  voter_pincode: string  // For geographic verification
  created_at: timestamp
}`}</code>
              </pre>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Future Features</h2>
            <p className="text-gray-700 mb-2">
              We're working on expanding the platform to include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Anonymous surveys with verifiable results</li>
              <li>Opinion polls with geographic targeting</li>
              <li>Enhanced verification mechanisms</li>
              <li>Integration with more privacy-preserving protocols</li>
            </ul>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default HowItWorks;
