import React from "react";

export type IsUsedProps = {
    isUsed?: boolean;
    textColor?: string;
};

export class IsUsedComponent extends React.PureComponent<IsUsedProps> {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <p
                    className="text-xs font-black"
                    style={{
                        color: this.props.textColor,
                    }}
                >
                    {this.props.isUsed ? "Used" : "Not Use"}
                </p>
            </React.Fragment>
        );
    }
}
