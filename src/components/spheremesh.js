import React from "react";
export const Sphere = ({
  args,
  position,
  index,
  color,
  setMousePosition,
  mousePosition,
}) => {
  const [mouseOn, setMouseOn] = React.useState(false);
  const [firstOut, setFirstOut] = React.useState(false);
  return (
    <mesh
      onPointerEnter={(e) => {
        setMouseOn(true);
        //   setMousePosition(null);
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      onPointerOut={() => {
        setMouseOn(false);
        if (firstOut) setMousePosition(null);
        else setFirstOut(true);
        console.log("onPointerOut");
      }}
      onClick={(e) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      castShadow
      position={position}
    >
      {/* <circleBufferGeometry attach="geometry" args={args} /> */}
      <sphereBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={mouseOn ? "red" : color} />
    </mesh>
  );
};
export default Sphere;
