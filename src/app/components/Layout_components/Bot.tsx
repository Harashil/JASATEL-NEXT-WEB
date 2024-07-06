"use client";
import "./Bot.scss";
import React, { useState, useEffect } from "react";
import useScrollPosition from "./scrollFunction";

function Bot() {
  const { scrollPosition, isClient, style } = useScrollPosition();
  return (
    <>
      <button id="chatBot-icon-id" style={style}>
        <img src="/mainPage_images/Bot_imgs/close-icon.png" id="image_icon_2" />
        <img src="/mainPage_images/Bot_imgs/icon.png" id="image_icon_1" />
      </button>
      <section className="chatBot-container" id="chatBot-container-id">
        <div className="chatBox_header">
          <nav id="header_nav">
            <li id="bot_icon">
              <img
                src="/mainPage_images/Bot_imgs/littleBot2.png"
                id="bot_icon_img"
              ></img>
            </li>
            <li id="bot_name">
              <h1>JS - ROBOTIN</h1>
            </li>
          </nav>
        </div>

        <div className="chatBox_content">
          <section id="intro_section">
            <img src="/mainPage_images/Bot_imgs/littleBot.gif" id="body_Bot" />

            <p className="aclarationMessage">
              Soy tu asistente y guía virtual en tu viaje por nuestra web...
            </p>
            <p className="aclarationMessage">
              Aclaramos tus consultas específicas
              <br />
              (preguntar respecto a nosotros)
            </p>

            <p id="frequent_questions">
              Preguntas frecuentes que hacen nuestros usuarios:
            </p>
          </section>
          <section id="section_alternative_questions">
            <div className="div_alternative_questions">
              <div className="viñeta">
                <img src="/mainPage_images/Bot_imgs/indicator.png" height="100%" />
              </div>
              <button className="alternative_questions" id="0">
                ¿Que servicios ofrecen?
              </button>
            </div>
            <div className="div_alternative_questions">
              <div className="viñeta">
                <img src="/mainPage_images/Bot_imgs/indicator.png" height="100%" />
              </div>
              <button className="alternative_questions" id="1">
                ¿A que partes del Perú llegan?
              </button>
            </div>
            <div className="div_alternative_questions">
              <div className="viñeta">
                <img src="/mainPage_images/Bot_imgs/indicator.png" height="100%" />
              </div>
              <button className="alternative_questions" id="2">
                ¿Como puedo contactarlos?
              </button>{" "}
            </div>
            <div className="div_alternative_questions">
              <div className="viñeta">
                <img src="/mainPage_images/Bot_imgs/indicator.png" height="100%" />
              </div>
              <button className="alternative_questions" id="3">
                ¿Realizan visitas técnicas?
              </button>
            </div>
            <div className="div_alternative_questions">
              <div className="viñeta">
                <img src="/mainPage_images/Bot_imgs/indicator.png" height="100%" />
              </div>
              <button className="alternative_questions" id="4">
                ¿Cual es el precio por su servicio?
              </button>{" "}
            </div>
          </section>
        </div>
        <div className="chatBox_footer">
          <nav id="footer_nav">
            <textarea
              id="Ch_input_box"
              placeholder="Escribe tu consulta específica aquí..."
            ></textarea>
            <button id="Ch_send_buttom">
              <img
                src="/mainPage_images/Bot_imgs/sendButton.png"
              ></img>
            </button>
          </nav>
        </div>
      </section>
    </>
  );
}

export default Bot;
