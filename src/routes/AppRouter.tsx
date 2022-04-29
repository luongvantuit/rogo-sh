import React from "react";
import {
    BrowserRouter,
    IndexRouteProps,
    LayoutRouteProps,
    PathRouteProps,
    Route,
    Routes,
} from "react-router-dom";
import { DashboardScreen } from "../screens/DashboardScreen";
import RoomDetailScreen from "../screens/RoomDetailScreen";
import { StartPageScreen } from "../screens/StartPageScreen";
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
    {
        path: "/room/detail/:roomId",
        element: <RoomDetailScreen />,
        caseSensitive: true,
    },
];

export default class AppRouter extends React.PureComponent {
    private static TAG: string = AppRouter.name;

    render(): React.ReactNode {
        Logger.debug(AppRouter.TAG, `Render --> ${AppRouter.name}`);
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    {ROUTES.map((v, i) => {
                        return <Route {...v} key={i} />;
                    })}
                </Routes>
            </BrowserRouter>
        );
    }
}
