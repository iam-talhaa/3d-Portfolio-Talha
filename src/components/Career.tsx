import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Flutter Developer</h4>
                <h5>EncoderByte Pvt Ltd — iT Park Peshawar</h5>
              </div>
              <h3>MAR 2026 – PRESENT</h3>
            </div>
            <p>
              Developing Gynea Guide, a gynecologist health and information app
              offering women's reproductive health guidance. Built pregnancy due
              date, ovulation, and menstrual cycle calculators, organized medical
              content on conditions and symptoms, and focused on intuitive UI/UX
              for a reliable health-tracking experience.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Flutter Developer</h4>
                <h5>Tri Byte Solution — iT Park Peshawar</h5>
              </div>
              <h3>AUG 2025 – SEP 2025</h3>
            </div>
            <p>
              Built a Tobacco Plant Cultivation Process app guiding users from
              seed sowing to harvesting, integrating Google Gemini for AI-powered
              cultivation guidance and an AI model to detect leaf diseases from
              photos. Also developed a Solar Panel Anomaly Detection System using
              Flutter and Machine Learning to identify cracks, dust, and other
              panel defects in real time.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Summer Intern</h4>
                <h5>City University — Peshawar</h5>
              </div>
              <h3>JULY 2025 – AUG 2025</h3>
            </div>
            <p>
              Built a COVID-19 tracking app with real-time case, recovery, and
              vaccination statistics, charts, and notifications. Also developed a
              Liver Disease Detection app using Flutter and TensorFlow Lite,
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
