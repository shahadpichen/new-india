import React from "react";
import Header from "../components/landing-page/header-component";
import PetitionSubmission from "../components/landing-page/petition-submission";
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
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <p className="text-gray-600">
          NewIndia is a platform for Indians to coordinate online in a{" "}
          <strong>decentralized</strong> and <strong>privacy </strong>{" "}
          preserving manner to build a better democracy. You can{" "}
          <span className="underline">
            {" "}
            sign petitions, participate in surveys, vote in opinion polls, etc.{" "}
          </span>{" "}
          without revealing your identity, yet proving you are an Indian
          resident.
        </p>

        <p className="text-gray-600 mt-8">
          Petitions, surveys, opinion polls are spam proof, anonymous,
          verifiable by anyone, and can be scoped to national, state, or
          pin-code level.
        </p>

        <PetitionSubmission />

        {anonAadhaar?.status === "logged-in" && (
          <>
            {latestProof && (
              <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
            )}
          </>
        )}
        <p className="text-gray-600 mt-14">
          Its powered by{" "}
          <a
            href="https://pse.dev/en/projects/anon-aadhaar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>AnonAadhaar project</strong>
          </a>
          , which uses <strong>Zero Knowledge Proofs </strong> to prove you have
          an Aadhaar and only reveal some information (PIN Code in this case)
          without revealing anything else.
        </p>

        <section className="mt-24 mb-12">
          <Footer />
        </section>
      </div>
    </main>
  );
}

export default Home;
