import React from "react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center my-16">
      <h1
        className="text-center text-2xl font-semibold cursor-pointer"
        onClick={() => navigate("/")}
        style={{
          WebkitTextFillColor: "#FFFFFF",
          WebkitTextStrokeWidth: "1px",
          WebkitTextStrokeColor: "#000",
        }}
      >
        New-India
      </h1>
      <div
        className="flex justify-center items-center gap-2 cursor-pointer font-semibold"
        onClick={() =>
          window.open("https://github.com/shahadpichen/new-india", "_blank")
        }
      >
        <FaGithub className="size-7" />
        View on GitHub
      </div>
    </header>
  );
}

export default Header;
