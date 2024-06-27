import { useState, useEffect } from "react";
import { useBodyClass } from "./routesDriver";
interface UseScrollPosition {
  scrollPosition: number;
  isClient: boolean;
  style: { display: string };
}

const useScrollPosition = (): UseScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const currentClass = useBodyClass();
  const style =
    currentClass !== "contact-body"
      ? isClient && scrollPosition > window.innerHeight * 0.5
        ? { display: "inline" }
        : { display: "none" }
      : { display: "inline" };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return { scrollPosition, isClient, style };
};

export default useScrollPosition;
