import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { RoomScreen } from "../screens/RoomScreen.jsx";
import { NotificationsScreen } from "../screens/NotificationsScreen.jsx";
import { NotFoundScreen } from "../screens/NotFoundScreen.jsx";
import { BookDetailScreen } from "../screens/BookDetailScreen.jsx";
import { DashboardScreen } from "../screens/DashboardScreen.jsx";

export const AppRouter = React.memo(() => {
    return (
        <React.Fragment>
            <HashRouter>
                <Routes>
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
                        path="*"
                        element={<NotFoundScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/book/:roomId"
                        element={<BookDetailScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/"
                        element={<DashboardScreen />}
                        caseSensitive
                    />
                </Routes>
            </HashRouter>
        </React.Fragment>
    );
});
