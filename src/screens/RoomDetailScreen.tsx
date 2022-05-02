import React from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { getRoomById } from "../assets/data";
import { DashboardButtonComponent } from "../components/dashboard/DashboardButtonComponent";
import { RoomBoardComponentProps } from "../components/floor/room-board/RoomBoardComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { Logger } from "../utils/Logger";

export type RoomDetailScreenProps = { params?: any };

export type RoomDetailScreenState = {
    location?: string;
} & RoomBoardComponentProps;

export class RoomDetailScreen extends React.PureComponent<
    RoomDetailScreenProps,
    RoomDetailScreenState
> {
    private static TAG: string = RoomDetailScreen.name;

    private setTitle(displayNameRoom: string): void {
        if (document) {
            document.title = `Rogo Solutions - Room Detail Of ${displayNameRoom}`;
        }
    }

    componentDidMount() {
        this.setState(getRoomById(this.props.params.roomId));
        this.setTitle(this.state?.displayName);
    }

    componentDidUpdate() {
        this.setState(getRoomById(this.props.params.roomId));
        this.setTitle(this.state?.displayName);
    }

    render(): React.ReactNode {
        Logger.debug(
            RoomDetailScreen.TAG,
            `Render --> ${RoomDetailScreen.name} with Room Id: ${this.props.params.roomId}`
        );
        return (
            <React.Fragment>
                <HeaderComponent />
                <QRCode
                    value={JSON.stringify({
                        roomId: this.state?.roomId,
                        location: this.state?.location,
                    })}
                />
                <DashboardButtonComponent
                    text="Check Out"
                    color="#4B99E6"
                    border
                    disable={
                        this.state?.howMuchPeople !== 0 && this.state?.isUsed
                    }
                />
                <DashboardButtonComponent
                    text="Check In"
                    color="#4B99E6"
                    disable={
                        this.state?.howMuchPeople === 0 && this.state?.isUsed
                    }
                />
                <DashboardButtonComponent
                    text="Booking"
                    color="#40AD87"
                    disable={this.state?.isUsed}
                />
            </React.Fragment>
        );
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default React.memo((props: RoomDetailScreenProps) => (
    <RoomDetailScreen {...props} params={useParams()} />
));
