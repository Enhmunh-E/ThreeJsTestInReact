import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Sphere } from "../components/spheremesh";
const deg2rad = (degrees) => degrees * (Math.PI / 180);
export const SecondPage = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 400], fov: 100 }}>
      <ambientLight intensity={1} />
      <CanvasComp />
    </Canvas>
  );
};
const CanvasComp = () => {
  const [arr, setArr] = useState([]);
  const arrConstructor = () => {
    let a = [];
    let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
    let degree = 0;
    let j = 16;
    let radiusMult = 5;
    let mult = 1.1;
    let z = 0;
    let zMult = 1;
    for (let layer = 0; layer < 1000; layer++) {
      a.push({
        x: Math.sin(degree) * radiusMult,
        y: Math.cos(degree) * radiusMult,
        z: z,
        color: colors[layer % colors.length],
      });
      degree += (Math.PI * 2) / j;
      console.log(degree, Math.PI * 2);
      if (degree.toFixed(3) === (Math.PI * 2).toFixed(3)) {
        console.log("hmm");
        radiusMult *= mult;
        if (j % 5 == 0) mult -= 0.01;
        degree = 0;
        j += 1;
        zMult *= 0.95;
        // z--;
      } else {
        z += zMult;
      }
    }
    setArr(a);
  };
  useThree(({ camera }) => {
    camera.rotation.set(Math.PI / 2, 0, 0);
  });
  useEffect(() => {
    arrConstructor();
  }, []);
  return (
    <>
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
    </>
  );
};
export default SecondPage;
