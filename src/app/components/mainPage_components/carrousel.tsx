"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Suponiendo que estás usando Next.js
import "./carousel.scss";
interface CarouselProps {
  carouselText: { title: string; content: string }[];
  images: string[];
  className: string;
  idContent: string;
  indexColor: string;
}

const Carousel: React.FC<CarouselProps> = ({
  carouselText,
  images,
  className,
  idContent,
  indexColor
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia la diapositiva cada 3 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number): void => {
    setActiveIndex(index);
  };

  //CONDICIONALES PARA LA IMAGEN
  const dinamicImage = (index: number) => {
    if (index === activeIndex) {
      if (carouselText[index].title === "") {
        return "opacity-100";
      } else {
        switch (index) {
          case 0:
            return "image1_transition";
          case 1:
            return "image2_transition";
          case 2:
            return "image3_transition";
          default:
            "opacity-100";
        }
      }
    } else {
      return "opacity-0";
    }
  };

  //CONDICIONALES PARA EL TEXTO
  const width = (index: number) => {
    switch (index) {
      case 1:
        return "80vw";
      case 2:
        return "30vw";
    }
  };
  const fontSize = (index: number) => {
    switch (index) {
      case 2:
        return "5vw";
    }
  };

  const title = (index: number) => {
    switch (index) {
      case 2:
        return "title_iluminate_animation";
      default:
        return "title_animation";
    }
  };

  return (
    <>
      <div className={className}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`div_image ${dinamicImage(index)}
            `}
          >
            <img
              id="carousel_image"
              className={
                index === 2 && carouselText[index].title !== ""
                  ? "ilumination_movil_fond"
                  : ""
              }
              src={src}
              alt="..."
            />
          </div>
        ))}

        <div className="div_indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`circle ${
                index === activeIndex ? `bg-${indexColor}-500` : "bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>

        {carouselText.map((text, index) => (
          <section key={index}>
            <p
              id="carousel_title"
              className={index === activeIndex ? title(index) : "opacity-0"}
              style={{ width: width(index), fontSize: fontSize(index) }}
            >
              {text.title}
            </p>
            <p
              id={
                index === 2 && carouselText[index].title !== ""
                  ? "ilumination_title2"
                  : idContent
              }
              className={
                index === activeIndex
                  ? index === 2 && carouselText[index].title !== ""
                    ? "title_iluminate_animation"
                    : "content_animation"
                  : "opacity-0"
              }
            >
              {text.content}
            </p>
          </section>
        ))}
      </div>
    </>
  );
};

export default Carousel;
