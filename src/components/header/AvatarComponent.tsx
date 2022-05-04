import React from "react";
import Avatar from "../../assets/avatar.jpg";

export class AvatarComponent extends React.PureComponent {
    render(): React.ReactNode {
        return (
            <a href={`${process.env.PUBLIC_URL}/profile`}>
                <img
                    src={Avatar}
                    alt="Avatar --> User"
                    className="w-[48px] h-[48px] rounded-[8px]"
                />
            </a>
        );
    }
}
