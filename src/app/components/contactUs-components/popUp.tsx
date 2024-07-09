import React from "react";
import "./popUp.scss";

interface popUpProps {
  message: string;
  image: string;
}
const PopUp: React.FC<popUpProps> = ({ message, image }) => {
  return (
    <div className="popUp-window">
      <img src={image} />
      {message}
    </div>
  );
};

export default PopUp;
