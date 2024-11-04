import React from "react";

function HowItWorks() {
  return (
    <section className="mt-24">
      <h2 className="text-2xl font-semibold mb-4">How Anon-Petition Works</h2>

      <div className="flex flex-wrap mb-6 gap-2">
        <div className="capitalize">
          <a
            href="https://pse.dev/en/projects/anon-aadhaar"
            className="text-blue-600 hover:underline font-semibold"
          >
            Anon Aadhaar
          </a>
          : Ensure your petition is from a verified Indian citizen while
          maintaining your privacy.
        </div>
        <div className="capitalize">
          <span className="font-semibold">Anonymous Petition Submission:</span>{" "}
          Submit your petition with complete anonymity.
        </div>
        <div className="capitalize">
          <span className="font-semibold">Anonymous Upvoting:</span> Support
          petitions you resonate with while keeping your identity hidden.
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
