import React from "react";
import { RoomApi } from "../api/RoomApi";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { IRoom } from "../types/IRoom";
import HomeBackground from "../assets/home_background.jpeg";

export const HomeScreen = React.memo(() => {
    const [rooms, setRooms] = React.useState<IRoom[]>([]);

    React.useEffect(() => {
        document.title = "Rogo Solutions - Home";
        RoomApi.getListRooms().then(async (response) => {
            if (response.ok) {
                const data = (await response.json())["data"];
                setRooms(data);
            }
        });
    }, []);

    React.useEffect(() => {
        document.title = "Rogo Solutions - Home";
    }, []);

    return (
        <React.Fragment>
            <div className="w-auto relative left-0 right-0">
                <img
                    src={HomeBackground}
                    alt="Home Background"
                    className="absolute"
                />
                <div className="absolute left-0 right-0 top-0">
                    <HeaderComponent colorTextBanner="#FFFFFF" />
                    <div className="grid grid-cols-4 px-[32px] pt-[16px] gap-[8px]">
                        {rooms.map((room, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="rounded-[8px] bg-white shadow-sm p-[8px]">
                                        <a href={`/room/${room._id}`}>
                                            {room.name}
                                        </a>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
});
