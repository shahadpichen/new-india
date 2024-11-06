import React from "react";
import Header from "../components/landing-page/header-component";
import PetitionSubmission from "../components/landing-page/petition-submission";
import HowItWorks from "../components/landing-page/how-it-works";
import WhyUseSection from "../components/landing-page/why-use-section";
import Footer from "../components/landing-page/footer-component";
import {
  AnonAadhaarProof,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";

function Home() {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();

  return (
    <main className="container mx-auto px-4 flex-grow text-black plus-jakarta-sans-uniquifier">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <PetitionSubmission />
        {anonAadhaar?.status === "logged-in" && (
          <>
            {latestProof && (
              <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
            )}
          </>
        )}
        <p className="text-gray-600 mt-8">
          Share your concerns without revealing your identity. We use Anon
          Aadhaar to ensure that petitions are from Indian citizens only,
          safeguarding your privacy while ensuring authenticity.
        </p>

        <HowItWorks />
        <WhyUseSection />
        <section className="mt-24 mb-12">
          <Footer />
        </section>
      </div>
    </main>
  );
}

export default Home;
