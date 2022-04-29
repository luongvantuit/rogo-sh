import React from "react";
import Forward from "../../../assets/icons/forward.png";

export type RoomBoardProps = {
    displayName: string;
    roomId: string;
    isUsed?: boolean;
    doNotDisturb?: boolean;
    lighting?: boolean;
    howMuchPeople?: number;
};
export type RoomBoardState = {};

export class RoomBoardComponent extends React.PureComponent<
    RoomBoardProps,
    RoomBoardState
> {
    render(): React.ReactNode {
        return (
            <div className="">
                <a
                    href={`${process.env.PUBLIC_URL}/room/detail/${this.props.roomId}`}
                >
                    <img src={Forward} alt="Forward" className="" />
                </a>
            </div>
        );
    }
}
