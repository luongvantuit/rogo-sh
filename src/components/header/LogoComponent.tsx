import React from "react";
import Favicon from "../../assets/favicon.png";

export class LogoComponent extends React.PureComponent {
    render(): React.ReactNode {
        return (
            <div className="flex flex-row items-center">
                <img
                    src={Favicon}
                    alt="Favicon - Logo Rogo"
                    className="w-[48px] h-[48px]"
                />
                <p className="text-[24px] text-[#39374E] w-[72px] h-[32px] font-black">
                    Rogo
                </p>
            </div>
        );
    }
}
