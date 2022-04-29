import React from "react";
import { RoomBoardComponent } from "../components/floor/room-board/RoomBoardComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";

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
                <RoomBoardComponent
                    displayName="A - 201"
                    roomId="1"
                    isUsed={true}
                    doNotDisturb={true}
                    howMuchPeople={2}
                />
            </React.Fragment>
        );
    }
}
