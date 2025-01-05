import React from "react";
import Navbar from "../components/Navbar";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="h-screen overflow-scroll">{children}</main>
    </>
  );
};

export default Layout;
