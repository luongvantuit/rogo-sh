import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { RoomApi } from "../api/RoomApi";
import { IRoom } from "../types/IRoom";

export const RoomScreen = React.memo(() => {
    const { roomId } = useParams();

    const [room, setRoom] = useState<IRoom>();

    React.useEffect(() => {
        RoomApi.getDetailRoom(roomId).then(async (response) => {
            if (response.ok) {
                const data = (await response.json())["data"];
                setRoom(data);
            }
        });
    }, [roomId]);

    return <React.Fragment></React.Fragment>;
});
