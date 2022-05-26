import React from "react";
import { SliderBar } from "./SliderBar.jsx";
import { Header } from "./Header.jsx";

export const Container = React.memo(({ children, navActivate }) => {
    return (
        <React.Fragment>
            <div className="flex flex-row w-screen h-screen">
                <SliderBar navActivate={navActivate}/>
                <div className="flex flex-1 flex-col h-screen overflow-y-scroll">
                    <Header />
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
});
