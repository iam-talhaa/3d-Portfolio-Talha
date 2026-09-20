import React, { useState, useEffect, useCallback, useRef } from "react";
import certifications, { CertificationItem } from "../data/certifications";
import { MdClose, MdFullscreen, MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./styles/Certifications.css";

const Certifications: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const total = certifications.length;

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Autoplay
  useEffect(() => {
    if (isPaused || selectedCert !== null) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, selectedCert, nextSlide]);

  // Modal open & close
  const openModal = (cert: CertificationItem) => {
    setSelectedCert(cert);
    document.body.style.overflow = "hidden";
  };

  const closeModal = useCallback(() => {
    setSelectedCert(null);
    document.body.style.overflow = "auto";
  }, []);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCert) {
        closeModal();
      } else if (!selectedCert) {
        if (e.key === "ArrowLeft") {
          prevSlide();
        } else if (e.key === "ArrowRight") {
          nextSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedCert, closeModal, prevSlide, nextSlide]);

  // Mouse drag & Touch swipe handlers
  const handleDragStart = (clientX: number) => {
    touchStartX.current = clientX;
    touchDeltaX.current = 0;
    isDragging.current = true;
    setIsPaused(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current || touchStartX.current === null) return;
    touchDeltaX.current = clientX - touchStartX.current;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (touchDeltaX.current > 45) {
      prevSlide();
    } else if (touchDeltaX.current < -45) {
      nextSlide();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setIsPaused(false);
  };

  // 3D Tilt on active card
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, isActive: boolean) => {
    if (!isActive || window.innerWidth <= 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);
    card.style.setProperty("--mouse-rot-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--mouse-rot-y", `${rotateY.toFixed(2)}deg`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.removeProperty("--glare-x");
    card.style.removeProperty("--glare-y");
    card.style.removeProperty("--mouse-rot-x");
    card.style.removeProperty("--mouse-rot-y");
  };

  return (
    <section className="certifications-section" id="certifications">
      <div className="section-container certifications-container">
        {/* Section Header */}
        <div className="certifications-header">
          <h2>
            Licenses <span>&</span>
            <br /> Certifications
          </h2>
          <p className="certifications-subtitle">
            Continuous learning, verified credentials, and specialized engineering domains
          </p>
        </div>

        {/* 3D Carousel Stage */}
        <div
          className="cert-3d-stage"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={carouselRef}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          onMouseDown={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            handleDragStart(e.clientX);
          }}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
        >
          {/* Previous Arrow Button */}
          <button
            className="cert-nav-btn cert-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous Certification"
            data-cursor="disable"
          >
            <MdChevronLeft />
          </button>

          {/* 3D Carousel Track */}
          <div className="cert-3d-track">
            {certifications.map((item: CertificationItem, index: number) => {
              // Calculate shortest modular distance
              let offset = (index - activeIndex) % total;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 3;
              const paddedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

              let positionClass = "cert-pos-hidden";
              if (offset === 0) positionClass = "cert-pos-center";
              else if (offset === 1) positionClass = "cert-pos-right-1";
              else if (offset === -1) positionClass = "cert-pos-left-1";
              else if (offset === 2) positionClass = "cert-pos-right-2";
              else if (offset === -2) positionClass = "cert-pos-left-2";
              else if (offset === 3) positionClass = "cert-pos-right-3";
              else if (offset === -3) positionClass = "cert-pos-left-3";

              return (
                <div
                  key={item.id || index}
                  className={`cert-3d-card ${positionClass} ${isActive ? "active" : ""}`}
                  style={{
                    "--offset": offset,
                    "--abs-offset": Math.abs(offset),
                    pointerEvents: isVisible ? "auto" : "none",
                  } as React.CSSProperties}
                  onClick={(e) => {
                    if (isDragging.current && Math.abs(touchDeltaX.current) > 10) return;
                    if (isActive) {
                      openModal(item);
                    } else {
                      e.stopPropagation();
                      goToSlide(index);
                    }
                  }}
                  onMouseMove={(e) => handleCardMouseMove(e, isActive)}
                  onMouseLeave={handleCardMouseLeave}
                  role="button"
                  tabIndex={isVisible ? 0 : -1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (isActive) openModal(item);
                      else goToSlide(index);
                    }
                  }}
                  data-cursor="disable"
                  aria-hidden={!isVisible}
                >
                  {/* Glowing Animated Border Tracer */}
                  <div className="cert-card-border-glow" aria-hidden="true" />

                  {/* Certificate Image Frame */}
                  <div className="cert-card-image-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cert-card-img"
                      loading="lazy"
                    />
                    {/* Holographic Shine Sweep Overlay */}
                    <div className="cert-card-shine" aria-hidden="true" />

                    {/* Active Hover Zoom Indicator */}
                    {isActive && (
                      <div className="cert-card-hover-overlay">
                        <span className="cert-card-zoom-btn">
                          <MdFullscreen />
                          <span>View Full</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Certificate Details */}
                  <div className="cert-card-info">
                    <div className="cert-card-meta">
                      <span className="cert-card-index">{paddedIndex}</span>
                      <span className="cert-card-badge">{item.issuer || item.tag}</span>
                    </div>
                    <h3 className="cert-card-title">{item.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Arrow Button */}
          <button
            className="cert-nav-btn cert-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next Certification"
            data-cursor="disable"
          >
            <MdChevronRight />
          </button>
        </div>

        {/* Carousel Pagination & Indicator Controls */}
        <div className="cert-carousel-pagination">
          {certifications.map((item: CertificationItem, idx: number) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id || idx}
                className={`cert-pagination-bullet ${isActive ? "active" : ""}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to certification ${idx + 1}: ${item.title}`}
                data-cursor="disable"
              >
                <span className="bullet-fill" />
                <span className="bullet-number">{idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedCert && (
        <div
          className="cert-modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="cert-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cert-modal-close"
              onClick={closeModal}
              aria-label="Close certificate modal"
              data-cursor="disable"
            >
              <MdClose />
            </button>
            <div className="cert-modal-image-container">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="cert-modal-img"
              />
            </div>
            <div className="cert-modal-footer">
              <h4>{selectedCert.title}</h4>
              {selectedCert.issuer && (
                <span className="cert-modal-issuer">{selectedCert.issuer}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
