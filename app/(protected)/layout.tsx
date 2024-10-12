import React from "react";
import Navbar from "../_components/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-28">{children}</div>
    </div>
  );
};

export default layout;
