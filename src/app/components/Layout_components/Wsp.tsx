"use client"
import { useState, useEffect } from "react";
import React from "react";
import "./Wsp.scss";
import useScrollPosition from "./scrollFunction";

function Wsp() {
  const { scrollPosition, isClient, style } = useScrollPosition();
  const [isCliEnt, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isCliEnt) {
        return null; // O puedes devolver un indicador de carga, como un spinner
    }
   
  return (
    <>
      <button id="Wsp-buttom-id" style={style}>
        <img
          src="/mainPage_images/Wsp_imgs/icon.png"
          style={{ width: "75%", height: "75%", display: "inline" }}
          id="Wsp-icon-id"
        />
        <img
          src="/mainPage_images/Wsp_imgs/close-icon.png"
          id="Wsp_image_icon_2"
        />
      </button>
      <div className="Wsp-container">
        <table id="table-container-id">
          <thead>
            <tr>
              <td style={{ width: "27%" }} id="np_foto">
                <img
                  src="/mainPage_images/Wsp_imgs/1718765999223.jpg"
                  id="Wsp-head-ic1"
                  alt="Foto"
                />
              </td>
              <td style={{ width: "71%" }} id="np_nombre">
                <div id="Wsp-head-ic2">Jose Antonio Soto</div>
                <p id="Wsp-head-ic2-p">Gerente general</p>
              </td>
              <div id="active-icon"></div>
              <td
                id="np_numero"
                style={{ width: "100%", position: "absolute" }}
              >
                <p id="number-icon">987 768 632</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="np_QR" style={{ width: "65%" }}>
                <img
                  src="/mainPage_images/Wsp_imgs/JoseSoto_QR.png"
                  id="QR_image"
                  alt="QR"
                />
              </td>
              <td>
                <img
                  src="/mainPage_images/Wsp_imgs/direccional_icon.png"
                  id="Wsp-body-ic2"
                  alt="Icono"
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ width: "100%", padding: "4px" }}>
                <a
                  href="https://wa.me/+51987768632"
                  target="_blank"
                  style={{ border: "none", textDecoration: "none" }} // Asegúrate de incluir el estilo para evitar subrayado del enlace
                  id="enlace_Wsp"
                >
                  <button id="Wsp-abrir-chat">Abrir chat</button>
                </a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default Wsp;
