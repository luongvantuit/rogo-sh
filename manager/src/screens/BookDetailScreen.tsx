import React from "react";
import { useParams } from "react-router-dom";
import { RoomApi } from "../api/RoomApi";
import { HeaderNav } from "../components/HeaderNav";
import { IRoom } from "../types/IRoom";
import Hero from "../assets/hero.jpg";

export const BookDetailScreen = React.memo(() => {
    const { roomId } = useParams();

    const currentDate = (() => {
        const date: Date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" : ""}${
            date.getMonth() + 1
        }-${
            date.getDate() < 10 ? "0" : ""
        }${date.getDate()}T${date.getHours()}:${date.getMinutes()}`;
    })();

    const [room, setRoom] = React.useState<IRoom>();
    const [timeCheckIn, setTimeCheckIn] = React.useState<string>(currentDate);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [timeCheckOut, setTimeCheckOut] = React.useState<string>(currentDate);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [person, setPerson] = React.useState<number>(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cMND, setCMND] = React.useState<string>("");

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
                className="w-auto h-[720px] bg-cover bg-no-repeat flex flex-col justify-center items-center"
                style={{
                    backgroundImage: `url(${Hero})`,
                }}
            >
                <p className="text-[#FFC764] my-[64px] font-medium tracking-[4px] text-[48px]">
                    BOOK ROOM {room?.name?.toUpperCase()}
                </p>
                <form
                    action=""
                    className="shadow-sm flex flex-row"
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                >
                    <div className="bg-white flex flex-1 flex-col p-[32px]">
                        <div className="flex flex-row my-[16px]">
                            <div>
                                <label className="tracking-widest font-normal text-[20px] text-[#FFC764]">
                                    CHECK IN
                                </label>
                                <br />
                                <input
                                    type="datetime-local"
                                    className="my-[16px] px-[16px] py-[12px] border-2 rounded-none border-[#FFC764] outline-none focus:ring-[2px] focus:ring-[#FBD083] focus:rounded-sm tracking-widest text-[#212529]"
                                    onChange={(event) => {
                                        setTimeCheckIn(event.target.value);
                                    }}
                                    min={currentDate}
                                />
                            </div>
                            <div className="ml-[32px]">
                                <label className="tracking-widest font-normal text-[20px] text-[#FFC764]">
                                    CHECK OUT
                                </label>
                                <br />
                                <input
                                    type="datetime-local"
                                    className="my-[16px] px-[16px] py-[12px] border-2 rounded-none border-[#FFC764] outline-none focus:ring-[2px] focus:ring-[#FBD083] focus:rounded-sm tracking-widest text-[#212529]"
                                    min={(() => {
                                        if (timeCheckIn) {
                                            return timeCheckIn;
                                        }
                                        return currentDate;
                                    })()}
                                    onChange={(event) => {
                                        setTimeCheckOut(event.target.value);
                                    }}
                                />
                            </div>

                            <div className="ml-[32px]">
                                <label className="tracking-widest font-normal text-[20px] text-[#FFC764]">
                                    PERSON
                                </label>
                                <br />
                                <input
                                    type="number"
                                    className="my-[16px] px-[16px] py-[12px] border-2 rounded-none border-[#FFC764] outline-none focus:ring-[2px] focus:ring-[#FBD083] focus:rounded-sm tracking-widest text-[#212529]"
                                    min={1}
                                    onChange={(event) => {
                                        setPerson(parseInt(event.target.value));
                                    }}
                                />
                            </div>
                        </div>
                        <input
                            type="text"
                            name="cMND"
                            id="cMND"
                            placeholder="CMND/Passport Number"
                            className="px-[16px] py-[12px] border-2 rounded-none border-[#FFC764] outline-none focus:ring-[2px] focus:ring-[#FBD083] focus:rounded-sm tracking-widest text-[#212529]"
                            onChange={(event) => {
                                setCMND(event.target.value);
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#212529] text-white tracking-widest px-[16px]"
                    >
                        BOOK NOW
                    </button>
                </form>
            </section>
        </React.Fragment>
    );
});
