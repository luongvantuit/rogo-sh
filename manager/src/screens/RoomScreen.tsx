import React from "react";
import { HeaderNav } from "../components/HeaderNav";
import BreadcrumbBg from "../assets/breadcrumb-bg.jpg";
import { useParams } from "react-router-dom";
import { IRoom } from "../types/IRoom";
import { RoomApi } from "../api/RoomApi";
import QRCode from "react-qr-code";

export const RoomScreen = React.memo(() => {
    const { roomId } = useParams();

    const [room, setRoom] = React.useState<IRoom>();

    React.useEffect(() => {
        RoomApi.getDetailRoom(roomId).then(async (response) => {
            if (response.ok) {
                const data = (await response.json())["data"];
                setRoom(data);
            }
        });
    }, [roomId]);

    return (
        <React.Fragment>
            <HeaderNav />
            <section
                className="h-[360px] bg-cover bg-no-repeat flex flex-col justify-center items-center"
                style={{
                    backgroundImage: `url(${BreadcrumbBg})`,
                }}
            >
                <p className="text-[#FFC764] text-[64px] font-normal tracking-widest">
                    {room?.name}
                </p>
                <div className="flex flex-row items-center text-[18px] font-light">
                    <a href="/" className="text-white ">
                        <p className="mr-[8px] inline">Home \</p>
                    </a>
                    <a href="/dashboard" className="text-white ">
                        <p className="mr-[8px] inline">Dashboard \</p>
                    </a>
                    <p className="text-[#777c81]">{room?.name}</p>
                </div>
                {(() => {
                    if (room?.is_available) {
                        return (
                            <a
                                href={`/book/${roomId}`}
                                className="flex flex-row justify-center bg-[#FFC764] my-[16px] text-white tracking-[4px] text-[24px] font-normal shadow-sm"
                            >
                                <p className="px-[24px] py-[12px]">BOOK</p>
                                <span className="px-[16px] bg-[#212529] justify-center items-center flex">
                                    <i className="fa-solid fa-arrow-right-long text-white text-[18px]" />
                                </span>
                            </a>
                        );
                    }
                })()}
            </section>
            <section className="mx-[320px] my-[32px] flex flex-col items-center mt-[-80px]">
                {(() => {
                    if (!room?.is_available) {
                        return (
                            <div className="w-[300px] h-[300px] flex justify-center items-center bg-white shadow-lg">
                                <QRCode value="1" />
                            </div>
                        );
                    }
                })()}
            </section>
        </React.Fragment>
    );
});
