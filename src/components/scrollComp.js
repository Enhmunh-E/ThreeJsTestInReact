import React from "react";
export const ScrollComp = ({
  onScroll,
  mouse,
  setMouse,
  oldMouse,
  setOldMouse,
}) => (
  <div
    style={{
      height: "100vh",
      width: "100vw",
      overflowY: "scroll",
      border: "1px solid black",
      position: "absolute",
      zIndex: 1,
      opacity: 0,
      right: 0,
      top: 0,
    }}
    onScroll={onScroll}
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
        }, 200);
      }
    }}
  >
    {[...Array(100)].map((_, i) => (
      <div
        key={i}
        style={{ height: "200px", width: "10px", border: "1px solid black" }}
      ></div>
    ))}
  </div>
);
