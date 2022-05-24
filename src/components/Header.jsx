import React from "react";
import { toggle } from "../slices/slider-bar-slice";
import { useSelector, useDispatch } from "react-redux";

export const Header = React.memo(() => {
    const sliderBarState = useSelector((state) => state.sliderBarState.value);
    const dispatch = useDispatch();
    return (
        <header className="items-center flex-row flex p-[16px] sticky top-0">
            <button
                onClick={() => {
                    dispatch(toggle());
                }}
                className="bg-[#212529] w-[48px] h-[48px] shadow-md rounded-md md:block hidden duration-500 drop-shadow-md"
            >
                <i
                    className={(() => {
                        if (sliderBarState) {
                            return "fa-solid fa-angle-left text-[16px] text-white";
                        } else {
                            return "fa-solid fa-angle-right text-[16px] text-white";
                        }
                    })()}
                ></i>
            </button>
            <p className="font-extrabold  md:mx-[16px] mr-[16px] text-[32px] drop-shadow-md text-[#212529]">Hi!</p>
        </header>
    );
});
