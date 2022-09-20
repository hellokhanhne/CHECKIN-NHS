import React, { memo } from "react";

const AdminWrappter = ({ children }) => {
  console.log("re-render");
  return <div className="user-manage-wrapper">{children}</div>;
};

export default memo(AdminWrappter);
