import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiStripe,
  SiGoogledrive,
  SiGoogleanalytics,
  SiGoogle,
} from "react-icons/si";
import { TbPlugConnected, TbLayersLinked, TbForms, TbShieldLock } from "react-icons/tb";
import { MdArchitecture, MdFactCheck, MdCloudSync } from "react-icons/md";
import "./styles/TechStack.css";

interface TechItem {
  name: string;
  category: string;
  icon: React.ComponentType<{ size?: number | string; color?: string }>;
  color: string;
}

const techCategories = [
  "All",
  "Mobile Dev",
  "State Management",
  "Forms & Validation",
  "Auth & Security",
  "Payments",
  "Cloud & Storage",
  "Analytics",
] as const;

type TechCategory = (typeof techCategories)[number];

const techStackData: TechItem[] = [
  // Mobile Development
  { name: "Flutter", category: "Mobile Dev", icon: SiFlutter, color: "#54C5F8" },
  { name: "Dart", category: "Mobile Dev", icon: SiDart, color: "#00B4AB" },
  { name: "Clean Architecture (MVVM)", category: "Mobile Dev", icon: MdArchitecture, color: "#5eead4" },
  { name: "Dependency Injection", category: "Mobile Dev", icon: TbPlugConnected, color: "#a78bfa" },

  // State Management & Data Handling
  { name: "GetX", category: "State Management", icon: TbLayersLinked, color: "#ec4899" },
  { name: "Provider", category: "State Management", icon: TbLayersLinked, color: "#38bdf8" },
  { name: "BLoC", category: "State Management", icon: TbLayersLinked, color: "#818cf8" },

  // Forms & Validation
  { name: "Flutter Form Builder", category: "Forms & Validation", icon: TbForms, color: "#f59e0b" },
  { name: "Custom Validators", category: "Forms & Validation", icon: MdFactCheck, color: "#10b981" },

  // Authentication & Authorization
  { name: "Firebase Auth", category: "Auth & Security", icon: SiFirebase, color: "#FFCA28" },
  { name: "Google Sign‑In", category: "Auth & Security", icon: SiGoogle, color: "#EA4335" },
  { name: "OAuth", category: "Auth & Security", icon: TbShieldLock, color: "#60a5fa" },

  // Payments
  { name: "Stripe Payment Gateway", category: "Payments", icon: SiStripe, color: "#635BFF" },

  // Cloud & Storage Integrations
  { name: "Cloud Firestore", category: "Cloud & Storage", icon: SiFirebase, color: "#FFCA28" },
  { name: "Firebase Realtime DB", category: "Cloud & Storage", icon: SiFirebase, color: "#FFA000" },
  { name: "Firebase Storage", category: "Cloud & Storage", icon: MdCloudSync, color: "#F57C00" },
  { name: "Google Drive API", category: "Cloud & Storage", icon: SiGoogledrive, color: "#34A853" },

  // Analytics & Monitoring
  { name: "Firebase Analytics", category: "Analytics", icon: SiFirebase, color: "#FFCA28" },
  { name: "Google Analytics", category: "Analytics", icon: SiGoogleanalytics, color: "#F9AB00" },
];

interface BallPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
}

const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>("All");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ballWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const ballElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const physicsRef = useRef<BallPhysics[]>([]);
  const isRunningRef = useRef<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean; lastMove: number }>({
    x: -9999,
    y: -9999,
    isInside: false,
    lastMove: 0,
  });

  // Filter tech stack items
  const filteredTechs = useMemo(() => {
    if (selectedCategory === "All") return techStackData;
    return techStackData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Calculate columns responsively based on screen width
  const getColumnCount = useCallback((): number => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth <= 600) return 2;
    if (window.innerWidth <= 960) return 3;
    if (window.innerWidth <= 1280) return 4;
    return 5;
  }, []);

  const [columns, setColumns] = useState<number>(getColumnCount());

  useEffect(() => {
    const handleResize = () => {
      setColumns(getColumnCount());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getColumnCount]);

  // Initialize/reset physics objects when filtered tech changes
  useEffect(() => {
    physicsRef.current = filteredTechs.map(() => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      scale: 1,
    }));
    ballWrappersRef.current = [];
    ballElementsRef.current = [];
  }, [filteredTechs]);

  // Physics Simulation Loop
  const startPhysicsLoop = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const tick = () => {
      if (!containerRef.current) {
        isRunningRef.current = false;
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const mouse = mouseRef.current;
      const physics = physicsRef.current;
      const wrappers = ballWrappersRef.current;
      const elements = ballElementsRef.current;

      const basePositions = wrappers.map((wrap) => {
        if (!wrap) return { cx: 0, cy: 0 };
        const rect = wrap.getBoundingClientRect();
        return {
          cx: rect.left + rect.width / 2 - containerRect.left,
          cy: rect.top + rect.height / 2 - containerRect.top,
        };
      });

      let totalMotion = 0;

      // 1. Cursor Collision Force
      for (let i = 0; i < physics.length; i++) {
        const p = physics[i];
        const base = basePositions[i];
        const curX = base.cx + p.x;
        const curY = base.cy + p.y;

        if (mouse.isInside) {
          const dx = curX - mouse.x;
          const dy = curY - mouse.y;
          const dist = Math.hypot(dx, dy);
          const collisionRadius = 100; // Influence / collision radius around cursor

          if (dist < collisionRadius && dist > 0.001) {
            const overlap = (collisionRadius - dist) / collisionRadius;
            const force = Math.pow(overlap, 1.5) * 16;
            const nx = dx / dist;
            const ny = dy / dist;

            p.vx += nx * force;
            p.vy += ny * force;
            p.scale = Math.min(1.18, 1 + overlap * 0.18);
          }
        }
      }

      // 2. Inter-Ball Collisions (Billiard-like elastic collisions)
      for (let i = 0; i < physics.length; i++) {
        for (let j = i + 1; j < physics.length; j++) {
          const pA = physics[i];
          const pB = physics[j];
          const baseA = basePositions[i];
          const baseB = basePositions[j];

          const posAx = baseA.cx + pA.x;
          const posAy = baseA.cy + pA.y;
          const posBx = baseB.cx + pB.x;
          const posBy = baseB.cy + pB.y;

          const dx = posBx - posAx;
          const dy = posBy - posAy;
          const dist = Math.hypot(dx, dy);
          const minDist = 92; // Ball collision boundary

          if (dist < minDist && dist > 0.001) {
            const overlap = (minDist - dist) * 0.5;
            const nx = dx / dist;
            const ny = dy / dist;

            // Push apart
            pA.x -= nx * overlap * 0.5;
            pA.y -= ny * overlap * 0.5;
            pB.x += nx * overlap * 0.5;
            pB.y += ny * overlap * 0.5;

            // Elastic momentum impulse
            const dvx = pA.vx - pB.vx;
            const dvy = pA.vy - pB.vy;
            const dot = dvx * nx + dvy * ny;

            if (dot > 0) {
              const impulse = dot * 0.65;
              pA.vx -= impulse * nx;
              pA.vy -= impulse * ny;
              pB.vx += impulse * nx;
              pB.vy += impulse * ny;
            }
          }
        }
      }

      // 3. Spring Return, Friction Damping, and DOM Transform Update
      for (let i = 0; i < physics.length; i++) {
        const p = physics[i];
        const el = elements[i];

        // Hooke's law spring back to rest position (0, 0)
        const springK = 0.12;
        const damping = 0.78;

        p.vx = (p.vx - p.x * springK) * damping;
        p.vy = (p.vy - p.y * springK) * damping;

        p.x += p.vx;
        p.y += p.vy;

        // Scale relaxation
        p.scale += (1 - p.scale) * 0.12;

        totalMotion += Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.x) + Math.abs(p.y);

        if (el) {
          el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) scale(${p.scale.toFixed(3)})`;
        }
      }

      // Stop loop when idle to save CPU
      if (!mouse.isInside && totalMotion < 0.08) {
        for (let i = 0; i < physics.length; i++) {
          const p = physics[i];
          p.x = 0;
          p.y = 0;
          p.vx = 0;
          p.vy = 0;
          p.scale = 1;
          const el = elements[i];
          if (el) {
            el.style.transform = "translate3d(0px, 0px, 0) scale(1)";
          }
        }
        isRunningRef.current = false;
        return;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, []);

  // Pointer Move Handler for real-time collision detection
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isInside: true,
      lastMove: Date.now(),
    };
    startPhysicsLoop();
  };

  const handlePointerLeave = () => {
    mouseRef.current.isInside = false;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
  };

  return (
    <div className="techstack" id="techstack">
      <div className="techstack-header">
        <h2>
          My <span>Tech</span>
        </h2>
        <p className="techstack-subtitle">
          Specialized Flutter &amp; Mobile ecosystem, architecture, cloud, and tools
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="tech-categories-bar">
        {techCategories.map((cat) => (
          <button
            key={cat}
            className={`tech-category-btn ${
              selectedCategory === cat ? "tech-category-active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
            data-cursor="disable"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Collideable Interactive Tech Grid Container */}
      <div
        ref={containerRef}
        className="tech-grid-container"
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div
          className="tech-grid"
          style={{ "--tech-columns": columns } as React.CSSProperties}
        >
          {filteredTechs.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={tech.name}
                ref={(el) => {
                  ballWrappersRef.current[index] = el;
                }}
                className="tech-ball-wrapper"
              >
                <div
                  ref={(el) => {
                    ballElementsRef.current[index] = el;
                  }}
                  className="tech-ball"
                  title={`${tech.name} (${tech.category})`}
                  aria-label={tech.name}
                  data-cursor="disable"
                >
                  <div className="tech-icon-container">
                    <IconComponent color={tech.color} />
                  </div>
                </div>
                <span className="tech-label">{tech.name}</span>
                <span className="tech-tag">{tech.category}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
