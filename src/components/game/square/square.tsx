import React from "react";

import { useDrop } from "react-dnd";

import { Piece } from "../blocks";

import "./square.css";

interface SquareProps {
  color?: string;
  onDropPiece?: (k: number) => void;
}

export const Square: React.FC<SquareProps> = (props) => {
  const [, dropRef] = useDrop(() => ({
    accept: "piece",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      item: monitor.getItem()
    }),
    drop: (item: Piece) => props.onDropPiece && props.onDropPiece(item.key)
  }));

  return (
    <div ref={dropRef} className="Square">
      <div className="Square-tile" style={{ backgroundColor: props.color }} />
    </div>
  );
};
