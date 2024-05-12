import React from "react";
import "./styles.scss";

const Typography = ({ variant, children }) => {
  const Tag = variant || "p";

  return <Tag className={`typography ${variant}`}>{children}</Tag>;
};

export default Typography;
