import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export const LeftArrow = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);

  return (
    <Arrow onClick={() => scrollPrev()}>
      <AiOutlineArrowLeft />
    </Arrow>
  );
};

export const RightArrow = () => {
  const { scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow onClick={() => scrollNext()}>
      <AiOutlineArrowRight />
    </Arrow>
  );
};

function Arrow({ children, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="btn main-btn m-2"
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
      }}
    >
      {children}
    </button>
  );
}
