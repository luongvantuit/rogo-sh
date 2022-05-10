import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardScreen } from "../screens/DashboardScreen";
import { RoomScreen } from "../screens/RoomScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { Logger } from "../utils/Logger";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HotelScreen } from "../screens/HotelScreen";
import { NotFoundScreen } from "../screens/NotFoundScreen";
import { BookingScreen } from "../screens/BookingScreen";

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
                        path="/room/:hotelId/:roomId"
                        element={<RoomScreen />}
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
                        path="/hotel/:hotelId"
                        element={<HotelScreen />}
                        caseSensitive
                    />

                    <Route
                        path="*"
                        element={<NotFoundScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/booking/:hotelId/:roomId"
                        element={<BookingScreen />}
                        caseSensitive
                    />
                </Routes>
            </BrowserRouter>
        );
    }
}
