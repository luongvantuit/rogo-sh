import React from "react";

export function TimeNotDisturbRoomInfo({ room }) {
  if (
    room?.checkin_data &&
    room?.checkin_data.length != 0 &&
    room?.checkin_data[room?.checkin_data.length - 1]?.not_disturb
  ) {
    const timeDoNotDisturb = new Date(
      room?.checkin_data[room?.checkin_data?.length - 1]?.time_not_disturb
    );
    return (
      <React.Fragment>
        <div></div>
      </React.Fragment>
    );
  }
}
