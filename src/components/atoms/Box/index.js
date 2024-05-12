import React from "react";

const Box = ({ as: Element = "div", children, ...rest }) => {
  return <Element {...rest}>{children}</Element>;
};

export default Box;
