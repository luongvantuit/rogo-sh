import React from "react";
import { toggle } from "../slices/slider-bar-slice";
import { useSelector, useDispatch } from "react-redux";
import { AppContext } from "../contexts/AppContext.jsx";

export const Header = React.memo(() => {
    const sliderBarState = useSelector((state) => state.sliderBarState.value);
    const dispatch = useDispatch();

    const user = React.useContext(AppContext)


    return (
        <header className="flex flex-row p-[16px] sticky top-0 justify-between items-center bg-white z-50">
            <div className="flex flex-row justify-center items-center">
                <button
                    onClick={() => {
                        dispatch(toggle());
                    }}
                    className="bg-[#212529] w-[48px] h-[48px] shadow-md rounded-md md:block hidden duration-500 drop-shadow-md hover:opacity-90"
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
                <p className="font-extrabold  md:mx-[16px] mr-[16px] text-[32px] drop-shadow-md text-[#212529]">
                    Hi!
                </p>
            </div>
            <div>
                {(() => {
                    if (user) {
                        return <img src={user?.photoURL || `https://www.gravatar.com/avatar/${user.uid}?d=identicon`} alt="" className="ring-gray-500 rounded-md w-[48px] h-[48px] p-1 ring-1"/>
                    } else {
                        return <a href="#/login" className="px-[16px] text-white bg-[#212529] rounded-md shadow-md drop-shadow-md h-[48px] block leading-[48px] hover:opacity-90">LOGIN</a>
                    }
                })()}
            </div>
        </header>
    );
});
