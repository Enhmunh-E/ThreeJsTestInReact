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
    // console.log(camera.left);
    camera.rotation.set(0, 0, 0);
  });
  const arrConstructor = () => {
    let a = [];
    // array of color text with length 10
    // rainbow of color array
    // rainbow of color array
    let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
    let howmany = 64;
    let radius = 32;
    let z = 100;
    let dist = 2 / howmany;
    for (let level = 0; level < 20; level++) {
      for (let i = 0, j = 0; i < howmany; i++, j += (Math.PI * 2) / howmany) {
        a.push({
          x: Math.sin(j) * radius,
          y: Math.cos(j) * radius,
          z: z,
          color: colors[level % colors.length],
        });
        z -= dist * 2;
      }
      // dist = (Math.Pi * 2) / howmany;
      // if (dist >= 1 / howmany) {
      //   dist -= 0.1;
      // }
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
      {/* <primitive object={new THREE.AxesHelper(64)} /> */}
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
      {/* <OrbitControls /> */}
    </>
  );
};

// camera={{ position: [0, 0, 170], fov: 75 }}
export const FirstPage = () => {
  const [scroll, setScroll] = useState(0);
  const onScroll = (e) => {
    // console.log(e.target.scrollTop);
    setScroll(e.target.scrollTop);
  };
  return (
    <>
      <ScrollComp onScroll={onScroll} />
      <Canvas>
        <Camera position={[0, 0, 200 - scroll / 2]} far={64} />
        <CanvasComp cameraPosition={200 - scroll / 2} />
      </Canvas>
    </>
  );
};
export default FirstPage;
