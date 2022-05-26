import React from "react";
import Logo from "../assets/logo.png";
import { AppContext } from "../contexts/AppContext.jsx";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase/firebase-auth";
import { SliderBarNavItem } from "./SliderBarNavItem.jsx";

export const SliderBar = React.memo(({ navActivate }) => {
    const user = React.useContext(AppContext);

    const sliderBarState = useSelector((state) => state.sliderBarState.value);

    return (
        <nav
            className={(() => {
                if (!sliderBarState) {
                    return "w-[80px] duration-500";
                }
                return "md:w-[240px] w-[80px] h-screen duration-500";
            })()}
        >
            <img
                src={Logo}
                alt=""
                className={(() => {
                    if (!sliderBarState) {
                        return "w-[48px] h-[48px] m-[16px] shadow-md drop-shadow-md p-[6px] duration-500 rounded-md";
                    }
                    return "w-[48px] h-[48px] m-[16px] md:shadow-none shadow-md md:drop-shadow-none drop-shadow-md md:p-0 p-[6px] duration-500 md:rounded-none rounded-md";
                })()}
            />
            <SliderBarNavItem
                icon="fa-solid fa-house"
                href="#/"
                text="Home"
                activate={navActivate === "home"}
            />
            <SliderBarNavItem
                icon="fa-solid fa-chart-pie"
                href="#"
                text="Analytics"
                activate={navActivate === "analytics"}
            />
            <SliderBarNavItem
                icon="fa-solid fa-moon"
                href="#/not-disturb"
                text="Not Disturb"
                activate={navActivate === "not-disturb"}
            />
        </nav>
    );
});
