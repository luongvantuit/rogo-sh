import React from "react";
import { BookingApi } from "../api/booking-api.js";
import { auth } from "../firebase/firebase-auth.js";
import ListDevice from "./ListDevice.jsx";
import OffDialog from "../assets/off-dialog-room-info.svg";
import { TimeNotDisturbRoomInfo } from "./TimeNotDisturbRoomInfo.jsx";

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
      <div className="bg-[#344650] w-[1310px] p-[60px] pt-[30px] rounded-xl">
        <div className="flex justify-end">
          <button onClick={onExit} className="my-4">
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
                <div className="w-[320px] h-[48px] my-[6px] rounded-md flex flex-row justify-between items-center px-[16px] border-2 border-[#C6C6C6]">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.933 0.359375C23.9183 0.359375 28.6994 2.33979 32.2246 5.86495C35.7497 9.39011 37.7302 14.1713 37.7302 19.1566C37.7302 24.1419 35.7497 28.9231 32.2246 32.4482C28.6994 35.9734 23.9183 37.9538 18.933 37.9538C13.9476 37.9538 9.16648 35.9734 5.64132 32.4482C2.11616 28.9231 0.135742 24.1419 0.135742 19.1566C0.135742 14.1713 2.11616 9.39011 5.64132 5.86495C9.16648 2.33979 13.9476 0.359375 18.933 0.359375V0.359375ZM10.7092 17.9818C10.3976 17.9818 10.0988 18.1055 9.87845 18.3259C9.65812 18.5462 9.53435 18.845 9.53435 19.1566C9.53435 19.4682 9.65812 19.767 9.87845 19.9873C10.0988 20.2076 10.3976 20.3314 10.7092 20.3314H24.3207L19.276 25.3738C19.1668 25.483 19.0801 25.6127 19.021 25.7554C18.9619 25.8981 18.9315 26.0511 18.9315 26.2055C18.9315 26.36 18.9619 26.513 19.021 26.6557C19.0801 26.7984 19.1668 26.9281 19.276 27.0373C19.3852 27.1465 19.5149 27.2332 19.6576 27.2923C19.8003 27.3514 19.9533 27.3818 20.1078 27.3818C20.2623 27.3818 20.4152 27.3514 20.5579 27.2923C20.7006 27.2332 20.8303 27.1465 20.9396 27.0373L27.9885 19.9884C28.0979 19.8792 28.1847 19.7496 28.2439 19.6069C28.3032 19.4641 28.3337 19.3111 28.3337 19.1566C28.3337 19.0021 28.3032 18.849 28.2439 18.7063C28.1847 18.5636 28.0979 18.4339 27.9885 18.3248L20.9396 11.2759C20.8303 11.1666 20.7006 11.08 20.5579 11.0209C20.4152 10.9617 20.2623 10.9313 20.1078 10.9313C19.9533 10.9313 19.8003 10.9617 19.6576 11.0209C19.5149 11.08 19.3852 11.1666 19.276 11.2759C19.1668 11.3851 19.0801 11.5148 19.021 11.6575C18.9619 11.8002 18.9315 11.9532 18.9315 12.1076C18.9315 12.2621 18.9619 12.4151 19.021 12.5578C19.0801 12.7005 19.1668 12.8302 19.276 12.9394L24.3207 17.9818H10.7092Z"
                      fill="#52FF27"
                    />
                  </svg>
                  <p className="text-[20px] text-[#C6C6C6] text-center">{`${dateCheckIn.getHours()}:${dateCheckIn.getMinutes()} - ${dateCheckIn.getDate()}/${
                    dateCheckIn.getMonth() + 1
                  }/${dateCheckIn.getFullYear()}`}</p>
                </div>
                <div className="flex flex-row justify-start">
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
                            className="my-[16px] px-[16px] h-[48px] drop-shadow-md shadow-md border-2 border-[#FFC764] outline-none focus:ring-[2px] focus:ring-[#FBD083] focus:rounded-sm tracking-widest text-[#212529]"
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
                            className="mx-[12px] drop-shadow-md shadow-md rounded-md h-[48px] px-[16px] bg-[#FFC764] duration-500 hover:opacity-90 text-[#212529]"
                            type="submit"
                          >
                            CONFIRM
                          </button>
                          <button
                            onClick={() => {
                              setEdit(false);
                            }}
                            className="bg-[#212529] w-[48px] h-[48px] shadow-md rounded-md md:block hidden duration-500 drop-shadow-md hover:opacity-90"
                          >
                            <i className="fa-solid fa-x text-white"></i>
                          </button>
                        </form>
                      );
                    } else {
                      return (
                        <React.Fragment>
                          <div className="flex flex-row items-center">
                            <div className="w-[320px] h-[48px] my-[6px] drop-shadow-md shadow-md rounded-md flex flex-row justify-between items-center px-[16px] bg-[#212529]">
                              <svg
                                width="28"
                                height="28"
                                viewBox="0 0 38 38"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M18.9329 37.9622C13.9476 37.9622 9.16642 35.9818 5.64125 32.4566C2.1161 28.9315 0.135682 24.1503 0.135683 19.165C0.135683 14.1797 2.1161 9.39853 5.64126 5.87337C9.16642 2.34821 13.9476 0.367796 18.9329 0.367796C23.9182 0.367797 28.6994 2.34821 32.2245 5.87337C35.7497 9.39853 37.7301 14.1797 37.7301 19.165C37.7301 24.1503 35.7497 28.9315 32.2245 32.4566C28.6994 35.9818 23.9182 37.9622 18.9329 37.9622V37.9622ZM27.1567 20.3398C27.4683 20.3398 27.7671 20.2161 27.9874 19.9957C28.2077 19.7754 28.3315 19.4766 28.3315 19.165C28.3315 18.8534 28.2077 18.5546 27.9874 18.3343C27.7671 18.114 27.4683 17.9902 27.1567 17.9902L13.5451 17.9902L18.5898 12.9478C18.6991 12.8386 18.7857 12.7089 18.8448 12.5662C18.904 12.4235 18.9344 12.2705 18.9344 12.1161C18.9344 11.9616 18.904 11.8086 18.8448 11.6659C18.7857 11.5232 18.6991 11.3935 18.5898 11.2843C18.4806 11.175 18.3509 11.0884 18.2082 11.0293C18.0655 10.9702 17.9125 10.9397 17.7581 10.9397C17.6036 10.9397 17.4506 10.9702 17.3079 11.0293C17.1652 11.0884 17.0355 11.175 16.9263 11.2843L9.87734 18.3332C9.76793 18.4424 9.68113 18.572 9.6219 18.7147C9.56268 18.8575 9.53219 19.0105 9.53219 19.165C9.53219 19.3195 9.56268 19.4725 9.6219 19.6153C9.68113 19.758 9.76793 19.8877 9.87734 19.9968L16.9263 27.0457C17.0355 27.155 17.1652 27.2416 17.3079 27.3007C17.4506 27.3598 17.6036 27.3903 17.7581 27.3903C17.9125 27.3903 18.0655 27.3598 18.2082 27.3007C18.3509 27.2416 18.4806 27.155 18.5898 27.0457C18.6991 26.9365 18.7857 26.8068 18.8448 26.6641C18.904 26.5214 18.9344 26.3684 18.9344 26.214C18.9344 26.0595 18.904 25.9065 18.8448 25.7638C18.7857 25.6211 18.6991 25.4914 18.5898 25.3822L13.5451 20.3398L27.1567 20.3398Z"
                                  fill="#E92A35"
                                />
                              </svg>
                              <p className="text-[20px] text-white text-center">{`${dateCheckOut.getHours()}:${dateCheckOut.getMinutes()} - ${dateCheckOut.getDate()}/${
                                dateCheckOut.getMonth() + 1
                              }/${dateCheckOut.getFullYear()}`}</p>
                            </div>
                            <button
                              className="mx-[12px] drop-shadow-md shadow-md rounded-md h-[48px] w-[48px] bg-[#212529] duration-500 hover:opacity-90"
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
          <button onClick={resetQrCodeFunc}>
            <svg
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.75 6.75H13.5V13.5H6.75V6.75Z" fill="white" />
              <path
                d="M20.25 0V20.25H0V0H20.25ZM16.875 3.375H3.375V16.875H16.875V3.375ZM13.5 40.5H6.75V47.25H13.5V40.5Z"
                fill="white"
              />
              <path
                d="M20.25 33.75V54H0V33.75H20.25ZM3.375 37.125V50.625H16.875V37.125H3.375ZM40.5 6.75H47.25V13.5H40.5V6.75Z"
                fill="white"
              />
              <path
                d="M33.75 0V20.25H54V0H33.75ZM50.625 3.375V16.875H37.125V3.375H50.625ZM27 3.375V0H30.375V6.75H27V13.5H23.625V3.375H27ZM27 20.25V13.5H30.375V20.25H27ZM20.25 27V23.625H23.625V20.25H27V27H30.375V23.625H47.25V27H33.75V30.375H23.625V27H20.25ZM20.25 27V30.375H6.75V27H3.375V30.375H0V23.625H10.125V27H20.25ZM54 30.375H50.625V23.625H54V30.375ZM50.625 30.375H47.25V37.125H54V33.75H50.625V30.375ZM37.125 30.375H43.875V33.75H40.5V37.125H37.125V30.375ZM43.875 40.5V37.125H40.5V40.5H37.125V43.875H30.375V47.25H40.5V40.5H43.875ZM43.875 40.5H54V43.875H47.25V47.25H43.875V40.5ZM30.375 37.125V40.5H33.75V33.75H23.625V37.125H30.375Z"
                fill="white"
              />
              <path
                d="M23.625 40.5H27V50.625H40.5V54H23.625V40.5ZM54 47.25V54H43.875V50.625H50.625V47.25H54Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-[1310px] flex flex-row justify-end my-[16px]">
        <button className="uppercase text-white rounded-md bg-[#E92A35] px-[16px] py-[8px] text-[24px] font-bold">
          Check Out
        </button>
      </div>
    </React.Fragment>
  );
}
