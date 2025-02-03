import React from "react";
import "./Lightbox.css";
import { LightboxProps } from "../types";
// Need to explicitly tell the element to accept children.
const Lightbox = ({ children }: LightboxProps) => {
  return <div className="light-box">{children}</div>;
};

export default Lightbox;
