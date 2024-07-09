import React from "react";
import "./popUp.scss";

interface popUpProps {
  message: string;
  image: string;
  errorClass?: string;
}
const PopUp: React.FC<popUpProps> = ({ message, image, errorClass }) => {
  return (
    <div className="popUp-window-fond">
      <div className={`popUp-window ${errorClass}`}>
        <img src={image} />
        {message}
      </div>
    </div>
  );
};

export default PopUp;
