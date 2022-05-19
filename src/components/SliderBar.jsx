import React from "react";
import Logo from "../assets/logo.png";
import { AppContext } from "../contexts/AppContext.jsx";
import { auth } from "../firebase/firebase-auth";

export const SliderBar = React.memo(() => {
    const user = React.useContext(AppContext);

    return (
        <div className="md:flex flex-col hidden w-[320px]">
            <div className="flex flex-col items-center mt-[32px] mb-[12px]">
                <img src={Logo} alt="" className="w-[80px] h-[80px]" />
                <p className="text-[18px] font-extrabold m-[12px] text-[#212529] tracking-widest">
                    Rogo Solutions
                </p>
            </div>
            <a
                href="#/"
                className="mx-[16px] my-[8px] shadow-md p-[16px] rounded-md text-white bg-[#FFC764] font-bold"
            >
                Floors Manager
            </a>
            <a
                href="#/not-disturb"
                className="mx-[16px] my-[8px] shadow-md p-[16px] rounded-md text-[#212529] bg-white font-bold"
            >
                Rooms Not Disturb
            </a>
            <button
                onClick={() => {
                    if (user) {
                        auth.signOut();
                    } else {
                        window.location = "#/login";
                    }
                }}
                className="mx-[16px] mt-[32px] mb-[8px] shadow-md p-[16px] rounded-md  bg-[#FFC764] hover:bg-[#FBD083]"
            >
                {(() => {
                    if (user) {
                        return (
                            <div>
                                <p className="tracking-widest inline text-center text-white font-bold">
                                    Logout
                                </p>
                                <i className="fa-solid fa-power-off mx-[8px] text-white"></i>
                            </div>
                        );
                    }
                    return (
                        <p className="tracking-widest inline text-center text-white font-bold">
                            Login
                        </p>
                    );
                })()}
            </button>
        </div>
    );
});
