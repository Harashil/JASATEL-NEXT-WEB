"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
  } = useForm<IFormInput>();
  console.log(errors);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
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
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Contactos</h2>
        <p>
        Estamos preparados para  para atender tus consultas, resolver tus problemas y 
        ofrecerte las mejores soluciones a medida para tus proyectos eléctricos.<br></br>
        Contáctanos hoy mismo a través de nuestro 
        formulario de contacto y descubre cómo podemos hacer 
        la diferencia en tu hogar o negocio.
         
        </p>
        <address>
          <p>
            jasatel@jasatel.pe
            <br />
            jasatel.ing@gmail.com
          </p>
          <p>987 768 632 / 957 533 254</p>
          
        </address>
      </div>
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group name-lastname">
          <section>
            <input
              type="text"
              placeholder="First name"
              {...register("nombre", {
                required: { value: true, message: "Completa este campo." },
                minLength: {
                  value: 2,
                  message: "Este campo debe contener como mínimo 2 carácteres",
                },
                maxLength: {
                  value: 25,
                  message: "Este campo no debe contener mas de 25 carácteres",
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
                required: { value: true, message: "Completa este campo." },
                minLength: {
                  value: 2,
                  message: "Este campo debe contener como mínimo 2 carácteres",
                },
                maxLength: {
                  value: 25,
                  message: "Este campo no debe contener mas de 25 carácteres",
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
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ContactForm;
