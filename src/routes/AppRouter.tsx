import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoomScreen } from "../screens/RoomScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { NotFoundScreen } from "../screens/NotFoundScreen";
import { BookingScreen } from "../screens/BookingScreen";

export default class AppRouter extends React.PureComponent {
    render(): React.ReactNode {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<HomeScreen />} caseSensitive />
                    <Route
                        path="/room/:roomId"
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
                        path="*"
                        element={<NotFoundScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/booking/:roomId"
                        element={<BookingScreen />}
                        caseSensitive
                    />
                </Routes>
            </BrowserRouter>
        );
    }
}
