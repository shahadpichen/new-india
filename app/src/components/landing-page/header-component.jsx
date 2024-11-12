import React from "react";
import { FaGithub } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center my-16">
      <h1
        className="text-center text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        NewIndia
      </h1>
      <div className="flex gap-2">
        <Link
          to="/how-it-works"
          className="flex justify-center items-center gap-2 cursor-pointer hover:underline"
        >
          How It Works
        </Link>
        <div
          className="flex justify-center items-center gap-2 cursor-pointer hover:underline"
          onClick={() =>
            window.open("https://github.com/shahadpichen/new-india", "_blank")
          }
        >
          Github
        </div>
      </div>
    </header>
  );
}

export default Header;
