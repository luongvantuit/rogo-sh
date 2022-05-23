import React from "react";
import { RoomApi } from "../api/room-api.js";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext.jsx";
import { BookingApi } from "../api/booking-api.js";
import { Container } from "../components/Container.jsx";

export const DashboardScreen = React.memo(() => {
    const [searchParams] = useSearchParams();
    const floor = parseInt(searchParams.get("floor") ?? "1");

    const [rooms, setRooms] = React.useState();
    const [room, setRoom] = React.useState();
    const [maxFloor, setMaxFloor] = React.useState(0);
    const user = React.useContext(AppContext);

    React.useEffect(() => {
        RoomApi.getListRoomsFilterOfHotel().then(async (response) => {
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
            }
        });
    }, [floor]);

    React.useEffect(() => {
        document.title = "Rogo Solutions - Dashboard";
    }, []);

    return (
        <Container>
            {/* <section
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
                                            <p className="font-bold py-[8px] text-[18px] text-[#212529 tracking-[2px]">
                                                {(() => {
                                                    if (room?.is_available) {
                                                        return "Available";
                                                    }
                                                    return "Busy";
                                                })()}
                                            </p>
                                            <p className="text-[#212529] tracking-[2px]">{`${room?.price}$`}</p>
                                            {(() => {
                                                if (
                                                    room?.checkin_data
                                                        ?.length !== 0 &&
                                                    room.checkin_data[
                                                        room.checkin_data
                                                            .length - 1
                                                    ].not_disturb
                                                ) {
                                                    return (
                                                        <p className="tracking-[4px] text-[#212529] text-[24px]">
                                                            NOT DISTURB
                                                        </p>
                                                    );
                                                }
                                            })()}
                                        </div>
                                        <div>
                                            {(() => {
                                                if (!room?.is_available) {
                                                    return (
                                                        <React.Fragment>
                                                            <button
                                                                className="tracking-[4px] bg-[#FFC764] p-[16px] rounded-md shadow-sm"
                                                                onClick={() => {
                                                                    BookingApi.checkOut(
                                                                        room?.id
                                                                    ).then(
                                                                        (
                                                                            response
                                                                        ) => {
                                                                            if (
                                                                                response.ok
                                                                            ) {
                                                                                window.location.reload();
                                                                            }
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                CHECK OUT
                                                            </button>
                                                        </React.Fragment>
                                                    );
                                                }
                                            })()}
                                        </div>
                                        <div className="flex flex-col justify-between items-end">
                                            <button
                                                onClick={() => {
                                                    setRoom(null);
                                                }}
                                            >
                                                <i className="fa-solid fa-x text-red-600"></i>
                                            </button>
                                            {(() => {
                                                if (!room?.is_available) {
                                                    return (
                                                        <button
                                                            onClick={() => {
                                                                if (user) {
                                                                    window.location = `#/qrcode/${room.id}`;
                                                                } else {
                                                                    window.location =
                                                                        "#/login";
                                                                }
                                                            }}
                                                            className="text-[#212529] text-[24px]"
                                                        >
                                                            <i className="fa-solid fa-qrcode" />
                                                        </button>
                                                    );
                                                } else {
                                                    return (
                                                        <React.Fragment>
                                                            <a
                                                                href={`#/book/${room.id}`}
                                                                className="bg-[#FFC764] tracking-[4px] px-[16px] py-[12px] rounded-md shadow-sm"
                                                            >
                                                                BOOK
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
                    </section> */}
            {/* <section className="lg:mx-[60px] 2xl:mx-[100px] mx-[20px] my-[32px]">
                        <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[16px] gap-y-[12px]">
                            {rooms?.get(floor).map((room, index) => {
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
                                                        if (
                                                            room?.is_available
                                                        ) {
                                                            return "text-[54px] font-bold text-green-500 tracking-[4px]";
                                                        }
                                                        return "text-[54px] font-bold text-red-500 tracking-[4px]";
                                                    })()}
                                                >
                                                    {room?.name}
                                                </p>
                                                <p className="font-bold py-[8px] text-[18px] text-[#212529] tracking-[2px]">
                                                    {(() => {
                                                        if (
                                                            room?.is_available
                                                        ) {
                                                            return "Available";
                                                        }
                                                        return "Busy";
                                                    })()}
                                                </p>
                                                {(() => {
                                                    if (
                                                        room?.checkin_data
                                                            ?.length !== 0 &&
                                                        room.checkin_data[
                                                            room.checkin_data
                                                                .length - 1
                                                        ].not_disturb
                                                    ) {
                                                        return (
                                                            <p className="tracking-[4px] text-[#212529] text-[24px]">
                                                                NOT DISTURB
                                                            </p>
                                                        );
                                                    }
                                                })()}

                                                <p className="text-[#212529] tracking-[2px]">{`${room?.price}$`}</p>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        <div className="flex flex-row justify-center items-center mt-[32px]">
                            <button
                                className="text-[#212529] mx-[16px]"
                                onClick={() => {
                                    if (floor > 1) {
                                        window.location = `#/?floor=${
                                            floor - 1
                                        }`;
                                    }
                                }}
                            >
                                <i className="fa-solid fa-arrow-left-long" />
                            </button>
                            <div className="bg-[#212529] w-[48px] h-[48px] rounded-sm shadow-sm ">
                                <p className="text-white text-center leading-[48px] text-[18px] font-bold">
                                    {floor}
                                </p>
                            </div>
                            <button
                                className="text-[#212529] mx-[16px]"
                                onClick={() => {
                                    if (floor < maxFloor) {
                                        window.location = `#/?floor=${
                                            floor + 1
                                        }`;
                                    }
                                }}
                            >
                                <i className="fa-solid fa-arrow-right-long" />
                            </button>
                        </div>
                    </section> */}
        </Container>
    );
});
