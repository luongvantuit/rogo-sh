import React from "react";
import { AvatarComponent } from "./AvatarComponent";
import { LogoComponent } from "./LogoComponent";
import Menu from "../../assets/icons/menu.svg";

export class HeaderComponent extends React.PureComponent {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <header className="p-[14px] w-auto flex-row flex justify-between">
                    <LogoComponent />
                    <div className="flex flex-row">
                        <AvatarComponent />
                        <img
                            src={Menu}
                            alt={"Menu"}
                            className="pl-[14px] w-[48px] h-[48px]"
                        />
                    </div>
                </header>
            </React.Fragment>
        );
    }
}
