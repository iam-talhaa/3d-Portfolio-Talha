import React from "react";
import { FaLinkedin } from "react-icons/fa";
import {
  SiGithub,
  SiWhatsapp,
  SiUpwork,
  SiFiverr,
} from "react-icons/si";
import { MdEmail, MdArrowUpward, MdArrowOutward } from "react-icons/md";
import { smoother } from "./Navbar";
import "./styles/Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetSelector: string
  ) => {
    e.preventDefault();
    if (targetSelector === "top") {
      if (smoother && window.innerWidth > 1024) {
        smoother.scrollTo(0, true, "top top");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (smoother && window.innerWidth > 1024) {
      smoother.scrollTo(targetSelector, true, "top top");
    } else {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="footer-section">
      {/* Subtle top divider with teal gradient glow */}
      <div className="footer-top-border" />

      {/* Lightweight background ambient glow */}
      <div className="footer-ambient-glow" />

      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand & Intro */}
          <div className="footer-brand">
            <div className="footer-logo-row">
              <span className="footer-logo-badge">MT</span>
              <h3 className="footer-logo-name">Muhammad Talha</h3>
            </div>
            <p className="footer-tagline">
              Mobile App Developer specializing in Flutter, Dart, and Clean
              Architecture. Crafting performant, intuitive mobile solutions for
              Android and iOS.
            </p>
            <div className="footer-status-pill">
              <span className="footer-pulse-dot" />
              <span>Available for freelance work</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a
                  href="/#"
                  onClick={(e) => handleSmoothScroll(e, "top")}
                  data-cursor="disable"
                >
                  Home
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, "#about")}
                  data-cursor="disable"
                >
                  About
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  href="#experience"
                  onClick={(e) => handleSmoothScroll(e, ".career-section")}
                  data-cursor="disable"
                >
                  Experience
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  href="#certifications"
                  onClick={(e) => handleSmoothScroll(e, "#certifications")}
                  data-cursor="disable"
                >
                  Certifications
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  href="#work"
                  onClick={(e) => handleSmoothScroll(e, "#work")}
                  data-cursor="disable"
                >
                  Projects
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  href="#techstack"
                  onClick={(e) => handleSmoothScroll(e, "#techstack")}
                  data-cursor="disable"
                >
                  Tech Stack
                </a>
              </li>
              <li className="footer-link-item">
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "#contact")}
                  data-cursor="disable"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social / Profiles */}
          <div className="footer-social-col">
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-social-grid">
              <a
                href="https://github.com/iam-talhaa"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                title="GitHub"
                aria-label="GitHub Profile"
                data-cursor="disable"
              >
                <SiGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/talhaakhaan"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
                data-cursor="disable"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://wa.me/923151964106"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                title="WhatsApp"
                aria-label="WhatsApp Chat"
                data-cursor="disable"
              >
                <SiWhatsapp />
              </a>
              <a
                href="https://www.upwork.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                title="Upwork"
                aria-label="Upwork Profile"
                data-cursor="disable"
              >
                <SiUpwork />
              </a>
              <a
                href="https://www.fiverr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                title="Fiverr"
                aria-label="Fiverr Profile"
                data-cursor="disable"
              >
                <SiFiverr />
              </a>
              <a
                href="mailto:tahakhan4141@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                title="Email Me"
                aria-label="Send Email"
                data-cursor="disable"
              >
                <MdEmail />
              </a>
            </div>
          </div>

          {/* Column 4: Contact / CTA */}
          <div className="footer-cta-col">
            <h4 className="footer-col-title">Let's Collaborate</h4>
            <p className="footer-cta-desc">
              Have an idea for a mobile application or looking for an experienced
              Flutter engineer? Let's build something exceptional together.
            </p>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="footer-cta-btn"
              data-cursor="disable"
            >
              Let's Talk <MdArrowOutward />
            </a>
            <a
              href="mailto:tahakhan4141@gmail.com"
              className="footer-email-link"
              data-cursor="disable"
            >
              <MdEmail /> tahakhan4141@gmail.com
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="footer-bottom-divider" />

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {currentYear} Muhammad Talha. All rights reserved.
          </p>

          <p className="footer-bottom-center">
            Designed &amp; Built with Flutter &amp; React
          </p>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={(e) => handleSmoothScroll(e, "top")}
            title="Back to Top"
            aria-label="Back to Top"
            data-cursor="disable"
          >
            <MdArrowUpward size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
