import React, { useState } from "react";
import "./App.css";

import * as data from "./data/gridData";

import Grid from "./Grid";
import Calculate from "./Calculate";

function App() {
  const [grid, setGrid] = useState(null);
  const [visited, setVisited] = useState(null);

  const createGrid = () => {
    const temp = [];
    setVisited(null);
    for (let i = 0; i < 7; i += 1) {
      const row = [];
      for (let ii = 0; ii < 11; ii += 1) {
        let gridValue = Math.round(Math.random()) ? "L" : "O";
        if (data.voidLavaSquares.includes(`${i}_${ii}`)) {
          gridValue = "W";
        }
        if (gridValue === "O" && data.gateSquares.includes(`${i}_${ii}`)) {
          gridValue = "X";
        }
        row.push(gridValue);
      }
      temp.push(row);
    }
    setGrid(temp);
  };

  return (
    <div className="App">
      <h1>Surrounded By Lava</h1>
      {grid && (
        <React.Fragment>
          <Grid grid={grid} />
          <Calculate grid={grid} setGrid={setGrid} setVisited={setVisited} />
        </React.Fragment>
      )}
      <button onClick={createGrid}>New Grid</button>
      <div>{JSON.stringify(visited)}</div>
    </div>
  );
}

export default App;
