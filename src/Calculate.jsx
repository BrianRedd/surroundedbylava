/** @module Calculate */

import React from "react";

import * as data from "./data/gridData";

/**
 * @function Calculate
 * @description Component with logic for determining which open spaces are ot be covered in lava
 * @param {Object} props 
 * @returns {React.Component}
 */
const Calculate = props => {
  const { grid, setGrid, setVisited } = props;

  const thisGrid = [...grid];

  /**
   * @function boundardDFS
   * @description recursive DFS helper function that converts all squared touching an exit to "*"
   * @param {Array} thisGrid - copy of source grid array
   * @param {Number} x - coordinate
   * @param {Number} y - coordinate
   */
  const boundaryDFS = (thisGrid, x, y) => {
    if (x > thisGrid.length - 1 || x < 0 || y > thisGrid[0].length || y < 0)
      return;

    if (thisGrid[x][y] === "O") thisGrid[x][y] = "*";

    if (x > 0 && thisGrid[x - 1][y] === "O") {
      boundaryDFS(thisGrid, x - 1, y);
    }

    if (x < thisGrid.length - 1 && thisGrid[x + 1][y] === "O") {
      boundaryDFS(thisGrid, x + 1, y);
    }

    if (y > 0 && thisGrid[x][y - 1] === "O") {
      boundaryDFS(thisGrid, x, y - 1);
    }

    if (x < thisGrid[0].length - 1 && thisGrid[x][y + 1] === "O") {
      boundaryDFS(thisGrid, x, y + 1);
    }

    return;
  };

  /**
   * @function convertToLava
   * @description loops through exits, applies boundaryDFS recursive function to each, then converts
   * untouched open squares to lava
   */
  const convertToLava = () => {
    const visited = [];
    if (!thisGrid.length === 0 || !thisGrid[0].length) {
      return;
    }
    let rows = thisGrid.length;
    let columns = thisGrid[0].length;

    data.gateSquares.forEach(square => {
      const coords = square.split("_");
      const x = parseFloat(coords[0]);
      const y = parseFloat(coords[1]);

      if (thisGrid[x][y] === "X") boundaryDFS(thisGrid, x, y);
    });

    for (let x = 0; x < rows; x += 1) {
      for (let y = 0; y < columns; y += 1) {
        if (thisGrid[x][y] === "O") {
          thisGrid[x][y] = "L";
          visited.push(`${x}_${y}`);
        } else if (thisGrid[x][y] === "*") {
          thisGrid[x][y] = "O";
        }
      }
    }
    setGrid(thisGrid);
    setVisited(visited);
  };

  return (
    <div>
      <button onClick={convertToLava}>Convert</button>
    </div>
  );
};

export default Calculate;
