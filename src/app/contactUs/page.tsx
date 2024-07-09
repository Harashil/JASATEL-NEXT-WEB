"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import PopUp from "../components/contactUs-components/popUp";
import emailjs from "emailjs-com";
import "./Styles/styles.scss";

interface IFormInput {
  nombre: string;
  apellido: string;
  email: string;
  num_celular: string;
  mensaje: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [buttonSend, setButtonSend] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);
  function showPopUp(error: boolean) {
    if (error!) {
      setPopUp(true);
      setTimeout(() => {
        setPopUp(false);
      }, 5000);
    }
    else {
      setErrorPopUp(true);
      setTimeout(() => {
        setErrorPopUp(false);
      }, 5000);
    }
  }
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setButtonSend(true);
    const templateParams = {
      from_name: `${data.nombre} ${data.apellido}`,
      email: data.email,
      phoneNumber: data.num_celular,
      message: data.mensaje,
    };

    emailjs
      .send(
        "service_brdoce4",
        "template_m6vyoih",
        templateParams,
        "zhrO6N5AaYmcAe4BR"
      )
      .then(
        (result) => {
          console.log("mensaje enviado con exito", result.text);
          setButtonSend(false);
          showPopUp(true);
          reset();
        },
        (error) => {
          console.log("ERROR", error.text);
          showPopUp(false);
          setButtonSend(false);
        }
      );
  };

  return (
    <>
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contactos</h2>
          <p>
            Rellena los campos requeridos y envianos un mail con tu consulta.
            <br></br>
            <br></br>
            Dato: El mensaje será enviado directamente a la bandeja de entrada
            como correo anónimo, sin embargo, los datos ingresados en los campos
            se mostrarán en el mensaje.
            <br></br>
            <br></br>
            Contáctanos y descubre cómo podemos hacer la diferencia en tu hogar
            o negocio.
          </p>
          <address>
            <p>
              <img src="/contactUs_images/ic-mail.png"></img>jasatel@jasatel.pe
              / jasatel.ing@gmail.com
            </p>

            <p>
              <img src="/contactUs_images/ic-tel.png"></img>987 768 632 / 957
              533 254
            </p>
          </address>
        </div>
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group name-lastname">
            <section>
              <input
                type="text"
                placeholder="First name"
                {...register("nombre", {
                  required: { value: true, message: "Completa este campo" },
                  minLength: {
                    value: 4,
                    message: "mínimo 4 carácteres",
                  },
                  maxLength: {
                    value: 25,
                    message: "máximo 25 carácteres",
                  },
                })}
              />
              {errors.nombre && <span>{errors.nombre.message}</span>}
            </section>
            <section>
              <input
                type="text"
                placeholder="Last name"
                {...register("apellido", {
                  required: { value: true, message: "Completa este campo" },
                  minLength: {
                    value: 4,
                    message: "mínimo 4 carácteres",
                  },
                  maxLength: {
                    value: 25,
                    message: "máximo 25 carácteres",
                  },
                })}
              />
              {errors.apellido && <span>{errors.apellido.message}</span>}
            </section>
          </div>

          <div className="form-group frm-g-2">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && <span>Completa este campo.</span>}
          </div>

          <div className="form-group frm-g-2">
            <input
              type="tel"
              placeholder="Número de teléfono"
              {...register("num_celular", {
                required: { value: true, message: "Completa este campo." },
                pattern: {
                  value: /^[0-9 ]+$/,
                  message:
                    "Este campo no debe contener letras ni carácteres especiales.",
                },
                minLength: {
                  value: 9,
                  message: "Este campo debe contener almenos 9 dígitos.",
                },
                maxLength: {
                  value: 12,
                  message: "Este campo no debe contener mas de 12 dígitos.",
                },
              })}
            />
            {errors.num_celular && <span>{errors.num_celular.message}</span>}
          </div>

          <div className="form-group frm-g-2">
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              {...register("mensaje", {
                required: { value: true, message: "Completa este campo." },
                minLength: {
                  value: 4,
                  message: "Este campo debe contener como mínimo 4 carácteres",
                },
              })}
            ></textarea>
            {errors.mensaje && <span>{errors.mensaje.message}</span>}
          </div>
          <button
            type="submit"
            className={buttonSend ? "sendClass" : ""}
          >
            {buttonSend ? (
              <img src="/contactUs_images/loading.gif"></img>
            ) : (
              "Enviar"
            )}
          </button>
        </form>
      </div>
      {popUp?<PopUp message="¡Tu mensaje ha sido enviado!" image="/contactUs_images/check.gif"/>:undefined};
      {errorPopUp?<PopUp message="Vaya... parece que ocurrió un error, por favor vuelve a intentarlo mas tarde" image="/contactUs_images/error.gif"/>:undefined};
    </>
  );
};

export default ContactForm;
