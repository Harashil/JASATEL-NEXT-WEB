import React from "react";
import './section2_article3_styles.scss';

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
      <Section2_button
        content2="+15"
        content="Años de experiencia"
        className="section2_button2"
        id="section2_h1"
      />
    </article>
  );
};

interface ContentButtonProps {
  content: React.ReactNode;
  content2?: string;
  id?: string;
  className: string;
}
const Section2_button: React.FC<ContentButtonProps> = ({
  content,
  content2,
  id,
  className,
}) => {
  return (
    <div className={`section2_button ${className}`}>
      <h1 id={`${id}`}>{content2}</h1>
      {content}
    </div>
  );
};

export default Article3;
