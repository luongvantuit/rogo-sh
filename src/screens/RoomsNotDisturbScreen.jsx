import React from "react";
import { Container } from "../components/Container.jsx";

export const RoomsNotDisturbScreen = React.memo(() => {
  React.useEffect(() => {
    document.title = "Rogo Solutions - Rooms Not Disturb";
  }, []);

  return <Container navActivate="not-disturb"></Container>;
});
