import React, { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiSqlite,
  SiGit,
  SiAndroidstudio,
  SiFigma,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import "./styles/TechStack.css";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ size?: number | string; color?: string }>;
  color: string;
}

const techStackData: TechItem[] = [
  { name: "Flutter", icon: SiFlutter, color: "#54C5F8" },
  { name: "Dart", icon: SiDart, color: "#00B4AB" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "REST APIs", icon: TbApi, color: "#5eead4" },
  { name: "SQLite", icon: SiSqlite, color: "#38bdf8" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Android Studio", icon: SiAndroidstudio, color: "#3DDC84" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
];

const TechStack: React.FC = () => {
  const ballRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate columns responsively based on screen width
  const getColumnCount = useCallback((): number => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth <= 640) return 2;
    if (window.innerWidth <= 960) return 3;
    return 4;
  }, []);

  const [columns, setColumns] = useState<number>(getColumnCount());

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnCount());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getColumnCount]);

  // Collision Interaction: hover pushes ball and adjacent neighbors like billiard balls
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    const pushDirX = relX >= 0 ? 1 : -1;
    const pushDirY = relY >= 0 ? 1 : -1;

    const cols = columns;
    const row = Math.floor(index / cols);
    const col = index % cols;

    // 1. Hovered ball: scale up + slight nudge in push direction
    const hoveredEl = ballRefs.current[index];
    if (hoveredEl) {
      gsap.to(hoveredEl, {
        scale: 1.14,
        x: pushDirX * 10,
        y: pushDirY * 6,
        duration: 0.35,
        ease: "back.out(2)",
        overwrite: "auto",
      });
    }

    // 2. Billiard push into adjacent neighbor in the row (push direction)
    const targetCol = col + pushDirX;
    const targetNeighborIndex =
      targetCol >= 0 && targetCol < cols ? index + pushDirX : null;

    // Opposite neighbor in the row (slight reaction bounce)
    const oppositeCol = col - pushDirX;
    const oppositeNeighborIndex =
      oppositeCol >= 0 && oppositeCol < cols ? index - pushDirX : null;

    if (
      targetNeighborIndex !== null &&
      targetNeighborIndex >= 0 &&
      targetNeighborIndex < techStackData.length
    ) {
      const el = ballRefs.current[targetNeighborIndex];
      if (el) {
        gsap.to(el, {
          x: pushDirX * 24,
          y: pushDirY * 4,
          scale: 0.95,
          duration: 0.42,
          ease: "elastic.out(1, 0.45)",
          overwrite: "auto",
        });
      }
    }

    if (
      oppositeNeighborIndex !== null &&
      oppositeNeighborIndex >= 0 &&
      oppositeNeighborIndex < techStackData.length
    ) {
      const el = ballRefs.current[oppositeNeighborIndex];
      if (el) {
        gsap.to(el, {
          x: -pushDirX * 8,
          scale: 0.98,
          duration: 0.4,
          ease: "elastic.out(1, 0.45)",
          overwrite: "auto",
        });
      }
    }

    // 3. Vertical neighbor in the column (push direction)
    const targetRow = row + pushDirY;
    const totalRows = Math.ceil(techStackData.length / cols);
    const verticalNeighborIndex =
      targetRow >= 0 && targetRow < totalRows ? index + pushDirY * cols : null;

    if (
      verticalNeighborIndex !== null &&
      verticalNeighborIndex >= 0 &&
      verticalNeighborIndex < techStackData.length
    ) {
      const el = ballRefs.current[verticalNeighborIndex];
      if (el) {
        gsap.to(el, {
          y: pushDirY * 16,
          scale: 0.96,
          duration: 0.42,
          ease: "elastic.out(1, 0.45)",
          overwrite: "auto",
        });
      }
    }
  };

  // Return to Rest State: smoothly restore all balls to rest position (x:0, y:0, scale:1)
  const handleMouseLeave = () => {
    ballRefs.current.forEach((el) => {
      if (el) {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "elastic.out(1, 0.45)",
          overwrite: "auto",
        });
      }
    });
  };

  return (
    <div className="techstack" id="techstack">
      <h2>My Techstack</h2>

      <div className="tech-grid-container">
        <div
          className="tech-grid"
          style={{ "--tech-columns": columns } as React.CSSProperties}
        >
          {techStackData.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div key={tech.name} className="tech-ball-wrapper">
                <div
                  ref={(el) => {
                    ballRefs.current[index] = el;
                  }}
                  className="tech-ball"
                  onMouseEnter={(e) => handleMouseEnter(e, index)}
                  onMouseLeave={handleMouseLeave}
                  title={tech.name}
                  aria-label={tech.name}
                >
                  <div className="tech-icon-container">
                    <IconComponent color={tech.color} />
                  </div>
                </div>
                <span className="tech-label">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
