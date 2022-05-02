import React from "react";
import { FloorComponent } from "../components/floor/FloorComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";
// import UndrawReadingTime from "../assets/undraw-reading-time.svg";
import { Logger } from "../utils/Logger";
// Fake data
import { DATA_ROOM } from "../assets/data";
// import UndrawSlider from "../assets/undraw-slider.svg";

export class DashboardScreen extends React.PureComponent {
    private static TITLE_DEFAULT: string = "Rogo Solutions - Dashboard";

    private static TAG: string = DashboardScreen.name;

    private setTitle(): void {
        if (document) {
            document.title = DashboardScreen.TITLE_DEFAULT;
        }
    }

    componentDidMount() {
        this.setTitle();
    }

    componentDidUpdate() {
        this.setTitle();
    }

    render(): React.ReactNode {
        Logger.debug(DashboardScreen.TAG, `Render --> ${DashboardScreen.name}`);
        return (
            <React.Fragment>
                <HeaderComponent />
                {DATA_ROOM.map((v, i) => {
                    return <FloorComponent {...v} key={i} />;
                })}
            </React.Fragment>
        );
    }
}
