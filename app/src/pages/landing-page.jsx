import React from "react";
import Header from "../components/landing-page/header-component";
import PetitionSubmission from "../components/landing-page/petition-submission";
import HowItWorks from "../components/landing-page/how-it-works";
import WhyUseSection from "../components/landing-page/why-use-section";
import Footer from "../components/landing-page/footer-component";

function Home() {
  return (
    <main className="container mx-auto px-4 flex-grow text-black plus-jakarta-sans-uniquifier">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <PetitionSubmission />
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
