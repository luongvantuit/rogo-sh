import React from "react";
import IconDoNotDisturb from "../assets/icon-not-disturb.svg";

export function CardRoom({ room, onSelectedItem }) {
  return (
    <div
      className="h-[162px] 2xl:rounded-[38.5668px] xl:rounded-[30px] rounded-[24px] bg-white 2xl:px-[32px] xl:px-[26px] px-[20px] 2xl:py-[22px] xl:py-[18px] py-[16px] flex flex-col justify-between"
      onClick={onSelectedItem}
    >
      <div className="flex 2xl:flex-row flex-col-reverse justify-between">
        <p className="text-[46px] text-[#62718E] font-bold p-0 2xl:mt-[-18px] mt-[-6px]">
          {room?.name}
        </p>
        <p
          className={`w-[110px] h-[20px]  2xl:text-[13px] text-[11px] text-center text-white rounded-[7px] leading-[20px]  ${
            room?.is_available ? "bg-[#5EAA4A]" : "bg-[#E92A35]"
          }`}
        >
          {room?.is_available ? "Đang trống" : "Đang sử dụng"}
        </p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <div className="flex flex-row justify-end items-center 2xl:text-[27.1004px] xl:text-[23px] text-[20px]">
            <p className="text-[#57C3FF] font-semibold">1</p>
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
