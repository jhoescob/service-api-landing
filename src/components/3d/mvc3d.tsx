"use client";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";
import { Mesh } from "three";

import { Euler, Vector3, Color } from "@react-three/fiber";

function Dodecahedron({
  time,
  text,
  texttwo,
  ...props
}: {
  time?: number;
  text: string;
  texttwo: string;
  position: Vector3;
  //scale: Vector3;
  colorMes: string;
}) {
  const ref = useRef<Mesh>(null!);
  const [active, setActive] = useState(false);
  useFrame(
    (state, delta) => (
      (ref.current.rotation.y += delta / 4),
      (ref.current.rotation.x += delta / 4)
    )
  );

  const { scale }: any = useSpring({
    scale: active ? 0.8 : 0.5,
    config: config.wobbly,
  });

  return (
    <animated.mesh
      {...props}
      ref={ref}
      scale={scale}
      onPointerOver={(event) => setActive(true)}
      onPointerOut={(event) => setActive(false)}
    >
      <dodecahedronGeometry />
      <meshStandardMaterial
        roughness={0.75}
        emissive="#022"
        color={props.colorMes}
      />
      <Html distanceFactor={10}>
        <div className="flex flex-col gap-1 bg-black/50 text-white p-5  min-h-16 content items-center justify-center rounded-xl border-cyan-200/40 border ">
          <p className="scroll-m-20 text-2xl font-semibold tracking-tight min-h-min text-center">
            {text}
          </p>
          {active && (
            <p className="leading-7 text-2 min-h-min text-center w-[200px]">
              {texttwo}
            </p>
          )}
        </div>
      </Html>
    </animated.mesh>
  );
}

export const Experience = () => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 7.5] }}>
        <ambientLight intensity={Math.PI / 2} />
        <pointLight color="indianred" />
        <directionalLight />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
          color="orange"
        />
        <pointLight
          position={[-10, -10, -10]}
          decay={1}
          intensity={Math.PI}
          color="lightblue"
        />
        <Dodecahedron
          position={[-1, 2, 0]}
          text="View"
          texttwo="Use it as you want!"
          colorMes={"#004"}
        />
        <Dodecahedron
          position={[-2.5, 0, 0]}
          text="Control"
          texttwo="Using Zod for Validation"
          colorMes={"#700"}
        />
        <Dodecahedron
          position={[-1, -2, 0]}
          text="Model"
          texttwo="Using PostgreeSQL and Drizzle ORM"
          colorMes={"#070"}
        />
      </Canvas>
    </>
  );
};
