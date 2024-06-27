"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useBodyClass(): string {
  const pathname = usePathname();
  const [currentClassName, setCurrentClassName] = useState<string>("home-body");

  useEffect(() => {
    const routeClasses: { [key: string]: string } = {
      "/": "home-body",
      "/ourServices": "services-body",
      "/contactUs": "contact-body",
    };

    const newClassName = routeClasses[pathname] || "home-body";
    setCurrentClassName(newClassName);
    document.body.className = newClassName;
  }, [pathname]);

  return currentClassName;
}




