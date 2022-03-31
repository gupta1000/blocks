import React from "react";
import { useDrag } from "react-dnd";

import Blocks from "../blocks";

import "./piece.css";

interface PieceProps {
  pieceKey: number;
  color?: string;
  onClick?: () => void;
}

export const Piece: React.FC<PieceProps> = (props) => {
  const [, dragRef] = useDrag(() => ({
    type: "piece",
    item: { key: props.pieceKey }
  }));
  const piece = Blocks.pieces[props.pieceKey];

  const width = piece.reduce((max, row) => Math.max(row.length, max), 0);
  const rowKeys = Array.from(Array(piece.length).keys());
  const colKeys = Array.from(Array(width).keys());

  return (
    <div ref={dragRef} className="u-flex u-flexColumn">
      {rowKeys.map((i) => {
        const row = colKeys.map((j) => {
          const backgroundColor = piece[i]?.[j] ? props.color : undefined;
          return (
            <div
              className="Piece-tile"
              key={`piece-${props.pieceKey}-tile-${i}-${j}`}
            >
              <div className="Piece-tileInner" style={{ backgroundColor }} />
            </div>
          );
        });

        return (
          <div className="u-flex" key={`piece-${props.pieceKey}-row-${i}`}>
            {row}
          </div>
        );
      })}
    </div>
  );
};
