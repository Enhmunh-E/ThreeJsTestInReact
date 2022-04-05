import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { softShadows, OrbitControls } from "@react-three/drei";
import { Sphere } from "./components/spheremesh";
import "./App.scss";

softShadows();

const randomColor = () => {
  return (
    "#" + ("00000" + ((Math.random() * 16777216) << 0).toString(16)).substr(-6)
  );
};
const App = () => {
  const [arr, setArr] = useState([]);
  const [position, setPosition] = useState(null);
  const arrConstructor = () => {
    let a = [];
    let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
    for (
      let level = 0, z = 0, howmany = 1, multiplier = 0.5;
      level < 40;
      level++, howmany += 0.5
    ) {
      let color = colors[level % colors.length];
      for (
        let i = 0, degree = 0;
        i < howmany;
        i++, multiplier += 0.001, degree += (Math.PI * 2) / howmany
      ) {
        a.push({
          x: Math.sin(degree) * 10 * multiplier,
          y: Math.cos(degree) * 10 * multiplier,
          z: z,
          color: color,
        });
        z += 10;
      }
    }
    setArr(a);
  };
  useEffect(() => {
    arrConstructor();
  }, []);
  return (
    <>
      {position !== null && (
        <div
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            zIndex: 1,
          }}
        >
          Element
        </div>
      )}
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={1} />
        {arr.map((item, index) => {
          return (
            <Sphere
              setMousePosition={setPosition}
              mousePosition={position}
              key={index}
              index={index}
              args={[0.5, 64, 64]}
              position={[item.x, item.y, item.z]}
              color={item.color}
            />
          );
        })}

        <OrbitControls />
      </Canvas>
    </>
  );
};

export default App;

/* <pointLight position={[-10, 0, -20]} intensity={0.5} /> */

/* <pointLight position={[0, -10, 0]} intensity={0.5} /> */

/* <pointLight position={[0, -10, 0]} intensity={1.5} /> */

/* <mesh>
          <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
          <meshStandardMaterial attach="material" color="white" />
        </mesh> */

/* <SpinningMesh position={[0, 1, 0]} args={[1, 1, 1]} color="cyan" />
        <SpinningMesh position={[-2, 1, -5]} args={[1, 1, 1]} color="black" />
        <SpinningMesh position={[5, 1, -2]} args={[1, 1, 1]} color="white" />
        <Text />
        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.5} />
          </mesh>
        </group> */
