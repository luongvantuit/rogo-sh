import React from "react";
import { HeaderNav } from "../components/HeaderNav";
import BreadcrumbBg from "../assets/breadcrumb-bg.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { IRoom } from "../types/IRoom";
import { RoomApi } from "../api/RoomApi";
import QRCode from "react-qr-code";
import { IBooking } from "../types/IBooking";
import { BookingApi } from "../api/BookingApi";

export const RoomScreen = React.memo(() => {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [room, setRoom] = React.useState<IRoom>();
    const [booking, setBooking] = React.useState<IBooking>();

    React.useEffect(() => {
        RoomApi.getDetailRoom(roomId).then(async (response) => {
            if (response.ok) {
                const data = (await response.json())["data"];
                setRoom(data);
                if (!room?.is_available) {
                    BookingApi.getDetailBooking(roomId).then(
                        async (response) => {
                            if (response.ok) {
                                const dataBooking: IBooking[] = (
                                    await response.json()
                                )["data"];
                                setBooking(dataBooking[dataBooking.length - 1]);
                            }
                        }
                    );
                }
            }
        });
    }, [room?.is_available, roomId]);

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
                            <React.Fragment>
                                <div className="w-[300px] h-[300px] flex justify-center items-center bg-white shadow-lg">
                                    <QRCode
                                        value={JSON.stringify({
                                            room_id: booking?.room_id,
                                            checkin: booking?.checkin,
                                            checkout: booking?.checkout,
                                        })}
                                    />
                                </div>
                                <button
                                    className="bg-[#FFC764] text-[#212529] w-[300px] text-center my-[32px] py-[16px] tracking-[4px] shadow-md"
                                    onClick={() => {
                                        BookingApi.checkOut(
                                            booking?.room_id,
                                            new Date().toISOString()
                                        ).then(async (response) => {
                                            if (response.ok) {
                                                const data = (
                                                    await response.json()
                                                )["data"];
                                                console.log(data);
                                                navigate("/dashboard");
                                            }
                                        });
                                    }}
                                >
                                    CHECK OUT
                                </button>
                                {(() => {
                                    if (booking?.not_disturb) {
                                        return (
                                            <p className="bg-[#212529] text-white w-[300px] text-center mb-[32px] py-[16px] tracking-[4px] shadow-md">{`NOT DISTURB IN ${booking.time_not_disturb}H`}</p>
                                        );
                                    }
                                })()}
                            </React.Fragment>
                        );
                    }
                })()}
            </section>
        </React.Fragment>
    );
});
