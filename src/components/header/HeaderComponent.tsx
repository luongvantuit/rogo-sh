import React from "react";
import { AvatarComponent } from "./AvatarComponent";
import { LogoComponent } from "./LogoComponent";
import { NotificationComponent } from "./NotificationComponent";

export class HeaderComponent extends React.PureComponent {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <header className="h-[124px] w-auto flex-row flex justify-between items-center px-[57px]">
                    <LogoComponent />
                    <div className="flex flex-row items-center">
                        <NotificationComponent />
                        <AvatarComponent />
                    </div>
                </header>
            </React.Fragment>
        );
    }
}
