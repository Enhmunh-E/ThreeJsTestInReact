import React, { useState, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import { Sphere } from "../components/spheremesh";
// import * as THREE from "three";
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
const CanvasComp = ({ cameraPosition, oldMouse, width }) => {
  const [arr, setArr] = useState([]);
  const arrConstructor = () => {
    let a = [];
    let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
    let howmany = 64;
    let z = 100;
    let dist = 2 / howmany;
    for (
      let i = 0, zadder = 10;
      i <= Math.PI * 2 * 20;
      i += Math.PI / 12, zadder = Math.max(1, zadder - 0.1)
    ) {
      let radius = Math.min(i * 3, 32);
      a.push({
        x: Math.sin(i) * radius,
        y: Math.cos(i) * radius,
        z: z,
        color: "#37383a",
      });
      z += zadder;
      // i ertesen
      // i*3 urttai
    }
    z--;
    // let distMult = 3;
    // for (let level = 0; level < 20; level++) {
    //   for (let i = 0, j = 0; i < howmany; i++, j += (Math.PI * 2) / howmany) {
    //     a.push({
    //       x: Math.sin(j) * radius,
    //       y: Math.cos(j) * radius,
    //       z: z,
    //       color: "#37383a",
    //     });
    //     z += dist * distMult;
    //     if (distMult > 1) distMult -= 0.1;
    //   }
    //   // dist = (Math.Pi * 2) / howmany;
    //   // if (dist >= 1 / howmany) {
    //   //   dist -= 0.1;
    //   // }
    // }
    setArr(a);
  };
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
export const FirstPage = () => {
  const [scroll, setScroll] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [oldMouse, setOldMouse] = useState({ x: 0, y: 0 });
  const onScroll = (e) => {
    setScroll(e.target.scrollTop);
  };
  const width = window.innerWidth;
  return (
    <div
      style={{ height: "95vh", width: "95vh", overflow: "hidden" }}
      onMouseMove={(event) => {
        if (mouse != null) {
          setMouse({
            x: event.clientX,
            y: event.clientY,
          });
          setTimeout(() => {
            setOldMouse({
              x: event.clientX,
              y: event.clientY,
            });
          }, 1000);
        }
      }}
    >
      <ScrollComp
        onScroll={onScroll}
        setMouse={setMouse}
        mouse={mouse}
        setOldMouse={setOldMouse}
        oldMouse={oldMouse}
      />
      <Canvas
        onMouseOver={(event) => {
          setMouse({
            x: event.clientX,
            y: event.clientY,
          });
          setTimeout(() => {
            setOldMouse({
              x: event.clientX,
              y: event.clientY,
            });
          }, 200);
        }}
        onMouseLeave={() => {
          setMouse(null);
          setTimeout(() => {
            setOldMouse(null);
          }, 200);
        }}
      >
        {/* <OrbitControls /> */}
        <ambientLight intensity={1} />
        <Camera
          position={[
            mouse ? -(mouse.x - width / 2) / 20 : 0,
            mouse ? (mouse.y - width / 2) / 20 : 0,
            Math.max(1100 - scroll / 5, 200),
          ]}
          far={64}
        />
        <CanvasComp
          width={width}
          oldMouse={oldMouse}
          cameraPosition={Math.max(1100 - scroll / 5, 200)}
        />
      </Canvas>
    </div>
  );
};
export default FirstPage;
