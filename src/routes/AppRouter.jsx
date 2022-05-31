import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { QrRoomScreen } from "../screens/QrRoomScreen.jsx";
import { NotificationsScreen } from "../screens/NotificationsScreen.jsx";
import { NotFoundScreen } from "../screens/NotFoundScreen.jsx";
import { CheckInRoomScreen } from "../screens/CheckInRoomScreen.jsx";
import { HomeScreen } from "../screens/HomeScreen.jsx";
import { LoginScreen } from "../screens/LoginScreen.jsx";
import { RoomsNotDisturbScreen } from "../screens/RoomsNotDisturbScreen.jsx";

export const AppRouter = React.memo(() => {
  return (
    <React.Fragment>
      <HashRouter>
        <Routes>
          <Route
            path="/qrcode/:roomId"
            element={<QrRoomScreen />}
            caseSensitive
          />
          {/*  <Route
                        path="/notifications"
                        element={<NotificationsScreen />}
                        caseSensitive
                    />
                    <Route
                        path="/*"
                        element={<NotFoundScreen />}
                        caseSensitive
                    />*/}

          <Route
            path="/checkin/:roomId"
            element={<CheckInRoomScreen />}
            caseSensitive
          />

          <Route path="/" element={<HomeScreen />} caseSensitive />

          <Route path="/login" element={<LoginScreen />} caseSensitive />

          <Route
            path="/not-disturb"
            element={<RoomsNotDisturbScreen />}
            caseSensitive
          />
        </Routes>
      </HashRouter>
    </React.Fragment>
  );
});
