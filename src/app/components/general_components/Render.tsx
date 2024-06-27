"use client";
import React, { useEffect, useRef, useState } from 'react';

interface RenderizatorProps {
    children: React.ReactNode;
}

const Renderizator:React.FC<RenderizatorProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        root: null, // Use the viewport as the container
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div ref={targetRef}>
        {isVisible ? children : ''}
      </div>
    </div>
  );
};

export default Renderizator;





