import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Gynea Guide",
    category: "Gynecologist Health & Information App",
    tools: "Flutter, Firebase, Health Calculators, Clean Architecture",
    image: "/images/placeholder.webp",
    link: "",
  },
  {
    title: "Tobacco Cultivation Guide",
    category: "AI-Powered Agriculture App",
    tools: "Flutter, Google Gemini AI, Image-based Disease Detection",
    image: "/images/Tobacco_Plant_Cultivation_Process.png",
    link: "",
  },
  {
    title: "Solar Panel Anomaly Detection",
    category: "Flutter + Machine Learning",
    tools: "Flutter, Machine Learning, Image Analysis, Real-time Detection",
    image: "/images/Solar_Panel_Anamoley_Detection.png",
    link: "",
  },
  {
    title: "Liver Disease Detection",
    category: "Flutter + Machine Learning Health App",
    tools: "Flutter, TensorFlow Lite, Medical Data Input, ~90% Accuracy",
    image: "/images/placeholder.webp",
    link: "",
  },
  {
    title: "Gynae Guide",
    category: "Obstetrics & Gynecology Reference App",
    tools: "Medical Calculators, Clinical Guidelines, Disease Classification, Pharmacology Reference",
    image: "/images/Gynae_Guide.png",
    link: "",
  },
  {
    title: "Kanz Al-Duaa",
    category: "Islamic Supplications & Reminders App",
    tools: "Daily Dua Reminders, Event & Occasion Supplications, Supplication Sessions, Categorized Kalmaats",
    image: "/images/Kanz_Al_Duaa.png",
    link: "",
  },
  {
    title: "Ride Hailing",
    category: "On-Demand Transportation & Ride-Sharing App",
    tools: "Real-Time GPS Tracking, Fare Calculation, Vehicle Selection, Dual Mode (Driver & Passenger)",
    image: "/images/Ride_Hailing.png",
    link: "",
  },
  {
    title: "Creator Hub",
    category: "YouTube Content & Multi-Role Management Platform",
    tools: "Role-Based Access (Admin, Manager, Creator), YouTube API Integration, Wallet & Payout System, Analytics Dashboard",
    image: "/images/Creator_Hub.png",
    link: "",
  },
  {
    title: "Point of Sale Management",
    category: "Retail & Inventory Management App",
    tools: "Firebase Backend, Animated UI, Sales & Purchase Tracking, Profit/Loss Analytics, Custom Printing",
    image: "/images/Point_Of_Sale_Management.png",
    link: "",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
