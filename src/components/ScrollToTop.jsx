import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantané vers le haut à chaque changement de route
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}