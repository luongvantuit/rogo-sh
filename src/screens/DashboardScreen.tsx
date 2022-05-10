import React from "react";
import { HotelApi } from "../api/HotelApi";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { IHotel } from "../types/IHotel";
import { Logger } from "../utils/Logger";

export const DashboardScreen = React.memo(() => {
    const TAG = DashboardScreen.name;
    const TITLE = "Rogo Solutions - Dashboard";

    Logger.debug(TAG, `Render --> ${DashboardScreen.name}`);
    const [hotels, setHotels] = React.useState<IHotel[]>([]);

    React.useEffect(() => {
        HotelApi.getListHotels().then(async (response) => {
            if (response.ok) {
                const data = (await response.json())["data"];
                setHotels(data);
            }
        });
    }, []);

    React.useEffect(() => {
        if (document) {
            document.title = TITLE;
        }
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
