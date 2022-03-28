import React from "react";
import produce from "immer";

import PubNub from "pubnub";
import { usePubNub } from "pubnub-react";

import { Grid } from "./grid";
import { GameState, GridData, gridKeys, initGrid } from "./utils";
import { useParams } from "react-router-dom";

interface GameProps {
  userId: string;
}

const getChannelForGameSession = (sessionId?: string) =>
  `blocks-game-${sessionId}`;

export const Game: React.FC<GameProps> = (props) => {
  const { sessionId } = useParams();
  const pubnub = usePubNub();

  const [grid, setGrid] = React.useState(initGrid());

  const gridRef = React.useRef<GridData>();
  gridRef.current = grid;

  const gameChannel = getChannelForGameSession(sessionId);
  const channels = [gameChannel];

  const handleTileClick = (row: number, col: number) => {
    const currentGrid = gridRef.current;
    if (!currentGrid) {
      return;
    }

    const newGrid = produce(currentGrid, (draft) => {
      if (currentGrid[row][col].color) {
        delete draft[row][col].color;
      } else {
        draft[row][col].color = "#444444";
      }
    });

    setGrid(newGrid);

    const newState: GameState = {
      grid: newGrid
    };
    pubnub.publish({ channel: gameChannel, message: newState });
  };

  const handleGameStateUpdate = (e: PubNub.MessageEvent) => {
    const currentGrid = gridRef.current;
    if (!currentGrid) {
      return;
    }

    const data = e.message as GameState;

    setGrid(data.grid);
  };

  React.useEffect(() => {
    const newGrid = produce(grid, (draft) =>
      gridKeys.forEach((i) => {
        gridKeys.forEach((j) => {
          draft[i][j] = {};
        });
      })
    );
    setGrid(newGrid);
  }, []);

  const checkForExistingGame = async () => {
    let latestMessages: PubNub.FetchMessagesResponse | null = null;
    try {
      latestMessages = await pubnub.fetchMessages({
        channels: [gameChannel],
        count: 1
      });
    } catch (e) {
      console.log(e);
    }

    const latestMessage = latestMessages?.channels[gameChannel]?.[0];
    if (!latestMessage) {
      return;
    }

    const data = latestMessage.message as GameState;
    setGrid(data.grid);
  };

  React.useEffect(() => {
    pubnub.addListener({ message: handleGameStateUpdate });
    pubnub.subscribe({ channels });

    checkForExistingGame();

    return () => {
      pubnub.removeListener({ message: handleGameStateUpdate });
      pubnub.unsubscribeAll();
    };
  }, []);

  return (
    <div className="u-fullWidth u-fullHeight u-flex u-flexCenter">
      <Grid grid={grid} handleTileClick={handleTileClick} />
    </div>
  );
};
