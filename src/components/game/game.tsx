import React from "react";
import produce from "immer";

import { Grid } from "./grid";
import { GridData, gridKeys, initGrid } from "./utils";

interface GameProps {
  userId: string;
}

export const Game: React.FC<GameProps> = (props) => {
  const [grid, setGrid] = React.useState(initGrid());

  const gridRef = React.useRef<GridData>();
  gridRef.current = grid;

  console.log(grid);

  const handleTileClick = (row: number, col: number) => {
    const currentGrid = gridRef.current;
    if (!currentGrid) {
      return;
    }

    setGrid(
      produce(currentGrid, (draft) => {
        if (currentGrid[row][col].color) {
          delete draft[row][col].color;
        } else {
          draft[row][col].color = "#444444";
        }
      })
    );
  };

  React.useEffect(() => {
    const newGrid = produce(grid, (draft) =>
      gridKeys.forEach((i) => {
        gridKeys.forEach((j) => {
          draft[i][j] = {
            onClick: () => handleTileClick(i, j)
          };
        });
      })
    );
    setGrid(newGrid);
  }, []);

  return (
    <div className="u-fullWidth u-fullHeight u-flex u-flexCenter">
      <Grid grid={grid} />
    </div>
  );
};
