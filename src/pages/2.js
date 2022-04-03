import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Sphere } from "../components/spheremesh";
export const SecondPage = () => {
  const [arr, setArr] = useState([]);
  const arrConstructor = () => {
    let a = [];
    // array of color text with length 10
    // rainbow of color array
    // rainbow of color array
    let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
    let degree = 0;
    for (let layer = 0; layer < 40; layer++) {
      for (let i = 0, j = 0; i < 8; i++, j += (Math.PI * 2) / 8) {
        a.push({
          x: Math.sin(j + degree) * 10,
          y: Math.cos(j + degree) * 10,
          z: layer * 5,
          color: colors[layer % colors.length],
        });
      }
      degree += Math.PI / 18;
    }
    setArr(a);
  };
  useEffect(() => {
    arrConstructor();
  }, []);
  return (
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
      <OrbitControls />
    </Canvas>
  );
};
export default SecondPage;
