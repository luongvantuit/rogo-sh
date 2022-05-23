import React from "react";
import Logo from "../assets/logo.png";
import { AppContext } from "../contexts/AppContext.jsx";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase/firebase-auth";

export const SliderBar = React.memo(() => {
    const user = React.useContext(AppContext);

    const sliderBarState = useSelector((state) => state.sliderBarState.value);

    return (
        <div className="md:flex flex-col hidden md:w-[320px] w-[120px] p-[16px] border-r-1 h-screen shadow-md">
            <div className="flex flex-row items-center mb-[16px]">
                <img
                    src={Logo}
                    alt=""
                    className="w-[48px] h-[48px]"
                />
            </div>
            <div className="h-full justify-between flex flex-col">
                <nav></nav>
            </div>
        </div>
    );
});
