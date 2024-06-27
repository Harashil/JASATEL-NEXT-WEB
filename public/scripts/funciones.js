

// FUNCION ABRIR-CERRAR VENTANA
export function abrirVentana(container, icono_inicial, icono_salida) {
      icono_inicial.style.animation='desappear 0.15s ease-in';
      setTimeout(function(){
        icono_inicial.style.display='none';
        icono_salida.style.display='inline';
        icono_salida.style.animation="appear2 0.5s ease"
        container.style.display = 'block';
      },120)
}
export function cerrarVentana(container,icono_inicial, icono_salida) {
      icono_salida.style.animation='desappear 0.15s ease-out';
      setTimeout(function(){
        icono_salida.style.display='none';
        icono_inicial.style.display='inline';
        icono_inicial.style.animation="appear2 0.4s ease-out";
        container.style.display = 'none';
      },120)
    }


// WHATSAPP - FUNCION MODIFICAR BOTON DE ABRIR CHAT
let Wsp_button_abrirChat= document.getElementById('Wsp-abrir-chat')
let enlace_WSp= document.getElementById("enlace_Wsp");

export function modificarAbrirChat_Wsp(link, coloreado, color_fondo){
  enlace_WSp.href= link   
      Wsp_button_abrirChat.style.animation=coloreado
      setTimeout(function(){
      Wsp_button_abrirChat.style.backgroundColor=color_fondo
    }, 350)
}


// WHATSAPP - FUNCION CARRUSEL DE CONTACTOS
import {contactos} from './clase_contactos.js'
import { contenido_contactos } from "./clase_contactos.js";
import {NP_FOTO, NP_NOMBRE, NP_NUMERO, NP_QR} from './clase_contactos.js'
let foto_contacto = document.getElementById("Wsp-head-ic1");
let nombre_contacto= document.getElementById("Wsp-head-ic2");
let numero_contacto= document.getElementById("number-icon");
let imagen_QR = document.getElementById("QR_image");
let cargo = document.getElementById("Wsp-head-ic2-p");

export function modificarContenido(indiceFijo){
  /*console.log(NP_FOTO.childNodes);
  console.log(NP_NOMBRE.childNodes);
  console.log(NP_NUMERO.childNodes);
  console.log(NP_QR.childNodes);*/
  console.log(cargo.parentNode)
  console.log(NP_NOMBRE.childNodes)
  console.log(nombre_contacto)
  console.log(cargo)
  NP_FOTO.replaceChild(contactos[indiceFijo][0], foto_contacto);
  contactos[indiceFijo][0].src= contenido_contactos[indiceFijo][0];
  foto_contacto.style.animation='beat 0.8s ease'

  NP_NOMBRE.replaceChild(contactos[indiceFijo][1], nombre_contacto);
  contactos[indiceFijo][1].textContent= contenido_contactos[indiceFijo][1];
  nombre_contacto.style.animation='up_slider 0.5s ease'

  NP_NUMERO.replaceChild(contactos[indiceFijo][2], numero_contacto);
  contactos[indiceFijo][2].textContent= contenido_contactos[indiceFijo][2];
  numero_contacto.style.animation='semi_slider 0.7s ease-out'

  NP_QR.replaceChild(contactos[indiceFijo][3], imagen_QR);
  contactos[indiceFijo][3].src= contenido_contactos[indiceFijo][3];
  imagen_QR.style.animation='slider 0.5s ease'

  NP_NOMBRE.replaceChild(contactos[indiceFijo][4], cargo);
  contactos[indiceFijo][4].textContent= contenido_contactos[indiceFijo][4];
  cargo.style.animation='up_slider 0.4s ease'; 
}

//FUNCIONES PARA MOSTRAR MENSAJE EN EL DOM

//SCROLL AUTOMATICO
  // Función para desplazarse automáticamente hacia abajo en el contenedor de chat
  function scrollChatToBottom(totalBox) {
    totalBox.scrollTop = totalBox.scrollHeight;
  };

  export const section_bloquePA=document.getElementById('section_alternative_questions')
  const rewatchPA= document.createElement('img')
  rewatchPA.id="rewatchPA_id"
  rewatchPA.src='/mainPage_images/Bot_imgs/rewatchPA_icon.png'
  rewatchPA.style.display='none';

  

export function showUserMessage(totalBox, typing){
  var chatBoxUser= document.createElement('div');
  var userMessage = document.createElement("p");
  chatBoxUser.className= "user_content"
  totalBox.appendChild(chatBoxUser);
  userMessage.id = "question_id";
  userMessage.textContent = typing;
  chatBoxUser.appendChild(userMessage);
  scrollChatToBottom(totalBox)
  return userMessage
}
export function showBotMessage(totalBox, response){
  var chBoxBot = document.createElement("div");
  chBoxBot.className = "bot_content";
  totalBox.appendChild(chBoxBot);
  var botMessage = document.createElement("p");
  botMessage.id = "answer_id";
  botMessage.innerHTML = response.replace(/\n/g, "<br>");
  chBoxBot.appendChild(botMessage);
  chBoxBot.appendChild(rewatchPA);
  //Creando iconito para ver preguntas alternativas
  rewatchPA.style.display='block'
  section_bloquePA.style.animation='appear 1s ease'
  rewatchPA.onclick=function(){
    totalBox.appendChild(section_bloquePA)
    
    section_bloquePA.style.display='block';
    scrollChatToBottom(totalBox)
    rewatchPA.style.display='none'
  }
  scrollChatToBottom(totalBox)
  
}

//FUNCIONES DE LAS PREGUNTAS ALTERNATIVA
export const respuestas=
['Ofrecemos servicios de electricidad para todo público, estos servicios incluyen \n*Servicio de cableado\n *Servicio 2\n *Servicio 3\n *Servicio 4\n *Servicio 5',
'respuesta1',
'respuesta2',
'respuesta3',
'respuesta4']

const sendButtom= document.getElementById('Ch_send_buttom')



    
 



  


