import React, { useState } from "react";
import "./App.css";
import Grid from "./Grid";
import Calculate from "./Calculate";

function App() {
  const [length, setLength] = useState(5);
  const [grid, setGrid] = useState(null);
  const [visited, setVisited] = useState(null);

  const createGrid = () => {
    const temp = [];
    const vTemp = [];
    for (let i = 0; i < length; i += 1) {
      const row = [];
      const vRow = [];
      for (let ii = 0; ii < length; ii += 1) {
        row.push(Math.round(Math.random()));
        vRow.push(0);
      }
      temp.push(row);
      vTemp.push(vRow);
    }
    setGrid(temp);
    setVisited(vTemp);
  };

  return (
    <div className="App">
      <h1>Island Problem</h1>
      <div style={{ margin: "5px" }}>
        <span style={{ margin: "5px" }}>Number of Squares:</span>
        <select
          onChange={e => {
            setLength(e.target.value);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      {grid && (
        <React.Fragment>
          <Grid grid={grid} />
          <Calculate grid={grid} visited={visited} createGrid={createGrid} />
        </React.Fragment>
      )}
      {!grid && <button onClick={createGrid}>New Grid</button>}
    </div>
  );
}

export default App;
