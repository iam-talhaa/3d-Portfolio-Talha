import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-corner"></div>
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a <span>Flutter Developer</span> specializing in building high-performance,
          cross-platform mobile applications for Android and iOS. I work
          extensively with Dart, state management solutions like BLoC, Provider,
          and GetX, and integrate Firebase, REST APIs, and Clean Architecture into
          every project. I have delivered apps across real estate, ride-hailing,
          healthcare, and e-learning domains. As a <span>Certified Scrum Master</span>, I bring
          strong Agile practices into my development process to write clean,
          maintainable, user-centric code.
        </p>
      </div>
    </div>
  );
};

export default About;
