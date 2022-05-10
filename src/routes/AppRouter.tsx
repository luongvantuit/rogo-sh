import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardScreen } from "../screens/DashboardScreen";
import RoomDetailScreen from "../screens/RoomDetailScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { Logger } from "../utils/Logger";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RoomScreen } from "../screens/RoomScreen";

export default class AppRouter extends React.PureComponent {
    private static TAG: string = AppRouter.name;

    render(): React.ReactNode {
        Logger.debug(AppRouter.TAG, `Render --> ${AppRouter.name}`);
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<HomeScreen />} caseSensitive />
                    <Route
                        path="/dashboard"
                        element={<DashboardScreen />}
                        caseSensitive
                    />
                    <Route
                        path="/room/detail/:roomId"
                        element={<RoomDetailScreen />}
                        caseSensitive
                    />
                    <Route
                        path="/notifications"
                        element={<NotificationsScreen />}
                        caseSensitive
                    />
                    <Route
                        path="/profile"
                        element={<ProfileScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/room"
                        element={<RoomScreen />}
                        caseSensitive
                    />
                </Routes>
            </BrowserRouter>
        );
    }
}
