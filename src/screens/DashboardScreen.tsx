import React from "react";
import { HotelApi } from "../api/Hotel";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { IHotel } from "../types/IHotel";
import { Logger } from "../utils/Logger";

export const DashboardScreen = React.memo(() => {
    const TAG = DashboardScreen.name;

    Logger.debug(TAG, `Render --> ${DashboardScreen.name}`);
    const [hotels, setHotels] = React.useState<IHotel[]>([]);

    React.useEffect(() => {
        HotelApi.getListHotels().then(async (response) => {
            if (response.ok) {
                const data = (await response.json())["data"];
                setHotels(data);
            }
        });
    });

    return (
        <React.Fragment>
            <HeaderComponent />
            <div className="flex flex-col">
                {hotels.map((hotel, index) => (
                    <React.Fragment key={index}>
                        <a href={`/hotel/${hotel?._id}`}>{hotel?.name}</a>
                    </React.Fragment>
                ))}
            </div>
        </React.Fragment>
    );
});
