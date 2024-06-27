import "./Styles/styles.scss";
import ServiceCard from "../components/ourServices_components/serviceCard";
import indexCard from "./cardList";
import TypingText from "../components/mainPage_components/typingAnimation";
export default function OurServices() {
  const ourServicesText1 =
    "Nos gustaría convertirnos en su socio tecnologico, le brindamos la oprtunidad de conocernos y trabajar juntos. Estamos seguros que quedará satisfecho con nuestros servicios, ya que JASATEL E.I.R.L ha construido una reputación sólida a nivel nacional en todos los sectores de la industria eléctrica, electronica y telecomunicaciones en los que ha trabajado.";

  return (
    <>
      <section className="ourServices_header">
        <img src="/ourServices_images/ourServices_background.png" />
        <div>
          <h3> JASATEL E.I.R.L</h3>
          <h1>Nuestros Servicios</h1>
        </div>
      </section>
      <section className="ourServices_textPresentation">
        <TypingText
          content={ourServicesText1}
          loop={false}
          cursor=""
          typeSpeed={2}
        ></TypingText>
        <br></br>
        <p className="font-bold" id="pepe">
          <TypingText
            content="Contáctanos hoy mismo y descubre cómo podemos ayudarte a mantener tu entorno energizado y seguro."
            loop={false}
            delay={5000}
            typeSpeed={30}
            cursor=""
          ></TypingText>
        </p>
      </section>
      <section className="ourServices_cards">
        {indexCard.map((card, index: number) => (
          <article key={index} className="card_div" id={`card${index}`}>
            <ServiceCard
              title={card.title}
              content={card.content}
              mainImage={card.mainImage}
              listContent={card.listContent}
              iconImage={card.iconImage}
              listImage={card.listImage}
            />
          </article>
        ))}
      </section>
    </>
  );
}
