import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (
      path === "/petitions/india" &&
      location.pathname.startsWith("/petitions")
    ) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <header className="flex items-center border-b h-[7vh] px-8 bg-white">
      <nav className="flex w-full justify-between items-center">
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          NewIndia
        </div>

        <div className="flex gap-8">
          <div
            className={`cursor-pointer transition-colors ${
              isActive("/petitions/india")
                ? "text-orange-600 font-medium"
                : "text-gray-600 hover:text-orange-600"
            }`}
            onClick={() => navigate("/petitions/india")}
          >
            Petitions
          </div>
          <div
            className={`cursor-pointer transition-colors ${
              isActive("/vote")
                ? "text-orange-600 font-medium"
                : "text-gray-600 "
            }`}
            onClick={() => navigate("/vote")}
          >
            Vote
          </div>
          <div
            className={`cursor-pointer transition-colors ${
              isActive("/surveys")
                ? "text-orange-600 font-medium"
                : "text-gray-600 "
            }`}
            onClick={() => navigate("/surveys")}
          >
            Surveys
          </div>
        </div>

        <div>
          <a
            href="https://github.com/shahadpichen/new-india"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="size-6" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
