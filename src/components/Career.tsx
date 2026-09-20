import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          {/* Experience 1 */}
          <div className="career-info-box">
            <div className="career-corner" aria-hidden="true" />
            <div className="career-info-in">
              <div className="career-role">
                <h4>Flutter Developer</h4>
                <h5>EncoderByte Pvt Ltd — iT Park Peshawar</h5>
              </div>
              <h3 className="career-date">MAR 2026 – PRESENT</h3>
            </div>
            <p className="career-desc">
              Developing <span>Gynea Guide</span>, a gynecologist health and information app
              offering women's reproductive health guidance. Built pregnancy due
              date, ovulation, and menstrual cycle calculators, organized medical
              content on conditions and symptoms, and focused on intuitive UI/UX
              for a reliable health-tracking experience.
            </p>
          </div>

          {/* Experience 2 */}
          <div className="career-info-box">
            <div className="career-corner" aria-hidden="true" />
            <div className="career-info-in">
              <div className="career-role">
                <h4>Flutter Developer</h4>
                <h5>Tri Byte Solution — iT Park Peshawar</h5>
              </div>
              <h3 className="career-date">AUG 2025 – SEP 2025</h3>
            </div>
            <p className="career-desc">
              Built a <span>Tobacco Plant Cultivation Process</span> app guiding users from
              seed sowing to harvesting, integrating Google Gemini for AI-powered
              cultivation guidance and an AI model to detect leaf diseases from
              photos. Also developed a <span>Solar Panel Anomaly Detection System</span> using
              Flutter and Machine Learning to identify cracks, dust, and other
              panel defects in real time.
            </p>
          </div>

          {/* Experience 3 */}
          <div className="career-info-box">
            <div className="career-corner" aria-hidden="true" />
            <div className="career-info-in">
              <div className="career-role">
                <h4>Summer Intern</h4>
                <h5>City University — Peshawar</h5>
              </div>
              <h3 className="career-date">JULY 2025 – AUG 2025</h3>
            </div>
            <p className="career-desc">
              Built a <span>COVID-19 tracking app</span> with real-time case, recovery, and
              vaccination statistics, charts, and notifications. Also developed a
              <span>Liver Disease Detection app</span> using Flutter and TensorFlow Lite,
              achieving ~90% prediction accuracy with an intuitive,
              user-friendly interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
