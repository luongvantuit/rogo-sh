import React from "react";
import Forward from "../../../assets/icons/forward.png";
import { Logger } from "../../../utils/Logger";
import { DoNotDisturbComponent } from "./DoNotDisturbComponent";

export enum ROOM_BOARD_COLOR {
    NORMAL = "#FFFFFF",
    USED = "#40AD87",
    DO_NOT_DISTURB = "#FF5D5E",
}

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
    private static TAG: string = RoomBoardComponent.name;
    render(): React.ReactNode {
        Logger.debug(
            RoomBoardComponent.TAG,
            "Render --> " + JSON.stringify(this.props)
        );

        const getRoomBoardColor = () => {
            if (this.props.doNotDisturb) {
                return ROOM_BOARD_COLOR.DO_NOT_DISTURB;
            } else if (this.props.isUsed) {
                return ROOM_BOARD_COLOR.USED;
            } else {
                return ROOM_BOARD_COLOR.NORMAL;
            }
        };

        Logger.debug(
            RoomBoardComponent.TAG,
            "State Color Room Board --> " + getRoomBoardColor()
        );
        return (
            <div
                className={
                    "w-[356px] h-[140px] rounded-[10px] rogo-smart-hotel-drop-shadow flex flex-row"
                }
                style={{
                    backgroundColor: getRoomBoardColor(),
                }}
            >
                <div>
                    <div></div>
                    <div>
                        <img src="" alt="State Lighting" />
                        <DoNotDisturbComponent />
                    </div>
                </div>
                <div>
                    <a
                        href={`${process.env.PUBLIC_URL}/room/detail/${this.props.roomId}`}
                    >
                        <img
                            src={Forward}
                            alt="Forward"
                            className="w-[24px] h-[24px] rogo-smart-hotel-drop-shadow"
                        />
                    </a>
                </div>
            </div>
        );
    }
}
