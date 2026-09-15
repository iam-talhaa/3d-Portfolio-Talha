import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/flutter.webp",
  "/images/dart.webp",
  "/images/firebase.webp",
  "/images/rest-api.webp",
  "/images/sqlite.webp",
  "/images/git.webp",
  "/images/androidstudio.webp",
  "/images/figma.webp",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

// 24 spheres evenly distributing all 8 technologies
// Arranged strictly on the 2D plane (Z = 0) around the specific center location
const sphereData = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2 + (i % 2) * 0.25;
  const radius = 1.4 + (i % 3) * 1.3;
  return {
    scale: 0.8 + (i % 3) * 0.08,
    textureIndex: i % imageUrls.length,
    initialPos: [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius - 1.8,
      0,
    ] as [number, number, number],
  };
});

type InteractionState = {
  isHovered: boolean;
  lastInteraction: number;
  pointerPos: { x: number; y: number };
};

type SphereProps = {
  scale: number;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
  initialPos: [number, number, number];
  interactionState: InteractionState;
};

function SphereGeo({
  scale,
  material,
  isActive,
  initialPos,
  interactionState,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const targetPoint = useMemo(() => new THREE.Vector3(0, -1.8, 0), []);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.04, delta);

    const trans = api.current.translation();
    const timeSinceInteraction =
      (Date.now() - interactionState.lastInteraction) / 1000;

    // Active moving phase: user is hovering or moved cursor within the last 2 seconds
    const isMoving = interactionState.isHovered || timeSinceInteraction < 2.0;

    // 2-Dimensional direction towards specific location (X: horizontal, Y: vertical)
    const dx = targetPoint.x - trans.x;
    const dy = targetPoint.y - trans.y;
    const dist = Math.hypot(dx, dy);

    if (isMoving) {
      // Free moving phase: low damping for lively 2D motion and collisions
      api.current.setLinearDamping(1.5);
      api.current.setAngularDamping(2.0);

      // Centering force so balls stay within view bounds
      if (dist > 0.1) {
        const centerForce = Math.min(dist * 18, 40) * delta * scale;
        api.current.applyImpulse(
          { x: (dx / dist) * centerForce, y: (dy / dist) * centerForce, z: 0 },
          true
        );
      }

      // Cursor interaction: push ball away when cursor is nearby
      if (interactionState.isHovered) {
        const pX = interactionState.pointerPos.x;
        const pY = interactionState.pointerPos.y;
        const fromPointerX = trans.x - pX;
        const fromPointerY = trans.y - pY;
        const pDist = Math.hypot(fromPointerX, fromPointerY);
        const hitRadius = scale + 1.8;

        if (pDist < hitRadius && pDist > 0.01) {
          const pushMagnitude =
            Math.pow(1 - pDist / hitRadius, 1.4) * 65 * delta * scale;
          api.current.applyImpulse(
            {
              x: (fromPointerX / pDist) * pushMagnitude,
              y: (fromPointerY / pDist) * pushMagnitude,
              z: 0,
            },
            true
          );
          interactionState.lastInteraction = Date.now();
        }
      }
    } else {
      // Stopping phase: converge to the specific center location, collide in 2D, and come to a rest
      const settleProgress = Math.min(1, (timeSinceInteraction - 2.0) / 1.5);
      const currentDamping = 2.0 + settleProgress * 8.0;
      api.current.setLinearDamping(currentDamping);
      api.current.setAngularDamping(currentDamping);

      if (dist > 0.05) {
        const pullMagnitude = Math.min(dist * 28, 55) * delta * scale;
        api.current.applyImpulse(
          {
            x: (dx / dist) * pullMagnitude,
            y: (dy / dist) * pullMagnitude,
            z: 0,
          },
          true
        );
      }

      // Completely zero out velocity when settled so the balls stop firmly
      if (settleProgress >= 0.9) {
        const linvel = api.current.linvel();
        if (Math.hypot(linvel.x, linvel.y) < 0.15) {
          api.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
          api.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
      }
    }
  });

  return (
    <RigidBody
      linearDamping={1.5}
      angularDamping={2.0}
      friction={0.3}
      restitution={0.5}
      position={initialPos}
      enabledTranslations={[true, true, false]}
      lockRotations={true}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  isActive: boolean;
  interactionState: InteractionState;
};

function Pointer({ isActive, interactionState }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);
  const prevPointer = useRef({ x: 999, y: 999 });

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;

    if (
      Math.abs(pointer.x - prevPointer.current.x) > 0.005 ||
      Math.abs(pointer.y - prevPointer.current.y) > 0.005
    ) {
      prevPointer.current.x = pointer.x;
      prevPointer.current.y = pointer.y;
      interactionState.lastInteraction = Date.now();
    }

    if (interactionState.isHovered) {
      const targetVec = {
        x: (pointer.x * viewport.width) / 2,
        y: (pointer.y * viewport.height) / 2,
        z: 0,
      };
      interactionState.pointerPos.x = targetVec.x;
      interactionState.pointerPos.y = targetVec.y;
      ref.current.setNextKinematicTranslation(targetVec);
    } else {
      ref.current.setNextKinematicTranslation({ x: 100, y: 100, z: 0 });
    }
  });

  return (
    <RigidBody
      position={[100, 100, 0]}
      type="kinematicPosition"
      colliders={false}
      enabledTranslations={[true, true, false]}
      ref={ref}
    >
      <BallCollider args={[1.5]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const interactionState = useRef<InteractionState>({
    isHovered: false,
    lastInteraction: 0,
    pointerPos: { x: 100, y: 100 },
  }).current;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "150px 0px", threshold: 0 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div
      className="techstack"
      ref={containerRef}
      onPointerEnter={() => {
        interactionState.isHovered = true;
        interactionState.lastInteraction = Date.now();
      }}
      onPointerLeave={() => {
        interactionState.isHovered = false;
      }}
      onPointerMove={() => {
        interactionState.isHovered = true;
        interactionState.lastInteraction = Date.now();
      }}
    >
      <h2> My Techstack</h2>

      <Canvas
        shadows
        dpr={[1, 1.5]}
        frameloop={isInView ? "always" : "never"}
        gl={{
          alpha: true,
          stencil: false,
          depth: false,
          antialias: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, 4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isInView} interactionState={interactionState} />
          {sphereData.map((data, i) => (
            <SphereGeo
              key={i}
              scale={data.scale}
              initialPos={data.initialPos}
              material={materials[data.textureIndex]}
              isActive={isInView}
              interactionState={interactionState}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
