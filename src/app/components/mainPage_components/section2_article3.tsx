import React from "react";
import './section2_article3_styles.scss';
import Counter from "./+15";
import Renderizator  from "../general_components/Render";
const Article3 = () => {
  return (
    <article className="mainPage_article" id="article3">
      <img src="/mainPage_images/section2_imgs/gear_background.png" id="gear_background"></img>
      <img
        src="/mainPage_images/section2_imgs/article3_img1.png"
        className="section2_Image"
        id="section2_firstImage"
      ></img>
      <img
        src="/mainPage_images/section2_imgs/article3_img2.png"
        className="section2_Image"
        id="section2_secondImage"
      ></img>
      <Section2_button
        content="Calidad de servicio asegurada"
        className="section2_button1"
      />
      <Renderizator>
      <Section2_button
        content="Años de experiencia"
        className="section2_button2"
        number={<Counter targetNumber={15} duration={1800}/>}
      />
      </Renderizator>
    </article>
  );
};

interface ContentButtonProps {
  content: React.ReactNode;
  number?: React.ReactNode;
  className: string;
}
const Section2_button: React.FC<ContentButtonProps> = ({
  content,
  className,
  number,
}) => {
  return (
    <div className={`section2_button ${className}`}>
      {number && <div>{number}</div>}
      {content}
    </div>
  );
};

export default Article3;
