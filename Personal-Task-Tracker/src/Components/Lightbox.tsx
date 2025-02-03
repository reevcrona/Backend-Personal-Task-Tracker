import "./Lightbox.css";
import { LightboxProps } from "../types";

const Lightbox = ({ children }: LightboxProps) => {
  return <div className="light-box">{children}</div>;
};

export default Lightbox;
