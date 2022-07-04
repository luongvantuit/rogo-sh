import React from "react";

export function DialogContainer({
  children,
  onClick,
  zIndex = "z-20",
  backgroundColor = "bg-[#272B3F]",
}) {
  return (
    <React.Fragment>
      <div
        className={`fixed top-0 right-0 left-0 w-screen h-screen flex flex-col justify-center items-center ${zIndex} ${backgroundColor}`}
        onClick={onClick}
      >
        {children}
      </div>
    </React.Fragment>
  );
}
