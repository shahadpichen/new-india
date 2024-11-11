import React from "react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
        <div
          className="flex justify-center items-center gap-2 cursor-pointer hover:underline"
          onClick={() =>
            window.open("https://github.com/shahadpichen/new-india", "_blank")
          }
        >
          How It Works
        </div>
        <div
          className="flex justify-center items-center gap-2 cursor-pointer hover:underline"
          onClick={() =>
            window.open("https://github.com/shahadpichen/new-india", "_blank")
          }
        >
          {/* <FaGithub className="size-7" /> */}
          Github
        </div>
      </div>
    </header>
  );
}

export default Header;
