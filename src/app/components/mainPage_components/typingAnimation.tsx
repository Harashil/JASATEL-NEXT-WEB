"use client";
import React from "react";
import { ReactTyped } from "react-typed";

interface TypingTextProps {
    content: string;
    loop: boolean;
    typeSpeed?: number;
    backSpeed?: number;
    delay?: number;
    cursor?:string;
}

const TypingText: React.FC<TypingTextProps> = ({ content, loop, typeSpeed = 10, backSpeed = 40, delay=0, cursor="|"}) => {
    return <ReactTyped strings={[content]} typeSpeed={typeSpeed} backSpeed={backSpeed}  loop={loop} startDelay={delay} cursorChar={cursor}/>;
};

export default TypingText;
