import React from "react";
import Bell from "../../assets/icons/bell.svg";

export type NotificationComponentProps = {
    quantity?: number;
};

export class NotificationComponent extends React.PureComponent<NotificationComponentProps> {
    render(): React.ReactNode {
        return (
            <div className="w-[34px] h-[34px] mx-[16px]">
                <div className="relative top-0 left-0 right-0 bottom-0">
                    <div className="w-[34px] h-[34px] flex justify-center items-center">
                        <img
                            src={Bell}
                            alt="Bell Notification"
                            className="w-[32px] h-[32px]"
                        />
                    </div>
                    <div className="absolute top-0 right-0 w-[18px] h-[18px] bg-[#FF5D5E] rounded-[9px] flex justify-center items-center rogo-smart-hotel-drop-shadow">
                        <p className="text-[#FFFFFF] text-center text-[10px] font-black">
                            {this.props.quantity || 0}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
