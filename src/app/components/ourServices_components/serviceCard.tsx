"use client";

import React, { ReactNode } from "react";
import { useState } from "react";

interface ServiceCardProps {
  title: string;
  mainImage: string;
  content: string;
  listContent: string[];
  listImage: string[];
  iconImage: string;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  mainImage,
  content,
  listContent,
  listImage,
  iconImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [index, setIndex] = useState(0);

  const handleMouseEnter = (index: number = 0) => {
    setIsHovered(true);
    setIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const backgroundCardHover = `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.87)), url(${mainImage})`;
  const styles = {
    background: backgroundCardHover,
  };

  //OPERACIONES CON LA LISTA DE IMAGENES
  function indexImage(index: number) {
    return listImage[index];
  }
  return (
    <section
      className={`serviceCard ${isHovered ? "hover_serviceCard" : ""}`}
      style={isHovered ? styles : undefined}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={handleMouseLeave}
    >
      <div className="row_1">
        <img
          src={isHovered ? listImage[index] : mainImage}
          alt="mainImage"
          className="mainImage"
        />
      </div>
      <div className="row_2">
        <div className="serviceCard_content">
          {isHovered ? (
            <ul>
              {listContent.map((item, index) => (
                <li key={index} onMouseEnter={() => handleMouseEnter(index)}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            `${content}`
          )}
        </div>
      </div>
      <div className="row_3">
        <h1 className="serviceCard_title">{title}</h1>
      </div>
      <div className="serviceCard_icon">
        <img src={iconImage} />
      </div>
    </section>
  );
};
export default ServiceCard;
