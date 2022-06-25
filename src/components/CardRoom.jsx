import React from "react";

export function CardRoom({ room }) {
  return (
    <React.Fragment>
      <div
        className="bg-white rounded-md shadow-md my-[16px] border-[1px] flex"
        onClick={() => {
          if (locationId != room.rogo_location_id) {
            window.location = `#/?floor=${floor}&locationId=${room.rogo_location_id}`;
            window.location.reload();
          }
        }}
      >
        <div className="flex flex-1 p-[16px] flex-col">
          <p
            className={(() => {
              if (room?.is_available) {
                return "text-[54px] font-bold text-green-500 tracking-[4px]";
              }
              return "text-[54px] font-bold text-red-500 tracking-[4px]";
            })()}
          >
            {room?.name}
          </p>
          <p className="font-bold py-[8px] text-[18px] text-[#212529] tracking-[2px]">
            {(() => {
              if (room?.is_available) {
                return "Available";
              }
              return "Busy";
            })()}
          </p>
          {(() => {
            if (
              room?.is_available === false &&
              room?.checkin_data?.length !== 0 &&
              room.checkin_data[room?.checkin_data?.length - 1]?.not_disturb
            ) {
              const timeDoNotDisturb = new Date(
                room?.checkin_data[
                  room?.checkin_data?.length - 1
                ]?.time_not_disturb
              );
              return (
                <div className="flex flex-row items-center mb-[8px]">
                  <img
                    src={DoNotDisturbMode}
                    alt=""
                    className="w-[48px] h-[48px] mr-[6px]"
                  />
                  <p className="text-[#212529] text-[24px]">
                    {`Not disturb to ${timeDoNotDisturb.toLocaleString()}`}
                  </p>
                </div>
              );
            }
          })()}

          <p className="text-[#212529]">{`${room?.price}$`}</p>
        </div>
      </div>
    </React.Fragment>
  );
}
