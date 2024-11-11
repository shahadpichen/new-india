import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-center text-gray-600 mt-24 mb-12">
      <p>
        &copy; NewIndia - A platform for Indians to build a better democracy.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Link to="/privacy" className="text-blue-600 hover:underline text-sm">
          Privacy Policy
        </Link>
        <Link to="/terms" className="text-blue-600 hover:underline text-sm">
          Terms of Service
        </Link>
        {/* <a href="/report" className="text-blue-600 hover:underline text-sm">
          Report Issues
        </a> */}
      </div>
    </footer>
  );
}

export default Footer;
