import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const content = (
    <div className="work-image-card-container">
      {/* Ambient background glow */}
      <div className="work-image-glow" aria-hidden="true" />

      {/* Futuristic decorative border accents */}
      <div className="work-image-border-gradient" aria-hidden="true" />
      <div className="work-image-border-dashed" aria-hidden="true" />

      {/* Main rectangular frame with 20px rounded corners */}
      <div className="work-image-frame">
        <div className="work-image-media">
          <img src={props.image} alt={props.alt} />
          {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
        </div>
        {/* Glass reflection / shine sweep overlay */}
        <div className="work-image-shine" aria-hidden="true" />
      </div>

      {props.link && (
        <div className="work-link">
          <MdArrowOutward />
        </div>
      )}
    </div>
  );

  return (
    <div className="work-image">
      {props.link ? (
        <a
          className="work-image-in"
          href={props.link}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          target="_blank"
          rel="noreferrer"
          data-cursor={"disable"}
        >
          {content}
        </a>
      ) : (
        <div
          className="work-image-in"
          style={{ cursor: "default" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
