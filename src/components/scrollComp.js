import React from "react";
export const ScrollComp = ({ onScroll }) => (
  <div
    style={{
      height: "100px",
      width: "20px",
      overflowY: "scroll",
      border: "1px solid black",
      position: "absolute",
      zIndex: 5,
      //   position: "absolute",
      //   right: 0,
      //   top: 0,
    }}
    onScroll={onScroll}
  >
    {[...Array(100)].map((_, i) => (
      <div
        key={i}
        style={{ height: "10px", width: "10px", border: "1px solid black" }}
      ></div>
    ))}
  </div>
);
