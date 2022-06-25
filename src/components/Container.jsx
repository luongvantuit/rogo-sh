import React from "react";
import { SliderBar } from "./SliderBar.jsx";
import { Header } from "./Header.jsx";

export const Container = React.memo(({ children, navActivate }) => {
  return (
    <React.Fragment>
      <Header />
      <div className="flex flex-row">
        <SliderBar navActivate={navActivate} />
        <div className="flex flex-1 flex-col overflow-y-scroll">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
});
