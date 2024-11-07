import React from "react";
import Header from "../components/landing-page/header-component";
import Footer from "../components/landing-page/footer-component";

function Privacy() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <Header />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to New-India. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our
            application.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <h3 className="text-xl font-semibold mb-2">
            2.1 Information You Provide
          </h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Petition content and related information</li>
            <li>Communication data</li>
            <li>Location data (pincode)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">
            2.2 Automatically Collected Information
          </h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Device information</li>
            <li>Usage data</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and maintain our petition platform</li>
            <li>To analyze petition trends and improve our service</li>
            <li>To ensure the security and integrity of our platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational security
            measures to protect your information. All petitions are stored
            securely and anonymously.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us through our GitHub repository.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Privacy;
