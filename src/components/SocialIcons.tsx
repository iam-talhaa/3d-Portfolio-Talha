import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    const cleanupFns: (() => void)[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      let mouseX = centerX;
      let mouseY = centerY;
      let currentX = 0;
      let currentY = 0;
      let animId: number | null = null;

      const step = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
          animId = requestAnimationFrame(step);
        } else {
          animId = null;
        }
      };

      const startAnim = () => {
        if (!animId) {
          animId = requestAnimationFrame(step);
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        const itemRect = elem.getBoundingClientRect();
        const x = e.clientX - itemRect.left;
        const y = e.clientY - itemRect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = centerX;
          mouseY = centerY;
        }
        startAnim();
      };

      const onMouseLeave = () => {
        mouseX = centerX;
        mouseY = centerY;
        startAnim();
      };

      elem.addEventListener("mousemove", onMouseMove);
      elem.addEventListener("mouseleave", onMouseLeave);

      cleanupFns.push(() => {
        if (animId) cancelAnimationFrame(animId);
        elem.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/iam-talhaa"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/talhaakhaan"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://wa.me/923151964106"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Muhammad_Talha_Resume.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
