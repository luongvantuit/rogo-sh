import React from "react";
import { AppRouter } from "./routes/AppRouter";

export const App = React.memo(() => {
    return (
        <React.Fragment>
            <AppRouter />
        </React.Fragment>
    );
});
