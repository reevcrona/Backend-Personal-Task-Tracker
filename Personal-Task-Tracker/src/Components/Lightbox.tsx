import "./Lightbox.css";
import { LightboxProps } from "../types";

const Lightbox = ({ children }: LightboxProps) => {
  return (
    <div className="fixed left-0 top-0 z-40 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-80">
      {children}
    </div>
  );
};

export default Lightbox;
