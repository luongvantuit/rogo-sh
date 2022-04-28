import React from "react";
import {
    HashRouter,
    IndexRouteProps,
    LayoutRouteProps,
    PathRouteProps,
    Route,
    Routes,
} from "react-router-dom";
import DashboardScreen from "../screen/DashboardScreen";
import StartPageScreen from "../screen/StartPageScreen";
import { Logger } from "../utils/Logger";

export const ROUTES: (PathRouteProps | LayoutRouteProps | IndexRouteProps)[] = [
    {
        path: "/",
        element: <StartPageScreen />,
        caseSensitive: true,
    },
    {
        path: "/dashboard",
        element: <DashboardScreen />,
        caseSensitive: true,
    },
];

export default class AppRouter extends React.PureComponent {
    TAG: string = "AppRouter";

    render(): React.ReactNode {
        Logger.debug(this.TAG, `Render --> ${AppRouter.name}`);
        return (
            <React.Fragment>
                <HashRouter basename={process.env.PUBLIC_URL}>
                    <Routes>
                        {ROUTES.map((v, i) => {
                            return (
                                <React.Fragment
                                    key={`${this.TAG} Fragment ${i}`}
                                >
                                    <Route
                                        {...v}
                                        key={`${this.TAG} Route ${i}`}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </Routes>
                </HashRouter>
            </React.Fragment>
        );
    }
}
