import React from "react";
import Logo from "../assets/logo.png";
import { AppContext } from "../contexts/AppContext.jsx";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase/firebase-auth";
import { toggle } from "../slices/slider-bar-slice";

export const SliderBar = React.memo(() => {
    const user = React.useContext(AppContext);

    const sliderBarState = useSelector((state) => state.state.value);
    const dispatch = useDispatch();

    return <div className="md:flex flex-col hidden w-[320px]">
        
    </div>;
});
