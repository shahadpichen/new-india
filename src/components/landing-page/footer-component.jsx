import React from "react";

function Footer() {
  return (
    <footer className="text-center text-gray-600 mt-24 mb-12">
      <p>
        &copy; Anon-Petition - Submit petitions, support change, and amplify
        your voice securely and anonymously.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <a href="/privacy" className="text-blue-600 hover:underline text-sm">
          Privacy Policy
        </a>
        <a href="/terms" className="text-blue-600 hover:underline text-sm">
          Terms of Service
        </a>
        <a href="/report" className="text-blue-600 hover:underline text-sm">
          Report Issues
        </a>
      </div>
    </footer>
  );
}

export default Footer;
