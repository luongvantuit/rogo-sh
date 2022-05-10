import React from "react";
import Forward from "../../../assets/icons/forward.png";
import { Logger } from "../../../utils/Logger";
// import { DoNotDisturbComponent } from "./DoNotDisturbComponent";
// import Lighting from "../../../assets/icons/lighting.png";
// import NotLighting from "../../../assets/icons/not-lighting.png";
import { IsUsedComponent } from "./IsUsedComponent";
// import { QuantityUserComponent } from "./QuantityUserComponent";

export enum ROOM_BOARD_COLOR {
    NORMAL = "#FFFFFF",
    USED = "#40AD87",
    DO_NOT_DISTURB = "#FF5D5E",
}

export type RoomBoardComponentProps = {
    displayName: string;
    roomId: string;
    hotelId: string;
    isUsed?: boolean;
    doNotDisturb?: boolean;
    lighting?: boolean;
    howMuchPeople?: number;
};
export type RoomBoardComponentState = {};

export class RoomBoardComponent extends React.PureComponent<
    RoomBoardComponentProps,
    RoomBoardComponentState
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
            } else if (!this.props.isUsed) {
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
                    "h-[140px] rounded-[10px] rogo-smart-hotel-drop-shadow flex flex-row p-[16px]"
                }
                style={{
                    backgroundColor: getRoomBoardColor(),
                }}
            >
                <div className="flex flex-col justify-between flex-1">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <p
                                className="text-[20px] font-black"
                                style={{
                                    color:
                                        this.props.isUsed &&
                                        !this.props.doNotDisturb
                                            ? "#39374E"
                                            : "#FFFFFF",
                                }}
                            >
                                {this.props.displayName}
                            </p>
                            <IsUsedComponent
                                isUsed={this.props.isUsed}
                                textColor={
                                    this.props.isUsed &&
                                    !this.props.doNotDisturb
                                        ? "#C4C4C4"
                                        : "#FFFFFF"
                                }
                            />
                        </div>
                        {/* <div className="flex flex-col justify-center items-end">
                            <img
                                src={(() => {
                                    if (this.props.lighting) {
                                        return Lighting;
                                    }
                                    return NotLighting;
                                })()}
                                alt="State Lighting"
                                className="w-[14px] h-[14px] rogo-smart-hotel-drop-shadow"
                            />
                            <DoNotDisturbComponent
                                textColor={
                                    this.props.isUsed &&
                                    !this.props.doNotDisturb
                                        ? "#39374E"
                                        : "#FFFFFF"
                                }
                            />
                        </div> */}
                    </div>
                    <div className="flex-row flex justify-between items-end">
                        {/* <QuantityUserComponent
                            quantityUser={this.props.howMuchPeople || 0}
                        /> */}
                        <a
                            href={`/room/${this.props.hotelId}/${this.props.roomId}`}
                        >
                            <img
                                src={Forward}
                                alt="Forward"
                                className="w-[24px] h-[24px] rogo-smart-hotel-drop-shadow"
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
