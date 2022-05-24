import React from "react";
import { SliderBar } from "./SliderBar.jsx";
import { Header } from "./Header.jsx";

export const Container = React.memo(({ children, navActivate }) => {
    return (
        <React.Fragment>
            <div className="flex flex-row">
                <SliderBar navActivate={navActivate}/>
                <div className="flex flex-1 items-start">
                    <Header />
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
});
