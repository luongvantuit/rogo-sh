import React from "react";
import AppRouter from "./routes/AppRouter";

export default class App extends React.PureComponent {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <AppRouter />
            </React.Fragment>
        );
    }
}
