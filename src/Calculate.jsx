import React from "react";

import * as data from "./data/gridData";

const Calculate = props => {
  const { grid, setVisited } = props;

  const thisGrid = [...grid];

  const boundaryDFS = (thisGrid, i, j) => {
    if (i > thisGrid.length - 1 || i < 0 || j > thisGrid[0].length || j < 0)
      return;

    if (thisGrid[i][j] === "O") thisGrid[i][j] = "*";

    if (i > 0 && thisGrid[i - 1][j] === "O") {
      boundaryDFS(thisGrid, i - 1, j);
    }

    if (i < thisGrid.length - 1 && thisGrid[i + 1][j] === "O") {
      boundaryDFS(thisGrid, i + 1, j);
    }

    if (j > 0 && thisGrid[i][j - 1] === "O") {
      boundaryDFS(thisGrid, i, j - 1);
    }

    if (i < thisGrid[0].length - 1 && thisGrid[i][j + 1] === "O") {
      boundaryDFS(thisGrid, i, j + 1);
    }

    return;
  };

  const convertToLava = () => {
    const visited = [];
    if (!thisGrid.length === 0 || !thisGrid[0].length) {
      return;
    }
    let rows = thisGrid.length;
    let columns = thisGrid[0].length;

    data.gateSquares.forEach(square => {
      const coords = square.split("_");
      const i = parseFloat(coords[0]);
      const j = parseFloat(coords[1]);

      if (thisGrid[i][j] === "X") boundaryDFS(thisGrid, i, j);
    });

    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        if (thisGrid[i][j] === "O") {
          thisGrid[i][j] = "L";
          visited.push(`${i}_${j}`);
        } else if (thisGrid[i][j] === "*") {
          thisGrid[i][j] = "O";
        }
      }
    }
    // setGrid(thisGrid);
    setVisited(visited);
  };

  return (
    <div>
      <button onClick={convertToLava}>Convert</button>
    </div>
  );
};

export default Calculate;
