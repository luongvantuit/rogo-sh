import React from "react";
import IconDoNotDisturb from "../assets/icon-not-disturb.svg";

export function CardRoom({ room, onSelectedItem }) {
  return (
    <div
      className="h-[162px] rounded-[38.5668px] bg-white px-[32px] py-[22px] flex flex-col justify-between"
      onClick={onSelectedItem}
    >
      <div className="flex flex-row justify-between">
        <p className="text-[55.1515px] text-[#62718E] font-bold">
          {room?.name}
        </p>
        <p
          className={`w-[110px] h-[20px] text-[13px] text-center text-white rounded-[7px] ${
            room?.is_available ? "bg-[#5EAA4A]" : "bg-[#E92A35]"
          }`}
        >
          {room?.is_available ? "Đang trống" : "Đang sử dụng"}
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <div className="flex flex-row justify-end items-center">
            <p className="text-[#57C3FF] ml-2 font-semibold text-[27.1004px]">
              1
            </p>
            <i className="fa-solid fa-users mx-[8px] text-[#57C3FF]"></i>
          </div>
        </div>
        {(() => {
          if (
            room?.is_available === false &&
            room?.checkin_data?.length !== 0 &&
            room.checkin_data[room?.checkin_data?.length - 1]?.not_disturb
          ) {
            return <img src={IconDoNotDisturb} alt="" />;
          }
        })()}
      </div>
    </div>
  );
}
