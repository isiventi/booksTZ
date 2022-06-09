import React from "react";
import cn from "classnames";

export const Button = ({ className, children, ...rest }) => (
  <button {...rest} className={cn("btn", className)}>
    {children}
  </button>
);
