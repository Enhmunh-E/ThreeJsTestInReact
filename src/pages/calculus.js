import React, { useState, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Sphere } from "../components/spheremesh";
import * as THREE from "three";
import { ScrollComp } from "../components/scrollComp";
// function Camera(props) {
//   const ref = useRef();
//   const { setDefaultCamera } = useThree();
//   useEffect(() => void setDefaultCamera(ref.current), []);
//   useFrame(() => ref.current.updateMatrixWorld());
//   return <perspectiveCamera ref={ref} {...props} />;
// }
const Camera = (props) => {
  const ref = useRef();
  const set = useThree((state) => state.set);
  useEffect(() => void set({ camera: ref.current }), []);
  useFrame(() => ref.current.updateMatrixWorld());
  return <perspectiveCamera ref={ref} {...props} />;
};
const CanvasComp = ({ cameraPosition }) => {
  const [arr, setArr] = useState([]);
  useThree(({ camera }) => {
    camera.addEventListener("change", (o) => {
      console.log(o);
    });
    camera.rotation.set(0, 0, 0);
  });
  const arrConstructor = () => {
    let a = [];
    let z = 0;
    for (let i = 0; i <= Math.PI * 2 * 4; i += Math.PI / 12) {
      a.push({
        x: Math.sin(i) * 2 * i,
        y: Math.cos(i) * 2 * i,
        z: z,
        color: "#37383a",
      });
      z += 10;
      // i ertesen
      // i*3 urttai
    }
    // let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
    // let howmany = 64;
    // let radius = 32;
    // let z = 100;
    // let dist = 2 / howmany;
    // for (let level = 0; level < 20; level++) {
    //   for (let i = 0, j = 0; i < howmany; i++, j += (Math.PI * 2) / howmany) {
    //     a.push({
    //       x: Math.sin(j) * radius,
    //       y: Math.cos(j) * radius,
    //       z: z,
    //       color: colors[level % colors.length],
    //     });
    //     z -= dist * 2;
    //   }
    // }
    setArr(a);
  };
  useEffect(() => {
    arrConstructor();
  }, []);
  return (
    <>
      <ambientLight intensity={1} />
      {arr.map((item, index) => {
        return (
          <Sphere
            key={index}
            index={index}
            visible={cameraPosition - 90 > item.z}
            args={[1, 64, 64]}
            position={[item.x, item.y, item.z]}
            color={item.color}
          />
        );
      })}
    </>
  );
};

// camera={{ position: [0, 0, 170], fov: 75 }}
export const Calculus = () => {
  const [scroll, setScroll] = useState(0);
  const onScroll = (e) => {
    // console.log(e.target.scrollTop);
    setScroll(e.target.scrollTop);
  };
  return (
    <>
      <ScrollComp onScroll={onScroll} />
      <Canvas>
        <Camera position={[0, 0, 300 - scroll / 5]} far={64} />
        <CanvasComp cameraPosition={300 - scroll / 5} />
      </Canvas>
    </>
  );
};
export default Calculus;
