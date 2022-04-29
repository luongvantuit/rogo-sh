import React from "react";
import { FloorComponent } from "../components/floor/FloorComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";
import UndrawReadingTime from "../assets/undraw-reading-time.svg";
// import UndrawSlider from "../assets/undraw-slider.svg";

export class DashboardScreen extends React.PureComponent {
    private static TITLE_DEFAULT: string = "Rogo Solutions - Dashboard";

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
        return (
            <React.Fragment>
                <HeaderComponent />
                <FloorComponent
                    displayNameFloor="A"
                    listRooms={[
                        {
                            displayName: "A - 201",
                            roomId: "a1",
                            doNotDisturb: true,
                            howMuchPeople: 2,
                            isUsed: true,
                            lighting: false,
                        },
                        {
                            displayName: "A - 202",
                            roomId: "a2",
                            isUsed: false,
                        },
                        {
                            displayName: "A - 203",
                            roomId: "a3",
                            doNotDisturb: true,
                            howMuchPeople: 2,
                            isUsed: true,
                            lighting: true,
                        },
                        {
                            displayName: "A - 204",
                            roomId: "a4",
                            howMuchPeople: 3,
                            isUsed: true,
                            lighting: true,
                        },
                    ]}
                />
                <FloorComponent
                    displayNameFloor="B"
                    listRooms={[
                        {
                            displayName: "A - 201",
                            roomId: "b1",
                            howMuchPeople: 2,
                            isUsed: true,
                            lighting: false,
                        },
                        {
                            displayName: "B - 202",
                            roomId: "b2",
                            isUsed: true,
                        },
                        {
                            displayName: "B - 203",
                            roomId: "b3",
                            doNotDisturb: true,
                            howMuchPeople: 2,
                            isUsed: true,
                            lighting: true,
                        },
                    ]}
                />
                <img
                    src={UndrawReadingTime}
                    alt="Undraw Reading Time"
                    className="xl:my-[32px] my-[16px] xl:w-[640px]  w-[512px]"
                />
            </React.Fragment>
        );
    }
}
