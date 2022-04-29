import React from "react";
import { HeaderComponent } from "../components/header/HeaderComponent";

export default class DashboardScreen extends React.PureComponent {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <HeaderComponent />
            </React.Fragment>
        );
    }
}
