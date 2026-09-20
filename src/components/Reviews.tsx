import React, { useState, useEffect, useCallback } from "react";
import "./styles/Reviews.css";
import { FaStar } from "react-icons/fa";
import { MdClose, MdFullscreen, MdVerified } from "react-icons/md";

export interface ReviewScreenshotItem {
  id: number;
  title: string;
  image: string;
  tag: string;
  rating: number;
}

const reviewScreenshots: ReviewScreenshotItem[] = [
  {
    id: 1,
    title: "Client Feedback & Rating",
    image: "/images/review1.png",
    tag: "Verified Client Review",
    rating: 5,
  },
  {
    id: 2,
    title: "Client Testimonial & Endorsement",
    image: "/images/review2.png",
    tag: "Verified Client Review",
    rating: 5,
  },
  {
    id: 3,
    title: "Project Delivery Review",
    image: "/images/review3.png",
    tag: "Verified Client Review",
    rating: 5,
  },
];

const Reviews: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<ReviewScreenshotItem | null>(null);

  const openModal = (review: ReviewScreenshotItem) => {
    setSelectedReview(review);
    document.body.style.overflow = "hidden";
  };

  const closeModal = useCallback(() => {
    setSelectedReview(null);
    document.body.style.overflow = "auto";
  }, []);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedReview) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedReview, closeModal]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.removeProperty("--glare-x");
    card.style.removeProperty("--glare-y");
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-container reviews-container">
        {/* Section Header */}
        <div className="reviews-header">
          <h2>
            Client <span>Reviews</span>
          </h2>
          <p className="reviews-subtitle">
            Verified feedback and client ratings from delivered production applications
          </p>

          {/* Aggregate Rating Summary Card */}
          <div className="reviews-stats-bar">
            <div className="stat-item">
              <span className="stat-value">5.0</span>
              <div className="stat-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="stat-label">Average Client Rating</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-badge">On-Time Delivery</span>
              <span className="stat-label">Project Completion Rate</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value">15+</span>
              <span className="stat-badge">Production Apps</span>
              <span className="stat-label">Delivered Worldwide</span>
            </div>
          </div>
        </div>

        {/* Review Screenshot Cards Grid */}
        <div className="reviews-grid">
          {reviewScreenshots.map((item: ReviewScreenshotItem, index: number) => {
            const paddedIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

            return (
              <div
                key={item.id}
                className="review-card"
                onClick={() => openModal(item)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(item);
                  }
                }}
                data-cursor="disable"
              >
                {/* Glowing Border Tracer */}
                <div className="review-card-border" aria-hidden="true" />

                {/* Screenshot Image Container */}
                <div className="review-card-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="review-card-img"
                    loading="lazy"
                  />
                  {/* Holographic Shine Sweep */}
                  <div className="review-card-shine" aria-hidden="true" />

                  {/* Hover Overlay with Zoom Button */}
                  <div className="review-card-hover-overlay">
                    <span className="review-card-zoom-btn">
                      <MdFullscreen />
                      <span>View Full</span>
                    </span>
                  </div>
                </div>

                {/* Review Card Info */}
                <div className="review-card-info">
                  <div className="review-card-meta">
                    <span className="review-card-index">{paddedIndex}</span>
                    <div className="review-stars-small">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>

                  <div className="review-card-bottom-row">
                    <h4 className="review-card-title">{item.title}</h4>
                    <span className="review-verified-tag">
                      <MdVerified />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedReview && (
        <div
          className="review-modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="review-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="review-modal-close"
              onClick={closeModal}
              aria-label="Close review modal"
              data-cursor="disable"
            >
              <MdClose />
            </button>
            <div className="review-modal-image-container">
              <img
                src={selectedReview.image}
                alt={selectedReview.title}
                className="review-modal-img"
              />
            </div>
            <div className="review-modal-footer">
              <h4>{selectedReview.title}</h4>
              <span className="review-modal-badge">
                <MdVerified /> Verified Client Review
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
