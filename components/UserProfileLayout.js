import React from "react";
import SiteLayout from "./SiteLayout";

function UserProfileLayout({ children }) {
  return (
    <SiteLayout>
      <div>{children}</div>
    </SiteLayout>
  );
}

export default UserProfileLayout;
