import React from "react";
import Header from "../components/landing-page/header-component";
import Footer from "../components/landing-page/footer-component";

function Terms() {
  return (
    <main className="container mx-auto px-4 flex-grow text-black plus-jakarta-sans-uniquifier">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <section className="mb-8 ml-4">
          <h2 className="text-xl font-semibold mb-4">1. Platform Overview</h2>
          <p className="text-gray-600 mb-4 ml-4">
            NewIndia is a decentralized platform enabling Indian residents to
            participate in democratic processes while preserving their privacy.
            The platform facilitates petitions, surveys, and opinion polls that
            are anonymous, verifiable, and spam-proof.
          </p>
        </section>

        <section className="mb-8 ml-4">
          <h2 className="text-xl font-semibold mb-4">
            2. Eligibility & Authentication
          </h2>
          <p className="text-gray-600 mb-4 ml-4">
            To use NewIndia, you must be an Indian resident with a valid Aadhaar
            card. We use Zero Knowledge Proofs through the AnonAadhaar project
            to verify your residency while maintaining your privacy. Only your
            PIN code is revealed for geographic scoping of activities.
          </p>
        </section>

        <section className="mb-8 ml-4">
          <h2 className="text-xl font-semibold mb-4">
            3. User Responsibilities
          </h2>
          <ul className="list-disc pl-6 mb-4 ml-4 text-gray-600">
            <li>Participate honestly in petitions, surveys, and polls</li>
            <li>Maintain the platform's decentralized nature</li>
            <li>Respect the privacy of other participants</li>
            <li>Submit content relevant to improving Indian democracy</li>
          </ul>
        </section>

        <section className="mb-8 ml-4">
          <h2 className="text-xl font-semibold mb-4">4. Prohibited Actions</h2>
          <ul className="list-disc pl-6 mb-4 ml-4 text-gray-600">
            <li>Attempting to de-anonymize users</li>
            <li>Creating spam or duplicate petitions</li>
            <li>Manipulating the voting system</li>
            <li>Using the platform for non-democratic purposes</li>
          </ul>
        </section>

        <section className="mb-8 ml-4">
          <h2 className="text-xl font-semibold mb-4">5. Geographic Scoping</h2>
          <p className="text-gray-600 mb-4 ml-4">
            Activities on NewIndia can be scoped to national, state, or PIN code
            level. Users agree to participate only in activities relevant to
            their geographic scope as verified through AnonAadhaar.
          </p>
        </section>

        <section className="mb-8 ml-4">
          <h2 className="text-xl font-semibold mb-4">6. Changes to Terms</h2>
          <p className="text-gray-600 mb-4 ml-4">
            We may update these terms to reflect changes in our services and
            features. Continued use of NewIndia constitutes acceptance of any
            changes.
          </p>
        </section>

        <section className="mt-24 mb-12">
          <Footer />
        </section>
      </div>
    </main>
  );
}

export default Terms;
