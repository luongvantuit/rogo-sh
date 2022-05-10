import React from "react";
import { useParams } from "react-router-dom";
import { HotelApi } from "../api/HotelApi";
import { RoomApi } from "../api/RoomApi";
// import { DATA_ROOM } from "../assets/data";
// import { FloorComponent } from "../components/floor/FloorComponent";
import { RoomBoardComponent } from "../components/floor/room-board/RoomBoardComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { IHotel } from "../types/IHotel";
import { IRoom } from "../types/IRoom";
import { Logger } from "../utils/Logger";

function HotelScreenComponent() {
    const TAG = HotelScreenComponent.name;

    const { hotelId } = useParams();

    const [rooms, setRooms] = React.useState<IRoom[]>([]);

    React.useEffect(() => {
        if (hotelId && document) {
            HotelApi.getDetailHotel(hotelId).then(async (response) => {
                if (response.ok) {
                    const data: IHotel = (await response.json())["data"];
                    const hotelName = data.name;
                    document.title = `Rogo Solutions - Hotel ${hotelName}`;
                } else {
                    document.title = "Rogo Solutions - Error";
                }
            });
        }
    });

    React.useEffect(() => {
        if (hotelId) {
            RoomApi.getListRoomsOfHotel(hotelId).then(async (response) => {
                if (response.ok) {
                    const data: IRoom[] = (await response.json())["data"];
                    Logger.debug(TAG, data);
                    setRooms(data);
                } else {
                    const error = await response.json();
                    Logger.error(TAG, error["msg"]);
                }
            });
        }
    }, [TAG, hotelId]);

    return (
        <React.Fragment>
            <HeaderComponent />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 mx-[32px]">
                {rooms?.map((room, index) => {
                    return (
                        <RoomBoardComponent
                            key={index}
                            displayName={room.name}
                            roomId={room._id}
                            isUsed={!room.is_available}
                            hotelId={room.id_hotel}
                        />
                    );
                })}
            </div>
        </React.Fragment>
    );
}

export const HotelScreen = React.memo(HotelScreenComponent);
