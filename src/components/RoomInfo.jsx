import React from "react";
import { BookingApi } from "../api/booking-api.js";
import { auth } from "../firebase/firebase-auth.js";
import ListDevice from "./ListDevice.jsx";
import OffDialog from "../assets/off-dialog-room-info.svg";
import { TimeNotDisturbRoomInfo } from "./TimeNotDisturbRoomInfo.jsx";
import IconQr from "../assets/icon-qr.svg";
import IconTimeCheckOut from "../assets/icon-time-check-out.svg";
import IconTimeCheckIn from "../assets/icon-time-check-in.svg";

export function RoomInfo({ room, resetQrCodeFunc, onExit }) {
  const currentDate = (() => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" : ""}${
      date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" : ""}${date.getDate()}T${
      date.getHours() < 10 ? "0" : ""
    }${date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
    }${date.getMinutes()}`;
  })();

  const [edit, setEdit] = React.useState(false);
  const [newTimeCheckOut, setNewTimeCheckOut] = React.useState();

  return (
    <React.Fragment>
      <div className="bg-[#344650] xl:w-[1080px] w-[960px] xl:p-[60px] p-[30px] xl:pt-[30px] pt-[15px] rounded-xl">
        <div className="flex justify-end">
          <button onClick={onExit} className="mb-4">
            <img src={OffDialog} alt="" />
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-white text-[70px] font-bold">{room?.name}</p>
          <div className="flex flex-col">
            <div className="flex flex-row justify-end items-center">
              <i className="fa-solid fa-users mx-[8px] text-[40px] text-[#57C3FF]"></i>
              <p className="text-[40px] text-[#57C3FF] ml-2">1</p>
            </div>
            <p className="text-white text-[30.6337px] font-semibold">{`${room?.price} VNĐ/ĐÊM`}</p>
          </div>
        </div>

        {(() => {
          if (!room?.is_available) {
            const dateCheckIn = new Date(
              room?.checkin_data[room?.checkin_data.length - 1]?.checkin
            );
            const dateCheckOut = new Date(
              room?.checkin_data[room?.checkin_data.length - 1]?.checkout
            );
            return (
              <React.Fragment>
                <p className="text-[25.5385px] font-semibold text-[#C6C6C6] uppercase">
                  THÔNG TIN CHECK IN - CHECK OUT
                </p>
                <div className="w-[320px] h-[68px] my-[6px] rounded-md flex flex-row justify-between items-center px-[16px] border-2 border-[#C6C6C6]">
                  <img src={IconTimeCheckIn} alt="" width={28} height={28} />
                  <p className="text-[20px] text-[#C6C6C6] text-center">{`${dateCheckIn.getHours()}:${dateCheckIn.getMinutes()} - ${dateCheckIn.getDate()}/${
                    dateCheckIn.getMonth() + 1
                  }/${dateCheckIn.getFullYear()}`}</p>
                </div>
                <div className="flex flex-row justify-start items-center">
                  {(() => {
                    if (edit) {
                      return (
                        <form
                          className="flex flex-row items-center h-[56px] my-[6px]"
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (
                              new Date(newTimeCheckOut).toISOString() !==
                              dateCheckOut.toISOString()
                            ) {
                              const confirm = window.confirm(
                                "Are you sure about this action?"
                              );
                              setEdit(false);
                              if (confirm) {
                                auth.currentUser.getIdToken().then((token) => {
                                  BookingApi.checkOut(token, room?.id).then(
                                    (response) => {
                                      if (response.ok) {
                                        BookingApi.checkIn(
                                          token,
                                          room?.id,
                                          dateCheckIn.toISOString(),
                                          new Date(
                                            newTimeCheckOut
                                          ).toISOString()
                                        ).then(async (responseCheckIn) => {
                                          if (response.ok) {
                                            const code = (
                                              await responseCheckIn.json()
                                            )["code"];
                                            window.location = `#/qrcode/${room?.id}?code=${code}`;
                                          }
                                        });
                                      } else {
                                        window.alert(
                                          `Error! ${response.status}`
                                        );
                                      }
                                    }
                                  );
                                });
                              }
                            }
                          }}
                        >
                          <input
                            type="datetime-local"
                            className="my-[16px] px-[16px] h-[68px] drop-shadow-md shadow-md border-2 border-[#FFC764] outline-none focus:ring-[2px] focus:ring-[#FBD083] focus:rounded-sm tracking-widest text-[#212529]"
                            onChange={(event) => {
                              setNewTimeCheckOut(event.target.value);
                            }}
                            min={currentDate}
                            defaultValue={`${dateCheckOut?.getFullYear()}-${
                              dateCheckOut?.getMonth() + 1 < 10 ? "0" : ""
                            }${dateCheckOut?.getMonth() + 1}-${
                              dateCheckOut?.getDate() < 10 ? "0" : ""
                            }${dateCheckOut?.getDate()}T${
                              dateCheckOut?.getHours() < 10 ? "0" : ""
                            }${dateCheckOut?.getHours()}:${
                              dateCheckOut?.getMinutes() < 10 ? "0" : ""
                            }${dateCheckOut?.getMinutes()}`}
                          />
                          <button
                            className="mx-[12px] drop-shadow-md shadow-md rounded-md h-[68px] px-[24px] bg-[#FFC764] duration-500 hover:opacity-90 text-[#212529]"
                            type="submit"
                          >
                            CONFIRM
                          </button>
                          <button
                            onClick={() => {
                              setEdit(false);
                            }}
                            className="bg-[#212529] w-[68px] h-[68px] shadow-md rounded-md md:block hidden duration-500 drop-shadow-md hover:opacity-90 mr-[12px]"
                          >
                            <i className="fa-solid fa-x text-white"></i>
                          </button>
                        </form>
                      );
                    } else {
                      return (
                        <React.Fragment>
                          <div className="flex flex-row items-center">
                            <div className="w-[320px] h-[68px] my-[6px] drop-shadow-md shadow-md rounded-md flex flex-row justify-between items-center px-[16px] bg-[#212529]">
                              <img
                                src={IconTimeCheckOut}
                                alt=""
                                width={28}
                                height={28}
                              />
                              <p className="text-[20px] text-white text-center">{`${dateCheckOut.getHours()}:${dateCheckOut.getMinutes()} - ${dateCheckOut.getDate()}/${
                                dateCheckOut.getMonth() + 1
                              }/${dateCheckOut.getFullYear()}`}</p>
                            </div>
                            <button
                              className="mx-[12px] drop-shadow-md shadow-md rounded-md h-[68px] w-[68px] bg-[#212529] duration-500 hover:opacity-90"
                              onClick={(e) => {
                                setEdit(true);
                                setNewTimeCheckOut(dateCheckOut.toISOString());
                              }}
                            >
                              <i className="fa-solid fa-pen-to-square text-white"></i>
                            </button>
                          </div>
                        </React.Fragment>
                      );
                    }
                  })()}
                  <TimeNotDisturbRoomInfo room={room} />
                </div>
              </React.Fragment>
            );
          }
        })()}
        <p className="text-[25.5385px] font-semibold text-[#C6C6C6] uppercase mt-[54px]">
          DANH SÁCH THIẾT BỊ
        </p>
        <ListDevice />
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              const dateCheckIn = new Date(
                room?.checkin_data[room?.checkin_data.length - 1]?.checkin
              );
              const dateCheckOut = new Date(
                room?.checkin_data[room?.checkin_data.length - 1]?.checkout
              );
              const confirm = window.confirm("Are you sure about this action?");
              if (confirm) {
                auth.currentUser.getIdToken().then((token) => {
                  BookingApi.checkOut(token, room?.id).then((response) => {
                    if (response.ok) {
                      BookingApi.checkIn(
                        token,
                        room?.id,
                        dateCheckIn.toISOString(),
                        dateCheckOut.toISOString()
                      ).then(async (responseCheckIn) => {
                        if (response.ok) {
                          const code = (await responseCheckIn.json())["code"];
                          window.location = `#/qrcode/${room?.id}?code=${code}`;
                        }
                      });
                    } else {
                      window.alert(`Error! ${response.status}`);
                    }
                  });
                });
              }
            }}
          >
            <img src={IconQr} width={54} height={54} alt="" />
          </button>
        </div>
      </div>
      <div className="xl:w-[1080px] w-[960px] flex flex-row justify-end my-[16px]">
        {(() => {
          if (room?.is_available) {
            return (
              <a
                href={`#/checkin/${room.id}`}
                className="uppercase text-white rounded-md px-[16px] py-[8px] text-[24px] font-bold bg-[#52FF27]"
              >
                CHECK IN
              </a>
            );
          } else {
            return (
              <button
                className="uppercase text-white rounded-md px-[16px] py-[8px] text-[24px] font-bold bg-[#E92A35]"
                onClick={() => {
                  const confirm = window.confirm(
                    "Are you sure about this action?"
                  );
                  if (confirm) {
                    auth.currentUser.getIdToken().then((token) => {
                      BookingApi.checkOut(token, room?.id).then((response) => {
                        if (response.ok) {
                          window.location.reload();
                        }
                      });
                    });
                  }
                }}
              >
                Check Out
              </button>
            );
          }
        })()}
      </div>
    </React.Fragment>
  );
}
