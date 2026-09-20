import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import Certifications from "./Certifications";
import Reviews from "./Reviews";
import Footer from "./Footer";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    setSplitText();

    const resizeHandler = () => {
      clearTimeout(timeoutId);
      setIsDesktopView(window.innerWidth > 1024);
      timeoutId = setTimeout(() => {
        setSplitText();
      }, 250);
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Certifications />
            <Work />
            <Suspense fallback={<div>Loading....</div>}>
              <TechStack />
            </Suspense>
            <Reviews />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
