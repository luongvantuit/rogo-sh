import React from "react";
import Favicon from "../../assets/favicon.png";

export class LogoComponent extends React.PureComponent {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <img
                    src={Favicon}
                    alt="Favicon - Logo Rogo"
                    className="w-[48px] h-[48px]"
                />
            </React.Fragment>
        );
    }
}
