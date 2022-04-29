import React from "react";

export type IsUsedProps = {
    isUsed?: boolean;
};

export class IsUsedComponent extends React.PureComponent<IsUsedProps> {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <p>{this.props.isUsed ? "Used" : "Not Use"}</p>
            </React.Fragment>
        );
    }
}
