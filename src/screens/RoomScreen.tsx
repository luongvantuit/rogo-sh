import React from "react";
import { DATA_ROOM } from "../assets/data";
import { FloorComponent } from "../components/floor/FloorComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";

function RoomScreenComponent() {
    return (
        <React.Fragment>
            <HeaderComponent />
            {DATA_ROOM.map((v, i) => {
                return <FloorComponent {...v} key={i} />;
            })}
        </React.Fragment>
    );
}

export const RoomScreen = React.memo(RoomScreenComponent);
