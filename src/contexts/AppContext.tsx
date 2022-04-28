import React from "react";

export type AppContext = {};
export type AppContextProps = {};
export type AppContextState = {};

const APP_CONTEXT = React.createContext<AppContext>({});

export const DEFAULT: AppContext = {};

export class AppContextComponent extends React.PureComponent<
    AppContextProps,
    AppContextState
> {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <APP_CONTEXT.Provider value={DEFAULT}></APP_CONTEXT.Provider>
            </React.Fragment>
        );
    }
}
