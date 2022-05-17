import React from "react";
import { HeaderNav } from "../components/HeaderNav";
import BreadcrumbBg from "../assets/breadcrumb-bg.jpg";
import { IRoom } from "../types/IRoom";
import { RoomApi } from "../api/RoomApi";
import { useSearchParams } from "react-router-dom";

export const DashboardScreen = React.memo(() => {
    const [searchParams] = useSearchParams();
    const floor: number = parseInt(searchParams.get("floor") ?? "1");

    const [rooms, setRooms] = React.useState<IRoom[]>([]);
    React.useEffect(() => {
        RoomApi.getListRooms().then(async (response) => {
            if (response.ok) {
                const data: IRoom[] = (await response.json())["data"];
                setRooms(data);
            }
        });
    }, [floor]);

    React.useEffect(() => {
        document.title = "Rogo Solutions - Dashboard";
    }, []);

    return (
        <React.Fragment>
            <HeaderNav navActive="dashboard" />
            <section
                className="h-[360px] flex flex-col justify-center items-center"
                style={{
                    backgroundImage: `url(${BreadcrumbBg})`,
                }}
            >
                <p className="text-white text-[64px] font-normal tracking-widest">
                    Floors Manager
                </p>
                <div className="flex flex-row items-center text-[18px] font-light">
                    {/* <a href="/" className="text-white ">
                        <p className="mx-[8px] inline">Home \</p>
                    </a>
                    <p className="text-[#777c81]">Dashboard</p> */}
                </div>
            </section>
            <section></section>
            <section className="mx-[320px] my-[32px]">
                <div className="grid grid-cols-3 gap-x-[16px] gap-y-[12px]">
                    {rooms.map((room, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="bg-white rounded-sm shadow-sm my-[16px] border-2 flex border-[#FFC764]">
                                    <div className="flex flex-1 p-[16px] flex-col">
                                        <p className="text-[54px] font-bold text-[#FFC764] tracking-[4px]">
                                            {room?.name}
                                        </p>
                                        <p className="font-bold py-[8px] text-[18px] text-[#212529 tracking-[4px]">
                                            {(() => {
                                                if (room?.is_available) {
                                                    return "Available";
                                                }
                                                return "Busy";
                                            })().toUpperCase()}
                                        </p>

                                        <p className="text-[#212529] tracking-[4px]">{`${room?.price}$`}</p>
                                    </div>
                                    <a
                                        href={`/room/${room?._id}`}
                                        className="bg-[#212529] px-[24px] flex justify-center items-center hover:bg-[#FFC764] duration-300"
                                    >
                                        <i className="fa-solid fa-arrow-right-long text-white text-[24px]" />
                                    </a>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="flex flex-row justify-center items-center mt-[32px]">
                    <div className="bg-[#FFC764] w-[48px] h-[48px] rounded-sm shadow-sm hover:bg-[#FBD083]">
                        <p className="text-white text-center leading-[48px]">
                            1
                        </p>
                    </div>
                    <i className="fa-solid fa-arrow-right-long text-[#FFC764] mx-[16px]" />
                </div>
            </section>
        </React.Fragment>
    );
});
