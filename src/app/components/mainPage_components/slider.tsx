"use client";
// src/components/InfiniteImageSlider.tsx
import React from 'react';
import './slider.scss';

interface InfiniteImageSliderProps {
  images: string[];
}

const InfiniteImageSlider: React.FC<InfiniteImageSliderProps> = ({ images }) => {
  return <>
    <div className="slider-wrapper"></div>
      <div className="slider">
        {images.concat(images).map((image, index) => (
          
          <div className="slider-item" key={index}>
            <img src={image} alt={`Slider item ${index}`} />
          </div>
        ))}
      </div>
      </>
};

export default InfiniteImageSlider;

