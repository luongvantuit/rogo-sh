import React from "react";

export type DashboardButtonComponentProps = {
    text: string;
    border?: boolean;
    color: string;
    disable?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | MouseEvent>) => void;
};

export class DashboardButtonComponent extends React.PureComponent<DashboardButtonComponentProps> {
    private static WHITE: string = "#FFFFFF";

    private static DISABLE: string = "#C4C4C4";

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <button
                    className="rounded-lg rogo-smart-hotel-drop-shadow w-[516px] h-[110px] text-[32px] font-black"
                    disabled={this.props.disable}
                    onClick={this.props.onClick}
                    style={{
                        color: (() => {
                            if (this.props.border && !this.props.disable) {
                                return this.props.color;
                            } else if (
                                this.props.disable &&
                                this.props.border
                            ) {
                                return DashboardButtonComponent.DISABLE;
                            }
                            return DashboardButtonComponent.WHITE;
                        })(),
                        backgroundColor: (() => {
                            if (this.props.border) {
                                return DashboardButtonComponent.WHITE;
                            } else if (this.props.disable) {
                                return DashboardButtonComponent.DISABLE;
                            }
                            return this.props.color;
                        })(),
                        borderColor: (() => {
                            if (this.props.disable) {
                                return DashboardButtonComponent.DISABLE;
                            }
                            return this.props.color;
                        })(),
                        borderWidth: (() => {
                            if (this.props.border) {
                                return 2;
                            }
                            return 0;
                        })(),
                    }}
                >
                    {this.props.text}
                </button>
            </React.Fragment>
        );
    }
}
