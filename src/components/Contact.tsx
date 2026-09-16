import React, { useState } from "react";
import {
  MdEmail,
  MdLocationOn,
  MdSend,
  MdCheckCircle,
} from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { SiWhatsapp, SiGithub } from "react-icons/si";
import "./styles/Contact.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Prepare mailto link with encoded parameters
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:tahakhan4141@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(mailtoUrl, "_blank");
    }, 400);
  };

  return (
    <section className="contact-section section-container" id="contact">
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <h2>
            Get In <span>Touch</span>
          </h2>
          <p className="contact-subtitle">
            Have a project in mind, need an experienced Flutter mobile app
            developer, or want to discuss a new opportunity? Send a message or
            reach out directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Contact & Availability */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <h3>Let's Connect</h3>

              <div className="contact-channels">
                <a
                  href="mailto:tahakhan4141@gmail.com"
                  className="contact-channel-item"
                  data-cursor="disable"
                >
                  <div className="contact-channel-icon">
                    <MdEmail />
                  </div>
                  <div className="contact-channel-details">
                    <span className="contact-channel-label">Email</span>
                    <span className="contact-channel-val">
                      tahakhan4141@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/923151964106"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-item"
                  data-cursor="disable"
                >
                  <div className="contact-channel-icon">
                    <SiWhatsapp />
                  </div>
                  <div className="contact-channel-details">
                    <span className="contact-channel-label">WhatsApp</span>
                    <span className="contact-channel-val">
                      +92 315 1964106
                    </span>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/talhaakhaan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-item"
                  data-cursor="disable"
                >
                  <div className="contact-channel-icon">
                    <FaLinkedin />
                  </div>
                  <div className="contact-channel-details">
                    <span className="contact-channel-label">LinkedIn</span>
                    <span className="contact-channel-val">
                      linkedin.com/in/talhaakhaan
                    </span>
                  </div>
                </a>

                <a
                  href="https://github.com/iam-talhaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-item"
                  data-cursor="disable"
                >
                  <div className="contact-channel-icon">
                    <SiGithub />
                  </div>
                  <div className="contact-channel-details">
                    <span className="contact-channel-label">GitHub</span>
                    <span className="contact-channel-val">
                      github.com/iam-talhaa
                    </span>
                  </div>
                </a>

                <div className="contact-channel-item">
                  <div className="contact-channel-icon">
                    <MdLocationOn />
                  </div>
                  <div className="contact-channel-details">
                    <span className="contact-channel-label">Location</span>
                    <span className="contact-channel-val">
                      Peshawar, Pakistan &bull; Remote Worldwide
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="contact-status-box">
                <span className="contact-pulse" />
                <span>Open for Flutter contracts &amp; full-time roles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-wrapper">
            {isSubmitted ? (
              <div className="contact-success-banner">
                <MdCheckCircle />
                <div>
                  <strong>Thank you, {formData.name || "friend"}!</strong>
                  <p style={{ margin: "4px 0 0 0" }}>
                    Your message has been initiated. I look forward to speaking
                    with you soon!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    style={{
                      marginTop: "12px",
                      background: "transparent",
                      border: "none",
                      color: "var(--accentColor, #5eead4)",
                      textDecoration: "underline",
                      cursor: "pointer",
                      padding: 0,
                      fontFamily: "inherit",
                    }}
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name <span className="req">*</span>
                  </label>
                  <div className="form-input-container">
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Your Email <span className="req">*</span>
                  </label>
                  <div className="form-input-container">
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Your Message <span className="req">*</span>
                  </label>
                  <div className="form-input-container">
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project, timeline, or requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit-btn"
                  data-cursor="disable"
                >
                  {isSubmitting ? (
                    "Preparing Message..."
                  ) : (
                    <>
                      Send Message <MdSend />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
