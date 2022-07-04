import React from "react";
import { SliderBar } from "./SliderBar.jsx";
import { Header } from "./Header.jsx";

export const Container = React.memo(({ children, navActivate }) => {
  return (
    <React.Fragment>
      <Header />
      <div className="flex flex-row w-full">
        <SliderBar navActivate={navActivate} />
        <div className="overflow-y-scroll flex-1">{children}</div>
      </div>
    </React.Fragment>
  );
});
