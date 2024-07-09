"use client";
import React, { useState, useEffect } from 'react';

interface Props {
  targetNumber: number;
  duration: number;
}

const Counter: React.FC<Props> = ({ targetNumber, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = targetNumber;
    const incrementTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => {
      clearInterval(timer);
    };
  }, [targetNumber, duration]);

  return <h1 id="section2_h1">+{count}</h1>;
};

export default Counter;
