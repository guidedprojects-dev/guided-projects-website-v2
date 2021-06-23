import React from "react";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/layout";

function SiteLayout({ children }) {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
}

export default SiteLayout;
