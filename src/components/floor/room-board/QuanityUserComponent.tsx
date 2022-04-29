import React from "react";
import User from "../../../assets/icons/user.png";

export type QuantityUserComponentProps = {
    quantityUser: number;
};

export class QuantityUserComponent extends React.PureComponent<QuantityUserComponentProps> {
    render(): React.ReactNode {
        const TEMP: number[] = [];
        for (let index: number = 0; index < this.props.quantityUser; index++) {
            TEMP.push(index);
        }
        return (
            <div className="flex flex-row">
                {TEMP.map((v) => {
                    return (
                        <img
                            src={User}
                            key={v}
                            alt={"User"}
                            className="w-[18px] h-[18px] ml-[2px] mr-[2px]"
                        />
                    );
                })}
            </div>
        );
    }
}
