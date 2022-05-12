import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoomScreen } from "../screens/RoomScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { NotFoundScreen } from "../screens/NotFoundScreen";
import { BookScreen } from "../screens/BookScreen";
import { BookDetailScreen } from "../screens/BookDetailScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { AboutUsScreen } from "../screens/AboutUsScreen";
import { NewsScreen } from "../screens/NewsScreen";
import { ContactScreen } from "../screens/ContactScreen";

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
                        path="/book"
                        element={<BookScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/book/:roomId"
                        element={<BookDetailScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/login"
                        element={<LoginScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/register"
                        element={<RegisterScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/about"
                        element={<AboutUsScreen />}
                        caseSensitive
                    />
                    <Route
                        path="/news"
                        element={<NewsScreen />}
                        caseSensitive
                    />

                    <Route
                        path="/contact"
                        element={<ContactScreen />}
                        caseSensitive
                    />
                </Routes>
            </BrowserRouter>
        );
    }
}
