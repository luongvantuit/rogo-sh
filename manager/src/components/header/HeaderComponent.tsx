import React from "react";
import { AvatarComponent } from "./AvatarComponent";
import { LogoComponent } from "./LogoComponent";
import { NotificationComponent } from "./NotificationComponent";

export class HeaderComponent extends React.PureComponent<{
    colorTextBanner?: string;
}> {
    render(): React.ReactNode {
        return (
            <header className="h-[80px] w-auto flex-row flex justify-between items-center px-[28px]">
                <LogoComponent
                    colorTextBanner={this.props.colorTextBanner ?? "#39374E"}
                />
                <div className="flex flex-row items-center">
                    <NotificationComponent />
                    <AvatarComponent />
                </div>
            </header>
        );
    }
}
