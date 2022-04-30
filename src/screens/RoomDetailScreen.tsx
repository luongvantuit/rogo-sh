import React from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../assets/data";
import { RoomBoardComponentProps } from "../components/floor/room-board/RoomBoardComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { Logger } from "../utils/Logger";

export type RoomDetailScreenProps = { params?: any };

export type RoomDetailScreenState = {} & RoomBoardComponentProps;

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
            </React.Fragment>
        );
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default React.memo((props: RoomDetailScreenProps) => (
    <RoomDetailScreen {...props} params={useParams()} />
));
