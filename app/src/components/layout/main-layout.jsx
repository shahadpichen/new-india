import React from "react";
import Header from "./header";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
