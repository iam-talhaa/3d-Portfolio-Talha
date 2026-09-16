import React from "react";
import certifications, { CertificationItem } from "../data/certifications";
import "./styles/Certifications.css";

const Certifications: React.FC = () => {
  // Duplicate array for a seamless infinite marquee conveyor belt
  const marqueeItems = [...certifications, ...certifications];

  return (
    <section className="certifications-section" id="certifications">
      <div className="certifications-header">
        <h2>
          Licenses <span>&</span>
          <br /> Certifications
        </h2>
        <p className="certifications-subtitle">
          Continuous learning, verified credentials, and specialized engineering domains
        </p>
      </div>

      <div className="certifications-marquee-container">
        <div className="certifications-marquee-track">
          {marqueeItems.map((item: CertificationItem, index: number) => {
            const originalIndex = (index % certifications.length) + 1;
            const paddedIndex =
              originalIndex < 10 ? `0${originalIndex}` : `${originalIndex}`;
            const totalCount =
              certifications.length < 10
                ? `0${certifications.length}`
                : `${certifications.length}`;

            const cardContent = (
              <>
                {/* Full-bleed background graphic */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="cert-card-bg"
                  loading="lazy"
                />
                <div className="cert-card-overlay" />

                {/* Concentric decorative layered border frame near top-inside edge */}
                <div className="cert-card-frame">
                  <div className="cert-card-frame-inner" />
                </div>

                {/* Top: Tagline / Issuer & Bold Uppercase Title */}
                <div className="cert-card-top">
                  <span className="cert-card-tagline">
                    {item.issuer || item.tag}
                  </span>
                  <h3 className="cert-card-title">{item.title}</h3>
                </div>

                {/* Bottom: Date Index (Left) & Pill Badge (Right) */}
                <div className="cert-card-bottom">
                  <div className="cert-card-meta-left">
                    <span className="cert-card-index">{paddedIndex}/{totalCount}</span>
                    <span className="cert-card-sep">•</span>
                    <span className="cert-card-date">{item.date}</span>
                  </div>
                  <span className="cert-card-badge">
                    {item.tag || "CERTIFICATE"}
                  </span>
                </div>
              </>
            );

            if (item.link) {
              return (
                <a
                  key={`cert-${index}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card"
                  title={`View credential: ${item.title}`}
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={`cert-${index}`} className="cert-card">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
