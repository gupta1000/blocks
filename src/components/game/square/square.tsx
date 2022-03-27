import React from "react";

import "./square.css";
interface SquareProps {
  color?: string;
  onClick?: () => void;
}

export const Square: React.FC<SquareProps> = (props) => {
  return (
    <div className="Square">
      <div
        className="Square-tile"
        style={{ backgroundColor: props.color }}
        onClick={props.onClick}
      />
    </div>
  );
};
