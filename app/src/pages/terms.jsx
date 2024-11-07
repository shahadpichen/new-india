import React from "react";
import Header from "../components/landing-page/header-component";
import Footer from "../components/landing-page/footer-component";
function Terms() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <Header />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p className="mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            By accessing or using New-India, you agree to be bound by these
            Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Platform Usage</h2>
          <p className="mb-4">
            New-India is a platform for creating and supporting petitions. Users
            are granted permission to use the platform for legitimate petition
            creation and support.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. User Responsibilities
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Submit truthful and accurate petition information</li>
            <li>Respect the privacy and rights of others</li>
            <li>Use the platform responsibly and ethically</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Prohibited Actions</h2>
          <p className="mb-4">Users may not:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Submit false or misleading petitions</li>
            <li>Use the platform for illegal purposes</li>
            <li>Harass or harm other users</li>
            <li>Attempt to manipulate petition statistics</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Content Moderation</h2>
          <p className="mb-4">
            We reserve the right to remove any content that violates these terms
            or is deemed inappropriate for the platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
          <p className="mb-4">
            We may update these terms from time to time. Continued use of the
            platform constitutes acceptance of any changes.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
