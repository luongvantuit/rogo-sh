import React from "react";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { Logger } from "../utils/Logger";

export class DashboardScreen extends React.PureComponent {
    private static TITLE_DEFAULT: string = "Rogo Solutions - Dashboard";

    private static TAG: string = DashboardScreen.name;

    private setTitle(): void {
        if (document) {
            document.title = DashboardScreen.TITLE_DEFAULT;
        }
    }

    componentDidMount() {
        this.setTitle();
    }

    componentDidUpdate() {
        this.setTitle();
    }

    render(): React.ReactNode {
        Logger.debug(DashboardScreen.TAG, `Render --> ${DashboardScreen.name}`);
        return (
            <React.Fragment>
                <HeaderComponent />
            </React.Fragment>
        );
    }
}
