interface TileData {
  color?: string;
}

export type GridData = {[row: number]: {[col: number]: TileData}};

export interface GameState {
  grid: GridData;
}

export const GRID_LENGTH = 20;

export const gridKeys = Array.from(Array(GRID_LENGTH).keys());

export const initGrid = () => {
  const grid: GridData = {};

  gridKeys.forEach((i) => {
    grid[i] = {};
    gridKeys.forEach((j) => {
      grid[i][j] = {};
    });
  });

  return grid;
};