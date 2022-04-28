import React from "react";

export type RoomBoardProps = {
    displayName: string;
    isUsed?: boolean;
    doNotDisturb: boolean;
};
export type RoomBoardState = {};

export class RoomBoardComponent extends React.PureComponent<
    RoomBoardProps,
    RoomBoardState
> {
    render(): React.ReactNode {
        return <React.Fragment></React.Fragment>;
    }
}
