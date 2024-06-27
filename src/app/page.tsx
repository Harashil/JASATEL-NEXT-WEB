
import TypingText from "./components/mainPage_components/typingAnimation";
import Renderizator from "./components/general_components/Render";
import Carousel from "./components/mainPage_components/carrousel";
import InfiniteImageSlider from "./components/mainPage_components/slider";
import Article3 from "./components/mainPage_components/section2_article3";
import Article4 from "./components/mainPage_components/section2_article4";
export default function HomePage() {
  const sliderImages = [
    "/mainPage_images/carousel_imgs/section2_carousel/logo1.png",
    "/mainPage_images/carousel_imgs/section2_carousel/logo2.png",
    "/mainPage_images/carousel_imgs/section2_carousel/logo3.png",
    "/mainPage_images/carousel_imgs/section2_carousel/logo4.png",
    "/mainPage_images/carousel_imgs/section2_carousel/logo5.png",
    "/mainPage_images/carousel_imgs/section2_carousel/logo6.png",
    "/mainPage_images/carousel_imgs/section2_carousel/logo7.png",
    "/mainPage_images/carousel_imgs/section2_carousel/logo8.png",
    "/mainPage_images/carousel_imgs/section2_carousel/logo9.png",
    "/mainPage_images/carousel_imgs/section2_carousel/logo10.png",
    "/mainPage_images/carousel_imgs/section2_carousel/logo11.png",
    "/mainPage_images/carousel_imgs/section2_carousel/logo12.png",
  ];
  const mainCarouselImages = [
    "/mainPage_images/carousel_imgs/carouselImage1.png",
    "/mainPage_images/carousel_imgs/carouselImage2.png",
    "/mainPage_images/carousel_imgs/carouselImage3.svg",
  ];
  const carouselText = [
    {
      title: "TU ELECTRICISTA DE CONFIANZA",
      content:
        "Conectando hogares y negocios con confianza y seguridad",
    },
    {
      title: "TU SATISFACCION ES NUESTRO MEJOR PRECIO",
      content: "Comprometidos con nuestro trabajo para asegurar soluciones eléctricas a un precio justo.",
    },
    { title: "SERVICIO SEGURO", content: "QUE ILUMINA TU HOGAR" },
  ];
  const ourClientsText: string =
  "En JASATEL E.I.R.L nos dedicamos a ofrecer servicios de calidad con el objetivo de satisfacer las necesidades de nuestros clientes. ";
  const ourClientsText2: string =
  "Nuestro compromiso es brindar soluciones tecnológicas personalizadas que se ajusten a los requerimientos específicos de su empresa, hogar o negocio.";
  const ourClientsText3: string =
  "Contamos con un equipo de profesionales con amplia experiencia, garantizando eficiencia y seguridad en cada uno de nuestros proyectos";
  
  return (
    <>
      <Carousel
        carouselText={carouselText}
        idContent="carousel_subText"
        images={mainCarouselImages}
        className="mainCarouselContainer"
        indexColor="red"
      />

      <section className="mainPage_section2">
        <article id="section2_title">
          <Renderizator>
            <p className="text-center section2_title_animation">
              NUESTROS CLIENTES
            </p>
            <div id="section2_underline"></div>
          </Renderizator>
        </article>

        <article className="mainPage_article">
            <section id='section2_text'>
              <p>
              <TypingText content={ourClientsText} loop={false} cursor=""></TypingText>
              </p>
              <br/>
              <p>
              <TypingText content={ourClientsText2} loop={false} delay={3000} cursor=""></TypingText>
              </p>
              <br></br>
              <TypingText content={ourClientsText3} loop={false} delay={6000} cursor=""></TypingText>
              
            </section>
        </article>

        <article
          className="mainPage_article relative h-auto overflow-hidden mt-4"
          id="article2"
        >
          <InfiniteImageSlider images={sliderImages} />
        </article>

        <Article3 />

        <Article4 />
      </section>
    </>
  );
}
