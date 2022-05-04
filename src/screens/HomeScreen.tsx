import React from "react";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { Logger } from "../utils/Logger";

export class HomeScreen extends React.PureComponent {
    private static TAG: string = HomeScreen.name;
    private static TITLE_DEFAULT: string = "Rogo Solutions - Home";

    private setTitle(): void {
        if (document) {
            document.title = HomeScreen.TITLE_DEFAULT;
        }
    }

    componentDidMount() {
        this.setTitle();
    }

    componentDidUpdate() {
        this.setTitle();
    }

    render(): React.ReactNode {
        Logger.debug(HomeScreen.TAG, `Render --> ${HomeScreen.name}`);
        return (
            <React.Fragment>
                <HeaderComponent />
            </React.Fragment>
        );
    }
}
