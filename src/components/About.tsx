import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-corner"></div>
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a Flutter Developer specializing in building high-performance,
          cross-platform mobile applications for Android and iOS. I work
          extensively with Dart, state management solutions like BLoC, Provider,
          and GetX, and integrate Firebase, REST APIs, and Clean Architecture into
          every project. I have delivered apps across real estate, ride-hailing,
          healthcare, and e-learning domains. As a Certified Scrum Master, I bring
          strong Agile practices — sprint planning and collaborative delivery —
          into my development process, and I'm passionate about writing clean,
          maintainable, user-centric code.
        </p>
      </div>
    </div>
  );
};

export default About;
