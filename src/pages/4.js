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
export default FirstPage;
