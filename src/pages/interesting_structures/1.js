const arrConstructor = () => {
  let a = [];
  let colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
  let degree = 0;
  let j = 1;
  let radiusMult = 1;
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
      zMult *= -1;
    } else {
      z += zMult;
    }
  }
  setArr(a);
};
