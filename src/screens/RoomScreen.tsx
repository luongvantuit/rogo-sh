import React from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { getRoomById } from "../assets/data";
import { DashboardButtonComponent } from "../components/dashboard/DashboardButtonComponent";
import { RoomBoardComponentProps } from "../components/floor/room-board/RoomBoardComponent";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { Logger } from "../utils/Logger";
import Location from "../assets/icons/location.png";

export type RoomScreenProps = { params?: any };

export type RoomScreenState = {
    location?: string;
    checkIn?: boolean;
} & RoomBoardComponentProps;

export class RoomDetailScreen extends React.PureComponent<
    RoomScreenProps,
    RoomScreenState
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

                <div className="flex flex-row mt-[64px]">
                    <div className="flex flex-1 mx-[16px]">
                        <div className="bg-white rogo-smart-hotel-drop-shadow w-auto h-[154px] flex flex-1 rounded-lg py-[16px] px-[32px] flex-col justify-center">
                            <p className="text-[#39374E] font-black text-[32px]">
                                {this.state?.displayName}
                            </p>
                            <div className="flex flex-row items-end">
                                <img
                                    src={Location}
                                    alt="Location"
                                    className="w-[24px] h-[24px]"
                                />
                                <p className="font-semibold text-[12px]">
                                    {this.state?.location}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <DashboardButtonComponent
                            text="Check In"
                            color="#4B99E6"
                            disable={this.state?.checkIn || !this.state?.isUsed}
                        />
                        <span className="my-[12px]" />
                        <DashboardButtonComponent
                            text="Check Out"
                            color="#4B99E6"
                            border
                            disable={
                                !this.state?.checkIn || !this.state?.isUsed
                            }
                        />
                    </div>
                    <div className="flex flex-col mx-[16px]">
                        <div className="w-[320px] h-[320px] bg-white mb-[16px] rounded-lg border-[2px] border-[#4B99E6] flex justify-center items-center">
                            <QRCode
                                value={JSON.stringify({
                                    roomId: this.state?.roomId,
                                    location: this.state?.location,
                                })}
                                download
                                bgColor="#FFFFFF"
                            />
                        </div>
                        <DashboardButtonComponent
                            text="Booking"
                            color="#40AD87"
                            disable={this.state?.isUsed}
                        />
                        <span className="my-[8px]" />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export const RoomScreen = React.memo((props: RoomScreenProps) => (
    <RoomDetailScreen {...props} params={useParams()} />
));
