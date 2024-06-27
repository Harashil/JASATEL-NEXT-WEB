import Carousel from "./carrousel";
import Renderizator from "../general_components/Render";
import './section2_article4.scss';
const Article4 = () => {
  const carouselImages = [
    "/mainPage_images/carousel_imgs/proyecto1.jpeg",
    "/mainPage_images/carousel_imgs/proyecto2.jpg",
    "/mainPage_images/carousel_imgs/proyecto3.jpg"
  ];
  const carouselText = [
    {title:"" , content:"Este proyecto fue desarrollado en X lugar"},
   {title:"",content:"Este proyecto fue desarrollado en XYZ lugar"},
   {title: "", content:"Este proyecto fue desarrollado en XYZABC lugar"} 
  ]
  return (
    <article className="mainPage_article" id='article4'>
      <Renderizator>
        
      <h2>NUESTROS ULTIMOS PROYECTOS</h2>
      </Renderizator>
      <Carousel
        carouselText={carouselText}
        images={carouselImages}
        className='article4_carouselDiv'
        idContent="carousel_subText2"
        indexColor="blue"
      />
    </article>
  );
};

export default Article4;