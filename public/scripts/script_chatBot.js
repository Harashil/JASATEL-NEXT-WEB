import {
  abrirVentana,
  showUserMessage,
  showBotMessage,
  cerrarVentana,
} from "./funciones.js";
import { respuestas, section_bloquePA } from "./funciones.js";
//------CONTACTOS------
import { modificarAbrirChat_Wsp } from "./funciones.js";
import { modificarContenido } from "./funciones.js";

let Typing = document.getElementById("Ch_input_box");
const totalBox = document.querySelector(".chatBox_content");
const iconoBot = document.getElementById("chatBot-icon-id");
let image_icon_1 = document.getElementById("image_icon_1");
let image_icon_2 = document.getElementById("image_icon_2");
const chatBot_Container = document.getElementById("chatBot-container-id");
const seccion_intro = document.getElementById("intro_section");
const header = document.querySelector(".chatBox_header");
const bloque_PA = document.querySelectorAll(".alternative_questions");

let BotEstaAbierta = false;
let WspEstaAbierta = false; // Variable para controlar el estado de la ventana

/////////////////////////////////////////////////////////////////////////////
//////////   C A R G A R   C O N T E N I D O   D E L   D O M    ////////////
///////////////////////////////////////////////////////////////////////////

console.log("DOM fully loaded and parsed");
//////////////////////JAVASCRIPT DEL CHATBOT///////////////////////////
//ICONO PARA CERRAR-ABRIR EL CHATBOT
iconoBot.addEventListener("click", () => {
  if (BotEstaAbierta === false) {
    abrirVentana(chatBot_Container, image_icon_1, image_icon_2);
    iconoBot.style.animation = "none";
    iconoBot.style.transform = "scale(0.8)";
    BotEstaAbierta = true;
  } else {
    cerrarVentana(chatBot_Container, image_icon_1, image_icon_2);
    iconoBot.style.animation = "levitating 2.8s ease infinite";
    BotEstaAbierta = false;
  }
});

//SCROLL DE LA INTRO
totalBox.addEventListener("scroll", function () {
  if (totalBox.scrollTop !== 0) {
    seccion_intro.style.animation = "introScrollAnimation 0.5s ease-in";
    if (seccion_intro.style.display !== "none") {
      section_bloquePA.style.animation = "introScrollAnimation 0.5s ease";
      setTimeout(function () {
        section_bloquePA.style.display = "none";
      }, 500);
    }
    header.style.display = "block";
    setTimeout(function () {
      seccion_intro.style.display = "none";
    }, 500);
    setTimeout(function () {
      header.style.animation = "none";
    }, 1200);
    totalBox.style.height = "79.5%";
    totalBox.style.marginTop = "0px";
    chatBot_Container.style.backgroundImage = "url('/mainPage_images/Bot_imgs/background.png')";
    chatBot_Container.style.backgroundSize = "cover";
  }
});
bloque_PA.forEach(function (boton) {
  boton.onclick = function () {
    let bloqueTextContent = this.textContent;
    let respuesta = respuestas[parseInt(this.id)];
    let delay = 2000;
    let userMessage = showUserMessage(totalBox, bloqueTextContent);
    if (seccion_intro.style.display !== "none") {
      userMessage.style.animation = "headerScrollAnimation 1.5s ease";
      delay = 2000;
    }
    setTimeout(function () {
      showBotMessage(totalBox, respuesta);
      section_bloquePA.style.display = "none";
    }, delay);
  };
});

function sendMessage() {
  //AÑADENDO MENSAJE DEL USUARIO AL DOM
  if (Typing.value.trim() === "") return;
  //Funcion importada:
  let typing = Typing.value;

  let userMessage = showUserMessage(totalBox, typing);
  console.log(typing);
  let pregunta = { pregunta: typing };

  //OBTENIENDO LA RESPUESTA DE LA API
  console.log(userMessage);
  console.log(userMessage.textContent);
  if (userMessage.textContent !== "") {
    fetch("http://localhost:8000/Logica_bot'", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido como JSON
      },
      body: JSON.stringify(pregunta), // Convierte los datos a formato JSON y los envía en el cuerpo de la solicitud
    })
      .then((response) => response.json())

      .then((data) => {
        //AÑADENDO MENSAJE DEL BOT AL DOM
        console.log(data);
        setTimeout(function () {
          //Funcion importada:
          showBotMessage(totalBox, data.respuesta);
        }, 0);
      })
      .catch((error) => error);

    Typing.value = "";
  }
}

//APLICANDO FUNCION DE TECLA ENTER y SEND BUTTOM
document
  .getElementById("Ch_send_buttom")
  .addEventListener("click", sendMessage);
document
  .getElementById("Ch_input_box")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Si se presiona Enter (código 13)
      event.preventDefault(); // Prevenir el comportamiento predeterminado de Enter (salto de línea)
      sendMessage(); // Llamar a la función para enviar el mensaje
    }
  });

/*
 *==================================================================
 *==================JAVASCRIPT DEL ICONO DE WHATSAPP====================
 */
const Wsp_buttom = document.getElementById("Wsp-buttom-id");
const Wsp_container = document.querySelector(".Wsp-container");
let Wsp_icon1 = document.getElementById("Wsp-icon-id");
let Wsp_icon_exit = document.getElementById("Wsp_image_icon_2");
let cambiar_contacto = document.getElementById("Wsp-body-ic2");

//ICONO PARA CERRAR-ABRIR EL WHATSAPP
Wsp_buttom.addEventListener("click", () => {
  if (WspEstaAbierta === false) {
    abrirVentana(Wsp_container, Wsp_icon1, Wsp_icon_exit);
    Wsp_buttom.style.animation = "none";
    Wsp_buttom.style.transform = "scale(0.8)";
    Wsp_buttom.style.backgroundColor = "rgb(23, 23, 23)";
    Wsp_buttom.style.bottom = "0px";
    WspEstaAbierta = true;
  } else {
    cerrarVentana(Wsp_container, Wsp_icon1, Wsp_icon_exit);
    Wsp_buttom.style.animation = "levitating 3s ease infinite";
    Wsp_buttom.style.bottom = "15px";
    Wsp_buttom.style.backgroundColor = "rgb(237, 233, 233)";
    WspEstaAbierta = false;
  }
});

var indiceFijo = 0;

// -----CARRUSEL DE CONTACTOS ----
cambiar_contacto.addEventListener("click", function () {
  modificarContenido(indiceFijo);
  console.log(indiceFijo);
  switch (indiceFijo) {
    case 0:
      modificarAbrirChat_Wsp(
        "https://wa.me/+51901350732",
        "coloring1 0.4s ease",
        "rgb(7, 107, 124)"
      );
      break;
    case 1:
      modificarAbrirChat_Wsp(
        "https://wa.me/+51926464881",
        "coloring2 0.4s ease",
        "rgb(14, 112, 63)"
      );
      break;
    case 2:
      modificarAbrirChat_Wsp(
        "https://wa.me/+51987768632",
        "coloring3 0.4s ease",
        "rgb(3, 104, 89)"
      );
      break;
  }
  indiceFijo++;
  if (indiceFijo >= 3) {
    indiceFijo = 0;
  }
});
