import React from "react";
export const Sphere = ({
  args,
  position,
  index,
  color,
  setMousePosition,
  visible,
  mousePosition,
}) => {
  const [mouseOn, setMouseOn] = React.useState(false);
  const [firstOut, setFirstOut] = React.useState(false);
  return (
    <mesh
      style={{ zIndex: position[2] }}
      onPointerEnter={(e) => {
        setMouseOn(true);
      }}
      onPointerOut={() => {
        setMouseOn(false);
      }}
      // onClick={(e) => {
      //   if (mousePosition == null) {
      //     setMousePosition({
      //       x: e.clientX,
      //       y: e.clientY,
      //     });
      //   } else {
      //     setMousePosition(null);
      //   }
      // }}
      castShadow
      visible={visible}
      position={position}
    >
      {/* <circleBufferGeometry attach="geometry" args={args} /> */}
      <sphereBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={mouseOn ? "red" : color} />
    </mesh>
  );
};
export default Sphere;
