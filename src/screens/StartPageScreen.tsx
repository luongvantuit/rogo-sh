import React from "react";
import { Logger } from "../utils/Logger";

export class StartPageScreen extends React.PureComponent {
    private static TAG: string = StartPageScreen.name;
    private static TITLE_DEFAULT: string = "Rogo Solutions - Home";

    private setTitle(): void {
        if (document) {
            document.title = StartPageScreen.TITLE_DEFAULT;
        }
    }

    componentDidMount() {
        this.setTitle();
    }

    componentDidUpdate() {
        this.setTitle();
    }

    render(): React.ReactNode {
        Logger.debug(StartPageScreen.TAG, `Render --> ${StartPageScreen.name}`);
        return <React.Fragment></React.Fragment>;
    }
}
