import React from "react";

export type DoNotDisturbComponentProps = {
    textColor: string;
};

export class DoNotDisturbComponent extends React.PureComponent<DoNotDisturbComponentProps> {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <p
                    className=" text-[10px] font-bold"
                    style={{
                        color: this.props.textColor,
                    }}
                >
                    Do Not Disturb
                </p>
            </React.Fragment>
        );
    }
}
