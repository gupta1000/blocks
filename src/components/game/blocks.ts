import produce from "immer";

import { GridData, TileData } from "./utils";

export interface Piece {
  key: number;
}

const pieces = [
  [[1, 1, 1, 1, 1]],
  [[1, 1, 1, 1], [1]],
  [[1, 1, 1], [1], [1]],
  [
    [1, 1, 1],
    [1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
  ],
  [
    [1, 1, 1],
    [0, 1],
    [0, 1],
  ],
  [
    [0, 1, 1],
    [1, 1],
    [0, 1],
  ],
];

const gridWithPiece = (
  grid: GridData,
  r: number,
  c: number,
  key: number,
  data: TileData
) => {
  const piece = pieces[key];

  return produce(grid, (draft) => {
    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece[i].length; j++) {
        const square = draft[r + i]?.[c + j];
        if (!square || !piece[i][j]) {
          continue;
        }

        draft[r + i][c + j] = data;
      }
    }
  });
};

export default {
  pieces,
  gridWithPiece,
};
