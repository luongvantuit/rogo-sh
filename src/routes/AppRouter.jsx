import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { QrRoomScreen } from "../screens/QrRoomScreen.jsx";
import { NotificationsScreen } from "../screens/NotificationsScreen.jsx";
import { NotFoundScreen } from "../screens/NotFoundScreen.jsx";
import { BookDetailScreen } from "../screens/BookDetailScreen.jsx";
import { DashboardScreen } from "../screens/DashboardScreen.jsx";
import { LoginScreen } from "../screens/LoginScreen.jsx";
import { RoomsNotDisturbScreen } from "../screens/RoomsNotDisturbScreen.jsx";

export const AppRouter = React.memo(() => {
    return (
        <React.Fragment>
            <HashRouter>
                <Routes>
                    {/* <Route
                        path="/qrcode/:roomId"
                        element={<QrRoomScreen />}
                        caseSensitive
                    />
                    <Route
                        path="/notifications"
                        element={<NotificationsScreen />}
                        caseSensitive
                    />
                    <Route
                        path="/*"
                        element={<NotFoundScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/book/:roomId"
                        element={<BookDetailScreen />}
                        caseSensitive
                    /> */}

                    <Route
                        path="/"
                        element={<DashboardScreen />}
                        caseSensitive
                    />

                    {/* <Route
                        path="/login"
                        element={<LoginScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/not-disturb"
                        element={<RoomsNotDisturbScreen />}
                        caseSensitive
                    /> */}
                </Routes>
            </HashRouter>
        </React.Fragment>
    );
});
