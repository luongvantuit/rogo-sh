import React from "react";
import { SliderBar } from "./SliderBar.jsx";
import { Header } from "./Header.jsx";

export const Container = React.memo(({ children }) => {
    return (
        <React.Fragment>
            <div className="flex flex-row">
                <SliderBar />
                <div className="block">
                    <Header />
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
});
