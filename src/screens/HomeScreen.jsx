import React from "react";
import { RoomApi } from "../api/room-api.js";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext.jsx";
import { BookingApi } from "../api/booking-api.js";
import { Container } from "../components/Container.jsx";
import { auth } from "../firebase/firebase-auth.js";

export const HomeScreen = React.memo(() => {
  const [searchParams] = useSearchParams();
  const floor = parseInt(searchParams.get("floor") ?? "1");

  const [loading, setLoading] = React.useState(true);
  const [edit, setEdit] = React.useState(false);

  const [rooms, setRooms] = React.useState();
  const [room, setRoom] = React.useState();
  const [maxFloor, setMaxFloor] = React.useState(0);
  const user = React.useContext(AppContext);

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

  React.useEffect(() => {
    if (user) {
      auth.currentUser.getIdToken().then(async (token) => {
        await RoomApi.getRoomWithCheckInData(token).then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            const roomsMap = new Map();
            let temp = 0;
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              if (element?.floor > temp) {
                temp = element?.floor;
              }
              if (roomsMap.get(element?.floor)) {
                roomsMap.get(element?.floor).push(element);
              } else {
                roomsMap.set(element?.floor, [element]);
              }
            }
            setMaxFloor(temp);
            setRooms(roomsMap);
            setLoading(false);
          }
        });
      });
    }
  }, [floor, user]);

  React.useEffect(() => {
    document.title = "Rogo Solutions - Home";
  }, []);

  return (
    <Container navActivate="home">
      <section
        className={(() => {
          if (room) {
            // return "lg:mx-[60px] 2xl:mx-[100px] mt-[-40px]";
            return "lg:mx-[60px] 2xl:mx-[100px] mt-[40px]";
          }
        })()}
      >
        {(() => {
          if (room) {
            return (
              <div className="p-[32px] shadow-md border-[1px] bg-white flex flex-row justify-between rounded-md">
                <div className="flex flex-col">
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
                  <p className="font-bold py-[8px] text-[18px] text-[#212529]">
                    {(() => {
                      if (room?.is_available) {
                        return "Available";
                      }
                      return "Busy";
                    })()}
                  </p>
                  {(() => {
                    if (!room?.is_available) {
                      const dateCheckIn = new Date(
                        room?.checkin_data[
                          room?.checkin_data.length - 1
                        ]?.checkin
                      );
                      const dateCheckOut = new Date(
                        room?.checkin_data[
                          room?.checkin_data.length - 1
                        ]?.checkout
                      );
                      return (
                        <React.Fragment>
                          <p className="bg-white w-[320px] h-[48px] leading-[48px] tracking-wide text-[#212529] text-center my-[6px] shadow-md rounded-md drop-shadow-md">{`CHECK IN AT ${dateCheckIn.getHours()}:${dateCheckIn.getMinutes()} - ${dateCheckIn.getDay()}/${dateCheckIn.getMonth()}/${dateCheckIn.getFullYear()}`}</p>
                          <div className="flex flex-row items-center">
                            {(() => {
                              if (edit) {
                                return (
                                  <React.Fragment>
                                    <input
                                      type="datetime-local"
                                      className="my-[16px] px-[16px] py-[12px] border-2 rounded-none border-[#FFC764] outline-none focus:ring-[2px] focus:ring-[#FBD083] focus:rounded-sm tracking-widest text-[#212529]"
                                      onChange={(event) => {}}
                                      min={currentDate}
                                      defaultValue={`${dateCheckOut?.getFullYear()}-${
                                        dateCheckOut?.getMonth() + 1 < 10
                                          ? "0"
                                          : ""
                                      }${dateCheckOut?.getMonth() + 1}-${
                                        dateCheckOut?.getDate() < 10 ? "0" : ""
                                      }${dateCheckOut?.getDate()}T${
                                        dateCheckOut?.getHours() < 10 ? "0" : ""
                                      }${dateCheckOut?.getHours()}:${
                                        dateCheckOut?.getMinutes() < 10
                                          ? "0"
                                          : ""
                                      }${dateCheckOut?.getMinutes()}`}
                                    />
                                    <button
                                      className="mx-[12px] drop-shadow-md shadow-md rounded-md h-[48px] px-[16px] bg-[#FFC764] duration-500 hover:opacity-90 text-[#212529]"
                                      onClick={(e) => {
                                        // NEED API FOR UPDATE TIME OUT
                                        setEdit(false);
                                      }}
                                    >
                                      CONFIRM
                                    </button>
                                  </React.Fragment>
                                );
                              } else {
                                return (
                                  <React.Fragment>
                                    <p className="bg-[#212529] w-[320px] h-[48px] leading-[48px] tracking-wide text-white text-center my-[6px] shadow-md rounded-md drop-shadow-md">{`CHECK OUT AT ${dateCheckOut.getHours()}:${dateCheckOut.getMinutes()} - ${dateCheckOut.getDay()}/${dateCheckOut.getMonth()}/${dateCheckOut.getFullYear()}`}</p>
                                    <button
                                      className="mx-[12px] drop-shadow-md shadow-md rounded-md h-[48px] w-[48px] bg-[#212529] duration-500 hover:opacity-90"
                                      onClick={(e) => {
                                        setEdit(true);
                                      }}
                                    >
                                      <i className="fa-solid fa-pen-to-square text-white"></i>
                                    </button>
                                  </React.Fragment>
                                );
                              }
                            })()}
                          </div>
                        </React.Fragment>
                      );
                    }
                  })()}
                  {(() => {
                    if (
                      room?.checkin_data?.length !== 0 &&
                      room?.checkin_data[room?.checkin_data?.length - 1]
                        ?.not_disturb
                    ) {
                      return (
                        <p className="tracking-[4px] text-[#212529] text-[24px] mt-[8px]">
                          {`NOT DISTURB ${
                            room?.checkin_data[room?.checkin_data?.length - 1]
                              ?.time_not_disturb
                          }M`}
                        </p>
                      );
                    }
                  })()}
                  <p className="text-[#212529] my-[8px]">{`${room?.price}$`}</p>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() => {
                      setRoom(null);
                      setEdit(false);
                    }}
                    className="bg-[#212529] w-[48px] h-[48px] shadow-md rounded-md md:block hidden duration-500 drop-shadow-md hover:opacity-90"
                  >
                    <i className="fa-solid fa-x text-white"></i>
                  </button>
                  {(() => {
                    if (!room?.is_available) {
                      return (
                        <React.Fragment>
                          <button
                            className="tracking-[4px] bg-[#FFC764] p-[16px] rounded-md shadow-md drop-shadow-md hover:opacity-90"
                            onClick={() => {
                              auth.currentUser.getIdToken().then((token) => {
                                BookingApi.checkOut(token, room?.id).then(
                                  (response) => {
                                    if (response.ok) {
                                      window.location.reload();
                                    }
                                  }
                                );
                              });
                            }}
                          >
                            CHECK OUT
                          </button>
                        </React.Fragment>
                      );
                    } else {
                      return (
                        <React.Fragment>
                          <a
                            href={`#/checkin/${room.id}`}
                            className="bg-[#FFC764] tracking-[4px] px-[16px] py-[12px] rounded-md shadow-md drop-shadow-md hover:opacity-90"
                          >
                            CHECK IN
                          </a>
                        </React.Fragment>
                      );
                    }
                  })()}
                </div>
              </div>
            );
          }
        })()}
      </section>
      {(() => {
        if (loading) {
          return (
            <div className="w-full h-[504px] justify-center items-center flex">
              <svg
                role="status"
                className="w-[48px] h-[48px] mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-blue-400"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          );
        }
      })()}

      {(() => {
        if (rooms?.get(floor)) {
          return (
            <section className="lg:mx-[60px] 2xl:mx-[100px] mx-[20px] my-[32px]">
              <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[16px] gap-y-[12px]">
                {rooms?.get(floor)?.map((room, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className="bg-white rounded-md shadow-md my-[16px] border-[1px] flex "
                        onClick={() => {
                          setRoom(room);
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
                              room?.checkin_data?.length !== 0 &&
                              room.checkin_data[room?.checkin_data?.length - 1]
                                ?.not_disturb
                            ) {
                              return (
                                <p className="text-[#212529] text-[24px]">
                                  {`NOT DISTURB ${
                                    room?.checkin_data[
                                      room?.checkin_data?.length - 1
                                    ]?.time_not_disturb
                                  }M`}
                                </p>
                              );
                            }
                          })()}

                          <p className="text-[#212529]">{`${room?.price}$`}</p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </section>
          );
        } else if (!loading) {
          return (
            <div className="w-full h-[504px] justify-center items-center flex">
              <p className="text-[24px] tracking-[4px] text-[#212529]">
                {`NOT FOUND ROOM IN FLOOR ${floor}`}
              </p>
            </div>
          );
        }
      })()}

      <div className="flex flex-row justify-center items-center my-[32px] ">
        <button
          className="text-[#212529] mx-[16px] disabled:opacity-60"
          onClick={() => {
            if (floor > 1) {
              window.location = `#/?floor=${floor - 1}`;
            }
          }}
          disabled={!(floor > 1)}
        >
          <i className="fa-solid fa-arrow-left-long" />
        </button>
        <div className="bg-[#212529] w-[48px] h-[48px] rounded-md shadow-md drop-shadow-md">
          <p className="text-white text-center leading-[48px] text-[18px] font-bold">
            {floor}
          </p>
        </div>
        <button
          className="text-[#212529] mx-[16px] disabled:opacity-60"
          onClick={() => {
            if (floor < maxFloor) {
              window.location = `#/?floor=${floor + 1}`;
            }
          }}
          disabled={!(floor < maxFloor)}
        >
          <i className="fa-solid fa-arrow-right-long" />
        </button>
      </div>
    </Container>
  );
});
