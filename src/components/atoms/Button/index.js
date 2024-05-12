import React from "react";

import "./styles.scss";

function Button({ text, className, width, ...res }) {
  return (
    <button
      className={`btn-${className}`}
      style={{ width: `${width}px` }}
      {...res}
    >
      {text}
    </button>
  );
}

export default Button;
