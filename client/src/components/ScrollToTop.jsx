import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, {
          immediate: true,
          force: true,
        });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      }
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;