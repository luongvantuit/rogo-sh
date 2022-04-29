import React from "react";
import Avatar from "../../assets/avatar.jpeg";

export class AvatarComponent extends React.PureComponent {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <img
                    src={Avatar}
                    alt="Avatar --> User"
                    className="w-[48px] h-[48px] rounded-[24px]"
                />
            </React.Fragment>
        );
    }
}
