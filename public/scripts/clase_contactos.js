//NODOS PADRE
export const NP_FOTO= document.getElementById('np_foto')
export const NP_NOMBRE= document.getElementById('np_nombre')
export const NP_NUMERO= document.getElementById('np_numero')
export const NP_QR= document.getElementById('np_QR')
//export const NP_CARGO= document.getElementById('')

//CONTACTO 0
let foto_contacto = document.getElementById("Wsp-head-ic1");
let nombre_contacto= document.getElementById("Wsp-head-ic2");
let numero_contacto= document.getElementById("number-icon");
let imagen_QR = document.getElementById("QR_image");
let cargo = document.getElementById("Wsp-head-ic2-p");


//CONTACTO 1
let foto_contacto1 = document.getElementById("Wsp-head-ic1");
let nombre_contacto1= document.getElementById("Wsp-head-ic2");
let numero_contacto1= document.getElementById("number-icon");
let imagen_QR1 = document.getElementById("QR_image");
let cargo1 = document.getElementById("Wsp-head-ic2-p");


//CONTACTO 2
let foto_contacto2 = document.getElementById("Wsp-head-ic1");
let nombre_contacto2= document.getElementById("Wsp-head-ic2");
let numero_contacto2= document.getElementById("number-icon");
let imagen_QR2 = document.getElementById("QR_image");
let cargo2 = document.getElementById("Wsp-head-ic2-p");

class Contacto{
    constructor(foto, nombre, numero, imagen_QR, cargo ){
        this.foto=foto;
        this.nombre=nombre;
        this.numero=numero;
        this.imagen_QR=imagen_QR;
        this.cargo=cargo
    }
}

let contacto= new Contacto(foto_contacto, nombre_contacto, numero_contacto, imagen_QR, cargo )
let contacto1= new Contacto(foto_contacto1, nombre_contacto1, numero_contacto1,imagen_QR1, cargo1 )
let contacto2= new Contacto(foto_contacto2, nombre_contacto2, numero_contacto2, imagen_QR2, cargo2 )

 export let contactos=[[contacto.foto, contacto.nombre,contacto.numero,contacto.imagen_QR, contacto.cargo],
          [contacto1.foto, contacto1.nombre, contacto1.numero, contacto1.imagen_QR, contacto1.cargo],
          [contacto2.foto, contacto2.nombre, contacto2.numero, contacto2.imagen_QR, contacto2.cargo]]

 export let contenido_contactos=[['../wsp_pictures/foto2.png','Harashil Burgos','901 350 732','../wsp_pictures/QR_prueba.png','Practicante'],
                                ['../wsp_pictures/foto3.png','Fulano Tal','926 464 881','../wsp_pictures/QR_prueba3.png','Practicante 2'],
                                ['/mainPage_images/Wsp_imgs/1718765999223.jpg','Jose Antonio Soto','987 768 632','/mainPage_images/Wsp_imgs/JoseSoto_QR.png','Gerente general']]

          
