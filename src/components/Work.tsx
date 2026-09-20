import React, { useState, useEffect, useCallback, useRef } from "react";
import "./styles/Work.css";
import { MdClose, MdFullscreen, MdChevronLeft, MdChevronRight } from "react-icons/md";

export interface ProjectItem {
  id?: number | string;
  title: string;
  category: string;
  tools: string;
  image: string;
  link?: string;
}

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Gynae Guide",
    category: "Gynecologist Health & Information App",
    tools: "Flutter, Firebase, Health Calculators, Clean Architecture",
    image: "/images/Gynae_Guide.png",
    link: "",
  },
  {
    id: 2,
    title: "Tobacco Cultivation Guide",
    category: "AI-Powered Agriculture App",
    tools: "Flutter, Google Gemini AI, Image-based Disease Detection",
    image: "/images/Tobacco_Plant_Cultivation_Process.png",
    link: "",
  },
  {
    id: 3,
    title: "Solar Panel Anomaly Detection",
    category: "Flutter + Machine Learning",
    tools: "Flutter, Machine Learning, Image Analysis, Real-time Detection",
    image: "/images/Solar_Panel_Anamoley_Detection.png",
    link: "",
  },
  {
    id: 4,
    title: "Liver Disease Detection",
    category: "Flutter + Machine Learning Health App",
    tools: "Flutter, TensorFlow Lite, Medical Data Input, ~90% Accuracy",
    image: "/images/Liver_Disease_Detection.png",
    link: "",
  },
  {
    id: 5,
    title: "Kanz Al-Duaa",
    category: "Islamic Supplications & Reminders App",
    tools: "Daily Dua Reminders, Event & Occasion Supplications, Supplication Sessions",
    image: "/images/Kanz_Al_Duaa.png",
    link: "",
  },
  {
    id: 6,
    title: "Ride Hailing",
    category: "On-Demand Transportation & Ride-Sharing App",
    tools: "Real-Time GPS Tracking, Fare Calculation, Vehicle Selection, Dual Mode",
    image: "/images/Ride_Hailing.png",
    link: "",
  },
  {
    id: 7,
    title: "Creator Hub",
    category: "YouTube Content & Multi-Role Management Platform",
    tools: "Role-Based Access, YouTube API Integration, Wallet & Payout System, Analytics",
    image: "/images/Creator_Hub.png",
    link: "",
  },
  {
    id: 8,
    title: "Point of Sale Management",
    category: "Retail & Inventory Management App",
    tools: "Firebase Backend, Animated UI, Sales & Purchase Tracking, Profit/Loss Analytics",
    image: "/images/Point_Of_Sale_Management.png",
    link: "",
  },
];

const Work: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const total = projects.length;

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
    if (isPaused || selectedProject !== null) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, selectedProject, nextSlide]);

  // Modal open & close
  const openModal = (proj: ProjectItem) => {
    setSelectedProject(proj);
    document.body.style.overflow = "hidden";
  };

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  }, []);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        closeModal();
      } else if (!selectedProject) {
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
  }, [selectedProject, closeModal, prevSlide, nextSlide]);

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
    <section className="work-section" id="work">
      <div className="section-container work-container">
        {/* Section Header */}
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
          <p className="work-subtitle">
            Explore featured mobile engineering, AI-powered applications, and enterprise products
          </p>
        </div>

        {/* 3D Carousel Stage */}
        <div
          className="work-3d-stage"
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
            className="work-nav-btn work-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous Project"
            data-cursor="disable"
          >
            <MdChevronLeft />
          </button>

          {/* 3D Carousel Track */}
          <div className="work-3d-track">
            {projects.map((item: ProjectItem, index: number) => {
              // Calculate shortest modular distance
              let offset = (index - activeIndex) % total;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 3;
              const paddedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

              let positionClass = "work-pos-hidden";
              if (offset === 0) positionClass = "work-pos-center";
              else if (offset === 1) positionClass = "work-pos-right-1";
              else if (offset === -1) positionClass = "work-pos-left-1";
              else if (offset === 2) positionClass = "work-pos-right-2";
              else if (offset === -2) positionClass = "work-pos-left-2";
              else if (offset === 3) positionClass = "work-pos-right-3";
              else if (offset === -3) positionClass = "work-pos-left-3";

              return (
                <div
                  key={item.id || index}
                  className={`work-3d-card ${positionClass} ${isActive ? "active" : ""}`}
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
                  <div className="work-card-border-glow" aria-hidden="true" />

                  {/* Project Image Frame (border-radius: 20px) */}
                  <div className="work-card-image-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="work-card-img"
                      loading="lazy"
                    />
                    {/* Holographic Shine Sweep Overlay */}
                    <div className="work-card-shine" aria-hidden="true" />

                    {/* Active Hover Zoom Indicator */}
                    {isActive && (
                      <div className="work-card-hover-overlay">
                        <span className="work-card-zoom-btn">
                          <MdFullscreen />
                          <span>View Full</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="work-card-info">
                    <div className="work-card-meta">
                      <span className="work-card-index">{paddedIndex}</span>
                      <span className="work-card-badge">{item.category}</span>
                    </div>
                    <h3 className="work-card-title">{item.title}</h3>
                    <p className="work-card-tools-desc">{item.tools}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Arrow Button */}
          <button
            className="work-nav-btn work-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next Project"
            data-cursor="disable"
          >
            <MdChevronRight />
          </button>
        </div>

        {/* Carousel Pagination & Indicator Controls */}
        <div className="work-carousel-pagination">
          {projects.map((item: ProjectItem, idx: number) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id || idx}
                className={`work-pagination-bullet ${isActive ? "active" : ""}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to project ${idx + 1}: ${item.title}`}
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
      {selectedProject && (
        <div
          className="work-modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="work-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="work-modal-close"
              onClick={closeModal}
              aria-label="Close project modal"
              data-cursor="disable"
            >
              <MdClose />
            </button>
            <div className="work-modal-image-container">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="work-modal-img"
              />
            </div>
            <div className="work-modal-footer">
              <div className="work-modal-meta">
                <h4>{selectedProject.title}</h4>
                <p className="work-modal-tools">{selectedProject.tools}</p>
              </div>
              <span className="work-modal-category">{selectedProject.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;
