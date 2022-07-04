import React from "react";
import { Container } from "../components/Container.jsx";
export class UpdateStateRequest {
  onChange;

  constructor(onChange) {
    this.onChange = onChange;
  }

  hasChange() {
    this.onChange();
  }
}

/**
 * @type {UpdateStateRequest}
 */
export var updateState;

export const RoomsNotDisturbScreen = React.memo(() => {
  React.useEffect(() => {
    document.title = "Rogo Solutions - Rooms Not Disturb";
  }, []);

  return <Container navActivate="not-disturb"></Container>;
});
