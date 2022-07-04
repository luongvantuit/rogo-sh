import React from "react";
import IconNotDisturb from "../assets/icon-not-disturb.svg";

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
        <div className="w-[320px] h-[68px] my-[6px] rounded-md flex flex-row justify-between items-center px-[16px] border-2 border-[#C6C6C6] text-[20.0703px] text-white font-light uppercase">
          <img src={IconNotDisturb} alt="" width={28} height={28} />
          <div className="flex flex-col justify-center items-center  mr-[45px]">
            <p>Do Not Disturb To</p>
            <p>{`${timeDoNotDisturb.getHours()}:${timeDoNotDisturb.getMinutes()} - ${timeDoNotDisturb.getDate()}/${
              timeDoNotDisturb.getMonth() + 1
            }/${timeDoNotDisturb.getFullYear()}`}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
