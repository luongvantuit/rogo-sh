import React from "react";
import Favicon from "../../assets/favicon.png";

export class LogoComponent extends React.PureComponent<{
    colorTextBanner?: string;
}> {
    render(): React.ReactNode {
        return (
            <a className="flex flex-row items-center" href="/">
                <img
                    src={Favicon}
                    alt="Favicon - Logo Rogo"
                    className="w-[48px] h-[48px]"
                />
                <p
                    className="text-[24px] w-[72px] h-[32px] font-black "
                    style={{
                        color: this.props.colorTextBanner,
                    }}
                >
                    Rogo
                </p>
            </a>
        );
    }
}
