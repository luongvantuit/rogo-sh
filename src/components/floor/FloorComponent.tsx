import React from "react";
import { Logger } from "../../utils/Logger";
import {
    RoomBoardComponent,
    RoomBoardComponentProps,
} from "./room-board/RoomBoardComponent";

export type FloorComponentProps = {
    displayNameFloor: string;
    listRooms: RoomBoardComponentProps[];
};
export type FloorComponentState = {};

export class FloorComponent extends React.PureComponent<FloorComponentProps> {
    private static TAG: string = FloorComponent.name;

    render(): React.ReactNode {
        Logger.debug(
            FloorComponent.TAG,
            `Render --> Floor ${this.props.displayNameFloor}`
        );
        return (
            <div className="lg:px-16 px-6 my-20 mx-10">
                <p className="text-white font-black text-[20px] my-6 ml-4">
                    {this.props.displayNameFloor}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                    {this.props.listRooms.map((v, i) => {
                        return <RoomBoardComponent {...v} key={i} />;
                    })}
                </div>
            </div>
        );
    }
}
