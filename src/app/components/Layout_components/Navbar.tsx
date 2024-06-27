"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import useScrollPosition from "./scrollFunction";
const Navbar = () => {
  const { scrollPosition, isClient } = useScrollPosition();

  return (
    <nav className={`mainNav ${isClient && scrollPosition > window.innerHeight * 0.5 ? "dark_mainNav" : ""}`}>
      <NavbarTemplate />
    </nav>
  );
};

export default Navbar;

const NavbarTemplate = () => {
  return (
    <>
      <div className="div_nav_logo">
        <Image
          alt="Jasatel, logo de la empresa de servicios electricos"
          width={170}
          height={0}
          src="/main_layout_images/logo.png"
          className="nav_logo"
        ></Image>
      </div>
      <ul className="ul_navButtons">
        <li>
          <Link href="../">
            <Nav_button content="Home" />
          </Link>
        </li>
        <li>
          <Link href="./ourServices">
            <Nav_button content="Servicios" />
          </Link>
        </li>
        <li>
          <Link href="./contactUs">
            <Nav_button content="Contactanos" />
          </Link>
        </li>
      </ul>
    </>
  );
};

//BUTTONS

interface Props {
  content: string;
}
const Nav_button: React.FC<Props> = ({ content }) => (
  <button className="nav_buttom">
    {content}
    <div id="underline"></div>
  </button>
);

