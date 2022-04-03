import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Sphere } from "../components/spheremesh";
export const FirstPage = () => {
  const [arr, setArr] = useState([]);
  const arrConstructor = () => {
    let a = [];
    // array of color text with length 10
    // rainbow of color array
    // rainbow of color array
    let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
    for (let level = 0; level < 40; level++) {
      for (let i = 0, j = 0; i < 8; i++, j += (Math.PI * 2) / 8) {
        a.push({
          x: Math.sin(j) * 10,
          y: Math.cos(j) * 10,
          z: level * 5,
          color: colors[level % colors.length],
        });
      }
    }
    // for (
    //   let i = 0, j = 0, z = 0, multiplier = 0.8;
    //   i < Math.PI * 2 * 40;
    //   i += Math.PI / 8, j++, z += 0.25, multiplier += 0.005
    // ) {
    //   a.push({
    //     x: Math.sin(i) * 10 * multiplier,
    //     y: Math.cos(i) * 10 * multiplier,
    //     z: z,
    //     color: "blue",
    //   });
    // }
    setArr(a);
  };
  useEffect(() => {
    arrConstructor();
  }, []);
  return (
    <>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={1} />
        {arr.map((item, index) => {
          return (
            <Sphere
              key={index}
              index={index}
              args={[1, 64, 64]}
              position={[item.x, item.y, item.z]}
              color={item.color}
            />
          );
        })}

        {/* <pointLight position={[-10, 0, -20]} intensity={0.5} /> */}
        {/* <pointLight position={[0, -10, 0]} intensity={0.5} /> */}
        {/* <pointLight position={[0, -10, 0]} intensity={1.5} /> */}
        {/* <mesh>
              <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
              <meshStandardMaterial attach="material" color="white" />
            </mesh> */}

        {/* <SpinningMesh position={[0, 1, 0]} args={[1, 1, 1]} color="cyan" />
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
            </group> */}
        <OrbitControls />
      </Canvas>
    </>
  );
};
export default FirstPage;
