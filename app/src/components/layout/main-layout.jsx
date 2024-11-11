import React from "react";
import Header from "./header";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
