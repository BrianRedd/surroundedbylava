/** @module App */

import React, { useState } from "react";
import "./App.css";

import * as data from "./data/gridData";

import Grid from "./Grid";
import Calculate from "./Calculate";

/**
 * @function App
 * @description Functional Component for Island Problem app
 * @returns {React.Component}
 */
function App() {
  const [grid, setGrid] = useState(null);
  const [visited, setVisited] = useState(null);

  /**
   * @function createGrid
   * @description generates 11 by 7 grid, each square is either open ("O") or lava ("L") 50/50
   * Some corner squares (that don't exist in the Pompeii board) are skipped, and open exits are also
   * changed to "X"
   */
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
    <header>
      <a href="http://rbrianredd.com" target="_new">rbr.com</a>
      <a href="https://github.com/BrianRedd/reactislandproblem" target="_new">GitHub</a>
    </header>
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
