import React from "react";

import { Square } from "../square";

import { GridData, GRID_LENGTH } from "../utils";

import "./grid.css";

interface GridProps {
  grid: GridData;
  onDropPiece: (r: number, c: number, k: number) => void;
}

export const Grid: React.FC<GridProps> = (props) => {
  const gridKeys = Array.from(Array(GRID_LENGTH).keys());

  const onDropPiece = (r: number, c: number) => (k: number) =>
    props.onDropPiece(r, c, k);

  const rows = gridKeys.map((i) =>
    gridKeys.map((j) => {
      const data = props.grid[i]?.[j];
      return (
        <Square
          {...data}
          onDropPiece={onDropPiece(i, j)}
          key={`square-${i}-${j}`}
        />
      );
    })
  );

  return (
    <div className="Grid">
      {rows.map((row, i) => (
        <div className="Grid-row" key={`row-${i}`}>
          {row}
        </div>
      ))}
    </div>
  );
};

export default Grid;
