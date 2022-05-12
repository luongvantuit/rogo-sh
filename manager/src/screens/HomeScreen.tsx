import React from "react";
import { Header } from "../components/Header";

export const HomeScreen = React.memo(() => {
    return (
        <React.Fragment>
            <Header />
        </React.Fragment>
    );
});
