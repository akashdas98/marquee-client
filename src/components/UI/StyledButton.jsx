import React from "react";

function StyledButton(props) {
  const { children, onClick, style } = props;

  return (
    <button
      style={{
        display: "block",
        marginRight: "auto",
        marginTop: "10px",
        border: "none",
        backgroundColor: "#365aff",
        padding: "10px 25px",
        borderRadius: "2px",
        color: "white",
        fontSize: "1.3em",
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default StyledButton;
