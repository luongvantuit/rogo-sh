import React from "react";
// import { HeaderNav } from "../components/HeaderNav.jsx";
import BreadcrumbBg from "../assets/breadcrumb-bg.jpg";
import { RoomApi } from "../api/room-api.js";
import { useSearchParams } from "react-router-dom";
import { SliderBar } from "../components/SliderBar.jsx";
import { AppContext } from "../contexts/AppContext.jsx";

export const DashboardScreen = React.memo(() => {
    const [searchParams] = useSearchParams();
    const floor = parseInt(searchParams.get("floor") ?? "1");

    const [rooms, setRooms] = React.useState([]);
    const [room, setRoom] = React.useState();

    const user = React.useContext(AppContext);

    React.useEffect(() => {
        RoomApi.getListRooms().then(async (response) => {
            if (response.ok) {
                const data = (await response.json())["data"];
                setRooms(data);
            }
        });
    }, [floor]);

    React.useEffect(() => {
        document.title = "Rogo Solutions - Dashboard";
    }, []);

    return (
        <React.Fragment>
            {/* <HeaderNav navActive="dashboard" /> */}
            <div className="flex flex-row">
                <SliderBar />
                <div className="block w-full">
                    <section
                        className="h-[240px] flex flex-col justify-center items-center"
                        style={{
                            backgroundImage: `url(${BreadcrumbBg})`,
                        }}
                    >
                        <p className="text-white text-[64px] font-normal tracking-widest">
                            Floors Manager
                        </p>
                    </section>
                    <section
                        className={(() => {
                            if (room) {
                                return "lg:mx-[60px] 2xl:mx-[100px] mt-[-40px]";
                            }
                        })()}
                    >
                        {(() => {
                            if (room) {
                                return (
                                    <div className="p-[32px] shadow-md border-[1px] bg-white flex flex-row justify-between">
                                        <div>
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
                                        </div>
                                        <div className="flex flex-col justify-between">
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
                                                                    window.location = `#/qrcode/${room._id}`;
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
                                                }
                                            })()}
                                        </div>
                                    </div>
                                );
                            }
                        })()}
                    </section>
                    <section className="lg:mx-[60px] 2xl:mx-[100px] mx-[20px] my-[32px]">
                        <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[16px] gap-y-[12px]">
                            {rooms.map((room, index) => {
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

                                                <p className="text-[#212529] tracking-[2px]">{`${room?.price}$`}</p>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        <div className="flex flex-row justify-center items-center mt-[32px]">
                            <div className="bg-[#212529] w-[48px] h-[48px] rounded-sm shadow-sm hover:bg-[#FBD083]">
                                <p className="text-white text-center leading-[48px] text-[18px] font-bold">
                                    {floor}
                                </p>
                            </div>
                            <button
                                className="text-[#212529] mx-[16px]"
                                onClick={() => {
                                    window.location = `#/?floor=${floor + 1}`;
                                }}
                            >
                                <i className="fa-solid fa-arrow-right-long" />
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </React.Fragment>
    );
});
