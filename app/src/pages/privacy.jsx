import React from "react";
import Header from "../components/landing-page/header-component";
import Footer from "../components/landing-page/footer-component";

function Privacy() {
  return (
    <main className="container mx-auto px-4 flex-grow text-black plus-jakarta-sans-uniquifier">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <section className="mb-8 ml-4">
          <h2 className="text-xl font-semibold mb-4">
            1. Our Privacy Commitment
          </h2>
          <p className="text-gray-600 mb-4 ml-4">
            NewIndia is built on the principle of privacy-preserving democracy.
            We use advanced Zero Knowledge Proof technology through AnonAadhaar
            to enable participation while protecting your identity.
          </p>
        </section>

        <section className="mb-8 ml-4">
          <h2 className="text-xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <div className="ml-4">
            <h3 className="text-lg font-semibold mb-2">
              2.1 Required Information
            </h3>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>PIN code (for geographic scoping)</li>
              <li>
                Aadhaar verification proof (processed through AnonAadhaar)
              </li>
              <li>Anonymous participation data</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">
              2.2 What We Don't Collect
            </h3>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Personal identification details</li>
              <li>Aadhaar number or biometric data</li>
              <li>Direct contact information</li>
            </ul>
          </div>
        </section>

        <section className="mb-8 ml-4">
          <h2 className="text-xl font-semibold mb-4">
            3. How Your Data is Protected
          </h2>
          <ul className="list-disc pl-6 mb-4 ml-4 text-gray-600">
            <li>All activities are anonymous by design</li>
            <li>Zero Knowledge Proofs ensure privacy</li>
            <li>Decentralized storage of petition and survey data</li>
            <li>Verifiable without compromising privacy</li>
          </ul>
        </section>

        <section className="mb-8 ml-4">
          <h2 className="text-xl font-semibold mb-4">4. Data Usage</h2>
          <p className="text-gray-600 mb-4 ml-4">
            Your anonymous participation data is used solely for enabling
            democratic processes on the platform. Geographic data (PIN code) is
            used only for scoping activities to relevant regions.
          </p>
        </section>

        <section className="mb-8 ml-4">
          <h2 className="text-xl font-semibold mb-4">
            5. Technical Implementation
          </h2>
          <p className="text-gray-600 mb-4 ml-4">
            We utilize the AnonAadhaar project's Zero Knowledge Proof system to
            verify your eligibility while maintaining privacy. This allows you
            to prove your Indian residency without revealing your identity.
          </p>
        </section>

        <section className="mt-24 mb-12">
          <Footer />
        </section>
      </div>
    </main>
  );
}

export default Privacy;
